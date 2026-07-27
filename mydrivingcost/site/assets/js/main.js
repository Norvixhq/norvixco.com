/* ==========================================================================
   MyDrivingCost.com — shared behavior + dependency-free SVG charts
   Namespace: window.MDC
   ========================================================================== */
(function () {
  "use strict";
  var MDC = (window.MDC = window.MDC || {});
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----- Formatting ------------------------------------------------------ */
  var _c0 = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  var _c2 = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  var _n0 = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
  /* Math.round(-0.4) is -0, and Intl renders that as "-$0". Normalize it. */
  function z(v) { v = (typeof v === "number" && isFinite(v)) ? v : 0; return v === 0 ? 0 : v; }
  MDC.fmt = {
    money: function (v) { var r = Math.round(z(v)); return _c0.format(r === 0 ? 0 : r); },
    money2: function (v) { var r = z(v); return _c2.format(Math.abs(r) < 0.005 ? 0 : r); },
    perMile: function (v) { // smart cents/dollars
      v = z(v);
      if (Math.abs(v) < 0.005) v = 0;
      if (Math.abs(v) < 10) return (v < 0 ? "-$" : "$") + Math.abs(v).toFixed(2);
      return _c0.format(Math.round(v));
    },
    num: function (v) { var r = Math.round(z(v)); return _n0.format(r === 0 ? 0 : r); },
    pct: function (v) { v = z(v); return (Math.abs(v) < 0.05 ? 0 : v).toFixed(Math.abs(v) < 10 ? 1 : 0) + "%"; }
  };

  /* ----- Theme ----------------------------------------------------------- */
  var STORE = "mdc-theme";
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "dark" ? "#07142b" : "#ffffff");
    document.dispatchEvent(new CustomEvent("mdc:themechange", { detail: { theme: t } }));
  }
  MDC.initTheme = function () {
    var saved = store(STORE);
    var t = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    applyTheme(t);
  };
  MDC.toggleTheme = function () {
    var t = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    store(STORE, t); applyTheme(t);
  };

  /* ----- Nav ------------------------------------------------------------- */
  function initNav() {
    var nav = document.querySelector(".nav");
    if (nav) {
      var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 8); };
      onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    }
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (toggle && links) {
      var setDrawer = function (open, restoreFocus) {
        links.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        /* Lock the page behind the drawer — otherwise a touch drag scrolls the
           document underneath a fixed overlay, which reads as a broken menu. */
        document.body.classList.toggle("nav-open", open);
        if (open) {
          var first = links.querySelector("a, button");
          if (first) { try { first.focus({ preventScroll: true }); } catch (e) { first.focus(); } }
        } else if (restoreFocus) {
          try { toggle.focus({ preventScroll: true }); } catch (e) { toggle.focus(); }
        }
      };
      toggle.addEventListener("click", function () {
        setDrawer(!links.classList.contains("open"), true);
      });
      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { setDrawer(false, false); });
      });
      /* Escape closes and returns focus to the control that opened it. */
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && links.classList.contains("open")) setDrawer(false, true);
      });
      /* If the viewport grows past the drawer breakpoint while it is open the
         panel un-fixes itself; clear the lock so the page is not frozen. */
      window.addEventListener("resize", function () {
        if (window.innerWidth > 860 && links.classList.contains("open")) setDrawer(false, false);
      });
    }
    document.querySelectorAll("[data-theme-toggle]").forEach(function (b) {
      b.addEventListener("click", MDC.toggleTheme);
    });
    var y = document.querySelector("[data-year]"); if (y) y.textContent = new Date().getFullYear();

    /* Topics dropdown — click/keyboard on all sizes, hover on desktop (CSS) */
    var drop = document.querySelector(".nav-drop");
    if (drop) {
      var btn = drop.querySelector(".nav-drop-btn");
      /* Visible state is gated on .open, never on :focus-within — otherwise
         Escape sets aria-expanded="false" while the panel stays on screen. */
      var close = function (restoreFocus) {
        var was = drop.classList.contains("open");
        drop.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        /* blur() would drop focus onto <body>; put it back on the trigger. */
        if (was && restoreFocus) { try { btn.focus({ preventScroll: true }); } catch (e) { btn.focus(); } }
      };
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = drop.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
      document.addEventListener("click", function (e) { if (!drop.contains(e.target)) close(false); });
      document.addEventListener("keydown", function (e) {
        if (e.key !== "Escape") return;
        if (drop.classList.contains("open")) close(drop.contains(document.activeElement));
      });
      drop.addEventListener("focusout", function () {
        /* Tabbing out of the panel closes it, matching the mouse behavior. */
        setTimeout(function () { if (!drop.contains(document.activeElement)) close(false); }, 0);
      });
      drop.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { close(false); }); });
    }
  }

  /* ----- Hash-free in-page movement -------------------------------------- */
  /* Skip links and "jump to" controls scroll + move focus without ever
     writing a #fragment into the address bar. */
  function goTo(id, smooth) {
    var t = document.getElementById(id);
    if (!t) return false;
    if (!t.hasAttribute("tabindex")) t.setAttribute("tabindex", "-1");
    try { t.scrollIntoView({ behavior: smooth && !reduceMotion ? "smooth" : "auto", block: "start" }); }
    catch (e) { t.scrollIntoView(); }
    t.focus({ preventScroll: true });
    return true;
  }
  MDC.goTo = goTo;
  function initAnchors() {
    document.querySelectorAll("a[data-skip]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = (a.getAttribute("href") || "").replace(/^#/, "");
        if (goTo(id, false)) e.preventDefault();
      });
    });
    document.querySelectorAll("[data-scroll]").forEach(function (b) {
      b.addEventListener("click", function (e) {
        if (goTo(b.getAttribute("data-scroll"), true)) e.preventDefault();
      });
    });
    /* If a stray #fragment ever arrives (old bookmark, external link), honor
       it once and then scrub it out of the URL so the address bar stays clean. */
    if (location.hash && location.hash.length > 1) {
      var id = decodeURIComponent(location.hash.slice(1));
      requestAnimationFrame(function () {
        goTo(id, false);
        try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
      });
    }
  }

  /* ----- Scroll reveal --------------------------------------------------- */
  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ----- Count up -------------------------------------------------------- */
  MDC.countUp = function (el, to, fmt, dur) {
    fmt = fmt || MDC.fmt.money; dur = dur || 700;
    var from = parseFloat(el.getAttribute("data-val")) || 0;
    el.setAttribute("data-val", to);
    if (reduceMotion) { el.textContent = fmt(to); return; }
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = fmt(from + (to - from) * e);
      if (p < 1) requestAnimationFrame(step); else el.textContent = fmt(to);
    }
    requestAnimationFrame(step);
  };

  /* ----- Chart helpers --------------------------------------------------- */
  var SVGNS = "http://www.w3.org/2000/svg";
  function svg(tag, attrs) {
    var e = document.createElementNS(SVGNS, tag);
    for (var k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]);
    return e;
  }
  function tooltipEl() {
    var t = document.getElementById("mdc-tooltip");
    if (!t) { t = document.createElement("div"); t.id = "mdc-tooltip"; t.className = "chart-tooltip"; document.body.appendChild(t); }
    return t;
  }
  function showTip(html, x, y) { var t = tooltipEl(); t.innerHTML = html; t.style.left = x + "px"; t.style.top = y + "px"; t.style.opacity = "1"; }
  function hideTip() { var t = document.getElementById("mdc-tooltip"); if (t) t.style.opacity = "0"; }

  MDC.charts = {};

  /* Donut — categorical composition of a total.
     segments: [{label, value, cssVar}]  */
  MDC.charts.donut = function (host, segments, opts) {
    opts = opts || {};
    host.innerHTML = "";
    var size = 220, sw = 30, R = (size - sw) / 2, C = size / 2;
    var circ = 2 * Math.PI * R;
    var total = segments.reduce(function (s, d) { return s + Math.max(0, d.value); }, 0) || 1;
    var el = svg("svg", { viewBox: "0 0 " + size + " " + size, class: "chart-svg", role: "img", width: size, height: size });
    el.setAttribute("aria-label", opts.aria || "Cost breakdown donut chart");
    // track
    el.appendChild(svg("circle", { cx: C, cy: C, r: R, fill: "none", "stroke-width": sw, style: "stroke:var(--track-soft)" }));
    var gapDeg = 2.4, offset = 0;
    segments.forEach(function (d) {
      var frac = Math.max(0, d.value) / total;
      if (frac <= 0) { return; }
      var gapLen = (gapDeg / 360) * circ;
      var seg = Math.max(frac * circ - gapLen, 0.5);
      var c = svg("circle", {
        cx: C, cy: C, r: R, fill: "none", "stroke-width": sw, "stroke-linecap": "butt",
        "stroke-dasharray": seg + " " + (circ - seg),
        "stroke-dashoffset": -(offset * circ) + gapLen / 2,
        transform: "rotate(-90 " + C + " " + C + ")",
        style: "stroke:var(" + d.cssVar + ");cursor:pointer;transition:stroke-width .18s ease,opacity .18s ease"
      });
      c.style.strokeDashoffset = reduceMotion ? c.getAttribute("stroke-dashoffset") : c.getAttribute("stroke-dashoffset");
      var pct = (frac * 100);
      c.addEventListener("mousemove", function (ev) {
        showTip('<span class="tt-k">' + d.label + '</span> ' + MDC.fmt.money(d.value) + ' · ' + MDC.fmt.pct(pct), ev.clientX, ev.clientY - 4);
        el.querySelectorAll("circle").forEach(function (x) { if (x !== c && x.getAttribute("stroke-dasharray")) x.style.opacity = ".35"; });
        c.setAttribute("stroke-width", sw + 6);
      });
      c.addEventListener("mouseleave", function () {
        hideTip(); c.setAttribute("stroke-width", sw);
        el.querySelectorAll("circle").forEach(function (x) { x.style.opacity = "1"; });
      });
      el.appendChild(c);
      offset += frac;
    });
    // center label
    var wrap = document.createElement("div");
    wrap.style.position = "relative"; wrap.style.width = size + "px"; wrap.style.maxWidth = "100%";
    wrap.appendChild(el);
    var center = document.createElement("div");
    center.style.cssText = "position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;pointer-events:none";
    center.innerHTML = '<div style="font-size:.72rem;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--muted)">' + (opts.centerLabel || "Total") + '</div>' +
      '<div class="donut-center-total" style="font-size:1.5rem;color:var(--ink-strong)">' + (opts.centerValue || MDC.fmt.money(total)) + '</div>' +
      (opts.centerSub ? '<div style="font-size:.72rem;color:var(--muted-2);margin-top:2px">' + opts.centerSub + '</div>' : '');
    wrap.appendChild(center);
    host.appendChild(wrap);
  };

  /* Area/line — single series over time.
     points: [{x, y}]  (x numeric, y numeric)  */
  MDC.charts.area = function (host, points, opts) {
    opts = opts || {};
    host.innerHTML = "";
    var W = 640, H = 260, padL = 54, padR = 18, padT = 16, padB = 34;
    var iw = W - padL - padR, ih = H - padT - padB;
    /* Sanitise first. A user can type or paste 0 (or a negative) into any
       number field, which makes the caller hand us a flat or inverted series;
       an unguarded scale then divides by zero and writes NaN into every single
       SVG attribute, and the browser drops the whole chart. */
    var fin = function (v) { return isFinite(v) ? v : 0; };
    points = (points || []).map(function (p) { return { x: fin(p.x), y: fin(p.y), raw: p }; });
    if (!points.length) { return; }
    var xs = points.map(function (p) { return p.x; });
    var ys = points.map(function (p) { return p.y; });
    var xMin = Math.min.apply(null, xs), xMax = Math.max.apply(null, xs);
    var dataMax = Math.max.apply(null, ys), dataMin = Math.min.apply(null, ys);
    var yMin = Math.min(0, dataMin);                 // let negatives sit below the axis
    var yMax = isFinite(opts.yMax) && opts.yMax > yMin ? opts.yMax : dataMax * 1.08;
    if (!(yMax > yMin)) { yMax = yMin + 1; }         // fully degenerate series
    var yRange = yMax - yMin;
    var xRange = xMax - xMin;
    var sx = function (x) { return padL + (xRange ? (x - xMin) / xRange : 0) * iw; };
    var sy = function (y) { return padT + ih - (y - yMin) / yRange * ih; };
    var yBase = Math.max(yMin, Math.min(yMax, 0));   // baseline for the fill
    var el = svg("svg", { viewBox: "0 0 " + W + " " + H, class: "chart-svg", role: "img", preserveAspectRatio: "none" });
    el.setAttribute("aria-label", opts.aria || "Line chart over time");
    el.style.width = "100%"; el.style.height = "auto";

    // gridlines + y labels
    var ticks = opts.yTicks || 4;
    for (var i = 0; i <= ticks; i++) {
      var yv = yMin + (yMax - yMin) * i / ticks, yy = sy(yv);
      el.appendChild(svg("line", { x1: padL, y1: yy, x2: W - padR, y2: yy, style: "stroke:var(--c-grid)", "stroke-width": 1 }));
      var lab = svg("text", { x: padL - 10, y: yy + 4, "text-anchor": "end", style: "fill:var(--muted-2);font-size:11px;font-weight:600" });
      lab.textContent = opts.yFmt ? opts.yFmt(yv) : MDC.fmt.money(yv);
      el.appendChild(lab);
    }
    // x labels
    points.forEach(function (p) {
      var t = svg("text", { x: sx(p.x), y: H - 10, "text-anchor": "middle", style: "fill:var(--muted-2);font-size:11px;font-weight:600" });
      t.textContent = opts.xFmt ? opts.xFmt(p.x) : p.x;
      el.appendChild(t);
    });

    // area path + gradient
    var gid = "mdcGrad" + Math.floor(xMax * 97 + points.length);
    var defs = svg("defs", {});
    var grad = svg("linearGradient", { id: gid, x1: 0, y1: 0, x2: 0, y2: 1 });
    grad.appendChild(svg("stop", { offset: "0%", style: "stop-color:var(" + (opts.cssVar || "--brand") + ");stop-opacity:.28" }));
    grad.appendChild(svg("stop", { offset: "100%", style: "stop-color:var(" + (opts.cssVar || "--brand") + ");stop-opacity:0" }));
    defs.appendChild(grad); el.appendChild(defs);

    var dLine = points.map(function (p, i) { return (i ? "L" : "M") + sx(p.x).toFixed(1) + " " + sy(p.y).toFixed(1); }).join(" ");
    var dArea = dLine + " L" + sx(xMax).toFixed(1) + " " + sy(yBase).toFixed(1) + " L" + sx(xMin).toFixed(1) + " " + sy(yBase).toFixed(1) + " Z";
    el.appendChild(svg("path", { d: dArea, fill: "url(#" + gid + ")", stroke: "none" }));
    var line = svg("path", { d: dLine, fill: "none", "stroke-width": 2.4, "stroke-linjoin": "round", "stroke-linecap": "round", style: "stroke:var(" + (opts.cssVar || "--brand") + ")" });
    el.appendChild(line);
    if (!reduceMotion && line.getTotalLength) {
      var len = line.getTotalLength();
      line.style.strokeDasharray = len; line.style.strokeDashoffset = len;
      line.style.transition = "stroke-dashoffset 1s ease"; requestAnimationFrame(function () { line.style.strokeDashoffset = 0; });
    }

    // dots + hover
    var focus = svg("line", { x1: 0, y1: padT, x2: 0, y2: padT + ih, style: "stroke:var(--border-strong)", "stroke-width": 1, opacity: 0 });
    el.appendChild(focus);
    points.forEach(function (p) {
      var cx = sx(p.x), cy = sy(p.y);
      var dot = svg("circle", { cx: cx, cy: cy, r: 4.5, style: "stroke:var(" + (opts.cssVar || "--brand") + ");fill:var(--surface)", "stroke-width": 2.4 });
      var hit = svg("circle", { cx: cx, cy: cy, r: 16, fill: "transparent", style: "cursor:pointer" });
      hit.addEventListener("mousemove", function (ev) {
        focus.setAttribute("x1", cx); focus.setAttribute("x2", cx); focus.setAttribute("opacity", 1);
        dot.setAttribute("r", 6);
        var lab = (opts.xLabelFmt ? opts.xLabelFmt(p.x) : ("Year " + p.x));
        showTip('<span class="tt-k">' + lab + '</span> ' + (opts.yFmt ? opts.yFmt(p.y) : MDC.fmt.money(p.y)), ev.clientX, ev.clientY - 4);
      });
      hit.addEventListener("mouseleave", function () { focus.setAttribute("opacity", 0); dot.setAttribute("r", 4.5); hideTip(); });
      el.appendChild(dot); el.appendChild(hit);
    });
    host.appendChild(el);
  };

  /* ----- Floating result bar --------------------------------------------- */
  /* Every calculator carries the same sticky summary that slides up once the
     input card scrolls out of view. It used to be reimplemented inline on all
     fifteen pages, and all fifteen copies shared one defect: the bar is only
     *visually* hidden when off-screen, so it stayed in the tab order and in the
     screen-reader tree the entire time. A keyboard user tabbing through the
     article hit two invisible controls on every page.

     Centralising it fixes that once, deletes fifteen copies of the same twelve
     lines, and gives the two hand-written calculators (True Cost to Own, Lease
     vs Buy) the identical behavior for free. Idempotent — calling it twice on
     one page installs one listener. */
  MDC.floatSummary = function (opts) {
    opts = opts || {};
    var bar = document.getElementById(opts.bar || "floatSummary");
    var noop = function () {};
    if (!bar) return noop;
    if (bar.getAttribute("data-fs-bound") === "1") return bar._fsUpdate || noop;
    bar.setAttribute("data-fs-bound", "1");

    var anchorSel = opts.anchor || "#calc";
    var edge = opts.edge == null ? 60 : opts.edge;
    var supportsInert = "inert" in bar;

    function update() {
      var anchor = document.querySelector(anchorSel);
      /* Stand down near the foot of the page. The bar would otherwise park on
         top of the footer, competing with the links the visitor scrolled all
         that way to reach. */
      var atBottom = window.innerHeight + window.scrollY > document.body.offsetHeight - 420;
      var show = !!anchor && anchor.getBoundingClientRect().bottom < edge && !atBottom;
      bar.classList.toggle("show", show);
      /* aria-hidden covers browsers without inert; inert additionally removes
         the bar from the tab order, which aria-hidden alone does not do. */
      bar.setAttribute("aria-hidden", show ? "false" : "true");
      if (supportsInert) bar.inert = !show;
      else bar.querySelectorAll("button, a[href], input, select, textarea").forEach(function (el) {
        if (show) el.removeAttribute("tabindex");
        else el.setAttribute("tabindex", "-1");
      });
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
    bar._fsUpdate = update;
    return update;
  };

  /* ----- Segmented controls ---------------------------------------------- */
  /* Every calculator's "Gas / Hybrid / Electric"-style control is a single
     choice from a fixed set, which is a radio group — not a row of independent
     toggle buttons. Shipping it as `role="group"` + `aria-pressed` was operable
     but wrong in two ways that a keyboard user feels immediately:

       1. Every option was its own tab stop. The depreciation page alone has
          nine segment buttons, so reaching the next real field meant nine tab
          presses through choices the visitor had already made.
       2. A screen reader announced "Sedan, toggle button, not pressed" with no
          sense of the set — no "3 of 5", no indication the options are
          mutually exclusive.

     A radio group fixes both: one tab stop for the whole control, arrow keys to
     move within it, Home/End to jump to the ends, and position announced. The
     markup ships with the roles already applied so it is correct before this
     script runs; this helper adds the keyboard behavior and keeps the roving
     tabindex in sync.

     `attr` is the attribute holding each button's value — the generated
     calculators use data-val, while True Cost to Own predates that convention
     and uses data-power / data-method. Returns { set } so callers can sync the
     control when a shared URL or a Reset restores a different value. */
  MDC.segment = function (group, onSelect, attr) {
    var noop = function () {};
    if (!group) return { set: noop };
    attr = attr || "data-val";
    var btns = Array.prototype.slice.call(group.querySelectorAll("button"));
    if (!btns.length) return { set: noop };

    group.setAttribute("role", "radiogroup");

    function paint(val) {
      btns.forEach(function (b) {
        var on = b.getAttribute(attr) === val;
        b.setAttribute("role", "radio");
        b.setAttribute("aria-checked", on ? "true" : "false");
        b.removeAttribute("aria-pressed");
        /* Roving tabindex: the group is one tab stop, and Tab lands on whichever
           option is currently chosen — the standard radio-group behavior. */
        b.setAttribute("tabindex", on ? "0" : "-1");
      });
      /* If nothing matched — a value from a hand-edited URL, say — leave the
         first option reachable so the control can never become a keyboard trap. */
      if (!btns.some(function (b) { return b.getAttribute("aria-checked") === "true"; })) {
        btns[0].setAttribute("tabindex", "0");
      }
    }

    function choose(b, focus) {
      paint(b.getAttribute(attr));
      if (focus) b.focus();
      if (onSelect) onSelect(b.getAttribute(attr), b);
    }

    btns.forEach(function (b, idx) {
      b.addEventListener("click", function () { choose(b, false); });
      b.addEventListener("keydown", function (e) {
        var k = e.key, next = -1;
        if (k === "ArrowRight" || k === "ArrowDown") next = (idx + 1) % btns.length;
        else if (k === "ArrowLeft" || k === "ArrowUp") next = (idx - 1 + btns.length) % btns.length;
        else if (k === "Home") next = 0;
        else if (k === "End") next = btns.length - 1;
        else if (k === " " || k === "Spacebar") { e.preventDefault(); choose(b, true); return; }
        else return;
        e.preventDefault();
        /* Radio groups select on arrow, they do not merely move focus. That is
           what the pattern specifies and what makes the control fast to use. */
        choose(btns[next], true);
      });
    });

    var initial = (btns.filter(function (b) {
      return b.getAttribute("aria-checked") === "true" || b.getAttribute("aria-pressed") === "true";
    })[0] || btns[0]).getAttribute(attr);
    paint(initial);

    return { set: paint };
  };

  /* ----- Boot ------------------------------------------------------------ */
  MDC.initTheme();
  document.addEventListener("DOMContentLoaded", function () { initNav(); initReveal(); initAnchors(); });
})();
