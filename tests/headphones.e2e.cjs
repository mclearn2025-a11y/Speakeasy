const { chromium } = require('playwright');
(async()=>{ const b=await chromium.launch(); const out=[];
 for (const native of [false,true]) {
  const ctx=await b.newContext({viewport:{width:390,height:844},hasTouch:true}); const p=await ctx.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(String(e)));
  await p.addInitScript((native)=>{ localStorage.setItem('speakeasy.v1',JSON.stringify({guideSeen:true,profileAsked:true,modeSet:true,settings:{lock:false,lvl:2,headphones:true}}));
    window.__web=[]; window.__native=[]; if (window.speechSynthesis) window.speechSynthesis.speak = u => window.__web.push(u.text);
    if (native) window.Capacitor = { isNativePlatform:()=>true, Plugins:{ SpeakerVoice:{ speak:async o=>{ window.__native.push(o); return {}; } } } }; }, native);
  await p.goto(native ? 'http://localhost:8765/store-app/www/index.html' : 'http://localhost:8765/index.html'); await p.waitForTimeout(1500);
  const tiles=p.locator('#board button[data-act="tile"]'); await tiles.nth(1).click(); await p.click('#speakBtn'); await p.waitForTimeout(400);
  const r=await p.evaluate(()=>({web:window.__web.slice(), native:window.__native.map(o=>({text:o.text,speaker:o.speaker})), big:document.querySelector('.bigmsg')?.innerText||null}));
  if (!native) await p.screenshot({path:'/tmp/headphones-web.png'});
  out.push({native, ...r, errs}); await ctx.close(); }
 console.log(JSON.stringify(out,null,1)); await b.close(); })();
