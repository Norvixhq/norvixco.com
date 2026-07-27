/* Render each calculator, report JS errors and the live values of every
   [data-out] node that is still showing a placeholder. */
const { chromium } = require("playwright");

const PAGES = process.argv.slice(2);

(async () => {
  const b = await chromium.launch({
    executablePath:
      "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell",
  });
  let bad = 0;
  for (const url of PAGES) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 1100 } });
    const p = await ctx.newPage();
    const errs = [];
    p.on("console", (m) => {
      if (m.type() === "error" && !/fonts\.g|ERR_TUNNEL_CONNECTION_FAILED/.test(m.text())) errs.push(m.text());
    });
    p.on("pageerror", (e) => errs.push("PAGEERROR " + e.message));
    await p.goto(url, { waitUntil: "networkidle" });
    await p.waitForTimeout(900);
    const info = await p.evaluate(() => {
      const outs = [...document.querySelectorAll("[data-out]")];
      const stale = outs
        .filter((e) => e.textContent.trim() === "\u2014")
        .map((e) => e.getAttribute("data-out"));
      const hero = document.querySelector(".result-total");
      const tiles = [...document.querySelectorAll(".stat-tile")].map(
        (t) => t.querySelector(".k").textContent + " = " + t.querySelector(".v").textContent
      );
      return {
        title: document.title,
        hero: hero ? hero.textContent : null,
        tiles,
        stale: [...new Set(stale)],
        svgs: document.querySelectorAll("svg.chart, .chart-card svg").length,
        badHref: [...document.querySelectorAll("a[href]:not([data-skip])")]
          .map((a) => a.getAttribute("href"))
          .filter((h) => /\.html/.test(h) || /^#/.test(h)),
        rows: document.querySelectorAll(".chart-card table tbody tr").length,
        bdRows: document.querySelectorAll(".bd-row").length,
      };
    });
    const flag = errs.length || info.stale.length ? "  ✗" : "  ✓";
    if (errs.length || info.stale.length) bad++;
    console.log(flag, url.replace(/^http:\/\/localhost:\d+/, ""));
    console.log("      hero:", info.hero, "| charts:", info.svgs, "| bd:", info.bdRows, "| tblrows:", info.rows);
    info.tiles.forEach((t) => console.log("      tile:", t));
    if (info.stale.length) console.log("      STALE OUTPUTS:", info.stale.join(", "));
    if (info.badHref.length) console.log("      BAD HREFS:", [...new Set(info.badHref)].join(", "));
    if (errs.length) console.log("      ERRORS:", errs.slice(0, 5));
    await ctx.close();
  }
  await b.close();
  console.log(bad ? "\n" + bad + " page(s) need attention." : "\nAll pages clean.");
})();
