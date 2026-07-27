const P = require("../page");
const { table, callout, bullets, calcTiles, sources, cite } = P;

const body = `
<section class="section-tight">
  <div class="container container-narrow prose">

    <h2>Almost every car-buying mistake is the same mistake</h2>
    <p>It's shopping by monthly payment. The payment is the one number a seller can bend to almost any shape — stretch the term, adjust the down payment, roll in negative equity, move money between the trade allowance and the price — while the total you pay quietly grows by thousands. A dealer who can hit any payment you name has not given you a discount. They've given you a longer loan.</p>
    <p>Everything on this page comes back to one discipline: <strong>negotiate the out-the-door price, then arrange the financing, then decide about the trade-in — as three separate transactions</strong>. Bundled together they're impossible to evaluate. Separated, each one is simple.</p>

    <div class="grid grid-3" style="margin:26px 0 6px">
      <div class="stat-tile"><div class="k">Finance charges</div><div class="v">$1,131</div><div class="d">per year, average new vehicle (AAA)</div></div>
      <div class="stat-tile"><div class="k">Recommended term</div><div class="v">≤ 60 mo</div><div class="d">48 if you can manage it</div></div>
      <div class="stat-tile"><div class="k">Recommended down</div><div class="v">20%</div><div class="d">to stay above water on the loan</div></div>
    </div>

    <h2>New, used, or nearly new?</h2>
    <p>This is the highest-stakes decision in the whole process, because it determines how much <a href="/depreciation/">depreciation</a> you personally absorb.</p>

    ${table(
      ["", "New", "Certified pre-owned", "Used (3–5 yrs)", "Used (7+ yrs)"],
      [
        ["Depreciation you absorb", "The steepest years", "Moderate", "Gentler part of the curve", "Very little left to lose"],
        ["Typical loan rate", "Lowest, incentives available", "Slightly higher", "Higher", "Highest"],
        ["Warranty", "Full factory", "Extended, limited", "Usually expired", "None"],
        ["Maintenance risk", "Minimal", "Low", "Moderate", "High, plan a reserve"],
        ["Insurance cost", "Highest", "High", "Moderate", "Lowest"],
        ["Condition certainty", "Complete", "Good", "Inspection required", "Inspection essential"],
        ["Best for", "Long holds, specific needs, low-rate promos", "Risk-averse buyers", "Most buyers, most of the time", "Cash buyers, low mileage, tolerant of surprises"],
      ]
    )}

    ${callout(
      "The 3-year-old rule of thumb",
      `<p style="margin:0">A three-year-old vehicle typically costs 55–70% of its original price, has 60–70% of its useful life ahead of it, and has already shed the most expensive portion of its depreciation. For most buyers this is the value sweet spot. New makes sense when subsidized financing closes the gap, when you plan to hold the car eight-plus years, or when the specific configuration you need simply isn't available used. Quantify it for your case in the <a href="/calculators/new-vs-used/">New vs Used calculator</a>.</p>`
    )}

    <h2>Lease versus buy</h2>
    <p>A lease is not "renting instead of owning." It's paying for the portion of the car you use — the gap between what it costs today and what it's forecast to be worth at the end — plus a finance charge. That framing tells you exactly when it makes sense.</p>
    ${bullets([
      "<strong>Leasing tends to win</strong> when you want a new car every three years regardless of cost, when the manufacturer is subsidizing the residual or the money factor, when you drive predictably low mileage, or when the vehicle can be legitimately expensed by a business.",
      "<strong>Buying tends to win</strong> when you hold vehicles longer than the loan, when your mileage is high or unpredictable, when you want to be free of a payment eventually, or when you'd rather absorb depreciation than pay for the certainty of avoiding it.",
      "<strong>The lease traps</strong> are mileage overages, which are charged per mile at the end and add up fast; \"excess wear\" charges assessed at return; and the reflex of rolling straight into another lease, which means a payment forever.",
      "<strong>The thing to check first:</strong> a lease on a car with a strong residual is cheap because the residual is high, not because the car is cheap. Low-residual cars make bad leases unless the manufacturer is subsidizing them.",
    ])}
    <p>Run both against a cash purchase — including the opportunity cost of the cash — in the <a href="/calculators/lease-vs-buy/">Lease vs Buy calculator</a>.</p>

    <h2>Financing: the four numbers that matter</h2>
    <p>Ignore the payment. These are the terms that determine what a loan costs you.</p>
    ${table(
      ["Term", "What it means", "What good looks like"],
      [
        ["<strong>APR</strong>", "The all-in annual cost of borrowing, including most fees", "Get a pre-approval from a credit union or bank first — it becomes the number the dealer has to beat"],
        ["<strong>Loan term</strong>", "How many months you pay", "60 months or fewer. 72 and 84-month loans are how buyers end up underwater"],
        ["<strong>Amount financed</strong>", "Out-the-door price minus down payment and trade equity", "Reduce this, not the payment"],
        ["<strong>Total of payments</strong>", "APR and term combined into the real cost", "The only number worth comparing between offers"],
      ]
    )}
    <p>The same $34,000 loan at 7% costs about <strong>$5,080 in interest over 48 months and about $9,105 over 84</strong>. Identical car, identical rate — you pay 79% more interest purely from term length, and you pay it for three extra years. In practice the gap is wider still, because 84-month money is priced higher than 48-month money; the term buys you a worse rate as well as more of them. And for most of those 84 months you owe more than the car is worth.</p>

    ${callout(
      "Get pre-approved before you shop",
      `<p style="margin:0">A pre-approval from your own bank or credit union does three things at once: it tells you what rate you actually qualify for, it caps what you can spend, and it converts the finance office from a negotiation into a simple test — can they beat this rate? Dealers often can, through manufacturer-subsidized financing, and that's a genuine win. But you can only recognize a good rate if you already know your baseline.</p>`
    )}

    <h2>How much car can you actually afford?</h2>
    <p>The widely-cited <strong>20/4/10 rule</strong> is a blunt instrument, but it's a good one: at least <strong>20%</strong> down, a term no longer than <strong>4 years</strong>, and total transportation costs — payment, insurance, fuel and maintenance — under <strong>10%</strong> of gross income.</p>
    <p>It is deliberately conservative and many people ignore it. The value in the rule isn't the specific thresholds; it's that it forces you to count insurance, fuel and maintenance as part of the car's cost. A $600 payment on a vehicle that costs $200 a month to insure and $180 to fuel is a $980 commitment, and budgeting for $600 is how people end up unable to cover a repair.</p>
    ${bullets([
      "Start from your <strong>total monthly transportation budget</strong>, not the payment you think you can handle.",
      "Get an <strong>actual insurance quote</strong> on the specific vehicle before you commit — the spread between models is worth thousands over five years.",
      "Add <strong>fuel</strong> at your real annual mileage and your local price, not the EPA combined figure at 12,000 miles.",
      "Add a <strong>maintenance and repair reserve</strong>, especially on any vehicle out of warranty.",
      "Whatever is left is what the payment can be. Now work backward to a price.",
    ])}
    <p>The <a href="/calculators/affordability/">Affordability calculator</a> does exactly this in reverse.</p>

    <h2>Negotiating: what actually works</h2>
    ${bullets([
      "<strong>Negotiate out-the-door, in writing.</strong> One number that includes the vehicle, all fees, taxes and registration. It's the only figure that can't be manipulated by moving money between line items.",
      "<strong>Keep the three transactions separate.</strong> Price first. Then financing. Then the trade. Bundled, they're unauditable.",
      "<strong>Get competing quotes by email.</strong> Contact several dealers' internet sales departments and ask for an out-the-door figure on a specific stock number. It takes an evening and reliably beats showroom negotiation.",
      "<strong>Know which fees are real.</strong> Sales tax, title and registration are legitimate. Documentation fees are capped by law in some states and pure margin in others. Add-ons like paint protection, fabric sealant, nitrogen in the tires and VIN etching are almost always negotiable to zero.",
      "<strong>Be prepared to leave.</strong> It is the entirety of your leverage, and it works because it's true — there is another one of these cars.",
      "<strong>Time it if you can.</strong> Month-end, quarter-end and model-year changeover genuinely shift dealer incentives. Don't buy the wrong car to get a good date, but if you're flexible, use it.",
    ])}

    ${callout(
      "The finance office is a second negotiation",
      `<p style="margin:0">After you've agreed a price, you'll be offered extended warranties, gap insurance, prepaid maintenance, tire-and-wheel coverage and paint protection. These are high-margin products with negotiable prices, and several of them — gap insurance in particular — are usually cheaper from your own insurer. You're allowed to decline all of them and you're allowed to say "I'll think about it" and buy later. Nothing here needs to be decided in that room.</p>`,
      "warn"
    )}

    <h2>Trade-in versus private sale</h2>
    <p>A private sale typically nets 10–20% more than a trade-in offer. That's the headline, but it isn't the whole calculation.</p>
    ${bullets([
      "<strong>Trade-in tax credit.</strong> In most US states you pay sales tax only on the difference between the new car's price and the trade allowance. On a $10,000 trade in a 7% tax state, that credit is worth $700 — which can close much of the gap to a private sale.",
      "<strong>Time and hassle.</strong> A private sale means photos, listings, strangers, test drives, payment security and title transfer. Some people enjoy it; most value their weekends.",
      "<strong>Instant cash offers</strong> from online buyers sit in between: better than most trade-in offers, worse than a good private sale, and nearly frictionless. Get one as a floor price before you talk to a dealer, whatever you plan to do.",
      "<strong>Negative equity.</strong> If you owe more than the car is worth, a trade lets the dealer roll the shortfall into the new loan. That is a convenience, not a solution — you're now financing two cars in one payment.",
    ])}

    <h2>Buying used without getting burned</h2>
    ${bullets([
      "<strong>Get a pre-purchase inspection.</strong> $100–200 at an independent shop of your choosing, not the seller's. It is the highest-return money in the entire process and a refusal to permit one ends the conversation.",
      "<strong>Read the vehicle history report</strong> — but treat it as a floor, not a guarantee. Unreported accidents don't appear. What you're looking for are title brands, odometer inconsistencies and gaps in registration.",
      "<strong>Check for flood and structural damage.</strong> Musty smells, silt in seat rails and under the spare tire, corrosion on unpainted underbody fasteners, mismatched panel gaps and paint overspray.",
      "<strong>Verify service history.</strong> A documented history is worth paying more for, and its absence is worth negotiating over.",
      "<strong>Look up recalls by VIN</strong> on the NHTSA database. Open recalls are repaired free by any franchised dealer regardless of who owns the car.",
      "<strong>Drive it properly.</strong> Cold start, highway speed, hard braking from 50 mph in a safe place, full-lock turns, every electrical accessory. Twenty minutes minimum.",
    ])}

    <h2>A worked example: the payment trap</h2>
    <p>Two buyers agree the same $36,000 out-the-door price and put $3,000 down.</p>
    ${bullets([
      "<strong>Buyer A</strong> takes 60 months at 7.4%. Payment: about <strong>$659</strong>. Total interest: about <strong>$6,540</strong>.",
      "<strong>Buyer B</strong> wants a payment under $550, so the dealer writes 84 months at 8.4%. Payment: about <strong>$521</strong>. Total interest: about <strong>$10,760</strong>.",
      "Buyer B saves $138 a month and pays <strong>$4,220 more</strong> for the same car — and stays underwater on the loan for roughly the first four years.",
    ])}
    <p>Nobody lied to Buyer B. They got exactly the payment they asked for. That's the trap: the payment is the thing being negotiated, and it's the wrong thing. Check yours in the <a href="/calculators/auto-loan/">Auto Loan calculator</a> before you sit down.</p>

    ${sources([
      cite("AAA_YDC_2025", "Finance charges averaging $1,131 per year for a new vehicle, down about 15% from the prior year's $1,332."),
      cite("FED_G19", "Prevailing new-car loan rates, average maturity and average amount financed \u2014 the right place to check what a rate quote should look like."),
      cite("KBB_DEP", "Segment retention, for judging what a used car ought still to be worth."),
      "Loan interest figures are computed with standard amortization at the stated APR and term.",
      "Trade-in sales-tax treatment varies by state; a few states give no credit for a trade. Check your state's department of revenue.",
      "Recall lookups by VIN are available free from the US National Highway Traffic Safety Administration at nhtsa.gov/recalls.",
    ])}

  </div>
</section>

<section class="section-tight bg-subtle">
  <div class="container">
    <div class="section-head"><span class="eyebrow">Run the numbers</span><h2>Buying &amp; financing calculators</h2><p>Do the arithmetic before you're sitting across a desk from someone who does it for a living.</p></div>
    ${calcTiles([
      ["/calculators/auto-loan/", "dollar", "Auto Loan Calculator", "Payment, total interest and the full amortization schedule for any term.", true],
      ["/calculators/lease-vs-buy/", "scale", "Lease vs Buy", "Lease, finance and cash compared on total cost, not monthly payment.", true],
      ["/calculators/new-vs-used/", "layers", "New vs Used", "What skipping the first three years of depreciation is actually worth."],
      ["/calculators/affordability/", "home", "Affordability Calculator", "Work backward from your budget to a price you can genuinely support."],
      ["/calculators/trade-in-value/", "cart", "Trade-In vs Private Sale", "Including the sales-tax credit most comparisons leave out."],
      ["/calculators/true-cost-to-own/", "chart", "True Cost to Own", "The number that should decide it — all six costs over five years.", true],
    ])}
  </div>
</section>
`;

module.exports = {
  url: "/buying-guides/",
  title: "Car Buying Guides — Lease vs Buy, New vs Used | MyDrivingCost",
  desc:
    "How to buy a car without overpaying: out-the-door price, loan terms, lease versus buy, new versus used, trade-in timing and inspection. With calculators.",
  eyebrow: "Buying guides",
  h1: "Buying a car: the decisions that cost the most money",
  h1short: "Buying guides",
  lead:
    "New or used, lease or finance, trade in or sell privately — and above all, why negotiating a monthly payment instead of a total price is the most expensive habit in car buying.",
  crumb: [],
  heroStats: [
    ["Finance charges", "$1,131", "per year, average new vehicle"],
    ["Loan term ceiling", "60 mo", "beyond this you go underwater"],
    ["Private sale premium", "10–20%", "over a typical trade-in offer"],
  ],
  heroCta: [
    ["Auto loan calculator", "/calculators/auto-loan/", "btn-primary"],
    ["Lease vs buy", "/calculators/lease-vs-buy/", "btn-ghost"],
  ],
  body,
  faqTitle: "Car buying questions",
  faq: [
    [
      "Should I lease or buy a car?",
      "Buy if you keep vehicles longer than the loan term, drive high or unpredictable mileage, or want to eventually be free of a payment. Lease if you want a new car every three years regardless of cost, if the manufacturer is subsidizing the residual value or money factor, or if a business can legitimately expense it. The deciding factor is usually holding period: leasing is structurally expensive for long-term owners and structurally competitive for short-cycle ones.",
    ],
    [
      "How long should my car loan be?",
      "Sixty months or fewer, and forty-eight if you can manage the payment. A 72 or 84-month loan lowers the monthly figure but raises total interest substantially and keeps you underwater — owing more than the car is worth — for years. The same $34,000 loan at 7% costs roughly $5,080 in interest over 48 months and about $9,105 over 84 — nearly 80% more for the same car at the same rate. If the only way to afford a car is an 84-month term, it's the wrong car.",
    ],
    [
      "How much should I put down on a car?",
      "Aim for 20%. That's not an arbitrary figure: a new vehicle loses roughly 18–22% of its value in the first year, so a 20% down payment is roughly what it takes to keep loan principal ahead of the depreciation curve. Less than that, especially on a long term, means months or years of negative equity in which you can't sell or trade without writing a check.",
    ],
    [
      "Is it better to buy new or used?",
      "For most buyers, a two-to-four-year-old vehicle is the value sweet spot — typically 55–70% of the original price with most of its useful life ahead of it, and the steepest part of the depreciation curve already absorbed by someone else. New makes sense when subsidized financing closes the gap, when you'll hold the car eight or more years, or when the configuration you need isn't available used.",
    ],
    [
      "Should I trade in my car or sell it privately?",
      "A private sale usually nets 10–20% more, but in most US states a trade-in reduces the sales tax you owe on the new car — on a $10,000 trade in a 7% tax state that credit is worth $700, which closes much of the gap. Factor in the time, hassle and payment-security risk of a private sale. Getting an instant cash offer from an online buyer first gives you a floor price either way.",
    ],
    [
      "What fees are negotiable when buying a car?",
      "Sales tax, title and registration are set by your state and aren't negotiable. Documentation fees are capped by law in some states and are pure dealer margin in others. Everything in the add-on category — paint protection, fabric sealant, nitrogen-filled tires, VIN etching, prepaid maintenance, extended warranties and gap insurance — is negotiable, often to zero, and several are cheaper elsewhere.",
    ],
    [
      "Should I get pre-approved for a car loan?",
      "Yes, before you shop. A pre-approval from your bank or credit union tells you the rate you actually qualify for, sets a hard ceiling on what you can spend, and turns the dealer's finance office into a simple test: can they beat this? Often they can through manufacturer-subsidized financing, which is a genuine win — but you can only recognize a good rate if you already know your baseline.",
    ],
    [
      "Do I need a pre-purchase inspection on a used car?",
      "Always, unless it's still under a comprehensive factory warranty. A $100–200 inspection at an independent shop you choose is the highest-return money in the entire buying process, routinely finding issues worth many times its cost. A seller who won't allow one has told you something important, and the correct response is to walk away.",
    ],
    [
      "How much car can I afford?",
      "Start from total transportation budget rather than a payment. The 20/4/10 guideline — 20% down, four-year maximum term, and all transportation costs under 10% of gross income — is deliberately conservative but useful because it forces you to count insurance, fuel and maintenance. A $600 payment on a car costing $200 a month to insure and $180 to fuel is really a $980 commitment.",
    ],
  ],
  cta: {
    h2: "Know the number before you negotiate",
    p: "Price the car properly — all six ownership costs over five years — so the payment conversation can't distract you from the total.",
    btn: ["Open True Cost to Own", "/calculators/true-cost-to-own/"],
  },
};
