# Speakeasy — installable app (v1.0.0)
McLearn Media LLC · Brandon, MS

This folder is the full Speakeasy app. Put it on any web address and it becomes a real app:
it installs to the home screen on iPhone, iPad, Android, Windows, Mac and Chromebook, and it
keeps talking with no internet.

## What's in here
- `index.html` — the app
- `manifest.webmanifest` — app name, colors and icons (lets devices install it)
- `sw.js` — offline worker (stores the app so it works with no internet)
- `icons/` — home-screen icons

## Put it online (free, about 5 minutes)
Pick one:

**Netlify Drop (easiest)**
1. Go to app.netlify.com/drop
2. Drag this whole folder onto the page.
3. You get a web address right away. Sign up (free) to keep it and rename it, for example `speakeasy-mclearn.netlify.app`.

**GitHub Pages**
1. Make a new repository, upload everything in this folder.
2. Settings → Pages → deploy from the main branch.

**Your own site (McLearn Media Central)**
Upload the folder to a subfolder such as `yoursite.com/speakeasy/`. It must be served over https.

## Install it on a device
- **iPhone / iPad:** open the web address in Safari → Share → Add to Home Screen.
- **Android / Chromebook:** open it in Chrome → menu → Install app.
- **Windows / Mac:** open it in Chrome or Edge → install icon in the address bar.

Open it once while online. After that it works offline.

## Updating
When you change the app, also change the `VERSION` line at the top of `sw.js`
(for example `speakeasy-v1.0.1`). Devices pick up the new version the next time they open it online.

## Good to know
- Everyone's words, photos and settings stay on their own device. Nothing is sent to McLearn Media.
- Use Settings → backup file to move a person's words to a new device.
- Real bird photos come from Wikimedia Commons and need internet the first time each one is shown;
  after that they're stored for offline use. Drawings always work.
- The Claude preview link can't install or work offline. That's a limit of the preview, not the app.
  Families should use the web address from the steps above.
