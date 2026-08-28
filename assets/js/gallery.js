(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var grid = document.querySelector('.gallery-grid');
    var lightbox = document.getElementById('gallery-lightbox');
    if (!grid || !lightbox) return;

    var imageEl = document.getElementById('lightbox-image');
    // Each direct child of .gallery-grid is one tile — either the feature
    // wrapper div (containing an <img>) or a plain <img> itself.
    var tileEls = Array.prototype.slice.call(grid.children);
    var images = tileEls.map(function (el) {
      return el.tagName === 'IMG' ? el : el.querySelector('img');
    });
    var current = 0;

    tileEls.forEach(function (el, index) {
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', 'View larger photo');
      el.addEventListener('click', function () { open(index); });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(index);
        }
      });
    });

    function open(index) {
      current = index;
      show();
      lightbox.hidden = false;
      document.body.classList.add('lightbox-open');
    }

    function close() {
      lightbox.hidden = true;
      document.body.classList.remove('lightbox-open');
    }

    function show() {
      var img = images[current];
      imageEl.src = img.src;
      imageEl.alt = img.alt || '';
    }

    function next() {
      current = (current + 1) % images.length;
      show();
    }

    function prev() {
      current = (current - 1 + images.length) % images.length;
      show();
    }

    lightbox.addEventListener('click', function (e) {
      if (e.target.closest('[data-lightbox-close]')) close();
      else if (e.target.closest('[data-lightbox-next]')) next();
      else if (e.target.closest('[data-lightbox-prev]')) prev();
    });

    document.addEventListener('keydown', function (e) {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });
  });
})();
