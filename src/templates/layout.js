"use strict";
const C = require("../lib/core");
const { company, site, esc, attr, picture, I, TRUST_ICON, head } = C;

/* Navigation is generated from the location data, so new cities and counties
   appear in the mega menu and the drawer without touching this file. */
const COUNTIES = C.read("counties.json").counties;
const CITIES = C.read("cities.json").cities;
const liveCities = CITIES.filter((c) => !c.approvalRequired);
const navCounties = COUNTIES
  .filter((co) => !co.approvalRequired)
  .map((co) => ({ ...co, live: liveCities.filter((c) => c.county === co.slug) }))
  .filter((co) => co.live.length)
  .sort((a, b) => b.live.length - a.live.length);

const telHref = `tel:${company.phoneE164}`;

/* ------------------------------------------------------------------ marks -- */
const MARKS = {
  header: { base: "timber-header", w: [320, 480, 640, 800], ratio: [2305, 420] },
  full:   { base: "timber-full",   w: [360, 540, 720],      ratio: [1149, 831] },
  fullLight: { base: "timber-full-light", w: [360, 540, 720], ratio: [1149, 831] },
  mark:   { base: "timber-mark",   w: [96, 144, 192],       ratio: [694, 395] }
};
const srcset = (m) => m.w.map((w) => `/logo/${m.base}-${w}.webp ${w}w`).join(", ");

/* On navy the navy mark disappears, so dark surfaces get the light variant.
   Its knocked-out star and window pick up the background behind them. */
function fullLogo(cls, sizes, light) {
  const m = light ? MARKS.fullLight : MARKS.full;
  return `<img${cls ? ` class="${attr(cls)}"` : ""} src="/logo/${m.base}-${m.w[1]}.webp"
 srcset="${srcset(m)}" sizes="${attr(sizes || "200px")}" width="${m.ratio[0]}" height="${m.ratio[1]}"
 alt="${attr(company.name)}" decoding="async" loading="lazy">`;
}

/* Header wordmark: the horizontal lockup, whole. object-fit contain and explicit
   dimensions, so it is never cropped, stretched or shifted while loading. */
function headerLogo() {
  const m = MARKS.header;
  return `<img src="/logo/${m.base}-${m.w[2]}.webp" srcset="${srcset(m)}"
 sizes="(min-width:1440px) 286px, (min-width:1180px) 253px, (min-width:900px) 286px, (min-width:560px) 253px, 231px"
 width="${m.ratio[0]}" height="${m.ratio[1]}" alt="${attr(company.name)}" fetchpriority="high" decoding="async">`;
}

/* ----------------------------------------------------------------- loader -- */
function loader() {
  /* Drawn inline, so there is no network request to fail and nothing to wait
     for: the roof frames up, courses lay in from the eaves, and the ridge caps
     it. Roughly 1.2s, and it holds still under prefers-reduced-motion. */
  return `<div id="loader" role="status" aria-label="Loading">
<div class="boot">
  <svg class="boot__build" viewBox="0 0 168 132" role="img" aria-label="${attr(company.name)}">
    <defs><clipPath id="btRoof"><path d="M44 92 84 60l40 32z"/></clipPath></defs>
    <!-- Texas, plotted from real state coordinates, scaled so the build sits inside it -->
    <g transform="translate(22.6 3) scale(.762)">
      <path class="bt-tx" d="M46 6 84 6 84 30 94 30 109 37 119 40 134 43 152 44 159 53 159 84 162 95 161 102 147 114 129 123 116 148 116 163 95 154 80 129 66 104 53 102 44 114 24 100 2 71 1 68 44 68Z"/>
    </g>
    <g class="bt-walls"><path d="M54 88v26M114 88v26M54 114h60"/></g>
    <g class="bt-frame"><path d="M44 92 84 60l40 32"/><path d="M84 60v10M70 80h28M62 86h44"/></g>
    <g class="bt-courses" clip-path="url(#btRoof)">
      <path class="bt-c1" d="M46 92h76l-5-6H51z"/>
      <path class="bt-c2" d="M52 86h64l-5-6H57z"/>
      <path class="bt-c3" d="M58 80h52l-5-6H63z"/>
      <path class="bt-c4" d="M64 74h40l-5-6H69z"/>
      <path class="bt-c5" d="M70 68h28l-6-6H76z"/>
    </g>
    <path class="bt-ridge" d="M75 62h18"/>
    <rect class="bt-stack" x="110" y="70" width="8" height="15" rx="1.4"/>
    <g class="bt-star"><path d="M84 96l2.9 5.9 6.5 1-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5-4.7-4.6 6.5-1z"/></g>
  </svg>
  <p class="boot__tag">${esc(company.tagline)}</p>
  <div class="boot__bar" aria-hidden="true"><i></i></div>
</div>
</div>`;
}

/* -------------------------------------------------------------- masthead -- */
function topline() {
  return `<div class="topline">
  <div class="topline__in">
    <span class="topline__pip" aria-hidden="true"></span>
    <span class="topline__msg">Free roof inspections &amp; estimates across DFW and North Texas</span>
    <a class="topline__tel" href="${telHref}" data-loc="topline">${I.phone}${esc(company.phone)}</a>
  </div>
</div>`;
}

function megaMenu() {
  const cols = navCounties.slice(0, 8).map((co) => `<div>
  <a class="megagrid__head" href="/service-areas/${co.slug}/">${esc(co.name)}</a>
  <ul>
    ${co.live.slice(0, 5).map((c) => `<li><a href="/service-areas/${c.slug}/">${esc(c.name)}</a></li>`).join("")}
    ${co.live.length > 5 ? `<li><a class="megamore" href="/service-areas/${co.slug}/">More in ${esc(co.name.replace(" County", ""))} &rarr;</a></li>` : ""}
  </ul>
</div>`).join("");

  return `<div class="megapanel" id="mega-areas">
  <div class="megagrid">${cols}</div>
  <div class="megafoot">
    <p>Serving homeowners across DFW and surrounding North Texas communities. Availability beyond the core Metroplex depends on project scope.</p>
    <a class="act act--pulse" href="/service-areas/">View all service areas</a>
  </div>
</div>`;
}

function masthead(current) {
  const isCur = (href) => (href === current ? ' aria-current="page"' : "");

  /* Exactly one item may show the active rule. Several can legitimately match
     — Storm Damage's children all live under /roofing/, so a storm service page
     matches both — so score them and mark only the winner. A URL-prefix match
     wins, because that is the section the breadcrumb names. */
  const scored = site.nav
    .filter((n) => n.href !== "/")
    .map((n) => {
      if (n.href === current) return null;
      if (current.indexOf(n.href) === 0) return { href: n.href, score: 2 };
      if ((n.children || []).some((c) => c.href === current)) return { href: n.href, score: 1 };
      return null;
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || b.href.length - a.href.length);
  const activeBranch = scored.length ? scored[0].href : null;
  const branch = (n) => (n.href === activeBranch ? ' data-branch="true"' : "");

  const caret = `<svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m3 4.5 3 3 3-3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const items = site.nav.filter((n) => n.href !== "/").map((n) => {
    if (n.href === "/service-areas/") {
      return `<li class="wide" data-menu data-open="false">
        <a class="navlink" href="${n.href}" aria-expanded="false" aria-controls="mega-areas"${isCur(n.href)}${branch(n)}>${esc(n.short || n.label)}${caret}</a>
        ${megaMenu()}</li>`;
    }
    if (n.children) {
      const id = "menu-" + attr(n.href.replace(/\//g, ""));
      return `<li data-menu data-open="false">
        <a class="navlink" href="${n.href}" aria-expanded="false" aria-controls="${id}"${isCur(n.href)}${branch(n)}>${esc(n.short || n.label)}${caret}</a>
        <div class="navpanel" id="${id}"><ul>
          <li><a href="${n.href}">All ${esc(n.label.toLowerCase())}</a></li>
          ${n.children.map((c) => `<li><a href="${c.href}"${isCur(c.href)}>${esc(c.label)}</a></li>`).join("")}
        </ul></div></li>`;
    }
    return `<li><a class="navlink" href="${n.href}"${isCur(n.href)}${branch(n)}>${esc(n.short || n.label)}</a></li>`;
  }).join("");

  return `<a class="jump" href="#main">Skip to main content</a>
${topline()}
<header class="masthead" data-stuck="false">
  <div class="shell masthead__bar">
    <a class="brandmark" href="/" aria-label="${attr(company.name)} \u2014 home">${headerLogo()}</a>
    <nav class="mainnav" aria-label="Primary"><ul>${items}</ul></nav>
    <div class="headacts">
      <a class="headtel" href="${telHref}" data-loc="masthead">
        <span class="headtel__ico">${I.phone}</span>
        <span class="headtel__txt"><span>Call us</span><strong>${esc(company.phone)}</strong></span>
      </a>
      <a class="act act--pulse headcta" href="/contact/">${esc(company.cta.header)}</a>
      <a class="callbtn" href="${telHref}" data-loc="masthead-compact" aria-label="Call ${attr(company.phone)}">${I.phone}</a>
      <button class="menubtn" id="menubtn" type="button" aria-expanded="false" aria-controls="drawer" aria-label="Open menu"><i></i><i></i><i></i></button>
    </div>
  </div>
</header>
${drawer()}`;
}

/* ----------------------------------------------------------------- drawer -- */
function drawer() {
  const chev = `<svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="m3.5 5.5 3.5 3.5 3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  let n = 0;

  const branch = (label, href, children) => {
    const id = `dw-${++n}`;
    return `<li>
  <div class="drawer__line">
    <a href="${href}">${esc(label)}</a>
    <button class="expand" type="button" data-expand aria-expanded="false" aria-controls="${id}" aria-label="Show ${attr(label)} links">${chev}</button>
  </div>
  <ul class="nest" id="${id}" data-open="false">${children}</ul>
</li>`;
  };

  const countyBranches = navCounties.map((co) => {
    const id = `dw-${++n}`;
    return `<li>
  <div class="drawer__line">
    <a href="/service-areas/${co.slug}/">${esc(co.name)}</a>
    <button class="expand" type="button" data-expand aria-expanded="false" aria-controls="${id}" aria-label="Show cities in ${attr(co.name)}">${chev}</button>
  </div>
  <ul class="nest" id="${id}" data-open="false">
    ${co.live.map((c) => `<li><a href="/service-areas/${c.slug}/">${esc(c.name)}</a></li>`).join("")}
  </ul>
</li>`;
  }).join("") + `<li><a href="/service-areas/">All service areas</a></li>`;

  const main = site.nav.map((nv) => {
    if (nv.href === "/service-areas/") return branch(nv.label, nv.href, countyBranches);
    if (nv.children) {
      return branch(nv.label, nv.href,
        `<li><a href="${nv.href}">All ${esc(nv.label.toLowerCase())}</a></li>` +
        nv.children.map((c) => `<li><a href="${c.href}">${esc(c.label)}</a></li>`).join(""));
    }
    return `<li><div class="drawer__line"><a href="${nv.href}">${esc(nv.label)}</a></div></li>`;
  }).join("");

  return `<div class="drawer" id="drawer" data-open="false" aria-hidden="true" aria-label="Menu">
  <div class="drawer__head">
    ${fullLogo(null, "120px", true)}
    <button class="drawer__x" type="button" aria-label="Close menu">
      <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
    </button>
  </div>
  <nav class="drawer__body" aria-label="Mobile"><ul>${main}</ul></nav>
  <div class="drawer__foot">
    <a class="act" href="/contact/">${esc(company.cta.primary)}</a>
    <a class="act act--ghost" href="${telHref}" data-loc="drawer">${I.phone} ${esc(company.phone)}</a>
  </div>
</div>`;
}

/* ------------------------------------------------------------ trust strip -- */
/* Five claims, each with a specific icon and a plain-language qualifier. */
const TRUST_NOTE = {
  "Free inspections": "Licensed inspector, on your roof",
  "Free estimates": "Written, itemised, no obligation",
  "Fully insured": "Cover in place before we start",
  "Licensed inspectors": "Assessing, not selling",
  "DFW and North Texas": "Roughly two hours from Dallas"
};

function assure() {
  return `<section class="assure" aria-label="What we can say for certain">
<div class="shell"><ul>
${company.trust.map((t) => `<li>
  <span class="assure__ico">${I[TRUST_ICON[t.label]] || I.shield}</span>
  <span class="assure__txt"><b>${esc(t.label)}</b><span>${esc(TRUST_NOTE[t.label] || t.detail)}</span></span>
</li>`).join("")}
</ul></div>
</section>`;
}

function assurance(items) {
  const list = items || ["Free inspection", "No-obligation estimate", "Fully insured", "Licensed inspectors"];
  return `<p class="assurance">${list.map((t) => `<span>${I.check}${esc(t)}</span>`).join("")}</p>`;
}

function trail(items) {
  return `<nav class="trail" aria-label="Breadcrumb"><ol>
${items.map((t, i) => i === items.length - 1
  ? `<li><span aria-current="page">${esc(t.label)}</span></li>`
  : `<li><a href="${t.href}">${esc(t.label)}</a></li>`).join("")}
</ol></nav>`;
}

function qa(faqs) {
  if (!faqs || !faqs.length) return "";
  return `<div class="qa">
${faqs.map((f) => `<details><summary>${esc(f.q)}</summary><div><p class="flush">${esc(f.a)}</p></div></details>`).join("\n")}
</div>`;
}

/* Mid-page conversion strip — light, so it reads as a pause not a wall. */
function callout(headline, sub, ctaLabel, ctaHref) {
  return `<section class="callout">
<div class="shell section--tight callout__in">
  <div>
    <h2 class="t-sect" style="margin-bottom:.65rem">${esc(headline)}</h2>
    <p class="intro flush">${esc(sub)}</p>
    ${assurance()}
  </div>
  <div class="acts">
    <a class="act act--big" href="${ctaHref || "/contact/"}">${esc(ctaLabel || company.cta.primary)}</a>
    <a class="act act--big act--ghost" href="${telHref}" data-loc="callout">${I.phone} ${esc(company.phone)}</a>
  </div>
</div>
</section>`;
}

/* Final conversion section — navy panel with a real photograph beside it. */
function closer(imageSlug) {
  const img = imageSlug || "aerial-charcoal-roof-replacement";
  return `<section class="closer">
<div class="shell closer__grid">
  <div class="closer__copy">
    <p class="kicker">Free inspection &middot; Free estimate</p>
    <h2>Protect your home with a roof you can rely on.</h2>
    <p class="intro">Schedule a free inspection with ${esc(company.name)} and get a clear assessment of your roof, gutters, or exterior \u2014 documented with photographs you keep either way.</p>
    <div class="acts" style="margin-top:1.85rem">
      <a class="act act--big act--pulse" href="/contact/">${esc(company.cta.primary)}</a>
      <a class="act act--big act--ghost" href="${telHref}" data-loc="closer">${I.phone} ${esc(company.phone)}</a>
    </div>
    ${assurance(["Free inspection", "No-obligation estimate", "Licensed inspectors", "Fully insured"])}
    <div class="closer__lines">
      <a href="mailto:${company.email}" data-loc="closer">${esc(company.email)}</a>
      <span class="dim">${esc(company.serviceAreaSummary)}</span>
    </div>
  </div>
  <div class="closer__shot">${picture(img, "Aerial view of a completed architectural shingle roof on a North Texas home", { sizes: "(min-width:980px) 46vw, 100vw" })}</div>
</div>
</section>`;
}

/* ---------------------------------------------------------------- footer -- */
function sitefoot() {
  const roofing = site.footerServices.filter((s) => s.href.indexOf("/roofing/") === 0);
  const exterior = site.footerServices.filter((s) => s.href.indexOf("/exteriors/") === 0);
  return `<footer class="sitefoot">
<div class="shell sitefoot__top">
  <div>
    ${fullLogo("sitefoot__mark", "205px")}
    <p class="sitefoot__blurb">${esc(company.shortDescription)}</p>
    <div class="sitefoot__nap">
      <a class="tel" href="${telHref}" data-loc="footer">${esc(company.phone)}</a>
      <a href="mailto:${company.email}" data-loc="footer">${esc(company.email)}</a>
      <span style="font-size:.87rem;color:#8EA0B8">${esc(company.serviceAreaSummary)}</span>
    </div>
  </div>
  <div>
    <h2 class="foot-h">Roofing</h2>
    <ul>${roofing.map((s) => `<li><a href="${s.href}">${esc(s.label)}</a></li>`).join("")}
    <li><a href="/storm-damage/">Storm damage</a></li></ul>
    <h2 class="foot-h" style="margin-top:1.85rem">Exteriors</h2>
    <ul>${exterior.map((s) => `<li><a href="${s.href}">${esc(s.label)}</a></li>`).join("")}</ul>
  </div>
  <div>
    <h2 class="foot-h">Service areas</h2>
    <ul>${navCounties.slice(0, 7).map((co) => `<li><a href="/service-areas/${co.slug}/">${esc(co.name)}</a></li>`).join("")}
    <li><a href="/service-areas/"><strong>All service areas</strong></a></li></ul>
  </div>
  <div>
    <h2 class="foot-h">Company</h2>
    <ul>
      <li><a href="/about/">About Timber</a></li>
      <li><a href="/projects/">Our work</a></li>
      <li><a href="/resources/">Resources</a></li>
      <li><a href="/contact/">Contact</a></li>
      <li><a href="/sitemap/">Sitemap</a></li>
    </ul>
    <h2 class="foot-h" style="margin-top:1.85rem">What we can say for certain</h2>
    <ul class="sitefoot__trust">${company.trust.map((t) => `<li>${I[TRUST_ICON[t.label]] || I.shield}<span>${esc(t.label)}</span></li>`).join("")}</ul>
    <div class="sitefoot__cta">
      <p>Free inspections and free estimates across DFW and North Texas.</p>
      <a class="act act--pulse" href="/contact/">${esc(company.cta.header)}</a>
    </div>
  </div>
</div>
<div class="shell sitefoot__bar">
  <span>&copy; ${new Date().getFullYear()} ${esc(company.name)}. All rights reserved.</span>
  <ul>
    <li><a href="/privacy-policy/">Privacy</a></li>
    <li><a href="/terms-of-use/">Terms</a></li>
    <li><a href="/accessibility/">Accessibility</a></li>
    <li><a href="/disclaimer/">Disclaimer</a></li>
    <li><a href="/insurance-restoration-disclaimer/">Insurance disclaimer</a></li>
  </ul>
</div>
</footer>
<div class="dock" id="dock">
  <a href="${telHref}" data-loc="dock">${I.phone} Call</a>
  <a href="/contact/">${I.check} Free inspection</a>
</div>
<script src="/assets/site.js?v=${(global.ASSET_HASH || {}).js || "1"}" defer></script>
</body>
</html>`;
}

function page(o, body) {
  return `${head(o)}
<body data-page-type="${attr(o.pageType || "page")}"${o.slug ? ` data-slug="${attr(o.slug)}"` : ""}>
${loader()}
${masthead(o.path)}
<main id="main">
${body}
</main>
${sitefoot()}`;
}

module.exports = {
  page, masthead, sitefoot, loader, assure, assurance, trail, qa, callout, closer,
  fullLogo, telHref, navCounties, liveCities
};
