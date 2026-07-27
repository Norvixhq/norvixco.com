/* Car Affordability Calculator — MyDrivingCost.com */
(function () {
  "use strict";
  var MDC = window.MDC, F = MDC.fmt, M = MDC.model;

  /* Site-wide benchmarks. Insurance and maintenance are quoted for a $34,000
     vehicle and scaled from there — part of each bill is fixed, part tracks
     the value of the metal. */
  var REF_PRICE = 34000;
  /* The five-year average of the escalating maintenance schedule the true cost
     to own calculator runs ($1,250 in year one, +12% a year, $7,941 total).
     Affordability is a cash-flow question about a single month, so it uses the
     flat average rather than the schedule — but it has to be the SAME average,
     or two calculators quote different maintenance for the same car. */
  var MAINT_BASE = 1588;
  var INS_FIXED = 0.62, MAINT_FIXED = 0.45;

  function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }

  function scale(price, fixedShare) {
    return clamp(fixedShare + (1 - fixedShare) * price / REF_PRICE, 0.4, 2.6);
  }

  /* Full monthly cost stack for a given vehicle price. */
  function costs(price, i, term, down, trade) {
    var t = i.tax / 100;
    var taxable = Math.max(0, price - trade);
    var otd = price + taxable * t + i.fees;
    var financed = Math.max(0, otd - down - trade);
    var pay = M.payment(financed, i.apr, term);
    var ins = i.insurance * scale(price, INS_FIXED) / 12;
    var maint = MAINT_BASE * scale(price, MAINT_FIXED) / 12;
    var fuel = (i.miles / 12) / Math.max(1, i.mpg) * i.fuel;
    var reg = i.reg / 12;
    var res = Math.max(0, i.reserve);
    return {
      price: price, otd: otd, financed: financed, salesTax: taxable * t,
      payment: pay, ins: ins, maint: maint, fuel: fuel, reg: reg, reserve: res,
      running: ins + maint + fuel + reg + res,
      allIn: pay + ins + maint + fuel + reg + res
    };
  }

  /* Bounded bisection. The cost function rises monotonically with price, so
     forty halvings of a $2,000–$250,000 window lands well inside a dollar. */
  function solve(target, fn) {
    var lo = 2000, hi = 250000, mid = lo;
    for (var n = 0; n < 40; n++) {
      mid = (lo + hi) / 2;
      if (fn(mid) > target) hi = mid; else lo = mid;
    }
    return (lo + hi) / 2;
  }

  /* Months spent owing more than the vehicle is worth. */
  function underwater(price, financed, apr, term) {
    var r = apr / 100 / 12, pay = M.payment(financed, apr, term);
    var bal = financed, last = 0, interest = 0;
    for (var m = 1; m <= term; m++) {
      var due = bal * r;
      interest += due;
      bal = Math.max(0, bal + due - pay);
      var yr = m / 12;
      var val = price * Math.pow(0.80, Math.min(1, yr)) * (yr > 1 ? Math.pow(0.85, yr - 1) : 1);
      if (bal > val) last = m;
    }
    return { months: last, interest: interest };
  }

  MDC.calc({
    form: "afford-form",
    defaults: {
      grossMonthly: 6500, takeHomePct: 76,
      budgetPct: 15, down: 3400, tradeIn: 0, term: "60", apr: 7.2,
      miles: 12000, mpg: 30, fuel: 4.0, insurance: 2496,
      tax: 7, reg: 220, fees: 700, reserve: 60, otherDebt: 2100, keepYears: 5
    },
    compute: function (i) {
      var term = parseInt(i.term, 10) || 60;
      var takeHome = i.grossMonthly * i.takeHomePct / 100;
      var budget = takeHome * i.budgetPct / 100;

      /* The honest answer: all-in cost equals the budget. */
      var maxPrice = solve(budget, function (p) {
        return costs(p, i, term, i.down, i.tradeIn).allIn;
      });
      var c = costs(maxPrice, i, term, i.down, i.tradeIn);
      var tooTight = maxPrice <= 2100;

      /* The dealer's answer: the whole budget goes to the payment. */
      var dealerPrice = solve(budget, function (p) {
        return costs(p, i, term, i.down, i.tradeIn).payment;
      });

      /* 20/4/10 — 20% down, 48 months, all-in under 10% of GROSS. */
      var ruleBudget = i.grossMonthly * 0.10;
      var rulePrice = solve(ruleBudget, function (p) {
        return costs(p, i, 48, p * 0.2, 0).allIn;
      });
      var downPct = maxPrice > 0 ? i.down / maxPrice * 100 : 0;
      var passDown = downPct >= 20, passTerm = term <= 48, passTen = c.allIn <= ruleBudget + 1;
      var passAll = passDown && passTerm && passTen;

      /* What a lender would sign off: back-end DTI at 45% of gross. */
      var allowedPay = Math.max(0, i.grossMonthly * 0.45 - i.otherDebt);
      var lenderPrice = solve(allowedPay, function (p) {
        return costs(p, i, term, i.down, i.tradeIn).payment;
      });
      var dti = i.grossMonthly > 0 ? (i.otherDebt + c.payment) / i.grossMonthly * 100 : 0;

      /* The 84-month version of the same budget. */
      var price84 = solve(budget, function (p) {
        return costs(p, i, 84, i.down, i.tradeIn).allIn;
      });
      var c84 = costs(price84, i, 84, i.down, i.tradeIn);
      var u84 = underwater(price84, c84.financed, i.apr, 84);
      var uNow = underwater(maxPrice, c.financed, i.apr, term);

      /* The three budget conventions, side by side. */
      var rules = [10, 15, 20].map(function (pct) {
        var b = takeHome * pct / 100;
        var p = solve(b, function (x) { return costs(x, i, term, i.down, i.tradeIn).allIn; });
        var rc = costs(p, i, term, i.down, i.tradeIn);
        return { pct: pct, budget: b, price: p, payment: rc.payment, floor: p <= 2100 };
      });

      return {
        /* At the very bottom of the range the search hits its floor and the
           running costs alone have already eaten the budget. Report zero
           rather than the floor, and let the callout explain why. */
        maxPrice: tooTight ? 0 : maxPrice,
        solvedPrice: maxPrice,
        payment: c.payment,
        allIn: c.allIn,
        dealerPrice: dealerPrice,
        gap: Math.max(0, dealerPrice - maxPrice),
        budget: budget,
        takeHome: takeHome,
        running: c.running,
        outTheDoor: c.otd,
        financed: c.financed,
        totalKeep: i.down + c.allIn * 12 * Math.max(1, i.keepYears),
        keepLabel: Math.max(1, i.keepYears) + (i.keepYears === 1 ? " year" : " years"),
        termLabel: term + " months",
        budgetPctLabel: i.budgetPct + "%",
        dti: dti,
        rulePrice: rulePrice,
        ruleBudget: ruleBudget,
        lenderPrice: lenderPrice,
        allowedPay: allowedPay,
        price84: price84,
        payment84: c84.payment,
        under84: u84.months,
        interest84: u84.interest,
        underNow: uNow.months,
        interestNow: uNow.interest,
        tooTight: tooTight,
        passDown: passDown, passTerm: passTerm, passTen: passTen, passAll: passAll,
        downPct: downPct,
        rules: rules,
        parts: c,
        term: term,
        _i: i
      };
    },
    onInput: function (i) {
      var set = function (k, v) {
        document.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) {
          if (el.closest(".field")) el.textContent = v;
        });
      };
      set("takeHomePct", i.takeHomePct + "%");
      set("budgetPct", i.budgetPct + "% of take-home");
      set("apr", i.apr.toFixed(1) + "%");
      set("miles", F.num(i.miles) + " mi/yr");
    },
    count: [],
    render: function (res, i) {
      var c = res.parts;

      /* ---- the six bills ------------------------------------------------ */
      var parts = [
        { label: "Loan payment", value: c.payment, css: "--c-finance", note: F.money(res.financed) + " financed" },
        { label: "Insurance", value: c.ins, css: "--c-insure", note: "scaled to a " + F.money(c.price) + " vehicle" },
        { label: "Fuel", value: c.fuel, css: "--c-fuel", note: F.num(i.miles) + " mi at " + i.mpg + " mpg" },
        { label: "Maintenance & tires", value: c.maint, css: "--c-maint", note: F.money(c.maint * 12) + " a year" },
        { label: "Registration", value: c.reg, css: "--c-tax", note: F.money(i.reg) + " a year" },
        { label: "Repair reserve", value: c.reserve, css: "--c-opp", note: "money set aside, not spent" }
      ].filter(function (p) { return p.value > 0.5; });
      var total = parts.reduce(function (a, b) { return a + b.value; }, 0);

      var donut = document.getElementById("donut");
      if (donut) MDC.charts.donut(donut, parts.map(function (p) {
        return { label: p.label, value: p.value, cssVar: p.css };
      }), {
        centerLabel: "All-in",
        centerValue: F.money(total),
        centerSub: "per month",
        aria: "All-in monthly cost split into its six components"
      });

      var bd = document.getElementById("breakdown");
      if (bd) {
        var rows = parts.slice().sort(function (a, b) { return b.value - a.value; }).map(function (p) {
          var pct = total > 0 ? p.value / total * 100 : 0;
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + p.css + ')"></span>' +
            '<span class="bd-name">' + p.label + '<small>' + p.note + '</small></span>' +
            '<span class="bd-pct num">' + Math.round(pct) + '%</span>' +
            '<span class="bd-val num">' + F.money(p.value) + '/mo</span>' +
            '</div>';
        }).join("");
        var payShare = total > 0 ? c.payment / total * 100 : 0;
        bd.innerHTML = rows +
          '<p class="text-muted" style="font-size:.84rem;margin-top:14px">The payment is only <strong>' +
          Math.round(payShare) + '%</strong> of what this vehicle takes out of the account each month. The other <strong>' +
          F.money(res.running) + '</strong> is the part a payment-only calculator never mentions. Across ' +
          res.keepLabel + ' of ownership, the down payment and the monthly total come to <strong>' +
          F.money(res.totalKeep) + '</strong>.</p>';
      }

      /* ---- the three budget conventions --------------------------------- */
      var verdicts = {
        10: "The conservative classic. At most incomes it points squarely at a used car — which is the honest consequence of the rule, not a failure of it.",
        15: "The mainstream planning figure. Workable when housing takes under a third of take-home and there is no other debt of consequence.",
        20: "The ceiling. Defensible for a short period, or when the vehicle is genuinely earning its keep. Not a place to live permanently."
      };
      var rt = document.getElementById("rules-table");
      if (rt) {
        var html = '<div class="table-wrap"><table class="tbl"><thead><tr>' +
          '<th>Rule</th><th class="num">Budget / mo</th><th class="num">Max price</th>' +
          '<th class="num">Payment</th><th>What it means</th></tr></thead><tbody>';
        res.rules.forEach(function (r) {
          var mine = r.pct === i.budgetPct;
          html += '<tr>' +
            '<td><strong>' + r.pct + '% of take-home</strong>' +
            (mine ? ' <span class="hint">&larr; yours</span>' : '') + '</td>' +
            '<td class="num">' + F.money(r.budget) + '</td>' +
            '<td class="num">' + (r.floor ? '&mdash;' : F.money(r.price)) + '</td>' +
            '<td class="num">' + (r.floor ? '&mdash;' : F.money(r.payment)) + '</td>' +
            '<td>' + (r.floor
              ? 'Running costs alone consume this budget. Nothing is left for a loan.'
              : verdicts[r.pct]) + '</td></tr>';
        });
        html += '</tbody></table></div>' +
          '<p class="text-muted" style="font-size:.85rem;margin-top:12px">All three figures are all-in: payment plus insurance, fuel, maintenance, registration and reserve. ' +
          'The step from 10% to 20% roughly ' +
          (res.rules[0].price > 2100 ? 'quadruples' : 'transforms') +
          ' the vehicle price, because the fixed running costs are paid first and everything above them flows straight into the loan.</p>';
        rt.innerHTML = html;
      }

      /* ---- honest number vs payment-only -------------------------------- */
      var gn = document.querySelector('[data-out="gapNote"]');
      if (gn) {
        if (res.tooTight) {
          gn.innerHTML = 'At this income and this budget share, insurance, fuel, maintenance, registration and the repair reserve consume <strong>' +
            F.money(res.running) + '</strong> of a <strong>' + F.money(res.budget) +
            '</strong> budget on their own. There is nothing left for a loan payment. A payment-only calculator would still cheerfully offer you <strong>' +
            F.money(res.dealerPrice) + '</strong> of vehicle. The honest options here are a car owned outright, fewer miles, a cheaper insurance policy — or a larger share of take-home, entered above.';
        } else {
          gn.innerHTML = 'Both numbers use the same budget of <strong>' + F.money(res.budget) +
            '</strong> a month and the same ' + res.termLabel +
            ' term. The only difference is what the money has to cover. Solving for the all-in cost gives <strong>' +
            F.money(res.maxPrice) + '</strong>. Solving for the payment alone — the method every dealer tool uses — gives <strong>' +
            F.money(res.dealerPrice) + '</strong>, a difference of <strong>' + F.money(res.gap) +
            '</strong>. That gap is not negotiable and it does not go away. It is the ' + F.money(res.running) +
            ' a month of insurance, fuel, maintenance, registration and repairs that the second method silently assumes you will find somewhere else.';
        }
      }

      /* ---- 20/4/10 ------------------------------------------------------- */
      var rn = document.querySelector('[data-out="ruleNote"]');
      if (rn && res.tooTight) {
        rn.innerHTML = 'The 20/4/10 rule caps all-in transport costs at 10% of gross income — <strong>' +
          F.money(res.ruleBudget) + '</strong> a month here. Your running costs alone are already <strong>' +
          F.money(res.running) + '</strong>, so no financed vehicle clears the test. The rule is not the binding constraint at this income; the cost of running any car at all is.';
      } else if (rn) {
        var checks = '<p style="margin:0 0 10px">' +
          (res.passDown ? '&#10003;' : '&#10007;') + ' <strong>20% down</strong> — yours is ' +
          res.downPct.toFixed(0) + '% of the vehicle price. &nbsp;' +
          (res.passTerm ? '&#10003;' : '&#10007;') + ' <strong>4-year term</strong> — yours is ' +
          res.termLabel + '. &nbsp;' +
          (res.passTen ? '&#10003;' : '&#10007;') + ' <strong>10% of gross</strong> — your all-in cost is ' +
          F.money(res.allIn) + ' against a ' + F.money(res.ruleBudget) + ' ceiling.</p>';
        rn.innerHTML = checks + '<p style="margin:0">' +
          (res.passAll
            ? 'This plan passes all three clauses of 20/4/10. That is a genuinely conservative position: you will hold equity from the first month and the loan will be gone before the vehicle needs anything expensive.'
            : 'This plan does not clear 20/4/10. Applied strictly — 20% down, 48 months, all-in under 10% of gross — the rule permits a vehicle of about <strong>' +
              F.money(res.rulePrice) + '</strong>. Treat that as the floor of prudence rather than a verdict: the 10%-of-gross clause is harsh on modest incomes and generous on large ones, and a household with no housing cost can reasonably sit above it.') +
          '</p>';
      }

      /* ---- lender DTI ---------------------------------------------------- */
      var ln = document.querySelector('[data-out="lenderNote"]');
      if (ln && res.allowedPay <= 1) {
        ln.innerHTML = 'Your existing obligations of <strong>' + F.money(i.otherDebt) +
          '</strong> a month already consume 45% of <strong>' + F.money(i.grossMonthly) +
          '</strong> gross, so a mainstream lender has no debt-to-income room left for a car payment at all. Subprime lenders will still write the loan at a much higher rate. That is a signal worth reading rather than shopping around.';
      } else if (ln) {
        ln.innerHTML = 'With <strong>' + F.money(i.otherDebt) + '</strong> a month of existing obligations against <strong>' +
          F.money(i.grossMonthly) + '</strong> gross, a 45% debt-to-income ceiling leaves <strong>' +
          F.money(res.allowedPay) + '</strong> of room for a car payment — enough to approve a vehicle of about <strong>' +
          F.money(res.lenderPrice) + '</strong>. At the price this calculator recommends, your ratio would sit at <strong>' +
          res.dti.toFixed(0) + '%</strong>. The lender is not being reckless; it is answering a question about default risk, and a car payment is one of the last bills anyone stops paying. It simply does not count the insurance, the fuel or the tires, and its exposure ends when the loan does. Yours does not.';
      }

      /* ---- the 84-month warning ------------------------------------------ */
      var n84 = document.querySelector('[data-out="note84"]');
      if (n84 && res.tooTight) {
        n84.innerHTML = 'Seven-year loans are sold as the way to make a payment fit. They cannot help here: the budget is exhausted by insurance, fuel, maintenance, registration and reserve before any term is chosen. Lengthening a loan only ever moves the payment — it never touches the other <strong>' +
          F.money(res.running) + '</strong> a month, which is the part that has already run out.';
      } else if (n84) {
        var lift = Math.max(0, res.price84 - res.solvedPrice);
        var extraInt = Math.max(0, res.interest84 - res.interestNow);
        n84.innerHTML = 'Stretching the same <strong>' + F.money(res.budget) +
          '</strong> budget across 84 months raises the price you appear to qualify for to <strong>' +
          F.money(res.price84) + '</strong> — about <strong>' + F.money(lift) +
          '</strong> more car for a payment of <strong>' + F.money(res.payment84) +
          '</strong>. The bill arrives in two parts. You pay roughly <strong>' + F.money(extraInt) +
          '</strong> more in interest, before allowing for the higher rate lenders attach to seven-year paper. And you spend about <strong>' +
          res.under84 + ' months</strong> owing more than the vehicle is worth, against ' +
          (res.underNow > 0 ? res.underNow + ' months' : 'none at all') +
          ' on your current term. During that window a total-loss accident or an early trade leaves you writing a check for a car you no longer have — and rolling that shortfall into the next loan is how a household ends up financing two vehicles and driving one.';
      }
    }
  });
})();
