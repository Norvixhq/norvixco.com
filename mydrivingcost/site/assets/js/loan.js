/* Auto Loan — MyDrivingCost.com */
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
