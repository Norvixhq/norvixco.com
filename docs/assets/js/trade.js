/* Trade-In vs Private Sale Calculator — MyDrivingCost.com */
(function () {
  "use strict";
  var MDC = window.MDC, F = MDC.fmt;

  /* Depreciation rates and the typical wholesale-to-retail spread by segment.
     Trucks change hands in a tight, liquid market; EVs and luxury cars do not. */
  var SEG = {
    truck: { d1: 16, dn: 11, spread: 12 },
    suv:   { d1: 20, dn: 15, spread: 15 },
    sedan: { d1: 21, dn: 16, spread: 16 },
    lux:   { d1: 25, dn: 18, spread: 18 },
    ev:    { d1: 26, dn: 17, spread: 20 }
  };

  var COND = { rough: 0.76, fair: 0.88, good: 1.00, excellent: 1.08 };
  var COND_LABEL = { rough: "rough", fair: "fair", good: "good", excellent: "excellent" };

  var RATES = [0, 4, 6, 7, 9];

  function retained(d1, dn, years) {
    var r = 1;
    for (var y = 1; y <= years; y++) r *= (y === 1 ? 1 - d1 / 100 : 1 - dn / 100);
    return r;
  }

  function money(v) { return F.money(v); }

  MDC.calc({
    form: "trade-form",
    defaults: {
      price: 34000, age: "5", miles: 12000, condition: "good", segment: "suv",
      newPrice: 34000, salesTax: 7, taxCredit: "yes",
      loanBalance: 0,
      privateSpread: 15, recon: 350, daysToSell: 21, hours: 8, instantFloor: 0.94
    },
    compute: function (i) {
      var age = parseInt(i.age, 10) || 1;
      var s = SEG[i.segment] || SEG.suv;
      var cond = COND[i.condition] != null ? COND[i.condition] : 1;

      /* Canonical curve: 20% in year one, 15% each year after, tilted by segment. */
      var base = i.price * retained(s.d1, s.dn, age);
      var extraMiles = Math.max(0, i.miles - 12000) * age;
      var milePenalty = extraMiles * 0.06;
      var market = Math.max(i.price * 0.03, base * cond - milePenalty);

      /* Trade is wholesale, private is retail-minus. Market sits between them. */
      var half = i.privateSpread / 2 / 100;
      var tradeValue = market * (1 - half);
      var privateValue = market * (1 + half);
      var instant = tradeValue * i.instantFloor;

      var credits = i.taxCredit === "yes";
      var creditBase = Math.max(0, Math.min(tradeValue, i.newPrice));
      var taxSaving = credits ? creditBase * i.salesTax / 100 : 0;

      var netTrade = tradeValue + taxSaving;
      var netPrivate = privateValue - i.recon;
      var diff = netPrivate - netTrade;
      var privateWins = diff > 0;
      var advantage = Math.abs(diff);

      var hours = Math.max(1, i.hours);
      var hourly = diff / hours;

      /* The tax rate at which the two routes tie, if the state credits trades. */
      var breakEven = creditBase > 0 ? (privateValue - i.recon - tradeValue) / creditBase * 100 : 0;

      var shortfall = Math.max(0, i.loanBalance - tradeValue);
      var privShortfall = Math.max(0, i.loanBalance - (privateValue - i.recon));
      var equityTrade = tradeValue - i.loanBalance;

      var winnerLabel = advantage < 25
        ? "either route"
        : (privateWins ? "selling it privately" : "trading it in");
      var winnerShort = advantage < 25 ? "Line ball" : (privateWins ? "Private sale" : "Trade-in");

      var verdict;
      if (advantage < 25) {
        verdict = "The two routes are within $25 of each other, so take the easy one.";
      } else if (privateWins) {
        verdict = "Selling it yourself is ahead by " + money(advantage) +
          ", which is what a few weekends of your time is being valued at.";
      } else {
        verdict = "Trading it in is ahead by " + money(advantage) +
          " once the sales-tax credit is counted — and it costs you no weekends.";
      }

      var hourlyNote;
      if (!privateWins) {
        hourlyNote = "On these numbers the private sale earns you nothing at all: the tax credit " +
          "on a trade is larger than the premium a private buyer will pay.";
      } else if (hourly < 25) {
        hourlyNote = "That is below what most people would work a Saturday for. The convenience of " +
          "trading in is worth more than this margin.";
      } else if (hourly < 75) {
        hourlyNote = "A fair rate for straightforward work, but it assumes the sale goes smoothly " +
          "and nobody wastes your afternoon.";
      } else {
        hourlyNote = "That is a strong return for a weekend, and well worth the effort of doing it " +
          "properly — good photographs, full records, a bank meeting for payment.";
      }

      var equityNote;
      if (i.loanBalance <= 0) {
        equityNote = "You owe nothing on this car, so every dollar of the sale is yours. That is the " +
          "cleanest position to sell from, and it is worth reaching before you start shopping for the next one.";
      } else if (shortfall > 0) {
        equityNote = "You are underwater. The payoff of " + money(i.loanBalance) +
          " exceeds the trade value by " + money(shortfall) +
          ", and that shortfall has to be settled in cash or rolled into your next loan — where you pay " +
          "interest on it for years, on a car you no longer own. Selling privately would leave a shortfall of " +
          money(privShortfall) + ".";
      } else {
        equityNote = "You have positive equity of " + money(equityTrade) +
          " on a trade after the payoff of " + money(i.loanBalance) +
          " is settled. Ask for the payoff to be shown as a separate line on the buyer's order, not folded " +
          "into the trade allowance.";
      }

      return {
        price: i.price,
        marketValue: market,
        tradeValue: tradeValue,
        privateValue: privateValue,
        instant: instant,
        spreadDollars: privateValue - tradeValue,
        taxSaving: taxSaving,
        netTrade: netTrade,
        netPrivate: netPrivate,
        advantage: advantage,
        privateWins: privateWins,
        winnerLabel: winnerLabel,
        winnerShort: winnerShort,
        verdict: verdict,
        hourly: hourly,
        hourlyNote: hourlyNote,
        hoursLabel: hours + (hours === 1 ? " hour" : " hours"),
        equityNote: equityNote,
        shortfall: shortfall,
        breakEven: breakEven,
        tradePctOfMarket: market > 0 ? tradeValue / market * 100 : 0,
        daysLabel: i.daysToSell + (i.daysToSell === 1 ? " day" : " days"),
        condLabel: COND_LABEL[i.condition] || "good",
        milePenalty: milePenalty,
        credits: credits,
        creditBase: creditBase,
        _i: i
      };
    },
    onSeg: function (name, val, api) {
      /* Segment sets the typical wholesale-to-retail spread; the user can override. */
      if (name === "segment" && SEG[val]) api.setField("privateSpread", SEG[val].spread);
    },
    onInput: function (i) {
      var set = function (k, v) {
        document.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) {
          if (el.closest(".field")) el.textContent = v;
        });
      };
      set("miles", F.num(i.miles) + " mi/yr");
      set("privateSpread", i.privateSpread + "%");
    },
    count: [],
    render: function (res, i) {
      function row(label, note, value, cssVar, sign) {
        return '<div class="bd-row">' +
          '<span class="bd-swatch" style="background:var(' + cssVar + ')"></span>' +
          '<span class="bd-name">' + label + '<small>' + note + '</small></span>' +
          '<span class="bd-pct num">' + (sign || "") + '</span>' +
          '<span class="bd-val num">' + money(value) + '</span>' +
          '</div>';
      }
      function total(label, note, value) {
        return '<div class="bd-row" style="border-top:1px solid var(--border);margin-top:8px;padding-top:12px">' +
          '<span class="bd-swatch" style="background:transparent"></span>' +
          '<span class="bd-name"><strong>' + label + '</strong><small>' + note + '</small></span>' +
          '<span class="bd-pct num"></span>' +
          '<span class="bd-val num"><strong>' + money(value) + '</strong></span>' +
          '</div>';
      }
      function head(text) {
        return '<div style="font-family:var(--font-display);font-weight:700;font-size:.95rem;margin:0 0 10px">' +
          text + '</div>';
      }

      /* ---- the two routes, component by component ----------------------- */
      var host = document.getElementById("routes");
      if (host) {
        var creditNote = res.credits
          ? "Tax charged only on the difference, at " + i.salesTax + "%"
          : "Your state taxes the full price of the new vehicle";

        var tradeBlock = head("Route 1 &mdash; trade it in") +
          row("Trade-in offer", "Wholesale: what the dealer will book it at", res.tradeValue, "--c-deprec", "+") +
          row("Sales-tax credit", creditNote, res.taxSaving, "--c-tax", res.taxSaving > 0 ? "+" : "") +
          row("Reconditioning", "None &mdash; the dealer absorbs it", 0, "--c-maint", "") +
          total("Net position", "What the trade route is worth to you", res.netTrade);

        var privBlock = head("Route 2 &mdash; sell it yourself") +
          row("Private-party price", "Retail minus a private seller's lack of warranty", res.privateValue, "--c-deprec", "+") +
          row("Sales-tax credit", "Forgone &mdash; the credit only exists on a trade", 0, "--c-tax", "") +
          row("Reconditioning &amp; prep", "Detail, inspection, listing costs", i.recon, "--c-maint", "&minus;") +
          total("Net position", "What the private route is worth to you", res.netPrivate);

        host.innerHTML = tradeBlock +
          '<div style="height:20px"></div>' + privBlock +
          '<p class="text-muted" style="font-size:.85rem;margin-top:16px">' +
          'The spread between the two offers is ' + money(res.spreadDollars) +
          '. The sales-tax credit hands back ' + money(res.taxSaving) + ' of it, so ' +
          (res.privateWins
            ? 'the private sale is still ahead by ' + money(res.advantage) + '.'
            : 'the trade-in comes out ahead by ' + money(res.advantage) + '.') +
          '</p>';
      }

      /* ---- who pays what ------------------------------------------------ */
      var lad = document.getElementById("ladder");
      if (lad) {
        var mk = function (label, note, value, cssVar) {
          var pct = res.marketValue > 0 ? value / res.marketValue * 100 : 0;
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + cssVar + ')"></span>' +
            '<span class="bd-name">' + label + '<small>' + note + '</small></span>' +
            '<span class="bd-pct num">' + Math.round(pct) + '%</span>' +
            '<span class="bd-val num">' + money(value) + '</span>' +
            '</div>';
        };
        lad.innerHTML =
          mk("Instant online offer", "Sight unseen, honored for about seven days", res.instant, "--c-opp") +
          mk("Dealer trade-in", "Auction comparables, less reconditioning and days-to-turn", res.tradeValue, "--c-finance") +
          mk("Private party", "A patient buyer, in roughly " + res.daysLabel, res.privateValue, "--c-deprec") +
          '<div class="bd-row" style="border-top:1px solid var(--border);margin-top:8px;padding-top:12px">' +
          '<span class="bd-swatch" style="background:transparent"></span>' +
          '<span class="bd-name"><strong>Market value</strong><small>Condition: ' + res.condLabel +
          (res.milePenalty > 1 ? ', less ' + money(res.milePenalty) + ' for mileage' : '') +
          '</small></span><span class="bd-pct num">100%</span>' +
          '<span class="bd-val num"><strong>' + money(res.marketValue) + '</strong></span></div>';
      }

      /* ---- the decision at five tax rates ------------------------------- */
      var tt = document.getElementById("tax-table");
      if (tt) {
        var nearest = RATES[0], bestGap = Infinity;
        RATES.forEach(function (r) {
          var g = Math.abs(r - i.salesTax);
          if (g < bestGap) { bestGap = g; nearest = r; }
        });

        var rows = "";
        RATES.forEach(function (r) {
          var credit = res.creditBase * r / 100;
          var nt = res.tradeValue + credit;
          var np = res.netPrivate;
          var d = np - nt;
          var wins = d > 0 ? "Private" : (d < 0 ? "Trade-in" : "Tie");
          rows += '<tr><td>' + r.toFixed(0) + '%' +
            (r === nearest ? ' <span class="hint">closest to yours</span>' : '') + '</td>' +
            '<td class="num">' + money(credit) + '</td>' +
            '<td class="num">' + money(nt) + '</td>' +
            '<td class="num">' + money(np) + '</td>' +
            '<td class="num">' + wins + ' by ' + money(Math.abs(d)) + '</td></tr>';
        });

        var be = res.breakEven;
        var footnote;
        if (res.creditBase <= 0) {
          footnote = 'You have entered no replacement vehicle, so there is no trade-in credit to claim ' +
            'at any tax rate. The private sale wins by ' + money(res.advantage) + '.';
        } else if (be <= 0) {
          footnote = 'The trade-in wins at every tax rate shown, including zero &mdash; the private-party ' +
            'premium does not cover the reconditioning you would spend getting the car ready.';
        } else if (be > 15) {
          footnote = 'The private sale wins at every plausible tax rate. The credit would have to reach ' +
            be.toFixed(1) + '% to change the answer, which no US state charges.';
        } else {
          footnote = 'The answer flips at a sales-tax rate of about <strong>' + be.toFixed(1) +
            '%</strong>. Below that the private sale wins; above it, the trade-in credit is worth more ' +
            'than the premium a private buyer will pay.';
        }

        tt.innerHTML = '<div class="table-wrap"><table class="tbl">' +
          '<thead><tr><th>Sales tax</th><th class="num">Trade-in credit</th>' +
          '<th class="num">Net if you trade</th><th class="num">Net if you sell</th>' +
          '<th class="num">Which wins</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
          '<p class="text-muted" style="font-size:.85rem;margin-top:14px">' + footnote + '</p>' +
          (res.credits ? '' :
            '<p class="text-muted" style="font-size:.85rem;margin-top:8px">You have told us your state does ' +
            'not credit the trade, so your real answer is the 0% row whatever your tax rate is. The rest of ' +
            'the table shows what the credit would be worth if it were available to you.</p>');
      }
    }
  });
})();
