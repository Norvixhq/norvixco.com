/* Canonical shell fragments for MyDrivingCost.com
   Every page uses root-absolute, extensionless URLs. No .html, no # anywhere. */

const SITE = "https://mydrivingcost.com";

const TOPICS = [
  ["/fuel-and-ev/", "Fuel &amp; EV", "Gas vs electric, cost per mile, charging"],
  ["/insurance/", "Insurance", "What moves a premium and how to trim it"],
  ["/depreciation/", "Depreciation", "The biggest cost nobody bills you for"],
  ["/maintenance/", "Maintenance", "Service and repair costs by age and mileage"],
  ["/buying-guides/", "Buying guides", "Lease vs buy, new vs used, trade-in timing"],
];

const ico = {
  bolt: '<path d="M13 2 4 14h7l-2 8 9-12h-7l2-8z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  trend: '<path d="M3 17l6-6 4 4 8-8"/><path d="M17 7h4v4"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-7 7 2 2 7-7a4 4 0 0 0 5.4-5.4l-2.3 2.3-2-2 2.3-2.3z"/>',
  bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/>',
  grid: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7h8M8 12h8M8 17h5"/>',
  gauge: '<path d="M3 12h4l3 8 4-16 3 8h4"/>',
  doc: '<path d="M14 2v6h6M4 22V6a2 2 0 0 1 2-2h8l6 6v12"/><path d="M8 13h8M8 17h8"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>',
  dollar: '<path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 21v-6h6v6"/>',
  car: '<path d="M5 17h14M6.5 17V9.5L8 6h8l1.5 3.5V17"/><circle cx="8" cy="17" r="1.6"/><circle cx="16" cy="17" r="1.6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  layers: '<path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>',
  bars: '<path d="M12 20V10M18 20V4M6 20v-4"/>',
  scale: '<path d="M12 3v18M7 7 3 15h8L7 7zM17 7l-4 8h8l-4-8z"/><path d="M5 21h14"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  route: '<path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 0 1 0 10h-2M8 12h8"/>',
  globe: '<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
  cart: '<path d="M3 6h18l-2 13H5L3 6z"/><path d="M3 6 2 2M9 11v4M15 11v4"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
  book: '<path d="M4 4h13a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4z"/><path d="M4 17a3 3 0 0 1 3-3h13"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
};

const svg = (k, sw) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw || 2}" stroke-linecap="round" stroke-linejoin="round">${ico[k]}</svg>`;

const arrow = (s) =>
  `<svg width="${s || 18}" height="${s || 18}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

/* ---------------------------------------------------------------- NAV --- */
function nav(active) {
  const isTopic = TOPICS.some(([h]) => h === active);
  const items = TOPICS.map(
    ([href, label, desc]) =>
      `<a class="nav-menu-item${href === active ? " active" : ""}" href="${href}"><span class="nmi-ico">${svg(
        { "/fuel-and-ev/": "bolt", "/insurance/": "shield", "/depreciation/": "trend", "/maintenance/": "wrench", "/buying-guides/": "bag" }[href]
      )}</span><span><strong>${label}</strong><em>${desc}</em></span></a>`
  ).join("\n            ");

  return `<header class="nav">
  <div class="container">
    <a class="brand" href="/" aria-label="MyDrivingCost.com — home">
      <img class="brand-logo light-only" src="/assets/img/logo-h.png" alt="" width="209" height="38">
      <img class="brand-logo dark-only" src="/assets/img/logo-h-dark.png" alt="" width="209" height="38">
    </a>
    <nav class="nav-links" aria-label="Primary">
      <a class="nav-link${active === "/" ? " active" : ""}" href="/">Home</a>
      <a class="nav-link${active && active.indexOf("/calculators/") === 0 ? " active" : ""}" href="/calculators/">Calculators</a>
      <div class="nav-drop">
        <button type="button" class="nav-link nav-drop-btn${isTopic ? " active" : ""}" aria-expanded="false" aria-controls="topics-menu">Topics <svg class="chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></button>
        <div class="nav-menu" id="topics-menu">
          <div class="nav-menu-inner">
            ${items}
            <a class="nav-menu-all" href="/guides/">All guides &amp; resources ${arrow(15)}</a>
          </div>
        </div>
      </div>
      <a class="nav-link${active === "/about/" ? " active" : ""}" href="/about/">About</a>
    </nav>
    <div class="nav-spacer"></div>
    <div class="nav-actions">
      <button class="theme-toggle" data-theme-toggle aria-label="Toggle dark mode" title="Toggle dark mode">
        <svg class="moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        <svg class="sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
      </button>
      <a class="btn btn-primary btn-sm no-print" href="/calculators/true-cost-to-own/">Calculate cost</a>
      <button class="nav-toggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>`;
}

/* ------------------------------------------------------------- FOOTER --- */
const FOOTER = `<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <a class="brand" href="/" aria-label="MyDrivingCost.com — home">
          <img class="brand-logo light-only" src="/assets/img/logo.png" alt="" width="127" height="66">
          <img class="brand-logo dark-only" src="/assets/img/logo-dark.png" alt="" width="127" height="66">
        </a>
        <p class="footer-about">Know the real cost before you drive. Free, transparent tools for the true, total cost of vehicle ownership.</p>
      </div>
      <div class="footer-col"><h3>Cost calculators</h3><a href="/calculators/true-cost-to-own/">True Cost to Own</a><a href="/calculators/cost-per-mile/">Cost Per Mile</a><a href="/calculators/ten-year-cost/">10-Year Cost</a><a href="/calculators/depreciation/">Depreciation</a><a href="/calculators/maintenance-cost/">Maintenance Cost</a><a href="/calculators/insurance-estimator/">Insurance Estimator</a><a href="/calculators/monthly-budget/">Monthly Budget</a></div>
      <div class="footer-col"><h3>Buying &amp; fuel</h3><a href="/calculators/lease-vs-buy/">Lease vs Buy</a><a href="/calculators/new-vs-used/">New vs Used</a><a href="/calculators/auto-loan/">Auto Loan</a><a href="/calculators/affordability/">Affordability</a><a href="/calculators/trade-in-value/">Trade-In Value</a><a href="/calculators/fuel-cost/">Fuel Cost</a><a href="/calculators/ev-charging/">EV Charging</a><a href="/calculators/road-trip/">Road Trip Cost</a><a href="/calculators/">All 15 calculators</a></div>
      <div class="footer-col"><h3>Topics</h3><a href="/fuel-and-ev/">Fuel &amp; EV</a><a href="/insurance/">Insurance</a><a href="/maintenance/">Maintenance</a><a href="/depreciation/">Depreciation</a><a href="/buying-guides/">Buying guides</a><a href="/guides/">Guides &amp; resources</a></div>
      <div class="footer-col"><h3>Company</h3><a href="/about/">About us</a><a href="/methodology/">Methodology</a><a href="/editorial-standards/">Editorial standards</a><a href="/contact/">Contact</a><a href="/faq/">FAQ</a><a href="/privacy/">Privacy policy</a><a href="/terms/">Terms of use</a><a href="/disclaimer/">Disclaimer</a><a href="/sitemap.xml">Sitemap</a></div>
    </div>
    <div class="footer-bottom">
      <p>© <span data-year>2026</span> MyDrivingCost.com · Know the Real Cost Before You Drive</p>
      <p>Made for drivers, not dealerships.</p>
    </div>
    <p class="footer-disclaimer">The calculators and content on MyDrivingCost.com are provided for general informational and educational purposes only and represent estimates based on the assumptions you provide. They are not financial, tax, insurance, or purchasing advice, and actual costs will vary by vehicle, location, market conditions, driving behavior and other factors. Verify important figures independently and consult a qualified professional before making a purchase or financing decision.</p>
  </div>
</footer>`;

/* --------------------------------------------------------------- HEAD --- */
function head({ title, desc, url, ogTitle, ogDesc, schema, extraHead, robots, noCanonical }) {
  const canon = SITE + url;
  /* The 404 document is served from many URLs, so it must not claim a canonical
     or an og:url — either would tell a crawler that some arbitrary broken path
     is the real address of the error page. "noindex, follow" still lets link
     equity pass through the recovery links it offers. */
  const canonTags = noCanonical ? "" : `<link rel="canonical" href="${canon}">\n`;
  const ogUrlTag = noCanonical ? "" : `<meta property="og:url" content="${canon}">\n`;
  return `<!DOCTYPE html>
<html lang="en-US" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="${robots || "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"}">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0b1220" media="(prefers-color-scheme: dark)">
${canonTags}<meta property="og:type" content="website">
<meta property="og:site_name" content="MyDrivingCost.com">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="${ogTitle || title}">
<meta property="og:description" content="${ogDesc || desc}">
${ogUrlTag}<meta property="og:image" content="${SITE}/assets/img/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="MyDrivingCost.com — Know the Real Cost Before You Drive">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${ogTitle || title}">
<meta name="twitter:description" content="${ogDesc || desc}">
<meta name="twitter:image" content="${SITE}/assets/img/og-image.jpg">
<meta name="twitter:image:alt" content="MyDrivingCost.com — Know the Real Cost Before You Drive">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/img/icon-192.png" type="image/png" sizes="192x192">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/assets/fonts/inter-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/sora-latin-700-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/fonts.css">
<script>(function(){try{var t=localStorage.getItem('mdc-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}document.documentElement.classList.add('js');})();</script>
<link rel="stylesheet" href="/assets/css/styles.css">${extraHead || ""}
<script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
</script>
</head>
<body>
<a class="skip-link" href="#main" data-skip>Skip to content</a>
`;
}

/* ------------------------------------------------------------- SCHEMA --- */
/* One canonical Organization and WebSite node, embedded in full on every page
   rather than referenced by @id from a definition that lives elsewhere.
   Google evaluates each URL's structured data in isolation, so a bare
   {"@id": ".../#org"} pointing at a node defined only on the homepage is a
   dangling reference and yields no publisher data at all. */

const REVIEWED_ISO = require("./constants").REVIEWED_ISO;

const ORG = {
  "@type": "Organization",
  "@id": SITE + "/#org",
  name: "MyDrivingCost.com",
  alternateName: "MyDrivingCost",
  url: SITE + "/",
  slogan: "Know the Real Cost Before You Drive",
  description:
    "An independent publisher of vehicle ownership-cost calculators and reference data. Not a dealer, lender, insurer, broker or lead generator.",
  logo: {
    "@type": "ImageObject",
    "@id": SITE + "/#logo",
    url: SITE + "/assets/img/logo.png",
    contentUrl: SITE + "/assets/img/logo.png",
    width: 381,
    height: 198,
    caption: "MyDrivingCost.com",
  },
  image: { "@id": SITE + "/#logo" },
  email: "hello@mydrivingcost.com",
  contactPoint: [
    { "@type": "ContactPoint", contactType: "customer support", email: "hello@mydrivingcost.com", availableLanguage: "en-US" },
    { "@type": "ContactPoint", contactType: "editorial corrections", email: "corrections@mydrivingcost.com", availableLanguage: "en-US" },
    { "@type": "ContactPoint", contactType: "press", email: "press@mydrivingcost.com", availableLanguage: "en-US" },
  ],
  publishingPrinciples: SITE + "/editorial-standards/",
  ethicsPolicy: SITE + "/editorial-standards/",
  correctionsPolicy: SITE + "/editorial-standards/",
  knowsAbout: [
    "Vehicle ownership costs",
    "Car depreciation",
    "Auto loan financing",
    "Car insurance premiums",
    "Vehicle maintenance costs",
    "Electric vehicle charging costs",
    "Fuel economy",
  ],
};

const WEBSITE = {
  "@type": "WebSite",
  "@id": SITE + "/#website",
  url: SITE + "/",
  name: "MyDrivingCost.com",
  description:
    "Free, transparent calculators for the true, total cost of owning and running a vehicle.",
  publisher: { "@id": SITE + "/#org" },
  inLanguage: "en-US",
};

/* JSON-LD is not HTML. An entity written for the visible page - "Fuel &amp; EV",
   an &mdash; inside an FAQ answer - survives verbatim into the structured data,
   where a parser reads it literally and Google indexes the ampersand-a-m-p.
   Every string that crosses from page copy into schema goes through this.
   Order matters: &amp; is decoded last so "&amp;mdash;" cannot double-decode
   into an em dash. */
function deent(s) {
  return String(s)
    .replace(/<[^>]+>/g, "")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&hellip;/g, "…")
    .replace(/&nbsp;/g, " ")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rsquo;/g, "’")
    .replace(/&#0?39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

/* Breadcrumb schema helper */
function crumbs(list) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: list.map(([name, url], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: deent(name),
      item: SITE + url,
    })),
  };
}

function crumbHtml(list, current) {
  const parts = list
    .map(([name, url]) => `<a href="${url}">${name}</a><span class="sep">/</span>`)
    .join("");
  return `<nav class="breadcrumb" aria-label="Breadcrumb">${parts}<span aria-current="page">${current}</span></nav>`;
}

function faqSchema(pairs) {
  return {
    "@type": "FAQPage",
    mainEntity: pairs.map(([q, a]) => ({
      "@type": "Question",
      name: deent(q),
      acceptedAnswer: { "@type": "Answer", text: deent(a) },
    })),
  };
}

function faqHtml(pairs) {
  return pairs
    .map(
      ([q, a]) =>
        `<details class="faq-item"><summary>${q}<span class="chev"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span></summary><div class="faq-a">${a}</div></details>`
    )
    .join("\n      ");
}

const FOOT_SCRIPTS = `<script src="/assets/js/main.js"></script>
</body>
</html>
`;

module.exports = { SITE, TOPICS, ico, svg, arrow, nav, FOOTER, head, crumbs, crumbHtml, faqSchema, faqHtml, FOOT_SCRIPTS, ORG, WEBSITE, REVIEWED_ISO, deent };
