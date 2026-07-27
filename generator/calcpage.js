/* Calculator page composer.
   Emits a clean-URL calculator page (directory + index.html, no .html, no #)
   plus its companion JS file under /assets/js/. */

const fs = require("fs");
const path = require("path");
const S = require("./shell");
const { SITE, svg, arrow, nav, FOOTER, head, crumbs, crumbHtml, faqSchema, faqHtml, ORG, WEBSITE, REVIEWED_ISO, deent } = S;

const { sourcesBlock, cite, CITE } = require("./sources");

const ROOT = process.env.MDC_SITE || require("path").resolve(__dirname, "..", "site");

/* ------------------------------------------------------------- controls --- */

/** Number field with optional $ / % / unit affixes. */
function num(id, label, value, o) {
  o = o || {};
  const left = o.prefix ? `<span class="affix affix-left">${o.prefix}</span>` : "";
  const right = o.suffix ? `<span class="affix affix-right">${o.suffix}</span>` : "";
  const cls =
    "input num" + (o.prefix ? " has-affix-left" : "") + (o.suffix ? " has-affix-right" : "");
  return `<div class="field"><label class="field-label" for="${id}">${label}${
    o.hint ? ` <span class="hint">${o.hint}</span>` : ""
  }</label>
                <div class="input-wrap">${left}<input class="${cls}" type="number" id="${id}" value="${value}"${
    o.min != null ? ` min="${o.min}"` : ""
  }${o.max != null ? ` max="${o.max}"` : ""} step="${o.step || 1}" inputmode="${
    o.step && String(o.step).indexOf(".") >= 0 ? "decimal" : "numeric"
  }">${right}</div>${o.help ? `<span class="field-help">${o.help}</span>` : ""}</div>`;
}

/** Range slider whose live label is bound with data-out. */
function rng(id, label, value, o) {
  o = o || {};
  return `<div class="field"><label class="field-label" for="${id}">${label} <span class="hint num" data-out="${
    o.out || id
  }">${o.initial || value}</span></label>
                <input class="range" type="range" id="${id}" min="${o.min}" max="${o.max}" step="${
    o.step || 1
  }" value="${value}">${o.help ? `<span class="field-help">${o.help}</span>` : ""}</div>`;
}

/** Segmented button group. opts = [[value, label]]
 *  Emitted as a real radio group rather than a row of aria-pressed toggle
 *  buttons: the options are mutually exclusive, so this is what assistive
 *  technology should hear, and it collapses the whole control to a single tab
 *  stop. Roles ship in the markup so the semantics are right before any script
 *  runs; MDC.segment (main.js) adds the arrow-key behavior on top. */
function seg(name, label, opts, active, o) {
  o = o || {};
  return `<div class="field"><span class="field-label" id="${name}Label">${label}</span>
                <div class="segmented block" role="radiogroup" aria-labelledby="${name}Label" data-seg="${name}">
                  ${opts
                    .map(
                      ([v, l]) =>
                        `<button type="button" role="radio" data-val="${v}" aria-checked="${
                          v === active ? "true" : "false"
                        }" tabindex="${v === active ? "0" : "-1"}">${l}</button>`
                    )
                    .join("\n                  ")}
                </div>${o.help ? `<span class="field-help">${o.help}</span>` : ""}</div>`;
}

function group(title, inner, color) {
  return `<div class="input-group">
              <div class="group-title"${color ? ` style="color:${color}"` : ""}>${title}</div>
              ${inner}
            </div>`;
}

function advanced(inner) {
  return `<details class="disclosure">
              <summary>Advanced assumptions <span class="chev"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span></summary>
              <div class="disclosure-body">
                <div class="calc-inputs" style="gap:18px;margin-top:16px">
                  ${inner}
                </div>
              </div>
            </details>`;
}

const ACTIONS = `<div class="flex" style="gap:10px;flex-wrap:wrap">
              <button type="button" class="btn btn-secondary btn-sm" id="btn-reset"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg> Reset</button>
              <button type="button" class="btn btn-secondary btn-sm" id="btn-share"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg> <span id="share-text">Share</span></button>
              <button type="button" class="btn btn-secondary btn-sm" id="btn-print"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg> Print / PDF</button>
            </div>`;

/* -------------------------------------------------------------- results --- */

/** Headline result card. */
function hero(printTitle, label, outKey, fmtName, sub) {
  return `<div class="result-hero">
          <div class="print-only" style="font-family:var(--font-display);font-weight:800;font-size:1.1rem;margin-bottom:8px">MyDrivingCost.com — ${printTitle}</div>
          <div class="label">${label}</div>
          <div class="result-total num" data-out="${outKey}" data-fmt="${fmtName}" data-count>—</div>
          <div class="result-sub">${sub}</div>
        </div>`;
}

/** Three (or n) KPI tiles bound to compute() keys. items = [[label, key, fmt, note]] */
function tiles(items) {
  return `<div class="stat-row"${
    items.length !== 3 ? ` style="grid-template-columns:repeat(${items.length},1fr)"` : ""
  }>
          ${items
            .map(
              ([k, key, f, d]) =>
                `<div class="stat-tile"><div class="k">${k}</div><div class="v num" data-out="${key}" data-fmt="${f}" data-count>—</div>${
                  d ? `<div class="d">${d}</div>` : ""
                }</div>`
            )
            .join("\n          ")}
        </div>`;
}

function chartCard(title, sub, inner) {
  return `<div class="chart-card">
          <div class="chart-head">
            <div><div class="chart-title">${title}</div><div class="chart-sub">${sub}</div></div>
          </div>
          ${inner}
        </div>`;
}

function callout(title, body, kind) {
  const icon =
    kind === "warn"
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>';
  return `<div class="callout${kind ? " " + kind : ""}">
      <div class="callout-title">${icon}${title}</div>
      ${body}
    </div>`;
}

function bullets(items) {
  return `<ul class="bullets">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
}

/* Mirrors page.js table(): th scope, a caption, and a focusable scroll region.
   See the comment there for why each of the three is not optional. */
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

function related(items) {
  return `<h2>Related calculators</h2>
    <div class="grid grid-2" style="margin-top:8px">
      ${items
        .map(
          ([href, title, blurb]) =>
            `<a class="calc-tile-link" href="${href}"><div class="card card-hover" style="padding:20px"><h3 style="font-size:1.05rem;font-family:var(--font-display)">${title} →</h3><p class="text-muted" style="font-size:.9rem;margin-top:6px">${blurb}</p></div></a>`
        )
        .join("\n      ")}
    </div>`;
}

/* --------------------------------------------------------------- layout --- */

/**
 * cfg = {
 *   slug, title, desc, ogTitle, ogDesc,
 *   h1, lead, crumbName, appName,
 *   formId, jsName, js,
 *   inputs, results, floatBar, prose,
 *   faq: [[q,a]], related: [[href,title,blurb]],
 *   sources: [ ... ]
 * }
 */
function buildCalc(cfg) {
  const url = "/calculators/" + cfg.slug + "/";
  const graph = [
    ORG,
    WEBSITE,
    {
      "@type": ["WebPage", "WebApplication"],
      "@id": SITE + url,
      name: deent(cfg.appName || cfg.h1),
      url: SITE + url,
      description: deent(cfg.desc),
      inLanguage: "en-US",
      applicationCategory: "FinanceApplication",
      applicationSubCategory: "Vehicle cost calculator",
      operatingSystem: "Web browser",
      browserRequirements: "Requires JavaScript",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      isPartOf: { "@id": SITE + "/#website" },
      publisher: { "@id": SITE + "/#org" },
      datePublished: cfg.published || "2026-07-23",
      dateModified: cfg.modified || REVIEWED_ISO,
      breadcrumb: { "@id": SITE + url + "#breadcrumb" },
    },
    Object.assign(
      { "@id": SITE + url + "#breadcrumb" },
      crumbs([
        ["Home", "/"],
        ["Calculators", "/calculators/"],
        [cfg.crumbName, url],
      ])
    ),
    ...(cfg.faq && cfg.faq.length ? [faqSchema(cfg.faq)] : []),
    ...(cfg.schemaExtra || []),
  ];

  const html =
    head({
      title: cfg.title,
      desc: cfg.desc,
      url,
      ogTitle: cfg.ogTitle,
      ogDesc: cfg.ogDesc,
      schema: { "@context": "https://schema.org", "@graph": graph },
    }) +
    nav("/calculators/") +
    `
<main id="main">
<section class="section-tight" style="padding-top:28px">
  <div class="container">
    ${crumbHtml(
      [
        ["Home", "/"],
        ["Calculators", "/calculators/"],
      ],
      cfg.crumbName
    )}
    <div class="section-head" style="margin-bottom:26px">
      <span class="eyebrow"><span class="dot dot-pulse" style="color:var(--success)"></span>Live calculator</span>
      <h1 style="font-size:var(--fs-h1);margin-top:14px">${cfg.h1}</h1>
      <p style="max-width:64ch">${cfg.lead}</p>
    </div>

    <div class="calc-shell" id="calc">
      <div class="calc-panel">
        <form class="card" id="${cfg.formId}" autocomplete="off" aria-label="${cfg.crumbName} inputs">
          <div class="calc-inputs">
            ${cfg.inputs}
            ${ACTIONS}
          </div>
        </form>
      </div>

      <div class="results-col">
        ${cfg.results}
        <p class="text-muted" style="font-size:.82rem">${
          cfg.disclaimer ||
          "Estimates based on the assumptions above. Actual costs vary by vehicle, location, driving pattern and market conditions. Not financial advice."
        }</p>
      </div>
    </div>
  </div>
</section>

${cfg.floatBar || ""}

<section class="section bg-subtle">
  <div class="container container-narrow prose">
    ${cfg.prose}

    <h2 id="faq">Frequently asked questions</h2>
    ${faqHtml(cfg.faq)}

    ${cfg.sources ? sourcesBlock(cfg.sources, cfg.sourceNotes) : ""}

    ${related(cfg.related)}
  </div>
</section>
</main>
` +
    FOOTER +
    `\n<script src="/assets/js/main.js"></script>
<script src="/assets/js/calc-kit.js"></script>
<script src="/assets/js/${cfg.jsName}.js"></script>
</body>
</html>
`;

  return { url, html, js: cfg.js, jsName: cfg.jsName };
}

function writeCalc(cfg) {
  const out = buildCalc(cfg);
  const dest = path.join(ROOT, out.url.replace(/^\//, ""), "index.html");
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, out.html);
  const jsDest = path.join(ROOT, "assets/js", out.jsName + ".js");
  fs.writeFileSync(jsDest, out.js);
  console.log("  wrote", out.url.padEnd(34), "+ assets/js/" + out.jsName + ".js");
}

module.exports = {
  buildCalc, writeCalc, num, rng, seg, group, advanced, ACTIONS,
  hero, tiles, chartCard, callout, bullets, table, related, svg, arrow, SITE,
  sourcesBlock, cite, CITE,
};
