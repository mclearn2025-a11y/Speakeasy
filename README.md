# Speakeasy — installable app (v1.6.0)
McLearn Media LLC · Brandon, MS

This folder is the full Speakeasy app. Put it on any web address and it becomes a real app:
it installs to the home screen on iPhone, iPad, Android, Windows, Mac and Chromebook, and it
keeps talking with no internet.

## New in v1.6
- **32 new symbols drawn by McLearn Media** in the same style as Mulberry: every feeling word (tired, bored, silly, nervous, proud, lonely…), yes, no, like, love, and the people words I, me, you, he, she, we, they, my, your, plus that and here. 390 of 548 words now have a matching symbol.
- **Privacy policy**: in the app (Settings → About) and at `privacy.html` for the website and app stores.
- **No outside requests**: fonts are stored with the app (`fonts/`, SIL Open Font License) and the online photo lookup is off. Tested: the hosted app contacts no other company.

## New in v1.5
- **Clear word pictures**: 353 words now use symbols drawn for talking apps (Mulberry Symbols), matched to each word by hand and checked by eye. Confusing matches were left out (British pants, Christmas crackers, a British police helmet).
- **Better emoji** for the rest: stop 🛑, you 🫵, here 👇, please 🥺, and more. Small words like *it*, *is* and *do* show just the word, as speech therapists often do.
- **Settings → Word pictures**: switch between talking-app symbols and emoji.
- Symbols are stored with the app and work offline. Credit: Mulberry Symbols © Steve Lee, CC BY-SA 4.0 (see `symbols/LICENSE.txt`).

## New in v1.4
- **Three emergency contacts** with name, who they are, phone, email and a video call link (FaceTime or Zoom). The red Help card shows each one with one-tap Call, Text, Video and Email buttons, and says who to call out loud, reading phone numbers digit by digit.
- **Home address** stays hidden unless a caregiver turns it on. **Location** can be added to Help texts and emails, only if turned on and allowed by the device.
- **About me phrases**: "My name is…", "Mom's phone number is…", "Please call my mom." appear at the top of Phrases.
- **Help practice**: a short game that teaches what to do when lost — show the Help card, pick a safe helper, say your name and a phone number. It never really calls anyone.
- Old single emergency contacts move into Contact 1 automatically. Guides, Questions and the Dashboard cover the new features.
- `_headers` for Cloudflare Pages: the app shell is always checked for updates; photos are cached for 30 days.

## New in v1.3.2
- **Questions**: a third tab in How to use. Type a question ("no sound", "add a photo", "Nana") and get a ready-made answer with a button that goes straight to the fix. 47 answers covering every part of the app; works offline. If nothing matches, it shows every topic and the McLearn Media support email.
- **Guides updated** for profiles, levels, topic pages, family names, Show and hide, Big picture and games. Steps for hidden features stay out of the way.

## New in v1.3.1
- **Big picture**: on any topic page, choose what a tap does — just say the word, or say it and show the whole picture big on a clean screen. Tap anywhere to close.

## New in v1.3
- **12 topic pages to pick in each profile**, each with real photos, names, fun facts, groups and its own game: Birds, Dogs, Things that go, Trees, U.S. states, Houses and buildings, Dinosaurs, Sea animals, Space, Bugs, Sports and Musical instruments (440 items, 419 with real photos).
- **Their own topic**: type anything ("Tractors") in the profile and it gets its own page for your words and photos.
- **Family nicknames**: type what they call each family member (Nana, Paw Paw, Mommy). Speakeasy says that name, and the button can show it alone or with the usual word underneath.
- **Show and hide**: caregivers can turn off any page or tool, or keep only one thing, and turn everything back on anytime. The settings gear always stays.
- **Cleaner topic pages**: the button bar sits on its own row, so it never covers the pictures.
- Topic pack content lives in `tools/packs.txt`; photos are refreshed by the GitHub Action.

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

**Cloudflare Pages (recommended — updates itself from GitHub)**
1. Sign in at dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git.
2. Pick the `Speakeasy` repository. Framework preset: **None**. Build command: leave empty. Build output directory: `/`.
3. Save and Deploy. Every new version pushed to GitHub goes live by itself.
4. Optional: Custom domains → add something like `speakeasy.mclearnmedia.com`.

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
