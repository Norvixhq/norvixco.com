/* Timber Roofing & Exteriors — site behaviour.
   No dependencies. Everything degrades: with JS off the site is fully usable,
   the drawer falls back to anchor links, and no content is hidden.

   The loader itself is handled by a tiny inline script in the document head,
   because it has to run before first paint. This file only finishes it. */
(function () {
  "use strict";
  var doc = document, root = doc.documentElement;
  root.classList.add("js");

  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var focusableSel = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function track(name, params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: name }, params || {}));
    if (typeof window.gtag === "function") window.gtag("event", name, params || {});
  }

  function trapFocus(container, e) {
    if (e.key !== "Tab") return;
    var f = $$(focusableSel, container).filter(function (n) { return n.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------- loader: finish the sequence started in <head> ----------
     The head script already decided whether to show it and set the session
     marker. All that remains is to clear it, with a hard failsafe so nobody
     can ever be trapped behind it. */
  (function () {
    var el = doc.getElementById("loader");
    if (!el) { root.style.overflow = ""; return; }

    var MIN = reduced ? 300 : 1750;
    var MAX = reduced ? 800 : 2150;
    var HARD = 3000;
    var t0 = Date.now();
    var cleared = false;

    function clear() {
      if (cleared) return;
      cleared = true;
      el.setAttribute("data-done", "true");
      el.setAttribute("aria-hidden", "true");
      var gone = function () {
        if (el.parentNode) el.parentNode.removeChild(el);
        root.style.overflow = "";   /* after the fade, never during it */
      };
      el.addEventListener("transitionend", gone, { once: true });
      setTimeout(gone, 600);
    }

    if (doc.readyState === "complete") setTimeout(clear, MIN);
    else window.addEventListener("load", function () {
      setTimeout(clear, Math.max(0, MIN - (Date.now() - t0)));
    }, { once: true });

    setTimeout(clear, MAX);
    setTimeout(clear, HARD);
    ["pointerdown", "keydown", "touchstart"].forEach(function (ev) {
      window.addEventListener(ev, clear, { once: true, passive: true });
    });
    window.addEventListener("pageshow", function (e) { if (e.persisted) clear(); });
  })();

  /* ---------- header scroll state ---------- */
  (function () {
    var hdr = $(".masthead");
    if (!hdr) return;
    var ticking = false;
    function sync() {
      hdr.setAttribute("data-stuck", String(window.scrollY > 12));
      /* reading progress, written as a unitless scale so the paint is cheap */
      var max = doc.documentElement.scrollHeight - window.innerHeight;
      hdr.style.setProperty("--read", max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : "0");
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(sync); }
    }, { passive: true });
    sync();
  })();

  /* ---------- desktop menus: hover, focus, and keyboard ----------
     Panels open on hover and on focus, close on Escape or when focus leaves.
     A short close delay lets the pointer travel between columns of the mega
     menu without it snapping shut. */
  (function () {
    var items = $$(".mainnav li[data-menu]");
    if (!items.length) return;
    var timer = null;

    function open(li) {
      clearTimeout(timer);
      items.forEach(function (o) { if (o !== li) close(o); });
      li.setAttribute("data-open", "true");
      var t = $("[aria-expanded]", li);
      if (t) t.setAttribute("aria-expanded", "true");
    }
    function close(li) {
      li.setAttribute("data-open", "false");
      var t = $("[aria-expanded]", li);
      if (t) t.setAttribute("aria-expanded", "false");
    }
    function closeSoon(li) {
      clearTimeout(timer);
      timer = setTimeout(function () { close(li); }, 160);
    }

    items.forEach(function (li) {
      li.addEventListener("mouseenter", function () { open(li); });
      li.addEventListener("mouseleave", function () { closeSoon(li); });
      li.addEventListener("focusin", function () { open(li); });
      li.addEventListener("focusout", function () {
        setTimeout(function () { if (!li.contains(doc.activeElement)) close(li); }, 0);
      });
      var trigger = $(".navlink", li);
      if (trigger) {
        trigger.addEventListener("click", function (e) {
          // a trigger is still a real link; only intercept keyboard-style activation
          if (e.detail === 0) { e.preventDefault(); open(li); var f = $(focusableSel, $(".navpanel, .megapanel", li)); if (f) f.focus(); }
        });
      }
      li.addEventListener("keydown", function (e) {
        if (e.key === "Escape") { close(li); if (trigger) trigger.focus(); }
      });
    });
    doc.addEventListener("click", function (e) {
      if (!e.target.closest(".mainnav li[data-menu]")) items.forEach(close);
    });
  })();

  /* ---------- pressed feedback on the primary nav ----------
     pointerdown rather than click, so the sheen starts before the browser
     begins unloading the page. */
  (function () {
    var links = $$(".navlink");
    if (!links.length) return;
    links.forEach(function (a) {
      a.addEventListener("pointerdown", function () {
        a.classList.remove("tapped");
        void a.offsetWidth;            // restart the animation on a repeat press
        a.classList.add("tapped");
      });
      a.addEventListener("animationend", function () { a.classList.remove("tapped"); });
    });
  })();

  /* ---------- mobile drawer ---------- */
  (function () {
    var btn = $("#menubtn"), drawer = $("#drawer");
    if (!btn || !drawer) return;
    var closeBtn = $(".drawer__x", drawer);
    var last = null;

    function onKey(e) {
      if (e.key === "Escape") { close(); return; }
      trapFocus(drawer, e);
    }
    function open() {
      last = doc.activeElement;
      drawer.setAttribute("data-open", "true");
      drawer.removeAttribute("aria-hidden");
      btn.setAttribute("aria-expanded", "true");
      doc.body.setAttribute("data-locked", "true");
      (closeBtn || drawer).focus();
      doc.addEventListener("keydown", onKey);
    }
    function close() {
      drawer.setAttribute("data-open", "false");
      drawer.setAttribute("aria-hidden", "true");
      btn.setAttribute("aria-expanded", "false");
      doc.body.removeAttribute("data-locked");
      doc.removeEventListener("keydown", onKey);
      if (last) last.focus();
    }
    btn.addEventListener("click", function () {
      drawer.getAttribute("data-open") === "true" ? close() : open();
    });
    if (closeBtn) closeBtn.addEventListener("click", close);
    $$("a", drawer).forEach(function (a) { a.addEventListener("click", close); });

    /* Accordions. Only siblings at the SAME level collapse, so opening a
       county does not close the Roofing panel above it, and opening a second
       county closes the first. */
    function panelOf(btn) { return doc.getElementById(btn.getAttribute("aria-controls")); }
    function setOpen(btn, open) {
      var panel = panelOf(btn);
      if (!panel) return;
      panel.setAttribute("data-open", String(open));
      btn.setAttribute("aria-expanded", String(open));
    }
    $$("[data-expand]", drawer).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") !== "true";
        var list = btn.closest("li") && btn.closest("li").parentNode;
        if (list) {
          $$("[data-expand]", list).forEach(function (other) {
            if (other !== btn && other.closest("li").parentNode === list) setOpen(other, false);
          });
        }
        setOpen(btn, open);
        /* Keep the tapped row in view once its panel expands. Scroll the
           drawer's own container rather than calling scrollIntoView: that would
           move the locked page behind the drawer, and its options-object form
           is not universally supported. */
        var row = btn.closest("li");
        var scroller = drawer.querySelector(".drawer__body");
        if (open && row && scroller && window.requestAnimationFrame) {
          window.requestAnimationFrame(function () {
            var delta = row.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
            if (delta < 8) scroller.scrollTop += delta - 12;
          });
        }
      });
    });
  })();

  /* ---------- service-area explorer ---------- */
  (function () {
    var tabs = $$("[data-area-tab]");
    if (!tabs.length) return;
    function select(tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        var p = doc.getElementById(t.getAttribute("aria-controls"));
        if (p) p.hidden = !on;
      });
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () {
        select(tab);
        track("area_explorer", { county: tab.getAttribute("data-area-tab") });
      });
      tab.addEventListener("keydown", function (e) {
        var d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1
              : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        var next = tabs[(i + d + tabs.length) % tabs.length];
        select(next); next.focus();
      });
    });
  })();

  /* ---------- gallery filter ---------- */
  (function () {
    var bar = $("[data-tagrow]");
    if (!bar) return;
    var items = $$("[data-cats]");
    var empty = $("[data-gallery-empty]");
    bar.addEventListener("click", function (e) {
      var btn = e.target.closest(".tagbtn");
      if (!btn) return;
      var cat = btn.getAttribute("data-cat");
      $$(".tagbtn", bar).forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      var shown = 0;
      items.forEach(function (it) {
        var ok = cat === "all" || (" " + it.getAttribute("data-cats") + " ").indexOf(" " + cat + " ") > -1;
        it.hidden = !ok;
        if (ok) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
      track("gallery_filter", { filter: cat, results: shown });
    });
  })();

  /* ---------- project lightbox ---------- */
  (function () {
    var items = $$("[data-lb]");
    if (!items.length) return;
    var box = null, idx = 0, lastFocus = null;
    var visible = function () { return items.filter(function (i) { return !i.hidden; }); };

    function build() {
      box = doc.createElement("div");
      box.className = "lightbox";
      box.setAttribute("role", "dialog");
      box.setAttribute("aria-modal", "true");
      box.setAttribute("aria-label", "Project photograph");
      box.hidden = true;
      box.innerHTML =
        '<div class="lightbox__bar"><span class="lightbox__n"></span>' +
        '<button class="lightbox__btn" type="button" data-lb-close aria-label="Close photograph">' +
        '<svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button></div>' +
        '<div class="lightbox__stage">' +
        '<button class="lightbox__btn lightbox__step lightbox__step--prev" type="button" data-lb-prev aria-label="Previous photograph">' +
        '<svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M13 3 6 10l7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
        '<img alt="">' +
        '<button class="lightbox__btn lightbox__step lightbox__step--next" type="button" data-lb-next aria-label="Next photograph">' +
        '<svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="m7 3 7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>' +
        '<div class="lightbox__foot"><strong></strong><p></p><p style="margin-top:.6rem"><a data-lb-link href="#">View the full project write-up &rarr;</a></p></div>';
      doc.body.appendChild(box);

      box.addEventListener("click", function (e) {
        if (e.target.closest("[data-lb-close]") || e.target === box) close();
        else if (e.target.closest("[data-lb-prev]")) step(-1);
        else if (e.target.closest("[data-lb-next]")) step(1);
      });
      var x0 = null;
      box.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      box.addEventListener("touchend", function (e) {
        if (x0 === null) return;
        var dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 46) step(dx < 0 ? 1 : -1);
        x0 = null;
      }, { passive: true });
    }

    function paint() {
      var list = visible(), el = list[idx];
      if (!el) return;
      var img = $("img", el);
      var stage = $(".lightbox__stage img", box);
      stage.src = el.getAttribute("data-lb-src") || (img && img.currentSrc) || "";
      stage.alt = (img && img.alt) || "";
      $(".lightbox__foot strong", box).textContent = el.getAttribute("data-lb-title") || "";
      $(".lightbox__foot p", box).textContent = el.getAttribute("data-lb-caption") || "";
      $("[data-lb-link]", box).href = el.getAttribute("href") || "#";
      $(".lightbox__n", box).textContent = (idx + 1) + " / " + list.length;
      var multi = list.length > 1;
      $("[data-lb-prev]", box).hidden = !multi;
      $("[data-lb-next]", box).hidden = !multi;
    }
    function step(d) { var n = visible().length; idx = (idx + d + n) % n; paint(); }
    function onKey(e) {
      if (e.key === "Escape") return close();
      if (e.key === "ArrowLeft") return step(-1);
      if (e.key === "ArrowRight") return step(1);
      trapFocus(box, e);
    }
    function open(el) {
      if (!box) build();
      lastFocus = doc.activeElement;
      idx = Math.max(0, visible().indexOf(el));
      paint();
      box.hidden = false;
      doc.body.setAttribute("data-locked", "true");
      $("[data-lb-close]", box).focus();
      doc.addEventListener("keydown", onKey);
      track("gallery_lightbox", { action: "open" });
    }
    function close() {
      box.hidden = true;
      doc.body.removeAttribute("data-locked");
      doc.removeEventListener("keydown", onKey);
      if (lastFocus) lastFocus.focus();
    }
    items.forEach(function (el) {
      el.addEventListener("click", function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button > 0) return;
        e.preventDefault();
        open(el);
      });
    });
  })();

  /* ---------- sticky action bar ---------- */
  (function () {
    var bar = $("#dock");
    if (!bar) return;
    var typing = false, past = false;
    function sync() { bar.setAttribute("data-show", String(past && !typing)); }

    var sentinel = $("[data-dock-after]") || $("main");
    if ("IntersectionObserver" in window && sentinel) {
      new IntersectionObserver(function (es) {
        past = !es[0].isIntersecting && es[0].boundingClientRect.top < 0;
        sync();
      }, { rootMargin: "-100px 0px 0px 0px" }).observe(sentinel);
    } else { past = true; sync(); }

    doc.addEventListener("focusin", function (e) { if (e.target.closest("form")) { typing = true; sync(); } });
    doc.addEventListener("focusout", function (e) {
      if (!e.target.closest("form")) return;
      setTimeout(function () {
        if (!doc.activeElement || !doc.activeElement.closest("form")) { typing = false; sync(); }
      }, 60);
    });
    var ftr = $(".sitefoot__bar");
    if (ftr && "IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) bar.setAttribute("data-show", "false"); else sync();
      }, { threshold: 0 }).observe(ftr);
    }
  })();

  /* ---------- call and email tracking ---------- */
  doc.addEventListener("click", function (e) {
    var a = e.target.closest("a[href^='tel:'], a[href^='mailto:']");
    if (!a) return;
    track(a.getAttribute("href").indexOf("tel:") === 0 ? "call_click" : "email_click",
          { location: a.getAttribute("data-loc") || "page" });
  });

  /* ---------- page engagement ---------- */
  (function () {
    var t = doc.body.getAttribute("data-page-type");
    if (t !== "service" && t !== "location") return;
    var sent = false;
    function fire() {
      if (sent) return;
      sent = true;
      track("page_engagement", { page_type: t, slug: doc.body.getAttribute("data-slug") || "" });
    }
    setTimeout(fire, 20000);
    window.addEventListener("scroll", function onScroll() {
      if ((window.scrollY + window.innerHeight) / doc.body.scrollHeight > 0.5) {
        fire(); window.removeEventListener("scroll", onScroll);
      }
    }, { passive: true });
  })();

  /* ---------- scroll reveal ---------- */
  (function () {
    var els = $$(".rise");
    if (!els.length) return;
    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("shown"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("shown"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });
  })();
})();
