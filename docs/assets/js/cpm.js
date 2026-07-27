/* Cost Per Mile — MyDrivingCost.com */
(function () {
  "use strict";
  var MDC = window.MDC, F = MDC.fmt, M = MDC.model;

  var CATS = [
    { key: "deprec",    label: "Depreciation",          css: "--c-deprec" },
    { key: "energy",    label: "Fuel / energy",         css: "--c-fuel" },
    { key: "insurance", label: "Insurance",             css: "--c-insure" },
    { key: "maint",     label: "Maintenance & repairs", css: "--c-maint" },
    { key: "interest",  label: "Financing interest",    css: "--c-finance" },
    { key: "taxes",     label: "Taxes & fees",          css: "--c-tax" }
  ];

  /* Powertrain profiles, identical to the True Cost to Own model so the two
     calculators cannot disagree about what a hybrid is. Flipping the segmented
     control re-seeds these three fields — without that, "Hybrid" changed a
     label and nothing else, which is worse than not offering the button. */
  var POWER = {
    gas:    { mpg: 30, ins: 2496, maint: 1250 },
    hybrid: { mpg: 48, ins: 2530, maint: 1100 },
    ev:     { kwh100: 32, ins: 2820, maint: 800 }
  };

  function core(i, miles) {
    var years = i.years, totalMiles = Math.max(1, miles * years);
    var resale = i.price * (i.retain / 100);
    var deprec = Math.max(0, i.price - resale);
    /* Finance the out-the-door price, matching /calculators/auto-loan/ and
       /calculators/true-cost-to-own/. Tax and dealer fees are rolled into the
       loan in almost every real transaction, so you pay interest on them. */
    var outTheDoor = i.price + i.price * (i.tax / 100) + i.fees;
    var loanAmt = Math.max(0, outTheDoor - i.down);
    var interest = i.apr > 0 && loanAmt > 0
      ? M.interestPaid(loanAmt, i.apr, i.term, years * 12).interest : 0;

    /* A conventional hybrid burns gasoline — it just burns less of it. So the
       energy branch is two-way on "ev" while the profile table above is
       three-way: hybrid keeps the mpg fields and simply starts at 48. */
    var energy = i.power === "ev"
      ? totalMiles * (Math.max(0, i.kwh100) / 100) * i.kwhPrice
      : (totalMiles / Math.max(1, i.mpg)) * i.gasPrice;

    /* Maintenance escalates ~12% a year off the year-one base. A flat annual
       figure is wrong in both directions at once: it overcharges the warranty
       years and undercharges the years the repairs actually arrive. */
    var maint = 0;
    for (var y = 1; y <= years; y++) maint += i.maint * Math.pow(1.12, y - 1);

    /* Sales tax is charged once, on the price; registration recurs annually.
       The single blended "fees" field this replaces charged one number every
       year, which simultaneously invented phantom annual fees and omitted
       roughly $2,200 of sales tax on a $34,000 car. */
    var taxes = i.price * (i.tax / 100) + i.reg * years + i.fees;

    var vals = {
      deprec: deprec,
      energy: energy,
      insurance: i.insurance * years,
      maint: maint,
      interest: interest,
      taxes: taxes
    };
    var total = 0;
    for (var k in vals) total += vals[k];
    return { vals: vals, total: total, totalMiles: totalMiles, resale: resale };
  }

  MDC.calc({
    form: "cpm-form",
    defaults: {
      price: 34000, years: 5, miles: 12000, retain: 42,
      power: "gas", mpg: 30, gasPrice: 4.00, kwh100: 32, kwhPrice: 0.195,
      insurance: 2496, maint: 1250, tax: 7, reg: 220, fees: 700,
      down: 3400, apr: 7.2, term: 60
    },
    /* Re-seed the three powertrain-dependent fields when the segmented control
       changes. This overwrites a value the visitor may have typed, which is the
       right trade: the alternative is a button that appears to do nothing. Note
       that deserialize() deliberately does not fire onSeg, so a shared URL still
       restores exactly the numbers it was shared with. */
    onSeg: function (name, val, api) {
      if (name !== "power") return;
      var p = POWER[val] || POWER.gas;
      api.setField("insurance", p.ins);
      api.setField("maint", p.maint);
      if (val === "ev") api.setField("kwh100", p.kwh100);
      else api.setField("mpg", p.mpg);
    },
    compute: function (i) {
      var c = core(i, i.miles);
      var fixed = c.vals.deprec + c.vals.insurance + c.vals.interest + c.vals.taxes;
      var variable = c.vals.energy + c.vals.maint;
      return {
        perMile: c.total / c.totalMiles,
        fixedPerMile: fixed / c.totalMiles,
        varPerMile: variable / c.totalMiles,
        total: c.total,
        totalMiles: c.totalMiles,
        perYear: c.total / i.years,
        perMonth: c.total / (i.years * 12),
        energyShare: c.total > 0 ? c.vals.energy / c.total * 100 : 0,
        depShare: c.total > 0 ? c.vals.deprec / c.total * 100 : 0,
        yearsLabel: i.years + (i.years === 1 ? " year" : " years"),
        vals: c.vals,
        resale: c.resale,
        _i: i
      };
    },
    onInput: function (i) {
      /* live slider labels */
      var set = function (k, v) {
        document.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) {
          if (el.closest(".field")) el.textContent = v;
        });
      };
      set("years", i.years + (i.years === 1 ? " year" : " years"));
      set("miles", F.num(i.miles) + " mi/yr");
      set("retain", i.retain + "% · " + F.money(i.price * i.retain / 100));
      set("apr", i.apr.toFixed(1) + "%");
      set("term", i.term + " months");
    },
    count: [],
    render: function (res, i) {
      /* Powertrain field visibility. Hybrid deliberately falls on the "fuel"
         side: it has a tank and an mpg figure, not a kWh/100mi rating. */
      var ev = i.power === "ev";
      document.querySelectorAll('[data-when="ev"]').forEach(function (el) { el.hidden = !ev; });
      document.querySelectorAll('[data-when="fuel"]').forEach(function (el) { el.hidden = ev; });

      var rows = CATS.map(function (c) { return { c: c, v: res.vals[c.key] || 0 }; })
                     .filter(function (r) { return r.v > 0.5; });
      var maxV = rows.reduce(function (a, b) { return Math.max(a, b.v); }, 1);
      var bd = document.getElementById("breakdown");
      if (bd) {
        bd.innerHTML = rows.slice().sort(function (a, b) { return b.v - a.v; }).map(function (r) {
          var pct = res.total > 0 ? (r.v / res.total * 100) : 0;
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + r.c.css + ')"></span>' +
            '<span class="bd-name">' + r.c.label + '<small>' + F.perMile(r.v / res.totalMiles) + ' / mile</small></span>' +
            '<span class="bd-pct num">' + Math.round(pct) + '%</span>' +
            '<span class="bd-val num">' + F.money(r.v) + '</span>' +
            '</div>';
        }).join("");
      }
      var donut = document.getElementById("donut");
      if (donut) MDC.charts.donut(donut, rows.map(function (r) {
        return { label: r.c.label, value: r.v, cssVar: r.c.css };
      }), {
        centerLabel: "Per mile",
        centerValue: F.perMile(res.perMile),
        centerSub: F.money(res.total) + " total",
        aria: "Cost per mile breakdown by category"
      });

      /* cost per mile vs annual mileage */
      var host = document.getElementById("miles-chart");
      if (host) {
        var pts = [];
        for (var m = 4000; m <= 30000; m += 2000) {
          var c = core(i, m);
          pts.push({ x: m, y: c.total / c.totalMiles });
        }
        MDC.charts.area(host, pts, {
          cssVar: "--c-deprec",
          yFmt: function (v) { return "$" + v.toFixed(2); },
          xFmt: function (x) { return (x / 1000) + "k"; },
          xLabelFmt: function (x) { return F.num(x) + " mi/yr"; },
          aria: "Cost per mile falling as annual mileage rises"
        });
      }
    }
  });
})();
