// Optional browser checks; installation and scope are documented in ACCESSIBILITY.md.
const baseURL = process.env.A11Y_BASE_URL || 'http://127.0.0.1:8765';
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const b=await chromium.launch({channel:'chrome',headless:true});
 const c=await b.newContext();let submits=0,fail=false;
 await c.route('**/*',r=>{
  const u=r.request().url();
  if(u.includes('/subscribe')){submits++;return r.fulfill({status:fail?500:200,body:'{}',contentType:'application/json'});}
  if(u.startsWith(baseURL + '/')||u.includes('fonts.googleapis.com')||u.includes('fonts.gstatic.com'))return r.continue();
  return r.abort();
 });
 const p=await c.newPage();await p.setViewportSize({width:1280,height:900});
 await p.goto(baseURL + '/');
 await p.keyboard.press('Tab');assert.equal(await p.locator(':focus').textContent(),'Skip to content');
 await p.keyboard.press('Enter');assert.equal(await p.locator(':focus').getAttribute('id'),'main-content');
 const d=p.locator('.nav-dropdown-toggle');await d.focus();await p.keyboard.press('Enter');assert.equal(await d.getAttribute('aria-expanded'),'true');
 await p.keyboard.press('Tab');assert.match(await p.locator(':focus').getAttribute('href'),/robin-control/);
 await p.keyboard.press('Escape');assert.equal(await d.getAttribute('aria-expanded'),'false');assert.equal(await p.locator(':focus').getAttribute('class'),'nav-dropdown-toggle');
 await p.locator('.nav-item--has-dropdown > a').focus();await p.keyboard.press('Enter');await p.waitForURL('**/plugins/');
 console.log('PASS skip link, desktop disclosure, Escape/focus return, Plugins destination');
 await p.setViewportSize({width:320,height:800});await p.goto(baseURL + '/');
 const n=p.locator('.nav-toggle');await n.focus();await p.keyboard.press('Enter');assert.equal(await n.getAttribute('aria-expanded'),'true');assert.equal(await p.locator(':focus').textContent(),'Home');
 await p.keyboard.press('Escape');assert.equal(await n.getAttribute('aria-expanded'),'false');assert.equal(await p.locator(':focus').getAttribute('class'),'nav-toggle');
 console.log('PASS mobile navigation keyboard, Escape/focus return');
 for(const selector of ['[data-waitlist-form]','#newsletter-form']){
  const f=p.locator(selector),input=f.locator('input'),button=f.locator('button');let before=submits;
  await input.fill('invalid');await button.click();assert.equal(submits,before);assert.equal(await input.evaluate(e=>e.validity.valid),false);
  fail=false;await input.fill('accessibility-test@example.com');await button.click();
  const status=selector==='#newsletter-form'?p.locator('#newsletter-status'):f.locator('[data-waitlist-status]');
  await status.filter({hasText:selector==='#newsletter-form'?'Thanks':'Almost there'}).waitFor();assert.equal(submits,before+1);
  fail=true;await input.fill('accessibility-test@example.com');await button.click();await status.filter({hasText:/try again/}).waitFor();assert.equal(await input.inputValue(),'accessibility-test@example.com');
  assert.equal(await button.isEnabled(),true);
 }
 console.log('PASS both forms: invalid email, mocked success/error, retry state, persistent live regions; no real signups');
 await p.locator('#newsletter-email').focus();
 const visible=await p.evaluate(()=>{const r=document.activeElement.getBoundingClientRect();return r.top>=document.querySelector('.site-header').getBoundingClientRect().bottom&&r.bottom<=document.getElementById('cookie-banner').getBoundingClientRect().top});assert.equal(visible,true);
 await p.locator('#cookie-reject').click();assert.equal(await p.locator(':focus').getAttribute('id'),'main-content');assert.equal(await p.evaluate(()=>localStorage.getItem('cookie-consent')),'rejected');assert.equal(await p.locator('script[src*="googletagmanager"]').count(),0);
 await p.reload();assert.equal(await p.locator('#cookie-banner').isVisible(),false);
 console.log('PASS focused field unobscured, consent rejection, persistence, focus after dismissal, no GA');
 for(const path of ['/', '/plugins/robin-control/', '/updates/']){
  await p.goto(baseURL+path);await p.setViewportSize({width:320,height:256});
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await p.addStyleTag({content:'* { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; } p { margin-bottom: 2em !important; }'});
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 }
 console.log('PASS 320px reflow and text spacing on representative pages');
 await p.emulateMedia({reducedMotion:'reduce'});assert.equal(await p.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');
 await c.close();
 const nojs=await b.newContext({javaScriptEnabled:false,viewport:{width:320,height:800}});const q=await nojs.newPage();await q.goto(baseURL + '/');assert.equal(await q.locator('#site-nav').isVisible(),true);assert.equal(await q.locator('.dropdown-menu').isVisible(),true);await nojs.close();
 console.log('PASS reduced motion and no-JavaScript mobile navigation');
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
