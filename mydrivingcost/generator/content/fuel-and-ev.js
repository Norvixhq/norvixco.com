const P = require("../page");
const { table, callout, bullets, calcTiles, sources, stats, cite } = P;

/* ------------------------------------------------------------------------ */
const body = `
<section class="section-tight">
  <div class="container container-narrow prose">

    <h2>Fuel is the cost you feel — but rarely the cost that decides</h2>
    <p>Gas is the only ownership expense you pay for by hand, standing outside in the weather, watching a number climb. That makes it feel like the dominant cost of driving. It usually isn't. In AAA's <em>Your Driving Costs</em> research, fuel runs about <strong>13.00¢ per mile</strong> for the average new vehicle — roughly a quarter of the <strong>55.87¢ per mile</strong> a small sedan costs all-in, and well behind depreciation.</p>
    <p>That doesn't make fuel unimportant. It makes it <strong>the most controllable line item on the list</strong>. You can't renegotiate the depreciation curve of a car you already bought. You can change what you drive, how far, how fast, and where you fill up — and over 100,000 miles those choices are worth thousands of dollars.</p>

    <div class="grid grid-3" style="margin:26px 0 6px">
      <div class="stat-tile"><div class="k">US regular gasoline</div><div class="v">$4.00</div><div class="d">per gallon, week of July 20, 2026 (EIA)</div></div>
      <div class="stat-tile"><div class="k">Home charging</div><div class="v">17–18¢</div><div class="d">per kWh, typical US residential rate</div></div>
      <div class="stat-tile"><div class="k">DC fast charging</div><div class="v">45–50¢</div><div class="d">per kWh, typical public network</div></div>
    </div>
    <p class="text-muted" style="font-size:.88rem;margin-top:10px">Prices move weekly. Every figure below is a reference point you can overwrite with your own numbers inside the calculators.</p>

    <h2>Cost per mile is the only fair way to compare fuels</h2>
    <p>A gallon and a kilowatt-hour are not comparable units, and MPG and MPGe are not comparable ratings. The one number that survives translation is <strong>cost per mile</strong>: what it costs to move the vehicle one mile, energy only.</p>
    <p>For a combustion vehicle: <strong>price per gallon ÷ MPG</strong>. For an electric vehicle: <strong>price per kWh × (kWh per 100 miles) ÷ 100</strong>. That's it. Everything else is packaging.</p>

    ${table(
      ["Vehicle &amp; energy source", "Efficiency", "Energy price", "Cost per mile", "Per 15,000 mi/yr"],
      [
        ["Compact sedan, gasoline", "34 MPG", "$4.00/gal", "11.8¢", "$1,765"],
        ["Midsize SUV, gasoline", "26 MPG", "$4.00/gal", "15.4¢", "$2,308"],
        ["Half-ton pickup, gasoline", "20 MPG", "$4.00/gal", "20.0¢", "$3,000"],
        ["Hybrid sedan", "50 MPG", "$4.00/gal", "8.0¢", "$1,200"],
        ["EV, charged at home", "28 kWh/100 mi", "$0.175/kWh", "4.9¢", "$735"],
        ["EV, public Level 2", "28 kWh/100 mi", "$0.32/kWh", "9.0¢", "$1,344"],
        ["EV, DC fast charging only", "28 kWh/100 mi", "$0.48/kWh", "13.4¢", "$2,016"],
      ],
      [1, 2, 3, 4]
    )}

    ${callout(
      "The single most important EV fact",
      `<p style="margin:0">An EV owner who charges at home pays roughly <strong>4.9¢ per mile</strong>. The same EV, driven by someone with no home charger who relies on DC fast networks, costs about <strong>13.4¢ per mile</strong> — nearly identical to a 30 MPG gas car. The vehicle didn't change. The plug did. Before you buy an EV to save on fuel, confirm you can charge where you sleep.</p>`
    )}

    <h2>What actually moves your fuel bill</h2>

    <h3>1. The vehicle you chose (worth the most, decided once)</h3>
    <p>Going from 20 MPG to 30 MPG saves about 6.7¢ per mile at $4.00/gal. Over 12,000 miles a year that's roughly <strong>$800 a year</strong>, or $4,000 across five years — before you've changed a single driving habit. No fuel-saving technique in the rest of this list comes close. This is why fuel economy belongs in the purchase decision, not the ownership decision.</p>

    <h3>2. How much you drive</h3>
    <p>Mileage scales everything linearly. A driver at 8,000 miles a year and a driver at 20,000 miles a year in the same car have fuel bills that differ by 2.5×. If your annual mileage is genuinely low, fuel economy matters far less to you than depreciation and insurance do — and a cheaper, thirstier used car can be the correct financial answer.</p>

    <h3>3. Speed</h3>
    <p>Aerodynamic drag rises with the square of speed, so the power needed to overcome it rises with the cube. Most vehicles peak in efficiency somewhere between 45 and 60 mph and fall off steadily above that. Sustained 80 mph highway driving can cost 15–25% more fuel than 65 mph over the same distance — and saves only a few minutes per hour.</p>

    <h3>4. Cold starts and short trips</h3>
    <p>An engine is at its least efficient before it reaches operating temperature, and catalytic converters don't work cold. A three-mile trip can burn fuel at double the rate the same car achieves on the highway. Chaining errands into one warm loop is one of the few "driving tips" with real, measurable savings — and it helps EVs too, since cabin heating is the largest winter range penalty.</p>

    <h3>5. Where you buy</h3>
    <p>Station-to-station spreads of 30–50¢ per gallon are common within a single metro area, and highway-exit stations are reliably the most expensive fuel in any region. Fuel apps and warehouse-club stations routinely beat the local average. On a 15-gallon fill that's $5–8 per visit, or $150–250 a year for a typical driver.</p>

    <h3>6. Tires and maintenance (real, but small)</h3>
    <p>Underinflated tires increase rolling resistance; the commonly cited figure is about 0.2% fuel economy lost per 1 PSI below spec across all four tires. That's a rounding error in isolation, but the same underinflation shortens tire life and hurts wet braking, so it's worth doing for reasons beyond fuel. Treat clogged air filters, dragging brakes and worn spark plugs the same way: fix them because they're faults, not because they're a fuel strategy.</p>

    ${callout(
      "Skip the fuel-saving gadgets",
      `<p style="margin:0">Magnets, fuel-line "ionizers", vortex intake inserts and pill-form additives have never demonstrated meaningful fuel savings under controlled testing. The EPA has evaluated more than a hundred such devices over the decades; essentially none delivered the claimed improvement. Spend the money on tires that are correctly inflated and a route that avoids stop-and-go.</p>`,
      "warn"
    )}

    <h2>Premium fuel: when it's required and when it's a donation</h2>
    <p>Octane is a measure of resistance to knock, not a measure of energy or quality. A higher octane rating does not contain more energy per gallon. If your owner's manual says <em>regular unleaded</em>, higher-octane fuel will not make the car faster, cleaner or more efficient — it will just cost 60–90¢ more per gallon.</p>
    <p>Two cases genuinely call for it. If the manual says premium is <strong>required</strong>, use it: the engine's compression ratio and boost targets are designed around it, and knock-retard will cost you power and efficiency on regular. If the manual says premium is <strong>recommended</strong>, the engine will safely adapt to regular but may give up a few percent of power and economy — which usually costs less than the fuel premium, so regular is often the cheaper choice.</p>
    <p>For a driver covering 12,000 miles a year at 25 MPG, needlessly buying premium at a 70¢ spread costs about <strong>$336 a year</strong>.</p>

    <h2>Hybrids, plug-in hybrids and EVs — how the math differs</h2>

    <h3>Conventional hybrid</h3>
    <p>No plug, no charging behavior to change, and the efficiency gain is largest in exactly the driving that hurts a gas car most: city, stop-and-go, short trips. A hybrid at 50 MPG versus a comparable gas car at 32 MPG saves about 4.5¢ per mile, or $540 a year at 12,000 miles. Whether that pays back the price premium depends entirely on the size of the premium and how long you keep the car — which is a <a href="/calculators/true-cost-to-own/">true-cost-to-own</a> question, not a fuel question.</p>

    <h3>Plug-in hybrid (PHEV)</h3>
    <p>A PHEV is the most sensitive vehicle type to owner behavior in the entire market. Driven on its battery for daily trips and charged nightly, it can run near EV energy costs. Driven without ever plugging it in, it's a heavier, more expensive hybrid. The same vehicle can produce wildly different cost-per-mile results depending on one habit. If you won't plug it in every night, buy the hybrid instead.</p>

    <h3>Battery electric (BEV)</h3>
    <p>Energy cost is the headline advantage and it's real — roughly 5¢ per mile at home versus 12–20¢ for gas. Charge losses are worth knowing about: you pay for the kWh going into the charger, not the kWh reaching the battery, and Level 1/Level 2 charging is typically 85–92% efficient. Add roughly 10% to any at-home estimate you build from battery-side numbers.</p>
    <p>The parts of EV ownership that surprise people are not energy. They're <a href="/insurance/">insurance</a>, which runs meaningfully higher on many EVs, and <a href="/depreciation/">depreciation</a>, which has been steeper than the combustion average on several high-volume models. Fuel savings can be entirely erased by those two lines. That's the whole reason this site models all of them together.</p>

    ${table(
      ["", "Gas (30 MPG)", "Hybrid (50 MPG)", "EV (home charge)", "EV (fast-charge only)"],
      [
        ["Energy cost per mile", "13.3¢", "8.0¢", "4.9¢", "13.4¢"],
        ["12,000 mi/yr energy", "$1,600", "$960", "$588", "$1,613"],
        ["5-year energy", "$8,000", "$4,800", "$2,940", "$8,064"],
        ["Routine maintenance", "Baseline", "Slightly lower", "30–45% lower", "30–45% lower"],
        ["Typical insurance", "Baseline", "Similar", "Higher", "Higher"],
        ["Home setup cost", "$0", "$0", "$0–2,000 (L2)", "$0"],
      ],
      [1, 2, 3, 4]
    )}
    <p class="text-muted" style="font-size:.88rem">Energy assumptions: $4.00/gal, $0.175/kWh at home, $0.48/kWh DC fast, 28 kWh/100 mi. Change any of them in the calculators.</p>

    <h2>Charging costs in practice</h2>
    <p>There are three tiers of EV charging and the price gap between them is larger than the gap between any two grades of gasoline.</p>
    ${bullets([
      "<strong>Level 1 (standard household outlet)</strong> — about 3–5 miles of range per hour. Free to set up, effectively useless for high-mileage drivers, perfectly adequate for someone driving under 40 miles a day.",
      "<strong>Level 2 (240V home or workplace)</strong> — about 20–35 miles of range per hour. Installation typically runs several hundred to about $2,000 depending on panel capacity and the run to the garage. At home you pay your residential rate, commonly 17–18¢/kWh; public Level 2 stations charge roughly 25–40¢/kWh.",
      "<strong>DC fast charging</strong> — 10–80% in 20–40 minutes on most modern EVs. Priced at roughly 45–50¢/kWh, sometimes with idle fees and session fees on top. It is the right tool for road trips and the wrong tool for daily driving.",
    ])}
    <p>Two more variables matter more than most buyers expect. <strong>Time-of-use electricity rates</strong> can cut home charging costs by a third or more if your utility offers an overnight window and you schedule charging into it — most EVs and home chargers will do this automatically. And <strong>cold weather</strong> reduces usable range by roughly 15–30% depending on the vehicle and how much cabin heat you use, which raises effective cost per mile for the months it applies.</p>

    ${callout(
      "Before you commit to an EV, answer one question honestly",
      `<p style="margin:0">Where will this car spend the night? If the answer is "a garage or driveway where I can put in a 240V outlet," the fuel math strongly favors the EV. If the answer is "street parking" or "an apartment lot with no chargers," model it at public rates before you buy — and read our <a href="/calculators/ev-charging/">EV charging calculator</a> with realistic assumptions rather than the manufacturer's.</p>`
    )}

    <h2>A worked example</h2>
    <p>Two households, both driving 13,500 miles a year, both keeping the car five years.</p>
    ${bullets([
      "<strong>Household A</strong> buys a 27 MPG crossover. At $4.00/gal that's 14.8¢/mi — <strong>$2,000/yr</strong>, or <strong>$10,000</strong> over five years.",
      "<strong>Household B</strong> buys an EV at 30 kWh/100 mi and charges at home on an overnight rate of $0.13/kWh. That's 3.9¢/mi — <strong>$527/yr</strong>, or <strong>$2,633</strong> over five years.",
      "<strong>The energy gap is about $7,400 over five years</strong> — real money, and roughly the size of a typical EV price premium.",
      "But Household B also spends $1,400 on a Level 2 install and pays about $450 a year more for insurance. Net advantage falls to roughly <strong>$3,750</strong> — still positive, and now dependent on how the two vehicles depreciate.",
    ])}
    <p>That last sentence is the entire argument for looking at ownership cost as a system. Fuel told you the EV wins by $7,400. The full picture said it wins by about half that, and could flip on resale value alone. Run your own version in the <a href="/calculators/true-cost-to-own/">True Cost to Own calculator</a>.</p>

    ${sources([
      cite("EIA_GAS", "The $4.00 per gallon default is the round figure nearest this weekly national series."),
      cite("AAA_YDC_2025", "Fuel at 13.00¢/mile; small sedan all-in cost 55.87¢/mile at 15,000 miles a year."),
      cite("EPA_FE", "MPG and kWh/100 mi ratings, charging-level guidance and octane guidance."),
      cite("EIA_ELEC", "The basis for the $0.175/kWh home-charging default. Your utility tariff and any time-of-use plan will differ."),
      "Public-charging figures reflect published US network rate cards, mid-2026 \u2014 Level 2 $0.25\u2013$0.40/kWh, DC fast $0.45\u2013$0.50/kWh. No federal series tracks these; each network sets its own prices.",
    ])}

  </div>
</section>

<section class="section-tight bg-subtle">
  <div class="container">
    <div class="section-head"><span class="eyebrow">Run the numbers</span><h2>Fuel &amp; EV calculators</h2><p>Every figure on this page is an assumption you can change. These tools let you do that.</p></div>
    ${calcTiles([
      ["/calculators/fuel-cost/", "gauge", "Fuel Cost Calculator", "Annual and five-year gasoline cost from your MPG, mileage and local pump price.", true],
      ["/calculators/ev-charging/", "bolt", "EV Charging Calculator", "Home, public Level 2 and DC fast charging costs — including charge losses.", true],
      ["/calculators/cost-per-mile/", "route", "Cost Per Mile", "The all-in number, not just energy. Compare any two vehicles fairly.", true],
      ["/calculators/true-cost-to-own/", "chart", "True Cost to Own", "Fuel, depreciation, insurance, maintenance, financing and taxes over five years.", true],
    ])}
  </div>
</section>
`;

/* ------------------------------------------------------------------------ */
module.exports = {
  url: "/fuel-and-ev/",
  title: "Gas vs Electric Cost Per Mile | MyDrivingCost",
  desc:
    "What gas, hybrid and electric vehicles actually cost to fuel per mile — with worked examples, home and public charging compared, and free calculators you can run on your own numbers.",
  eyebrow: "Fuel &amp; EV",
  h1: "Fuel &amp; EV costs: what energy really costs per mile",
  h1short: "Fuel &amp; EV",
  lead:
    "Gasoline, hybrid and electric vehicles priced on the same scale — cost per mile — using current national energy prices, plus the charging realities that decide whether an EV actually saves you money.",
  crumb: [],
  heroStats: [
    ["Gas, 30 MPG", "13.3¢", "per mile at $4.00/gallon"],
    ["EV, home charging", "4.9¢", "per mile at $0.175/kWh"],
    ["EV, fast charging", "13.4¢", "per mile at $0.48/kWh"],
  ],
  heroCta: [
    ["Compare fuel costs", "/calculators/fuel-cost/", "btn-primary"],
    ["EV charging calculator", "/calculators/ev-charging/", "btn-ghost"],
  ],
  body,
  faqTitle: "Fuel &amp; EV questions",
  faq: [
    [
      "Is it actually cheaper to charge an EV than to buy gas?",
      "At home, decisively yes. Charging at a typical US residential rate of about 17–18¢/kWh, an efficient EV costs roughly 5¢ per mile in energy versus 13¢ or more for a 30 MPG gas car. But if you rely on DC fast charging at 45–50¢/kWh, the EV costs about 13.4¢ per mile — the advantage disappears almost entirely. The answer depends far more on where you charge than on which EV you buy.",
    ],
    [
      "How do I compare MPG to MPGe?",
      "Don't. Convert both to cost per mile instead. MPGe is an energy-equivalence rating, not a cost rating, and it tells you nothing about what you pay because electricity and gasoline are priced on completely different scales. Divide fuel price by MPG for a gas car, and multiply your electricity rate by kWh per 100 miles then divide by 100 for an EV. Now the two numbers mean the same thing.",
    ],
    [
      "Does premium gas improve fuel economy?",
      "Not if your vehicle doesn't require it. Octane measures knock resistance, not energy content — a gallon of premium contains essentially the same energy as a gallon of regular. If your owner's manual specifies regular, premium buys you nothing. If it says premium is required, use it; the engine is tuned for it and running regular will cost power and efficiency.",
    ],
    [
      "How much does cold weather affect EV range?",
      "Expect roughly 15–30% less usable range in sustained cold, depending on the vehicle and how much cabin heat you use. Cabin heating is the biggest single factor, which is why heat-pump-equipped EVs fare better. Preconditioning the car while it's still plugged in shifts that energy draw onto the wall instead of the battery and recovers much of the loss.",
    ],
    [
      "Do fuel-saving devices work?",
      "Essentially none of the aftermarket ones do. Magnets, fuel-line treatments, vortex inserts and similar products have been tested repeatedly without demonstrating meaningful savings. The interventions that do work are unglamorous: correct tire pressure, moderate highway speeds, combining short trips, removing roof racks you aren't using, and choosing a more efficient vehicle in the first place.",
    ],
    [
      "How much should I budget for a home Level 2 charger?",
      "Typically several hundred dollars to about $2,000 installed, driven mostly by how far the circuit has to run from your panel and whether the panel has spare capacity. A panel upgrade can push it higher. Check for utility rebates before you book the work — many utilities offset a meaningful share of the cost, and some offer a discounted overnight EV rate that matters more to your long-run cost than the installation ever will.",
    ],
    [
      "Is a plug-in hybrid cheaper to run than a regular hybrid?",
      "Only if you actually plug it in. A PHEV charged nightly runs most short trips on electricity and can approach EV energy costs. The same vehicle never plugged in is simply a heavier, pricier hybrid with worse economy than the conventional version. It is the one vehicle type where owner behavior, not engineering, determines the outcome.",
    ],
  ],
  cta: {
    h2: "See what your car costs to fuel — and everything else",
    p: "Fuel is one line on a much longer bill. Put your vehicle into the True Cost to Own calculator and see all six cost categories at once.",
    btn: ["Open True Cost to Own", "/calculators/true-cost-to-own/"],
  },
};
