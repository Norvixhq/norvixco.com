/* ==========================================================================
   True Cost to Own — model + interactivity
   Depends on window.MDC (main.js)
   ========================================================================== */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var form = $("tco-form");
  if (!form || !window.MDC) return;
  var F = MDC.fmt;
  var firstRender = true;

  /* ---- Powertrain profiles --------------------------------------------- */
  var POWER = {
    gas:    { fe: 30,  fp: 4.00, ins: 2496, maint: 1250, dep1: 20, depN: 15, feLabel: "Fuel economy", feHint: "combined MPG", feUnit: "MPG", fpLabel: "Fuel price", fpUnit: "/gal", feStep: 1, fpStep: 0.05 },
    hybrid: { fe: 48,  fp: 4.00, ins: 2530, maint: 1100, dep1: 18, depN: 14, feLabel: "Fuel economy", feHint: "combined MPG", feUnit: "MPG", fpLabel: "Fuel price", fpUnit: "/gal", feStep: 1, fpStep: 0.05 },
    /* Electricity is priced per kWh, where a 5-cent step is enormous — a
       nickel is a third of the national average rate. Half a cent is the unit
       utilities actually publish, and it also keeps 17.5¢ a valid step value
       rather than a stepMismatch the browser flags. */
    ev:     { fe: 3.5, fp: 0.175, ins: 2820, maint: 800, dep1: 22, depN: 15, feLabel: "Efficiency", feHint: "real-world", feUnit: "mi/kWh", fpLabel: "Electricity price", fpUnit: "/kWh", feStep: 0.1, fpStep: 0.005 }
  };
  var DEFAULTS = { price: 34000, years: 5, down: 3400, apr: 7.2, term: 60, miles: 12000, ins: 2496, tax: 7, reg: 220, fees: 700, dep1: 20, depN: 15, maint: 1250, fe: 30, fp: 4.00 };

  /* Category display order = validated palette slot order (adjacency-safe) */
  var CATS = [
    { key: "deprec",    label: "Depreciation",          css: "--c-deprec" },
    { key: "energy",    label: "Fuel / energy",         css: "--c-fuel" },
    { key: "insurance", label: "Insurance",             css: "--c-insure" },
    { key: "maint",     label: "Maintenance & repairs", css: "--c-maint" },
    { key: "finance",   label: "Financing interest",    css: "--c-finance" },
    { key: "taxes",     label: "Taxes & fees",          css: "--c-tax" },
    { key: "opp",       label: "Opportunity cost",      css: "--c-opp" }
  ];

  var state = { power: "gas", method: "finance" };

  /* ---- Read inputs ------------------------------------------------------ */
  function num(id, d) { var v = parseFloat($(id).value); return isFinite(v) ? v : d; }
  function readInputs() {
    return {
      power: state.power, method: state.method,
      price: Math.max(num("price", 0), 0),
      years: Math.round(num("years", 5)),
      down: Math.max(num("down", 0), 0),
      apr: num("apr", 7),
      term: num("term", 60),
      miles: Math.max(num("miles", 12000), 1),
      fe: Math.max(num("fe", 1), 0.1),
      fp: Math.max(num("fp", 0), 0),
      ins: Math.max(num("ins", 0), 0),
      tax: Math.max(num("tax", 0), 0),
      reg: Math.max(num("reg", 0), 0),
      fees: Math.max(num("fees", 0), 0),
      dep1: num("dep1", 20),
      depN: num("depN", 15),
      maint: Math.max(num("maint", 0), 0),
      oppOn: $("oppOn").checked,
      oppRate: num("oppRate", 5)
    };
  }

  /* ---- The model -------------------------------------------------------- */
  function compute(i) {
    var yrs = i.years;
    var cash = i.method === "cash";
    var salesTax = i.price * (i.tax / 100);
    /* Finance the OUT-THE-DOOR price, not the sticker. Sales tax and dealer
       fees are rolled into the loan in almost every real transaction, which
       means you pay interest on them — and it means this calculator agrees
       with /calculators/auto-loan/ on the monthly payment for identical
       inputs. Financing the sticker understated the payment by $61 a month
       on the default deal and inflated the "hidden cost" gap by the same. */
    var outTheDoor = i.price + salesTax + i.fees;
    var down = cash ? outTheDoor : Math.min(i.down, outTheDoor);
    var financed = Math.max(outTheDoor - down, 0);
    var r = cash ? 0 : (i.apr / 100) / 12;
    var term = cash ? 0 : i.term;

    // Amortization → interest paid during ownership
    var payment = 0, interest = 0;
    if (financed > 0 && term > 0) {
      payment = r > 0 ? financed * r / (1 - Math.pow(1 + r, -term)) : financed / term;
      var monthsOwned = Math.min(yrs * 12, term);
      var bal = financed;
      for (var m = 0; m < monthsOwned; m++) { var it = bal * r; interest += it; bal -= (payment - it); }
    }

    // Depreciation → resale + value curve
    var d1 = i.dep1 / 100, dn = i.depN / 100, ret = 1;
    var curve = [{ x: 0, y: i.price }];
    for (var y = 1; y <= yrs; y++) { ret *= (y === 1 ? (1 - d1) : (1 - dn)); curve.push({ x: y, y: i.price * ret }); }
    var resale = i.price * ret;
    var deprec = i.price - resale;

    // Energy
    var energyPerYr = (i.miles / i.fe) * i.fp;
    var energy = energyPerYr * yrs;

    // Insurance
    var insurance = i.ins * yrs;

    // Maintenance (escalating ~12%/yr from first-year base)
    var maint = 0;
    for (var yy = 1; yy <= yrs; yy++) { maint += i.maint * Math.pow(1.12, yy - 1); }

    // Taxes & fees (salesTax computed above, where the loan needs it)
    var taxes = salesTax + i.reg * yrs + i.fees;

    // Opportunity cost (optional)
    var opp = i.oppOn ? down * (Math.pow(1 + i.oppRate / 100, yrs) - 1) : 0;

    var total = deprec + interest + insurance + energy + maint + taxes + opp;
    var miles = i.miles * yrs;

    return {
      total: total, perYear: total / yrs, perMile: total / miles, monthly: total / (yrs * 12),
      payment: payment, resale: resale, curve: curve,
      vals: { deprec: deprec, finance: interest, insurance: insurance, energy: energy, maint: maint, taxes: taxes, opp: opp }
    };
  }

  /* ---- Rendering -------------------------------------------------------- */
  function setNum(el, to, fmt, animate) {
    if (!el) return;
    if (animate) MDC.countUp(el, to, fmt);
    else { el.setAttribute("data-val", to); el.textContent = fmt(to); }
  }
  function moneyShort(v) { v = Math.round(v); return v >= 1000 ? "$" + (Math.round(v / 100) / 10) + "k" : "$" + v; }

  function render(animate) {
    var i = readInputs();
    var res = compute(i);
    var cash = i.method === "cash";

    setNum($("r-total"), res.total, F.money, animate);
    setNum($("r-permile"), res.perMile, F.perMile, animate);
    setNum($("r-peryear"), res.perYear, F.money, animate);
    setNum($("r-resale"), res.resale, F.money, animate);

    var yl = i.years + (i.years === 1 ? " year" : " years");
    if ($("r-years-label")) $("r-years-label").textContent = yl;

    // Result subtitle
    var sub = document.querySelector(".result-sub");
    if (sub) {
      if (cash) {
        sub.innerHTML = 'That’s <strong class="num">' + F.money(res.monthly) + '</strong> per month all-in — a true <strong class="num">' + F.perMile(res.perMile) + '</strong> for every mile you drive.';
      } else {
        var hidden = Math.max(res.monthly - res.payment, 0);
        sub.innerHTML = 'That’s <strong class="num">' + F.money(res.monthly) + '</strong> per month all-in — versus a <strong class="num">' + F.money(res.payment) + '</strong> loan payment. The extra <strong class="num">' + F.money(hidden) + '/mo</strong> is cost the payment never shows.';
      }
    }

    // Breakdown list (sorted desc; color pinned per category)
    var rows = CATS.map(function (c) { return { c: c, v: res.vals[c.key] || 0 }; }).filter(function (r) { return r.v > 0.5; });
    var maxV = rows.reduce(function (a, b) { return Math.max(a, b.v); }, 1);
    var listRows = rows.slice().sort(function (a, b) { return b.v - a.v; });
    var bd = $("breakdown");
    if (bd) {
      bd.innerHTML = listRows.map(function (r) {
        var pct = res.total > 0 ? (r.v / res.total * 100) : 0;
        var w = (r.v / maxV * 100);
        return '<div class="bd-row">' +
          '<span class="bd-swatch" style="background:var(' + r.c.css + ')"></span>' +
          '<span class="bd-name">' + r.c.label + '</span>' +
          '<span class="bd-pct num">' + Math.round(pct) + '%</span>' +
          '<span class="bd-val num">' + F.money(r.v) + '</span>' +
          '</div>';
      }).join("");
    }

    // Donut (validated slot order)
    MDC.charts.donut($("donut"), rows.map(function (r) { return { label: r.c.label, value: r.v, cssVar: r.c.css }; }), {
      centerLabel: "Total", centerValue: F.money(res.total), centerSub: F.perMile(res.perMile) + "/mi",
      aria: "Cost of ownership breakdown by category"
    });

    // Depreciation curve
    MDC.charts.area($("dep-chart"), res.curve, {
      cssVar: "--c-deprec", yMax: i.price * 1.06, animate: animate,
      yFmt: moneyShort,
      xFmt: function (x) { return x === 0 ? "Now" : "Yr " + x; },
      xLabelFmt: function (x) { return x === 0 ? "Today" : "Year " + x; },
      aria: "Vehicle resale value declining over " + i.years + " years"
    });

    // Floating summary
    setText("fs-total", F.money(res.total));
    setText("fs-year", F.money(res.perYear));
    setText("fs-mile", F.perMile(res.perMile));
    /* Switching to cash swaps the result subtitle for a shorter one, which
       changes the hero's height and therefore whether the bar should be up. */
    fsUpdate();
  }
  function setText(id, t) { var e = $(id); if (e) e.textContent = t; }

  /* ---- Slider read-outs -------------------------------------------------- */
  function syncOutputs() {
    var i = readInputs();
    out("years", i.years + (i.years === 1 ? " year" : " years"));
    out("apr", i.apr.toFixed(1) + "%");
    out("term", i.term + " months");
    out("miles", F.num(i.miles) + " mi");
    out("dep1", Math.round(i.dep1) + "%");
    out("depN", Math.round(i.depN) + "%");
    var pct = i.price > 0 ? Math.round(i.down / i.price * 100) : 0;
    out("downpct", pct + "% of price");
    out("oppRate", i.oppOn ? i.oppRate.toFixed(1) + "%/yr" : "off");
  }
  function out(key, txt) { var e = document.querySelector('[data-out="' + key + '"]'); if (e) e.textContent = txt; }

  /* ---- Powertrain / method switching ------------------------------------ */
  /* Both controls are radio groups driven by MDC.segment (main.js), which owns
     the roles, the roving tabindex and the arrow-key behavior so that this
     page and the other fourteen calculators cannot drift apart. The real
     controllers are assigned during wire-up below; these no-op stand-ins keep
     setPower/setMethod safe to call before that point. */
  var powerCtl = { set: function () {} };
  var methodCtl = { set: function () {} };

  function setPower(p, applyDefaults) {
    if (!POWER[p]) p = "gas";
    state.power = p;
    var cfg = POWER[p];
    powerCtl.set(p);
    $("feLabel").textContent = cfg.feLabel;
    $("feHint").textContent = cfg.feHint;
    $("feUnit").textContent = cfg.feUnit;
    $("fpLabel").textContent = cfg.fpLabel;
    $("fpUnit").textContent = cfg.fpUnit;
    $("fe").step = cfg.feStep;
    $("fp").step = cfg.fpStep;
    if (applyDefaults) {
      setNum("fe", cfg.fe); setNum("fp", cfg.fp); setNum("ins", cfg.ins);
      setNum("maint", cfg.maint); setNum("dep1", cfg.dep1); setNum("depN", cfg.depN);
    }
  }
  /* Writing a raw number into a field quietly reformats it: 4.00 becomes "4",
     0.175 becomes "0.175" in a field stepping by nickels. Rendering to the
     field's own step precision keeps a Reset — or a powertrain switch and back
     — looking identical to the page a visitor first landed on. */
  function setNum(id, v) {
    var el = $(id);
    if (!el) return;
    if (typeof v !== "number" || !isFinite(v)) { el.value = v; return; }
    var step = String(el.getAttribute("step") || "");
    var dp = step.indexOf(".") > -1 ? step.length - step.indexOf(".") - 1 : 0;
    el.value = v.toFixed(dp);
  }
  function setMethod(m) {
    state.method = (m === "cash") ? "cash" : "finance";
    methodCtl.set(state.method);
    $("finance-fields").style.display = state.method === "cash" ? "none" : "";
  }

  /* ---- Share / print / reset -------------------------------------------- */
  function serialize() {
    var i = readInputs(), p = new URLSearchParams();
    p.set("pw", i.power); p.set("me", i.method);
    p.set("price", i.price); p.set("yr", i.years); p.set("dn", i.down);
    p.set("apr", i.apr); p.set("tm", i.term); p.set("mi", i.miles);
    p.set("fe", i.fe); p.set("fp", i.fp); p.set("ins", i.ins);
    p.set("tax", i.tax); p.set("reg", i.reg);
    p.set("d1", i.dep1); p.set("d2", i.depN); p.set("mt", i.maint);
    if (i.oppOn) { p.set("op", "1"); p.set("or", i.oppRate); }
    return p.toString();
  }
  function applyFromParams() {
    var q = location.search.slice(1) || location.hash.slice(1);
    if (!q) return false;
    var p = new URLSearchParams(q);
    if (!p.has("price") && !p.has("pw")) return false;
    setPower(p.get("pw") || "gas", false);
    setMethod(p.get("me") || "finance");
    var map = { price: "price", years: "yr", down: "dn", apr: "apr", term: "tm", miles: "mi", fe: "fe", fp: "fp", ins: "ins", tax: "tax", reg: "reg", dep1: "d1", depN: "d2", maint: "mt" };
    for (var id in map) if (p.has(map[id])) $(id).value = p.get(map[id]);
    if (p.get("op") === "1") { $("oppOn").checked = true; $("oppRate").disabled = false; if (p.has("or")) $("oppRate").value = p.get("or"); }
    return true;
  }
  function share() {
    var url = location.origin + location.pathname + "?" + serialize();
    try { history.replaceState(null, "", location.pathname + "?" + serialize()); } catch (e) {}
    var done = function () { var t = $("share-text"); if (t) { t.textContent = "Link copied!"; setTimeout(function () { t.textContent = "Share"; }, 1800); } };
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(url).then(done, done); }
    else { done(); }
  }
  function resetAll() {
    try { history.replaceState(null, "", location.pathname); } catch (e) {}
    setPower("gas", false); setMethod("finance");
    for (var k in DEFAULTS) setNum(k, DEFAULTS[k]);
    $("oppOn").checked = false; $("oppRate").disabled = true; setNum("oppRate", 5);
    syncOutputs(); render(true);
  }

  /* ---- Floating summary on scroll --------------------------------------- */
  /* Delegated to MDC.floatSummary (main.js) so this page shares one
     implementation with the other fourteen calculators. The local copy this
     replaces toggled only .show and aria-hidden, which left both bar controls
     reachable by Tab while the bar was off-screen; the shared helper also sets
     `inert`. Anchored on the result card rather than the input card because
     this page leads with the answer. */
  var fsUpdate = function () {};

  /* ---- Wire up ---------------------------------------------------------- */
  /* This page predates the data-val convention the generated calculators use,
     so the value attribute is passed explicitly rather than renaming markup
     that a shared URL might already be pointing at. */
  powerCtl = MDC.segment($("power"), function (val) {
    setPower(val, true); syncOutputs(); render(false);
  }, "data-power");
  methodCtl = MDC.segment($("method"), function (val) {
    setMethod(val); render(false);
  }, "data-method");
  $("oppOn").addEventListener("change", function () { $("oppRate").disabled = !this.checked; syncOutputs(); render(false); });
  form.addEventListener("input", function () { syncOutputs(); render(false); });
  $("btn-share").addEventListener("click", share);
  $("btn-print").addEventListener("click", function () { window.print(); });
  $("btn-reset").addEventListener("click", resetAll);

  /* ---- Boot ------------------------------------------------------------- */
  applyFromParams();
  setPower(state.power, false);
  setMethod(state.method);
  syncOutputs();
  render(true);
  firstRender = false;
  fsUpdate = MDC.floatSummary({ anchor: ".result-hero", edge: 40 });
  fsUpdate();
})();
