const C = require("../calcpage");
const { num, rng, seg, group, advanced, hero, tiles, chartCard, callout, bullets, table, } = C;

/* ------------------------------------------------------------------ HTML -- */

const inputs = [
  group(
    "Your car",
    [
      num("price", "Original price when new", 34000, { prefix: "$", min: 1000, step: 500 }),
      seg(
        "age",
        "How old it is now",
        [["1", "1 yr"], ["2", "2 yrs"], ["3", "3 yrs"], ["5", "5 yrs"], ["8", "8 yrs"]],
        "5"
      ),
      rng("miles", "Annual miles", 12000, {
        min: 2000,
        max: 40000,
        step: 500,
        initial: "12,000 mi/yr",
        help: "Valuation guides are built around 12,000 a year. Anything above it is deducted at about 6 cents a mile.",
      }),
      seg(
        "condition",
        "Honest condition",
        [
          ["rough", "Rough"],
          ["fair", "Fair"],
          ["good", "Good"],
          ["excellent", "Excellent"],
        ],
        "good"
      ),
      `<p class="field-help">Fewer than one car in five is genuinely &ldquo;excellent&rdquo;. If it has a dented panel, a warning light or worn tires, it is Fair — and the appraiser will say so within ninety seconds.</p>`,
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
    ].join("\n              "),
    "var(--c-deprec)"
  ),
  group(
    "The deal",
    [
      num("newPrice", "Price of the vehicle you're buying", 34000, {
        prefix: "$",
        min: 0,
        step: 500,
        help: "Set this to $0 if you're simply selling and not replacing — there is then no trade-in tax credit to be had.",
      }),
      num("salesTax", "Your sales tax rate", 7, { suffix: "%", min: 0, max: 15, step: 0.1 }),
      seg(
        "taxCredit",
        "Does your state credit the trade?",
        [["yes", "Yes, my state credits the trade"], ["no", "No it does not"]],
        "yes"
      ),
      `<p class="field-help">Most states tax only the difference between the new vehicle and your trade-in, which is worth real money. The main exceptions are <strong>California</strong>, <strong>Virginia</strong>, <strong>Hawaii</strong>, <strong>Kentucky</strong>, <strong>Maryland</strong> and <strong>Montana</strong>; <strong>Michigan</strong> credits only a capped portion. Alaska, Delaware, Montana, New Hampshire and Oregon levy no state sales tax at all, so there is nothing to credit. Rules change — check your own department of revenue before you count on the number.</p>`,
    ].join("\n              "),
    "var(--c-tax)"
  ),
  group(
    "What you still owe",
    [
      num("loanBalance", "Loan payoff balance", 0, {
        prefix: "$",
        min: 0,
        step: 250,
        help: "The ten-day payoff figure from your lender, not last month's statement balance. If it exceeds what the car is worth you have negative equity, and it has to be settled in cash or rolled into the next loan.",
      }),
    ].join("\n              "),
    "var(--c-finance)"
  ),
  advanced(
    [
      `<p class="field-help">The gap between wholesale and retail, and what it costs you to cross it.</p>`,
      rng("privateSpread", "Private-party premium over trade", 15, {
        min: 0,
        max: 40,
        step: 1,
        initial: "15%",
        help: "The full spread between a dealer's wholesale offer and a private-party price. Trade sits half this below market, private half above.",
      }),
      num("recon", "Reconditioning &amp; prep", 350, {
        prefix: "$",
        min: 0,
        step: 25,
        help: "Detail, touch-up, a fresh set of wipers, a pre-listing inspection. Spent on a private sale; the dealer absorbs it on a trade.",
      }),
      num("daysToSell", "Days to sell privately", 21, {
        suffix: "days",
        min: 1,
        max: 180,
        step: 1,
        help: "A well-priced mainstream vehicle moves in two to four weeks. Anything unusual — manual gearbox, odd color, six-figure mileage — takes longer.",
      }),
      num("hours", "Hours of your time", 8, {
        suffix: "hrs",
        min: 1,
        max: 60,
        step: 1,
        help: "Photographs, the listing, replying to messages, three no-shows, two test drives and a trip to the bank. Eight hours is a realistic floor, not a pessimistic estimate.",
      }),
      num("instantFloor", "Instant-offer floor", 0.94, {
        suffix: "x trade",
        min: 0.7,
        max: 1.15,
        step: 0.01,
        help: "Online buyers typically bid a little under a dealer's trade appraisal because they never see the car. Their number is free to obtain and useful as a floor.",
      }),
    ].join("\n                  ")
  ),
].join("\n            ");

const results = [
  hero(
    "Trade-in vs private sale",
    'Net advantage of <span data-out="winnerLabel">—</span>',
    "advantage",
    "money",
    'Trading it in nets <strong class="num" data-out="netTrade" data-fmt="money">—</strong> once the sales-tax credit is counted. Selling it yourself nets <strong class="num" data-out="netPrivate" data-fmt="money">—</strong> after reconditioning. <span data-out="verdict">—</span>'
  ),
  tiles([
    ["Dealer trade-in offer", "tradeValue", "money", 'Wholesale — about <span class="num" data-out="tradePctOfMarket" data-fmt="pct">—</span> of market value'],
    ["Private-party price", "privateValue", "money", 'Retail minus a stranger’s risk, in roughly <span data-out="daysLabel">—</span>'],
    ["Net advantage", "advantage", "money", 'In favor of <span data-out="winnerLabel">—</span>'],
  ]),
  chartCard(
    "The two routes, component by component",
    "Same car, same day — what each route actually puts in your pocket",
    `<div class="breakdown" id="routes"></div>`
  ),
  chartCard(
    "What each kind of buyer will pay",
    "The same vehicle priced by three different businesses",
    `<div class="breakdown" id="ladder"></div>
          <p class="text-muted" style="font-size:.85rem;margin-top:14px">An instant online offer is the cheapest number in car ownership to obtain: it takes ten minutes, costs nothing, and gives you a floor no dealer can talk you below. Treat it as the price of information, not as an offer you have to accept.</p>`
  ),
  chartCard(
    "Where the answer flips",
    "The same car at five sales-tax rates, assuming your state credits the trade",
    `<div id="tax-table"></div>`
  ),
  callout(
    "What selling it yourself pays per hour",
    'Doing it yourself is worth about <strong class="num" data-out="hourly" data-fmt="money2">—</strong> an hour across <strong data-out="hoursLabel">—</strong> of photography, listing, messages, no-shows, test drives and a trip to the bank. <span data-out="hourlyNote">—</span>'
  ),
  callout(
    "Negative equity and the loan you still owe",
    '<p style="margin:0 0 10px"><span data-out="equityNote">—</span></p><p style="margin:0">Treat &ldquo;we&rsquo;ll pay off your loan, whatever you owe&rdquo; as advertising, not arithmetic. Nobody pays off your loan. The dealer subtracts your payoff from your trade allowance, and any shortfall is added to the new loan — so you borrow it again, at interest, on a car you no longer own. Ask for the figure in writing, itemized, before you agree to anything.</p>',
    "warn"
  ),
].join("\n\n        ");

const floatBar = `<div class="float-summary no-print" id="floatSummary" aria-hidden="true">
  <div class="fs-item"><span class="k">Best route</span><span class="v" data-out="winnerShort">—</span></div>
  <div class="fs-sep"></div>
  <div class="fs-item fs-hide-sm"><span class="k">Worth</span><span class="v num" data-out="advantage" data-fmt="money">—</span></div>
  <button type="button" class="btn btn-primary btn-sm" data-scroll="calc">Edit</button>
</div>`;

/* ------------------------------------------------------------------ prose -- */

const prose = `
    <h2 id="how-it-works">The gap is the dealer's margin, not an insult</h2>
    <p>Almost every seller has the same reaction to their first trade-in appraisal: the number is lower than they expected, and it feels personal. It is not. A trade-in offer is a <strong>wholesale</strong> price and a private-party price is <strong>retail minus a stranger's risk</strong>. They are two different products sold to two different buyers, and the space between them is the dealer's cost of taking a used car off your hands: reconditioning, floorplan interest, a warranty reserve, the salesperson, and the real possibility that the vehicle sits on the lot for ninety days and is then wholesaled at a loss.</p>
    <p>Across the market that spread runs about <strong>10 to 20 percent</strong> of the vehicle's value — a few hundred dollars on an old commuter, several thousand on a three-year-old truck. That is the number every article tells you to chase by selling privately. What almost none of them mention is that in most of the United States, the taxman quietly hands a large part of it back to you for trading in.</p>
    <p>Here is the mechanism. When you trade a car against a new one, the overwhelming majority of states charge sales tax only on the <em>difference</em> between the two prices. Trade a $15,000 car against a $34,000 replacement in a 7 percent state and you are taxed on $19,000 rather than $34,000. That is <strong>$1,050 you never pay</strong>, and it lands in your pocket exactly as surely as a higher offer would. Against a typical 15 percent spread of roughly $2,250 on the same car, the tax credit closes almost half the gap before you have taken a single photograph.</p>

    <h2 id="formula">The formula</h2>
    ${callout(
      "Net trade = trade value + (trade value × sales tax) · Net private = private price − reconditioning",
      "<p style='margin:0 0 10px'>The two routes are directly comparable because the tax credit only exists on one of them. Work it through from what you actually pay for the replacement car and the same identity falls out: trading in costs you the new price minus the trade, plus tax on that difference; selling privately costs you the full new price plus full tax, less what you were paid, plus what you spent getting the car ready.</p><p style='margin:0'>So the private sale wins only when <strong>private price − reconditioning &gt; trade value + tax credit</strong>. On our $34,000 SUV at five years old — worth about $14,200 — that means a private buyer has to pay roughly $1,270 more than the dealer offers before you are a dollar ahead, in a 7 percent state. Very often they will. Sometimes they will not, and the calculator above will tell you which.</p>"
    )}
    <p>The tax credit is capped by the price of the car you are buying: no state refunds tax you never owed. If you are selling without replacing, the credit is zero and the private sale wins almost automatically.</p>

    <h2 id="appraisal">How a dealer actually values your trade</h2>
    <p>An appraisal takes about ten minutes and it is not a negotiation about your car's sentimental worth. The appraiser is answering three questions, in this order.</p>
    ${table(
      ["What they check", "How they price it", "What it means for you"],
      [
        ["Auction comparables", "Recent wholesale sale prices for the same year, trim and mileage band, usually within the last 7–14 days", "The market number is real and checkable. Arguing with it does not work"],
        ["Reconditioning estimate", "Tires, brakes, paint, glass, a safety inspection — priced at the dealer's shop rate, deducted in full", "Two worn tires can cost you $600 of offer. Fixing them yourself rarely costs that"],
        ["Days to turn", "How fast that model sells off their lot in your region", "A car they don't retail themselves gets a wholesale-only bid, which is the lowest number in the room"],
        ["Reconditioning they can't do", "Accident history, a branded title, a smoked-in interior, an aftermarket exhaust", "These are priced brutally because the retail buyer pool shrinks"],
      ]
    )}
    <p>The practical consequence is that <strong>a trade appraisal is a forecast, not an opinion</strong>. If your car is a model that dealer retails well, you will get a strong number. If it is a fourteen-year-old hatchback at a luxury franchise, you will get a wholesale bid, and you should sell it somewhere else.</p>

    <h2 id="negotiate">Negotiate three numbers, and never a payment</h2>
    <p>A car deal contains three separate transactions: the price of the new vehicle, the value of your trade, and the financing. Settle them in that order, in writing, one at a time. The moment you allow them to be merged, you lose the ability to tell which one moved.</p>
    <p>The classic version is the strong trade allowance offered alongside a quietly restored discount on the new car. You are shown $16,000 for a car worth $14,000, and the $2,000 comes back out of a discount you would otherwise have received. Nothing dishonest has happened, and nothing good has happened either.</p>
    ${callout(
      "Never negotiate a monthly payment",
      "A monthly payment has four variables in it — price, trade, term and rate — and only one of them is visible to you. Any payment can be reached from any price by moving the term. Agree the out-the-door price of the new vehicle first, in writing, with no mention of a trade. Then present the trade and ask what they will pay for it. Then, and only then, discuss financing, having already secured a rate from your own bank or credit union to compare against.",
      "warn"
    )}
    <p>One more sequencing note: get an <strong>instant cash offer</strong> before you set foot on a forecourt. Several national buyers will price your car online in ten minutes and honor that figure for a week. It is typically a few percent below a good dealer trade appraisal — they are buying sight-unseen — but it costs nothing, commits you to nothing, and converts your trade from an unknown into a floor. A dealer who wants your business will usually beat it, and one who will not has told you something useful.</p>

    <h2 id="raise-the-price">How to raise the number, on either route</h2>
    ${bullets([
      "<strong>Get the instant offers first.</strong> Two or three online quotes take twenty minutes total and give you a hard floor. Nothing else on this list has a better return per minute spent.",
      "<strong>Detail it properly, or pay someone $150 to.</strong> A full interior and exterior detail is the highest-return money in the whole exercise on a private sale — it commonly returns several hundred dollars and shortens the sale by a week.",
      "<strong>Assemble the records.</strong> Service invoices, the second key, the owner's manual, the tire receipt. A folder of paperwork does more to justify your asking price than any paragraph of description.",
      "<strong>Buy a pre-listing inspection.</strong> Around $150 at an independent shop. It removes the buyer's main negotiating lever — &ldquo;I'll need to get it checked&rdquo; — and lets you fix small faults before they become a $500 discount request.",
      "<strong>Photograph it honestly, in daylight, against a plain background.</strong> Thirty pictures including the scuffs, the tire tread and the odometer. Listings that show the flaws get fewer messages and far better buyers.",
      "<strong>Fix the cheap things, not the expensive ones.</strong> Wipers, bulbs, a missing wheel trim, the check-engine light. Do not replace a clutch or repaint a panel — you will not recover it.",
      "<strong>Price at the market, not at your hopes.</strong> Search completed local listings for your exact year and mileage band. A car priced 10 percent over market sits for two months and then sells for less than one priced correctly on day one.",
      "<strong>Trade it in the same state you're taxed in.</strong> The credit follows the transaction, so a trade and a purchase done together in a crediting state is worth several hundred to a couple of thousand dollars that a separate sale simply forfeits.",
    ])}

    <h2 id="safety">The part nobody prices: safety and payment</h2>
    <p>Every guide tells you that private sales are worth more. Rather fewer of them mention that a private sale requires you to meet strangers who know where a valuable object is kept, hand over the keys to somebody who is not insured on your car, and then accept several thousand dollars from a person you have known for forty minutes.</p>
    <p>These are solvable problems and the solutions are unglamorous. Meet at your bank, in daylight, and complete the payment inside the branch — a cashier's check verified with the issuing bank by you, at the counter, or a wire that has actually landed in your account. Take a photograph of the buyer's license and check it against the name on the paperwork. Ride along on the test drive, or take a deposit. Complete the title transfer and file the release of liability with your state the same day, because until you do, the car's parking tickets and worse are legally yours.</p>
    <p>And treat every off-script payment method as fraud until proven otherwise: overpayment checks, escrow services the buyer recommends, a shipper who will collect on their behalf, anything involving a payment app for a five-figure sum. A trade-in has none of these problems. That convenience is worth something, and it is entirely reasonable to decide it is worth more than the few hundred dollars the calculator shows.</p>

    <h2 id="mistakes">Common mistakes</h2>
    ${bullets([
      "<strong>Comparing the trade offer to the private price and stopping there.</strong> Without the tax credit the comparison is wrong in 40-odd states, and wrong by more than a thousand dollars on a mid-priced car.",
      "<strong>Treating a valuation-guide number as an offer.</strong> Guides publish trade, private-party and retail figures for a reason. Quoting the retail number to an appraiser signals you haven't read your own source.",
      "<strong>Announcing the trade before the price is agreed.</strong> It hands the dealer a second lever on a deal that should only have one.",
      "<strong>Forgetting the payoff clock.</strong> A ten-day payoff includes interest that keeps accruing. Sell in the last week of the month and the figure quoted at the start of it will be short.",
      "<strong>Assuming excellent condition.</strong> Most cars are Good at best. Grading honestly at the start prevents the appraisal from feeling like a betrayal.",
      "<strong>Ignoring what your own time is worth.</strong> If the private sale nets you an extra $600 for a weekend of work, that is a decent rate. If it nets $180, it is not, and there is no shame in taking the easy route.",
    ])}
    <p>The last one is the honest summary of the whole calculation. Selling privately usually wins on the arithmetic, but it wins by less than the internet suggests once the tax credit and the reconditioning are counted — and the margin is paid for in weekends. Run your own numbers above, look at the implied hourly rate, and decide with the figure in front of you rather than the folklore.</p>
`;

/* -------------------------------------------------------------------- JS -- */

const js = `/* Trade-In vs Private Sale Calculator — MyDrivingCost.com */
(function () {
  "use strict";
  var MDC = window.MDC, F = MDC.fmt;

  /* Depreciation rates and the typical wholesale-to-retail spread by segment.
     Trucks change hands in a tight, liquid market; EVs and luxury cars do not. */
  var SEG = {
    truck: { d1: 16, dn: 11, spread: 12 },
    suv:   { d1: 20, dn: 15, spread: 15 },
    sedan: { d1: 21, dn: 16, spread: 16 },
    lux:   { d1: 25, dn: 18, spread: 18 },
    ev:    { d1: 26, dn: 17, spread: 20 }
  };

  var COND = { rough: 0.76, fair: 0.88, good: 1.00, excellent: 1.08 };
  var COND_LABEL = { rough: "rough", fair: "fair", good: "good", excellent: "excellent" };

  var RATES = [0, 4, 6, 7, 9];

  function retained(d1, dn, years) {
    var r = 1;
    for (var y = 1; y <= years; y++) r *= (y === 1 ? 1 - d1 / 100 : 1 - dn / 100);
    return r;
  }

  function money(v) { return F.money(v); }

  MDC.calc({
    form: "trade-form",
    defaults: {
      price: 34000, age: "5", miles: 12000, condition: "good", segment: "suv",
      newPrice: 34000, salesTax: 7, taxCredit: "yes",
      loanBalance: 0,
      privateSpread: 15, recon: 350, daysToSell: 21, hours: 8, instantFloor: 0.94
    },
    compute: function (i) {
      var age = parseInt(i.age, 10) || 1;
      var s = SEG[i.segment] || SEG.suv;
      var cond = COND[i.condition] != null ? COND[i.condition] : 1;

      /* Canonical curve: 20% in year one, 15% each year after, tilted by segment. */
      var base = i.price * retained(s.d1, s.dn, age);
      var extraMiles = Math.max(0, i.miles - 12000) * age;
      var milePenalty = extraMiles * 0.06;
      var market = Math.max(i.price * 0.03, base * cond - milePenalty);

      /* Trade is wholesale, private is retail-minus. Market sits between them. */
      var half = i.privateSpread / 2 / 100;
      var tradeValue = market * (1 - half);
      var privateValue = market * (1 + half);
      var instant = tradeValue * i.instantFloor;

      var credits = i.taxCredit === "yes";
      var creditBase = Math.max(0, Math.min(tradeValue, i.newPrice));
      var taxSaving = credits ? creditBase * i.salesTax / 100 : 0;

      var netTrade = tradeValue + taxSaving;
      var netPrivate = privateValue - i.recon;
      var diff = netPrivate - netTrade;
      var privateWins = diff > 0;
      var advantage = Math.abs(diff);

      var hours = Math.max(1, i.hours);
      var hourly = diff / hours;

      /* The tax rate at which the two routes tie, if the state credits trades. */
      var breakEven = creditBase > 0 ? (privateValue - i.recon - tradeValue) / creditBase * 100 : 0;

      var shortfall = Math.max(0, i.loanBalance - tradeValue);
      var privShortfall = Math.max(0, i.loanBalance - (privateValue - i.recon));
      var equityTrade = tradeValue - i.loanBalance;

      var winnerLabel = advantage < 25
        ? "either route"
        : (privateWins ? "selling it privately" : "trading it in");
      var winnerShort = advantage < 25 ? "Line ball" : (privateWins ? "Private sale" : "Trade-in");

      var verdict;
      if (advantage < 25) {
        verdict = "The two routes are within $25 of each other, so take the easy one.";
      } else if (privateWins) {
        verdict = "Selling it yourself is ahead by " + money(advantage) +
          ", which is what a few weekends of your time is being valued at.";
      } else {
        verdict = "Trading it in is ahead by " + money(advantage) +
          " once the sales-tax credit is counted — and it costs you no weekends.";
      }

      var hourlyNote;
      if (!privateWins) {
        hourlyNote = "On these numbers the private sale earns you nothing at all: the tax credit " +
          "on a trade is larger than the premium a private buyer will pay.";
      } else if (hourly < 25) {
        hourlyNote = "That is below what most people would work a Saturday for. The convenience of " +
          "trading in is worth more than this margin.";
      } else if (hourly < 75) {
        hourlyNote = "A fair rate for straightforward work, but it assumes the sale goes smoothly " +
          "and nobody wastes your afternoon.";
      } else {
        hourlyNote = "That is a strong return for a weekend, and well worth the effort of doing it " +
          "properly — good photographs, full records, a bank meeting for payment.";
      }

      var equityNote;
      if (i.loanBalance <= 0) {
        equityNote = "You owe nothing on this car, so every dollar of the sale is yours. That is the " +
          "cleanest position to sell from, and it is worth reaching before you start shopping for the next one.";
      } else if (shortfall > 0) {
        equityNote = "You are underwater. The payoff of " + money(i.loanBalance) +
          " exceeds the trade value by " + money(shortfall) +
          ", and that shortfall has to be settled in cash or rolled into your next loan — where you pay " +
          "interest on it for years, on a car you no longer own. Selling privately would leave a shortfall of " +
          money(privShortfall) + ".";
      } else {
        equityNote = "You have positive equity of " + money(equityTrade) +
          " on a trade after the payoff of " + money(i.loanBalance) +
          " is settled. Ask for the payoff to be shown as a separate line on the buyer's order, not folded " +
          "into the trade allowance.";
      }

      return {
        price: i.price,
        marketValue: market,
        tradeValue: tradeValue,
        privateValue: privateValue,
        instant: instant,
        spreadDollars: privateValue - tradeValue,
        taxSaving: taxSaving,
        netTrade: netTrade,
        netPrivate: netPrivate,
        advantage: advantage,
        privateWins: privateWins,
        winnerLabel: winnerLabel,
        winnerShort: winnerShort,
        verdict: verdict,
        hourly: hourly,
        hourlyNote: hourlyNote,
        hoursLabel: hours + (hours === 1 ? " hour" : " hours"),
        equityNote: equityNote,
        shortfall: shortfall,
        breakEven: breakEven,
        tradePctOfMarket: market > 0 ? tradeValue / market * 100 : 0,
        daysLabel: i.daysToSell + (i.daysToSell === 1 ? " day" : " days"),
        condLabel: COND_LABEL[i.condition] || "good",
        milePenalty: milePenalty,
        credits: credits,
        creditBase: creditBase,
        _i: i
      };
    },
    onSeg: function (name, val, api) {
      /* Segment sets the typical wholesale-to-retail spread; the user can override. */
      if (name === "segment" && SEG[val]) api.setField("privateSpread", SEG[val].spread);
    },
    onInput: function (i) {
      var set = function (k, v) {
        document.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) {
          if (el.closest(".field")) el.textContent = v;
        });
      };
      set("miles", F.num(i.miles) + " mi/yr");
      set("privateSpread", i.privateSpread + "%");
    },
    count: [],
    render: function (res, i) {
      function row(label, note, value, cssVar, sign) {
        return '<div class="bd-row">' +
          '<span class="bd-swatch" style="background:var(' + cssVar + ')"></span>' +
          '<span class="bd-name">' + label + '<small>' + note + '</small></span>' +
          '<span class="bd-pct num">' + (sign || "") + '</span>' +
          '<span class="bd-val num">' + money(value) + '</span>' +
          '</div>';
      }
      function total(label, note, value) {
        return '<div class="bd-row" style="border-top:1px solid var(--border);margin-top:8px;padding-top:12px">' +
          '<span class="bd-swatch" style="background:transparent"></span>' +
          '<span class="bd-name"><strong>' + label + '</strong><small>' + note + '</small></span>' +
          '<span class="bd-pct num"></span>' +
          '<span class="bd-val num"><strong>' + money(value) + '</strong></span>' +
          '</div>';
      }
      function head(text) {
        return '<div style="font-family:var(--font-display);font-weight:700;font-size:.95rem;margin:0 0 10px">' +
          text + '</div>';
      }

      /* ---- the two routes, component by component ----------------------- */
      var host = document.getElementById("routes");
      if (host) {
        var creditNote = res.credits
          ? "Tax charged only on the difference, at " + i.salesTax + "%"
          : "Your state taxes the full price of the new vehicle";

        var tradeBlock = head("Route 1 &mdash; trade it in") +
          row("Trade-in offer", "Wholesale: what the dealer will book it at", res.tradeValue, "--c-deprec", "+") +
          row("Sales-tax credit", creditNote, res.taxSaving, "--c-tax", res.taxSaving > 0 ? "+" : "") +
          row("Reconditioning", "None &mdash; the dealer absorbs it", 0, "--c-maint", "") +
          total("Net position", "What the trade route is worth to you", res.netTrade);

        var privBlock = head("Route 2 &mdash; sell it yourself") +
          row("Private-party price", "Retail minus a private seller's lack of warranty", res.privateValue, "--c-deprec", "+") +
          row("Sales-tax credit", "Forgone &mdash; the credit only exists on a trade", 0, "--c-tax", "") +
          row("Reconditioning &amp; prep", "Detail, inspection, listing costs", i.recon, "--c-maint", "&minus;") +
          total("Net position", "What the private route is worth to you", res.netPrivate);

        host.innerHTML = tradeBlock +
          '<div style="height:20px"></div>' + privBlock +
          '<p class="text-muted" style="font-size:.85rem;margin-top:16px">' +
          'The spread between the two offers is ' + money(res.spreadDollars) +
          '. The sales-tax credit hands back ' + money(res.taxSaving) + ' of it, so ' +
          (res.privateWins
            ? 'the private sale is still ahead by ' + money(res.advantage) + '.'
            : 'the trade-in comes out ahead by ' + money(res.advantage) + '.') +
          '</p>';
      }

      /* ---- who pays what ------------------------------------------------ */
      var lad = document.getElementById("ladder");
      if (lad) {
        var mk = function (label, note, value, cssVar) {
          var pct = res.marketValue > 0 ? value / res.marketValue * 100 : 0;
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + cssVar + ')"></span>' +
            '<span class="bd-name">' + label + '<small>' + note + '</small></span>' +
            '<span class="bd-pct num">' + Math.round(pct) + '%</span>' +
            '<span class="bd-val num">' + money(value) + '</span>' +
            '</div>';
        };
        lad.innerHTML =
          mk("Instant online offer", "Sight unseen, honored for about seven days", res.instant, "--c-opp") +
          mk("Dealer trade-in", "Auction comparables, less reconditioning and days-to-turn", res.tradeValue, "--c-finance") +
          mk("Private party", "A patient buyer, in roughly " + res.daysLabel, res.privateValue, "--c-deprec") +
          '<div class="bd-row" style="border-top:1px solid var(--border);margin-top:8px;padding-top:12px">' +
          '<span class="bd-swatch" style="background:transparent"></span>' +
          '<span class="bd-name"><strong>Market value</strong><small>Condition: ' + res.condLabel +
          (res.milePenalty > 1 ? ', less ' + money(res.milePenalty) + ' for mileage' : '') +
          '</small></span><span class="bd-pct num">100%</span>' +
          '<span class="bd-val num"><strong>' + money(res.marketValue) + '</strong></span></div>';
      }

      /* ---- the decision at five tax rates ------------------------------- */
      var tt = document.getElementById("tax-table");
      if (tt) {
        var nearest = RATES[0], bestGap = Infinity;
        RATES.forEach(function (r) {
          var g = Math.abs(r - i.salesTax);
          if (g < bestGap) { bestGap = g; nearest = r; }
        });

        var rows = "";
        RATES.forEach(function (r) {
          var credit = res.creditBase * r / 100;
          var nt = res.tradeValue + credit;
          var np = res.netPrivate;
          var d = np - nt;
          var wins = d > 0 ? "Private" : (d < 0 ? "Trade-in" : "Tie");
          rows += '<tr><td>' + r.toFixed(0) + '%' +
            (r === nearest ? ' <span class="hint">closest to yours</span>' : '') + '</td>' +
            '<td class="num">' + money(credit) + '</td>' +
            '<td class="num">' + money(nt) + '</td>' +
            '<td class="num">' + money(np) + '</td>' +
            '<td class="num">' + wins + ' by ' + money(Math.abs(d)) + '</td></tr>';
        });

        var be = res.breakEven;
        var footnote;
        if (res.creditBase <= 0) {
          footnote = 'You have entered no replacement vehicle, so there is no trade-in credit to claim ' +
            'at any tax rate. The private sale wins by ' + money(res.advantage) + '.';
        } else if (be <= 0) {
          footnote = 'The trade-in wins at every tax rate shown, including zero &mdash; the private-party ' +
            'premium does not cover the reconditioning you would spend getting the car ready.';
        } else if (be > 15) {
          footnote = 'The private sale wins at every plausible tax rate. The credit would have to reach ' +
            be.toFixed(1) + '% to change the answer, which no US state charges.';
        } else {
          footnote = 'The answer flips at a sales-tax rate of about <strong>' + be.toFixed(1) +
            '%</strong>. Below that the private sale wins; above it, the trade-in credit is worth more ' +
            'than the premium a private buyer will pay.';
        }

        tt.innerHTML = '<div class="table-wrap"><table class="tbl">' +
          '<thead><tr><th>Sales tax</th><th class="num">Trade-in credit</th>' +
          '<th class="num">Net if you trade</th><th class="num">Net if you sell</th>' +
          '<th class="num">Which wins</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
          '<p class="text-muted" style="font-size:.85rem;margin-top:14px">' + footnote + '</p>' +
          (res.credits ? '' :
            '<p class="text-muted" style="font-size:.85rem;margin-top:8px">You have told us your state does ' +
            'not credit the trade, so your real answer is the 0% row whatever your tax rate is. The rest of ' +
            'the table shows what the credit would be worth if it were available to you.</p>');
      }
    }
  });
})();
`;

module.exports = {
  slug: "trade-in-value",
  jsName: "trade",
  formId: "trade-form",
  crumbName: "Trade-In Value",
  appName: "Trade-In vs Private Sale Calculator",
  title: "Trade-In Value Calculator — vs Private Sale | MyDrivingCost",
  desc:
    "Estimate what your car fetches as a trade-in and as a private sale, then net out the sales-tax credit most states give on a trade. See which route wins.",
  ogTitle: "Trade-In Value Calculator — what your car is really worth",
  ogDesc:
    "The trade-in tax credit closes most of the gap to a private sale. See the arithmetic for your car, your state and your tax rate.",
  h1: "Trade-In Value Calculator",
  lead:
    "A dealer's trade-in offer is wholesale and a private-party price is retail. The gap looks damning until you count the sales-tax credit most states give you on a trade — often a thousand dollars or more. Enter your car and your tax rate to see which route genuinely pays.",
  inputs,
  results,
  floatBar,
  prose,
  js,
  disclaimer:
    "Values are modeled from typical depreciation curves by segment, adjusted for age, mileage and condition; they are not an appraisal. Sales-tax treatment of trade-ins varies by state and changes over time — confirm the rule with your own department of revenue before relying on it. Not financial advice.",
  sources: ["KBB_DEP", "AAA_YDC", "FED_G19"],
  sourceNotes: [
    "Trade-in value is a wholesale number and private-party value is a retail one; the gap between them is the dealer&rsquo;s reconditioning cost and margin, not an error. The condition grades here are broad bands &mdash; a real appraisal prices paint, tires, service history and accident record individually.",
  ],
  related: [
    ["/calculators/depreciation/", "Depreciation", "Where the value went in the first place, year by year."],
    ["/calculators/true-cost-to-own/", "True Cost to Own", "Resale value is one of six categories. Here are the other five."],
    ["/calculators/auto-loan/", "Auto Loan", "What rolling a payoff shortfall into the next loan actually costs."],
    ["/buying-guides/", "Buying guides", "How to negotiate the price, the trade and the financing separately."],
  ],
  faq: [
    [
      "Is it better to trade in a car or sell it privately?",
      "Selling privately usually nets more, but by less than most people assume. A private-party price typically runs 10 to 20 percent above a dealer's trade-in offer, and on a $15,000 car that is roughly $2,000. Against it you must set reconditioning of a few hundred dollars, several weekends of work, and — in most states — the sales-tax credit you forfeit by not trading. In a 7 percent state that credit is worth about $1,050, which closes most of the gap.",
    ],
    [
      "How does the trade-in sales tax credit work?",
      "In most US states you pay sales tax only on the difference between the price of the vehicle you are buying and the value of the vehicle you trade in. Buy a $34,000 car and trade one worth $15,000 in a 7 percent state and you are taxed on $19,000 rather than $34,000, saving $1,050. The credit applies at the point of sale, requires the trade and the purchase to happen together at the same dealer, and is capped by the price of the car you are buying.",
    ],
    [
      "Which states do not give a trade-in tax credit?",
      "California, Virginia, Hawaii, Kentucky, Maryland and Montana do not credit the trade-in against the taxable price, and Michigan credits only a capped portion. Alaska, Delaware, Montana, New Hampshire and Oregon have no state sales tax at all, so the question does not arise. Everywhere else, some form of credit generally applies. These rules do change, and some states cap the credit or treat leases differently, so confirm the current position with your state's department of revenue before you count on the money.",
    ],
    [
      "Why is a trade-in offer so much lower than my car's value?",
      "Because it is a wholesale price, not a retail one. The dealer has to recondition the vehicle, finance it while it sits on the lot, warrant it to the next buyer, pay a salesperson, and accept the risk it does not sell. Those costs are real and they come out of the offer. Appraisers work from recent auction results for the same year, trim and mileage, subtract a reconditioning estimate, and adjust for how quickly that model turns in your region.",
    ],
    [
      "Should I get an instant cash offer before going to a dealer?",
      "Yes, always. Several national buyers will price your car online in about ten minutes and hold the figure for roughly a week. It costs nothing, commits you to nothing, and converts your trade from a guess into a floor you can negotiate from. Instant offers usually come in a few percent below a good dealer appraisal because the buyer never sees the car, so a dealer who wants your business will often beat it. One who refuses has told you something worth knowing.",
    ],
    [
      "What if I still owe more than my car is worth?",
      "That is negative equity, and it does not disappear when you trade. The dealer subtracts your payoff from the trade allowance and adds any shortfall to your new loan, so you borrow the gap again and pay interest on it for years on a car you no longer own. Advertising that promises to pay off your loan regardless of the balance is describing this arrangement, not forgiving debt. The best answer is usually to keep the vehicle until the loan and the value cross.",
    ],
    [
      "How much does detailing raise a private sale price?",
      "A full professional detail costs $150 to $250 and typically returns several hundred dollars, making it the highest-return money in the whole exercise. It works because buyers read cleanliness as maintenance: a spotless engine bay and fresh carpets suggest an owner who kept up with the servicing, whether or not that is true. Pair it with a folder of service records, a pre-listing inspection and thirty honest daylight photographs, and the car sells faster as well as higher.",
    ],
    [
      "How do I take payment safely in a private car sale?",
      "Meet at your own bank during opening hours and complete the payment inside the branch, where a teller can verify a cashier's check with the issuing bank or confirm a wire has actually cleared. Photograph the buyer's license and check it against the name going on the title. Accompany any test drive. Complete the title transfer and file your state's release of liability the same day. Refuse overpayment checks, buyer-nominated escrow services and shipping agents outright — those are the standard fraud patterns.",
    ],
  ],
};
