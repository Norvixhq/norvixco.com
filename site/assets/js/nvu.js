/* New vs Used — MyDrivingCost.com */
(function () {
  "use strict";
  var MDC = window.MDC, F = MDC.fmt, M = MDC.model;

  var DEP1 = 20, DEPN = 15;

  /* Typical asking price as a share of new, by age. Above the textbook curve —
     the used market has held a floor since the 2021-23 supply shortfall. */
  var DISC = { "2": 72, "3": 62, "4": 55, "5": 45 };
  var AGEWORD = { "2": "two-year-old", "3": "three-year-old", "4": "four-year-old", "5": "five-year-old" };

  /* Share of the original price retained at a given age, on the shared curve. */
  function retained(age) {
    if (age <= 0) return 1;
    return (1 - DEP1 / 100) * Math.pow(1 - DEPN / 100, age - 1);
  }

  MDC.calc({
    form: "nvu-form",
    defaults: {
      newPrice: 34000, newApr: 7.2,
      usedAge: "3", usedDiscount: 62, usedApr: 8.4,
      years: 5, miles: 12000, down: 3400, term: "60",
      insNew: 2496, insUsedPct: 88,
      maintNew: 1250, maintUsed: 1900, riskUsed: 600,
      tax: 7, fees: 700, reg: 220, mpg: 30, gas: 4
    },
    compute: function (i) {
      var age = parseInt(i.usedAge, 10) || 3;
      var term = parseInt(i.term, 10) || 60;
      var yrs = Math.max(1, i.years);
      var months = yrs * 12;
      var elapsed = Math.min(term, months);

      var pNew = Math.max(0, i.newPrice);
      var pUsed = pNew * (i.usedDiscount / 100);
      var floor = pNew * 0.03;

      /* Both cars sit on one curve. The used car simply starts further along it,
         so every year of your ownership is a later-year year. */
      var resaleNew = Math.max(floor, pNew * retained(yrs));
      var resaleUsed = Math.min(pUsed, Math.max(floor, pNew * retained(age + yrs)));

      var depNew = Math.max(0, pNew - resaleNew);
      var depUsed = Math.max(0, pUsed - resaleUsed);

      /* Finance. Interest only counts for the months you actually own the car. */
      var taxNew = pNew * (i.tax / 100);
      var taxUsed = pUsed * (i.tax / 100);
      var finNew = Math.max(0, pNew + taxNew + i.fees - i.down);
      var finUsed = Math.max(0, pUsed + taxUsed + i.fees - i.down);
      var intNew = M.interestPaid(finNew, i.newApr, term, elapsed).interest;
      var intUsed = M.interestPaid(finUsed, i.usedApr, term, elapsed).interest;
      var payNew = M.payment(finNew, i.newApr, term);
      var payUsed = M.payment(finUsed, i.usedApr, term);

      var insNewT = i.insNew * yrs;
      var insUsedT = i.insNew * (i.insUsedPct / 100) * yrs;
      var fuelT = i.mpg > 0 ? (i.miles / i.mpg) * i.gas * yrs : 0;
      var maintNewT = i.maintNew * yrs;
      var maintUsedT = (i.maintUsed + i.riskUsed) * yrs;
      var tfNew = taxNew + i.fees + i.reg * yrs;
      var tfUsed = taxUsed + i.fees + i.reg * yrs;

      var cats = [
        { label: "Depreciation", css: "--c-deprec", n: depNew, u: depUsed, note: "Purchase price minus what it's worth at the end" },
        { label: "Interest", css: "--c-finance", n: intNew, u: intUsed, note: "Paid over the months you own it" },
        { label: "Insurance", css: "--c-insure", n: insNewT, u: insUsedT, note: "Full coverage, both vehicles" },
        { label: "Fuel", css: "--c-fuel", n: fuelT, u: fuelT, note: "Identical: same model, same miles" },
        { label: "Maintenance & repairs", css: "--c-maint", n: maintNewT, u: maintUsedT, note: "Includes the used car's repair-risk allowance" },
        { label: "Tax, fees & registration", css: "--c-tax", n: tfNew, u: tfUsed, note: "Sales tax scales with the price you pay" }
      ];

      var totalNew = 0, totalUsed = 0;
      for (var c = 0; c < cats.length; c++) { totalNew += cats[c].n; totalUsed += cats[c].u; }
      var savings = totalNew - totalUsed;

      /* At what new-car APR would the two cars cost the same? */
      var needed = intNew - savings;
      var breakeven = -1;
      if (needed >= 0) {
        var lo = 0, hi = 30;
        for (var k = 0; k < 44; k++) {
          var mid = (lo + hi) / 2;
          if (M.interestPaid(finNew, mid, term, elapsed).interest > needed) hi = mid; else lo = mid;
        }
        breakeven = lo;
      }

      return {
        priceNew: pNew,
        usedPrice: pUsed,
        resaleNew: resaleNew,
        resaleUsed: resaleUsed,
        depNewOut: depNew,
        depUsedOut: depUsed,
        intNewOut: intNew,
        intUsedOut: intUsed,
        payNew: payNew,
        payUsed: payUsed,
        totalNew: totalNew,
        totalUsed: totalUsed,
        savings: savings,
        savingsPerMonth: savings / months,
        monthlyNew: totalNew / months,
        monthlyUsed: totalUsed / months,
        monthlyPair: F.money(totalNew / months) + " / " + F.money(totalUsed / months),
        yearsLabel: yrs + (yrs === 1 ? " year" : " years"),
        monthsLabel: months + " months",
        usedAgeLabel: AGEWORD[i.usedAge] || (age + "-year-old"),
        breakevenApr: breakeven,
        cats: cats,
        _i: i
      };
    },
    onSeg: function (name, val, api) {
      /* Picking an age loads the typical asking price, then the user overrides it. */
      if (name === "usedAge" && DISC[val]) api.setField("usedDiscount", DISC[val]);
    },
    onInput: function (i) {
      var set = function (k, v) {
        document.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) {
          if (el.closest(".field")) el.textContent = v;
        });
      };
      set("years", i.years + (i.years === 1 ? " year" : " years"));
      set("miles", F.num(i.miles) + " mi/yr");
      set("usedDiscount", i.usedDiscount + "% of new price");
      set("newApr", i.newApr.toFixed(1) + "%");
      set("usedApr", i.usedApr.toFixed(1) + "%");
    },
    count: [],
    render: function (res, i) {
      var cats = res.cats;
      var peak = 1;
      cats.forEach(function (c) { peak = Math.max(peak, c.n, c.u); });

      function bar(label, value, css, solid) {
        return '<span style="display:flex;align-items:center;gap:8px;margin-top:6px">' +
          '<span style="font-size:.7rem;font-weight:600;color:var(--muted-2);width:34px">' + label + '</span>' +
          '<span style="flex:1;height:9px;background:var(--border);border-radius:5px;overflow:hidden">' +
          '<span style="display:block;height:100%;border-radius:5px;width:' +
          (value / peak * 100).toFixed(1) + '%;background:var(' + css + ');opacity:' + (solid ? '1' : '.5') + '"></span>' +
          '</span>' +
          '<span class="num" style="font-size:.78rem;font-weight:700;width:70px;text-align:right">' + F.money(value) + '</span>' +
          '</span>';
      }

      /* ---- side-by-side comparison, built as .bd-row markup --------------- */
      var sbs = document.getElementById("sbs");
      if (sbs) {
        var html = '<div class="breakdown">';
        cats.forEach(function (c) {
          var diff = c.n - c.u;
          var pct = c.n > 0 ? diff / c.n * 100 : 0;
          html += '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + c.css + ')"></span>' +
            '<span class="bd-name">' + c.label + '<small>' + c.note + '</small>' +
            bar("New", c.n, c.css, true) + bar("Used", c.u, c.css, false) +
            '</span>' +
            '<span class="bd-pct num">' + (diff >= 0 ? "−" : "+") + Math.abs(Math.round(pct)) + '%</span>' +
            '<span class="bd-val num" style="color:' + (diff >= 0 ? 'var(--success)' : 'var(--ink-strong)') + '">' +
            (diff >= 0 ? "−" : "+") + F.money(Math.abs(diff)) + '</span>' +
            '</div>';
        });
        html += '</div>';
        sbs.innerHTML = html +
          '<p class="text-muted" style="font-size:.85rem;margin-top:14px">The right-hand column is what the used car saves in each category. ' +
          'Only maintenance runs the other way &mdash; and on these assumptions it gives back ' +
          F.money(Math.max(0, cats[4].u - cats[4].n)) + ' of the ' +
          F.money(Math.max(0, cats[0].n - cats[0].u)) + ' won on depreciation.</p>';
      }

      /* ---- full ledger table --------------------------------------------- */
      var t = document.getElementById("cmp-table");
      if (t) {
        var rows = "";
        cats.forEach(function (c) {
          var d = c.n - c.u;
          rows += '<tr><td>' + c.label + '</td>' +
            '<td class="num">' + F.money(c.n) + '</td>' +
            '<td class="num">' + F.money(c.u) + '</td>' +
            '<td class="num">' + (Math.abs(d) < 1 ? "&mdash;" : (d > 0 ? "−" : "+") + F.money(Math.abs(d))) + '</td></tr>';
        });
        rows += '<tr><td><strong>Total cost of ownership</strong></td>' +
          '<td class="num"><strong>' + F.money(res.totalNew) + '</strong></td>' +
          '<td class="num"><strong>' + F.money(res.totalUsed) + '</strong></td>' +
          '<td class="num"><strong>' + (res.savings >= 0 ? "−" : "+") + F.money(Math.abs(res.savings)) + '</strong></td></tr>';
        rows += '<tr><td>Per month, all in</td>' +
          '<td class="num">' + F.money(res.monthlyNew) + '</td>' +
          '<td class="num">' + F.money(res.monthlyUsed) + '</td>' +
          '<td class="num">' + (res.savings >= 0 ? "−" : "+") + F.money(Math.abs(res.savingsPerMonth)) + '</td></tr>';
        rows += '<tr><td>Loan payment</td>' +
          '<td class="num">' + F.money(res.payNew) + '</td>' +
          '<td class="num">' + F.money(res.payUsed) + '</td>' +
          '<td class="num">&mdash;</td></tr>';
        rows += '<tr><td>Worth at the end</td>' +
          '<td class="num">' + F.money(res.resaleNew) + '</td>' +
          '<td class="num">' + F.money(res.resaleUsed) + '</td>' +
          '<td class="num">&mdash;</td></tr>';

        t.innerHTML = '<div class="table-wrap"><table class="tbl"><thead><tr>' +
          '<th>Category</th><th class="num">New</th><th class="num">' +
          (res.usedAgeLabel.charAt(0).toUpperCase() + res.usedAgeLabel.slice(1)) +
          '</th><th class="num">Used saves</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
          '<p class="text-muted" style="font-size:.85rem;margin-top:12px">Loan payments are shown for context only &mdash; principal repayment is not a cost, ' +
          'because the money is either still in the car or already counted as depreciation.</p>';
      }

      /* ---- verdict lines -------------------------------------------------- */
      var vl = document.querySelector('[data-out="verdictLine"]');
      if (vl) {
        if (res.savings > 0) {
          vl.innerHTML = 'Buying used wins here by <strong>' + F.money(res.savings) + '</strong> &mdash; about <strong>' +
            F.money(res.savingsPerMonth) + ' a month</strong> for the whole period.';
        } else if (res.savings < 0) {
          vl.innerHTML = 'On these numbers the <strong>new car is actually cheaper</strong>, by ' +
            F.money(-res.savings) + '. Check the finance rate before you assume that is a mistake.';
        } else {
          vl.innerHTML = 'The two are level. At this point choose on warranty, specification and how long you intend to keep it.';
        }
      }

      var cn = document.querySelector('[data-out="counterNote"]');
      if (cn) {
        if (res.breakevenApr < 0) {
          cn.innerHTML = 'At these assumptions no finance rate can rescue the new car &mdash; even at 0% the used one still wins by ' +
            F.money(res.savings - res.intNewOut) + ', so the gap is coming from depreciation and running costs rather than interest.';
        } else if (res.breakevenApr >= i.newApr) {
          cn.innerHTML = 'You have already entered a rate at or below the break-even, which is why the new car is holding its own here.';
        } else {
          cn.innerHTML = 'On your numbers the new car draws level at about <strong>' +
            res.breakevenApr.toFixed(1) + '% APR</strong> and wins outright below it &mdash; against ' +
            i.newApr.toFixed(1) + '% at market rates. Ask what the captive lender is offering before you rule new out.';
        }
      }

      /* ---- donut: the used car's cost breakdown --------------------------- */
      var parts = cats.filter(function (c) { return c.u > 0.5; });
      var grand = parts.reduce(function (a, b) { return a + b.u; }, 0);

      var donut = document.getElementById("donut");
      if (donut) MDC.charts.donut(donut, parts.map(function (p) {
        return { label: p.label, value: p.u, cssVar: p.css };
      }), {
        centerLabel: "Used car",
        centerValue: F.money(grand),
        centerSub: F.money(res.monthlyUsed) + "/mo",
        aria: "Cost of owning the used car split by category"
      });

      var bd = document.getElementById("breakdown");
      if (bd) {
        bd.innerHTML = parts.slice().sort(function (a, b) { return b.u - a.u; }).map(function (p) {
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + p.css + ')"></span>' +
            '<span class="bd-name">' + p.label + '<small>' + F.money(p.u / Math.max(1, i.years)) + ' / year</small></span>' +
            '<span class="bd-pct num">' + Math.round(p.u / grand * 100) + '%</span>' +
            '<span class="bd-val num">' + F.money(p.u) + '</span>' +
            '</div>';
        }).join("") +
        '<p class="text-muted" style="font-size:.84rem;margin-top:14px">Depreciation is still the largest line on a used car. ' +
        'It is simply a smaller number, applied to a smaller price, on the flatter part of the curve.</p>';
      }
    }
  });
})();
