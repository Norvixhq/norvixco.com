/* C3 Designs — interactions */
(function(){
  'use strict';

  // ---- header scroll state ----
  var head = document.querySelector('.site-head');
  function onScroll(){
    if(!head) return;
    if(window.scrollY > 24) head.classList.add('scrolled');
    else head.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // ---- mobile nav ----
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  var scrim = null;
  if(nav){
    scrim = document.createElement('div');
    scrim.className = 'nav-scrim';
    document.body.appendChild(scrim);
  }
  function setNav(open){
    if(!nav) return;
    nav.classList.toggle('open', open);
    if(scrim) scrim.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
    if(burger){ burger.classList.toggle('open', open); burger.setAttribute('aria-expanded', open ? 'true':'false'); }
  }
  function closeNav(){ setNav(false); }
  if(burger && nav){
    burger.addEventListener('click', function(){ setNav(!nav.classList.contains('open')); });
    nav.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeNav); });
    if(scrim) scrim.addEventListener('click', closeNav);
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeNav(); });
  }

  // ---- smooth in-page nav (RAF + getBoundingClientRect) ----
  var reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  window.smoothNav = function(sel){
    var el = document.querySelector(sel);
    if(!el) return;
    var headH = head ? head.offsetHeight : 0;
    var startY = window.pageYOffset;
    var targetY = startY + el.getBoundingClientRect().top - headH - 8;
    if(reduce){ window.scrollTo(0, targetY); return; }
    var dur = 620, t0 = null;
    function step(ts){
      if(t0===null) t0 = ts;
      var p = Math.min((ts - t0)/dur, 1);
      var e = p<0.5 ? 4*p*p*p : 1 - Math.pow(-2*p+2,3)/2; // easeInOutCubic
      window.scrollTo(0, startY + (targetY - startY)*e);
      if(p<1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };
  document.querySelectorAll('[data-scroll]').forEach(function(a){
    a.addEventListener('click', function(e){
      var t = a.getAttribute('data-scroll');
      if(document.querySelector(t)){ e.preventDefault(); closeNav(); window.smoothNav(t); }
    });
  });

  // ---- reveal on scroll ----
  var items = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !reduce){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, {threshold:.12, rootMargin:'0px 0px -8% 0px'});
    items.forEach(function(el){ io.observe(el); });
  } else {
    items.forEach(function(el){ el.classList.add('in'); });
  }

  // ---- contact form (mock) ----
  var form = document.getElementById('build-form');
  if(form){
    form.addEventListener('submit', function(e){
      // For the live site this posts to Formspree; in the mockup we confirm inline.
      if(form.getAttribute('action').indexOf('REPLACE') !== -1){
        e.preventDefault();
        var note = document.getElementById('form-note');
        if(note){ note.hidden = false; note.scrollIntoView({behavior: reduce?'auto':'smooth', block:'center'}); }
        form.reset();
      }
    });
  }
})();

/* ---- scrollspy for single-page nav ---- */
(function(){
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a.lnk[data-scroll]'));
  if(!links.length) return;
  var map = links.map(function(l){
    var sel = l.getAttribute('data-scroll');
    return {link:l, sec:document.querySelector(sel)};
  }).filter(function(m){return m.sec;});
  var head = document.querySelector('.site-head');
  function spy(){
    var pos = window.scrollY + (head?head.offsetHeight:0) + 40;
    var cur = map[0];
    map.forEach(function(m){ if(m.sec.offsetTop <= pos) cur = m; });
    links.forEach(function(l){l.classList.remove('active');});
    if(cur) cur.link.classList.add('active');
  }
  window.addEventListener('scroll', spy, {passive:true});
  window.addEventListener('resize', spy);
  spy();
})();
