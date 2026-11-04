// Speakeasy 2.0 — automated tests for the ZIP backup writer and strict verifier.
// Run: node --test tests/   (Node 20+)
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import zlib from "node:zlib";

vm.runInThisContext(fs.readFileSync(new URL("../zipbackup.js", import.meta.url), "utf8"), { filename: "zipbackup.js" });
const Z = globalThis.SpeakeasyZip;
const enc = new TextEncoder();
const decodeImage = async () => {};            // real decoding is tested in the browser tests

// tiny but real files
const JPEG = Uint8Array.from(Buffer.from("/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=", "base64"));
const PNG = Uint8Array.from(Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", "base64"));
function box(type, body) { const b = Buffer.alloc(8 + body.length); b.writeUInt32BE(8 + body.length, 0); b.write(type, 4, "latin1"); Buffer.from(body).copy(b, 8); return b; }
const MP4 = Uint8Array.from(Buffer.concat([box("ftyp", Buffer.from("isom\0\0\0\0isom")), box("moov", Buffer.alloc(16)), box("mdat", Buffer.alloc(32, 7))]));
const dataUrl = (u8, t) => "data:" + t + ";base64," + Buffer.from(u8).toString("base64");

function sampleState() {
  return {
    settings: { lang: "en", lvl: 2, voiceURI: "", rate: 0.9 },
    custom: {
      core: [{ id: "u-1", label: "Nana", img: dataUrl(JPEG, "image/jpeg") }, { id: "u-2", label: "swing", sym: "🛝" }],
      "t-abc": [{ id: "u-3", label: "red truck", img: dataUrl(PNG, "image/png") }]
    },
    profile: { name: "Jordan", avatar: "🦊", age: "kid", interests: ["trucks"] },
    help: { contacts: [{ name: "Mom", relation: "mother", phone: "601-555-0100", email: "", video: "" }] },
    topics: [{ id: "t-abc", name: "Trucks", sym: "🚚" }], hidden: []
  };
}
async function goodBackup() {
  const r = await Z.buildBackup({ profileId: "main", state: sampleState(), signs: new Map([["u-2", new Blob([MP4], { type: "video/mp4" })]]), appVersion: "2.0.0-dev.2", now: new Date("2026-11-02T12:00:00Z") });
  return r;
}

// low-level ZIP crafter for building bad archives on purpose
function craft(files, { eocdCountOverride } = {}) {
  const parts = [], central = []; let off = 0;
  for (const f of files) {
    const name = Buffer.from(f.name, "utf8"); const raw = Buffer.from(f.data);
    const method = f.method ?? 0; const body = method === 8 ? zlib.deflateRawSync(raw) : raw;
    const crc = f.crc ?? Z.crc32(raw); const usize = f.usize ?? raw.length; const flags = f.flags ?? 0x0800;
    const lh = Buffer.alloc(30); lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(flags, 6); lh.writeUInt16LE(method, 8);
    lh.writeUInt32LE(crc, 14); lh.writeUInt32LE(body.length, 18); lh.writeUInt32LE(usize, 22); lh.writeUInt16LE(name.length, 26);
    const ch = Buffer.alloc(46); ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(f.madeBy ?? 0x031E, 4); ch.writeUInt16LE(20, 6); ch.writeUInt16LE(flags, 8);
    ch.writeUInt16LE(method, 10); ch.writeUInt32LE(crc, 16); ch.writeUInt32LE(body.length, 20); ch.writeUInt32LE(usize, 24); ch.writeUInt16LE(name.length, 28);
    ch.writeUInt32LE((f.ext ?? (0o100644 << 16)) >>> 0, 38); ch.writeUInt32LE(f.offset ?? off, 42);
    parts.push(lh, name, body); central.push(ch, name); off += 30 + name.length + body.length;
  }
  const cd = Buffer.concat(central); const eo = Buffer.alloc(22); eo.writeUInt32LE(0x06054b50, 0);
  const n = eocdCountOverride ?? files.length; eo.writeUInt16LE(n, 8); eo.writeUInt16LE(n, 10); eo.writeUInt32LE(cd.length, 12); eo.writeUInt32LE(off, 16);
  return new Uint8Array(Buffer.concat([...parts, cd, eo]));
}
// read a good backup's files so tests can change one thing at a time
async function goodFiles() {
  const { bytes } = await goodBackup(); const ents = Z.readZipDirectory(bytes); const out = [];
  for (const e of ents) out.push({ name: e.name, data: await Z.extract(bytes, e, 1e9) });
  return out;
}
const json = f => JSON.parse(new TextDecoder().decode(f.data));
const setJson = (f, v) => { f.data = enc.encode(JSON.stringify(v)); };
async function rehash(files) {   // keep manifest sizes/hashes in step after editing the profile
  const man = files.find(f => f.name === "manifest.json"), m = json(man);
  const p = files.find(f => f.name === m.profiles[0].path);
  if (p) { m.profiles[0].bytes = p.data.length; m.profiles[0].sha256 = await Z.sha256(p.data); }
  setJson(man, m); return files;
}
async function rejects(u8, code) {
  await assert.rejects(Z.verifyBackup(u8, { decodeImage }), e => { assert.equal(e.code, code, e.message); return true; });
}

test("round trip: build, verify, and restore draft match the original", async () => {
  const { bytes, skipped, manifest } = await goodBackup();
  assert.deepEqual(skipped, []);
  assert.equal(manifest.media.length, 3);
  assert.deepEqual(manifest.includes, { photos: true, signs: true });
  const v = await Z.verifyBackup(bytes, { decodeImage });
  const d = Z.makeDraft(v, "pnew");
  const orig = sampleState();
  assert.deepEqual(d.state, JSON.parse(JSON.stringify(orig)));
  assert.deepEqual(new Uint8Array(await d.signs.get("u-2").arrayBuffer()), MP4);
  assert.equal(d.id, "pnew"); assert.equal(d.fromId, "main");
});
test("manifest leaks no personal details", async () => {
  const { manifest } = await goodBackup(); const t = JSON.stringify(manifest);
  for (const s of ["Jordan", "Mom", "601-555", "Nana", "trucks"]) assert.ok(!t.includes(s), s);
});
test("deflate-compressed copy of a good backup still verifies", async () => {
  const files = await goodFiles(); await Z.verifyBackup(craft(files.map(f => ({ ...f, method: 8 }))), { decodeImage });
});
test("not a zip / truncated", async () => {
  await rejects(enc.encode("hello"), "not-zip");
  const { bytes } = await goodBackup(); await rejects(bytes.slice(0, bytes.length - 30), "not-zip");
});
test("duplicate JSON keys in manifest are rejected", async () => {
  const files = await goodFiles(); const man = files[0];
  const t = new TextDecoder().decode(man.data).replace('"app":', '"app":"Speakeasy","app":'); man.data = enc.encode(t);
  await rejects(craft(files), "bad-json");
});
test("unknown manifest field, bad date, newer format, wrong format", async () => {
  let f = await goodFiles(); let m = json(f[0]); m.extra = 1; setJson(f[0], m); await rejects(craft(f), "schema");
  f = await goodFiles(); m = json(f[0]); m.createdAt = "2026-13-45T99:00:00Z"; setJson(f[0], m); await rejects(craft(f), "schema");
  f = await goodFiles(); m = json(f[0]); m.formatVersion = 2; setJson(f[0], m); await rejects(craft(f), "newer-format");
  f = await goodFiles(); m = json(f[0]); m.format = "other"; setJson(f[0], m); await rejects(craft(f), "not-speakeasy");
});
test("names in manifest are not allowed", async () => {
  const f = await goodFiles(); const m = json(f[0]); m.profiles[0].name = "Jordan"; setJson(f[0], m); await rejects(craft(f), "schema");
});
test("unsafe paths are rejected", async () => {
  for (const name of ["../evil.json", "/abs.json", "media\\m1.jpg", "media//m1.jpg", "media/./m1.jpg", "C:/x.json"]) {
    const f = await goodFiles(); f.push({ name, data: enc.encode("x") }); await rejects(craft(f), "bad-path");
  }
});
test("nested archives, executables, symlinks, folders are rejected", async () => {
  let f = await goodFiles(); f.push({ name: "media/inner.zip", data: enc.encode("PK") }); await rejects(craft(f), "bad-entry");
  f = await goodFiles(); f.push({ name: "run.sh", data: enc.encode("#!") }); await rejects(craft(f), "bad-entry");
  f = await goodFiles(); f[2].ext = (0o120777 << 16) >>> 0; await rejects(craft(f), "bad-entry");
  f = await goodFiles(); f[2].ext = (0o100755 << 16) >>> 0; await rejects(craft(f), "bad-entry");
  f = await goodFiles(); f.push({ name: "media/", data: new Uint8Array() }); await rejects(craft(f), "bad-entry");
});
test("duplicate and look-alike entries are rejected", async () => {
  let f = await goodFiles(); f.push({ ...f[2] }); await rejects(craft(f), "duplicate-entry");
  f = await goodFiles(); f.push({ name: f[2].name.toUpperCase(), data: f[2].data }); await rejects(craft(f), "duplicate-entry");
});
test("encrypted entries and unknown compression are rejected", async () => {
  let f = await goodFiles(); f[2].flags = 0x0801; await rejects(craft(f), "unsupported");
  f = await goodFiles(); f[2].method = 12; await rejects(craft(f), "unsupported");
});
test("extra, missing, and resized files fail the inventory check", async () => {
  let f = await goodFiles(); f.push({ name: "media/m9.jpg", data: JPEG }); await rejects(craft(f), "inventory");
  f = await goodFiles(); f.splice(3, 1); await rejects(craft(f), "inventory");
  f = await goodFiles(); const m = json(f[0]); m.media[0].bytes += 1; setJson(f[0], m); await rejects(craft(f), "inventory");
});
test("CRC and SHA-256 mismatches are caught", async () => {
  let f = await goodFiles(); f[2].crc = (Z.crc32(f[2].data) ^ 1) >>> 0; await rejects(craft(f), "corrupt");
  f = await goodFiles(); const m = json(f[0]); m.media[0].sha256 = "0".repeat(64); setJson(f[0], m); await rejects(craft(f), "hash");
  const { bytes } = await goodBackup(); const bad = bytes.slice(); const ents = Z.readZipDirectory(bad); bad[ents[2].dataStart + 3] ^= 0xFF; await rejects(bad, "corrupt");
});
test("media must really be what the label says", async () => {
  const f = await goodFiles(); const i = f.findIndex(x => x.name.endsWith(".jpg")); f[i].data = PNG;
  const m = json(f[0]); const mm = m.media.find(x => x.path === f[i].name); mm.bytes = PNG.length; mm.sha256 = await Z.sha256(PNG); setJson(f[0], m);
  await rejects(craft(f), "media");
});
test("damaged video is rejected", async () => {
  const f = await goodFiles(); const i = f.findIndex(x => x.name.endsWith(".mp4")); const broken = MP4.slice(0, 20); f[i].data = broken;
  const m = json(f[0]); const mm = m.media.find(x => x.path === f[i].name); mm.bytes = broken.length; mm.sha256 = await Z.sha256(broken); setJson(f[0], m);
  await rejects(craft(f), "media");
});
test("zip bomb: entry that decompresses past its declared size is stopped", async () => {
  const f = await goodFiles(); const i = f.findIndex(x => x.name.endsWith(".jpg"));
  f[i] = { name: f[i].name, data: new Uint8Array(20 * 1024 * 1024), method: 8, usize: f[i].data.length };   // 20 MiB of zeros claiming to be a small photo
  const z = craft(f); assert.ok(z.length < 100 * 1024);
  await rejects(z, "too-large");
});
test("declared total over 500 MiB is refused before decompressing", async () => {
  const f = await goodFiles(); f[2].usize = 0xFFFFFF00; f[2].method = 8; await rejects(craft(f), "too-large");
});
test("overlapping entries are rejected", async () => {
  const f = await goodFiles(); f[3].offset = 0; await rejects(craft(f), "corrupt");
});
test("inclusion flags must match", async () => {
  const f = await goodFiles(); const m = json(f[0]); m.includes.signs = false; setJson(f[0], m); await rejects(craft(f), "inventory");
});
test("profile id must match manifest", async () => {
  const f = await goodFiles(); const p = json(f[1]); p.profileId = "other"; setJson(f[1], p); await rejects(craft(await rehash(f)), "inventory");
});
test("media no word uses, or a word pointing at missing media, is rejected", async () => {
  let f = await goodFiles(); let p = json(f[1]); delete p.state.custom.core[0].img; setJson(f[1], p); await rejects(craft(await rehash(f)), "references");
  f = await goodFiles(); p = json(f[1]); p.state.custom.core[1].img = "media:m77"; setJson(f[1], p); await rejects(craft(await rehash(f)), "references");
  f = await goodFiles(); p = json(f[1]); p.signs["u-1"] = p.signs["u-2"]; setJson(f[1], p); await rejects(craft(await rehash(f)), "references");
});
test("data or script hidden inside the profile is rejected", async () => {
  let f = await goodFiles(); let p = json(f[1]); p.state.profile.note = "javascript:alert(1)"; setJson(f[1], p); await rejects(craft(await rehash(f)), "schema");
  f = await goodFiles(); p = json(f[1]); p.state.help.contacts[0].video = "data:text/html,hi"; setJson(f[1], p); await rejects(craft(await rehash(f)), "schema");
  f = await goodFiles(); p = json(f[1]); p.state.custom.core[0].img = dataUrl(JPEG, "image/jpeg"); setJson(f[1], p); await rejects(craft(await rehash(f)), "schema");
});
test("photos that aren't images are left out of the backup and reported", async () => {
  const st = sampleState(); st.custom.core[0].img = "__idb__";
  const r = await Z.buildBackup({ profileId: "main", state: st, signs: new Map(), appVersion: "2.0.0-dev.2" });
  assert.equal(r.skipped.length, 1); assert.equal(r.skipped[0].word, "Nana");
  await Z.verifyBackup(r.bytes, { decodeImage });
});
test("strict JSON parser basics", () => {
  assert.deepEqual(Z.parseStrictJSON('{"a":[1,2,{"b":null}],"c":"\\u00e9"}'), { a: [1, 2, { b: null }], c: "é" });
  assert.throws(() => Z.parseStrictJSON('{"a":1,"a":2}'), e => e.code === "bad-json");
  assert.throws(() => Z.parseStrictJSON('{"a":1} x'), e => e.code === "bad-json");
  const o = Z.parseStrictJSON('{"__proto__":{"x":1}}'); assert.equal(({}).x, undefined); assert.equal(Object.getPrototypeOf(o), Object.prototype);
});
