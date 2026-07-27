const P = require("../page");
const { table, callout, bullets, calcTiles, sources, cite } = P;

const body = `
<section class="section-tight">
  <div class="container container-narrow prose">

    <h2>Insurance is a bill you can renegotiate every six months</h2>
    <p>Full-coverage auto insurance in the United States averages roughly <strong>$208 a month — about $2,496 a year</strong>. It is the third-largest ownership cost for most drivers, behind depreciation and, depending on the vehicle, fuel. It is also the only major cost that a single afternoon of work can permanently reduce.</p>
    <p>Depreciation is set by the market. Fuel is set by your commute. Premiums are set by a pricing model that different carriers run differently — which means the same driver, the same car and the same ZIP code can produce quotes that differ by hundreds of dollars a year with no change in coverage. Shopping is not a hack. It is the mechanism the market is built on.</p>

    <div class="grid grid-3" style="margin:26px 0 6px">
      <div class="stat-tile"><div class="k">US average, full coverage</div><div class="v">$2,496</div><div class="d">per year (~$208/month)</div></div>
      <div class="stat-tile"><div class="k">Most expensive state</div><div class="v">$335</div><div class="d">per month — Nevada</div></div>
      <div class="stat-tile"><div class="k">Least expensive state</div><div class="v">$128</div><div class="d">per month — Vermont</div></div>
    </div>
    <p class="text-muted" style="font-size:.88rem;margin-top:10px">A spread of more than 160% between the highest and lowest states — for identical coverage. Geography is the single largest input you don't control.</p>

    <h2>What you're actually buying</h2>
    <p>"Full coverage" is not a product. It's shorthand for a bundle, and understanding the pieces is what lets you cut cost without cutting protection.</p>

    ${table(
      ["Coverage", "What it pays for", "Who needs it"],
      [
        ["<strong>Bodily injury liability</strong>", "Injuries you cause to other people", "Legally required in nearly every state — and the coverage most people under-buy"],
        ["<strong>Property damage liability</strong>", "Damage you cause to others' property", "Legally required nearly everywhere"],
        ["<strong>Collision</strong>", "Damage to your car in a crash, regardless of fault", "Required by any lender or lessor; optional once the car's value is low"],
        ["<strong>Comprehensive</strong>", "Theft, weather, fire, glass, animal strikes", "Required by lenders; often cheap enough to keep regardless"],
        ["<strong>Uninsured / underinsured motorist</strong>", "Your injuries when the at-fault driver has no or thin coverage", "Highly recommended everywhere; about 1 in 7 US drivers is uninsured"],
        ["<strong>Medical payments / PIP</strong>", "Medical bills for you and passengers, no-fault", "Required in no-fault states; valuable if your health plan has a high deductible"],
        ["<strong>Gap insurance</strong>", "The difference between what you owe and what the car is worth", "Only if you're underwater on the loan or leasing"],
      ]
    )}

    ${callout(
      "The most common expensive mistake",
      `<p style="margin:0">People buy state-minimum liability to save money, then discover the limits are wildly inadequate. Many state minimums haven't been raised in decades and can be exhausted by a single hospital admission — after which the injured party's attorney comes for your assets. Raising liability limits from a minimum to $100k/$300k/$100k usually costs far less than people expect, often $10–25 a month, because severe claims are rare. If you're going to economize somewhere, economize on collision coverage for an old car, not on liability.</p>`,
      "warn"
    )}

    <h2>What moves your premium</h2>

    <h3>Things you can't change quickly</h3>
    ${bullets([
      "<strong>Where you live.</strong> Rated at the ZIP code level, driven by claim frequency, repair costs, theft rates, litigation climate and weather exposure. Nevada averages $335/month; Vermont averages $128. Moving across a metro line can change your premium materially.",
      "<strong>Your age and how long you've been licensed.</strong> Rates fall steeply through the twenties and flatten in the thirties, then creep up again in the seventies.",
      "<strong>Your driving record.</strong> A speeding ticket raises premiums about 26% on average. An at-fault accident, about 47%. A DUI, 80% or more — and it stays on your record for years.",
      "<strong>Your credit-based insurance score</strong>, in most states. California, Hawaii, Massachusetts and Michigan restrict or ban its use; elsewhere it's one of the strongest predictors carriers use.",
    ])}

    <h3>Things you choose</h3>
    ${bullets([
      "<strong>The vehicle.</strong> The single biggest controllable factor, and it's decided at purchase. Insurers price on repair cost, parts availability, theft rate and the claim history of that exact model.",
      "<strong>Your deductible.</strong> Moving from $500 to $1,000 typically cuts collision and comprehensive premiums by 10–20% — but only take it if you could pay the higher deductible tomorrow without borrowing.",
      "<strong>Annual mileage.</strong> Low-mileage drivers are cheaper to insure. If you've stopped commuting, tell your carrier; many drivers are still rated on a mileage figure from years ago.",
      "<strong>Carrier.</strong> Rate filings move independently — recent annual changes across major carriers ranged from about −4% to more than +21%. The company that was cheapest for you three years ago may not be now.",
    ])}

    <h2>Vehicle choice: the number to check before you buy</h2>
    <p>Insurance cost varies more by vehicle than most buyers realize, and it compounds — you pay it every year you own the car. Among popular new vehicles, the most expensive to insure run around <strong>$354 a month</strong>, while mainstream compact crossovers sit closer to <strong>$214 a month</strong>. That $140-per-month gap is <strong>$1,680 a year</strong>, or <strong>$8,400 over five years</strong> — enough to change which car is actually the cheaper purchase.</p>
    <p>What drives a vehicle into the expensive tier:</p>
    ${bullets([
      "<strong>High repair cost.</strong> Aluminum body panels, adhesive-bonded structures, sensor-laden bumpers and one-piece castings all raise the cost of a moderate collision. Advanced driver-assistance sensors have to be recalibrated after body work.",
      "<strong>Battery packs.</strong> On many EVs a structural pack means a moderate rear impact can total the car. Insurers price for that, which is a major reason EV premiums run above comparable combustion vehicles.",
      "<strong>Performance.</strong> Power-to-weight ratio correlates with claim severity. Insurers have decades of data on this and they use it.",
      "<strong>Theft rate.</strong> Certain models are targeted heavily, and comprehensive premiums in affected regions reflect it.",
    ])}
    <p>Get a real quote on any vehicle before you sign for it. Not an estimate — an actual quote with your name, your ZIP and your record. It takes ten minutes and it occasionally changes the decision entirely.</p>

    <h2>Nine ways to cut your premium that actually work</h2>
    ${table(
      ["Action", "Typical saving", "Notes"],
      [
        ["Shop three or more carriers", "Highly variable, often 10–30%", "The highest-value hour you can spend. Rate filings diverge constantly."],
        ["Bundle home or renters with auto", "10–24%", "Verify the bundled total beats two separate best-in-market policies — sometimes it doesn't."],
        ["Raise deductible $500 → $1,000", "10–20% on collision &amp; comp", "Only with the cash on hand to cover it."],
        ["Maintain a claims-free record", "10–24%", "Consider paying small damage out of pocket rather than claiming it."],
        ["Defensive driving course", "5–15%", "Availability and discount vary by state and carrier."],
        ["Pay in full, paperless, autopay", "3–10% combined", "Small, stackable and effectively free."],
        ["Drop collision on a low-value car", "Varies, can be large", "Rule of thumb: consider it when the annual premium exceeds ~10% of the car's value."],
        ["Correct your annual mileage", "Varies", "Especially after a job change or a move to remote work."],
        ["Telematics / usage-based program", "Up to 30% for careful drivers", "Check whether hard braking and night driving are scored — some programs raise rates."],
      ],
      [1]
    )}

    ${callout(
      "When to drop collision coverage",
      `<p style="margin:0">Collision pays out at most the vehicle's actual cash value, minus your deductible. On a car worth $3,500 with a $1,000 deductible, the maximum realistic payout is $2,500. If collision and comprehensive together cost $700 a year, you're spending 28% of the maximum benefit annually to protect it. Most people should self-insure at that point — but only if losing the car outright wouldn't be a crisis.</p>`
    )}

    <h2>How claims actually affect you</h2>
    <p>The surcharge is only part of the cost. Filing a claim can also cost you a claims-free discount you'd been earning for years, and the effect typically persists for three to five years depending on the state and carrier. Before filing a small claim, do this arithmetic:</p>
    ${bullets([
      "Estimate the payout: repair cost minus your deductible.",
      "Estimate the surcharge: your annual premium × the expected increase (about 47% on average for an at-fault accident) × the number of years it applies.",
      "Add the value of any claims-free discount you'd forfeit.",
      "If the second and third numbers together exceed the first, pay out of pocket.",
    ])}
    <p>A $1,800 repair with a $1,000 deductible pays you $800. If your premium is $2,400 and rises 47% for three years, that's roughly $3,400 in surcharges. The claim costs you $2,600 net. This is why deductible choice and claim behavior are linked decisions, not separate ones.</p>

    <h2>Reading a quote without getting fooled</h2>
    <p>Carriers compete on the headline number, and the easiest way to lower a headline number is to quietly lower coverage. When you compare quotes, confirm every one of these matches across all of them:</p>
    ${bullets([
      "Bodily injury limits per person and per accident, and property damage limit.",
      "Uninsured and underinsured motorist limits — often silently dropped to minimum.",
      "Collision and comprehensive deductibles.",
      "Whether rental reimbursement and roadside assistance are included or added.",
      "Term length — a six-month premium looks half the size of a twelve-month one.",
      "Whether the quoted rate assumes autopay, paperless and paid-in-full discounts you haven't agreed to yet.",
    ])}
    <p>Then compare annual totals for identical coverage. Anything else is comparing two different products.</p>

    ${sources([
      cite("VP_SOAI", "US average full coverage $208/month; Nevada highest at $335/month, Vermont lowest at $128/month; violation surcharges of roughly 26% (speeding), 47% (at-fault accident) and 80%+ (DUI); discount ranges of 10\u201324% for bundling, claims-free and defensive driving."),
      cite("INSURIFY_AVG", "A second national average on different data, restated every month."),
      cite("IRC_UNINSURED", "Roughly one in seven US drivers carries no insurance at all \u2014 which is the risk uninsured-motorist coverage exists to price."),
      "State departments of insurance publish minimum liability requirements and the rules on credit-based insurance scoring, which differ by state.",
      "Vehicle-level premium figures reflect published averages for popular new models; your own quote will depend on your record, ZIP code and credit.",
    ])}

  </div>
</section>

<section class="section-tight bg-subtle">
  <div class="container">
    <div class="section-head"><span class="eyebrow">Run the numbers</span><h2>Insurance &amp; ownership calculators</h2><p>Insurance never travels alone. See it alongside the other five cost categories.</p></div>
    ${calcTiles([
      ["/calculators/insurance-estimator/", "shield", "Insurance Estimator", "Ballpark an annual premium from vehicle type, driver profile and coverage level."],
      ["/calculators/true-cost-to-own/", "chart", "True Cost to Own", "Insurance in context — with depreciation, fuel, maintenance, financing and taxes.", true],
      ["/calculators/cost-per-mile/", "route", "Cost Per Mile", "Convert every fixed cost, including insurance, into a per-mile number.", true],
      ["/calculators/monthly-budget/", "dollar", "Transportation Budget", "What your whole transportation life costs each month, not just the car payment."],
    ])}
  </div>
</section>
`;

module.exports = {
  url: "/insurance/",
  title: "Car Insurance Costs — What Drives Your Premium | MyDrivingCost",
  desc:
    "US full coverage averages $2,496 a year and varies by more than 160% between states. What you are buying, what moves the price, and which levers work.",
  eyebrow: "Insurance",
  h1: "Car insurance: what it costs and what actually moves the number",
  h1short: "Insurance",
  lead:
    "Full coverage averages about $2,496 a year in the US — and varies more than 160% between states for identical protection. Here's what you're buying, what drives the price, and which levers genuinely work.",
  crumb: [],
  heroStats: [
    ["US average", "$2,496", "per year, full coverage"],
    ["At-fault accident", "+47%", "typical premium increase"],
    ["Bundling discount", "10–24%", "home or renters with auto"],
  ],
  heroCta: [
    ["Estimate your premium", "/calculators/insurance-estimator/", "btn-primary"],
    ["See total ownership cost", "/calculators/true-cost-to-own/", "btn-ghost"],
  ],
  body,
  faqTitle: "Insurance questions",
  faq: [
    [
      "How much is car insurance per month on average?",
      "Full coverage averages about $208 a month, or roughly $2,496 a year, across the United States. That national figure hides an enormous spread: Nevada averages about $335 a month while Vermont averages about $128, and within a single state your ZIP code, vehicle, record and credit-based insurance score can move you well outside those bounds in either direction.",
    ],
    [
      "Why is my insurance so much higher than the average?",
      "Usually some combination of four things: an expensive-to-repair or frequently-stolen vehicle, a high-claim ZIP code, a recent violation or at-fault accident, and a credit-based insurance score below the range your carrier rewards. Age matters too — drivers in their late teens and early twenties pay multiples of the average. Getting quotes from three other carriers is the fastest way to find out whether the number is the market or just your carrier.",
    ],
    [
      "Should I raise my deductible to save money?",
      "Raising a collision and comprehensive deductible from $500 to $1,000 typically cuts those premiums 10–20%. Take it only if you could write a $1,000 check tomorrow without borrowing. The deductible is a self-insurance decision: you're accepting a known, capped risk in exchange for a guaranteed annual saving, and it only works if the risk is genuinely affordable to you.",
    ],
    [
      "When should I drop collision and comprehensive?",
      "A common rule of thumb is to consider dropping collision when the annual premium exceeds about 10% of the vehicle's value, because the maximum payout is the car's actual cash value minus your deductible. On a $3,500 car with a $1,000 deductible, you're protecting at most $2,500. Just make sure that losing the car outright wouldn't leave you unable to get to work.",
    ],
    [
      "Does one speeding ticket really raise my rates?",
      "On average a speeding ticket raises premiums about 26%, and the surcharge typically persists for three years. An at-fault accident averages about 47%, and a DUI 80% or more with a much longer tail. In many states a defensive-driving course can offset a first minor violation, and some carriers offer accident forgiveness — worth asking about before you need it rather than after.",
    ],
    [
      "Are EVs more expensive to insure?",
      "Generally yes, often noticeably so. The reasons are structural rather than behavioral: battery packs are expensive and, in many designs, integrated into the vehicle structure so that a moderate impact can total the car; specialized repair procedures limit which shops can do the work; and sensor-dense bodywork requires recalibration after collision repair. Get a quote on the specific model before you buy — the gap between EVs is as large as the gap to combustion cars.",
    ],
    [
      "Is it worth filing a claim for minor damage?",
      "Often not. Compare the payout — repair cost minus deductible — against the surcharge, which is your annual premium multiplied by the expected increase and by the number of years it applies, plus any claims-free discount you'd forfeit. A $1,800 repair on a $1,000 deductible pays you $800; a 47% surcharge on a $2,400 premium for three years costs about $3,400. The math frequently favors paying out of pocket for small damage.",
    ],
    [
      "Does shopping around actually save money?",
      "It's the highest-value hour available to most drivers. Carriers file rate changes independently and constantly — in a recent year the range across major insurers ran from roughly a 4% decrease to a 21% increase. That means the relative ranking of carriers for your exact profile changes over time, and the company that was cheapest when you last shopped may no longer be. Re-quote at every renewal, and always compare identical coverage limits rather than headline prices.",
    ],
  ],
  cta: {
    h2: "See insurance in context",
    p: "A premium only means something next to the other five costs of owning your car. Model all of them together in under two minutes.",
    btn: ["Open True Cost to Own", "/calculators/true-cost-to-own/"],
  },
};
