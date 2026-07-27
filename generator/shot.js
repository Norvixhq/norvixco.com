const { chromium } = require('playwright');
(async () => {
  const args = process.argv.slice(2);
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
  for (const spec of args) {
    const [url, out, theme, h, scroll] = spec.split('|');
    const ctx = await b.newContext({ viewport: { width: 1440, height: parseInt(h || 1100) } });
    if (theme === 'dark') await ctx.addInitScript(() => { try { localStorage.setItem('mdc-theme','dark'); } catch(e){} });
    const p = await ctx.newPage();
    const errs = [];
    p.on('console', m => { if (m.type()==='error') errs.push(m.text()); });
    p.on('requestfailed', r => errs.push('FAILED ' + r.url()));
    await p.goto(url, { waitUntil: 'networkidle' });
    if (scroll) await p.evaluate(y => window.scrollTo(0, y), parseInt(scroll));
    await p.waitForTimeout(600);
    await p.screenshot({ path: out });
    if (errs.length) console.log(out, 'ERRORS:', errs.filter(e=>!/fonts\.g/.test(e)).slice(0,6));
    await ctx.close();
    console.log('shot', out);
  }
  await b.close();
})();
