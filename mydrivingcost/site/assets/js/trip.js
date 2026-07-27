/* Road Trip Cost — MyDrivingCost.com */
(function () {
  "use strict";
  var MDC = window.MDC, F = MDC.fmt;

  /* Typical efficiency loaded when the powertrain changes. For "ev" the mpg
     field is reinterpreted as kWh per 100 miles — the site benchmark is 28. */
  var EFF = { gas: 30, hybrid: 45, ev: 28, diesel: 38 };
  var UNIT = { gas: "MPG", hybrid: "MPG", ev: "kWh/100mi", diesel: "MPG" };

  function party(v) { return v === "4" ? 4 : (parseInt(v, 10) || 1); }

  /* Cost of one mile of energy, gasoline or electricity. */
  function energyPerMile(i) {
    if (i.power === "ev") return (Math.max(1, i.mpg) / 100) * i.evRate;
    return i.fuelPrice / Math.max(1, i.mpg);
  }

  /* Days of the trip you pay for: nights plus the day you come home. */
  function stayDays(i) { return Math.max(1, Math.round(i.nights) + 1); }

  /* Days actually spent driving, at nine hours behind the wheel a day. */
  function drivingDays(miles, i) {
    return Math.max(1, Math.ceil(miles / Math.max(20, i.avgSpeed) / 9));
  }

  /* Airfare roughly half fixed, half proportional to distance, calibrated so
     that at the user's own trip length it equals exactly what they entered. */
  function fareAt(miles, baseMiles, base) {
    return base * (0.5 + 0.5 * (miles / Math.max(1, baseMiles)));
  }

  /* Transport-only cost of the three options at an arbitrary distance. */
  function options(miles, i, baseMiles) {
    var stay = stayDays(i);
    var rentDays = Math.max(stay, drivingDays(miles, i));
    var n = party(i.travelers);
    var rentPerMile = i.fuelPrice / Math.max(1, i.rentalMpg);

    var fuel = miles * energyPerMile(i);
    var wear = miles * i.wear;

    var rentFuel = miles * rentPerMile;
    var rentBase = i.rentalDay * rentDays;

    /* Flying: fares for the party, one airport cost, a rental for the stay and
       modest local driving at the far end. */
    var localMiles = 50 * stay;
    var fare = fareAt(miles, baseMiles, i.flightPrice);
    var fly = fare * n + i.airportCost + i.rentalDay * stay + localMiles * rentPerMile;

    return {
      own: fuel + wear,
      rent: rentBase + rentFuel,
      fly: fly,
      fuel: fuel,
      wear: wear,
      rentFuel: rentFuel,
      rentBase: rentBase,
      rentDays: rentDays,
      stay: stay,
      fare: fare,
      n: n
    };
  }

  MDC.calc({
    form: "trip-form",
    defaults: {
      distance: 1200, tripType: "round", travelers: "2", nights: 2,
      power: "gas", mpg: 30, fuelPrice: 4.00, wear: 0.30,
      hotel: 165, food: 55, tolls: 40, parking: 0, extras: 0,
      flightPrice: 320, airportCost: 90, rentalDay: 68, rentalMpg: 32,
      evRate: 0.42, valueOfTime: 25, avgSpeed: 62
    },
    compute: function (i) {
      var miles = Math.max(1, i.distance) * (i.tripType === "round" ? 2 : 1);
      var o = options(miles, i, miles);
      var n = o.n;

      var hotels = Math.max(0, i.nights) * i.hotel;
      var foodCost = i.food * n * o.stay;
      var shared = hotels + foodCost + i.tolls + i.parking + i.extras;

      var driveTotal = o.own + shared;
      var rentTotal = o.rent + shared;
      /* Flying skips the tolls and the en-route parking but keeps the rest. */
      var flyTotal = o.fly + hotels + foodCost + i.extras;

      var driveHours = miles / Math.max(20, i.avgSpeed);

      /* Where does renting a car overtake driving your own? Solved by search so
         that the stepped rental days are handled honestly. */
      var breakEven = 0;
      for (var m = 50; m <= 9000; m += 25) {
        var t = options(m, i, miles);
        if (t.rent < t.own) { breakEven = m; break; }
      }

      /* Where does flying overtake driving your own? */
      var flyEven = 0;
      for (var m2 = 50; m2 <= 9000; m2 += 25) {
        var t2 = options(m2, i, miles);
        if (t2.fly < t2.own) { flyEven = m2; break; }
      }

      /* EV road-trip reference: the site benchmark car at the blended rate. */
      var evPerMile = 0.28 * i.evRate;
      var gasRefPerMile = i.fuelPrice / 30;
      var stops = Math.max(0, Math.ceil(miles / 180) - 1);

      return {
        totalMiles: miles,
        driveTotal: driveTotal,
        rentTotal: rentTotal,
        flyTotal: flyTotal,
        perPerson: driveTotal / n,
        perMile: driveTotal / miles,
        fuel: o.fuel,
        fuelShare: driveTotal > 0 ? o.fuel / driveTotal * 100 : 0,
        wearCost: o.wear,
        wearRate: i.wear,
        wearVsFuel: o.fuel > 0 ? o.wear / o.fuel : 0,
        irsCost: miles * 0.725,
        hotels: hotels,
        foodCost: foodCost,
        rentFuel: o.rentFuel,
        rentBase: o.rentBase,
        rentalDays: o.rentDays,
        days: o.stay,
        travelers: n,
        travLabel: n === 4 ? "4+" : String(n),
        driveHours: driveHours,
        timeCost: driveHours * i.valueOfTime,
        breakEven: breakEven,
        flyEven: flyEven,
        evRateOut: i.evRate,
        evPerMile: evPerMile,
        gasRefPerMile: gasRefPerMile,
        chargeStops: stops,
        chargeHours: stops * 25 / 60,
        mpgUnit: UNIT[i.power] || "MPG",
        driveDaysNote: "About " + driveHours.toFixed(1) + " hours behind the wheel — roughly " +
          drivingDays(miles, i) + " day" + (drivingDays(miles, i) === 1 ? "" : "s") +
          " of driving at nine hours a day, and " + o.stay + " day" + (o.stay === 1 ? "" : "s") +
          " of food for " + n + " " + (n === 1 ? "person" : "people") + ".",
        _i: i
      };
    },
    onSeg: function (name, val, api) {
      /* Switching powertrain loads a sensible efficiency and relabels the unit,
         because for an EV the field means kWh per 100 miles, not MPG. */
      if (name === "power" && EFF[val]) {
        api.setField("mpg", EFF[val]);
      }
    },
    onInput: function (i) {
      var set = function (k, v) {
        document.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) {
          if (el.closest(".field")) el.textContent = v;
        });
      };
      set("wear", "$" + i.wear.toFixed(2) + " / mile");
    },
    count: [],
    render: function (res, i) {
      var miles = res.totalMiles;

      /* ---- the three-way comparison, built by hand -------------------- */
      var opts = [
        {
          label: "Drive your own car",
          value: res.driveTotal,
          css: "--c-fuel",
          note: F.money(res.fuel) + " fuel + " + F.money(res.wearCost) + " wear + " +
                F.money(res.driveTotal - res.fuel - res.wearCost) + " on the road"
        },
        {
          label: "Rent a car and drive",
          value: res.rentTotal,
          css: "--c-maint",
          note: res.rentalDays + " days at " + F.money(i.rentalDay) + " + " +
                F.money(res.rentFuel) + " fuel — no wear on your own car"
        },
        {
          label: "Fly, then rent at the far end",
          value: res.flyTotal,
          css: "--c-insure",
          note: res.travLabel + " fares + airport costs + a " + res.days + "-day rental"
        }
      ];
      var best = opts[0], worst = opts[0];
      opts.forEach(function (o) {
        if (o.value < best.value) best = o;
        if (o.value > worst.value) worst = o;
      });

      var cmp = document.getElementById("compare");
      if (cmp) {
        cmp.innerHTML = opts.map(function (o) {
          var delta = o.value - best.value;
          var tag = delta < 1
            ? "cheapest"
            : "+" + F.money(delta);
          return '<div class="bd-row">' +
            '<span class="bd-swatch" style="background:var(' + o.css + ')"></span>' +
            '<span class="bd-name">' + o.label + '<small>' + o.note + '</small></span>' +
            '<span class="bd-pct num">' + tag + '</span>' +
            '<span class="bd-val num">' + F.money(o.value) + '</span>' +
            '</div>';
        }).join("");
      }

      var note = document.getElementById("compare-note");
      if (note) {
        var msg = "Cheapest on this trip: <strong>" + best.label + "</strong> at " +
          F.money(best.value) + ", which is " + F.money(worst.value - best.value) +
          " below the dearest of the three (" + worst.label + "). ";
        if (res.breakEven > 0) {
          msg += "Renting overtakes driving your own car at about <strong>" +
            F.num(res.breakEven) + " total miles</strong> with these figures, because a rental costs a flat daily rate while your own car costs " +
            "$" + i.wear.toFixed(2) + " of wear every mile. ";
        } else {
          msg += "At this wear rate and daily rental rate, renting never overtakes driving your own car — the daily charge is larger than the wear you avoid. ";
        }
        if (res.flyEven > 0) {
          msg += "Flying overtakes driving at about <strong>" + F.num(res.flyEven) +
            " total miles</strong> for " + res.travLabel + " traveling. ";
        }
        msg += "Hotels, food and attractions are held constant across all three so the transport decision stands alone — in practice flying also removes the en-route hotel nights, which pushes the crossover closer still. " +
          "The " + i.valueOfTime.toFixed(0) + "-dollar-an-hour value you placed on your time would add " +
          F.money(res.timeCost) + " to the driving options if you counted it.";
        note.innerHTML = msg;
      }

      /* ---- where the trip money goes ---------------------------------- */
      var CATS = [
        { label: "Fuel", value: res.fuel, css: "--c-fuel" },
        { label: "Wear on your vehicle", value: res.wearCost, css: "--c-deprec" },
        { label: "Hotels", value: res.hotels, css: "--c-insure" },
        { label: "Food", value: res.foodCost, css: "--c-maint" },
        { label: "Tolls and parking", value: i.tolls + i.parking, css: "--c-tax" },
        { label: "Attractions and other", value: i.extras, css: "--c-opp" }
      ].filter(function (c) { return c.value > 0.5; });

      var donut = document.getElementById("donut");
      if (donut) MDC.charts.donut(donut, CATS.map(function (c) {
        return { label: c.label, value: c.value, cssVar: c.css };
      }), {
        centerLabel: "Whole trip",
        centerValue: F.money(res.driveTotal),
        centerSub: F.money(res.perPerson) + " each",
        aria: "Road trip cost split by category"
      });

      var bd = document.getElementById("breakdown");
      if (bd) {
        bd.innerHTML = CATS.slice().sort(function (a, b) { return b.value - a.value; })
          .map(function (c) {
            var pct = res.driveTotal > 0 ? c.value / res.driveTotal * 100 : 0;
            return '<div class="bd-row">' +
              '<span class="bd-swatch" style="background:var(' + c.css + ')"></span>' +
              '<span class="bd-name">' + c.label + '<small>' +
                "$" + (c.value / Math.max(1, miles)).toFixed(2) + ' per mile</small></span>' +
              '<span class="bd-pct num">' + Math.round(pct) + '%</span>' +
              '<span class="bd-val num">' + F.money(c.value) + '</span>' +
              '</div>';
          }).join("") +
          '<p class="text-muted" style="font-size:.84rem;margin-top:14px">Wear is ' +
          (res.wearCost > res.fuel ? 'larger than the fuel bill' : 'smaller than the fuel bill on these figures') +
          ' and it is the only line here that never sends you an invoice.</p>';
      }

      /* ---- cost at several trip lengths ------------------------------- */
      var t = document.getElementById("dist-table");
      if (t) {
        var DIST = [300, 600, 1200, 2000, 3000];
        var rows = "";
        for (var k = 0; k < DIST.length; k++) {
          var m = DIST[k];
          var o = options(m, i, miles);
          var cheapest = Math.min(o.own, o.rent, o.fly);
          var winner = cheapest === o.own ? "Drive your own"
                     : (cheapest === o.rent ? "Rent a car" : "Fly");
          var mark = function (v) {
            return v === cheapest
              ? '<td class="num"><strong>' + F.money(v) + '</strong></td>'
              : '<td class="num">' + F.money(v) + '</td>';
          };
          rows += '<tr><td>' + F.num(m) + ' mi</td>' +
            mark(o.own) + mark(o.rent) + mark(o.fly) +
            '<td>' + winner + '</td></tr>';
        }
        t.innerHTML = '<div class="table-wrap"><table class="tbl">' +
          '<thead><tr><th>Total miles</th><th class="num">Drive your own</th>' +
          '<th class="num">Rent a car</th><th class="num">Fly + rent</th><th>Cheapest</th></tr></thead>' +
          '<tbody>' + rows + '</tbody></table></div>' +
          '<p class="text-muted" style="font-size:.85rem;margin-top:14px">Transport only — hotels, food and attractions are identical whichever way you go, so they are left out to make the crossover visible. ' +
          'Airfare is scaled from the ' + F.money(i.flightPrice) + ' you entered on the assumption that about half a ticket price is fixed and half varies with distance. ' +
          'Flying is priced for ' + res.travLabel + ' traveling; driving costs the same however many of you there are, which is the whole reason the crossover moves.</p>';
      }
    }
  });
})();
