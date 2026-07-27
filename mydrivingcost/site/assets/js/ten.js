/* 10-Year Car Cost Calculator — MyDrivingCost.com */
(function () {
  "use strict";
  var MDC = window.MDC, F = MDC.fmt, M = MDC.model;

  /* First-year and steady-state depreciation rates by segment. */
  var SEG = {
    truck: { d1: 16, dn: 11 },
    suv:   { d1: 20, dn: 15 },
    sedan: { d1: 21, dn: 16 },
    lux:   { d1: 25, dn: 18 },
    ev:    { d1: 26, dn: 17 }
  };

  var CATS = [
    { key: "dep",       label: "Depreciation",            css: "--c-deprec" },
    { key: "maint",     label: "Maintenance &amp; repairs", css: "--c-maint" },
    { key: "insurance", label: "Insurance",               css: "--c-insure" },
    { key: "fuel",      label: "Fuel",                    css: "--c-fuel" },
    { key: "interest",  label: "Loan interest",           css: "--c-finance" },
    { key: "fees",      label: "Taxes, fees &amp; registration", css: "--c-tax" }
  ];

  /* Depreciation rate for a given year of a vehicle's life. Year one is the
     cliff; years two to five run at the steady rate; from year six the rate
     itself tapers, because a curve applied to a small number flattens out. */
  function depRate(y, d1, dn) {
    if (y === 1) return d1;
    if (y <= 5) return dn;
    return Math.max(4, dn - (y - 5) * 1.2);
  }

  /* Interest paid in each calendar year of an amortized loan. Zero after the
     term ends — which is the single most important line in this model. */
  function interestByYear(principal, aprPct, term, years) {
    var out = [], pay = M.payment(principal, aprPct, term);
    var r = aprPct / 100 / 12, bal = principal, m = 0, y, k, ip;
    for (y = 1; y <= years; y++) {
      var acc = 0;
      for (k = 0; k < 12; k++) {
        m++;
        if (m > term || bal <= 0.01) continue;
        ip = bal * r;
        acc += ip;
        bal = Math.max(0, bal + ip - pay);
      }
      out.push(acc);
    }
    return out;
  }

  /* One complete ownership run: a brand-new vehicle held for n years. */
  function ownership(i, n) {
    var s = SEG[i.segment] || SEG.suv;
    var term = parseInt(i.term, 10) || 60;
    var upfront = i.price * i.salesTax / 100 + i.dealerFees;
    var financed = Math.max(0, i.price + upfront - i.down);
    var ints = interestByYear(financed, i.apr, term, n);
    var fuel = i.mpg > 0 ? (i.miles / i.mpg) * i.gasPrice : 0;
    var rows = [], ret = 1, value = i.price, floor = i.price * 0.08, y;
    for (y = 1; y <= n; y++) {
      ret *= 1 - depRate(y, s.d1, s.dn) / 100;
      var next = Math.max(floor, i.price * ret);
      var dep = Math.max(0, value - next);
      value = next;
      var ins = Math.max(i.insurance * 0.45, i.insurance * Math.pow(1 - i.insDrop / 100, y - 1));
      var mnt = i.maint * Math.pow(1 + i.maintEsc / 100, y - 1) + (y > 8 ? i.majorRepairs : 0);
      var reg = Math.max(i.reg * 0.4, i.reg * Math.pow(1 - i.regTaper / 100, y - 1));
      var fees = reg + (y === 1 ? upfront : 0);
      var interest = ints[y - 1] || 0;
      rows.push({
        year: y, dep: dep, interest: interest, insurance: ins, maint: mnt,
        fuel: fuel, fees: fees, value: next,
        total: dep + interest + ins + mnt + fuel + fees
      });
    }
    return rows;
  }

  /* Cost of covering the horizon by buying a fresh vehicle every N years.
     Each vehicle's resale is already credited, because
     depreciation only ever charges the value actually lost. */
  function cycleTotal(i, cycle, horizon) {
    var total = 0, done = 0, cars = 0, rows, k;
    while (done < horizon) {
      var n = Math.min(cycle, horizon - done);
      rows = ownership(i, n);
      for (k = 0; k < rows.length; k++) total += rows[k].total;
      done += n;
      cars++;
    }
    return { total: total, cars: cars };
  }

  MDC.calc({
    form: "ten-form",
    defaults: {
      price: 34000, down: 3400, apr: 7.2, term: "60",
      miles: 12000, mpg: 30, gasPrice: 4.00,
      years: 10, segment: "suv",
      insurance: 2496, insDrop: 3.5,
      maint: 1250, maintEsc: 10, majorRepairs: 900,
      reg: 220, regTaper: 6,
      salesTax: 7, dealerFees: 700
    },
    compute: function (i) {
      var n = Math.max(1, Math.round(i.years));
      var rows = ownership(i, n);
      var cum = 0, pts = [], cheap = rows[0], y, r;
      var cats = { dep: 0, interest: 0, insurance: 0, maint: 0, fuel: 0, fees: 0 };
      for (y = 0; y < rows.length; y++) {
        r = rows[y];
        cum += r.total;
        r.cum = cum;
        r.avg = cum / (y + 1);
        pts.push({ x: r.year, y: r.avg });
        if (r.total < cheap.total) cheap = r;
        cats.dep += r.dep; cats.interest += r.interest; cats.insurance += r.insurance;
        cats.maint += r.maint; cats.fuel += r.fuel; cats.fees += r.fees;
      }
      var miles = Math.max(1, i.miles * n);
      var c5 = cycleTotal(i, 5, n);
      var c3 = cycleTotal(i, 3, n);
      var term = parseInt(i.term, 10) || 60;
      var payoff = Math.ceil(term / 12);

      return {
        total: cum,
        perYear: cum / n,
        perMonth: cum / (n * 12),
        perMile: cum / miles,
        totalMiles: miles,
        yearsLabel: n + (n === 1 ? " year" : " years"),
        year1: rows[0].total,
        lastYear: rows[rows.length - 1].total,
        avg3: rows[Math.min(2, rows.length - 1)].avg,
        cheapYearLabel: "Year " + cheap.year,
        cheapYearCost: cheap.total,
        cheapDep: cheap.dep,
        cheapDepPct: i.price > 0 ? cheap.dep / i.price * 100 : 0,
        ratio: rows[0].total / Math.max(1, cheap.total),
        endValue: rows[rows.length - 1].value,
        payoffLabel: payoff >= n ? "month " + term : "year " + payoff,
        keepTotal: cum,
        replace5: c5.total,
        replace3: c3.total,
        cars5: c5.cars,
        cars3: c3.cars,
        extra5: c5.total - cum,
        extra3: c3.total - cum,
        replaceMonthly: c5.total / (n * 12),
        replaceYearly: c5.total / n,
        rows: rows, pts: pts, cats: cats, n: n, _i: i
      };
    },
    onInput: function (i) {
      var set = function (k, v) {
        document.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) {
          if (el.closest(".field")) el.textContent = v;
        });
      };
      set("years", i.years + (i.years === 1 ? " year" : " years"));
      set("miles", F.num(i.miles) + " mi/yr");
      set("apr", i.apr.toFixed(1) + "%");
      set("insDrop", i.insDrop.toFixed(1) + "% a year");
      set("maintEsc", i.maintEsc + "% a year");
      set("regTaper", i.regTaper + "% a year");
    },
    count: [],
    render: function (res, i) {
      /* ---- the cumulative average curve -------------------------------- */
      var host = document.getElementById("avg-chart");
      if (host) {
        MDC.charts.area(host, res.pts, {
          cssVar: "--c-deprec",
          yFmt: function (v) { return F.money(v); },
          xFmt: function (x) { return "Yr " + x; },
          xLabelFmt: function (x) { return "Average after " + x + (x === 1 ? " year" : " years"); },
          aria: "Cumulative average cost per year falling as the vehicle ages"
        });
      }

      /* ---- year-by-year table ------------------------------------------ */
      var t = document.getElementById("year-table");
      if (t) {
        var body = "", k, r;
        for (k = 0; k < res.rows.length; k++) {
          r = res.rows[k];
          var cheapest = r.total === res.cheapYearCost;
          body += '<tr' + (cheapest ? ' style="font-weight:650"' : '') + '>' +
            '<td>Year ' + r.year + (cheapest ? ' &nbsp;<small class="text-muted">cheapest</small>' : '') + '</td>' +
            '<td class="num">' + F.money(r.dep) + '</td>' +
            '<td class="num">' + (r.interest < 1 ? '&mdash;' : F.money(r.interest)) + '</td>' +
            '<td class="num">' + F.money(r.insurance) + '</td>' +
            '<td class="num">' + F.money(r.maint) + '</td>' +
            '<td class="num">' + F.money(r.fuel) + '</td>' +
            '<td class="num">' + F.money(r.total) + '</td>' +
            '<td class="num">' + F.money(r.avg) + '</td></tr>';
        }
        t.innerHTML = '<div class="table-wrap"><table class="tbl"><thead><tr>' +
          '<th>Year</th><th class="num">Deprec.</th><th class="num">Interest</th>' +
          '<th class="num">Insurance</th><th class="num">Maint.</th><th class="num">Fuel</th>' +
          '<th class="num">That year</th><th class="num">Cumulative avg</th>' +
          '</tr></thead><tbody>' + body + '</tbody></table></div>' +
          '<p class="text-muted" style="font-size:.85rem;margin-top:12px">Registration is inside each year total, as are sales tax and dealer fees in year one. ' +
          'Interest reaches zero in ' + res.payoffLabel + '. The final column never rises, even in the years the major-repair allowance switches on.</p>';
      }

      /* ---- trade-cycle comparison -------------------------------------- */
      var cyc = document.getElementById("cycle-rows");
      if (cyc) {
        var opts = [
          { label: "Keep one car " + res.n + " years", sub: "1 vehicle, one set of taxes and fees", v: res.keepTotal, css: "--c-deprec" },
          { label: "Replace every 5 years", sub: res.cars5 + " vehicles, " + res.cars5 + " sets of taxes and fees", v: res.replace5, css: "--c-finance" },
          { label: "Replace every 3 years", sub: res.cars3 + " vehicles, " + res.cars3 + " sets of taxes and fees", v: res.replace3, css: "--c-tax" }
        ];
        var base = Math.max(1, res.keepTotal);
        cyc.innerHTML = opts.map(function (o) {
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + o.css + ')"></span>' +
            '<span class="bd-name">' + o.label + '<small>' + o.sub + ' &middot; ' + F.money(o.v / (res.n * 12)) + ' / month</small></span>' +
            '<span class="bd-pct num">' + Math.round(o.v / base * 100) + '%</span>' +
            '<span class="bd-val num">' + F.money(o.v) + '</span>' +
            '</div>';
        }).join("");
      }
      var note = document.getElementById("cycle-note");
      if (note) {
        note.innerHTML = 'Same vehicle, same ' + F.num(res.totalMiles) + ' miles, same insurance. ' +
          'Replacing every five years costs <strong>' + F.money(res.extra5) + '</strong> more across the horizon; ' +
          'replacing every three costs <strong>' + F.money(res.extra3) + '</strong> more &mdash; about ' +
          F.money(res.extra3 / (res.n * 12)) + ' a month for nothing but newness. ' +
          'Each replacement pays sales tax and dealer fees again and restarts the steep front of the depreciation curve. ' +
          'Resale proceeds are already credited to every vehicle, and the model assumes the replacement costs the same in today&rsquo;s dollars &mdash; both assumptions favor the trade cycle.';
      }

      /* ---- decade by category ------------------------------------------ */
      var rows2 = CATS.map(function (c) { return { c: c, v: res.cats[c.key] || 0 }; })
                      .filter(function (x) { return x.v > 0.5; })
                      .sort(function (a, b) { return b.v - a.v; });
      var donut = document.getElementById("donut");
      if (donut) MDC.charts.donut(donut, rows2.map(function (x) {
        return { label: x.c.label, value: x.v, cssVar: x.c.css };
      }), {
        centerLabel: "Per year",
        centerValue: F.money(res.perYear),
        centerSub: F.money(res.total) + " over " + res.n + " years",
        aria: "Ten-year cost of ownership by category"
      });

      var bd = document.getElementById("breakdown");
      if (bd) {
        bd.innerHTML = rows2.map(function (x) {
          var pct = res.total > 0 ? x.v / res.total * 100 : 0;
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + x.c.css + ')"></span>' +
            '<span class="bd-name">' + x.c.label + '<small>' + F.money(x.v / (res.n * 12)) + ' / month</small></span>' +
            '<span class="bd-pct num">' + Math.round(pct) + '%</span>' +
            '<span class="bd-val num">' + F.money(x.v) + '</span>' +
            '</div>';
        }).join("") +
        '<p class="text-muted" style="font-size:.84rem;margin-top:14px">Over five years depreciation is comfortably the largest line. ' +
        'Stretch the horizon to a decade and it is only ' + Math.round(res.cats.dep / Math.max(1, res.total) * 100) + '% of the bill &mdash; ' +
        'the mix shifts from owning the vehicle to running it, which is the cheaper of the two things to be doing.</p>';
      }
    }
  });
})();
