/* Page composer — turns a content module into a finished, clean-URL HTML page.
   Every URL emitted here is directory-based and extensionless. No .html, no #. */

const fs = require("fs");
const path = require("path");
const S = require("./shell");
const { cite, CITE } = require("./sources");
const { SITE, svg, arrow, nav, FOOTER, head, crumbs, crumbHtml, faqSchema, faqHtml, FOOT_SCRIPTS, ORG, WEBSITE, REVIEWED_ISO, deent } = S;

const ROOT = process.env.MDC_SITE || require("path").resolve(__dirname, "..", "site");

/* ---------------------------------------------------------------- atoms --- */

const esc = (s) => String(s).replace(/&(?![a-zA-Z#0-9]+;)/g, "&amp;");

/** Stat tiles row. items = [[label, value, note]] */
function stats(items, cols) {
  return `<div class="grid grid-${cols || items.length}" style="gap:16px">
      ${items
        .map(
          ([k, v, d]) =>
            `<div class="stat-tile"><div class="k">${k}</div><div class="v">${v}</div>${
              d ? `<div class="d">${d}</div>` : ""
            }</div>`
        )
        .join("\n      ")}
    </div>`;
}

/**
 * Data table. cols = [..], rows = [[..]], numCols = indexes right-aligned,
 * caption = a plain-language summary (required for a11y; also the label the
 * scroll container announces).
 *
 * Three accessibility obligations are handled here rather than in 29 hand-
 * written pages: <th scope="col"> so a screen reader can pair each cell with
 * its heading, a <caption> so the table is identifiable out of context, and
 * tabindex="0" + role="region" on the wrapper so a keyboard-only user can
 * actually scroll a table that overflows horizontally. Without the tabindex a
 * scrollable region is reachable by mouse and touch but not by keyboard.
 */
function table(cols, rows, numCols, caption) {
  const nc = new Set(numCols || []);
  const cap = caption || cols.join(", ");
  return `<div class="table-wrap" tabindex="0" role="region" aria-label="${String(cap).replace(/<[^>]+>/g, "").replace(/"/g, "&quot;")}">
      <table class="tbl">
        <caption class="sr-only">${cap}</caption>
        <thead><tr>${cols
          .map((c, i) => `<th scope="col"${nc.has(i) ? ' class="num"' : ""}>${c}</th>`)
          .join("")}</tr></thead>
        <tbody>
          ${rows
            .map(
              (r) =>
                `<tr>${r
                  .map((c, i) =>
                    i === 0
                      ? `<th scope="row"${nc.has(i) ? ' class="num"' : ""}>${c}</th>`
                      : `<td${nc.has(i) ? ' class="num"' : ""}>${c}</td>`
                  )
                  .join("")}</tr>`
            )
            .join("\n          ")}
        </tbody>
      </table>
    </div>`;
}

function callout(title, body, kind) {
  return `<div class="callout${kind ? " " + kind : ""}">
      <div class="callout-title">${svg(kind === "warn" ? "info" : "layers")
        .replace("<svg", '<svg width="18" height="18"')}${title}</div>
      ${body}
    </div>`;
}

function bullets(items) {
  return `<ul class="bullets">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
}

/** Calculator tiles. items = [[href, icon, title, blurb, live?]] */
function calcTiles(items) {
  return `<div class="grid grid-auto">
      ${items
        .map(
          ([href, icon, title, blurb, live]) =>
            `<a class="card card-hover calc-tile-link" href="${href}">
        <div class="calc-tile">
          <span class="icon-badge">${svg(icon)}</span>
          <h3>${title}</h3>
          <p>${blurb}</p>
          <div class="tile-foot"><span class="pill ${live === false ? "pill-soon" : "pill-live"}">${
              live === false ? "Coming soon" : "Live"
            }</span><span class="go">Open ${arrow(15)}</span></div>
        </div>
      </a>`
        )
        .join("\n      ")}
    </div>`;
}

/** Cross-link cards. items = [[href, title, blurb, chips[]]] */
function topicCards(items) {
  return `<div class="grid grid-3">
      ${items
        .map(
          ([href, title, blurb, chips]) =>
            `<div class="card card-pad-lg category-card">
        <h3><a href="${href}">${title}</a></h3>
        <p>${blurb}</p>
        <div class="cat-links">${(chips || [])
          .map(([ch, cu]) => `<a href="${cu}">${ch}</a>`)
          .join("")}</div>
      </div>`
        )
        .join("\n      ")}
    </div>`;
}

/** Sources block — every hub cites where its numbers came from. */
function sources(items) {
  return `<details class="disclosure" style="margin-top:34px">
      <summary>Sources &amp; assumptions<span class="chev"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span></summary>
      <div class="disclosure-body">
        <p class="text-muted" style="font-size:.92rem;margin-bottom:12px">Figures on this page are durable national reference points, not live market quotes. They are chosen to stay reasonable across years rather than to track this week&rsquo;s prices, and every one of them is an editable field &mdash; your real numbers depend on your vehicle, ZIP code, driving pattern and credit.</p>
        <ul class="bullets" style="font-size:.92rem">${items.map((i) => `<li>${i}</li>`).join("")}</ul>
      </div>
    </details>`;
}


/* --------------------------------------------------------------- layout --- */

/**
 * cfg = {
 *   url, title, desc, eyebrow, h1, lead,
 *   crumb: [[name, url]] (parents only),
 *   heroStats: [[k,v,d]],
 *   heroCta: [[label, href, cls]],
 *   body: html string (the long-form content)
 *   faq: [[q, a]],
 *   cta: { h2, p, btn: [label, href] },
 *   schemaExtra: [ ...objects ],
 *   navActive: url for nav highlight
 * }
 */
function build(cfg) {
  const crumbList = [["Home", "/"], ...(cfg.crumb || [])];
  const graph = [
    ORG,
    WEBSITE,
    {
      "@type": "WebPage",
      "@id": SITE + cfg.url,
      url: SITE + cfg.url,
      name: deent(cfg.title),
      description: deent(cfg.desc),
      inLanguage: "en-US",
      isPartOf: { "@id": SITE + "/#website" },
      publisher: { "@id": SITE + "/#org" },
      /* One constant, shared with sitemap.js, so <lastmod> and dateModified
         cannot drift apart the way they had. */
      datePublished: cfg.published || "2026-07-23",
      dateModified: cfg.modified || REVIEWED_ISO,
      primaryImageOfPage: { "@id": SITE + "/#logo" },
      breadcrumb: { "@id": SITE + cfg.url + "#breadcrumb" },
    },
    Object.assign({ "@id": SITE + cfg.url + "#breadcrumb" }, crumbs([...crumbList, [cfg.h1short || cfg.h1, cfg.url]])),
    ...(cfg.faq && cfg.faq.length ? [faqSchema(cfg.faq)] : []),
    ...(cfg.schemaExtra || []),
  ];

  const heroBtns = (cfg.heroCta || [])
    .map(([label, href, cls]) => `<a class="btn ${cls || "btn-primary"} btn-lg" href="${href}">${label}</a>`)
    .join("\n        ");

  const html =
    head({
      title: cfg.title,
      desc: cfg.desc,
      url: cfg.url,
      schema: { "@context": "https://schema.org", "@graph": graph },
    }) +
    nav(cfg.navActive || cfg.url) +
    `
<main id="main">

<section class="section" style="background:var(--grad-hero)">
  <div class="container">
    ${crumbHtml(crumbList, cfg.h1short || cfg.h1)}
    <div style="max-width:820px;margin-top:20px">
      <span class="eyebrow" data-reveal>${cfg.eyebrow}</span>
      <h1 style="margin-top:16px;font-size:var(--fs-h1)" data-reveal data-reveal-delay="1">${cfg.h1}</h1>
      <p class="lead" data-reveal data-reveal-delay="2">${cfg.lead}</p>
      ${heroBtns ? `<div class="hero-cta" style="margin-top:28px" data-reveal data-reveal-delay="3">\n        ${heroBtns}\n      </div>` : ""}
    </div>
    ${cfg.heroStats ? `<div style="margin-top:44px" data-reveal data-reveal-delay="4">${stats(cfg.heroStats, cfg.heroStats.length)}</div>` : ""}
  </div>
</section>

${cfg.body}

${
  cfg.faq && cfg.faq.length
    ? `<section class="section-tight bg-subtle">
  <div class="container container-narrow">
    <div class="section-head"><span class="eyebrow">FAQ</span><h2>${cfg.faqTitle || "Common questions"}</h2></div>
    <div>
      ${faqHtml(cfg.faq)}
    </div>
  </div>
</section>`
    : ""
}

${
  cfg.cta
    ? `<section class="section-tight">
  <div class="container">
    <div class="cta-band" data-reveal>
      <h2>${cfg.cta.h2}</h2>
      <p>${cfg.cta.p}</p>
      <a class="btn btn-secondary btn-lg" href="${cfg.cta.btn[1]}">${cfg.cta.btn[0]}</a>
    </div>
  </div>
</section>`
    : ""
}

</main>
` +
    FOOTER +
    "\n" +
    (cfg.footScripts || FOOT_SCRIPTS);

  return html;
}

function write(url, html) {
  const rel = url === "/" ? "index.html" : url.replace(/^\/|\/$/g, "") + "/index.html";
  const dest = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html);
  console.log("  wrote", url.padEnd(30), "->", rel);
}

module.exports = {
  build, write, stats, table, callout, bullets, calcTiles, topicCards, sources, esc,
  svg, arrow, SITE,
  /* Outbound citations live in sources.js so every link on the site has exactly
     one definition. Re-exported here so content modules keep a single import. */
  cite, CITE,
};
