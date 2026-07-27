const C = require("../calcpage");
const { num, rng, seg, group, advanced, hero, tiles, chartCard, callout, bullets, table, } = C;

/* ------------------------------------------------------------------ HTML -- */

const inputs = [
  group(
    "The vehicle",
    [
      seg(
        "power",
        "Powertrain",
        [
          ["gas", "Gas"],
          ["hybrid", "Hybrid"],
          ["ev", "EV"],
          ["diesel", "Diesel"],
        ],
        "gas"
      ),
      seg(
        "brand",
        "Brand and parts cost",
        [
          ["econ", "Economical"],
          ["average", "Average"],
          ["premium", "Premium"],
          ["lux", "Luxury-Euro"],
        ],
        "average",
      ),
      rng("startAge", "Age when you start", 0, {
        min: 0,
        max: 15,
        step: 1,
        initial: "Brand new",
        help: "Maintenance is driven by the vehicle's age, not by how long you have owned it. Buying at five means starting on the expensive part of the curve.",
      }),
      rng("years", "Years you'll keep it", 5, { min: 1, max: 15, step: 1, initial: "5 years" }),
      rng("miles", "Annual miles", 12000, {
        min: 2000,
        max: 40000,
        step: 500,
        initial: "12,000 mi/yr",
        help: "Scheduled service and wear items are billed by the mile. Repairs track age more than mileage, so they rise more slowly than this.",
      }),
    ].join("\n              ")
  ),
  group(
    "How you'll run it",
    [
      seg(
        "shop",
        "Where the work happens",
        [
          ["dealer", "Dealer"],
          ["indep", "Independent"],
          ["diy", "DIY-friendly"],
        ],
        "indep"
      ),
      seg(
        "driving",
        "Driving pattern",
        [
          ["gentle", "Gentle"],
          ["mixed", "Mixed"],
          ["hard", "Hard / short-trip"],
        ],
        "mixed",
      ),
      `<p class="field-help">Short-trip driving is harder on a vehicle than long-distance driving at any speed. The engine never reaches temperature, the oil never boils off condensation, and the brakes do all the work that momentum would otherwise do.</p>`,
    ].join("\n              "),
    "var(--c-maint)"
  ),
  advanced(
    [
      num("tireCost", "Tires, set of four fitted", 900, {
        prefix: "$",
        min: 200,
        step: 25,
        help: "Includes mounting, balancing and disposal. Wheel diameter drives this more than brand does.",
      }),
      num("tireLife", "Tire life", 45000, {
        suffix: "mi",
        min: 10000,
        max: 90000,
        step: 1000,
        help: "Touring tires reach 60,000 miles. Performance tires on a heavy car can be gone by 25,000.",
      }),
      num("brakeCost", "Brake job, pads and rotors", 650, {
        prefix: "$",
        min: 150,
        step: 25,
        help: "Per axle pair. The model charges the front axle at the interval below and the rear axle at roughly 1.6 times it.",
      }),
      num("brakeLife", "Front brake life", 55000, {
        suffix: "mi",
        min: 15000,
        max: 120000,
        step: 5000,
      }),
      num("battCost", "12V battery", 240, { prefix: "$", min: 60, step: 10 }),
      num("battYrs", "12V battery life", 5, {
        suffix: "yrs",
        min: 2,
        max: 12,
        step: 1,
        help: "Four years in hot climates, seven in mild ones. Electric vehicles have one too, and it fails just as readily.",
      }),
      rng("unscheduledPct", "Repair allowance", 100, {
        min: 40,
        max: 200,
        step: 5,
        initial: "100% of typical",
        help: "Scales the unscheduled-repair curve. Raise it for a model with a known weak spot; lower it for a vehicle with an exceptional record.",
      }),
      `<p class="field-help"><strong>A note on electric vehicles.</strong> The model removes oil, filters, plugs and exhaust work, and roughly doubles brake life because regenerative braking does most of the stopping. It then adds cost back: tires about 25% dearer and 15% shorter-lived under the extra mass and instant torque, plus battery and inverter coolant service. Cheaper, decisively. Free, not at all.</p>`,
    ].join("\n                  ")
  ),
].join("\n            ");

const results = [
  hero(
    "Maintenance cost summary",
    'Maintenance and repairs over <span data-out="yearsLabel">5 years</span>',
    "total",
    "money",
    'That is <strong class="num" data-out="perYear" data-fmt="money">—</strong> a year on average — but the average is the least useful number here. Your cheapest year costs <strong class="num" data-out="firstYear" data-fmt="money">—</strong> and your dearest costs <strong class="num" data-out="worstCost" data-fmt="money">—</strong>.'
  ),
  tiles([
    ["Average per year", "perYear", "money", "Across the whole ownership period"],
    ["Average per month", "perMonth", "money", "What the reserve account needs"],
    ["Cost per mile", "perMile", "perMile", 'Across <span class="num" data-out="totalMiles" data-fmt="num">—</span> miles'],
  ]),
  chartCard(
    "The cost curve",
    'Annual maintenance and repair cost by year of ownership. The most expensive is <strong>year <span data-out="worstYear">—</span></strong> at <strong class="num" data-out="worstCost" data-fmt="money">—</strong>, driven mainly by <span data-out="worstDriver">—</span>.',
    `<div id="curve-chart"></div>
          <p class="text-muted" style="font-size:.85rem;margin-top:14px">This is the shape that annual averages hide. Wear items are amortized by the mile, so the line you see is an expected cost, not a cash-flow forecast — real spending arrives in lumps of $700 and $1,400. Budget to the curve; expect the lumps.</p>`
  ),
  chartCard(
    "Year by year",
    "Scheduled service, wear items and the repair allowance, separated",
    `<div id="maint-table"></div>`
  ),
  chartCard(
    "Where the money goes",
    'Every dollar across the full <span data-out="yearsLabel">5 years</span>, by category',
    `<div class="donut-wrap">
            <div id="donut"></div>
            <div class="breakdown" id="breakdown"></div>
          </div>`
  ),
  callout(
    "The step-up nobody budgets for",
    `In its first year this vehicle costs about <strong class="num" data-out="age1Cost" data-fmt="money">—</strong> to keep. At three years old, <strong class="num" data-out="age3Cost" data-fmt="money">—</strong>. At seven, <strong class="num" data-out="age7Cost" data-fmt="money">—</strong> — roughly <strong class="num" data-out="stepUpX" data-fmt="x1">—</strong> times the three-year figure and <strong class="num" data-out="stepUp1X" data-fmt="x1">—</strong> times the first-year one. Nothing has gone wrong. The warranty has simply expired, the tires and brakes the car was sold with have come due, and the repair curve has started to bite. The original owner has usually sold by then, which is why the step-up almost always lands on the second owner's account.`
  ),
  callout(
    "Deferring maintenance: what is untidy and what is fatal",
    `<p style="margin:0 0 10px">Some deferral is merely scruffy. A cabin filter left in for four years smells bad. Wipers left too long streak. An alignment left undone eats a set of tires slowly. Unpleasant, cheap to fix, no lasting harm.</p><p style="margin:0 0 10px">Four items are not in that category, because deferring them converts a small bill into a vehicle-ending one. <strong>Cooling system</strong> — old coolant turns acidic and eats head gaskets and radiators; a $180 flush prevents a $2,500 repair. <strong>Timing belt</strong> — on an interference engine a snapped belt destroys the valvetrain, turning a $900 service into a $4,000 engine. <strong>Transmission fluid</strong> — there is no such thing as lifetime fluid; burned fluid takes the gearbox with it, and gearboxes cost more than most used cars are worth. <strong>Brake fluid</strong> — it absorbs moisture from the air whether you drive or not, and wet fluid boils under hard braking and corrodes ABS components from the inside.</p><p style="margin:0">The rule is simple. If the item protects a system that costs thousands to replace, it is not maintenance you can postpone. It is insurance you are already paying for.</p>`,
    "warn"
  ),
].join("\n\n        ");

const floatBar = `<div class="float-summary no-print" id="floatSummary" aria-hidden="true">
  <div class="fs-item"><span class="k">Total maintenance</span><span class="v num" data-out="total" data-fmt="money">—</span></div>
  <div class="fs-sep"></div>
  <div class="fs-item fs-hide-sm"><span class="k">Per month</span><span class="v num" data-out="perMonth" data-fmt="money">—</span></div>
  <button type="button" class="btn btn-primary btn-sm" data-scroll="calc">Edit</button>
</div>`;

/* ------------------------------------------------------------------ prose -- */

const prose = `
    <h2 id="how-it-works">Maintenance is a curve, not an average</h2>
    <p>Almost every maintenance estimate you will encounter is a single number: so many cents per mile, so many dollars a year. It is a convenient number and it is very nearly useless, because maintenance cost is not distributed evenly across the life of a vehicle. It arrives in a shape, and the shape is the whole story.</p>
    <p>For the first three years a modern vehicle costs almost nothing to keep. The warranty absorbs anything that breaks, the tires and brakes it left the factory with are still good, and the only bills are oil, filters and an inspection. Somewhere between year four and year seven, that changes abruptly. The bumper-to-bumper cover lapses, the first set of tires wears out, the front brakes come due, the 12V battery gives up in a cold snap, and the components that were designed to last "the life of the vehicle" begin to discover what that phrase actually meant. Past year ten the vehicle is no longer expensive so much as <em>unpredictable</em>: many years cost less than the average, and the occasional year costs three times it.</p>
    <p>This matters because people make ownership decisions on the average and are then ambushed by the curve. A driver who budgets $45 a month on a new car and never revises it will meet a $1,900 year in year six and conclude the car is finished — when in fact it is behaving exactly as designed. The purpose of this calculator is to put that year on screen before you meet it, so the decision you make in year six is a decision rather than a reaction.</p>
    <p>The curve also explains who pays. A vehicle sold at three or four years old has had its cheap years harvested by the first owner and hands the step-up to the second — roughly the price of the depreciation the second owner just avoided, but it should be priced in. If you buy at four, the right budget is not the model's average. It is the model's cost at ages five through nine, which is usually double.</p>

    <h2 id="formula">The arithmetic</h2>
    ${callout(
      "How this calculator builds each year",
      `<p style="margin:0 0 10px"><strong>Annual cost = scheduled service + wear items + repair allowance</strong></p><p style="margin:0 0 10px"><strong>Scheduled service</strong> is priced per 10,000 miles by powertrain — roughly $390 for gas, $360 for hybrid, $470 for diesel and $150 for electric — then multiplied by your annual mileage, a brand parts factor, a labor-rate factor for where the work happens and a factor for how the vehicle is driven.</p><p style="margin:0 0 10px"><strong>Wear items</strong> are amortized across the miles they last: a set of tires divided by its tread life, the front brake job divided by its interval and the rear axle at about 1.6 times that interval, the 12V battery divided by its years, plus a small annual line for cabin and engine filters, wiper blades, alignment, brake fluid and coolant service. Crucially, accrual is scaled by the odometer. The tires and brakes a new car arrives with were bought with the car, so the model charges nothing for them until the vehicle approaches its first replacement — which is exactly why the curve is flat for three years and then is not. A used buyer is already past that point and pays in full from the first mile.</p><p style="margin:0">The <strong>repair allowance</strong> is the honest part. It is scaled by the vehicle's <em>age</em>, not by your ownership year, on a smooth S-curve that is suppressed while the warranty is live, rises steeply from about year five to year ten, and then flattens near its ceiling. A one-year-old vehicle carries about 1.5% of the full allowance; a seven-year-old carries about half; a twelve-year-old carries over 90% of it.</p>`
    )}
    <p>Two modeling choices are worth stating plainly. First, mileage raises the repair allowance sub-linearly — doubling your annual miles raises expected repairs by about half, not by double, because a great deal of what fails on an old car fails from time, heat cycles and corrosion rather than from distance. Second, the DIY setting reduces cost by 38%, not by the 60-odd percent that a pure labor saving would imply, because the jobs a competent home mechanic can actually do — oil, filters, brakes, batteries, plugs — are the cheap ones. Nobody rebuilds a transmission on a driveway.</p>

    <h2 id="benchmarks">What the individual jobs actually cost</h2>
    <p>The calculator's factors are built out of the table below. These are national mid-range figures for mainstream vehicles at an independent shop; a dealer will sit toward the top of each band and a luxury European marque can sit well above it.</p>
    ${table(
      ["Interval", "Item", "Typical cost", "Notes"],
      [
        ["5,000–10,000 mi", "Oil and filter", "$60–140", "Follow the manual, not the windscreen sticker"],
        ["5,000–8,000 mi", "Tire rotation", "$0–50", "Frequently free where the tires were bought"],
        ["15,000–30,000 mi", "Cabin and engine air filters", "$30–90", "Ten-minute DIY job on most vehicles"],
        ["30,000–70,000 mi", "Brake pads and rotors, per axle", "$400–800", "City driving halves the interval"],
        ["40,000–70,000 mi", "Tires, set of four fitted", "$600–1,400", "Wheel diameter drives this, not brand"],
        ["60,000–100,000 mi", "Spark plugs", "$150–500", "Cost is access, not parts"],
        ["60,000–100,000 mi", "Transmission fluid", "$180–450", "&ldquo;Lifetime fluid&rdquo; is a marketing term"],
        ["60,000–150,000 mi", "Coolant flush", "$120–250", "Interval varies hugely by coolant chemistry"],
        ["90,000–105,000 mi", "Timing belt, if fitted", "$600–1,200", "Non-negotiable on an interference engine"],
        ["Every 2–3 years", "Brake fluid flush", "$100–180", "Time-based; moisture, not wear"],
        ["Every 4–6 years", "12V battery", "$180–380", "Shorter life in hot climates, EVs included"],
        ["Every 2 years or on impact", "Wheel alignment", "$90–180", "A $120 alignment protects a $900 set of tires"],
      ],
      [2]
    )}
    <p>Read the table by interval rather than by price. The expensive-looking items are mostly rare, and the cheap-looking ones recur often enough to dominate the early years. Oil at $110 every 7,500 miles is $176 a year at 12,000 miles — more than the amortized cost of the timing belt.</p>
    <p>One reconciliation is worth making. This site's standard benchmark for the running cost of a $34,000 SUV uses <strong>$1,588 a year for maintenance, repairs and tires</strong> across five years &mdash; $1,250 in year one, compounding at 12% a year to $1,967 in year five. That figure is a blend across vehicle ages, and it is exactly the kind of average this page exists to take apart. A brand-new mainstream vehicle modeled here comes in well below it — around $1,050 a year over five years, because the tires and brakes it was sold with are still doing their job. The same vehicle bought at five years old and kept to ten comes in around $2,000 a year. Both are correct. The benchmark describes a population; the curve describes a car.</p>

    <h2 id="ev">Electric vehicles are cheaper to maintain, and that is not the same as free</h2>
    <p>The saving is real and it is large. An electric drivetrain deletes the oil, the oil filter, the engine air filter, the fuel filter, the spark plugs, the timing belt, the exhaust and catalytic converter, the starter motor, the alternator and the automatic transmission's fluid service. That is most of a scheduled maintenance book. Regenerative braking then does the majority of the deceleration, so friction brake pads on an EV routinely last twice as long as on a comparable gasoline car — 90,000 or 100,000 miles is unremarkable.</p>
    <p>What survives is less discussed. <strong>Tires are the big one.</strong> An electric vehicle is typically 300 to 500 kg heavier than its combustion equivalent and delivers peak torque from a standstill, and tires are consumed by mass and torque. EV-specific tires carry stiffer sidewalls and low-rolling-resistance compounds, cost roughly 20 to 30% more, and often wear 15 to 20% faster; the model applies both. Then there is coolant: most EVs run two or three separate thermal loops for the traction battery, the power electronics and the cabin, and those loops have service intervals of five to ten years or 100,000 miles. Brake fluid still absorbs moisture on the same two-to-three-year clock, and because the friction brakes are barely used, EV callipers and rotors are unusually prone to seizing from disuse — several manufacturers now specify an annual brake service purely for lubrication. The 12V battery still exists, still dies at four to six years, and on many EVs its failure immobilizes the car completely.</p>
    <p>Net of all that, expect an EV to cost roughly 40 to 50% of a comparable gasoline vehicle in scheduled maintenance and perhaps 70 to 80% once tires and unscheduled repairs are included. That is an excellent result. It is not zero, and the owner who is told it is zero is the one who discovers at 35,000 miles that the tires are down to the wear bars and nobody warned them.</p>

    <h2 id="warranties">Extended warranties and prepaid maintenance, with the arithmetic shown</h2>
    <p>Both products are sold at the moment you are least able to evaluate them, in a finance office, against a monthly payment that makes the price look small. Neither is a scam. Both are, structurally and by design, priced above their expected loss — that is what it means to sell insurance profitably — and the honest thing to do is show you the sum rather than give you a recommendation.</p>
    <p><strong>A vehicle service contract.</strong> Suppose a five-year, 60,000-mile contract beginning where the factory warranty ends is offered at $2,800 with a $100 per-visit deductible. Administrators price these to a loss ratio somewhere around 50 to 60 percent, meaning that across all buyers the average claims paid are roughly $1,400 to $1,700. Subtract two or three deductibles over the term and the expected recovery falls toward $1,200 to $1,500. You are paying about $2,800 for an expected $1,400 of repairs. The gap is the price of removing variance from your life — which is a genuine service, but it is a $1,400 service and should be judged as one.</p>
    <p><strong>A prepaid maintenance plan.</strong> These are simpler and usually worse, because they cover the predictable part. A typical plan sells four years or 40,000 miles of scheduled service for $1,200. Count the services it actually contains: five oil changes at $95, two cabin and engine filter sets at $70, tire rotations that are frequently free. That is roughly $615 of work at dealer rates and about $450 at an independent. You have paid $1,200 for $615 of service, and you have also bound yourself to a single dealer for four years.</p>
    <p>Two things change the arithmetic honestly. The first is a vehicle with a known, expensive, well-documented failure mode — a particular transmission, a particular turbo, an air suspension system — where the tail risk is fat enough to make the premium fair. The second is your own balance sheet: if an unexpected $4,000 bill would genuinely destabilize you, buying certainty at a 40% markup is rational and nobody should sneer at it. What is never rational is accepting the first price. Both products are negotiable, both are refundable pro rata in most states, and third-party service contracts routinely undercut the finance office by 30 to 40 percent for the same cover. The unglamorous alternative usually wins: put the monthly cost of the contract into a savings account instead, and most owners of mainstream vehicles finish the term with money left over.</p>

    <h2 id="do-better">How to spend less without spending less on the car</h2>
    ${bullets([
      "<strong>Find an independent specialist before you need one.</strong> A good independent shop that knows your marque charges 20 to 30% less than the dealer for identical work and will tell you what can wait. The time to find them is when nothing is wrong.",
      "<strong>Follow the manual's severe-service schedule if you drive short trips.</strong> Most owners drive what manufacturers define as severe service — short journeys, stop-start traffic, cold starts — and then use the normal-service intervals. That gap is where sludge and premature wear come from.",
      "<strong>Do the four easy jobs yourself.</strong> Cabin filter, engine air filter, wiper blades and 12V battery are between five and twenty minutes each with no special tools, and shops mark the parts up two to three times. That is $150 to $250 a year for under an hour of work.",
      "<strong>Buy tires on tread life, not on price.</strong> A $1,050 set rated for 70,000 miles costs 1.5 cents a mile. An $800 set rated for 40,000 costs 2.0 cents. The cheap tires are 33% more expensive, and they usually brake worse.",
      "<strong>Align the wheels after any serious impact.</strong> A pothole that knocks the alignment out will quietly destroy a set of tires in 10,000 miles. The inspection costs less than one tire.",
      "<strong>Never defer a fluid that protects a system worth thousands.</strong> Coolant, transmission fluid, brake fluid and the timing belt are not maintenance items in any meaningful sense. They are scheduled prevention of catastrophic cost.",
      "<strong>Fund a reserve, do not absorb an expense.</strong> Move the per-month figure above into an account you do not touch. In the cheap years the balance builds; in year seven it is already there. This single habit is the difference between an inconvenience and a crisis.",
      "<strong>Get a pre-purchase inspection on anything over four years old.</strong> A $150 to $250 inspection by an independent shop tells you which side of the step-up you are buying into, and routinely finds $1,500 of deferred work you can negotiate away.",
    ])}

    <h2 id="mistakes">Common mistakes</h2>
    ${callout(
      "Judging a repair against the car's value instead of the alternative",
      "A $2,200 gearbox repair on a car worth $4,000 sounds absurd until you price the replacement. A $28,000 substitute loses around $5,600 to depreciation in its first year alone, before the higher insurance premium and the finance charges. Unless the vehicle has a pattern of expensive failures, structural rust, or a safety problem you cannot reliably fix, the repair usually wins by a wide margin. Compare the bill against twelve months of ownership cost on the replacement, not against the resale value of what you already own.",
      "warn"
    )}
    ${bullets([
      "<strong>Using one flat annual figure for the whole ownership period.</strong> Averaged across a decade it overstates the first three years by a factor of two and understates years eight to twelve by a third, so it is wrong in both directions at once and gives false comfort at precisely the moment you need a warning.",
      "<strong>Counting the ownership year instead of the vehicle's age.</strong> The curve tracks the car, not you. Buying a five-year-old vehicle means your first year of ownership is the car's sixth year of cost.",
      "<strong>Treating tires as an occasional surprise.</strong> Tires are the single largest maintenance line for most drivers over a decade, and they are entirely predictable. Divide the set price by its tread life and put it in the monthly budget from day one.",
      "<strong>Believing &ldquo;lifetime fluid&rdquo;.</strong> The phrase means the life of the warranty, not the life of the vehicle. Sealed automatic transmissions serviced at 60,000 to 100,000 miles routinely outlive ones that were never touched.",
      "<strong>Buying the cheapest quote without asking what is in it.</strong> Brake jobs quoted at $180 an axle are pads only on worn rotors. The work will be done again in 15,000 miles, and the second time it will include the rotors.",
      "<strong>Assuming an EV needs nothing.</strong> It needs tires more often, coolant service on schedule, brake fluid on the clock, a 12V battery every few years, and callipers exercised so they do not seize. The bill is smaller. It is not absent.",
    ])}

    <h2 id="reading">How to read this calculator's output</h2>
    <p>The curve is an expected-cost model, not a service schedule. Wear items are amortized smoothly across the miles they last, so the line shows what each year <em>should</em> cost on average rather than what will appear on your card in any given month. Real maintenance arrives in lumps: nothing for eight months, then $1,400 in a fortnight when the tires and the front brakes come due together. The amortized figure is the right number to budget with and the wrong number to expect.</p>
    <p>The repair allowance is a population average, and individual vehicles diverge from it violently. Roughly half of owners will spend less than the allowance in any given year and a small minority will meet the $3,000 year that makes the average what it is. Raise the slider for a model with a known weak point, lower it for a marque with an exceptional record, and treat the output as the center of a wide distribution. What the model is reliably good at is the <em>shape</em> — and the shape is what most maintenance estimates get wrong.</p>
`;

/* -------------------------------------------------------------------- JS -- */

const js = `/* Maintenance Cost Calculator — MyDrivingCost.com */
(function () {
  "use strict";
  var MDC = window.MDC, F = MDC.fmt;

  /* Scheduled service dollars per 10,000 miles at baseline, plus the small
     annual line for filters, wipers, alignment, brake fluid and coolant.
     Wear multipliers are applied to the advanced-assumption values. */
  var POWER = {
    gas:    { svc: 390, misc: 190, tCost: 1.00, tLife: 1.00, bLife: 1.00, rep: 1.00, name: "gas" },
    hybrid: { svc: 360, misc: 180, tCost: 1.02, tLife: 0.96, bLife: 1.60, rep: 0.92, name: "hybrid" },
    ev:     { svc: 150, misc: 130, tCost: 1.25, tLife: 0.85, bLife: 2.00, rep: 0.78, name: "electric" },
    diesel: { svc: 470, misc: 240, tCost: 1.00, tLife: 1.00, bLife: 1.05, rep: 1.18, name: "diesel" }
  };
  var BRAND  = { econ: 0.80, average: 1.00, premium: 1.35, lux: 1.95 };
  var SHOP   = { dealer: 1.30, indep: 1.00, diy: 0.62 };
  var DRIVE  = { gentle: 0.92, mixed: 1.00, hard: 1.18 };
  /* Driving pattern multiplies the LIFE of wear items, so gentle > 1. */
  var WEAR   = { gentle: 1.12, mixed: 1.00, hard: 0.82 };

  var REPAIR_BASE = 1400;   /* dollars a year at the top of the age curve */

  /* Unscheduled repairs by vehicle AGE. A logistic rise centered on year seven,
     damped early by a smooth warranty taper. Near zero years 1-3, steep through
     5-10, flat near its ceiling after 12. */
  function ageCurve(age) {
    var rise = 1 / (1 + Math.exp(-(age - 7) / 2));
    var warranty = 1 - 0.75 / (1 + Math.exp((age - 3.5) / 0.9));
    return rise * warranty;
  }

  function blend(f, w) { return 1 + (f - 1) * w; }

  /* One ownership year at a given vehicle age and odometer reading.
     The odometer matters: the tires and brakes a new car arrives with were
     paid for in the purchase price, so nothing is charged for them until the
     vehicle approaches its first replacement. A used buyer is already past
     that point and pays from day one. */
  function yearCost(age, i, odo) {
    var P = POWER[i.power] || POWER.gas;
    var b = BRAND[i.brand] != null ? BRAND[i.brand] : 1;
    var s = SHOP[i.shop] != null ? SHOP[i.shop] : 1;
    var d = DRIVE[i.driving] != null ? DRIVE[i.driving] : 1;
    var wl = WEAR[i.driving] != null ? WEAR[i.driving] : 1;
    var mi = Math.max(0, i.miles);

    var sched = (mi / 10000) * P.svc * b * s * d;

    /* Tires: parts dominate, so the shop factor barely applies. */
    var tLife = Math.max(5000, i.tireLife * P.tLife * wl);
    var tires = (mi / tLife) * (i.tireCost * P.tCost * blend(b, 0.6) * blend(s, 0.35)) *
      Math.min(1, odo / tLife);

    /* Brakes: front axle at the stated interval, rear at about 1.6x and a
       little cheaper. Regen braking roughly doubles EV pad life. */
    var bLife = Math.max(8000, i.brakeLife * P.bLife * wl);
    var bCost = i.brakeCost * blend(b, 0.7) * s;
    var brakes = (mi / bLife) * bCost * Math.min(1, odo / bLife) +
      (mi / (bLife * 1.6)) * bCost * 0.85 * Math.min(1, odo / (bLife * 1.6));

    var battLife = Math.max(1, i.battYrs);
    var batt = (i.battCost * blend(b, 0.4) * blend(s, 0.5)) / battLife *
      Math.min(1, age / battLife);

    var misc = P.misc * blend(b, 0.8) * s * blend(d, 0.5);

    var repair = REPAIR_BASE * P.rep * b * blend(s, 0.7) * d *
      Math.pow(Math.max(0.2, mi / 12000), 0.6) *
      (i.unscheduledPct / 100) * ageCurve(age);

    var other = batt + misc;
    return {
      age: age,
      sched: sched,
      tires: tires,
      brakes: brakes,
      other: other,
      repair: repair,
      wear: tires + brakes + other,
      total: sched + tires + brakes + other + repair
    };
  }

  var DRIVERS = [
    ["sched", "scheduled service"],
    ["tires", "tires"],
    ["brakes", "brakes"],
    ["other", "battery and consumables"],
    ["repair", "the unscheduled repair allowance"]
  ];

  MDC.calc({
    form: "maint-form",
    defaults: {
      power: "gas", brand: "average", startAge: 0, years: 5, miles: 12000,
      shop: "indep", driving: "mixed",
      tireCost: 900, tireLife: 45000, brakeCost: 650, brakeLife: 55000,
      battCost: 240, battYrs: 5, unscheduledPct: 100
    },
    compute: function (i) {
      var years = Math.max(1, Math.round(i.years));
      var start = Math.max(0, Math.round(i.startAge));
      var rows = [], total = 0;
      var sumSched = 0, sumTyres = 0, sumBrakes = 0, sumOther = 0, sumRepair = 0;
      var worst = null, y;

      for (y = 1; y <= years; y++) {
        var r = yearCost(start + y, i, (start + y - 0.5) * Math.max(0, i.miles));
        r.year = y;
        rows.push(r);
        total += r.total;
        sumSched += r.sched; sumTyres += r.tires; sumBrakes += r.brakes;
        sumOther += r.other; sumRepair += r.repair;
        if (!worst || r.total > worst.total) worst = r;
      }

      /* What made the worst year expensive. */
      var driver = "scheduled service", best = -1, k;
      for (k = 0; k < DRIVERS.length; k++) {
        if (worst[DRIVERS[k][0]] > best) { best = worst[DRIVERS[k][0]]; driver = DRIVERS[k][1]; }
      }

      var mi = Math.max(0, i.miles);
      var a1 = yearCost(1, i, 0.5 * mi).total;
      var a3 = yearCost(3, i, 2.5 * mi).total;
      var a7 = yearCost(7, i, 6.5 * mi).total;
      var totalMiles = Math.max(1, i.miles * years);

      return {
        total: total,
        perYear: total / years,
        perMonth: total / (years * 12),
        perMile: total / totalMiles,
        totalMiles: totalMiles,
        yearsLabel: years + (years === 1 ? " year" : " years"),
        firstYear: rows[0].total,
        lastYear: rows[rows.length - 1].total,
        worstYear: worst.year,
        worstAge: worst.age,
        worstCost: worst.total,
        worstDriver: driver,
        age1Cost: a1,
        age3Cost: a3,
        age7Cost: a7,
        stepUpX: a3 > 0 ? a7 / a3 : 0,
        stepUp1X: a1 > 0 ? a7 / a1 : 0,
        schedTotal: sumSched,
        tireTotal: sumTyres,
        brakeTotal: sumBrakes,
        otherTotal: sumOther,
        repairTotal: sumRepair,
        rows: rows,
        startAge_: start
      };
    },
    onInput: function (i) {
      var set = function (k, v) {
        document.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) {
          if (el.closest(".field")) el.textContent = v;
        });
      };
      var a = Math.round(i.startAge);
      set("startAge", a === 0 ? "Brand new" : (a === 1 ? "1 year old" : a + " years old"));
      set("years", i.years + (i.years === 1 ? " year" : " years"));
      set("miles", F.num(i.miles) + " mi/yr");
      set("unscheduledPct", Math.round(i.unscheduledPct) + "% of typical");
    },
    count: [],
    render: function (res, i) {
      /* ---- the annual cost curve --------------------------------------- */
      var host = document.getElementById("curve-chart");
      if (host) {
        MDC.charts.area(host, res.rows.map(function (r) {
          return { x: r.year, y: r.total };
        }), {
          cssVar: "--c-maint",
          yFmt: function (v) { return F.money(v); },
          xFmt: function (x) { return "Yr " + x; },
          xLabelFmt: function (x) {
            return "Ownership year " + x + " — vehicle age " + (res.startAge_ + x);
          },
          aria: "Annual maintenance and repair cost rising by year of ownership"
        });
      }

      /* ---- year-by-year table ------------------------------------------ */
      var t = document.getElementById("maint-table");
      if (t) {
        var rows = "", n;
        for (n = 0; n < res.rows.length; n++) {
          var r = res.rows[n];
          var hot = r.year === res.worstYear && res.rows.length > 1;
          rows += '<tr>' +
            '<td>' + (hot ? '<strong>Year ' + r.year + '</strong>' : 'Year ' + r.year) + '</td>' +
            '<td class="num">' + r.age + '</td>' +
            '<td class="num">' + F.money(r.sched) + '</td>' +
            '<td class="num">' + F.money(r.wear) + '</td>' +
            '<td class="num">' + F.money(r.repair) + '</td>' +
            '<td class="num">' + (hot ? '<strong>' + F.money(r.total) + '</strong>' : F.money(r.total)) + '</td>' +
            '</tr>';
        }
        t.innerHTML = '<div class="table-wrap"><table class="tbl">' +
          '<thead><tr><th>Ownership year</th><th class="num">Vehicle age</th>' +
          '<th class="num">Scheduled</th><th class="num">Wear items</th>' +
          '<th class="num">Repair allowance</th><th class="num">Total</th></tr></thead>' +
          '<tbody>' + rows + '</tbody></table></div>' +
          '<p class="text-muted" style="font-size:.85rem;margin-top:12px">Wear items combine tires, brakes, the 12V battery, filters, wipers, alignment and fluid services, each amortized across the miles or years it lasts. The repair allowance is an expected value for a vehicle of that age, not a prediction.</p>';
      }

      /* ---- where the money goes ---------------------------------------- */
      var segs = [
        { label: "Scheduled service", value: res.schedTotal, cssVar: "--c-maint" },
        { label: "Tires", value: res.tireTotal, cssVar: "--c-fuel" },
        { label: "Brakes", value: res.brakeTotal, cssVar: "--c-insure" },
        { label: "Unscheduled repairs", value: res.repairTotal, cssVar: "--c-deprec" },
        { label: "Battery and consumables", value: res.otherTotal, cssVar: "--c-tax" }
      ];

      var donut = document.getElementById("donut");
      if (donut) MDC.charts.donut(donut, segs, {
        centerLabel: "Total",
        centerValue: F.money(res.total),
        centerSub: "over " + res.yearsLabel,
        aria: "Maintenance cost split by category"
      });

      var bd = document.getElementById("breakdown");
      if (bd) {
        var months = Math.max(1, res.rows.length * 12);
        bd.innerHTML = segs.map(function (s) {
          var pct = res.total > 0 ? s.value / res.total * 100 : 0;
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + s.cssVar + ')"></span>' +
            '<span class="bd-name">' + s.label + '<small>' + F.money(s.value / months) + ' / month</small></span>' +
            '<span class="bd-pct num">' + Math.round(pct) + '%</span>' +
            '<span class="bd-val num">' + F.money(s.value) + '</span>' +
            '</div>';
        }).join("") +
        '<p class="text-muted" style="font-size:.84rem;margin-top:14px">' +
        (res.repairTotal > res.schedTotal
          ? 'Unscheduled repairs now outweigh scheduled service. Past that crossover the vehicle is no longer expensive so much as unpredictable, and a reserve matters more than a service plan.'
          : 'Scheduled work still outweighs unscheduled repairs, which is the signature of a vehicle in its cheap years. Extend the ownership period and watch the two swap places.') +
        '</p>';
      }
    }
  });
})();
`;

module.exports = {
  slug: "maintenance-cost",
  jsName: "maint",
  formId: "maint-form",
  crumbName: "Maintenance Cost",
  appName: "Car Maintenance Cost Calculator",
  title: "Car Maintenance Cost Calculator — Year by Year | MyDrivingCost",
  desc:
    "Project scheduled service, wear items and unscheduled repairs year by year across your ownership. See the step-up in years five to eight that averages hide.",
  ogTitle: "Car Maintenance Cost Calculator — the year-by-year curve",
  ogDesc:
    "Maintenance is not flat. It is near zero under warranty, steps up hard around years four to seven, and turns unpredictable past ten. See your curve.",
  h1: "Car Maintenance Cost Calculator",
  lead:
    "Maintenance is not a flat annual figure — it is a curve. Set your vehicle, its age and how you'll run it to see what each year of ownership actually costs, which year is the expensive one, and why the step-up almost always lands on the second owner.",
  inputs,
  results,
  floatBar,
  prose,
  js,
  disclaimer:
    "Maintenance figures model typical national costs for mainstream vehicles. Actual spending depends on the specific model, local labor rates, climate, driving pattern and luck. The repair allowance is a population average, and individual vehicles diverge from it substantially in both directions. Not financial advice.",
  sources: ["AAA_YDC", "AAA_YDC_2025", "BLS_CPI"],
  sourceNotes: [
    "Maintenance and repair are modelled as separate lines because they behave differently: scheduled maintenance is predictable and roughly flat, while repair frequency and cost climb with age. Averages also hide a very wide spread &mdash; most years cost less than the average and a few cost far more.",
  ],
  related: [
    ["/calculators/true-cost-to-own/", "True Cost to Own", "Maintenance is one of six categories. See how it ranks against the rest."],
    ["/calculators/cost-per-mile/", "Cost Per Mile", "Reduce every cost of ownership — maintenance included — to one honest number."],
    ["/calculators/depreciation/", "Depreciation", "The cost that makes a $2,200 repair on an old car look cheap by comparison."],
    ["/maintenance/", "Maintenance guide", "Service intervals, what jobs really cost, and when to repair rather than replace."],
  ],
  faq: [
    [
      "How much should I budget for car maintenance per year?",
      "Budget by the vehicle's age rather than by a single figure. A mainstream vehicle under warranty costs roughly $700 to $1,000 a year including amortized tires; the same vehicle between years five and eight costs $1,400 to $2,000; past ten years, $1,900 to $2,600 with high variance. Averaged across a five-year ownership from new, about $1,050 a year is realistic, rising to roughly $2,000 a year if you buy the car at five and keep it to ten. Luxury European marques run close to double throughout, and electric vehicles roughly 65 to 75 percent of a comparable gasoline car once tires are counted.",
    ],
    [
      "Why does car maintenance get more expensive after five years?",
      "Three things happen at once. The bumper-to-bumper warranty expires, so failures that were free now arrive as invoices. The first set of wear items comes due together — tires at around 45,000 miles, front brakes at 55,000, the 12V battery at four to six years. And components engineered to last the warranty period rather than the vehicle's life begin to fail: sensors, bushings, water pumps, suspension components. The result is a step change rather than a gradual rise — typically 70 to 100 percent more at seven years old than at three, and two to three times the first-year figure.",
    ],
    [
      "Are electric cars really cheaper to maintain?",
      "Yes, decisively, but not by as much as the marketing suggests. Electric vehicles delete oil changes, filters, spark plugs, timing belts, exhaust systems and transmission fluid, and regenerative braking roughly doubles brake pad life. Scheduled maintenance typically runs 40 to 50 percent of a comparable gasoline car. Tires offset part of that saving: EVs are heavier and torquier, so tires cost about 25 percent more and wear 15 to 20 percent faster. Add battery coolant service, brake fluid, and a 12V battery that still fails every few years, and the all-in figure lands nearer 70 to 80 percent.",
    ],
    [
      "Is an extended warranty worth it?",
      "Usually not on expected value, because vehicle service contracts are priced to pay out roughly 50 to 60 cents in claims for every dollar of premium. A $2,800 contract has an expected recovery of about $1,400 to $1,700 before deductibles. That gap is the price of removing uncertainty, which is a real service but a costly one. It becomes reasonable when the model has a known expensive failure mode, or when a surprise $4,000 bill would genuinely destabilize your finances. Never accept the first price; third-party contracts routinely undercut a finance office by 30 to 40 percent.",
    ],
    [
      "Are prepaid maintenance plans a good deal?",
      "Rarely, because they cover the predictable part of the curve rather than the risky part. A typical plan sells four years or 40,000 miles of scheduled service for around $1,200, and the work inside it — five oil changes, two filter sets, tire rotations that are often free — amounts to roughly $600 at dealer rates and less at an independent shop. You also bind yourself to one dealer for four years. If the plan is offered free or heavily discounted with the vehicle, take it. If it is priced, do the sum first.",
    ],
    [
      "How much do tires cost per mile?",
      "Divide the fitted price of a set by its tread life. A $900 set rated for 45,000 miles is exactly 2.0 cents a mile, or $240 a year at 12,000 miles. Longer-life touring tires frequently work out cheaper despite a higher sticker price: a $1,050 set rated for 70,000 miles is 1.5 cents a mile. Larger wheel diameters raise cost sharply, and electric vehicles consume tires faster because of their mass. Over a decade, tires are the single largest maintenance line for most drivers.",
    ],
    [
      "Which maintenance can I safely delay?",
      "Delay only what is cosmetic or self-limiting. A cabin air filter, wiper blades, a detailing service and even a tire rotation can slip without lasting harm. Four things cannot: coolant, which turns acidic and destroys head gaskets and radiators; the timing belt, which on an interference engine destroys the valvetrain when it snaps; transmission fluid, which takes the gearbox with it when it burns; and brake fluid, which absorbs moisture on a calendar rather than a mileage clock and corrodes ABS components. Each of those turns a small bill into a vehicle-ending one.",
    ],
    [
      "Does a dealer cost more than an independent shop?",
      "Typically 20 to 30 percent more for identical work, driven almost entirely by labor rates and parts markup rather than by quality. Dealers are worth using for warranty work, recalls, software updates and diagnosis of model-specific faults where factory tooling genuinely helps. For routine servicing, brakes, tires and general repair, a good independent specialist familiar with your marque delivers the same outcome for less, and is usually more willing to tell you what can wait. Find one before you need one.",
    ],
  ],
};
