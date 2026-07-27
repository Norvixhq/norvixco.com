/* Full-site pre-launch audit.

   Crawls every URL in sitemap.xml over HTTP and reports, per page:
     - JS console / page errors
     - any href containing .html or starting with # (the client's hard rule)
     - internal links that 404
     - SEO essentials: title, meta description, canonical, og:image, one <h1>
     - JSON-LD blocks that fail to parse
     - images missing alt text
     - stale [data-out] placeholders on calculator pages
   Exits non-zero if anything fails. */

const fs = require("fs");
const { chromium } = require("playwright");

const BASE = "http://localhost:8811";
const SITE = "https://mydrivingcost.com";

const xml = fs.readFileSync(require("path").join(process.env.MDC_SITE || require("path").resolve(__dirname, "..", "site"), "sitemap.xml"), "utf8");
const PAGES = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
  m[1].replace(SITE, "")
);

const seen = new Map(); // url -> status
async function status(url) {
  if (seen.has(url)) return seen.get(url);
  const res = await fetch(BASE + url, { method: "HEAD" }).catch(() => null);
  const s = res ? res.status : 0;
  seen.set(url, s);
  return s;
}

(async () => {
  const b = await chromium.launch({
    executablePath:
      "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell",
  });

  const titles = new Map();
  const descs = new Map();
  const problems = [];
  let totalLinks = 0;

  for (const url of PAGES) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 1100 } });
    const p = await ctx.newPage();
    const errs = [];
    p.on("console", (m) => {
      if (
        m.type() === "error" &&
        !/fonts\.g|ERR_TUNNEL_CONNECTION_FAILED|favicon/.test(m.text())
      )
        errs.push(m.text());
    });
    p.on("pageerror", (e) => errs.push("PAGEERROR " + e.message));

    const res = await p.goto(BASE + url, { waitUntil: "networkidle" });
    await p.waitForTimeout(600);

    const info = await p.evaluate(() => {
      const q = (s) => document.querySelector(s);
      const attr = (s, a) => (q(s) ? q(s).getAttribute(a) : null);
      const ld = [...document.querySelectorAll('script[type="application/ld+json"]')];
      const ldBad = [];
      const ldTypes = [];
      ld.forEach((s, i) => {
        try {
          const j = JSON.parse(s.textContent);
          const g = j["@graph"] || [j];
          g.forEach((n) => ldTypes.push(n["@type"]));
        } catch (e) {
          ldBad.push(i + ": " + e.message);
        }
      });
      const links = [...document.querySelectorAll("a[href]")];
      return {
        title: document.title,
        desc: attr('meta[name="description"]', "content"),
        canonical: attr('link[rel="canonical"]', "href"),
        ogImage: attr('meta[property="og:image"]', "content"),
        ogTitle: attr('meta[property="og:title"]', "content"),
        h1s: document.querySelectorAll("h1").length,
        h1: q("h1") ? q("h1").textContent.trim().slice(0, 70) : null,
        ldCount: ld.length,
        ldBad,
        ldTypes,
        badHref: links
          .filter((a) => !a.hasAttribute("data-skip"))
          .map((a) => a.getAttribute("href"))
          .filter((h) => /\.html/.test(h) || /^#/.test(h) || /#/.test(h)),
        internal: [
          ...new Set(
            links
              .map((a) => a.getAttribute("href"))
              .filter((h) => h && h.startsWith("/") && !h.startsWith("//"))
          ),
        ],
        imgsNoAlt: [...document.querySelectorAll("img")]
          .filter((i) => i.getAttribute("alt") === null)
          .map((i) => i.getAttribute("src")),
        stale: [
          ...new Set(
            [...document.querySelectorAll("[data-out]")]
              .filter((e) => e.textContent.trim() === "—")
              .map((e) => e.getAttribute("data-out"))
          ),
        ],
        words: (document.querySelector("main") || document.body).innerText.split(
          /\s+/
        ).length,
      };
    });

    const bad = [];
    if (res.status() !== 200) bad.push("HTTP " + res.status());
    if (errs.length) bad.push("JS: " + errs.slice(0, 3).join(" | "));
    if (info.badHref.length)
      bad.push("BAD HREF: " + [...new Set(info.badHref)].join(", "));
    if (info.stale.length) bad.push("STALE: " + info.stale.join(", "));
    if (!info.title) bad.push("no title");
    if (info.title && info.title.length > 65)
      bad.push("title " + info.title.length + " chars");
    if (!info.desc) bad.push("no meta description");
    if (info.desc && (info.desc.length < 80 || info.desc.length > 172))
      bad.push("desc " + info.desc.length + " chars");
    if (info.canonical !== SITE + url)
      bad.push("canonical = " + info.canonical);
    if (!info.ogImage) bad.push("no og:image");
    if (info.h1s !== 1) bad.push(info.h1s + " h1 tags");
    if (!info.ldCount) bad.push("no JSON-LD");
    if (info.ldBad.length) bad.push("LD parse: " + info.ldBad.join("; "));
    if (info.imgsNoAlt.length)
      bad.push("img no alt: " + info.imgsNoAlt.join(", "));
    if (info.words < 400) bad.push("thin: " + info.words + " words");

    if (titles.has(info.title)) bad.push("DUP TITLE with " + titles.get(info.title));
    else titles.set(info.title, url);
    if (info.desc) {
      if (descs.has(info.desc)) bad.push("DUP DESC with " + descs.get(info.desc));
      else descs.set(info.desc, url);
    }

    // Internal link resolution
    const dead = [];
    for (const h of info.internal) {
      totalLinks++;
      const clean = h.split("?")[0];
      const s = await status(clean);
      if (s >= 400 || s === 0) dead.push(clean + " (" + s + ")");
    }
    if (dead.length) bad.push("DEAD: " + dead.join(", "));

    const ok = bad.length === 0;
    console.log(
      (ok ? "  ✓ " : "  ✗ ") +
        url.padEnd(38) +
        String(info.words).padStart(5) +
        "w  " +
        String(info.ldTypes.length).padStart(2) +
        " ld  " +
        info.internal.length +
        " links"
    );
    if (!ok) {
      bad.forEach((x) => console.log("        · " + x));
      problems.push(url);
    }
    await ctx.close();
  }

  await b.close();
  console.log(
    "\n" +
      PAGES.length +
      " pages, " +
      totalLinks +
      " internal link instances, " +
      seen.size +
      " unique targets checked."
  );
  console.log(
    problems.length
      ? problems.length + " page(s) need attention:\n  " + problems.join("\n  ")
      : "CLEAN — no issues found."
  );
  process.exit(problems.length ? 1 : 0);
})();
