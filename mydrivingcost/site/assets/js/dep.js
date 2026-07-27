/* Depreciation Calculator — MyDrivingCost.com */
(function () {
  "use strict";
  var MDC = window.MDC, F = MDC.fmt;

  /* Typical first-year and later-year depreciation by segment, and how much of
     the curve has already been traveled when you buy at a given age. */
  var SEG = {
    truck: { d1: 16, dn: 11 },
    suv:   { d1: 20, dn: 15 },
    sedan: { d1: 21, dn: 16 },
    lux:   { d1: 25, dn: 18 },
    ev:    { d1: 26, dn: 17 }
  };

  /* How the annual rate changes with the vehicle's own age. Indexed by the age
     of the vehicle at the START of each year, so index 0 is a brand-new car's
     first year — the one that uses the first-year rate directly.

     This table exists because without it the model was mathematically unable to
     answer the question the "Buying it" control asks. Applying one fixed rate to
     the remaining value each year is scale- and shift-invariant: 15% a year for
     five years retains 44.4% whether you join the curve at year two or year
     twelve. So every used option produced the identical percentage, and the
     page's own text — "the curve is front-loaded and any honest model has to be
     too" — described behavior the code did not have.

     The shape comes from the BLS Monthly Labor Review's year-by-year series
     (January 2024, Chart 1), the only published set of annual geometric
     depreciation rates: 23.9% in year one, then 11.3 / 10.8 / 14.0 / 13.7 /
     13.1 / 11.4 / 8.7 / 9.9 / 6.9 / 4.9 through year eleven. The headline that
     almost every consumer article gets wrong is that the rate does not decline
     smoothly. It falls off a cliff exactly once, after year one, then sits on an
     11–14% plateau all the way through year eight — briefly rising again in
     years four to six — and only genuinely tapers from year nine.

     These factors are that series smoothed monotonically and normalized on
     mean(years 2–5) = 12.45%, so whatever rate the visitor enters is read as the
     plateau rate and the taper is applied relative to it. The smoothing is
     deliberately a shade pessimistic at the tail (year 11 lands at 0.48 against
     a raw 0.39): for a cost calculator, under-promising resale value is the safe
     direction to round.
     https://www.bls.gov/opub/mlr/2024/article/a-consumption-measure-for-automobiles.htm */
  var AGE_FACTOR = [1, 1, 1, 1, 1, 1, 0.92, 0.8, 0.72, 0.6, 0.48];
  var AGE_TAIL = 0.4;
  function ageFactor(a) { return a < AGE_FACTOR.length ? AGE_FACTOR[a] : AGE_TAIL; }

  /* startAge is the vehicle's age in years on the day it is bought, so a curve
     for a three-year-old car begins its first ownership year at index 3 and
     never touches the first-year rate at all. */
  function curve(price, d1, dn, years, startAge) {
    var out = [{ year: 0, value: price, rate: 0 }], ret = 1;
    for (var y = 1; y <= years; y++) {
      var vehicleAge = startAge + y - 1;
      var rate = vehicleAge === 0 ? d1 : dn * ageFactor(vehicleAge);
      ret = Math.max(0, ret * (1 - rate / 100));
      out.push({ year: y, value: price * ret, rate: rate });
    }
    return out;
  }

  MDC.calc({
    form: "dep-form",
    defaults: {
      price: 34000, age: "0", years: 5, miles: 12000,
      segment: "suv", dep1: 20, depN: 15,
      running: 4400, mileageAdj: 0.06
    },
    compute: function (i) {
      var startAge = parseInt(i.age, 10) || 0;
      var pts = curve(i.price, i.dep1, i.depN, i.years, startAge);

      var extraMiles = Math.max(0, i.miles - 12000) * i.years;
      var penalty = extraMiles * i.mileageAdj;

      var raw = pts[pts.length - 1].value;
      var endValue = Math.max(i.price * 0.03, raw - penalty);
      var lost = Math.max(0, i.price - endValue);
      var totalMiles = Math.max(1, i.miles * i.years);

      var year1 = pts[0].value - pts[1].value;
      var yearLast = pts[pts.length - 2].value - pts[pts.length - 1].value;

      return {
        price: i.price,
        lost: lost,
        endValue: endValue,
        lostPct: i.price > 0 ? lost / i.price * 100 : 0,
        retainPct: i.price > 0 ? endValue / i.price * 100 : 0,
        perYear: lost / Math.max(1, i.years),
        perMonth: lost / Math.max(1, i.years * 12),
        perMile: lost / totalMiles,
        totalMiles: totalMiles,
        year1: year1,
        yearLast: yearLast,
        lastVsFirst: year1 > 0 ? yearLast / year1 * 100 : 0,
        yearsLabel: i.years + (i.years === 1 ? " year" : " years"),
        startAge: startAge,
        pts: pts,
        penalty: penalty,
        _i: i
      };
    },
    onSeg: function (name, val, api) {
      /* Picking a segment loads its typical rates, then the user can override. */
      if (name === "segment" && SEG[val]) {
        api.setField("dep1", SEG[val].d1);
        api.setField("depN", SEG[val].dn);
      }
    },
    onInput: function (i) {
      var set = function (k, v) {
        document.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) {
          if (el.closest(".field")) el.textContent = v;
        });
      };
      set("years", i.years + (i.years === 1 ? " year" : " years"));
      set("miles", F.num(i.miles) + " mi/yr");
      set("dep1", i.dep1 + "%");
      set("depN", i.depN + "%");
    },
    count: [],
    render: function (res, i) {
      /* ---- value curve ------------------------------------------------- */
      var host = document.getElementById("curve-chart");
      if (host) {
        MDC.charts.area(host, res.pts.map(function (p) {
          return { x: p.year, y: p.value };
        }), {
          cssVar: "--c-deprec",
          yMax: i.price,
          yFmt: function (v) { return F.money(v); },
          /* Point zero is the day of purchase, which is only "New" when the
             visitor is actually buying new — labeling a five-year-old car's
             starting point "New" would misread the whole chart. */
          xFmt: function (x) { return x === 0 ? (res.startAge ? "Buy" : "New") : "Yr " + x; },
          xLabelFmt: function (x) {
            if (x > 0) return "End of your year " + x;
            return res.startAge
              ? "At purchase, " + res.startAge + (res.startAge === 1 ? " year old" : " years old")
              : "Day one, brand new";
          },
          aria: "Vehicle value falling year by year"
        });
      }

      /* ---- year-by-year table ------------------------------------------ */
      var t = document.getElementById("dep-table");
      if (t) {
        var rows = "";
        for (var y = 1; y < res.pts.length; y++) {
          var prev = res.pts[y - 1].value, pt = res.pts[y], val = pt.value;
          var drop = prev - val;
          var retained = i.price > 0 ? val / i.price * 100 : 0;
          /* The vehicle's own age, not the ownership year — with the age taper
             in play, that is the number that explains the rate column. */
          var vAge = res.startAge + y;
          rows += '<tr><th scope="row">Your year ' + y +
            '<span class="tbl-sub">car is ' + vAge + (vAge === 1 ? " yr" : " yrs") + ' old</span></th>' +
            '<td class="num">' + (Math.round(pt.rate * 10) / 10) + '%</td>' +
            '<td class="num">' + F.money(drop) + '</td>' +
            '<td class="num">' + F.money(val) + '</td>' +
            '<td class="num">' + Math.round(retained) + '%</td>' +
            '<td class="num">' + F.money(i.price - val) + '</td></tr>';
        }
        t.innerHTML = '<div class="table-wrap"><table class="tbl">' +
          '<caption class="sr-only">Year-by-year value of a ' + F.money(i.price) +
          (res.startAge ? ', ' + res.startAge + '-year-old ' : ', brand-new ') +
          'vehicle over ' + res.yearsLabel +
          '. The rate is applied to what the vehicle is worth at the start of each year, ' +
          'and tapers as the vehicle ages.</caption>' +
          '<thead><tr><th scope="col">Ownership year</th><th scope="col" class="num">Rate</th>' +
          '<th scope="col" class="num">Lost that year</th><th scope="col" class="num">Worth after</th>' +
          '<th scope="col" class="num">Retained</th><th scope="col" class="num">Lost total</th></tr></thead>' +
          '<tbody>' + rows + '</tbody></table></div>' +
          (res.penalty > 1
            ? '<p class="text-muted" style="font-size:.85rem;margin-top:12px">A further <strong>' +
              F.money(res.penalty) + '</strong> is deducted from the final value for mileage above 12,000 a year.</p>'
            : '');
      }

      /* ---- depreciation vs everything else ----------------------------- */
      var depMonthly = res.perMonth;
      var otherMonthly = Math.max(0, i.running / 12);
      var segs = [
        { label: "Depreciation", value: depMonthly, cssVar: "--c-deprec" },
        { label: "Everything else", value: otherMonthly, cssVar: "--c-insure" }
      ];
      var totalMonthly = depMonthly + otherMonthly;

      var donut = document.getElementById("donut");
      if (donut) MDC.charts.donut(donut, segs, {
        centerLabel: "Per month",
        centerValue: F.money(totalMonthly),
        centerSub: "all-in cost",
        aria: "Depreciation compared with other running costs"
      });

      var bd = document.getElementById("breakdown");
      if (bd) {
        bd.innerHTML = segs.map(function (s) {
          var pct = totalMonthly > 0 ? s.value / totalMonthly * 100 : 0;
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + s.cssVar + ')"></span>' +
            '<span class="bd-name">' + s.label + '<small>' + F.money(s.value * 12) + ' / year</small></span>' +
            '<span class="bd-pct num">' + Math.round(pct) + '%</span>' +
            '<span class="bd-val num">' + F.money(s.value) + '/mo</span>' +
            '</div>';
        }).join("") +
        '<p class="text-muted" style="font-size:.84rem;margin-top:14px">Depreciation is ' +
        (depMonthly >= otherMonthly ? 'the largest single' : 'a major') +
        ' cost of owning this vehicle — and the only one that never appears on a statement.</p>';
      }
    }
  });
})();
