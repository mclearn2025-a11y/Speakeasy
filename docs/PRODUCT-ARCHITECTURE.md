# Speakeasy 2.0 Product Architecture

## Product promise
**Communication first.** My Words is the default destination. Explore and Help remain one step away. Setup and maintenance live in a separate Caregiver Area. Communication remains available without finishing an activity or navigating through setup.

## Primary navigation
- My Words — default landing screen; stable communication board and message composer.
- Explore — optional vocabulary learning and practice; always offers a direct return to My Words.
- Help — communication partner guidance and a view-only communication card.
- Caregiver Area — setup, maintenance, profile management, backup, privacy, and support.

## Caregiver Area sections
1. Person & Words — profiles, personal words, phrases, photos, vocabulary and layout customization.
2. Display & Access — board size, button size, text, contrast, animation, touch timing, switch and scanning access.
3. Voice & Message Behavior — voice, language, rate, speak-on-selection, and message retention.
4. Help & Communication Card — trusted contacts, card details, emergency communication, preview and print.
5. Backup & Privacy — backup status, export, strict restore, privacy and profile deletion.
6. Guides & App Support — setup guides, partner guidance, troubleshooting, version and feedback.

## Non-negotiable interaction rules
- Never auto-reorder vocabulary or change established button locations during an update.
- Keep permanent IDs for built-in words, personal words, profiles, and media.
- Preserve unfinished messages when navigating, speaking, or leaving activities.
- Clearing a message requires an explicit action and offers undo.
- A user can access everyday communication without caregiver authorization.
- Viewing the Help Card is distinct from editing its contact details.
- Practice activities are optional and must not block communication.
- Do not label people by beginner/intermediate/advanced ability.
- Preview layout changes and provide undo before applying them.

## Data model boundaries
1. Built-in content: versioned, reinstallable vocabulary, illustrations, topic packs and guides.
2. Personal profile: identity display name, language, personal vocabulary, board layout, access and voice settings.
3. Personal media and support data: photos, recorded signs, contacts and communication card; sensitive and included only in a full-profile backup.
4. Optional activity history: separate and opt-in; never treated as diagnosis or proof of progress.
5. External backup: independent of browser storage.

Use IndexedDB for structured data and media Blobs. Keep built-in defaults separate from personal overrides. Browser storage is not a backup. Request persistent storage where available but never promise it. Storage-full and private-browsing conditions must be explained without deleting the last known-good save.
