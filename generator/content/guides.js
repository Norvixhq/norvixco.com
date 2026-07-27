const P = require("../page");
const { calcTiles, topicCards, bullets, callout } = P;

const body = `
<section class="section-tight">
  <div class="container">
    <div class="section-head"><span class="eyebrow">Topic hubs</span><h2>Five topics, one question</h2><p>Every guide on this site exists to answer the same question from a different angle: what does this vehicle actually cost you per year, and which lever moves that number most?</p></div>
    ${topicCards([
      [
        "/fuel-and-ev/",
        "Fuel &amp; EV",
        "Gasoline, hybrid and electric priced on the same scale — cost per mile — plus the charging realities that decide whether an EV saves you money at all.",
        [["Fuel cost", "/calculators/fuel-cost/"], ["EV charging", "/calculators/ev-charging/"], ["Cost per mile", "/calculators/cost-per-mile/"]],
      ],
      [
        "/insurance/",
        "Insurance",
        "What full coverage actually buys you, what moves a premium, which discounts are real, and when dropping collision is the rational choice.",
        [["Insurance estimator", "/calculators/insurance-estimator/"], ["True cost to own", "/calculators/true-cost-to-own/"]],
      ],
      [
        "/depreciation/",
        "Depreciation",
        "The largest cost of new-car ownership and the one nobody invoices you for. The shape of the curve, what drives it, and how to lose less.",
        [["Depreciation", "/calculators/depreciation/"], ["New vs used", "/calculators/new-vs-used/"]],
      ],
      [
        "/maintenance/",
        "Maintenance &amp; repair",
        "What service really costs as a car ages, how much to reserve monthly, which intervals people get wrong, and whether extended warranties earn their price.",
        [["Maintenance cost", "/calculators/maintenance-cost/"], ["Ten-year cost", "/calculators/ten-year-cost/"]],
      ],
      [
        "/buying-guides/",
        "Buying &amp; financing",
        "Lease versus buy, new versus used, loan terms, negotiation, trade-in timing and the payment trap that costs buyers thousands.",
        [["Auto loan", "/calculators/auto-loan/"], ["Lease vs buy", "/calculators/lease-vs-buy/"], ["Affordability", "/calculators/affordability/"]],
      ],
    ])}
  </div>
</section>

<section class="section-tight bg-subtle">
  <div class="container">
    <div class="section-head"><span class="eyebrow">Tools</span><h2>Calculators</h2><p>Fifteen tools covering every line of a vehicle's ownership cost. Each one is free, requires no account, and shows its assumptions.</p></div>
    ${calcTiles([
      ["/calculators/true-cost-to-own/", "chart", "True Cost to Own", "All six cost categories over five years, with a full visual breakdown.", true],
      ["/calculators/cost-per-mile/", "route", "Cost Per Mile", "Every fixed and variable cost reduced to a single comparable number.", true],
      ["/calculators/lease-vs-buy/", "scale", "Lease vs Buy", "Lease, finance and cash compared on total cost including opportunity cost.", true],
      ["/calculators/fuel-cost/", "gauge", "Fuel Cost", "Annual and five-year gasoline cost from your MPG and local pump price.", true],
      ["/calculators/ev-charging/", "bolt", "EV Charging", "Home, public Level 2 and DC fast charging — including charge losses.", true],
      ["/calculators/auto-loan/", "dollar", "Auto Loan", "Payment, total interest and the amortization schedule behind it.", true],
      ["/calculators/depreciation/", "trend", "Depreciation", "Year-by-year value curve and the real cost of holding the car.", true],
      ["/calculators/", "grid", "All calculators", "The full library, including the tools still in development.", true],
    ])}
  </div>
</section>

<section class="section-tight">
  <div class="container container-narrow prose">
    <h2>How to use this site</h2>
    <p>Most people arrive with a specific question — <em>should I lease or buy?</em>, <em>is an EV cheaper?</em>, <em>can I afford this?</em> — and those questions all resolve to the same underlying calculation. Here's the order that works.</p>
    ${bullets([
      "<strong>Start with True Cost to Own.</strong> Put in the vehicle you're actually considering and see the five-year total. It reframes everything that follows.",
      "<strong>Then attack the biggest bar in the chart.</strong> For most new vehicles that's depreciation, which means the highest-leverage change is buying a two-to-four-year-old car rather than optimizing anything else.",
      "<strong>Use the topic hubs to understand the levers</strong> behind each cost, then come back and re-run the numbers with better assumptions.",
      "<strong>Compare two specific vehicles, not categories.</strong> \"SUVs cost more than sedans\" is nearly useless. \"This SUV costs $3,100 a year more than that sedan\" is a decision.",
      "<strong>Share the link.</strong> Every calculator encodes its inputs in the URL, so you can send a scenario to a partner or a spreadsheet and it opens exactly as you left it.",
    ])}

    ${callout(
      "Where our numbers come from",
      `<p style="margin:0">Default assumptions are drawn from published, citable sources — AAA's <em>Your Driving Costs</em> for ownership averages, the US Energy Information Administration for fuel prices, published network rate cards for charging, and industry rate studies for insurance. Every one of them is an editable field, because a national average is a starting point, not a description of your situation. Read the full <a href="/methodology/">methodology</a> for how each model is built.</p>`
    )}

    <h2>About the numbers on this site</h2>
    <p>Three principles govern everything published here. <strong>Every assumption is visible and editable</strong> — nothing is hidden inside a black box, and if you disagree with a default, change it. <strong>Every figure is sourced</strong> — each hub page carries a sources block naming exactly where its reference numbers came from. And <strong>nothing here is a quote</strong> — these are models built from national data, and your real costs depend on your vehicle, ZIP code, credit, driving pattern and luck.</p>
    <p>We don't sell cars, we don't broker loans, and we don't take a commission on insurance policies. That's deliberate: a calculator whose owner profits from one of the answers isn't a calculator. Read our <a href="/editorial-standards/">editorial standards</a> if you want the full version.</p>
  </div>
</section>

<section class="section-tight bg-subtle">
  <div class="container">
    <div class="section-head"><span class="eyebrow">Reference</span><h2>Company &amp; policies</h2></div>
    ${topicCards([
      ["/about/", "About MyDrivingCost", "Why this site exists, who it's for, and what we're building next.", [["About", "/about/"], ["Contact", "/contact/"]]],
      ["/methodology/", "Methodology", "How each model works, which formulas are used and where every default assumption comes from.", [["Methodology", "/methodology/"], ["FAQ", "/faq/"]]],
      ["/editorial-standards/", "Editorial standards", "How content is researched, reviewed and corrected — and how we make money without selling you anything.", [["Standards", "/editorial-standards/"], ["Disclaimer", "/disclaimer/"]]],
    ])}
  </div>
</section>
`;

module.exports = {
  url: "/guides/",
  title: "Car Ownership Cost Guides & Calculators | MyDrivingCost",
  desc:
    "Every guide and calculator on MyDrivingCost: fuel and EV costs, insurance, depreciation, maintenance and car buying, with the tools that price each one.",
  eyebrow: "All guides &amp; resources",
  h1: "Guides &amp; resources",
  h1short: "Guides",
  lead:
    "Everything on MyDrivingCost in one place: five topic hubs covering the major costs of vehicle ownership, the calculators that quantify them, and the methodology behind every number.",
  crumb: [],
  heroCta: [
    ["Start with True Cost to Own", "/calculators/true-cost-to-own/", "btn-primary"],
    ["Browse all calculators", "/calculators/", "btn-ghost"],
  ],
  body,
  faqTitle: "About this site",
  faq: [
    [
      "Are the calculators free?",
      "Yes, entirely. No account, no email address, no paywall and no trial. Every tool runs in your browser, and the inputs you type never leave your device — the calculations happen locally rather than on a server.",
    ],
    [
      "Where do the default numbers come from?",
      "Published, citable sources: AAA's Your Driving Costs research for ownership averages, the US Energy Information Administration for fuel prices, published charging-network rate cards, and industry rate studies for insurance. Each hub page lists its own sources. Every default is an editable field, because a national average describes nobody in particular.",
    ],
    [
      "How accurate are the results?",
      "They're as accurate as the assumptions you give them, which is the honest answer for any ownership-cost model. Depreciation in particular is a forecast, not a measurement — nobody can tell you precisely what a specific vehicle will be worth in five years. Treat the outputs as well-grounded planning estimates and as a way to compare options against each other, which is where they're most reliable.",
    ],
    [
      "Do you sell cars, loans or insurance?",
      "No. We don't sell vehicles, broker financing or take commission on insurance policies. That independence is the point — a calculator whose owner profits from one particular answer isn't really a calculator. Our editorial standards page explains how the site is funded.",
    ],
    [
      "Can I save or share a calculation?",
      "Yes. Every calculator encodes its inputs in the page URL, so copying the link from your address bar — or using the share button — captures your exact scenario. Send it to a partner, save it in a note, or come back to it later and it opens exactly as you left it. Each tool also has a print view that produces a clean one-page summary.",
    ],
    [
      "Which calculator should I start with?",
      "True Cost to Own, almost always. It's the only tool that shows all six cost categories at once, which is what reveals where your money is actually going — usually depreciation rather than the fuel bill people worry about. Once you can see the biggest bar in the chart, you know which of the more specific calculators is worth your time.",
    ],
  ],
  cta: {
    h2: "Know the real cost before you drive",
    p: "Start with the full picture. Two minutes of inputs, six cost categories, five years of ownership — all in one chart.",
    btn: ["Open True Cost to Own", "/calculators/true-cost-to-own/"],
  },
};
