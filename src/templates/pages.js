"use strict";
const C = require("../lib/core");
const L = require("./layout");
const { company, site, esc, attr, picture, imageUrl, I, SERVICE_ICON, stripTags, words } = C;

const EXTRAS = C.read("service-extras.json");
const CITY_EXTRAS = C.read("city-extras.json");
const COUNTY_EXTRAS = C.read("county-extras.json");

const slugify = (t) => String(t).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const HOME = { label: "Home", href: "/" };
const svcUrl = (s) => `/${s.category === "roofing" ? "roofing" : "exteriors"}/${s.slug}/`;
const cityUrl = (c) => `/service-areas/${c.slug}/`;
const countyUrl = (c) => `/service-areas/${c.slug}/`;
const tel = L.telHref;
const ico = (s) => I[SERVICE_ICON[s.slug]] || I.roof;

/* ---------------------------------------------------------------- pieces -- */
/* Horizontal service feature: photograph one side, copy the other, alternating. */
function svcFeature(s, flip) {
  return `<a class="svcfeat${flip ? " svcfeat--flip" : ""}" href="${svcUrl(s)}">
  <div class="svcfeat__shot">${picture(s.image, s.name + " \u2014 Timber Roofing & Exteriors project photograph", { sizes: "(min-width:780px) 42vw, 100vw" })}</div>
  <div class="svcfeat__body">
    <span class="svcfeat__ico">${ico(s)}</span>
    <h3>${esc(s.name)}</h3>
    <p>${esc(s.heroSub)}</p>
    <span class="golink">Explore ${esc(s.name.toLowerCase())} ${I.arrow}</span>
  </div>
</a>`;
}

function svcTile(s) {
  return `<a class="svctile" href="${svcUrl(s)}">
  <span class="svctile__ico">${ico(s)}</span>
  <h3>${esc(s.name)}</h3>
  <p>${esc(s.heroSub)}</p>
</a>`;
}

function gallery(projects, previewOnly) {
  const items = previewOnly ? projects.projects.filter((p) => p.featured) : projects.projects;
  const used = new Set();
  items.forEach((p) => p.categories.forEach((c) => used.add(c)));
  const cats = projects.categories.filter((c) => used.has(c.slug));

  const tags = previewOnly ? "" : `<div class="tagrow" data-tagrow role="group" aria-label="Filter projects by type">
<button class="tagbtn" type="button" data-cat="all" aria-pressed="true">All work</button>
${cats.map((c) => `<button class="tagbtn" type="button" data-cat="${attr(c.slug)}" aria-pressed="false">${esc(c.name)}</button>`).join("")}
</div>`;

  return `${tags}
<div class="figrid figrid--editorial">
${items.map((p) => {
  const catName = p.categories.map((c) => (projects.categories.find((x) => x.slug === c) || {}).name).filter(Boolean)[0] || "Project";
  return `<a class="figrid__item rise" href="/projects/${p.slug}/" data-cats="${attr(p.categories.join(" "))}"
   data-lb data-lb-src="${attr(imageUrl(p.image, 1600) || "")}" data-lb-title="${attr(p.title)}"
   data-lb-caption="${attr(C.truncate(stripTags(p.summary), 190))}">
${picture(p.image, p.alt, { sizes: "(min-width:1100px) 31vw, (min-width:640px) 48vw, 100vw" })}
<span class="figrid__cap"><span>${esc(catName)}</span><strong>${esc(p.title)}</strong></span></a>`;
}).join("")}
</div>
<p data-gallery-empty hidden style="padding:2rem 0;color:var(--quiet)">No projects in that category yet.</p>`;
}

/* Featured project: oversized photograph with the detail panel overlapping it. */
function spotlight(D) {
  const feat = D.projects.projects.filter((p) => p.featured);
  const main = feat[0], strip = feat.slice(1, 4);
  const svc = D.services.find((s) => s.slug === main.service);
  const meta = [
    ["Work performed", svc ? svc.name : null],
    ["Material", main.material],
    ["Location", main.city ? main.city + ", TX" : "Dallas\u2013Fort Worth Metroplex"],
    ["Address", "Not published, by policy"]
  ].filter(([, v]) => v);

  return `<section class="section surface-mist">
<div class="shell">
  <div class="lede-row">
    <div><p class="kicker">Featured work</p><h2>A recent roof, start to finish.</h2></div>
    <p class="intro flush">Every photograph on this site is from a ${esc(company.name)} project. No stock imagery, no borrowed portfolios.</p>
  </div>
  <div class="spotlight">
    <figure class="spotlight__shot rise">${picture(main.image, main.alt, { sizes: "100vw" })}</figure>
    <div class="spotlight__panel">
      <p class="kicker">${esc((D.projects.categories.find((c) => c.slug === main.categories[0]) || {}).name || "Project")}</p>
      <h3>${esc(main.title)}</h3>
      <p class="flush">${esc(main.summary)}</p>
      <ul class="spotlight__meta">
        ${meta.map(([k, v]) => `<li><b>${esc(k)}</b><span>${esc(v)}</span></li>`).join("")}
      </ul>
      <div class="acts" style="margin-top:1.4rem"><a class="act act--ghost" href="/projects/${main.slug}/">Read the project ${I.arrow}</a></div>
    </div>
  </div>
  <div class="striprow">
    ${strip.map((p) => `<a href="/projects/${p.slug}/" aria-label="${attr(p.title)}">${picture(p.image, p.alt, { sizes: "(min-width:780px) 30vw, 33vw" })}</a>`).join("")}
  </div>
</div>
</section>`;
}

/* Coverage explorer: county tabs revealing their cities, all text links. */
function explorer(D) {
  const counties = L.navCounties.slice(0, 8);
  return `<section class="section surface-navy">
<div class="shell">
  <div class="lede-row">
    <div><p class="kicker">Coverage</p><h2>Dallas\u2013Fort Worth at the core.<br>North Texas all around it.</h2></div>
    <p class="intro flush">Serving homeowners across DFW and surrounding North Texas communities. Availability beyond the core Metroplex depends on project scope \u2014 call with your address and we will tell you straight.</p>
  </div>
  <div class="locale">
    <div class="locale__tabs" role="tablist" aria-label="Counties served">
      ${counties.map((co, i) => `<button class="locale__tab" type="button" role="tab" data-area-tab="${attr(co.slug)}"
        id="tab-${attr(co.slug)}" aria-controls="pane-${attr(co.slug)}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">
        <span>${esc(co.name)}</span><small>${co.live.length}</small></button>`).join("")}
    </div>
    <div>
      ${counties.map((co, i) => `<div class="locale__pane" role="tabpanel" id="pane-${attr(co.slug)}"
        aria-labelledby="tab-${attr(co.slug)}"${i === 0 ? "" : " hidden"}>
        <h3>${esc(co.name)}</h3>
        <p>${esc(co.blurb)}</p>
        <ul class="pillrow" style="margin:1.15rem 0 1.4rem">
          ${co.live.map((c) => `<li><a href="${cityUrl(c)}">${esc(c.name)}</a></li>`).join("")}
        </ul>
        <a class="golink" href="${countyUrl(co)}">${esc(co.name)} roofing hub ${I.arrow}</a>
      </div>`).join("")}
    </div>
  </div>
  <div class="acts" style="margin-top:2.25rem"><a class="act act--ghost" href="/service-areas/">View all service areas</a></div>
</div>
</section>`;
}

/* ================================================================= HOME == */
function home(D) {
  const heroImg = "brick-home-gray-shingle-roof";
  const pick = (slug) => D.services.find((s) => s.slug === slug);
  const features = [pick("roof-replacement"), pick("storm-damage-roof-repair"), pick("gutter-installation")].filter(Boolean);
  const tiles = [pick("roof-repair"), pick("roof-inspections"), pick("fence-installation")].filter(Boolean);

  const body = `
<section class="stage" data-dock-after>
  <div class="stage__grid">
    <div class="shell stage__copy">
      <p class="kicker">Dallas\u2013Fort Worth roofing &amp; exterior specialists</p>
      <h1 class="t-hero">Built for Texas weather.<em>Backed by integrity.</em></h1>
      <p class="stage__sub">Roof replacements, repairs, storm restoration, gutters, and exterior improvements for homeowners across DFW and surrounding North Texas communities.</p>
      <div class="acts">
        <a class="act act--big act--pulse" href="/contact/">${esc(company.cta.primary)}</a>
        <a class="act act--big act--ghost" href="${tel}" data-loc="stage">${I.phone} Call ${esc(company.phone)}</a>
      </div>
      <div class="stage__proof">
        <span>${I.check}Free inspections</span><span>${I.check}Free estimates</span>
        <span>${I.check}Fully insured</span><span>${I.check}Licensed inspectors</span>
      </div>
    </div>
    <div class="stage__shot">${picture(heroImg, "Completed gray architectural shingle roof on a light brick North Texas home", { eager: true, sizes: "(min-width:960px) 52vw, 100vw" })}</div>
  </div>
</section>
${L.assure()}

<section class="section surface-white">
  <div class="shell">
    <div class="lede-row">
      <div><p class="kicker">What we do</p><h2>Roofing and exterior work,<br>decided by the details.</h2></div>
      <p class="intro flush">Roofs here rarely fail in the middle of a slope. They fail at flashing, valleys, penetrations, and ventilation \u2014 so that is where our attention goes.</p>
    </div>
    <div class="svcrail">
      ${features.map((s, i) => svcFeature(s, i % 2 === 1)).join("")}
    </div>
    <div class="trio" style="margin-top:clamp(1.1rem,2vw,1.5rem)">
      ${tiles.map(svcTile).join("")}
    </div>
    <div class="acts" style="margin-top:2rem">
      <a class="act act--ghost" href="/roofing/">All roofing services</a>
      <a class="act act--ghost" href="/exteriors/">All exterior services</a>
    </div>
  </div>
</section>

<section class="section surface-mist-2">
  <div class="shell duo duo--mid">
    <div>
      <p class="kicker">Who we are</p>
      <h2 style="margin-bottom:1.15rem">A roofing company that would rather be right than busy.</h2>
      <p class="intro">${esc(company.name)} is a roofing and general contractor working across Dallas\u2013Fort Worth and the surrounding North Texas communities.</p>
      <p>A licensed inspector looks at your roof properly, including the parts you cannot see. You get photographs and a plain explanation of what they show. If work is needed, you get a free written estimate before anything is ordered. If it is not, we tell you that instead.</p>
      <p>North Texas is hard on roofs \u2014 hail in spring, straight-line wind ahead of the storms, then months of heat that ages shingles from both sides. Knowing how roofs fail here is most of the job.</p>
      <div class="acts" style="margin-top:1.6rem"><a class="act act--ghost" href="/about/">More about Timber</a></div>
    </div>
    <div class="crop rise">${picture("brick-home-brown-shingle-roof", "Completed brown architectural shingle roof on a light brick single-story North Texas home", { sizes: "(min-width:940px) 46vw, 100vw" })}</div>
  </div>
  <div class="shell" style="margin-top:clamp(2.5rem,4vw,3.5rem)">
    <div class="statband">
      <div class="statband__i"><span class="statband__k">Free</span><span class="statband__v">Inspections and written estimates, no obligation</span></div>
      <div class="statband__i"><span class="statband__k">Licensed</span><span class="statband__v">Inspectors performing every assessment</span></div>
      <div class="statband__i"><span class="statband__k">1\u20132 days</span><span class="statband__v">Typical single-family replacement once material lands</span></div>
      <div class="statband__i"><span class="statband__k">~2 hours</span><span class="statband__v">How far we travel from Dallas for the right project</span></div>
    </div>
  </div>
</section>

${spotlight(D)}

<section class="section surface-white">
  <div class="shell">
    <div class="lede-row">
      <div><p class="kicker">Why Timber</p><h2>The parts of the job<br>nobody photographs.</h2></div>
      <p class="intro flush">These are the things we can actually stand behind. There are no invented certifications, warranty lengths, or star ratings anywhere on this site \u2014 and there will not be.</p>
    </div>
    <div class="notecards--2">
      ${site.whyTimber.map((w, i) => `<div class="notecard rise">
        <span class="notecard__ico">${[I.shield, I.clip, I.badge, I.inspect, I.hammer, I.home, I.layers, I.pin][i % 8]}</span>
        <div><div class="notecard__t">${esc(w.title)}</div><p>${esc(w.body)}</p></div>
      </div>`).join("")}
    </div>
  </div>
</section>

<section class="section surface-navy">
  <div class="shell">
    <div class="lede-row">
      <div><p class="kicker">How it works</p><h2>Six steps, no surprises.</h2></div>
      <p class="intro flush">You approve the scope before anything is ordered. Nothing happens on your roof that you have not seen in writing first.</p>
    </div>
    <div class="pathway">
      ${site.process.map((p) => `<div class="pathstep rise"><span class="pathstep__n">${esc(p.n)}</span><h3>${esc(p.title)}</h3><p>${esc(p.body)}</p></div>`).join("")}
    </div>
  </div>
</section>

<section class="section surface-mist">
  <div class="shell duo duo--minor duo--mid">
    <div class="crop rise">${picture("aerial-storm-roof-tearoff-dumpster", "Aerial view of a North Texas roof being replaced after storm damage", { sizes: "(min-width:940px) 34vw, 100vw" })}</div>
    <div>
      <p class="kicker">Storm restoration</p>
      <h2 style="margin-bottom:1.15rem">After a North Texas storm,<br>get it documented.</h2>
      <p class="intro">Hail damage often does not leak for a year. By then the connection to the storm is far harder to establish, and any timeline in your policy has usually run out.</p>
      <ul class="factlist">
        ${site.stormItems.map((s) => `<li><b>${esc(s.title)}</b><span>${esc(s.body)}</span></li>`).join("")}
      </ul>
      <div class="acts" style="margin-top:1.85rem">
        <a class="act" href="/storm-damage/">${esc(company.cta.storm)}</a>
        <a class="act act--ghost" href="/roofing/hail-damage-roof-repair/">Hail damage repair</a>
      </div>
    </div>
  </div>
</section>

<section class="section surface-white">
  <div class="shell">
    <div class="lede-row">
      <div><p class="kicker">Project gallery</p><h2>Real roofs, real photographs.</h2></div>
      <p class="intro flush">Tap any image to open it full size. Exact residential addresses are never published.</p>
    </div>
    ${gallery(D.projects, true)}
    <div class="acts" style="margin-top:2rem"><a class="act act--ghost" href="/projects/">View all ${D.projects.projects.length} projects</a></div>
  </div>
</section>

${explorer(D)}

<section class="section surface-mist">
  <div class="shell duo duo--minor">
    <div>
      <p class="kicker">Resource centre</p>
      <h2 style="margin-bottom:1.05rem">Know what you are looking at.</h2>
      <p class="intro">Plain-language guides for North Texas homeowners \u2014 what damage looks like, when to worry, and what to ask whoever is standing on your roof.</p>
      <div class="acts" style="margin-top:1.5rem"><a class="act act--ghost" href="/resources/">All resources</a></div>
    </div>
    <div>
      ${D.articles.filter((a) => a.status === "published").slice(0, 5).map((a) => `<a class="notecard" href="/resources/${a.slug}/">
        <span class="notecard__ico">${I.quote}</span>
        <div><div class="notecard__t">${esc(a.title)}</div><p>${esc(a.excerpt)}</p></div>
      </a>`).join("")}
    </div>
  </div>
</section>

<section class="section surface-white">
  <div class="shell duo duo--major">
    <div>${L.qa(site.homeFaqs)}</div>
    <div class="rail">
      <div class="panel panel--mist">
        <p class="kicker">Still unsure?</p>
        <h3 style="margin-bottom:.55rem">Ask us directly</h3>
        <p>We would rather answer a question than have you guess. Call and you will speak to someone who has been on a roof.</p>
        <div class="acts" style="margin-top:1rem"><a class="act" href="/contact/">${esc(company.cta.ask)}</a></div>
      </div>
    </div>
  </div>
</section>

${L.closer("aerial-charcoal-roof-replacement")}`;

  return L.page({
    path: "/",
    title: `Dallas\u2013Fort Worth Roofing & Exteriors | ${company.brandShort}`,
    description: "Roof replacement, repairs, inspections, gutters, and storm restoration across DFW and North Texas. Licensed inspectors, fully insured, free inspections and estimates.",
    image: heroImg, preload: heroImg, pageType: "home",
    schema: [C.organization(), C.website(), C.faqSchema(site.homeFaqs)].filter(Boolean)
  }, body);
}

/* ============================================================== SERVICE == */
function servicePage(s, D) {
  const url = svcUrl(s);
  const hubHref = s.category === "roofing" ? "/roofing/" : "/exteriors/";
  const hubLabel = s.category === "roofing" ? "Roofing" : "Exterior Services";
  const crumbs = [HOME, { label: hubLabel, href: hubHref }, { label: s.name, href: url }];
  const related = (s.related || []).map((r) => D.services.find((y) => y.slug === r)).filter(Boolean);
  const cities = D.cities.filter((c) => c.tier === 1 && !c.approvalRequired).slice(0, 10);
  const x = EXTRAS[s.slug] || {};
  const articles = D.articles.filter((a) => a.status === "published" && (a.relatedServices || []).indexOf(s.slug) > -1).slice(0, 3);
  const projects = D.projects.projects.filter((p) => (p.related || []).indexOf(s.slug) > -1).slice(0, 3);

  const body = `
<section class="pagehead" data-dock-after>
  <div class="shell">
    ${L.trail(crumbs)}
    <div class="pagehead__grid">
      <div>
        <p class="kicker">${esc(s.kicker)}</p>
        <h1 class="t-page">${esc(s.h1)}</h1>
        <p class="pagehead__sub">${esc(s.heroSub)}</p>
        <div class="acts">
          <a class="act act--big" href="/contact/?service=${encodeURIComponent(s.name)}">${esc(company.cta.primary)}</a>
          <a class="act act--big act--ghost" href="${tel}" data-loc="service-hero">${I.phone} ${esc(company.phone)}</a>
        </div>
      </div>
      <figure class="pagehead__shot">${picture(s.image, s.name + " project photograph by Timber Roofing and Exteriors", { eager: true, sizes: "(min-width:940px) 44vw, 100vw" })}</figure>
    </div>
  </div>
</section>
${L.assure()}

<section class="section surface-white">
  <div class="shell duo duo--major">
    <div class="readable">
      ${s.intro.map((p, i) => `<p${i === 0 ? ' class="intro"' : ""}>${esc(p)}</p>`).join("")}
      <h2 id="signs">When ${esc(s.name.toLowerCase())} is worth looking into</h2>
      <div class="deflist deflist--2">${s.signs.map((v) => `<div class="defrow"><h3>${esc(v.t)}</h3><p>${esc(v.d)}</p></div>`).join("")}</div>
    </div>
    <aside class="rail">
      ${x.specs && x.specs.length ? `<dl class="keyfacts">${x.specs.map((sp) => `<div><dt>${esc(sp.k)}</dt><dd>${esc(sp.v)}</dd></div>`).join("")}</dl>` : ""}
      <div class="panel panel--mist">
        <h3 style="margin-bottom:.5rem">Free ${esc(s.category === "roofing" ? "roof" : "exterior")} inspection</h3>
        <p>A licensed inspector, photographs you keep, and a written estimate \u2014 at no cost and no obligation.</p>
        <div class="acts" style="margin-top:1rem"><a class="act" href="/contact/?service=${encodeURIComponent(s.name)}">${esc(company.cta.primary)}</a></div>
        <p style="margin:.9rem 0 0"><a class="golink" href="${tel}" data-loc="service-rail">${I.phone} ${esc(company.phone)}</a></p>
      </div>
      <nav class="panel" aria-label="On this page">
        <p class="kicker" style="margin-bottom:.6rem">On this page</p>
        <ul class="linklist" style="font-size:.94rem">
          <li><a href="#causes">Common causes <span>${I.arrow}</span></a></li>
          <li><a href="#process">The process <span>${I.arrow}</span></a></li>
          ${x.deepDive && x.deepDive.length ? `<li><a href="#detail">In detail <span>${I.arrow}</span></a></li>` : ""}
          ${x.expect && x.expect.length ? `<li><a href="#expect">What to expect <span>${I.arrow}</span></a></li>` : ""}
          <li><a href="#faqs">Questions <span>${I.arrow}</span></a></li>
        </ul>
      </nav>
    </aside>
  </div>
</section>

<section class="section surface-mist">
  <div class="shell duo">
    <div id="causes">
      <p class="kicker">Causes</p>
      <h2 style="margin-bottom:1.1rem">What causes it</h2>
      <div class="deflist">${s.causes.map((v) => `<div class="defrow"><h3>${esc(v.t)}</h3><p>${esc(v.d)}</p></div>`).join("")}</div>
    </div>
    <div id="inspection">
      <p class="kicker">Our inspection</p>
      <h2 style="margin-bottom:1.1rem">How we look at it</h2>
      <ul class="ticklist">${s.inspection.map((v) => `<li>${I.check}<span>${esc(v)}</span></li>`).join("")}</ul>
      <div class="panel panel--accent" style="margin-top:1.6rem">
        <h3 style="margin-bottom:.5rem">North Texas conditions</h3>
        <p class="flush">${esc(s.localNote)}</p>
      </div>
    </div>
  </div>
</section>

<section class="section surface-navy" id="process">
  <div class="shell">
    <p class="kicker">Process</p>
    <h2 style="margin-bottom:2rem">How the work runs</h2>
    <div class="pathway">
      ${s.process.map((p, i) => `<div class="pathstep"><span class="pathstep__n">${String(i + 1).padStart(2, "0")}</span><h3>${esc(p.t)}</h3><p>${esc(p.d)}</p></div>`).join("")}
    </div>
  </div>
</section>

<section class="section surface-white" id="options">
  <div class="shell">
    <p class="kicker">Options</p>
    <h2 style="margin-bottom:1.5rem">Materials and approaches</h2>
    <div class="evengrid">
      ${s.options.map((o) => `<article class="panel"><h3>${esc(o.t)}</h3><p class="flush">${esc(o.d)}</p></article>`).join("")}
    </div>
  </div>
</section>

${L.callout("Not sure which of these you need?", "That is what the free inspection is for. A licensed inspector will tell you what your roof actually requires.")}

${x.deepDive && x.deepDive.length ? `<section class="section surface-white" id="detail">
  <div class="shell duo duo--major">
    <div class="readable">
      <p class="kicker">In detail</p>
      ${x.deepDive.map((d) => `<h2 id="${slugify(d.h)}">${esc(d.h)}</h2>${d.p.map((t) => `<p>${esc(t)}</p>`).join("")}${
        d.list ? `<ul class="ticklist" style="margin:1.1rem 0 1.4rem">${d.list.map((li) => `<li>${I.check}<span>${esc(li)}</span></li>`).join("")}</ul>` : ""
      }`).join("")}
    </div>
    <aside class="rail">
      ${projects.length ? `<p class="kicker">Related work</p>
      <div class="striprow" style="grid-template-columns:1fr;margin-top:0">${projects.map((p) => `<a href="/projects/${p.slug}/" aria-label="${attr(p.title)}">${picture(p.image, p.alt, { sizes: "(min-width:940px) 28vw, 100vw" })}</a>`).join("")}</div>` : ""}
    </aside>
  </div>
</section>` : ""}

${x.expect && x.expect.length ? `<section class="section surface-mist" id="expect">
  <div class="shell duo">
    <div>
      <p class="kicker">What to expect</p>
      <h2 style="margin-bottom:1rem">On the day, from your side of the front door</h2>
      <p class="intro">Most of what makes a job go badly is not craftsmanship \u2014 it is being left to guess what happens next. Here is the sequence.</p>
      ${L.assurance(["Free inspection", "No-obligation estimate", "Fully insured"])}
    </div>
    <div class="timeline">${x.expect.map((e) => `<div class="timeline__pt"><h3>${esc(e.t)}</h3><p>${esc(e.d)}</p></div>`).join("")}</div>
  </div>
</section>` : ""}

${x.mistakes && x.mistakes.length ? `<section class="section surface-navy" id="found">
  <div class="shell">
    <p class="kicker">From our inspections</p>
    <h2 style="margin-bottom:1.5rem;max-width:24ch">What we keep finding on North Texas roofs</h2>
    <div class="flagrid">${x.mistakes.map((m) => `<article class="flagcard"><h3>${esc(m.t)}</h3><p>${esc(m.d)}</p></article>`).join("")}</div>
  </div>
</section>` : ""}

<section class="section surface-white">
  <div class="shell duo">
    <div>
      <p class="kicker">Why Timber</p>
      <h2 style="margin-bottom:1.1rem">What you get from us</h2>
      <ul class="ticklist">${s.benefits.map((b) => `<li>${I.check}<span>${esc(b)}</span></li>`).join("")}</ul>
      ${x.maintenance && x.maintenance.length ? `<h2 style="margin:2.2rem 0 1rem">Keeping it that way</h2>
        <ul class="ticklist">${x.maintenance.map((m) => `<li>${I.check}<span>${esc(m)}</span></li>`).join("")}</ul>` : ""}
    </div>
    <div>
      <p class="kicker">Related services</p>
      <ul class="linklist">${related.map((r) => `<li><a href="${svcUrl(r)}">${esc(r.name)}<span>${I.arrow}</span></a></li>`).join("")}</ul>
      <p class="kicker" style="margin-top:2rem">Where we work</p>
      <ul class="pillrow">${cities.map((c) => `<li><a href="${cityUrl(c)}">${esc(c.name)}</a></li>`).join("")}
      <li><a href="/service-areas/">All areas</a></li></ul>
      ${articles.length ? `<p class="kicker" style="margin-top:2rem">Further reading</p>
      <ul class="linklist">${articles.map((a) => `<li><a href="/resources/${a.slug}/">${esc(a.title)}<span>${I.arrow}</span></a></li>`).join("")}</ul>` : ""}
    </div>
  </div>
</section>

<section class="section surface-mist" id="faqs">
  <div class="shell shell--slim">
    <p class="kicker">Questions</p>
    <h2 style="margin-bottom:1.5rem">${esc(s.name)} FAQs</h2>
    ${L.qa(s.faqs)}
  </div>
</section>

${L.closer(s.image)}`;

  return L.page({
    path: url, title: s.title, description: s.description,
    image: s.image, preload: s.image, pageType: "service", slug: s.slug,
    noindex: s.status === "pending-approval",
    schema: [C.serviceSchema(s, url), C.breadcrumbs(crumbs), C.faqSchema(s.faqs)].filter(Boolean)
  }, body);
}

/* ================================================================== HUB == */
function serviceHub(cat, D) {
  const isRoof = cat === "roofing";
  const url = isRoof ? "/roofing/" : "/exteriors/";
  const label = isRoof ? "Roofing" : "Exterior Services";
  const list = D.services.filter((s) => s.category === cat && s.status === "active");
  const crumbs = [HOME, { label, href: url }];
  const heroImg = isRoof ? "aerial-charcoal-roof-replacement" : "red-brick-home-gutters-downspouts";
  const featured = list.filter((s) => s.featured);
  const rest = list.filter((s) => !s.featured);

  const copy = isRoof
    ? `<p class="intro">Roof replacement, roof repair, inspections, and storm restoration for homes across Dallas\u2013Fort Worth and North Texas. Every job starts with a licensed inspector actually looking at the roof.</p>
       <p>Roofs here do not fail the way they do elsewhere. Spring hail, straight-line wind ahead of the storms, and months of heat that ages shingles from underneath as well as on top. What survives that is a roof where the details \u2014 flashing, valleys, penetrations, and ventilation \u2014 were built correctly.</p>`
    : `<p class="intro">Gutters, fencing, and outdoor improvements handled to the same standard as the roof, because it is all the same weather. ${esc(company.name)} is a roofing and general contractor, so the conversation does not have to end at the roofline.</p>
       <p>Water management is the thread running through most of it. Where roof runoff lands matters a great deal in expansive North Texas clay, and the gutters, fascia, and drainage that control it are worth more attention than they usually get.</p>`;

  const body = `
<section class="pagehead" data-dock-after>
  <div class="shell">
    ${L.trail(crumbs)}
    <div class="pagehead__grid">
      <div>
        <p class="kicker">${esc(label)}</p>
        <h1 class="t-page">${isRoof ? "Roofing for North Texas homes" : "Exterior services across DFW"}</h1>
        <p class="pagehead__sub">${isRoof ? "Replacement, repair, inspection, and storm restoration \u2014 with the detail work that decides whether a roof lasts." : "Gutters, fencing, and outdoor improvements from a contractor already working on the roof above them."}</p>
        <div class="acts"><a class="act act--big" href="/contact/">${esc(company.cta.primary)}</a></div>
      </div>
      <figure class="pagehead__shot">${picture(heroImg, label + " work by Timber Roofing and Exteriors", { eager: true, sizes: "(min-width:940px) 44vw, 100vw" })}</figure>
    </div>
  </div>
</section>
${L.assure()}

<section class="section surface-white">
  <div class="shell">
    <div class="readable" style="margin-bottom:clamp(2.5rem,4vw,3.5rem)">${copy}</div>
    <h2 style="margin-bottom:1.5rem">${isRoof ? "Core roofing services" : "Core exterior services"}</h2>
    <div class="svcrail">${featured.map((s, i) => svcFeature(s, i % 2 === 1)).join("")}</div>
    ${rest.length ? `<h2 style="margin:clamp(2.75rem,5vw,4rem) 0 1.5rem">More ${esc(label.toLowerCase())}</h2>
    <div class="evengrid">${rest.map(svcTile).join("")}</div>` : ""}
  </div>
</section>

${L.callout("Not sure which service you need?", "That is what the free inspection is for. A licensed inspector will tell you what your roof actually requires.")}
${L.closer(heroImg)}`;

  return L.page({
    path: url,
    title: isRoof ? `Roofing Services in Dallas\u2013Fort Worth | ${company.brandShort}` : `Gutters, Fencing & Exterior Services | ${company.brandShort}`,
    description: isRoof
      ? "Roof replacement, repair, inspections, and storm restoration across DFW and North Texas. Licensed inspectors, fully insured, free inspections and estimates."
      : "Gutter installation and repair, seamless gutters, fencing, and outdoor improvements across Dallas\u2013Fort Worth and North Texas. Free estimates.",
    image: heroImg, preload: heroImg, pageType: "hub",
    schema: [C.breadcrumbs(crumbs)]
  }, body);
}

/* ================================================================ STORM == */
function stormHub(D) {
  const url = "/storm-damage/";
  const crumbs = [HOME, { label: "Storm Damage", href: url }];
  const kids = D.services.filter((s) => s.storm);
  const img = "aerial-storm-roof-tearoff-dumpster";

  const body = `
<section class="pagehead" data-dock-after>
  <div class="shell">
    ${L.trail(crumbs)}
    <div class="pagehead__grid">
      <div>
        <p class="kicker">Storm restoration</p>
        <h1 class="t-page">Storm damage restoration in North Texas</h1>
        <p class="pagehead__sub">Documented inspections, honest scope, and a company that will still be reachable next season.</p>
        <div class="acts">
          <a class="act act--big" href="/contact/?service=Storm%20or%20hail%20damage">${esc(company.cta.storm)}</a>
          <a class="act act--big act--ghost" href="${tel}" data-loc="storm-hero">${I.phone} ${esc(company.phone)}</a>
        </div>
      </div>
      <figure class="pagehead__shot">${picture(img, "Aerial view of a residential roof replacement in progress after storm damage", { eager: true, sizes: "(min-width:940px) 44vw, 100vw" })}</figure>
    </div>
  </div>
</section>
${L.assure()}

<section class="section surface-white">
  <div class="shell duo duo--major">
    <div class="readable">
      <p class="intro">North Texas storm season creates two problems at once: real damage to real roofs, and a sudden influx of contractors following the hail. Both are worth approaching carefully.</p>
      <p>Our part is straightforward. A licensed inspector documents the visible damage with photographs. We explain what is storm-related and what is ordinary wear. You get a free written estimate describing the roofing scope in specific terms. Then you decide what to do.</p>
      <p>What we do not do is tell you what your insurance carrier will decide. We are roofers, not adjusters, and anyone promising you a claim outcome is promising something they cannot deliver.</p>
    </div>
    <aside class="rail">
      <h2 class="sr">Urgent help</h2>
      <div class="panel panel--accent">
        <h3 style="margin-bottom:.6rem">If your roof is open right now</h3>
        <p>Call us. Active water intrusion and exposed decking move to the front of the line, and we will tell you honestly when we can be there rather than promising a time we cannot hold.</p>
        <div class="acts" style="margin-top:1rem"><a class="act" href="${tel}" data-loc="storm-urgent">${I.phone} ${esc(company.phone)}</a></div>
      </div>
    </aside>
  </div>
</section>

<section class="section surface-navy">
  <div class="shell">
    <p class="kicker">Storm services</p>
    <h2 style="margin-bottom:1.85rem">What a storm actually does to a house</h2>
    <div class="evengrid">${kids.map(svcTile).join("")}</div>
  </div>
</section>

<section class="section surface-mist">
  <div class="shell shell--slim readable">
    <p class="kicker">Insurance, plainly</p>
    <h2 style="margin-bottom:1rem">What we can and cannot do</h2>
    <p>We can document visible damage, explain the roofing scope, and provide project information that homeowners may share with their insurance carrier.</p>
    <p>We are not a public adjuster, an attorney, an insurance agent, or an insurer. We do not negotiate claims, interpret policies, or guarantee that any claim will be approved. If a contractor tells you otherwise, that is a reason to be careful rather than reassured.</p>
    <div class="panel panel--accent" style="margin-top:1.6rem">
      <h3 style="margin-bottom:.6rem">Two things to be wary of after a storm</h3>
      <p>An offer to cover, waive, or absorb your deductible. Understand what Texas law says about that arrangement before agreeing to anything.</p>
      <p class="flush">Any promise about what your carrier will approve. Nobody outside your insurance company can make that call.</p>
    </div>
    <div class="acts" style="margin-top:1.85rem">
      <a class="act act--ghost" href="/roofing/insurance-restoration-support/">Insurance restoration support</a>
      <a class="act act--ghost" href="/resources/what-to-do-after-a-north-texas-storm/">What to do after a storm</a>
    </div>
  </div>
</section>

${L.closer(img)}`;

  return L.page({
    path: url, title: `Storm Damage Roof Restoration in North Texas | ${company.brandShort}`,
    description: "Hail and wind damage restoration across DFW. Documented post-storm inspections by licensed inspectors, honest scope, and free estimates.",
    image: img, preload: img, pageType: "hub", schema: [C.breadcrumbs(crumbs)]
  }, body);
}

/* ============================================================= PROJECTS == */
function projectsIndex(D) {
  const url = "/projects/";
  const crumbs = [HOME, { label: "Projects", href: url }];
  const body = `
<section class="pagehead" data-dock-after>
  <div class="shell">
    ${L.trail(crumbs)}
    <div class="pagehead__grid">
      <div>
        <p class="kicker">Portfolio</p>
        <h1 class="t-page">Our work</h1>
        <p class="pagehead__sub">Completed roofs, drone documentation, gutters, decks, and fencing \u2014 all of it from Timber Roofing &amp; Exteriors projects. No stock imagery anywhere on this site.</p>
      </div>
      <figure class="pagehead__shot">${picture("aerial-charcoal-roof-replacement", "Aerial view of a completed charcoal architectural shingle roof", { eager: true, sizes: "(min-width:940px) 44vw, 100vw" })}</figure>
    </div>
  </div>
</section>
${L.assure()}

<section class="section surface-white"><div class="shell">${gallery(D.projects, false)}</div></section>
${L.callout("Want your roof to end up in here?", "Start with a free inspection. A licensed inspector will document what you have and tell you what it needs.")}
${L.closer("brick-home-gray-shingle-roof")}`;

  return L.page({
    path: url, title: `Roofing Projects \u2014 DFW & North Texas | ${company.brandShort}`,
    description: "Completed roofing, gutter, deck, and fencing projects across Dallas\u2013Fort Worth, including drone documentation of complex rooflines.",
    image: "aerial-charcoal-roof-replacement", pageType: "portfolio", schema: [C.breadcrumbs(crumbs)]
  }, body);
}

function projectDetail(p, D) {
  const url = `/projects/${p.slug}/`;
  const crumbs = [HOME, { label: "Projects", href: "/projects/" }, { label: p.title, href: url }];
  const related = (p.related || []).map((r) => D.services.find((x) => x.slug === r)).filter(Boolean);
  const catNames = p.categories.map((c) => (D.projects.categories.find((x) => x.slug === c) || {}).name).filter(Boolean);
  const meta = [
    ["Service", (D.services.find((s) => s.slug === p.service) || {}).name],
    ["Category", catNames.join(", ")],
    ["Material", p.material],
    ["Location", p.city ? p.city + ", TX" : company.serviceAreaSummary],
    ["Completed", p.year]
  ].filter(([, v]) => v);

  const body = `
<section class="pagehead" data-dock-after>
  <div class="shell">
    ${L.trail(crumbs)}
    <div style="padding-bottom:clamp(2rem,4vw,3rem)">
      <p class="kicker">${esc(catNames[0] || "Project")}</p>
      <h1 class="t-page" style="max-width:22ch">${esc(p.title)}</h1>
      <p class="pagehead__sub" style="margin-bottom:0">${esc(p.summary)}</p>
    </div>
  </div>
</section>

<section class="section--tight surface-white">
  <div class="shell"><div class="crop rise">${picture(p.image, p.alt, { eager: true, sizes: "(min-width:1240px) 1160px, 100vw" })}</div></div>
</section>

<section class="section surface-white section--open-top">
  <div class="shell duo duo--major">
    <div class="readable">
      <h2>Challenges addressed</h2>
      <p>${esc(p.challenges)}</p>
      <h2>Final outcome</h2>
      <p>${esc(p.outcome)}</p>
      <p class="dim" style="font-size:.9rem;margin-top:1.5rem">Exact addresses are never published. Project details reflect what is visible in the photograph.</p>
    </div>
    <aside class="rail">
      <table class="datatable"><caption class="sr">Project details</caption><tbody>
        ${meta.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join("")}
      </tbody></table>
      ${related.length ? `<div><p class="kicker" style="margin-top:1.5rem">Related services</p>
      <ul class="linklist">${related.map((r) => `<li><a href="${svcUrl(r)}">${esc(r.name)}<span>${I.arrow}</span></a></li>`).join("")}</ul></div>` : ""}
      <div class="acts"><a class="act" href="/contact/">${esc(company.cta.secondary)}</a></div>
    </aside>
  </div>
</section>

<section class="section surface-mist">
  <div class="shell">
    <p class="kicker">More work</p>
    <h2 style="margin-bottom:1.5rem">Other projects</h2>
    <div class="figrid">
      ${D.projects.projects.filter((x) => x.slug !== p.slug).slice(0, 3).map((x) => `<a class="figrid__item" href="/projects/${x.slug}/">
        ${picture(x.image, x.alt, { sizes: "(min-width:960px) 31vw, 100vw" })}
        <span class="figrid__cap"><strong>${esc(x.title)}</strong></span></a>`).join("")}
    </div>
  </div>
</section>

${L.closer(p.image)}`;

  return L.page({
    path: url, title: `${p.title} | ${company.brandShort}`,
    description: C.truncate(stripTags(p.summary), 155),
    image: p.image, preload: p.image, pageType: "project", slug: p.slug,
    schema: [C.breadcrumbs(crumbs), C.imageObject(p.image, p.alt)].filter(Boolean)
  }, body);
}

/* ================================================================ AREAS == */
function areasHub(D) {
  const url = "/service-areas/";
  const crumbs = [HOME, { label: "Service Areas", href: url }];
  const outer = D.counties.filter((c) => c.approvalRequired);

  const body = `
<section class="pagehead" data-dock-after>
  <div class="shell">
    ${L.trail(crumbs)}
    <div class="pagehead__grid">
      <div>
        <p class="kicker">Coverage</p>
        <h1 class="t-page">Where we work</h1>
        <p class="pagehead__sub">Dallas\u2013Fort Worth is our core market. We serve homeowners throughout the surrounding North Texas communities and will travel roughly two hours in any direction from Dallas for the right project.</p>
      </div>
      <figure class="pagehead__shot">${picture("brick-home-brown-shingle-roof", "Completed roof on a North Texas brick home", { eager: true, sizes: "(min-width:940px) 44vw, 100vw" })}</figure>
    </div>
  </div>
</section>
${L.assure()}

<section class="section surface-white">
  <div class="shell">
    <p class="kicker">Counties</p>
    <h2 style="margin-bottom:1.75rem">County hubs</h2>
    <div class="evengrid">
      ${L.navCounties.map((co) => `<a class="svctile" href="${countyUrl(co)}">
        <span class="svctile__ico">${I.pin}</span>
        <h3>${esc(co.name)}</h3><p>${esc(co.blurb)}</p>
        <span class="golink" style="margin-top:.9rem">${co.live.length} communities ${I.arrow}</span>
      </a>`).join("")}
    </div>
    <div class="slab" style="margin-top:2.25rem">
      <h3 style="margin-bottom:.6rem">Further out</h3>
      <p>We regularly take projects beyond the counties above \u2014 ${esc(outer.map((c) => c.name.replace(" County", "")).slice(0, 12).join(", "))}, and others within roughly two hours of Dallas. Distance and project scope go together. Call with your address and we will tell you straight whether we are the right crew for it.</p>
      <div class="acts" style="margin-top:1rem"><a class="act act--ghost" href="${tel}" data-loc="areas-outer">${I.phone} ${esc(company.phone)}</a></div>
    </div>
  </div>
</section>

${explorer(D)}
${L.closer("brick-home-gray-shingle-roof")}`;

  return L.page({
    path: url, title: `Roofing Service Areas \u2014 DFW & North Texas | ${company.brandShort}`,
    description: "Counties and cities served by Timber Roofing & Exteriors across Dallas\u2013Fort Worth and North Texas, within roughly two hours of Dallas.",
    image: "brick-home-brown-shingle-roof", pageType: "hub", schema: [C.breadcrumbs(crumbs)]
  }, body);
}

function countyPage(co, D) {
  const url = countyUrl(co);
  const crumbs = [HOME, { label: "Service Areas", href: "/service-areas/" }, { label: co.name, href: url }];
  const kids = (co.cities || []).map((s) => D.cities.find((c) => c.slug === s)).filter(Boolean);
  const services = D.services.filter((s) => s.featured && s.status === "active");
  const neighbours = L.navCounties.filter((x) => x.slug !== co.slug).slice(0, 6);
  const cx = COUNTY_EXTRAS[co.slug] || {};
  const faqs = (cx.faqs || []).concat([
    { q: `Do you charge for an inspection in ${co.name}?`, a: `No. Inspections and written estimates are free everywhere we work, and they are performed by licensed inspectors. You keep the photographs whether or not you hire us.` }
  ]);

  const body = `
<section class="pagehead" data-dock-after>
  <div class="shell">
    ${L.trail(crumbs)}
    <div class="pagehead__grid">
      <div>
        <p class="kicker">${esc(co.seat)}, Texas &middot; County hub</p>
        <h1 class="t-page">Roofing &amp; exteriors in ${esc(co.name)}</h1>
        <p class="pagehead__sub">${esc(co.blurb)}</p>
        <div class="acts">
          <a class="act act--big act--pulse" href="/contact/">${esc(company.cta.primary)}</a>
          <a class="act act--big act--ghost" href="${tel}" data-loc="county-hero">${I.phone} ${esc(company.phone)}</a>
        </div>
      </div>
      <figure class="pagehead__shot">${picture("aerial-gray-shingle-roof-crew", "Overhead view of a completed shingle roof in North Texas", { eager: true, sizes: "(min-width:940px) 44vw, 100vw" })}</figure>
    </div>
  </div>
</section>
${L.assure()}

<section class="section surface-white">
  <div class="shell duo duo--major">
    <div class="readable">
      <h2>Roofing conditions in ${esc(co.name)}</h2>
      <p class="intro">${esc(co.context)}</p>
      ${(cx.context || []).map((d) => `<h2 id="${slugify(d.h)}">${esc(d.h)}</h2>${d.p.map((t) => `<p>${esc(t)}</p>`).join("")}`).join("")}
      <p>${esc(company.name)} serves homeowners throughout ${esc(co.name)} on roof replacement, roof repair, inspections, storm restoration, gutters, and exterior improvements. ${esc(company.travelRadiusNote)}</p>
    </div>
    <aside class="rail">
      ${cx.facts ? `<dl class="keyfacts">${cx.facts.map((f) => `<div><dt>${esc(f.k)}</dt><dd>${esc(f.v)}</dd></div>`).join("")}</dl>` : ""}
      
      <div class="panel panel--mist">
        <h3 style="margin-bottom:.5rem">Free inspection</h3>
        <p>Licensed inspector, full photo documentation, and a written estimate at no cost.</p>
        <div class="acts" style="margin-top:1rem"><a class="act" href="/contact/">${esc(company.cta.header)}</a></div>
      </div>
    </aside>
  </div>
  <div class="shell" style="margin-top:clamp(2.5rem,4vw,3.5rem)">
    <dl class="civic civic--row">
      <div><span class="civic__ico">${I.pin}</span><div><dt>County seat</dt><dd>${esc(co.seat)}, Texas<small>${(co.cities || []).length} communities listed on this hub, and we work throughout the county.</small></dd></div></div>
      <div><span class="civic__ico">${I.clip}</span><div><dt>Roofing permits</dt><dd>Pulled by us<small>Almost every incorporated city here requires a permit for a reroof. We pull it and schedule any inspection. Unincorporated property is handled by the county instead.</small></dd></div></div>
      <div><span class="civic__ico">${I.shield}</span><div><dt>Before you sign</dt><dd>Verify the contractor<small>Ask for a physical address you could visit and check it. Anyone offering to absorb your deductible is proposing something to understand under Texas law first.</small></dd></div></div>
      <div><span class="civic__ico">${I.badge}</span><div><dt>What it costs</dt><dd>Nothing to find out<small>Inspection and written estimate are free, by a licensed inspector, and you keep the photographs whether or not you hire us.</small></dd></div></div>
    </dl>
  </div>
</section>

${cx.issues && cx.issues.length ? `<section class="section surface-mist">
  <div class="shell">
    <p class="kicker">Across the county</p>
    <h2 style="margin-bottom:1.5rem;max-width:26ch">What we most often find on ${esc(co.name)} roofs</h2>
    <div class="flagrid">${cx.issues.map((it) => `<article class="flagcard"><h3>${esc(it.t)}</h3><p>${esc(it.d)}</p></article>`).join("")}</div>
  </div>
</section>` : ""}

${kids.length ? `<section class="section surface-white">
  <div class="shell">
    <p class="kicker">Cities</p>
    <h2 style="margin-bottom:1.5rem">Communities we serve in ${esc(co.name)}</h2>
    <div class="evengrid">
      ${kids.map((c) => `<a class="svctile" href="${cityUrl(c)}">
        <span class="svctile__ico">${I.home}</span>
        <h3>${esc(c.name)}</h3><p>${esc(C.truncate(c.intro, 130))}</p></a>`).join("")}
    </div>
  </div>
</section>` : ""}

<section class="section surface-navy">
  <div class="shell">
    <div class="lede-row">
      <div><p class="kicker">How it runs</p><h2>From your call to the walkthrough</h2></div>
      <p class="intro flush">The same process everywhere we work, ${esc(co.name)} included.</p>
    </div>
    <div class="pathway">${site.process.map((pr) => `<div class="pathstep"><span class="pathstep__n">${esc(pr.n)}</span><h3>${esc(pr.title)}</h3><p>${esc(pr.body)}</p></div>`).join("")}</div>
  </div>
</section>

<section class="section surface-white">
  <div class="shell duo duo--major">
    <div>
      <p class="kicker">Questions</p>
      <h2 style="margin-bottom:1.25rem">${esc(co.name)} roofing questions</h2>
      ${L.qa(faqs)}
    </div>
    <aside class="rail">
      <div>
        <p class="kicker">Services here</p>
        <ul class="linklist">${services.map((s) => `<li><a href="${svcUrl(s)}">${esc(s.name)}<span>${I.arrow}</span></a></li>`).join("")}</ul>
      </div>
      <div>
        <p class="kicker">Nearby counties</p>
        <ul class="pillrow">${neighbours.map((n) => `<li><a href="${countyUrl(n)}">${esc(n.name)}</a></li>`).join("")}
        <li><a href="/service-areas/">All service areas</a></li></ul>
      </div>
    </aside>
  </div>
</section>

${L.closer("aerial-gray-shingle-roof-crew")}`;

  return L.page({
    path: url, title: `${co.name} Roofing & Exteriors | ${company.brandShort}`,
    description: C.truncate(`Roofing, gutters, and storm restoration across ${co.name}, Texas. ${co.blurb} Free inspections by licensed inspectors.`, 155),
    image: "aerial-gray-shingle-roof-crew", pageType: "location", slug: co.slug,
    noindex: co.approvalRequired,
    schema: [C.breadcrumbs(crumbs), C.faqSchema(faqs)].filter(Boolean)
  }, body);
}

function cityPage(c, D) {
  const url = cityUrl(c);
  const county = D.counties.find((x) => x.slug === c.county);
  const crumbs = [HOME, { label: "Service Areas", href: "/service-areas/" }];
  if (county) crumbs.push({ label: county.name, href: countyUrl(county) });
  crumbs.push({ label: c.name, href: url });

  const cx = CITY_EXTRAS[c.slug] || {};
  const services = D.services.filter((sv) => sv.featured && sv.status === "active");
  const nearby = D.cities.filter((n) => n.slug !== c.slug && !n.approvalRequired && (n.county === c.county || n.tier === 1)).slice(0, 10);
  const faqs = [
    c.faq,
    { q: `Do you offer free roof inspections in ${c.name}?`, a: `Yes. Inspections and written estimates are free everywhere we work, ${c.name} included, and they are performed by licensed inspectors. You keep the photographs whether or not you hire us.` },
    { q: `How quickly can you get to a leak in ${c.name}?`, a: `Call and we will give you a real answer rather than a number that sounds good. Active water intrusion moves to the front of the line.` },
    { q: `Does Timber have an office in ${c.name}?`, a: `No, and we will not pretend otherwise. ${company.name} serves homeowners throughout ${c.name} and the surrounding North Texas communities from the Metroplex. What matters is that we are local to the region, reachable next year, and not a crew that followed a storm in from out of state.` }
  ].concat(cx.faqs || []).filter((f) => f && f.q);

  const body = `
<section class="pagehead" data-dock-after>
  <div class="shell">
    ${L.trail(crumbs)}
    <div class="pagehead__grid">
      <div>
        <p class="kicker">${esc(county ? county.name : "North Texas")}</p>
        <h1 class="t-page">Roofing &amp; exteriors in ${esc(c.name)}, Texas</h1>
        <p class="pagehead__sub">${esc(c.intro)}</p>
        <div class="acts">
          <a class="act act--big" href="/contact/?city=${encodeURIComponent(c.name)}">${esc(company.cta.primary)}</a>
          <a class="act act--big act--ghost" href="${tel}" data-loc="city-hero">${I.phone} ${esc(company.phone)}</a>
        </div>
      </div>
      <figure class="pagehead__shot">${picture("brick-home-gray-shingle-roof", "Completed shingle roof on a North Texas brick home", { eager: true, sizes: "(min-width:940px) 44vw, 100vw" })}</figure>
    </div>
  </div>
</section>
${L.assure()}

<section class="section surface-white">
  <div class="shell duo duo--major">
    <div class="readable">
      <h2>Roofing in ${esc(c.name)}</h2>
      <p class="intro">${esc(c.housing)}</p>
      <h2>Local conditions worth knowing</h2>
      <p>${esc(c.local)}</p>
      ${cx.weather ? cx.weather.map((t) => `<p>${esc(t)}</p>`).join("") : ""}
      ${cx.sections ? cx.sections.map((d) => `<h2 id="${slugify(d.h)}">${esc(d.h)}</h2>${d.p.map((t) => `<p>${esc(t)}</p>`).join("")}`).join("") : ""}
      <p>${esc(company.name)} serves homeowners throughout ${esc(c.name)} and the surrounding North Texas communities. ${esc(company.travelRadiusNote)}</p>
    </div>
    <aside class="rail">

      <div class="panel panel--mist">
        <h3 style="margin-bottom:.5rem">Free inspection in ${esc(c.name)}</h3>
        <p>Licensed inspector, full photo documentation, and a written estimate at no cost.</p>
        <div class="acts" style="margin-top:1rem"><a class="act" href="/contact/?city=${encodeURIComponent(c.name)}">${esc(company.cta.header)}</a></div>
        <p style="margin:.9rem 0 0"><a class="golink" href="${tel}" data-loc="city-rail">${I.phone} ${esc(company.phone)}</a></p>
      </div>
      ${cx.stats ? `<dl class="keyfacts">${cx.stats.map((sp) => `<div><dt>${esc(sp.k)}</dt><dd>${esc(sp.v)}</dd></div>`).join("")}</dl>` : ""}
      
    </aside>
  </div>
  <div class="shell" style="margin-top:clamp(2.5rem,4vw,3.5rem)">
    <p class="kicker">What we do in ${esc(c.name)}</p>
    <div class="svcband">
      ${services.map((sv) => `<a class="svcband__i" href="${svcUrl(sv)}">
        <span class="svcband__ico">${ico(sv)}</span>
        <span><strong>${esc(sv.name)}</strong><small>${esc(C.truncate(sv.heroSub, 82))}</small></span>
      </a>`).join("")}
    </div>
  </div>
  <div class="shell" style="margin-top:clamp(2.5rem,4vw,3.5rem)">
    <dl class="civic civic--row">
      <div><span class="civic__ico">${I.pin}</span><div><dt>County</dt><dd>${esc(county ? county.name : "North Texas")}<small>${county ? `County seat: ${esc(county.seat)}, Texas. ` : ""}${esc(c.name)} sits inside our core service area.</small></dd></div></div>
      <div><span class="civic__ico">${I.clip}</span><div><dt>Roofing permit</dt><dd>We pull it<small>${esc(c.name)} issues its own building permits, and a reroof almost always needs one. We handle the application and any inspection as part of the job.</small></dd></div></div>
      <div><span class="civic__ico">${I.shield}</span><div><dt>HOA rules</dt><dd>Check before you choose<small>Some ${esc(c.name)} neighbourhoods restrict shingle colour or profile. Bring us the guidelines and we will specify to them rather than around them.</small></dd></div></div>
      <div><span class="civic__ico">${I.badge}</span><div><dt>Before you sign</dt><dd>Verify the contractor<small>Ask for a physical address you could visit, and check it. Anyone offering to absorb your deductible is proposing something worth understanding first.</small></dd></div></div>
    </dl>
  </div>
</section>

${cx.issues && cx.issues.length ? `<section class="section surface-mist">
  <div class="shell">
    <p class="kicker">Common locally</p>
    <h2 style="margin-bottom:1.5rem;max-width:26ch">What we most often find on ${esc(c.name)} roofs</h2>
    <div class="flagrid">${cx.issues.map((it) => `<article class="flagcard"><h3>${esc(it.t)}</h3><p>${esc(it.d)}</p></article>`).join("")}</div>
  </div>
</section>` : ""}

<section class="section surface-navy">
  <div class="shell">
    <div class="lede-row">
      <div><p class="kicker">How an inspection runs</p><h2>From your call to the walkthrough</h2></div>
      <p class="intro flush">The same process everywhere we work, ${esc(c.name)} included.</p>
    </div>
    <div class="pathway">${site.process.map((pr) => `<div class="pathstep"><span class="pathstep__n">${esc(pr.n)}</span><h3>${esc(pr.title)}</h3><p>${esc(pr.body)}</p></div>`).join("")}</div>
  </div>
</section>

<section class="section surface-white">
  <div class="shell">
    <div class="lede-row">
      <div><p class="kicker">Our work</p><h2>Recent North Texas projects</h2></div>
      <p class="intro flush">Authentic project photography from ${esc(company.name)} work across the Metroplex. Exact addresses are not published.</p>
    </div>
    <div class="figrid">
      ${D.projects.projects.filter((pj) => pj.featured).slice(0, 3).map((pj) => `<a class="figrid__item" href="/projects/${pj.slug}/">
        ${picture(pj.image, pj.alt, { sizes: "(min-width:960px) 31vw, 100vw" })}
        <span class="figrid__cap"><strong>${esc(pj.title)}</strong></span></a>`).join("")}
    </div>
    <div class="acts" style="margin-top:1.85rem"><a class="act act--ghost" href="/projects/">${esc(company.cta.work)}</a></div>
  </div>
</section>

${L.callout(`Free roof inspections in ${c.name}.`, "A licensed inspector, photographs you keep, and a written estimate only if work is genuinely needed.")}

<section class="section surface-white">
  <div class="shell duo duo--major">
    <div>
      <p class="kicker">Questions</p>
      <h2 style="margin-bottom:1.25rem">${esc(c.name)} roofing questions</h2>
      ${L.qa(faqs)}
    </div>
    <aside class="rail">
      <div>
        <p class="kicker">Nearby areas</p>
        <ul class="pillrow">${nearby.map((n) => `<li><a href="${cityUrl(n)}">${esc(n.name)}</a></li>`).join("")}
        ${county ? `<li><a href="${countyUrl(county)}">${esc(county.name)}</a></li>` : ""}
        <li><a href="/service-areas/">All areas</a></li></ul>
      </div>
      <div>
        <p class="kicker">Storm restoration</p>
        <ul class="linklist">
          <li><a href="/storm-damage/">Storm damage hub<span>${I.arrow}</span></a></li>
          <li><a href="/roofing/hail-damage-roof-repair/">Hail damage repair<span>${I.arrow}</span></a></li>
          <li><a href="/roofing/wind-damage-roof-repair/">Wind damage repair<span>${I.arrow}</span></a></li>
        </ul>
      </div>
    </aside>
  </div>
</section>

${L.closer("brick-home-gray-shingle-roof")}`;

  const localBiz = {
    "@context": "https://schema.org", "@type": "RoofingContractor",
    "@id": company.siteUrl + url + "#business",
    name: `${company.name} \u2014 ${c.name}`,
    parentOrganization: { "@id": C.ORG_ID },
    url: company.siteUrl + url, telephone: company.phone, email: company.email,
    image: company.siteUrl + "/logo/timber-social.jpg",
    areaServed: { "@type": "City", name: c.name, addressRegion: "TX", addressCountry: "US" },
    description: stripTags(c.intro)
  };

  return L.page({
    path: url, title: `${c.name} Roofing & Exteriors | ${company.brandShort}`,
    description: C.truncate(`Roof replacement, repair, inspections, gutters, and storm restoration in ${c.name}, TX. ${stripTags(c.intro)}`, 155),
    image: "brick-home-gray-shingle-roof", preload: "brick-home-gray-shingle-roof",
    pageType: "location", slug: c.slug, noindex: !!c.approvalRequired,
    schema: [localBiz, C.breadcrumbs(crumbs), C.faqSchema(faqs)].filter(Boolean)
  }, body);
}

/* ================================================== ABOUT / CONTACT / ETC */
function about(D) {
  const url = "/about/";
  const crumbs = [HOME, { label: "About", href: url }];
  const body = `
<section class="pagehead" data-dock-after>
  <div class="shell">
    ${L.trail(crumbs)}
    <div class="pagehead__grid">
      <div>
        <p class="kicker">About</p>
        <h1 class="t-page">Integrity that keeps you covered</h1>
        <p class="pagehead__sub">The name on the truck matters more in this trade than most. Here is what ours stands for.</p>
      </div>
      <figure class="pagehead__shot">${picture("red-brick-home-gutters-downspouts", "Two-story red brick home with completed roof and gutter system", { eager: true, sizes: "(min-width:940px) 44vw, 100vw" })}</figure>
    </div>
  </div>
</section>
${L.assure()}

<section class="section surface-white">
  <div class="shell duo duo--major">
    <div class="readable">
      <p class="intro">${esc(company.name)} is a roofing and general contractor serving Dallas\u2013Fort Worth and the surrounding North Texas communities \u2014 roof replacements, roof repairs, gutters, inspections, storm restoration, and outdoor home improvements.</p>
      <h2>How we work</h2>
      <p>A licensed inspector looks at the roof properly, including the parts you cannot see from the ground. You get photographs and a plain explanation of what they show. If work is needed, you get a free written estimate before anything is ordered. If it is not, you get told that.</p>
      <p>That last part is the whole thing, really. A roofing company that only ever recommends replacement is not inspecting roofs, it is selling them. We would rather do a good repair now and be the company you call in eight years than sell you something you did not need today.</p>
      <h2>What we hold ourselves to</h2>
      <ul class="ticklist" style="margin-bottom:1.5rem">
        ${["Proper inspections, documented with photographs you keep", "Durable materials installed to manufacturer requirements", "The detail work \u2014 flashing, valleys, penetrations, ventilation \u2014 done rather than skipped", "Clear communication about scope, schedule, and anything we find along the way", "Respect for your property: landscaping protected, nails swept, debris hauled", "Local knowledge of how North Texas weather actually damages roofs"].map((t) => `<li>${I.check}<span>${esc(t)}</span></li>`).join("")}
      </ul>
      <h2>Where we work</h2>
      <p>Dallas\u2013Fort Worth is our core market, and we serve homeowners across the surrounding North Texas counties. ${esc(company.travelRadiusNote)}</p>
    </div>
    <aside class="rail">
      <div class="panel" style="text-align:center">
        ${L.fullLogo(null, "190px")}
        <p class="dim" style="margin:1rem 0 0;font-size:.88rem">${esc(company.tagline)}</p>
      </div>
      <div class="panel">
        <p class="kicker" style="margin-bottom:.6rem">Owner</p>
        <h3 style="margin-bottom:.5rem">Drew</h3>
        <p>Drew owns and runs ${esc(company.name)}.</p>
        <div style="border:1px dashed var(--mist-300);border-radius:var(--radius-sm);padding:1rem;margin-top:1rem;font-size:.87rem;color:var(--body)">
          <strong style="display:block;margin-bottom:.35rem;color:var(--title)">Placeholder \u2014 pending Drew's approval</strong>
          Drew's biography and portrait go here. Nothing has been invented in the meantime: no years in business, no background, no credentials beyond what the company has confirmed.
        </div>
        <div class="acts" style="margin-top:1.15rem"><a class="act" href="/contact/">${esc(company.cta.ask)}</a></div>
      </div>
    </aside>
  </div>
</section>

${L.callout("Talk to us about your roof.", "Free inspection, free estimate, and a straight answer either way.")}
${L.closer("red-brick-home-gutters-downspouts")}`;

  return L.page({
    path: url, title: `About Timber Roofing & Exteriors | DFW Roofing Contractor`,
    description: "Timber Roofing & Exteriors is a roofing and general contractor serving DFW and North Texas. Licensed inspectors, fully insured, free inspections and estimates.",
    image: "red-brick-home-gutters-downspouts", preload: "red-brick-home-gutters-downspouts",
    pageType: "about", schema: [C.organization(), C.breadcrumbs(crumbs)]
  }, body);
}

function contact(D) {
  const url = "/contact/";
  const crumbs = [HOME, { label: "Contact", href: url }];
  const body = `
<section class="pagehead" data-dock-after>
  <div class="shell">
    ${L.trail(crumbs)}
    <div style="padding-bottom:clamp(2.5rem,5vw,4rem);max-width:60ch">
      <p class="kicker">Contact</p>
      <h1 class="t-page">Schedule a free inspection</h1>
      <p class="pagehead__sub" style="margin-bottom:0">Tell us what you are seeing and where you are. A licensed inspector will take a proper look and show you the photographs \u2014 whether or not the answer involves hiring us.</p>
    </div>
  </div>
</section>
${L.assure()}

<section class="section surface-white">
  <div class="shell duo duo--major">
    <div class="readable">
      <h2>Two ways to reach us</h2>
      <p class="intro">Call if it is urgent \u2014 an active leak or an open roof goes to the front of the line. Email if it can wait a day, and send photographs if you have them.</p>
      <div class="reach">
        <a class="reachcard" href="${tel}" data-loc="contact-primary">
          <span class="reachcard__ico">${I.phone}</span>
          <span class="reachcard__l">Call us</span>
          <strong>${esc(company.phone)}</strong>
          <span class="reachcard__n">Fastest for leaks, storm damage, and scheduling.</span>
        </a>
        <a class="reachcard" href="mailto:${company.email}?subject=${encodeURIComponent("Free inspection request")}" data-loc="contact-primary">
          <span class="reachcard__ico">${I.mail}</span>
          <span class="reachcard__l">Email us</span>
          <strong>${esc(company.email)}</strong>
          <span class="reachcard__n">Good for photographs and non-urgent questions.</span>
        </a>
      </div>
      <h2>What to include</h2>
      <p>None of this is required \u2014 we will work it out on the call. It just means we arrive knowing what we are looking at.</p>
      <ul class="ticklist">
        ${["Your city and ZIP code, so we can confirm we cover it", "What you are seeing \u2014 a stain, missing shingles, a storm last week, or simply an old roof", "Roughly how old the roof is, if you know", "Whether anything is actively leaking right now", "Ground-level photographs, if you have them \u2014 please do not climb up to take them", "The best time of day to reach you"].map((t) => `<li>${I.check}<span>${esc(t)}</span></li>`).join("")}
      </ul>
      ${L.assurance(["Free inspection", "No-obligation estimate", "Licensed inspectors", "Fully insured"])}
    </div>
    <aside class="rail">
      <div class="panel panel--mist">
        <h3 style="margin-bottom:.6rem">Service area</h3>
        <p>${esc(company.serviceAreaSummary)}. ${esc(company.travelRadiusNote)}</p>
        <a class="golink" href="/service-areas/">See all service areas ${I.arrow}</a>
      </div>
      <div class="panel">
        <h3 style="margin-bottom:.7rem">What you can expect</h3>
        <ul class="ticklist">${company.trust.map((t) => `<li>${I.check}<span><strong>${esc(t.label)}</strong> \u2014 ${esc(t.detail)}</span></li>`).join("")}</ul>
      </div>
      <div class="panel panel--accent">
        <h3 style="margin-bottom:.6rem">If your roof is open right now</h3>
        <p class="flush">Call rather than emailing, move what you can out of the water's path, and stay clear of any bulging ceiling. Please do not go up on the roof.</p>
      </div>
    </aside>
  </div>
</section>
${L.closer("brick-home-brown-shingle-roof")}`;

  return L.page({
    path: url, title: `Contact Timber Roofing & Exteriors | Free Inspection`,
    description: `Request a free roof inspection or estimate. Call ${company.phone} or email us. Serving Dallas\u2013Fort Worth and North Texas.`,
    pageType: "contact",
    schema: [C.organization(), C.breadcrumbs(crumbs),
      { "@context": "https://schema.org", "@type": "ContactPage", name: "Contact " + company.name, url: company.siteUrl + url }]
  }, body);
}

function simplePage(o) {
  const crumbs = [HOME, { label: o.label, href: o.path }];
  const body = `
<section class="pagehead" data-dock-after>
  <div class="shell">
    ${L.trail(crumbs)}
    <div style="padding-bottom:clamp(2.5rem,5vw,4rem);max-width:56ch">
      <p class="kicker">${esc(o.kicker || o.label)}</p>
      <h1 class="t-page">${esc(o.h1)}</h1>
      ${o.lede ? `<p class="pagehead__sub" style="margin-bottom:0">${esc(o.lede)}</p>` : ""}
    </div>
  </div>
</section>
<section class="section surface-white"><div class="shell shell--slim"><div class="copy">${o.body}</div></div></section>
${o.hideCta ? "" : L.closer("brick-home-gray-shingle-roof")}`;

  return L.page({
    path: o.path, title: o.title, description: o.description,
    pageType: "page", noindex: o.noindex, schema: [C.breadcrumbs(crumbs)]
  }, body);
}

function notFound() {
  const body = `<section class="gone section surface-white"><div class="shell" style="max-width:640px">
  <p class="kicker" style="justify-content:center">404</p>
  <h1 class="t-page" style="margin-bottom:1rem">That page is not on this roof.</h1>
  <p class="intro" style="margin-inline:auto">The link may be old or mistyped. Here is the way back.</p>
  <div class="acts" style="justify-content:center;margin-top:1.85rem">
    <a class="act" href="/">Home</a>
    <a class="act act--ghost" href="/roofing/">Roofing services</a>
    <a class="act act--ghost" href="/service-areas/">Service areas</a>
    <a class="act act--ghost" href="/contact/">Contact</a>
  </div>
</div></section>`;
  return L.page({ path: "/404.html", title: `Page Not Found | ${company.brandShort}`, description: "That page could not be found. Browse roofing and exterior services, service areas across DFW and North Texas, or contact Timber for a free inspection.", noindex: true, pageType: "page" }, body);
}

/* ============================================================ RESOURCES == */
function resourcesIndex(D) {
  const url = "/resources/";
  const crumbs = [HOME, { label: "Resources", href: url }];
  const live = D.articles.filter((a) => a.status === "published");
  const body = `
<section class="pagehead" data-dock-after>
  <div class="shell">
    ${L.trail(crumbs)}
    <div class="pagehead__grid">
      <div>
        <p class="kicker">Resource centre</p>
        <h1 class="t-page">Roofing, explained plainly</h1>
        <p class="pagehead__sub">Practical reading for North Texas homeowners \u2014 what damage looks like, when to worry, and what to ask whoever is standing on your roof.</p>
      </div>
      <figure class="pagehead__shot">${picture("aerial-weathered-shingle-roof", "Aerial view of a weathered shingle roof in North Texas", { eager: true, sizes: "(min-width:940px) 44vw, 100vw" })}</figure>
    </div>
  </div>
</section>
${L.assure()}

<section class="section surface-white">
  <div class="shell">
    <h2 style="margin-bottom:1.75rem">Guides and explainers</h2>
    <div class="evengrid">
      ${live.map((a) => `<a class="svctile" href="/resources/${a.slug}/">
        <div class="crop" style="margin:-.25rem -.25rem 1.15rem">${picture(a.image, a.title, { sizes: "(min-width:1024px) 33vw, 100vw" })}</div>
        <span class="tagchip" style="margin-bottom:.7rem">${esc(a.category)}</span>
        <h3>${esc(a.title)}</h3><p>${esc(a.excerpt)}</p>
        <span class="golink" style="margin-top:1rem">Read ${I.arrow}</span></a>`).join("")}
    </div>
  </div>
</section>

${L.callout("Reading only gets you so far.", "A licensed inspector on your actual roof gets you the rest of the way. Free, either way.")}
${L.closer("aerial-weathered-shingle-roof")}`;

  return L.page({
    path: url, title: `Roofing Resources for North Texas Homeowners | ${company.brandShort}`,
    description: "Guides on storm damage, roof repair, inspections, and hiring a contractor, written for Dallas\u2013Fort Worth homeowners.",
    image: "aerial-weathered-shingle-roof", pageType: "hub", schema: [C.breadcrumbs(crumbs)]
  }, body);
}

function articlePage(a, D) {
  const url = `/resources/${a.slug}/`;
  const crumbs = [HOME, { label: "Resources", href: "/resources/" }, { label: a.title, href: url }];
  const services = (a.relatedServices || []).map((s) => D.services.find((x) => x.slug === s)).filter(Boolean);
  const wc = a.body.reduce((n, b) => n + words(b.text || (b.items || []).join(" ")), 0);
  const mins = Math.max(2, Math.round(wc / 220));
  const headings = a.body.filter((b) => b.type === "h2");

  const render = (b) => {
    switch (b.type) {
      case "h2": return `<h2 id="${slugify(b.text)}">${esc(b.text)}</h2>`;
      case "ul": return `<ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
      case "ol": return `<ol>${b.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ol>`;
      case "callout": return `<div class="pull"><p class="flush">${esc(b.text)}</p></div>`;
      case "note": return `<div class="aside"><p class="flush">${esc(b.text)}</p></div>`;
      default: return `<p>${esc(b.text)}</p>`;
    }
  };

  const body = `
<section class="pagehead" data-dock-after>
  <div class="shell">
    ${L.trail(crumbs)}
    <div style="padding-bottom:clamp(2rem,4vw,3rem);max-width:60ch">
      <p class="kicker">${esc(a.category)}</p>
      <h1 class="t-page">${esc(a.title)}</h1>
      <p class="pagehead__sub" style="margin-bottom:1.15rem">${esc(a.excerpt)}</p>
      <p class="postmeta" style="color:#8EA0B8"><span>${mins} min read</span><span>Updated ${esc(a.updated)}</span><span>${esc(company.name)}</span></p>
    </div>
  </div>
</section>

<section class="section--tight surface-white">
  <div class="shell"><div class="crop rise">${picture(a.image, a.title, { eager: true, sizes: "(min-width:1240px) 1160px, 100vw" })}</div></div>
</section>

<section class="section surface-white section--open-top">
  <div class="shell duo duo--major">
    <article>
      ${headings.length > 2 ? `<nav class="contents" aria-label="On this page"><h2>On this page</h2><ol>${headings.map((h) => `<li><a href="#${slugify(h.text)}">${esc(h.text)}</a></li>`).join("")}</ol></nav>` : ""}
      <div class="copy">${a.body.map(render).join("\n")}</div>
      <div class="panel panel--mist" style="margin-top:2.5rem">
        <h3 style="margin-bottom:.6rem">Want it looked at properly?</h3>
        <p>Free inspection by a licensed inspector, photographs you keep, and a written estimate only if work is needed.</p>
        <div class="acts" style="margin-top:1rem"><a class="act" href="/contact/">${esc(company.cta.primary)}</a></div>
      </div>
    </article>
    <aside class="rail">
      <div>
        <p class="kicker">Related services</p>
        <ul class="linklist">${services.map((s) => `<li><a href="${svcUrl(s)}">${esc(s.name)}<span>${I.arrow}</span></a></li>`).join("")}</ul>
      </div>
      <div>
        <p class="kicker">Service areas</p>
        <ul class="pillrow">${D.cities.filter((c) => c.tier === 1 && !c.approvalRequired).slice(0, 6).map((c) => `<li><a href="${cityUrl(c)}">${esc(c.name)}</a></li>`).join("")}</ul>
      </div>
      <div>
        <p class="kicker">More reading</p>
        <ul class="linklist">${D.articles.filter((x) => x.status === "published" && x.slug !== a.slug).slice(0, 4).map((x) => `<li><a href="/resources/${x.slug}/">${esc(x.title)}<span>${I.arrow}</span></a></li>`).join("")}</ul>
      </div>
    </aside>
  </div>
</section>

${L.closer(a.image)}`;

  return L.page({
    path: url, title: a.metaTitle, description: a.description,
    image: a.image, preload: a.image, ogType: "article", pageType: "article", slug: a.slug,
    schema: [C.articleSchema(a, url), C.breadcrumbs(crumbs)]
  }, body);
}

/* ============================================================== SITEMAP == */
function htmlSitemap(D, urls) {
  const group = (title, items) => `<h2 style="margin:2.5rem 0 1rem">${esc(title)}</h2>
<ul class="pillrow">${items.map((i) => `<li><a href="${i.href}">${esc(i.label)}</a></li>`).join("")}</ul>`;
  const crumbs = [HOME, { label: "Sitemap", href: "/sitemap/" }];
  const body = `
<section class="pagehead" data-dock-after>
  <div class="shell">
    ${L.trail(crumbs)}
    <div style="padding-bottom:clamp(2.5rem,5vw,4rem)">
      <p class="kicker">Sitemap</p>
      <h1 class="t-page">Every page on this site</h1>
      <p class="pagehead__sub" style="margin-bottom:0">${urls.length} indexed pages.</p>
    </div>
  </div>
</section>
<section class="section surface-white"><div class="shell">
${group("Main pages", [
  { href: "/", label: "Home" }, { href: "/about/", label: "About" }, { href: "/projects/", label: "Projects" },
  { href: "/service-areas/", label: "Service Areas" }, { href: "/resources/", label: "Resources" },
  { href: "/contact/", label: "Contact" }, { href: "/storm-damage/", label: "Storm Damage" }
])}
${group("Roofing services", D.services.filter((s) => s.category === "roofing" && s.status === "active").map((s) => ({ href: svcUrl(s), label: s.name })))}
${group("Exterior services", D.services.filter((s) => s.category === "exterior" && s.status === "active").map((s) => ({ href: svcUrl(s), label: s.name })))}
${group("Projects", D.projects.projects.map((p) => ({ href: `/projects/${p.slug}/`, label: p.title })))}
${group("Counties", D.counties.filter((c) => !c.approvalRequired).map((c) => ({ href: countyUrl(c), label: c.name })))}
${group("Cities", D.cities.filter((c) => !c.approvalRequired).map((c) => ({ href: cityUrl(c), label: c.name })))}
${group("Resources", D.articles.filter((a) => a.status === "published").map((a) => ({ href: `/resources/${a.slug}/`, label: a.title })))}
${group("Legal", [
  { href: "/privacy-policy/", label: "Privacy Policy" }, { href: "/terms-of-use/", label: "Terms of Use" },
  { href: "/accessibility/", label: "Accessibility Statement" }, { href: "/disclaimer/", label: "Website Disclaimer" },
  { href: "/insurance-restoration-disclaimer/", label: "Insurance Restoration Disclaimer" }
])}
</div></section>
${L.closer("aerial-charcoal-roof-replacement")}`;

  return L.page({
    path: "/sitemap/", title: `Sitemap \u2014 All Pages | ${company.brandShort}`,
    description: "A complete index of pages on the Timber Roofing & Exteriors website.",
    pageType: "page", schema: [C.breadcrumbs(crumbs)]
  }, body);
}

module.exports = {
  home, servicePage, serviceHub, stormHub, projectsIndex, projectDetail,
  areasHub, countyPage, cityPage, about, contact, simplePage, notFound,
  resourcesIndex, articlePage, htmlSitemap, svcUrl, cityUrl, countyUrl
};
