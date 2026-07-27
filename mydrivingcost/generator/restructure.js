/* One-time restructure of the existing hand-authored pages:
   - directory-based, extensionless URLs
   - root-absolute asset + link paths
   - canonical nav / footer swapped in
   - every hash-anchor navigation link replaced with a real page URL
*/
const fs = require("fs");
const path = require("path");
const { nav, FOOTER } = require("./shell");
const ROOT = process.env.MDC_SITE || require("path").resolve(__dirname, "..", "site");

const MOVES = [
  ["index.html", "index.html", "/"],
  ["about.html", "about/index.html", "/about/"],
  ["calculators/index.html", "calculators/index.html", "/calculators/"],
  ["calculators/true-cost-to-own.html", "calculators/true-cost-to-own/index.html", "/calculators/true-cost-to-own/"],
  ["calculators/lease-vs-buy.html", "calculators/lease-vs-buy/index.html", "/calculators/lease-vs-buy/"],
  ["404.html", "404.html", "/404"],
];

/* href/src rewrite table — longest keys first so prefixes don't clobber */
const MAP = [
  // hash-only anchors on the homepage -> real pages
  ["#fuel-ev", "/fuel-and-ev/"],
  ["#insurance", "/insurance/"],
  ["#maintenance", "/maintenance/"],
  ["#depreciation", "/depreciation/"],
  ["#buying", "/buying-guides/"],
  ["#calculators", "/calculators/"],
  ["#faq", "/faq/"],
  // page anchors on other pages
  ["about.html#methodology", "/methodology/"],
  ["about.html#roadmap", "/about/"],
  ["index.html#fuel-ev", "/fuel-and-ev/"],
  ["index.html#insurance", "/insurance/"],
  ["index.html#maintenance", "/maintenance/"],
  ["index.html#depreciation", "/depreciation/"],
  ["index.html#buying", "/buying-guides/"],
  ["index.html#calculators", "/calculators/"],
  ["index.html#faq", "/faq/"],
  // plain page links
  ["calculators/true-cost-to-own.html", "/calculators/true-cost-to-own/"],
  ["calculators/lease-vs-buy.html", "/calculators/lease-vs-buy/"],
  ["true-cost-to-own.html", "/calculators/true-cost-to-own/"],
  ["lease-vs-buy.html", "/calculators/lease-vs-buy/"],
  ["calculators/index.html", "/calculators/"],
  ["about.html", "/about/"],
  ["index.html", "/"],
  // assets
  ["assets/css/styles.css", "/assets/css/styles.css"],
  ["assets/js/main.js", "/assets/js/main.js"],
  ["assets/js/tco.js", "/assets/js/tco.js"],
  ["assets/js/lvb.js", "/assets/js/lvb.js"],
  ["assets/img/", "/assets/img/"],
  ["site.webmanifest", "/site.webmanifest"],
];

function rewriteAttrs(html) {
  return html.replace(/(href|src)="([^"]*)"/g, (m, attr, val) => {
    if (/^(https?:|mailto:|tel:|data:|\/\/)/.test(val)) {
      // absolute site URLs in canonical/og/schema handled separately
      return m;
    }
    let v = val;
    // strip leading ./ ../ / and count
    v = v.replace(/^\/+/, "").replace(/^(\.\.\/)+/, "").replace(/^\.\//, "");
    for (const [from, to] of MAP) {
      if (v === from) return `${attr}="${to}"`;
      if (from.endsWith("/") && v.startsWith(from)) return `${attr}="${to}${v.slice(from.length)}"`;
    }
    return m;
  });
}

function rewriteAbsolute(html) {
  return html
    .replace(/https:\/\/mydrivingcost\.com\/calculators\/true-cost-to-own\.html/g, "https://mydrivingcost.com/calculators/true-cost-to-own/")
    .replace(/https:\/\/mydrivingcost\.com\/calculators\/lease-vs-buy\.html/g, "https://mydrivingcost.com/calculators/lease-vs-buy/")
    .replace(/https:\/\/mydrivingcost\.com\/about\.html/g, "https://mydrivingcost.com/about/")
    .replace(/https:\/\/mydrivingcost\.com\/index\.html/g, "https://mydrivingcost.com/");
}

function swapNav(html, active) {
  const out = html.replace(/<header class="nav">[\s\S]*?<\/header>/, () => nav(active));
  if (out === html) console.warn("  ! nav block not replaced");
  return out;
}
function swapFooter(html) {
  const out = html.replace(/<footer class="footer">[\s\S]*?<\/footer>/, () => FOOTER);
  if (out === html) console.warn("  ! footer block not replaced");
  return out;
}

for (const [from, to, url] of MOVES) {
  const src = path.join(ROOT, from);
  if (!fs.existsSync(src)) { console.warn("missing", from); continue; }
  let html = fs.readFileSync(src, "utf8");
  html = rewriteAttrs(html);
  html = rewriteAbsolute(html);
  if (url !== "/404") { html = swapNav(html, url); html = swapFooter(html); }
  const dest = path.join(ROOT, to);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html);
  if (from !== to) fs.unlinkSync(src);
  console.log(`${from}  ->  ${to}   (${url})`);
}
console.log("restructure done");
