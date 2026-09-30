// Optional browser checks; installation and scope are documented in ACCESSIBILITY.md.
const baseURL = process.env.A11Y_BASE_URL || 'http://127.0.0.1:8765';
const { chromium } = require('playwright');
const { default: AxeBuilder } = require('@axe-core/playwright');
const fs = require('node:fs');
const routes = ['/', '/plugins/', '/plugins/robin-control/', '/plugins/robin-control-lite/', '/updates/', '/faq/', '/cart/', '/account/', '/privacy-policy/', '/eula/robin-control-lite/'];
(async () => {
 const browser = await chromium.launch({channel:'chrome',headless:true});
 const context = await browser.newContext();
 // Local first-party audit: prevent signup, analytics, and SDK side effects.
 await context.route('**/*', route => {
  const url=route.request().url();
  if(url.startsWith(baseURL + '/') || url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')) return route.continue();
  return route.abort();
 });
 const results=[];
 for(const width of [1280,320]) {
  const page=await context.newPage({viewport:{width,height:900}});
  await page.setViewportSize({width,height:900});
  for(const path of routes) {
   await page.goto(baseURL+path);
   await page.evaluate(()=>document.fonts.ready);
   if(await page.locator('#cookie-reject').isVisible()) await page.locator('#cookie-reject').click();
   const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']).analyze();
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
   results.push({width,path,overflow,violations:audit.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:audit.incomplete.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
   console.log(JSON.stringify(results.at(-1)));
   if(path==='/') await page.screenshot({path:'/tmp/conduit-a11y-'+width+'.png',fullPage:true});
  }
  await page.close();
 }
 fs.writeFileSync('/tmp/conduit-a11y-results.json',JSON.stringify(results,null,2));
 await browser.close();
 if(results.some(r=>r.overflow || r.violations.length)) process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});
