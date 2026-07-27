const C = require("../calcpage");
const { num, rng, group, advanced, hero, tiles, chartCard, callout, bullets, table } = C;

/* ------------------------------------------------------------------ HTML -- */

const inputs = [
  group(
    "The deal",
    [
      num("price", "Vehicle price", 34000, { prefix: "$", min: 500, step: 500 }),
      num("down", "Cash down payment", 3400, { prefix: "$", min: 0, max: 250000, step: 250 }),
      num("trade", "Trade-in value", 0, { prefix: "$", min: 0, step: 250 }),
      num("owed", "Still owed on trade-in", 0, {
        prefix: "$",
        min: 0,
        step: 250,
        help: "Anything you still owe gets rolled into the new loan. This is where negative equity comes from.",
      }),
    ].join("\n              ")
  ),
  group(
    "The loan",
    [
      rng("apr", "APR", 7.2, { min: 0, max: 24, step: 0.1, initial: "7.2%" }),
      rng("term", "Term", 60, { min: 12, max: 96, step: 6, initial: "60 months · 5 years" }),
    ].join("\n              "),
    "var(--c-finance)"
  ),
  group(
    "Tax &amp; fees",
    [
      num("tax", "Sales tax", 7, { suffix: "%", min: 0, max: 15, step: 0.1 }),
      num("fees", "Doc, title &amp; registration fees", 700, { prefix: "$", min: 0, step: 25 }),
      `<p class="field-help">Most states tax the price after the trade-in credit, which is why a trade-in is worth slightly more than its cash value.</p>`,
    ].join("\n              "),
    "var(--c-tax)"
  ),
  advanced(
    [
      `<p class="field-help">Used to show when you cross from negative into positive equity.</p>`,
      rng("dep1", "First-year depreciation", 20, { min: 5, max: 40, step: 1, initial: "20%" }),
      rng("depN", "Each later year", 15, { min: 3, max: 25, step: 1, initial: "15%" }),
      num("extra", "Extra payment each month", 0, {
        prefix: "$",
        suffix: "/mo",
        min: 0,
        step: 25,
        help: "Applied straight to principal. Even $50 shortens the loan noticeably.",
      }),
    ].join("\n                  ")
  ),
].join("\n            ");

const results = [
  hero(
    "Auto Loan summary",
    "Your monthly payment",
    "payment",
    "money",
    'Over <strong data-out="termLabel">60 months</strong> you\'ll repay <strong class="num" data-out="totalPaid" data-fmt="money">—</strong> on a <strong class="num" data-out="financed" data-fmt="money">—</strong> loan — meaning <strong class="num" data-out="interest" data-fmt="money">—</strong> of it is interest.'
  ),
  tiles([
    ["Amount financed", "financed", "money", "After down payment and trade"],
    ["Total interest", "interest", "money", 'That\'s <span data-out="interestPct" data-fmt="pct">—</span> of the amount borrowed'],
    ["Out-the-door cost", "outTheDoor", "money", "Price plus tax and fees"],
  ]),
  chartCard(
    "Loan balance versus what the car is worth",
    "The gap between the two lines is your equity — or, early on, the hole",
    `<div id="bal-chart"></div>
          <div class="callout" style="margin-top:20px">
            <div class="callout-title"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg><span data-out="equityTitle">Equity position</span></div>
            <span data-out="equityNote">—</span>
          </div>`
  ),
  chartCard(
    "Where every dollar goes",
    "The total you'll hand over, split by what it actually buys",
    `<div class="donut-wrap">
            <div id="donut"></div>
            <div class="breakdown" id="breakdown"></div>
          </div>`
  ),
  chartCard(
    "Year-by-year amortization",
    "How the split between interest and principal shifts as the loan ages",
    `<div id="amort"></div>`
  ),
  callout(
    "What a shorter term would cost you",
    '<span data-out="termCompare">—</span>'
  ),
].join("\n\n        ");

const floatBar = `<div class="float-summary no-print" id="floatSummary" aria-hidden="true">
  <div class="fs-item"><span class="k">Monthly</span><span class="v num" data-out="payment" data-fmt="money">—</span></div>
  <div class="fs-sep"></div>
  <div class="fs-item fs-hide-sm"><span class="k">Total interest</span><span class="v num" data-out="interest" data-fmt="money">—</span></div>
  <button type="button" class="btn btn-primary btn-sm" data-scroll="calc">Edit</button>
</div>`;

/* ------------------------------------------------------------------ prose -- */

const prose = `
    <h2 id="how-it-works">How an auto loan payment is calculated</h2>
    <p>An auto loan is a standard amortizing loan. Every payment is the same size, but the split inside it moves: early payments are mostly interest, late payments are mostly principal. The formula behind the payment is:</p>
    ${callout(
      "Payment = P × r ÷ (1 − (1 + r)^−n)",
      "<p style='margin:0'>Where <strong>P</strong> is the amount financed, <strong>r</strong> is the monthly rate (APR ÷ 12), and <strong>n</strong> is the number of months. A $34,000 car with $3,400 down, 7% sales tax and $700 in fees finances about $33,680; at 7.2% over 60 months that's a payment of roughly $671 and about $6,600 in total interest.</p>"
    )}
    <p>The amount financed is where most surprises live. It isn't the sticker price — it's the price, <em>plus</em> sales tax, <em>plus</em> documentation, title and registration fees, <em>minus</em> your down payment and trade-in equity. Buyers who negotiate hard on price and then let $1,800 of fees ride into the loan have given most of the win back.</p>

    <h2 id="term-trap">The longer-term trap</h2>
    <p>Lenders will happily quote you a payment rather than a price, and stretching the term is the easiest way to make any payment look affordable. It's also the most expensive habit in car buying. Here's the same $32,000 loan at each common term:</p>
    ${table(
      ["Term", "Typical APR", "Monthly payment", "Total interest", "Extra vs 48 months"],
      [
        ["48 months", "6.8%", "$763", "$4,639", "—"],
        ["60 months", "7.2%", "$637", "$6,200", "+$1,561"],
        ["72 months", "7.9%", "$560", "$8,284", "+$3,645"],
        ["84 months", "8.4%", "$505", "$10,433", "+$5,794"],
      ],
      [1, 2, 3, 4]
    )}
    <p>The 84-month payment is $258 a month cheaper than the 48-month payment, which is exactly why it gets sold. It also costs <strong>$5,794 more in interest</strong>, and on a car bought with little money down it leaves you underwater for roughly four and a half years — month 54 of 84, at our default depreciation curve. Two separate things are working against you at once: you pay interest for thirty-six extra months, and you pay a higher rate while you do it, because the lender is taking more risk on a depreciating asset. Hold the rate flat at 7.2% on the same $32,000 and the 84-month loan still costs $3,908 more than the 48-month one; the remaining $1,886 in the table is the rate premium the term length itself buys you.</p>
    ${callout(
      "The rule worth following",
      "Twenty percent down, a term no longer than sixty months, and total transport costs under ten percent of gross income. If a car only works at 72 or 84 months, it is not a car you can afford — that's the message the term length is sending you.",
      "warn"
    )}

    <h2 id="negative-equity">Negative equity: owing more than it's worth</h2>
    <p>A new vehicle loses roughly 20 percent of its value in year one, while a long loan repays principal slowly at the start. The two curves cross well after purchase, and until they do you're underwater — you owe more than the car would sell for. On an 84-month loan with little money down, that can last four or five years.</p>
    <p>Being underwater doesn't matter at all until something happens. Then it matters a great deal. If the car is totaled, your insurer pays the market value, not your loan balance, and you're left writing a check for the difference on a car you no longer have. If you need to sell or trade early, the gap either comes out of your pocket or gets rolled into the next loan — which is how buyers end up financing $41,000 on a $34,000 car and repeating the cycle permanently.</p>
    ${bullets([
      "<strong>Put twenty percent down.</strong> It's the cleanest way to start above water and stay there.",
      "<strong>Keep the term at sixty months or less.</strong> Principal repays fast enough to outrun depreciation.",
      "<strong>Buy gap insurance if you're underwater</strong> — but only while you actually are. It's cheap through your own insurer and expensive through the finance office, and once you have equity you should cancel it.",
      "<strong>Never roll negative equity forward.</strong> Rolling $6,000 of old debt into a new loan means paying interest for seven years on a car you no longer drive. If you're underwater, the answer is almost always to keep the vehicle until you aren't.",
    ])}

    <h2 id="rate">Getting a better rate</h2>
    <p>Rate matters less than term but more than most people assume: a point and a half of APR on a $32,000 sixty-month loan is roughly $1,300 over the life of the loan. Three things move it.</p>
    ${bullets([
      "<strong>Get pre-approved before you shop.</strong> Take a written offer from your bank or credit union to the dealership and let their finance office try to beat it. If they can, you win; if they can't, you already had the better deal. This single step is worth more than any negotiating tactic.",
      "<strong>Shop within a two-week window.</strong> Credit scoring models treat multiple auto-loan inquiries in a short period as a single event, so rate shopping does not stack up hard inquiries against you.",
      "<strong>Watch what happens to promotional financing.</strong> Manufacturer 0% and 1.9% offers are genuinely good, but they usually replace a cash rebate rather than adding to it. Compare total cost both ways — sometimes taking $3,000 cash back and a 7% loan beats 0% financing at full price, and sometimes it doesn't.",
    ])}
    ${callout(
      "The finance office is a profit center",
      "After you agree a price, you'll be moved to a second desk and offered extended warranties, gap coverage, paint and fabric protection, key replacement and tire-and-wheel plans. These carry very high margins, and their prices are negotiable — often by half. You can also decline all of them and buy the ones you actually want later, usually cheaper. Nothing offered at that desk is required to complete the purchase.",
      "warn"
    )}
`;

/* -------------------------------------------------------------------- JS -- */

const js = `/* Auto Loan — MyDrivingCost.com */
(function () {
  "use strict";
  var MDC = window.MDC, F = MDC.fmt, M = MDC.model;

  function schedule(principal, aprPct, months, extra) {
    var r = aprPct / 100 / 12;
    var pay = M.payment(principal, aprPct, months) + (extra || 0);
    var bal = principal, rows = [], totalInt = 0, m = 0;
    while (bal > 0.01 && m < 600) {
      var int = bal * r;
      var prin = Math.min(pay - int, bal);
      if (prin <= 0) break;
      bal = bal - prin;
      totalInt += int;
      m++;
      rows.push({ m: m, interest: int, principal: prin, balance: bal });
    }
    return { rows: rows, interest: totalInt, months: m, payment: pay };
  }

  MDC.calc({
    form: "loan-form",
    defaults: {
      price: 34000, down: 3400, trade: 0, owed: 0,
      apr: 7.2, term: 60, tax: 7, fees: 700,
      dep1: 20, depN: 15, extra: 0
    },
    compute: function (i) {
      var taxable = Math.max(0, i.price - i.trade);
      var salesTax = taxable * (i.tax / 100);
      var outTheDoor = i.price + salesTax + i.fees;
      var equity = i.trade - i.owed;
      var financed = Math.max(0, outTheDoor - i.down - equity);

      var s = schedule(financed, i.apr, i.term, i.extra);
      var basePay = M.payment(financed, i.apr, i.term);

      /* value curve, monthly */
      var val = [], ret = 1;
      for (var m = 0; m <= s.months; m++) {
        var yr = m / 12;
        var v = i.price * Math.pow(1 - i.dep1 / 100, Math.min(1, yr)) *
                (yr > 1 ? Math.pow(1 - i.depN / 100, yr - 1) : 1);
        val.push(v);
      }
      /* Underwater window. This has to scan the WHOLE schedule, not stop at the
         first month where value >= balance. A loan can start above water — a
         down payment slightly larger than the tax and fees rolled in — and go
         underwater in month three anyway, because first-year depreciation
         outruns early principal (the early payments are mostly interest).
         Reporting only the first crossing told a buyer on the default inputs
         "you start with equity, exactly where you want to be" while they were
         in fact upside down from month 3 to month 16. */
      var under = { months: 0, first: 0, last: 0, worst: 0, worstM: 0 };
      for (var k = 0; k < s.rows.length; k++) {
        var gap = val[k + 1] - s.rows[k].balance;
        if (gap < 0) {
          under.months++;
          if (!under.first) under.first = s.rows[k].m;
          under.last = s.rows[k].m;
          if (-gap > under.worst) { under.worst = -gap; under.worstM = s.rows[k].m; }
        }
      }
      var startGap = val[0] - financed;

      /* shorter-term comparison */
      var shorter = Math.max(12, i.term - 12);
      var sPay = M.payment(financed, i.apr, shorter);
      var sInt = M.interestPaid(financed, i.apr, shorter, shorter).interest;

      return {
        payment: basePay,
        payWithExtra: s.payment,
        financed: financed,
        interest: s.interest,
        interestPct: financed > 0 ? s.interest / financed * 100 : 0,
        totalPaid: financed + s.interest,
        outTheDoor: outTheDoor,
        salesTax: salesTax,
        termLabel: s.months + " months",
        realMonths: s.months,
        under: under,
        startGap: startGap,
        shorterTerm: shorter,
        shorterPay: sPay,
        shorterInt: sInt,
        rows: s.rows,
        val: val,
        _i: i
      };
    },
    onInput: function (i) {
      var set = function (k, v) {
        document.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) {
          if (el.closest(".field")) el.textContent = v;
        });
      };
      set("apr", i.apr.toFixed(1) + "%");
      set("term", i.term + " months · " + (i.term / 12).toFixed(i.term % 12 ? 1 : 0) + " years");
      set("dep1", i.dep1 + "%");
      set("depN", i.depN + "%");
    },
    render: function (res, i) {
      /* balance vs value */
      var host = document.getElementById("bal-chart");
      if (host && res.rows.length) {
        var pts = res.rows.filter(function (r, idx) {
          return idx % Math.max(1, Math.round(res.rows.length / 24)) === 0 || idx === res.rows.length - 1;
        }).map(function (r) { return { x: r.m, y: r.balance }; });
        pts.unshift({ x: 0, y: res.financed });
        MDC.charts.area(host, pts, {
          cssVar: "--c-finance",
          yMax: Math.max(res.financed, i.price) * 1.06,
          yFmt: function (v) { return "$" + Math.round(v / 1000) + "k"; },
          xFmt: function (x) { return x === 0 ? "Now" : "M" + x; },
          xLabelFmt: function (x) { return "Month " + x; },
          aria: "Loan balance declining over the term"
        });
      } else if (host) {
        /* Nothing financed — cash down plus trade equity already covers the
           out-the-door price. Without this branch the previous run's chart
           stayed on screen, silently describing a loan that no longer exists. */
        host.innerHTML = '<p class="empty-note">Nothing is being financed on these figures. Your cash down and trade equity already cover the whole out-the-door price, so there is no balance to chart.</p>';
      }

      var et = document.querySelector('[data-out="equityTitle"]');
      var en = document.querySelector('[data-out="equityNote"]');
      if (et && en) {
        var u = res.under;
        if (u.months === 0) {
          et.textContent = "You never owe more than the car is worth";
          en.innerHTML = "Your down payment is big enough to stay ahead of first-year depreciation, so the balance sits below the vehicle's value for the whole term — starting about <strong>" +
            F.money(res.startGap) + "</strong> ahead. That's exactly where you want to be: you could sell the car, or total it, at any point in the loan and walk away whole.";
        } else {
          var half = u.months >= Math.max(1, Math.round(res.realMonths * 0.5));
          et.textContent = "You're underwater for " + u.months + " of the " + res.realMonths + " months";
          en.innerHTML =
            "From <strong>month " + u.first + "</strong> to <strong>month " + u.last +
            "</strong> you owe more than the car is worth — at the low point, about <strong>" +
            F.money(u.worst) + "</strong> more, around month " + u.worstM + ". " +
            (u.first > 1
              ? "You do start with roughly " + F.money(res.startGap) +
                " of equity, which is the part most buyers miss: first-year depreciation is faster than early principal, because early payments are mostly interest. "
              : "You start owing roughly " + F.money(Math.abs(res.startGap)) +
                " more than the car is worth, because the tax and fees financed into the loan buy you nothing you can resell. ") +
            "Until you surface, a total-loss accident or an early sale leaves you paying the difference out of pocket — that gap is what gap insurance covers." +
            (half
              ? " Being upside down for more than half the loan is a signal to restructure: more cash down, or a shorter term, moves the crossover forward by months."
              : "");
        }
      }

      /* donut: principal / interest / tax / fees / down */
      var parts = [
        { label: "Vehicle price financed", value: Math.max(0, res.financed - res.salesTax - i.fees), css: "--c-deprec" },
        { label: "Interest", value: res.interest, css: "--c-finance" },
        { label: "Sales tax", value: res.salesTax, css: "--c-tax" },
        { label: "Doc, title & registration", value: i.fees, css: "--c-maint" },
        { label: "Cash down & trade equity", value: i.down + Math.max(0, i.trade - i.owed), css: "--c-insure" }
      ].filter(function (p) { return p.value > 0.5; });
      var grand = parts.reduce(function (a, b) { return a + b.value; }, 0);

      var bd = document.getElementById("breakdown");
      if (bd) {
        bd.innerHTML = parts.slice().sort(function (a, b) { return b.value - a.value; }).map(function (p) {
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + p.css + ')"></span>' +
            '<span class="bd-name">' + p.label + '</span>' +
            '<span class="bd-pct num">' + Math.round(p.value / grand * 100) + '%</span>' +
            '<span class="bd-val num">' + F.money(p.value) + '</span>' +
            '</div>';
        }).join("");
      }
      var donut = document.getElementById("donut");
      if (donut) MDC.charts.donut(donut, parts.map(function (p) {
        return { label: p.label, value: p.value, cssVar: p.css };
      }), {
        centerLabel: "Total outlay",
        centerValue: F.money(grand),
        centerSub: F.money(res.payment) + "/mo",
        aria: "Total cost of the purchase split by category"
      });

      /* yearly amortization table */
      var am = document.getElementById("amort");
      if (am && res.rows.length) {
        var years = [];
        res.rows.forEach(function (r) {
          var y = Math.ceil(r.m / 12);
          years[y] = years[y] || { y: y, i: 0, p: 0, bal: 0 };
          years[y].i += r.interest; years[y].p += r.principal; years[y].bal = r.balance;
        });
        var html = '<div class="table-wrap"><table class="tbl"><caption class="sr-only">Year-by-year loan amortization: interest, principal, interest share and closing balance</caption><thead><tr>' +
          '<th scope="col">Year</th><th scope="col" class="num">Interest</th><th scope="col" class="num">Principal</th>' +
          '<th scope="col" class="num">Interest share</th><th scope="col" class="num">Balance at year end</th></tr></thead><tbody>';
        years.forEach(function (y) {
          if (!y) return;
          html += '<tr><td>Year ' + y.y + '</td><td class="num">' + F.money(y.i) + '</td><td class="num">' +
            F.money(y.p) + '</td><td class="num">' + Math.round(y.i / (y.i + y.p) * 100) + '%</td><td class="num">' +
            F.money(y.bal) + '</td></tr>';
        });
        html += '</tbody></table></div>';
        am.innerHTML = html;
      } else if (am) {
        am.innerHTML = '<p class="empty-note">No loan, so there is no amortization schedule to show. Lower the down payment or the trade-in value to model financing.</p>';
      }

      var tc = document.querySelector('[data-out="termCompare"]');
      if (tc) {
        var saved = res.interest - res.shorterInt;
        var more = res.shorterPay - res.payment;
        if (res.shorterTerm >= i.term || saved <= 0) {
          tc.innerHTML = "This is already a short loan — there's little interest left to save by shortening it further.";
        } else {
          tc.innerHTML = "Dropping from " + i.term + " months to " + res.shorterTerm + " months raises the payment by <strong>" +
            F.money(more) + " a month</strong> but saves <strong>" + F.money(saved) +
            "</strong> in interest — and gets you above water roughly a year sooner. If the shorter payment is uncomfortable, that's useful information about the price of the car rather than the length of the loan.";
        }
      }
    }
  });
})();
`;

module.exports = {
  slug: "auto-loan",
  jsName: "loan",
  formId: "loan-form",
  crumbName: "Auto Loan",
  appName: "Auto Loan Calculator",
  title: "Auto Loan Calculator — Negative Equity | MyDrivingCost",
  desc:
    "Your car loan payment, total interest and full amortization — plus the month you stop owing more than the car is worth. Every assumption is editable.",
  ogTitle: "Auto Loan Calculator — payment, interest and negative equity",
  ogDesc:
    "Monthly payment, total interest, year-by-year amortization and how long you stay underwater.",
  h1: "Auto Loan Calculator",
  lead:
    "Payment, total interest and the full amortization schedule — plus the chart most loan calculators won't show you: your balance against what the car is actually worth, and the month you finally cross into positive equity.",
  inputs,
  results,
  floatBar,
  prose,
  js,
  disclaimer:
    "Estimates only. Actual terms depend on your credit, the lender, the vehicle and state taxes and fees. Depreciation is a projection, not a guarantee. Not financial advice.",
  sources: ["FED_G19", "KBB_DEP", "AAA_YDC"],
  sourceNotes: [
    "The default rate and term are representative rather than current. The Federal Reserve&rsquo;s Terms of Credit table is the right place to check what new-car lending actually costs on the day you read this, and the rate field is the first thing most visitors change.",
  ],
  related: [
    ["/calculators/lease-vs-buy/", "Lease vs Buy", "Compare financing against leasing and paying cash on true total cost."],
    ["/calculators/true-cost-to-own/", "True Cost to Own", "The loan is one line. See the other six."],
    ["/calculators/depreciation/", "Depreciation", "Model the value curve that decides when you get above water."],
    ["/buying-guides/", "Buying guides", "Negotiation, financing, trade-ins and the payment trap in full."],
  ],
  faq: [
    [
      "How is a car loan payment calculated?",
      "It uses the standard amortization formula: payment equals principal times the monthly rate, divided by one minus (one plus the monthly rate) raised to the negative number of months. The monthly rate is your APR divided by twelve. What matters more than the formula is the principal — it's the out-the-door price including sales tax and fees, minus your down payment and any trade-in equity, which is usually several thousand more than buyers expect.",
    ],
    [
      "What is a good APR on a car loan?",
      "It depends almost entirely on your credit score and whether the vehicle is new or used. Borrowers with excellent credit typically see the mid-fives to low sevens on new vehicles, while subprime borrowers can face the high teens. Used-car rates run roughly one to two points above new. The single most reliable way to know whether your quoted rate is good is to get pre-approved by a credit union first and use that as your benchmark.",
    ],
    [
      "Should I take a 72 or 84-month car loan?",
      "Generally no. Long terms carry higher rates, cost thousands more in total interest, and keep you underwater on the vehicle for years — meaning a total-loss accident or an early sale leaves you writing a check. If a car only fits your budget at 72 or 84 months, the honest conclusion is that it's more car than the budget supports. Sixty months is a sensible ceiling for most buyers.",
    ],
    [
      "What does it mean to be underwater on a car loan?",
      "It means the loan balance exceeds what the vehicle would sell for — also called negative equity. It happens because a new car loses around 20 percent of its value in year one while a long loan repays principal slowly. It's harmless right up until you need to sell, trade or claim a total loss, at which point the gap becomes cash you owe on a car you no longer have.",
    ],
    [
      "Does a bigger down payment save money?",
      "Yes, in three ways at once. You borrow less, so you pay interest on a smaller balance; you start with equity rather than a hole; and larger down payments sometimes qualify for better rates. Twenty percent is the conventional target because it roughly offsets first-year depreciation, keeping you above water from the moment you drive away.",
    ],
    [
      "Is 0% financing better than a cash rebate?",
      "Sometimes, and you have to run both. Manufacturers usually offer one or the other, not both, so the real comparison is the full price at 0% against the discounted price at your best available rate. On a $34,000 vehicle, a $3,000 rebate with a 6% loan often beats 0% at full price — but on a larger loan or a longer term, 0% usually wins. Calculate the total of payments each way and pick the smaller number.",
    ],
    [
      "Should I make extra payments on my car loan?",
      "If you have no higher-interest debt and a solid emergency fund, yes. Auto loans have no prepayment penalty in most states, and extra principal shortens the term and cuts total interest. Even $50 a month makes a visible difference — the advanced panel of this calculator will show you exactly how much. Confirm your lender applies extra payments to principal rather than treating them as the next payment in advance.",
    ],
    [
      "Do I need gap insurance?",
      "Only while you're underwater, which this calculator shows you precisely. If a total loss would leave you owing more than the insurer pays out, gap coverage bridges that difference for a few dollars a month. Buy it from your own auto insurer rather than the dealership's finance office, where it typically costs several times more, and cancel it once you have positive equity.",
    ],
  ],
};
