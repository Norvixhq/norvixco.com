/* EV Charging Cost — MyDrivingCost.com */
(function () {
  "use strict";
  var MDC = window.MDC, F = MDC.fmt;

  function shares(i) {
    var s = i.pHome + i.pL2 + i.pDc;
    if (s <= 0) return { h: 1, l: 0, d: 0 };
    return { h: i.pHome / s, l: i.pL2 / s, d: i.pDc / s };
  }

  function annualFor(i, sh) {
    var kwhBattery = (i.miles / 100) * i.kwh100;
    var kwhGrid = kwhBattery / Math.max(0.5, 1 - i.loss / 100);
    var cost = kwhGrid * (sh.h * i.rHome + sh.l * i.rL2 + sh.d * i.rDc) + i.fees;
    return { kwhGrid: kwhGrid, cost: cost, sh: sh };
  }

  MDC.calc({
    form: "ev-form",
    defaults: {
      miles: 12000, kwh100: 28, loss: 10,
      pHome: 80, rHome: 0.175, pL2: 12, rL2: 0.32, pDc: 8, rDc: 0.48,
      mpg: 30, gasPrice: 4.00, years: 5, fees: 0, install: 0
    },
    compute: function (i) {
      var sh = shares(i);
      var a = annualFor(i, sh);
      var perMile = a.cost / Math.max(1, i.miles);
      var gasAnnual = (i.miles / Math.max(1, i.mpg)) * i.gasPrice;
      var total = a.cost * i.years + i.install;
      var gasTotal = gasAnnual * i.years;
      return {
        annual: a.cost,
        monthly: a.cost / 12,
        perMile: perMile,
        kwhYear: a.kwhGrid,
        blended: a.cost > 0 && a.kwhGrid > 0 ? (a.cost - i.fees) / a.kwhGrid : 0,
        gasPerMile: gasAnnual / Math.max(1, i.miles),
        gasAnnual: gasAnnual,
        savedYear: gasAnnual - a.cost,
        total: total,
        gasTotal: gasTotal,
        savedTotal: gasTotal - total,
        mpgLabel: i.mpg,
        parts: {
          home: a.kwhGrid * sh.h * i.rHome,
          l2: a.kwhGrid * sh.l * i.rL2,
          dc: a.kwhGrid * sh.d * i.rDc,
          fees: i.fees
        },
        _i: i
      };
    },
    onInput: function (i) {
      var set = function (k, v) {
        document.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) {
          if (el.closest(".field")) el.textContent = v;
        });
      };
      var s = Math.max(1, i.pHome + i.pL2 + i.pDc);
      set("miles", F.num(i.miles) + " mi/yr");
      set("loss", i.loss + "%");
      set("years", i.years + (i.years === 1 ? " year" : " years"));
      set("pHome", Math.round(i.pHome / s * 100) + "% of charging");
      set("pL2", Math.round(i.pL2 / s * 100) + "% of charging");
      set("pDc", Math.round(i.pDc / s * 100) + "% of charging");
    },
    render: function (res, i) {
      var CATS = [
        { key: "home", label: "Home charging", css: "--c-insure" },
        { key: "l2",   label: "Public Level 2", css: "--c-maint" },
        { key: "dc",   label: "DC fast charging", css: "--c-fuel" },
        { key: "fees", label: "Fees & subscriptions", css: "--c-finance" }
      ];
      var rows = CATS.map(function (c) { return { c: c, v: res.parts[c.key] || 0 }; })
                     .filter(function (r) { return r.v > 0.5; });
      var bd = document.getElementById("breakdown");
      if (bd) {
        bd.innerHTML = rows.slice().sort(function (a, b) { return b.v - a.v; }).map(function (r) {
          var pct = res.annual > 0 ? r.v / res.annual * 100 : 0;
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + r.c.css + ')"></span>' +
            '<span class="bd-name">' + r.c.label + '<small>' + F.money(r.v) + ' per year</small></span>' +
            '<span class="bd-pct num">' + Math.round(pct) + '%</span>' +
            '<span class="bd-val num">' + F.money(r.v) + '</span>' +
            '</div>';
        }).join("");
      }
      var donut = document.getElementById("donut");
      if (donut) MDC.charts.donut(donut, rows.map(function (r) {
        return { label: r.c.label, value: r.v, cssVar: r.c.css };
      }), {
        centerLabel: "Per year",
        centerValue: F.money(res.annual),
        centerSub: (res.perMile * 100).toFixed(1) + "¢/mi",
        aria: "Annual charging cost split by charging location"
      });

      var host = document.getElementById("dc-chart");
      if (host) {
        var pts = [];
        for (var p = 0; p <= 100; p += 5) {
          var a = annualFor(i, { h: (100 - p) / 100, l: 0, d: p / 100 });
          pts.push({ x: p, y: a.cost });
        }
        MDC.charts.area(host, pts, {
          cssVar: "--c-fuel",
          yFmt: function (v) { return "$" + F.num(v); },
          xFmt: function (x) { return x + "%"; },
          xLabelFmt: function (x) { return x + "% DC fast"; },
          aria: "Annual charging cost rising as DC fast charging replaces home charging"
        });
      }

      var note = document.querySelector('[data-out="installNote"]');
      if (note) {
        var msg = "";
        if (i.install > 0) {
          msg = "That includes the " + F.money(i.install) + " home charger installation, counted once in year one.";
        }
        if (res.savedTotal < 0) {
          msg += (msg ? " " : "") + "At this charging mix, the EV costs <strong>more</strong> to run than the gasoline vehicle — which is what happens when most miles come from public fast chargers.";
        }
        note.innerHTML = msg;
      }
    }
  });
})();
