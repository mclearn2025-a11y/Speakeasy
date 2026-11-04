# Migration Plan — Existing Speakeasy to 2.0

## Baseline facts (corrected Nov 2, 2026 against the live app)
The first 2.0 package used an old v0.5 copy of the app as its starting point. The live app is Speakeasy 1.16.0 (Oct 19, 2026), from github.com/mclearn2025-a11y/speakeasy. 2.0 work starts from 1.16.0.
- Mostly a single-file HTML/CSS/JavaScript app (`index.html`), with its offline worker `sw.js`, built-in fonts, symbols, photos and, from 2.0.0-dev.2, `zipbackup.js`.
- Already has several people per device: a registry in localStorage `speakeasy.people`; the first person keeps `speakeasy.v1`, others use `speakeasy.v1:<id>`.
- IndexedDB `speakeasy` (stores `kv` and `points`) holds each person's state and restore points. IndexedDB `speakeasy-signs` (store `v`) holds filmed signs as video Blobs, keyed `<personId>|<wordId>`.
- Personal photos are stored inside the person's state as JPEG data URLs on each added word (`custom[group][n].img`).
- The legacy backup is JSON (`kind: speakeasy-backup`, `version: 1`) holding the state and, since 1.15, signs as data URLs. Its restore replaces the current person, after saving a restore point.
- Already has: three levels, a level check, 2,306 words in English and Spanish, three picture styles, topic pages, family nicknames, filmed signs, a Help card with three contacts, caregiver lock (2-second hold), dashboard, guides, persistent-storage request, restore points.
- Version labels: the app reports `Speakeasy 1.16.0`; the About text still says v1.9 and the README stops at v1.9. Reconcile before release.

## Safe migration sequence
1. Freeze and checksum the current source; retain it as a rollback artifact.
2. Build a feature inventory and automated smoke tests against current behavior.
3. Reconcile version number and supported browser/device matrix.
4. Add a versioned IndexedDB schema alongside the existing `speakeasy` database; do not delete old stores.
5. Implement read-only legacy extraction and validate it before any writes.
6. Convert the legacy state into one new profile in a staging area; preserve IDs and board positions where possible.
7. Compare word counts, hidden words, custom topics, media, voice/access settings, help card and learned data before committing.
8. Keep the original legacy state untouched until the user has verified the migrated profile and exported a new backup.
9. Introduce profile switching and caregiver-area navigation without changing the default board motor plan.
10. Implement ZIP export, strict verifier, staged restore and fallback recovery as independent tested modules.
11. Add a rollback route and a recovery test matrix before enabling migration for real users.

## Do not ship until
- Legacy migration is tested on copies of real-world backups, including malformed and old-format backups.
- Existing board vocabulary and positions are preserved.
- Message retention and undo work across all navigation and speech paths.
- Photos and recorded media survive backup/restore.
- ZIP bomb/path traversal/duplicate-entry/symlink/CRC/media mismatch cases are rejected before writes.
- Corrupt restore leaves all existing profiles unchanged.
- Offline install and speech fallback are tested on target iOS and Android browsers.
- Accessibility is reviewed with actual switch scanning and keyboard/screen-reader workflows.
- Privacy notice, consent, data deletion/export and security review are complete.
