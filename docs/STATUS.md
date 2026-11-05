# Speakeasy 2.0 — build status

Current build: **2.0.0-rc.2** (release candidate, Nov 4, 2026), built on the live Speakeasy 1.16.0 (commit 3457c2c). Not released to families yet: it needs testing on real phones and tablets first.

Rule for 2.0: only add what makes the app better. A grouped settings menu was tried in rc.1 and taken back out, because on a phone it pushed the settings a full screen down.

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
- Content Security Policy header (the app still has inline scripts and styles, so this needs a refactor first).
- Testing on real iPhones, iPads and Android devices, and in Safari and Firefox. Only headless Chromium was tested here.

## Before release
1. Test on a real iPhone, iPad and Android phone: save a backup, restore it, film a sign, set and forget a PIN, reload with an unfinished message.
2. Have someone who didn't build it review `zipbackup.js` and the restore and PIN code.
3. Merge `v2-dev` into `main`; Cloudflare then puts it live.
