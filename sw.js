/* Speakeasy offline worker — McLearn Media.
   The app must keep talking with no internet, so the page and its icons are stored on install.
   Page: network first (updates arrive), stored copy when offline.
   Fonts and bird photos: stored as they're used, so they keep working offline. */
const VERSION = "speakeasy-v1.16.0";
const CORE = VERSION + "-core", RUNTIME = VERSION + "-runtime", PHOTOS = VERSION + "-photos";
const SHELL = ["./", "index.html", "privacy.html", "privacy-es.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png",
  "fonts/fonts.css", "fonts/atkinson-400.woff", "fonts/atkinson-700.woff", "fonts/hanken-var.woff", "fonts/fraunces-600.woff"];
const MAX_PHOTOS = 400;
// pictures and topic photos live in their own store, so app updates don't download them again.
// Change MEDIA only when the picture or photo files themselves change.
const MEDIA = "speakeasy-media-1";

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CORE).then(async c => {
    await c.addAll(SHELL);
    // v1.15: pictures and topic photos are no longer all stored here. The app asks for just the ones
    // this person uses (see "keep" below), so the first download is small.
  }).then(() => self.skipWaiting()));
});
// the app sends the pictures and photos this person uses; store each one so it works offline
self.addEventListener("message", e => {
  const list = e.data && Array.isArray(e.data.keep) ? e.data.keep.filter(u => typeof u === "string" && /^(symbols|photos)\/[\w.-]+$/.test(u)) : [];
  if (!list.length) return;
  e.waitUntil(caches.open(MEDIA).then(async c => { for (const u of list) { try { if (!(await c.match(u))) await c.add(u); } catch {} } }));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => !k.startsWith(VERSION) && k !== MEDIA).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

async function trim(name, max){
  const c = await caches.open(name), keys = await c.keys();
  for (let i = 0; i < keys.length - max; i++) await c.delete(keys[i]);
}
async function networkFirst(req, cacheName, fallback){
  const c = await caches.open(cacheName);
  try {
    const res = await fetch(req);
    if (res && (res.ok || res.type === "opaque")) c.put(fallback || req, res.clone());
    return res;
  } catch {
    return (await c.match(fallback || req)) || (await caches.match(fallback || req)) || Response.error();
  }
}
async function cacheFirst(req, cacheName, max){
  const c = await caches.open(cacheName), hit = await c.match(req);
  if (hit) return hit;
  try {
    const res = await fetch(req);
    if (res && (res.ok || res.type === "opaque")) { await c.put(req, res.clone()); if (max) trim(cacheName, max); }
    return res;
  } catch { return Response.error(); }
}

self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const u = new URL(req.url);
  if (req.mode === "navigate") { e.respondWith(networkFirst(req, CORE, "index.html")); return; }
  if (u.origin === location.origin && /\/(symbols|photos)\//.test(u.pathname)) { e.respondWith(cacheFirst(req, MEDIA)); return; }
  if (u.origin === location.origin) { e.respondWith(cacheFirst(req, CORE)); return; }
  if (u.hostname === "fonts.googleapis.com" || u.hostname === "fonts.gstatic.com") { e.respondWith(cacheFirst(req, RUNTIME)); return; }
  if (u.hostname === "upload.wikimedia.org") { e.respondWith(cacheFirst(req, PHOTOS, MAX_PHOTOS)); return; }
  if (u.hostname === "en.wikipedia.org" || u.hostname === "commons.wikimedia.org") { e.respondWith(networkFirst(req, RUNTIME)); return; }
});
