const C = require("../calcpage");
const { num, rng, seg, group, advanced, hero, tiles, chartCard, callout, bullets, table, } = C;

/* IRS standard business mileage rate — imported, never hard-coded here.
   2026: 72.5 cents per mile for business use, effective 1 January 2026
   (IRS Notice 2026-10). Verified against irs.gov/tax-professionals/
   standard-mileage-rates, which carries the full year-by-year table.
   Change the values in constants.js each January and the prose, the FAQ
   and the calculator all move together. */
const { IRS_RATE, IRS_CENTS, IRS_YEAR, IRS_FUEL_CENTS, IRS_REST_CENTS } = require("../constants");

/* ------------------------------------------------------------------ HTML -- */

const inputs = [
  group(
    "The trip",
    [
      num("distance", "Distance", 1200, {
        suffix: "miles",
        min: 10,
        max: 12000,
        step: 10,
        help: "The distance shown by your map application. Choose below whether that is one way or the whole journey.",
      }),
      seg(
        "tripType",
        "That distance is",
        [["one", "One way"], ["round", "Round trip"]],
        "round"
      ),
      seg(
        "travelers",
        "Traveling",
        [["1", "1"], ["2", "2"], ["3", "3"], ["4", "4+"]],
        "2"
      ),
      num("nights", "Hotel nights", 2, {
        suffix: "nights",
        min: 0,
        max: 60,
        step: 1,
        help: "Nights you'll pay for accommodation. Set it to zero if you're staying with family or camping.",
      }),
      `<p class="field-help" data-out="driveDaysNote">&nbsp;</p>`,
    ].join("\n              ")
  ),
  group(
    "Your vehicle",
    [
      seg(
        "power",
        "Powertrain",
        [["gas", "Gas"], ["hybrid", "Hybrid"], ["ev", "EV"], ["diesel", "Diesel"]],
        "gas"
      ),
      num("mpg", "Efficiency", 30, {
        suffix: `<span data-out="mpgUnit">MPG</span>`,
        min: 5,
        max: 150,
        step: 0.5,
        help: "Use your real highway figure, not the city one. Choose EV above and this field becomes kWh per 100 miles — our benchmark is 28.",
      }),
      num("fuelPrice", "Fuel price", 4.0, {
        prefix: "$",
        suffix: "/gal",
        min: 1,
        max: 12,
        step: 0.05,
        help: "Ignored for an EV, which is priced from the road-trip electricity rate under Advanced.",
      }),
      rng("wear", "Wear and tear", 0.3, {
        min: 0.1,
        max: 0.7,
        step: 0.01,
        initial: "$0.30 / mile",
        help: "Depreciation from the added miles, tires, brakes, scheduled service, unscheduled repairs and a share of insurance and registration. Thirty to forty cents is the honest range for a mainstream vehicle.",
      }),
    ].join("\n              "),
    "var(--c-fuel)"
  ),
  group(
    "On the road",
    [
      num("hotel", "Hotel per night", 165, { prefix: "$", suffix: "/night", min: 0, step: 5 }),
      num("food", "Food per person per day", 55, { prefix: "$", suffix: "/day", min: 0, step: 5 }),
      num("tolls", "Tolls for the whole trip", 40, { prefix: "$", min: 0, step: 5 }),
      num("parking", "Parking", 0, { prefix: "$", min: 0, step: 5 }),
      num("extras", "Attractions and everything else", 0, { prefix: "$", min: 0, step: 10 }),
    ].join("\n              "),
    "var(--c-insure)"
  ),
  advanced(
    [
      `<p class="field-help">These drive the two comparisons: what the same journey costs if you fly, and what it costs if you leave your own car at home and rent one.</p>`,
      num("flightPrice", "Airfare per person", 320, {
        prefix: "$",
        min: 0,
        step: 10,
        help: "Return fare for this distance. In the distance table below, fares are scaled with distance from this figure.",
      }),
      num("airportCost", "Airport parking and transfers", 90, {
        prefix: "$",
        min: 0,
        step: 10,
        help: "Long-stay parking, or the taxi at both ends. Paid once for the party, not per person.",
      }),
      num("rentalDay", "Rental car per day", 68, {
        prefix: "$",
        suffix: "/day",
        min: 0,
        step: 1,
        help: "All-in daily rate including taxes, fees and any collision waiver you'd actually buy.",
      }),
      num("rentalMpg", "Rental car MPG", 32, { min: 5, max: 150, step: 0.5 }),
      num("evRate", "Road-trip electricity rate", 0.42, {
        prefix: "$",
        suffix: "/kWh",
        min: 0.05,
        max: 1,
        step: 0.01,
        help: "Roughly 80% DC fast charging at $0.48 blended with 20% hotel or home charging. A road trip is not home charging, and pricing it as though it were is the most common EV mistake on the internet.",
      }),
      num("valueOfTime", "What your time is worth", 25, {
        prefix: "$",
        suffix: "/hr",
        min: 0,
        max: 400,
        step: 5,
        help: "Used only to price the hours behind the wheel against the hours in an airport. Set it to zero if the driving is the point of the trip.",
      }),
      num("avgSpeed", "Average speed including stops", 62, {
        suffix: "mph",
        min: 25,
        max: 85,
        step: 1,
        help: "Door to door, fuel and food stops included. Sixty to sixty-five is realistic for interstate driving; nobody averages the speed limit.",
      }),
    ].join("\n                  ")
  ),
].join("\n            ");

const results = [
  hero(
    "Road trip cost summary",
    "What this trip really costs to drive",
    "driveTotal",
    "money",
    'Covering <strong class="num" data-out="totalMiles" data-fmt="num">—</strong> miles in about <strong class="num" data-out="driveHours" data-fmt="x1">—</strong> hours behind the wheel. That is <strong class="num" data-out="perPerson" data-fmt="money">—</strong> per traveler, and <strong class="num" data-out="perMile" data-fmt="perMile">—</strong> for every mile driven.'
  ),
  tiles([
    ["Per traveler", "perPerson", "money", 'Splitting everything <span data-out="travLabel">2</span> ways'],
    ["Cost per mile", "perMile", "perMile", "Everything, divided by the miles"],
    ["Fuel only", "fuel", "money", 'What most calculators stop at — <span class="num" data-out="fuelShare" data-fmt="pct">—</span> of the total'],
  ]),
  chartCard(
    "Three ways to make this journey",
    "The same trip, the same hotels, the same meals — three different transport decisions",
    `<div class="breakdown" id="compare"></div>
          <p class="text-muted" style="font-size:.85rem;margin-top:14px" id="compare-note"></p>`
  ),
  chartCard(
    "Where the trip money goes",
    "Every category of the drive-your-own-car option",
    `<div class="donut-wrap">
            <div id="donut"></div>
            <div class="breakdown" id="breakdown"></div>
          </div>`
  ),
  chartCard(
    "Where flying takes over",
    "Transport cost only, at five trip lengths — hotels, food and attractions are identical either way and are excluded",
    `<div id="dist-table"></div>`
  ),
  callout(
    "The cost nobody puts on the trip budget",
    `Those <strong class="num" data-out="totalMiles" data-fmt="num">—</strong> miles impose <strong class="num" data-out="wearCost" data-fmt="money">—</strong> of wear on your vehicle at <strong class="num" data-out="wearRate" data-fmt="money2">—</strong> a mile — depreciation from the added odometer reading, tires, brakes, service, repairs and a share of the fixed annual costs. It is <strong class="num" data-out="wearVsFuel" data-fmt="x1">—</strong> times the fuel bill. For reference, the IRS standard mileage rate is ${IRS_CENTS} cents a mile for ${IRS_YEAR}; the same trip claimed at that rate would be worth <strong class="num" data-out="irsCost" data-fmt="money">—</strong>. That rate exists precisely because driving costs a great deal more than fuel.`
  ),
  callout(
    "EV road trips are not EV commuting",
    'Charging away from home at a blended <strong class="num" data-out="evRateOut" data-fmt="money2">—</strong> per kWh, a 28 kWh/100mi electric car costs about <strong class="num" data-out="evPerMile" data-fmt="cents">—</strong> a mile against <strong class="num" data-out="gasRefPerMile" data-fmt="cents">—</strong> for a 30 MPG gasoline car at your fuel price. On DC fast chargers the energy advantage of an EV very nearly disappears. Add roughly <strong class="num" data-out="chargeStops" data-fmt="num">—</strong> charging stops on this route — call it <strong class="num" data-out="chargeHours" data-fmt="x1">—</strong> hours standing at a charger, on top of the driving.',
    "warn"
  ),
].join("\n\n        ");

const floatBar = `<div class="float-summary no-print" id="floatSummary" aria-hidden="true">
  <div class="fs-item"><span class="k">Trip cost</span><span class="v num" data-out="driveTotal" data-fmt="money">—</span></div>
  <div class="fs-sep"></div>
  <div class="fs-item fs-hide-sm"><span class="k">Per traveler</span><span class="v num" data-out="perPerson" data-fmt="money">—</span></div>
  <button type="button" class="btn btn-primary btn-sm" data-scroll="calc">Edit</button>
</div>`;

/* ------------------------------------------------------------------ prose -- */

const prose = `
    <h2 id="how-it-works">Almost every road-trip calculator understates the answer by half</h2>
    <p>Most road-trip calculators ask for three numbers — distance, fuel economy, fuel price — multiply them together and present the result as the cost of your journey. It is not. It is the cost of the fuel, which for a typical vehicle is between a third and a half of what the miles actually cost.</p>
    <p>The missing part is wear. Driving 2,400 miles moves your odometer 2,400 miles, and the used-car market prices odometers. It also consumes a slice of a set of tires, a set of pads, an oil change and the statistical share of every repair the vehicle will eventually need. None of it arrives as an invoice during the trip, which is why it gets left out — and why the comparison against flying or renting comes out wrong.</p>

    <h2 id="formula">The formula</h2>
    ${callout(
      "Trip cost = fuel + (miles × wear rate) + hotels + food + tolls + parking + everything else",
      "<p style='margin:0 0 10px'>Fuel is miles ÷ MPG × price per gallon, or for an electric car miles × kWh per 100 miles ÷ 100 × your blended charging rate. Wear is one per-mile figure covering depreciation from the added miles, tires, brakes, service, repairs and a share of insurance and registration.</p><p style='margin:0'>A 1,200-mile each-way trip in a 30 MPG car at $4.00 fuel: 2,400 miles burns 80 gallons, so $320 of fuel. At 30 cents a mile the journey also imposes $720 of wear. Before a single hotel night the drive has cost $1,040, and only a third of it was visible at the pump.</p>"
    )}
    <p>Wear carries the weight here because it is the only line that scales purely with distance and never appears on a receipt. Hotels and meals are the same whether you fly or drive; tolls vanish if you fly; fuel is visible and small. Wear is invisible and large, and it decides every comparison on this page.</p>

    <h2 id="wear-explained">What “wear and tear” actually consists of</h2>
    <p>Thirty to forty cents a mile sounds arbitrary until you build it from parts. Here is where a mainstream vehicle's marginal cost per mile comes from, fuel excluded:</p>
    ${table(
      ["Component", "Cents per mile", "Where the number comes from"],
      [
        ["Depreciation charged to the miles", "14¢", "Value guides price around 12,000–15,000 miles a year and mark down vehicles above it"],
        ["Scheduled maintenance", "7¢", "Oil, filters, fluids, transmission and coolant services on the manufacturer's interval"],
        ["Unscheduled repairs", "4¢", "The averaged cost of the failures every vehicle eventually has"],
        ["Tires", "2¢", "A $900 set lasting 45,000 miles"],
        ["Brakes and consumables", "2¢", "Pads, rotors, wipers, bulbs, a battery every five years"],
        ["Share of insurance and registration", "5¢", "Allocated on mileage — the trip is a share of the year's driving"],
        ["<strong>Total</strong>", "<strong>34¢</strong>", "Excludes fuel entirely"],
      ],
      [1]
    )}
    <p>A cheap, well-depreciated car sits at the bottom of that range or below; a new $60,000 SUV sits well above. Set the slider to match your vehicle — at $8,000 of car you intend to run into the ground, 18 cents is closer to honest and the whole calculation shifts in favor of driving.</p>
    <p>Note what this number is <em>not</em>. It is not the all-in cost of running a car — 98 cents a mile for our benchmark $34,000 SUV, roughly 77 cents for AAA's 2025 average at 15,000 miles a year. Those include finance charges, the full insurance premium and the depreciation you suffer even if the car never leaves the garage. A trip adds only the marginal cost of the miles.</p>

    <h2 id="irs">The IRS number is the fastest way to make the point</h2>
    <p>If you need to convince somebody that driving costs more than fuel, do not argue — quote the tax code. The IRS standard mileage rate for business use has run 65.5 cents (2023), 67 cents (2024), 70 cents (2025) and <strong>${IRS_CENTS} cents for ${IRS_YEAR}</strong>. It is reset each January, and the agency has adjusted it midyear only twice since 2011 &mdash; in 2011 and again in 2022, both times after a sharp run-up in pump prices. It exists so that people who drive for work can be reimbursed for the <em>total</em> cost of operating a vehicle without keeping receipts for every wear item, and it is recalculated from real cost data.</p>
    <p>At $4.00 a gallon and 30 MPG, fuel is about ${IRS_FUEL_CENTS} of those ${IRS_CENTS} cents. The other ${IRS_REST_CENTS} are everything else. The rate is deliberately generous and assumes a newer vehicle than most people drive, but the message is unambiguous: the federal government, which has no interest in overpaying, prices a mile at more than five times its fuel.</p>

    <h2 id="flying">When flying wins</h2>
    <p>The crossover is not a distance. It is a distance divided by the number of people in the car, because that is the only variable that moves the arithmetic. Flying costs roughly N times as much for N travelers; driving costs the same for one as for four. The second variable is whether you need a car once you land.</p>
    ${table(
      ["Travelers", "Flying wins beyond — no car needed there", "Flying wins beyond — with a rental at the far end"],
      [
        ["1", "600–900 total miles", "1,200–1,500"],
        ["2", "1,100–1,500", "2,000–2,500"],
        ["3", "1,900–2,600", "3,000–3,800"],
        ["4", "3,000–4,500", "Rarely, at any distance"],
      ],
      [1, 2]
    )}
    <p style="font-size:.88rem;color:var(--muted)">Total miles for the whole journey, at $320 fares, $4.00 fuel, 30 MPG and 30 cents of wear. The calculator solves the crossover exactly for your own figures and reports it under the three-way comparison.</p>
    <p>The gap between those two columns is the most commonly ignored cost of flying: the car you need when you land. A $320 fare becomes an $800 journey once you add airport parking, four days of rental at $68 and the fuel to run it. If the destination is a walkable city with functioning transit, you live in the left-hand column and flying wins far earlier. If it is a national park, you live in the right-hand column and driving holds on much longer than people expect.</p>
    <p>Time belongs in the comparison, and the calculator prices it if you want. A 1,200-mile drive at a realistic 62 mph average is nineteen hours behind the wheel each way, against four to six door to door by air. At $25 an hour that gap is worth over $700 for a couple; at zero, because the road is the point of the trip, it is worth nothing. Both answers are legitimate — be explicit about which you use.</p>

    <h2 id="renting">Why renting is so often the right answer</h2>
    <p>This is the comparison almost nobody runs. Renting does not eliminate wear — it transfers it, for a flat daily rate, to a business whose model is absorbing it. Your own odometer does not move.</p>
    <p>On a 2,400-mile round trip, your own car at 30 MPG and 30 cents of wear costs $320 in fuel plus $720 in wear: $1,040. A rental at $68 a day for five days is $340 plus $300 of fuel at 32 MPG: $640. Renting saves $400 on one trip, and brings a newer car, a factory warranty, roadside assistance and somebody else's problem if the alternator fails in Nebraska.</p>
    ${callout(
      "The break-even is closer than you think",
      "<p style='margin:0 0 10px'>Renting wins whenever the daily rate is smaller than the wear you avoid. With a $68 daily rate, 30 cents of wear and a rental returning 32 MPG, the crossover lands somewhere between 600 and 1,200 total miles depending on how many days you need the car — a long weekend, not an expedition. The calculator solves it exactly for your figures.</p><p style='margin:0'>The case is strongest for three vehicles: anything expensive enough to depreciate hard per mile, anything old enough to worry you, and anything you intend to sell within two years, where every added mile comes off the asking price.</p>"
    )}
    <p>The counter-arguments are real but narrow. Collision waivers add $15 to $30 a day if your own policy and credit card do not cover you — check, then put the true figure into the daily rate above. Under-25 surcharges break the maths entirely. One-way drop fees can exceed the rental. And a paid-off, high-mileage car worth $6,000 has a marginal cost per mile low enough that renting rarely competes. Outside those cases, price the rental; it wins more often than instinct suggests.</p>

    <h2 id="efficiency">Road-trip fuel efficiency is a speed decision</h2>
    <p>Aerodynamic drag rises with the square of speed and the power to overcome it with the cube. Above roughly 50 mph that term dominates, and highway fuel economy falls away sharply through the last 15 mph of the speed limit.</p>
    ${table(
      ["Steady speed", "Effective MPG (30 MPG-rated car)", "Fuel for 1,000 miles at $4.00", "Hours for 1,000 miles"],
      [
        ["55 mph", "34", "$118", "18.2"],
        ["65 mph", "31", "$129", "15.4"],
        ["70 mph", "29", "$138", "14.3"],
        ["75 mph", "27", "$148", "13.3"],
        ["80 mph", "25", "$160", "12.5"],
      ],
      [1, 2, 3]
    )}
    <p>Read the top and bottom rows together. Driving 1,000 miles at 80 rather than 65 saves just under three hours and costs $31 more in fuel — a good trade above about $11 an hour. The fuel-economy case for driving slowly is weaker than usually presented; the honest arguments are safety and comfort. Two things matter more than speed: a roof box costs 10 to 20 percent of highway economy, and tire pressure is free and worth 2 to 3 percent.</p>

    <h2 id="control">How to cut the cost of a road trip</h2>
    ${bullets([
      "<strong>Price the rental before assuming you'll drive your own car.</strong> Over about 1,000 miles, in any vehicle worth more than $20,000, it is a genuine contest and the rental frequently wins.",
      "<strong>Take the cheapest car in the household.</strong> The older, cheaper, more efficient vehicle on the driveway costs materially less per mile — worth more than every other item on this list combined.",
      "<strong>Drive fewer, longer days.</strong> Accommodation is the second-largest line on most road trips. One fewer night at $165 beats 400 miles of fuel.",
      "<strong>Book somewhere with a kitchen for stays over two nights.</strong> Food at $55 per person per day for a family of four is $220 a day, comfortably more than the driving.",
      "<strong>Fit the roof box on the day you leave and remove it the day you return.</strong> Ten to twenty percent of your highway economy is a lot to pay for empty aerodynamic drag.",
      "<strong>Check tire pressures cold before setting off.</strong> Free, five minutes, 2 to 3 percent — and it removes the commonest cause of a blowout a long way from home.",
      "<strong>Route around tolls only if the detour is short.</strong> Forty miles to avoid a $12 toll costs about $17 in fuel and wear plus an hour. Toll roads are often the cheap option once you count the miles.",
      "<strong>For an EV, plan around hotel and destination charging.</strong> An overnight Level 2 charger costs a third of the highway fast charger, and the car is parked anyway.",
    ])}

    <h2 id="mistakes">Common mistakes</h2>
    ${callout(
      "Comparing “the cost of gas” to “the cost of a flight”",
      "This is the error that produces almost every wrong road-trip decision. On one side of the comparison you put a fuel bill; on the other you put a complete, all-inclusive price that already contains the airline's fuel, maintenance, depreciation, staff and insurance. Of course driving looks cheap. Compare complete cost with complete cost, or the comparison tells you nothing at all.",
      "warn"
    )}
    ${bullets([
      "<strong>Forgetting the car you'll need at the destination.</strong> A cheap fare plus a week of rental, airport parking and fuel is not a cheap trip. Price the whole door-to-door journey on both sides.",
      "<strong>Using the EPA combined figure for a highway trip.</strong> Most vehicles beat their combined rating on a long steady run, sometimes by 10 to 15 percent. Use the highway number, and cut it if you're loaded, in mountains or above 75 mph.",
      "<strong>Pricing an EV road trip at the home electricity rate.</strong> Home charging is around 5 cents a mile; DC fast charging at $0.48 per kWh is 13 to 15 cents, roughly what gasoline costs. Same car, entirely different number.",
      `<strong>Treating a mileage reimbursement as profit.</strong> Claiming ${IRS_CENTS} cents a mile reimburses wear you genuinely incur. Spending it as income means paying for the tires out of next year's budget.`,
      "<strong>Budgeting only the transport.</strong> On the default trip, fuel is well under a fifth of the total. Food and accommodation usually cost more than getting there, and they hold most of the slack.",
    ])}
`;

/* -------------------------------------------------------------------- JS -- */

const js = `/* Road Trip Cost — MyDrivingCost.com */
(function () {
  "use strict";
  var MDC = window.MDC, F = MDC.fmt;

  /* Typical efficiency loaded when the powertrain changes. For "ev" the mpg
     field is reinterpreted as kWh per 100 miles — the site benchmark is 28. */
  var EFF = { gas: 30, hybrid: 45, ev: 28, diesel: 38 };
  var UNIT = { gas: "MPG", hybrid: "MPG", ev: "kWh/100mi", diesel: "MPG" };

  function party(v) { return v === "4" ? 4 : (parseInt(v, 10) || 1); }

  /* Cost of one mile of energy, gasoline or electricity. */
  function energyPerMile(i) {
    if (i.power === "ev") return (Math.max(1, i.mpg) / 100) * i.evRate;
    return i.fuelPrice / Math.max(1, i.mpg);
  }

  /* Days of the trip you pay for: nights plus the day you come home. */
  function stayDays(i) { return Math.max(1, Math.round(i.nights) + 1); }

  /* Days actually spent driving, at nine hours behind the wheel a day. */
  function drivingDays(miles, i) {
    return Math.max(1, Math.ceil(miles / Math.max(20, i.avgSpeed) / 9));
  }

  /* Airfare roughly half fixed, half proportional to distance, calibrated so
     that at the user's own trip length it equals exactly what they entered. */
  function fareAt(miles, baseMiles, base) {
    return base * (0.5 + 0.5 * (miles / Math.max(1, baseMiles)));
  }

  /* Transport-only cost of the three options at an arbitrary distance. */
  function options(miles, i, baseMiles) {
    var stay = stayDays(i);
    var rentDays = Math.max(stay, drivingDays(miles, i));
    var n = party(i.travelers);
    var rentPerMile = i.fuelPrice / Math.max(1, i.rentalMpg);

    var fuel = miles * energyPerMile(i);
    var wear = miles * i.wear;

    var rentFuel = miles * rentPerMile;
    var rentBase = i.rentalDay * rentDays;

    /* Flying: fares for the party, one airport cost, a rental for the stay and
       modest local driving at the far end. */
    var localMiles = 50 * stay;
    var fare = fareAt(miles, baseMiles, i.flightPrice);
    var fly = fare * n + i.airportCost + i.rentalDay * stay + localMiles * rentPerMile;

    return {
      own: fuel + wear,
      rent: rentBase + rentFuel,
      fly: fly,
      fuel: fuel,
      wear: wear,
      rentFuel: rentFuel,
      rentBase: rentBase,
      rentDays: rentDays,
      stay: stay,
      fare: fare,
      n: n
    };
  }

  MDC.calc({
    form: "trip-form",
    defaults: {
      distance: 1200, tripType: "round", travelers: "2", nights: 2,
      power: "gas", mpg: 30, fuelPrice: 4.00, wear: 0.30,
      hotel: 165, food: 55, tolls: 40, parking: 0, extras: 0,
      flightPrice: 320, airportCost: 90, rentalDay: 68, rentalMpg: 32,
      evRate: 0.42, valueOfTime: 25, avgSpeed: 62
    },
    compute: function (i) {
      var miles = Math.max(1, i.distance) * (i.tripType === "round" ? 2 : 1);
      var o = options(miles, i, miles);
      var n = o.n;

      var hotels = Math.max(0, i.nights) * i.hotel;
      var foodCost = i.food * n * o.stay;
      var shared = hotels + foodCost + i.tolls + i.parking + i.extras;

      var driveTotal = o.own + shared;
      var rentTotal = o.rent + shared;
      /* Flying skips the tolls and the en-route parking but keeps the rest. */
      var flyTotal = o.fly + hotels + foodCost + i.extras;

      var driveHours = miles / Math.max(20, i.avgSpeed);

      /* Where does renting a car overtake driving your own? Solved by search so
         that the stepped rental days are handled honestly. */
      var breakEven = 0;
      for (var m = 50; m <= 9000; m += 25) {
        var t = options(m, i, miles);
        if (t.rent < t.own) { breakEven = m; break; }
      }

      /* Where does flying overtake driving your own? */
      var flyEven = 0;
      for (var m2 = 50; m2 <= 9000; m2 += 25) {
        var t2 = options(m2, i, miles);
        if (t2.fly < t2.own) { flyEven = m2; break; }
      }

      /* EV road-trip reference: the site benchmark car at the blended rate. */
      var evPerMile = 0.28 * i.evRate;
      var gasRefPerMile = i.fuelPrice / 30;
      var stops = Math.max(0, Math.ceil(miles / 180) - 1);

      return {
        totalMiles: miles,
        driveTotal: driveTotal,
        rentTotal: rentTotal,
        flyTotal: flyTotal,
        perPerson: driveTotal / n,
        perMile: driveTotal / miles,
        fuel: o.fuel,
        fuelShare: driveTotal > 0 ? o.fuel / driveTotal * 100 : 0,
        wearCost: o.wear,
        wearRate: i.wear,
        wearVsFuel: o.fuel > 0 ? o.wear / o.fuel : 0,
        irsCost: miles * ${IRS_RATE},
        hotels: hotels,
        foodCost: foodCost,
        rentFuel: o.rentFuel,
        rentBase: o.rentBase,
        rentalDays: o.rentDays,
        days: o.stay,
        travelers: n,
        travLabel: n === 4 ? "4+" : String(n),
        driveHours: driveHours,
        timeCost: driveHours * i.valueOfTime,
        breakEven: breakEven,
        flyEven: flyEven,
        evRateOut: i.evRate,
        evPerMile: evPerMile,
        gasRefPerMile: gasRefPerMile,
        chargeStops: stops,
        chargeHours: stops * 25 / 60,
        mpgUnit: UNIT[i.power] || "MPG",
        driveDaysNote: "About " + driveHours.toFixed(1) + " hours behind the wheel — roughly " +
          drivingDays(miles, i) + " day" + (drivingDays(miles, i) === 1 ? "" : "s") +
          " of driving at nine hours a day, and " + o.stay + " day" + (o.stay === 1 ? "" : "s") +
          " of food for " + n + " " + (n === 1 ? "person" : "people") + ".",
        _i: i
      };
    },
    onSeg: function (name, val, api) {
      /* Switching powertrain loads a sensible efficiency and relabels the unit,
         because for an EV the field means kWh per 100 miles, not MPG. */
      if (name === "power" && EFF[val]) {
        api.setField("mpg", EFF[val]);
      }
    },
    onInput: function (i) {
      var set = function (k, v) {
        document.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) {
          if (el.closest(".field")) el.textContent = v;
        });
      };
      set("wear", "$" + i.wear.toFixed(2) + " / mile");
    },
    count: [],
    render: function (res, i) {
      var miles = res.totalMiles;

      /* ---- the three-way comparison, built by hand -------------------- */
      var opts = [
        {
          label: "Drive your own car",
          value: res.driveTotal,
          css: "--c-fuel",
          note: F.money(res.fuel) + " fuel + " + F.money(res.wearCost) + " wear + " +
                F.money(res.driveTotal - res.fuel - res.wearCost) + " on the road"
        },
        {
          label: "Rent a car and drive",
          value: res.rentTotal,
          css: "--c-maint",
          note: res.rentalDays + " days at " + F.money(i.rentalDay) + " + " +
                F.money(res.rentFuel) + " fuel — no wear on your own car"
        },
        {
          label: "Fly, then rent at the far end",
          value: res.flyTotal,
          css: "--c-insure",
          note: res.travLabel + " fares + airport costs + a " + res.days + "-day rental"
        }
      ];
      var best = opts[0], worst = opts[0];
      opts.forEach(function (o) {
        if (o.value < best.value) best = o;
        if (o.value > worst.value) worst = o;
      });

      var cmp = document.getElementById("compare");
      if (cmp) {
        cmp.innerHTML = opts.map(function (o) {
          var delta = o.value - best.value;
          var tag = delta < 1
            ? "cheapest"
            : "+" + F.money(delta);
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + o.css + ')"></span>' +
            '<span class="bd-name">' + o.label + '<small>' + o.note + '</small></span>' +
            '<span class="bd-pct num">' + tag + '</span>' +
            '<span class="bd-val num">' + F.money(o.value) + '</span>' +
            '</div>';
        }).join("");
      }

      var note = document.getElementById("compare-note");
      if (note) {
        var msg = "Cheapest on this trip: <strong>" + best.label + "</strong> at " +
          F.money(best.value) + ", which is " + F.money(worst.value - best.value) +
          " below the dearest of the three (" + worst.label + "). ";
        if (res.breakEven > 0) {
          msg += "Renting overtakes driving your own car at about <strong>" +
            F.num(res.breakEven) + " total miles</strong> with these figures, because a rental costs a flat daily rate while your own car costs " +
            "$" + i.wear.toFixed(2) + " of wear every mile. ";
        } else {
          msg += "At this wear rate and daily rental rate, renting never overtakes driving your own car — the daily charge is larger than the wear you avoid. ";
        }
        if (res.flyEven > 0) {
          msg += "Flying overtakes driving at about <strong>" + F.num(res.flyEven) +
            " total miles</strong> for " + res.travLabel + " traveling. ";
        }
        msg += "Hotels, food and attractions are held constant across all three so the transport decision stands alone — in practice flying also removes the en-route hotel nights, which pushes the crossover closer still. " +
          "The " + i.valueOfTime.toFixed(0) + "-dollar-an-hour value you placed on your time would add " +
          F.money(res.timeCost) + " to the driving options if you counted it.";
        note.innerHTML = msg;
      }

      /* ---- where the trip money goes ---------------------------------- */
      var CATS = [
        { label: "Fuel", value: res.fuel, css: "--c-fuel" },
        { label: "Wear on your vehicle", value: res.wearCost, css: "--c-deprec" },
        { label: "Hotels", value: res.hotels, css: "--c-insure" },
        { label: "Food", value: res.foodCost, css: "--c-maint" },
        { label: "Tolls and parking", value: i.tolls + i.parking, css: "--c-tax" },
        { label: "Attractions and other", value: i.extras, css: "--c-opp" }
      ].filter(function (c) { return c.value > 0.5; });

      var donut = document.getElementById("donut");
      if (donut) MDC.charts.donut(donut, CATS.map(function (c) {
        return { label: c.label, value: c.value, cssVar: c.css };
      }), {
        centerLabel: "Whole trip",
        centerValue: F.money(res.driveTotal),
        centerSub: F.money(res.perPerson) + " each",
        aria: "Road trip cost split by category"
      });

      var bd = document.getElementById("breakdown");
      if (bd) {
        bd.innerHTML = CATS.slice().sort(function (a, b) { return b.value - a.value; })
          .map(function (c) {
            var pct = res.driveTotal > 0 ? c.value / res.driveTotal * 100 : 0;
            return '<div class="bd-row">' +
              '<span class="bd-swatch" style="background:var(' + c.css + ')"></span>' +
              '<span class="bd-name">' + c.label + '<small>' +
                "$" + (c.value / Math.max(1, miles)).toFixed(2) + ' per mile</small></span>' +
              '<span class="bd-pct num">' + Math.round(pct) + '%</span>' +
              '<span class="bd-val num">' + F.money(c.value) + '</span>' +
              '</div>';
          }).join("") +
          '<p class="text-muted" style="font-size:.84rem;margin-top:14px">Wear is ' +
          (res.wearCost > res.fuel ? 'larger than the fuel bill' : 'smaller than the fuel bill on these figures') +
          ' and it is the only line here that never sends you an invoice.</p>';
      }

      /* ---- cost at several trip lengths ------------------------------- */
      var t = document.getElementById("dist-table");
      if (t) {
        var DIST = [300, 600, 1200, 2000, 3000];
        var rows = "";
        for (var k = 0; k < DIST.length; k++) {
          var m = DIST[k];
          var o = options(m, i, miles);
          var cheapest = Math.min(o.own, o.rent, o.fly);
          var winner = cheapest === o.own ? "Drive your own"
                     : (cheapest === o.rent ? "Rent a car" : "Fly");
          var mark = function (v) {
            return v === cheapest
              ? '<td class="num"><strong>' + F.money(v) + '</strong></td>'
              : '<td class="num">' + F.money(v) + '</td>';
          };
          rows += '<tr><td>' + F.num(m) + ' mi</td>' +
            mark(o.own) + mark(o.rent) + mark(o.fly) +
            '<td>' + winner + '</td></tr>';
        }
        t.innerHTML = '<div class="table-wrap"><table class="tbl">' +
          '<thead><tr><th>Total miles</th><th class="num">Drive your own</th>' +
          '<th class="num">Rent a car</th><th class="num">Fly + rent</th><th>Cheapest</th></tr></thead>' +
          '<tbody>' + rows + '</tbody></table></div>' +
          '<p class="text-muted" style="font-size:.85rem;margin-top:14px">Transport only — hotels, food and attractions are identical whichever way you go, so they are left out to make the crossover visible. ' +
          'Airfare is scaled from the ' + F.money(i.flightPrice) + ' you entered on the assumption that about half a ticket price is fixed and half varies with distance. ' +
          'Flying is priced for ' + res.travLabel + ' traveling; driving costs the same however many of you there are, which is the whole reason the crossover moves.</p>';
      }
    }
  });
})();
`;

module.exports = {
  slug: "road-trip",
  jsName: "trip",
  formId: "trip-form",
  crumbName: "Road Trip Cost",
  appName: "Road Trip Cost Calculator",
  title: "Road Trip Cost Calculator — Drive, Fly or Rent | MyDrivingCost",
  desc:
    "Price a road trip properly: fuel plus the wear the miles impose on your car, then compared against flying and against renting a car for the journey.",
  ogTitle: "Road Trip Cost Calculator — the half of the cost nobody counts",
  ogDesc:
    "Fuel is a third of what a road trip costs. See the wear, the flying comparison and the rental break-even.",
  h1: "Road Trip Cost Calculator",
  lead:
    "Most road-trip calculators multiply distance by fuel price and stop, which understates the real cost of driving by roughly half. This one counts the wear the miles impose on your vehicle, then compares the whole journey against flying and against renting a car for the trip.",
  inputs,
  results,
  floatBar,
  prose,
  js,
  disclaimer:
    "Estimates only. Fuel prices, airfares, rental rates, accommodation and the wear cost of your particular vehicle vary widely by route, season and market. Check real fares and quotes before committing to a decision. Not financial advice.",
  sources: ["IRS_MILEAGE", "EIA_GAS", "AAA_GAS", "EPA_FE"],
  sourceNotes: [
    "The IRS standard mileage rate is a reimbursement rate, not a prediction of what a trip will cost you. It bundles depreciation, insurance and maintenance into a single per-mile figure and is reset each January &mdash; the link above carries the full year-by-year table.",
  ],
  related: [
    ["/calculators/fuel-cost/", "Fuel Cost", "The fuel half of the equation, annual and per mile, for any vehicle."],
    ["/calculators/cost-per-mile/", "Cost Per Mile", "Everything a mile costs you — the figure the wear slider is built from."],
    ["/calculators/ev-charging/", "EV Charging Cost", "Home, Level 2 and DC fast rates blended into one honest per-mile number."],
    ["/calculators/true-cost-to-own/", "True Cost to Own", "The full annual picture that a single trip is a slice of."],
  ],
  faq: [
    [
      "How much does a road trip cost per mile?",
      "Budget 43 to 55 cents a mile for a mainstream vehicle, of which only 13 to 15 cents is fuel. The rest is wear: depreciation charged to the added miles, tires, brakes, scheduled service, averaged repairs and a share of insurance and registration. A 2,400-mile round trip in a 30 MPG car at $4.00 fuel therefore costs roughly $1,040 in transport before a single hotel night, against the $320 that a fuel-only calculator would tell you.",
    ],
    [
      "Is it cheaper to drive or fly?",
      "For one traveler heading somewhere walkable, flying tends to win beyond roughly 600 to 900 total miles; for two, beyond 1,100 to 1,500; for four, past 3,000. Airfare multiplies by the number of people while driving costs the same for one as for four, so the crossover moves out sharply with a full car. If you need a rental at the destination, add roughly $300 to the flying side and push every one of those figures out by 800 to 1,500 miles.",
    ],
    [
      "How do I calculate the cost of a road trip?",
      "Take total miles, divide by your MPG and multiply by fuel price to get the fuel. Then multiply total miles by a wear rate of 30 to 40 cents to get the cost the journey imposes on your vehicle. Add hotel nights, food per person per day, tolls, parking and attractions. The wear line is the one almost every online tool omits, and on a long trip it is usually larger than the fuel bill.",
    ],
    [
      "What is wear and tear on a car per mile?",
      "Around 34 cents a mile for a mainstream vehicle, excluding fuel. It breaks down roughly as 14 cents of depreciation charged to the added miles, 7 cents of scheduled maintenance, 4 cents of averaged unscheduled repairs, 2 cents of tires, 2 cents of brakes and consumables, and 5 cents allocated from insurance and registration. A cheap, well-depreciated car runs closer to 18 cents; a new luxury SUV can exceed 50.",
    ],
    [
      "Is it cheaper to rent a car for a road trip than to drive my own?",
      "Frequently, yes. A rental costs a flat daily rate; your own car costs 30 to 40 cents of wear for every mile you add to it. With a $68 daily rate and 30 cents of wear, the crossover lands between about 600 and 1,200 total miles depending on how many days you need the car. On a 2,400-mile round trip the rental is typically $300 to $400 cheaper. Renting wins most decisively for expensive vehicles, older vehicles you would rather not stress, and any car you intend to sell within two years.",
    ],
    [
      "How much does an EV road trip cost?",
      "Considerably more than EV commuting. At home rates of about $0.175 per kWh an electric car costs around 5 cents a mile. On DC fast chargers at $0.48 per kWh, a 28 kWh/100mi vehicle costs roughly 13 to 14 cents a mile, which is close to what a 30 MPG gasoline car costs at $4.00 fuel. Add 20 to 30 minutes of charging roughly every 180 miles. Hotel and destination Level 2 charging is the single best way to keep road-trip charging cheap.",
    ],
    [
      "Can I use the IRS standard mileage rate for a road trip?",
      `Only for genuinely deductible business, medical or charitable travel, and personal holiday driving is none of those. It is still the most useful reference number available. The rate is ${IRS_CENTS} cents a mile for ${IRS_YEAR}, up from 70 cents in 2025 and 67 cents in 2024, and the IRS sets it to approximate the full cost of operating a vehicle including fuel. Quoting it is the quickest way to demonstrate that a mile of driving costs roughly five times its fuel.`,
    ],
    [
      "How much should I budget per day for a road trip?",
      "For two people, plan on roughly $165 for accommodation, $110 for food and $150 to $200 of transport on a driving day — around $450 a day, or $250 on a day you stay put. Transport is the most predictable of the three and food is the most elastic. Accommodation booked with a kitchen for stays over two nights typically saves more than any fuel-economy measure you could take.",
    ],
  ],
};
