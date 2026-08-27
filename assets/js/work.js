/* ============================================================
   work.js — expandable case-study previews in Selected Work
   ============================================================ */
(function () {
  'use strict';

  var items = Array.prototype.slice.call(document.querySelectorAll('[data-work-item]'));
  if (!items.length) return;

  items.forEach(function (item) {
    var head = item.querySelector('[data-work-toggle]');
    var panel = item.querySelector('[data-work-panel]');
    if (!head || !panel) return;

    function setOpen(open) {
      item.classList.toggle('is-open', open);
      head.setAttribute('aria-expanded', String(open));
      panel.setAttribute('aria-hidden', String(!open));
      var label = head.querySelector('[data-work-toggle-label]');
      if (label) label.textContent = open ? 'Hide preview' : 'Case preview';
    }

    setOpen(false);

    head.addEventListener('click', function () {
      var open = head.getAttribute('aria-expanded') !== 'true';
      /* Accordion behaviour: one open at a time keeps the page calm. */
      if (open) {
        items.forEach(function (other) {
          if (other === item) return;
          var otherHead = other.querySelector('[data-work-toggle]');
          var otherPanel = other.querySelector('[data-work-panel]');
          other.classList.remove('is-open');
          if (otherHead) {
            otherHead.setAttribute('aria-expanded', 'false');
            var otherLabel = otherHead.querySelector('[data-work-toggle-label]');
            if (otherLabel) otherLabel.textContent = 'Case preview';
          }
          if (otherPanel) otherPanel.setAttribute('aria-hidden', 'true');
        });
      }
      setOpen(open);
    });
  });
})();
