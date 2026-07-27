const P = require("../page");
const { table, callout, bullets, calcTiles, topicCards, sources, SITE, cite } = P;

/* ------------------------------------------------------------------ data --- */

const CALCS = [
  ["/calculators/true-cost-to-own/", "True Cost to Own"],
  ["/calculators/cost-per-mile/", "Cost Per Mile"],
  ["/calculators/ten-year-cost/", "Ten-Year Cost"],
  ["/calculators/depreciation/", "Depreciation"],
  ["/calculators/auto-loan/", "Auto Loan"],
  ["/calculators/affordability/", "Vehicle Affordability"],
  ["/calculators/new-vs-used/", "New vs Used"],
  ["/calculators/lease-vs-buy/", "Lease vs Buy"],
  ["/calculators/trade-in-value/", "Trade-In vs Private Sale"],
  ["/calculators/fuel-cost/", "Fuel Cost"],
  ["/calculators/ev-charging/", "EV Charging"],
  ["/calculators/insurance-estimator/", "Insurance Estimator"],
  ["/calculators/maintenance-cost/", "Maintenance Cost"],
  ["/calculators/monthly-budget/", "Monthly Transportation Budget"],
  ["/calculators/road-trip/", "Road Trip Cost"],
];

/* ------------------------------------------------------------------ body --- */

const body = `
<section class="section-tight">
  <div class="container container-narrow prose">

    <h2>Start with the question, not the tool</h2>
    <p>Fifteen calculators is a lot of doors into the same building. Every one of them is measuring the same thing from a different angle — what a vehicle takes out of your bank account, and when. The fastest way in is to find the sentence below that sounds most like the thing you are actually trying to decide, and open the tool next to it.</p>
    <p>If nothing matches, open <a href="/calculators/true-cost-to-own/">True Cost to Own</a>. It is the flagship for a reason: it models all six cost categories over a five-year hold and shows you which one is largest. For most drivers that single chart reframes the problem, because the biggest bar is almost never the one they were worrying about.</p>

    ${table(
      ["Your question", "Use this", "Why this one"],
      [
        [
          "Can I afford this car?",
          '<a href="/calculators/affordability/">Vehicle Affordability</a>',
          "Works backwards from your income and existing commitments to a purchase price, counting insurance, fuel and maintenance rather than just the payment a lender will approve.",
        ],
        [
          "What will this car actually cost me?",
          '<a href="/calculators/true-cost-to-own/">True Cost to Own</a>',
          "The complete five-year picture: depreciation, financing, insurance, fuel, maintenance, taxes and fees, with the breakdown that shows where the money went.",
        ],
        [
          "Should I keep my car or replace it?",
          '<a href="/calculators/ten-year-cost/">Ten-Year Cost</a>',
          "Extends the model to a decade and plots the cumulative average, which is what falls while you keep a car and resets when you replace it.",
        ],
        [
          "Which of these two cars is cheaper to run?",
          '<a href="/calculators/cost-per-mile/">Cost Per Mile</a>',
          "Reduces two very different vehicles to one comparable number, so a cheap car you drive constantly can be measured against an expensive one you barely use.",
        ],
        [
          "Is the EV really cheaper?",
          '<a href="/calculators/ev-charging/">EV Charging</a>',
          'Prices home, public Level 2 and DC fast charging separately, including charging losses. Run <a href="/calculators/fuel-cost/">Fuel Cost</a> alongside it for the gasoline comparison.',
        ],
        [
          "Am I overspending on transport?",
          '<a href="/calculators/monthly-budget/">Monthly Transportation Budget</a>',
          "Puts every transport line — payments, insurance, fuel, parking, tolls, transit — against your take-home pay and shows the share it consumes.",
        ],
        [
          "Lease it or finance it?",
          '<a href="/calculators/lease-vs-buy/">Lease vs Buy</a>',
          "Compares leasing, financing and paying cash across an identical term, including the opportunity cost of the money you tie up in a down payment.",
        ],
        [
          "New, or three years old?",
          '<a href="/calculators/new-vs-used/">New vs Used</a>',
          "Sets the used car's lower depreciation against its higher repair risk and interest rate, which is the trade nobody quantifies before they buy.",
        ],
        [
          "What is this loan really costing me?",
          '<a href="/calculators/auto-loan/">Auto Loan</a>',
          "Payment, total interest and the full amortization schedule — including how long a long term keeps you underwater on the vehicle.",
        ],
        [
          "What will it be worth when I sell?",
          '<a href="/calculators/depreciation/">Depreciation</a>',
          "Projects the value curve year by year and marks the point where the steep early loss flattens out.",
        ],
        [
          "Trade in, or sell it myself?",
          '<a href="/calculators/trade-in-value/">Trade-In vs Private Sale</a>',
          "Prices the convenience of a trade-in against the private-sale premium, net of the sales-tax credit that trading in earns you in most states.",
        ],
        [
          "How much should I set aside for repairs?",
          '<a href="/calculators/maintenance-cost/">Maintenance Cost</a>',
          "Turns a lumpy, unpredictable expense into a monthly reserve figure, weighted by vehicle age and mileage rather than a flat average.",
        ],
        [
          "Is my insurance premium out of line?",
          '<a href="/calculators/insurance-estimator/">Insurance Estimator</a>',
          "Gives you a defensible ballpark from vehicle type, driver profile and coverage level, so you know whether your renewal is the market or just your carrier.",
        ],
        [
          "What is fuel costing me a year?",
          '<a href="/calculators/fuel-cost/">Fuel Cost</a>',
          "Annual and five-year spend from your combined MPG, your local pump price and the miles you genuinely drive.",
        ],
        [
          "What will this trip cost?",
          '<a href="/calculators/road-trip/">Road Trip Cost</a>',
          "Fuel or charging plus the wear the miles cause, split across the people in the car.",
        ],
      ]
    )}

    ${callout(
      "A sensible order for a car purchase",
      `<p style="margin:0">Affordability first, to set the ceiling. True Cost to Own second, on two or three specific vehicles, to see which is genuinely cheaper rather than which is cheaper to buy. Auto Loan third, once you know the price, to test what a shorter term does to total interest. Insurance Estimator before you sign anything — a real quote on the exact model occasionally changes the decision on its own.</p>`
    )}

  </div>
</section>

<section class="section-tight bg-subtle">
  <div class="container">
    <div class="section-head"><span class="eyebrow">Group one</span><h2>Total cost of ownership</h2><p>The whole-picture tools. Each one adds up depreciation, financing, insurance, fuel, maintenance, taxes and fees, then presents the total on a different axis: a five-year sum, a per-mile rate, a ten-year curve, or the value you lose without ever being billed for it. Start here if you are choosing between vehicles rather than working on one you already own.</p></div>
    ${calcTiles([
      ["/calculators/true-cost-to-own/", "chart", "True Cost to Own", "All six cost categories over five years, with a category breakdown and a depreciation curve. The flagship.", true],
      ["/calculators/cost-per-mile/", "gauge", "Cost Per Mile", "Every fixed and variable cost reduced to one comparable number — the fairest way to compare two unlike vehicles.", true],
      ["/calculators/ten-year-cost/", "clock", "Ten-Year Cost", "The long horizon, with the cumulative average that shows exactly when keeping a car starts paying you back.", true],
      ["/calculators/depreciation/", "trend", "Depreciation", "Projected resale value year by year, and the cliff most owners never see coming until they trade in.", true],
    ])}
  </div>
</section>

<section class="section-tight">
  <div class="container">
    <div class="section-head"><span class="eyebrow">Group two</span><h2>Buying and financing</h2><p>The decisions made in an hour that you then live with for years. These five tools quantify the trades a showroom is not set up to explain: what a longer term costs in interest, what the used car saves in depreciation and risks in repairs, what a lease really buys, and whether the dealer's trade-in offer beats the effort of selling privately.</p></div>
    ${calcTiles([
      ["/calculators/auto-loan/", "dollar", "Auto Loan", "Payment, total interest and the full amortization schedule for any price, rate and term.", true],
      ["/calculators/affordability/", "cart", "Vehicle Affordability", "Work backwards from your income to a price you can genuinely carry, all-in rather than payment-only.", true],
      ["/calculators/new-vs-used/", "bars", "New vs Used", "Lower depreciation against higher repair risk and rate — the trade priced out properly.", true],
      ["/calculators/lease-vs-buy/", "scale", "Lease vs Buy", "Lease, finance and cash compared over an identical term, including opportunity cost.", true],
      ["/calculators/trade-in-value/", "bag", "Trade-In vs Private Sale", "The private-sale premium against the trade-in's convenience and sales-tax credit.", true],
    ])}
  </div>
</section>

<section class="section-tight bg-subtle">
  <div class="container">
    <div class="section-head"><span class="eyebrow">Group three</span><h2>Running costs</h2><p>The bills that arrive whether or not you were planning for them. Fuel and charging are the costs drivers watch most closely and rarely the largest; insurance and maintenance are the two that respond best to an afternoon of attention. Model them individually here, then feed your own figures back into True Cost to Own for a total you actually believe.</p></div>
    ${calcTiles([
      ["/calculators/fuel-cost/", "car", "Fuel Cost", "Annual and five-year gasoline spend from your combined MPG, local price and real annual mileage.", true],
      ["/calculators/ev-charging/", "bolt", "EV Charging", "Home, public Level 2 and DC fast charging priced separately — charging losses included.", true],
      ["/calculators/insurance-estimator/", "shield", "Insurance Estimator", "A defensible premium ballpark from vehicle, driver profile and coverage level.", true],
      ["/calculators/maintenance-cost/", "wrench", "Maintenance Cost", "Service and repair costs by age and mileage, converted into a monthly reserve.", true],
    ])}
  </div>
</section>

<section class="section-tight">
  <div class="container">
    <div class="section-head"><span class="eyebrow">Group four</span><h2>Budgeting and journeys</h2><p>Two tools that start from your life rather than from a vehicle. One asks what your entire transport habit costs each month against what you earn; the other prices a specific journey before you commit to it. Both are useful precisely because they ignore the sticker price and look at what you do.</p></div>
    ${calcTiles([
      ["/calculators/monthly-budget/", "layers", "Monthly Transportation Budget", "Every transport line against your take-home pay, and the share of income it consumes.", true],
      ["/calculators/road-trip/", "route", "Road Trip Cost", "Fuel or charging plus the wear the miles cause, split across everyone in the car.", true],
    ])}
  </div>
</section>

<section class="section-tight bg-subtle">
  <div class="container container-narrow prose">

    <h2>What makes these different</h2>
    <p>There is no shortage of car calculators on the internet. Most of them are lead-generation forms wearing a calculator's clothes: three inputs, one output, and a button that hands your email address to a lender. These are built on a different premise, and the differences are structural rather than cosmetic.</p>

    <h3>They model the whole cost, not the payment</h3>
    <p>A monthly payment is a financing artefact. It tells you what a lender needs from you each month; it tells you nothing about what the vehicle costs. Our benchmark case — a $34,000 compact SUV, financed over 60 months at 7.2%, held five years and driven 12,000 miles a year — carries a $670 payment and a real cost of about $982 a month once depreciation, insurance, fuel, maintenance, tax and fees are counted. That is a five-year total of $58,928, or $0.98 a mile. The gap between those two numbers is roughly $18,700 over the term, and it is invisible on the finance contract.</p>
    <p>Every tool here inherits that view. Even the narrow ones — Fuel Cost, Auto Loan, Road Trip — are written to place their answer inside the total rather than to present it as the answer.</p>

    <h3>They share one documented set of assumptions</h3>
    <p>All fifteen calculators run on the same defaults: 20% depreciation in year one and 15% each year after, 7.2% APR, $4.00 a gallon, $0.175 per kWh at home, $2,496 a year for full coverage, $1,588 a year for maintenance, repairs and tires. Those figures are written down and sourced on the <a href="/methodology/">methodology page</a>, along with the formulas that consume them and an honest list of what the models do not capture.</p>
    <p>This matters more than it sounds. It means Cost Per Mile and True Cost to Own agree with each other. It means the depreciation curve you see in one tool is the curve running underneath the others. Calculators that disagree with their own siblings are worse than useless, because they make every answer arguable.</p>

    <h3>Every input is editable</h3>
    <p>A national average describes nobody in particular. Your insurance is not $2,496 — it is whatever your renewal notice says. Your fuel is not $4.00 — it is whatever the station on your route charges. Every default on every tool is a field you can overwrite, and doing so takes about ninety seconds. Four replaced defaults typically move the five-year total by more than the entire difference between the two cars you were comparing.</p>

    <h3>Results are shareable and printable</h3>
    <p>Each calculator encodes its inputs in the page URL. Copy the address bar and you have captured the exact scenario: send it to a partner, paste it into a note, or reopen it in a month and find it precisely as you left it. Every tool also has a print view that produces a clean one-page summary — useful in a showroom, and harder to argue with on paper than on a phone screen.</p>

    <h3>Nothing is sold</h3>
    <p>There is no account, no email wall, no lead form and no "get matched with a dealer" step. We do not sell vehicles, broker finance or take commission on insurance. The calculations run in your browser; the numbers you type do not leave your device. A calculator whose owner profits from one particular answer is not really a calculator, and our <a href="/editorial-standards/">editorial standards</a> set out how the site is funded instead.</p>

    <h2>How the tools fit together</h2>
    <p>They are designed to be used in sequence rather than in isolation. A worked example, using the benchmark SUV:</p>
    ${bullets([
      "<strong>Affordability</strong> sets the ceiling. Take-home pay and existing commitments produce a maximum all-in transport budget, and from that a purchase price. This is the step most buyers skip, which is why so many arrive at the showroom anchored to a payment rather than a price.",
      "<strong>True Cost to Own</strong> tests specific vehicles against that ceiling. Run it twice, on two real cars, and the answer is usually not the one the sticker prices suggested — depreciation and insurance vary far more between models than fuel economy does.",
      "<strong>Depreciation</strong> explains the largest single line in that result. On the benchmark, $19,801 of the $58,928 is value lost, which is more than fuel and maintenance combined.",
      "<strong>Auto Loan</strong> prices the financing once you have a number. Shortening a term from 72 to 60 months raises the payment and cuts total interest, and the tool shows both effects at once.",
      "<strong>Insurance Estimator</strong> and <strong>Maintenance Cost</strong> replace two of the least reliable defaults with figures grounded in your own vehicle and record.",
      "<strong>Cost Per Mile</strong> is the tie-breaker when two vehicles come out close. It normalizes for how much you actually drive, which is the variable that decides most close calls.",
      "<strong>Monthly Transportation Budget</strong> is the sanity check afterwards, and the tool to revisit annually whether or not you are buying anything.",
      "<strong>Ten-Year Cost</strong> answers the question that follows every purchase: how long to keep it. The cumulative average keeps falling for as long as you hold the car, and it resets the day you replace it.",
    ])}

    <h2>Reading a result honestly</h2>
    <p>These are models. Models are wrong in specific, predictable ways, and knowing which ways makes the output far more useful.</p>
    ${bullets([
      "<strong>Depreciation is a forecast, not a measurement.</strong> Nobody can tell you what a particular vehicle will fetch in five years. Treat resale figures as a central estimate with real spread either side, and pay attention to the shape of the curve rather than the exact endpoint.",
      "<strong>Comparisons are more reliable than absolutes.</strong> The difference between two vehicles run through the same model is trustworthy even when neither total is exact, because the shared assumptions cancel out.",
      "<strong>Your mileage figure drives everything.</strong> Cost per mile is a ratio, and drivers routinely misremember their annual mileage by thousands. Take it from the odometer and a service record, not from memory.",
      "<strong>Repairs are lumpy.</strong> An annual maintenance average is a reserve target, not a prediction of any single year. Years three and four are usually quiet; year seven rarely is.",
      "<strong>Taxes and fees are local.</strong> Sales tax, registration and title fees vary enormously by state, and our defaults are national placeholders you should replace.",
      "<strong>Nothing here is inflation-adjusted to a target year.</strong> All figures are in today's money, which is the right basis for comparison and the wrong basis for a ten-year budget in isolation.",
    ])}

    ${callout(
      "The mistake that costs the most",
      `<p style="margin:0">Buying to a monthly payment. Every extra year of loan term lowers the payment and raises the total, and it lengthens the period during which you owe more than the car is worth. A 72- or 84-month term on a vehicle that loses 20% of its value in the first year is a structurally poor position: if you need to sell in year three, you write a check to end the loan. Set the price first with <a href="/calculators/affordability/">Affordability</a>, then choose the shortest term whose payment you can carry.</p>`,
      "warn"
    )}

    <h2>Who these are for</h2>
    <p>Anyone deciding between two vehicles, anyone wondering whether to keep the car they have, and anyone who has never added up what driving costs them in a year. They are also used by people who are not buying anything: the Monthly Transportation Budget and Cost Per Mile tools are as useful for a household audit as for a purchase.</p>
    <p>They are not a substitute for a quote. An insurance premium, a loan rate and a trade-in offer are all things only a company can tell you, and the numbers here are reference points to judge those offers against. If a calculator and a real quote disagree, the quote is the fact and the calculator is the sanity check.</p>
    <p>If you want the reasoning behind any figure, the <a href="/methodology/">methodology</a> sets out every formula and source, the <a href="/faq/">FAQ</a> answers the questions we get most often, and <a href="/contact/">contact</a> is open if you think something is wrong. Corrections get made and dated.</p>

    ${sources([
      cite("AAA_YDC_2025", "Average ownership cost of $11,577 a year and roughly 77¢ per mile at 15,000 miles annually, with depreciation at $4,334 and finance charges at $1,131 a year."),
      cite("EIA_GAS", "The retail gasoline series behind the $4.00 per gallon default."),
      cite("EIA_ELEC", "The residential electricity series behind the $0.175 per kWh default."),
      cite("EPA_FE", "Combined MPG and EV efficiency figures used across the fuel and charging tools."),
      cite("VP_SOAI", "Full-coverage national average of $2,496 a year, and the state-level spread used in the insurance estimator."),
      cite("FED_G19", "New-car loan rates, average maturity and average amount financed, behind the 7.2% and 60-month defaults."),
      "Published charging-network rate cards for public Level 2 and DC fast charging, and observed charging losses at the plug.",
      'MyDrivingCost benchmark case: a $34,000 compact SUV financed at 7.2% over 60 months, held five years at 12,000 miles a year \u2014 $58,928 total, $0.98 per mile, $14,199 resale. Full workings on the <a href="/methodology/">methodology page</a>.',
    ])}

  </div>
</section>

<section class="section-tight">
  <div class="container">
    <div class="section-head"><span class="eyebrow">Go deeper</span><h2>The guides behind the numbers</h2><p>Each calculator sits inside a topic hub that explains why the number behaves the way it does.</p></div>
    ${topicCards([
      [
        "/depreciation/",
        "Depreciation",
        "The largest cost of new-car ownership and the one nobody invoices you for — the shape of the curve, what drives it, and how to lose less.",
        [["Depreciation", "/calculators/depreciation/"], ["New vs used", "/calculators/new-vs-used/"]],
      ],
      [
        "/fuel-and-ev/",
        "Fuel &amp; EV",
        "Gasoline, hybrid and electric priced on the same scale, plus the charging realities that decide whether an EV saves you anything.",
        [["Fuel cost", "/calculators/fuel-cost/"], ["EV charging", "/calculators/ev-charging/"]],
      ],
      [
        "/insurance/",
        "Insurance",
        "What full coverage actually buys, what moves a premium, which discounts are real, and when dropping collision is rational.",
        [["Insurance estimator", "/calculators/insurance-estimator/"], ["Cost per mile", "/calculators/cost-per-mile/"]],
      ],
      [
        "/maintenance/",
        "Maintenance",
        "What service really costs as a car ages, how much to reserve each month, and whether extended warranties earn their price.",
        [["Maintenance cost", "/calculators/maintenance-cost/"], ["Ten-year cost", "/calculators/ten-year-cost/"]],
      ],
      [
        "/buying-guides/",
        "Buying &amp; financing",
        "Lease versus buy, new versus used, loan terms, negotiation and trade-in timing — where the money is really won or lost.",
        [["Auto loan", "/calculators/auto-loan/"], ["Lease vs buy", "/calculators/lease-vs-buy/"], ["Affordability", "/calculators/affordability/"]],
      ],
      [
        "/methodology/",
        "Methodology",
        "Every assumption, formula and source used by the fifteen calculators, in one place, with the limitations stated plainly.",
        [["Methodology", "/methodology/"], ["Editorial standards", "/editorial-standards/"], ["FAQ", "/faq/"]],
      ],
    ])}
  </div>
</section>
`;

/* --------------------------------------------------------------- exports --- */

module.exports = {
  url: "/calculators/",
  title: "Vehicle Cost Calculators — All 15 Tools, Free | MyDrivingCost",
  desc:
    "Fifteen free calculators for the real cost of running a car: true cost to own, cost per mile, depreciation, loans, fuel, EV charging and insurance.",
  eyebrow: "The toolbox",
  h1: "Every ownership-cost calculator, in one place.",
  h1short: "Calculators",
  lead:
    "Fifteen tools covering every line of a vehicle's cost, from the five-year total to the price of a single trip. All free, all built on one documented set of assumptions, all editable. No signup, ever.",
  crumb: [],
  heroStats: [
    ["Calculators live", "15", "every one free to use"],
    ["Shared assumptions", "One set", "documented and sourced"],
    ["Accounts required", "None", "nothing is sold here"],
  ],
  heroCta: [
    ["Open True Cost to Own", "/calculators/true-cost-to-own/", "btn-primary"],
    ["Read the methodology", "/methodology/", "btn-ghost"],
  ],
  body,
  faqTitle: "Questions about the calculators",
  faq: [
    [
      "Which calculator should I start with?",
      "True Cost to Own, in almost every case. It is the only tool that shows all six cost categories at once, which is what reveals where your money is actually going — usually depreciation rather than the fuel bill most people worry about. Once you can see which bar in the chart is largest, you know which of the more specific calculators is worth your time. If you have not yet settled on a budget, run Vehicle Affordability first to set a sensible ceiling.",
    ],
    [
      "Are all fifteen calculators really free?",
      "Yes, entirely. There is no account, no email wall, no paywall, no trial and no lead form. We do not sell vehicles, broker finance or take commission on insurance policies, so there is no version of this site where a particular answer pays us better than another. Every tool runs in your browser, which also means the figures you type never leave your device — the calculations happen locally rather than on a server.",
    ],
    [
      "Where do the default numbers come from?",
      "Published, citable sources: AAA's Your Driving Costs research for ownership averages, the US Energy Information Administration for fuel and electricity prices, EPA data for fuel economy, published charging-network rate cards, and industry rate studies for insurance. The full list, with the formulas that consume each figure, is on the methodology page. Every default is also an editable field, because a national average describes nobody in particular.",
    ],
    [
      "How accurate are the results?",
      "They are as accurate as the assumptions you give them, which is the honest answer for any ownership-cost model. Depreciation in particular is a forecast rather than a measurement — nobody can tell you precisely what a specific vehicle will be worth in five years. The comparisons are considerably more reliable than the absolutes: run two cars through the same model and the shared assumptions cancel out, leaving a difference you can trust even when neither total is exact.",
    ],
    [
      "Do the calculators agree with each other?",
      "They are built to. All fifteen run on one set of defaults — the same depreciation curve, the same APR, the same fuel and electricity prices, the same insurance and maintenance figures. That is why Cost Per Mile and True Cost to Own produce consistent answers for the same vehicle, and why the depreciation curve you see in one tool is the curve running underneath the others. Calculators that contradict their own siblings make every answer arguable.",
    ],
    [
      "Can I save or share a calculation?",
      "Yes. Every calculator encodes its inputs in the page URL, so copying the address bar captures your exact scenario. Send it to a partner, save it in a note, or reopen it weeks later and it loads precisely as you left it. Each tool also has a print view that produces a clean one-page summary, which is useful in a showroom — a printed total is considerably harder to argue with than a figure on a phone screen.",
    ],
    [
      "Do these work for electric and hybrid vehicles?",
      "Yes. True Cost to Own models gasoline, hybrid and fully electric powertrains, switching the fuel line to electricity and adjusting maintenance and depreciation accordingly. EV Charging goes further, pricing home, public Level 2 and DC fast charging separately and accounting for the energy lost between the plug and the battery. Run it next to Fuel Cost with the same annual mileage and you have a like-for-like comparison rather than a marketing claim.",
    ],
    [
      "Why is depreciation treated as a cost when I never pay it?",
      "Because it is real money you lose. Buy at $34,000, sell at $14,199 five years later, and the $19,801 gap is what you paid to use the car — more, on our benchmark, than fuel and maintenance combined. It does not arrive as a monthly bill, which is exactly why people miss it, and why a vehicle with a cheap payment and a steep value curve can be the more expensive choice by a wide margin.",
    ],
    [
      "Can I use these numbers in my own work?",
      "Yes. Cite any figure from this site in a report, an article, a lesson or a negotiation, with attribution to MyDrivingCost.com and a link to the page it came from. Please carry the assumptions with the number: the benchmark's $58,928 five-year total is inseparable from the 12,000 miles a year, five-year hold and 7.2% APR that produced it. A figure quoted without its assumptions is not a figure, it is a rumor.",
    ],
    [
      "What if I think one of your numbers is wrong?",
      "Tell us. The contact page takes corrections, and we would rather hear about an error than keep publishing it. Include the page, the figure and what you think it should be, ideally with a source. Corrections are made and dated, and the editorial standards page explains how that process works. Every hub and calculator also carries a sources block listing the references behind its figures.",
    ],
  ],
  cta: {
    h2: "Start with the whole picture",
    p: "Two minutes of inputs, six cost categories, five years of ownership — and the one chart that shows where the money really goes.",
    btn: ["Open True Cost to Own", "/calculators/true-cost-to-own/"],
  },
  schemaExtra: [
    {
      "@type": "CollectionPage",
      "@id": SITE + "/calculators/#collection",
      name: "Vehicle Cost Calculators",
      description:
        "The complete set of MyDrivingCost vehicle cost-of-ownership calculators, grouped by the decision each one supports.",
      inLanguage: "en",
      dateModified: "2026-07-23",
      isPartOf: { "@id": SITE + "/#website" },
      mainEntity: { "@id": SITE + "/calculators/#itemlist" },
    },
    {
      "@type": "ItemList",
      "@id": SITE + "/calculators/#itemlist",
      name: "MyDrivingCost calculators",
      description: "Fifteen free calculators covering every category of vehicle ownership cost.",
      numberOfItems: CALCS.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: CALCS.map(([href, name], i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: name + " Calculator",
        url: SITE + href,
        item: {
          "@type": "SoftwareApplication",
          name: name + " Calculator",
          url: SITE + href,
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          publisher: { "@id": SITE + "/#org" },
        },
      })),
    },
  ],
};
