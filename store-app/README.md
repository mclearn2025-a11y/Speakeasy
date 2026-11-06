# Communara store app (App Store and Google Play)

This folder turns the Communara web app into real iPhone/iPad and Android apps with Capacitor.
Every screen, word and picture is packed inside the app, so it works with no internet from the first launch.

## What the store app adds
- **SpeakerVoice:** with headphones connected, games and practice stay in the headphones, but the **Speak**
  button talks through the phone's own speaker so people nearby can hear. Afterward sound goes back to the
  headphones. Caregivers can turn this off in Settings → Language and voice.
- Uses the phone's built-in voices (iOS AVSpeechSynthesizer, Android TextToSpeech).

## Build it (needs a computer; iPhone builds need a Mac with Xcode, or a cloud Mac service such as Codemagic)
1. Install Node.js 20+, then in this folder: `npm install`
2. `npm run copy-web` — copies the app from the repository into `www/`
3. `npm run add-platforms` — creates `ios/` and `android/` and adds SpeakerVoice
4. `npm run open:ios` (Xcode) or `npm run open:android` (Android Studio), then run on a real device
5. After any change to the web app: `npm run sync`

App ID: `com.mclearnmedia.communara` · Name: Communara · Seller: McLearn Media LLC

## Test on real devices before submitting
- Wired headphones, Bluetooth headphones, and none: games play in headphones; Speak plays from the phone speaker.
- iPhone: iOS may ask once for the microphone. Communara never records; it needs this setting only to pick
  the speaker while headphones are in. If someone taps **Don't Allow**, Speak still works, in the headphones.
- Airplane mode: everything still works (Apple checks this).
- Backups: Save backup file and Restore from file still work in the app.

## Still to do before the stores
- App icon and launch screen with the final Communara logo
- Store listing text, screenshots, privacy answers ("Data not collected")
- Free version + one-time full unlock (in-app purchase), per the launch plan
- Apple Developer Program ($99/year) and Google Play Console ($25 once) accounts for McLearn Media LLC

Not built or run yet: this folder was written without Xcode or Android Studio, so the first device build
may need small fixes. © 2026 McLearn Media LLC.
