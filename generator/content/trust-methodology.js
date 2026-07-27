const P = require("../page");
const { table, callout, bullets, calcTiles, sources, SITE, cite } = P;

const MONO =
  'font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.95rem;line-height:1.9;margin:0';

const fx = (lines) =>
  `<p style="${MONO}">${lines.join("<br>")}</p>`;

const body = `
<section class="section-tight">
  <div class="container container-narrow prose">

    <h2>Why this page exists</h2>
    <p>Most cost-of-ownership tools ask you for a few numbers and hand back a total. They rarely tell you what happened in between. That is convenient for the tool and useless for the reader, because a total you cannot interrogate is a total you cannot trust — and a number you cannot trust should not be used to make a five-figure decision.</p>
    <p>This page is the complete specification of the model behind every calculator on MyDrivingCost.com. It sets out each of the six cost categories, the default value the model starts from, where that default came from, the formulas used for depreciation and finance, the benchmark result the whole site is calibrated against, and — the section that matters most — the things this model does not and cannot know about you.</p>
    <p>Nothing here is proprietary. If you want to rebuild our figures in a spreadsheet and check them, everything you need is below. We would rather you did.</p>

    <h2>The six cost categories</h2>
    <p>Ownership cost on this site always means the same six things, in the same order, on every calculator. There is no seventh category hiding behind a footnote.</p>

    ${table(
      ["Category", "What it includes", "How the model treats it"],
      [
        [
          "<strong>Depreciation</strong>",
          "Purchase price minus projected resale value at the end of the ownership period",
          "Declining-balance curve applied to the purchase price; realized as a single lump at disposal but shown annualized",
        ],
        [
          "<strong>Insurance</strong>",
          "Full-coverage premium: liability, collision, comprehensive, uninsured motorist",
          "Flat annual premium held constant across the ownership period unless you change it",
        ],
        [
          "<strong>Fuel or electricity</strong>",
          "Gas, diesel or charging energy for the miles you drive",
          "Annual miles ÷ efficiency × unit price; EVs modeled with a charging-loss factor",
        ],
        [
          "<strong>Maintenance &amp; repairs</strong>",
          "Scheduled servicing, wear items, tires and unscheduled repair",
          "Escalating annual schedule — low in the warranty years, rising steeply from year four",
        ],
        [
          "<strong>Finance interest</strong>",
          "The interest portion of loan payments only, never the principal",
          "Derived from a full monthly amortization schedule, not an approximation",
        ],
        [
          "<strong>Taxes &amp; fees</strong>",
          "Sales tax on purchase, annual registration, and dealer fees where you enter them",
          "Sales tax charged once at purchase; registration charged every year of ownership",
        ],
      ]
    )}

    <p>Principal repayment is deliberately excluded from the total. Paying down a loan converts cash into equity; it is a transfer, not a cost. Counting it would double-count the vehicle, because depreciation already charges you for the value the car loses. Interest is the genuine cost of borrowing and is counted in full.</p>

    ${callout(
      "What the model does not charge you for",
      `<p style="margin:0 0 10px">Three things are left out on purpose, and you should know which.</p>
      <ul class="bullets" style="margin:0"><li><strong>Opportunity cost of the down payment.</strong> Real, but it depends on what you would otherwise have done with the money. Some calculators expose it as an optional line; the headline total never includes it.</li>
      <li><strong>Parking, tolls and fines.</strong> Location-specific to the point of meaninglessness at national scale. The <a href="/calculators/monthly-budget/">transportation budget calculator</a> is where these belong.</li>
      <li><strong>Your time.</strong> Servicing appointments, fuel stops and charging waits all cost something. We do not attempt to price them.</li></ul>`
    )}

    <h2>The canonical assumptions</h2>
    <p>Every calculator on the site starts from the same defaults. This is not a stylistic choice — it is the reason results from different tools can be laid side by side without silently contradicting one another. If the <a href="/calculators/cost-per-mile/">cost per mile calculator</a> and the <a href="/calculators/true-cost-to-own/">true cost to own calculator</a> disagreed about the price of gas, both would be wrong.</p>
    <p>Every one of these is editable. They are starting points, not verdicts.</p>

    ${table(
      ["Assumption", "Default value", "Basis"],
      [
        ["Vehicle price", "$34,000", "Approximate mid-market new-vehicle transaction price"],
        ["Down payment", "$3,400", "10% of purchase price"],
        ["Loan APR", "7.2%", "Representative new-car rate for prime credit"],
        ["Loan term", "60 months", "The most common new-car term in the US market"],
        ["Ownership period", "5 years", "The standard comparison window across the industry"],
        ["Annual miles", "12,000", "Below the 15,000 AAA basis; closer to typical US household use"],
        ["Depreciation", "20% in year one, 15% of the remaining value each year after", "≈42% of purchase price retained at five years"],
        ["Combined fuel economy", "30 MPG", "Mixed-fleet combined figure for a mainstream vehicle"],
        ["Gasoline price", "$4.00 / gal", "The round figure nearest the EIA national average for regular unleaded"],
        ["EV efficiency", "28 kWh / 100 mi (32 at the plug)", "Rated consumption plus a charging-loss allowance"],
        ["Home electricity", "$0.175 / kWh", "National residential average"],
        ["Public charging", "$0.32 / kWh Level 2 · $0.48 / kWh DC fast", "Typical published network pricing"],
        ["Full-coverage insurance", "$2,496 / yr (~$208 / mo)", "Mid-point of the published national range"],
        ["Maintenance, repairs &amp; tires", "$1,250 in year one, +12% a year", "$7,941 over five years &mdash; a $1,588 annual average"],
        ["Sales tax", "7%", "Approximate national average combined rate"],
        ["Registration", "$220 / yr", "Charged every year of ownership"],
        ["Doc, title &amp; dealer fees", "$700", "Charged once, on the calculators that ask for it &mdash; see the note below the benchmark"],
      ]
    )}

    <h2>The depreciation model</h2>
    <p>Depreciation is the largest cost of new-car ownership and the only one that never arrives as a bill. The model uses a declining-balance curve: a steep first-year drop, then a constant percentage of whatever value remains.</p>

    ${callout(
      "The depreciation formula",
      fx([
        "V(1) = P &times; 0.80",
        "V(n) = P &times; 0.80 &times; 0.85^(n &minus; 1)&nbsp;&nbsp;for n &ge; 1",
        "",
        "Depreciation over n years = P &minus; V(n)",
      ]) +
        `<p style="margin:12px 0 0">Where P is the purchase price and n is the number of years owned. A $34,000 vehicle retains $27,200 after one year, $23,120 after two, $19,652 after three, $16,704 after four and <strong>$14,199 after five</strong> — 41.8% of what you paid.</p>`
    )}

    <p>Declining balance is used rather than straight-line because it matches how the used market actually behaves. A car does not lose a fixed number of dollars each year; it loses a share of what it is currently worth, and the largest share goes first. Straight-line depreciation makes three-year-old cars look worse than they are and eight-year-old cars look far worse than they are.</p>
    <p>The 20/15 curve is a mainstream-vehicle average. Real retention varies enormously by segment, and the <a href="/calculators/depreciation/">depreciation calculator</a> lets you set the curve yourself. As a guide to what actual segments do over five years:</p>

    ${table(
      ["Segment", "Typical 5-year value retained", "Implication"],
      [
        ["Pickup trucks", "55–65%", "The strongest retention in the market, by a clear margin"],
        ["Body-on-frame SUVs", "50–60%", "Strong, particularly for off-road-capable models"],
        ["Compact and mid-size SUVs", "45–55%", "Close to the model default"],
        ["Mainstream sedans", "40–50%", "The default curve sits at the top of this band"],
        ["Electric vehicles", "30–45%", "Wide spread; battery and technology risk are priced in"],
        ["Luxury sedans", "30–40%", "The steepest curve in the market"],
      ],
      [1]
    )}

    <h2>The finance model</h2>
    <p>Loan interest is computed from a standard monthly amortization schedule. The model does not use simple interest, add-on interest, or the shortcut of multiplying the balance by the rate — all three overstate or understate the true figure, sometimes badly.</p>

    ${callout(
      "The amortization formula",
      fx([
        "i = APR &divide; 12",
        "M = P &times; i &divide; (1 &minus; (1 + i)^&minus;n)",
        "",
        "Total interest = (M &times; n) &minus; P",
      ]) +
        `<p style="margin:12px 0 0">Where P is the amount financed, i the monthly periodic rate, n the term in months and M the level monthly payment. For the benchmark — $33,680 financed at 7.2% over 60 months — M is $670.09, total repaid is $40,205, and <strong>total interest is $6,525</strong>.</p>`
    )}

    <p><strong>P is the out-the-door price minus your down payment, not the sticker price minus your down payment.</strong> Sales tax and dealer fees are financed into the loan in almost every real transaction, which means you pay interest on them for the life of the loan. For the benchmark that is $34,000 plus $2,380 of sales tax plus $700 in doc and title fees — $37,080 out the door — less $3,400 down, so <strong>$33,680</strong> is financed. Modeling it the other way understates the payment by $61 a month, and it makes two calculators on the same site return different answers for the same deal. Every tool here that models a loan uses the out-the-door basis.</p>

    <p>Each month, interest is charged on the outstanding balance and the remainder of the payment reduces principal. Because the balance falls, the interest share of every payment falls with it. This is why early payments are mostly interest and late payments are mostly principal, and why paying extra early is worth far more than paying extra late. The <a href="/calculators/auto-loan/">auto loan calculator</a> shows the full schedule month by month.</p>

    <h2>Fuel, energy, insurance, maintenance and taxes</h2>

    <h3>Fuel and charging</h3>
    <p>Combustion fuel cost is annual miles divided by combined MPG, multiplied by price per gallon. For the benchmark that is 12,000 ÷ 30 × $4.00 = $1,600 a year, or $8,000 over five years. Electricity is modeled from consumption at the plug rather than at the wheel: a vehicle rated at 28 kWh per 100 miles is charged at 32 kWh per 100 miles to account for charging and thermal losses, which are real and typically run 10–15%. Ignoring them understates EV running cost by roughly the same margin. See <a href="/calculators/fuel-cost/">fuel cost</a>, <a href="/calculators/ev-charging/">EV charging</a> and the <a href="/fuel-and-ev/">fuel and EV hub</a>.</p>

    <h3>Insurance</h3>
    <p>Insurance is held flat at the annual premium across the ownership period. In reality premiums drift with vehicle age, claims history and the carrier's rate filings, but the direction is not reliably predictable and modeling a trend would add false precision. The <a href="/calculators/insurance-estimator/">insurance estimator</a> produces a starting figure from vehicle type, driver profile and coverage level. It is a model, not a quote — see the limitations below.</p>

    <h3>Maintenance</h3>
    <p>Maintenance is not flat. New vehicles are cheap to run under warranty and expensive after it, and a model that averages the two hides the shape that matters most to buyers. The schedule starts low, rises modestly through years two and three, and steps up from year four as tires, brakes, fluids and the first non-warranty repairs arrive together. The base is $1,250 in the first year and the schedule compounds at 12% a year, which gives $1,250, $1,400, $1,568, $1,756 and $1,967 &mdash; <strong>$7,941</strong> across five years, or an average of <strong>$1,588</strong>. That average is the figure quoted as a single-number planning allowance elsewhere on the site; the escalating schedule is what the calculators actually run. The <a href="/calculators/maintenance-cost/">maintenance calculator</a> and the <a href="/maintenance/">maintenance hub</a> break the schedule down by system.</p>

    <h3>Taxes and fees</h3>
    <p>Sales tax is charged once, at the default 7% rate on the purchase price — $2,380 on a $34,000 vehicle. Registration is charged annually at $220, which is $1,100 across five years. Doc, title and dealer fees are charged once, at a default of $700. The benchmark's taxes and fees line is the sum of those three: <strong>$4,180</strong>. Dealer fees are the default most worth replacing with a local figure: they run from negligible to several hundred dollars depending on the state and the dealer, and several states cap them by statute.</p>
    <p>That $4,180 is the cash amount of the tax, registration and fees. It is not the whole cost of them, because the tax and the dealer fee are financed rather than paid at signing in almost every real transaction — so you also pay 7.2% interest on $3,080 of it for five years. That interest is counted once, in the finance line, not here, so nothing is double-counted. Every calculator on this site that models a loan — <a href="/calculators/true-cost-to-own/">True Cost to Own</a>, <a href="/calculators/cost-per-mile/">Cost Per Mile</a>, <a href="/calculators/auto-loan/">Auto Loan</a>, <a href="/calculators/affordability/">Affordability</a>, <a href="/calculators/new-vs-used/">New vs Used</a> and <a href="/calculators/ten-year-cost/">Ten-Year Cost</a> — finances the out-the-door price on this same basis, which is why all six return an identical monthly payment for an identical deal. If you pay the tax and fees in cash at signing, or your state taxes the price net of trade-in, or your state caps the doc fee below $700, change the inputs: every one of them is editable, and the benchmark is only a starting point.</p>

    <h2>The published benchmark</h2>
    <p>One worked example runs through the entire site. Every figure quoted anywhere on MyDrivingCost.com is reconcilable with it. If you find a page that contradicts these numbers, that page is wrong and we would like to hear about it via <a href="/contact/">the contact page</a>.</p>
    <p>A <strong>$34,000 SUV</strong>, bought new with $3,400 down, with 7% sales tax and $700 in fees financed into the loan at 7.2% over 60 months, driven <strong>12,000 miles a year for five years</strong>, at 30 MPG combined and $4.00 a gallon:</p>

    <div class="grid grid-4" style="margin:22px 0 8px;gap:16px">
      <div class="stat-tile"><div class="k">Total 5-year cost</div><div class="v">$58,928</div><div class="d">all six categories</div></div>
      <div class="stat-tile"><div class="k">Cost per mile</div><div class="v">$0.98</div><div class="d">across 60,000 miles</div></div>
      <div class="stat-tile"><div class="k">Cost per year</div><div class="v">$11,786</div><div class="d">about $982 a month</div></div>
      <div class="stat-tile"><div class="k">Resale at year five</div><div class="v">$14,199</div><div class="d">41.8% retained</div></div>
    </div>

    ${table(
      ["Category", "5-year total", "Share of cost", "Derivation"],
      [
        ["Depreciation", "$19,801", "33.6%", "$34,000 purchase &minus; $14,199 residual"],
        ["Insurance", "$12,480", "21.2%", "$2,496 &times; 5 years"],
        ["Fuel", "$8,000", "13.6%", "60,000 mi ÷ 30 MPG × $4.00"],
        ["Maintenance &amp; repairs", "$7,941", "13.5%", "Escalating schedule, years 1–5"],
        ["Finance interest", "$6,525", "11.1%", "$33,680 at 7.2% over 60 months"],
        ["Taxes &amp; fees", "$4,180", "7.1%", "$2,380 tax + $1,100 registration + $700 fees"],
        ["<strong>Total</strong>", "<strong>$58,928</strong>", "<strong>100%</strong>", "Sub-totals rounded; the model carries unrounded values"],
      ],
      [1, 2],
      "The published five-year benchmark: a $34,000 SUV driven 12,000 miles a year, broken into the six modeled cost categories"
    )}

    <p>The point of publishing this is not the total. It is the shape. The monthly loan payment on this vehicle is $670.09, and the true monthly cost of running it is roughly $982. The payment is 68% of the cost — and the payment stops at month 60, while five of the six categories do not. Everything on this site follows from that gap.</p>

    <h2>Where the numbers come from</h2>
    <p>Our defaults are not invented. They are drawn from published national datasets, and where sources disagree we say so rather than picking the one that flatters the model.</p>

    ${table(
      ["Source", "What it reports", "How we use it"],
      [
        [
          "<strong>AAA, <em>Your Driving Costs</em> (2025)</strong>",
          "$11,577 per year and about 77¢ per mile at 15,000 miles a year, across a nine-category new-vehicle average. Depreciation $4,334/yr, finance charges $1,131/yr. Small sedan ≈56¢/mi; pickup ≈92¢/mi.",
          "The primary calibration check on our totals. Our benchmark reads higher per mile (98¢) chiefly because we assume 12,000 miles a year rather than 15,000 — fixed costs spread over fewer miles.",
        ],
        [
          "<strong>Insurify (July 2026)</strong>",
          "$2,237 a year for full coverage nationally.",
          "The lower bound of our insurance range.",
        ],
        [
          "<strong>Insurance.com (2026)</strong>",
          "$2,578 a year nationally, from $1,660 in Vermont to $3,999 in Louisiana.",
          "The upper bound, and the source of our state-spread commentary. See the <a href=\"/insurance/\">insurance hub</a>.",
        ],
        [
          "<strong>EIA weekly retail gasoline series</strong>",
          "US regular all formulations, published every week and running close to $4.00 a gallon through 2026.",
          "We default to the round $4.00 rather than the current reading &mdash; easy to reason about, easy to override, and it does not go stale week to week.",
        ],
        [
          "<strong>EPA fuel-economy ratings</strong>",
          "Combined MPG and kWh/100 mi by model.",
          "The basis for our efficiency defaults and the plug-loss adjustment.",
        ],
        [
          "<strong>Observed used-market retention</strong>",
          "Five-year value retention by segment.",
          "The basis for the 20/15 curve and the segment table above.",
        ],
      ]
    )}

    <p>On insurance our $2,496 default sits between the $2,237 and $2,578 published figures rather than at either end. That is a deliberate mid-point, not an average of two numbers we happened to find, and we would rather show you the range than pretend to a precision the market does not have.</p>

    <h2 class="mt-0">Known limitations</h2>
    <p>This is the section most sites leave out. A model that does not publish its failure modes is asking to be trusted on faith. Here is where ours is weakest.</p>

    ${callout(
      "The model does not know where you live",
      `<p style="margin:0">Almost every meaningful cost in vehicle ownership is set at the ZIP code level. Insurance is rated by ZIP. Fuel prices differ by more than a dollar a gallon between states. Sales tax ranges from zero to over 10% once local rates are added. Registration is a flat fee in some states and a percentage of vehicle value in others. Electricity ranges from about 11¢ to over 40¢ per kWh. Our defaults are national figures, and a national figure is, by construction, wrong for nearly everybody. It is wrong in a knowable direction, though — which is why every input is editable. Ten minutes spent replacing four defaults with your own numbers will improve the answer more than any refinement we could make to the model.</p>`,
      "warn"
    )}

    ${bullets([
      "<strong>National averages are not your averages.</strong> Every default in the table above is a central tendency across a very wide distribution. Treat the output as a starting point that you then correct with local knowledge, not as a personalized figure.",
      "<strong>Depreciation curves are typical, not guaranteed.</strong> The 20/15 curve describes how a mainstream vehicle has historically behaved. It cannot anticipate a model being discontinued, a recall, a fuel-price shock, a subsidy change or a supply squeeze that inverts the used market for two years. Residual value is a forecast, and forecasts are wrong.",
      "<strong>The insurance estimator is a model, not a quote.</strong> It cannot see your driving record, your credit-based insurance score, your claims history, your exact vehicle trim or the rate filings your carrier made last month. Any of those can move a real premium by hundreds of dollars a year in either direction. Use it to compare vehicles against one another; never use it as a substitute for an actual quote before you commit.",
      "<strong>Some calculators use first-month approximations.</strong> Where a tool displays a single headline monthly figure — a first-month interest and principal split, or a first-year monthly running cost — it is computed for that period alone and is not the average across the term. Interest falls every month as the balance amortizes, and maintenance rises every year as the vehicle ages. The full-term totals are always the authoritative numbers.",
      "<strong>Insurance is held flat.</strong> Premiums in the model do not change over the ownership period. Real premiums drift, and for most drivers they drift upward.",
      "<strong>Maintenance is a schedule, not a prediction.</strong> The escalating curve reflects typical costs by vehicle age. It cannot know that your transmission will fail in year six, and it cannot know that it will not.",
      "<strong>We do not price your time or your risk tolerance.</strong> A cheaper car that strands you twice a year is not cheaper in any sense that matters. The model has no way to see that.",
      "<strong>Tax treatment is simplified.</strong> We charge sales tax on the full purchase price. Many states tax the price net of trade-in, some cap the taxable amount, and business use may be deductible. Check your own state before relying on the figure.",
    ])}

    <h2>How often this changes</h2>
    <p>Rarely, and that is a design decision rather than neglect. A calculator that chases this week&rsquo;s pump price is stale within the month and gives its user no way to tell. Everything on this site is built the other way round: the math is timeless, the defaults are deliberately round, and the visitor owns every input. A default of $4.00 a gallon is a fair starting point for years. A default of $4.13 is wrong almost immediately and looks authoritative while it is wrong.</p>

    ${table(
      ["What", "How it behaves", "When it changes"],
      [
        ["The formulas", "Amortization, the depreciation curve, cost per mile, cost of capital. Arithmetic, not data", "Never &mdash; they are as true in ten years as today"],
        ["Fuel and electricity defaults", "Round national reference points, editable on every page that uses them", "When the national average moves materially and stays there"],
        ["Insurance and maintenance defaults", "Mid-range national figures, sitting between the published studies rather than tracking one", "When a major study moves the whole range"],
        ["Interest rates and typical terms", "Representative rather than current; the field is the first thing most visitors change", "On a sustained shift in prevailing new-car lending"],
        ["Depreciation curve", "Structural &mdash; 20% in year one, 15% of the remainder thereafter. Reflects years of market behaviour", "Only on a structural change in the used market"],
        ["Factual corrections", "Treated separately from defaults entirely", "On receipt, as soon as we can verify the report"],
      ],
      null,
      "How each class of figure on this site behaves and what would cause it to change"
    )}

    <p>The practical consequence: a figure here changes when it stops being a fair starting point, not on a calendar. When one does change, every page that quotes it changes in the same pass, so the site cannot contradict itself. Our approach to corrections, sourcing and independence is set out in full on the <a href="/editorial-standards/">editorial standards</a> page.</p>

    <h2>Using and citing these figures</h2>
    <p>You may cite any figure on this site — in a report, an article, a class, a spreadsheet or a negotiation — provided you attribute it to MyDrivingCost.com and link to the page it came from. We would rather be quoted accurately with a link than paraphrased without one. If you are citing the benchmark, cite it with its assumptions attached; a $58,928 five-year total means nothing without the 12,000 miles a year that produced it.</p>
    <p>If you find an error, tell us. Corrections go to <a href="/contact/">the contact page</a>, and verified ones are made promptly and noted.</p>

    ${sources([
      cite("AAA_YDC_2025", "$11,577 per year and approximately 77¢ per mile at 15,000 miles annually; depreciation $4,334/yr; finance charges $1,131/yr; small sedan \u224856¢/mi; pickup \u224892¢/mi."),
      cite("INSURIFY_AVG", "National full-coverage average of $2,237 per year as of July 2026 \u2014 the lower bound of the three studies we track."),
      cite("INSURANCECOM_AVG", "National full-coverage average of $2,578 per year, ranging from $1,660 in Vermont to $3,999 in Louisiana \u2014 the upper bound."),
      cite("VP_SOAI", "$2,496 a year, or about $208 a month. It sits between the other two, which is why it is the figure this site uses."),
      cite("EIA_GAS", "US regular all formulations, published weekly and running close to $4.00 a gallon through 2026."),
      cite("EPA_FE", "Combined MPG and kWh/100 mi figures behind the efficiency defaults."),
      cite("EIA_ELEC", "Residential electricity pricing \u2014 the basis for the $0.175/kWh home-charging default."),
      cite("KBB_DEP", "Observed used-vehicle retention by segment \u2014 the basis for the 20% / 15% declining-balance depreciation curve."),
      cite("FED_G19", "New-car lending rates and typical terms, behind the 7.2% APR and 60-month defaults."),
    ])}

  </div>
</section>

<section class="section-tight bg-subtle">
  <div class="container">
    <div class="section-head"><span class="eyebrow">See the model run</span><h2>The calculators this methodology describes</h2><p>Every tool below uses the assumptions published on this page, and lets you replace all of them.</p></div>
    ${calcTiles([
      ["/calculators/true-cost-to-own/", "chart", "True Cost to Own", "All six categories over your ownership period, with the full breakdown.", true],
      ["/calculators/cost-per-mile/", "route", "Cost Per Mile", "Every fixed and variable cost converted to a single per-mile number.", true],
      ["/calculators/depreciation/", "trend", "Depreciation", "The declining-balance curve, year by year, with an adjustable rate.", true],
      ["/calculators/auto-loan/", "dollar", "Auto Loan", "The full amortization schedule behind the interest figure above.", true],
    ])}
  </div>
</section>
`;

module.exports = {
  url: "/methodology/",
  title: "Methodology — How We Calculate Ownership Cost | MyDrivingCost",
  desc:
    "The complete model behind every calculator: six cost categories, all default assumptions, the formulas, our sources and the model's known limitations.",
  eyebrow: "Methodology",
  h1: "How we calculate the true cost of owning a car",
  h1short: "Methodology",
  lead:
    "Every assumption, every formula, every source, and every limitation of the model behind this site — published in full so you can check our arithmetic rather than take it on trust.",
  crumb: [],
  heroStats: [
    ["Benchmark 5-year cost", "$58,928", "$34,000 SUV, 12,000 mi/yr"],
    ["Cost per mile", "$0.98", "across 60,000 miles"],
    ["Cost categories modeled", "Six", "no hidden seventh line"],
    ["Last reviewed", "July 2026", "quarterly for market data"],
  ],
  heroCta: [
    ["Run the model", "/calculators/true-cost-to-own/", "btn-primary"],
    ["Editorial standards", "/editorial-standards/", "btn-ghost"],
  ],
  body,
  faqTitle: "Questions about the model",
  faqTitleShort: "Methodology FAQ",
  faq: [
    [
      "Why is your cost per mile higher than AAA's?",
      "Because we assume fewer miles. AAA's <em>Your Driving Costs</em> reports about 77¢ per mile at 15,000 miles a year; our benchmark reports 98¢ at 12,000. Fixed costs — depreciation, insurance, registration, interest — do not fall when you drive less, so spreading them over 20% fewer miles raises the per-mile figure substantially. Set our annual mileage to 15,000 and the two converge. The difference is arithmetic, not disagreement.",
    ],
    [
      "Why does the total exclude loan principal?",
      "Paying principal converts cash into equity in an asset you own; it is a transfer between two of your own accounts, not a cost. The cost of that asset losing value is already charged in full as depreciation, so counting principal too would bill you twice for the same vehicle. Interest is different — it is money that leaves and does not come back — and it is counted in full, derived from a complete monthly amortization schedule.",
    ],
    [
      "How accurate is the depreciation curve?",
      "It is a reasonable central estimate for a mainstream vehicle and it will be wrong for any specific car. The 20% first-year, 15%-of-remaining curve produces 41.8% retention at five years, which sits squarely in the observed band for compact and mid-size SUVs. Pickups routinely beat it by fifteen points; luxury sedans routinely miss it by ten. Use the segment table above to adjust, and treat any residual value as a forecast rather than a promise.",
    ],
    [
      "Is the insurance estimator a quote?",
      "No, and it cannot be. It has no access to your driving record, your claims history, your credit-based insurance score, your exact trim level or your carrier's current rate filings — and each of those can move a real premium by hundreds of dollars a year. Use the estimator to compare one vehicle against another under identical assumptions. Before you commit money, get an actual quote with your name, your ZIP code and your record on it.",
    ],
    [
      "Where does the $4.00 a gallon default come from?",
      "It is the round number nearest the national average. The EIA publishes a weekly retail price for US regular all formulations, and through 2026 it has sat close to $4.00 a gallon. We use the round figure rather than the current reading on purpose: a whole number is easier to reason about and easier to override, and it does not need revisiting every week. A ten-cent error either way moves the benchmark's five-year fuel cost by about $200 out of $58,928 &mdash; well inside the noise of the other assumptions. If your local price matters to you, change it; the field is editable on every fuel calculator.",
    ],
    [
      "How current are these figures, and how often do they change?",
      "Less often than you might expect, by design. Every default in the table above is a round national reference point chosen to stay reasonable across years &mdash; $4.00 a gallon, 30 MPG, 12,000 miles &mdash; rather than a reading of this week&rsquo;s market, so it does not go stale the way a spot price does. A figure changes when the national average behind it moves materially, which we treat as a sustained shift of more than 10%, and when that happens every page quoting it is updated in the same pass so the site cannot contradict itself. Verified factual corrections are made as soon as we can confirm them. What matters more than any update schedule is that all of these are editable fields: if you know your real fuel price, premium or APR, type it in and the whole model recomputes around it.",
    ],
    [
      "Can I use these numbers in my own work?",
      "Yes. Cite any figure from this site in a report, an article, a lesson or a negotiation, with attribution to MyDrivingCost.com and a link to the page it came from. Please carry the assumptions with the number: our benchmark's $58,928 five-year total is inseparable from the 12,000 miles a year, five-year hold and 7.2% APR that produced it. A figure quoted without its assumptions is not a figure, it is a rumor.",
    ],
  ],
  cta: {
    h2: "Now put your own numbers in",
    p: "The defaults above are a starting point. Replace four of them with your own and the answer gets materially better.",
    btn: ["Open True Cost to Own", "/calculators/true-cost-to-own/"],
  },
  schemaExtra: [
    {
      "@type": "TechArticle",
      "@id": SITE + "/methodology/#article",
      headline: "How we calculate the true cost of owning a car",
      description:
        "The complete cost-of-ownership model used by MyDrivingCost.com: assumptions, formulas, sources, benchmark and known limitations.",
      inLanguage: "en",
      datePublished: "2026-01-15",
      dateModified: "2026-07-23",
      author: { "@id": SITE + "/#org" },
      publisher: { "@id": SITE + "/#org" },
      isPartOf: { "@id": SITE + "/#website" },
      mainEntityOfPage: { "@id": SITE + "/methodology/" },
      about: [
        { "@type": "Thing", name: "Total cost of vehicle ownership" },
        { "@type": "Thing", name: "Vehicle depreciation" },
        { "@type": "Thing", name: "Auto loan amortization" },
      ],
    },
    {
      "@type": "Organization",
      "@id": SITE + "/#org",
      name: "MyDrivingCost.com",
      url: SITE + "/",
      slogan: "Know the Real Cost Before You Drive",
      email: "hello@mydrivingcost.com",
      publishingPrinciples: SITE + "/methodology/",
      ethicsPolicy: SITE + "/editorial-standards/",
    },
  ],
};
