/* Rapid Response Restoration — site behaviour.
   Vanilla, no dependencies, deferred. Everything degrades to working HTML. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---- Header: shadow on scroll + floating call button ---- */
  var header = $(".site-header");
  var floatCall = $(".float-call");
  var lastY = 0;
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 24);
    if (floatCall) floatCall.classList.toggle("show", y > 620);
    lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav ---- */
  var burger = $(".burger");
  if (burger) {
    burger.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.documentElement.style.overflow = open ? "hidden" : "";
    });
  }
  $$(".nav a").forEach(function (a) {
    a.addEventListener("click", function () {
      document.body.classList.remove("nav-open");
      document.documentElement.style.overflow = "";
      if (burger) burger.setAttribute("aria-expanded", "false");
    });
  });

  /* ---- Nav dropdowns: hover on pointer devices, click everywhere ---- */
  $$(".has-sub").forEach(function (item) {
    var btn = $("button", item);
    if (!btn) return;
    var close = function () { item.dataset.open = "false"; btn.setAttribute("aria-expanded", "false"); };
    var open = function () { item.dataset.open = "true"; btn.setAttribute("aria-expanded", "true"); };

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      item.dataset.open === "true" ? close() : open();
    });
    if (window.matchMedia("(hover: hover) and (min-width: 1121px)").matches) {
      item.addEventListener("mouseenter", open);
      item.addEventListener("mouseleave", close);
    }
    item.addEventListener("keydown", function (e) { if (e.key === "Escape") { close(); btn.focus(); } });
    document.addEventListener("click", function (e) { if (!item.contains(e.target)) close(); });
  });

  /* ---- Live dispatch clock (America/Chicago) ----
     A 24/7 company should be able to prove it's awake right now. */
  var clocks = $$("[data-clock]");
  if (clocks.length) {
    var fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago", hour: "numeric", minute: "2-digit", hour12: true
    });
    var tick = function () {
      var t = fmt.format(new Date()) + " CT";
      clocks.forEach(function (el) { el.textContent = t; });
    };
    tick();
    setInterval(tick, 15000);
  }

  /* ---- Count-up statistics ---- */
  function countUp(el) {
    var target = parseFloat(el.dataset.count);
    var suffix = el.dataset.suffix || "";
    var prefix = el.dataset.prefix || "";
    var decimals = (el.dataset.count.split(".")[1] || "").length;
    if (reduce) { el.textContent = prefix + target.toFixed(decimals) + suffix; return; }
    var dur = 1500, start = null;
    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---- Scroll reveal + counter trigger ---- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        $$("[data-count]", e.target).forEach(countUp);
        if (e.target.hasAttribute("data-count")) countUp(e.target);
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    $$("[data-reveal], [data-count]").forEach(function (el) { io.observe(el); });
  } else {
    $$("[data-reveal]").forEach(function (el) { el.classList.add("in"); });
    $$("[data-count]").forEach(countUp);
  }

  /* ---- FAQ accordion ---- */
  $$(".faq-item").forEach(function (item) {
    var btn = $(".faq-q", item);
    if (!btn) return;
    btn.addEventListener("click", function () {
      var open = item.dataset.open === "true";
      item.dataset.open = open ? "false" : "true";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
    });
  });

  /* ---- Before / after comparison sliders ---- */
  $$(".ba").forEach(function (ba) {
    var range = $('input[type="range"]', ba);
    if (!range) return;
    var set = function (v) { ba.style.setProperty("--pos", v + "%"); };
    set(range.value);
    range.addEventListener("input", function () { set(range.value); });
  });

  /* ---- Mark the current nav item ---- */
  var path = window.location.pathname.replace(/index\.html$/, "");
  $$(".nav a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#") return;
    if (href === path || (href !== "/" && path.indexOf(href) === 0)) {
      a.classList.add("is-current");
      a.setAttribute("aria-current", "page");
    }
  });
})();
