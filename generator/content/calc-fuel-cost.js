const C = require("../calcpage");
const { num, rng, seg, group, advanced, hero, tiles, chartCard, callout, bullets, table } = C;

/* ------------------------------------------------------------------ HTML -- */

const inputs = [
  group(
    "Your driving",
    [
      rng("miles", "Annual miles", 12000, { min: 1000, max: 45000, step: 500, initial: "12,000 mi/yr" }),
      num("gasPrice", "Gas price", 4.0, { prefix: "$", suffix: "/gal", min: 1, max: 12, step: 0.05 }),
      num("mpg", "Your combined MPG", 26, {
        min: 5,
        max: 150,
        step: 0.5,
        help: "Use the real number from your trip computer if you have it — the EPA figure is usually 8–15% optimistic.",
      }),
    ].join("\n              ")
  ),
  group(
    "Compare with another vehicle",
    [
      num("mpgB", "Their combined MPG", 38, {
        min: 5,
        max: 150,
        step: 0.5,
        help: "A hybrid, a smaller car, or the vehicle you're thinking of switching to.",
      }),
      rng("years", "Compare over", 5, { min: 1, max: 12, step: 1, initial: "5 years" }),
    ].join("\n              "),
    "var(--c-insure)"
  ),
  advanced(
    [
      /* The explanation belongs inside the field rather than floating beside it
         as a sibling paragraph — same class, same appearance, but now it sits
         with the control it describes. */
      seg("split", "Driving mix", [["mixed", "Mixed"], ["city", "Mostly city"], ["hwy", "Mostly highway"]], "mixed", {
        help: "City driving typically returns about 12% below the combined figure; highway about 10% above. This adjusts your MPG accordingly.",
      }),
      rng("inflation", "Assumed fuel price growth", 0, {
        min: -5,
        max: 10,
        step: 0.5,
        initial: "0%/yr (flat)",
        help: "Multi-year totals compound at this rate. Leave at zero for today's price held flat.",
      }),
      num("premium", "Premium fuel surcharge", 0, {
        prefix: "$",
        suffix: "/gal",
        min: 0,
        max: 3,
        step: 0.05,
        help: "Set to about $0.60 if your vehicle requires premium. If it only recommends it, regular is usually fine.",
      }),
    ].join("\n                  ")
  ),
].join("\n            ");

const results = [
  hero(
    "Fuel Cost summary",
    'Your fuel bill · <span data-out="yearsLabel">5 years</span>',
    "totalA",
    "money",
    'That\'s <strong class="num" data-out="annualA" data-fmt="money">—</strong> a year, <strong class="num" data-out="monthlyA" data-fmt="money">—</strong> a month, and <strong class="num" data-out="perMileA" data-fmt="cents">—</strong> for every mile you drive.'
  ),
  tiles([
    ["Gallons per year", "gallonsA", "num", "At your adjusted MPG"],
    ["Cost per mile", "perMileA", "cents", "Fuel only — nothing else"],
    ["Fill-ups per year", "fillsA", "num", 'About one every <span data-out="fillDays" data-fmt="num">—</span> days'],
  ]),
  chartCard(
    "You versus the comparison vehicle",
    "Fuel cost over the period, at the same annual mileage",
    `<div class="breakdown" id="compare"></div>
          <div class="callout" style="margin-top:20px">
            <div class="callout-title"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg><span data-out="verdictTitle">The difference</span></div>
            <span data-out="verdict">—</span>
          </div>`
  ),
  chartCard(
    "The MPG illusion",
    "Annual fuel cost across the whole MPG range, at your mileage and pump price",
    `<div id="mpg-chart"></div>
          <p class="text-muted" style="font-size:.85rem;margin-top:14px">The curve is steep at the left and nearly flat at the right. Going from 15 to 20 MPG saves far more fuel than going from 40 to 50 — which is why MPG is a misleading way to compare vehicles, and gallons per 100 miles is a better one.</p>`
  ),
  callout(
    "Gallons per 100 miles, not miles per gallon",
    'Your vehicle burns <strong class="num" data-out="gp100A" data-fmt="x2">—</strong> gallons every 100 miles; the comparison vehicle burns <strong class="num" data-out="gp100B" data-fmt="x2">—</strong>. That framing is linear, so the difference between two numbers is the actual fuel you save. MPG is a ratio with distance on top, which is exactly why it distorts comparisons.'
  ),
].join("\n\n        ");

const floatBar = `<div class="float-summary no-print" id="floatSummary" aria-hidden="true">
  <div class="fs-item"><span class="k">Fuel per year</span><span class="v num" data-out="annualA" data-fmt="money">—</span></div>
  <div class="fs-sep"></div>
  <div class="fs-item fs-hide-sm"><span class="k">Per mile</span><span class="v num" data-out="perMileA" data-fmt="cents">—</span></div>
  <button type="button" class="btn btn-primary btn-sm" data-scroll="calc">Edit</button>
</div>`;

/* ------------------------------------------------------------------ prose -- */

const prose = `
    <h2 id="how-it-works">How fuel cost is calculated</h2>
    <p>The arithmetic is the easiest on this entire site: divide your annual miles by your miles per gallon to get gallons, then multiply by the price at the pump. Twelve thousand miles at 26 MPG is about 462 gallons; at $4.00 a gallon that's roughly $1,847 a year, or $154 a month.</p>
    <p>What trips people up isn't the formula — it's the inputs. Two of the three are usually wrong when people estimate this in their head.</p>
    ${bullets([
      "<strong>The MPG number is optimistic.</strong> EPA combined ratings are produced under controlled conditions. Real-world results typically land 8–15% lower, and worse in cold weather, in heavy traffic, with a roof box, or with the tires a few PSI down. If your trip computer shows a lifetime average, use that figure instead — it's the truth.",
      "<strong>The mileage number is a guess.</strong> Most people underestimate their annual driving by a few thousand miles. Check two service records a year apart and divide; it takes thirty seconds and it's the only honest way to get this.",
      "<strong>The price won't hold.</strong> National average gasoline has swung between roughly $2.20 and $5.00 a gallon in the last several years. Any multi-year total is a projection, not a forecast — which is why the advanced panel lets you apply a growth rate and see how sensitive the answer is.",
    ])}

    <h2 id="mpg-illusion">Why MPG is a misleading number</h2>
    <p>This is the most useful thing on this page, and it surprises nearly everyone. Miles per gallon is a ratio with distance in the numerator, which makes the relationship between MPG and fuel consumed <em>non-linear</em>. The consequence is that equal-sized MPG improvements do wildly unequal things to your fuel bill.</p>
    <p>Consider four vehicles driven 12,000 miles a year at $4.00 a gallon:</p>
    ${table(
      ["MPG", "Gallons / year", "Annual fuel cost", "Saved by the next step up"],
      [
        ["15 MPG", "800", "$3,200", "—"],
        ["20 MPG", "600", "$2,400", "$800"],
        ["30 MPG", "400", "$1,600", "$800"],
        ["50 MPG", "240", "$960", "$640"],
      ],
      [1, 2, 3]
    )}
    <p>Improving from 15 to 20 MPG — a gain of five — saves exactly as much fuel as improving from 20 to 30, which is a gain of ten. And getting from 30 all the way to 50, a twenty-MPG leap that requires a completely different class of vehicle, saves <em>less</em> than either. Researchers at Duke University named this the "MPG illusion" and demonstrated that people systematically make the wrong trade because of it.</p>
    ${callout(
      "The practical rule",
      "If your household has two vehicles and you can only replace one, replace the thirsty one. Swapping a 16-MPG SUV for a 22-MPG SUV saves more fuel than swapping a 32-MPG sedan for a 50-MPG hybrid — even though the second change sounds far more dramatic. Think in gallons per 100 miles and the maths becomes obvious."
    )}

    <h2 id="cut">What actually reduces the fuel bill</h2>
    <p>Ranked by how much they move the number, from most to least:</p>
    ${bullets([
      "<strong>Drive fewer miles.</strong> Obvious, unglamorous, and by far the most effective. Combining errands into one trip also avoids repeated cold starts, which are disproportionately thirsty.",
      "<strong>Slow down on the highway.</strong> Aerodynamic drag rises with the square of speed. Most vehicles lose 12–20% of their efficiency going from 65 to 80 mph, and you arrive perhaps six minutes earlier on a hundred-mile drive.",
      "<strong>Keep the tires properly inflated.</strong> Underinflation by 8 PSI costs roughly 2–3% in fuel economy and wears the tires out faster. It's free and takes five minutes a month.",
      "<strong>Take the roof rack off when you're not using it.</strong> An empty crossbar set costs 2–8% on the highway; a loaded roof box can cost 15–25%. This is one of the largest easy wins and almost nobody does it.",
      "<strong>Ease off the accelerator and anticipate stops.</strong> Aggressive acceleration and hard braking can cost 10–30% in city driving. Not hypermiling — just looking further ahead.",
      "<strong>Don't buy premium unless the manual requires it.</strong> If it says &ldquo;premium recommended&rdquo;, regular is fine and costs about $0.60 less per gallon. &ldquo;Required&rdquo; means required.",
      "<strong>Skip the fuel-saving gadgets.</strong> Magnets, vortex generators, fuel-line additives and chips have failed every controlled test the EPA has ever run on them. There is no exception to this.",
    ])}

    <h2 id="context">How fuel fits into total ownership cost</h2>
    <p>Here is the part that reframes everything above: for most drivers, <strong>fuel is not the big cost</strong>. At 12,000 miles a year in an average vehicle, fuel runs around $1,600–2,000 annually. Depreciation on a new vehicle over the same year is typically $3,500–5,000. Insurance is around $2,500. Fuel is usually the third or fourth largest line, not the first.</p>
    <p>This matters because attention is finite. Drivers who spend real effort chasing ten cents a gallon while carrying an 84-month loan on a rapidly depreciating truck are optimizing the smallest lever available to them. Getting the fuel line right is worth doing — but do it after you've looked at the whole picture, which is what the <a href="/calculators/true-cost-to-own/">True Cost to Own calculator</a> exists for.</p>
`;

/* -------------------------------------------------------------------- JS -- */

const js = `/* Fuel Cost — MyDrivingCost.com */
(function () {
  "use strict";
  var MDC = window.MDC, F = MDC.fmt;

  var ADJ = { mixed: 1, city: 0.88, hwy: 1.10 };

  function totalOver(annual, years, growth) {
    if (!growth) return annual * years;
    var t = 0, g = 1 + growth / 100;
    for (var y = 0; y < years; y++) t += annual * Math.pow(g, y);
    return t;
  }

  MDC.calc({
    form: "fuel-form",
    defaults: {
      miles: 12000, gasPrice: 4.00, mpg: 26, mpgB: 38, years: 5,
      split: "mixed", inflation: 0, premium: 0
    },
    compute: function (i) {
      var adj = ADJ[i.split] || 1;
      var price = i.gasPrice + i.premium;
      var mpgA = Math.max(1, i.mpg * adj), mpgB = Math.max(1, i.mpgB * adj);
      var galA = i.miles / mpgA, galB = i.miles / mpgB;
      var annualA = galA * price, annualB = galB * price;
      var totalA = totalOver(annualA, i.years, i.inflation);
      var totalB = totalOver(annualB, i.years, i.inflation);
      var tank = 14; /* typical usable tank, gallons */
      return {
        annualA: annualA, annualB: annualB,
        monthlyA: annualA / 12,
        totalA: totalA, totalB: totalB,
        saved: totalA - totalB,
        gallonsA: galA, gallonsB: galB,
        perMileA: annualA / Math.max(1, i.miles),
        perMileB: annualB / Math.max(1, i.miles),
        gp100A: 100 / mpgA, gp100B: 100 / mpgB,
        fillsA: galA / tank,
        fillDays: 365 / Math.max(0.5, galA / tank),
        yearsLabel: i.years + (i.years === 1 ? " year" : " years"),
        mpgA: mpgA, mpgB: mpgB, price: price,
        _i: i
      };
    },
    onInput: function (i) {
      var set = function (k, v) {
        document.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) {
          if (el.closest(".field")) el.textContent = v;
        });
      };
      set("miles", F.num(i.miles) + " mi/yr");
      set("years", i.years + (i.years === 1 ? " year" : " years"));
      set("inflation", i.inflation === 0 ? "0%/yr (flat)" : (i.inflation > 0 ? "+" : "") + i.inflation.toFixed(1) + "%/yr");
    },
    render: function (res, i) {
      var maxV = Math.max(res.totalA, res.totalB, 1);
      var host = document.getElementById("compare");
      if (host) {
        host.innerHTML = [
          { n: "Your vehicle — " + res.mpgA.toFixed(1) + " MPG", v: res.totalA, css: "--c-fuel" },
          { n: "Comparison — " + res.mpgB.toFixed(1) + " MPG", v: res.totalB, css: "--c-insure" }
        ].map(function (r) {
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + r.css + ')"></span>' +
            '<span class="bd-name">' + r.n + '<small>' + F.money(r.v / i.years) + ' per year</small></span>' +
            '<span class="bd-bar"><i style="background:var(' + r.css + ');width:' + (r.v / maxV * 100).toFixed(1) + '%"></i></span>' +
            '<span class="bd-val num">' + F.money(r.v) + '</span>' +
            '</div>';
        }).join("");
      }

      var vt = document.querySelector('[data-out="verdictTitle"]');
      var vd = document.querySelector('[data-out="verdict"]');
      var diff = Math.abs(res.saved), yrs = i.years;
      if (vt && vd) {
        if (diff < 1) {
          vt.textContent = "Effectively identical";
          vd.innerHTML = "Both vehicles burn the same fuel at this mileage. Whatever separates them, it isn't the pump.";
        } else if (res.saved > 0) {
          vt.textContent = "The comparison vehicle is cheaper to fuel";
          vd.innerHTML = "It saves <strong>" + F.money(diff) + "</strong> over " + yrs + " " + (yrs === 1 ? "year" : "years") +
            " — about <strong>" + F.money(diff / yrs / 12) + " a month</strong>. Worth weighing against any difference in purchase price, insurance and depreciation before you switch: a $4,000 price gap takes " +
            (diff / yrs > 0 ? (4000 / (diff / yrs)).toFixed(1) : "—") + " years of fuel saving to repay.";
        } else {
          vt.textContent = "Your vehicle is cheaper to fuel";
          vd.innerHTML = "You spend <strong>" + F.money(diff) + "</strong> less over " + yrs + " " + (yrs === 1 ? "year" : "years") +
            " than the comparison vehicle would cost you — about <strong>" + F.money(diff / yrs / 12) + " a month</strong> in your favor.";
        }
      }

      var mc = document.getElementById("mpg-chart");
      if (mc) {
        var pts = [];
        for (var m = 12; m <= 60; m += 2) pts.push({ x: m, y: (i.miles / m) * res.price });
        MDC.charts.area(mc, pts, {
          cssVar: "--c-fuel",
          yFmt: function (v) { return "$" + Math.round(v / 100) / 10 + "k"; },
          xFmt: function (x) { return x + ""; },
          xLabelFmt: function (x) { return x + " MPG"; },
          aria: "Annual fuel cost falling steeply then flattening as MPG rises"
        });
      }
    }
  });
})();
`;

module.exports = {
  slug: "fuel-cost",
  jsName: "fuel",
  formId: "fuel-form",
  crumbName: "Fuel Cost",
  appName: "Fuel Cost Calculator",
  title: "Fuel Cost Calculator — 5-Year Gas Costs | MyDrivingCost",
  desc:
    "Work out what fuel really costs you per year, per month and per mile — and compare two vehicles side by side. Free, instant, every assumption editable.",
  ogTitle: "Fuel Cost Calculator — what gas actually costs you",
  ogDesc: "Annual, monthly and per-mile fuel costs, plus a side-by-side MPG comparison.",
  h1: "Fuel Cost Calculator",
  lead:
    "Put real numbers on the fuel line: what you spend a year, what a different vehicle would spend, and why a five-MPG improvement matters enormously on a thirsty vehicle and barely at all on an efficient one.",
  inputs,
  results,
  floatBar,
  prose,
  js,
  disclaimer:
    "Fuel estimates only. Real-world economy varies with driving style, weather, terrain, load and vehicle condition, and pump prices change constantly. Not financial advice.",
  sources: ["EIA_GAS", "AAA_GAS", "EPA_FE", "EPA_TEST"],
  sourceNotes: [
    "EPA combined MPG is a laboratory figure produced under standardised test cycles. Real-world economy commonly runs below it, and the gap widens in cold weather, on short trips and at sustained highway speeds above about 70 mph.",
  ],
  related: [
    ["/calculators/ev-charging/", "EV Charging Cost", "The same calculation for electricity — home, public Level 2 and DC fast charging."],
    ["/calculators/cost-per-mile/", "Cost Per Mile", "Fuel is one line. This one adds the other five."],
    ["/calculators/true-cost-to-own/", "True Cost to Own", "The full five-year picture, with fuel in its proper proportion."],
    ["/fuel-and-ev/", "Fuel & EV guide", "Gasoline, hybrid and electric priced on the same scale."],
  ],
  faq: [
    [
      "How do I calculate my fuel cost per year?",
      "Divide your annual miles by your vehicle's real combined MPG to get gallons, then multiply by the price per gallon. Twelve thousand miles at 26 MPG is about 462 gallons, which at $4.00 a gallon comes to roughly $1,847 a year. Use your trip computer's lifetime average rather than the EPA rating if you can — it's usually several MPG lower and it's the honest number.",
    ],
    [
      "Why is my real MPG lower than the window sticker?",
      "EPA figures come from standardized laboratory cycles that don't include cold starts in winter, stop-and-go traffic, roof racks, heavy loads, aggressive acceleration or highway speeds above 70 mph. Most drivers land 8 to 15 percent below the combined rating, and short-trip city drivers in cold climates can be 25 percent below it. It isn't a defect in the car; the test simply doesn't look like your commute.",
    ],
    [
      "Is premium gas worth it?",
      "Only if your owner's manual says premium is required, in which case use it — the engine's knock-control strategy assumes that octane and running lower can cost power and, over time, cause damage. If the manual says premium is merely recommended, regular is fine for ordinary driving, and you'll save roughly $0.60 a gallon or around $250 a year. Premium contains no more energy than regular; the only difference is knock resistance.",
    ],
    [
      "How much does driving 80 mph instead of 65 cost me?",
      "Aerodynamic drag increases with the square of speed, so most vehicles lose somewhere between 12 and 20 percent of their fuel economy over that jump. On a 300-mile trip at $4.00 a gallon in a 30-MPG car, that's about $5 to $8 in extra fuel to save around 25 minutes. Whether that's worth it is your call, but it's rarely the free choice people assume.",
    ],
    [
      "Do fuel-saving devices work?",
      "No. The EPA has tested well over a hundred aftermarket fuel-saving devices — magnets, vapor injectors, fuel-line ionisers, air-intake vortex generators, additives and plug-in chips — and none has produced a meaningful, reproducible improvement. Correct tire pressure, a removed roof box and a lighter right foot outperform every gadget on the market, and they're free.",
    ],
    [
      "Should I choose a vehicle based on MPG?",
      "It should be one factor, not the deciding one. Fuel is typically the third or fourth largest ownership cost, well behind depreciation and often behind insurance. A hybrid that saves $700 a year in fuel but costs $5,000 more to buy and depreciates faster may not come out ahead over five years. Run the total cost, not the fuel line in isolation.",
    ],
    [
      "How far ahead can I trust a five-year fuel projection?",
      "Treat it as a planning figure, not a forecast. National average gasoline has moved between roughly $2.20 and $5.00 a gallon within the last several years, and nobody predicted the swings. The projection is most useful for comparing two vehicles — that comparison stays valid at almost any price, because both vehicles move together.",
    ],
  ],
};
