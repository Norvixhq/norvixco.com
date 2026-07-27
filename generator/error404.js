/* 404.html — the one page on the site that is not a page.
 *
 * It was previously a bare centred card with a logo and two buttons: no header,
 * no footer, no skip link, and — alone among all 32 documents — no pre-paint
 * theme script, so a dark-mode visitor got a white flash before the stylesheet
 * caught up. That is the worst possible moment to look broken, because the
 * visitor has already hit something broken.
 *
 * It now carries the full shell and, more usefully, real navigation: the six
 * most-used calculators and every topic hub. A 404 that only offers "go home"
 * makes the visitor start their search over; a 404 that offers destinations
 * ends the failure in one click.
 */

const fs = require("fs");
const path = require("path");
const S = require("./shell");
const { SITE, svg, arrow, nav, FOOTER, head, FOOT_SCRIPTS, ORG, WEBSITE, TOPICS } = S;

const ROOT = process.env.MDC_SITE || path.resolve(__dirname, "..", "site");

const POPULAR = [
  ["/calculators/true-cost-to-own/", "gauge", "True Cost to Own", "Every dollar a car costs over five years — not just the payment."],
  ["/calculators/cost-per-mile/", "route", "Cost Per Mile", "What one mile actually costs, all-in."],
  ["/calculators/auto-loan/", "dollar", "Auto Loan", "Payment, total interest and a full amortization schedule."],
  ["/calculators/lease-vs-buy/", "scale", "Lease vs Buy", "The same car, both ways, side by side."],
  ["/calculators/fuel-cost/", "bolt", "Fuel Cost", "Annual and monthly fuel spend at your real mpg."],
  ["/calculators/depreciation/", "trend", "Depreciation", "The biggest cost nobody sends you a bill for."],
];

const TOPIC_ICON = {
  "/fuel-and-ev/": "bolt",
  "/insurance/": "shield",
  "/depreciation/": "trend",
  "/maintenance/": "wrench",
  "/buying-guides/": "bag",
};

function tiles() {
  return POPULAR.map(
    ([href, icon, title, blurb]) =>
      `<a class="card card-hover calc-tile-link" href="${href}">
        <div class="calc-tile">
          <span class="icon-badge">${svg(icon)}</span>
          <h3>${title}</h3>
          <p>${blurb}</p>
          <div class="tile-foot"><span class="pill pill-live">Live</span><span class="go">Open ${arrow(15)}</span></div>
        </div>
      </a>`
  ).join("\n      ");
}

function topicChips() {
  return TOPICS.map(
    ([href, label, desc]) =>
      `<a class="card card-pad-lg category-card" href="${href}" style="text-decoration:none">
        <span class="icon-badge">${svg(TOPIC_ICON[href])}</span>
        <h3 style="margin-top:14px">${label}</h3>
        <p>${desc}.</p>
      </a>`
  ).join("\n      ");
}

const html =
  head({
    title: "Page not found (404) | MyDrivingCost",
    desc: "That page isn't here. Jump straight to a cost calculator, a topic hub, or the MyDrivingCost home page.",
    url: "/404",
    robots: "noindex, follow",
    noCanonical: true,
    schema: { "@context": "https://schema.org", "@graph": [ORG, WEBSITE] },
  }) +
  nav("/404") +
  `
<main id="main">

<section class="section" style="background:var(--grad-hero)">
  <div class="container container-narrow" style="text-align:center">
    <div aria-hidden="true" style="font-family:var(--font-display);font-weight:800;font-size:clamp(3.4rem,11vw,5.5rem);line-height:1;letter-spacing:-.04em;background:linear-gradient(96deg,var(--brand) 0%,var(--brand-light) 46%,var(--accent-decor) 100%);-webkit-background-clip:text;background-clip:text;color:transparent">404</div>
    <h1 style="font-size:var(--fs-h1);margin:14px 0 14px">This road doesn&rsquo;t go anywhere</h1>
    <p class="lead" style="margin-left:auto;margin-right:auto;max-width:52ch">The page you asked for moved, was renamed, or never existed. Nothing is wrong with your car &mdash; only with that link. Here is everything worth clicking instead.</p>
    <div class="hero-cta" style="justify-content:center;margin-top:28px">
      <a class="btn btn-primary btn-lg" href="/calculators/true-cost-to-own/">Calculate your true cost</a>
      <a class="btn btn-secondary btn-lg" href="/">Back to home</a>
    </div>
  </div>
</section>

<section class="section-tight">
  <div class="container">
    <div class="section-head"><span class="eyebrow">Most used</span><h2>Start with a calculator</h2><p>Fifteen tools, all free, all showing their work. These six answer the questions people arrive with most often.</p></div>
    <div class="grid grid-auto">
      ${tiles()}
    </div>
    <p style="margin-top:26px"><a class="btn btn-secondary" href="/calculators/">See all 15 calculators ${arrow(16)}</a></p>
  </div>
</section>

<section class="section-tight bg-subtle">
  <div class="container">
    <div class="section-head"><span class="eyebrow">Browse</span><h2>Or pick a topic</h2><p>Every hub explains the numbers behind the tools &mdash; where they come from, what moves them, and what a realistic figure looks like.</p></div>
    <div class="grid grid-3">
      ${topicChips()}
    </div>
    <p style="margin-top:26px"><a class="btn btn-secondary" href="/guides/">All guides &amp; resources ${arrow(16)}</a></p>
  </div>
</section>

<section class="section-tight">
  <div class="container">
    <div class="cta-band">
      <h2>Did a link on this site send you here?</h2>
      <p>Then it is our bug, not yours, and we would like to fix it. Tell us which page you came from and we will repair the link.</p>
      <a class="btn btn-secondary btn-lg" href="/contact/">Report a broken link</a>
    </div>
  </div>
</section>

</main>
` +
  FOOTER +
  "\n" +
  FOOT_SCRIPTS;

const dest = path.join(ROOT, "404.html");
fs.writeFileSync(dest, html);
console.log("  wrote /404 (served from any unmatched URL) -> 404.html  " + html.length + " bytes");
