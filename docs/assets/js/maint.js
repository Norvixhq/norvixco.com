/* Maintenance Cost Calculator — MyDrivingCost.com */
(function () {
  "use strict";
  var MDC = window.MDC, F = MDC.fmt;

  /* Scheduled service dollars per 10,000 miles at baseline, plus the small
     annual line for filters, wipers, alignment, brake fluid and coolant.
     Wear multipliers are applied to the advanced-assumption values. */
  var POWER = {
    gas:    { svc: 390, misc: 190, tCost: 1.00, tLife: 1.00, bLife: 1.00, rep: 1.00, name: "gas" },
    hybrid: { svc: 360, misc: 180, tCost: 1.02, tLife: 0.96, bLife: 1.60, rep: 0.92, name: "hybrid" },
    ev:     { svc: 150, misc: 130, tCost: 1.25, tLife: 0.85, bLife: 2.00, rep: 0.78, name: "electric" },
    diesel: { svc: 470, misc: 240, tCost: 1.00, tLife: 1.00, bLife: 1.05, rep: 1.18, name: "diesel" }
  };
  var BRAND  = { econ: 0.80, average: 1.00, premium: 1.35, lux: 1.95 };
  var SHOP   = { dealer: 1.30, indep: 1.00, diy: 0.62 };
  var DRIVE  = { gentle: 0.92, mixed: 1.00, hard: 1.18 };
  /* Driving pattern multiplies the LIFE of wear items, so gentle > 1. */
  var WEAR   = { gentle: 1.12, mixed: 1.00, hard: 0.82 };

  var REPAIR_BASE = 1400;   /* dollars a year at the top of the age curve */

  /* Unscheduled repairs by vehicle AGE. A logistic rise centered on year seven,
     damped early by a smooth warranty taper. Near zero years 1-3, steep through
     5-10, flat near its ceiling after 12. */
  function ageCurve(age) {
    var rise = 1 / (1 + Math.exp(-(age - 7) / 2));
    var warranty = 1 - 0.75 / (1 + Math.exp((age - 3.5) / 0.9));
    return rise * warranty;
  }

  function blend(f, w) { return 1 + (f - 1) * w; }

  /* One ownership year at a given vehicle age and odometer reading.
     The odometer matters: the tires and brakes a new car arrives with were
     paid for in the purchase price, so nothing is charged for them until the
     vehicle approaches its first replacement. A used buyer is already past
     that point and pays from day one. */
  function yearCost(age, i, odo) {
    var P = POWER[i.power] || POWER.gas;
    var b = BRAND[i.brand] != null ? BRAND[i.brand] : 1;
    var s = SHOP[i.shop] != null ? SHOP[i.shop] : 1;
    var d = DRIVE[i.driving] != null ? DRIVE[i.driving] : 1;
    var wl = WEAR[i.driving] != null ? WEAR[i.driving] : 1;
    var mi = Math.max(0, i.miles);

    var sched = (mi / 10000) * P.svc * b * s * d;

    /* Tires: parts dominate, so the shop factor barely applies. */
    var tLife = Math.max(5000, i.tireLife * P.tLife * wl);
    var tires = (mi / tLife) * (i.tireCost * P.tCost * blend(b, 0.6) * blend(s, 0.35)) *
      Math.min(1, odo / tLife);

    /* Brakes: front axle at the stated interval, rear at about 1.6x and a
       little cheaper. Regen braking roughly doubles EV pad life. */
    var bLife = Math.max(8000, i.brakeLife * P.bLife * wl);
    var bCost = i.brakeCost * blend(b, 0.7) * s;
    var brakes = (mi / bLife) * bCost * Math.min(1, odo / bLife) +
      (mi / (bLife * 1.6)) * bCost * 0.85 * Math.min(1, odo / (bLife * 1.6));

    var battLife = Math.max(1, i.battYrs);
    var batt = (i.battCost * blend(b, 0.4) * blend(s, 0.5)) / battLife *
      Math.min(1, age / battLife);

    var misc = P.misc * blend(b, 0.8) * s * blend(d, 0.5);

    var repair = REPAIR_BASE * P.rep * b * blend(s, 0.7) * d *
      Math.pow(Math.max(0.2, mi / 12000), 0.6) *
      (i.unscheduledPct / 100) * ageCurve(age);

    var other = batt + misc;
    return {
      age: age,
      sched: sched,
      tires: tires,
      brakes: brakes,
      other: other,
      repair: repair,
      wear: tires + brakes + other,
      total: sched + tires + brakes + other + repair
    };
  }

  var DRIVERS = [
    ["sched", "scheduled service"],
    ["tires", "tires"],
    ["brakes", "brakes"],
    ["other", "battery and consumables"],
    ["repair", "the unscheduled repair allowance"]
  ];

  MDC.calc({
    form: "maint-form",
    defaults: {
      power: "gas", brand: "average", startAge: 0, years: 5, miles: 12000,
      shop: "indep", driving: "mixed",
      tireCost: 900, tireLife: 45000, brakeCost: 650, brakeLife: 55000,
      battCost: 240, battYrs: 5, unscheduledPct: 100
    },
    compute: function (i) {
      var years = Math.max(1, Math.round(i.years));
      var start = Math.max(0, Math.round(i.startAge));
      var rows = [], total = 0;
      var sumSched = 0, sumTyres = 0, sumBrakes = 0, sumOther = 0, sumRepair = 0;
      var worst = null, y;

      for (y = 1; y <= years; y++) {
        var r = yearCost(start + y, i, (start + y - 0.5) * Math.max(0, i.miles));
        r.year = y;
        rows.push(r);
        total += r.total;
        sumSched += r.sched; sumTyres += r.tires; sumBrakes += r.brakes;
        sumOther += r.other; sumRepair += r.repair;
        if (!worst || r.total > worst.total) worst = r;
      }

      /* What made the worst year expensive. */
      var driver = "scheduled service", best = -1, k;
      for (k = 0; k < DRIVERS.length; k++) {
        if (worst[DRIVERS[k][0]] > best) { best = worst[DRIVERS[k][0]]; driver = DRIVERS[k][1]; }
      }

      var mi = Math.max(0, i.miles);
      var a1 = yearCost(1, i, 0.5 * mi).total;
      var a3 = yearCost(3, i, 2.5 * mi).total;
      var a7 = yearCost(7, i, 6.5 * mi).total;
      var totalMiles = Math.max(1, i.miles * years);

      return {
        total: total,
        perYear: total / years,
        perMonth: total / (years * 12),
        perMile: total / totalMiles,
        totalMiles: totalMiles,
        yearsLabel: years + (years === 1 ? " year" : " years"),
        firstYear: rows[0].total,
        lastYear: rows[rows.length - 1].total,
        worstYear: worst.year,
        worstAge: worst.age,
        worstCost: worst.total,
        worstDriver: driver,
        age1Cost: a1,
        age3Cost: a3,
        age7Cost: a7,
        stepUpX: a3 > 0 ? a7 / a3 : 0,
        stepUp1X: a1 > 0 ? a7 / a1 : 0,
        schedTotal: sumSched,
        tireTotal: sumTyres,
        brakeTotal: sumBrakes,
        otherTotal: sumOther,
        repairTotal: sumRepair,
        rows: rows,
        startAge_: start
      };
    },
    onInput: function (i) {
      var set = function (k, v) {
        document.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) {
          if (el.closest(".field")) el.textContent = v;
        });
      };
      var a = Math.round(i.startAge);
      set("startAge", a === 0 ? "Brand new" : (a === 1 ? "1 year old" : a + " years old"));
      set("years", i.years + (i.years === 1 ? " year" : " years"));
      set("miles", F.num(i.miles) + " mi/yr");
      set("unscheduledPct", Math.round(i.unscheduledPct) + "% of typical");
    },
    count: [],
    render: function (res, i) {
      /* ---- the annual cost curve --------------------------------------- */
      var host = document.getElementById("curve-chart");
      if (host) {
        MDC.charts.area(host, res.rows.map(function (r) {
          return { x: r.year, y: r.total };
        }), {
          cssVar: "--c-maint",
          yFmt: function (v) { return F.money(v); },
          xFmt: function (x) { return "Yr " + x; },
          xLabelFmt: function (x) {
            return "Ownership year " + x + " — vehicle age " + (res.startAge_ + x);
          },
          aria: "Annual maintenance and repair cost rising by year of ownership"
        });
      }

      /* ---- year-by-year table ------------------------------------------ */
      var t = document.getElementById("maint-table");
      if (t) {
        var rows = "", n;
        for (n = 0; n < res.rows.length; n++) {
          var r = res.rows[n];
          var hot = r.year === res.worstYear && res.rows.length > 1;
          rows += '<tr>' +
            '<td>' + (hot ? '<strong>Year ' + r.year + '</strong>' : 'Year ' + r.year) + '</td>' +
            '<td class="num">' + r.age + '</td>' +
            '<td class="num">' + F.money(r.sched) + '</td>' +
            '<td class="num">' + F.money(r.wear) + '</td>' +
            '<td class="num">' + F.money(r.repair) + '</td>' +
            '<td class="num">' + (hot ? '<strong>' + F.money(r.total) + '</strong>' : F.money(r.total)) + '</td>' +
            '</tr>';
        }
        t.innerHTML = '<div class="table-wrap"><table class="tbl">' +
          '<thead><tr><th>Ownership year</th><th class="num">Vehicle age</th>' +
          '<th class="num">Scheduled</th><th class="num">Wear items</th>' +
          '<th class="num">Repair allowance</th><th class="num">Total</th></tr></thead>' +
          '<tbody>' + rows + '</tbody></table></div>' +
          '<p class="text-muted" style="font-size:.85rem;margin-top:12px">Wear items combine tires, brakes, the 12V battery, filters, wipers, alignment and fluid services, each amortized across the miles or years it lasts. The repair allowance is an expected value for a vehicle of that age, not a prediction.</p>';
      }

      /* ---- where the money goes ---------------------------------------- */
      var segs = [
        { label: "Scheduled service", value: res.schedTotal, cssVar: "--c-maint" },
        { label: "Tires", value: res.tireTotal, cssVar: "--c-fuel" },
        { label: "Brakes", value: res.brakeTotal, cssVar: "--c-insure" },
        { label: "Unscheduled repairs", value: res.repairTotal, cssVar: "--c-deprec" },
        { label: "Battery and consumables", value: res.otherTotal, cssVar: "--c-tax" }
      ];

      var donut = document.getElementById("donut");
      if (donut) MDC.charts.donut(donut, segs, {
        centerLabel: "Total",
        centerValue: F.money(res.total),
        centerSub: "over " + res.yearsLabel,
        aria: "Maintenance cost split by category"
      });

      var bd = document.getElementById("breakdown");
      if (bd) {
        var months = Math.max(1, res.rows.length * 12);
        bd.innerHTML = segs.map(function (s) {
          var pct = res.total > 0 ? s.value / res.total * 100 : 0;
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + s.cssVar + ')"></span>' +
            '<span class="bd-name">' + s.label + '<small>' + F.money(s.value / months) + ' / month</small></span>' +
            '<span class="bd-pct num">' + Math.round(pct) + '%</span>' +
            '<span class="bd-val num">' + F.money(s.value) + '</span>' +
            '</div>';
        }).join("") +
        '<p class="text-muted" style="font-size:.84rem;margin-top:14px">' +
        (res.repairTotal > res.schedTotal
          ? 'Unscheduled repairs now outweigh scheduled service. Past that crossover the vehicle is no longer expensive so much as unpredictable, and a reserve matters more than a service plan.'
          : 'Scheduled work still outweighs unscheduled repairs, which is the signature of a vehicle in its cheap years. Extend the ownership period and watch the two swap places.') +
        '</p>';
      }
    }
  });
})();
