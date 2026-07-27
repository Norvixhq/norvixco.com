const P = require("../page");
const { table, callout, bullets, calcTiles, topicCards, sources, SITE, cite } = P;

const body = `
<section class="section-tight">
  <div class="container container-narrow prose">

    <h2>The monthly payment is the wrong number</h2>
    <p>Walk onto any forecourt in America and the conversation converges on one figure. It is on the window sticker, in the radio advertisement, in the finance manager's opening question and on the form you sign. <em>What do you want your payment to be?</em></p>
    <p>It is a brilliant question, and it is brilliant because it is answerable. Most people have a rough idea of what they can absorb each month. The trouble is that the monthly payment is not the cost of the car. It is the cost of the borrowing, and only for as long as the borrowing lasts.</p>
    <p>On our published benchmark — a $34,000 SUV, $3,400 down, 7.2% over sixty months, driven 12,000 miles a year — the payment is <strong>$670.09 a month</strong>. The true cost of running that vehicle is about <strong>$982 a month</strong>. The payment is 68% of the cost. Close to a third of what the car takes from you never appears on the finance agreement at all &mdash; and the payment stops after sixty months while the rest of it does not.</p>

    ${callout(
      "Where the missing $312 a month goes",
      `<p style="margin:0 0 10px">Depreciation, insurance, fuel, maintenance, tax and registration. None of them is billed by the dealer. Depreciation, the largest of the six at $19,801 over five years, is never billed by anybody — you meet it once, years later, in a trade-in offer that is lower than you expected. By then the decision is long made and the money is long gone.</p>
      <p style="margin:0">The full reconciliation of all six categories is published on the <a href="/methodology/">methodology page</a>, with the formulas, so you can check it rather than take it from us.</p>`
    )}

    <p>This is not a conspiracy. It is a structure. The retail motor industry is organized around monthly payments because monthly payments are what people can be sold, and an industry organized around a number will keep producing that number no matter how much it hides. Longer loan terms make it smaller. Leases make it smaller still. Add-ons vanish inside it. Two vehicles with identical payments can differ by thousands of dollars a year once you count how fast each loses value, what each costs to insure and what each drinks.</p>
    <p>Nobody in that conversation is obliged to tell you this. So somebody outside it should.</p>

    <h2>Why this site exists</h2>
    <p>MyDrivingCost.com exists to publish the other number — the whole one — for free, without an email gate, and with every assumption visible and editable.</p>
    <p>Not because total cost of ownership is a novel concept. Fleet managers have modeled it for decades; it is standard practice when a company buys two hundred vans. It is simply that ordinary buyers have never had the same tooling, and the tools that do exist tend to be attached to somebody who wants to sell them something. A calculator that ends in a lead form is not a calculator. It is a questionnaire with arithmetic on the front.</p>
    <p>Our mission fits on one line, and it is on every page of this site: <strong>Know the Real Cost Before You Drive.</strong></p>

    <h2>What we do</h2>

    ${bullets([
      "<strong>Model all six costs, every time.</strong> Depreciation, insurance, fuel or electricity, maintenance and repairs, finance interest, and taxes and fees. No seventh category hiding behind a footnote, and no category quietly omitted because it makes a total look worse.",
      "<strong>Show the arithmetic.</strong> The <a href=\"/methodology/\">methodology page</a> publishes every default assumption, both formulas, every source and the model's known limitations. You can rebuild our benchmark in a spreadsheet in twenty minutes.",
      "<strong>Let you change everything.</strong> Every input on every calculator is editable. Our national defaults are a starting point, and replacing four of them with your own numbers improves the answer more than any refinement we could make.",
      "<strong>Give you the number instantly.</strong> No account, no sign-in, no email address, no gated result. The calculators run in your browser; your inputs never reach us. See the <a href=\"/privacy/\">privacy policy</a>.",
      "<strong>Explain what the number means.</strong> Every calculator sits alongside guides on <a href=\"/depreciation/\">depreciation</a>, <a href=\"/insurance/\">insurance</a>, <a href=\"/fuel-and-ev/\">fuel and EVs</a>, <a href=\"/maintenance/\">maintenance</a> and <a href=\"/buying-guides/\">buying decisions</a>, because a figure without an explanation is just a claim.",
      "<strong>Publish what we do not know.</strong> The limitations section of our methodology is the part we are most careful about. A model that hides its failure modes is asking to be trusted on faith.",
    ])}

    <h2>What we do not do</h2>
    <p>Equally important, and shorter.</p>

    ${table(
      ["We don't", "Which means"],
      [
        ["<strong>Sell cars</strong>", "No vehicle can be made to look cheaper or dearer than the data says it is"],
        ["<strong>Broker loans or insurance</strong>", "No lender or carrier can buy a default rate, a premium or a placement"],
        ["<strong>Generate leads</strong>", "Using a calculator will never produce a phone call. There is no mechanism by which it could"],
        ["<strong>Collect your data</strong>", "Your inputs are computed in your browser and never transmitted to us"],
        ["<strong>Take manufacturer sponsorship</strong>", "No carmaker has paid for, reviewed or influenced any figure here"],
        ["<strong>Accept paid placement</strong>", "Not in any calculator, comparison or ranking, at any price"],
      ]
    )}

    <p>If advertising or affiliate relationships are ever introduced to fund the site, three rules will apply and we have published them in advance so they can be held against us: disclosure on the page where the relationship appears, never any influence on a calculated result, and no editorial approval rights for any partner. The full position is on the <a href="/editorial-standards/">editorial standards</a> page.</p>

    <h2>What makes this different from a dealer's calculator</h2>
    <p>Both tools take a price and produce a number. That is where the resemblance ends.</p>

    ${table(
      ["", "A dealer's calculator", "MyDrivingCost.com"],
      [
        ["<strong>The question it answers</strong>", "What will the payment be?", "What will the car cost?"],
        ["<strong>Costs included</strong>", "Principal and interest", "Depreciation, insurance, fuel, maintenance, interest, taxes and fees"],
        ["<strong>Depreciation</strong>", "Not shown", "The largest line, shown first"],
        ["<strong>Assumptions</strong>", "Usually hidden", "Published in full and individually editable"],
        ["<strong>What happens to your inputs</strong>", "Often a lead form", "Computed in your browser; never transmitted"],
        ["<strong>Who benefits from the answer</strong>", "The seller", "You"],
        ["<strong>Direction of error</strong>", "Toward affordability", "Toward whatever the data says"],
      ]
    )}

    <p>The point is not that dealers are dishonest. Most are not. It is that a tool built by a seller answers the seller's question, and the seller's question is how to get you to yes. Ours answers a different one, and occasionally the honest answer is that the car is more expensive than you thought — which is exactly the answer that is worth having before you sign rather than after.</p>

    <h2>Where the numbers come from</h2>
    <p>Our defaults are drawn from published national datasets, cited by name and year on the page that uses them: AAA's <em>Your Driving Costs</em> for total ownership benchmarks, EPA ratings for fuel economy, US Energy Information Administration data for energy prices, and published national insurance rate studies. Observed used-market retention underpins the depreciation curve.</p>
    <p>Where credible sources disagree, we publish the disagreement rather than resolving it quietly. Full-coverage insurance was reported at $2,237 a year by Insurify in July 2026 and $2,578 by Insurance.com for 2026. Our default sits between them at $2,496, and we say why. Picking the lower figure would make ownership look cheaper. Picking the higher would make our totals look more authoritative. Neither is a reason.</p>

    <div class="grid grid-4" style="margin:24px 0 8px;gap:16px">
      <div class="stat-tile"><div class="k">Benchmark 5-year cost</div><div class="v">$58,928</div><div class="d">$34,000 SUV, 12,000 mi/yr</div></div>
      <div class="stat-tile"><div class="k">True cost per mile</div><div class="v">$0.98</div><div class="d">across 60,000 miles</div></div>
      <div class="stat-tile"><div class="k">Monthly payment</div><div class="v">$670</div><div class="d">what the dealer quotes</div></div>
      <div class="stat-tile"><div class="k">Monthly true cost</div><div class="v">$982</div><div class="d">what it actually costs</div></div>
    </div>

    <h2>Editorial independence</h2>
    <p>Independence is easy to claim, so here is what makes ours checkable rather than merely asserted: the whole model is published. Every default, every formula, every source, every limitation. A reader can reconstruct our benchmark and confirm that $19,801 of depreciation, $12,480 of insurance, $8,000 of fuel, $7,941 of maintenance, $6,525 of interest and $4,180 of taxes and fees really do come to $58,928.</p>
    <p>A model you can reproduce is a model that cannot be quietly biased. That is the point of publishing it.</p>
    <p>We also publish inconvenient results. Long loan terms come off badly in our guides. Extended warranties and dealer add-ons come off badly. Electric vehicles come off well on running cost and less well on depreciation and insurance. Pickups hold value far better than the enthusiast conventional wisdom about luxury sedans would suggest. None of these conclusions is negotiable by anyone with a checkbook, because there is nobody here to write the check to.</p>
    <p>And when we are wrong, we say so. Verified factual errors are corrected within days, every page repeating the figure is updated in the same pass, and the correction is noted rather than quietly patched. The policy is on the <a href="/editorial-standards/">editorial standards</a> page and corrections go to <a href="/contact/">the contact page</a>.</p>

    <h2>Where to start</h2>
    <p>There are fifteen calculators. You do not need all of them, and which one you need depends on the decision in front of you.</p>

    ${table(
      ["If you are…", "Start with", "Then read"],
      [
        ["Choosing between two specific cars", "<a href=\"/calculators/true-cost-to-own/\">True Cost to Own</a>", "<a href=\"/depreciation/\">Depreciation</a> — usually the deciding line"],
        ["Working out what you can carry", "<a href=\"/calculators/affordability/\">Affordability</a>", "<a href=\"/calculators/monthly-budget/\">Transportation budget</a>"],
        ["Deciding whether to lease or buy", "<a href=\"/calculators/lease-vs-buy/\">Lease vs Buy</a>", "<a href=\"/buying-guides/\">Buying guides</a>"],
        ["Weighing new against used", "<a href=\"/calculators/new-vs-used/\">New vs Used</a>", "<a href=\"/depreciation/\">Depreciation</a>"],
        ["Considering an electric vehicle", "<a href=\"/calculators/ev-charging/\">EV Charging</a>", "<a href=\"/fuel-and-ev/\">Fuel &amp; EV</a>"],
        ["Wondering whether to keep your current car", "<a href=\"/calculators/ten-year-cost/\">Ten-Year Cost</a>", "<a href=\"/maintenance/\">Maintenance</a>"],
        ["Comparing finance offers", "<a href=\"/calculators/auto-loan/\">Auto Loan</a>", "<a href=\"/methodology/\">The amortization formula</a>"],
        ["Just curious what your driving costs", "<a href=\"/calculators/cost-per-mile/\">Cost Per Mile</a>", "<a href=\"/guides/\">All guides</a>"],
      ]
    )}

    <p>Whichever you open, do one thing before you trust the output: replace four defaults with your own figures. Your annual mileage — the difference between two odometer readings, not a guess. Your actual insurance premium, which is on your renewal notice. Your local fuel or electricity price. And the APR and term on the offer actually in front of you. Those four carry most of the variance in any result this site can produce.</p>

    <h2>Where we are headed</h2>
    <p>The toolbox now covers the ownership lifecycle: purchase, financing, running costs, maintenance, depreciation and disposal, for gas, hybrid and electric vehicles. The architecture was built from the outset to extend beyond cars, because the arithmetic of ownership does not care what the asset is.</p>

    <div class="grid grid-3" style="margin:20px 0 8px;gap:16px">
      <div class="card card-pad-lg"><strong>Now</strong><p class="text-muted" style="font-size:.92rem;margin-top:6px">Cars, SUVs and trucks — gas, hybrid and electric. Fifteen calculators and the guides behind them.</p></div>
      <div class="card card-pad-lg"><strong>Next</strong><p class="text-muted" style="font-size:.92rem;margin-top:6px">Deeper regional data, motorcycles, and vehicle-specific depreciation curves rather than segment averages.</p></div>
      <div class="card card-pad-lg"><strong>Later</strong><p class="text-muted" style="font-size:.92rem;margin-top:6px">RVs, boats and small commercial fleets — the same six categories, different assets.</p></div>
    </div>

    <p>What will not change is the shape of the thing: free, no account, every assumption published, every input editable, and nothing for sale in any calculator.</p>

    <h2>Get in touch</h2>
    <p>We read everything. Corrections, data sources, calculators you wish existed, and results that looked wrong even when the arithmetic turned out to be right — an answer that is correct and unbelievable is a failure of presentation on our side, and we would like to know about it.</p>
    <p>General questions go to <a href="mailto:hello@mydrivingcost.com">hello@mydrivingcost.com</a>. Corrections, which are prioritized above everything else, go to <a href="mailto:corrections@mydrivingcost.com">corrections@mydrivingcost.com</a>. Press and research inquiries go to <a href="mailto:press@mydrivingcost.com">press@mydrivingcost.com</a>. The <a href="/contact/">contact page</a> sets out what to include in each so the reply is worth waiting for, and the <a href="/faq/">FAQ</a> answers most of what arrives.</p>

    ${sources([
      'Benchmark case: a $34,000 SUV, $3,400 down, 7.2% APR over 60 months, driven 12,000 miles a year for five years \u2014 $58,928 total cost, $0.98 per mile, $11,786 a year, $14,199 residual. Full reconciliation on the <a href="/methodology/">methodology page</a>.',
      cite("AAA_YDC_2025", "$11,577 per year and approximately 77¢ per mile at 15,000 miles annually."),
      cite("INSURIFY_AVG", "National full-coverage average of $2,237 a year as of July 2026."),
      cite("INSURANCECOM_AVG", "National full-coverage average of $2,578 a year, ranging from $1,660 in Vermont to $3,999 in Louisiana."),
      cite("VP_SOAI", "A third study at $2,496 a year, which is where our default sits."),
      cite("EPA_FE", "Fuel-economy ratings underpinning our efficiency defaults."),
      cite("EIA_GAS", "Energy pricing underpinning our fuel-cost defaults."),
    ])}

  </div>
</section>

<section class="section-tight bg-subtle">
  <div class="container">
    <div class="section-head"><span class="eyebrow">Start here</span><h2>The four tools most people need first</h2><p>Free, instant, and none of them ask for an email address.</p></div>
    ${calcTiles([
      ["/calculators/true-cost-to-own/", "chart", "True Cost to Own", "All six cost categories over your ownership period, with the full breakdown.", true],
      ["/calculators/cost-per-mile/", "route", "Cost Per Mile", "One number you can compare against anything — including not driving at all.", true],
      ["/calculators/depreciation/", "trend", "Depreciation", "The largest cost of new-car ownership, projected year by year.", true],
      ["/calculators/", "grid", "All calculators", "Fifteen tools across fuel, EVs, loans, leases, trade-ins and budgets.", true],
    ])}
  </div>
</section>

<section class="section-tight">
  <div class="container">
    <div class="section-head"><span class="eyebrow">Check us</span><h2>The pages that let you audit this site</h2><p>None of what is claimed above requires taking our word for it.</p></div>
    ${topicCards([
      [
        "/methodology/",
        "Methodology",
        "Every assumption, both formulas, all sources, the benchmark reconciled line by line, and the model's known limitations in full.",
        [["Assumptions", "/methodology/"], ["Limitations", "/methodology/"]],
      ],
      [
        "/editorial-standards/",
        "Editorial standards",
        "How figures are sourced and checked, how the site is funded, what that funding cannot buy, and the corrections policy.",
        [["Independence", "/editorial-standards/"], ["Corrections", "/contact/"]],
      ],
      [
        "/faq/",
        "Site FAQ",
        "Cost, accounts, data, accuracy, citation rights, sharing calculations, mobile support and API access. Eighteen questions.",
        [["Read the FAQ", "/faq/"], ["Privacy", "/privacy/"]],
      ],
    ])}
  </div>
</section>
`;

module.exports = {
  url: "/about/",
  title: "About MyDrivingCost — Who We Are, How We Work",
  desc:
    "Why MyDrivingCost exists: the monthly payment is not the cost of a car. Our mission, our six-category cost model, our independence, and where to start.",
  eyebrow: "About us",
  h1: "The monthly payment is not the cost of the car",
  h1short: "About",
  lead:
    "An entire retail industry is organized around one number, and it is the wrong one. MyDrivingCost.com publishes the other number — the whole one — free, ungated, and with every assumption open to inspection.",
  crumb: [],
  heroStats: [
    ["Benchmark payment", "$670/mo", "what the dealer quotes"],
    ["Benchmark true cost", "$982/mo", "what it actually costs"],
    ["Cost categories modeled", "Six", "depreciation first, not last"],
    ["Price to use", "Free", "no account, no email gate"],
  ],
  heroCta: [
    ["See your real number", "/calculators/true-cost-to-own/", "btn-primary"],
    ["How we calculate it", "/methodology/", "btn-ghost"],
  ],
  body,
  faqTitle: "About this site",
  faq: [
    [
      "Who is behind MyDrivingCost.com?",
      "An independent editorial team with backgrounds in consumer finance writing, data analysis and automotive cost research. We are not a dealer group, a manufacturer, a lender, an insurer, a broker or a comparison marketplace, and we are not owned by any of them. That independence is structural rather than aspirational: there is no commercial relationship through which a number on this site could be nudged, because there is nobody to nudge it for.",
    ],
    [
      "Is the site really free, with no catch?",
      "Yes. No subscription, no paywall, no premium tier and no email gate on any result. There is currently no advertising and no affiliate marketing either. The calculators run in your browser, so your inputs never reach us and there is no data to monetize. If advertising or affiliate relationships are ever introduced, they will be disclosed on the page where they appear and will never alter a calculated result — a commitment published in advance on the editorial standards page.",
    ],
    [
      "Why do you say the monthly payment is the wrong number?",
      "Because it measures the borrowing, not the car. On our benchmark — a $34,000 SUV financed over sixty months — the payment is $670.09 a month while the true running cost is about $982. The missing $312 is depreciation, insurance, fuel, maintenance, tax and registration, none of which appears on a finance agreement. Two cars with identical payments can differ by thousands a year once those six categories are counted.",
    ],
    [
      "How is this different from a dealer's payment calculator?",
      "A dealer's calculator answers the seller's question: what will the payment be? Ours answers yours: what will the car cost? Theirs typically includes principal and interest and stops there, hides its assumptions, and often ends in a lead form. Ours models six cost categories, publishes every assumption and formula, makes each one editable, and never transmits your inputs anywhere. Occasionally our answer is that the car is dearer than you thought, which is the point.",
    ],
    [
      "Which calculator should I open first?",
      "True Cost to Own, in almost every case. It produces the figure the rest of the site argues for — the total cost of a specific vehicle across all six categories — and every other tool examines one line of that total in more depth. If you already own the car, Cost Per Mile gives you a single comparable number. If the question is what you can carry rather than what to buy, start with Affordability.",
    ],
    [
      "How do I know your numbers are not biased?",
      "Because you can check them. The entire model is published on the methodology page: every default, both formulas, all sources and the known limitations. Rebuild the benchmark in a spreadsheet and confirm that $19,801 of depreciation, $12,480 of insurance, $8,000 of fuel, $7,941 of maintenance, $6,525 of interest and $4,180 of taxes and fees add to $58,928. A model you can reproduce is a model that cannot be quietly biased.",
    ],
    [
      "Will you tell me which car to buy?",
      "No, and we would be worse at it than you are — you know your circumstances and we do not. What we can do is give you a model that compares your shortlist under identical assumptions, which is the part most buyers never get. Run each candidate through True Cost to Own with the same mileage and hold period, look at which cost category dominates, and the comparison usually makes itself.",
    ],
  ],
  cta: {
    h2: "Know the real cost before you drive",
    p: "Two minutes, no signup, no email address. The full five-year cost of a specific vehicle and your true cost per mile.",
    btn: ["Open True Cost to Own", "/calculators/true-cost-to-own/"],
  },
  schemaExtra: [
    {
      "@type": "AboutPage",
      "@id": SITE + "/about/#aboutpage",
      name: "About MyDrivingCost.com",
      description:
        "The mission, model and editorial independence position of MyDrivingCost.com.",
      inLanguage: "en",
      dateModified: "2026-07-23",
      isPartOf: { "@id": SITE + "/#website" },
      mainEntity: { "@id": SITE + "/#org" },
    },
    {
      "@type": "Organization",
      "@id": SITE + "/#org",
      name: "MyDrivingCost.com",
      alternateName: "MyDrivingCost",
      url: SITE + "/",
      logo: SITE + "/assets/img/logo.png",
      slogan: "Know the Real Cost Before You Drive",
      description:
        "An independent publisher of vehicle cost-of-ownership calculators and guides, covering depreciation, insurance, fuel, maintenance, financing and taxes.",
      email: "hello@mydrivingcost.com",
      publishingPrinciples: SITE + "/methodology/",
      ethicsPolicy: SITE + "/editorial-standards/",
      knowsAbout: [
        "Total cost of vehicle ownership",
        "Vehicle depreciation",
        "Auto insurance costs",
        "Auto loan financing",
        "Fuel and EV charging costs",
        "Vehicle maintenance costs",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "hello@mydrivingcost.com",
        availableLanguage: "English",
        areaServed: "US",
      },
    },
  ],
};
