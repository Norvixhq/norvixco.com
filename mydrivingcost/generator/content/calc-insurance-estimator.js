const C = require("../calcpage");
const { num, rng, seg, group, advanced, hero, tiles, chartCard, callout, bullets, table, } = C;

/* ------------------------------------------------------------------ HTML -- */

const inputs = [
  group(
    "Driver",
    [
      seg(
        "age",
        "Age band",
        [["u25", "Under 25"], ["25", "25–34"], ["35", "35–64"], ["65", "65+"]],
        "35"
      ),
      seg(
        "record",
        "Driving record",
        [["clean", "Clean"], ["ticket", "1 ticket"], ["atfault", "1 at-fault"], ["dui", "DUI"]],
        "clean",
      ),
      seg(
        "credit",
        "Credit tier",
        [["exc", "Excellent"], ["good", "Good"], ["fair", "Fair"], ["poor", "Poor"]],
        "good"
      ),
      `<p class="field-help">Insurers do not use your FICO score directly; they use a credit-based insurance score built from the same file. It is one of the strongest single predictors in the book, and it is banned outright in <strong>California, Hawaii, Massachusetts and Michigan</strong>. If you live in one of those four states, leave this on Good — it does nothing to your rate.</p>`,
    ].join("\n              "),
    "var(--c-insure)"
  ),
  group(
    "Where and what",
    [
      seg(
        "state",
        "State rate tier",
        [["low", "Low"], ["below", "Below avg"], ["avg", "Average"], ["above", "Above avg"], ["high", "High"]],
        "avg"
      ),
      `<p class="field-help">Rather than pretend fifty states are fifty separate models, pick the tier yours sits in. Anchors: Vermont is the cheapest at roughly <strong>$1,660</strong> a year for full coverage, Louisiana the dearest at roughly <strong>$3,999</strong>, and the national average lands between <strong>$2,496 and $2,578</strong> depending on whose data you read. Idaho, Maine and Ohio sit low; Florida, Michigan, New York and Nevada sit high.</p>`,
      num("value", "Vehicle value", 34000, {
        prefix: "$",
        min: 1000,
        step: 500,
        help: "What it would cost to replace today. This only moves the collision and comprehensive half of the premium — liability does not care what you drive.",
      }),
      seg(
        "vtype",
        "Vehicle type",
        [["sedan", "Sedan"], ["suv", "SUV"], ["truck", "Truck"], ["lux", "Luxury"], ["ev", "EV"]],
        "suv"
      ),
      rng("miles", "Annual miles", 12000, {
        min: 2000,
        max: 40000,
        step: 500,
        initial: "12,000 mi/yr",
        help: "Exposure matters far less than drivers expect. Halving your mileage does not halve your premium — most of the risk is in who you are and where the car sleeps.",
      }),
    ].join("\n              ")
  ),
  group(
    "Coverage",
    [
      seg(
        "coverage",
        "Coverage level",
        [["min", "State minimum"], ["full", "Standard full"], ["high", "Higher limits"]],
        "full"
      ),
      seg(
        "deductible",
        "Deductible",
        [["250", "$250"], ["500", "$500"], ["1000", "$1,000"], ["2000", "$2,000"]],
        "500"
      ),
      `<p class="field-help">State minimum drops collision and comprehensive entirely, which is why your vehicle value and deductible stop mattering the moment you select it. Higher limits here means roughly 250/500/100 liability with a $1m umbrella-grade cushion rather than the 100/300/100 most people call full coverage.</p>`,
    ].join("\n              ")
  ),
  advanced(
    [
      `<p class="field-help">Discounts are applied to the gross premium, added together and then capped — carriers do not let you stack your way to zero. The tenure field runs the other way: it models price optimization, the industry practice of charging loyal customers more because they are less likely to leave.</p>`,
      num("discMulti", "Multi-policy / bundling", 12, {
        suffix: "%",
        min: 0,
        max: 25,
        step: 1,
        help: "Home or renters bundled with auto. Typically 5–25%. Worth checking against two standalone policies rather than assuming.",
      }),
      num("discTele", "Telematics / usage-based", 0, {
        suffix: "%",
        min: 0,
        max: 30,
        step: 1,
        help: "Enrollment usually buys 5–10% immediately; the earned discount after a monitoring period runs 0–30% and can be negative at some carriers.",
      }),
      num("discPay", "Paid in full, paperless, autopay", 6, {
        suffix: "%",
        min: 0,
        max: 15,
        step: 1,
        help: "The cheapest discounts in the book. Paying six months up front commonly saves 5–9% against monthly installments, which also carry a per-payment fee.",
      }),
      num("discStudent", "Good student / driver training", 0, {
        suffix: "%",
        min: 0,
        max: 25,
        step: 1,
        help: "Applies to students under 25 carrying a B average, and to defensive-driving course credits in most states. Frequently unclaimed.",
      }),
      num("tenure", "Years with your current insurer", 5, {
        suffix: "yrs",
        min: 0,
        max: 30,
        step: 1,
        help: "Beyond three years this model adds about 1.5% a year, capped at 12%. That is not a punishment for good behavior — it is a bet that you will not check.",
      }),
    ].join("\n                  ")
  ),
].join("\n            ");

const results = [
  hero(
    "Insurance estimate",
    "Estimated annual full-coverage premium",
    "annual",
    "money",
    'About <strong class="num" data-out="monthly" data-fmt="money">—</strong> a month, or <strong class="num" data-out="vsBase" data-fmt="pct">—</strong> of the $2,496 national average. This is a model of how insurers price, not a quote — only a carrier can give you one of those.'
  ),
  tiles([
    ["Monthly premium", "monthly", "money", "Twelve installments, before any per-payment fee"],
    ["Insurance per mile", "insPerMile", "perMile", 'Across <span class="num" data-out="milesOut" data-fmt="num">—</span> miles a year'],
    ["Six-month term", "sixMonth", "money", "What most carriers will actually quote you"],
  ]),
  chartCard(
    "What is driving your premium",
    "Every factor you changed, ranked by the dollars it adds or removes",
    `<div id="factor-table"></div>`
  ),
  callout(
    "Your highest-leverage move",
    `<div id="lever-body"><p style="margin:0">Adjust the inputs and this will name the single factor costing you the most, and what to do about it.</p></div>`
  ),
  chartCard(
    "Where the premium goes",
    "A full-coverage policy is four products sold as one",
    `<div class="donut-wrap">
            <div id="donut"></div>
            <div class="breakdown" id="breakdown"></div>
          </div>`
  ),
  callout(
    "State minimum is not insurance, it is a legal formality",
    `<p style="margin:0 0 10px">Stripping this policy back to your state's minimum limits would bring the premium to about <strong class="num" data-out="minPremium" data-fmt="money">—</strong>, saving <strong class="num" data-out="minSaving" data-fmt="money">—</strong> a year. It would also leave you personally liable for everything above the limit.</p>
      <p style="margin:0">Several states still set bodily-injury minimums at $25,000 per person. The average new vehicle now costs over $48,000 and a single air-ambulance flight can exceed $50,000. Cause a two-car injury accident on minimum limits and the shortfall does not disappear — it becomes a judgment against your wages and your equity. This is the one line item on which cutting costs is a genuinely bad trade.</p>`,
    "warn"
  ),
].join("\n\n        ");

const floatBar = `<div class="float-summary no-print" id="floatSummary" aria-hidden="true">
  <div class="fs-item"><span class="k">Annual premium</span><span class="v num" data-out="annual" data-fmt="money">—</span></div>
  <div class="fs-sep"></div>
  <div class="fs-item fs-hide-sm"><span class="k">Per month</span><span class="v num" data-out="monthly" data-fmt="money">—</span></div>
  <button type="button" class="btn btn-primary btn-sm" data-scroll="calc">Edit</button>
</div>`;

/* ------------------------------------------------------------------ prose -- */

const prose = `
    <h2 id="what-it-is">What full coverage actually is</h2>
    <p>There is no product called full coverage. The phrase is shorthand for a bundle: liability, which pays for the damage you do to other people; collision, which repairs your car after a crash regardless of fault; and comprehensive, which covers everything that happens to a car standing still — theft, hail, fire, flood, a deer. Add uninsured and underinsured motorist cover and you have what the industry means when it says full.</p>
    <p>What it does not include is the more useful list. Full coverage does not pay for mechanical failure, wear, or a battery that has lost capacity. It does not cover routine maintenance. It does not cover the gap between what you owe on the loan and what the car is worth when it is totaled — that is GAP insurance, sold separately. It does not cover your possessions inside the car, which fall to your home or renters policy. And unless you buy the endorsement, it does not pay for a hire car while yours is in the shop.</p>
    <p>The national average for that bundle is <strong>$2,496 a year</strong>, roughly $208 a month, and credible sources put the true figure anywhere between $2,237 and $2,578 depending on the vehicle mix and the year of the data. That is the number this calculator starts from. Everything else is a multiplier on top of it.</p>

    <h2 id="formula">The formula</h2>
    ${callout(
      "How the estimate is built",
      `<p style="margin:0 0 10px"><strong>Premium = $2,496 × age × record × credit × state tier × vehicle type × coverage level × deductible × mileage × value × loyalty × (1 − discounts)</strong></p>
       <p style="margin:0 0 10px">Every multiplier is set to 1.00 for a baseline driver: aged 35–64, clean record, good credit, an average-cost state, a mainstream SUV worth $34,000, 12,000 miles a year, standard full coverage and a $500 deductible. That driver pays exactly the national average, which is the point — the model is anchored, not invented.</p>
       <p style="margin:0">Mileage scales as (your miles ÷ 12,000) to the power of 0.10, and vehicle value as (your value ÷ $34,000) to the power of 0.35 applied only to the 41% of the premium that is collision and comprehensive. Those exponents are deliberately gentle, because real rating is gentle here: doubling your annual mileage adds about 7% to a premium, not 100%.</p>`
    )}
    <p>Two consequences follow from the multiplicative structure. Factors compound: a young driver with a DUI in a high-tier state is not paying three penalties but the product of them, which is why the worst quotes in the market look absurd. And the dollar value of any single factor depends on all the others — 10% off a $6,000 premium is $600, off a $1,400 premium it is $140. The ranked table above handles this properly by removing one factor at a time from <em>your</em> premium rather than quoting a generic percentage.</p>

    <h2 id="dispersion">Why identical drivers get quotes three times apart</h2>
    <p>Send the same driver, the same car and the same coverage to eight carriers and the spread between cheapest and dearest routinely exceeds 100%. This is not a market failure and it is not carriers guessing. Each has a different <strong>book of business</strong> — an insurer already carrying a lot of young drivers in Florida prices the next one defensively, one with almost none prices to win. Each has a different <strong>rating plan</strong>, filed with the state regulator, weighting the same factors differently: one treats credit as its third-strongest variable, another as its ninth. And each runs <strong>price optimization</strong>, setting your renewal by your estimated willingness to pay rather than by your risk.</p>
    ${table(
      ["Factor", "Range of the multiplier", "Worst-to-best swing on $2,496"],
      [
        ["Age band", "1.00 (35–64) to 2.10 (under 25)", "+$2,745"],
        ["Driving record", "1.00 (clean) to 1.75 (DUI)", "+$1,872"],
        ["Credit tier", "0.83 (excellent) to 1.75 (poor)", "+$2,296"],
        ["State rate tier", "0.68 (low) to 1.58 (high)", "+$2,246"],
        ["Coverage level", "0.38 (minimum) to 1.16 (higher limits)", "+$1,946"],
        ["Vehicle type", "0.94 (sedan) to 1.42 (luxury)", "+$1,198"],
        ["Deductible", "0.82 ($2,000) to 1.12 ($250)", "+$749"],
        ["Annual miles", "≈0.85 (4,000) to ≈1.12 (40,000)", "+$674"],
      ],
      [1, 2]
    )}
    <p>Notice what is not on that list. Color is not there. Neither is how carefully you believe you drive. The variables that move the number most are your age, your address, your credit file and your record — none of which you can change this afternoon.</p>

    <h2 id="credit">The credit factor, and where it is illegal</h2>
    <p>A credit-based insurance score is not your FICO score, though it is drawn from the same credit file. It weights the things that correlate with claims frequency: length of history, ratio of balances to limits, recent applications for credit, collections. Carriers have run this analysis for thirty years and it holds up statistically — people with poor credit-based insurance scores file more claims. Whether that ought to be legal is a separate argument, and four states have already answered it.</p>
    <p><strong>California, Hawaii, Massachusetts and Michigan</strong> prohibit the use of credit information in personal auto rating. Maryland and Oregon restrict it partially. Everywhere else, moving from good to poor credit can add more to your premium than a speeding ticket — in our model, 75% against 22%. If you live outside those four states and your credit has improved since you last shopped, that alone is grounds to re-quote: carriers re-run the score at renewal, but not always promptly, and a new application always prices the current file.</p>

    <h2 id="deductible">The deductible arithmetic</h2>
    <p>Raising a deductible from $500 to $1,000 is one of the few genuinely free lunches in insurance, and the arithmetic is simple enough to do on the back of an envelope. In this model that move cuts the premium by 10%, about $250 a year on an average policy. You have taken on $500 of additional exposure. So the break-even is <strong>$500 ÷ $250 = two years</strong>: if you go more than two years between at-fault claims, you are ahead.</p>
    <p>The average driver files a collision claim roughly once every eleven to eighteen years. Two years against eleven is not a close call. The move is correct for anyone who can absorb $1,000 from savings without reaching for a credit card — and if you cannot, the deductible is not really your problem, the emergency fund is.</p>
    <p>Going further to $2,000 is a weaker trade. The incremental saving from $1,000 to $2,000 is about 8% here, roughly $200, against $1,000 of extra exposure — a five-year break-even, which is closer to the claim interval and leaves you exposed to a bad month. And there is a behavioral trap: a deductible high enough that you would not actually claim is a deductible you are paying for and will never use.</p>
    ${callout(
      "The claim you should not file",
      `<p style="margin:0">A $1,400 repair on a $1,000 deductible nets you $400. A single at-fault claim typically adds 40–50% to your premium for three to five years — on an average policy, $1,000 or more in total. Below roughly twice your deductible, paying cash is usually the cheaper outcome even though you are insured for it. Comprehensive claims (glass, theft, weather) are surcharged far more gently and are much safer to file.</p>`
    )}

    <h2 id="drop-collision">When to drop collision entirely</h2>
    <p>The standard rule is the 10% rule: <strong>when the annual cost of collision and comprehensive exceeds about 10% of the vehicle's actual cash value, stop buying them</strong>. The logic is that the most the insurer will ever pay you is the car's value minus your deductible, so once the premium approaches a meaningful fraction of that ceiling you are paying a large amount for a small and shrinking maximum payout.</p>
    <p>Work an example. A twelve-year-old sedan worth $3,200 with a $1,000 deductible: the most a total loss can pay is $2,200. If collision and comprehensive together cost $520 a year, four years of those premiums exceed the entire payout. Drop them, keep liability at healthy limits, and put the difference somewhere you can reach it.</p>
    <p>Two caveats. If the car is financed or leased, physical damage cover is contractual and not optional. And if losing the car would leave you unable to get to work, the calculation is about resilience rather than expected value — insure it anyway and accept the poor odds.</p>

    <h2 id="telematics">Telematics: who wins and who should decline</h2>
    <p>Usage-based programs monitor braking, acceleration, cornering, time of day, phone handling and mileage, then re-rate you on the evidence. The pitch is that safe drivers stop subsidizing unsafe ones. It is broadly true, and it is the only lever on this page that can move a young driver's premium by 30% inside six months.</p>
    <p><strong>Take it if</strong> you drive modest mileage, rarely at night, on roads that do not force hard braking, and you are currently priced by a proxy you dislike — young, thin credit file, recently licensed. The program replaces an assumption about you with a measurement of you, and if you are better than the assumption, you win.</p>
    <p><strong>Decline it if</strong> you commute in heavy traffic where hard braking is unavoidable, work nights, or drive high mileage. Several carriers can raise your rate on the data and almost all of them keep it, so read whether the program is discount-only or two-way before you enroll.</p>

    <h2 id="do-better">How to pay less</h2>
    ${bullets([
      "<strong>Shop every single renewal, without exception.</strong> The highest-return action available, and it takes forty minutes. Loyalty is priced against you: tenure is a variable in the industry's models, and new customers routinely pay 10–15% less than five-year customers for identical risk.",
      "<strong>Get at least five quotes, including one direct writer and one independent broker.</strong> Three quotes badly under-sample a market where the spread is 100%+. The dearest quote is not an error and the cheapest is not a scam — they are different books of business.",
      "<strong>Raise the deductible to $1,000 if you can absorb it.</strong> Two-year break-even against an eleven-year average claim interval. Take it.",
      "<strong>Pay the six-month term in full.</strong> Installment plans carry a higher base rate <em>and</em> a per-payment fee. With paperless and autopay this is commonly 5–9% for changing nothing about your risk.",
      "<strong>Bundle, but verify.</strong> Multi-policy discounts of 12–20% are real, and so is the chance the bundled home policy is dearer than a standalone one by more than the discount saves. Compare the total, not the percentage.",
      "<strong>Ask for the discounts nobody offers you.</strong> Good student, defensive-driving course, low mileage, garaged parking, anti-theft, occupation and association credits, paid-off-vehicle status. Carriers apply what they know; they do not chase what they do not.",
      "<strong>Re-quote after every life event.</strong> Marriage, a house move of a few miles, turning 25, a violation aging off, paying off the loan, a better credit file — each changes your rating and none triggers an automatic re-price in your favor.",
      "<strong>Apply the 10% rule annually.</strong> Collision and comprehensive should come off the year the arithmetic says so, not the year you happen to think about it. Diary it with the renewal.",
    ])}

    <h2 id="mistakes">Common mistakes</h2>
    ${callout(
      "Buying the state minimum to save money",
      "Minimum limits in many states remain at 25/50/25 or lower — figures set decades ago and never indexed. The average new vehicle now transacts above $48,000, and serious injury claims routinely run into six figures. Cause an injury accident on minimum limits and the insurer pays to the cap and then withdraws, leaving the balance as a personal judgment against your income and assets. Raising liability from minimum to 100/300/100 typically costs $15–25 a month. It is the best-value line on the entire policy.",
      "warn"
    )}
    ${bullets([
      "<strong>Assuming your rate went up because you did something.</strong> Most renewal increases are book-wide rate filings, not you. Ask which it was; if the answer is a general increase, that is precisely the moment to shop.",
      "<strong>Letting a policy lapse, even for a day.</strong> A gap in continuous coverage is a rating variable in its own right. Never cancel before the replacement policy is bound.",
      "<strong>Confusing GAP cover with full coverage.</strong> Total a financed car in its first two years and the payout is market value, not the loan balance. The shortfall on a typical 7.2% sixty-month loan can exceed $4,000 in year one, and it remains your debt.",
      "<strong>Choosing a car before quoting the insurance.</strong> Two vehicles at the same price can differ by $700 a year to insure — 1.42 for luxury against 0.94 for a mainstream sedan in this model. Quoting takes ten minutes and the number is fixed for as long as you own the car.",
      "<strong>Treating this estimate as a quote.</strong> The model reproduces how the industry rates, using published averages and multipliers in the range regulators see filed. It cannot know your carrier's book, your exact garaging address, or your household's claim history. Use it to work out which lever to pull, then go and get real quotes.",
    ])}
`;

/* -------------------------------------------------------------------- JS -- */

const js = `/* Car Insurance Cost Estimator — MyDrivingCost.com */
(function () {
  "use strict";
  var MDC = window.MDC, F = MDC.fmt;

  /* National full-coverage average. Every multiplier below is 1.00 for the
     baseline driver, so the baseline driver pays exactly this. */
  var BASE = 2496;

  /* Collision + comprehensive as a share of a full-coverage premium. Vehicle
     value and deductible only move this part of the bill. */
  var PHYS = 0.41;

  var M = {
    age:      { u25: 2.10, "25": 1.28, "35": 1.00, "65": 1.08 },
    record:   { clean: 1.00, ticket: 1.22, atfault: 1.44, dui: 1.75 },
    credit:   { exc: 0.83, good: 1.00, fair: 1.28, poor: 1.75 },
    state:    { low: 0.68, below: 0.85, avg: 1.00, above: 1.24, high: 1.58 },
    vtype:    { sedan: 0.94, suv: 1.00, truck: 1.06, lux: 1.42, ev: 1.18 },
    ded:      { "250": 1.12, "500": 1.00, "1000": 0.90, "2000": 0.82 },
    coverage: { min: 0.38, full: 1.00, high: 1.16 }
  };

  var LABEL = {
    age:      { u25: "Under 25", "25": "25–34", "35": "35–64", "65": "65+" },
    record:   { clean: "Clean record", ticket: "One ticket", atfault: "One at-fault claim", dui: "DUI" },
    credit:   { exc: "Excellent credit", good: "Good credit", fair: "Fair credit", poor: "Poor credit" },
    state:    { low: "Low-cost state", below: "Below-average state", avg: "Average state", above: "Above-average state", high: "High-cost state" },
    vtype:    { sedan: "Sedan", suv: "SUV", truck: "Truck", lux: "Luxury", ev: "Electric" },
    ded:      { "250": "$250 deductible", "500": "$500 deductible", "1000": "$1,000 deductible", "2000": "$2,000 deductible" },
    coverage: { min: "State minimum", full: "Standard full coverage", high: "Higher limits" }
  };

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v || 0)); }

  /* Build a settings object from the form, optionally patched for a
     counterfactual ("what if the deductible were $1,000?"). */
  function settings(i, patch) {
    var s = {
      age: i.age, record: i.record, credit: i.credit, state: i.state,
      vtype: i.vtype, coverage: i.coverage, deductible: String(i.deductible),
      miles: i.miles, value: i.value, tenure: i.tenure,
      disc: clamp(i.discMulti, 0, 25) + clamp(i.discTele, 0, 30) +
            clamp(i.discPay, 0, 15) + clamp(i.discStudent, 0, 25)
    };
    if (patch) { for (var k in patch) { if (patch.hasOwnProperty(k)) s[k] = patch[k]; } }
    return s;
  }

  /* Every multiplier, named. Keys here drive the ranked table. */
  function multipliers(s) {
    var physShare = s.coverage === "min" ? 0 : PHYS;
    var valRatio = Math.max(0.05, (s.value || 1) / 34000);
    var mileRatio = Math.max(0.05, (s.miles || 1) / 12000);
    return {
      age:       M.age[s.age] || 1,
      record:    M.record[s.record] || 1,
      credit:    M.credit[s.credit] || 1,
      state:     M.state[s.state] || 1,
      vtype:     M.vtype[s.vtype] || 1,
      coverage:  M.coverage[s.coverage] || 1,
      deductible: physShare ? (M.ded[s.deductible] || 1) : 1,
      miles:     Math.pow(mileRatio, 0.10),
      value:     1 - physShare + physShare * Math.pow(valRatio, 0.35),
      /* Price optimization: past three years with the same carrier the model
         adds about 1.5% a year, capped at 12%. */
      loyalty:   1 + Math.min(0.12, Math.max(0, (s.tenure || 0) - 3) * 0.015),
      discounts: 1 - clamp(s.disc, 0, 40) / 100
    };
  }

  var ORDER = ["age", "record", "credit", "state", "vtype", "coverage",
               "deductible", "miles", "value", "loyalty", "discounts"];

  var NAME = {
    age: "Age band", record: "Driving record", credit: "Credit tier",
    state: "State rate tier", vtype: "Vehicle type", coverage: "Coverage level",
    deductible: "Deductible", miles: "Annual mileage", value: "Vehicle value",
    loyalty: "Years with insurer", discounts: "Discounts applied"
  };

  function premium(s) {
    var m = multipliers(s), t = BASE, k;
    for (k in m) { if (m.hasOwnProperty(k)) t *= m[k]; }
    return t;
  }

  function settingLabel(key, s) {
    if (key === "deductible") {
      return s.coverage === "min" ? "No physical damage cover" : LABEL.ded[s.deductible];
    }
    if (key === "miles") return F.num(s.miles) + " mi/yr";
    if (key === "value") {
      return s.coverage === "min" ? "Not rated at minimum" : F.money(s.value) + " to replace";
    }
    if (key === "loyalty") {
      return (s.tenure || 0) + (s.tenure === 1 ? " year" : " years") + " with the same carrier";
    }
    if (key === "discounts") return Math.round(clamp(s.disc, 0, 40)) + "% off the gross";
    return LABEL[key] ? LABEL[key][s[key]] : "";
  }

  /* Plain-language next step, keyed by whichever factor costs the most. */
  var ADVICE = {
    age: "Age is the one factor you cannot argue with, only outlast. Until it moves, buy the substitutes: enroll in telematics, claim the good-student credit if it applies, stay listed on a parent&rsquo;s policy while that is legitimate, and choose a modest vehicle — the age and vehicle multipliers compound.",
    record: "Violations age off the rating file, typically three years for a ticket and three to five for an at-fault claim, and a DUI five to ten depending on the state. Diary the date yours falls off and re-quote that week. In the meantime, carriers differ enormously in how harshly they surcharge — this is the single situation where shopping widely pays most.",
    credit: "Credit is the fastest-moving of the big factors. Bringing revolving balances under 30% of limits and avoiding new credit applications can shift a tier within two or three billing cycles. Re-quote once it has, because carriers do not always re-pull promptly at renewal. If you live in California, Hawaii, Massachusetts or Michigan, this factor is banned and should not be affecting you at all.",
    state: "Where the car sleeps sets the rate. You are unlikely to move for insurance, but two things are worth doing: confirm the garaging address on the policy is genuinely where the car is kept overnight, and shop harder than average — dispersion between carriers is widest in the most expensive states.",
    vtype: "Repair cost, parts availability and theft rate drive this multiplier, and they are decided the day you choose the vehicle rather than the day you buy the policy. If a change is on the horizon, get insurance quotes on the shortlist before you commit; the gap between a mainstream sedan and a luxury model is larger than most option packages.",
    coverage: "You have chosen higher limits, and this is the one increase on the page worth defending. Liability is cheap per dollar of protection and the cost of being underinsured is unbounded. Recover the money somewhere else — the deductible, the payment plan, or a different carrier.",
    deductible: "Your deductible is doing real damage. Moving from $250 to $1,000 cuts the physical-damage side by roughly 20% for $750 of extra exposure, which breaks even in about three years against an average claim interval of eleven or more. Take the money.",
    miles: "High mileage raises the premium far less than drivers expect, but it is still worth two calls: ask about a mileage band you may have outgrown or undershot, and ask whether a pay-per-mile or telematics product would price you better than a flat annual estimate.",
    value: "An expensive vehicle only inflates the collision and comprehensive half of the bill, and that half shrinks every year as the car depreciates. Apply the 10% rule annually — once physical damage cover costs more than a tenth of the car&rsquo;s value, drop it and keep the liability.",
    loyalty: "You are being charged for staying. Tenure is a rating variable, and the gap between a new customer and a long-standing one for identical risk commonly runs 10–15%. Get five quotes this month. If your current carrier is competitive, nothing is lost; if it is not, this is the largest saving on the page.",
    discounts: "Nothing is inflating your premium — every factor is at or below the market baseline. The remaining lever is the market itself: quote five carriers, including one direct writer and one independent broker. A well-rated driver is exactly who a competing insurer most wants to take from your current one."
  };

  MDC.calc({
    form: "ins-form",
    defaults: {
      age: "35", record: "clean", credit: "good",
      state: "avg", value: 34000, vtype: "suv", miles: 12000,
      coverage: "full", deductible: "500",
      discMulti: 12, discTele: 0, discPay: 6, discStudent: 0, tenure: 5
    },
    compute: function (i) {
      var s = settings(i);
      var m = multipliers(s);
      var annual = premium(s);

      /* Leave-one-out attribution: what would this premium be if THIS factor
         alone sat at the baseline? The difference is that factor's dollar cost. */
      var rows = [], k, j;
      for (j = 0; j < ORDER.length; j++) {
        k = ORDER[j];
        rows.push({
          key: k,
          name: NAME[k],
          setting: settingLabel(k, s),
          mul: m[k],
          impact: annual - annual / m[k]
        });
      }
      rows.sort(function (a, b) { return Math.abs(b.impact) - Math.abs(a.impact); });

      var minPrem = premium(settings(i, { coverage: "min" }));

      return {
        annual: annual,
        monthly: annual / 12,
        sixMonth: annual / 2,
        insPerMile: annual / Math.max(1, i.miles),
        milesOut: i.miles,
        vsBase: annual / BASE * 100,
        minPremium: minPrem,
        minSaving: Math.max(0, annual - minPrem),
        dedSaving: Math.max(0, annual - premium(settings(i, { deductible: "1000" }))),
        rows: rows,
        physShare: s.coverage === "min" ? 0 : PHYS,
        _s: s
      };
    },
    onInput: function (i) {
      var set = function (k, v) {
        document.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) {
          if (el.closest(".field")) el.textContent = v;
        });
      };
      set("miles", F.num(i.miles) + " mi/yr");
    },
    count: [],
    render: function (res, i) {
      /* ---- ranked "what is driving your premium" table ------------------ */
      var host = document.getElementById("factor-table");
      if (host) {
        var body = "", flat = [], n = 0;
        for (var r = 0; r < res.rows.length; r++) {
          var row = res.rows[r];
          if (Math.abs(row.mul - 1) < 0.005) {
            /* At state minimum the deductible and the vehicle's value are not
               rated at all, so they do not belong in a list of neutral settings. */
            if (!(res.physShare === 0 && (row.key === "deductible" || row.key === "value"))) {
              flat.push(row.name.toLowerCase());
            }
            continue;
          }
          n++;
          var up = row.impact > 0;
          var color = up ? "var(--warn)" : "var(--success)";
          var mark = up ? "▲" : "▼";
          var sign = up ? "+" : "−";
          body += '<tr>' +
            '<td><strong>' + row.name + '</strong><br><small class="text-muted">' + row.setting + '</small></td>' +
            '<td class="num">×' + row.mul.toFixed(2) + '</td>' +
            '<td class="num" style="color:' + color + ';font-weight:700">' +
              mark + ' ' + sign + F.money(Math.abs(row.impact)) + '</td>' +
            '<td class="num" style="color:' + color + '">' + sign + F.money(Math.abs(row.impact) / 12) + '</td>' +
            '</tr>';
        }

        var note = n === 0
          ? '<p class="text-muted" style="font-size:.88rem">Every one of your settings sits exactly at the market baseline, so this premium <em>is</em> the national average. Change any input to see what it is worth in dollars.'
          : '<p class="text-muted" style="font-size:.88rem">Each row answers one question: what would you pay if this factor alone were at the baseline, and everything else stayed as it is? Because the factors multiply rather than add, the rows will not sum exactly to the difference from $2,496 — that is a property of the arithmetic, not a rounding error.';
        if (flat.length) {
          note += ' At the baseline and therefore costing nothing either way: ' + flat.join(", ") + '.';
        }
        if (res.physShare === 0) {
          note += ' Your deductible and your vehicle&rsquo;s value are not rated at all at state minimum, because nothing on this policy repairs your own car.';
        }
        note += '</p>';
        if (res.annual > BASE * 3.5) {
          note += '<p class="text-muted" style="font-size:.88rem">Because these factors multiply rather than add, a profile this heavily loaded produces a number that looks unreal — and in practice it is. Most standard carriers decline risks at this level outright. A driver here is quoted by non-standard carriers or placed in a state assigned-risk pool, where the real figure is high but usually lands well below a naive product of the multipliers.</p>';
        }

        host.innerHTML = n === 0 ? note :
          '<div class="table-wrap"><table class="tbl">' +
          '<thead><tr><th>Factor and your setting</th><th class="num">Multiplier</th>' +
          '<th class="num">Per year</th><th class="num">Per month</th></tr></thead>' +
          '<tbody>' + body + '</tbody></table></div>' + note;
      }

      /* ---- the single highest-leverage action for THIS driver ----------- */
      var lever = document.getElementById("lever-body");
      if (lever) {
        var top = null;
        for (var t = 0; t < res.rows.length; t++) {
          if (res.rows[t].impact > 1) { top = res.rows[t]; break; }
        }
        var headline, advice;
        if (top) {
          headline = '<p style="margin:0 0 10px"><strong>' + top.name + '</strong> is the most expensive thing about this policy. ' +
            'It is adding <strong>' + F.money(top.impact) + '</strong> a year — ' +
            F.money(top.impact / 12) + ' a month — against a driver who is otherwise identical to you.</p>';
          advice = ADVICE[top.key];
        } else {
          headline = '<p style="margin:0 0 10px">Nothing in your profile is pushing this premium above the baseline. ' +
            'The saving left on the table is not in your risk, it is in the market.</p>';
          advice = ADVICE.discounts;
        }
        var extra = "";
        if (top && top.key !== "deductible" && res.dedSaving > 40 && i.deductible !== "1000" && i.coverage !== "min") {
          extra = '<p style="margin:10px 0 0" class="text-muted">Second lever: moving to a $1,000 deductible would take another <strong>' +
            F.money(res.dedSaving) + '</strong> a year off this premium.</p>';
        }
        lever.innerHTML = headline + '<p style="margin:0">' + advice + '</p>' + extra;
      }

      /* ---- what the premium actually buys ------------------------------ */
      var segs;
      if (res.physShare === 0) {
        segs = [
          { label: "Liability", value: res.annual * 0.78, cssVar: "--c-insure" },
          { label: "Uninsured motorist &amp; other", value: res.annual * 0.22, cssVar: "--c-opp" }
        ];
      } else {
        segs = [
          { label: "Liability", value: res.annual * 0.47, cssVar: "--c-insure" },
          { label: "Collision", value: res.annual * 0.28, cssVar: "--c-maint" },
          { label: "Comprehensive", value: res.annual * 0.13, cssVar: "--c-fuel" },
          { label: "Uninsured motorist &amp; other", value: res.annual * 0.12, cssVar: "--c-opp" }
        ];
      }

      var donut = document.getElementById("donut");
      if (donut) MDC.charts.donut(donut, segs, {
        centerLabel: "Per year",
        centerValue: F.money(res.annual),
        centerSub: F.money(res.annual / 12) + " / mo",
        aria: "How the premium splits between liability, collision, comprehensive and other cover"
      });

      var bd = document.getElementById("breakdown");
      if (bd) {
        bd.innerHTML = segs.map(function (sg) {
          var pct = res.annual > 0 ? sg.value / res.annual * 100 : 0;
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + sg.cssVar + ')"></span>' +
            '<span class="bd-name">' + sg.label + '<small>' + F.money(sg.value / 12) + ' / month</small></span>' +
            '<span class="bd-pct num">' + Math.round(pct) + '%</span>' +
            '<span class="bd-val num">' + F.money(sg.value) + '</span>' +
            '</div>';
        }).join("") +
        '<p class="text-muted" style="font-size:.84rem;margin-top:14px">' +
        (res.physShare === 0
          ? 'At state minimum you are buying liability and little else. Nothing here repairs your own vehicle.'
          : 'Liability is the cheapest protection per dollar on the policy and the only part that protects your savings. Collision and comprehensive protect the car, and their value falls every year as the car depreciates.') +
        '</p>';
      }
    }
  });
})();
`;

module.exports = {
  slug: "insurance-estimator",
  jsName: "ins",
  formId: "ins-form",
  crumbName: "Insurance Estimator",
  appName: "Car Insurance Cost Estimator",
  title: "Car Insurance Cost Estimator | MyDrivingCost",
  desc:
    "Estimate your annual full-coverage premium from the factors insurers actually rate on, then see every one of them ranked by the dollars it adds or removes.",
  ogTitle: "Car Insurance Cost Estimator — what drives your premium",
  ogDesc:
    "Age, record, credit, postcode, deductible. See which one is costing you most, in dollars, ranked.",
  h1: "Car Insurance Cost Estimator",
  lead:
    "Most insurance calculators give you a number. This one gives you the number and then shows you exactly which factor is inflating it, ranked by dollars, so you know which lever is worth pulling. Built from the $2,496 national full-coverage average and the multipliers insurers file with regulators.",
  inputs,
  results,
  floatBar,
  prose,
  js,
  disclaimer:
    "This is a rating model built from published national averages and typical filed multipliers. It is not a quote and no carrier is bound by it. Real premiums depend on your exact garaging address, household claim history, vehicle identification number and each carrier's own book of business. Always get quotes from at least five insurers before deciding.",
  sources: ["IIHS_HLDI", "AAA_YDC", "BLS_CEX"],
  sourceNotes: [
    "No public dataset prices an individual policy. This page models the direction and rough magnitude of the factors carriers actually use &mdash; vehicle, driver age, record, coverage level, deductible and location &mdash; and it is not a substitute for a quote. Treat the output as a planning figure and get real quotes before you buy.",
  ],
  related: [
    ["/calculators/true-cost-to-own/", "True Cost to Own", "Insurance is one of six cost categories. See how it stacks against the other five."],
    ["/calculators/cost-per-mile/", "Cost Per Mile", "Reduce every cost of ownership, premiums included, to one honest number."],
    ["/calculators/depreciation/", "Depreciation", "Your vehicle's falling value is what decides when to drop collision cover."],
    ["/insurance/", "Insurance guide", "Coverage types, limits that actually protect you, and how to shop a renewal properly."],
  ],
  faq: [
    [
      "How much is car insurance a year on average?",
      "Full coverage averages about $2,496 a year nationally, or roughly $208 a month, with credible estimates ranging from $2,237 to $2,578 depending on the data source and vehicle mix. Minimum-liability-only cover averages closer to $900. The spread by state is enormous: Vermont sits near $1,660 while Louisiana approaches $3,999 for the same coverage. Age, driving record and credit tier can each move an individual premium by more than the entire gap between the cheapest and dearest states.",
    ],
    [
      "Why is my car insurance so expensive compared with my neighbor's?",
      "Because the rating factors that matter most are personal rather than geographic. Two people on the same street can pay double or half each other on the strength of age band, credit-based insurance score, claim history in the past five years, the vehicle's repair cost, chosen limits and deductible, and simply which carrier they happen to be with. Carriers weight these differently in their filed rating plans, so the same driver routinely gets quotes 100 percent apart from eight insurers. Shopping is the only way to find out where you sit.",
    ],
    [
      "Should I raise my deductible from $500 to $1,000?",
      "Usually yes, provided you could pay $1,000 tomorrow without borrowing. The move typically cuts the premium by about 10 percent, roughly $250 a year on an average policy, in exchange for $500 of additional exposure. That breaks even in two years, and the average driver files a collision claim only once every eleven to eighteen years. Going further to $2,000 is a weaker trade: the extra saving is smaller and the break-even stretches to about five years, which is close enough to the claim interval to matter.",
    ],
    [
      "Does credit score affect car insurance?",
      "Yes, substantially, in every state except California, Hawaii, Massachusetts and Michigan, where it is banned outright. Insurers use a credit-based insurance score drawn from your credit file rather than your FICO score itself, weighting balances against limits, length of history and recent credit applications. Moving from good to poor credit can add more to a premium than a speeding ticket. The practical upshot is that improving your credit is one of the fastest-acting levers available, but you must re-quote afterwards, because carriers do not always re-pull promptly at renewal.",
    ],
    [
      "When should I drop collision and comprehensive coverage?",
      "When the combined annual premium for collision and comprehensive exceeds about 10 percent of the vehicle's actual cash value. The insurer will never pay more than the car's value minus your deductible, so once the premium approaches a meaningful share of that ceiling you are buying very little protection for real money. A $3,200 car with a $1,000 deductible has a maximum payout of $2,200, and paying $520 a year for that is poor value. The exception is a financed or leased vehicle, where physical damage cover is contractually required.",
    ],
    [
      "Is telematics or usage-based insurance worth it?",
      "It is worth it if you drive modest mileage in light traffic and are currently being priced by an unflattering proxy, such as being young or having a thin credit file. Programs measure braking, acceleration, cornering, time of day and phone handling, and can cut a young driver's premium by up to 30 percent. Decline it if you commute in stop-start traffic, work nights, or drive high mileage, because several carriers can raise your rate on the data. Check whether the program is discount-only or two-way before enrolling.",
    ],
    [
      "Does shopping for car insurance every year actually save money?",
      "It is the single most reliable saving available to a driver. Tenure is a rating variable, and price optimization means long-standing customers are frequently charged 10 to 15 percent more than new customers for identical risk. Carriers also file general rate increases that have nothing to do with your behavior. Getting five quotes at each renewal, including at least one direct writer and one independent broker, takes under an hour and regularly finds several hundred dollars. Never cancel the old policy until the new one is bound.",
    ],
    [
      "What does full coverage not cover?",
      "Full coverage does not pay for mechanical breakdown, wear items, or battery degradation, and it does not cover routine maintenance. It does not cover the gap between your loan balance and the car's market value if the vehicle is totaled, which requires separate GAP insurance. It does not cover personal belongings stolen from inside the car, which fall under a home or renters policy. Rental reimbursement and roadside assistance are usually optional endorsements rather than part of the standard bundle, so check the declarations page rather than assuming.",
    ],
  ],
};
