const P = require("../page");
const { table, callout, bullets, calcTiles, sources, cite } = P;

const body = `
<section class="section-tight">
  <div class="container container-narrow prose">

    <h2>Maintenance is small, until it isn't</h2>
    <p>For the first three or four years of a vehicle's life, maintenance is the cheapest major ownership cost — oil, filters, tire rotations, cabin air, wipers. A few hundred dollars a year. Then wear items start reaching the end of their service lives more or less simultaneously, and the annual figure can quadruple.</p>
    <p>The mistake isn't spending the money. It's failing to expect it. A driver who budgets $40 a month for maintenance on a new car and never adjusts that number will be blindsided in year six by a $1,900 year — and blindsided people make bad decisions, like trading a perfectly good car because one repair felt like the beginning of the end.</p>

    <div class="grid grid-3" style="margin:26px 0 6px">
      <div class="stat-tile"><div class="k">Years 1–3</div><div class="v">$400–700</div><div class="d">per year, mostly scheduled service</div></div>
      <div class="stat-tile"><div class="k">Years 4–7</div><div class="v">$900–1,600</div><div class="d">per year, wear items arrive</div></div>
      <div class="stat-tile"><div class="k">Years 8+</div><div class="v">$1,300–2,400</div><div class="d">per year, with high variance</div></div>
    </div>
    <p class="text-muted" style="font-size:.88rem;margin-top:10px">Mainstream vehicle, ~12,000 miles/year, dealer or independent shop labor. Luxury and performance vehicles typically run 1.5–2.5× these figures.</p>

    <h2>What you'll actually pay for, and when</h2>
    <p>Most of a vehicle's maintenance cost is predictable, because most of it is governed by wear rates that don't vary much. Here's the shape of it.</p>

    ${table(
      ["Item", "Typical interval", "Typical cost", "Notes"],
      [
        ["Oil &amp; filter change", "5,000–10,000 mi", "$60–140", "Follow the manual, not the sticker on the windshield"],
        ["Tire rotation", "5,000–8,000 mi", "$0–50", "Often free where the tires were bought"],
        ["Cabin &amp; engine air filters", "15,000–30,000 mi", "$30–90", "Frequently a DIY job in under ten minutes"],
        ["Brake pads (per axle)", "30,000–70,000 mi", "$180–400", "City driving wears them far faster than highway"],
        ["Brake rotors (per axle)", "60,000–100,000 mi", "$300–700", "Often replaced with pads on the second service"],
        ["Tires (set of four)", "40,000–70,000 mi", "$600–1,400", "Larger wheels cost dramatically more"],
        ["Battery (12V)", "4–6 years", "$180–380", "Shorter life in hot climates"],
        ["Brake fluid flush", "2–3 years", "$100–180", "Time-based, not mileage-based"],
        ["Coolant flush", "60,000–150,000 mi", "$120–250", "Interval varies hugely by coolant type"],
        ["Transmission fluid", "60,000–100,000 mi", "$180–450", "\"Lifetime fluid\" claims are best ignored"],
        ["Spark plugs", "60,000–100,000 mi", "$150–500", "Cost depends heavily on engine access"],
        ["Timing belt (if fitted)", "90,000–105,000 mi", "$600–1,200", "Non-negotiable on interference engines"],
        ["Alignment", "As needed / 2 yrs", "$90–180", "Cheap insurance for an expensive set of tires"],
      ],
      [2]
    )}

    ${callout(
      "The two intervals people get wrong",
      `<p style="margin:0"><strong>Oil changes</strong> — many drivers still run a 3,000-mile interval that modern synthetic oils and engines made obsolete decades ago. Following the manufacturer's schedule instead can save several hundred dollars over a few years with no downside. <strong>Brake fluid</strong> — it's hygroscopic, absorbing moisture from the air whether you drive or not, which lowers its boiling point and corrodes expensive hydraulic components from the inside. It's on a time interval, and it's the service most commonly skipped.</p>`
    )}

    <h2>Maintenance versus repair</h2>
    <p>These are different budget lines and confusing them causes real financial damage.</p>
    ${bullets([
      "<strong>Maintenance</strong> is scheduled, predictable and preventive. You know it's coming, roughly when, and roughly what it costs. It should be a monthly line in your budget.",
      "<strong>Repair</strong> is unscheduled — a failed component, an unexpected leak, a warning light. It is not predictable per event, but it is highly predictable in aggregate: the probability rises with age and mileage.",
    ])}
    <p>The practical implication is that you should treat repair as a reserve, not an expense. Set aside a fixed amount monthly into an account you don't touch. On a vehicle past its warranty, <strong>$75–125 a month</strong> is a reasonable starting reserve for a mainstream vehicle, more for luxury or high-performance cars. When nothing breaks, the balance grows and becomes your down payment on the next car. When something does break, it's an inconvenience rather than a crisis.</p>

    <h2>The cost curve by vehicle age</h2>
    <p>Repair probability compounds with age in a way that's easy to underestimate. Here's a realistic profile for a mainstream vehicle driven about 12,000 miles a year.</p>

    ${table(
      ["Age", "Scheduled maintenance", "Expected repairs", "Total per year"],
      [
        ["Years 1–3", "$400–700", "Near zero (warranty)", "$400–700"],
        ["Years 4–5", "$700–1,100", "$150–400", "$850–1,500"],
        ["Years 6–8", "$800–1,300", "$400–900", "$1,200–2,200"],
        ["Years 9–12", "$700–1,200", "$600–1,400", "$1,300–2,600"],
        ["Years 13+", "$600–1,100", "$800–2,000", "$1,400–3,100"],
      ],
      [1, 2, 3]
    )}
    <p>Notice that scheduled maintenance actually falls slightly on very old cars — many of the big scheduled services have already been done — while repair costs keep climbing. The total is still, in almost every case, dramatically less than the depreciation on a newer replacement. A $2,500 repair year on a paid-off car is cheaper than a $7,000 depreciation year on a new one. That comparison, not the size of the repair bill, is how you should decide whether to keep the car.</p>

    ${callout(
      "The honest \"is it worth fixing?\" test",
      `<p style="margin:0">Compare the repair cost against <em>twelve months of ownership cost on the replacement</em> — depreciation, insurance difference and payment interest included — not against the car's resale value. A $2,200 transmission repair on a car worth $4,000 sounds absurd until you price the alternative: a $28,000 replacement that loses $5,000 to depreciation in year one alone, plus higher insurance and a new payment. The repair usually wins unless the vehicle has a pattern of failures or a safety-critical structural problem.</p>`
    )}

    <h2>What changes the number most</h2>

    <h3>Brand and parts economics</h3>
    <p>Two vehicles of the same size and age can differ by a factor of two in maintenance cost, driven mostly by parts prices, labor times and how many specialists can do the work. German luxury vehicles are the classic example: excellent cars, engineered with tight service access, using expensive proprietary parts. Budget accordingly rather than being surprised.</p>

    <h3>Drivetrain</h3>
    ${bullets([
      "<strong>Electric vehicles</strong> eliminate oil changes, spark plugs, timing belts, exhaust systems and transmission service, and regenerative braking dramatically extends brake life. Expect roughly 30–45% lower routine maintenance. Tires are the notable exception — EVs are heavy and torquey, and often wear tires faster.",
      "<strong>Hybrids</strong> sit between the two. Engines run less and brakes last much longer, but you still have oil changes and a conventional drivetrain to service.",
      "<strong>Diesels</strong> have longer service intervals but higher per-service costs, and emissions hardware — DPF, EGR, DEF systems — can be very expensive out of warranty.",
      "<strong>Turbocharged gasoline engines</strong> are more sensitive to oil quality and change intervals than naturally aspirated ones. Skipping oil changes on a turbo engine is genuinely expensive.",
    ])}

    <h3>How and where you drive</h3>
    <p>Manufacturers publish a \"severe service\" schedule and most drivers qualify for it without realizing: frequent short trips, stop-and-go traffic, extreme heat or cold, towing, or dusty roads. Severe-service intervals are shorter and the reason isn't marketing — those conditions genuinely accelerate wear. City driving in particular destroys brakes at several times the highway rate. Winter road salt is the other big one, and undercarriage washes in salt regions are among the highest-return maintenance dollars you can spend.</p>

    <h3>Where you get the work done</h3>
    <p>Dealer service typically runs 20–40% above a competent independent shop on the same job, and independents often use identical parts. Dealers are worth it for warranty work, recalls, software updates and genuinely model-specific problems. For routine service on an out-of-warranty car, a good independent specialist is usually the better value. And in the US, having routine service done elsewhere does not void your factory warranty — keep receipts and you're covered.</p>

    <h2>Extended warranties and service contracts</h2>
    <p>Vehicle service contracts are insurance products, and like all insurance they're priced to be profitable for the seller. Most buyers pay more in premium than they receive in claims — that's the business model, not a scandal. That doesn't make them always wrong, but it does mean you should buy one for a specific reason rather than a vague fear.</p>
    ${bullets([
      "<strong>Reasonable to consider</strong> when the vehicle has a known expensive failure mode, when out-of-warranty repair costs on that model are genuinely severe, or when a $4,000 surprise would be financially destabilizing for you.",
      "<strong>Usually a poor buy</strong> on a mainstream vehicle with a strong reliability record, when you have a healthy repair reserve, or when the contract is sold at a dealer with a price that turns out to be highly negotiable.",
      "<strong>Always read the exclusions.</strong> Wear items, maintenance, and \"pre-existing conditions\" are commonly excluded, and some contracts require dealer service and documented maintenance to stay valid.",
      "<strong>The price is negotiable</strong> and the coverage is available from third parties. Never accept the first number in the finance office.",
    ])}
    <p>An honest alternative: take the money the contract would have cost, put it in the repair reserve, and self-insure. On most mainstream vehicles you'll come out ahead — and you keep the balance if nothing goes wrong.</p>

    <h2>The maintenance that pays for itself</h2>
    <p>A short list, in rough order of return on money spent.</p>
    ${bullets([
      "<strong>Tire pressure, checked monthly.</strong> Free. Extends tire life, improves wet braking, marginally improves fuel economy.",
      "<strong>Oil changes on schedule with the specified oil.</strong> The single cheapest way to avoid the single most expensive repair.",
      "<strong>Alignment after any hard impact.</strong> A $120 alignment protects a $1,000 set of tires.",
      "<strong>Brake fluid and coolant on their time intervals.</strong> Both prevent corrosion damage that costs many multiples of the service.",
      "<strong>Washing the undercarriage in salt regions.</strong> Rust is the most common reason a mechanically sound car becomes uneconomical to keep.",
      "<strong>Fixing small leaks immediately.</strong> Nearly every catastrophic engine or transmission failure begins as a cheap leak that was ignored.",
      "<strong>Keeping every receipt.</strong> Documented service history measurably raises resale value and shortens time to sell.",
    ])}

    ${sources([
      cite("AAA_YDC_2025", "Maintenance, repair and tire costs reported as a combined per-mile figure for new vehicles across the first five years of ownership."),
      cite("BLS_CPI", "The motor vehicle maintenance and repair series, for how these costs have moved over time rather than what they are today."),
      "Interval and cost ranges reflect published manufacturer maintenance schedules and typical US shop labor rates; your vehicle's manual is always the authority for your specific car.",
      "Federal law in the US (the Magnuson\u2013Moss Warranty Act) prevents a manufacturer from voiding your warranty solely because routine service was performed elsewhere, provided the work meets specification and is documented.",
      "Repair-cost ranges are planning baselines. Regional labor rates, parts availability and vehicle-specific design vary these substantially.",
    ])}

  </div>
</section>

<section class="section-tight bg-subtle">
  <div class="container">
    <div class="section-head"><span class="eyebrow">Run the numbers</span><h2>Maintenance calculators</h2><p>Turn a vague worry into a monthly line item you can plan around.</p></div>
    ${calcTiles([
      ["/calculators/maintenance-cost/", "wrench", "Maintenance Cost Calculator", "Projected service and repair cost by vehicle age, mileage and class."],
      ["/calculators/true-cost-to-own/", "chart", "True Cost to Own", "Maintenance in context with depreciation, fuel, insurance and financing.", true],
      ["/calculators/cost-per-mile/", "route", "Cost Per Mile", "What every mile costs once wear and service are counted properly.", true],
      ["/calculators/ten-year-cost/", "clock", "Ten-Year Cost", "The long-hold case: where keeping a car stops being cheap."],
    ])}
  </div>
</section>
`;

module.exports = {
  url: "/maintenance/",
  title: "Car Maintenance Costs by Age and Mileage | MyDrivingCost",
  desc:
    "What maintenance and repairs cost as a car ages, which services matter, how much to reserve each month, and whether extended warranties earn their price.",
  eyebrow: "Maintenance",
  h1: "Maintenance &amp; repair: what it costs as a car ages",
  h1short: "Maintenance",
  lead:
    "Scheduled service is cheap and predictable. Repairs are neither — but in aggregate they're forecastable, and budgeting for them properly is what keeps a good car from being traded for a bad reason.",
  crumb: [],
  heroStats: [
    ["Years 1–3", "$400–700", "per year, mostly scheduled"],
    ["Years 6–8", "$1,200–2,200", "per year, wear items due"],
    ["EV routine service", "30–45%", "lower than combustion"],
  ],
  heroCta: [
    ["Estimate maintenance cost", "/calculators/maintenance-cost/", "btn-primary"],
    ["See total cost to own", "/calculators/true-cost-to-own/", "btn-ghost"],
  ],
  body,
  faqTitle: "Maintenance questions",
  faq: [
    [
      "How much should I budget for car maintenance per month?",
      "For a mainstream vehicle under warranty, roughly $40–60 a month covers scheduled service. Once the warranty ends, raise it to $75–125 a month to cover both maintenance and a repair reserve, and more for luxury or high-performance vehicles. The key is treating repairs as a reserve you fund monthly rather than an expense you absorb when it happens — that's the difference between an inconvenience and a crisis.",
    ],
    [
      "Do I really need to change my oil every 3,000 miles?",
      "Almost certainly not. That interval predates modern synthetic oils and engine designs. Most current vehicles specify somewhere between 5,000 and 10,000 miles, and many have an oil-life monitor that measures actual operating conditions. Follow the owner's manual rather than the sticker a quick-lube shop put on your windshield — over a few years the difference is several hundred dollars for no benefit.",
    ],
    [
      "Are electric vehicles cheaper to maintain?",
      "Routine maintenance typically runs 30–45% lower. There's no oil to change, no spark plugs, no timing belt, no exhaust system and no transmission service, and regenerative braking means brake pads often last far longer than on a comparable gas car. The offsets are tires, which wear faster on heavy, torquey vehicles, and out-of-warranty repairs, which can be expensive because fewer shops are equipped to do them.",
    ],
    [
      "Is an extended warranty worth buying?",
      "Most buyers pay more in premium than they receive in claims — that's how the product is priced. It can still make sense if the vehicle has a known expensive failure mode, or if a $4,000 surprise would genuinely destabilize your finances. If you have a healthy repair reserve and a mainstream vehicle with a good reliability record, self-insuring usually wins. Whatever you decide, the price is negotiable and third-party options exist, so never take the first number offered in a finance office.",
    ],
    [
      "Will using an independent shop void my warranty?",
      "No. In the US, federal warranty law prevents a manufacturer from voiding your warranty solely because routine service was performed somewhere other than a dealership. You do need the work to meet the manufacturer's specification and you need documentation — keep the receipts and note the parts and fluids used. Recall work and warranty repairs themselves still have to go through a franchised dealer.",
    ],
    [
      "When is a repair not worth doing?",
      "Compare the repair against twelve months of ownership cost on the replacement vehicle — depreciation, insurance difference and finance charges included — rather than against the old car's resale value. A $2,200 repair on a $4,000 car often still beats a replacement that loses $5,000 to depreciation in its first year. Walk away when the vehicle has a pattern of expensive failures, structural rust, or a safety-critical problem you can't fix reliably.",
    ],
    [
      "What is severe service and does it apply to me?",
      "It's the shorter maintenance schedule manufacturers publish for demanding conditions: frequent short trips, extended stop-and-go traffic, extreme heat or cold, towing, or dusty and unpaved roads. Far more drivers qualify than realize it — a five-mile urban commute is textbook severe service. If your driving matches the description, follow the severe schedule; the shorter intervals reflect genuinely faster wear, not upselling.",
    ],
    [
      "Which maintenance is most often skipped?",
      "Brake fluid and coolant, because both are time-based rather than mileage-based and neither produces symptoms until something expensive has already corroded. Transmission fluid is a close third, thanks to \"lifetime fluid\" claims that are optimistic in most real-world use. All three are cheap services that prevent multi-thousand-dollar repairs.",
    ],
  ],
  cta: {
    h2: "Budget maintenance like it's a bill, because it is",
    p: "Put your vehicle's age, mileage and class into the calculator and get a monthly number you can actually plan around.",
    btn: ["Open True Cost to Own", "/calculators/true-cost-to-own/"],
  },
};
