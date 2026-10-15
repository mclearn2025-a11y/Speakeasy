# Speakeasy — installable app (v1.2.0)
McLearn Media LLC · Brandon, MS

This folder is the full Speakeasy app. Put it on any web address and it becomes a real app:
it installs to the home screen on iPhone, iPad, Android, Windows, Mac and Chromebook, and it
keeps talking with no internet.

## New in v1.2
- **A profile for each person** — name, picture, age group and favorite things. Each person has their own words, voice, level, progress and backups. Tap the name at the top to switch people.
- **Three levels instead of Kids/Adults** — Level 1 Beginner (12 big words), Level 2 Middle (24 words, all groups, keyboard), Level 3 Advanced (48 words, every tool). Levels never delete words, and core words never move. Age group picks age-fitting everyday words.
- **Level check** — about 2 minutes: 3 picture games for the user and 4 questions for the caregiver. It suggests a starting level. It is not a test score or a diagnosis.
- **Real bird photos built in** — 120 of 124 birds, from Wikimedia Commons under free licenses, credited in `photos/CREDITS.md`. They work offline. A GitHub Action (`.github/workflows/bird-photos.yml`) can refresh them.
- **"Ready for more?"** — the Dashboard suggests moving up when someone uses most of their words.

## New in v1.1
- **☰ Menu** — every part of Speakeasy in one place: Talk, Play and learn, How to use, Help, and a Caregivers section.
- **How to use guide** — step-by-step instructions with two tabs: *For the user* (big text, each step can be read aloud, "Show me" points to the button) and *For caregivers* (setup, modeling, safety, with "Take me there" buttons). It opens once on the first visit and anytime from the Menu.
- **Caregiver Dashboard** — setup checklist with progress, words tapped and messages spoken this week, most used words, practice and bird game scores, backup and install status, and the current setup. All numbers stay on the device.
- **Settings shortcuts** — quick buttons at the top of Settings jump to each section.
- **"I" speaks as a word** — some voices said "capital I." Speakeasy now always says it as the word I.
- Caregiver tools in the Menu need a 2-second hold when the caregiver lock is on, just like the gear.

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
