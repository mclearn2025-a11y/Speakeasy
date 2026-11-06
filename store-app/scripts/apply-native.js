// Puts the SpeakerVoice plugin into the iOS and Android projects that `npx cap add` creates.
const fs = require("fs"), path = require("path");
const HERE = path.resolve(__dirname, "..");
const copy = (from, to) => { fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(from, to); console.log("  ", path.relative(HERE, to)); };
// iOS
const ios = path.join(HERE, "ios", "App", "App");
if (fs.existsSync(ios)) {
  copy(path.join(HERE, "native/ios/SpeakerVoicePlugin.swift"), path.join(ios, "SpeakerVoicePlugin.swift"));
  copy(path.join(HERE, "native/ios/CommunaraViewController.swift"), path.join(ios, "CommunaraViewController.swift"));
  const sb = path.join(ios, "Base.lproj", "Main.storyboard");
  if (fs.existsSync(sb)) {
    let x = fs.readFileSync(sb, "utf8");
    x = x.replace(/customClass="CAPBridgeViewController" customModule="Capacitor"/, 'customClass="CommunaraViewController" customModule="App" customModuleProvider="target"');
    fs.writeFileSync(sb, x); console.log("   Main.storyboard now uses CommunaraViewController");
  }
  const plist = path.join(ios, "Info.plist");
  if (fs.existsSync(plist)) {
    let x = fs.readFileSync(plist, "utf8");
    if (!x.includes("NSMicrophoneUsageDescription")) {
      // iPhones only let an app pick the built-in speaker while headphones are in if its sound session also allows recording.
      // Communara never records; iOS may still ask once. If the person says no, Speak plays in the headphones instead.
      x = x.replace(/<dict>/, '<dict>\n\t<key>NSMicrophoneUsageDescription</key>\n\t<string>Communara uses this only so the Speak button can talk through the phone speaker while headphones are connected. Nothing is recorded.</string>');
      fs.writeFileSync(plist, x); console.log("   Info.plist: added the speaker-routing explanation");
    }
  }
  console.log("   iOS: in Xcode, drag the two .swift files into the App group once if they are not listed (Add to target: App).");
}
// Android
const android = path.join(HERE, "android", "app", "src", "main");
if (fs.existsSync(android)) {
  const pkg = path.join(android, "java", "com", "mclearnmedia", "communara");
  copy(path.join(HERE, "native/android/SpeakerVoicePlugin.java"), path.join(pkg, "SpeakerVoicePlugin.java"));
  copy(path.join(HERE, "native/android/MainActivity.java"), path.join(pkg, "MainActivity.java"));
  const man = path.join(android, "AndroidManifest.xml");
  let m = fs.readFileSync(man, "utf8");
  if (!m.includes("MODIFY_AUDIO_SETTINGS")) {
    m = m.replace("</manifest>", '    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />\n</manifest>');
    fs.writeFileSync(man, m); console.log("   AndroidManifest: added MODIFY_AUDIO_SETTINGS");
  }
}
