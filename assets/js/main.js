/* ============================================================
   main.js — small page-level utilities
   ============================================================ */
(function () {
  'use strict';

  /* Footer year */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* Anchor scrolling that accounts for the fixed nav */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var nav = document.querySelector('[data-nav]');
      var navH = nav ? nav.offsetHeight : 60;
      var top = target.getBoundingClientRect().top + window.scrollY - (navH + 16);
      window.scrollTo({ top: top, behavior: reduced ? 'auto' : 'smooth' });
      if (history.replaceState) history.replaceState(null, '', id);
    });
  });
})();
