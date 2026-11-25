# Communara (formerly Speakeasy) 2.0 — build status

Current build: **2.1.0** (Nov 24, 2026), built on the live Speakeasy 1.16.0 (commit 3457c2c). Not released to families yet: it needs testing on real phones and tablets first.

Rule for 2.0: only add what makes the app better. A grouped settings menu was tried in rc.1 and taken back out, because on a phone it pushed the settings a full screen down.

## Added in 2.1.0
- **Level 4: 84 core words** for strong communicators, nested like the others: all 48 Level 3 words stay in the same row and column, and 36 new words (open, close, give, take, see, hear, say, think, know, wait, sit, sleep, wash, read, hot, cold, fast, slow, happy, sad, all, some, who, when, why, how, with, for, to, and, please, thank you, hi, bye, now, later) fill 4 new columns and a seventh row (12 x 7). Each has a new 3D picture, a drawn symbol where one exists, and a Spanish word. Every level still has every word (84). Checked: 0 words move from Level 1→2, 2→3 or 3→4 on phone and iPad. On a phone, Level 4 buttons are about 26 px wide, so the level says it is best on a tablet or computer. The separate "Core board" setting was removed; the level (or "Words on the first screen") decides the layout.
- Spanish "stop" now reads "alto", so it is not confused with the new "for" (para).
- **Progress report for therapists and IEP meetings** (Dashboard → For their therapist or teacher): setup, the last four weeks (words tapped, messages spoken, days used), most used words, and lines for notes. Print it or save it as a file. Built only from data on the device.
- **Weekly backup reminder.** The gear dot and a "Save this week's backup" item at the top of the Menu appear when a week has passed since the last backup file and the family has made anything worth keeping (their name, own words or photos, topics, contacts, filmed signs, or 10+ words used).
- **Code split into separate files**: index.html (page and styles), words-data.js (word data), app.js (the app), zipbackup.js (backups). The offline worker and the store-app copy script include the new files.
- **Content Security Policy** in index.html: only Communara's own scripts can run, and nothing loads from other websites. Leftover rules for Wikipedia photos were removed from the offline worker.
- Tests: 24/24 unit, 43/43 browser backup checks, every menu item and tab opened on phone and laptop with no errors, no security-policy violations.

## Added in 2.0.0 (release build)
- **Words never move between levels (motor planning).** Level 1 is a 3 x 4 board. Level 2 keeps those 12 words in the same row and column and adds 12 to the right (6 x 4). Level 3 keeps all 24 in place and adds 24 to the right and below (8 x 6). Moving up only makes words smaller and adds new ones. Checked: 0 of 12 words move from Level 1 to 2, 0 of 24 from Level 2 to 3, on phone and iPad. The same columns are used in portrait and landscape so spots never change when the device turns.
- **Every core word has a picture.** New 3D pictures for "it" (arrow pointing at a ball), "do" (child hammering), "is" (apple = apple) and a clearer "they" (three children instead of two dark silhouettes). Picture store renamed (MEDIA speakeasy-media-2) so devices fetch the new pictures.
- Version labels say 2.0.0 everywhere (app, offline worker, package).
- Sign-offs still to record outside this code: a speech-language pathologist review, real-device and switch / screen reader checks, and an outside code review.

## Added in 2.0.0-rc.6 (easier to say what they mean)
- **Every level has every word.** The level only decides which core words fill the first screen, big and highlighted with a gold ring: 12 at Level 1, 24 at Level 2, all 48 at Level 3. The rest sit right below under a "More words" bar that stays visible and scrolls to them when tapped. No more empty spaces or half-empty screens, and a hidden word leaves no hole. Every word group is open at every level too (Level 1's everyday groups come first). Practice and the "ready for more?" hint still use the level's own words.
- **The whole board fits the screen.** The "Save to this device" bar used to push the app down, so the bottom row (yes, no) was off the bottom of phones. It is now one short line and the board always fits (checked on 390x844, 375x667, iPad portrait and landscape, laptop).
- **The sentence bar shows the whole sentence.** Words wrap onto a second line and shrink to fit instead of scrolling the start of the sentence out of sight.
- **Buttons say what they do:** Back, Clear, Speak (Atrás, Borrar, Hablar in Spanish).
- **Speaks the way people talk (English):** "I want eat" is spoken as "I want to eat", "I like play" as "I like to play". Only "to" is ever added, only between a wanting word and an action word; "I want help" stays as is, and the bar still shows their own words. On by default; Settings > Voice to turn off.

## Added in 2.0.0-rc.5
- **Nothing goes online for pictures.** Removed the old, switched-off code that could look up bird photos on Wikipedia, and web photo links saved by very old versions are now ignored and cleared. Every photo comes from inside the app. Checked: 45 bird photos show, and the page makes no requests outside the app.
- Project file (`package.json`) now says Communara 2.0.0-rc.5 (it still said Speakeasy rc.2).
- Note on the Nov 23 outside audit: it graded old ZIP copies (v1.16.0 and an older 2.0 package), not this repository. Its points about missing folders, mismatched versions, weak backups and ability-based level names do not apply here. Its points about real-device and assistive-technology testing, an outside code review, and a Content Security Policy still stand (see "Not done yet").

## Added in 2.0.0-rc.4
- **Headphones mode** (Settings → Language and voice). Games and practice stay in the headphones. On the web, Speak also shows the message in big letters with "Take off the headphones so they can hear, or show them this."
- **Store app started** (`store-app/`): Capacitor project for iPhone/iPad and Android with the SpeakerVoice plugin, so in the store app the Speak button talks through the phone's speaker even with headphones on. Not built on a device yet; see `store-app/README.md`.
- The web app is becoming the private admin and testing version (locked with Cloudflare Access); the public will get the store app.

## Added in 2.0.0-rc.3
- **New name: Communara** (tagline: Your thoughts. Your choices. Your way.). Chosen Nov 4, 2026 because other speech and AAC apps and trademarks already use SpeakEasy and Spkeasy. A first web check found no app or trademark named Communara; an attorney still needs to clear it before sale.
- Everything people see now says Communara, in English and Spanish. Saved words, profiles, backups and the web address are unchanged: old Speakeasy backups (.zip and .json) still restore, and new backup files are named communara-backup-DATE.zip.

## Added in 2.0.0-rc.2
- **Phones held sideways:** the whole word board now fits on screen with no scrolling (it used to cut off the bottom rows), with picture and word side by side. Checked on 15 screen sizes from a 320-pixel phone to a 1920-pixel desktop, including tablets, Chromebook and large text: no sideways scrolling, no buttons off screen, settings usable on all (`tests/device-sweep.cjs`).

## Added in 2.0.0-rc.1
- **Level names say what a level shows, not how able the person is:** Level 1 · 12 big words, Level 2 · 24 words, Level 3 · 48 words (were Beginner, Middle, Advanced). Guides, questions and Spanish updated to match.
- **Replace someone with a backup.** After a restore, a caregiver can choose "Replace someone with this backup…", pick a person and tap twice. A restore point of that person is saved first, so it can be undone. Their name stays, the extra restored person is removed. This is the separate, deliberate replace step from the backup contract. It also tidies a new phone, where the empty starting person can be replaced by the restored one.
- Restored names no longer pile up: Jordan (restored), Jordan (restored 2), and so on.
- The settings menu chips now follow the order of the caregiver areas (backups, person and words, display and access, voice, Help card, lock, about, then guides).

## Added in 2.0.0-dev.3
- **Old backups use the safe path too.** 1.x `.json` backup files and pasted backup text are converted to the new format in memory and go through the same strict check. They are added as a new person and never overwrite anyone. Signs saved in 1.15–1.16 backup files come back. Damaged old photos are left out and the review screen says how many. Duplicate keys and backups from a newer version are refused with a clear message.
- **The unfinished message is kept** for each person through reloads, switching people, games and settings. It stays on the device and is never put in backup files. Clearing it can be undone for 15 seconds (↩ Undo clear).
- **Optional caregiver PIN** (Settings → Caregiver lock). 4–8 numbers, for the whole device, stored only as a salted SHA-256 hash. Settings and caregiver tools ask for it, and it stays open for 5 minutes. Talking, the Help card and games never ask. After 5 wrong tries there's a 30-second wait. If the PIN is forgotten, a grown-up question and a 20-second wait let a caregiver choose a new PIN or turn it off. The screens say plainly that it keeps settings from being changed by accident and is not a lock for private information.
- About text now says Speakeasy 2.0 (it still said v1.9).
- Restore points still undo changes for the current person, as before.

## Added in 2.0.0-dev.2
Full-profile ZIP backup, following BACKUP-AND-RECOVERY-CONTRACT.md:
- **Save backup file** now makes `speakeasy-backup-YYYY-MM-DD.zip`: `manifest.json`, `profiles/<id>.json`, and each photo and filmed sign as a real file in `media/`. The manifest holds no names, contacts, words or messages. Every file has a SHA-256 fingerprint.
- **Strict check before anything is saved** (`zipbackup.js`, `verifyBackup`):
  - Stage 1: UTF-8 only, duplicate JSON keys refused, manifest checked against `schemas/backup-manifest-1.json` (JSON Schema 2020-12, date-time format enforced), newer formats refused with a clear message.
  - Stage 2: refuses absolute paths, `..`, backslashes, empty segments, control characters, folder entries, symlinks, executables, nested archives, encryption, unknown compression, ZIP64, multi-part archives, duplicate and look-alike names, overlapping entries; local and central headers must agree; the file list must match the manifest exactly; sizes are counted while decompressing and stopped at the limits (manifest 1 MiB, profile 5 MiB, each media file 100 MiB, 500 MiB total, 10,002 entries); CRC-32 and SHA-256 rechecked; profile checked against `schemas/profile-1.json`; profile id matches; every media file used exactly once with the right role; no data or script URLs hidden in the profile; photos really decoded; videos' MP4/MOV/WebM structure checked; the label must match the real file type.
  - The same checked bytes are used to build the restore draft. Nothing is extracted twice.
- **Restore as a new person, never over anyone.** The draft gets a new id, its signs and state are saved and read back, and only then is the person added to the list. On any failure everything written for the draft is removed. The current person stays active until the caregiver chooses **Switch to …** or **Not now**, after a review of words, photos, signs, topics, contacts, voice, level and language.
- **Damaged backup screen** with the contract wording: *We couldn't restore this backup. Your existing profiles have not been changed.* · Try another copy · Recover from an earlier backup · Return to My Words.
- Old `.json` backups and Copy backup text kept working (in dev.3 they moved to the safe path, see above).
- English and Spanish text for every new screen.

## Tests (rc.1)
- `npm test`: 24 automated tests of the writer and verifier, including every rejection case above and a zip bomb (20 MiB of zeros in a 30 KB file).
- `tests/browser-backup.e2e.cjs`: 43 checks in a real browser at phone size, through the app's own screens: add a photo word, film a sign, save the ZIP, check it with the standard `unzip` tool, restore it as a new person, confirm the original person is byte-for-byte unchanged, switch and confirm photo and sign came back, damaged file changes nothing, a fake photo is caught, old JSON backups and pasted text restore as a new person (with photo and sign), junk and newer-version backups refused, unfinished message kept after a reload, undo clear, PIN stored only as a hash, wrong PIN refused, right PIN opens settings, Help card opens with no PIN, forgot-PIN path, replace a person with a restore point first, neutral level names, Spanish screens, no page errors.
  Run: serve the folder (`python3 -m http.server 8765`), then `node tests/browser-backup.e2e.cjs http://localhost:8765 /tmp/out`.

## Not done yet (from the 2.0 plan)
- Moving the settings sections themselves into six caregiver areas, and My Words / Explore / Help navigation. Left out on purpose for now: it would move things caregivers already know, for no clear gain.
- ~~Content Security Policy~~ Done in 2.1.0 (scripts are separate files now). Styles stay inline, so `style-src` still allows inline styles.
- Splitting app.js further into modules (screens, storage, speech). The first split is done; going further is safer after real-device testing.
- ASL starter signs from ASL Signbank: the site is blocked from the build workspace; add it to the allowed sites and the signs can be pulled in.
- Testing on real iPhones, iPads and Android devices, and in Safari and Firefox. Only headless Chromium was tested here.

## Before release
1. Test on a real iPhone, iPad and Android phone: save a backup, restore it, film a sign, set and forget a PIN, reload with an unfinished message.
2. Have someone who didn't build it review `zipbackup.js` and the restore and PIN code.
3. A speech-language pathologist reviews it for two weeks (Menu → Tell us what you think, or the Dashboard report) and, if it holds up, writes a letter of support.
