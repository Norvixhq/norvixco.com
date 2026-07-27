const C = require("../calcpage");
const { num, rng, seg, group, advanced, hero, tiles, chartCard, callout, bullets, table, } = C;

/* ------------------------------------------------------------------ HTML -- */

const inputs = [
  group(
    "The vehicle",
    [
      num("price", "Purchase price", 34000, { prefix: "$", min: 1000, step: 500 }),
      rng("years", "Years you'll keep it", 5, { min: 1, max: 12, step: 1, initial: "5 years" }),
      rng("miles", "Annual miles", 12000, { min: 2000, max: 40000, step: 500, initial: "12,000 mi/yr" }),
      rng("retain", "Value when you sell", 42, { min: 5, max: 90, step: 1, initial: "42% · $14,280", help: "A typical vehicle retains about 42% of its price after five years. That is the rounded form of the 20%-then-15%-a-year curve our True Cost to Own model runs (41.76% exactly), so expect the two calculators to land within about $80 of each other rather than matching to the dollar. Trucks retain more; luxury sedans and EVs retain less." }),
    ].join("\n              ")
  ),
  group(
    "Energy",
    [
      seg("power", "Powertrain", [["gas", "Gas"], ["hybrid", "Hybrid"], ["ev", "Electric"]], "gas"),
      `<div data-when="fuel">${num("mpg", "Combined MPG", 30, { min: 5, max: 150, step: 1 })}</div>`,
      `<div data-when="fuel">${num("gasPrice", "Gas price", 4.0, {
        prefix: "$",
        suffix: "/gal",
        min: 1,
        max: 12,
        step: 0.05,
      })}</div>`,
      `<div data-when="ev" hidden>${num("kwh100", "Efficiency", 32, {
        suffix: "kWh/100mi",
        min: 15,
        max: 60,
        step: 1,
        help: "At the plug, so charging losses are already included. Most EVs land between 28 and 38.",
      })}</div>`,
      `<div data-when="ev" hidden>${num("kwhPrice", "Blended electricity price", 0.195, {
        prefix: "$",
        suffix: "/kWh",
        min: 0.03,
        max: 0.8,
        step: 0.005,
        help: "Mostly home charging with occasional public stops. Home-only is nearer $0.175.",
      })}</div>`,
    ].join("\n              "),
    "var(--c-fuel)"
  ),
  group(
    "Running costs",
    [
      num("insurance", "Insurance", 2496, { prefix: "$", suffix: "/yr", min: 0, step: 50 }),
      num("maint", "Maintenance &amp; repairs", 1250, { prefix: "$", hint: "year one", suffix: "/yr", min: 0, step: 50, help: "The first year, not an average. The model escalates it 12% a year afterwards, because a car out of warranty costs meaningfully more to keep than a new one. Five years of this default totals $7,941 &mdash; an average of $1,588 a year, including a share of a tire set." }),
      num("tax", "Sales tax", 7, { suffix: "%", min: 0, max: 15, step: 0.25, help: "Charged once, on the purchase price &mdash; not every year. Set it to 0 for a private-party sale in a state that doesn&rsquo;t tax them." }),
      num("reg", "Registration", 220, { prefix: "$", suffix: "/yr", min: 0, step: 10, help: "Plates and any annual state fee. Small, but it recurs every year you own the car." }),
      num("fees", "Doc, title &amp; dealer fees", 700, { prefix: "$", min: 0, step: 25, help: "Charged once, at purchase. It is financed into the loan along with the sales tax unless you pay it separately, so you pay interest on it too." }),
    ].join("\n              "),
    "var(--c-insure)"
  ),
  advanced(
    [
      `<p class="field-help">If you paid cash, set the APR to 0 and financing drops out of the calculation.</p>`,
      num("down", "Down payment", 3400, { prefix: "$", min: 0, step: 250 }),
      rng("apr", "Loan APR", 7.2, { min: 0, max: 20, step: 0.1, initial: "7.2%" }),
      rng("term", "Loan term", 60, { min: 12, max: 96, step: 12, initial: "60 months" }),
    ].join("\n                  ")
  ),
].join("\n            ");

const results = [
  hero(
    "Cost Per Mile summary",
    'Your true cost per mile · <span data-out="yearsLabel">5 years</span>',
    "perMile",
    "perMile",
    'Every mile you drive costs this much once <em>everything</em> is counted — not just the gas. That works out to <strong class="num" data-out="perYear" data-fmt="money">—</strong> a year, or <strong class="num" data-out="perMonth" data-fmt="money">—</strong> a month.'
  ),
  tiles([
    ["Fixed costs / mile", "fixedPerMile", "perMile", "Depreciation, insurance, interest, fees"],
    ["Running costs / mile", "varPerMile", "perMile", "Fuel or electricity, maintenance"],
    ["Total over the period", "total", "money", 'All costs across <span data-out="totalMiles" data-fmt="num">—</span> miles'],
  ]),
  chartCard(
    "Where each mile's money goes",
    "Total cost by category over the whole ownership period",
    `<div class="donut-wrap">
            <div id="donut"></div>
            <div class="breakdown" id="breakdown"></div>
          </div>`
  ),
  chartCard(
    "Why mileage changes everything",
    "Your cost per mile at different annual mileages, same car",
    `<div id="miles-chart"></div>
          <p class="text-muted" style="font-size:.85rem;margin-top:14px">Fixed costs don't care how much you drive, so they get spread thinner the more miles you cover. This is why a low-mileage car can quietly cost more per mile than one that's driven hard.</p>`
  ),
  callout(
    "The gas pump is not the story",
    `Fuel is usually the smallest of the big three. For this vehicle it's <strong class="num" data-out="energyShare" data-fmt="pct">—</strong> of the total, while depreciation alone is <strong class="num" data-out="depShare" data-fmt="pct">—</strong>. If you want a cheaper mile, the decision that moves it most is <em>which car you buy and when</em>, not which station you fill up at.`
  ),
].join("\n\n        ");

const floatBar = `<div class="float-summary no-print" id="floatSummary" aria-hidden="true">
  <div class="fs-item"><span class="k">Cost per mile</span><span class="v num" data-out="perMile" data-fmt="perMile">—</span></div>
  <div class="fs-sep"></div>
  <div class="fs-item fs-hide-sm"><span class="k">Per year</span><span class="v num" data-out="perYear" data-fmt="money">—</span></div>
  <button type="button" class="btn btn-primary btn-sm" data-scroll="calc">Edit</button>
</div>`;

/* ------------------------------------------------------------------ prose -- */

const prose = `
    <h2 id="how-it-works">What "cost per mile" actually means</h2>
    <p>Cost per mile is the single most honest number in vehicle ownership. It takes every dollar a car costs you over the time you own it — the money you lose to depreciation, the interest on the loan, insurance premiums, registration, fuel or electricity, tires, oil, brakes, the repair you didn't plan for — and divides the whole pile by the miles you actually drove. One number. No hiding.</p>
    <p>It matters because it's the only way to compare vehicles that are genuinely different. A $58,000 truck and a $26,000 hatchback can't be compared by sticker price, monthly payment or MPG, because each of those measures one slice of a much bigger bill. Cost per mile flattens all of it into a figure you can put side by side. The IRS uses the same logic when it sets its standard mileage rate, and so does every fleet manager who has ever had to justify a vehicle purchase.</p>
    <p>Most drivers dramatically underestimate theirs. Ask someone what their car costs to run and they'll quote you the fuel — maybe 13 or 14 cents a mile. AAA's 2025 <em>Your Driving Costs</em> study puts the real figure for an average new vehicle at <strong>77 cents a mile</strong>, or $11,577 a year at 15,000 miles. Drive fewer miles than that and your per-mile number goes <em>up</em>, not down, because the fixed costs are spread across less distance. The gap between 14 cents and 77 cents is everything the pump doesn't charge you for.</p>

    <h2 id="formula">The formula</h2>
    <p>The calculation itself is simple arithmetic. The difficulty is remembering to include everything:</p>
    ${callout(
      "Cost per mile = total cost of ownership ÷ total miles driven",
      `<p style="margin:0 0 10px">Where total cost of ownership over N years is:</p>
      <p style="margin:0;font-family:var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);font-size:.9rem;line-height:1.8">(purchase price − resale value)<br>+ loan interest paid<br>+ insurance × N<br>+ fuel or electricity<br>+ maintenance and repairs<br>+ registration, taxes and fees</p>`
    )}
    <p>Two of those terms cause nearly all the confusion. <strong>Depreciation is a real cost even though you never write a check for it</strong> — it's the difference between what you paid and what you can sell for, and on a new car it's typically the largest line by a wide margin. And <strong>loan interest is not the same as the loan payment</strong>: the principal portion of your payment buys equity in an asset you'll sell later, so counting the whole payment as a cost would double-count the purchase price.</p>

    <h2 id="fixed-variable">Fixed costs versus running costs</h2>
    <p>Every cost in the list falls into one of two buckets, and the distinction changes how you should think about driving.</p>
    ${bullets([
      "<strong>Fixed costs</strong> — depreciation (mostly), insurance, registration, financing interest. These accrue whether the car sits in the driveway all month or crosses three states. Per mile, they shrink as you drive more.",
      "<strong>Running costs</strong> — fuel or charging, tires, oil, brakes, the wear items. These scale roughly with distance. Per mile, they stay about the same no matter how much you drive.",
    ])}
    <p>This produces a result people find counterintuitive: <em>driving more makes each mile cheaper</em>. A car driven 6,000 miles a year might cost well over a dollar a mile; the identical car driven 20,000 miles a year might cost 45 cents. The total spend is higher, of course — but the cost <em>per mile</em> falls sharply, because the fixed block is being spread across more miles. The chart above shows exactly that curve for your numbers.</p>
    <p>The practical consequence: if you drive very little, the expensive thing you own is the car itself, not the driving. A cheaper, older, already-depreciated vehicle usually beats a fuel-efficient new one. If you drive a great deal, the opposite holds — efficiency and durability start to dominate, and paying more upfront for a car that sips fuel and doesn't break can genuinely pay back.</p>

    <h2 id="benchmarks">What a typical mile costs</h2>
    <p>The most widely cited benchmark is AAA's <em>Your Driving Costs</em>, which prices a new vehicle held five years and 75,000 miles — 15,000 miles a year. Its <a href="https://newsroom.aaa.com/2025/09/aaa-new-vehicle-costs-drop-to-11577/">2025 edition</a>, the most recent published, put the average across all categories at <strong>$11,577 a year, or 77.18 cents a mile</strong>. That was $719 <em>lower</em> than 2024, almost entirely because pump prices fell.</p>
    <p>Here is where that money actually goes. Every figure below is AAA's, converted between annual and per-mile at their own 15,000-mile assumption, so the column sums to the headline number rather than approximating it:</p>
    ${table(
      ["Cost line", "Cents per mile", "Per year", "Share of total"],
      [
        ["Depreciation", "28.89¢", "$4,334", "37.4%"],
        ["Insurance, license, registration &amp; taxes", "16.71¢", "$2,506", "21.6%"],
        ["Fuel", "13.00¢", "$1,950", "16.8%"],
        ["Maintenance, repair &amp; tires", "11.04¢", "$1,656", "14.3%"],
        ["Finance charges", "7.54¢", "$1,131", "9.8%"],
        ["<strong>Total</strong>", "<strong>77.18¢</strong>", "<strong>$11,577</strong>", "<strong>100%</strong>"],
      ],
      [1, 2, 3],
      "AAA Your Driving Costs 2025: average annual cost of a new vehicle by cost line, at 15,000 miles a year"
    )}
    <p><strong>Depreciation is the largest line, and fuel is fourth.</strong> That single fact is the whole argument for calculating cost per mile instead of watching the pump. Depreciation and finance charges together — $5,465, or 47% of the bill — are money you spend on <em>owning</em> the car, before you have driven it anywhere at all.</p>
    <p>Vehicle class moves the total more than any driving habit does. AAA's cheapest category, the small sedan, runs <strong>55.87 cents a mile</strong>. Its most expensive, the half-ton crew-cab pickup, costs $6,402 a year more than that small sedan — which works out to about <strong>98.5 cents a mile</strong>, very nearly double. A mid-size sedan sits in between at roughly 66 cents.</p>
    ${table(
      ["Vehicle class", "Cost per mile", "Annual cost at 15,000 mi"],
      [
        ["Small sedan (AAA's least expensive class)", "55.87¢", "≈ $8,381"],
        ["Mid-size sedan", "≈ 66¢", "≈ $9,956"],
        ["<strong>Average, all classes</strong>", "<strong>77.18¢</strong>", "<strong>$11,577</strong>"],
        ["Half-ton crew-cab pickup (most expensive)", "≈ 98.5¢", "≈ $14,783"],
      ],
      [1, 2],
      "AAA Your Driving Costs 2025: cost per mile by vehicle class, cheapest to most expensive"
    )}
    <p>Two caveats before you compare your own number to any of this. First, AAA assumes 15,000 miles a year, which is <em>more</em> than the average American drives — and because fixed costs get spread across those extra miles, the study's per-mile figures are flattering. Drive 10,000 miles a year in the same car and your cost per mile goes up, not down. Second, AAA prices a brand-new vehicle bought with a loan. If your car is paid off and eight years old, depreciation and finance charges — 47% of AAA's bill — largely disappear, and your real number can land under 30 cents.</p>

    <h2 id="lower">Seven ways to lower your cost per mile</h2>
    ${bullets([
      "<strong>Buy a two-to-four-year-old vehicle.</strong> On our depreciation curve the first owner absorbs roughly 32% of the value by year two and 51% by year four — money that is simply gone before you ever see the car. Nothing else on this list comes close to that saving.",
      "<strong>Keep it longer.</strong> Depreciation slows dramatically after year five while the car keeps working. Years seven through twelve are the cheapest miles most people ever drive.",
      "<strong>Shop insurance every renewal.</strong> The same driver and the same car routinely see quotes 30–50% apart between carriers, and loyalty is rarely rewarded.",
      "<strong>Do the maintenance you're supposed to do.</strong> Deferred fluid and brake service is the cheapest way to turn a $90 job into a $1,400 one.",
      "<strong>Finance less, and for less time.</strong> Interest is pure cost with nothing to show for it. Every year of loan term you remove is money that stays with you.",
      "<strong>Match the vehicle to the actual job.</strong> Buying three rows and a tow rating for two commuting trips a week is the single most common expensive mistake in the market.",
      "<strong>Consolidate trips rather than chasing cheap fuel.</strong> Driving 12 miles to save 20 cents a gallon costs more than it saves, essentially always.",
    ])}

    <h2 id="mistakes">Common mistakes</h2>
    ${callout(
      "Counting the whole loan payment as a cost",
      "A $620 monthly payment is not $620 of cost. Part of it buys equity in a car you'll eventually sell. Only the interest is truly spent — the rest shows up later as depreciation when you compare what you paid to what you sold for. Counting both double-counts the vehicle.",
      "warn"
    )}
    ${bullets([
      "<strong>Ignoring depreciation entirely.</strong> The most common error by far, and the one that makes new cars feel cheaper than they are. You don't get invoiced for it, so it doesn't feel real — until you go to sell.",
      "<strong>Using the sticker price instead of the out-the-door price.</strong> Sales tax, documentation fees, title and registration are real money that never comes back to you.",
      "<strong>Forgetting tires.</strong> A set is $700–1,400 and lasts 40,000–60,000 miles. That's roughly 2 cents a mile that almost nobody budgets for.",
      "<strong>Assuming an EV's low fuel cost makes it cheap per mile.</strong> Electricity really is 3–5× cheaper per mile than gasoline, but on many EVs faster depreciation and higher insurance eat a good part of that advantage. Run the whole calculation, not just the energy line.",
      "<strong>Using new-car maintenance costs for an old car.</strong> Years one to three are nearly free under warranty. Years eight and beyond are not. Budget for the car's actual age.",
    ])}
`;

/* -------------------------------------------------------------------- JS -- */

const js = `/* Cost Per Mile — MyDrivingCost.com */
(function () {
  "use strict";
  var MDC = window.MDC, F = MDC.fmt, M = MDC.model;

  var CATS = [
    { key: "deprec",    label: "Depreciation",          css: "--c-deprec" },
    { key: "energy",    label: "Fuel / energy",         css: "--c-fuel" },
    { key: "insurance", label: "Insurance",             css: "--c-insure" },
    { key: "maint",     label: "Maintenance & repairs", css: "--c-maint" },
    { key: "interest",  label: "Financing interest",    css: "--c-finance" },
    { key: "taxes",     label: "Taxes & fees",          css: "--c-tax" }
  ];

  /* Powertrain profiles, identical to the True Cost to Own model so the two
     calculators cannot disagree about what a hybrid is. Flipping the segmented
     control re-seeds these three fields — without that, "Hybrid" changed a
     label and nothing else, which is worse than not offering the button. */
  var POWER = {
    gas:    { mpg: 30, ins: 2496, maint: 1250 },
    hybrid: { mpg: 48, ins: 2530, maint: 1100 },
    ev:     { kwh100: 32, ins: 2820, maint: 800 }
  };

  function core(i, miles) {
    var years = i.years, totalMiles = Math.max(1, miles * years);
    var resale = i.price * (i.retain / 100);
    var deprec = Math.max(0, i.price - resale);
    /* Finance the out-the-door price, matching /calculators/auto-loan/ and
       /calculators/true-cost-to-own/. Tax and dealer fees are rolled into the
       loan in almost every real transaction, so you pay interest on them. */
    var outTheDoor = i.price + i.price * (i.tax / 100) + i.fees;
    var loanAmt = Math.max(0, outTheDoor - i.down);
    var interest = i.apr > 0 && loanAmt > 0
      ? M.interestPaid(loanAmt, i.apr, i.term, years * 12).interest : 0;

    /* A conventional hybrid burns gasoline — it just burns less of it. So the
       energy branch is two-way on "ev" while the profile table above is
       three-way: hybrid keeps the mpg fields and simply starts at 48. */
    var energy = i.power === "ev"
      ? totalMiles * (Math.max(0, i.kwh100) / 100) * i.kwhPrice
      : (totalMiles / Math.max(1, i.mpg)) * i.gasPrice;

    /* Maintenance escalates ~12% a year off the year-one base. A flat annual
       figure is wrong in both directions at once: it overcharges the warranty
       years and undercharges the years the repairs actually arrive. */
    var maint = 0;
    for (var y = 1; y <= years; y++) maint += i.maint * Math.pow(1.12, y - 1);

    /* Sales tax is charged once, on the price; registration recurs annually.
       The single blended "fees" field this replaces charged one number every
       year, which simultaneously invented phantom annual fees and omitted
       roughly $2,200 of sales tax on a $34,000 car. */
    var taxes = i.price * (i.tax / 100) + i.reg * years + i.fees;

    var vals = {
      deprec: deprec,
      energy: energy,
      insurance: i.insurance * years,
      maint: maint,
      interest: interest,
      taxes: taxes
    };
    var total = 0;
    for (var k in vals) total += vals[k];
    return { vals: vals, total: total, totalMiles: totalMiles, resale: resale };
  }

  MDC.calc({
    form: "cpm-form",
    defaults: {
      price: 34000, years: 5, miles: 12000, retain: 42,
      power: "gas", mpg: 30, gasPrice: 4.00, kwh100: 32, kwhPrice: 0.195,
      insurance: 2496, maint: 1250, tax: 7, reg: 220, fees: 700,
      down: 3400, apr: 7.2, term: 60
    },
    /* Re-seed the three powertrain-dependent fields when the segmented control
       changes. This overwrites a value the visitor may have typed, which is the
       right trade: the alternative is a button that appears to do nothing. Note
       that deserialize() deliberately does not fire onSeg, so a shared URL still
       restores exactly the numbers it was shared with. */
    onSeg: function (name, val, api) {
      if (name !== "power") return;
      var p = POWER[val] || POWER.gas;
      api.setField("insurance", p.ins);
      api.setField("maint", p.maint);
      if (val === "ev") api.setField("kwh100", p.kwh100);
      else api.setField("mpg", p.mpg);
    },
    compute: function (i) {
      var c = core(i, i.miles);
      var fixed = c.vals.deprec + c.vals.insurance + c.vals.interest + c.vals.taxes;
      var variable = c.vals.energy + c.vals.maint;
      return {
        perMile: c.total / c.totalMiles,
        fixedPerMile: fixed / c.totalMiles,
        varPerMile: variable / c.totalMiles,
        total: c.total,
        totalMiles: c.totalMiles,
        perYear: c.total / i.years,
        perMonth: c.total / (i.years * 12),
        energyShare: c.total > 0 ? c.vals.energy / c.total * 100 : 0,
        depShare: c.total > 0 ? c.vals.deprec / c.total * 100 : 0,
        yearsLabel: i.years + (i.years === 1 ? " year" : " years"),
        vals: c.vals,
        resale: c.resale,
        _i: i
      };
    },
    onInput: function (i) {
      /* live slider labels */
      var set = function (k, v) {
        document.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) {
          if (el.closest(".field")) el.textContent = v;
        });
      };
      set("years", i.years + (i.years === 1 ? " year" : " years"));
      set("miles", F.num(i.miles) + " mi/yr");
      set("retain", i.retain + "% · " + F.money(i.price * i.retain / 100));
      set("apr", i.apr.toFixed(1) + "%");
      set("term", i.term + " months");
    },
    count: [],
    render: function (res, i) {
      /* Powertrain field visibility. Hybrid deliberately falls on the "fuel"
         side: it has a tank and an mpg figure, not a kWh/100mi rating. */
      var ev = i.power === "ev";
      document.querySelectorAll('[data-when="ev"]').forEach(function (el) { el.hidden = !ev; });
      document.querySelectorAll('[data-when="fuel"]').forEach(function (el) { el.hidden = ev; });

      var rows = CATS.map(function (c) { return { c: c, v: res.vals[c.key] || 0 }; })
                     .filter(function (r) { return r.v > 0.5; });
      var maxV = rows.reduce(function (a, b) { return Math.max(a, b.v); }, 1);
      var bd = document.getElementById("breakdown");
      if (bd) {
        bd.innerHTML = rows.slice().sort(function (a, b) { return b.v - a.v; }).map(function (r) {
          var pct = res.total > 0 ? (r.v / res.total * 100) : 0;
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + r.c.css + ')"></span>' +
            '<span class="bd-name">' + r.c.label + '<small>' + F.perMile(r.v / res.totalMiles) + ' / mile</small></span>' +
            '<span class="bd-pct num">' + Math.round(pct) + '%</span>' +
            '<span class="bd-val num">' + F.money(r.v) + '</span>' +
            '</div>';
        }).join("");
      }
      var donut = document.getElementById("donut");
      if (donut) MDC.charts.donut(donut, rows.map(function (r) {
        return { label: r.c.label, value: r.v, cssVar: r.c.css };
      }), {
        centerLabel: "Per mile",
        centerValue: F.perMile(res.perMile),
        centerSub: F.money(res.total) + " total",
        aria: "Cost per mile breakdown by category"
      });

      /* cost per mile vs annual mileage */
      var host = document.getElementById("miles-chart");
      if (host) {
        var pts = [];
        for (var m = 4000; m <= 30000; m += 2000) {
          var c = core(i, m);
          pts.push({ x: m, y: c.total / c.totalMiles });
        }
        MDC.charts.area(host, pts, {
          cssVar: "--c-deprec",
          yFmt: function (v) { return "$" + v.toFixed(2); },
          xFmt: function (x) { return (x / 1000) + "k"; },
          xLabelFmt: function (x) { return F.num(x) + " mi/yr"; },
          aria: "Cost per mile falling as annual mileage rises"
        });
      }
    }
  });
})();
`;

module.exports = {
  slug: "cost-per-mile",
  jsName: "cpm",
  formId: "cpm-form",
  crumbName: "Cost Per Mile",
  appName: "Cost Per Mile Calculator",
  title: "Cost Per Mile Calculator — What a Mile Costs | MyDrivingCost",
  desc:
    "Calculate your true cost per mile including depreciation, insurance, fuel, maintenance, financing and fees. Free, instant, and every assumption is editable.",
  ogTitle: "Cost Per Mile Calculator — what every mile really costs",
  ogDesc:
    "Depreciation, insurance, fuel, maintenance, interest and fees — reduced to one honest number.",
  h1: "Cost Per Mile Calculator",
  lead:
    "Most people think a mile costs them the price of the gas. It doesn't — it costs roughly four times that. This calculator adds up every dollar your vehicle takes, then divides by the miles you actually drive.",
  inputs,
  results,
  floatBar,
  prose,
  js,
  sources: ["AAA_YDC", "AAA_YDC_2025", "EIA_GAS", "EPA_FE", "BLS_CPI"],
  sourceNotes: [
    "AAA&rsquo;s published figure assumes 15,000 miles a year over five years on a new vehicle, using its own financing and insurance assumptions. This page lets you change all of them, so its result will not match AAA&rsquo;s headline number unless you set the inputs to match.",
  ],
  related: [
    ["/calculators/true-cost-to-own/", "True Cost to Own", "The same six cost categories laid out year by year over a full five years."],
    ["/calculators/fuel-cost/", "Fuel Cost", "Just the energy line — annual and five-year gasoline cost from your MPG and pump price."],
    ["/calculators/depreciation/", "Depreciation", "Model the value curve that drives most of your cost per mile."],
    ["/calculators/", "All calculators", "Lease vs buy, auto loan, EV charging and the rest of the library."],
  ],
  faq: [
    [
      "What is a good cost per mile for a car?",
      "For a new vehicle driven 15,000 miles a year, AAA's 2025 study puts the range from about 56 cents a mile for a small sedan to roughly 98 cents for a half-ton crew-cab pickup, averaging 77 cents across all classes. Anything under 50 cents a mile is genuinely good and usually means you're driving a used vehicle you own outright. Above 90 cents a mile normally means an expensive vehicle, a heavy loan, or low annual mileage spreading fixed costs across too few miles.",
    ],
    [
      "Does cost per mile include depreciation?",
      "It has to, or the number is meaningless. Depreciation is the difference between what you paid for the vehicle and what you can sell it for, and on a new car it is typically the single largest cost of ownership — larger than fuel, insurance and maintenance combined. You never receive an invoice for it, which is exactly why so many people leave it out and conclude their car is cheaper than it is.",
    ],
    [
      "Why does driving more miles lower my cost per mile?",
      "Because a large share of vehicle costs are fixed. Depreciation, insurance, registration and loan interest accrue whether you drive 5,000 miles or 25,000. Spreading that fixed block across more miles reduces the per-mile figure, even though your total annual spend goes up. It's the same reason a rarely-used vehicle can be surprisingly expensive per mile despite a low fuel bill.",
    ],
    [
      "How does the IRS mileage rate compare?",
      "The IRS standard mileage rate is designed to approximate the average cost of operating a vehicle for business, blending fuel, maintenance, insurance, registration and depreciation into one deductible figure. It's a reasonable ballpark for an average car driven average miles, but it isn't your number — a paid-off economy car will be well below it, and a new truck driven modest miles will be well above it.",
    ],
    [
      "Is an electric car cheaper per mile than gasoline?",
      "On energy alone, comfortably yes: home charging typically runs about 5 to 6 cents a mile against 13 to 14 cents for gasoline. On total cost per mile the gap narrows a lot, because many EVs cost more to buy, depreciate faster, and cost more to insure. The honest answer is that it depends on the specific pair of vehicles, your electricity rate and how long you keep it — which is what this calculator is for.",
    ],
    [
      "Should I include the whole car payment in the calculation?",
      "No. Only the interest portion is a true cost. The principal portion of your payment is buying equity in an asset you'll later sell, and that value comes back to you as resale — which the calculator already accounts for through depreciation. Counting the full payment and the depreciation would charge you twice for the same car.",
    ],
    [
      "How do I lower my cost per mile the fastest?",
      "Buy a vehicle that has already depreciated. A three-year-old car has typically shed around 40 percent of its value, and that loss was somebody else's. No fuel-saving technique, insurance discount or maintenance strategy comes remotely close to that in impact — it's usually worth more than all of them combined. Keeping the car longer is the close second: depreciation slows sharply after year five while the vehicle keeps doing the same job.",
    ],
    [
      "Does this include tires and unexpected repairs?",
      "Yes, through the maintenance and repairs field — which is why it defaults to a figure that covers far more than oil changes. That field asks for the <em>first</em> year and the model then escalates it 12% annually, because an eight-year-old car does not cost what a new one costs to keep on the road. The $1,250 default compounds to $7,941 across five years, an average of $1,588 a year, which is intended to cover routine service, a share of a tire set, brakes and one repair you didn't plan for. AAA's 2025 figure for maintenance, repair and tires is 11.04 cents a mile, or $1,656 a year at their mileage — close enough to confirm the shape.",
    ],
  ],
};
