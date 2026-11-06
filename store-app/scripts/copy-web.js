// Copies the Communara web app into www/ so the store app carries every screen, word and picture inside it
// and works with no internet from the very first launch (Apple checks this).
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "..", ".."), OUT = path.resolve(__dirname, "..", "www");
const FILES = ["index.html", "zipbackup.js", "manifest.webmanifest", "privacy.html", "privacy-es.html"];
const DIRS = ["fonts", "icons", "symbols", "photos", "schemas"];
fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
for (const f of FILES) fs.copyFileSync(path.join(ROOT, f), path.join(OUT, f));
for (const d of DIRS) if (fs.existsSync(path.join(ROOT, d))) fs.cpSync(path.join(ROOT, d), path.join(OUT, d), { recursive: true });
// The offline worker (sw.js) is for the website only: inside the app every file is already on the phone.
let html = fs.readFileSync(path.join(OUT, "index.html"), "utf8");
const before = html;
html = html.replace('navigator.serviceWorker.register("sw.js")', '(window.Capacitor ? Promise.resolve() : navigator.serviceWorker.register("sw.js"))');
if (html === before) throw new Error("Could not find the offline-worker line in index.html; update copy-web.js");
fs.writeFileSync(path.join(OUT, "index.html"), html);
console.log("Copied Communara into", OUT);
