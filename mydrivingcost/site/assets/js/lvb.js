/* ==========================================================================
   Lease vs Buy — three-way comparison (Lease / Finance / Cash)
   Depends on window.MDC (main.js)
   ========================================================================== */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var form = $("lvb-form");
  if (!form || !window.MDC) return;
  var F = MDC.fmt;

  var OPTS = {
    lease:   { label: "Lease",   css: "--c-fuel",   end: "You return the car — own nothing." },
    finance: { label: "Finance", css: "--c-deprec", end: "You own the car, worth its resale value." },
    cash:    { label: "Cash",    css: "--c-insure", end: "You own the car, worth its resale value." }
  };
  var DEFAULTS = { price: 34000, term: 36, miles: 12000, tax: 7, fees: 700,
    lDown: 2000, lResidual: 57, lApr: 6, lAcq: 695, lDisp: 395, lAllow: 12000, lOver: 0.25,
    fDown: 3400, fApr: 7.2, dep1: 20, depN: 15, oppRate: 5 };

  function num(id, d) { var v = parseFloat($(id).value); return isFinite(v) ? v : d; }
  function readInputs() {
    return {
      price: Math.max(num("price", 0), 0), term: Math.round(num("term", 36)),
      miles: Math.max(num("miles", 12000), 0), tax: Math.max(num("tax", 0), 0),
      fees: Math.max(num("fees", 0), 0),
      lDown: Math.max(num("lDown", 0), 0), lResidual: num("lResidual", 57), lApr: Math.max(num("lApr", 0), 0),
      lAcq: Math.max(num("lAcq", 0), 0), lDisp: Math.max(num("lDisp", 0), 0),
      lAllow: Math.max(num("lAllow", 1), 1), lOver: Math.max(num("lOver", 0), 0),
      fDown: Math.max(num("fDown", 0), 0), fApr: Math.max(num("fApr", 7.2), 0),
      dep1: num("dep1", 20), depN: num("depN", 15),
      oppOn: $("oppOn").checked, oppRate: num("oppRate", 5)
    };
  }

  function compute(i) {
    var yrs = i.term / 12;
    var salesTax = i.price * i.tax / 100;
    var ret = 1;
    for (var y = 1; y <= yrs; y++) ret *= (y === 1 ? (1 - i.dep1 / 100) : (1 - i.depN / 100));
    var resale = i.price * ret, depBuy = i.price - resale;

    // Lease
    var adjCap = Math.max(i.price - i.lDown, 0);
    var residual = i.price * i.lResidual / 100;
    var MF = i.lApr / 2400;
    var mDep = (adjCap - residual) / i.term;
    var mRent = (adjCap + residual) * MF;
    var mBase = Math.max(mDep + mRent, 0);
    var leasePayment = mBase * (1 + i.tax / 100);
    var overage = Math.max(i.miles * yrs - i.lAllow * yrs, 0) * i.lOver;
    var leaseTotal = i.lDown + leasePayment * i.term + i.lAcq + i.fees + i.lDisp + overage;

    // Finance (loan term = comparison term). Out-the-door basis: sales tax and
    // dealer fees are financed alongside the car, exactly as they are in a real
    // transaction and exactly as every other loan model on this site treats them.
    var otd = i.price + salesTax + i.fees;
    var financed = Math.max(otd - i.fDown, 0);
    var r = i.fApr / 100 / 12, fPayment = 0, fInterest = 0;
    if (financed > 0) {
      fPayment = r > 0 ? financed * r / (1 - Math.pow(1 + r, -i.term)) : financed / i.term;
      var bal = financed;
      for (var k = 0; k < i.term; k++) { var it = bal * r; fInterest += it; bal -= (fPayment - it); }
    }
    var financeTotal = i.fDown + fPayment * i.term;

    // Cash
    var opp = i.oppOn ? otd * (Math.pow(1 + i.oppRate / 100, yrs) - 1) : 0;

    return {
      yrs: yrs, resale: resale, depBuy: depBuy, salesTax: salesTax, otd: otd,
      lease:   { net: leaseTotal, payment: leasePayment, asset: 0, upfront: i.lDown + i.lAcq + i.fees, residual: residual, overage: overage, rent: mRent * i.term },
      finance: { net: financeTotal - resale, payment: fPayment, asset: resale, upfront: i.fDown, interest: fInterest },
      cash:    { net: depBuy + salesTax + i.fees + opp, payment: 0, asset: resale, upfront: otd, opp: opp }
    };
  }

  function setNum(el, to, fmt, animate) { if (!el) return; if (animate) MDC.countUp(el, to, fmt); else { el.setAttribute("data-val", to); el.textContent = fmt(to); } }

  function render(animate) {
    var i = readInputs(), res = compute(i);
    var order = ["lease", "finance", "cash"];
    var nets = order.map(function (k) { return { k: k, net: res[k].net }; });
    var maxNet = Math.max.apply(null, nets.map(function (n) { return n.net; })) || 1;
    var sorted = nets.slice().sort(function (a, b) { return a.net - b.net; });
    var winner = sorted[0], second = sorted[1];
    var yrsTxt = (i.term / 12) + (i.term === 12 ? " year" : " years");

    // Winner hero
    var lowMonthly = order.map(function (k) { return { k: k, p: res[k].payment }; }).sort(function (a, b) { return a.p - b.p; })[0];
    var hero = $("winner-copy");
    if (hero) {
      hero.innerHTML = 'Over ' + yrsTxt + ', <strong style="color:var(' + OPTS[winner.k].css + ')">' +
        OPTS[winner.k].label + '</strong> costs the least — about <strong class="num">' + F.money(second.net - winner.net) +
        '</strong> less than ' + OPTS[second.k].label.toLowerCase() + '. ' +
        (lowMonthly.k === "lease" ? 'Leasing has the lowest monthly payment (<strong class="num">' + F.money(res.lease.payment) + '/mo</strong>), but you keep nothing at the end.' :
          'Remember: the lowest monthly payment isn’t the lowest true cost.');
    }
    setText("winner-label", OPTS[winner.k].label + " wins");

    // Option cards
    order.forEach(function (k) {
      var o = res[k];
      setNum($(k + "-net"), o.net, F.money, animate);
      setText(k + "-monthly", k === "cash" ? "—" : F.money(o.payment) + "/mo");
      setText(k + "-truemo", F.money(o.net / i.term) + "/mo");
      setText(k + "-end", k === "lease" ? "Own nothing" : "Keep car · " + F.money(o.asset));
      var bar = $(k + "-bar"); if (bar) bar.style.width = (o.net / maxNet * 100) + "%";
      var card = $("card-" + k);
      if (card) card.classList.toggle("is-winner", k === winner.k);
      var badge = $(k + "-badge"); if (badge) badge.style.display = (k === winner.k) ? "inline-flex" : "none";
    });

    // Floating summary
    setText("fs-winner", OPTS[winner.k].label);
    setText("fs-save", F.money(second.net - winner.net));
    setText("fs-term", yrsTxt);
    fsUpdate();
  }
  function setText(id, t) { var e = $(id); if (e) e.textContent = t; }

  function syncOutputs() {
    var i = readInputs();
    out("term", (i.term / 12) + (i.term === 12 ? " yr" : " yrs") + " · " + i.term + " mo");
    out("miles", F.num(i.miles) + " mi/yr");
    out("lApr", i.lApr.toFixed(1) + "% (MF " + (i.lApr / 2400).toFixed(4) + ")");
    out("fApr", i.fApr.toFixed(1) + "%");
    out("lResidual", Math.round(i.lResidual) + "%");
    out("oppRate", i.oppOn ? i.oppRate.toFixed(1) + "%/yr" : "off");
  }
  function out(key, txt) { var e = document.querySelector('[data-out="' + key + '"]'); if (e) e.textContent = txt; }

  /* Share / print / reset */
  function serialize() {
    var i = readInputs(), p = new URLSearchParams();
    ["price", "term", "miles", "tax", "fees", "lDown", "lResidual", "lApr", "lAcq", "lDisp", "lAllow", "lOver", "fDown", "fApr", "dep1", "depN"].forEach(function (k) { p.set(k, i[k]); });
    if (i.oppOn) { p.set("op", "1"); p.set("or", i.oppRate); }
    return p.toString();
  }
  function applyFromParams() {
    var q = location.search.slice(1) || location.hash.slice(1); if (!q) return;
    var p = new URLSearchParams(q); if (!p.has("price")) return;
    ["price", "term", "miles", "tax", "fees", "lDown", "lResidual", "lApr", "lAcq", "lDisp", "lAllow", "lOver", "fDown", "fApr", "dep1", "depN"].forEach(function (k) { if (p.has(k) && $(k)) $(k).value = p.get(k); });
    if (p.get("op") === "1") { $("oppOn").checked = true; $("oppRate").disabled = false; if (p.has("or")) $("oppRate").value = p.get("or"); }
  }
  function share() {
    var url = location.origin + location.pathname + "?" + serialize();
    try { history.replaceState(null, "", location.pathname + "?" + serialize()); } catch (e) {}
    var done = function () { var t = $("share-text"); if (t) { t.textContent = "Link copied!"; setTimeout(function () { t.textContent = "Share"; }, 1800); } };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, done); else done();
  }
  function resetAll() {
    try { history.replaceState(null, "", location.pathname); } catch (e) {}
    for (var k in DEFAULTS) if ($(k)) $(k).value = DEFAULTS[k];
    $("oppOn").checked = false; $("oppRate").disabled = true;
    syncOutputs(); render(true);
  }

  /* Shared float-bar behavior — see MDC.floatSummary in main.js. The local
     copy this replaces never set `inert`, so the bar's two controls stayed in
     the tab order even while it was hidden off-screen. */
  var fsUpdate = function () {};

  $("oppOn").addEventListener("change", function () { $("oppRate").disabled = !this.checked; syncOutputs(); render(false); });
  form.addEventListener("input", function () { syncOutputs(); render(false); });
  $("btn-share").addEventListener("click", share);
  $("btn-print").addEventListener("click", function () { window.print(); });
  $("btn-reset").addEventListener("click", resetAll);

  applyFromParams();
  syncOutputs();
  render(true);
  fsUpdate = MDC.floatSummary({ anchor: "#winner-card", edge: 40 });
  fsUpdate();
})();
