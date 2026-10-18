/* Speakeasy offline worker — McLearn Media.
   The app must keep talking with no internet, so the page and its icons are stored on install.
   Page: network first (updates arrive), stored copy when offline.
   Fonts and bird photos: stored as they're used, so they keep working offline. */
const VERSION = "speakeasy-v1.14.0";
const CORE = VERSION + "-core", RUNTIME = VERSION + "-runtime", PHOTOS = VERSION + "-photos";
const SHELL = ["./", "index.html", "privacy.html", "privacy-es.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png",
  "fonts/fonts.css", "fonts/atkinson-400.woff", "fonts/atkinson-700.woff", "fonts/hanken-var.woff", "fonts/fraunces-600.woff"];
const MAX_PHOTOS = 400;

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CORE).then(async c => {
    await c.addAll(SHELL);
    // store every built-in bird photo too, so the whole app works offline
    try { const j = await (await fetch("photos/credits.json")).json(); await c.addAll(Object.values(j).map(x => "photos/" + x.file)); } catch {}
    try { await c.add("symbols/all.json"); } catch {}
    for (let i = 1; i <= 5; i++) { try { await c.add(`symbols/3d-${i}.json`); } catch {} }
    for (let i = 1; i <= 3; i++) { try { await c.add(`symbols/more-${i}.json`); } catch {} }
  }).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => !k.startsWith(VERSION)).map(k => caches.delete(k))))
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
  if (u.origin === location.origin) { e.respondWith(cacheFirst(req, CORE)); return; }
  if (u.hostname === "fonts.googleapis.com" || u.hostname === "fonts.gstatic.com") { e.respondWith(cacheFirst(req, RUNTIME)); return; }
  if (u.hostname === "upload.wikimedia.org") { e.respondWith(cacheFirst(req, PHOTOS, MAX_PHOTOS)); return; }
  if (u.hostname === "en.wikipedia.org" || u.hostname === "commons.wikimedia.org") { e.respondWith(networkFirst(req, RUNTIME)); return; }
});
