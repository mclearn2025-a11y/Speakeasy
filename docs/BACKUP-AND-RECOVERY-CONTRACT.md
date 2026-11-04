# Backup & Recovery Contract — Speakeasy 2.0

## First full-profile ZIP format
One ZIP contains:
- `manifest.json`
- `profiles/<profile-id>.json`
- `media/<media-id>.<extension>`

The manifest carries format/app/schema versions, export type, profile IDs and paths, media inventory, byte sizes, roles and content types, inclusion flags, and optional SHA-256 hashes. It must not expose names, dates of birth, addresses, diagnosis, phone/email, messages, or activity history. Those belong in the profile payload where applicable.

ZIP encryption is not assumed. An ordinary ZIP is not encrypted. Do not invent custom cryptography. If encryption is added later, use a reviewed standard implementation and make password-loss consequences clear.

## V1 scope
- Exactly one full profile per archive.
- No bundled built-in content.
- No partial salvage.
- Restore as a new profile by default.
- Replacement is a separate, explicit caregiver action.
- Manifest format version, application version and profile schema version are distinct.
- Unsupported newer formats are rejected.
- Missing required media rejects normal restore.

## Two-stage verification; no writes before success
### Stage 1 — manifest
- Strict UTF-8 JSON.
- Reject duplicate JSON keys.
- Validate against a versioned JSON Schema (Draft 2020-12).
- Enable date-time format assertion explicitly.
- Reject unknown/unsupported format versions and invalid inclusion flags.

### Stage 2 — archive and payload
- Reject duplicate paths, absolute paths, backslashes, `..`, symlinks, executables, nested archives, unsupported compression/encryption, and ambiguous Unicode/case-fold collisions.
- Check actual decompressed byte counts, not just ZIP metadata.
- Engineering starting limits: manifest 1 MiB; profile 5 MiB; each media object 100 MiB; total decompressed size 500 MiB; at most 10,001 payload entries plus manifest.
- Verify the archive inventory exactly matches the manifest.
- Verify unique IDs and paths; profile ID matches manifest; media references match both manifest and actual files; inclusion flags match actual payload.
- Decode media/container data rather than trusting declared MIME type.
- If SHA-256 is included, recompute and verify it.
- Use the same immutable archive data for verification and staging. Do not validate one copy and then extract an unrestricted second copy.

## Staged restore
1. Verify the archive fully.
2. Build a recovery draft in temporary staging.
3. Assign a new profile ID and remap internal references.
4. Validate profile schema, media decoding, compatibility and references.
5. Commit atomically, or use a recoverable staging/commit protocol across stores.
6. Let caregiver review vocabulary, layout, media, contacts, voice and access settings.
7. Explicitly choose when to switch to the recovered profile.

If preparation fails after staging begins, the staging adapter itself must clean up or return a draft token early enough for cleanup. A failed/cancelled restore must not leave orphan staging data.

## Corrupted backup experience
> We couldn’t restore this backup.  
> Your existing profiles have not been changed.  
> [Try another copy]  
> [Recover from an earlier backup]  
> [Return to My Words]

Both alternate-copy actions use the same strict verifier. Earlier backups create a new profile, never overwrite the current profile. Only promise that existing profiles are unchanged if that guarantee is true.

## Current application compatibility
The existing app uses `speakeasy.v1` in localStorage and an IndexedDB database named `speakeasy` with `kv` and `points` stores. Its existing JSON backup is a legacy format. Do not feed it into the new ZIP importer or silently reinterpret it. A dedicated, tested legacy migration adapter is required.
