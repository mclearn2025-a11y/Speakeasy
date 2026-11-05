const { chromium } = require('playwright'); const path = require('path');
const OUT = 'process.argv[2] || "/tmp/speakeasy-devices"';
const DEV = [
  ['Small phone (iPhone SE 1st)', 320, 568, true], ['iPhone SE', 375, 667, true], ['iPhone 15', 390, 844, true], ['iPhone Pro Max', 430, 932, true],
  ['Android phone', 412, 915, true], ['Phone landscape', 844, 390, true], ['Small Android landscape', 640, 360, true],
  ['iPad', 768, 1024, true], ['iPad landscape', 1024, 768, true], ['iPad Pro 12.9', 1024, 1366, true], ['Android tablet', 800, 1280, true],
  ['Chromebook', 1366, 768, false], ['Laptop', 1440, 900, false], ['Desktop', 1920, 1080, false], ['Big text (phone, 1.5x zoom)', 260, 563, true]
];
(async () => {
  const b = await chromium.launch(); const rows = [];
  for (const [name, w, h, touch] of DEV) {
    const ctx = await b.newContext({ viewport:{width:w,height:h}, deviceScaleFactor:1, hasTouch:touch, isMobile:touch && w<1000 });
    const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(String(e)));
    await page.addInitScript(() => { localStorage.setItem('speakeasy.v1', JSON.stringify({guideSeen:true,profileAsked:true,modeSet:true,settings:{lock:false,lvl:2},profile:{name:'Test',avatar:'🦊'}})); localStorage.setItem('speakeasy.installHide','1'); });
    await page.goto('http://localhost:8765/index.html'); await page.waitForTimeout(1500);
    const m = await page.evaluate(() => {
      const vw = innerWidth, vh = innerHeight, r = id => document.getElementById(id)?.getBoundingClientRect();
      const inView = x => x && x.width > 0 && x.left >= -1 && x.right <= vw + 1 && x.top >= -1 && x.bottom <= vh + 1;
      const tiles = [...document.querySelectorAll('#board .tile')].filter(t => t.offsetParent);
      const tr = tiles.map(t => t.getBoundingClientRect());
      const minTile = tr.length ? Math.min(...tr.map(x => Math.min(x.width, x.height))) : 0;
      const cut = tr.filter(x => x.right > vw + 1 || x.left < -1).length;
      const key = ['speakBtn','delBtn','clrBtn','helpBtn','gearBtn'].filter(id => !inView(r(id)));
      return { hscroll: document.documentElement.scrollWidth > vw + 1, tiles: tiles.length, minTile: Math.round(minTile), cut, offscreen: key };
    });
    await page.screenshot({ path: path.join(OUT, name.replace(/[^a-z0-9]+/gi,'_') + '.png') });
    // settings sheet usable?
    await page.click('#gearBtn'); await page.waitForTimeout(500);
    const s = await page.evaluate(() => { const p = document.querySelector('.sheet .panel'); if (!p) return 'no sheet'; const r = p.getBoundingClientRect();
      return (r.width <= innerWidth + 1 && (p.scrollHeight <= p.clientHeight + 1 || getComputedStyle(p).overflowY !== 'visible')) ? 'ok' : 'overflow ' + Math.round(r.width) + ' ' + getComputedStyle(p).overflowY; });
    rows.push({ name, size: w+'x'+h, ...m, settings: s, errors: errs.length });
    await ctx.close();
  }
  console.table(rows); await b.close();
})();
