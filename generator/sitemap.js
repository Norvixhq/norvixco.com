/* Regenerate sitemap.xml + robots.txt from what is actually on disk.
   Every URL emitted is clean: root-absolute, slash-terminated, no .html, no #. */

const fs = require("fs");
const path = require("path");

/* <lastmod> and the dateModified inside every page's JSON-LD are the same fact
   stated in two files. They had drifted a day apart, which is exactly the kind
   of inconsistency a crawler notices and a human never does — so both now read
   the one constant that shell.js exports. */
const { REVIEWED_ISO } = require("./shell");

const ROOT = process.env.MDC_SITE || require("path").resolve(__dirname, "..", "site");
const SITE = "https://mydrivingcost.com";
const TODAY = REVIEWED_ISO;

/* Priority and change frequency by URL shape. The homepage and the flagship
   calculator lead; hubs and tools sit below them; legal pages sit at the bottom. */
const RULES = [
  [/^\/$/, "1.0", "weekly"],
  [/^\/calculators\/true-cost-to-own\/$/, "0.95", "monthly"],
  [/^\/calculators\/$/, "0.9", "weekly"],
  [/^\/calculators\/[^/]+\/$/, "0.85", "monthly"],
  [/^\/(fuel-and-ev|insurance|depreciation|maintenance|buying-guides|guides)\/$/, "0.8", "monthly"],
  [/^\/(methodology|about|faq)\/$/, "0.7", "monthly"],
  [/^\/(editorial-standards|contact)\/$/, "0.5", "yearly"],
  [/^\/(privacy|terms|disclaimer)\/$/, "0.3", "yearly"],
];

function meta(url) {
  for (const [re, pr, cf] of RULES) if (re.test(url)) return { pr, cf };
  return { pr: "0.6", cf: "monthly" };
}

/* ------------------------------------------------------------- discovery -- */

const SKIP = new Set(["assets", "node_modules", ".git"]);
const urls = [];

(function walk(dir, rel) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (SKIP.has(e.name) || e.name.startsWith(".")) continue;
      walk(path.join(dir, e.name), rel + e.name + "/");
    } else if (e.name === "index.html") {
      urls.push(rel);
    }
  }
})(ROOT, "/");

/* 404.html is deliberately excluded: it is a host error document, not a page. */
urls.sort((a, b) => {
  const d = parseFloat(meta(b).pr) - parseFloat(meta(a).pr);
  return d !== 0 ? d : a.localeCompare(b);
});

/* --------------------------------------------------------------- output -- */

const body = urls
  .map((u) => {
    const { pr, cf } = meta(u);
    return `  <url>
    <loc>${SITE}${u}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${cf}</changefreq>
    <priority>${pr}</priority>
  </url>`;
  })
  .join("\n");

fs.writeFileSync(
  path.join(ROOT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`
);

fs.writeFileSync(
  path.join(ROOT, "robots.txt"),
  `# MyDrivingCost.com
# Nothing here is generated per-user, so there is nothing to hide from a crawler.

User-agent: *
Allow: /

# Calculator inputs travel in the query string, which means a shared or linked
# result is a "?" URL. Those must stay crawlable: every one of them carries a
# <link rel="canonical"> back to the clean path, so search engines consolidate
# them rather than indexing duplicates. A blanket "Disallow: /*?" would instead
# strand every link anyone ever shares.

Sitemap: ${SITE}/sitemap.xml
`
);

console.log("sitemap.xml — " + urls.length + " clean URLs");
urls.forEach((u) => console.log("  " + meta(u).pr + "  " + u));
