const C = require("../calcpage");
const { num, rng, seg, group, advanced, hero, tiles, chartCard, callout, bullets, table } = C;

/* ------------------------------------------------------------------ HTML -- */

const inputs = [
  group(
    "The new one",
    [
      num("newPrice", "Price of the new car", 34000, {
        prefix: "$",
        min: 5000,
        step: 500,
        help: "Transaction price, not sticker. Use what you would actually sign for after discount.",
      }),
      rng("newApr", "APR on the new car", 7.2, {
        min: 0,
        max: 20,
        step: 0.1,
        initial: "7.2%",
        help: "Drop this to 0–2.9% if the manufacturer is offering subvented finance. It changes the answer more than most buyers expect.",
      }),
    ].join("\n              ")
  ),
  group(
    "The used one",
    [
      seg(
        "usedAge",
        "The same model, but",
        [["2", "2 yrs old"], ["3", "3 yrs old"], ["4", "4 yrs old"], ["5", "5 yrs old"]],
        "3"
      ),
      rng("usedDiscount", "You'll pay", 62, {
        min: 30,
        max: 95,
        step: 1,
        initial: "62% of new price",
        help: "Set automatically from the age you pick, then override it with the real asking prices you're seeing. Note these sit above the textbook curve — the used market charges a premium for the depreciation you skipped.",
      }),
      rng("usedApr", "APR on the used car", 8.4, {
        min: 0,
        max: 24,
        step: 0.1,
        initial: "8.4%",
        help: "Used-car money runs roughly 1.2 points above new across most credit tiers — lenders price an older asset as a worse security.",
      }),
    ].join("\n              "),
    "var(--c-deprec)"
  ),
  group(
    "Both",
    [
      rng("years", "Years you'll keep it", 5, {
        min: 1,
        max: 12,
        step: 1,
        initial: "5 years",
        help: "The longer you hold, the smaller the gap: both cars end up on the flat part of the curve together.",
      }),
      rng("miles", "Annual miles", 12000, { min: 2000, max: 40000, step: 500, initial: "12,000 mi/yr" }),
      num("down", "Cash down payment", 3400, { prefix: "$", min: 0, step: 250 }),
      seg(
        "term",
        "Loan term",
        [["36", "36 mo"], ["48", "48 mo"], ["60", "60 mo"], ["72", "72 mo"]],
        "60"
      ),
    ].join("\n              "),
    "var(--c-finance)"
  ),
  advanced(
    [
      `<p class="field-help">The two cars do not cost the same to run, and the gaps go in opposite directions. The used one insures for less and is taxed on a smaller number; it also eats far more in maintenance and carries repair risk the new one doesn't.</p>`,
      num("insNew", "Insurance, new car", 2496, {
        prefix: "$",
        suffix: "/yr",
        min: 0,
        step: 50,
        help: "National average for full coverage. Comprehensive and collision are priced off the vehicle's value.",
      }),
      num("insUsedPct", "Used car insures for", 88, {
        suffix: "% of that",
        min: 50,
        max: 110,
        step: 1,
        help: "Liability doesn't fall with age; only the physical-damage half does. Expect a 10–15% saving, not 40%.",
      }),
      num("maintNew", "Maintenance, new car", 1250, { prefix: "$", suffix: "/yr", min: 0, step: 50 }),
      num("maintUsed", "Maintenance, used car", 1900, {
        prefix: "$",
        suffix: "/yr",
        min: 0,
        step: 50,
        help: "Tires, brakes, fluids and the first round of wear items usually land on the second owner, not the first.",
      }),
      num("riskUsed", "Repair-risk allowance, used car", 600, {
        prefix: "$",
        suffix: "/yr",
        min: 0,
        step: 50,
        help: "The out-of-warranty failure you can't schedule. Set it to zero if you're buying certified pre-owned with coverage that runs the whole period.",
      }),
      num("tax", "Sales tax", 7, { suffix: "%", min: 0, max: 15, step: 0.1 }),
      num("fees", "Doc, title &amp; dealer fees", 700, { prefix: "$", min: 0, step: 25 }),
      num("reg", "Registration", 220, { prefix: "$", suffix: "/yr", min: 0, step: 10 }),
      num("mpg", "Combined MPG", 30, { suffix: "mpg", min: 5, max: 150, step: 1 }),
      num("gas", "Fuel price", 4.0, { prefix: "$", suffix: "/gal", min: 1, max: 10, step: 0.05 }),
    ].join("\n                  ")
  ),
].join("\n            ");

const results = [
  hero(
    "New vs Used summary",
    'What the used one saves over <span data-out="yearsLabel">5 years</span>',
    "savings",
    "money",
    'The new car costs <strong class="num" data-out="totalNew" data-fmt="money">—</strong> to own. The <span data-out="usedAgeLabel">three-year-old</span> one, bought at <strong class="num" data-out="usedPrice" data-fmt="money">—</strong>, costs <strong class="num" data-out="totalUsed" data-fmt="money">—</strong>. <span data-out="verdictLine">—</span>'
  ),
  tiles([
    ["All-in cost, new", "totalNew", "money", 'About <span class="num" data-out="monthlyNew" data-fmt="money">—</span> a month, everything included'],
    ["All-in cost, used", "totalUsed", "money", 'About <span class="num" data-out="monthlyUsed" data-fmt="money">—</span> a month, everything included'],
    ["Difference per month", "savingsPerMonth", "money", 'Across <span data-out="monthsLabel">60 months</span> of ownership'],
  ]),
  chartCard(
    "Side by side, category by category",
    "The same driver, the same miles, the same years — two different cars",
    `<div id="sbs"></div>
          <p class="text-muted" style="font-size:.85rem;margin-top:16px">At the end of the period the new car is worth about <strong class="num" data-out="resaleNew" data-fmt="money">—</strong> and the used one about <strong class="num" data-out="resaleUsed" data-fmt="money">—</strong>. Both sit on the same curve; the used car simply started further down it, which is why its remaining value falls more slowly in dollar terms.</p>`
  ),
  chartCard(
    "The full ledger",
    "Every category, both cars, and where the difference actually comes from",
    `<div id="cmp-table"></div>`
  ),
  callout(
    "When the new car is the right answer",
    `<p style="margin:0 0 10px">Buying used is not a law of nature. It is an arbitrage on the depreciation curve, and there are four situations that close the gap or reverse it outright.</p>
        <ul class="bullets" style="margin:0 0 10px">
          <li><strong>Subvented finance.</strong> A manufacturer rate of 0–2.9% is a cash subsidy disguised as a loan, and it is only ever available on new metal. <span data-out="counterNote">—</span></li>
          <li><strong>The outgoing model year.</strong> A new car being cleared to make room for a redesign can be discounted 12–18% before you have negotiated anything. You have bought a year of depreciation at the dealer's expense.</li>
          <li><strong>Segments that barely depreciate.</strong> Full-size pickups and body-on-frame SUVs retain 55–65% at five years. When the curve is that flat there is little discount to harvest, and a three-year-old example often asks within a few thousand of a new one.</li>
          <li><strong>Electric vehicles.</strong> Incentives applied to new units distort the used market beneath them. A new EV after a federal or state credit can undercut a two-year-old one of the same model, while also carrying a longer battery warranty.</li>
        </ul>
        <p style="margin:0">The habit worth keeping is not &ldquo;buy used&rdquo;. It is: price both, all-in, over the years you will actually keep the car.</p>`
  ),
  chartCard(
    "Where the used car's money goes",
    "Five years of ownership, split by category",
    `<div class="donut-wrap">
            <div id="donut"></div>
            <div class="breakdown" id="breakdown"></div>
          </div>`
  ),
].join("\n\n        ");

const floatBar = `<div class="float-summary no-print" id="floatSummary" aria-hidden="true">
  <div class="fs-item"><span class="k">Used saves</span><span class="v num" data-out="savings" data-fmt="money">—</span></div>
  <div class="fs-sep"></div>
  <div class="fs-item fs-hide-sm"><span class="k">New / used per month</span><span class="v num" data-out="monthlyPair">—</span></div>
  <button type="button" class="btn btn-primary btn-sm" data-scroll="calc">Edit</button>
</div>`;

/* ------------------------------------------------------------------ prose -- */

const prose = `
    <h2 id="how-it-works">What the used-car discount actually buys you</h2>
    <p>The advice is so well worn that most people repeat it without checking: never buy new, let somebody else take the depreciation hit. It is usually right. It is not always right, and the reasons it fails are specific enough to test in about ninety seconds.</p>
    <p>What you are really buying when you buy used is <strong>a position further down a curve you did not have to pay to travel</strong>. A new car sheds roughly 20% in its first year and about 15% of what is left in each year after. Buy at three years old and the first owner has already absorbed some 40% of the original price on your behalf. Over the next five years the car you bought falls from about 62% of new price to about 26% of it — a loss of some $12,400 on a $34,000 model. The new buyer, over exactly the same five years, loses about $19,800. That $7,400 gap is the entire case for buying used, and it is a good one.</p>
    <p>But depreciation is only one of six lines, and the other five do not all move the same way. Interest is smaller on a smaller loan, and so is sales tax. Insurance falls, though less than people assume, because only the physical-damage half of the premium tracks the car's value. And maintenance moves hard in the opposite direction: the second owner pays for the tires, the brakes, the suspension bushes and the first genuinely expensive failure. Net those out and a saving that looked like $7,400 lands nearer <strong>$5,600</strong>. Still decisive at these assumptions — but a quarter of the headline has already gone, and we have not yet touched the finance rate.</p>

    <h2 id="formula">The formula</h2>
    ${callout(
      "Total cost = depreciation + interest + insurance + fuel + maintenance + tax and fees",
      "<p style='margin:0 0 10px'>Both cars are depreciated off the same curve: 20% in the first year of the vehicle's life, 15% of the remaining value every year after. The used car enters your ownership already partway down that curve, so it depreciates at the later-year rate throughout — which is precisely why its dollar loss is smaller even though the percentage rate is the same.</p><p style='margin:0'>Depreciation is the purchase price minus the resale value at the end. Interest is the amount actually paid over the months you own the car, not the whole schedule. Principal repayment is <em>not</em> a cost — the money is either still in the car or already counted as depreciation, and counting it twice is the most common error in comparisons like this one.</p>"
    )}
    <p>Worked through at the canonical assumptions — $34,000 new, a three-year-old example at $21,080, $3,400 down, 60 months, five years, 12,000 miles a year — the new car costs $57,237 to own and the used one $51,647. The used car wins by $5,589, or $93 a month.</p>

    <h2 id="floor">The used market has a floor now</h2>
    <p>The textbook curve and the actual asking prices stopped agreeing during the 2021–2023 supply crunch, and they have not fully re-converged. Roughly eight million vehicles that would have been built in 2020–2022 never were, which means the supply of two-to-five-year-old cars is structurally short and will stay short until those cohorts age out. The used market prices that scarcity in.</p>
    ${table(
      ["Age at purchase", "Textbook curve says", "What the market asks", "You pay above curve"],
      [
        ["2 years", "68% · $23,120", "72% · $24,480", "+$1,360"],
        ["3 years", "58% · $19,652", "62% · $21,080", "+$1,428"],
        ["4 years", "49% · $16,704", "55% · $18,700", "+$1,996"],
        ["5 years", "42% · $14,199", "45% · $15,300", "+$1,101"],
      ],
      [1, 2, 3]
    )}
    <p>Read the right-hand column as the toll on the arbitrage. You are still capturing most of the first owner's loss, but you are handing back one to two thousand dollars of it to a market that knows exactly what you are doing. The premium is widest at four years old, which is the age band with the least supply and the most demand from buyers who want warranty-adjacent metal without new-car pricing.</p>
    <p>The practical consequence is that the used discount should be treated as an <em>observed</em> number, not a modeled one. Set the slider in this calculator from real listings for the model you want, in your region, this month. If the three-year-old car is asking 70% of new, the case for buying it has largely evaporated before you have accounted for a single repair.</p>

    <h2 id="subvented">When new wins: the subvented-finance arithmetic</h2>
    <p>Here is the case that flips the answer, and it flips it more often than the received wisdom allows. Manufacturers subsidize finance on new vehicles to move inventory. A 0.9% or 1.9% rate from a captive lender is not a good loan; it is a rebate paid out over sixty months. No such rate exists on the used side, where the same buyer with the same credit file pays roughly 1.2 points <em>above</em> the new rate because the collateral is older.</p>
    <p>On our $34,000 car with $3,400 down, the amount financed is $33,680. Here is what the total five-year cost of the new car does as that rate falls, against a used car holding steady at $51,647:</p>
    ${table(
      ["New-car APR", "Interest paid", "Total cost, new", "Used car's advantage"],
      [
        ["7.2% (market)", "$6,525", "$57,237", "Used wins by $5,589"],
        ["4.9%", "$4,362", "$55,074", "Used wins by $3,426"],
        ["3.9%", "$3,445", "$54,156", "Used wins by $2,509"],
        ["2.9%", "$2,541", "$53,253", "Used wins by $1,605"],
        ["1.9%", "$1,652", "$52,363", "Used wins by $716"],
        ["0.9%", "$776", "$51,488", "<strong>New wins by $160</strong>"],
        ["0%", "$0", "$50,711", "<strong>New wins by $936</strong>"],
      ],
      [1, 2, 3]
    )}
    <p>The break-even sits at about <strong>1.1% APR</strong>. Anything at or below that, and the brand-new car — with a full factory warranty, no history, no previous owner's neglect and its choice of specification — is the cheaper vehicle to own for five years. That is a startling result if you have spent a decade telling people never to buy new, and it is arithmetic, not opinion.</p>
    <p>Two cautions keep it honest. First, manufacturers almost always make you choose between the subvented rate and a cash rebate; take the rate at full price and you may have given back $2,000–$3,000 of discount, which moves the break-even back toward 3%. Run both, as a total of payments, before deciding. Second, subvented rates are usually reserved for top-tier credit and for the vehicles the manufacturer most wants to shift — which is useful information about the vehicle in its own right.</p>

    <h2 id="cpo">Certified pre-owned, and what the badge is worth</h2>
    <p>Certified pre-owned sits deliberately between the two columns of this calculator. The manufacturer inspects the car, extends the powertrain warranty by a year or two, and charges a premium of roughly $1,000–$2,500 over an equivalent private-party sale. Sometimes it also unlocks a subvented used rate a point or two below the market, which is the part buyers most often overlook.</p>
    <p>Whether that premium is worth paying is a question about one number in the advanced panel: the repair-risk allowance. If a CPO warranty genuinely covers the whole period you intend to own the car, set that allowance to zero and see what happens to the comparison. At $600 a year over five years the allowance is $3,000 — more than the CPO premium. On that reading, certification is cheap insurance. If you plan to keep the car eight years, the warranty expires somewhere in the middle and the allowance should stay.</p>
    <p>What CPO does not do is change the depreciation curve. You pay a premium at purchase and recover very little of it at sale, because the badge does not transfer to the next buyer in any meaningful way. Treat it as prepaid repair cover, priced against the repairs you actually expect.</p>

    <h2 id="three-years">Why “three years old” is really an argument about warranty</h2>
    <p>The three-year rule of thumb is repeated as though the depreciation curve has a kink at 36 months. It does not; the curve is smooth. What has a kink at 36 months is the <strong>typical bumper-to-bumper warranty</strong>, and that is the real reason the advice exists.</p>
    <p>Three years is where two things coincide. The steepest part of the curve is behind you — roughly 40% of the price has already gone — and the car has just left, or is about to leave, comprehensive factory cover. The first owner absorbed the depreciation <em>and</em> carried the risk of early-life defects under warranty, which is the period when manufacturing faults surface. You inherit a car that has been through its shakedown at somebody else's expense, at the moment its price has fallen fastest.</p>
    <p>Push to four or five years old and the maths shifts. The discount deepens, but by less each year, and you are now buying a car with wear items due and no residual cover at all. The calculator makes this visible: at five years old the purchase price falls another $5,800 against the two-year-old, but the repair-risk allowance and maintenance line more than eat into it if you keep the car a long time. The sweet spot is not a fixed age — it is wherever the remaining warranty months and the remaining discount cross for the period you intend to own.</p>

    <h2 id="better">How to do better on either side of the deal</h2>
    ${bullets([
      "<strong>Price both, all-in, for the years you will actually keep it.</strong> A monthly payment comparison is not a cost comparison. The payment on the used car is always lower and the total cost sometimes isn't.",
      "<strong>Ask the new-car dealer what the finance rate is before you dismiss new.</strong> If a captive lender is at 0.9% or below on the model you want, the used car has probably already lost. Ask what the cash alternative is in the same breath.",
      "<strong>Set the discount slider from live listings, not from a table.</strong> Retention varies more by model than by segment, and the post-crunch floor means the textbook curve consistently understates what you will be asked to pay.",
      "<strong>Get pre-approved before you look at used inventory.</strong> The used-rate premium is where dealers make the most finance margin, and a credit union pre-approval caps it. A point and a half on a $20,000 loan is roughly $900.",
      "<strong>Buy the inspection, not the story.</strong> A $150–$250 pre-purchase inspection on a four-year-old car is the highest-return money in this entire calculation. Walk away from any seller who resists it.",
      "<strong>Treat the outgoing model year as a used car with a new warranty.</strong> A heavily discounted run-out new car often lands at two-year-old money with five years of cover and nobody else's history.",
      "<strong>Extend the holding period before you extend the loan.</strong> Keeping either car eight years instead of five collapses the difference between them, because both end up on the flat part of the curve with no payment.",
      "<strong>Check insurance quotes on both specific vehicles before you commit.</strong> The used discount can be much smaller than 12% if the older model has worse safety ratings or a worse theft record.",
    ])}

    <h2 id="mistakes">Common mistakes</h2>
    ${callout(
      "Comparing the payments instead of the costs",
      "The used car's payment is lower on almost any deal, and that fact carries essentially no information. It is a smaller loan. What matters is depreciation plus interest plus running costs over the period you own the vehicle — and on that measure the gap is far narrower than the payment difference suggests, and occasionally the wrong way round. Any comparison that stops at the monthly figure will pick the used car every single time, including the times it should not.",
      "warn"
    )}
    ${bullets([
      "<strong>Counting principal repayment as a cost.</strong> The money you repay is either still sitting in the car as value or has already been counted as depreciation. Add both and you have double-counted the largest line in the model.",
      "<strong>Assuming insurance halves.</strong> Liability, medical and uninsured-motorist cover do not care how old the car is. Only comprehensive and collision fall, so a five-year-old car typically insures for 10–15% less, not 40%.",
      "<strong>Ignoring the repair you cannot schedule.</strong> Average maintenance figures smooth over the single $2,400 event. Budgeting the average and nothing else is how a good used-car decision turns into a bad month.",
      "<strong>Forgetting that used-car finance is priced differently.</strong> Rate, maximum term and loan-to-value limits are all tighter on older vehicles, and some lenders will not finance a car over ten years old at all.",
      "<strong>Comparing a base new car with a loaded used one.</strong> The used car is usually better equipped for the money, which is a genuine benefit — but if you would not have paid for those options new, do not credit yourself with them.",
      "<strong>Treating a low mileage reading as free value.</strong> An eight-year-old car with 30,000 miles has rubber, fluids and seals that have aged on the calendar, not the odometer, and it will be priced as though it hasn't.",
    ])}
`;

/* -------------------------------------------------------------------- JS -- */

const js = `/* New vs Used — MyDrivingCost.com */
(function () {
  "use strict";
  var MDC = window.MDC, F = MDC.fmt, M = MDC.model;

  var DEP1 = 20, DEPN = 15;

  /* Typical asking price as a share of new, by age. Above the textbook curve —
     the used market has held a floor since the 2021-23 supply shortfall. */
  var DISC = { "2": 72, "3": 62, "4": 55, "5": 45 };
  var AGEWORD = { "2": "two-year-old", "3": "three-year-old", "4": "four-year-old", "5": "five-year-old" };

  /* Share of the original price retained at a given age, on the shared curve. */
  function retained(age) {
    if (age <= 0) return 1;
    return (1 - DEP1 / 100) * Math.pow(1 - DEPN / 100, age - 1);
  }

  MDC.calc({
    form: "nvu-form",
    defaults: {
      newPrice: 34000, newApr: 7.2,
      usedAge: "3", usedDiscount: 62, usedApr: 8.4,
      years: 5, miles: 12000, down: 3400, term: "60",
      insNew: 2496, insUsedPct: 88,
      maintNew: 1250, maintUsed: 1900, riskUsed: 600,
      tax: 7, fees: 700, reg: 220, mpg: 30, gas: 4
    },
    compute: function (i) {
      var age = parseInt(i.usedAge, 10) || 3;
      var term = parseInt(i.term, 10) || 60;
      var yrs = Math.max(1, i.years);
      var months = yrs * 12;
      var elapsed = Math.min(term, months);

      var pNew = Math.max(0, i.newPrice);
      var pUsed = pNew * (i.usedDiscount / 100);
      var floor = pNew * 0.03;

      /* Both cars sit on one curve. The used car simply starts further along it,
         so every year of your ownership is a later-year year. */
      var resaleNew = Math.max(floor, pNew * retained(yrs));
      var resaleUsed = Math.min(pUsed, Math.max(floor, pNew * retained(age + yrs)));

      var depNew = Math.max(0, pNew - resaleNew);
      var depUsed = Math.max(0, pUsed - resaleUsed);

      /* Finance. Interest only counts for the months you actually own the car. */
      var taxNew = pNew * (i.tax / 100);
      var taxUsed = pUsed * (i.tax / 100);
      var finNew = Math.max(0, pNew + taxNew + i.fees - i.down);
      var finUsed = Math.max(0, pUsed + taxUsed + i.fees - i.down);
      var intNew = M.interestPaid(finNew, i.newApr, term, elapsed).interest;
      var intUsed = M.interestPaid(finUsed, i.usedApr, term, elapsed).interest;
      var payNew = M.payment(finNew, i.newApr, term);
      var payUsed = M.payment(finUsed, i.usedApr, term);

      var insNewT = i.insNew * yrs;
      var insUsedT = i.insNew * (i.insUsedPct / 100) * yrs;
      var fuelT = i.mpg > 0 ? (i.miles / i.mpg) * i.gas * yrs : 0;
      var maintNewT = i.maintNew * yrs;
      var maintUsedT = (i.maintUsed + i.riskUsed) * yrs;
      var tfNew = taxNew + i.fees + i.reg * yrs;
      var tfUsed = taxUsed + i.fees + i.reg * yrs;

      var cats = [
        { label: "Depreciation", css: "--c-deprec", n: depNew, u: depUsed, note: "Purchase price minus what it's worth at the end" },
        { label: "Interest", css: "--c-finance", n: intNew, u: intUsed, note: "Paid over the months you own it" },
        { label: "Insurance", css: "--c-insure", n: insNewT, u: insUsedT, note: "Full coverage, both vehicles" },
        { label: "Fuel", css: "--c-fuel", n: fuelT, u: fuelT, note: "Identical: same model, same miles" },
        { label: "Maintenance & repairs", css: "--c-maint", n: maintNewT, u: maintUsedT, note: "Includes the used car's repair-risk allowance" },
        { label: "Tax, fees & registration", css: "--c-tax", n: tfNew, u: tfUsed, note: "Sales tax scales with the price you pay" }
      ];

      var totalNew = 0, totalUsed = 0;
      for (var c = 0; c < cats.length; c++) { totalNew += cats[c].n; totalUsed += cats[c].u; }
      var savings = totalNew - totalUsed;

      /* At what new-car APR would the two cars cost the same? */
      var needed = intNew - savings;
      var breakeven = -1;
      if (needed >= 0) {
        var lo = 0, hi = 30;
        for (var k = 0; k < 44; k++) {
          var mid = (lo + hi) / 2;
          if (M.interestPaid(finNew, mid, term, elapsed).interest > needed) hi = mid; else lo = mid;
        }
        breakeven = lo;
      }

      return {
        priceNew: pNew,
        usedPrice: pUsed,
        resaleNew: resaleNew,
        resaleUsed: resaleUsed,
        depNewOut: depNew,
        depUsedOut: depUsed,
        intNewOut: intNew,
        intUsedOut: intUsed,
        payNew: payNew,
        payUsed: payUsed,
        totalNew: totalNew,
        totalUsed: totalUsed,
        savings: savings,
        savingsPerMonth: savings / months,
        monthlyNew: totalNew / months,
        monthlyUsed: totalUsed / months,
        monthlyPair: F.money(totalNew / months) + " / " + F.money(totalUsed / months),
        yearsLabel: yrs + (yrs === 1 ? " year" : " years"),
        monthsLabel: months + " months",
        usedAgeLabel: AGEWORD[i.usedAge] || (age + "-year-old"),
        breakevenApr: breakeven,
        cats: cats,
        _i: i
      };
    },
    onSeg: function (name, val, api) {
      /* Picking an age loads the typical asking price, then the user overrides it. */
      if (name === "usedAge" && DISC[val]) api.setField("usedDiscount", DISC[val]);
    },
    onInput: function (i) {
      var set = function (k, v) {
        document.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) {
          if (el.closest(".field")) el.textContent = v;
        });
      };
      set("years", i.years + (i.years === 1 ? " year" : " years"));
      set("miles", F.num(i.miles) + " mi/yr");
      set("usedDiscount", i.usedDiscount + "% of new price");
      set("newApr", i.newApr.toFixed(1) + "%");
      set("usedApr", i.usedApr.toFixed(1) + "%");
    },
    count: [],
    render: function (res, i) {
      var cats = res.cats;
      var peak = 1;
      cats.forEach(function (c) { peak = Math.max(peak, c.n, c.u); });

      function bar(label, value, css, solid) {
        return '<span style="display:flex;align-items:center;gap:8px;margin-top:6px">' +
          '<span style="font-size:.7rem;font-weight:600;color:var(--muted-2);width:34px">' + label + '</span>' +
          '<span style="flex:1;height:9px;background:var(--border);border-radius:5px;overflow:hidden">' +
          '<span style="display:block;height:100%;border-radius:5px;width:' +
          (value / peak * 100).toFixed(1) + '%;background:var(' + css + ');opacity:' + (solid ? '1' : '.5') + '"></span>' +
          '</span>' +
          '<span class="num" style="font-size:.78rem;font-weight:700;width:70px;text-align:right">' + F.money(value) + '</span>' +
          '</span>';
      }

      /* ---- side-by-side comparison, built as .bd-row markup --------------- */
      var sbs = document.getElementById("sbs");
      if (sbs) {
        var html = '<div class="breakdown">';
        cats.forEach(function (c) {
          var diff = c.n - c.u;
          var pct = c.n > 0 ? diff / c.n * 100 : 0;
          html += '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + c.css + ')"></span>' +
            '<span class="bd-name">' + c.label + '<small>' + c.note + '</small>' +
            bar("New", c.n, c.css, true) + bar("Used", c.u, c.css, false) +
            '</span>' +
            '<span class="bd-pct num">' + (diff >= 0 ? "−" : "+") + Math.abs(Math.round(pct)) + '%</span>' +
            '<span class="bd-val num" style="color:' + (diff >= 0 ? 'var(--success)' : 'var(--ink-strong)') + '">' +
            (diff >= 0 ? "−" : "+") + F.money(Math.abs(diff)) + '</span>' +
            '</div>';
        });
        html += '</div>';
        sbs.innerHTML = html +
          '<p class="text-muted" style="font-size:.85rem;margin-top:14px">The right-hand column is what the used car saves in each category. ' +
          'Only maintenance runs the other way &mdash; and on these assumptions it gives back ' +
          F.money(Math.max(0, cats[4].u - cats[4].n)) + ' of the ' +
          F.money(Math.max(0, cats[0].n - cats[0].u)) + ' won on depreciation.</p>';
      }

      /* ---- full ledger table --------------------------------------------- */
      var t = document.getElementById("cmp-table");
      if (t) {
        var rows = "";
        cats.forEach(function (c) {
          var d = c.n - c.u;
          rows += '<tr><td>' + c.label + '</td>' +
            '<td class="num">' + F.money(c.n) + '</td>' +
            '<td class="num">' + F.money(c.u) + '</td>' +
            '<td class="num">' + (Math.abs(d) < 1 ? "&mdash;" : (d > 0 ? "−" : "+") + F.money(Math.abs(d))) + '</td></tr>';
        });
        rows += '<tr><td><strong>Total cost of ownership</strong></td>' +
          '<td class="num"><strong>' + F.money(res.totalNew) + '</strong></td>' +
          '<td class="num"><strong>' + F.money(res.totalUsed) + '</strong></td>' +
          '<td class="num"><strong>' + (res.savings >= 0 ? "−" : "+") + F.money(Math.abs(res.savings)) + '</strong></td></tr>';
        rows += '<tr><td>Per month, all in</td>' +
          '<td class="num">' + F.money(res.monthlyNew) + '</td>' +
          '<td class="num">' + F.money(res.monthlyUsed) + '</td>' +
          '<td class="num">' + (res.savings >= 0 ? "−" : "+") + F.money(Math.abs(res.savingsPerMonth)) + '</td></tr>';
        rows += '<tr><td>Loan payment</td>' +
          '<td class="num">' + F.money(res.payNew) + '</td>' +
          '<td class="num">' + F.money(res.payUsed) + '</td>' +
          '<td class="num">&mdash;</td></tr>';
        rows += '<tr><td>Worth at the end</td>' +
          '<td class="num">' + F.money(res.resaleNew) + '</td>' +
          '<td class="num">' + F.money(res.resaleUsed) + '</td>' +
          '<td class="num">&mdash;</td></tr>';

        t.innerHTML = '<div class="table-wrap"><table class="tbl"><thead><tr>' +
          '<th>Category</th><th class="num">New</th><th class="num">' +
          (res.usedAgeLabel.charAt(0).toUpperCase() + res.usedAgeLabel.slice(1)) +
          '</th><th class="num">Used saves</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
          '<p class="text-muted" style="font-size:.85rem;margin-top:12px">Loan payments are shown for context only &mdash; principal repayment is not a cost, ' +
          'because the money is either still in the car or already counted as depreciation.</p>';
      }

      /* ---- verdict lines -------------------------------------------------- */
      var vl = document.querySelector('[data-out="verdictLine"]');
      if (vl) {
        if (res.savings > 0) {
          vl.innerHTML = 'Buying used wins here by <strong>' + F.money(res.savings) + '</strong> &mdash; about <strong>' +
            F.money(res.savingsPerMonth) + ' a month</strong> for the whole period.';
        } else if (res.savings < 0) {
          vl.innerHTML = 'On these numbers the <strong>new car is actually cheaper</strong>, by ' +
            F.money(-res.savings) + '. Check the finance rate before you assume that is a mistake.';
        } else {
          vl.innerHTML = 'The two are level. At this point choose on warranty, specification and how long you intend to keep it.';
        }
      }

      var cn = document.querySelector('[data-out="counterNote"]');
      if (cn) {
        if (res.breakevenApr < 0) {
          cn.innerHTML = 'At these assumptions no finance rate can rescue the new car &mdash; even at 0% the used one still wins by ' +
            F.money(res.savings - res.intNewOut) + ', so the gap is coming from depreciation and running costs rather than interest.';
        } else if (res.breakevenApr >= i.newApr) {
          cn.innerHTML = 'You have already entered a rate at or below the break-even, which is why the new car is holding its own here.';
        } else {
          cn.innerHTML = 'On your numbers the new car draws level at about <strong>' +
            res.breakevenApr.toFixed(1) + '% APR</strong> and wins outright below it &mdash; against ' +
            i.newApr.toFixed(1) + '% at market rates. Ask what the captive lender is offering before you rule new out.';
        }
      }

      /* ---- donut: the used car's cost breakdown --------------------------- */
      var parts = cats.filter(function (c) { return c.u > 0.5; });
      var grand = parts.reduce(function (a, b) { return a + b.u; }, 0);

      var donut = document.getElementById("donut");
      if (donut) MDC.charts.donut(donut, parts.map(function (p) {
        return { label: p.label, value: p.u, cssVar: p.css };
      }), {
        centerLabel: "Used car",
        centerValue: F.money(grand),
        centerSub: F.money(res.monthlyUsed) + "/mo",
        aria: "Cost of owning the used car split by category"
      });

      var bd = document.getElementById("breakdown");
      if (bd) {
        bd.innerHTML = parts.slice().sort(function (a, b) { return b.u - a.u; }).map(function (p) {
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + p.css + ')"></span>' +
            '<span class="bd-name">' + p.label + '<small>' + F.money(p.u / Math.max(1, i.years)) + ' / year</small></span>' +
            '<span class="bd-pct num">' + Math.round(p.u / grand * 100) + '%</span>' +
            '<span class="bd-val num">' + F.money(p.u) + '</span>' +
            '</div>';
        }).join("") +
        '<p class="text-muted" style="font-size:.84rem;margin-top:14px">Depreciation is still the largest line on a used car. ' +
        'It is simply a smaller number, applied to a smaller price, on the flatter part of the curve.</p>';
      }
    }
  });
})();
`;

module.exports = {
  slug: "new-vs-used",
  jsName: "nvu",
  formId: "nvu-form",
  crumbName: "New vs Used",
  appName: "New vs Used Car Calculator",
  title: "New vs Used Car Calculator — What Used Saves | MyDrivingCost",
  desc:
    "Put the same driver in a new car and in the same model at three years old, total every cost for both, and see what the depreciation curve is really worth.",
  ogTitle: "New vs Used Car Calculator — what buying used really saves",
  ogDesc:
    "Depreciation, interest, insurance, fuel, maintenance and tax for both cars over the same years. Sometimes new wins.",
  h1: "New vs Used Car Calculator",
  lead:
    "The same driver, the same miles, the same years — in a brand-new car and in the identical model bought used. Every cost totaled for both, so you can see what the depreciation curve is worth in dollars, and the rate at which subvented new-car finance flips the answer.",
  inputs,
  results,
  floatBar,
  prose,
  js,
  disclaimer:
    "Both vehicles are modeled on the same depreciation curve at the canonical assumptions. Real used prices, finance rates, insurance premiums and repair costs vary by model, region, credit file and market conditions. Check live listings and quotes before deciding. Not financial advice.",
  sources: ["KBB_DEP", "FED_G19", "AAA_YDC"],
  sourceNotes: [
    "Used-car loan rates run materially higher than new-car rates, and that gap is a real part of the comparison rather than a rounding detail. Warranty coverage, the risk of an unbudgeted repair and any manufacturer incentive on the new car are judgement calls rather than modelled figures; the page discusses them in the prose instead of pretending to price them.",
  ],
  related: [
    ["/calculators/depreciation/", "Depreciation", "The curve both cars sit on, modeled year by year."],
    ["/calculators/auto-loan/", "Auto Loan", "Payment, total interest and how long you stay underwater on either car."],
    ["/calculators/true-cost-to-own/", "True Cost to Own", "All six cost categories for a single vehicle, laid out year by year."],
    ["/buying-guides/", "Buying guides", "Negotiation, certified pre-owned, the finance office and the payment trap."],
  ],
  faq: [
    [
      "Is it cheaper to buy a new or used car?",
      "Used is cheaper in most cases, but by less than the sticker difference suggests. On a $34,000 new car against the same model at three years old, five years of ownership costs about $57,200 new and $51,600 used — a saving of roughly $5,600, or $93 a month. The depreciation advantage is around $7,400, but higher maintenance, repair risk and a used-car finance rate roughly 1.2 points above new give a large part of it back.",
    ],
    [
      "When is buying a new car actually the better deal?",
      "When the manufacturer is subsidizing the finance. On the canonical $34,000 comparison the new car draws level at about 1.1% APR and wins outright below it, because saving $6,500 of interest outweighs the extra depreciation. New also competes well on heavily discounted outgoing model years, in slow-depreciating segments such as full-size pickups, and on electric vehicles where incentives on new units distort used prices beneath them. Always check whether the subvented rate replaces a cash rebate.",
    ],
    [
      "Why is the interest rate higher on a used car?",
      "Lenders price the collateral, not just the borrower. An older vehicle is worth less, depreciates less predictably and is harder to recover value from in a repossession, so used-car loans carry roughly one to two points more APR than new for the same credit file. Terms are usually shorter and loan-to-value limits tighter as well. Manufacturer captive lenders also reserve their subsidized rates for new inventory, which widens the gap further on the vehicles being promoted.",
    ],
    [
      "How old should a used car be when I buy it?",
      "Two to four years old suits most buyers, and three is the common recommendation for a specific reason: it is where the steepest part of the depreciation curve has passed and the factory bumper-to-bumper warranty is expiring. The first owner absorbed both the value loss and the early-life defect risk. Older than four and the extra discount shrinks each year while wear items and out-of-warranty repair risk rise, so the advantage narrows rather than continuing to grow.",
    ],
    [
      "Is certified pre-owned worth the premium?",
      "It depends on how long you plan to keep the car. CPO typically costs $1,000 to $2,500 more than an equivalent private sale and buys an inspection, an extended powertrain warranty and often a discounted finance rate. If the warranty covers the whole period you intend to own the vehicle, that premium is usually less than a realistic repair-risk allowance of $500 to $700 a year. If you plan to keep the car eight years, the cover expires halfway and the case weakens considerably.",
    ],
    [
      "Does a used car really cost more to maintain?",
      "Yes, and it is the single largest offset to the depreciation saving. The second owner inherits the tires, brakes, suspension bushes, fluids and the first genuinely expensive failure, all of which the first owner avoided under warranty. Budget roughly $1,900 a year against $1,250 for a new car, plus a repair-risk allowance for the failure you cannot schedule. Over five years that difference is around $6,000, which is most of a typical depreciation advantage.",
    ],
    [
      "Why are used cars still so expensive?",
      "Because roughly eight million vehicles that would normally have been built in 2020 to 2022 never were. That missing production is exactly the two-to-five-year-old inventory the used market now sells, so supply is structurally short and prices have held a floor well above the textbook depreciation curve. A three-year-old car that theory says should ask 58% of new price commonly asks 62%, and the premium is widest at around four years old.",
    ],
    [
      "Does insurance cost less on a used car?",
      "Somewhat, but far less than most buyers expect. Only the comprehensive and collision portion of your premium tracks the vehicle's value; liability, medical payments and uninsured-motorist coverage are priced on you and your driving, not the car. A three-to-five-year-old vehicle typically insures for about 10 to 15 percent less than the same model new. Older models with poorer crash-test results or a worse theft record can cost more to insure despite being worth less.",
    ],
  ],
};
