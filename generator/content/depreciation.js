const P = require("../page");
const { table, callout, bullets, calcTiles, sources, cite } = P;

const body = `
<section class="section-tight">
  <div class="container container-narrow prose">

    <h2>The biggest cost of owning a car never appears on a bill</h2>
    <p>You will never write a check for depreciation. No one invoices you. It doesn't show up on a statement, and it isn't a line in any monthly budget app. It is, nonetheless, the largest single cost of owning a new vehicle — AAA puts it at about <strong>$4,334 a year</strong> for the average new car, comfortably ahead of fuel, insurance, financing or maintenance.</p>
    <p>You pay it all at once, at the end, in the form of a trade-in offer that's much lower than you expected. That delay is exactly why depreciation is the cost people underweight most, and why two cars with identical monthly payments can differ by ten thousand dollars in what they actually cost you.</p>

    <div class="grid grid-3" style="margin:26px 0 6px">
      <div class="stat-tile"><div class="k">Average new vehicle</div><div class="v">$4,334</div><div class="d">depreciation per year (AAA, 2025)</div></div>
      <div class="stat-tile"><div class="k">Typical first year</div><div class="v">18–22%</div><div class="d">of purchase price lost</div></div>
      <div class="stat-tile"><div class="k">Typical five years</div><div class="v">45–60%</div><div class="d">of purchase price lost</div></div>
    </div>

    <h2>The shape of the curve matters more than the total</h2>
    <p>Depreciation is not linear. A vehicle loses value fastest at the very beginning and progressively more slowly thereafter, which is why <em>when</em> you buy and <em>when</em> you sell dominate the outcome.</p>

    ${table(
      ["Year of ownership", "Typical value retained", "Value lost that year", "On a $40,000 car"],
      [
        ["At purchase", "100%", "—", "$40,000"],
        ["End of year 1", "80%", "20%", "−$8,000"],
        ["End of year 2", "69%", "11%", "−$4,400"],
        ["End of year 3", "60%", "9%", "−$3,600"],
        ["End of year 4", "52%", "8%", "−$3,200"],
        ["End of year 5", "45%", "7%", "−$2,800"],
        ["End of year 8", "30%", "~5%/yr", "−$6,000 over 3 yrs"],
        ["End of year 10", "22%", "~4%/yr", "−$3,200 over 2 yrs"],
      ],
      [1, 2, 3]
    )}
    <p class="text-muted" style="font-size:.88rem">Representative mainstream-vehicle curve. Individual models vary widely — see the segment table below.</p>

    <p>Read the fourth column again. The first year of ownership costs <strong>$8,000</strong>. The fifth year costs <strong>$2,800</strong>. The ninth costs about <strong>$2,000</strong>. Same car, same garage, radically different cost of holding it — and this single fact drives almost every practical decision about buying, keeping and selling vehicles.</p>

    ${callout(
      "Why a three-year-old car is usually the value sweet spot",
      `<p style="margin:0">Buy a $40,000 car new and hold it five years: you lose about $22,000. Buy that same car at three years old for $24,000 and hold it five years, to age eight: you lose about $12,000. You got five years of driving in the identical vehicle for roughly $10,000 less, and you skipped the steepest part of the curve entirely. The trade-offs are real — shorter remaining warranty, unknown service history, higher finance rates on used vehicles — but the depreciation gap is large enough to absorb them for most buyers.</p>`
    )}

    <h2>What determines how fast a specific car falls</h2>

    <h3>Segment and body style</h3>
    <p>Depreciation varies enormously by category, and the differences are stable enough to plan around.</p>
    ${table(
      ["Segment", "Typical 5-year value retained", "Why"],
      [
        ["Full-size &amp; midsize pickups", "55–65%", "Durable demand, long service lives, strong used market, work utility"],
        ["Compact &amp; midsize SUVs", "48–58%", "The center of consumer demand; deep, liquid used market"],
        ["Hybrids (mainstream)", "48–58%", "Fuel-cost hedging keeps used demand strong"],
        ["Mainstream sedans", "42–52%", "Shrinking new demand, but reliable models hold up well"],
        ["Electric vehicles", "30–45%", "Fast technology turnover, incentive-distorted pricing, battery-life uncertainty"],
        ["Luxury sedans &amp; large luxury", "30–40%", "High original price, high running costs, out-of-warranty repair fear"],
        ["Exotics &amp; limited-production", "Highly variable", "Some appreciate; most fall hard and then flatten"],
      ],
      [1]
    )}

    <h3>Reputation for reliability</h3>
    <p>Used buyers are, on the whole, more price-sensitive and more risk-averse than new buyers. They pay a premium for models with a public reputation for lasting, and they discount heavily for models known for expensive failures. That reputation is worth thousands of dollars at resale and it is the most predictable of all the factors — it rarely changes fast.</p>

    <h3>Incentives on the new version</h3>
    <p>A manufacturer's rebate on the current model year sets a ceiling on what anyone will pay for a used one. Heavy, sustained incentives compress used values across the entire recent range of that model. This is a large part of why depreciation on some electric vehicles has been steep — aggressive new-vehicle discounting and shifting tax-credit eligibility repriced the used market underneath existing owners.</p>

    <h3>Mileage</h3>
    <p>The usual reference point is 12,000–15,000 miles a year. Meaningfully above that and you'll be discounted; meaningfully below and you'll be rewarded, though not proportionally. Age and mileage are partly substitutes in a buyer's mind: a five-year-old car with 30,000 miles is worth more than one with 90,000, but not nearly twice as much.</p>

    <h3>Condition, color and options</h3>
    ${bullets([
      "<strong>Condition</strong> is worth more than most sellers think. Cosmetic damage, a filthy interior and warning lights on the dash invite lowball offers far in excess of the actual repair cost.",
      "<strong>Color</strong> is worth real money at the margins. White, black, silver and gray sell fastest and hold value best; bold colors narrow the buyer pool and typically cost you at resale, though they can help on sports cars.",
      "<strong>Options</strong> almost never return their cost. A $3,000 package might add $700 to resale five years later. Buy options because you want them, not as an investment.",
      "<strong>Service records</strong> are close to free money. Documented maintenance measurably raises what private buyers will pay and shortens the time to sell.",
    ])}

    <h2>The lease connection</h2>
    <p>A lease payment is, at its core, a bill for depreciation plus interest. The lender estimates the car's value at lease end — the <strong>residual value</strong> — and charges you the difference between the capitalized cost and that residual, spread over the term, with a finance charge on top.</p>
    <p>Which produces a rule that surprises people: <strong>the best lease deals are on cars that depreciate slowly</strong>, because a high residual means a small gap to pay for. Cars with terrible resale value make terrible leases, not cheap ones — the low residual means you're financing a huge drop. Manufacturers sometimes override this with subsidized residuals to move inventory, and when they do, leasing a fast-depreciating car can be the correct choice precisely because someone else is absorbing the loss. Compare the actual numbers in the <a href="/calculators/lease-vs-buy/">Lease vs Buy calculator</a>.</p>

    <h2>Being underwater, and why it happens</h2>
    <p>A vehicle loses about 20% of its value in year one. A long loan with a small down payment pays off principal much more slowly than that. The result is <strong>negative equity</strong> — owing more than the car is worth — and long loan terms have made it common.</p>
    <p>The table below runs four versions of the same $38,000 purchase. Every row assumes 7% sales tax and $700 in doc, title and registration fees financed into the loan, which is what almost everyone actually does, and values the car on this site's standard curve — 20% off in year one, 15% of the remainder each year after, so $25,840 at the two-year mark. You can reproduce any row in the <a href="/calculators/auto-loan/">Auto Loan calculator</a> by entering the price, the down payment, the rate and the term.</p>
    ${table(
      ["Deal", "Loan term", "Down payment", "Position at 24 months", "Months underwater"],
      [
        ["$38,000 at 7.0% APR", "48 months", "$7,600 (20%)", "+$7,784", "None — above water throughout"],
        ["$38,000 at 7.5% APR", "60 months", "$3,800 (10%)", "+$1,645", "14 — months 3 to 16"],
        ["$38,000 at 8.0% APR", "72 months", "Nothing down", "−$3,865", "40 — months 1 to 40"],
        ["$38,000 at 8.5% APR", "84 months", "Nothing down", "−$6,085", "55 — months 1 to 55"],
      ],
      [3],
      "Equity position two years into four different loans on the same $38,000 vehicle, financing tax and fees"
    )}
    <p>Two things in that table are worth sitting with. The first is that the 10%-down, 60-month buyer looks fine at the two-year mark — $1,645 to the good — but was underwater for fourteen months on the way there, bottoming out around $727 in the hole at month 12. Starting above water is not the same as staying above water, because first-year depreciation moves faster than early principal. The second is that the down payment does more work than the rate: the gap between the first row and the last is $13,869 of equity, and only 1.5 percentage points of interest rate.</p>
    <p>Negative equity isn't merely uncomfortable — it removes your options. You can't sell without writing a check. You can't easily trade without rolling the shortfall into the next loan, which starts the next car underwater on day one. And if the car is totaled, your insurer pays actual cash value, not your loan balance, leaving you owing money on a car you no longer have. That's the gap that gap insurance exists to close.</p>

    ${callout(
      "Three rules that keep you right side up",
      `<p style="margin:0">Put at least 20% down. Keep the term at 60 months or less — 48 if you can. And never roll negative equity from one loan into the next; if the numbers don't work, keep the current car until they do. Following all three costs more per month and less per year.</p>`,
      "warn"
    )}

    <h2>How to lose less to depreciation</h2>
    ${bullets([
      "<strong>Buy at two to four years old.</strong> You skip the steepest section of the curve and typically get the same car for 55–70% of its original price.",
      "<strong>Keep cars longer.</strong> Every additional year you hold a vehicle averages the front-loaded loss over more time. A car held ten years costs far less per year than the same car held three.",
      "<strong>Choose segments and models with strong resale.</strong> Trucks and mainstream SUVs from reliable brands consistently retain more. The premium you pay up front is usually smaller than the resale gap.",
      "<strong>Watch incentives before buying used.</strong> If the new version is being discounted heavily, wait — the used market will follow it down.",
      "<strong>Sell privately when you can.</strong> The spread between a trade-in offer and a private-party sale is commonly 10–20% of the vehicle's value. Weigh that against sales-tax credit on a trade-in, which is substantial in many states.",
      "<strong>Maintain it and keep the records.</strong> Deferred maintenance shows, and buyers price uncertainty aggressively.",
      "<strong>Be wary of buying at a market peak.</strong> Vehicles bought during supply shocks at inflated prices depreciate toward the normal curve, not from it — the extra you paid evaporates first.",
    ])}

    <h2>A worked example</h2>
    <p>Two buyers, both spending about $500 a month, both driving 12,000 miles a year.</p>
    ${bullets([
      "<strong>Buyer A</strong> buys a new $42,000 SUV and keeps it three years. It's worth roughly $25,200 at trade-in. Depreciation cost: <strong>$16,800, or $5,600 a year.</strong>",
      "<strong>Buyer B</strong> buys the same model at three years old for $25,200 and keeps it five years, to age eight. It's worth roughly $12,600. Depreciation cost: <strong>$12,600, or $2,520 a year.</strong>",
      "Buyer B drove longer, in the same vehicle, and lost <strong>$3,080 less per year</strong> — about $15,400 over the period.",
    ])}
    <p>Buyer A got a factory warranty, current technology and a car nobody else had driven. Those things have value. They just aren't free, and the price is roughly $3,000 a year. Knowing that number is the point — see yours in the <a href="/calculators/depreciation/">Depreciation calculator</a>.</p>

    ${sources([
      cite("AAA_YDC_2025", "Depreciation of $4,334 per year for the average new vehicle at 15,000 miles annually, down from $4,680 in the prior year."),
      cite("KBB_DEP", "Value-retention ranges across US market segments; individual models vary substantially within each band."),
      cite("BLS_MLR_DEP", "A useful counterweight \u2014 depreciation measured as consumption rather than as a resale price."),
      'Loan-equity scenarios are computed with standard amortization at the stated APR and term; see the <a href="/calculators/auto-loan/">Auto Loan calculator</a> for your own figures.',
      "Depreciation is inherently a forecast. Treat every retained-value figure here as a planning baseline, not a prediction for a specific VIN.",
    ])}

  </div>
</section>

<section class="section-tight bg-subtle">
  <div class="container">
    <div class="section-head"><span class="eyebrow">Run the numbers</span><h2>Depreciation calculators</h2><p>Model the curve for your vehicle, your holding period and your mileage.</p></div>
    ${calcTiles([
      ["/calculators/depreciation/", "trend", "Depreciation Calculator", "Year-by-year value curve, total value lost and cost per year of holding.", true],
      ["/calculators/true-cost-to-own/", "chart", "True Cost to Own", "Depreciation alongside fuel, insurance, maintenance, financing and taxes.", true],
      ["/calculators/lease-vs-buy/", "scale", "Lease vs Buy", "Because a lease payment is a depreciation bill with interest attached.", true],
      ["/calculators/new-vs-used/", "layers", "New vs Used", "Quantify what skipping the first three years is actually worth."],
    ])}
  </div>
</section>
`;

module.exports = {
  url: "/depreciation/",
  title: "Car Depreciation Explained — How Value Falls | MyDrivingCost",
  desc:
    "How fast cars lose value, why depreciation is the largest cost of new-car ownership, which segments hold value best, and how to lose less of your money.",
  eyebrow: "Depreciation",
  h1: "Depreciation: the biggest cost nobody bills you for",
  h1short: "Depreciation",
  lead:
    "The average new vehicle loses about $4,334 a year to depreciation — more than fuel, insurance or financing. Here's the shape of the curve, what drives it, and how to keep more of your money.",
  crumb: [],
  heroStats: [
    ["Average new vehicle", "$4,334", "depreciation per year"],
    ["First year alone", "18–22%", "of purchase price"],
    ["After five years", "45–60%", "of purchase price gone"],
  ],
  heroCta: [
    ["Open depreciation calculator", "/calculators/depreciation/", "btn-primary"],
    ["See total cost to own", "/calculators/true-cost-to-own/", "btn-ghost"],
  ],
  body,
  faqTitle: "Depreciation questions",
  faq: [
    [
      "How much value does a new car lose in the first year?",
      "Typically 18–22% of the purchase price, though the range across models is wide. On a $40,000 vehicle that's roughly $8,000 gone in twelve months — more than most owners spend on fuel and insurance combined in the same period. The drop is steepest at the moment of sale and then decelerates every year afterward.",
    ],
    [
      "What is the average depreciation cost per year?",
      "AAA's research puts depreciation at about $4,334 per year for the average new vehicle driven 15,000 miles annually. That figure is an average across the first five years of ownership; the actual year-one cost is much higher and the year-five cost much lower, because the curve is front-loaded rather than straight-line.",
    ],
    [
      "Which vehicles hold their value best?",
      "Full-size and midsize pickups lead consistently, often retaining 55–65% after five years, followed by mainstream compact and midsize SUVs and reliable hybrids. The weakest retention tends to be found in luxury sedans, large luxury vehicles and — recently — many electric vehicles, where fast technology turnover and heavy new-vehicle incentives have pushed used values down.",
    ],
    [
      "Is it cheaper to buy a used car because of depreciation?",
      "Usually, yes, and the gap is large. A car bought at three years old and held for five typically loses roughly half what the same car loses if bought new and held five years. You give up warranty coverage, a known service history and current technology, and used-car loan rates run higher — but for most buyers the depreciation saving comfortably exceeds those costs.",
    ],
    [
      "Why do EVs depreciate faster?",
      "Several forces compound. Battery and charging technology improves quickly, so a four-year-old EV competes against a meaningfully better new one. Aggressive new-vehicle discounting and shifting tax-credit eligibility reset used prices underneath existing owners. And used buyers still price in uncertainty about battery longevity and out-of-warranty replacement cost. The picture varies a lot by model, so check the specific vehicle rather than the category.",
    ],
    [
      "Does mileage or age hurt value more?",
      "Both matter and they interact. Age drives the underlying curve — a car is worth less each year regardless of use — while mileage adjusts around it, benchmarked against roughly 12,000–15,000 miles per year. Very low mileage helps but not proportionally: a five-year-old car with 30,000 miles is worth more than one with 90,000, but nowhere near twice as much.",
    ],
    [
      "How do I avoid being underwater on my car loan?",
      "Put at least 20% down, keep the term to 60 months or less, and never roll negative equity from an old loan into a new one. Long terms with small down payments pay principal down more slowly than the vehicle loses value, which is exactly how owners end up owing thousands more than the car is worth — and unable to sell or trade without writing a check.",
    ],
    [
      "Do options and upgrades hold their value?",
      "Rarely in proportion to what they cost. A $3,000 option package might add a few hundred dollars to resale value five years on. The exceptions are features that broaden the buyer pool in a given market — all-wheel drive in snow regions, a tow package on a truck, a popular powertrain choice. Buy options because you'll enjoy them, not as an investment.",
    ],
  ],
  cta: {
    h2: "See what your car will really be worth",
    p: "Model the depreciation curve for your vehicle, then see how it stacks up against every other cost of ownership.",
    btn: ["Open the depreciation calculator", "/calculators/depreciation/"],
  },
};
