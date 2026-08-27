/* ============================================================
   reveal.js — scroll-triggered reveals, text reveal, parallax
   Respects prefers-reduced-motion.
   ============================================================ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Split headline into animatable lines ---- */
  document.querySelectorAll('[data-reveal-text]').forEach(function (el) {
    if (el.dataset.split === 'done') return;
    var lines = el.innerHTML.split(/<br\s*\/?>/i);
    el.innerHTML = lines
      .map(function (line) { return '<span class="reveal-line"><span>' + line.trim() + '</span></span>'; })
      .join('');
    el.classList.add('reveal-text');
    el.dataset.split = 'done';
  });

  var targets = document.querySelectorAll('[data-reveal], [data-reveal-text], [data-flow]');

  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseInt(el.dataset.revealDelay || '0', 10);
        window.setTimeout(function () { el.classList.add('is-visible'); }, delay);
        io.unobserve(el);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
  );
  targets.forEach(function (el) { io.observe(el); });

  /* ---- Very light image parallax ---- */
  var parallax = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  if (!parallax.length) return;

  var raf = false;
  function update() {
    raf = false;
    var vh = window.innerHeight;
    parallax.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > vh + 200) return;
      var strength = parseFloat(el.dataset.parallax) || 6;
      var progress = (rect.top + rect.height / 2 - vh / 2) / vh; // -1 … 1
      el.style.transform = 'translate3d(0,' + (progress * strength * -1).toFixed(2) + '%,0)';
    });
  }
  function onScroll() {
    if (raf) return;
    raf = true;
    window.requestAnimationFrame(update);
  }
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
})();
