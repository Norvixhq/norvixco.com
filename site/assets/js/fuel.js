/* Fuel Cost — MyDrivingCost.com */
(function () {
  "use strict";
  var MDC = window.MDC, F = MDC.fmt;

  var ADJ = { mixed: 1, city: 0.88, hwy: 1.10 };

  function totalOver(annual, years, growth) {
    if (!growth) return annual * years;
    var t = 0, g = 1 + growth / 100;
    for (var y = 0; y < years; y++) t += annual * Math.pow(g, y);
    return t;
  }

  MDC.calc({
    form: "fuel-form",
    defaults: {
      miles: 12000, gasPrice: 4.00, mpg: 26, mpgB: 38, years: 5,
      split: "mixed", inflation: 0, premium: 0
    },
    compute: function (i) {
      var adj = ADJ[i.split] || 1;
      var price = i.gasPrice + i.premium;
      var mpgA = Math.max(1, i.mpg * adj), mpgB = Math.max(1, i.mpgB * adj);
      var galA = i.miles / mpgA, galB = i.miles / mpgB;
      var annualA = galA * price, annualB = galB * price;
      var totalA = totalOver(annualA, i.years, i.inflation);
      var totalB = totalOver(annualB, i.years, i.inflation);
      var tank = 14; /* typical usable tank, gallons */
      return {
        annualA: annualA, annualB: annualB,
        monthlyA: annualA / 12,
        totalA: totalA, totalB: totalB,
        saved: totalA - totalB,
        gallonsA: galA, gallonsB: galB,
        perMileA: annualA / Math.max(1, i.miles),
        perMileB: annualB / Math.max(1, i.miles),
        gp100A: 100 / mpgA, gp100B: 100 / mpgB,
        fillsA: galA / tank,
        fillDays: 365 / Math.max(0.5, galA / tank),
        yearsLabel: i.years + (i.years === 1 ? " year" : " years"),
        mpgA: mpgA, mpgB: mpgB, price: price,
        _i: i
      };
    },
    onInput: function (i) {
      var set = function (k, v) {
        document.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) {
          if (el.closest(".field")) el.textContent = v;
        });
      };
      set("miles", F.num(i.miles) + " mi/yr");
      set("years", i.years + (i.years === 1 ? " year" : " years"));
      set("inflation", i.inflation === 0 ? "0%/yr (flat)" : (i.inflation > 0 ? "+" : "") + i.inflation.toFixed(1) + "%/yr");
    },
    render: function (res, i) {
      var maxV = Math.max(res.totalA, res.totalB, 1);
      var host = document.getElementById("compare");
      if (host) {
        host.innerHTML = [
          { n: "Your vehicle — " + res.mpgA.toFixed(1) + " MPG", v: res.totalA, css: "--c-fuel" },
          { n: "Comparison — " + res.mpgB.toFixed(1) + " MPG", v: res.totalB, css: "--c-insure" }
        ].map(function (r) {
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + r.css + ')"></span>' +
            '<span class="bd-name">' + r.n + '<small>' + F.money(r.v / i.years) + ' per year</small></span>' +
            '<span class="bd-bar"><i style="background:var(' + r.css + ');width:' + (r.v / maxV * 100).toFixed(1) + '%"></i></span>' +
            '<span class="bd-val num">' + F.money(r.v) + '</span>' +
            '</div>';
        }).join("");
      }

      var vt = document.querySelector('[data-out="verdictTitle"]');
      var vd = document.querySelector('[data-out="verdict"]');
      var diff = Math.abs(res.saved), yrs = i.years;
      if (vt && vd) {
        if (diff < 1) {
          vt.textContent = "Effectively identical";
          vd.innerHTML = "Both vehicles burn the same fuel at this mileage. Whatever separates them, it isn't the pump.";
        } else if (res.saved > 0) {
          vt.textContent = "The comparison vehicle is cheaper to fuel";
          vd.innerHTML = "It saves <strong>" + F.money(diff) + "</strong> over " + yrs + " " + (yrs === 1 ? "year" : "years") +
            " — about <strong>" + F.money(diff / yrs / 12) + " a month</strong>. Worth weighing against any difference in purchase price, insurance and depreciation before you switch: a $4,000 price gap takes " +
            (diff / yrs > 0 ? (4000 / (diff / yrs)).toFixed(1) : "—") + " years of fuel saving to repay.";
        } else {
          vt.textContent = "Your vehicle is cheaper to fuel";
          vd.innerHTML = "You spend <strong>" + F.money(diff) + "</strong> less over " + yrs + " " + (yrs === 1 ? "year" : "years") +
            " than the comparison vehicle would cost you — about <strong>" + F.money(diff / yrs / 12) + " a month</strong> in your favor.";
        }
      }

      var mc = document.getElementById("mpg-chart");
      if (mc) {
        var pts = [];
        for (var m = 12; m <= 60; m += 2) pts.push({ x: m, y: (i.miles / m) * res.price });
        MDC.charts.area(mc, pts, {
          cssVar: "--c-fuel",
          yFmt: function (v) { return "$" + Math.round(v / 100) / 10 + "k"; },
          xFmt: function (x) { return x + ""; },
          xLabelFmt: function (x) { return x + " MPG"; },
          aria: "Annual fuel cost falling steeply then flattening as MPG rises"
        });
      }
    }
  });
})();
