/* Monthly Transportation Budget — MyDrivingCost.com */
(function () {
  "use strict";
  var MDC = window.MDC, F = MDC.fmt;

  /* The donut and breakdown describe the TRUE economic cost, so the financing
     line is interest, not the whole payment. The principal portion of a payment
     buys equity; depreciation is what destroys it. Counting both double-counts. */
  var CATS = [
    { key: "finance",   label: "Loan interest",            css: "--c-finance" },
    { key: "deprec",    label: "Depreciation",             css: "--c-deprec" },
    { key: "insurance", label: "Insurance",                css: "--c-insure" },
    { key: "fuel",      label: "Fuel",                     css: "--c-fuel" },
    { key: "maint",     label: "Maintenance & repairs",    css: "--c-maint" },
    { key: "reg",       label: "Registration & fees",      css: "--c-tax" },
    { key: "other",     label: "Parking, tolls & transit", css: "--c-opp" }
  ];

  var BANDS = [
    { name: "Comfortable", lo: 0,  hi: 10,  label: "Under 10%", css: "--c-insure",
      note: "Transport is not shaping the rest of the budget. Hold this position." },
    { name: "Reasonable", lo: 10, hi: 15,  label: "10-15%", css: "--c-tax",
      note: "The normal range for a household running one financed vehicle at average mileage." },
    { name: "Stretched", lo: 15, hi: 20,  label: "15-20%", css: "--c-maint",
      note: "Workable, but transport is now competing directly with saving and debt payoff." },
    { name: "Overweight", lo: 20, hi: 999, label: "Over 20%", css: "--c-fuel",
      note: "The vehicles are setting the terms of the budget. The insurance line and the second car are where to start." }
  ];

  function bandFor(pct) {
    for (var b = 0; b < BANDS.length; b++) {
      if (pct < BANDS[b].hi) return b;
    }
    return BANDS.length - 1;
  }

  /* Interest due this month on the outstanding balance, and the principal the
     payment therefore repays. A zero balance means no equity is being bought:
     a paid-off car (whose payment should be zero) or a lease, where the payment
     is pure cost and none of it may be netted off. */
  function loan(payment, balance, apr) {
    if (!(balance > 0)) return { interest: 0, principal: 0 };
    var interest = balance * apr / 1200;
    var principal = Math.max(0, payment - interest);
    principal = Math.min(principal, payment);
    principal = Math.min(principal, balance);
    return { interest: interest, principal: principal };
  }

  MDC.calc({
    form: "budget-form",
    defaults: {
      takeHome: 5000, grossMonthly: 6500,
      v1Payment: 670, v1Balance: 33680, v1Apr: 7.2, v1Value: 34000,
      v1Insurance: 208, v1Miles: 12000, v1Mpg: 30, v1Maint: 132,
      hasV2: "no",
      v2Payment: 0, v2Balance: 0, v2Apr: 8.4, v2Value: 12000,
      v2Insurance: 118, v2Miles: 7000, v2Mpg: 28, v2Maint: 95,
      fuelPrice: 4.00, parking: 0, tolls: 0, transit: 0, rideshare: 0,
      v1Reg: 220, v2Reg: 180, useDep: "yes", depRate: 15, repairs: 0
    },
    compute: function (i) {
      /* The second vehicle's fields always exist. When the toggle is off they
         are multiplied out of every total rather than removed from the form. */
      var on = i.hasV2 === "yes" ? 1 : 0;
      var rate = (i.useDep === "yes" ? i.depRate : 0) / 100;

      var l1 = loan(i.v1Payment, i.v1Balance, i.v1Apr);
      var l2 = loan(i.v2Payment, i.v2Balance, i.v2Apr);

      var v1Fuel = i.v1Mpg > 0 ? (i.v1Miles / 12) / i.v1Mpg * i.fuelPrice : 0;
      var v2Fuel = i.v2Mpg > 0 ? (i.v2Miles / 12) / i.v2Mpg * i.fuelPrice : 0;
      var v1Dep = i.v1Value * rate / 12;
      var v2Dep = i.v2Value * rate / 12;

      var payments = i.v1Payment + i.v2Payment * on;
      var principal = l1.principal + l2.principal * on;
      var deprec = v1Dep + v2Dep * on;

      /* vals sums to trueMonthly exactly. The finance line is payments minus
         principal: interest on a normal loan, the whole payment on a lease. */
      var vals = {
        finance:   payments - principal,
        deprec:    deprec,
        insurance: i.v1Insurance + i.v2Insurance * on,
        fuel:      v1Fuel + v2Fuel * on,
        maint:     i.v1Maint + i.v2Maint * on + i.repairs,
        reg:       (i.v1Reg + i.v2Reg * on) / 12,
        other:     i.parking + i.tolls + i.transit + i.rideshare
      };

      var cash = payments + vals.insurance + vals.fuel + vals.maint + vals.reg + vals.other;
      var trueMonthly = cash - principal + deprec;
      var gap = deprec - principal;

      var take = Math.max(1, i.takeHome);
      var gross = Math.max(1, i.grossMonthly);
      var pctTake = trueMonthly / take * 100;
      var totalMiles = Math.max(1, i.v1Miles + i.v2Miles * on);

      /* Every individual line, with its cash figure and its economic figure. */
      var lines = [
        { label: "Vehicle one - payment", cash: i.v1Payment, econ: i.v1Payment - l1.principal,
          note: l1.principal > 0.5 ? "of which " + F.money(l1.principal) + " repays principal and buys equity" : "" },
        { label: "Vehicle one - depreciation", cash: 0, econ: v1Dep, note: "no invoice, no direct debit" },
        { label: "Vehicle one - insurance", cash: i.v1Insurance, econ: i.v1Insurance, note: "" },
        { label: "Vehicle one - fuel", cash: v1Fuel, econ: v1Fuel, note: "" },
        { label: "Vehicle one - maintenance & tires", cash: i.v1Maint, econ: i.v1Maint, note: "" },
        { label: "Vehicle one - registration", cash: i.v1Reg / 12, econ: i.v1Reg / 12, note: "" },
        { label: "Vehicle two - payment", cash: i.v2Payment * on, econ: (i.v2Payment - l2.principal) * on,
          note: on && l2.principal > 0.5 ? "of which " + F.money(l2.principal) + " repays principal" : "" },
        { label: "Vehicle two - depreciation", cash: 0, econ: v2Dep * on, note: on ? "no invoice, no direct debit" : "" },
        { label: "Vehicle two - insurance", cash: i.v2Insurance * on, econ: i.v2Insurance * on, note: "" },
        { label: "Vehicle two - fuel", cash: v2Fuel * on, econ: v2Fuel * on, note: "" },
        { label: "Vehicle two - maintenance & tires", cash: i.v2Maint * on, econ: i.v2Maint * on, note: "" },
        { label: "Vehicle two - registration", cash: i.v2Reg * on / 12, econ: i.v2Reg * on / 12, note: "" },
        { label: "Extra repair reserve", cash: i.repairs, econ: i.repairs, note: "" },
        { label: "Parking & permits", cash: i.parking, econ: i.parking, note: "" },
        { label: "Tolls", cash: i.tolls, econ: i.tolls, note: "" },
        { label: "Transit passes", cash: i.transit, econ: i.transit, note: "" },
        { label: "Rideshare & taxis", cash: i.rideshare, econ: i.rideshare, note: "" }
      ];

      /* What a second vehicle stands you before it moves: interest, insurance,
         registration and depreciation. Computed whether or not it is switched on. */
      var v2Fixed = l2.interest + i.v2Insurance + i.v2Reg / 12 + i.v2Value * (i.depRate / 100) / 12;

      var v2Verdict = on
        ? "Yours stands you " + F.money(v2Fixed) + " a month before it moves. Log how many days over the next two months it is genuinely the only option. If the answer is under thirty, rentals at $60-90 a day and occasional rideshare cost less than keeping it - and selling releases the car's value on top of its running cost."
        : "You have this switched off, so none of it is in your totals. The figures above are what a second vehicle on these terms would add: " + F.money(v2Fixed) + " a month, " + F.money(v2Fixed * 12) + " a year, before a single mile is driven. Price that against renting on the fifteen or twenty days a year you would actually need it.";

      /* The gap can legitimately be negative: equity being built faster than
         value is being lost. Every piece of copy has to handle both signs. */
      var gapNote;
      if (principal < 0.5) {
        gapNote = "With no loan principal being repaid against it, all of that is a straight reduction in what you own - " +
          F.money(deprec) + " a month of invisible cost with nothing offsetting it. This is the position a paid-off car is really in, and it is why &ldquo;no payment&rdquo; is not the same as &ldquo;no cost&rdquo;.";
      } else if (gap > 25) {
        gapNote = "The principal portion of your payments puts " + F.money(principal) +
          " a month back into equity, so the net invisible cost - value lost beyond value bought - is " +
          F.money(gap) + " a month, or " + F.money(gap * 12) + " a year. That is the figure your bank statement can never show you.";
      } else if (gap < -25) {
        /* Principal outrunning depreciation arises from two situations that
           need opposite explanations, and one string cannot be honest about
           both. A fresh loan that financed sales tax and fees shows this
           because part of every payment retires debt that never had resale
           value - no real equity is created. A matured loan shows it because
           the balance has genuinely fallen below the car's worth. Loan-to-
           value separates them cleanly. */
        var ltvGap = (i.v1Value + i.v2Value * on) > 0
          ? (i.v1Balance + i.v2Balance * on) / (i.v1Value + i.v2Value * on)
          : 0;
        gapNote = "The principal portion of your payments puts " + F.money(principal) +
          " a month back against the debt, which is more than your vehicles are losing - a gap of " +
          F.money(-gap) + " a month. " +
          (ltvGap > 0.9
            ? "On a loan this new, most of that is an accounting artifact rather than wealth: you financed the sales tax and dealer fees alongside the car, and those never carried any resale value, so part of every payment is retiring debt that bought nothing you can sell. Your position is improving, but by less than the gap suggests."
            : "This is the position you want as a loan matures - the balance now sits well below what the car is worth, so each payment genuinely adds to what you own. It reverses the day the loan ends and the depreciation carries on alone.");
      } else {
        gapNote = "Against it, the principal portion of your payments puts " + F.money(principal) +
          " a month back into equity - almost exactly the same figure. On a fresh five-year loan the two very nearly cancel: your payment is, near enough, your depreciation. The payment stops when the loan ends. The depreciation does not.";
      }

      var bi = bandFor(pctTake);

      return {
        trueMonthly: trueMonthly,
        trueAnnual: trueMonthly * 12,
        cashMonthly: cash,
        cashAnnual: cash * 12,
        deprecMonthly: deprec,
        deprecAnnual: deprec * 12,
        interestMonthly: vals.finance,
        principalMonthly: principal,
        gapMonthly: gap,
        gapAnnual: gap * 12,
        gapNote: gapNote,
        pctTake: pctTake,
        cashPctTake: cash / take * 100,
        pctGross: trueMonthly / gross * 100,
        cashPctGross: cash / gross * 100,
        depShare: trueMonthly > 0 ? deprec / trueMonthly * 100 : 0,
        perMile: trueMonthly * 12 / totalMiles,
        cashPerMile: cash * 12 / totalMiles,
        totalMiles: totalMiles,
        bandLabel: BANDS[bi].name,
        bandNote: BANDS[bi].note,
        bandIndex: bi,
        v2Fixed: v2Fixed,
        v2FixedAnnual: v2Fixed * 12,
        v2Verdict: v2Verdict,
        takeHome: take,
        vals: vals,
        lines: lines,
        _i: i
      };
    },
    onSeg: function (name, val, api) {
      if (name === "hasV2") {
        document.querySelectorAll('[data-when="v2"]').forEach(function (el) {
          el.hidden = val !== "yes";
        });
        document.querySelectorAll('[data-when="v2off"]').forEach(function (el) {
          el.hidden = val === "yes";
        });
      }
    },
    onInput: function (i) {
      var set = function (k, v) {
        document.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) {
          if (el.closest(".field")) el.textContent = v;
        });
      };
      set("v1Miles", F.num(i.v1Miles) + " mi/yr");
      set("v2Miles", F.num(i.v2Miles) + " mi/yr");
      set("v1Apr", i.v1Apr.toFixed(1) + "%");
      set("v2Apr", i.v2Apr.toFixed(1) + "%");
      set("depRate", i.depRate + "% /yr");
    },
    count: [],
    render: function (res, i) {
      /* ---- second-vehicle field visibility ------------------------------ */
      var v2on = i.hasV2 === "yes";
      document.querySelectorAll('[data-when="v2"]').forEach(function (el) { el.hidden = !v2on; });
      document.querySelectorAll('[data-when="v2off"]').forEach(function (el) { el.hidden = v2on; });

      /* ---- verdict band -------------------------------------------------- */
      var band = document.getElementById("band");
      if (band) {
        var active = BANDS[res.bandIndex];
        var pos = Math.min(100, Math.max(1.5, res.pctTake / 30 * 100));
        var html = '<div style="margin-bottom:18px">' +
          '<div class="bd-bar" style="height:14px">' +
            '<i style="width:' + pos.toFixed(1) + '%;background:var(' + active.css + ')"></i>' +
          '</div>' +
          '<div class="flex" style="justify-content:space-between;font-size:.75rem;color:var(--muted);margin-top:7px">' +
            '<span>0%</span><span>10%</span><span>20%</span><span>30%+</span>' +
          '</div></div>';

        html += BANDS.map(function (b, n) {
          var isNow = n === res.bandIndex;
          var lo = res.takeHome * b.lo / 100;
          var hi = res.takeHome * b.hi / 100;
          var money = b.hi > 900 ? "over " + F.money(lo) : F.money(lo) + " - " + F.money(hi);
          return '<div class="bd-row"' +
            (isNow ? ' style="background:var(--surface-2);border-radius:10px;padding-left:12px;padding-right:12px"' : '') + '>' +
            '<span class="bd-swatch" style="background:var(' + b.css + ')' + (isNow ? '' : ';opacity:.35') + '"></span>' +
            '<span class="bd-name"' + (isNow ? '' : ' style="font-weight:500;color:var(--muted)"') + '>' + b.name +
              (isNow ? ' <strong style="color:var(' + b.css + ')">- you are here, at ' + F.pct(res.pctTake) + '</strong>' : '') +
              '<small>' + b.note + '</small></span>' +
            '<span class="bd-pct num" style="width:62px">' + b.label + '</span>' +
            '<span class="bd-val num">' + money + '</span>' +
            '</div>';
        }).join("");
        band.innerHTML = html;
      }

      /* ---- category donut (segments sum to the true economic cost) -------- */
      var rows = CATS.map(function (c) { return { c: c, v: res.vals[c.key] || 0 }; })
                     .filter(function (r) { return r.v > 0.5; });
      var donut = document.getElementById("donut");
      if (donut) MDC.charts.donut(donut, rows.map(function (r) {
        return { label: r.c.label, value: r.v, cssVar: r.c.css };
      }), {
        centerLabel: "True cost",
        centerValue: F.money(res.trueMonthly),
        centerSub: F.pct(res.pctTake) + " of take-home",
        aria: "Household transport cost by category"
      });

      var bd = document.getElementById("breakdown");
      if (bd) {
        var sorted = rows.slice().sort(function (a, b) { return b.v - a.v; });
        var biggest = sorted[0];
        var tail;
        if (res.principalMonthly < 0.5) {
          tail = 'These sum to the true economic cost, not the cash total. With nothing outstanding on the vehicles there is no principal to net off, so every dollar of depreciation is a dollar of cost.';
        } else {
          tail = 'These sum to the true economic cost, not the cash total. The financing line is <strong>interest only</strong> - the ' +
            F.money(res.principalMonthly) + ' of principal inside your payments buys equity rather than vanishing, so it is cash out but not economic cost.';
        }
        bd.innerHTML = sorted.map(function (r) {
          var pct = res.trueMonthly > 0 ? r.v / res.trueMonthly * 100 : 0;
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + r.c.css + ')"></span>' +
            '<span class="bd-name">' + r.c.label + '<small>' + F.money(r.v * 12) + ' / year</small></span>' +
            '<span class="bd-pct num">' + Math.round(pct) + '%</span>' +
            '<span class="bd-val num">' + F.money(r.v) + '/mo</span>' +
            '</div>';
        }).join("") +
        '<p class="text-muted" style="font-size:.84rem;margin-top:14px">' +
        (biggest ? 'Your largest single line is <strong>' + biggest.c.label + '</strong> at ' + F.money(biggest.v) + ' a month. ' : '') +
        tail + '</p>';
      }

      /* ---- line-by-line ledger, cash beside true cost --------------------- */
      var led = document.getElementById("ledger");
      if (led) {
        var take = res.takeHome;
        var body = "";
        res.lines.forEach(function (l) {
          if (l.cash < 0.5 && l.econ < 0.5) return;
          body += '<tr><td>' + l.label +
            (l.note ? '<small class="text-muted" style="display:block">' + l.note + '</small>' : '') + '</td>' +
            '<td class="num">' + (l.cash < 0.005 ? '&mdash;' : F.money(l.cash)) + '</td>' +
            '<td class="num">' + (l.econ < 0.005 ? '&mdash;' : F.money(l.econ)) + '</td>' +
            '<td class="num">' + F.money(l.econ * 12) + '</td>' +
            '<td class="num">' + F.pct(l.econ / take * 100) + '</td></tr>';
        });
        body += '<tr><td><strong>Total</strong></td>' +
          '<td class="num"><strong>' + F.money(res.cashMonthly) + '</strong></td>' +
          '<td class="num"><strong>' + F.money(res.trueMonthly) + '</strong></td>' +
          '<td class="num"><strong>' + F.money(res.trueAnnual) + '</strong></td>' +
          '<td class="num"><strong>' + F.pct(res.pctTake) + '</strong></td></tr>';

        var recon = 'The two totals reconcile exactly: cash of <strong>' + F.money(res.cashMonthly) +
          '</strong> less <strong>' + F.money(res.principalMonthly) + '</strong> of principal repaid, plus <strong>' +
          F.money(res.deprecMonthly) + '</strong> of depreciation, gives <strong>' + F.money(res.trueMonthly) +
          '</strong>. Principal comes out because it buys equity rather than vanishing; depreciation goes in because it vanishes without ever being billed.';

        led.innerHTML = '<div class="table-wrap"><table class="tbl">' +
          '<thead><tr><th>Line item</th><th class="num">Cash / mo</th><th class="num">True cost / mo</th>' +
          '<th class="num">True cost / yr</th><th class="num">Of take-home</th></tr></thead>' +
          '<tbody>' + body + '</tbody></table></div>' +
          '<p class="text-muted" style="font-size:.85rem;margin-top:12px">' + recon +
          ' Annual items such as registration are divided by twelve so they stop arriving as surprises. Blended true cost per mile across the household is <strong>' +
          F.perMile(res.perMile) + '</strong>, against <strong>' + F.perMile(res.cashPerMile) + '</strong> in cash.</p>';
      }
    }
  });
})();
