"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..");
const read = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, "src", "content", p), "utf8"));

const company = read("company.json");
const site = read("site.json");
const manifest = read("image-manifest.json");

/* ---------- text ---------- */
const esc = (s) =>
  String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const attr = (s) => esc(s);
const stripTags = (s) => String(s || "").replace(/<[^>]*>/g, "");
const truncate = (s, n) => (s.length <= n ? s : s.slice(0, n - 1).replace(/\s\S*$/, "") + "\u2026");
const words = (s) => stripTags(s).trim().split(/\s+/).filter(Boolean).length;

/* ---------- responsive images ----------
   Emits <picture> with WebP first and a JPEG fallback, explicit width/height
   to reserve layout space (no CLS), and sane sizes hints. */
function picture(slug, alt, opts) {
  const o = Object.assign({ sizes: "100vw", eager: false, className: "", dir: "images" }, opts || {});
  const m = manifest[slug];
  if (!m) return `<!-- missing image: ${esc(slug)} -->`;
  const base = `/${o.dir}/${slug}`;
  const set = (ext) => m.widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");
  const fallback = `${base}-${m.widths[m.widths.length - 1]}.jpg`;
  const jpgSrcset = "";
  const loading = o.eager ? "" : ' loading="lazy" decoding="async"';
  const fetchpri = o.eager ? ' fetchpriority="high" decoding="async"' : "";
  const lqip = `${base}-lqip.webp`;
  return `<picture style="background-image:url(${lqip});background-size:cover;background-position:center">
<source type="image/webp" srcset="${set("webp")}" sizes="${attr(o.sizes)}">
<img src="${fallback}"${jpgSrcset} sizes="${attr(o.sizes)}" width="${m.width}" height="${m.height}" alt="${attr(alt)}"${loading}${fetchpri}${o.className ? ` class="${attr(o.className)}"` : ""}>
</picture>`;
}
const imageUrl = (slug, w) => {
  const m = manifest[slug];
  if (!m) return null;
  const width = m.widths.reduce((a, b) => (Math.abs(b - (w || 1280)) < Math.abs(a - (w || 1280)) ? b : a));
  return `${company.siteUrl}/images/${slug}-${width}.jpg`;
};

/* ---------- icons (inline, no icon font) ---------- */
/* ---------- icon set ----------
   One geometric system: 24x24 grid, 1.7 stroke, round caps and joins,
   currentColor. Every icon means something specific to this trade — nothing
   decorative, nothing generic. */
const svg = (body, size) =>
  `<svg width="${size || 22}" height="${size || 22}" viewBox="0 0 24 24" fill="none" ` +
  `stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" ` +
  `aria-hidden="true" focusable="false">${body}</svg>`;

const I = {
  /* trust */
  shield:  svg('<path d="M12 2.6 4.5 5.6v5.9c0 4.6 3.2 8.1 7.5 9.3 4.3-1.2 7.5-4.7 7.5-9.3V5.6L12 2.6Z"/><path d="m8.6 11.7 2.4 2.4 4.6-4.8"/>'),
  check:   svg('<path d="M4.5 12.5 9.5 17.5 19.5 6.8"/>', 18),
  badge:   svg('<circle cx="12" cy="9.5" r="5.6"/><path d="m8.4 14.2-1.5 7 5.1-2.6 5.1 2.6-1.5-7"/>'),
  clip:    svg('<path d="M9 4.5H7.4A1.9 1.9 0 0 0 5.5 6.4v13.2a1.9 1.9 0 0 0 1.9 1.9h9.2a1.9 1.9 0 0 0 1.9-1.9V6.4a1.9 1.9 0 0 0-1.9-1.9H15"/><rect x="9" y="2.6" width="6" height="3.8" rx="1.1"/><path d="m9.6 13.4 1.8 1.8 3.4-3.6"/>'),
  /* the work */
  roof:    svg('<path d="M2.4 12.4 12 4.2l9.6 8.2"/><path d="M5.6 14.9v5.9h12.8v-5.9"/><path d="M10.4 20.8v-4.1h3.2v4.1"/>'),
  home:    svg('<path d="M3.4 10.6 12 3.8l8.6 6.8v9a1.6 1.6 0 0 1-1.6 1.6H5a1.6 1.6 0 0 1-1.6-1.6Z"/><path d="M9.3 21.2v-7.1h5.4v7.1"/>'),
  hammer:  svg('<path d="m14.6 6.4 3-3 4 4-3 3"/><path d="m16.1 7.9-8.4 8.4"/><path d="m9.2 14.8-5.9 5.9 2.6 2.6"/><path d="M11 4.6 8.4 2 2.9 7.5l2.6 2.6"/>'),
  inspect: svg('<circle cx="10.8" cy="10.8" r="6.6"/><path d="m15.6 15.6 4.6 4.6"/><path d="M8.2 10.8h5.2M10.8 8.2v5.2"/>'),
  layers:  svg('<path d="m12 3.2 8.6 4.6L12 12.4 3.4 7.8Z"/><path d="m3.4 12.2 8.6 4.6 8.6-4.6"/><path d="m3.4 16.4 8.6 4.6 8.6-4.6"/>'),
  /* weather + water */
  storm:   svg('<path d="M7.4 15.8a4 4 0 0 1 .5-8 5.4 5.4 0 0 1 10.2 1.6 3.6 3.6 0 0 1-.7 7"/><path d="m12.6 12.4-2.5 4.2h3.4l-2.1 4"/>'),
  drop:    svg('<path d="M12 3.2c3.2 3.6 5.4 6.4 5.4 9.1A5.4 5.4 0 0 1 6.6 12.3c0-2.7 2.2-5.5 5.4-9.1Z"/><path d="M9.6 13.6a2.6 2.6 0 0 0 2.6 2.6"/>'),
  fence:   svg('<path d="M5.2 21V8.4L7.8 5l2.6 3.4V21"/><path d="M13.6 21V8.4L16.2 5l2.6 3.4V21"/><path d="M2.6 11.4h18.8M2.6 15.6h18.8"/>'),
  /* interface */
  phone:   svg('<path d="M6.6 3.4h-2A1.9 1.9 0 0 0 2.7 5.6c.5 6.9 6 12.4 12.9 12.9a1.9 1.9 0 0 0 2.1-1.9v-2a1.6 1.6 0 0 0-1.3-1.6l-2.4-.5a1.6 1.6 0 0 0-1.6.6l-.7 1a13.6 13.6 0 0 1-4.6-4.6l1-.7a1.6 1.6 0 0 0 .6-1.6l-.5-2.4a1.6 1.6 0 0 0-1.6-1.4Z"/>', 17),
  mail:    svg('<rect x="2.8" y="5" width="18.4" height="14" rx="2.2"/><path d="m3.4 6.6 8.6 6.2 8.6-6.2"/>', 18),
  arrow:   svg('<path d="M4.4 12h15.2m0 0-5.6-5.6M19.6 12l-5.6 5.6"/>', 16),
  pin:     svg('<path d="M12 21.4s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10.2" r="2.6"/>'),
  clock:   svg('<circle cx="12" cy="12" r="8.8"/><path d="M12 6.8V12l3.4 2"/>'),
  quote:   svg('<path d="M9.4 6.6C6.6 8 5.2 10.2 5.2 13c0 2.4 1.4 4.2 3.4 4.2 1.8 0 3.1-1.3 3.1-3 0-1.7-1.2-2.9-2.8-2.9-.3 0-.6 0-.9.2.3-1.5 1.4-2.8 3-3.6ZM18 6.6c-2.8 1.4-4.2 3.6-4.2 6.4 0 2.4 1.4 4.2 3.4 4.2 1.8 0 3.1-1.3 3.1-3 0-1.7-1.2-2.9-2.8-2.9-.3 0-.6 0-.9.2.3-1.5 1.4-2.8 3-3.6Z"/>')
};

/* Service pages get the icon that matches the work, not a generic mark. */
const SERVICE_ICON = {
  "roof-replacement": "roof", "roof-repair": "hammer", "residential-roofing": "home",
  "roof-inspections": "inspect", "asphalt-shingle-roofing": "layers",
  "storm-damage-roof-repair": "storm", "hail-damage-roof-repair": "storm",
  "wind-damage-roof-repair": "storm", "roof-leak-repair": "drop",
  "storm-damage-inspections": "inspect", "insurance-restoration-support": "clip",
  "emergency-roof-tarping": "shield", "roof-maintenance": "clock",
  "roof-ventilation": "home", "roof-flashing-repair": "hammer",
  "chimney-roof-penetration-repair": "hammer", "new-construction-roofing": "roof",
  "gutter-installation": "drop", "seamless-gutters": "drop", "gutter-repair": "drop",
  "gutter-guards": "shield", "fascia-soffit-repair": "hammer",
  "siding-repair": "hammer", "siding-installation": "layers", "exterior-painting": "layers",
  "fence-installation": "fence", "fence-repair": "fence",
  "outdoor-home-improvements": "hammer", "exterior-storm-damage-repair": "storm"
};

/* Each confirmed claim gets the icon that actually represents it. */
const TRUST_ICON = {
  "Free inspections": "inspect",
  "Free estimates": "clip",
  "Fully insured": "shield",
  "Licensed inspectors": "badge",
  "DFW and North Texas": "pin"
};

const win = (lit) => `<span class="win${lit ? " win--lit" : ""}" aria-hidden="true"><i></i><i></i><i></i><i></i></span>`;
const ridge = () =>
  `<svg class="ridge" viewBox="0 0 1200 26" preserveAspectRatio="none" aria-hidden="true"><polyline points="0,24 600,2 1200,24"/></svg>`;

/* ---------- SEO head ---------- */
function head(o) {
  const url = company.siteUrl + o.path;
  const title = o.title;
  const desc = truncate(stripTags(o.description), 158);
  const img = o.image ? imageUrl(o.image, 1280) : `${company.siteUrl}/logo/timber-social.jpg`;
  const robots = o.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large";
  let preloadHero = "";
  if (o.preload && manifest[o.preload]) {
    const w = manifest[o.preload].widths;
    const big = w[w.length - 1];
    const set = w.map((x) => `/images/${o.preload}-${x}.webp ${x}w`).join(", ");
    preloadHero = `<link rel="preload" as="image" href="/images/${o.preload}-${big}.webp" imagesrcset="${set}" imagesizes="(min-width:900px) 50vw, 100vw" type="image/webp">`;
  }
  return `<!DOCTYPE html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${attr(desc)}">
<link rel="canonical" href="${attr(url)}">
<meta name="robots" content="${robots}">
<meta name="theme-color" content="#0B1E3D">
<meta property="og:type" content="${o.ogType || "website"}">
<meta property="og:site_name" content="${attr(company.name)}">
<meta property="og:title" content="${attr(title)}">
<meta property="og:description" content="${attr(desc)}">
<meta property="og:url" content="${attr(url)}">
<meta property="og:image" content="${attr(img)}">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${attr(title)}">
<meta name="twitter:description" content="${attr(desc)}">
<meta name="twitter:image" content="${attr(img)}">
<link rel="icon" href="/logo/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/logo/favicon-180.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Source+Sans+3:wght@400;600;700&display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Source+Sans+3:wght@400;600;700&display=swap"></noscript>
<style>html{background:#0B1E3D}body{margin:0}#loader{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:1.15rem;background:radial-gradient(120% 90% at 50% 42%,#14294A 0%,#071429 64%)}html.seen #loader{display:none}#loader .boot{display:grid;justify-items:center;width:min(300px,68vw)}#loader .boot__build{width:100%;height:auto}/* Failsafes, in the critical CSS so they work even if site.css or site.js never arrive. The loader clears itself on a timer with no JS involved — a missing asset must never leave the page unusable. */#loader{animation:bootBail .5s ease 4s forwards}@keyframes bootBail{to{opacity:0;visibility:hidden;pointer-events:none}}#loader[data-done="true"]{animation:none}.jump{position:absolute;left:-9999px}.brandmark img{height:44px;width:auto;object-fit:contain}.mainnav{display:none}.navpanel,.megapanel{position:absolute;opacity:0;visibility:hidden}.drawer{position:fixed;inset:0;transform:translateX(100%);visibility:hidden}.dock{position:fixed;left:0;right:0;bottom:0;transform:translateY(140%)}</style>
<script>/* Loader gate. Runs before first paint so nothing flashes behind it.

Shows on a genuinely new arrival AND on a manual refresh — a reload is an
explicit request to see the site start again. Stays out of the way for the
navigation that actually matters: clicking an internal link, and back/forward,
both of which keep the session marker and are reported as 'navigate' and
'back_forward' respectively.

If storage is unavailable the loader is skipped rather than risking trapping
anyone behind it. */
(function(){var h=document.documentElement,reload=false;
try{var e=(performance.getEntriesByType&&performance.getEntriesByType('navigation')[0]);
reload=e?e.type==='reload':(performance.navigation&&performance.navigation.type===1);}catch(x){}
try{if(!reload&&sessionStorage.getItem('tre_entered')){h.className+=' seen';return;}
sessionStorage.setItem('tre_entered','1');}catch(x){h.className+=' seen';return;}
h.style.overflow='hidden';setTimeout(function(){h.style.overflow='';},3500);})();</script>
<link rel="stylesheet" href="/assets/site.css?v=${(global.ASSET_HASH || {}).css || "1"}">
${preloadHero}
<!-- ANALYTICS: paste the Google Tag Manager or GA4 snippet here once Drew supplies the container ID.
     No placeholder IDs are shipped on purpose. site.js already pushes: call_click, email_click,
     form_start, form_submit, gallery_filter, comparison_interact, page_engagement. -->
${(o.schema || []).map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join("\n")}
</head>`;
}

/* ---------- JSON-LD ---------- */
const ORG_ID = company.siteUrl + "/#organization";
const SITE_ID = company.siteUrl + "/#website";

function organization() {
  const o = {
    "@context": "https://schema.org",
    "@type": ["RoofingContractor", "LocalBusiness"],
    "@id": ORG_ID,
    name: company.name,
    url: company.siteUrl + "/",
    description: company.description,
    slogan: company.tagline,
    telephone: company.phone,
    email: company.email,
    image: company.siteUrl + "/logo/timber-social.jpg",
    logo: { "@type": "ImageObject", url: company.siteUrl + "/logo/timber-full-540.png" },
    areaServed: { "@type": "GeoCircle", name: company.serviceAreaSummary,
      geoMidpoint: { "@type": "GeoCoordinates", latitude: company.geo.lat, longitude: company.geo.lng },
      geoRadius: company.geo.radiusMeters },
    knowsAbout: ["Roof replacement", "Roof repair", "Roof inspection", "Storm damage restoration", "Gutters", "Exterior improvements"]
  };
  // Only emit an address if Drew has actually supplied one.
  if (company.address) o.address = Object.assign({ "@type": "PostalAddress" }, company.address);
  // No aggregateRating, no review: none exist yet. Adding fake ones is a penalty risk.
  return o;
}

function website() {
  return {
    "@context": "https://schema.org", "@type": "WebSite", "@id": SITE_ID,
    url: company.siteUrl + "/", name: company.name, publisher: { "@id": ORG_ID }, inLanguage: "en-US"
  };
}

function breadcrumbs(trail) {
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem", position: i + 1, name: t.label,
      item: company.siteUrl + t.href
    }))
  };
}

function serviceSchema(s, urlPath) {
  return {
    "@context": "https://schema.org", "@type": "Service",
    "@id": company.siteUrl + urlPath + "#service",
    name: s.name, description: stripTags(s.description),
    serviceType: s.name,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "AdministrativeArea", name: company.serviceAreaSummary },
    url: company.siteUrl + urlPath
  };
}

/* FAQPage is only emitted when the questions are visibly rendered on the page. */
function faqSchema(faqs) {
  if (!faqs || !faqs.length) return null;
  return {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question", name: stripTags(f.q),
      acceptedAnswer: { "@type": "Answer", text: stripTags(f.a) }
    }))
  };
}

function articleSchema(a, urlPath) {
  return {
    "@context": "https://schema.org", "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.updated, dateModified: a.updated,
    author: { "@id": ORG_ID }, publisher: { "@id": ORG_ID },
    mainEntityOfPage: company.siteUrl + urlPath,
    image: a.image ? imageUrl(a.image, 1280) : undefined,
    inLanguage: "en-US"
  };
}

function imageObject(slug, caption) {
  const m = manifest[slug];
  if (!m) return null;
  return {
    "@context": "https://schema.org", "@type": "ImageObject",
    contentUrl: imageUrl(slug, 1280), width: m.width, height: m.height,
    caption: stripTags(caption), creditText: company.name, creator: { "@id": ORG_ID }
  };
}

module.exports = {
  ROOT, read, company, site, manifest,
  esc, attr, stripTags, truncate, words,
  picture, imageUrl, I, TRUST_ICON, SERVICE_ICON, svg, win, ridge, head,
  organization, website, breadcrumbs, serviceSchema, faqSchema, articleSchema, imageObject,
  ORG_ID, SITE_ID
};
