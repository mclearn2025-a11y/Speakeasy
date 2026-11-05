// End-to-end test of Communara 2.0-dev.2 ZIP backup in headless Chromium (phone size).
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const BASE = process.argv[2]; const OUT = process.argv[3];
const results = []; const ok = (name, cond, extra='') => { results.push((cond?'PASS ':'FAIL ')+name+(extra?' — '+extra:'')); };
(async () => {
  process.on('unhandledRejection', e => { console.log(results.join('\n')); console.log('CRASH', String(e).slice(0,300)); process.exit(1); });
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport:{width:390,height:844}, deviceScaleFactor:2, acceptDownloads:true, hasTouch:true });
  const page = await ctx.newPage(); const errors = [];
  page.on('pageerror', e => errors.push(String(e))); page.on('console', m => { if (m.type()==='error') errors.push(m.text()); });
  await page.addInitScript(() => {
    window.speechSynthesis && (window.speechSynthesis.speak = () => {});
    if (!localStorage.getItem('speakeasy.v1')) localStorage.setItem('speakeasy.v1', JSON.stringify({
      guideSeen:true, profileAsked:true, modeSet:true, settings:{lock:false, lvl:2, pics:'emoji', pics3dIntro:true},
      profile:{name:'Jordan', avatar:'🦊', age:'', interests:['trucks']},
      help:{contacts:[{name:'Mom',relation:'mother',phone:'601-555-0100',email:'',video:''}]},
      topics:[{id:'t-abc',name:'Trucks',sym:'🚚'}] }));
  });
  await page.goto(BASE + '/index.html'); await page.waitForTimeout(1500);
  // add a photo word and film a sign through the real screens
  const H = { readLS: k => page.evaluate(k => JSON.parse(localStorage.getItem(k)), k),
    signKeys: () => page.evaluate(() => new Promise(res => { const r = indexedDB.open('speakeasy-signs'); r.onsuccess = () => { const t = r.result.transaction('v','readonly').objectStore('v').getAllKeys(); t.onsuccess = () => res(t.result.map(String)); }; })) };
  await page.click('#gearBtn'); await page.waitForTimeout(500);
  await page.evaluate(() => document.querySelector('[data-view="all"]')?.click()); await page.waitForTimeout(300);
  const grp = await page.evaluate(() => { const sel = document.getElementById('e-tab'); const o = [...sel.options].find(o => o.value === 't-abc') || [...sel.options].find(o => o.value !== 'core'); sel.value = o.value; sel.dispatchEvent(new Event('change', {bubbles:true})); return o.value; });
  await page.waitForTimeout(300); await page.fill('#n-label', 'Nana'); await page.setInputFiles('#n-img', path.join(__dirname, 'nana.jpg')); await page.waitForTimeout(800);
  await page.click('#n-add'); await page.waitForTimeout(400);
  await page.click('[aria-label="Sign for Nana"]'); await page.waitForTimeout(400);
  await page.setInputFiles('input[data-f="1"]', path.join(__dirname, 'sign.mp4')); await page.waitForTimeout(1200);
  const main0 = await H.readLS('speakeasy.v1'); const nana = Object.values(main0.custom).flat().find(x => x.label === 'Nana');
  ok('photo word added through the app', !!(nana && nana.img && nana.img.startsWith('data:image/jpeg')));
  const sk0 = await H.signKeys(); ok('sign filmed through the app', sk0.some(k => k === 'main|' + nana.id), sk0.join(','));
  await page.evaluate(() => document.querySelector('.sheet')?.remove());
  // open Settings and save a backup file through the real button
  await page.click('#gearBtn'); await page.waitForTimeout(500);
  const [dl] = await Promise.all([ page.waitForEvent('download'), page.click('#b-file') ]);
  const zipPath = path.join(OUT, dl.suggestedFilename()); await dl.saveAs(zipPath);
  ok('backup downloads as .zip', /^communara-backup-\d{4}-\d\d-\d\d\.zip$/.test(dl.suggestedFilename()), dl.suggestedFilename());
  const zbytes = fs.readFileSync(zipPath); ok('file starts with PK', zbytes[0]===0x50 && zbytes[1]===0x4B);
  const listing = require('child_process').execSync('unzip -l ' + JSON.stringify(zipPath)).toString();
  ok('zip has manifest, profile, photo, sign', /manifest\.json/.test(listing) && /profiles\/main\.json/.test(listing) && /media\/m1\.jpg/.test(listing) && /media\/m2\.mp4/.test(listing), listing.split('\n').filter(l=>/\//.test(l)||/manifest/.test(l)).map(l=>l.trim().split(/\s+/).pop()).join(', '));
  const testZip = require('child_process').spawnSync('unzip', ['-tq', zipPath]).stdout.toString().trim(); ok('standard unzip tool reads it with no errors', /No errors/.test(testZip), testZip);
  const manifestText = require('child_process').execSync('unzip -p ' + JSON.stringify(zipPath) + ' manifest.json').toString();
  ok('manifest has no name, phone or words', !/Jordan|Mom|601-555|Nana|truck/.test(manifestText));
  const peopleBefore = (await H.readLS('speakeasy.people')).list.length; const mainBefore = await H.readLS('speakeasy.v1');

  // restore it through the real file picker: should become a NEW person, original untouched
  await page.evaluate(() => document.querySelector('.sheet')?.remove()); await page.click('#gearBtn'); await page.waitForTimeout(400);
  await page.setInputFiles('#b-pick', zipPath); await page.waitForSelector('.restore-review', {timeout:15000});
  await page.screenshot({ path: path.join(OUT, 'review.png') });
  const reg = await H.readLS('speakeasy.people'); const mainAfter = await H.readLS('speakeasy.v1');
  const after = { n: reg.list.length, active: reg.active, names: reg.list.map(x=>x.name), review: await page.evaluate(() => document.querySelector('.restore-review').innerText) };
  const strip = o => { const c = JSON.parse(JSON.stringify(o)); delete c.savedAt; return JSON.stringify(c); };
  ok('restore adds exactly one person', after.n === peopleBefore + 1, JSON.stringify(after.names));
  ok('current person stays active until caregiver chooses', after.active === 'main');
  ok('existing person unchanged', strip(mainAfter) === strip(mainBefore));
  ok('same name gets (restored)', after.names.includes('Jordan (restored)'));
  ok('review lists photos and signs', /Photos\s*1/.test(after.review) && /Filmed signs\s*1/.test(after.review), after.review.replace(/\n+/g,' | ').slice(0,300));
  // switch and check the data came back exactly
  await page.click('#rvSwitch'); await page.waitForTimeout(800);
  const reg2 = await H.readLS('speakeasy.people'); const nid = reg2.active; const st2 = await H.readLS('speakeasy.v1:' + nid);
  const it2 = Object.values(st2.custom).flat().find(x => x.label === 'Nana'); const sk2 = await H.signKeys();
  ok('switched to restored person', nid !== 'main' && st2.profile.name === 'Jordan (restored)', nid + ' ' + st2.profile.name);
  ok('photo restored byte-for-byte', it2 && it2.img === nana.img);
  ok('filmed sign restored for the new person', sk2.includes(nid + '|' + nana.id) && sk2.includes('main|' + nana.id), sk2.join(','));
  ok('topics, contacts and settings restored', st2.help.contacts[0].phone === '601-555-0100' && st2.topics.length === 1 && st2.settings.lvl === mainBefore.settings.lvl);
  await page.screenshot({ path: path.join(OUT, 'after-switch.png') });

  // damaged copies: nothing may change
  const bad = Buffer.from(zbytes); const mid = bad.indexOf(Buffer.from('mdat')); bad[mid+10] ^= 0xFF; const badPath = path.join(OUT, 'damaged.zip'); fs.writeFileSync(badPath, bad);
  const before2 = await page.evaluate(() => ({ reg: localStorage.getItem('speakeasy.people'), keys: Object.keys(localStorage).sort().join(',') }));
  await page.click('#gearBtn'); await page.waitForTimeout(400); await page.setInputFiles('#b-pick', badPath);
  await page.waitForSelector('.restore-fail', {timeout:15000}); await page.screenshot({ path: path.join(OUT, 'failed.png') });
  const failTxt = await page.evaluate(() => document.querySelector('.restore-fail').innerText);
  const after2 = await page.evaluate(() => ({ reg: localStorage.getItem('speakeasy.people'), keys: Object.keys(localStorage).sort().join(',') }));
  ok('damaged backup shows the failure screen', /couldn.t restore/i.test(failTxt) && /have not been changed/.test(failTxt));
  ok('damaged backup changes nothing', after2.reg === before2.reg && after2.keys === before2.keys);
  ok('failure screen has all three choices', /Try another copy/.test(failTxt) && /earlier backup/.test(failTxt) && /Return to My Words/.test(failTxt));
  await page.click('#rfHome');

  // a non-image pretending to be a photo
  const fake = await page.evaluate(async () => {
    const u = new Uint8Array([0xFF,0xD8,0xFF,0xE0, 1,2,3,4,5,6,7,8,9,10]);   // starts like a JPEG but is not one
    const st = {settings:{}, profile:{}, help:{}, custom:{core:[{id:'x', label:'x', img: SpeakeasyZip.bytesToDataUrl(u,'image/jpeg')}]}};
    const r = await SpeakeasyZip.buildBackup({profileId:'main', state:st, signs:new Map(), appVersion:'2.0.0-dev.2'});
    try { await SpeakeasyZip.verifyBackup(r.bytes); return 'accepted'; } catch(e){ return e.code; } });
  ok('fake photo is caught by real image decoding', fake === 'media', fake);

  // old .json backups still restore (into the current person, as in 1.16, with a restore point first)
  await page.click('#gearBtn'); await page.waitForTimeout(400);
  await page.evaluate(async () => { document.querySelector('[data-view="all"]')?.click(); document.getElementById('b-copy').click(); });
  await page.waitForTimeout(500); const legacyText = await page.evaluate(() => document.getElementById('b-text').value);
  const legacyPath = path.join(OUT, 'legacy.json'); fs.writeFileSync(legacyPath, legacyText); ok('old-style backup text still available', /speakeasy-backup/.test(legacyText));
  await page.evaluate(() => document.querySelector('.sheet')?.remove());
  const nBeforeLegacy = (await H.readLS('speakeasy.people')).list.length; const activeBeforeLegacy = (await H.readLS('speakeasy.people')).active;
  const activeStateBefore = await H.readLS(activeBeforeLegacy === 'main' ? 'speakeasy.v1' : 'speakeasy.v1:' + activeBeforeLegacy);
  await page.click('#gearBtn'); await page.waitForTimeout(400); await page.setInputFiles('#b-pick', legacyPath);
  await page.waitForSelector('.restore-review', {timeout:15000});
  const regL = await H.readLS('speakeasy.people'); const activeStateAfter = await H.readLS(activeBeforeLegacy === 'main' ? 'speakeasy.v1' : 'speakeasy.v1:' + activeBeforeLegacy);
  const strip2 = o => { const c = JSON.parse(JSON.stringify(o)); delete c.savedAt; return JSON.stringify(c); };
  ok('old .json backup restores as a new person', regL.list.length === nBeforeLegacy + 1 && regL.active === activeBeforeLegacy);
  ok('old .json restore leaves the current person unchanged', strip2(activeStateAfter) === strip2(activeStateBefore));
  const newL = regL.list[regL.list.length - 1].id; const stL = await H.readLS('speakeasy.v1:' + newL); const skL = await H.signKeys();
  const itL = Object.values(stL.custom).flat().find(x => x.label === 'Nana');
  ok('old backup text brings back the photo', !!(itL && itL.img === nana.img), itL ? (itL.img||'').slice(0,40) : 'no Nana word');
  await page.click('#rvStay');
  // a 1.15/1.16 backup file with a filmed sign inside (signs saved as data URLs)
  const leg = JSON.parse(legacyText); const anyWord = Object.values(leg.state.custom).flat()[0];
  leg.signs = { [anyWord.id]: 'data:video/mp4;base64,' + fs.readFileSync(path.join(__dirname, 'sign.mp4')).toString('base64') };
  const legSignsPath = path.join(OUT, 'legacy-with-sign.json'); fs.writeFileSync(legSignsPath, JSON.stringify(leg));
  await page.click('#gearBtn'); await page.waitForTimeout(400); await page.setInputFiles('#b-pick', legSignsPath);
  await page.waitForSelector('.restore-review', {timeout:15000});
  const regS = await H.readLS('speakeasy.people'); const newS = regS.list[regS.list.length - 1].id; const skS = await H.signKeys();
  ok('1.16 backup file with a filmed sign restores the sign', skS.includes(newS + '|' + anyWord.id), skS.join(','));
  await page.click('#rvStay');
  // pasted backup text goes through the same safe path; junk text is refused with nothing changed
  await page.click('#gearBtn'); await page.waitForTimeout(400);
  await page.evaluate(() => { document.querySelector('[data-view="all"]')?.click(); document.getElementById('b-text').value = '{"kind":"speakeasy-backup","version":1,"state":{"settings":{},"settings":{}}}'; document.getElementById('b-restore').click(); });
  await page.waitForSelector('.restore-fail', {timeout:15000});
  ok('pasted text with duplicate keys is refused', (await H.readLS('speakeasy.people')).list.length === regS.list.length);
  await page.click('#rfHome');
  await page.click('#gearBtn'); await page.waitForTimeout(400);
  await page.evaluate(() => { document.querySelector('[data-view="all"]')?.click(); document.getElementById('b-text').value = '{"kind":"speakeasy-backup","version":7,"state":{"settings":{}}}'; document.getElementById('b-restore').click(); });
  await page.waitForSelector('.restore-fail', {timeout:15000});
  ok('backup from a newer version gets the newer-version message', /newer Communara/.test(await page.evaluate(() => document.querySelector('.restore-fail').innerText)));
  await page.click('#rfHome');

  // unfinished message survives a reload, and clearing can be undone
  await page.evaluate(() => document.querySelectorAll('.sheet').forEach(x => x.remove()));
  const tiles = page.locator('#board button[data-act="tile"]'); await tiles.nth(1).click(); await tiles.nth(2).click(); await page.waitForTimeout(300);
  const before = await page.evaluate(() => document.getElementById('msg').innerText.trim());
  await page.reload(); await page.waitForTimeout(1800);
  const afterReload = await page.evaluate(() => document.getElementById('msg').innerText.trim());
  ok('unfinished message kept after reload', before.length > 0 && afterReload === before, JSON.stringify([before, afterReload]));
  await page.click('#clrBtn'); await page.waitForTimeout(200);
  ok('clear empties the message', !(await page.evaluate(() => document.querySelectorAll('#msg .chip').length)));
  await page.click('.undoclr'); await page.waitForTimeout(200);
  ok('undo clear brings it back', (await page.evaluate(() => document.getElementById('msg').innerText.trim())) === before);
  const msgKeys = await page.evaluate(() => Object.keys(localStorage).filter(k => k.startsWith('speakeasy.msg.')));
  ok('message is stored on its own, outside backups', msgKeys.length >= 1, msgKeys.join(','));

  // caregiver PIN
  await page.click('#gearBtn'); await page.waitForTimeout(400);
  await page.evaluate(() => { document.querySelector('[data-view="all"]')?.click(); document.getElementById('l-pin').click(); });
  await page.waitForSelector('#peA'); await page.fill('#peA', '2468'); await page.fill('#peB', '2468'); await page.click('#peSave'); await page.waitForTimeout(600);
  const pinStored = await page.evaluate(() => localStorage.getItem('speakeasy.pin'));
  ok('PIN is stored only as a salted hash', pinStored && !pinStored.includes('2468') && /"hash":"[0-9a-f]{64}"/.test(pinStored));
  await page.evaluate(() => document.querySelectorAll('.sheet').forEach(x => x.remove()));
  await page.reload(); await page.waitForTimeout(1800);
  await page.click('#gearBtn'); await page.waitForTimeout(400);
  ok('gear asks for the PIN', await page.locator('#pinIn').count() === 1 && await page.locator('#b-file').count() === 0);
  await page.screenshot({ path: path.join(OUT, 'pin.png') });
  await page.fill('#pinIn', '1111'); await page.click('#pinOk'); await page.waitForTimeout(400);
  ok('wrong PIN keeps settings closed', await page.locator('#b-file').count() === 0 && /isn't right/.test(await page.locator('#pinMsg').innerText()));
  await page.fill('#pinIn', '2468'); await page.click('#pinOk'); await page.waitForTimeout(500);
  ok('right PIN opens settings', await page.locator('#b-file').count() === 1);
  await page.evaluate(() => document.querySelectorAll('.sheet').forEach(x => x.remove()));
  await page.reload(); await page.waitForTimeout(1800);
  await page.click('#helpBtn'); await page.waitForTimeout(500);
  ok('Help card opens without the PIN', await page.locator('#pinIn').count() === 0 && await page.locator('.helpcard').count() > 0);
  await page.evaluate(() => document.querySelectorAll('.sheet, .helpcard').forEach(x => x.remove()));
  // forgot the PIN: grown-up question, 20-second wait, then turn it off
  await page.click('#gearBtn'); await page.waitForTimeout(400); await page.click('#pinForgot'); await page.waitForTimeout(300);
  const q = await page.evaluate(() => document.querySelector('label[for], .pin-sheet label').textContent); const mm = q.match(/(\d+)\s*×\s*(\d+)/);
  await page.fill('#fpIn', String(+mm[1] * +mm[2])); await page.click('#fpOk'); await page.waitForSelector('#peA', {timeout:30000});
  await page.click('#peOff'); await page.waitForTimeout(600);
  ok('forgot-PIN path lets a grown-up turn the PIN off', (await page.evaluate(() => localStorage.getItem('speakeasy.pin'))) === null);
  await page.evaluate(() => document.querySelectorAll('.sheet').forEach(x => x.remove()));

  // replace someone with a backup: deliberate, tap twice, restore point first, the extra person goes away
  const regR0 = await H.readLS('speakeasy.people'); const target = regR0.list[0].id;
  await page.click('#gearBtn'); await page.waitForTimeout(400); await page.setInputFiles('#b-pick', zipPath);
  await page.waitForSelector('.restore-review', {timeout:15000}); await page.click('#rvReplace'); await page.waitForSelector('.replace-sheet');
  const btn = page.locator(`[data-rp="${target}"]`); await btn.click(); await btn.click(); await page.waitForTimeout(1500);
  const regR1 = await H.readLS('speakeasy.people'); const stR = await H.readLS(target === 'main' ? 'speakeasy.v1' : 'speakeasy.v1:' + target);
  const skR = await H.signKeys(); const itR = Object.values(stR.custom).flat().find(x => x.label === 'Nana');
  const pts = await page.evaluate(() => new Promise(res => { const r = indexedDB.open('speakeasy'); r.onsuccess = () => { const t = r.result.transaction('points','readonly').objectStore('points').getAll(); t.onsuccess = () => res(t.result.map(p => [p.pid||'main', p.label])); }; }));
  ok('replace keeps the same number of people', regR1.list.length === regR0.list.length, JSON.stringify(regR1.list.map(x=>x.name)));
  ok('replaced person has the backup words, photo, sign and original name', itR && itR.img === nana.img && skR.includes(target + '|' + nana.id) && stR.profile.name === 'Jordan', stR.profile.name);
  ok('a restore point was saved before replacing', pts.some(([pid, l]) => pid === target && /Before replacing/.test(l)));
  // settings: neutral level names
  await page.click('#gearBtn'); await page.waitForTimeout(500);
  await page.evaluate(() => document.querySelector('[data-view="all"]').click()); await page.waitForTimeout(300);
  const lvlTxt = await page.evaluate(() => document.querySelector('#sec-who .lvls').innerText);
  ok('levels say what they show, not Beginner/Advanced', /12 big words/.test(lvlTxt) && !/Beginner|Middle|Advanced/.test(lvlTxt), lvlTxt.replace(/\n/g,' | ').slice(0,160));
  await page.screenshot({ path: path.join(OUT, 'settings-all.png') });
  await page.evaluate(() => document.querySelectorAll('.sheet').forEach(x => x.remove()));

  // Spanish
  await page.evaluate(() => { const act = JSON.parse(localStorage.getItem('speakeasy.people')).active; const k = act === 'main' ? 'speakeasy.v1' : 'speakeasy.v1:' + act; const st = JSON.parse(localStorage.getItem(k)); st.settings.lang = 'es'; st.savedAt = Date.now() + 60000; localStorage.setItem(k, JSON.stringify(st)); });
  await page.reload(); await page.waitForTimeout(1800);
  await page.click('#gearBtn'); await page.waitForTimeout(400); await page.setInputFiles('#b-pick', badPath); await page.waitForSelector('.restore-fail', {timeout:15000});
  const es = await page.evaluate(() => document.querySelector('.restore-fail').innerText); await page.screenshot({ path: path.join(OUT, 'failed-es.png') });
  ok('failure screen in Spanish', /No pudimos/.test(es), es.slice(0,120));

  ok('no page errors', errors.length === 0, errors.join(' | ').slice(0,400));
  console.log(results.join('\n')); await b.close();
  process.exit(results.some(r=>r.startsWith('FAIL')) ? 1 : 0);
})();
