/* Car Insurance Cost Estimator — MyDrivingCost.com */
(function () {
  "use strict";
  var MDC = window.MDC, F = MDC.fmt;

  /* National full-coverage average. Every multiplier below is 1.00 for the
     baseline driver, so the baseline driver pays exactly this. */
  var BASE = 2496;

  /* Collision + comprehensive as a share of a full-coverage premium. Vehicle
     value and deductible only move this part of the bill. */
  var PHYS = 0.41;

  var M = {
    age:      { u25: 2.10, "25": 1.28, "35": 1.00, "65": 1.08 },
    record:   { clean: 1.00, ticket: 1.22, atfault: 1.44, dui: 1.75 },
    credit:   { exc: 0.83, good: 1.00, fair: 1.28, poor: 1.75 },
    state:    { low: 0.68, below: 0.85, avg: 1.00, above: 1.24, high: 1.58 },
    vtype:    { sedan: 0.94, suv: 1.00, truck: 1.06, lux: 1.42, ev: 1.18 },
    ded:      { "250": 1.12, "500": 1.00, "1000": 0.90, "2000": 0.82 },
    coverage: { min: 0.38, full: 1.00, high: 1.16 }
  };

  var LABEL = {
    age:      { u25: "Under 25", "25": "25–34", "35": "35–64", "65": "65+" },
    record:   { clean: "Clean record", ticket: "One ticket", atfault: "One at-fault claim", dui: "DUI" },
    credit:   { exc: "Excellent credit", good: "Good credit", fair: "Fair credit", poor: "Poor credit" },
    state:    { low: "Low-cost state", below: "Below-average state", avg: "Average state", above: "Above-average state", high: "High-cost state" },
    vtype:    { sedan: "Sedan", suv: "SUV", truck: "Truck", lux: "Luxury", ev: "Electric" },
    ded:      { "250": "$250 deductible", "500": "$500 deductible", "1000": "$1,000 deductible", "2000": "$2,000 deductible" },
    coverage: { min: "State minimum", full: "Standard full coverage", high: "Higher limits" }
  };

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v || 0)); }

  /* Build a settings object from the form, optionally patched for a
     counterfactual ("what if the deductible were $1,000?"). */
  function settings(i, patch) {
    var s = {
      age: i.age, record: i.record, credit: i.credit, state: i.state,
      vtype: i.vtype, coverage: i.coverage, deductible: String(i.deductible),
      miles: i.miles, value: i.value, tenure: i.tenure,
      disc: clamp(i.discMulti, 0, 25) + clamp(i.discTele, 0, 30) +
            clamp(i.discPay, 0, 15) + clamp(i.discStudent, 0, 25)
    };
    if (patch) { for (var k in patch) { if (patch.hasOwnProperty(k)) s[k] = patch[k]; } }
    return s;
  }

  /* Every multiplier, named. Keys here drive the ranked table. */
  function multipliers(s) {
    var physShare = s.coverage === "min" ? 0 : PHYS;
    var valRatio = Math.max(0.05, (s.value || 1) / 34000);
    var mileRatio = Math.max(0.05, (s.miles || 1) / 12000);
    return {
      age:       M.age[s.age] || 1,
      record:    M.record[s.record] || 1,
      credit:    M.credit[s.credit] || 1,
      state:     M.state[s.state] || 1,
      vtype:     M.vtype[s.vtype] || 1,
      coverage:  M.coverage[s.coverage] || 1,
      deductible: physShare ? (M.ded[s.deductible] || 1) : 1,
      miles:     Math.pow(mileRatio, 0.10),
      value:     1 - physShare + physShare * Math.pow(valRatio, 0.35),
      /* Price optimization: past three years with the same carrier the model
         adds about 1.5% a year, capped at 12%. */
      loyalty:   1 + Math.min(0.12, Math.max(0, (s.tenure || 0) - 3) * 0.015),
      discounts: 1 - clamp(s.disc, 0, 40) / 100
    };
  }

  var ORDER = ["age", "record", "credit", "state", "vtype", "coverage",
               "deductible", "miles", "value", "loyalty", "discounts"];

  var NAME = {
    age: "Age band", record: "Driving record", credit: "Credit tier",
    state: "State rate tier", vtype: "Vehicle type", coverage: "Coverage level",
    deductible: "Deductible", miles: "Annual mileage", value: "Vehicle value",
    loyalty: "Years with insurer", discounts: "Discounts applied"
  };

  function premium(s) {
    var m = multipliers(s), t = BASE, k;
    for (k in m) { if (m.hasOwnProperty(k)) t *= m[k]; }
    return t;
  }

  function settingLabel(key, s) {
    if (key === "deductible") {
      return s.coverage === "min" ? "No physical damage cover" : LABEL.ded[s.deductible];
    }
    if (key === "miles") return F.num(s.miles) + " mi/yr";
    if (key === "value") {
      return s.coverage === "min" ? "Not rated at minimum" : F.money(s.value) + " to replace";
    }
    if (key === "loyalty") {
      return (s.tenure || 0) + (s.tenure === 1 ? " year" : " years") + " with the same carrier";
    }
    if (key === "discounts") return Math.round(clamp(s.disc, 0, 40)) + "% off the gross";
    return LABEL[key] ? LABEL[key][s[key]] : "";
  }

  /* Plain-language next step, keyed by whichever factor costs the most. */
  var ADVICE = {
    age: "Age is the one factor you cannot argue with, only outlast. Until it moves, buy the substitutes: enroll in telematics, claim the good-student credit if it applies, stay listed on a parent&rsquo;s policy while that is legitimate, and choose a modest vehicle — the age and vehicle multipliers compound.",
    record: "Violations age off the rating file, typically three years for a ticket and three to five for an at-fault claim, and a DUI five to ten depending on the state. Diary the date yours falls off and re-quote that week. In the meantime, carriers differ enormously in how harshly they surcharge — this is the single situation where shopping widely pays most.",
    credit: "Credit is the fastest-moving of the big factors. Bringing revolving balances under 30% of limits and avoiding new credit applications can shift a tier within two or three billing cycles. Re-quote once it has, because carriers do not always re-pull promptly at renewal. If you live in California, Hawaii, Massachusetts or Michigan, this factor is banned and should not be affecting you at all.",
    state: "Where the car sleeps sets the rate. You are unlikely to move for insurance, but two things are worth doing: confirm the garaging address on the policy is genuinely where the car is kept overnight, and shop harder than average — dispersion between carriers is widest in the most expensive states.",
    vtype: "Repair cost, parts availability and theft rate drive this multiplier, and they are decided the day you choose the vehicle rather than the day you buy the policy. If a change is on the horizon, get insurance quotes on the shortlist before you commit; the gap between a mainstream sedan and a luxury model is larger than most option packages.",
    coverage: "You have chosen higher limits, and this is the one increase on the page worth defending. Liability is cheap per dollar of protection and the cost of being underinsured is unbounded. Recover the money somewhere else — the deductible, the payment plan, or a different carrier.",
    deductible: "Your deductible is doing real damage. Moving from $250 to $1,000 cuts the physical-damage side by roughly 20% for $750 of extra exposure, which breaks even in about three years against an average claim interval of eleven or more. Take the money.",
    miles: "High mileage raises the premium far less than drivers expect, but it is still worth two calls: ask about a mileage band you may have outgrown or undershot, and ask whether a pay-per-mile or telematics product would price you better than a flat annual estimate.",
    value: "An expensive vehicle only inflates the collision and comprehensive half of the bill, and that half shrinks every year as the car depreciates. Apply the 10% rule annually — once physical damage cover costs more than a tenth of the car&rsquo;s value, drop it and keep the liability.",
    loyalty: "You are being charged for staying. Tenure is a rating variable, and the gap between a new customer and a long-standing one for identical risk commonly runs 10–15%. Get five quotes this month. If your current carrier is competitive, nothing is lost; if it is not, this is the largest saving on the page.",
    discounts: "Nothing is inflating your premium — every factor is at or below the market baseline. The remaining lever is the market itself: quote five carriers, including one direct writer and one independent broker. A well-rated driver is exactly who a competing insurer most wants to take from your current one."
  };

  MDC.calc({
    form: "ins-form",
    defaults: {
      age: "35", record: "clean", credit: "good",
      state: "avg", value: 34000, vtype: "suv", miles: 12000,
      coverage: "full", deductible: "500",
      discMulti: 12, discTele: 0, discPay: 6, discStudent: 0, tenure: 5
    },
    compute: function (i) {
      var s = settings(i);
      var m = multipliers(s);
      var annual = premium(s);

      /* Leave-one-out attribution: what would this premium be if THIS factor
         alone sat at the baseline? The difference is that factor's dollar cost. */
      var rows = [], k, j;
      for (j = 0; j < ORDER.length; j++) {
        k = ORDER[j];
        rows.push({
          key: k,
          name: NAME[k],
          setting: settingLabel(k, s),
          mul: m[k],
          impact: annual - annual / m[k]
        });
      }
      rows.sort(function (a, b) { return Math.abs(b.impact) - Math.abs(a.impact); });

      var minPrem = premium(settings(i, { coverage: "min" }));

      return {
        annual: annual,
        monthly: annual / 12,
        sixMonth: annual / 2,
        insPerMile: annual / Math.max(1, i.miles),
        milesOut: i.miles,
        vsBase: annual / BASE * 100,
        minPremium: minPrem,
        minSaving: Math.max(0, annual - minPrem),
        dedSaving: Math.max(0, annual - premium(settings(i, { deductible: "1000" }))),
        rows: rows,
        physShare: s.coverage === "min" ? 0 : PHYS,
        _s: s
      };
    },
    onInput: function (i) {
      var set = function (k, v) {
        document.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) {
          if (el.closest(".field")) el.textContent = v;
        });
      };
      set("miles", F.num(i.miles) + " mi/yr");
    },
    count: [],
    render: function (res, i) {
      /* ---- ranked "what is driving your premium" table ------------------ */
      var host = document.getElementById("factor-table");
      if (host) {
        var body = "", flat = [], n = 0;
        for (var r = 0; r < res.rows.length; r++) {
          var row = res.rows[r];
          if (Math.abs(row.mul - 1) < 0.005) {
            /* At state minimum the deductible and the vehicle's value are not
               rated at all, so they do not belong in a list of neutral settings. */
            if (!(res.physShare === 0 && (row.key === "deductible" || row.key === "value"))) {
              flat.push(row.name.toLowerCase());
            }
            continue;
          }
          n++;
          var up = row.impact > 0;
          var color = up ? "var(--warn)" : "var(--success)";
          var mark = up ? "▲" : "▼";
          var sign = up ? "+" : "−";
          body += '<tr>' +
            '<td><strong>' + row.name + '</strong><br><small class="text-muted">' + row.setting + '</small></td>' +
            '<td class="num">×' + row.mul.toFixed(2) + '</td>' +
            '<td class="num" style="color:' + color + ';font-weight:700">' +
              mark + ' ' + sign + F.money(Math.abs(row.impact)) + '</td>' +
            '<td class="num" style="color:' + color + '">' + sign + F.money(Math.abs(row.impact) / 12) + '</td>' +
            '</tr>';
        }

        var note = n === 0
          ? '<p class="text-muted" style="font-size:.88rem">Every one of your settings sits exactly at the market baseline, so this premium <em>is</em> the national average. Change any input to see what it is worth in dollars.'
          : '<p class="text-muted" style="font-size:.88rem">Each row answers one question: what would you pay if this factor alone were at the baseline, and everything else stayed as it is? Because the factors multiply rather than add, the rows will not sum exactly to the difference from $2,496 — that is a property of the arithmetic, not a rounding error.';
        if (flat.length) {
          note += ' At the baseline and therefore costing nothing either way: ' + flat.join(", ") + '.';
        }
        if (res.physShare === 0) {
          note += ' Your deductible and your vehicle&rsquo;s value are not rated at all at state minimum, because nothing on this policy repairs your own car.';
        }
        note += '</p>';
        if (res.annual > BASE * 3.5) {
          note += '<p class="text-muted" style="font-size:.88rem">Because these factors multiply rather than add, a profile this heavily loaded produces a number that looks unreal — and in practice it is. Most standard carriers decline risks at this level outright. A driver here is quoted by non-standard carriers or placed in a state assigned-risk pool, where the real figure is high but usually lands well below a naive product of the multipliers.</p>';
        }

        host.innerHTML = n === 0 ? note :
          '<div class="table-wrap"><table class="tbl">' +
          '<thead><tr><th>Factor and your setting</th><th class="num">Multiplier</th>' +
          '<th class="num">Per year</th><th class="num">Per month</th></tr></thead>' +
          '<tbody>' + body + '</tbody></table></div>' + note;
      }

      /* ---- the single highest-leverage action for THIS driver ----------- */
      var lever = document.getElementById("lever-body");
      if (lever) {
        var top = null;
        for (var t = 0; t < res.rows.length; t++) {
          if (res.rows[t].impact > 1) { top = res.rows[t]; break; }
        }
        var headline, advice;
        if (top) {
          headline = '<p style="margin:0 0 10px"><strong>' + top.name + '</strong> is the most expensive thing about this policy. ' +
            'It is adding <strong>' + F.money(top.impact) + '</strong> a year — ' +
            F.money(top.impact / 12) + ' a month — against a driver who is otherwise identical to you.</p>';
          advice = ADVICE[top.key];
        } else {
          headline = '<p style="margin:0 0 10px">Nothing in your profile is pushing this premium above the baseline. ' +
            'The saving left on the table is not in your risk, it is in the market.</p>';
          advice = ADVICE.discounts;
        }
        var extra = "";
        if (top && top.key !== "deductible" && res.dedSaving > 40 && i.deductible !== "1000" && i.coverage !== "min") {
          extra = '<p style="margin:10px 0 0" class="text-muted">Second lever: moving to a $1,000 deductible would take another <strong>' +
            F.money(res.dedSaving) + '</strong> a year off this premium.</p>';
        }
        lever.innerHTML = headline + '<p style="margin:0">' + advice + '</p>' + extra;
      }

      /* ---- what the premium actually buys ------------------------------ */
      var segs;
      if (res.physShare === 0) {
        segs = [
          { label: "Liability", value: res.annual * 0.78, cssVar: "--c-insure" },
          { label: "Uninsured motorist &amp; other", value: res.annual * 0.22, cssVar: "--c-opp" }
        ];
      } else {
        segs = [
          { label: "Liability", value: res.annual * 0.47, cssVar: "--c-insure" },
          { label: "Collision", value: res.annual * 0.28, cssVar: "--c-maint" },
          { label: "Comprehensive", value: res.annual * 0.13, cssVar: "--c-fuel" },
          { label: "Uninsured motorist &amp; other", value: res.annual * 0.12, cssVar: "--c-opp" }
        ];
      }

      var donut = document.getElementById("donut");
      if (donut) MDC.charts.donut(donut, segs, {
        centerLabel: "Per year",
        centerValue: F.money(res.annual),
        centerSub: F.money(res.annual / 12) + " / mo",
        aria: "How the premium splits between liability, collision, comprehensive and other cover"
      });

      var bd = document.getElementById("breakdown");
      if (bd) {
        bd.innerHTML = segs.map(function (sg) {
          var pct = res.annual > 0 ? sg.value / res.annual * 100 : 0;
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + sg.cssVar + ')"></span>' +
            '<span class="bd-name">' + sg.label + '<small>' + F.money(sg.value / 12) + ' / month</small></span>' +
            '<span class="bd-pct num">' + Math.round(pct) + '%</span>' +
            '<span class="bd-val num">' + F.money(sg.value) + '</span>' +
            '</div>';
        }).join("") +
        '<p class="text-muted" style="font-size:.84rem;margin-top:14px">' +
        (res.physShare === 0
          ? 'At state minimum you are buying liability and little else. Nothing here repairs your own vehicle.'
          : 'Liability is the cheapest protection per dollar on the policy and the only part that protects your savings. Collision and comprehensive protect the car, and their value falls every year as the car depreciates.') +
        '</p>';
      }
    }
  });
})();
