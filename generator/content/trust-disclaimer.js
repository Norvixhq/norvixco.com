const P = require("../page");
const { table, callout, bullets, sources, SITE, cite } = P;

const body = `
<section class="section-tight">
  <div class="container container-narrow prose">

    <p class="text-muted"><strong>Last updated: July 2026.</strong> This page is deliberately written in plain language. A disclaimer nobody understands protects nobody, and the point of this one is that you finish it knowing exactly how much weight our numbers can carry.</p>

    <h2>Start here: what this site gives you</h2>
    <p>MyDrivingCost.com gives you estimates. Good ones, we hope — sourced from published national data, built on formulas we publish in full, and reconcilable line by line. But estimates.</p>
    <p>An estimate is a model of something that has not happened yet. It takes a set of assumptions, applies arithmetic, and produces a number. The arithmetic is reliable. The assumptions are averages. And an average is a statement about a population, not a promise about you.</p>

    ${callout(
      "The single sentence version",
      `<p style="margin:0">Every number on this site is an estimate based on national averages and the inputs you provide; it is not financial, tax, insurance, legal or purchasing advice, it is not a quote or a valuation, your real costs will differ, and you should verify anything that matters before you spend money on it.</p>`,
      "warn"
    )}

    <h2>What we are not</h2>
    <p>Being specific about this is more useful than a general warning, so:</p>

    ${table(
      ["We are not", "Which means we cannot"],
      [
        ["<strong>A financial adviser</strong>", "Tell you whether you can afford a vehicle, what to do with your savings, or how a purchase fits your wider finances"],
        ["<strong>A tax adviser or accountant</strong>", "Tell you what is deductible, how a business purchase should be treated, or what your state will actually charge you"],
        ["<strong>An insurance broker, agent or carrier</strong>", "Quote you, bind cover, or tell you what a carrier will charge — our estimator is a model, not a quote"],
        ["<strong>A lender or finance broker</strong>", "Offer credit, tell you what rate you will be approved for, or assess your application"],
        ["<strong>A dealer, retailer or vehicle valuer</strong>", "Sell you anything, appraise your car, or tell you what a specific vehicle will fetch"],
        ["<strong>A lawyer</strong>", "Advise on a contract, a lease agreement, a warranty claim or a consumer-rights matter"],
        ["<strong>A mechanic</strong>", "Diagnose your vehicle or tell you what a repair on your car will cost"],
      ]
    )}

    <p>What we are is a publisher of a cost model and the guides that explain it. That is genuinely useful, and it is not a substitute for any of the roles above.</p>

    <h2>Why national averages will not match your ZIP code</h2>
    <p>This is the most important practical limitation, so it gets a section of its own. Nearly every cost in vehicle ownership is set locally, and our defaults are national.</p>

    ${table(
      ["Cost", "How much it varies within the US", "What that does to your total"],
      [
        ["<strong>Insurance</strong>", "From about $1,660 a year in Vermont to $3,999 in Louisiana for full coverage", "Over five years, a difference of more than $11,000 on the same car"],
        ["<strong>Fuel</strong>", "More than a dollar a gallon between the cheapest and dearest states", "At 12,000 miles a year and 30 MPG, roughly $2,000 over five years"],
        ["<strong>Electricity</strong>", "Roughly 11¢ to over 40¢ per kWh residential", "Enough to reverse the running-cost case for an EV in some states"],
        ["<strong>Sales tax</strong>", "Zero in a few states to over 10% with local rates in others", "On a $34,000 vehicle, a swing of more than $3,400"],
        ["<strong>Registration</strong>", "A flat fee in some states; a percentage of vehicle value in others", "From under $50 a year to several hundred"],
        ["<strong>Labor rates</strong>", "Wide metro-to-rural variation for the same job", "Compounds across every service visit you make"],
      ]
    )}

    <p>Add those together and a national estimate can be several thousand dollars away from your reality over five years — in either direction. This is not a flaw we can engineer away. It is what a national average is.</p>
    <p>The response is simple and it takes ten minutes: replace the defaults with your own figures. Your insurance premium is on your renewal notice. Your fuel price is on the sign down the road. Your APR is on the offer in front of you. Your annual mileage is the difference between two odometer readings. Four numbers, and the output stops being a national illustration and starts describing your situation. Every input on every calculator is editable for exactly this reason.</p>

    <h2>Depreciation is a forecast, and forecasts are wrong</h2>
    <p>Depreciation is the largest single cost in new-car ownership — $19,801 of the $58,928 on our published benchmark — and it is the one figure that cannot be verified until the day you sell.</p>
    <p>Our model applies a declining-balance curve: 20% in the first year, then 15% of the remaining value each year after. That describes how a mainstream vehicle has historically behaved. It cannot anticipate a model being discontinued, a safety recall, a reliability reputation forming, a fuel-price shock, a change to subsidies, a shift in fashion, or a supply squeeze that inverts the used market for two years. All of those have happened within recent memory and all of them moved residual values by double-digit percentages.</p>
    <p>Treat any resale figure on this site as a central estimate around a wide distribution, not as a number you can plan a balance sheet on. The <a href="/depreciation/">depreciation hub</a> explains what actually drives retention, and the <a href="/calculators/depreciation/">depreciation calculator</a> lets you set the curve yourself.</p>

    <h2>The insurance estimate is not a quote</h2>
    <p>Our <a href="/calculators/insurance-estimator/">insurance estimator</a> produces a figure from vehicle type, driver profile and coverage level. It cannot see your driving record, your claims history, your credit-based insurance score in the states that permit its use, your exact trim level, your garaging address, or the rate filings your carrier made last month. Any one of those can move a real premium by hundreds of dollars a year.</p>
    <p>Use the estimator to compare one vehicle against another under identical assumptions — that comparison is meaningful and it is what the tool is for. Do not use it as a substitute for an actual quote. Before you commit to a vehicle, get real quotes from three carriers with your name, your ZIP code and your record on them, and compare identical coverage limits rather than headline prices.</p>

    <h2>Verify before you commit money</h2>
    <p>Here is the practical checklist. If a decision involves five figures, these are worth an afternoon.</p>

    ${bullets([
      "<strong>Get a real insurance quote</strong> on the specific vehicle, before you sign for it. Ten minutes, and it occasionally changes which car is cheaper.",
      "<strong>Get a written finance offer</strong> with the APR, term and total amount payable stated. Compare it against a pre-approval from your own bank or credit union.",
      "<strong>Check your state's tax treatment.</strong> Several states tax the price net of trade-in and some cap the taxable amount, which can be worth over a thousand dollars.",
      "<strong>Confirm registration and title fees</strong> with your state's motor vehicle agency, not with a national estimate.",
      "<strong>Get a pre-purchase inspection</strong> on any used vehicle, from a mechanic you chose rather than one the seller suggested.",
      "<strong>Read the actual lease or finance agreement</strong>, particularly the mileage allowance, the excess-mileage rate, the disposition fee and the wear-and-tear standard.",
      "<strong>Ask for the out-the-door price in writing</strong> — every fee included — rather than the monthly payment.",
      "<strong>Talk to a qualified professional</strong> if the purchase is significant relative to your finances, involves business use, or interacts with anything else you are deciding.",
    ])}

    <h2>What our calculators cannot know</h2>
    ${bullets([
      "<strong>Where you live</strong>, and therefore what you will actually pay for insurance, fuel, electricity, tax, registration and labor.",
      "<strong>Your driving record and credit</strong>, both of which change what a carrier or a lender will charge you.",
      "<strong>The condition and history of a specific vehicle</strong>, which is the difference between a cheap used car and an expensive one.",
      "<strong>What the used market will pay in five years</strong>, which nobody knows.",
      "<strong>Your risk tolerance.</strong> A cheaper car that strands you twice a year is not cheaper in any sense that matters, and no model can price that for you.",
      "<strong>Your circumstances.</strong> Whether the money would be better used elsewhere, whether a lease suits your life, whether you need the vehicle at all.",
      "<strong>Anything that happens next.</strong> A recall, a fuel-price shock, a job change, a subsidy withdrawn, a transmission that fails at 70,000 miles.",
    ])}

    <p>The full list of the model's limitations, written by the people who built it, is on the <a href="/methodology/">methodology page</a>. We publish it because a model that hides its failure modes is asking to be trusted on faith, and faith is the wrong basis for a five-figure decision.</p>

    <h2>How to use this site well</h2>
    <p>None of the above means the numbers are useless. It means they are a particular kind of useful, and using them well looks like this:</p>

    ${table(
      ["Do use our figures to", "Do not use our figures to"],
      [
        ["Compare two vehicles under identical assumptions", "Predict your exact five-year spend to the dollar"],
        ["See which cost category dominates a decision", "Substitute for an insurance quote or a finance offer"],
        ["Understand the gap between a monthly payment and the true cost", "Establish a vehicle's market value for a sale or a claim"],
        ["Sanity-check a dealer's, lender's or insurer's numbers", "Decide affordability without looking at the rest of your finances"],
        ["Frame a negotiation with a figure you can defend", "Justify a purchase you already know you cannot carry"],
        ["Work out how sensitive a decision is to mileage, rate or hold period", "Make a tax, legal or regulated financial decision"],
      ]
    )}

    <h2>Third-party data and external links</h2>
    <p>We cite published sources — AAA, EPA, the US Energy Information Administration, national insurance studies — and we name them with the year of publication on the page where the figure appears. We believe those sources are reliable, but we did not collect their data and we cannot warrant it. Third parties revise their figures, and a number we cite may since have been superseded. That is one reason every reference figure on this site is also an editable field: the model belongs to your inputs, not to our defaults.</p>
    <p>Links to external sites are provided for verification and further reading. We do not control them, do not endorse them, and are not responsible for their content or accuracy.</p>

    <h2>No liability for your decisions</h2>
    <p>To the fullest extent permitted by law, MyDrivingCost.com accepts no liability for any loss arising from reliance on anything published here, including any decision to buy, sell, lease, finance, insure, repair, keep or dispose of a vehicle. Those decisions are yours. They are made with information beyond what any national model can see, and their consequences are yours. The formal position is set out in the <a href="/terms/">terms of use</a>.</p>
    <p>We are not being evasive. We are being accurate about what a published cost model can and cannot do for a stranger whose circumstances it has never seen.</p>

    <h2>If you find something wrong</h2>
    <p>Tell us. Verified factual and formula errors are corrected within days, every page repeating the figure is updated in the same pass, and the correction is noted on the page. Send the page URL, the figure, what you believe it should be and your source to <a href="mailto:corrections@mydrivingcost.com">corrections@mydrivingcost.com</a>, or use the <a href="/contact/">contact page</a>. Our corrections policy is published in full on the <a href="/editorial-standards/">editorial standards</a> page.</p>

    ${sources([
      cite("INSURANCECOM_AVG", "$1,660 in Vermont to $3,999 in Louisiana for full coverage, on a national average of $2,578."),
      cite("INSURIFY_AVG", "A national average of $2,237 \u2014 which is how far two credible studies of the same thing can sit apart."),
      cite("AAA_YDC_2025", "$11,577 per year and approximately 77¢ per mile at 15,000 miles annually."),
      "Benchmark referenced above: a $34,000 SUV over five years at 12,000 miles a year \u2014 $58,928 total, of which $19,801 is depreciation.",
      'Full model assumptions, formulas and limitations: the <a href="/methodology/">methodology page</a>. Formal legal terms: the <a href="/terms/">terms of use</a>.',
    ])}

  </div>
</section>
`;

module.exports = {
  url: "/disclaimer/",
  title: "Disclaimer — Estimates, Not Advice | MyDrivingCost",
  desc:
    "Every figure on MyDrivingCost is an estimate built on national averages. Nothing here is financial, tax, insurance, legal or purchasing advice. Verify first.",
  eyebrow: "Legal",
  h1: "Disclaimer",
  h1short: "Disclaimer",
  lead:
    "Everything on this site is an estimate. That is not a formality — it changes how much weight the numbers can carry. Here is exactly what they can and cannot do for you.",
  crumb: [],
  heroStats: [
    ["Every figure here", "An estimate", "never a quote or a valuation"],
    ["Basis of our defaults", "National averages", "not your ZIP code"],
    ["Advice given", "None", "financial, tax, legal or insurance"],
    ["Before you commit", "Verify", "with real quotes and a professional"],
  ],
  heroCta: [
    ["How the model works", "/methodology/", "btn-primary"],
    ["Terms of use", "/terms/", "btn-ghost"],
  ],
  body,
  faqTitle: "Plain answers",
  faq: [
    [
      "How far off could your estimate be for my situation?",
      "Over five years, several thousand dollars in either direction if you use our defaults unchanged. Insurance alone ranges from about $1,660 a year in Vermont to $3,999 in Louisiana, a spread of more than $11,000 across five years on the same car. Fuel, sales tax, registration and labor rates all vary similarly by location. Replace four inputs with your own numbers — mileage, premium, local fuel price, and your actual APR and term — and most of that error disappears.",
    ],
    [
      "Is anything on this site financial advice?",
      "No. Nothing here is financial, tax, legal, insurance or purchasing advice, and nothing is a quote, an offer, an appraisal, a valuation or a recommendation to buy, sell, lease, finance or insure any vehicle. We publish a cost model and explain it. We do not know your income, your other commitments, your credit, your tax position or your plans, and any of those could change what the right decision is. For that, talk to a qualified professional.",
    ],
    [
      "Can I rely on your resale value figure?",
      "Treat it as a central estimate around a wide distribution, not a number you can plan on. Our curve — 20% in year one, then 15% of the remaining value annually — describes typical historical behavior for a mainstream vehicle. It cannot anticipate a discontinued model, a recall, a fuel-price shock, a subsidy change or a supply squeeze, all of which have moved real residual values by double-digit percentages within recent memory. Depreciation is the largest cost and the least certain one.",
    ],
    [
      "Why is your insurance estimator not a quote?",
      "Because it cannot see the things carriers actually price on: your driving record, your claims history, your credit-based insurance score where its use is permitted, your exact trim, your garaging address, and your carrier's most recent rate filings. Each of those can move a premium by hundreds of dollars a year. The estimator is built for comparing vehicles under identical assumptions, which is genuinely useful. Before committing, get real quotes from three carriers and compare identical coverage limits.",
    ],
    [
      "What should I verify before I buy a car?",
      "Five things, and together they take an afternoon. Get a real insurance quote on the specific vehicle. Get a written finance offer stating APR, term and total payable, and compare it against a pre-approval from your own bank. Check how your state taxes the purchase, particularly whether trade-in value is deducted. Confirm registration and title fees with your state agency. And on any used car, get a pre-purchase inspection from a mechanic you chose yourself.",
    ],
    [
      "If your calculator is wrong and it costs me money, what then?",
      "We correct the error promptly and publicly — verified faults are fixed within days and noted on the page — but we cannot accept liability for a decision you made on the basis of an estimate. That is not evasion; it is the honest position of anyone publishing a national model to strangers whose circumstances it has never seen. The formal wording is in the terms of use. The practical protection is verifying the figures that matter before you commit.",
    ],
  ],
  cta: {
    h2: "See exactly how the numbers are built",
    p: "Every assumption, formula, source and known limitation is published in full. Check the model rather than trusting it.",
    btn: ["Read the methodology", "/methodology/"],
  },
  schemaExtra: [
    {
      "@type": "CreativeWork",
      "@id": SITE + "/disclaimer/#document",
      name: "MyDrivingCost.com Disclaimer",
      genre: "Disclaimer",
      inLanguage: "en",
      datePublished: "2026-01-15",
      dateModified: "2026-07-23",
      publisher: { "@id": SITE + "/#org" },
      isPartOf: { "@id": SITE + "/#website" },
      about: { "@type": "Thing", name: "Limitations of vehicle cost estimates" },
    },
  ],
};
