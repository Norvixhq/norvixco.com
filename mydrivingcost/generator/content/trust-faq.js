const P = require("../page");
const { table, callout, bullets, calcTiles, sources, cite } = P;

const body = `
<section class="section-tight">
  <div class="container container-narrow prose">

    <h2>The short answers</h2>
    <p>This page answers questions about the site itself — what it costs, what happens to your data, where the numbers come from and what you may do with them. Questions about how a specific cost is modeled are answered on the <a href="/methodology/">methodology page</a>, and each calculator carries its own FAQ about the decision it helps with.</p>
    <p>If you want the whole thing in four lines: the site is free, there is no account, your inputs never leave your browser, and you may cite any figure here with attribution and a link.</p>

    ${table(
      ["Question", "Short answer"],
      [
        ["Does it cost anything?", "No. No subscription, no paywall, no email gate."],
        ["Do I need an account?", "No. There is no sign-in on this site at all."],
        ["Do you collect my data?", "The calculators collect nothing. Everything runs in your browser."],
        ["How accurate is it?", "Accurate to its assumptions, which are published in full and editable."],
        ["Can I quote your figures?", "Yes, with attribution and a link to the page."],
        ["Do you sell cars or insurance?", "No. We sell nothing and broker nothing."],
      ]
    )}

    <h2>Getting a better answer out of the site</h2>
    <p>Every calculator ships with national default assumptions. They are reasonable and they are not yours. Four inputs are worth replacing before you take any result seriously, because they carry most of the variance in the answer:</p>

    ${bullets([
      "<strong>Your annual mileage.</strong> This drives fuel, maintenance and the per-mile figure, and it is the number people misjudge most. Take last year's odometer difference rather than a guess.",
      "<strong>Your actual insurance premium.</strong> You already know this one, and it beats any national average by a wide margin. If you are comparing a car you do not own yet, get a real quote first.",
      "<strong>Your local fuel or electricity price.</strong> Fuel varies by more than a dollar a gallon between states; residential electricity ranges from about 11¢ to over 40¢ per kWh.",
      "<strong>Your APR and term.</strong> Use the offer in front of you, not a representative rate. A two-point difference on a five-year loan is worth well over a thousand dollars.",
    ])}

    <p>With those four replaced, the output stops being a national illustration and starts being an estimate of your situation. Everything else — sales tax, registration, the depreciation curve — moves the total by less.</p>

    ${callout(
      "The one number the whole site is arguing with",
      `<p style="margin:0">On our published benchmark, a $34,000 SUV financed over 60 months carries a monthly payment of $670.09 and a true monthly cost of about $982. The payment is 68% of the cost, and it stops after five years while the other 32% does not. Every calculator here exists to close that gap before you sign rather than after. The full reconciliation is on the <a href="/methodology/">methodology page</a>.</p>`
    )}

    <h2>Still not answered?</h2>
    <p>If the questions below do not cover it, the <a href="/methodology/">methodology page</a> documents the model in full, the <a href="/editorial-standards/">editorial standards</a> page covers independence and corrections, and the <a href="/privacy/">privacy policy</a> covers data. Beyond that, write to us via the <a href="/contact/">contact page</a>.</p>

    ${sources([
      'Model assumptions, formulas, data sources and known limitations are published in full on the <a href="/methodology/">methodology page</a>.',
      "Benchmark case: a $34,000 SUV, $3,400 down, 7.2% APR over 60 months, 12,000 miles a year for five years \u2014 $58,928 total, $0.98 per mile, $14,199 residual.",
      cite("AAA_YDC_2025", "The primary external reference for whole-vehicle ownership cost."),
      cite("EPA_FE", "Fuel-economy and EV efficiency ratings."),
      cite("EIA_GAS", "Retail energy pricing behind the fuel defaults."),
      cite("INSURIFY_AVG", "One of the two insurance studies our $2,496 default sits between."),
      cite("INSURANCECOM_AVG", "The other."),
    ])}

  </div>
</section>

<section class="section-tight bg-subtle">
  <div class="container">
    <div class="section-head"><span class="eyebrow">Start somewhere</span><h2>The four calculators most people need first</h2><p>All free, all instant, none of them ask for an email address.</p></div>
    ${calcTiles([
      ["/calculators/true-cost-to-own/", "chart", "True Cost to Own", "The whole picture: six cost categories over your ownership period.", true],
      ["/calculators/cost-per-mile/", "route", "Cost Per Mile", "One number you can compare against anything, including not driving.", true],
      ["/calculators/affordability/", "scale", "Affordability", "What you can actually carry, rather than what a lender will approve.", true],
      ["/calculators/", "grid", "All calculators", "Fifteen tools covering fuel, EVs, loans, leases, depreciation and trade-ins.", true],
    ])}
  </div>
</section>
`;

module.exports = {
  url: "/faq/",
  title: "Frequently Asked Questions | MyDrivingCost",
  desc:
    "Answers about MyDrivingCost: what it costs, what happens to your inputs, where our figures come from, how accurate they are, and how to cite them properly.",
  eyebrow: "FAQ",
  h1: "Frequently asked questions",
  h1short: "FAQ",
  lead:
    "What the site costs, what happens to your inputs, where the numbers come from, how far to trust them and what you may do with them.",
  crumb: [],
  heroStats: [
    ["Price", "Free", "no account, no email gate"],
    ["Data collected by calculators", "None", "everything runs in your browser"],
    ["Assumptions published", "All of them", "and every one is editable"],
    ["Reuse", "Cite freely", "with attribution and a link"],
  ],
  heroCta: [
    ["Open a calculator", "/calculators/", "btn-primary"],
    ["Read the methodology", "/methodology/", "btn-ghost"],
  ],
  body,
  faqTitle: "Everything else, answered",
  faq: [
    [
      "Is MyDrivingCost.com free to use?",
      "Yes, entirely. There is no subscription, no paywall, no trial and no premium tier. Every calculator, guide and figure on the site is available to anyone, and no result is held back behind an email address. The site does not ask you to register in order to see a number, which is deliberate — the moment a tool gates its output, the number stops being the product and the person using it becomes the product instead.",
    ],
    [
      "Do I need to create an account?",
      "No. There is no sign-in, no registration and no account system anywhere on this site. Nothing is saved to a profile because there are no profiles. If you want to keep a calculation, copy the URL from your browser after you have run it — the address carries all of your inputs, so opening it later reproduces the result exactly. That is the whole of our persistence mechanism, and it lives on your machine rather than ours.",
    ],
    [
      "Do you sell or share my data?",
      "No, and more usefully, we do not have any to sell. The calculators run entirely in your browser using JavaScript. The numbers you type are never transmitted to us, never written to a database and never seen by anyone but you. There is no account, no email capture, no lead generation and no data broker relationship. The one thing stored locally is your light or dark theme preference. The privacy policy sets out the technical detail in full.",
    ],
    [
      "Can I share or save a calculation?",
      "Yes. When you change inputs, the page URL updates to carry them in its query string, so copying the address bar copies the whole scenario. Send that link and the recipient sees exactly your numbers, not the defaults. Bookmark it and you can return to it any time. One consequence worth knowing: a link you share contains the figures you entered, including price and loan amount. That is usually the point, but it is worth a thought before pasting one into a public thread.",
    ],
    [
      "How accurate are your numbers?",
      "They are accurate to their assumptions, and the assumptions are published in full. Run a calculator with our defaults and you get a well-sourced national illustration. Replace four inputs with your own — annual mileage, insurance premium, local fuel price, and your actual APR and term — and the answer becomes a genuine estimate of your situation. What no model can do is know your ZIP code, your driving record or what the used market will pay for your car in five years. Those limitations are listed explicitly on the methodology page.",
    ],
    [
      "Where do your figures come from?",
      "From published national datasets, each cited by name and year on the page that uses it. The main ones are AAA's <em>Your Driving Costs</em> for total ownership benchmarks, EPA ratings for fuel economy, US Energy Information Administration data for energy prices, and published national insurance rate studies. Where sources disagree we publish the disagreement: full-coverage insurance was reported at $2,237 a year by Insurify in July 2026 and $2,578 by Insurance.com for 2026, so our default sits between them at $2,496.",
    ],
    [
      "How current are the figures, and how often are they updated?",
      "Less often than you might expect, and deliberately so. Every default is a round national reference point chosen to stay reasonable across years &mdash; $4.00 a gallon, 30 MPG, 12,000 miles a year &mdash; rather than a reading of this week&rsquo;s market, so it does not go stale the way a spot price does. A default changes when the underlying national average moves materially, which we treat as a sustained shift of more than 10%. What matters more than any update schedule is that every figure is an editable field: if you know your real fuel price or premium, type it in and the whole model recomputes around it.",
    ],
    [
      "Why is your number different from the one my dealer gave me?",
      "Because you are almost certainly comparing two different things. A dealer quotes the monthly finance payment: principal and interest on the amount borrowed. We quote the total cost of running the vehicle, which adds depreciation, insurance, fuel, maintenance, tax and registration, and removes principal because repaying it converts cash into equity rather than spending it. On our benchmark the payment is $670.09 a month and the true cost is about $982. Neither figure is wrong; only one of them is the cost.",
    ],
    [
      "Do you sell cars, insurance or loans?",
      "No. We do not sell vehicles, broker finance, arrange insurance, run a comparison marketplace or generate sales leads, and we have no affiliation with any dealership, manufacturer, lender or insurer. Nothing you enter into a calculator produces a phone call, because there is no mechanism by which that could happen. That independence is why no company can pay for a placement, a default value or a favorable assumption in any tool here. The editorial standards page sets out the position in full.",
    ],
    [
      "Can I use your figures in a report or an article?",
      "Yes. Cite any figure from this site in a report, article, presentation, lesson or analysis, with attribution to MyDrivingCost.com and a link to the page it came from. We ask one thing: carry the assumptions with the number. Our $58,928 five-year benchmark is inseparable from the 12,000 miles a year, five-year hold, $34,000 price and 7.2% APR that produced it, and quoting the total without them misleads your reader through no fault of yours.",
    ],
    [
      "Is there an API?",
      "Not at present. Every calculator runs client-side in the browser, so there is no server-side computation to expose and no endpoint to call. If you need figures programmatically, the practical route today is the query-string interface: calculator URLs encode their inputs, so you can construct a link with the values you want and read the result in the page. If you have a research or product use case for a proper API, describe it to us via the contact page — demand is how these things get built.",
    ],
    [
      "Does the site work properly on a phone?",
      "Yes. Every page and every calculator is built to work on small screens, with inputs sized for touch and results laid out to be readable without pinching. Charts and tables reflow rather than scrolling off the side. There is a dark mode that follows your system setting and can be toggled manually, and the preference is remembered on your device. There is no app to install and nothing to download; the site is the product.",
    ],
    [
      "Which calculator should I start with?",
      "True Cost to Own, in almost every case. It is the one that produces the number the rest of the site is arguing for — the total five-year cost of a specific vehicle across all six cost categories — and every other tool is a deeper look at one line of that total. If you already own the car and want a single figure to compare against alternatives, start with Cost Per Mile instead. If you are deciding what you can carry rather than what to buy, start with Affordability.",
    ],
    [
      "Do the calculators handle electric vehicles?",
      "Yes, throughout. Fuel cost, cost per mile and true cost to own all model electricity as well as gas, using consumption at the plug rather than at the wheel so that charging and thermal losses — typically 10 to 15% — are counted. The EV charging calculator handles home, public Level 2 and DC fast charging at separate rates, because the blend you actually use changes the answer far more than the vehicle's efficiency rating does.",
    ],
    [
      "Do your figures apply outside the United States?",
      "The defaults do not. Prices, taxes, registration regimes, insurance markets and fuel costs here are all US figures, and several inputs have no direct equivalent elsewhere. The formulas, however, are universal: declining-balance depreciation and monthly loan amortization work identically in any currency. If you are outside the US, replace every default with local values and the model will behave correctly, though the currency symbol will still read as dollars.",
    ],
    [
      "Can I print or save a result as a PDF?",
      "Yes. Every calculator page is styled for printing, so your browser's print function produces a clean copy of the inputs and results without navigation, buttons or clutter, and choosing to print to PDF saves it as a file. This is genuinely useful when you are taking numbers into a dealership or a conversation with a partner. The other way to keep a result is simply to bookmark the URL, which carries every input you entered.",
    ],
    [
      "Why does your total exclude my loan principal?",
      "Because repaying principal is not a cost. It moves money from your bank account into equity in a vehicle you own; nothing is consumed. The cost of that vehicle losing value is already charged in full, as depreciation — which on our benchmark is $19,801 over five years. Counting principal as well would bill you twice for the same car. Interest is different: it leaves and does not come back, so it is counted in full, taken from a complete monthly amortization schedule.",
    ],
    [
      "Who writes this site and how is it funded?",
      "MyDrivingCost.com is an independent publication written and maintained by a small editorial team, with no dealer, manufacturer, lender or insurer affiliation and no owner drawn from those industries. There is currently no advertising, no affiliate marketing and no sponsorship. If any of those are ever introduced, they will be disclosed on the page where they appear and will never alter a calculated result — a commitment published in advance on the editorial standards page precisely so it can be held against us.",
    ],
  ],
  cta: {
    h2: "The fastest way to get an answer",
    p: "Two minutes, no signup, no email. The full five-year cost of a specific car and your true cost per mile.",
    btn: ["Open True Cost to Own", "/calculators/true-cost-to-own/"],
  },
};
