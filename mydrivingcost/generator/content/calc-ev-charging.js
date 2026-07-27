const C = require("../calcpage");
const { num, rng, group, advanced, hero, tiles, chartCard, callout, bullets, table } = C;

/* ------------------------------------------------------------------ HTML -- */

const inputs = [
  group(
    "Your EV",
    [
      rng("miles", "Annual miles", 12000, { min: 1000, max: 45000, step: 500, initial: "12,000 mi/yr" }),
      num("kwh100", "Efficiency", 28, {
        suffix: "kWh/100mi",
        min: 15,
        max: 60,
        step: 0.5,
        help: "The EPA figure for your car. Sedans run 24–30; SUVs 30–38; electric trucks 45–55.",
      }),
      rng("loss", "Charging losses", 10, {
        min: 0,
        max: 25,
        step: 1,
        initial: "10%",
        help: "Energy that goes into heat and battery conditioning rather than the battery. You pay for it; the car never sees it.",
      }),
    ].join("\n              ")
  ),
  group(
    "Where you charge",
    [
      rng("pHome", "At home", 80, { min: 0, max: 100, step: 5, initial: "80% of charging" }),
      num("rHome", "Home rate", 0.175, { prefix: "$", suffix: "/kWh", min: 0.02, max: 1, step: 0.005 }),
      rng("pL2", "Public Level 2", 12, { min: 0, max: 100, step: 1, initial: "12% of charging" }),
      num("rL2", "Level 2 rate", 0.32, { prefix: "$", suffix: "/kWh", min: 0, max: 1.5, step: 0.01 }),
      rng("pDc", "DC fast charging", 8, { min: 0, max: 100, step: 1, initial: "8% of charging" }),
      num("rDc", "DC fast rate", 0.48, { prefix: "$", suffix: "/kWh", min: 0, max: 2, step: 0.01 }),
      `<p class="field-help">The three shares are normalized to 100%, so you can move one without fixing the others.</p>`,
    ].join("\n              "),
    "var(--c-fuel)"
  ),
  group(
    "Compare with gasoline",
    [
      num("mpg", "Gas vehicle MPG", 30, { min: 5, max: 150, step: 0.5 }),
      num("gasPrice", "Gas price", 4.0, { prefix: "$", suffix: "/gal", min: 1, max: 12, step: 0.05 }),
      rng("years", "Compare over", 5, { min: 1, max: 12, step: 1, initial: "5 years" }),
    ].join("\n              "),
    "var(--c-insure)"
  ),
  advanced(
    [
      num("fees", "Charging subscriptions &amp; idle fees", 0, {
        prefix: "$",
        suffix: "/yr",
        min: 0,
        step: 10,
        help: "Network memberships, session fees and idle penalties, if you pay any.",
      }),
      num("install", "Home charger installation", 0, {
        prefix: "$",
        min: 0,
        step: 100,
        help: "One-off Level 2 install cost, spread across the comparison period. Typically $800–2,200 before incentives.",
      }),
    ].join("\n                  ")
  ),
].join("\n            ");

const results = [
  hero(
    "EV Charging Cost summary",
    "What your charging actually costs",
    "annual",
    "money",
    'That\'s <strong class="num" data-out="monthly" data-fmt="money">—</strong> a month and <strong class="num" data-out="perMile" data-fmt="cents">—</strong> per mile, drawing <strong class="num" data-out="kwhYear" data-fmt="num">—</strong> kWh from the grid each year at a blended rate of <strong class="num" data-out="blended" data-fmt="money2">—</strong> per kWh.'
  ),
  tiles([
    ["Cost per mile", "perMile", "cents", "Energy only"],
    ["The gas equivalent", "gasPerMile", "cents", 'A <span data-out="mpgLabel">30</span> MPG car at the same miles'],
    ["Saved per year", "savedYear", "money", "Versus that gasoline vehicle"],
  ]),
  chartCard(
    "Where the charging money goes",
    "Annual cost split by how and where you charge",
    `<div class="donut-wrap">
            <div id="donut"></div>
            <div class="breakdown" id="breakdown"></div>
          </div>`
  ),
  chartCard(
    "The DC fast charging penalty",
    "Your annual charging cost as public fast charging replaces home charging",
    `<div id="dc-chart"></div>
          <p class="text-muted" style="font-size:.85rem;margin-top:14px">This is the single most important line on the page. An EV charged at home is dramatically cheaper than gasoline. The same EV charged mostly at DC fast chargers can cost about the same as gasoline — or more.</p>`
  ),
  callout(
    "Over the comparison period",
    'Charging costs <strong class="num" data-out="total" data-fmt="money">—</strong> against <strong class="num" data-out="gasTotal" data-fmt="money">—</strong> for the gasoline vehicle — a difference of <strong class="num" data-out="savedTotal" data-fmt="money">—</strong>. <span data-out="installNote"></span>'
  ),
].join("\n\n        ");

const floatBar = `<div class="float-summary no-print" id="floatSummary" aria-hidden="true">
  <div class="fs-item"><span class="k">Charging / year</span><span class="v num" data-out="annual" data-fmt="money">—</span></div>
  <div class="fs-sep"></div>
  <div class="fs-item fs-hide-sm"><span class="k">Per mile</span><span class="v num" data-out="perMile" data-fmt="cents">—</span></div>
  <button type="button" class="btn btn-primary btn-sm" data-scroll="calc">Edit</button>
</div>`;

/* ------------------------------------------------------------------ prose -- */

const prose = `
    <h2 id="how-it-works">How EV charging cost is calculated</h2>
    <p>An electric vehicle's fuel bill has three inputs rather than two. You need the car's efficiency in kilowatt-hours per 100 miles, the price you pay per kilowatt-hour, and — the part almost every online calculator omits — the charging losses between the wall and the battery.</p>
    ${callout(
      "Annual charging cost = (miles ÷ 100) × kWh per 100 miles ÷ (1 − loss) × price per kWh",
      "<p style='margin:0'>A 28 kWh/100mi sedan driven 12,000 miles needs 3,360 kWh at the battery. With 10% charging losses you'll actually buy about 3,733 kWh. At a blended $0.21/kWh that's roughly $784 a year — about 6.5 cents a mile.</p>"
    )}
    <p>Charging losses are real money. Level 2 AC charging is typically 85–92% efficient; the rest becomes heat in the onboard charger and cabling, plus whatever the battery thermal system draws while conditioning. DC fast charging is more efficient at the conversion stage but often adds session fees, and in cold weather the car may spend significant energy preheating the pack before it will accept a fast charge at all. Ten percent is a reasonable all-year figure for most owners; in a cold climate with frequent short trips, twelve to fifteen is closer to reality.</p>

    <h2 id="three-tiers">The three prices of electricity</h2>
    <p>Gasoline has one price and it's on a sign you can read from the road. Electricity has at least three, and they differ by a factor of three. This is the thing new EV owners find most disorienting.</p>
    ${table(
      ["Where", "Typical rate", "Cost per mile*", "What it's for"],
      [
        ["Home, off-peak", "$0.11–0.16 / kWh", "4–6¢", "The overwhelming majority of charging for most owners"],
        ["Home, standard rate", "$0.16–0.22 / kWh", "6–8¢", "No time-of-use plan, charging whenever"],
        ["Workplace / destination", "Free–$0.20 / kWh", "0–7¢", "Long dwell times — offices, hotels, gyms"],
        ["Public Level 2", "$0.25–0.40 / kWh", "9–14¢", "Street and garage charging, slow but widespread"],
        ["DC fast charging", "$0.40–0.56 / kWh", "14–20¢", "Road trips and drivers without home charging"],
      ],
      [1, 2]
    )}
    <p style="font-size:.88rem;color:var(--muted)">*At 28 kWh/100 miles including 10% charging losses.</p>
    <p>Read the top and bottom rows together and the whole economics of EV ownership becomes clear. Home charging at 5 cents a mile is roughly a third of what gasoline costs. DC fast charging at 18 cents a mile is <em>more</em> than a 30-MPG car costs at $4.00 gasoline. Same vehicle, same miles, entirely different conclusion.</p>
    ${callout(
      "The rule that decides whether an EV saves you money",
      "If you can charge at home overnight, an EV will cut your energy cost by roughly two thirds and the saving is durable. If you can't — apartment, street parking, no dedicated space — you'll be paying public rates for most of your miles, and the fuel advantage largely disappears. Sort out where the car will charge before you sort out which car to buy. It matters more than the badge.",
      "warn"
    )}

    <h2 id="time-of-use">Time-of-use rates are the biggest lever you control</h2>
    <p>Most utilities offer an optional time-of-use plan where overnight electricity costs substantially less than daytime electricity — often 8 to 13 cents a kilowatt-hour against a 16 to 22 cent standard rate. Since an EV charges while you sleep, this is nearly free money for the average owner, and switching typically takes one phone call or a few clicks in an online account.</p>
    <p>A word of caution before you switch: time-of-use plans reprice your <em>entire</em> household, not just the car. If your home is electrically heated, or somebody works from home running air conditioning through the expensive afternoon window, the peak rate can claw back more than the car saves. Most utilities publish a rate comparison tool that will run your last twelve months of usage against both plans. Spend ten minutes with it before you commit.</p>
    <p>Some utilities also offer a dedicated EV meter or a separate rate for the charger circuit, which sidesteps the whole-home problem entirely. It usually requires an electrician and a second meter, so it only pays back for high-mileage drivers — but if you cover 20,000 miles a year it can be worth the install.</p>

    <h2 id="mistakes">Common mistakes</h2>
    ${bullets([
      "<strong>Ignoring charging losses.</strong> You're billed for what leaves the wall, not for what reaches the battery. Skipping this understates your real cost by roughly 10 percent, every year, forever.",
      "<strong>Quoting the home rate and charging in public.</strong> The number that matters is your <em>blended</em> rate across everywhere you actually plug in. If a fifth of your miles come from DC fast chargers, that fifth costs three times as much as the rest and it drags the average up hard.",
      "<strong>Using the EPA efficiency figure in a cold climate.</strong> Winter range loss of 20 to 35 percent is normal, driven by cabin heating and battery conditioning. If you live somewhere with real winters, add several kWh per 100 miles to the annual average.",
      "<strong>Forgetting the installation cost.</strong> A Level 2 home charger plus installation typically runs $800 to $2,200 depending on panel capacity and how far the run is. Federal and utility incentives often cover a meaningful share, but the net figure belongs in the first-year comparison.",
      "<strong>Comparing against an unrealistically thirsty gas car.</strong> If the honest alternative you'd otherwise buy is a 38-MPG hybrid rather than a 22-MPG SUV, compare against the hybrid. Comparing an EV to a vehicle you were never going to buy inflates the saving.",
      "<strong>Assuming cheap fuel makes the car cheap.</strong> Energy is one line. Many EVs cost more upfront, depreciate faster and insure higher, and those three together can exceed the fuel saving. Run the whole picture in the True Cost to Own calculator before you conclude anything.",
    ])}

    <h2 id="context">Charging cost in proportion</h2>
    <p>For a typical driver, the energy saving from switching to an EV is somewhere between $900 and $1,400 a year against a comparable gasoline vehicle — real money, and one of the more reliable benefits of electric ownership. But over five years that's $4,500 to $7,000, which is roughly what depreciation costs on a single year of a new $50,000 vehicle.</p>
    <p>The point isn't that charging savings don't matter. It's that they're one input into a much larger calculation, and an EV bought at the wrong price or held for the wrong length of time will lose far more on the resale side than it ever recovers at the plug. Our <a href="/fuel-and-ev/">Fuel &amp; EV guide</a> works through the full comparison, and the <a href="/calculators/true-cost-to-own/">True Cost to Own calculator</a> puts every category side by side.</p>
`;

/* -------------------------------------------------------------------- JS -- */

const js = `/* EV Charging Cost — MyDrivingCost.com */
(function () {
  "use strict";
  var MDC = window.MDC, F = MDC.fmt;

  function shares(i) {
    var s = i.pHome + i.pL2 + i.pDc;
    if (s <= 0) return { h: 1, l: 0, d: 0 };
    return { h: i.pHome / s, l: i.pL2 / s, d: i.pDc / s };
  }

  function annualFor(i, sh) {
    var kwhBattery = (i.miles / 100) * i.kwh100;
    var kwhGrid = kwhBattery / Math.max(0.5, 1 - i.loss / 100);
    var cost = kwhGrid * (sh.h * i.rHome + sh.l * i.rL2 + sh.d * i.rDc) + i.fees;
    return { kwhGrid: kwhGrid, cost: cost, sh: sh };
  }

  MDC.calc({
    form: "ev-form",
    defaults: {
      miles: 12000, kwh100: 28, loss: 10,
      pHome: 80, rHome: 0.175, pL2: 12, rL2: 0.32, pDc: 8, rDc: 0.48,
      mpg: 30, gasPrice: 4.00, years: 5, fees: 0, install: 0
    },
    compute: function (i) {
      var sh = shares(i);
      var a = annualFor(i, sh);
      var perMile = a.cost / Math.max(1, i.miles);
      var gasAnnual = (i.miles / Math.max(1, i.mpg)) * i.gasPrice;
      var total = a.cost * i.years + i.install;
      var gasTotal = gasAnnual * i.years;
      return {
        annual: a.cost,
        monthly: a.cost / 12,
        perMile: perMile,
        kwhYear: a.kwhGrid,
        blended: a.cost > 0 && a.kwhGrid > 0 ? (a.cost - i.fees) / a.kwhGrid : 0,
        gasPerMile: gasAnnual / Math.max(1, i.miles),
        gasAnnual: gasAnnual,
        savedYear: gasAnnual - a.cost,
        total: total,
        gasTotal: gasTotal,
        savedTotal: gasTotal - total,
        mpgLabel: i.mpg,
        parts: {
          home: a.kwhGrid * sh.h * i.rHome,
          l2: a.kwhGrid * sh.l * i.rL2,
          dc: a.kwhGrid * sh.d * i.rDc,
          fees: i.fees
        },
        _i: i
      };
    },
    onInput: function (i) {
      var set = function (k, v) {
        document.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) {
          if (el.closest(".field")) el.textContent = v;
        });
      };
      var s = Math.max(1, i.pHome + i.pL2 + i.pDc);
      set("miles", F.num(i.miles) + " mi/yr");
      set("loss", i.loss + "%");
      set("years", i.years + (i.years === 1 ? " year" : " years"));
      set("pHome", Math.round(i.pHome / s * 100) + "% of charging");
      set("pL2", Math.round(i.pL2 / s * 100) + "% of charging");
      set("pDc", Math.round(i.pDc / s * 100) + "% of charging");
    },
    render: function (res, i) {
      var CATS = [
        { key: "home", label: "Home charging", css: "--c-insure" },
        { key: "l2",   label: "Public Level 2", css: "--c-maint" },
        { key: "dc",   label: "DC fast charging", css: "--c-fuel" },
        { key: "fees", label: "Fees & subscriptions", css: "--c-finance" }
      ];
      var rows = CATS.map(function (c) { return { c: c, v: res.parts[c.key] || 0 }; })
                     .filter(function (r) { return r.v > 0.5; });
      var bd = document.getElementById("breakdown");
      if (bd) {
        bd.innerHTML = rows.slice().sort(function (a, b) { return b.v - a.v; }).map(function (r) {
          var pct = res.annual > 0 ? r.v / res.annual * 100 : 0;
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + r.c.css + ')"></span>' +
            '<span class="bd-name">' + r.c.label + '<small>' + F.money(r.v) + ' per year</small></span>' +
            '<span class="bd-pct num">' + Math.round(pct) + '%</span>' +
            '<span class="bd-val num">' + F.money(r.v) + '</span>' +
            '</div>';
        }).join("");
      }
      var donut = document.getElementById("donut");
      if (donut) MDC.charts.donut(donut, rows.map(function (r) {
        return { label: r.c.label, value: r.v, cssVar: r.c.css };
      }), {
        centerLabel: "Per year",
        centerValue: F.money(res.annual),
        centerSub: (res.perMile * 100).toFixed(1) + "¢/mi",
        aria: "Annual charging cost split by charging location"
      });

      var host = document.getElementById("dc-chart");
      if (host) {
        var pts = [];
        for (var p = 0; p <= 100; p += 5) {
          var a = annualFor(i, { h: (100 - p) / 100, l: 0, d: p / 100 });
          pts.push({ x: p, y: a.cost });
        }
        MDC.charts.area(host, pts, {
          cssVar: "--c-fuel",
          yFmt: function (v) { return "$" + F.num(v); },
          xFmt: function (x) { return x + "%"; },
          xLabelFmt: function (x) { return x + "% DC fast"; },
          aria: "Annual charging cost rising as DC fast charging replaces home charging"
        });
      }

      var note = document.querySelector('[data-out="installNote"]');
      if (note) {
        var msg = "";
        if (i.install > 0) {
          msg = "That includes the " + F.money(i.install) + " home charger installation, counted once in year one.";
        }
        if (res.savedTotal < 0) {
          msg += (msg ? " " : "") + "At this charging mix, the EV costs <strong>more</strong> to run than the gasoline vehicle — which is what happens when most miles come from public fast chargers.";
        }
        note.innerHTML = msg;
      }
    }
  });
})();
`;

module.exports = {
  slug: "ev-charging",
  jsName: "ev",
  formId: "ev-form",
  crumbName: "EV Charging",
  appName: "EV Charging Cost Calculator",
  title: "EV Charging Cost Calculator — Home vs Public | MyDrivingCost",
  desc:
    "Work out what charging an electric car really costs, including charging losses and your own mix of home, Level 2 and DC fast — then compare it with gas.",
  ogTitle: "EV Charging Cost Calculator — home vs public vs DC fast",
  ogDesc:
    "Your real blended charging cost per mile, including losses — and how it compares to gasoline.",
  h1: "EV Charging Cost Calculator",
  lead:
    "Charging an EV at home costs about a third of what gasoline costs. Charging it at DC fast chargers can cost more than gasoline. This calculator uses your actual mix — and counts the charging losses most tools quietly ignore.",
  inputs,
  results,
  floatBar,
  prose,
  js,
  disclaimer:
    "Energy estimates only. Electricity rates, network pricing, efficiency and winter losses vary substantially by utility, region, vehicle and season. Not financial advice.",
  sources: ["EIA_ELEC", "EIA_ELEC_ANNUAL", "EPA_FE", "AAA_GAS"],
  sourceNotes: [
    "Home, Level 2 public and DC fast charging are priced as three separate rates because they genuinely are. The home default is a residential retail average; public charging is set by the network operator, varies by state and by session, and is not covered by any federal price series.",
  ],
  related: [
    ["/calculators/fuel-cost/", "Fuel Cost", "The gasoline equivalent — annual, monthly and per-mile fuel costs."],
    ["/calculators/cost-per-mile/", "Cost Per Mile", "Energy is one line. Add depreciation, insurance, maintenance and interest."],
    ["/calculators/true-cost-to-own/", "True Cost to Own", "The full five-year comparison between an EV and a gasoline vehicle."],
    ["/fuel-and-ev/", "Fuel & EV guide", "The complete gas-versus-electric analysis, with sources."],
  ],
  faq: [
    [
      "How much does it cost to charge an electric car at home?",
      "At a typical US residential rate of about 17.5 cents per kilowatt-hour, a car using 28 kWh per 100 miles costs roughly $5.45 per 100 miles once charging losses are included — around 5.5 cents a mile. Driving 12,000 miles a year, that's about $650 to $700 annually. On an overnight time-of-use rate nearer 11 cents, the same driving costs closer to $420.",
    ],
    [
      "Why is DC fast charging so much more expensive?",
      "Fast charging stations carry costs home outlets don't: high-capacity grid connections, expensive power electronics, utility demand charges that penalize short bursts of high draw, site leases and maintenance. At $0.45 to $0.56 per kilowatt-hour, DC fast charging runs three times the typical home rate — which works out to roughly 16 to 20 cents a mile, more than a 30-MPG gasoline car at $4.00 fuel.",
    ],
    [
      "What are charging losses and why do they matter?",
      "Not all the electricity you buy reaches the battery. Some becomes heat in the onboard charger, the cable and the pack, and some goes to thermal conditioning before and during charging. Level 2 AC charging is usually 85 to 92 percent efficient. You are billed for everything that leaves the wall, so ignoring losses understates your real charging cost by around 10 percent — which is why this calculator includes them as an editable input.",
    ],
    [
      "Is it cheaper to charge an EV than to buy gasoline?",
      "If you charge mainly at home, decisively yes — roughly 5 to 6 cents a mile against 13 to 14 cents for a 30-MPG car at $4.00 gasoline, saving around $1,000 a year at 12,000 miles. If you rely on public DC fast charging for most of your miles, the advantage largely vanishes and can invert. Home charging access is the single variable that determines the answer.",
    ],
    [
      "Should I switch to a time-of-use electricity plan?",
      "For most EV owners, yes — overnight rates are often 8 to 13 cents against a 16 to 22 cent standard rate, and the car charges while you sleep. The caveat is that these plans reprice your whole house, so if you heat electrically or run heavy daytime loads, the expensive peak window can outweigh the overnight saving. Most utilities offer a comparison tool that runs your actual usage history against both plans; use it before switching.",
    ],
    [
      "How much does a home charger cost to install?",
      "A Level 2 charger plus installation typically runs $800 to $2,200. The charger itself is $350 to $700, and the rest is electrical work — the cost depends almost entirely on how far the run is from your panel and whether the panel has spare capacity. A panel upgrade can push the total past $3,000. Federal, state and utility incentives frequently cover a meaningful share, so check what applies before you get quotes.",
    ],
    [
      "How much range do I lose in winter?",
      "Expect 20 to 35 percent in genuinely cold weather. Most of that is cabin heating rather than the battery itself — a heat pump helps considerably compared with resistive heating. Preconditioning the car while it's still plugged in shifts that energy onto grid power rather than the battery, which recovers a useful share of the loss. If you live somewhere cold, add several kWh per 100 miles to your annual efficiency figure.",
    ],
    [
      "Does charging at home raise my electricity bill a lot?",
      "It adds roughly 300 to 400 kilowatt-hours a month for an average driver, which is a large percentage increase on a typical household bill — often 30 to 50 percent more electricity. That's the correct way to think about it: your electricity bill goes up meaningfully, and your gasoline bill goes to zero. The net across both is usually $60 to $100 a month in your favor.",
    ],
  ],
};
