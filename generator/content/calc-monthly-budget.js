const C = require("../calcpage");
const { num, rng, seg, group, advanced, hero, tiles, chartCard, callout, bullets, table, } = C;

/* ------------------------------------------------------------------ HTML -- */

const inputs = [
  group(
    "Household income",
    [
      num("takeHome", "Take-home pay", 5000, {
        prefix: "$",
        suffix: "/mo",
        min: 0,
        step: 100,
        help: "What actually lands in your accounts each month, after tax and deductions. This is the number transport should be measured against.",
      }),
      num("grossMonthly", "Gross pay", 6500, {
        prefix: "$",
        suffix: "/mo",
        min: 0,
        step: 100,
        help: "Before tax. Most lender rules of thumb quote a share of gross, which is why they sound so generous.",
      }),
    ].join("\n              ")
  ),
  group(
    "Vehicle one",
    [
      num("v1Payment", "Loan or lease payment", 670, { prefix: "$", suffix: "/mo", min: 0, step: 10 }),
      num("v1Balance", "Loan balance outstanding", 33680, {
        prefix: "$",
        min: 0,
        step: 500,
        help: "A paid-off vehicle takes a balance of zero — and its payment is zero too. A lease also takes zero, because a lease payment buys no equity: all of it is cost.",
      }),
      rng("v1Apr", "Loan APR", 7.2, { min: 0, max: 25, step: 0.1, initial: "7.2%" }),
      num("v1Value", "What it is worth today", 34000, {
        prefix: "$",
        min: 0,
        step: 500,
        help: "Market value now, not what you paid. Depreciation is charged on what you still have to lose. On a lease, set this to zero — the payment already covers the value the leasing company charges you for.",
      }),
      num("v1Insurance", "Insurance", 208, { prefix: "$", suffix: "/mo", min: 0, step: 5 }),
      rng("v1Miles", "Annual miles", 12000, { min: 0, max: 40000, step: 500, initial: "12,000 mi/yr" }),
      num("v1Mpg", "Combined MPG", 30, { min: 5, max: 150, step: 1 }),
      num("v1Maint", "Maintenance, repairs &amp; tires", 132, {
        prefix: "$",
        suffix: "/mo",
        min: 0,
        step: 5,
        help: "$1,588 a year is the five-year average for a mainstream vehicle, with tires and repairs already inside it.",
      }),
    ].join("\n              "),
    "var(--c-deprec)"
  ),
  group(
    "Vehicle two",
    [
      seg("hasV2", "Second vehicle", [["no", "No second vehicle"], ["yes", "Yes"]], "no"),
      `<p class="field-help" data-when="v2off">Leave this off and the second vehicle is excluded from every total below — the fields stay here so you can price one before you buy it, or price the one you already have before you sell it.</p>`,
      `<div data-when="v2" hidden>${num("v2Payment", "Loan or lease payment", 0, { prefix: "$", suffix: "/mo", min: 0, step: 10 })}</div>`,
      `<div data-when="v2" hidden>${num("v2Balance", "Loan balance outstanding", 0, {
        prefix: "$",
        min: 0,
        step: 250,
        help: "Zero for a car that is paid off or leased. Second vehicles are very often paid off, which is exactly why their cost hides so well.",
      })}</div>`,
      `<div data-when="v2" hidden>${rng("v2Apr", "Loan APR", 8.4, { min: 0, max: 25, step: 0.1, initial: "8.4%" })}</div>`,
      `<div data-when="v2" hidden>${num("v2Value", "What it is worth today", 12000, { prefix: "$", min: 0, step: 250 })}</div>`,
      `<div data-when="v2" hidden>${num("v2Insurance", "Insurance", 118, { prefix: "$", suffix: "/mo", min: 0, step: 5 })}</div>`,
      `<div data-when="v2" hidden>${rng("v2Miles", "Annual miles", 7000, { min: 0, max: 40000, step: 500, initial: "7,000 mi/yr" })}</div>`,
      `<div data-when="v2" hidden>${num("v2Mpg", "Combined MPG", 28, { min: 5, max: 150, step: 1 })}</div>`,
      `<div data-when="v2" hidden>${num("v2Maint", "Maintenance, repairs &amp; tires", 95, { prefix: "$", suffix: "/mo", min: 0, step: 5 })}</div>`,
    ].join("\n              "),
    "var(--c-opp)"
  ),
  group(
    "Everything else",
    [
      num("fuelPrice", "Fuel price", 4.0, { prefix: "$", suffix: "/gal", min: 0.5, max: 12, step: 0.05 }),
      num("parking", "Parking &amp; permits", 0, { prefix: "$", suffix: "/mo", min: 0, step: 5 }),
      num("tolls", "Tolls", 0, { prefix: "$", suffix: "/mo", min: 0, step: 5 }),
      num("transit", "Transit passes", 0, { prefix: "$", suffix: "/mo", min: 0, step: 5 }),
      num("rideshare", "Rideshare &amp; taxis", 0, {
        prefix: "$",
        suffix: "/mo",
        min: 0,
        step: 5,
        help: "Count it honestly. Three $22 rides a week is $286 a month, and it belongs in the transport line.",
      }),
    ].join("\n              "),
    "var(--c-fuel)"
  ),
  advanced(
    [
      `<p class="field-help">Registration, the depreciation switch and an optional repair reserve. Turning depreciation off shows you the cash view your bank statement gives you — which is precisely the view that misleads people.</p>`,
      num("v1Reg", "Registration, vehicle one", 220, { prefix: "$", suffix: "/yr", min: 0, step: 10 }),
      num("v2Reg", "Registration, vehicle two", 180, { prefix: "$", suffix: "/yr", min: 0, step: 10 }),
      seg("useDep", "Count depreciation", [["yes", "Yes — true cost"], ["no", "No — cash only"]], "yes"),
      rng("depRate", "Depreciation rate", 15, {
        min: 0,
        max: 30,
        step: 1,
        initial: "15% /yr",
        help: "Applied to each vehicle's current value. 15% a year is the canonical rate for a car you already own and are past the first-year cliff.",
      }),
      num("repairs", "Extra repair reserve", 0, {
        prefix: "$",
        suffix: "/mo",
        min: 0,
        step: 10,
        help: "Leave at zero unless your maintenance figure covers routine servicing only. The $132 default above already carries repairs and tires, so a reserve on top would count them twice. Past warranty, $40–80 here is realistic.",
      }),
    ].join("\n                  ")
  ),
].join("\n            ");

const results = [
  hero(
    "Monthly transportation budget",
    "What transport really costs your household each month",
    "trueMonthly",
    "money",
    '<strong class="num" data-out="cashMonthly" data-fmt="money">—</strong> leaves your account. Take out the <strong class="num" data-out="principalMonthly" data-fmt="money">—</strong> of that which repays loan principal — money that buys equity rather than vanishing — then add the <strong class="num" data-out="deprecMonthly" data-fmt="money">—</strong> of value your vehicles quietly shed, and this is the real figure. It is <strong class="num" data-out="pctTake" data-fmt="pct">—</strong> of take-home pay.'
  ),
  tiles([
    ["Cash out of pocket", "cashMonthly", "money", 'What the bank sees · <span class="num" data-out="cashPctTake" data-fmt="pct">—</span> of take-home'],
    ["Share of take-home", "pctTake", "pct", 'True cost · <span class="num" data-out="pctGross" data-fmt="pct">—</span> of gross pay'],
    ["Cost per mile", "perMile", "perMile", 'Blended across <span class="num" data-out="totalMiles" data-fmt="num">—</span> household miles a year'],
  ]),
  chartCard(
    "Where your household sits",
    "True transport cost as a share of take-home pay",
    `<div id="band"></div>
          <p class="text-muted" style="font-size:.85rem;margin-top:14px">You are in the <strong><span data-out="bandLabel" data-fmt="raw">—</span></strong> band. <span data-out="bandNote" data-fmt="raw">—</span></p>`
  ),
  chartCard(
    "Where the money goes",
    "The true economic cost, by category, per month",
    `<div class="donut-wrap">
            <div id="donut"></div>
            <div class="breakdown" id="breakdown"></div>
          </div>`
  ),
  chartCard(
    "Line by line",
    "Cash out of pocket beside true economic cost, and how the two reconcile",
    `<div id="ledger"></div>`
  ),
  callout(
    "The part that never appears on a statement",
    `Your vehicles are shedding <strong class="num" data-out="deprecMonthly" data-fmt="money">—</strong> of value a month — <strong class="num" data-out="deprecAnnual" data-fmt="money">—</strong> a year, and <strong class="num" data-out="depShare" data-fmt="pct">—</strong> of your true transport cost. No direct debit, no invoice, no notification. <span data-out="gapNote" data-fmt="raw">—</span>`
  ),
  callout(
    "The second car is the expensive habit",
    `<p style="margin:0 0 10px">A second vehicle costs roughly <strong>$350 to $500 a month</strong> while it is financed — and still around <strong>$280 to $300</strong> once it is paid off — in interest, insurance, registration and depreciation <em>before it moves at all</em>. On your figures that standing cost is <strong class="num" data-out="v2Fixed" data-fmt="money">—</strong> a month, or <strong class="num" data-out="v2FixedAnnual" data-fmt="money">—</strong> a year.</p>
      <p style="margin:0"><span data-out="v2Verdict" data-fmt="raw">—</span></p>`,
    "warn"
  ),
].join("\n\n        ");

const floatBar = `<div class="float-summary no-print" id="floatSummary" aria-hidden="true">
  <div class="fs-item"><span class="k">True cost</span><span class="v num" data-out="trueMonthly" data-fmt="money">—</span></div>
  <div class="fs-sep"></div>
  <div class="fs-item fs-hide-sm"><span class="k">Of take-home</span><span class="v num" data-out="pctTake" data-fmt="pct">—</span></div>
  <button type="button" class="btn btn-primary btn-sm" data-scroll="calc">Edit</button>
</div>`;

/* ------------------------------------------------------------------ prose -- */

const prose = `
    <h2 id="how-it-works">The second-largest thing your household buys</h2>
    <p>Ask most people to name their biggest expenses and they will say housing, then food, then perhaps childcare. Transport rarely makes the top of the list. It should. In the Bureau of Labor Statistics' Consumer Expenditure Survey, transportation has sat in second place behind housing for decades — around 16 to 17 percent of average household spending against roughly 33 percent for shelter, and comfortably ahead of food, healthcare and everything else.</p>
    <p>The reason it feels smaller than it is has nothing to do with arithmetic and everything to do with visibility. Housing arrives as one number on one day of the month. Transport arrives as a payment here, a premium there, a tank of fuel twice a week, a service invoice twice a year, a parking permit, a toll transponder top-up. Each piece is small enough to wave through. Added together they routinely exceed what the same household spends on food.</p>
    <p>And then there is the part that never arrives at all. A $34,000 vehicle sheds about $425 a month in market value at the canonical 15 percent rate, and it sends no notification whatsoever. You find out in one lump on the day you trade it in. That is why this calculator reports two figures rather than one: the cash that leaves your account, and the money that actually leaves you. They are not the same number, and neither is a substitute for the other.</p>

    <h2 id="formula">The formula, and the trap inside it</h2>
    <p>There is an obvious way to build this calculation and it is wrong. Add up every bill, then add depreciation on top. That double-counts, and the error is large enough to change decisions.</p>
    <p>The reason is the loan payment. Part of every payment is interest, which is pure cost. The rest repays principal, and principal buys equity in an asset you will eventually sell — it does not disappear. Depreciation is precisely the mechanism by which that equity disappears. Count the whole payment <em>and</em> the depreciation and you have charged yourself twice for the same transfer of value.</p>
    ${callout(
      "Cash cost, true cost, and the identity that connects them",
      `<p style="margin:0 0 10px;font-family:var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);font-size:.9rem;line-height:1.8"><strong>Cash</strong> = payments + insurance + fuel + maintenance<br>&nbsp;&nbsp;&nbsp;+ registration ÷ 12 + parking + tolls + transit + rideshare</p>
      <p style="margin:0 0 10px;font-family:var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);font-size:.9rem;line-height:1.8"><strong>True</strong> = cash − principal repaid + depreciation</p>
      <p style="margin:0 0 10px">Which is identical to writing it out from scratch as <strong>interest + depreciation + insurance + fuel + maintenance + registration + everything else</strong>. Both forms give the same figure to the cent, because a payment is nothing more than interest plus principal.</p>
      <p style="margin:0">Interest is estimated as balance × APR ÷ 12 — the interest due on the loan this month. That is exact for the month you are budgeting and gently overstates the months ahead, since the balance falls as you pay it down. Depreciation is charged at 15% a year on each vehicle's current market value, the canonical rate for a car you already own and are past the first-year cliff.</p>`
    )}
    <p>One consequence of the corrected identity deserves stating plainly, because it surprises people: on a fresh five-year loan, the principal you repay each month and the value the car loses each month are close to equal. On the default figures here they are $468 against $425 &mdash; principal runs a little ahead, because the loan is also amortizing the sales tax and dealer fees financed alongside the car, and those were never part of its resale value in the first place. Your payment <em>is</em> your depreciation, near enough — which is why the loan feels manageable and why the day it ends is such a relief. What does not end is the depreciation. It carries on quietly at several hundred dollars a month with nothing on your statement to mark it, and that is the moment the invisible cost stops being offset by anything at all.</p>

    <h2 id="share">What share of income transport should take</h2>
    <p>The guidance quoted almost everywhere is 15 to 20 percent of income for all transport costs, with a 10 percent sub-limit on the car payment. It is worth being blunt about that advice: it is generous, it is usually quoted against <em>gross</em> pay rather than take-home, and it originates with the lending industry rather than with anyone studying household outcomes.</p>
    <p>Run the numbers on a household earning $6,500 gross and $5,000 net. Twenty percent of gross is $1,300 a month — 26 percent of everything they actually receive. That is more than a quarter of the household's money committed to depreciating metal before the mortgage, before food, before a single dollar of saving. The rule is not wrong so much as it describes the maximum a lender is comfortable extending, which is a different question from what a household should spend.</p>
    <p>Measured against take-home pay, where budgets are actually lived, the bands look like this:</p>
    ${table(
      ["Share of take-home", "Verdict", "At $5,000/mo net", "What it usually means"],
      [
        ["Under 10%", "Comfortable", "Under $500", "One modest or paid-off vehicle; transport is not shaping the rest of the budget"],
        ["10–15%", "Reasonable", "$500–750", "One financed vehicle driven normal miles — the typical healthy household"],
        ["15–20%", "Stretched", "$750–1,000", "Workable, but transport is now competing directly with saving and debt payoff"],
        ["20–25%", "Overweight", "$1,000–1,250", "Usually two financed vehicles, or one vehicle bought a segment above the need"],
        ["Over 25%", "Vehicle-led budget", "Over $1,250", "The cars are setting the terms; every other goal is scheduled around them"],
      ],
      [2]
    )}
    <p>The default household on this page lands at about 22 percent — one newly financed $34,000 vehicle, no second car, nothing exotic anywhere. That is the point. A single mainstream SUV on a five-year loan is enough to push a median household into the overweight band, and almost nobody in that position believes they are.</p>

    <h2 id="benchmark">Why this figure runs above our five-year averages</h2>
    <p>Elsewhere on this site the same $34,000 vehicle costs <strong>98 cents a mile</strong>, about $982 a month at 12,000 miles a year. This calculator prints roughly <strong>$1.12 a mile</strong> on the same vehicle. Both are right, and the difference is worth understanding, because it tells you when in ownership the money actually goes.</p>
    <p>Our headline benchmark is a <em>five-year average</em>. This page is a <em>snapshot of the month you are in</em> — and for a car bought new on a fresh loan, that is the single most expensive month of the whole period.</p>
    ${table(
      ["Line", "This page, month one", "Five-year average", "Why they differ"],
      [
        ["Depreciation", "$425", "$330", "15% is charged on today's value; the dollar loss shrinks every year the car ages"],
        ["Loan interest", "$202", "$109", "The first month of a 60-month loan is the most interest-heavy there is"],
        ["Insurance", "$208", "$208", "Identical"],
        ["Fuel", "$133", "$133", "Identical at 30 MPG and $4.00 a gallon"],
        ["Maintenance &amp; tires", "$132", "$132", "Identical"],
        ["Registration &amp; fees", "$18", "$70", "The five-year figure amortizes sales tax, title and dealer fees; this page asks only for registration"],
        ["<strong>Total per month</strong>", "<strong>$1,119</strong>", "<strong>$982</strong>", "<strong>$1.12 against $0.98 a mile</strong>"],
      ],
      [1, 2]
    )}
    <p>Run the same vehicle again four years later — worth about $17,700, roughly $7,700 still owed — and this page prints about $759 a month, or 76 cents a mile. Average the whole run and you arrive back at the benchmark. Ownership starts expensive and gets cheaper every year you hold on, and a monthly budget tool is honest only if it shows you the month you are actually in.</p>

    <h2 id="housing">The drive-until-you-qualify trade</h2>
    <p>The single largest transport decision most households ever make is not which car to buy. It is where to live. &ldquo;Drive until you qualify&rdquo; — moving further out until the mortgage approval lands — is the standard advice of the American housing market, and it quietly converts a housing cost into a transport cost at an exchange rate almost nobody calculates.</p>
    <p>Here is that exchange rate. Assume one commuter, 250 working days, and a marginal driving cost of about 35 cents a mile — fuel, wear, tires and the extra depreciation that mileage causes, but not the fixed costs you would carry anyway. The final column converts the monthly figure into the mortgage it would service at 7% over 30 years.</p>
    ${table(
      ["Extra distance each way", "Extra miles per year", "Extra cost per year", "Per month", "Mortgage it would fund"],
      [
        ["5 miles", "2,500", "$875", "$73", "≈ $11,000"],
        ["10 miles", "5,000", "$1,750", "$146", "≈ $22,000"],
        ["15 miles", "7,500", "$2,625", "$219", "≈ $33,000"],
        ["20 miles", "10,000", "$3,500", "$292", "≈ $44,000"],
        ["25 miles", "12,500", "$4,375", "$365", "≈ $55,000"],
      ],
      [1, 2, 3, 4]
    )}
    <p>So moving twenty miles further out to save $40,000 on a house is, in cash terms, close to a wash — and that is before the two costs it does not show. The first is time: forty extra miles a day is roughly an hour, about 250 hours a year, an entire working month spent in a driver's seat. The second is that long commutes are the most common reason a household ends up needing a second vehicle at all, which adds a standing cost of several hundred dollars a month on top of everything in the table.</p>
    <p>None of this means the outer suburb is the wrong answer. It means the comparison has to be run properly. Cheaper housing is not free; it is paid for in vehicle cost, and the invoice arrives every month for as long as you live there.</p>

    <h2 id="one-car">The one-car household</h2>
    <p>The most reliable way to move a transport budget from stretched to comfortable is to own one fewer vehicle. It is also the option households dismiss fastest, usually on the strength of a handful of days a year when both cars genuinely move at once.</p>
    <p>Count those days before deciding. Households that actually log it are frequently surprised to find the second vehicle essential on fifteen to thirty days a year and idle the rest. A paid-off $12,000 second car still stands you about <strong>$283 a month</strong> — $150 of depreciation, $118 of insurance, $15 of registration — which buys those thirty days at roughly $113 each. A rental car is $60 to $90 a day. A day's worth of rideshare, generously estimated, is rarely more than $60. Finance that same second car and the standing cost passes $350 before it moves, with the cash leaving your account higher still.</p>
    <p>The honest counter-arguments are real but narrower than they feel: shift work with no overlap, a rural address with no alternatives, a job that requires a vehicle on site, or a second driver whose schedule genuinely collides with the first every single day. If one of those applies, keep the car — but keep a cheap, reliable, already-depreciated one, because a second vehicle's job is availability, not impressiveness.</p>

    <h2 id="better">Where the money actually comes back from</h2>
    <p>In rough order of how quickly you can act, with an honest note on what each is worth:</p>
    ${bullets([
      "<strong>Shop the insurance, this week.</strong> The same driver and the same vehicles routinely see quotes 30–50% apart between carriers, and no insurer rewards loyalty. Two hours of quoting commonly returns $40–90 a month. Nothing else on this list pays that well per hour spent.",
      "<strong>Raise the deductible and drop what you do not need.</strong> Moving from a $500 to a $1,000 deductible typically saves 10–15% of premium. Collision and comprehensive on a vehicle worth under about $4,000 are usually poor value — the payout is capped by a small number.",
      "<strong>Sell the second car.</strong> The largest single line available to most households: $280–500 a month of standing cost recovered in full, plus whatever the car itself is worth. Log two months of genuine usage first, then price rentals and rideshare against that figure.",
      "<strong>Refinance an expensive loan.</strong> If your rate is three points above what a credit union would quote you today, refinancing a $25,000 balance cuts roughly $60 a month off the interest line with no change to your life at all. Do not extend the term to chase a lower payment — that converts a saving into a larger total cost.",
      "<strong>Drive fewer miles, deliberately.</strong> Consolidating errands, one day of remote work a week, or walking the trips under a mile removes 2,000–4,000 miles a year. At a marginal 35 cents that is $60–115 a month, and it slows depreciation as well as fuel burn.",
      "<strong>Reserve for repairs only if your maintenance line is routine servicing.</strong> The $132 default here is a five-year average with tires and repairs already inside it, so a reserve on top double-counts. Past warranty, where that average understates what is coming, $40–80 a month is realistic.",
      "<strong>Then change the vehicle itself — because it dominates everything above.</strong> Every item on this list is worth tens of dollars a month. Replacing a $34,000 vehicle losing $425 a month in value with a well-chosen three-year-old car worth $20,000 saves $175 a month in depreciation alone, before the smaller interest bill and the cheaper insurance. It is the slowest lever and the only one with real leverage.",
      "<strong>And do not roll negative equity forward.</strong> Financing the shortfall on the last car into the next one is how a stretched transport budget becomes a permanent one. It is the single decision most likely to keep a household above 20% for a decade.",
    ])}

    <h2 id="mistakes">Common mistakes</h2>
    ${callout(
      "Adding depreciation on top of the whole car payment",
      "This is the error that makes careful budgets wrong in the expensive direction. Principal repayment and depreciation describe the same money moving: one builds equity in the car, the other destroys it. Count both in full and a $670 payment on a $34,000 vehicle appears to cost $1,587 a month rather than the correct $1,119. Charge yourself the interest and the depreciation — never the principal and the depreciation.",
      "warn"
    )}
    ${bullets([
      "<strong>Budgeting the payment instead of the vehicle.</strong> A $670 payment is not what the car costs. Add insurance, fuel, maintenance, registration and the value it sheds and the true figure is closer to $1,120. Households working from the payment alone are not careless — they are working from a number that was never the answer to the question.",
      "<strong>Measuring against gross pay.</strong> Every rule of thumb in the industry quotes gross. Your budget is spent in net. On a typical income the difference converts a comfortable-sounding 15% into an uncomfortable 20%.",
      "<strong>Treating a paid-off car as free.</strong> No payment is not no cost, and once the loan ends there is no principal repayment left to offset the depreciation either. A paid-off car is much cheaper than a financed one. It is not free, and its hidden share is at its largest.",
      "<strong>Leaving rideshare out of the transport line.</strong> It gets filed mentally under &ldquo;going out&rdquo;. It is transport, and in car-light urban households it is frequently the third-largest transport cost.",
      "<strong>Using the price you paid rather than today's value for depreciation.</strong> Depreciation applies to what the vehicle is worth now. A car that has already fallen from $34,000 to $18,000 is losing about $225 a month, not $425 — which is exactly why older vehicles get cheaper to own every year you keep them.",
      "<strong>Assuming the fuel line is where the savings are.</strong> For most households fuel is 12–15% of true transport cost. Depreciation and insurance together are usually more than half. Optimizing the smallest line first is the most common way to work hard and save nothing.",
    ])}
`;

/* -------------------------------------------------------------------- JS -- */

const js = `/* Monthly Transportation Budget — MyDrivingCost.com */
(function () {
  "use strict";
  var MDC = window.MDC, F = MDC.fmt;

  /* The donut and breakdown describe the TRUE economic cost, so the financing
     line is interest, not the whole payment. The principal portion of a payment
     buys equity; depreciation is what destroys it. Counting both double-counts. */
  var CATS = [
    { key: "finance",   label: "Loan interest",            css: "--c-finance" },
    { key: "deprec",    label: "Depreciation",             css: "--c-deprec" },
    { key: "insurance", label: "Insurance",                css: "--c-insure" },
    { key: "fuel",      label: "Fuel",                     css: "--c-fuel" },
    { key: "maint",     label: "Maintenance & repairs",    css: "--c-maint" },
    { key: "reg",       label: "Registration & fees",      css: "--c-tax" },
    { key: "other",     label: "Parking, tolls & transit", css: "--c-opp" }
  ];

  var BANDS = [
    { name: "Comfortable", lo: 0,  hi: 10,  label: "Under 10%", css: "--c-insure",
      note: "Transport is not shaping the rest of the budget. Hold this position." },
    { name: "Reasonable", lo: 10, hi: 15,  label: "10-15%", css: "--c-tax",
      note: "The normal range for a household running one financed vehicle at average mileage." },
    { name: "Stretched", lo: 15, hi: 20,  label: "15-20%", css: "--c-maint",
      note: "Workable, but transport is now competing directly with saving and debt payoff." },
    { name: "Overweight", lo: 20, hi: 999, label: "Over 20%", css: "--c-fuel",
      note: "The vehicles are setting the terms of the budget. The insurance line and the second car are where to start." }
  ];

  function bandFor(pct) {
    for (var b = 0; b < BANDS.length; b++) {
      if (pct < BANDS[b].hi) return b;
    }
    return BANDS.length - 1;
  }

  /* Interest due this month on the outstanding balance, and the principal the
     payment therefore repays. A zero balance means no equity is being bought:
     a paid-off car (whose payment should be zero) or a lease, where the payment
     is pure cost and none of it may be netted off. */
  function loan(payment, balance, apr) {
    if (!(balance > 0)) return { interest: 0, principal: 0 };
    var interest = balance * apr / 1200;
    var principal = Math.max(0, payment - interest);
    principal = Math.min(principal, payment);
    principal = Math.min(principal, balance);
    return { interest: interest, principal: principal };
  }

  MDC.calc({
    form: "budget-form",
    defaults: {
      takeHome: 5000, grossMonthly: 6500,
      v1Payment: 670, v1Balance: 33680, v1Apr: 7.2, v1Value: 34000,
      v1Insurance: 208, v1Miles: 12000, v1Mpg: 30, v1Maint: 132,
      hasV2: "no",
      v2Payment: 0, v2Balance: 0, v2Apr: 8.4, v2Value: 12000,
      v2Insurance: 118, v2Miles: 7000, v2Mpg: 28, v2Maint: 95,
      fuelPrice: 4.00, parking: 0, tolls: 0, transit: 0, rideshare: 0,
      v1Reg: 220, v2Reg: 180, useDep: "yes", depRate: 15, repairs: 0
    },
    compute: function (i) {
      /* The second vehicle's fields always exist. When the toggle is off they
         are multiplied out of every total rather than removed from the form. */
      var on = i.hasV2 === "yes" ? 1 : 0;
      var rate = (i.useDep === "yes" ? i.depRate : 0) / 100;

      var l1 = loan(i.v1Payment, i.v1Balance, i.v1Apr);
      var l2 = loan(i.v2Payment, i.v2Balance, i.v2Apr);

      var v1Fuel = i.v1Mpg > 0 ? (i.v1Miles / 12) / i.v1Mpg * i.fuelPrice : 0;
      var v2Fuel = i.v2Mpg > 0 ? (i.v2Miles / 12) / i.v2Mpg * i.fuelPrice : 0;
      var v1Dep = i.v1Value * rate / 12;
      var v2Dep = i.v2Value * rate / 12;

      var payments = i.v1Payment + i.v2Payment * on;
      var principal = l1.principal + l2.principal * on;
      var deprec = v1Dep + v2Dep * on;

      /* vals sums to trueMonthly exactly. The finance line is payments minus
         principal: interest on a normal loan, the whole payment on a lease. */
      var vals = {
        finance:   payments - principal,
        deprec:    deprec,
        insurance: i.v1Insurance + i.v2Insurance * on,
        fuel:      v1Fuel + v2Fuel * on,
        maint:     i.v1Maint + i.v2Maint * on + i.repairs,
        reg:       (i.v1Reg + i.v2Reg * on) / 12,
        other:     i.parking + i.tolls + i.transit + i.rideshare
      };

      var cash = payments + vals.insurance + vals.fuel + vals.maint + vals.reg + vals.other;
      var trueMonthly = cash - principal + deprec;
      var gap = deprec - principal;

      var take = Math.max(1, i.takeHome);
      var gross = Math.max(1, i.grossMonthly);
      var pctTake = trueMonthly / take * 100;
      var totalMiles = Math.max(1, i.v1Miles + i.v2Miles * on);

      /* Every individual line, with its cash figure and its economic figure. */
      var lines = [
        { label: "Vehicle one - payment", cash: i.v1Payment, econ: i.v1Payment - l1.principal,
          note: l1.principal > 0.5 ? "of which " + F.money(l1.principal) + " repays principal and buys equity" : "" },
        { label: "Vehicle one - depreciation", cash: 0, econ: v1Dep, note: "no invoice, no direct debit" },
        { label: "Vehicle one - insurance", cash: i.v1Insurance, econ: i.v1Insurance, note: "" },
        { label: "Vehicle one - fuel", cash: v1Fuel, econ: v1Fuel, note: "" },
        { label: "Vehicle one - maintenance & tires", cash: i.v1Maint, econ: i.v1Maint, note: "" },
        { label: "Vehicle one - registration", cash: i.v1Reg / 12, econ: i.v1Reg / 12, note: "" },
        { label: "Vehicle two - payment", cash: i.v2Payment * on, econ: (i.v2Payment - l2.principal) * on,
          note: on && l2.principal > 0.5 ? "of which " + F.money(l2.principal) + " repays principal" : "" },
        { label: "Vehicle two - depreciation", cash: 0, econ: v2Dep * on, note: on ? "no invoice, no direct debit" : "" },
        { label: "Vehicle two - insurance", cash: i.v2Insurance * on, econ: i.v2Insurance * on, note: "" },
        { label: "Vehicle two - fuel", cash: v2Fuel * on, econ: v2Fuel * on, note: "" },
        { label: "Vehicle two - maintenance & tires", cash: i.v2Maint * on, econ: i.v2Maint * on, note: "" },
        { label: "Vehicle two - registration", cash: i.v2Reg * on / 12, econ: i.v2Reg * on / 12, note: "" },
        { label: "Extra repair reserve", cash: i.repairs, econ: i.repairs, note: "" },
        { label: "Parking & permits", cash: i.parking, econ: i.parking, note: "" },
        { label: "Tolls", cash: i.tolls, econ: i.tolls, note: "" },
        { label: "Transit passes", cash: i.transit, econ: i.transit, note: "" },
        { label: "Rideshare & taxis", cash: i.rideshare, econ: i.rideshare, note: "" }
      ];

      /* What a second vehicle stands you before it moves: interest, insurance,
         registration and depreciation. Computed whether or not it is switched on. */
      var v2Fixed = l2.interest + i.v2Insurance + i.v2Reg / 12 + i.v2Value * (i.depRate / 100) / 12;

      var v2Verdict = on
        ? "Yours stands you " + F.money(v2Fixed) + " a month before it moves. Log how many days over the next two months it is genuinely the only option. If the answer is under thirty, rentals at $60-90 a day and occasional rideshare cost less than keeping it - and selling releases the car's value on top of its running cost."
        : "You have this switched off, so none of it is in your totals. The figures above are what a second vehicle on these terms would add: " + F.money(v2Fixed) + " a month, " + F.money(v2Fixed * 12) + " a year, before a single mile is driven. Price that against renting on the fifteen or twenty days a year you would actually need it.";

      /* The gap can legitimately be negative: equity being built faster than
         value is being lost. Every piece of copy has to handle both signs. */
      var gapNote;
      if (principal < 0.5) {
        gapNote = "With no loan principal being repaid against it, all of that is a straight reduction in what you own - " +
          F.money(deprec) + " a month of invisible cost with nothing offsetting it. This is the position a paid-off car is really in, and it is why &ldquo;no payment&rdquo; is not the same as &ldquo;no cost&rdquo;.";
      } else if (gap > 25) {
        gapNote = "The principal portion of your payments puts " + F.money(principal) +
          " a month back into equity, so the net invisible cost - value lost beyond value bought - is " +
          F.money(gap) + " a month, or " + F.money(gap * 12) + " a year. That is the figure your bank statement can never show you.";
      } else if (gap < -25) {
        /* Principal outrunning depreciation arises from two situations that
           need opposite explanations, and one string cannot be honest about
           both. A fresh loan that financed sales tax and fees shows this
           because part of every payment retires debt that never had resale
           value - no real equity is created. A matured loan shows it because
           the balance has genuinely fallen below the car's worth. Loan-to-
           value separates them cleanly. */
        var ltvGap = (i.v1Value + i.v2Value * on) > 0
          ? (i.v1Balance + i.v2Balance * on) / (i.v1Value + i.v2Value * on)
          : 0;
        gapNote = "The principal portion of your payments puts " + F.money(principal) +
          " a month back against the debt, which is more than your vehicles are losing - a gap of " +
          F.money(-gap) + " a month. " +
          (ltvGap > 0.9
            ? "On a loan this new, most of that is an accounting artifact rather than wealth: you financed the sales tax and dealer fees alongside the car, and those never carried any resale value, so part of every payment is retiring debt that bought nothing you can sell. Your position is improving, but by less than the gap suggests."
            : "This is the position you want as a loan matures - the balance now sits well below what the car is worth, so each payment genuinely adds to what you own. It reverses the day the loan ends and the depreciation carries on alone.");
      } else {
        gapNote = "Against it, the principal portion of your payments puts " + F.money(principal) +
          " a month back into equity - almost exactly the same figure. On a fresh five-year loan the two very nearly cancel: your payment is, near enough, your depreciation. The payment stops when the loan ends. The depreciation does not.";
      }

      var bi = bandFor(pctTake);

      return {
        trueMonthly: trueMonthly,
        trueAnnual: trueMonthly * 12,
        cashMonthly: cash,
        cashAnnual: cash * 12,
        deprecMonthly: deprec,
        deprecAnnual: deprec * 12,
        interestMonthly: vals.finance,
        principalMonthly: principal,
        gapMonthly: gap,
        gapAnnual: gap * 12,
        gapNote: gapNote,
        pctTake: pctTake,
        cashPctTake: cash / take * 100,
        pctGross: trueMonthly / gross * 100,
        cashPctGross: cash / gross * 100,
        depShare: trueMonthly > 0 ? deprec / trueMonthly * 100 : 0,
        perMile: trueMonthly * 12 / totalMiles,
        cashPerMile: cash * 12 / totalMiles,
        totalMiles: totalMiles,
        bandLabel: BANDS[bi].name,
        bandNote: BANDS[bi].note,
        bandIndex: bi,
        v2Fixed: v2Fixed,
        v2FixedAnnual: v2Fixed * 12,
        v2Verdict: v2Verdict,
        takeHome: take,
        vals: vals,
        lines: lines,
        _i: i
      };
    },
    onSeg: function (name, val, api) {
      if (name === "hasV2") {
        document.querySelectorAll('[data-when="v2"]').forEach(function (el) {
          el.hidden = val !== "yes";
        });
        document.querySelectorAll('[data-when="v2off"]').forEach(function (el) {
          el.hidden = val === "yes";
        });
      }
    },
    onInput: function (i) {
      var set = function (k, v) {
        document.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) {
          if (el.closest(".field")) el.textContent = v;
        });
      };
      set("v1Miles", F.num(i.v1Miles) + " mi/yr");
      set("v2Miles", F.num(i.v2Miles) + " mi/yr");
      set("v1Apr", i.v1Apr.toFixed(1) + "%");
      set("v2Apr", i.v2Apr.toFixed(1) + "%");
      set("depRate", i.depRate + "% /yr");
    },
    count: [],
    render: function (res, i) {
      /* ---- second-vehicle field visibility ------------------------------ */
      var v2on = i.hasV2 === "yes";
      document.querySelectorAll('[data-when="v2"]').forEach(function (el) { el.hidden = !v2on; });
      document.querySelectorAll('[data-when="v2off"]').forEach(function (el) { el.hidden = v2on; });

      /* ---- verdict band -------------------------------------------------- */
      var band = document.getElementById("band");
      if (band) {
        var active = BANDS[res.bandIndex];
        var pos = Math.min(100, Math.max(1.5, res.pctTake / 30 * 100));
        var html = '<div style="margin-bottom:18px">' +
          '<div class="bd-bar" style="height:14px">' +
            '<i style="width:' + pos.toFixed(1) + '%;background:var(' + active.css + ')"></i>' +
          '</div>' +
          '<div class="flex" style="justify-content:space-between;font-size:.75rem;color:var(--muted);margin-top:7px">' +
            '<span>0%</span><span>10%</span><span>20%</span><span>30%+</span>' +
          '</div></div>';

        html += BANDS.map(function (b, n) {
          var isNow = n === res.bandIndex;
          var lo = res.takeHome * b.lo / 100;
          var hi = res.takeHome * b.hi / 100;
          var money = b.hi > 900 ? "over " + F.money(lo) : F.money(lo) + " - " + F.money(hi);
          return '<div class="bd-row"' +
            (isNow ? ' style="background:var(--surface-2);border-radius:10px;padding-left:12px;padding-right:12px"' : '') + '>' +
            '<span class="bd-swatch" style="background:var(' + b.css + ')' + (isNow ? '' : ';opacity:.35') + '"></span>' +
            '<span class="bd-name"' + (isNow ? '' : ' style="font-weight:500;color:var(--muted)"') + '>' + b.name +
              (isNow ? ' <strong style="color:var(' + b.css + ')">- you are here, at ' + F.pct(res.pctTake) + '</strong>' : '') +
              '<small>' + b.note + '</small></span>' +
            '<span class="bd-pct num" style="width:62px">' + b.label + '</span>' +
            '<span class="bd-val num">' + money + '</span>' +
            '</div>';
        }).join("");
        band.innerHTML = html;
      }

      /* ---- category donut (segments sum to the true economic cost) -------- */
      var rows = CATS.map(function (c) { return { c: c, v: res.vals[c.key] || 0 }; })
                     .filter(function (r) { return r.v > 0.5; });
      var donut = document.getElementById("donut");
      if (donut) MDC.charts.donut(donut, rows.map(function (r) {
        return { label: r.c.label, value: r.v, cssVar: r.c.css };
      }), {
        centerLabel: "True cost",
        centerValue: F.money(res.trueMonthly),
        centerSub: F.pct(res.pctTake) + " of take-home",
        aria: "Household transport cost by category"
      });

      var bd = document.getElementById("breakdown");
      if (bd) {
        var sorted = rows.slice().sort(function (a, b) { return b.v - a.v; });
        var biggest = sorted[0];
        var tail;
        if (res.principalMonthly < 0.5) {
          tail = 'These sum to the true economic cost, not the cash total. With nothing outstanding on the vehicles there is no principal to net off, so every dollar of depreciation is a dollar of cost.';
        } else {
          tail = 'These sum to the true economic cost, not the cash total. The financing line is <strong>interest only</strong> - the ' +
            F.money(res.principalMonthly) + ' of principal inside your payments buys equity rather than vanishing, so it is cash out but not economic cost.';
        }
        bd.innerHTML = sorted.map(function (r) {
          var pct = res.trueMonthly > 0 ? r.v / res.trueMonthly * 100 : 0;
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + r.c.css + ')"></span>' +
            '<span class="bd-name">' + r.c.label + '<small>' + F.money(r.v * 12) + ' / year</small></span>' +
            '<span class="bd-pct num">' + Math.round(pct) + '%</span>' +
            '<span class="bd-val num">' + F.money(r.v) + '/mo</span>' +
            '</div>';
        }).join("") +
        '<p class="text-muted" style="font-size:.84rem;margin-top:14px">' +
        (biggest ? 'Your largest single line is <strong>' + biggest.c.label + '</strong> at ' + F.money(biggest.v) + ' a month. ' : '') +
        tail + '</p>';
      }

      /* ---- line-by-line ledger, cash beside true cost --------------------- */
      var led = document.getElementById("ledger");
      if (led) {
        var take = res.takeHome;
        var body = "";
        res.lines.forEach(function (l) {
          if (l.cash < 0.5 && l.econ < 0.5) return;
          body += '<tr><td>' + l.label +
            (l.note ? '<small class="text-muted" style="display:block">' + l.note + '</small>' : '') + '</td>' +
            '<td class="num">' + (l.cash < 0.005 ? '&mdash;' : F.money(l.cash)) + '</td>' +
            '<td class="num">' + (l.econ < 0.005 ? '&mdash;' : F.money(l.econ)) + '</td>' +
            '<td class="num">' + F.money(l.econ * 12) + '</td>' +
            '<td class="num">' + F.pct(l.econ / take * 100) + '</td></tr>';
        });
        body += '<tr><td><strong>Total</strong></td>' +
          '<td class="num"><strong>' + F.money(res.cashMonthly) + '</strong></td>' +
          '<td class="num"><strong>' + F.money(res.trueMonthly) + '</strong></td>' +
          '<td class="num"><strong>' + F.money(res.trueAnnual) + '</strong></td>' +
          '<td class="num"><strong>' + F.pct(res.pctTake) + '</strong></td></tr>';

        var recon = 'The two totals reconcile exactly: cash of <strong>' + F.money(res.cashMonthly) +
          '</strong> less <strong>' + F.money(res.principalMonthly) + '</strong> of principal repaid, plus <strong>' +
          F.money(res.deprecMonthly) + '</strong> of depreciation, gives <strong>' + F.money(res.trueMonthly) +
          '</strong>. Principal comes out because it buys equity rather than vanishing; depreciation goes in because it vanishes without ever being billed.';

        led.innerHTML = '<div class="table-wrap"><table class="tbl">' +
          '<thead><tr><th>Line item</th><th class="num">Cash / mo</th><th class="num">True cost / mo</th>' +
          '<th class="num">True cost / yr</th><th class="num">Of take-home</th></tr></thead>' +
          '<tbody>' + body + '</tbody></table></div>' +
          '<p class="text-muted" style="font-size:.85rem;margin-top:12px">' + recon +
          ' Annual items such as registration are divided by twelve so they stop arriving as surprises. Blended true cost per mile across the household is <strong>' +
          F.perMile(res.perMile) + '</strong>, against <strong>' + F.perMile(res.cashPerMile) + '</strong> in cash.</p>';
      }
    }
  });
})();
`;

module.exports = {
  slug: "monthly-budget",
  jsName: "budget",
  formId: "budget-form",
  crumbName: "Monthly Budget",
  appName: "Monthly Transportation Budget Calculator",
  title: "Monthly Transportation Budget Calculator | MyDrivingCost",
  desc:
    "Add up every transport cost your household carries — vehicles, parking, tolls, transit and rideshare — then measure the total against your take-home pay.",
  ogTitle: "Monthly Transportation Budget — the whole household bill",
  ogDesc:
    "Transport is the second-largest household expense after housing, and the one people underestimate most. See the cash cost, the true cost, and the gap.",
  h1: "Monthly Transportation Budget Calculator",
  lead:
    "Transport is the second-largest expense in most households and the one people underestimate most, because the true figure includes depreciation and depreciation never appears on a bank statement. Enter what your household runs and see both numbers: what leaves your account, and what this actually costs you.",
  inputs,
  results,
  floatBar,
  prose,
  js,
  disclaimer:
    "Interest is estimated as this month's balance × APR ÷ 12, which is exact for the month you are budgeting and overstates later months as the balance falls. The principal portion of each payment is netted out of the true-cost figure because it buys equity rather than vanishing; depreciation is charged at your chosen rate on each vehicle's current market value. Actual costs vary by vehicle, location, driving pattern and market conditions. Not financial advice.",
  sources: ["BLS_CEX", "AAA_YDC", "FED_G19", "EIA_GAS"],
  sourceNotes: [
    "The point of this page is that the payment is not the cost. Every line beyond the payment &mdash; insurance, fuel, maintenance, registration and the depreciation nobody bills you for &mdash; is drawn from the same national reference points used elsewhere on this site, and every one of them is editable.",
  ],
  related: [
    ["/calculators/affordability/", "Car Affordability", "Work the other direction: what vehicle your income can actually carry."],
    ["/calculators/true-cost-to-own/", "True Cost to Own", "One vehicle, six cost categories, laid out year by year over five years."],
    ["/calculators/cost-per-mile/", "Cost Per Mile", "Reduce a single vehicle to one honest number, depreciation included."],
    ["/calculators/insurance-estimator/", "Insurance Estimator", "The fastest line to cut in any transport budget. See what you should be paying."],
  ],
  faq: [
    [
      "What percentage of income should go to transportation?",
      "Aim for under 15 percent of take-home pay for everything transport-related, and treat 10 percent or less as the comfortable target. The widely quoted 15 to 20 percent guidance is measured against gross pay and originates with lenders, so it describes the maximum they will extend rather than what a household should spend. On $5,000 of monthly take-home, 15 percent is $750 for all vehicles, fuel, insurance, maintenance, parking and transit combined — achievable with one financed car, and rarely with two.",
    ],
    [
      "Is transportation really the second-biggest household expense?",
      "Yes. In the Bureau of Labor Statistics' Consumer Expenditure Survey, transportation has ranked second behind housing for decades, at roughly 16 to 17 percent of average household spending against about 33 percent for shelter. It comes ahead of food, healthcare, insurance and entertainment. It feels smaller than it is because it arrives in a dozen small pieces rather than one monthly payment, and because the largest single piece — depreciation — never produces a transaction at all.",
    ],
    [
      "Should I count the whole car payment as a cost?",
      "No, and this is the most consequential mistake in household transport budgeting. Only the interest portion is a true cost. The principal portion buys equity in an asset you will later sell, and depreciation is exactly the process that destroys that equity — so counting the full payment alongside depreciation charges you twice for the same money. This calculator shows both views: the cash figure includes the whole payment because that is what leaves your account, while the true-cost figure nets the principal out and adds depreciation instead.",
    ],
    [
      "What is the difference between cash cost and true cost?",
      "Cash cost is what leaves your accounts: payments, insurance, fuel, maintenance, registration, parking, tolls, transit and rideshare. True cost takes that figure, subtracts the loan principal you repaid because it buys equity, and adds the market value your vehicles shed. On a fresh five-year loan the two adjustments nearly cancel and the totals land close together. On a paid-off vehicle there is no principal to subtract, so the true cost sits well above the cash cost — often by several hundred dollars a month.",
    ],
    [
      "How much does a second car cost per month?",
      "A paid-off second vehicle worth $12,000 costs about $283 a month before it moves: roughly $150 of depreciation, $118 of insurance and $15 of registration. Finance the same car and interest pushes the standing cost past $350, while the cash leaving your account rises further still with the payment. Add fuel and maintenance and a lightly used second car commonly runs $400 to $600 all in — which is why logging how many days a year it is genuinely essential is worth doing before the next insurance renewal.",
    ],
    [
      "Is a paid-off car free to run?",
      "No, and it is the case where the hidden cost is largest. With no payment you still carry insurance, fuel, maintenance, registration and depreciation — and crucially there is no principal repayment left to offset that depreciation. On a car worth $12,000 falling at 15 percent a year, that is $150 a month of pure invisible cost. A paid-off car is still much cheaper than a financed one, because the interest has stopped and the depreciation shrinks as the value does. It is not free.",
    ],
    [
      "Why is this higher than your 98 cents per mile benchmark?",
      "Because they measure different things. The 98-cent figure is a five-year average for a $34,000 vehicle. This page is a snapshot of the month you are in, and for a car bought new on a fresh loan that is the most expensive month of the period: depreciation is charged on the highest value the car will ever have, and the first month of a 60-month loan carries the most interest it will ever carry. Run the same vehicle four years later and this calculator prints about 76 cents a mile. Average the run and you arrive back at the benchmark.",
    ],
    [
      "Does moving further out to afford a house actually save money?",
      "Less often than people expect. Twenty extra miles each way costs roughly $3,500 a year in marginal driving cost for one commuter, about $292 a month — enough to service around $44,000 of mortgage at 7 percent. So a $40,000 cheaper house twenty miles out is close to a wash in pure cash terms, before counting the 250 hours a year spent driving and before the increased likelihood that the household ends up needing a second vehicle. The trade can still be right; it needs calculating rather than assuming.",
    ],
  ],
};
