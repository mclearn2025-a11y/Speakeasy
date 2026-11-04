/* Speakeasy 2.0 — full-profile ZIP backup: writer, strict verifier, schemas.
   © 2026 McLearn Media LLC. Follows docs/BACKUP-AND-RECOVERY-CONTRACT.md.
   Nothing in this file writes to the device. It only builds a backup file, or checks one and hands back
   the checked data. The app decides what to save, and only after every check here has passed.
   No outside libraries; works in browsers and in Node 20+ (for the automated tests). */
(function (root) {
  "use strict";

  const FORMAT = "speakeasy-profile-backup";
  const FORMAT_VERSION = 1;
  const PROFILE_SCHEMA_VERSION = 1;
  const MiB = 1024 * 1024;
  const LIMITS = Object.freeze({
    manifest: 1 * MiB,
    profile: 5 * MiB,
    media: 100 * MiB,
    total: 500 * MiB,          // all decompressed data together
    entries: 10001 + 1,        // payload entries plus manifest.json
    file: 600 * MiB            // the backup file itself, checked before it is read
  });
  const TYPES = Object.freeze({
    "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp",
    "video/mp4": "mp4", "video/webm": "webm", "video/quicktime": "mov"
  });
  const ROLE_OF = t => t.startsWith("image/") ? "photo" : "sign";

  class BackupError extends Error {
    constructor(code, detail) { super(code + (detail ? ": " + detail : "")); this.code = code; this.detail = detail || ""; }
  }
  const fail = (code, detail) => { throw new BackupError(code, detail); };

  /* ---------------- CRC-32 and SHA-256 ---------------- */
  const CRC_TABLE = (() => { const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
    return t; })();
  function crc32(u8) { let c = 0xFFFFFFFF; for (let i = 0; i < u8.length; i++) c = CRC_TABLE[(c ^ u8[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
  async function sha256(u8) {
    const d = new Uint8Array(await root.crypto.subtle.digest("SHA-256", u8));
    return Array.from(d, b => b.toString(16).padStart(2, "0")).join("");
  }

  /* ---------------- ZIP writer (stored, no compression: photos and videos are already compressed) ---------------- */
  function writeZip(files) {
    const enc = new TextEncoder(), parts = [], central = [];
    let offset = 0;
    const DOS_TIME = 0, DOS_DATE = (2026 - 1980) << 9 | 1 << 5 | 1;   // fixed date: the file carries no personal timestamps
    for (const f of files) {
      const name = enc.encode(f.name), data = f.data, crc = crc32(data);
      if (data.length > 0xFFFFFFFE || offset > 0xFFFFFFFE) fail("too-large");
      const lh = new DataView(new ArrayBuffer(30));
      lh.setUint32(0, 0x04034b50, true); lh.setUint16(4, 20, true); lh.setUint16(6, 0x0800, true); lh.setUint16(8, 0, true);
      lh.setUint16(10, DOS_TIME, true); lh.setUint16(12, DOS_DATE, true); lh.setUint32(14, crc, true);
      lh.setUint32(18, data.length, true); lh.setUint32(22, data.length, true); lh.setUint16(26, name.length, true); lh.setUint16(28, 0, true);
      const ch = new DataView(new ArrayBuffer(46));
      ch.setUint32(0, 0x02014b50, true); ch.setUint16(4, 0x031E, true); ch.setUint16(6, 20, true); ch.setUint16(8, 0x0800, true);
      ch.setUint16(10, 0, true); ch.setUint16(12, DOS_TIME, true); ch.setUint16(14, DOS_DATE, true); ch.setUint32(16, crc, true);
      ch.setUint32(20, data.length, true); ch.setUint32(24, data.length, true); ch.setUint16(28, name.length, true);
      ch.setUint16(30, 0, true); ch.setUint16(32, 0, true); ch.setUint16(34, 0, true); ch.setUint16(36, 0, true);
      ch.setUint32(38, (0o100644 << 16) >>> 0, true); ch.setUint32(42, offset, true);
      parts.push(new Uint8Array(lh.buffer), name, data);
      central.push(new Uint8Array(ch.buffer), name);
      offset += 30 + name.length + data.length;
    }
    const cdSize = central.reduce((n, p) => n + p.length, 0);
    const eo = new DataView(new ArrayBuffer(22));
    eo.setUint32(0, 0x06054b50, true); eo.setUint16(4, 0, true); eo.setUint16(6, 0, true);
    eo.setUint16(8, files.length, true); eo.setUint16(10, files.length, true);
    eo.setUint32(12, cdSize, true); eo.setUint32(16, offset, true); eo.setUint16(20, 0, true);
    const all = [...parts, ...central, new Uint8Array(eo.buffer)];
    const out = new Uint8Array(all.reduce((n, p) => n + p.length, 0)); let o = 0;
    for (const p of all) { out.set(p, o); o += p.length; }
    return out;
  }

  /* ---------------- ZIP reader: structure checks, no data trusted from headers alone ---------------- */
  const BAD_EXT = /\.(zip|jar|apk|ipa|7z|rar|gz|tgz|bz2|xz|tar|exe|dll|bat|cmd|com|msi|sh|js|mjs|html?|svg|app|dmg|scr|ps1|vbs)$/i;
  function checkPath(name) {
    if (!name || name.length > 255) fail("bad-path", name);
    if (name.includes("\\")) fail("bad-path", "backslash");
    if (name.startsWith("/") || /^[A-Za-z]:/.test(name)) fail("bad-path", "absolute");
    if (name.includes("\0") || /[\u0000-\u001f\u007f]/.test(name)) fail("bad-path", "control character");
    const segs = name.split("/");
    if (segs.some(s => s === "" || s === "." || s === "..")) fail("bad-path", "dot or empty segment");
    if (name !== name.normalize("NFC")) fail("bad-path", "not NFC");
    if (BAD_EXT.test(name)) fail("bad-entry", "executable or nested archive");
  }

  function readZipDirectory(u8) {
    const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
    if (u8.length < 22) fail("not-zip");
    let eocd = -1;
    for (let i = u8.length - 22; i >= Math.max(0, u8.length - 22 - 0xFFFF); i--) {
      if (dv.getUint32(i, true) === 0x06054b50 && i + 22 + dv.getUint16(i + 20, true) === u8.length) { eocd = i; break; }
    }
    if (eocd < 0) fail("not-zip");
    if (dv.getUint16(eocd + 4, true) !== 0 || dv.getUint16(eocd + 6, true) !== 0) fail("unsupported", "multi-part archive");
    const count = dv.getUint16(eocd + 10, true);
    if (count !== dv.getUint16(eocd + 8, true)) fail("unsupported", "multi-part archive");
    const cdSize = dv.getUint32(eocd + 12, true), cdOff = dv.getUint32(eocd + 16, true);
    if (count === 0xFFFF || cdSize === 0xFFFFFFFF || cdOff === 0xFFFFFFFF) fail("unsupported", "zip64");
    if (count > LIMITS.entries) fail("too-many-entries");
    if (cdOff + cdSize !== eocd) fail("corrupt", "central directory position");
    const dec = new TextDecoder("utf-8", { fatal: true });
    const entries = [], seen = new Set(), folded = new Set();
    let p = cdOff, declaredTotal = 0;
    for (let i = 0; i < count; i++) {
      if (p + 46 > eocd || dv.getUint32(p, true) !== 0x02014b50) fail("corrupt", "central directory");
      const flags = dv.getUint16(p + 8, true), method = dv.getUint16(p + 10, true);
      const crc = dv.getUint32(p + 16, true), csize = dv.getUint32(p + 20, true), usize = dv.getUint32(p + 24, true);
      const nlen = dv.getUint16(p + 28, true), xlen = dv.getUint16(p + 30, true), clen = dv.getUint16(p + 32, true);
      const disk = dv.getUint16(p + 34, true), madeBy = dv.getUint16(p + 4, true) >> 8, ext = dv.getUint32(p + 38, true), loff = dv.getUint32(p + 42, true);
      if (p + 46 + nlen + xlen + clen > eocd) fail("corrupt", "central directory");
      let name; try { name = dec.decode(u8.subarray(p + 46, p + 46 + nlen)); } catch { fail("bad-path", "name is not UTF-8"); }
      if (flags & 0x0001 || flags & 0x0040 || flags & 0x2000) fail("unsupported", "encrypted entry");
      if (method !== 0 && method !== 8) fail("unsupported", "compression method " + method);
      if (disk !== 0) fail("unsupported", "multi-part archive");
      if (name.endsWith("/")) fail("bad-entry", "folder entry");
      checkPath(name);
      if (madeBy === 3) {                     // Unix: file type and permissions live in the high 16 bits
        const mode = ext >>> 16, type = mode & 0o170000;
        if (type === 0o120000) fail("bad-entry", "symlink");
        if (type !== 0 && type !== 0o100000) fail("bad-entry", "special file");
        if (mode & 0o111) fail("bad-entry", "executable");
      }
      if (seen.has(name)) fail("duplicate-entry", name);
      const fold = name.normalize("NFKC").toLowerCase();
      if (folded.has(fold)) fail("duplicate-entry", "case or Unicode look-alike: " + name);
      seen.add(name); folded.add(fold);
      if (method === 0 && csize !== usize) fail("corrupt", "stored sizes differ");
      declaredTotal += usize;
      entries.push({ name, flags, method, crc, csize, usize, loff });
      p += 46 + nlen + xlen + clen;
    }
    if (p !== eocd) fail("corrupt", "central directory length");
    if (declaredTotal > LIMITS.total) fail("too-large", "total size");
    // local headers: must agree with the central directory, sit in order, and never overlap (blocks overlapping-entry bombs)
    const sorted = [...entries].sort((a, b) => a.loff - b.loff);
    let end = 0;
    for (const e of sorted) {
      if (e.loff < end || e.loff + 30 > cdOff || dv.getUint32(e.loff, true) !== 0x04034b50) fail("corrupt", "local header for " + e.name);
      const lflags = dv.getUint16(e.loff + 6, true), lmethod = dv.getUint16(e.loff + 8, true);
      const lnlen = dv.getUint16(e.loff + 26, true), lxlen = dv.getUint16(e.loff + 28, true);
      let lname; try { lname = dec.decode(u8.subarray(e.loff + 30, e.loff + 30 + lnlen)); } catch { fail("corrupt", "local name"); }
      if (lname !== e.name || lmethod !== e.method || (lflags & 0x0001)) fail("corrupt", "local header mismatch for " + e.name);
      if (!(lflags & 0x0008)) {
        if (dv.getUint32(e.loff + 14, true) !== e.crc || dv.getUint32(e.loff + 18, true) !== e.csize || dv.getUint32(e.loff + 22, true) !== e.usize)
          fail("corrupt", "local sizes for " + e.name);
      }
      e.dataStart = e.loff + 30 + lnlen + lxlen;
      e.dataEnd = e.dataStart + e.csize;
      if (e.dataEnd > cdOff) fail("corrupt", "data runs past end for " + e.name);
      end = e.dataEnd + (lflags & 0x0008 ? 12 : 0);
      if (end > cdOff) fail("corrupt", "data descriptor for " + e.name);
    }
    return entries;
  }

  /* Decompress one entry, counting real bytes. Stops as soon as it goes past the allowed size. */
  async function extract(u8, e, cap) {
    if (e.usize > cap) fail("too-large", e.name);
    const raw = u8.subarray(e.dataStart, e.dataEnd);
    let out;
    if (e.method === 0) out = raw.slice();
    else {
      if (typeof root.DecompressionStream !== "function") fail("unsupported", "this browser can't open compressed backups");
      const ds = new root.DecompressionStream("deflate-raw");
      const reader = new Blob([raw]).stream().pipeThrough(ds).getReader();
      const chunks = []; let n = 0;
      try {
        for (;;) { const { done, value } = await reader.read(); if (done) break;
          n += value.length; if (n > cap || n > e.usize) { reader.cancel().catch(() => {}); fail("too-large", e.name + " is bigger than it says"); }
          chunks.push(value); }
      } catch (err) { if (err instanceof BackupError) throw err; fail("corrupt", "can't decompress " + e.name); }
      out = new Uint8Array(n); let o = 0; for (const c of chunks) { out.set(c, o); o += c.length; }
    }
    if (out.length !== e.usize) fail("corrupt", "size mismatch for " + e.name);
    if (crc32(out) !== e.crc) fail("corrupt", "checksum (CRC) mismatch for " + e.name);
    return out;
  }

  /* ---------------- Strict JSON: UTF-8 only, no duplicate keys ---------------- */
  function decodeUTF8(u8) {
    if (u8.length >= 3 && u8[0] === 0xEF && u8[1] === 0xBB && u8[2] === 0xBF) fail("bad-json", "byte-order mark");
    try { return new TextDecoder("utf-8", { fatal: true }).decode(u8); } catch { fail("bad-json", "not UTF-8"); }
  }
  function parseStrictJSON(text) {
    let i = 0;
    const ws = () => { while (i < text.length && " \t\n\r".includes(text[i])) i++; };
    const err = m => fail("bad-json", m + " at " + i);
    function value(depth) {
      if (depth > 64) err("too deeply nested");
      ws(); const c = text[i];
      if (c === "{") {
        i++; const o = Object.create(null), keys = new Set(); ws();
        if (text[i] === "}") { i++; return Object.assign({}, o); }
        for (;;) {
          ws(); if (text[i] !== '"') err("expected key");
          const k = str(); if (keys.has(k)) err("duplicate key " + JSON.stringify(k)); keys.add(k);
          ws(); if (text[i] !== ":") err("expected :"); i++;
          o[k] = value(depth + 1); ws();
          if (text[i] === ",") { i++; continue; } if (text[i] === "}") { i++; break; } err("expected , or }");
        }
        const plain = {}; for (const k of keys) Object.defineProperty(plain, k, { value: o[k], enumerable: true, writable: true, configurable: true });
        return plain;
      }
      if (c === "[") {
        i++; const a = []; ws(); if (text[i] === "]") { i++; return a; }
        for (;;) { a.push(value(depth + 1)); ws(); if (text[i] === ",") { i++; continue; } if (text[i] === "]") { i++; break; } err("expected , or ]"); }
        return a;
      }
      if (c === '"') return str();
      const m = /^(?:-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?|true|false|null)/.exec(text.slice(i, i + 400));
      if (!m) err("unexpected character");
      i += m[0].length;
      if (m[0] === "true") return true; if (m[0] === "false") return false; if (m[0] === "null") return null;
      const n = Number(m[0]); if (!Number.isFinite(n)) err("number out of range"); return n;
    }
    function str() {
      const start = i; i++;
      for (;;) {
        if (i >= text.length) err("unterminated string");
        const ch = text.charCodeAt(i);
        if (ch === 34) { i++; break; }
        if (ch < 0x20) err("control character in string");
        if (ch === 92) { i++; const e = text[i]; if ('"\\/bfnrt'.includes(e)) { i++; continue; }
          if (e === "u" && /^[0-9a-fA-F]{4}$/.test(text.slice(i + 1, i + 5))) { i += 5; continue; } err("bad escape"); }
        i++;
      }
      return JSON.parse(text.slice(start, i));
    }
    const v = value(0); ws(); if (i !== text.length) err("extra data after JSON");
    return v;
  }

  /* ---------------- JSON Schema (Draft 2020-12 subset used by our schemas; format assertion on) ---------------- */
  const DATE_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?(?:Z|[+-]\d{2}:\d{2})$/;
  const SUPPORTED_KEYWORDS = new Set(["$schema", "$id", "title", "description", "type", "const", "enum", "required", "properties",
    "additionalProperties", "items", "minItems", "maxItems", "minLength", "maxLength", "pattern", "minimum", "maximum", "format", "maxProperties"]);
  function typeOf(v) { if (v === null) return "null"; if (Array.isArray(v)) return "array"; if (Number.isInteger(v)) return "integer"; return typeof v; }
  function validateSchema(schema, v, path = "$") {
    for (const k of Object.keys(schema)) if (!SUPPORTED_KEYWORDS.has(k)) throw new Error("schema keyword not supported: " + k);
    const bad = m => fail("schema", path + ": " + m);
    if (schema.type) { const t = typeOf(v), want = [].concat(schema.type);
      if (!want.includes(t) && !(t === "integer" && want.includes("number"))) bad("expected " + want.join(" or ")); }
    if ("const" in schema && v !== schema.const) bad("must be " + JSON.stringify(schema.const));
    if (schema.enum && !schema.enum.includes(v)) bad("not an allowed value");
    if (typeof v === "string") {
      if (schema.minLength != null && [...v].length < schema.minLength) bad("too short");
      if (schema.maxLength != null && [...v].length > schema.maxLength) bad("too long");
      if (schema.pattern && !new RegExp(schema.pattern, "u").test(v)) bad("wrong pattern");
      if (schema.format === "date-time" && (!DATE_TIME.test(v) || !Number.isFinite(Date.parse(v)))) bad("not a date-time");
    }
    if (typeof v === "number") {
      if (schema.minimum != null && v < schema.minimum) bad("too small");
      if (schema.maximum != null && v > schema.maximum) bad("too large");
    }
    if (Array.isArray(v)) {
      if (schema.minItems != null && v.length < schema.minItems) bad("too few items");
      if (schema.maxItems != null && v.length > schema.maxItems) bad("too many items");
      if (schema.items) v.forEach((x, n) => validateSchema(schema.items, x, path + "[" + n + "]"));
    }
    if (typeOf(v) === "object") {
      const keys = Object.keys(v);
      if (schema.maxProperties != null && keys.length > schema.maxProperties) bad("too many fields");
      for (const r of schema.required || []) if (!Object.hasOwn(v, r)) bad("missing " + r);
      const props = schema.properties || {};
      for (const k of keys) {
        if (Object.hasOwn(props, k)) validateSchema(props[k], v[k], path + "." + k);
        else if (schema.additionalProperties === false) bad("unknown field " + k);
        else if (schema.additionalProperties && typeof schema.additionalProperties === "object") validateSchema(schema.additionalProperties, v[k], path + "." + k);
      }
    }
    return true;
  }

  const ID = "^[a-z0-9]{1,40}$", MEDIA_ID = "^m[0-9]{1,5}$";
  const MANIFEST_SCHEMA = Object.freeze({
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://speakeasy.mclearn2025.workers.dev/schemas/backup-manifest-1.json",
    "title": "Speakeasy full-profile backup manifest, format version 1",
    "type": "object", "additionalProperties": false,
    "required": ["format", "formatVersion", "app", "appVersion", "profileSchemaVersion", "exportType", "createdAt", "profiles", "media", "includes"],
    "properties": {
      "format": { "const": FORMAT },
      "formatVersion": { "const": FORMAT_VERSION },
      "app": { "const": "Speakeasy" },
      "appVersion": { "type": "string", "maxLength": 40, "pattern": "^[0-9]+\\.[0-9]+\\.[0-9]+(-[0-9A-Za-z.]+)?$" },
      "profileSchemaVersion": { "const": PROFILE_SCHEMA_VERSION },
      "exportType": { "const": "full-profile" },
      "createdAt": { "type": "string", "format": "date-time", "maxLength": 40 },
      "profiles": { "type": "array", "minItems": 1, "maxItems": 1, "items": {
        "type": "object", "additionalProperties": false, "required": ["id", "path", "bytes", "contentType", "sha256"],
        "properties": {
          "id": { "type": "string", "pattern": ID },
          "path": { "type": "string", "pattern": "^profiles/[a-z0-9]{1,40}\\.json$" },
          "bytes": { "type": "integer", "minimum": 2, "maximum": LIMITS.profile },
          "contentType": { "const": "application/json" },
          "sha256": { "type": "string", "pattern": "^[0-9a-f]{64}$" } } } },
      "media": { "type": "array", "maxItems": 10000, "items": {
        "type": "object", "additionalProperties": false, "required": ["id", "path", "bytes", "role", "contentType", "sha256"],
        "properties": {
          "id": { "type": "string", "pattern": MEDIA_ID },
          "path": { "type": "string", "pattern": "^media/m[0-9]{1,5}\\.(jpg|png|webp|mp4|webm|mov)$" },
          "bytes": { "type": "integer", "minimum": 1, "maximum": LIMITS.media },
          "role": { "enum": ["photo", "sign"] },
          "contentType": { "enum": Object.keys(TYPES) },
          "sha256": { "type": "string", "pattern": "^[0-9a-f]{64}$" } } } },
      "includes": { "type": "object", "additionalProperties": false, "required": ["photos", "signs"],
        "properties": { "photos": { "type": "boolean" }, "signs": { "type": "boolean" } } }
    }
  });

  const SHORT = { "type": "string", "maxLength": 2000 };
  const PROFILE_SCHEMA = Object.freeze({
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://speakeasy.mclearn2025.workers.dev/schemas/profile-1.json",
    "title": "Speakeasy profile payload, schema version 1",
    "type": "object", "additionalProperties": false,
    "required": ["schemaVersion", "profileId", "state", "signs"],
    "properties": {
      "schemaVersion": { "const": PROFILE_SCHEMA_VERSION },
      "profileId": { "type": "string", "pattern": ID },
      "signs": { "type": "object", "maxProperties": 5000, "additionalProperties": { "type": "string", "pattern": MEDIA_ID } },
      "state": { "type": "object", "required": ["settings", "custom", "profile", "help"], "properties": {
        "settings": { "type": "object", "maxProperties": 200 },
        "custom": { "type": "object", "maxProperties": 1000, "additionalProperties": {
          "type": "array", "maxItems": 5000, "items": { "type": "object", "required": ["id", "label"], "properties": {
            "id": { "type": "string", "minLength": 1, "maxLength": 200 },
            "label": { "type": "string", "maxLength": 500 },
            "say": SHORT, "sym": { "type": "string", "maxLength": 64 },
            "img": { "type": "string", "pattern": "^media:m[0-9]{1,5}$" } } } } },
        "profile": { "type": "object", "properties": {
          "name": { "type": "string", "maxLength": 200 }, "avatar": { "type": "string", "maxLength": 32 },
          "interests": { "type": "array", "maxItems": 200 } } },
        "help": { "type": "object", "properties": {
          "contacts": { "type": "array", "maxItems": 10, "items": { "type": "object", "properties": {
            "name": SHORT, "relation": SHORT, "phone": { "type": "string", "maxLength": 40 }, "email": SHORT, "video": SHORT } } } } },
        "topics": { "type": "array", "maxItems": 500, "items": { "type": "object", "required": ["id", "name"], "properties": {
          "id": { "type": "string", "maxLength": 100 }, "name": { "type": "string", "maxLength": 200 } } } },
        "hidden": { "type": "array", "maxItems": 20000 }
      } }
    }
  });

  /* ---------------- Media checks: look at the bytes, not the label ---------------- */
  function sniff(u8) {
    const s = (a, b) => String.fromCharCode(...u8.subarray(a, b));
    if (u8.length > 3 && u8[0] === 0xFF && u8[1] === 0xD8 && u8[2] === 0xFF) return "image/jpeg";
    if (u8.length > 8 && u8[0] === 0x89 && s(1, 4) === "PNG" && u8[4] === 0x0D && u8[5] === 0x0A) return "image/png";
    if (u8.length > 12 && s(0, 4) === "RIFF" && s(8, 12) === "WEBP") return "image/webp";
    if (u8.length > 4 && u8[0] === 0x1A && u8[1] === 0x45 && u8[2] === 0xDF && u8[3] === 0xA3) return "video/webm";
    if (u8.length > 12 && s(4, 8) === "ftyp") return s(8, 12) === "qt  " ? "video/quicktime" : "video/mp4";
    return null;
  }
  // MP4 and MOV: walk the top-level boxes; they must fill the file exactly and include ftyp and moov.
  function checkIsoBmff(u8) {
    const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength); let p = 0, ftyp = false, moov = false, n = 0;
    while (p < u8.length) {
      if (p + 8 > u8.length || ++n > 100000) return false;
      let size = dv.getUint32(p); const type = String.fromCharCode(u8[p + 4], u8[p + 5], u8[p + 6], u8[p + 7]);
      if (!/^[\x20-\x7e]{4}$/.test(type)) return false;
      if (size === 1) { if (p + 16 > u8.length) return false; size = dv.getUint32(p + 8) * 4294967296 + dv.getUint32(p + 12); }
      else if (size === 0) size = u8.length - p;
      if (size < 8 || p + size > u8.length) return false;
      if (type === "ftyp") ftyp = true; if (type === "moov") moov = true;
      p += size;
    }
    return ftyp && moov;
  }
  // WebM: an EBML header element, then a Segment element whose size fits the file.
  function readVint(u8, p) {
    const b = u8[p]; if (b === undefined || b === 0) return null;
    let len = 1; while (!(b & (0x80 >> (len - 1)))) len++;
    if (len > 8 || p + len > u8.length) return null;
    let v = b & (0xFF >> len); let unknown = v === (0xFF >> len);
    for (let k = 1; k < len; k++) { v = v * 256 + u8[p + k]; if (u8[p + k] !== 0xFF) unknown = false; }
    return { len, v, unknown };
  }
  function checkWebm(u8) {
    let p = 4; const h = readVint(u8, p); if (!h) return false; p += h.len + h.v;
    if (p + 4 > u8.length || !(u8[p] === 0x18 && u8[p + 1] === 0x53 && u8[p + 2] === 0x80 && u8[p + 3] === 0x67)) return false;
    const s = readVint(u8, p + 4); if (!s) return false;
    return s.unknown || p + 4 + s.len + s.v <= u8.length;
  }
  async function checkMedia(u8, declared, decodeImage) {
    const real = sniff(u8);
    if (real !== declared) fail("media", "file content is " + (real || "unknown") + ", label says " + declared);
    if (declared.startsWith("image/")) {
      try { await decodeImage(new Blob([u8], { type: declared })); } catch { fail("media", "photo can't be opened"); }
    } else if (declared === "video/webm") { if (!checkWebm(u8)) fail("media", "video is damaged"); }
    else if (!checkIsoBmff(u8)) fail("media", "video is damaged");
  }
  async function defaultDecodeImage(blob) {
    if (typeof root.createImageBitmap !== "function") throw new Error("no image decoder");
    const bmp = await root.createImageBitmap(blob); const ok = bmp.width > 0 && bmp.height > 0; bmp.close && bmp.close();
    if (!ok) throw new Error("empty image");
  }

  /* ---------------- Build a backup ---------------- */
  const b64ToBytes = b64 => { const s = atob(b64), u = new Uint8Array(s.length); for (let k = 0; k < s.length; k++) u[k] = s.charCodeAt(k); return u; };
  function dataUrlToBytes(url) {
    const m = /^data:([a-z]+\/[a-z0-9.+-]+)(?:;[a-z0-9=.+-]+)*;base64,([A-Za-z0-9+/=\s]*)$/i.exec(url || "");
    if (!m) return null; return { type: m[1].toLowerCase(), bytes: b64ToBytes(m[2].replace(/\s+/g, "")) };
  }
  /* state: the person's saved state. signs: Map wordId -> Blob. Returns {bytes, skipped} where skipped lists media left out. */
  async function buildBackup({ profileId, state, signs, appVersion, now }) {
    const enc = new TextEncoder(), media = [], files = [], skipped = [];
    let n = 0;
    const addMedia = (bytes, declared, role) => {
      const real = sniff(bytes);
      const type = real && TYPES[real] && ROLE_OF(real) === role ? real : null;
      if (!type || bytes.length > LIMITS.media) return null;
      const id = "m" + (++n), path = "media/" + id + "." + TYPES[type];
      media.push({ id, path, bytes: bytes.length, role, contentType: type, sha256: null, data: bytes });
      return id;
    };
    const copy = JSON.parse(JSON.stringify(state));
    delete copy._stripped;
    for (const [grp, list] of Object.entries(copy.custom || {})) for (const it of list || []) {
      if (!it || typeof it.img !== "string") continue;
      const d = dataUrlToBytes(it.img); const id = d && addMedia(d.bytes, d.type, "photo");
      if (id) it.img = "media:" + id; else { skipped.push({ kind: "photo", word: it.label || it.id, group: grp }); delete it.img; }
    }
    const signRefs = {};
    for (const [wordId, blob] of signs || []) {
      const bytes = new Uint8Array(await blob.arrayBuffer()); const id = addMedia(bytes, blob.type, "sign");
      if (id) signRefs[wordId] = id; else skipped.push({ kind: "sign", word: wordId });
    }
    const profile = { schemaVersion: PROFILE_SCHEMA_VERSION, profileId, state: copy, signs: signRefs };
    validateSchema(PROFILE_SCHEMA, JSON.parse(JSON.stringify(profile)));   // never write a file we would refuse to read
    const profileBytes = enc.encode(JSON.stringify(profile));
    if (profileBytes.length > LIMITS.profile) fail("too-large", "profile");
    for (const m of media) m.sha256 = await sha256(m.data);
    const manifest = {
      format: FORMAT, formatVersion: FORMAT_VERSION, app: "Speakeasy", appVersion, profileSchemaVersion: PROFILE_SCHEMA_VERSION,
      exportType: "full-profile", createdAt: (now || new Date()).toISOString(),
      profiles: [{ id: profileId, path: "profiles/" + profileId + ".json", bytes: profileBytes.length, contentType: "application/json", sha256: await sha256(profileBytes) }],
      media: media.map(({ data, ...m }) => m),
      includes: { photos: media.some(m => m.role === "photo"), signs: media.some(m => m.role === "sign") }
    };
    validateSchema(MANIFEST_SCHEMA, manifest);
    const total = profileBytes.length + media.reduce((s, m) => s + m.bytes, 0);
    if (total > LIMITS.total) fail("too-large", "total size");
    files.push({ name: "manifest.json", data: enc.encode(JSON.stringify(manifest, null, 1)) });
    files.push({ name: manifest.profiles[0].path, data: profileBytes });
    for (const m of media) files.push({ name: m.path, data: m.data });
    return { bytes: writeZip(files), skipped, manifest };
  }

  /* ---------------- Verify a backup (stage 1: manifest, stage 2: archive and payload) ---------------- */
  async function verifyBackup(input, opts = {}) {
    const decodeImage = opts.decodeImage || defaultDecodeImage;
    const u8 = input instanceof Uint8Array ? input : new Uint8Array(input);
    if (u8.length > LIMITS.file) fail("too-large", "file");
    const entries = readZipDirectory(u8);
    const byName = new Map(entries.map(e => [e.name, e]));
    // Stage 1 — manifest
    const me = byName.get("manifest.json"); if (!me) fail("no-manifest");
    const manifestBytes = await extract(u8, me, LIMITS.manifest);
    const manifest = parseStrictJSON(decodeUTF8(manifestBytes));
    if (manifest && typeof manifest === "object" && manifest.format === FORMAT && typeof manifest.formatVersion === "number" && manifest.formatVersion > FORMAT_VERSION)
      fail("newer-format", "made by a newer Speakeasy");
    if (manifest && typeof manifest === "object" && manifest.format !== FORMAT) fail("not-speakeasy");
    validateSchema(MANIFEST_SCHEMA, manifest);
    // Stage 2 — archive inventory must match the manifest exactly
    const prof = manifest.profiles[0];
    if (prof.path !== "profiles/" + prof.id + ".json") fail("inventory", "profile path doesn't match its id");
    const expected = new Map([["manifest.json", null], [prof.path, prof]]);
    const ids = new Set();
    for (const m of manifest.media) {
      if (ids.has(m.id)) fail("inventory", "duplicate media id " + m.id); ids.add(m.id);
      if (m.path !== "media/" + m.id + "." + TYPES[m.contentType]) fail("inventory", "media path doesn't match id and type: " + m.path);
      if (m.role !== ROLE_OF(m.contentType)) fail("inventory", "media role doesn't match type: " + m.id);
      if (expected.has(m.path)) fail("inventory", "duplicate path " + m.path);
      expected.set(m.path, m);
    }
    if (entries.length !== expected.size) fail("inventory", "archive has " + entries.length + " files, manifest lists " + expected.size);
    for (const e of entries) if (!expected.has(e.name)) fail("inventory", "unlisted file " + e.name);
    for (const [path, m] of expected) { const e = byName.get(path); if (!e) fail("inventory", "missing " + path); if (m && e.usize !== m.bytes) fail("inventory", "size differs for " + path); }
    if (manifest.includes.photos !== manifest.media.some(m => m.role === "photo") || manifest.includes.signs !== manifest.media.some(m => m.role === "sign"))
      fail("inventory", "inclusion flags don't match the files");
    let total = me.usize;
    // profile payload
    const pBytes = await extract(u8, byName.get(prof.path), LIMITS.profile); total += pBytes.length;
    if (await sha256(pBytes) !== prof.sha256) fail("hash", prof.path);
    const profile = parseStrictJSON(decodeUTF8(pBytes));
    validateSchema(PROFILE_SCHEMA, profile);
    if (profile.profileId !== prof.id) fail("inventory", "profile id doesn't match manifest");
    // every media reference must point at a listed file of the right role, and every listed file must be used
    const mediaById = new Map(manifest.media.map(m => [m.id, m])), used = new Map();
    const use = (id, role, where) => { const m = mediaById.get(id); if (!m) fail("references", where + " points at missing media " + id);
      if (m.role !== role) fail("references", where + " uses " + id + " as a " + role); if (used.has(id)) fail("references", "media " + id + " used twice"); used.set(id, where); };
    const wordIds = new Set();
    for (const [grp, list] of Object.entries(profile.state.custom)) for (const it of list) {
      wordIds.add(it.id); if (it.img) use(it.img.slice(6), "photo", "word " + it.id + " in " + grp); }
    for (const [wordId, id] of Object.entries(profile.signs)) use(id, "sign", "sign for " + wordId);
    if (used.size !== manifest.media.length) fail("references", "backup has media no word uses");
    // no other embedded data hiding in the profile
    const scan = (v, d) => { if (d > 64) fail("schema", "too deeply nested");
      if (typeof v === "string") { if (/^\s*(data|javascript|vbscript|blob):/i.test(v)) fail("schema", "embedded data outside the media folder"); }
      else if (v && typeof v === "object") for (const x of Object.values(v)) scan(x, d + 1); };
    scan(profile.state, 0);
    // media: real bytes, hash, and content
    const media = new Map();
    for (const m of manifest.media) {
      const bytes = await extract(u8, byName.get(m.path), LIMITS.media); total += bytes.length;
      if (total > LIMITS.total) fail("too-large", "total size");
      if (await sha256(bytes) !== m.sha256) fail("hash", m.path);
      await checkMedia(bytes, m.contentType, decodeImage);
      media.set(m.id, { bytes, contentType: m.contentType, role: m.role });
    }
    return Object.freeze({ manifest, profile, media });
  }

  const bytesToDataUrl = (u8, type) => { let s = ""; for (let k = 0; k < u8.length; k += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(k, k + 0x8000)); return "data:" + type + ";base64," + btoa(s); };

  /* Turn a verified backup into a draft for a NEW person: new id, media put back in place. Does not save anything. */
  function makeDraft(verified, newId) {
    const state = JSON.parse(JSON.stringify(verified.profile.state));
    for (const list of Object.values(state.custom)) for (const it of list) if (it.img) {
      const m = verified.media.get(it.img.slice(6)); it.img = bytesToDataUrl(m.bytes, m.contentType); }
    const signs = new Map();
    for (const [wordId, id] of Object.entries(verified.profile.signs)) { const m = verified.media.get(id); signs.set(wordId, new Blob([m.bytes], { type: m.contentType })); }
    return { id: newId, fromId: verified.profile.profileId, state, signs, createdAt: verified.manifest.createdAt, appVersion: verified.manifest.appVersion };
  }

  const isZip = u8 => u8.length > 4 && u8[0] === 0x50 && u8[1] === 0x4B && (u8[2] === 3 || u8[2] === 5) ;

  root.SpeakeasyZip = Object.freeze({ FORMAT, FORMAT_VERSION, PROFILE_SCHEMA_VERSION, LIMITS, TYPES, BackupError, crc32, sha256, writeZip,
    readZipDirectory, extract, parseStrictJSON, validateSchema, MANIFEST_SCHEMA, PROFILE_SCHEMA, sniff, checkIsoBmff, checkWebm,
    buildBackup, verifyBackup, makeDraft, isZip, dataUrlToBytes, bytesToDataUrl });
})(typeof window !== "undefined" ? window : globalThis);
