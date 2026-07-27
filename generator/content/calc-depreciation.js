const C = require("../calcpage");
const { num, rng, seg, group, advanced, hero, tiles, chartCard, callout, bullets, table, } = C;

/* ------------------------------------------------------------------ HTML -- */

const inputs = [
  group(
    "The vehicle",
    [
      num("price", "Price paid today", 34000, { prefix: "$", min: 1000, step: 500 }),
      seg(
        "age",
        "Buying it",
        [["0", "Brand new"], ["1", "1 yr old"], ["3", "3 yrs old"], ["5", "5 yrs old"]],
        "0",
        {
          help: "Where you climb onto the curve. A used car skips the first-year cliff entirely, and an older one also depreciates more slowly in percentage terms &mdash; so this changes the shape of your curve, not just its starting point.",
        }
      ),
      rng("years", "Years you'll keep it", 5, { min: 1, max: 15, step: 1, initial: "5 years" }),
      rng("miles", "Annual miles", 12000, {
        min: 2000,
        max: 40000,
        step: 500,
        initial: "12,000 mi/yr",
        help: "Mileage matters: every 5,000 miles a year above average costs you real resale value.",
      }),
    ].join("\n              ")
  ),
  group(
    "How fast it loses value",
    [
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
      rng("dep1", "First-year drop", 20, {
        min: 5,
        max: 40,
        step: 1,
        initial: "20%",
        help: "The steepest year by far. New vehicles typically lose 18–24% in the first twelve months.",
      }),
      rng("depN", "Each following year", 15, {
        min: 3,
        max: 30,
        step: 1,
        initial: "15%",
        help: "The rate through the vehicle&rsquo;s plateau years, applied to the remaining value. From about its seventh birthday the model tapers this rate down, reaching roughly 40% of it once the vehicle is past twelve &mdash; matching what BLS transaction data shows old cars actually do.",
      }),
    ].join("\n              "),
    "var(--c-deprec)"
  ),
  advanced(
    [
      `<p class="field-help">Depreciation is the largest cost of owning most vehicles, but it isn't the only one. Add the rest to see what a year of ownership really costs.</p>`,
      num("running", "Other running costs", 4400, {
        prefix: "$",
        suffix: "/yr",
        min: 0,
        step: 100,
        help: "Insurance, fuel, maintenance, registration — everything except the value you're losing.",
      }),
      num("mileageAdj", "Mileage penalty", 0.06, {
        prefix: "$",
        suffix: "/mi over 12k",
        min: 0,
        max: 0.4,
        step: 0.01,
        help: "Value knocked off resale for each mile beyond 12,000 a year. Set to 0 to ignore it.",
      }),
    ].join("\n                  ")
  ),
].join("\n            ");

const results = [
  hero(
    "Depreciation summary",
    'Value lost over <span data-out="yearsLabel">5 years</span>',
    "lost",
    "money",
    'Your vehicle falls from <strong class="num" data-out="price" data-fmt="money">—</strong> to about <strong class="num" data-out="endValue" data-fmt="money">—</strong>. That is <strong class="num" data-out="lostPct" data-fmt="pct">—</strong> of what you paid, gone without a single invoice.'
  ),
  tiles([
    ["Value remaining", "endValue", "money", 'About <span class="num" data-out="retainPct" data-fmt="pct">—</span> of what you paid'],
    ["Average per year", "perYear", "money", "Straight-line average across the period"],
    ["Depreciation per mile", "perMile", "perMile", 'Across <span class="num" data-out="totalMiles" data-fmt="num">—</span> miles'],
  ]),
  chartCard(
    "The value curve",
    "What your vehicle is worth at the end of each year",
    `<div id="curve-chart"></div>
          <p class="text-muted" style="font-size:.85rem;margin-top:14px">The curve is steepest at the left. Depreciation is a percentage of remaining value, so the dollar loss shrinks every year even when the rate stays the same — which is exactly why the cheapest years of ownership are the later ones.</p>`
  ),
  chartCard(
    "Year by year",
    "Value at each anniversary, what that year cost you, and how much is left",
    `<div id="dep-table"></div>`
  ),
  callout(
    "The first year is the expensive one",
    `In year one this vehicle loses <strong class="num" data-out="year1" data-fmt="money">—</strong>. By the final year of your ownership period the annual loss has fallen to about <strong class="num" data-out="yearLast" data-fmt="money">—</strong> — roughly <strong class="num" data-out="lastVsFirst" data-fmt="pct">—</strong> of the first-year hit. Every year you hold on, the car gets cheaper to own.`
  ),
  chartCard(
    "What depreciation costs you per month",
    "Compared with the rest of what you spend on the vehicle",
    `<div class="donut-wrap">
            <div id="donut"></div>
            <div class="breakdown" id="breakdown"></div>
          </div>`
  ),
].join("\n\n        ");

const floatBar = `<div class="float-summary no-print" id="floatSummary" aria-hidden="true">
  <div class="fs-item"><span class="k">Value lost</span><span class="v num" data-out="lost" data-fmt="money">—</span></div>
  <div class="fs-sep"></div>
  <div class="fs-item fs-hide-sm"><span class="k">Worth at the end</span><span class="v num" data-out="endValue" data-fmt="money">—</span></div>
  <button type="button" class="btn btn-primary btn-sm" data-scroll="calc">Edit</button>
</div>`;

/* ------------------------------------------------------------------ prose -- */

const prose = `
    <h2 id="how-it-works">Depreciation is the bill nobody sends you</h2>
    <p>Every other cost of running a car announces itself. Insurance takes a payment, the pump takes a card, the shop hands you an invoice. Depreciation does none of that. It removes money quietly, month after month, and you only find out how much when you try to sell — which is precisely why it is both the largest cost of new-vehicle ownership and the one drivers routinely forget to count.</p>
    <p>The scale is hard to overstate. For a typical new vehicle kept five years, depreciation accounts for <strong>roughly 40 to 50 percent of everything the car costs you</strong>, more than fuel, insurance and maintenance combined. AAA's annual cost study finds the same thing across every category it measures, including electric vehicles, where cheap fuel does not come close to offsetting the value curve.</p>
    <p>The useful thing about depreciation is that it is largely predictable. Vehicles do not lose value randomly; they follow a curve whose shape is remarkably consistent across the market. Once you can see that curve, you can decide where on it you want to buy and where you want to sell — and that single decision moves your cost of ownership more than every other lever available to you.</p>

    <h2 id="curve">The shape of the curve</h2>
    <p>Depreciation is proportional, not linear. Each year the vehicle loses a percentage of what it is currently worth, so the dollar loss gets smaller as the value gets smaller. A car losing 15% a year loses far more dollars in year two than in year eight, even though the rate never changed.</p>
    <p>That distinction matters more than it sounds, because it means there are two different numbers people call &ldquo;the depreciation rate&rdquo; and they are not remotely the same. One is the share of the <em>original</em> price lost in a given year, which shrinks every year by arithmetic alone. The other is the rate applied to the vehicle&rsquo;s <em>current</em> value, which is the number that actually describes the market. Most consumer articles quietly swap the two, which is why so many of them claim depreciation slows down steadily after year one. It does not.</p>
    <p>Here is the pattern most mainstream vehicles follow &mdash; the same curve the calculator above runs, at its default settings:</p>
    ${table(
      ["Age", "Typical value retained", "Lost so far", "Rate applied that year"],
      [
        ["New", "100%", "&mdash;", "&mdash;"],
        ["1 year", "80%", "20%", "20% &mdash; the steepest single year"],
        ["2 years", "68%", "32%", "15%"],
        ["3 years", "58%", "42%", "15%"],
        ["4 years", "49%", "51%", "15%"],
        ["5 years", "42%", "58%", "15%"],
        ["8 years", "27%", "73%", "12%"],
        ["10 years", "22%", "78%", "9%"],
      ],
      [1, 2, 3],
      "Share of a mainstream vehicle's original price still retained at each age, alongside the depreciation rate applied to its remaining value in that year. Retention falls from 100% when new to about 22% at ten years old."
    )}
    <p>Read that table as a map of where the money goes. The first twelve months cost about as much as years six through ten combined. This is the entire argument for buying used and the entire argument against trading in every three years, and it is visible in the numbers before anyone starts arguing about brands.</p>
    <p>Notice what the right-hand column does after year one: almost nothing. The rate drops off a cliff once, then sits on a plateau for the better part of a decade before it genuinely begins to taper. The best public evidence for this is the US Bureau of Labor Statistics&rsquo; year-by-year series, published in the <a href="https://www.bls.gov/opub/mlr/2024/article/a-consumption-measure-for-automobiles.htm" rel="noopener" target="_blank">Monthly Labor Review<span class="sr-only"> (opens in a new tab)</span></a> in January 2024 &mdash; the only place we know of that publishes an annual depreciation rate for every vehicle age rather than a cumulative retention figure. After an opening drop of roughly 24%, the annual rates it reports run near 11%, 11%, 14%, 14%, 13% and 11% through the years that follow, stay close to 9% into the eighth and ninth years, and only fall to around 5% towards the eleventh. Several of the middle years lose value <em>faster</em> than the year that follows the initial drop. That is not what the folk wisdom predicts, and it is why the calculator above holds your rate flat through the plateau and tapers it only from about the seventh birthday.</p>
    <p>One honest caveat about the five-year figure specifically: published estimates disagree, and by a lot. BLS transaction data implies about 45% retained at five years and <a href="https://www.kbb.com/car-depreciation/" rel="noopener" target="_blank">Kelley Blue Book<span class="sr-only"> (opens in a new tab)</span></a> publishes the same 45%, but iSeeCars&rsquo; used-listing analysis has recently put it closer to 58% and Carfax higher still. The gap is methodological &mdash; wholesale auction prices, retail asking prices and actual transaction prices are three different things &mdash; not a dispute about the shape of the curve. We model the conservative end of that range on the view that a cost calculator should not flatter your resale value. The spread between individual models is larger still than the spread between studies, so treat any five-year number, ours included, as the middle of a wide band.</p>

    <h2 id="sweet-spot">The three-year-old sweet spot</h2>
    <p>If you overlay two facts — that a vehicle sheds roughly 40% of its value in three years, and that most vehicles run reliably well past a decade — you land on the most efficient purchase in the market: <strong>a two-to-four-year-old vehicle bought from the original owner's depreciation</strong>.</p>
    ${callout(
      "Why year three is the value peak",
      `<p style="margin:0 0 10px">A three-year-old vehicle has already lost about 40% of its price to somebody else, yet it typically has 70–80% of its useful life ahead of it, often some factory warranty remaining, and a maintenance record you can actually inspect. You are buying the cheap part of the curve and skipping the expensive part.</p><p style="margin:0">The trade-off is real but modest: no new-car warranty on everything, no choice of exact specification, and the first set of wear items may be due. For most buyers that is a small price for tens of thousands of dollars of avoided depreciation.</p>`
    )}
    <p>The mirror image of that argument is when to sell. The worst moment to sell is early, when you are still on the steep part of the curve and the loss per year is largest. The best value usually comes from <em>holding well past the loan payoff</em>, when annual depreciation has fallen to a few percent and there is no payment at all — the cheapest driving most people ever do.</p>

    <h2 id="segments">Not every vehicle depreciates the same</h2>
    <p>Segment matters enormously. Vehicles with constrained supply, strong reputations for longevity, and demand that outlives the warranty hold value far better than vehicles bought largely on newness.</p>
    ${table(
      ["Category", "Typical 5-year value retained", "Why"],
      [
        ["Full-size pickups", "55–65%", "Work demand, long service life, strong used market"],
        ["Body-on-frame SUVs", "50–60%", "Same durability reputation, limited supply"],
        ["Compact/mid SUVs", "45–55%", "The volume segment — steady demand, steady supply"],
        ["Mainstream sedans", "40–50%", "Reliable but abundant; hybrids do better"],
        ["Electric vehicles", "30–45%", "Fast-moving technology, incentives on new units, battery uncertainty"],
        ["Luxury sedans", "30–40%", "High price, high repair cost, buyers who want the newest one"],
        ["Exotic/limited production", "70–100%+", "Scarcity can outrun depreciation entirely"],
      ],
      [1]
    )}
    <p>Two entries deserve a note. <strong>Electric vehicles</strong> depreciate faster than their fuel savings suggest, partly because new-EV incentives compress used prices and partly because a four-year-old EV competes with a new one that charges faster and goes further. That gap has been narrowing as the technology matures, but it is still real and it belongs in any EV cost comparison. And <strong>luxury vehicles</strong> depreciate hardest of all mainstream categories — which is exactly why a three-year-old luxury sedan is such a well-known bargain, and why the running costs of one are the trap that comes with it.</p>

    <h2 id="lose-less">How to lose less</h2>
    ${bullets([
      "<strong>Buy at two to four years old.</strong> The single largest lever available. Everything else on this list is a rounding error next to it.",
      "<strong>Keep it longer than you plan to.</strong> Depreciation per year falls every year you hold. Years seven through twelve, with no payment, are where ownership finally gets cheap.",
      "<strong>Choose the segment before the trim.</strong> The gap between a pickup and a luxury sedan over five years can exceed $15,000 on the same purchase price — larger than any option package you'll ever debate.",
      "<strong>Watch the odometer.</strong> Mileage well above 12,000–15,000 a year visibly reduces resale. If you drive a lot, buy a vehicle whose value is already low enough that it barely matters.",
      "<strong>Keep the records.</strong> A complete service history is worth real money at sale time, and it costs nothing to file receipts.",
      "<strong>Pick common colors and specifications.</strong> The used market pays for what it recognizes. Unusual choices narrow your buyer pool at exactly the moment you want it wide.",
      "<strong>Sell privately if you can face it.</strong> The spread between trade-in and private-party value is commonly 10–20% of the vehicle's worth — often several thousand dollars for a weekend of effort.",
      "<strong>Avoid rolling negative equity forward.</strong> Financing the shortfall on your last car into your next one guarantees you start the curve already underwater.",
    ])}

    <h2 id="mistakes">Common mistakes</h2>
    ${callout(
      "Treating depreciation as “not a real cost”",
      "It is the most real cost you have. If you buy at $34,000 and sell at $15,300, that $18,700 left your net worth just as completely as if you had paid it out monthly — which, in effect, you did. Any comparison of two vehicles that skips depreciation will reliably pick the wrong one.",
      "warn"
    )}
    ${bullets([
      "<strong>Using a single flat percentage for every year.</strong> A flat 15% understates year one badly and overstates year eight badly. The curve is front-loaded and any honest model has to be too.",
      "<strong>Confusing trade-in value with market value.</strong> A dealer's trade-in offer is wholesale. Private-party value is normally 10–20% higher, and the difference is the dealer's margin, not an opinion about your car.",
      "<strong>Assuming a low-mileage vehicle is automatically worth more.</strong> Very low mileage on an older car raises questions about dry-rotted seals and long storage. Buyers pay for a healthy, well-used vehicle, not a preserved one.",
      "<strong>Forgetting that options rarely come back.</strong> A $3,500 package might add $800 to resale five years later. Buy features because you want to use them, not as an investment.",
      "<strong>Ignoring the market cycle.</strong> Used values rose sharply in the early 2020s supply crunch and normalized afterwards. Depreciation models describe typical conditions, not any particular month.",
    ])}

    <h2 id="reading">How to read this calculator's output</h2>
    <p>The value curve above is a model, not an appraisal. If you are buying new it applies your first-year rate once, then your subsequent rate to whatever the vehicle is worth at the start of each year after that. From roughly the seventh birthday it tapers that rate down &mdash; to about 92% of it in year seven, 60% by year ten and 40% once the vehicle is past twelve &mdash; following the BLS series described above. Buying used simply starts you further along the same curve, which is why a three-year-old car retains a larger <em>share</em> of what you paid than a new one does. Finally it adjusts the end value for mileage above 12,000 a year if you have left the mileage penalty switched on. That structure matches how the market actually behaves, but no model can know that your particular color, trim and region are running two points above or below the average.</p>
    <p>Use it as a planning instrument. The differences it shows between five and ten years of ownership, between a truck and a luxury sedan, and between buying new and buying at three years old are large, robust and worth acting on. The exact dollar figure at year four is an estimate — check it against real listings for your specific vehicle before you make a decision that depends on it.</p>
`;

/* -------------------------------------------------------------------- JS -- */

const js = `/* Depreciation Calculator — MyDrivingCost.com */
(function () {
  "use strict";
  var MDC = window.MDC, F = MDC.fmt;

  /* Typical first-year and later-year depreciation by segment, and how much of
     the curve has already been traveled when you buy at a given age. */
  var SEG = {
    truck: { d1: 16, dn: 11 },
    suv:   { d1: 20, dn: 15 },
    sedan: { d1: 21, dn: 16 },
    lux:   { d1: 25, dn: 18 },
    ev:    { d1: 26, dn: 17 }
  };

  /* How the annual rate changes with the vehicle's own age. Indexed by the age
     of the vehicle at the START of each year, so index 0 is a brand-new car's
     first year — the one that uses the first-year rate directly.

     This table exists because without it the model was mathematically unable to
     answer the question the "Buying it" control asks. Applying one fixed rate to
     the remaining value each year is scale- and shift-invariant: 15% a year for
     five years retains 44.4% whether you join the curve at year two or year
     twelve. So every used option produced the identical percentage, and the
     page's own text — "the curve is front-loaded and any honest model has to be
     too" — described behavior the code did not have.

     The shape comes from the BLS Monthly Labor Review's year-by-year series
     (January 2024, Chart 1), the only published set of annual geometric
     depreciation rates: 23.9% in year one, then 11.3 / 10.8 / 14.0 / 13.7 /
     13.1 / 11.4 / 8.7 / 9.9 / 6.9 / 4.9 through year eleven. The headline that
     almost every consumer article gets wrong is that the rate does not decline
     smoothly. It falls off a cliff exactly once, after year one, then sits on an
     11–14% plateau all the way through year eight — briefly rising again in
     years four to six — and only genuinely tapers from year nine.

     These factors are that series smoothed monotonically and normalized on
     mean(years 2–5) = 12.45%, so whatever rate the visitor enters is read as the
     plateau rate and the taper is applied relative to it. The smoothing is
     deliberately a shade pessimistic at the tail (year 11 lands at 0.48 against
     a raw 0.39): for a cost calculator, under-promising resale value is the safe
     direction to round.
     https://www.bls.gov/opub/mlr/2024/article/a-consumption-measure-for-automobiles.htm */
  var AGE_FACTOR = [1, 1, 1, 1, 1, 1, 0.92, 0.8, 0.72, 0.6, 0.48];
  var AGE_TAIL = 0.4;
  function ageFactor(a) { return a < AGE_FACTOR.length ? AGE_FACTOR[a] : AGE_TAIL; }

  /* startAge is the vehicle's age in years on the day it is bought, so a curve
     for a three-year-old car begins its first ownership year at index 3 and
     never touches the first-year rate at all. */
  function curve(price, d1, dn, years, startAge) {
    var out = [{ year: 0, value: price, rate: 0 }], ret = 1;
    for (var y = 1; y <= years; y++) {
      var vehicleAge = startAge + y - 1;
      var rate = vehicleAge === 0 ? d1 : dn * ageFactor(vehicleAge);
      ret = Math.max(0, ret * (1 - rate / 100));
      out.push({ year: y, value: price * ret, rate: rate });
    }
    return out;
  }

  MDC.calc({
    form: "dep-form",
    defaults: {
      price: 34000, age: "0", years: 5, miles: 12000,
      segment: "suv", dep1: 20, depN: 15,
      running: 4400, mileageAdj: 0.06
    },
    compute: function (i) {
      var startAge = parseInt(i.age, 10) || 0;
      var pts = curve(i.price, i.dep1, i.depN, i.years, startAge);

      var extraMiles = Math.max(0, i.miles - 12000) * i.years;
      var penalty = extraMiles * i.mileageAdj;

      var raw = pts[pts.length - 1].value;
      var endValue = Math.max(i.price * 0.03, raw - penalty);
      var lost = Math.max(0, i.price - endValue);
      var totalMiles = Math.max(1, i.miles * i.years);

      var year1 = pts[0].value - pts[1].value;
      var yearLast = pts[pts.length - 2].value - pts[pts.length - 1].value;

      return {
        price: i.price,
        lost: lost,
        endValue: endValue,
        lostPct: i.price > 0 ? lost / i.price * 100 : 0,
        retainPct: i.price > 0 ? endValue / i.price * 100 : 0,
        perYear: lost / Math.max(1, i.years),
        perMonth: lost / Math.max(1, i.years * 12),
        perMile: lost / totalMiles,
        totalMiles: totalMiles,
        year1: year1,
        yearLast: yearLast,
        lastVsFirst: year1 > 0 ? yearLast / year1 * 100 : 0,
        yearsLabel: i.years + (i.years === 1 ? " year" : " years"),
        startAge: startAge,
        pts: pts,
        penalty: penalty,
        _i: i
      };
    },
    onSeg: function (name, val, api) {
      /* Picking a segment loads its typical rates, then the user can override. */
      if (name === "segment" && SEG[val]) {
        api.setField("dep1", SEG[val].d1);
        api.setField("depN", SEG[val].dn);
      }
    },
    onInput: function (i) {
      var set = function (k, v) {
        document.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) {
          if (el.closest(".field")) el.textContent = v;
        });
      };
      set("years", i.years + (i.years === 1 ? " year" : " years"));
      set("miles", F.num(i.miles) + " mi/yr");
      set("dep1", i.dep1 + "%");
      set("depN", i.depN + "%");
    },
    count: [],
    render: function (res, i) {
      /* ---- value curve ------------------------------------------------- */
      var host = document.getElementById("curve-chart");
      if (host) {
        MDC.charts.area(host, res.pts.map(function (p) {
          return { x: p.year, y: p.value };
        }), {
          cssVar: "--c-deprec",
          yMax: i.price,
          yFmt: function (v) { return F.money(v); },
          /* Point zero is the day of purchase, which is only "New" when the
             visitor is actually buying new — labeling a five-year-old car's
             starting point "New" would misread the whole chart. */
          xFmt: function (x) { return x === 0 ? (res.startAge ? "Buy" : "New") : "Yr " + x; },
          xLabelFmt: function (x) {
            if (x > 0) return "End of your year " + x;
            return res.startAge
              ? "At purchase, " + res.startAge + (res.startAge === 1 ? " year old" : " years old")
              : "Day one, brand new";
          },
          aria: "Vehicle value falling year by year"
        });
      }

      /* ---- year-by-year table ------------------------------------------ */
      var t = document.getElementById("dep-table");
      if (t) {
        var rows = "";
        for (var y = 1; y < res.pts.length; y++) {
          var prev = res.pts[y - 1].value, pt = res.pts[y], val = pt.value;
          var drop = prev - val;
          var retained = i.price > 0 ? val / i.price * 100 : 0;
          /* The vehicle's own age, not the ownership year — with the age taper
             in play, that is the number that explains the rate column. */
          var vAge = res.startAge + y;
          rows += '<tr><th scope="row">Your year ' + y +
            '<span class="tbl-sub">car is ' + vAge + (vAge === 1 ? " yr" : " yrs") + ' old</span></th>' +
            '<td class="num">' + (Math.round(pt.rate * 10) / 10) + '%</td>' +
            '<td class="num">' + F.money(drop) + '</td>' +
            '<td class="num">' + F.money(val) + '</td>' +
            '<td class="num">' + Math.round(retained) + '%</td>' +
            '<td class="num">' + F.money(i.price - val) + '</td></tr>';
        }
        t.innerHTML = '<div class="table-wrap"><table class="tbl">' +
          '<caption class="sr-only">Year-by-year value of a ' + F.money(i.price) +
          (res.startAge ? ', ' + res.startAge + '-year-old ' : ', brand-new ') +
          'vehicle over ' + res.yearsLabel +
          '. The rate is applied to what the vehicle is worth at the start of each year, ' +
          'and tapers as the vehicle ages.</caption>' +
          '<thead><tr><th scope="col">Ownership year</th><th scope="col" class="num">Rate</th>' +
          '<th scope="col" class="num">Lost that year</th><th scope="col" class="num">Worth after</th>' +
          '<th scope="col" class="num">Retained</th><th scope="col" class="num">Lost total</th></tr></thead>' +
          '<tbody>' + rows + '</tbody></table></div>' +
          (res.penalty > 1
            ? '<p class="text-muted" style="font-size:.85rem;margin-top:12px">A further <strong>' +
              F.money(res.penalty) + '</strong> is deducted from the final value for mileage above 12,000 a year.</p>'
            : '');
      }

      /* ---- depreciation vs everything else ----------------------------- */
      var depMonthly = res.perMonth;
      var otherMonthly = Math.max(0, i.running / 12);
      var segs = [
        { label: "Depreciation", value: depMonthly, cssVar: "--c-deprec" },
        { label: "Everything else", value: otherMonthly, cssVar: "--c-insure" }
      ];
      var totalMonthly = depMonthly + otherMonthly;

      var donut = document.getElementById("donut");
      if (donut) MDC.charts.donut(donut, segs, {
        centerLabel: "Per month",
        centerValue: F.money(totalMonthly),
        centerSub: "all-in cost",
        aria: "Depreciation compared with other running costs"
      });

      var bd = document.getElementById("breakdown");
      if (bd) {
        bd.innerHTML = segs.map(function (s) {
          var pct = totalMonthly > 0 ? s.value / totalMonthly * 100 : 0;
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + s.cssVar + ')"></span>' +
            '<span class="bd-name">' + s.label + '<small>' + F.money(s.value * 12) + ' / year</small></span>' +
            '<span class="bd-pct num">' + Math.round(pct) + '%</span>' +
            '<span class="bd-val num">' + F.money(s.value) + '/mo</span>' +
            '</div>';
        }).join("") +
        '<p class="text-muted" style="font-size:.84rem;margin-top:14px">Depreciation is ' +
        (depMonthly >= otherMonthly ? 'the largest single' : 'a major') +
        ' cost of owning this vehicle — and the only one that never appears on a statement.</p>';
      }
    }
  });
})();
`;

module.exports = {
  slug: "depreciation",
  jsName: "dep",
  formId: "dep-form",
  crumbName: "Depreciation",
  appName: "Car Depreciation Calculator",
  title: "Car Depreciation Calculator — Year by Year | MyDrivingCost",
  desc:
    "Model your vehicle's value year by year, see exactly how much you lose to depreciation, and find the point on the curve where ownership finally gets cheap.",
  ogTitle: "Car Depreciation Calculator — what your vehicle will be worth",
  ogDesc:
    "The largest cost of owning a car is the one nobody invoices you for. See the curve, year by year.",
  h1: "Car Depreciation Calculator",
  lead:
    "Depreciation is the biggest cost of owning most vehicles and the only one that never sends a bill. Enter what you paid and how long you'll keep it to see the value curve, what each year costs, and what you'll have left when you sell.",
  inputs,
  results,
  floatBar,
  prose,
  js,
  disclaimer:
    "Depreciation estimates model typical market behavior by segment. Actual resale value depends on condition, mileage, trim, color, region, service history and market conditions at the time of sale. Not financial advice.",
  sources: ["KBB_DEP", "BLS_MLR_DEP", "AAA_YDC"],
  sourceNotes: [
    "The curve used here &mdash; 20% in year one, then 15% of the remaining value each year after &mdash; is a deliberately simple approximation of published multi-year retention data. It tracks segment averages closely over five to ten years, and it will not capture a specific model&rsquo;s residual strength, a supply shock or a discontinued nameplate.",
  ],
  related: [
    ["/calculators/true-cost-to-own/", "True Cost to Own", "Depreciation plus the six other categories, laid out year by year."],
    ["/calculators/new-vs-used/", "New vs Used", "Put the depreciation curve to work: what buying at three years old actually saves."],
    ["/calculators/cost-per-mile/", "Cost Per Mile", "Reduce everything — value lost included — to one honest number."],
    ["/depreciation/", "Depreciation guide", "Segment-by-segment retention data and how the used market prices your car."],
  ],
  faq: [
    [
      "How much does a car depreciate in the first year?",
      "A typical new vehicle loses somewhere between 18 and 24 percent of its value in the first twelve months, and that figure is heavily segment-dependent. Full-size pickups often lose closer to 15 percent, mainstream SUVs around 20, and luxury sedans can shed 25 to 30 percent before the first service is due. It is the steepest single year of ownership by a wide margin — the first year alone commonly costs more than years six through ten combined.",
    ],
    [
      "What is the 5-year depreciation on a car?",
      "Across the market as a whole, a vehicle retains roughly 45 percent of its original price after five years, meaning about 55 percent has been lost. The spread around that average is very wide: pickups and body-on-frame SUVs frequently retain 55 to 65 percent, mainstream sedans 40 to 50 percent, and luxury sedans and many electric vehicles 30 to 40 percent. On a $40,000 purchase that spread is worth more than $10,000.",
    ],
    [
      "At what age is a car cheapest to own?",
      "Buying at two to four years old and holding into the vehicle's eighth to twelfth year is the cheapest ownership pattern for most drivers. You skip the steep front of the depreciation curve, you own the vehicle outright for much of the time, and by then annual depreciation has fallen to a few percent of a small number. The trade-off is rising maintenance costs, which is why the calculator lets you set your other running costs — past year eight those rise, but rarely fast enough to outweigh the depreciation you avoided.",
    ],
    [
      "Do electric cars depreciate faster than gas cars?",
      "Historically yes, and the gap has been meaningful. Electric vehicles have typically retained 30 to 45 percent after five years against 45 to 55 percent for comparable gasoline vehicles. The causes are structural rather than mysterious: incentives reduce the effective price of new units and drag used prices down with them, rapid improvements in range and charging speed make older models less competitive, and buyers price in uncertainty about battery life. That gap has been narrowing as the technology stabilizes, but it should still be in any EV total-cost comparison alongside the fuel savings.",
    ],
    [
      "Does mileage affect depreciation?",
      "Substantially. Value guides build their estimates around roughly 12,000 to 15,000 miles a year, and a vehicle materially above that band is marked down at sale. A reasonable rule of thumb is 5 to 8 cents of resale value for each mile beyond the average, which is why the calculator includes an adjustable mileage penalty. If you drive 25,000 miles a year, the practical implication is not to drive less — it is to buy a vehicle cheap enough that the extra depreciation is small in absolute terms.",
    ],
    [
      "Is depreciation really a cost if I never sell the car?",
      "Yes, though it lands differently. If you drive a vehicle until it is worthless, you have simply spread the entire purchase price across every mile you drove rather than recovering part of it at sale. That is often an excellent outcome — the cost per mile of a car driven to the end of its life is usually very low — but the money still left your net worth. Depreciation is deferred, not avoided.",
    ],
    [
      "How do I estimate what my car is worth right now?",
      "Check three sources and triangulate: a valuation guide such as Kelley Blue Book or Edmunds for a baseline, an instant-offer service for a realistic wholesale floor, and actual local listings for vehicles matching your year, trim and mileage for what the market is genuinely asking. Trade-in offers will sit at the bottom of that range and private-party sales at the top, with the spread commonly running 10 to 20 percent of the vehicle's value.",
    ],
    [
      "Does a warranty or service history change resale value?",
      "A transferable factory warranty adds real, visible value because it removes risk for the buyer, and it is one reason certified pre-owned vehicles command a premium. A complete service history matters less in dollar terms but matters a great deal in how quickly the vehicle sells and how much negotiating room the buyer feels they have. Neither will rescue a vehicle in a fast-depreciating segment, but both are free or nearly free to maintain.",
    ],
  ],
};
