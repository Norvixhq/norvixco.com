const C = require("../calcpage");
const { num, rng, seg, group, advanced, hero, tiles, chartCard, callout, bullets, table, } = C;

/* ------------------------------------------------------------------ HTML -- */

const inputs = [
  group(
    "The vehicle",
    [
      num("price", "Price paid", 34000, { prefix: "$", min: 1000, step: 500 }),
      num("down", "Down payment", 3400, { prefix: "$", min: 0, step: 250 }),
      rng("apr", "Loan APR", 7.2, { min: 0, max: 20, step: 0.1, initial: "7.2%", help: "Set this to 0 if you paid cash. Interest then drops out of every year." }),
      seg("term", "Loan term", [["48", "48 mo"], ["60", "60 mo"], ["72", "72 mo"]], "60"),
      rng("miles", "Annual miles", 12000, { min: 2000, max: 40000, step: 500, initial: "12,000 mi/yr" }),
      num("mpg", "Combined MPG", 30, { min: 5, max: 150, step: 1 }),
      num("gasPrice", "Fuel price", 4.0, { prefix: "$", suffix: "/gal", min: 1, max: 12, step: 0.05 }),
    ].join("\n              ")
  ),
  group(
    "The horizon",
    [
      rng("years", "Years you'll keep it", 10, {
        min: 5,
        max: 20,
        step: 1,
        initial: "10 years",
        help: "Drag it past ten. Every extra year you hold on makes every previous year cheaper.",
      }),
      seg(
        "segment",
        "Vehicle type",
        [
          ["truck", "Truck"],
          ["suv", "SUV"],
          ["sedan", "Sedan"],
          ["lux", "Luxury"],
          ["ev", "EV"],
        ],
        "suv"
      ),
      `<p class="field-help">Segment sets the depreciation curve: how much the vehicle loses in year one, and how fast that loss tapers once the value gets small.</p>`,
    ].join("\n              "),
    "var(--c-deprec)"
  ),
  advanced(
    [
      `<p class="field-help">A decade is long enough that the running costs stop being flat. Insurance falls as the vehicle depreciates, maintenance climbs as it ages, and registration tapers in most states. These are the escalators.</p>`,
      num("insurance", "Insurance, year one", 2496, { prefix: "$", suffix: "/yr", min: 0, step: 50, help: "Full coverage on a new vehicle. The national average is about $2,496." }),
      rng("insDrop", "Insurance falls by", 3.5, {
        min: 0,
        max: 8,
        step: 0.5,
        initial: "3.5% a year",
        help: "Comprehensive and collision are priced off the vehicle's value, so they shrink as it depreciates. Liability does not, which is why the premium never falls to nothing.",
      }),
      num("maint", "Maintenance, year one", 1250, { prefix: "$", suffix: "/yr", min: 0, step: 50, help: "Routine service, tires amortized, wear items. Low while the warranty is live." }),
      rng("maintEsc", "Maintenance rises by", 10, {
        min: 0,
        max: 20,
        step: 1,
        initial: "10% a year",
        help: "Compounding, so year ten runs roughly 2.4 times year one.",
      }),
      num("majorRepairs", "Major repair allowance", 900, { prefix: "$", suffix: "/yr after yr 8", min: 0, step: 100, help: "A sinking fund for the things that only break on old cars: a starter, a compressor, a suspension refresh." }),
      num("reg", "Registration &amp; fees", 220, { prefix: "$", suffix: "/yr", min: 0, step: 10 }),
      rng("regTaper", "Registration falls by", 6, { min: 0, max: 15, step: 1, initial: "6% a year", help: "Many states assess registration on vehicle value, so it declines with the car." }),
      num("salesTax", "Sales tax", 7, { suffix: "%", min: 0, max: 15, step: 0.25, help: "Charged once per vehicle. Buy three cars in a decade and you pay it three times." }),
      num("dealerFees", "Dealer &amp; title fees", 700, { prefix: "$", min: 0, step: 50 }),
    ].join("\n                  ")
  ),
].join("\n            ");

const results = [
  hero(
    "10-year cost summary",
    'Everything <span data-out="yearsLabel">10 years</span> of ownership costs',
    "total",
    "money",
    'That averages <strong class="num" data-out="perYear" data-fmt="money">—</strong> a year. But the first year alone costs <strong class="num" data-out="year1" data-fmt="money">—</strong> and the cheapest costs <strong class="num" data-out="cheapYearCost" data-fmt="money">—</strong> — a spread of <strong class="num" data-out="ratio" data-fmt="x1">—</strong>×.'
  ),
  tiles([
    ["Average per year", "perYear", "money", "Across the whole horizon"],
    ["Average per month", "perMonth", "money", "Everything, not just the payment"],
    ["Cost per mile", "perMile", "perMile", 'Over <span class="num" data-out="totalMiles" data-fmt="num">—</span> miles'],
  ]),
  chartCard(
    "The cumulative average — the only curve that matters",
    "What every year of ownership has cost you on average, recalculated at each anniversary",
    `<div id="avg-chart"></div>
          <p class="text-muted" style="font-size:.85rem;margin-top:14px">This is not the cost of each year. It is the average cost of <em>all years so far</em>, and it falls without interruption. Sell at the end of year three and your ownership cost <strong class="num" data-out="avg3" data-fmt="money">—</strong> a year. Hold to the end of year ten and the same vehicle, the same purchase, the same insurance, has cost <strong class="num" data-out="perYear" data-fmt="money">—</strong> a year. Every additional year retroactively makes every previous year cheaper, because the one enormous cost — buying the thing — gets divided by a larger number.</p>`
  ),
  chartCard(
    "Every year, every line",
    "Depreciation collapses, interest goes to zero, maintenance climbs — and the total still falls",
    `<div id="year-table"></div>`
  ),
  chartCard(
    "Three ways to spend a decade",
    "The same vehicle, the same miles, three different replacement habits",
    `<div class="breakdown" id="cycle-rows"></div>
          <p class="text-muted" style="font-size:.85rem;margin-top:14px" id="cycle-note"></p>`
  ),
  callout(
    "The cheapest year of ownership",
    `<span data-out="cheapYearLabel">Year 8</span> costs <strong class="num" data-out="cheapYearCost" data-fmt="money">—</strong>, against <strong class="num" data-out="year1" data-fmt="money">—</strong> for year one. Two things make it cheap. The loan finished in <span data-out="payoffLabel">year 5</span>, so interest is zero. And depreciation has fallen to <strong class="num" data-out="cheapDep" data-fmt="money">—</strong> — a modest percentage of an already small number, which is what a depreciation curve does once it flattens. You are still driving the same car you chose. It simply stopped being expensive.`
  ),
  chartCard(
    "Where a decade's money actually goes",
    "Every dollar over the full horizon, by category",
    `<div class="donut-wrap">
            <div id="donut"></div>
            <div class="breakdown" id="breakdown"></div>
          </div>`
  ),
  callout(
    "When one repair costs more than the car is worth",
    `This is the failure mode of long ownership, and almost everyone reasons about it wrongly. At the end of your horizon the vehicle is worth roughly <strong class="num" data-out="endValue" data-fmt="money">—</strong>. A $4,000 repair on a car worth that much sounds like madness, and every instinct says scrap it. <strong>The comparison is wrong.</strong> You are not choosing between the repair and the car's value — you are choosing between the repair and whatever replaces the car. Replacing this vehicle on a five-year cycle costs about <strong class="num" data-out="replaceMonthly" data-fmt="money">—</strong> a month, or <strong class="num" data-out="replaceYearly" data-fmt="money">—</strong> a year, all in. Any repair below that figure which buys you another year of reliable service is the cheaper option, whatever the car is worth. The number to beat is the cost per month of the replacement, not the resale value of the patient.`,
    "warn"
  ),
].join("\n\n        ");

const floatBar = `<div class="float-summary no-print" id="floatSummary" aria-hidden="true">
  <div class="fs-item"><span class="k">10-year total</span><span class="v num" data-out="total" data-fmt="money">—</span></div>
  <div class="fs-sep"></div>
  <div class="fs-item fs-hide-sm"><span class="k">Per month</span><span class="v num" data-out="perMonth" data-fmt="money">—</span></div>
  <button type="button" class="btn btn-primary btn-sm" data-scroll="calc">Edit</button>
</div>`;

/* ------------------------------------------------------------------ prose -- */

const prose = `
    <h2 id="how-it-works">Nobody models the second half</h2>
    <p>Almost every cost-of-ownership tool ever built stops at five years. Manufacturers quote five-year residuals, cost studies run five-year comparisons, and the finance office works in sixty-month blocks. That convention is not neutral. Five years is roughly the point at which a vehicle finishes paying for the expensive part of its life and begins the cheap part — so a model that stops there shows you the bill and hides the refund.</p>
    <p>Extend the horizon to ten years and the arithmetic changes character. On our benchmark $34,000 SUV, the first five years cost about <strong>$57,650</strong>, or $11,530 a year. The second five years cost about <strong>$39,000</strong>, or $7,800 a year. Same vehicle, same driver, same insurance company, same twelve thousand miles. The second half of the decade costs roughly two-thirds of what the first half cost, and it is not close.</p>
    <p>The mechanism is not mysterious. Three of the seven cost lines are front-loaded to an extreme degree: depreciation shrinks every year because it is a percentage of a falling value, interest reaches exactly zero the month the loan clears, and sales tax and dealer fees are charged once. Against that, only maintenance genuinely rises with age — and it climbs from a small base while depreciation falls from a large one. The race is not fair.</p>
    <p>What follows from that is the single most expensive habit in personal transport: replacing a car every three to five years means you only ever pay for the front half of the curve. You buy the cliff, then hand the car to somebody else at exactly the moment it was about to become cheap, and buy another cliff. Do that for a decade and it costs about <strong>$40,000 more</strong> than keeping one vehicle, for the same miles driven.</p>

    <h2 id="formula">The formula</h2>
    <p>The headline number this calculator produces is not the total. It is the <em>cumulative average</em> — total cost divided by years elapsed, recalculated at every anniversary.</p>
    ${callout(
      "Cumulative average at year N = (everything spent through year N) ÷ N",
      `<p style="margin:0 0 10px">Where the cost of any single year Y is the sum of seven lines:</p>
      <p style="margin:0 0 10px;font-family:var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);font-size:.9rem;line-height:1.8">depreciation (value at end of Y−1 minus value at end of Y)<br>+ loan interest paid during Y &nbsp;<em>(zero once the term ends)</em><br>+ insurance × (1 − annual decline)<sup>Y−1</sup><br>+ maintenance × (1 + annual escalation)<sup>Y−1</sup><br>+ major-repair allowance &nbsp;<em>(from year 9)</em><br>+ fuel &nbsp;<em>(miles ÷ MPG × price)</em><br>+ registration, plus sales tax and dealer fees in year one only</p>
      <p style="margin:0">Note what is <strong>not</strong> in that list: the loan principal. Repaying principal buys equity in an asset you will eventually sell, and depreciation already charges you for the value that does not come back. Counting both would bill you twice for the same car.</p>`
    )}
    <p>The cumulative average is the right lens because it answers the question owners actually face, which is never &ldquo;what will this cost over ten years?&rdquo; but always &ldquo;is it worth keeping this thing another year?&rdquo;. As long as the next year costs less than the running average, the average falls — and for a vehicle with no payment left, that holds for a very long time.</p>

    <h2 id="year-by-year">What each year of ownership actually costs</h2>
    <p>Here is the full decade for the benchmark vehicle: $34,000 SUV, $3,400 down, 7.2% over 60 months, 12,000 miles a year at 30 MPG and $4.00 a gallon, insurance starting at $2,496 and declining 3.5% a year, maintenance starting at $1,250 and rising 10%.</p>
    ${table(
      ["Year", "Depreciation", "Interest", "Insurance", "Maint. &amp; repairs", "That year", "Cumulative avg"],
      [
        ["1", "$6,800", "$2,236", "$2,496", "$1,250", "<strong>$17,682</strong>", "$17,682"],
        ["2", "$4,080", "$1,804", "$2,409", "$1,375", "$11,474", "$14,578"],
        ["3", "$3,468", "$1,340", "$2,324", "$1,513", "$10,439", "$13,198"],
        ["4", "$2,948", "$841", "$2,243", "$1,664", "$9,478", "$12,268"],
        ["5", "$2,506", "$305", "$2,164", "$1,830", "$8,577", "$11,530"],
        ["6", "$1,959", "$0", "$2,089", "$2,013", "$7,823", "$10,912"],
        ["7", "$1,542", "$0", "$2,016", "$2,214", "$7,524", "$10,428"],
        ["8", "$1,219", "$0", "$1,945", "$2,436", "<strong>$7,343</strong>", "$10,042"],
        ["9", "$967", "$0", "$1,877", "$3,579", "$8,157", "$9,833"],
        ["10", "$766", "$0", "$1,811", "$3,847", "$8,151", "<strong>$9,665</strong>"],
      ],
      [1, 2, 3, 4, 5, 6]
    )}
    <p>Fuel of $1,600 a year, registration, and $3,080 of sales tax and dealer fees in year one are inside the year totals but not shown as columns. The years nine and ten maintenance figures include the $900 major-repair allowance.</p>
    <p>Read the last two columns together. <strong>Year eight costs $7,343 — 42% of what year one cost.</strong> And the cumulative average never once rises, not even in year nine when a major repair allowance switches on and the annual cost jumps by $800. That is the whole argument in one column: a bad year late in ownership still lowers your lifetime average, because it is being averaged against a purchase you made a very long time ago.</p>
    <p>Notice too where the crossover happens. Depreciation exceeds maintenance in every year through year five and is beaten by it from year six onward. That is the pivot. Before it, you are mostly paying for the asset; after it, you are mostly paying to run it — and running a car has always been cheaper than owning a new one.</p>

    <h2 id="trade-cycle">The trade cycle, priced honestly</h2>
    <p>Put three habits side by side over the identical decade and the identical 120,000 miles. Keep one vehicle for ten years. Replace it every five. Replace it every three. Each replacement is a like-for-like vehicle at the same real price, financed the same way, with the outgoing car sold at its market value and the proceeds already credited.</p>
    ${table(
      ["Habit", "Cars bought", "Sales tax &amp; fees paid", "10-year total", "Per month", "Extra cost"],
      [
        ["Keep one car 10 years", "1", "$3,080", "<strong>$96,648</strong>", "$805", "—"],
        ["Replace every 5 years", "2", "$6,160", "$115,300", "$961", "+$18,652"],
        ["Replace every 3 years", "4", "$12,320", "$136,467", "$1,137", "<strong>+$39,819</strong>"],
      ],
      [1, 2, 3, 4, 5]
    )}
    <p>Three-year replacement costs <strong>41% more</strong> than single-vehicle ownership across the same decade. That gap is roughly the price of the car itself, spent on nothing but the privilege of always driving something recent.</p>
    <p>Three separate mechanisms drive it, and it is worth being precise about each. First, <strong>you re-enter the curve at its steepest point every time</strong>: the year-one depreciation of $6,800 is paid once if you keep the car and four times if you trade every three years. Second, <strong>transaction costs repeat</strong> — sales tax, title, documentation and the dealer's margin are charged per vehicle, not per decade, and $12,320 of tax and fees against $3,080 is a difference you can measure without any modeling at all. Third, <strong>you never own anything outright</strong>: on a five- or six-year loan traded at three years, the interest you pay is drawn entirely from the front of the amortization schedule, where almost all of it lives. A perpetual trade cycle is a subscription with extra steps, and it is priced like one.</p>
    <p>The model is, if anything, generous to the trade cycle: it assumes each replacement costs the same in today's dollars, that you put the same cash down every time, and that no negative equity is ever rolled forward — which on a 72-month loan traded at year three is optimistic bordering on fictional.</p>

    <h2 id="mix">The cost mix inverts around year six</h2>
    <p>Over five years, depreciation is the largest line on the bill — about 34% of everything, more than fuel and maintenance combined. That single fact underpins most received wisdom about car ownership. Over ten years it stops being true.</p>
    <p> Across the full decade the same vehicle's costs land at roughly 27% depreciation, 23% maintenance and repairs, 22% insurance, 17% fuel, 7% interest and 5% taxes and fees. Depreciation is no longer dominant; it is merely first among near-equals, and maintenance has almost caught it.</p>
    <p>That inversion has a practical consequence most long-term owners miss. In the first five years the lever that matters is <em>what you buy</em>. In the second five it is <em>insurance and maintenance</em> — the two lines still growing as a share of the total. Carrying comprehensive and collision on an eight-year-old car worth $9,000, with a $500 deductible, is frequently a bad trade: you are insuring against a maximum loss smaller than a few years of the premium difference. Reviewing that one decision at year seven is worth more than any amount of shopping for fuel.</p>

    <h2 id="better">How to make the back half cheap</h2>
    ${bullets([
      "<strong>Buy the vehicle you would still want at year eight.</strong> The decision that ruins long ownership is not mechanical, it is emotional — people replace cars they never really liked. Specify it properly once and the ten-year plan survives contact with reality.",
      "<strong>Finance no longer than 60 months, and pay it like 48.</strong> The whole thesis rests on years of payment-free ownership. A 72- or 84-month loan eats those years and pushes the payoff into the era when repairs start.",
      "<strong>Re-shop insurance at years five, seven and nine.</strong> Premiums are priced off vehicle value, but insurers do not always reprice as fast as the car depreciates. Dropping collision on a low-value vehicle, or raising the deductible, is the largest single saving available late in ownership.",
      "<strong>Build the repair sinking fund from year one.</strong> Set aside the difference between what maintenance actually costs early and what it will cost late — around $75 a month. A $2,800 repair is a crisis if it arrives as a surprise and a non-event if it arrives as a withdrawal.",
      "<strong>Do the deferred maintenance on schedule, especially fluids.</strong> Transmission and coolant services are the cheapest insurance policies in existence. Almost every catastrophic failure that ends a car prematurely was preceded by a service someone skipped.",
      "<strong>Find an independent mechanic before you need one.</strong> Out of warranty, dealer labor rates are the single largest controllable variable in the maintenance line — commonly 30 to 50% higher for identical work.",
      "<strong>Replace wear items with quality parts, not cheap ones.</strong> On a car you intend to keep, the second-cheapest brake job is usually the actual cheapest, because you will not be paying for it twice.",
      "<strong>Track cost per mile annually, not the repair bills.</strong> A $1,900 year on a paid-off vehicle feels expensive and is, in fact, half of what a payment alone would have cost. Judge the year against the alternative, not against zero.",
    ])}

    <h2 id="counter">The honest counter-arguments</h2>
    <p>The ten-year case is strong but it is not unconditional, and the objections deserve better than dismissal.</p>
    <p><strong>Reliability anxiety.</strong> This is the real one, and it is mostly a psychological cost rather than a financial one. The financial risk is bounded — the major-repair allowance is a reasonable estimate of it — but the risk of being stranded is not evenly distributed. If a breakdown means missing a shift you cannot miss, the premium for newness buys something real. Price it honestly, though: at $332 a month, the three-year cycle is a very expensive roadside assistance plan.</p>
    <p><strong>Safety technology.</strong> Over a decade this argument has genuine force. Automatic emergency braking, blind-spot monitoring, better structures and better airbags are meaningful, measurable improvements, and a 2016 car is materially less safe than a 2026 one. But the improvement is not linear and it is not annual. The gap between a car and its three-year-younger replacement is usually negligible; the gap across ten or twelve years is not. The rational response is a long cycle with a deliberate technology jump, not a short cycle that pays for a decade of change three years at a time.</p>
    <p><strong>The warranty.</strong> A factory warranty is worth real money in years one to five and nothing afterwards — precisely the period this calculator already prices as expensive. It does not extend the case for replacement; it explains why the early years cost what they cost. Extended warranties on older vehicles are, with rare exceptions, priced so the insurer wins.</p>
    <p><strong>When replacing early is simply correct.</strong> Three cases. A <em>genuinely unreliable vehicle</em> — not one that had a bad year, but one with a documented systemic fault — should go, because the repair distribution has no ceiling and the calculator's tidy allowance does not apply. A <em>change in needs</em> is not a financial decision at all: a third child or a 90-mile commute changes what the vehicle has to do, and no amount of averaging fixes a car that no longer fits. And a vehicle whose repair costs have entered the <em>luxury-European regime</em> — air suspension, adaptive dampers, twin-turbo V8s, $4,000 for a component that costs $600 on a mainstream car — often has a genuine economic cliff around year eight, where annual repair cost overtakes the depreciation you are avoiding. That is the one segment where the standard advice inverts, and it is why a cheap used luxury sedan is such a famous trap.</p>

    <h2 id="mistakes">Common mistakes</h2>
    ${callout(
      "Comparing a repair bill to the car's value",
      "It is the most common error in long-term ownership and it costs people thousands. A $3,500 transmission on a car worth $7,000 is not a 50%-of-value catastrophe; it is $146 a month if it buys two more years of driving, against roughly $960 a month for the replacement cycle it saves you from. The car's resale value is irrelevant to the decision, because you are not selling the car — you are comparing the repair against the cost per month of everything that would replace it. Ask what the repair buys in months, then divide.",
      "warn"
    )}
    ${bullets([
      "<strong>Counting the whole loan payment as a cost.</strong> Only the interest is spent. Principal converts cash into equity you recover at sale, and depreciation already accounts for the part you do not.",
      "<strong>Assuming maintenance grows without limit.</strong> It rises, but it plateaus. Once the major wear items have been replaced on a well-kept vehicle, years eleven through fifteen are frequently cheaper than years nine and ten. Long-horizon fear is usually calibrated to the worst year, not the average one.",
      "<strong>Treating the payoff date as the finish line.</strong> The month the loan clears is when ownership starts paying you back. Immediately replacing the car at that moment throws away the entire return on five years of payments.",
      "<strong>Comparing a new car's payment to an old car's repairs.</strong> The comparison must be like for like: the new car brings a payment, higher insurance, higher registration and its own year-one depreciation of nearly $7,000. Against that, an old car's $2,400 year is not close.",
      "<strong>Letting one expensive year overwrite the record.</strong> A single $3,000 repair feels decisive and moves the ten-year average by $300 a year. Judge the vehicle on its cumulative average, which is the number the chart above exists to show you.",
    ])}
`;

/* -------------------------------------------------------------------- JS -- */

const js = `/* 10-Year Car Cost Calculator — MyDrivingCost.com */
(function () {
  "use strict";
  var MDC = window.MDC, F = MDC.fmt, M = MDC.model;

  /* First-year and steady-state depreciation rates by segment. */
  var SEG = {
    truck: { d1: 16, dn: 11 },
    suv:   { d1: 20, dn: 15 },
    sedan: { d1: 21, dn: 16 },
    lux:   { d1: 25, dn: 18 },
    ev:    { d1: 26, dn: 17 }
  };

  var CATS = [
    { key: "dep",       label: "Depreciation",            css: "--c-deprec" },
    { key: "maint",     label: "Maintenance &amp; repairs", css: "--c-maint" },
    { key: "insurance", label: "Insurance",               css: "--c-insure" },
    { key: "fuel",      label: "Fuel",                    css: "--c-fuel" },
    { key: "interest",  label: "Loan interest",           css: "--c-finance" },
    { key: "fees",      label: "Taxes, fees &amp; registration", css: "--c-tax" }
  ];

  /* Depreciation rate for a given year of a vehicle's life. Year one is the
     cliff; years two to five run at the steady rate; from year six the rate
     itself tapers, because a curve applied to a small number flattens out. */
  function depRate(y, d1, dn) {
    if (y === 1) return d1;
    if (y <= 5) return dn;
    return Math.max(4, dn - (y - 5) * 1.2);
  }

  /* Interest paid in each calendar year of an amortized loan. Zero after the
     term ends — which is the single most important line in this model. */
  function interestByYear(principal, aprPct, term, years) {
    var out = [], pay = M.payment(principal, aprPct, term);
    var r = aprPct / 100 / 12, bal = principal, m = 0, y, k, ip;
    for (y = 1; y <= years; y++) {
      var acc = 0;
      for (k = 0; k < 12; k++) {
        m++;
        if (m > term || bal <= 0.01) continue;
        ip = bal * r;
        acc += ip;
        bal = Math.max(0, bal + ip - pay);
      }
      out.push(acc);
    }
    return out;
  }

  /* One complete ownership run: a brand-new vehicle held for n years. */
  function ownership(i, n) {
    var s = SEG[i.segment] || SEG.suv;
    var term = parseInt(i.term, 10) || 60;
    var upfront = i.price * i.salesTax / 100 + i.dealerFees;
    var financed = Math.max(0, i.price + upfront - i.down);
    var ints = interestByYear(financed, i.apr, term, n);
    var fuel = i.mpg > 0 ? (i.miles / i.mpg) * i.gasPrice : 0;
    var rows = [], ret = 1, value = i.price, floor = i.price * 0.08, y;
    for (y = 1; y <= n; y++) {
      ret *= 1 - depRate(y, s.d1, s.dn) / 100;
      var next = Math.max(floor, i.price * ret);
      var dep = Math.max(0, value - next);
      value = next;
      var ins = Math.max(i.insurance * 0.45, i.insurance * Math.pow(1 - i.insDrop / 100, y - 1));
      var mnt = i.maint * Math.pow(1 + i.maintEsc / 100, y - 1) + (y > 8 ? i.majorRepairs : 0);
      var reg = Math.max(i.reg * 0.4, i.reg * Math.pow(1 - i.regTaper / 100, y - 1));
      var fees = reg + (y === 1 ? upfront : 0);
      var interest = ints[y - 1] || 0;
      rows.push({
        year: y, dep: dep, interest: interest, insurance: ins, maint: mnt,
        fuel: fuel, fees: fees, value: next,
        total: dep + interest + ins + mnt + fuel + fees
      });
    }
    return rows;
  }

  /* Cost of covering the horizon by buying a fresh vehicle every N years.
     Each vehicle's resale is already credited, because
     depreciation only ever charges the value actually lost. */
  function cycleTotal(i, cycle, horizon) {
    var total = 0, done = 0, cars = 0, rows, k;
    while (done < horizon) {
      var n = Math.min(cycle, horizon - done);
      rows = ownership(i, n);
      for (k = 0; k < rows.length; k++) total += rows[k].total;
      done += n;
      cars++;
    }
    return { total: total, cars: cars };
  }

  MDC.calc({
    form: "ten-form",
    defaults: {
      price: 34000, down: 3400, apr: 7.2, term: "60",
      miles: 12000, mpg: 30, gasPrice: 4.00,
      years: 10, segment: "suv",
      insurance: 2496, insDrop: 3.5,
      maint: 1250, maintEsc: 10, majorRepairs: 900,
      reg: 220, regTaper: 6,
      salesTax: 7, dealerFees: 700
    },
    compute: function (i) {
      var n = Math.max(1, Math.round(i.years));
      var rows = ownership(i, n);
      var cum = 0, pts = [], cheap = rows[0], y, r;
      var cats = { dep: 0, interest: 0, insurance: 0, maint: 0, fuel: 0, fees: 0 };
      for (y = 0; y < rows.length; y++) {
        r = rows[y];
        cum += r.total;
        r.cum = cum;
        r.avg = cum / (y + 1);
        pts.push({ x: r.year, y: r.avg });
        if (r.total < cheap.total) cheap = r;
        cats.dep += r.dep; cats.interest += r.interest; cats.insurance += r.insurance;
        cats.maint += r.maint; cats.fuel += r.fuel; cats.fees += r.fees;
      }
      var miles = Math.max(1, i.miles * n);
      var c5 = cycleTotal(i, 5, n);
      var c3 = cycleTotal(i, 3, n);
      var term = parseInt(i.term, 10) || 60;
      var payoff = Math.ceil(term / 12);

      return {
        total: cum,
        perYear: cum / n,
        perMonth: cum / (n * 12),
        perMile: cum / miles,
        totalMiles: miles,
        yearsLabel: n + (n === 1 ? " year" : " years"),
        year1: rows[0].total,
        lastYear: rows[rows.length - 1].total,
        avg3: rows[Math.min(2, rows.length - 1)].avg,
        cheapYearLabel: "Year " + cheap.year,
        cheapYearCost: cheap.total,
        cheapDep: cheap.dep,
        cheapDepPct: i.price > 0 ? cheap.dep / i.price * 100 : 0,
        ratio: rows[0].total / Math.max(1, cheap.total),
        endValue: rows[rows.length - 1].value,
        payoffLabel: payoff >= n ? "month " + term : "year " + payoff,
        keepTotal: cum,
        replace5: c5.total,
        replace3: c3.total,
        cars5: c5.cars,
        cars3: c3.cars,
        extra5: c5.total - cum,
        extra3: c3.total - cum,
        replaceMonthly: c5.total / (n * 12),
        replaceYearly: c5.total / n,
        rows: rows, pts: pts, cats: cats, n: n, _i: i
      };
    },
    onInput: function (i) {
      var set = function (k, v) {
        document.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) {
          if (el.closest(".field")) el.textContent = v;
        });
      };
      set("years", i.years + (i.years === 1 ? " year" : " years"));
      set("miles", F.num(i.miles) + " mi/yr");
      set("apr", i.apr.toFixed(1) + "%");
      set("insDrop", i.insDrop.toFixed(1) + "% a year");
      set("maintEsc", i.maintEsc + "% a year");
      set("regTaper", i.regTaper + "% a year");
    },
    count: [],
    render: function (res, i) {
      /* ---- the cumulative average curve -------------------------------- */
      var host = document.getElementById("avg-chart");
      if (host) {
        MDC.charts.area(host, res.pts, {
          cssVar: "--c-deprec",
          yFmt: function (v) { return F.money(v); },
          xFmt: function (x) { return "Yr " + x; },
          xLabelFmt: function (x) { return "Average after " + x + (x === 1 ? " year" : " years"); },
          aria: "Cumulative average cost per year falling as the vehicle ages"
        });
      }

      /* ---- year-by-year table ------------------------------------------ */
      var t = document.getElementById("year-table");
      if (t) {
        var body = "", k, r;
        for (k = 0; k < res.rows.length; k++) {
          r = res.rows[k];
          var cheapest = r.total === res.cheapYearCost;
          body += '<tr' + (cheapest ? ' style="font-weight:650"' : '') + '>' +
            '<td>Year ' + r.year + (cheapest ? ' &nbsp;<small class="text-muted">cheapest</small>' : '') + '</td>' +
            '<td class="num">' + F.money(r.dep) + '</td>' +
            '<td class="num">' + (r.interest < 1 ? '&mdash;' : F.money(r.interest)) + '</td>' +
            '<td class="num">' + F.money(r.insurance) + '</td>' +
            '<td class="num">' + F.money(r.maint) + '</td>' +
            '<td class="num">' + F.money(r.fuel) + '</td>' +
            '<td class="num">' + F.money(r.total) + '</td>' +
            '<td class="num">' + F.money(r.avg) + '</td></tr>';
        }
        t.innerHTML = '<div class="table-wrap"><table class="tbl"><thead><tr>' +
          '<th>Year</th><th class="num">Deprec.</th><th class="num">Interest</th>' +
          '<th class="num">Insurance</th><th class="num">Maint.</th><th class="num">Fuel</th>' +
          '<th class="num">That year</th><th class="num">Cumulative avg</th>' +
          '</tr></thead><tbody>' + body + '</tbody></table></div>' +
          '<p class="text-muted" style="font-size:.85rem;margin-top:12px">Registration is inside each year total, as are sales tax and dealer fees in year one. ' +
          'Interest reaches zero in ' + res.payoffLabel + '. The final column never rises, even in the years the major-repair allowance switches on.</p>';
      }

      /* ---- trade-cycle comparison -------------------------------------- */
      var cyc = document.getElementById("cycle-rows");
      if (cyc) {
        var opts = [
          { label: "Keep one car " + res.n + " years", sub: "1 vehicle, one set of taxes and fees", v: res.keepTotal, css: "--c-deprec" },
          { label: "Replace every 5 years", sub: res.cars5 + " vehicles, " + res.cars5 + " sets of taxes and fees", v: res.replace5, css: "--c-finance" },
          { label: "Replace every 3 years", sub: res.cars3 + " vehicles, " + res.cars3 + " sets of taxes and fees", v: res.replace3, css: "--c-tax" }
        ];
        var base = Math.max(1, res.keepTotal);
        cyc.innerHTML = opts.map(function (o) {
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + o.css + ')"></span>' +
            '<span class="bd-name">' + o.label + '<small>' + o.sub + ' &middot; ' + F.money(o.v / (res.n * 12)) + ' / month</small></span>' +
            '<span class="bd-pct num">' + Math.round(o.v / base * 100) + '%</span>' +
            '<span class="bd-val num">' + F.money(o.v) + '</span>' +
            '</div>';
        }).join("");
      }
      var note = document.getElementById("cycle-note");
      if (note) {
        note.innerHTML = 'Same vehicle, same ' + F.num(res.totalMiles) + ' miles, same insurance. ' +
          'Replacing every five years costs <strong>' + F.money(res.extra5) + '</strong> more across the horizon; ' +
          'replacing every three costs <strong>' + F.money(res.extra3) + '</strong> more &mdash; about ' +
          F.money(res.extra3 / (res.n * 12)) + ' a month for nothing but newness. ' +
          'Each replacement pays sales tax and dealer fees again and restarts the steep front of the depreciation curve. ' +
          'Resale proceeds are already credited to every vehicle, and the model assumes the replacement costs the same in today&rsquo;s dollars &mdash; both assumptions favor the trade cycle.';
      }

      /* ---- decade by category ------------------------------------------ */
      var rows2 = CATS.map(function (c) { return { c: c, v: res.cats[c.key] || 0 }; })
                      .filter(function (x) { return x.v > 0.5; })
                      .sort(function (a, b) { return b.v - a.v; });
      var donut = document.getElementById("donut");
      if (donut) MDC.charts.donut(donut, rows2.map(function (x) {
        return { label: x.c.label, value: x.v, cssVar: x.c.css };
      }), {
        centerLabel: "Per year",
        centerValue: F.money(res.perYear),
        centerSub: F.money(res.total) + " over " + res.n + " years",
        aria: "Ten-year cost of ownership by category"
      });

      var bd = document.getElementById("breakdown");
      if (bd) {
        bd.innerHTML = rows2.map(function (x) {
          var pct = res.total > 0 ? x.v / res.total * 100 : 0;
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + x.c.css + ')"></span>' +
            '<span class="bd-name">' + x.c.label + '<small>' + F.money(x.v / (res.n * 12)) + ' / month</small></span>' +
            '<span class="bd-pct num">' + Math.round(pct) + '%</span>' +
            '<span class="bd-val num">' + F.money(x.v) + '</span>' +
            '</div>';
        }).join("") +
        '<p class="text-muted" style="font-size:.84rem;margin-top:14px">Over five years depreciation is comfortably the largest line. ' +
        'Stretch the horizon to a decade and it is only ' + Math.round(res.cats.dep / Math.max(1, res.total) * 100) + '% of the bill &mdash; ' +
        'the mix shifts from owning the vehicle to running it, which is the cheaper of the two things to be doing.</p>';
      }
    }
  });
})();
`;

module.exports = {
  slug: "ten-year-cost",
  jsName: "ten",
  formId: "ten-form",
  crumbName: "Ten-Year Cost",
  appName: "10-Year Car Cost Calculator",
  title: "10-Year Car Cost Calculator | MyDrivingCost",
  desc:
    "Model a full decade of car ownership year by year and see why years six to ten are the cheapest — plus what replacing every three or five years really costs.",
  ogTitle: "10-Year Car Cost — the cheapest years are the last ones",
  ogDesc:
    "Depreciation collapses, the loan ends, and the cumulative average falls every single year. See the decade priced honestly.",
  h1: "10-Year Car Cost Calculator",
  lead:
    "Most cost models stop at five years, which is exactly when a car stops being expensive. Run the full decade and the cheapest driving of your life turns out to be years six through ten — and the standard three-year trade cycle turns out to cost about forty thousand dollars more.",
  inputs,
  results,
  floatBar,
  prose,
  js,
  disclaimer:
    "A ten-year model necessarily estimates things nobody can know precisely: future repair costs, insurance repricing, fuel prices and resale values a decade out. The structure — depreciation falling, interest ending, maintenance rising — is robust. The individual dollar figures in year nine are not. Not financial advice.",
  sources: ["AAA_YDC", "KBB_DEP", "BLS_CPI", "EIA_GAS"],
  sourceNotes: [
    "This page runs its own model, with insurance declining as the car ages, maintenance escalating, a depreciation taper after year six and a separate major-repair allowance. Its five-year figure is therefore not identical to the True Cost to Own benchmark, and is not meant to be.",
  ],
  related: [
    ["/calculators/true-cost-to-own/", "True Cost to Own", "The same vehicle over a conventional five-year horizon, in full detail."],
    ["/calculators/depreciation/", "Depreciation", "The curve that makes late ownership cheap, modeled on its own."],
    ["/calculators/cost-per-mile/", "Cost Per Mile", "Reduce the whole decade to one number you can compare against anything."],
    ["/calculators/", "All calculators", "Auto loan, lease vs buy, fuel, EV charging and the rest of the library."],
  ],
  faq: [
    [
      "Is it cheaper to keep a car for 10 years?",
      "Substantially, yes. On our benchmark $34,000 SUV, keeping one vehicle for ten years costs about $96,650, while replacing it every five costs about $115,300 and replacing it every three costs about $136,470 — all for the same 120,000 miles. The gap comes from three things: you pay the steep first-year depreciation once instead of two or four times, you pay sales tax and dealer fees once, and you spend several years with no loan payment at all. That is roughly the price of a car, saved by doing nothing.",
    ],
    [
      "What is the cheapest year of car ownership?",
      "Year eight, for a typical vehicle financed over 60 months. By then the loan has been paid off for three years, so interest is zero, and annual depreciation has fallen to around $1,200 — a small percentage of an already small value. On the benchmark vehicle year eight costs about $7,350 against roughly $17,680 for year one, a ratio of about 2.4 to 1. Maintenance is higher than it was, but nowhere near high enough to offset a depreciation line that has fallen by more than $5,500 a year.",
    ],
    [
      "Do maintenance costs eventually outweigh depreciation savings?",
      "Rarely, and much later than people expect. Maintenance on a well-kept mainstream vehicle rises roughly 10 percent a year from a low base, reaching perhaps $2,900 by year ten. Depreciation over the same period falls from $6,800 to under $800. The two lines cross around year six, but by then the total annual cost is already far below year one and continues falling. The exception is genuinely expensive machinery — luxury European vehicles with air suspension and complex drivetrains — where a single repair can exceed a year of avoided depreciation.",
    ],
    [
      "Should I repair a car that is worth less than the repair?",
      "Usually yes, and the comparison most people make is the wrong one. The car's resale value is irrelevant because you are not selling it — you are choosing between the repair and whatever replaces it. Divide the repair cost by the months of reliable service it buys, then compare that to the all-in monthly cost of a replacement vehicle, which on a five-year cycle is around $960 a month including depreciation, insurance and interest. A $3,500 repair that buys two more years costs $146 a month. It is not close.",
    ],
    [
      "How much does a car cost per year over 10 years?",
      "About $9,665 a year for a $34,000 SUV driven 12,000 miles annually, or roughly $805 a month all in. That figure includes depreciation, loan interest, insurance, maintenance and repairs, fuel, registration and the sales tax and dealer fees paid at purchase. It compares with about $11,530 a year over a five-year horizon for the identical vehicle. The ten-year figure is lower purely because the large fixed costs of acquisition are being divided across twice as many years of use.",
    ],
    [
      "What is cumulative average cost and why does it matter?",
      "Cumulative average cost is everything you have spent on the vehicle divided by the years you have owned it, recalculated at each anniversary. It matters because it answers the question owners actually face — whether to keep the car another year — rather than the question calculators usually answer. For a financed vehicle the cumulative average falls every single year, without exception, including years when a major repair lands. That is the clearest possible demonstration that time spent owning a car is the thing that makes it affordable.",
    ],
    [
      "Are older cars less safe, and does that change the maths?",
      "Over a full decade the safety gap is real. Automatic emergency braking, blind-spot monitoring and improved structures have measurably reduced crash rates, and a ten-year-old vehicle lacks some of them. But the improvement is not annual — the difference between a car and its three-year-younger replacement is usually negligible. The sensible response is a long ownership cycle punctuated by a deliberate technology jump every ten or twelve years, rather than a short cycle that pays for a decade of progress three years at a time at roughly $332 a month.",
    ],
    [
      "When is replacing a car early actually the right decision?",
      "Three cases. A vehicle with a documented systemic fault should go, because its repair distribution has no ceiling and no allowance can model it. A change in needs — a new commute, a larger family, a different climate — is not a financial decision at all, and no amount of averaging fixes a car that no longer does the job. And a luxury vehicle whose out-of-warranty repair costs run three to five times mainstream rates can hit a genuine economic cliff around year eight. Outside those cases, replacing early is almost always the expensive choice.",
    ],
  ],
};
