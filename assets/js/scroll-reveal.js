(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Runs after DOMContentLoaded (and after updates.js, registered earlier in
  // document order) so dynamically-rendered cards in #updates-preview are
  // already in the DOM before we look for reveal targets.
  document.addEventListener('DOMContentLoaded', function () {
    var targets = Array.prototype.slice.call(
      document.querySelectorAll('[data-reveal], [data-reveal-group] > *')
    );
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var groupIndex = new WeakMap();
    document.querySelectorAll('[data-reveal-group]').forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child, i) {
        groupIndex.set(child, i);
      });
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = groupIndex.has(el) ? (groupIndex.get(el) % 4) * 80 : 0;
        el.style.transitionDelay = delay + 'ms';
        el.classList.add('is-visible');
        observer.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el) { observer.observe(el); });
  });
})();
