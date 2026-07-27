const C = require("../calcpage");
const { num, rng, seg, group, advanced, hero, tiles, chartCard, callout, bullets, table } = C;

/* ------------------------------------------------------------------ HTML -- */

const inputs = [
  group(
    "Your income",
    [
      num("grossMonthly", "Gross household income", 6500, {
        prefix: "$",
        suffix: "/mo",
        min: 500,
        step: 100,
        help: "Everything before tax, for everyone whose money pays for this vehicle.",
      }),
      rng("takeHomePct", "What actually lands in the account", 76, {
        min: 55,
        max: 95,
        step: 1,
        initial: "76%",
        help: "After income tax, payroll tax, health premiums and retirement contributions. Most households keep 70&ndash;80% of gross.",
      }),
    ].join("\n              ")
  ),
  group(
    "Your rules",
    [
      rng("budgetPct", "Share of take-home for all transport", 15, {
        min: 5,
        max: 25,
        step: 1,
        initial: "15%",
        help: "Three conventions compete here. 10% is the conservative classic, 15% is what most planners now use, 20% is the ceiling. All three are quoted as <em>all-in</em> figures &mdash; not payment-only &mdash; and almost everyone who repeats them applies them to the payment by mistake.",
      }),
      num("down", "Cash down payment", 3400, { prefix: "$", min: 0, step: 250 }),
      num("tradeIn", "Trade-in equity", 0, {
        prefix: "$",
        min: 0,
        step: 250,
        help: "What the old vehicle is worth beyond what you still owe on it. If that number is negative, you have a problem to solve before you buy.",
      }),
      seg(
        "term",
        "Loan term",
        [["36", "36 mo"], ["48", "48 mo"], ["60", "60 mo"], ["72", "72 mo"]],
        "60"
      ),
      rng("apr", "APR", 7.2, { min: 0, max: 24, step: 0.1, initial: "7.2%" }),
    ].join("\n              "),
    "var(--c-finance)"
  ),
  group(
    "Running costs",
    [
      rng("miles", "Annual miles", 12000, {
        min: 2000,
        max: 40000,
        step: 500,
        initial: "12,000 mi/yr",
      }),
      num("mpg", "Combined MPG", 30, { suffix: "mpg", min: 8, max: 140, step: 1 }),
      num("fuel", "Fuel price", 4.0, { prefix: "$", suffix: "/gal", min: 1, max: 12, step: 0.05 }),
      num("insurance", "Full-coverage insurance", 2496, {
        prefix: "$",
        suffix: "/yr",
        min: 300,
        step: 50,
        help: "Your premium on a $34,000 vehicle. The calculator scales it up or down with the price it solves for &mdash; a $60,000 car does not cost the same to insure, and pretending otherwise is how affordability tools flatter you.",
      }),
    ].join("\n              "),
    "var(--c-fuel)"
  ),
  advanced(
    [
      `<p class="field-help">Everything below feeds the all-in figure. The defaults are the site-wide benchmarks used by every other calculator here.</p>`,
      num("tax", "Sales tax", 7, { suffix: "%", min: 0, max: 15, step: 0.1 }),
      num("reg", "Registration &amp; plates", 220, { prefix: "$", suffix: "/yr", min: 0, step: 10 }),
      num("fees", "Doc, title &amp; dealer fees", 700, { prefix: "$", min: 0, step: 25 }),
      num("reserve", "Repair reserve", 60, {
        prefix: "$",
        suffix: "/mo",
        min: 0,
        step: 10,
        help: "A sinking fund for the failures no schedule predicts. It is a budgeting line, not a cost estimate &mdash; set it to zero if you would rather not hold one.",
      }),
      num("otherDebt", "Other monthly debt payments", 2100, {
        prefix: "$",
        suffix: "/mo",
        min: 0,
        step: 50,
        help: "Rent or mortgage, cards, student loans &mdash; everything a lender counts when it works out your debt-to-income ratio.",
      }),
      num("keepYears", "Years you'll keep it", 5, { suffix: "yrs", min: 1, max: 20, step: 1 }),
    ].join("\n                  ")
  ),
].join("\n            ");

const results = [
  hero(
    "Affordability summary",
    "The most vehicle this income can carry",
    "maxPrice",
    "money",
    'At <strong data-out="budgetPctLabel">15%</strong> of a <strong class="num" data-out="takeHome" data-fmt="money">&mdash;</strong> take-home, your entire transport budget is <strong class="num" data-out="budget" data-fmt="money">&mdash;</strong> a month. Once insurance, fuel, maintenance, registration and a repair reserve are paid, that leaves <strong class="num" data-out="payment" data-fmt="money">&mdash;</strong> for the loan &mdash; and this is the price it buys.'
  ),
  tiles([
    ["Monthly payment", "payment", "money", 'Over <span data-out="termLabel">60 months</span>, after your down payment'],
    ["All-in monthly cost", "allIn", "money", "Payment plus every other bill the car generates"],
    ["A payment-only tool would say", "dealerPrice", "money", 'That is <span class="num" data-out="gap" data-fmt="money">&mdash;</span> more car, on the same budget'],
  ]),
  chartCard(
    "Where the monthly budget actually goes",
    "The all-in cost at your maximum price, split into the six bills that make it up",
    `<div class="donut-wrap">
            <div id="donut"></div>
            <div class="breakdown" id="breakdown"></div>
          </div>`
  ),
  chartCard(
    "Ten, fifteen or twenty percent",
    "The same household under all three budget conventions",
    `<div id="rules-table"></div>`
  ),
  callout(
    "The honest number against the dealer's number",
    '<span data-out="gapNote">&mdash;</span>'
  ),
  callout(
    "The 20/4/10 test",
    '<span data-out="ruleNote">&mdash;</span>'
  ),
  callout(
    "What a lender would approve",
    '<span data-out="lenderNote">&mdash;</span>'
  ),
  callout(
    "What 84 months would &ldquo;let&rdquo; you buy",
    '<span data-out="note84">&mdash;</span>',
    "warn"
  ),
].join("\n\n        ");

const floatBar = `<div class="float-summary no-print" id="floatSummary" aria-hidden="true">
  <div class="fs-item"><span class="k">Max price</span><span class="v num" data-out="maxPrice" data-fmt="money">—</span></div>
  <div class="fs-sep"></div>
  <div class="fs-item fs-hide-sm"><span class="k">All-in monthly</span><span class="v num" data-out="allIn" data-fmt="money">—</span></div>
  <button type="button" class="btn btn-primary btn-sm" data-scroll="calc">Edit</button>
</div>`;

/* ------------------------------------------------------------------ prose -- */

const prose = `
    <h2 id="wrong-variable">The payment is the wrong variable</h2>
    <p>Every affordability calculator published by a dealer, a manufacturer or a lender solves the same equation: given a monthly figure you are comfortable with, how large a loan does that support? It is a tidy piece of arithmetic and it answers a question nobody should be asking. The payment is not what a car costs. It is one of six bills the car generates, and on a modestly priced vehicle it is not even the largest one.</p>
    <p>The reason the industry frames it that way is not mysterious. A payment is the only number a seller controls, and it can be made to look like almost anything by moving the term, the rate or the down payment. Two extra years on the loan can turn an unaffordable car into a comfortable-sounding payment without changing a single thing about the vehicle. Insurance, fuel, tires and the failed compressor in year four are somebody else's problem &mdash; specifically, yours, arriving after the paperwork is signed.</p>
    <p>This calculator refuses that framing. It takes your income, applies a share of take-home pay to <em>all</em> transport, subtracts every running cost the vehicle will generate, and only then works out what is left for a loan payment. On the default assumptions &mdash; $6,500 a month gross, 76% take-home, 15% for transport &mdash; the honest answer is a vehicle around <strong>$15,400</strong>. Feed the same $741-a-month budget into a payment-only model and it returns roughly <strong>$37,300</strong>. That $21,900 gap is not a difference of opinion; it is the set of costs one method counts and the other ignores. For most incomes the honest answer points at a used vehicle, and that is a finding rather than a defect in the model.</p>

    <h2 id="formula">What the calculator actually solves</h2>
    <p>It is a root-finding problem rather than a formula, because two of the costs depend on the answer. A more expensive car costs more to insure and more to maintain, so you cannot compute the running costs until you know the price, and you cannot know the price until you have computed the running costs. The calculator resolves that by searching.</p>
    ${callout(
      "Find the price P where all-in monthly cost = budget",
      `<p style="margin:0 0 10px"><strong>Budget</strong> = gross &times; take-home% &times; transport%. <strong>All-in(P)</strong> = loan payment on (P + sales tax + fees &minus; down &minus; trade) + insurance(P)/12 + maintenance(P)/12 + fuel + registration/12 + repair reserve.</p><p style="margin:0 0 10px">Insurance and maintenance scale with the vehicle. Roughly 62% of a full-coverage premium is liability and driver-based and barely moves with price; the other 38% is comprehensive and collision, which tracks the value of the metal. Maintenance splits about 45/55 the same way &mdash; oil and filters cost much the same on any car, while tires, brakes, labor rates and part prices climb with the vehicle. The calculator applies those splits against the $34,000 / $2,496 / $1,588 benchmarks used throughout this site.</p><p style="margin:0">It then bisects between $2,000 and $250,000 &mdash; forty halvings, accurate to well under a dollar &mdash; to find the price at which all-in cost exactly consumes the budget.</p>`
    )}
    <p>One deliberate choice deserves flagging. This is a <em>cash-flow</em> model, not an economic-cost model. It counts the loan payment, which includes principal &mdash; money that buys equity rather than disappearing. Our <a href="/calculators/true-cost-to-own/">true cost to own</a> calculator counts depreciation instead, which is the correct way to compare two vehicles. Affordability is a different question: it asks what leaves your account each month, and principal leaves your account. That is why the monthly figure here runs above the $982 a month we publish as the five-year economic cost of a $34,000 SUV.</p>

    <h2 id="benchmarks">What each income actually supports</h2>
    <p>Applying 15% of take-home to all transport, at 76% take-home, 12,000 miles a year, 30 mpg, $3,400 down and 7.2% over 60 months:</p>
    ${table(
      ["Gross income", "Take-home", "Transport budget", "Max vehicle price", "Loan payment"],
      [
        ["$3,500 / mo", "$2,660", "$399 / mo", "Nothing financeable", "$0 &mdash; running costs alone use the budget"],
        ["$5,000 / mo", "$3,800", "$570 / mo", "$8,750", "$133"],
        ["$6,500 / mo", "$4,940", "$741 / mo", "$15,400", "$274"],
        ["$8,500 / mo", "$6,460", "$969 / mo", "$24,300", "$463"],
        ["$12,000 / mo", "$9,120", "$1,368 / mo", "$39,800", "$794"],
      ],
      [1, 2, 3, 4]
    )}
    <p>The first row is the most instructive. At $42,000 a year, insurance, fuel, maintenance, registration and a repair reserve consume the entire 15% before a single dollar reaches a lender. The implication is not that such a household cannot own a car; it is that it must own one outright, drive fewer miles, or accept that transport will take more than 15% of what it earns. The last row makes the opposite point: a household on $144,000 lands at $39,800 &mdash; comfortably a new vehicle, but not the $70,000 truck that income is routinely sold. The all-in method scales, but less generously than the payment method, because running costs grow with the vehicle too.</p>

    <h2 id="rule-20-4-10">The 20/4/10 rule, and where it is too strict</h2>
    <p>The best-known guideline in car buying is 20/4/10: put 20% down, finance for no more than four years, and keep total transport costs under 10% of gross income. It is a good rule, and its three clauses do different work. The 20% down offsets first-year depreciation so you are never underwater. The four-year term forces principal to repay faster than the car loses value. The 10% ceiling is the one that bites.</p>
    <p>Applied literally to the default household, 20/4/10 permits a vehicle of about <strong>$9,300</strong>. That is a real answer, and for a household carrying student loans and a stretched mortgage it may well be the right one. But 10% <em>of gross</em> is a harsh test on a modest income and a soft one on a large one, because the share of gross income that survives to become spendable money varies enormously across the range. And the rule is really a proxy for your total fixed commitments: if you have no housing cost to speak of &mdash; a paid-off home, a subsidized rental &mdash; transport can take a larger share without crowding anything out. Treat 20/4/10 as the floor of prudence and 15% of take-home as the working ceiling.</p>

    <h2 id="dti">What a lender approves is not what you can afford</h2>
    <p>Lenders do not evaluate affordability. They evaluate the probability of repayment, which is a different thing and is optimized for a different party. The standard test is a back-end debt-to-income ratio: total monthly debt payments, including the new car, divided by gross monthly income. Most auto lenders will go to 45%, many to 50%, and captive finance arms will stretch further on a strong credit score.</p>
    <p>Run the default household through that test. With $2,100 a month of existing obligations against $6,500 gross, a 45% ceiling leaves $825 a month of headroom &mdash; enough to approve a vehicle of about <strong>$41,300</strong>. The all-in method says $15,400. The lender is not lying; its model is well calibrated for default risk, because a car payment is one of the last bills anyone stops paying. What the model does not measure is the retirement contribution that quietly stopped, the emergency fund that never got rebuilt, or the credit card that absorbed the transmission. Two structural points follow: a DTI approval counts the payment and not the insurance, fuel or maintenance, so it is a payment-only calculation wearing a suit &mdash; and the lender's exposure ends when the loan is repaid, while yours continues for as long as you own the vehicle.</p>

    <h2 id="four-costs">A cheaper car cuts four bills, not one</h2>
    <p>The most underrated fact in vehicle budgeting is that price is not one lever, it is four. Drop the purchase price and the payment falls, the insurance premium falls, the sales tax falls, and &mdash; because depreciation is a percentage of a smaller number &mdash; the value you lose falls too. Nothing else on the spec sheet does that.</p>
    ${table(
      ["Vehicle price", "Payment (60 mo)", "Insurance / yr", "Sales tax", "5-year depreciation", "All-in / mo"],
      [
        ["$18,000", "$329", "$2,050", "$1,260", "$10,500", "$808"],
        ["$26,000", "$500", "$2,273", "$1,820", "$15,100", "$1,013"],
        ["$34,000", "$670", "$2,496", "$2,380", "$19,800", "$1,219"],
        ["$45,000", "$904", "$2,803", "$3,150", "$26,200", "$1,502"],
        ["$60,000", "$1,224", "$3,221", "$4,200", "$34,900", "$1,887"],
      ],
      [1, 2, 3, 4, 5]
    )}
    <p>Read across the $34,000 and $18,000 rows. The payment difference is $341 a month, which is the number everyone looks at. But the cheaper car also saves $37 a month in insurance, $1,120 in sales tax at purchase, and $9,300 of value over five years &mdash; another $155 a month of wealth that stays yours. The complete gap is far wider than the payment implies, and it compounds: the smaller depreciation loss means a stronger trade-in position next time, which reduces the next loan. It is also why the advice that falls out of this calculator is so unglamorous. Buying at two to four years old does not merely save on the sticker; it moves you onto a flatter part of the <a href="/calculators/depreciation/">depreciation curve</a> while cutting three other lines at once.</p>

    <h2 id="negative-equity">Negative equity compounds across trades</h2>
    <p>Buying more car than the budget carries rarely produces a dramatic failure. It produces a slow one, and the mechanism is negative equity. A new vehicle loses about 20% in year one; a 72- or 84-month loan repays principal slowly at the start. Between those two curves sits a period &mdash; four years on an 84-month loan with little down &mdash; during which you owe more than the car is worth.</p>
    <p>That gap is harmless until you move. Then it is not. Trade at month 30 with $6,000 of negative equity and the dealer will happily roll it into the next loan, so you finance $40,000 on a $34,000 car, start the next term further underwater, and take an even longer loan to keep the payment tolerable. Do that twice and a household is paying interest on two vehicles it no longer owns. By the third trade it is structural: the shortfall now exceeds any plausible down payment, and the only exit is to keep a vehicle for its full life for the first time in a decade. If the honest number is smaller than you hoped, the cost of ignoring it is not a tight month &mdash; it is a decade of loans that never quite finish.</p>

    <h2 id="better">How to raise the number honestly</h2>
    ${bullets([
      "<strong>Attack the running costs before the payment.</strong> On a $15,000 vehicle, insurance, fuel, maintenance and reserve are about 63% of the monthly total. Shopping insurance properly or picking a 38 mpg car frees far more budget than arguing over the price.",
      "<strong>Raise the down payment, not the term.</strong> Every extra $1,000 down buys roughly $1,000 of price at the same monthly cost, permanently. Every extra year of term buys price you then pay for twice.",
      "<strong>Get pre-approved by a credit union first.</strong> Two points of APR on a five-year loan is worth several hundred dollars of price at the same payment, and it removes the finance office's best lever.",
      "<strong>Check the insurance quote before you commit to the car, not after.</strong> Premiums vary by more than 50% between otherwise similar vehicles on repair cost and theft rate alone. It is a five-minute call that can move your maximum price by thousands.",
      "<strong>Buy at two to four years old.</strong> You skip the steepest part of the value curve while the same budget buys materially more vehicle, which usually means a better-equipped or more reliable one.",
      "<strong>Keep it longer than the loan.</strong> Years six through ten, with no payment, are where the all-in number collapses and the budget you built here starts producing savings instead of consuming them.",
      "<strong>Count the commute honestly.</strong> The mileage slider is not decoration. Going from 12,000 to 20,000 miles a year costs about $89 a month in fuel alone at 30 mpg, which is roughly $4,500 of vehicle price.",
      "<strong>Solve the trade-in before you shop.</strong> If you are underwater on the current car, deal with that as its own problem. Rolling it forward simply moves the shortfall into a longer, more expensive loan.",
    ])}

    <h2 id="stretching">When stretching is defensible</h2>
    <p>There is an honest case for exceeding the number this calculator gives you, and it is narrower than most people would like. The strongest version is a vehicle that is load-bearing for your income: a contractor's truck, a rural commute with no alternative, a job that disappears if the car does not start. In that case the vehicle is closer to a capital expense than a consumption choice, reliability is worth paying for, and the relevant comparison is not against a cheaper car but against lost earnings.</p>
    <p>Two weaker cases still hold. If the purchase replaces a vehicle consuming $250 a month in unpredictable repairs, part of the new payment is funded by repairs you stop making &mdash; though be honest about the figure, because remembered repair costs are almost always inflated. And if a known, dated income increase is arriving, stretching briefly against it is a reasonable bet provided the term is short enough that a reversal is survivable. What does not qualify: the trim level, the badge, the fact that the payment fits at 84 months, or the observation that a colleague on a similar salary drives something dearer. Resist that last one specifically &mdash; you cannot see their balance sheet, and the numbers above suggest it is worse than it looks.</p>

    <h2 id="mistakes">Common mistakes</h2>
    ${callout(
      "Budgeting the payment and discovering the rest",
      "This is the single most expensive error in car buying, and it is committed by people who are otherwise careful with money. A $670 payment on a $34,000 vehicle comes with roughly $550 a month of insurance, fuel, maintenance, registration and repairs attached to it. If the budget was built around $670, the other $550 has to come from somewhere &mdash; and it comes from savings, from retirement contributions, or from a credit card. The car does not feel unaffordable. Everything else does.",
      "warn"
    )}
    ${bullets([
      "<strong>Using last year's insurance premium for a newer, dearer car.</strong> Comprehensive and collision track the value of the vehicle. Moving from a $12,000 car to a $40,000 one commonly adds $60&ndash;$100 a month, and it is discovered after the purchase almost every time.",
      "<strong>Treating the down payment as affordability.</strong> A large down payment reduces the loan; it does not reduce insurance, fuel, tires or depreciation. Paying cash for a vehicle you cannot afford to run is still buying a vehicle you cannot afford.",
      "<strong>Forgetting sales tax and fees are financed.</strong> On the default assumptions they add about $3,080 to a $34,000 purchase &mdash; roughly $61 a month of payment that buys you nothing.",
      "<strong>Assuming maintenance is zero because it is new.</strong> A warranty covers defects, not tires, brakes, wipers, alignment or fluids, and it expires precisely when the expensive failures begin.",
      "<strong>Budgeting for two cars as though they were one.</strong> Each vehicle carries its own insurance, registration and reserve. Two $10,000 cars cost meaningfully more per month to run than one $20,000 car, which is a genuine argument for consolidating where a household can.",
      "<strong>Ignoring the repair reserve because nothing has broken yet.</strong> The reserve is not a prediction that something will fail this month. It is the reason a $1,400 repair in year four is an inconvenience rather than a balance carried at 24% APR.",
    ])}
`;

/* -------------------------------------------------------------------- JS -- */

const js = `/* Car Affordability Calculator — MyDrivingCost.com */
(function () {
  "use strict";
  var MDC = window.MDC, F = MDC.fmt, M = MDC.model;

  /* Site-wide benchmarks. Insurance and maintenance are quoted for a $34,000
     vehicle and scaled from there — part of each bill is fixed, part tracks
     the value of the metal. */
  var REF_PRICE = 34000;
  /* The five-year average of the escalating maintenance schedule the true cost
     to own calculator runs ($1,250 in year one, +12% a year, $7,941 total).
     Affordability is a cash-flow question about a single month, so it uses the
     flat average rather than the schedule — but it has to be the SAME average,
     or two calculators quote different maintenance for the same car. */
  var MAINT_BASE = 1588;
  var INS_FIXED = 0.62, MAINT_FIXED = 0.45;

  function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }

  function scale(price, fixedShare) {
    return clamp(fixedShare + (1 - fixedShare) * price / REF_PRICE, 0.4, 2.6);
  }

  /* Full monthly cost stack for a given vehicle price. */
  function costs(price, i, term, down, trade) {
    var t = i.tax / 100;
    var taxable = Math.max(0, price - trade);
    var otd = price + taxable * t + i.fees;
    var financed = Math.max(0, otd - down - trade);
    var pay = M.payment(financed, i.apr, term);
    var ins = i.insurance * scale(price, INS_FIXED) / 12;
    var maint = MAINT_BASE * scale(price, MAINT_FIXED) / 12;
    var fuel = (i.miles / 12) / Math.max(1, i.mpg) * i.fuel;
    var reg = i.reg / 12;
    var res = Math.max(0, i.reserve);
    return {
      price: price, otd: otd, financed: financed, salesTax: taxable * t,
      payment: pay, ins: ins, maint: maint, fuel: fuel, reg: reg, reserve: res,
      running: ins + maint + fuel + reg + res,
      allIn: pay + ins + maint + fuel + reg + res
    };
  }

  /* Bounded bisection. The cost function rises monotonically with price, so
     forty halvings of a $2,000–$250,000 window lands well inside a dollar. */
  function solve(target, fn) {
    var lo = 2000, hi = 250000, mid = lo;
    for (var n = 0; n < 40; n++) {
      mid = (lo + hi) / 2;
      if (fn(mid) > target) hi = mid; else lo = mid;
    }
    return (lo + hi) / 2;
  }

  /* Months spent owing more than the vehicle is worth. */
  function underwater(price, financed, apr, term) {
    var r = apr / 100 / 12, pay = M.payment(financed, apr, term);
    var bal = financed, last = 0, interest = 0;
    for (var m = 1; m <= term; m++) {
      var due = bal * r;
      interest += due;
      bal = Math.max(0, bal + due - pay);
      var yr = m / 12;
      var val = price * Math.pow(0.80, Math.min(1, yr)) * (yr > 1 ? Math.pow(0.85, yr - 1) : 1);
      if (bal > val) last = m;
    }
    return { months: last, interest: interest };
  }

  MDC.calc({
    form: "afford-form",
    defaults: {
      grossMonthly: 6500, takeHomePct: 76,
      budgetPct: 15, down: 3400, tradeIn: 0, term: "60", apr: 7.2,
      miles: 12000, mpg: 30, fuel: 4.0, insurance: 2496,
      tax: 7, reg: 220, fees: 700, reserve: 60, otherDebt: 2100, keepYears: 5
    },
    compute: function (i) {
      var term = parseInt(i.term, 10) || 60;
      var takeHome = i.grossMonthly * i.takeHomePct / 100;
      var budget = takeHome * i.budgetPct / 100;

      /* The honest answer: all-in cost equals the budget. */
      var maxPrice = solve(budget, function (p) {
        return costs(p, i, term, i.down, i.tradeIn).allIn;
      });
      var c = costs(maxPrice, i, term, i.down, i.tradeIn);
      var tooTight = maxPrice <= 2100;

      /* The dealer's answer: the whole budget goes to the payment. */
      var dealerPrice = solve(budget, function (p) {
        return costs(p, i, term, i.down, i.tradeIn).payment;
      });

      /* 20/4/10 — 20% down, 48 months, all-in under 10% of GROSS. */
      var ruleBudget = i.grossMonthly * 0.10;
      var rulePrice = solve(ruleBudget, function (p) {
        return costs(p, i, 48, p * 0.2, 0).allIn;
      });
      var downPct = maxPrice > 0 ? i.down / maxPrice * 100 : 0;
      var passDown = downPct >= 20, passTerm = term <= 48, passTen = c.allIn <= ruleBudget + 1;
      var passAll = passDown && passTerm && passTen;

      /* What a lender would sign off: back-end DTI at 45% of gross. */
      var allowedPay = Math.max(0, i.grossMonthly * 0.45 - i.otherDebt);
      var lenderPrice = solve(allowedPay, function (p) {
        return costs(p, i, term, i.down, i.tradeIn).payment;
      });
      var dti = i.grossMonthly > 0 ? (i.otherDebt + c.payment) / i.grossMonthly * 100 : 0;

      /* The 84-month version of the same budget. */
      var price84 = solve(budget, function (p) {
        return costs(p, i, 84, i.down, i.tradeIn).allIn;
      });
      var c84 = costs(price84, i, 84, i.down, i.tradeIn);
      var u84 = underwater(price84, c84.financed, i.apr, 84);
      var uNow = underwater(maxPrice, c.financed, i.apr, term);

      /* The three budget conventions, side by side. */
      var rules = [10, 15, 20].map(function (pct) {
        var b = takeHome * pct / 100;
        var p = solve(b, function (x) { return costs(x, i, term, i.down, i.tradeIn).allIn; });
        var rc = costs(p, i, term, i.down, i.tradeIn);
        return { pct: pct, budget: b, price: p, payment: rc.payment, floor: p <= 2100 };
      });

      return {
        /* At the very bottom of the range the search hits its floor and the
           running costs alone have already eaten the budget. Report zero
           rather than the floor, and let the callout explain why. */
        maxPrice: tooTight ? 0 : maxPrice,
        solvedPrice: maxPrice,
        payment: c.payment,
        allIn: c.allIn,
        dealerPrice: dealerPrice,
        gap: Math.max(0, dealerPrice - maxPrice),
        budget: budget,
        takeHome: takeHome,
        running: c.running,
        outTheDoor: c.otd,
        financed: c.financed,
        totalKeep: i.down + c.allIn * 12 * Math.max(1, i.keepYears),
        keepLabel: Math.max(1, i.keepYears) + (i.keepYears === 1 ? " year" : " years"),
        termLabel: term + " months",
        budgetPctLabel: i.budgetPct + "%",
        dti: dti,
        rulePrice: rulePrice,
        ruleBudget: ruleBudget,
        lenderPrice: lenderPrice,
        allowedPay: allowedPay,
        price84: price84,
        payment84: c84.payment,
        under84: u84.months,
        interest84: u84.interest,
        underNow: uNow.months,
        interestNow: uNow.interest,
        tooTight: tooTight,
        passDown: passDown, passTerm: passTerm, passTen: passTen, passAll: passAll,
        downPct: downPct,
        rules: rules,
        parts: c,
        term: term,
        _i: i
      };
    },
    onInput: function (i) {
      var set = function (k, v) {
        document.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) {
          if (el.closest(".field")) el.textContent = v;
        });
      };
      set("takeHomePct", i.takeHomePct + "%");
      set("budgetPct", i.budgetPct + "% of take-home");
      set("apr", i.apr.toFixed(1) + "%");
      set("miles", F.num(i.miles) + " mi/yr");
    },
    count: [],
    render: function (res, i) {
      var c = res.parts;

      /* ---- the six bills ------------------------------------------------ */
      var parts = [
        { label: "Loan payment", value: c.payment, css: "--c-finance", note: F.money(res.financed) + " financed" },
        { label: "Insurance", value: c.ins, css: "--c-insure", note: "scaled to a " + F.money(c.price) + " vehicle" },
        { label: "Fuel", value: c.fuel, css: "--c-fuel", note: F.num(i.miles) + " mi at " + i.mpg + " mpg" },
        { label: "Maintenance & tires", value: c.maint, css: "--c-maint", note: F.money(c.maint * 12) + " a year" },
        { label: "Registration", value: c.reg, css: "--c-tax", note: F.money(i.reg) + " a year" },
        { label: "Repair reserve", value: c.reserve, css: "--c-opp", note: "money set aside, not spent" }
      ].filter(function (p) { return p.value > 0.5; });
      var total = parts.reduce(function (a, b) { return a + b.value; }, 0);

      var donut = document.getElementById("donut");
      if (donut) MDC.charts.donut(donut, parts.map(function (p) {
        return { label: p.label, value: p.value, cssVar: p.css };
      }), {
        centerLabel: "All-in",
        centerValue: F.money(total),
        centerSub: "per month",
        aria: "All-in monthly cost split into its six components"
      });

      var bd = document.getElementById("breakdown");
      if (bd) {
        var rows = parts.slice().sort(function (a, b) { return b.value - a.value; }).map(function (p) {
          var pct = total > 0 ? p.value / total * 100 : 0;
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + p.css + ')"></span>' +
            '<span class="bd-name">' + p.label + '<small>' + p.note + '</small></span>' +
            '<span class="bd-pct num">' + Math.round(pct) + '%</span>' +
            '<span class="bd-val num">' + F.money(p.value) + '/mo</span>' +
            '</div>';
        }).join("");
        var payShare = total > 0 ? c.payment / total * 100 : 0;
        bd.innerHTML = rows +
          '<p class="text-muted" style="font-size:.84rem;margin-top:14px">The payment is only <strong>' +
          Math.round(payShare) + '%</strong> of what this vehicle takes out of the account each month. The other <strong>' +
          F.money(res.running) + '</strong> is the part a payment-only calculator never mentions. Across ' +
          res.keepLabel + ' of ownership, the down payment and the monthly total come to <strong>' +
          F.money(res.totalKeep) + '</strong>.</p>';
      }

      /* ---- the three budget conventions --------------------------------- */
      var verdicts = {
        10: "The conservative classic. At most incomes it points squarely at a used car — which is the honest consequence of the rule, not a failure of it.",
        15: "The mainstream planning figure. Workable when housing takes under a third of take-home and there is no other debt of consequence.",
        20: "The ceiling. Defensible for a short period, or when the vehicle is genuinely earning its keep. Not a place to live permanently."
      };
      var rt = document.getElementById("rules-table");
      if (rt) {
        var html = '<div class="table-wrap"><table class="tbl"><thead><tr>' +
          '<th>Rule</th><th class="num">Budget / mo</th><th class="num">Max price</th>' +
          '<th class="num">Payment</th><th>What it means</th></tr></thead><tbody>';
        res.rules.forEach(function (r) {
          var mine = r.pct === i.budgetPct;
          html += '<tr>' +
            '<td><strong>' + r.pct + '% of take-home</strong>' +
            (mine ? ' <span class="hint">&larr; yours</span>' : '') + '</td>' +
            '<td class="num">' + F.money(r.budget) + '</td>' +
            '<td class="num">' + (r.floor ? '&mdash;' : F.money(r.price)) + '</td>' +
            '<td class="num">' + (r.floor ? '&mdash;' : F.money(r.payment)) + '</td>' +
            '<td>' + (r.floor
              ? 'Running costs alone consume this budget. Nothing is left for a loan.'
              : verdicts[r.pct]) + '</td></tr>';
        });
        html += '</tbody></table></div>' +
          '<p class="text-muted" style="font-size:.85rem;margin-top:12px">All three figures are all-in: payment plus insurance, fuel, maintenance, registration and reserve. ' +
          'The step from 10% to 20% roughly ' +
          (res.rules[0].price > 2100 ? 'quadruples' : 'transforms') +
          ' the vehicle price, because the fixed running costs are paid first and everything above them flows straight into the loan.</p>';
        rt.innerHTML = html;
      }

      /* ---- honest number vs payment-only -------------------------------- */
      var gn = document.querySelector('[data-out="gapNote"]');
      if (gn) {
        if (res.tooTight) {
          gn.innerHTML = 'At this income and this budget share, insurance, fuel, maintenance, registration and the repair reserve consume <strong>' +
            F.money(res.running) + '</strong> of a <strong>' + F.money(res.budget) +
            '</strong> budget on their own. There is nothing left for a loan payment. A payment-only calculator would still cheerfully offer you <strong>' +
            F.money(res.dealerPrice) + '</strong> of vehicle. The honest options here are a car owned outright, fewer miles, a cheaper insurance policy — or a larger share of take-home, entered above.';
        } else {
          gn.innerHTML = 'Both numbers use the same budget of <strong>' + F.money(res.budget) +
            '</strong> a month and the same ' + res.termLabel +
            ' term. The only difference is what the money has to cover. Solving for the all-in cost gives <strong>' +
            F.money(res.maxPrice) + '</strong>. Solving for the payment alone — the method every dealer tool uses — gives <strong>' +
            F.money(res.dealerPrice) + '</strong>, a difference of <strong>' + F.money(res.gap) +
            '</strong>. That gap is not negotiable and it does not go away. It is the ' + F.money(res.running) +
            ' a month of insurance, fuel, maintenance, registration and repairs that the second method silently assumes you will find somewhere else.';
        }
      }

      /* ---- 20/4/10 ------------------------------------------------------- */
      var rn = document.querySelector('[data-out="ruleNote"]');
      if (rn && res.tooTight) {
        rn.innerHTML = 'The 20/4/10 rule caps all-in transport costs at 10% of gross income — <strong>' +
          F.money(res.ruleBudget) + '</strong> a month here. Your running costs alone are already <strong>' +
          F.money(res.running) + '</strong>, so no financed vehicle clears the test. The rule is not the binding constraint at this income; the cost of running any car at all is.';
      } else if (rn) {
        var checks = '<p style="margin:0 0 10px">' +
          (res.passDown ? '&#10003;' : '&#10007;') + ' <strong>20% down</strong> — yours is ' +
          res.downPct.toFixed(0) + '% of the vehicle price. &nbsp;' +
          (res.passTerm ? '&#10003;' : '&#10007;') + ' <strong>4-year term</strong> — yours is ' +
          res.termLabel + '. &nbsp;' +
          (res.passTen ? '&#10003;' : '&#10007;') + ' <strong>10% of gross</strong> — your all-in cost is ' +
          F.money(res.allIn) + ' against a ' + F.money(res.ruleBudget) + ' ceiling.</p>';
        rn.innerHTML = checks + '<p style="margin:0">' +
          (res.passAll
            ? 'This plan passes all three clauses of 20/4/10. That is a genuinely conservative position: you will hold equity from the first month and the loan will be gone before the vehicle needs anything expensive.'
            : 'This plan does not clear 20/4/10. Applied strictly — 20% down, 48 months, all-in under 10% of gross — the rule permits a vehicle of about <strong>' +
              F.money(res.rulePrice) + '</strong>. Treat that as the floor of prudence rather than a verdict: the 10%-of-gross clause is harsh on modest incomes and generous on large ones, and a household with no housing cost can reasonably sit above it.') +
          '</p>';
      }

      /* ---- lender DTI ---------------------------------------------------- */
      var ln = document.querySelector('[data-out="lenderNote"]');
      if (ln && res.allowedPay <= 1) {
        ln.innerHTML = 'Your existing obligations of <strong>' + F.money(i.otherDebt) +
          '</strong> a month already consume 45% of <strong>' + F.money(i.grossMonthly) +
          '</strong> gross, so a mainstream lender has no debt-to-income room left for a car payment at all. Subprime lenders will still write the loan at a much higher rate. That is a signal worth reading rather than shopping around.';
      } else if (ln) {
        ln.innerHTML = 'With <strong>' + F.money(i.otherDebt) + '</strong> a month of existing obligations against <strong>' +
          F.money(i.grossMonthly) + '</strong> gross, a 45% debt-to-income ceiling leaves <strong>' +
          F.money(res.allowedPay) + '</strong> of room for a car payment — enough to approve a vehicle of about <strong>' +
          F.money(res.lenderPrice) + '</strong>. At the price this calculator recommends, your ratio would sit at <strong>' +
          res.dti.toFixed(0) + '%</strong>. The lender is not being reckless; it is answering a question about default risk, and a car payment is one of the last bills anyone stops paying. It simply does not count the insurance, the fuel or the tires, and its exposure ends when the loan does. Yours does not.';
      }

      /* ---- the 84-month warning ------------------------------------------ */
      var n84 = document.querySelector('[data-out="note84"]');
      if (n84 && res.tooTight) {
        n84.innerHTML = 'Seven-year loans are sold as the way to make a payment fit. They cannot help here: the budget is exhausted by insurance, fuel, maintenance, registration and reserve before any term is chosen. Lengthening a loan only ever moves the payment — it never touches the other <strong>' +
          F.money(res.running) + '</strong> a month, which is the part that has already run out.';
      } else if (n84) {
        var lift = Math.max(0, res.price84 - res.solvedPrice);
        var extraInt = Math.max(0, res.interest84 - res.interestNow);
        n84.innerHTML = 'Stretching the same <strong>' + F.money(res.budget) +
          '</strong> budget across 84 months raises the price you appear to qualify for to <strong>' +
          F.money(res.price84) + '</strong> — about <strong>' + F.money(lift) +
          '</strong> more car for a payment of <strong>' + F.money(res.payment84) +
          '</strong>. The bill arrives in two parts. You pay roughly <strong>' + F.money(extraInt) +
          '</strong> more in interest, before allowing for the higher rate lenders attach to seven-year paper. And you spend about <strong>' +
          res.under84 + ' months</strong> owing more than the vehicle is worth, against ' +
          (res.underNow > 0 ? res.underNow + ' months' : 'none at all') +
          ' on your current term. During that window a total-loss accident or an early trade leaves you writing a check for a car you no longer have — and rolling that shortfall into the next loan is how a household ends up financing two vehicles and driving one.';
      }
    }
  });
})();
`;

module.exports = {
  slug: "affordability",
  jsName: "afford",
  formId: "afford-form",
  crumbName: "Affordability",
  appName: "Car Affordability Calculator",
  title: "Car Affordability Calculator | MyDrivingCost",
  desc:
    "Work backwards from your income to the car price you can genuinely carry — payment plus insurance, fuel, maintenance and repairs, not just the payment.",
  ogTitle: "Car Affordability Calculator — the all-in number",
  ogDesc:
    "Dealer tools solve for the payment. This one solves for the all-in monthly cost, and the answer is very different.",
  h1: "Car Affordability Calculator",
  lead:
    "Every dealer affordability tool solves for the monthly payment, which is the wrong variable. This one starts with your income, subtracts insurance, fuel, maintenance, registration and a repair reserve, and only then works out what is left for a loan — so the price it gives you is one you can actually carry.",
  inputs,
  results,
  floatBar,
  prose,
  js,
  disclaimer:
    "Estimates based on the assumptions above. Insurance, fuel and maintenance costs vary widely by vehicle, driver, location and market. Loan approval depends on credit, lender and state taxes and fees. Not financial advice.",
  sources: ["FED_G19", "BLS_CEX", "AAA_YDC"],
  sourceNotes: [
    "The percentage-of-income thresholds used here are conventions rather than published standards &mdash; no agency publishes an official car-affordability ratio. They sit deliberately below typical household transport spending, because that spending includes households who own their cars outright and have no payment at all.",
  ],
  related: [
    ["/calculators/true-cost-to-own/", "True Cost to Own", "What the vehicle you settle on will actually cost across five years, category by category."],
    ["/calculators/auto-loan/", "Auto Loan", "Payment, total interest, amortization — and exactly how long you stay underwater."],
    ["/calculators/cost-per-mile/", "Cost Per Mile", "Reduce the whole thing to one number you can compare against anything."],
    ["/buying-guides/", "Buying guides", "Negotiation, financing and the payment trap, in full."],
  ],
  faq: [
    [
      "How much car can I afford on a $60,000 salary?",
      "On $60,000 a year — about $5,000 a month gross — a household keeping 76 percent after tax has roughly $3,800 to spend. Applying the mainstream rule of 15 percent to all transport gives a budget near $570 a month, and once insurance, fuel, maintenance, registration and a repair reserve are paid, that supports a vehicle of about $8,750 with a $3,400 down payment. A payment-only calculator using the same budget would suggest nearly $29,000. The difference is the running costs, and they are not optional.",
    ],
    [
      "What percentage of income should go to a car?",
      "Fifteen percent of take-home pay for all transport costs is the most defensible working figure, with 10 percent as the conservative version and 20 percent as an upper ceiling. The critical detail is that all three conventions are all-in numbers: they cover the payment plus insurance, fuel, maintenance, registration and repairs. Most people who quote them apply the percentage to the payment alone, which roughly doubles the vehicle they think they can afford and is the single most common budgeting error in car buying.",
    ],
    [
      "What is the 20/4/10 rule for buying a car?",
      "Put 20 percent down, finance for no more than four years, and keep total transport costs under 10 percent of gross income. Each clause does distinct work: the 20 percent down offsets first-year depreciation so you never owe more than the car is worth, the four-year term repays principal faster than the vehicle loses value, and the 10 percent ceiling caps the whole thing. It is deliberately conservative — on a typical income it points at a vehicle under $10,000 — so treat it as the floor of prudence rather than a target.",
    ],
    [
      "Why is this number lower than the dealer's calculator?",
      "Because the two tools solve different equations. A dealer's calculator asks what loan a given monthly payment supports. This one asks what vehicle a given monthly budget supports once every cost the vehicle generates has been paid. On typical assumptions the running costs — insurance, fuel, maintenance, registration and a repair reserve — come to around $470 a month, which is money the payment-only method silently assumes you will find elsewhere. The gap between the two answers regularly exceeds $20,000 of vehicle price.",
    ],
    [
      "How much should my car payment be?",
      "Work out the payment last, not first. Take 15 percent of your take-home pay as the total transport budget, subtract your realistic insurance premium, fuel at your actual mileage, roughly $130 a month for maintenance and tires, registration and a repair reserve, and whatever remains is the payment you can carry. On a $6,500-a-month gross income that process typically leaves around $270 a month — a long way below the $600 to $700 payments commonly quoted as normal for that income.",
    ],
    [
      "Do lenders check whether I can actually afford the car?",
      "No. Lenders assess the probability that you will repay, which is a related but different question. The standard test is a back-end debt-to-income ratio, usually capped around 45 to 50 percent of gross income, and it counts only the loan payment — not insurance, fuel, maintenance or repairs. That model is well calibrated for default risk, because a car payment is one of the last bills people stop paying. What it cannot see is the retirement contribution that quietly stopped to keep that payment current.",
    ],
    [
      "Does a bigger down payment mean I can afford more car?",
      "Partly, and less than most buyers assume. Every extra $1,000 of down payment buys roughly $1,000 of additional vehicle price at the same monthly cost, which is real. But a down payment does nothing to reduce insurance, fuel, tires, maintenance or depreciation, and those costs scale with the price of the car you buy. Paying cash for a vehicle whose running costs exceed your budget is still buying a vehicle you cannot afford — the bill simply arrives monthly instead of at signing.",
    ],
    [
      "Is a 72 or 84-month car loan ever sensible?",
      "Very rarely, and almost never for the reason it is chosen. Long terms are sold as a way to afford more car, but they raise the total interest substantially, usually carry a higher rate, and leave you owing more than the vehicle is worth for three to four years. If the vehicle only fits the budget at 72 or 84 months, the term length is telling you something accurate about the price. The defensible exception is a low promotional rate on a vehicle you would have bought at 60 months anyway.",
    ],
  ],
};
