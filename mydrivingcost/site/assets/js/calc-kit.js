/* ==========================================================================
   MyDrivingCost.com — calc-kit
   A tiny declarative harness shared by every calculator after the flagship.
   Handles: input binding, live recompute, number formatting, count-up,
   shareable query-string URLs (never a #fragment), print and reset.
   Depends on: main.js (window.MDC)
   ========================================================================== */
(function () {
  "use strict";
  var MDC = (window.MDC = window.MDC || {});
  var fmt = MDC.fmt;

  var FORMATTERS = {
    money: fmt.money,
    money2: fmt.money2,
    num: fmt.num,
    pct: fmt.pct,
    perMile: function (v) { return "$" + (v || 0).toFixed(2); },
    cents: function (v) { return ((v || 0) * 100).toFixed(1) + "¢"; },
    x1: function (v) { return (v || 0).toFixed(1); },
    x2: function (v) { return (v || 0).toFixed(2); },
    raw: function (v) { return String(v == null ? "" : v); }
  };

  function fmtFor(name) { return FORMATTERS[name] || FORMATTERS.raw; }

  /**
   * cfg = {
   *   form:      id of the <form> holding inputs
   *   defaults:  { fieldId: value }  (also defines the share-URL key set)
   *   compute:   function(inputs) -> result object
   *   render:    optional function(result, inputs) for anything bespoke
   *   onInput:   optional function(inputs) called before compute (e.g. presets)
   *   count:     array of [elementId, resultKey, formatName] to animate
   * }
   */
  MDC.calc = function (cfg) {
    var form = document.getElementById(cfg.form);
    if (!form) return null;

    var keys = Object.keys(cfg.defaults);
    var segs = {};      // groupName -> current value
    var api = {};

    /* ---- segmented button groups ------------------------------------ */
    /* Behavior (roles, arrow keys, roving tabindex) lives in MDC.segment so
       that these thirteen calculators and the two hand-written ones cannot
       drift apart. This layer only owns the value bookkeeping. */
    var segCtl = {};
    form.querySelectorAll("[data-seg]").forEach(function (group) {
      var name = group.getAttribute("data-seg");
      segs[name] = cfg.defaults[name];
      segCtl[name] = MDC.segment(group, function (val) {
        segs[name] = val;
        if (cfg.onSeg) cfg.onSeg(name, val, api);
        run(true);
      });
    });

    function setSeg(name, val) {
      segs[name] = val;
      if (segCtl[name]) segCtl[name].set(val);
    }
    api.setSeg = setSeg;
    api.setField = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };

    /* ---- read / write inputs ---------------------------------------- */
    /* An <input type="number"> enforces min/max only on stepper clicks and on
       native form validation. Typing, pasting and query-string values all sail
       straight through, which is how "-$14,933,333,311,834" reaches the page.
       Clamping here fixes every calculator at once, using each field's own
       declared bounds so no per-page constants are duplicated. */
    function clamp(el, v, fallback) {
      if (!isFinite(v)) return fallback;
      var lo = parseFloat(el.getAttribute("min"));
      var hi = parseFloat(el.getAttribute("max"));
      if (isFinite(lo) && v < lo) v = lo;
      if (isFinite(hi) && v > hi) v = hi;
      return v;
    }
    function read() {
      var out = {};
      keys.forEach(function (k) {
        if (k in segs) { out[k] = segs[k]; return; }
        var el = document.getElementById(k);
        if (!el) { out[k] = cfg.defaults[k]; return; }
        var v = parseFloat(el.value);
        out[k] = clamp(el, v, cfg.defaults[k]);
      });
      return out;
    }
    api.read = read;
    api.clampField = function (k, v) {
      var el = document.getElementById(k);
      return el ? clamp(el, parseFloat(v), cfg.defaults[k]) : v;
    };

    /* Reflect the clamp back into the field on blur, so what the visitor sees
       matches what was computed. Doing it on blur rather than on input means
       an in-progress "1" on the way to "12" is never rewritten under them. */
    form.addEventListener("blur", function (e) {
      var el = e.target;
      if (!el || el.tagName !== "INPUT" || el.type !== "number" || !el.id) return;
      if (keys.indexOf(el.id) === -1 || el.value === "") return;
      var v = parseFloat(el.value);
      var c = clamp(el, v, cfg.defaults[el.id]);
      if (isFinite(c) && c !== v) { el.value = c; run(true); }
    }, true);

    function write(vals) {
      keys.forEach(function (k) {
        if (!(k in vals)) return;
        if (k in segs) { setSeg(k, vals[k]); return; }
        var el = document.getElementById(k);
        if (el) el.value = vals[k];
      });
    }
    api.write = write;

    /* ---- output rendering -------------------------------------------- */
    var counted = {};
    (cfg.count || []).forEach(function (c) { counted[c[0]] = c; });

    function paint(res, inputs, animate) {
      document.querySelectorAll("[data-out]").forEach(function (el) {
        var key = el.getAttribute("data-out");
        if (!(key in res)) return;
        var f = fmtFor(el.getAttribute("data-fmt") || "raw");
        var val = res[key];
        if (animate && el.hasAttribute("data-count") && typeof val === "number") {
          MDC.countUp(el, val, f, 620);
        } else {
          el.textContent = typeof val === "number" ? f(val) : String(val);
        }
      });
      if (cfg.render) cfg.render(res, inputs, api);
      syncSliders();
    }

    /* ---- screen-reader announcement ---------------------------------- */
    /* Results change silently otherwise: a sighted user watches the headline
       animate, a screen-reader user gets nothing at all. The region is kept
       out of the count-up path deliberately — announcing every animation
       frame would flood the buffer — and debounced so dragging a slider
       produces one summary at the end rather than sixty. */
    var liveEl = null, liveTimer = null;
    function liveHost() {
      if (liveEl) return liveEl;
      liveEl = document.getElementById("calcSummary");
      if (!liveEl) {
        liveEl = document.createElement("p");
        liveEl.id = "calcSummary";
        liveEl.className = "sr-only";
        liveEl.setAttribute("role", "status");
        liveEl.setAttribute("aria-live", "polite");
        liveEl.setAttribute("aria-atomic", "true");
        form.parentNode.insertBefore(liveEl, form.nextSibling);
      }
      return liveEl;
    }
    /* Default summary: the headline figure plus each stat tile, read straight
       off the rendered DOM. Generic on purpose — every calculator gets an
       announcement without needing its own copy of this string. */
    function defaultSummary() {
      var parts = [];
      var hero = document.querySelector(".result-hero");
      if (hero) {
        var lab = hero.querySelector(".label"), tot = hero.querySelector(".result-total");
        if (tot) parts.push(((lab && lab.textContent.trim()) || "Result") + ": " + tot.textContent.trim());
        var sub = hero.querySelector(".result-sub");
        if (sub) parts.push(sub.textContent.replace(/\s+/g, " ").trim());
      }
      document.querySelectorAll(".stat-row .stat-tile").forEach(function (t) {
        var k = t.querySelector(".k"), v = t.querySelector(".v");
        if (k && v) parts.push(k.textContent.trim() + ": " + v.textContent.trim());
      });
      return parts.join(". ");
    }
    function live() {
      clearTimeout(liveTimer);
      liveTimer = setTimeout(function () {
        var txt = "";
        try { txt = (cfg.summary ? cfg.summary(api.last, api.lastInputs) : defaultSummary()) || ""; }
        catch (e) { return; }
        if (!txt) return;
        var host = liveHost();
        if (txt !== host.textContent) host.textContent = txt;
      }, 650);
    }

    /* ---- the loop ---------------------------------------------------- */
    var first = true;
    function run(animate) {
      var i = read();
      if (cfg.onInput) cfg.onInput(i, api);
      var res = cfg.compute(i);
      paint(res, i, animate !== false && !first);
      first = false;
      api.last = res;
      api.lastInputs = i;
      live();
      /* Showing or hiding a conditional field changes the input card's height,
         which changes whether the float bar should be up. Re-check after every
         recompute, not only on scroll. */
      if (api._fs) api._fs();
      return res;
    }
    api.run = run;

    /* ---- slider announcements ----------------------------------------- */
    /* Without aria-valuetext a screen reader reads the raw number: "8".
       With it, "8 years". The unit comes from the visible companion output
       the page already renders next to each slider. */
    /* Discovered from the markup rather than declared on the input: every
       slider on the site already ships a visible companion
       <span class="hint num" data-out="<slider id>"> that renders the value
       with its unit ("5 years", "7.2%", "12,000 mi/yr"). Reading that span is
       one source of truth; a parallel set of data-unit attributes would be a
       second one, free to drift. Prefer the span inside the slider's own
       <label for>, then any element bound to the same key. */
    var sliders = [];
    form.querySelectorAll('input[type="range"]').forEach(function (r) {
      if (!r.id) return;
      var lab = document.querySelector('label[for="' + r.id + '"]');
      var out = (lab && (lab.querySelector('[data-out="' + r.id + '"]') || lab.querySelector(".hint.num")))
        || document.querySelector('[data-out="' + r.id + '"]');
      sliders.push({ el: r, out: out });
    });
    function syncSliders() {
      if (!sliders) return;                 // paint() can fire before init finishes
      sliders.forEach(function (s) {
        var t = s.out && s.out.textContent ? s.out.textContent.replace(/\s+/g, " ").trim() : "";
        if (!t) t = String(s.el.value);
        if (s.el.getAttribute("aria-valuetext") !== t) s.el.setAttribute("aria-valuetext", t);
      });
    }

    form.addEventListener("input", function () { run(true); });
    form.addEventListener("change", function () { run(true); });

    /* ---- share / print / reset (query string, never a #fragment) ------ */
    function serialize() {
      var i = read(), p = new URLSearchParams();
      keys.forEach(function (k) { p.set(k, i[k]); });
      return p.toString();
    }
    function deserialize() {
      var q = location.search.slice(1);
      if (!q) return false;
      var p = new URLSearchParams(q), vals = {}, any = false;
      keys.forEach(function (k) {
        if (!p.has(k)) return;
        var raw = p.get(k);
        if (k in segs) {
          /* Only accept a value the group actually offers — a hand-edited URL
             must not be able to put the control into a state with no button. */
          var g = form.querySelector('[data-seg="' + k + '"]');
          var ok = g && g.querySelector('button[data-val="' + String(raw).replace(/"/g, "") + '"]');
          if (!ok) return;
          vals[k] = raw;
        } else {
          var el = document.getElementById(k);
          var v = parseFloat(raw);
          if (!isFinite(v)) return;
          vals[k] = el ? clamp(el, v, cfg.defaults[k]) : v;
        }
        any = true;
      });
      if (any) write(vals);
      return any;
    }

    var shareBtn = document.getElementById("btn-share");
    if (shareBtn) {
      shareBtn.addEventListener("click", function () {
        var url = location.origin + location.pathname + "?" + serialize();
        try { history.replaceState(null, "", location.pathname + "?" + serialize()); } catch (e) {}
        var label = document.getElementById("share-text");
        var done = function () {
          if (!label) return;
          label.textContent = "Link copied!";
          setTimeout(function () { label.textContent = "Share"; }, 1800);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(done, done);
        } else {
          var t = document.createElement("textarea");
          t.value = url; document.body.appendChild(t); t.select();
          try { document.execCommand("copy"); } catch (e) {}
          document.body.removeChild(t); done();
        }
      });
    }
    var printBtn = document.getElementById("btn-print");
    if (printBtn) printBtn.addEventListener("click", function () { window.print(); });
    var resetBtn = document.getElementById("btn-reset");
    if (resetBtn) resetBtn.addEventListener("click", function () {
      write(cfg.defaults);
      if (cfg.onReset) cfg.onReset(api);
      try { history.replaceState(null, "", location.pathname); } catch (e) {}
      run(true);
    });

    deserialize();
    api._fs = MDC.floatSummary();
    run(false);
    return api;
  };

  /* ---- shared helpers used by several models ------------------------- */
  MDC.model = {
    /* Standard amortized loan monthly payment. */
    payment: function (principal, aprPct, months) {
      if (months <= 0) return 0;
      var r = aprPct / 100 / 12;
      if (r <= 0) return principal / months;
      return (principal * r) / (1 - Math.pow(1 + r, -months));
    },
    /* Interest actually paid over `elapsed` months of an amortized loan. */
    interestPaid: function (principal, aprPct, months, elapsed) {
      var pay = MDC.model.payment(principal, aprPct, months);
      var r = aprPct / 100 / 12, bal = principal, interest = 0;
      var n = Math.min(elapsed, months);
      for (var m = 0; m < n; m++) {
        var i = bal * r;
        interest += i;
        bal = Math.max(0, bal + i - pay);
      }
      return { interest: interest, balance: bal, payment: pay };
    },
    /* Year-by-year retained value. First year drops faster than later years. */
    residualCurve: function (price, dep1Pct, depNPct, years) {
      var out = [{ year: 0, value: price }], ret = 1;
      for (var y = 1; y <= years; y++) {
        ret *= (y === 1 ? 1 - dep1Pct / 100 : 1 - depNPct / 100);
        out.push({ year: y, value: price * ret });
      }
      return out;
    }
  };
})();
