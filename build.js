#!/usr/bin/env node
"use strict";
/* Timber Roofing & Exteriors — static site generator.
   Output goes to /site as directory-style clean URLs (no .html anywhere in links).
   Run: node build.js */

const fs = require("fs");
const path = require("path");
const C = require("./src/lib/core");
const P = require("./src/templates/pages");
const { company } = C;

const ROOT = __dirname;
const OUT = path.join(ROOT, "site");

/* ---------- data ---------- */
const D = {
  services: [].concat(C.read("services-roofing.json"), C.read("services-exterior.json")),
  counties: C.read("counties.json").counties,
  cities: C.read("cities.json").cities,
  projects: C.read("projects.json"),
  articles: C.read("articles.json").articles
};

/* ---------- fs helpers ---------- */
function rmrf(p) { if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true }); }
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dest, e.name);
    e.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}

const crypto = require("crypto");
const hashOf = (f) => crypto.createHash("sha1")
  .update(fs.readFileSync(path.join(__dirname, "src/assets", f))).digest("hex").slice(0, 8);
global.ASSET_HASH = { css: hashOf("css/site.css"), js: hashOf("js/site.js") };

const pages = [];   // { url, file, html, noindex, priority, changefreq }
/* ---------- deploy target ----------
   The site is written with root-absolute paths, which is correct for a domain
   root. A GitHub Pages PROJECT site serves from a subpath, so every one of
   those paths would 404. BASE_PATH rewrites them at the end of the build.

     node build.js                                    -> domain root
     BASE_PATH=/norvixco.com PREVIEW=1 node build.js  -> project page preview

   PREVIEW also noindexes the whole build and blocks it in robots.txt, so a
   client preview cannot be indexed and later compete with the real domain. */
const BASE_PATH = (process.env.BASE_PATH || "").replace(/\/+$/, "");
const PREVIEW = process.env.PREVIEW === "1";
const PREVIEW_ORIGIN = (process.env.PREVIEW_ORIGIN || "").replace(/\/+$/, "");
const SITE_ORIGIN = PREVIEW && PREVIEW_ORIGIN ? PREVIEW_ORIGIN : company.siteUrl;

/* Prefix every root-absolute reference. Handles plain attributes, comma
   separated srcsets with descriptors, CSS url(), and the quoted paths the
   loader script assigns at runtime. Absolute and protocol-relative URLs are
   left alone. */
function applyBase(html) {
  if (!BASE_PATH) return html;
  const pre = (u) => (u.startsWith("//") ? u : BASE_PATH + u);
  return html
    .replace(/\b(href|src|action)="(\/[^"]*)"/g, (m, a, u) => `${a}="${pre(u)}"`)
    .replace(/\b(srcset|imagesrcset)="([^"]*)"/g, (m, a, v) =>
      `${a}="${v.split(",").map((part) => {
        const t = part.trim();
        return t.startsWith("/") ? pre(t) : t;
      }).join(", ")}"`)
    .replace(/url\((\/[^)'"]*)\)/g, (m, u) => `url(${pre(u)})`)
    .replace(/'(\/(?:logo|assets|images)\/[^']*)'/g, (m, u) => `'${pre(u)}'`);
}

function emit(url, html, opts) {
  const o = Object.assign({ priority: 0.6, changefreq: "monthly" }, opts || {});
  // directory-style routing: /about/ -> about/index.html ; "/" -> index.html
  const file = url === "/" ? "index.html"
    : url.endsWith(".html") ? url.replace(/^\//, "")
    : url.replace(/^\//, "").replace(/\/$/, "") + "/index.html";
  const noindex = o.noindex || /noindex/.test(html.slice(0, 3000));
  pages.push({ url, file, html, noindex, priority: o.priority, changefreq: o.changefreq });
}

/* ========================================================================
   LEGAL PAGES
   ===================================================================== */
const P_ = (t) => `<p>${t}</p>`;
const legal = [
  {
    path: "/privacy-policy/", label: "Privacy Policy", h1: "Privacy Policy",
    title: `Privacy Policy | ${company.name}`,
    description: "How Timber Roofing & Exteriors collects, uses, and protects information submitted through this website.",
    lede: "How we handle information you send us through this website.",
    body: `${P_("This policy explains what information Timber Roofing &amp; Exteriors collects through this website, how it is used, and the choices you have. It applies to this website only.")}
<h2>Information we collect</h2>
${P_("<strong>Information you give us.</strong> When you submit the inspection or estimate form, we collect the name, phone number, email address, city, ZIP code, property address if you provide one, project details, and any photographs you upload. We collect this so we can respond to your request.")}
${P_("<strong>Information collected automatically.</strong> Like most websites, this site may collect standard technical information such as browser type, device type, pages viewed, referring page, and general location derived from IP address. Where web analytics tools are in use, they may set cookies to measure site usage.")}
<h2>How we use it</h2>
<ul><li>To contact you about the inspection, estimate, or project you asked about</li><li>To schedule and perform requested work</li><li>To improve how this website performs and which pages are useful</li><li>To comply with legal obligations</li></ul>
${P_("We do not sell your personal information. We do not share it with third parties for their own marketing.")}
<h2>Service providers</h2>
${P_("We may use third-party services for website hosting, form delivery, email, and analytics. Those providers process information only as needed to perform their function.")}
<h2>Communications</h2>
${P_("By submitting the form you agree that we may contact you by phone, text message, or email about your request. Message and data rates may apply. You can ask us to stop contacting you at any time by replying to any message or emailing us.")}
<h2>Cookies</h2>
${P_("This site may use cookies for analytics and to remember whether you have already seen the loading animation in your current browsing session. Most browsers let you refuse or delete cookies through their settings.")}
<h2>Data retention</h2>
${P_("We keep inquiry and project information for as long as needed to serve you and to meet legal, tax, and record-keeping requirements.")}
<h2>Children</h2>
${P_("This website is not directed to children under 13 and we do not knowingly collect information from them.")}
<h2>Your choices</h2>
${P_("You may ask us what information we hold about you, ask us to correct it, or ask us to delete it. Contact us using the details below and we will respond within a reasonable time.")}
<h2>Changes</h2>
${P_("We may update this policy. The current version is always the one posted on this page.")}
<h2>Contact</h2>
${P_(`Questions about this policy: <a href="mailto:${company.email}">${company.email}</a> or <a href="tel:${company.phoneE164}">${company.phone}</a>.`)}
<div class="note"><p class="mb-0"><strong>Note for review:</strong> this policy is a general template written for a Texas home-services contractor. It should be reviewed by an attorney before launch, particularly if analytics, advertising pixels, or a CRM are added.</p></div>`
  },
  {
    path: "/terms-of-use/", label: "Terms of Use", h1: "Terms of Use",
    title: `Terms of Use | ${company.name}`,
    description: "The terms that apply to your use of the Timber Roofing & Exteriors website.",
    lede: "The terms that apply when you use this website.",
    body: `${P_("By using this website you agree to these terms. If you do not agree, please do not use the site.")}
<h2>Use of the site</h2>
${P_("You may use this website for lawful purposes only. You agree not to attempt to interfere with the site's operation, security, or availability, or to use automated tools to extract content at scale.")}
<h2>Content and ownership</h2>
${P_("Text, photography, logos, and design on this site belong to Timber Roofing &amp; Exteriors or are used with permission. Project photography shows work performed by the company. You may not reproduce site content for commercial purposes without written permission.")}
<h2>No professional advice</h2>
${P_("Information on this site is general and educational. It is not an inspection, a diagnosis of your specific roof, or a substitute for a licensed professional assessing your property. Do not rely on it to make decisions about your home without a proper inspection.")}
<h2>Estimates and quotes</h2>
${P_("Nothing on this site is a binding quote or an offer to perform work. Pricing, scope, and scheduling are established in a written estimate for your specific property.")}
<h2>Insurance</h2>
${P_("Timber Roofing &amp; Exteriors is a roofing contractor. We are not a public adjuster, attorney, insurance agent, or insurer, and we do not negotiate or guarantee insurance claim outcomes. See our <a href=\"/insurance-restoration-disclaimer/\">Insurance Restoration Disclaimer</a>.")}
<h2>Third-party links</h2>
${P_("This site may link to third-party websites. We are not responsible for their content or practices.")}
<h2>Limitation of liability</h2>
${P_("This website is provided on an \u201cas is\u201d basis. To the fullest extent permitted by law, Timber Roofing &amp; Exteriors is not liable for damages arising from your use of, or inability to use, this website.")}
<h2>Governing law</h2>
${P_("These terms are governed by the laws of the State of Texas.")}
<h2>Contact</h2>
${P_(`<a href="mailto:${company.email}">${company.email}</a> &middot; <a href="tel:${company.phoneE164}">${company.phone}</a>`)}
<div class="note"><p class="mb-0"><strong>Note for review:</strong> a Texas attorney should review these terms before launch.</p></div>`
  },
  {
    path: "/accessibility/", label: "Accessibility", h1: "Accessibility Statement",
    title: `Accessibility Statement | ${company.name}`,
    description: "Timber Roofing & Exteriors' commitment to an accessible website, and how to report a barrier.",
    lede: "We want this site to work for everyone, including people using assistive technology.",
    body: `${P_("Timber Roofing &amp; Exteriors is committed to making this website usable by as many people as possible, including people who use screen readers, keyboard navigation, magnification, or other assistive technology.")}
<h2>What we have built toward</h2>
${P_("This site was built targeting the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA. In practice, that includes:")}
<ul>
<li>Semantic HTML with a logical heading order on every page</li>
<li>Full keyboard operability, including the menu, the project filters, and the before-and-after comparison</li>
<li>Visible focus indicators on every interactive element</li>
<li>Text alternatives for meaningful images</li>
<li>Colour contrast checked against WCAG AA thresholds</li>
<li>Touch targets of at least 44 by 44 pixels</li>
<li>Form fields with real labels, and errors announced to assistive technology</li>
<li>Respect for the operating system's reduced-motion setting, which disables the loading animation and page transitions entirely</li>
<li>No content that flashes or auto-plays</li>
</ul>
<h2>Known limitations</h2>
${P_("Accessibility is ongoing work rather than a finished state. If you encounter something on this site that does not work with your assistive technology, we want to know about it.")}
<h2>Tell us about a barrier</h2>
${P_(`Email <a href="mailto:${company.email}">${company.email}</a> or call <a href="tel:${company.phoneE164}">${company.phone}</a>. Describe the page and what happened, and we will work to fix it and to give you the information you were after by another route in the meantime.`)}
<h2>Getting help another way</h2>
${P_("Everything on this website can also be handled by phone. If any part of the site is difficult for you to use, call us and we will schedule your free inspection directly.")}`
  },
  {
    path: "/disclaimer/", label: "Disclaimer", h1: "Website Disclaimer",
    title: `Website Disclaimer | ${company.name}`,
    description: "General disclaimer covering the informational content on the Timber Roofing & Exteriors website.",
    lede: "What the information on this site is, and what it is not.",
    body: `${P_("The content on this website is provided for general information about roofing and exterior work in North Texas. It is written to be useful, but it is general by nature.")}
<h2>Not a substitute for an inspection</h2>
${P_("Articles, service descriptions, and guidance on this site cannot tell you the condition of your particular roof. Roof condition depends on age, materials, installation quality, exposure, ventilation, and storm history \u2014 none of which can be assessed from a web page. A licensed inspector needs to look at your property.")}
<h2>No guarantees implied</h2>
${P_("Nothing on this site should be read as a guarantee of a particular result, service life, cost, or timeline. Specific commitments appear only in a written estimate or contract for your project.")}
<h2>Photography</h2>
${P_("Project photographs on this site show work performed by Timber Roofing &amp; Exteriors. Exact property addresses are not published. Photographs illustrate the type of work described and are not a promise that your project will match them in appearance, scope, or cost.")}
<h2>Third-party information</h2>
${P_("Where this site references general industry practice, weather patterns, or material characteristics, that information is offered in good faith and may change. Manufacturer documentation and your own insurance policy govern their respective subjects.")}
<h2>Safety</h2>
${P_("Please do not climb onto your roof to inspect it. Roof work carries genuine fall and structural risk, and there is nothing you could see up there that a proper inspection will not find.")}
<h2>Questions</h2>
${P_(`<a href="mailto:${company.email}">${company.email}</a> &middot; <a href="tel:${company.phoneE164}">${company.phone}</a>`)}`
  },
  {
    path: "/insurance-restoration-disclaimer/", label: "Insurance Disclaimer", h1: "Insurance Restoration Disclaimer",
    title: `Insurance Restoration Disclaimer | Timber`,
    description: "Timber Roofing & Exteriors' role in storm restoration work, stated plainly: what we do and do not do regarding insurance claims.",
    lede: "Our role in storm restoration, stated plainly.",
    body: `${P_("This page exists so there is no ambiguity about what Timber Roofing &amp; Exteriors does when storm damage and insurance are both involved.")}
<h2>What we are</h2>
${P_("We are a roofing and general contractor. We inspect roofs, document visible damage, describe roofing scope, and perform roofing and exterior work.")}
<h2>What we are not</h2>
${P_("We are not a public insurance adjuster. We are not an attorney. We are not an insurance agent, broker, or insurer. We do not adjust, negotiate, or settle insurance claims, and we do not represent homeowners in dealings with their carrier.")}
<h2>What we can do</h2>
${P_("We can document visible damage, explain the roofing scope, and provide project information that homeowners may share with their insurance carrier.")}
${P_("That documentation belongs to you. What you do with it is your decision.")}
<h2>What we cannot do</h2>
<ul>
<li>Guarantee that a claim will be filed, approved, denied, or paid at any particular amount</li>
<li>Interpret your insurance policy or advise you on coverage</li>
<li>Communicate with your carrier on your behalf as your representative</li>
<li>Waive, absorb, discount, or otherwise cover your insurance deductible</li>
</ul>
<h2>About deductibles</h2>
${P_("Be cautious of any contractor offering to cover, waive, or absorb your deductible. Texas law addresses this practice, and an offer like that tells you something important about the company making it.")}
<h2>Your responsibility</h2>
${P_("Reviewing your policy, meeting its deadlines and requirements, and communicating with your carrier are yours to manage. If you need advice on a claim itself, that is the province of a licensed public adjuster or an attorney \u2014 not a roofing contractor.")}
<h2>Questions</h2>
${P_(`<a href="mailto:${company.email}">${company.email}</a> &middot; <a href="tel:${company.phoneE164}">${company.phone}</a>`)}`
  }
];

/* ========================================================================
   RENDER
   ===================================================================== */
console.log("\n\u2500\u2500 Timber Roofing & Exteriors \u2500\u2500 build\n");

emit("/", P.home(D), { priority: 1.0, changefreq: "weekly" });
emit("/roofing/", P.serviceHub("roofing", D), { priority: 0.9 });
emit("/exteriors/", P.serviceHub("exterior", D), { priority: 0.9 });
emit("/storm-damage/", P.stormHub(D), { priority: 0.9, changefreq: "weekly" });

D.services.forEach((s) =>
  emit(P.svcUrl(s), P.servicePage(s, D), { priority: s.featured ? 0.85 : 0.7, noindex: s.status === "pending-approval" })
);

emit("/projects/", P.projectsIndex(D), { priority: 0.8 });
D.projects.projects.forEach((p) => emit(`/projects/${p.slug}/`, P.projectDetail(p, D), { priority: 0.6 }));

emit("/service-areas/", P.areasHub(D), { priority: 0.85 });
D.counties.forEach((co) => emit(P.countyUrl(co), P.countyPage(co, D), { priority: co.approvalRequired ? 0.3 : 0.7, noindex: !!co.approvalRequired }));
D.cities.forEach((c) => emit(P.cityUrl(c), P.cityPage(c, D), { priority: c.approvalRequired ? 0.3 : (c.tier === 1 ? 0.8 : 0.65), noindex: !!c.approvalRequired }));

emit("/about/", P.about(D), { priority: 0.7 });
emit("/contact/", P.contact(D), { priority: 0.9 });
emit("/resources/", P.resourcesIndex(D), { priority: 0.7, changefreq: "weekly" });
D.articles.filter((a) => a.status === "published").forEach((a) => emit(`/resources/${a.slug}/`, P.articlePage(a, D), { priority: 0.6 }));

legal.forEach((l) => emit(l.path, P.simplePage(l), { priority: 0.2, changefreq: "yearly" }));
emit("/404.html", P.notFound(), { noindex: true });

const indexable = pages.filter((p) => !p.noindex);
emit("/sitemap/", P.htmlSitemap(D, indexable), { priority: 0.3 });

/* ---------- write ---------- */
rmrf(OUT);
fs.mkdirSync(OUT, { recursive: true });
pages.forEach((p) => {
  const dest = path.join(OUT, p.file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  let html = p.html;
  if (PREVIEW) {
    html = html.replace(/<meta name="robots" content="[^"]*">/,
      '<meta name="robots" content="noindex, nofollow">');
    if (!/name="robots"/.test(html)) {
      html = html.replace("</title>", '</title>\n<meta name="robots" content="noindex, nofollow">');
    }
  }
  fs.writeFileSync(dest, applyBase(html));
});

copyDir(path.join(ROOT, "public", "images"), path.join(OUT, "images"));
copyDir(path.join(ROOT, "public", "logo"), path.join(OUT, "logo"));
fs.mkdirSync(path.join(OUT, "assets"), { recursive: true });
fs.copyFileSync(path.join(ROOT, "src/assets/css/site.css"), path.join(OUT, "assets/site.css"));
fs.copyFileSync(path.join(ROOT, "src/assets/js/site.js"), path.join(OUT, "assets/site.js"));

/* GitHub Pages: keep Jekyll away from the output, and support custom domain */
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");
if (!PREVIEW) fs.writeFileSync(path.join(OUT, "CNAME"), "www." + company.domain + "\n");

/* ---------- sitemap.xml + robots.txt ---------- */
const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .slice()
  .sort((a, b) => b.priority - a.priority || a.url.localeCompare(b.url))
  .map((p) => `  <url>
    <loc>${SITE_ORIGIN}${BASE_PATH}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority.toFixed(1)}</priority>
  </url>`)
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(OUT, "sitemap.xml"), xml);
fs.writeFileSync(
  path.join(OUT, "robots.txt"),
  PREVIEW
    ? `User-agent: *\nDisallow: /\n`
    : `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`
);

/* ========================================================================
   VALIDATION — fails loudly rather than shipping quiet SEO bugs
   ===================================================================== */
const problems = [];
const warnings = [];
const known = new Set(pages.map((p) => p.url.replace(/index\.html$/, "")));
known.add("/404.html");

const decode = (s) => String(s || "").replace(/&amp;/g, "&").replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const noComments = (h) => h.replace(/<!--[\s\S]*?-->/g, "");

const titles = new Map(), descs = new Map();
pages.forEach((p) => {
  const t = decode((p.html.match(/<title>([^<]*)<\/title>/) || [])[1]);
  const d = decode((p.html.match(/<meta name="description" content="([^"]*)"/) || [])[1]);
  const h1s = (p.html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) problems.push(`${h1s} H1 tags on ${p.url}`);
  if (p.noindex) return;
  if (t) { titles.set(t, (titles.get(t) || 0) + 1); }
  if (d) { descs.set(d, (descs.get(d) || 0) + 1); }
  if (t && t.length > 62) warnings.push(`title over 62 chars (${t.length}): ${p.url}`);
  if (d && d.length > 160) warnings.push(`meta description over 160 chars (${d.length}): ${p.url}`);
});
titles.forEach((n, t) => { if (n > 1) problems.push(`duplicate title used ${n}\u00d7: "${t.slice(0, 60)}"`); });
descs.forEach((n, d) => { if (n > 1) problems.push(`duplicate meta description used ${n}\u00d7: "${d.slice(0, 60)}\u2026"`); });

/* internal links + orphan detection */
const linkedTo = new Set(["/"]);
pages.forEach((p) => {
  const hrefs = Array.from(p.html.matchAll(/href="(\/[^"#?]*)/g)).map((m) => m[1]);
  hrefs.forEach((h) => {
    linkedTo.add(h);
    if (/\.(css|js|png|jpg|webp|xml|txt|ico)$/.test(h)) return;
    if (!known.has(h)) problems.push(`broken internal link ${h} (on ${p.url})`);
  });
  if (/<!-- missing image:/.test(p.html)) problems.push(`missing image reference on ${p.url}`);
  const visible = noComments(p.html).replace(/Placeholder \u2014 pending/g, "").replace(/\splaceholder="[^"]*"/gi, "");
  if (/PLACEHOLDER|TODO|Lorem ipsum/i.test(visible)) {
    warnings.push(`placeholder text on ${p.url}`);
  }
});
indexable.forEach((p) => {
  if (p.url !== "/" && !linkedTo.has(p.url)) problems.push(`orphan page (nothing links to it): ${p.url}`);
});

/* CSS integrity: a duplicated block once slipped in through a bad string
   splice and silently doubled the stylesheet. Responsive overrides legitimately
   repeat a selector with a DIFFERENT body, so the test is identical
   selector + identical declarations — that only happens by accident. */
(function checkCss() {
  const css = fs.readFileSync(path.join(OUT, "assets/site.css"), "utf8");
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, "");

  /* Walk the stylesheet tracking @-rule context, so the same declaration at
     two different breakpoints is not mistaken for a duplicate. A real
     duplicate is the same selector AND the same body AND the same context. */
  const seen = new Map();
  const ctx = [];
  let buf = "", i = 0;
  while (i < stripped.length) {
    const ch = stripped[i];
    if (ch === "{") {
      const prelude = buf.replace(/\s+/g, " ").trim();
      buf = "";
      if (prelude.startsWith("@")) { ctx.push(prelude); i++; continue; }
      // collect this rule's body
      let depth = 1, j = i + 1, body = "";
      while (j < stripped.length && depth > 0) {
        if (stripped[j] === "{") depth++;
        else if (stripped[j] === "}") { depth--; if (!depth) break; }
        body += stripped[j]; j++;
      }
      const key = ctx.join(" ") + " || " + prelude + " || " + body.replace(/\s+/g, " ").trim();
      if (prelude && body.trim()) seen.set(key, (seen.get(key) || 0) + 1);
      i = j + 1;
      continue;
    }
    if (ch === "}") { ctx.pop(); buf = ""; i++; continue; }
    buf += ch; i++;
  }
  const rules = Array.from(seen.values()).reduce((a, b) => a + b, 0);
  const dupes = Array.from(seen).filter(([, n]) => n > 1);
  console.log(`  stylesheet .......... ${(Buffer.byteLength(css) / 1024).toFixed(1)} KB, ${rules} rules, ${dupes.length} true duplicate(s)`);
  if (dupes.length) {
    problems.push(`stylesheet contains ${dupes.length} duplicated rule(s) in the same context: ${dupes.slice(0, 3).map(([k]) => k.split(" || ")[1]).join(", ")}`);
  }
})();

/* Asset integrity: a page that references a file which is not in the output
   renders unstyled or with holes, and the failure is silent. Catch it here. */
(function checkAssets() {
  const refs = new Set();
  pages.forEach((p) => {
    for (const m of p.html.matchAll(/(?:href|src|srcset|imagesrcset)="([^"]+)"/g)) {
      m[1].split(",").forEach((part) => {
        const u = part.trim().split(/\s+/)[0];
        if (u.startsWith("/") && !u.startsWith("//")) refs.add(u.split("?")[0].split("#")[0]);
      });
    }
    /* url() inside style attributes \u2014 the blur-up placeholders live here */
    for (const m of p.html.matchAll(/url\(([^)'"]+)\)/g)) {
      const u = m[1].trim();
      if (u.startsWith("/") && !u.startsWith("//")) refs.add(u.split("?")[0].split("#")[0]);
    }
  });
  const missing = Array.from(refs).filter((u) => !fs.existsSync(path.join(OUT, u)));
  console.log(`  asset integrity ..... ${refs.size} local files referenced, ${missing.length} missing`);
  if (missing.length) problems.push(`${missing.length} referenced asset(s) missing from the build: ${missing.slice(0, 5).join(", ")}`);
})();

/* ---------- report ---------- */
const bytes = pages.reduce((n, p) => n + Buffer.byteLength(p.html), 0);
const pending = D.services.filter((s) => s.status === "pending-approval");
const gatedCounties = D.counties.filter((c) => c.approvalRequired);
const gatedCities = D.cities.filter((c) => c.approvalRequired);

console.log(`  pages built ......... ${pages.length}`);
console.log(`  in sitemap.xml ...... ${indexable.length}`);
console.log(`  noindex (gated) ..... ${pages.length - indexable.length}`);
console.log(`  services ............ ${D.services.filter((s) => s.status === "active").length} live, ${pending.length} pending Drew's approval`);
console.log(`  locations ........... ${D.counties.length - gatedCounties.length} counties + ${D.cities.length - gatedCities.length} cities live`);
console.log(`  articles ............ ${D.articles.filter((a) => a.status === "published").length} published, ${D.articles.filter((a) => a.status === "outline").length} outlined`);
console.log(`  html weight ......... ${(bytes / 1024 / 1024).toFixed(2)} MB total, ${Math.round(bytes / pages.length / 1024)} KB avg`);

const svcExtras = C.read("service-extras.json");
const cityExtras = C.read("city-extras.json");
const thinServices = D.services.filter((s) => s.status === "active" && !svcExtras[s.slug]).map((s) => s.slug);
const thinCities = D.cities.filter((c) => !c.approvalRequired && !cityExtras[c.slug]).map((c) => c.slug);
console.log(`  expanded content ..... ${D.services.filter((s) => svcExtras[s.slug]).length} services, ${D.cities.filter((c) => cityExtras[c.slug]).length} cities`);

if (thinServices.length || thinCities.length) {
  console.log(`\n  \u2691 Content roadmap \u2014 live pages carrying base copy only:`);
  if (thinServices.length) console.log(`     services (${thinServices.length}): ${thinServices.slice(0, 8).join(", ")}${thinServices.length > 8 ? ", \u2026" : ""}`);
  if (thinCities.length) console.log(`     cities (${thinCities.length}): ${thinCities.slice(0, 8).join(", ")}${thinCities.length > 8 ? ", \u2026" : ""}`);
  console.log(`     add an entry in service-extras.json / city-extras.json to deepen one.`);
}

if (pending.length) {
  console.log(`\n  \u2691 Pending Drew's approval (built, noindexed, unlinked \u2014 preview only):`);
  pending.forEach((s) => console.log(`     ${P.svcUrl(s)}`));
}
if (gatedCounties.length || gatedCities.length) {
  console.log(`\n  \u2691 Distant areas awaiting confirmation (noindexed): ${gatedCounties.length} counties, ${gatedCities.length} cities`);
}

if (warnings.length) {
  console.log(`\n  \u26a0 ${warnings.length} warning(s):`);
  warnings.slice(0, 12).forEach((w) => console.log(`     ${w}`));
  if (warnings.length > 12) console.log(`     \u2026and ${warnings.length - 12} more`);
}
if (problems.length) {
  console.log(`\n  \u2717 ${problems.length} problem(s):`);
  problems.slice(0, 25).forEach((p) => console.log(`     ${p}`));
  if (problems.length > 25) console.log(`     \u2026and ${problems.length - 25} more`);
  console.log("");
  process.exitCode = 1;
} else {
  console.log(`\n  \u2713 no broken links, no duplicate metadata, one H1 per page, no orphans\n`);
}
