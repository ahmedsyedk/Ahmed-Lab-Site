(function () {
  var CATEGORY_CLASS = {
    Grant: 'update-tag--grant',
    Award: 'update-tag--award',
    Publication: 'update-tag--publication'
  };

  function categoryTag(category) {
    if (!category) return '';
    var cls = CATEGORY_CLASS[category] || '';
    return '<span class="update-tag ' + cls + '">' + category + '</span>';
  }

  function yearOf(dateStr) {
    var parts = (dateStr || '').split('/');
    return parts.length === 3 ? parts[2] : '';
  }

  function timeOf(dateStr) {
    var parts = (dateStr || '').split('/');
    if (parts.length !== 3) return 0;
    return new Date(parts[2], parts[0] - 1, parts[1]).getTime();
  }

  function renderPost(post) {
    var images = post.images || [];
    var galleryClass = 'post-card__gallery' + (images.length === 3 ? ' post-card__gallery--featured' : '');
    var gallery = images.length
      ? '<div class="' + galleryClass + '">' +
        images.map(function (src) {
          return '<img src="' + src + '" alt="Picture" />';
        }).join('') +
        '</div>'
      : '';
    var link = post.link
      ? '<div style="margin-top:24px;"><a class="btn-site" href="' + post.link.url + '" target="_blank" rel="noopener noreferrer">' + post.link.label + '</a></div>'
      : '';

    return (
      '<div class="post-card">' +
      '<div class="post-card__meta">' + categoryTag(post.category) +
      '<span class="post-card__date">' + post.date + '</span></div>' +
      '<h2 class="post-card__title">' + post.title + '</h2>' +
      gallery +
      '<div class="post-card__body">' + post.body + link + '</div>' +
      '</div>'
    );
  }

  function renderPreviewCard(post) {
    var src = (post.images || [])[0];
    var thumb = src
      ? '<img class="update-card__thumb" src="' + src + '" alt="' + post.title + '" />'
      : '';

    return (
      '<div class="update-card' + (src ? '' : ' update-card--no-thumb') + '">' +
      thumb +
      '<div class="update-card__body">' +
      '<div class="update-card__meta">' + categoryTag(post.category) +
      '<span class="update-card__date">' + post.date + '</span></div>' +
      '<h3 class="update-card__title">' + post.title + '</h3>' +
      '<p class="update-card__excerpt">' + (post.excerpt || '') + '</p>' +
      '<a class="update-card__link" href="updates.html">Read more &rarr;</a>' +
      '</div>' +
      '</div>'
    );
  }

  function initUpdatesPage(posts) {
    var listEl = document.getElementById('updates-list');
    var searchEl = document.getElementById('updates-search');
    var yearFilterEl = document.getElementById('updates-year-filter');
    if (!listEl) return;

    var years = [];
    posts.forEach(function (post) {
      var y = yearOf(post.date);
      if (y && years.indexOf(y) === -1) years.push(y);
    });
    years.sort(function (a, b) { return b - a; });

    var state = { query: '', year: 'all' };

    function renderYearFilter() {
      var items = ['<button type="button" class="filter-pill' +
        (state.year === 'all' ? ' is-active' : '') + '" data-year="all">All Years</button>'];
      years.forEach(function (y) {
        items.push('<button type="button" class="filter-pill' +
          (state.year === y ? ' is-active' : '') + '" data-year="' + y + '">' + y + '</button>');
      });
      yearFilterEl.innerHTML = items.join('');
      yearFilterEl.querySelectorAll('[data-year]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          state.year = btn.getAttribute('data-year');
          renderYearFilter();
          renderList();
        });
      });
    }

    function matchesQuery(post) {
      if (!state.query) return true;
      var haystack = (post.title + ' ' + (post.excerpt || '') + ' ' + post.body + ' ' + (post.category || '')).toLowerCase();
      return haystack.indexOf(state.query) !== -1;
    }

    function renderList() {
      var filtered = posts.filter(function (post) {
        var yearOk = state.year === 'all' || yearOf(post.date) === state.year;
        return yearOk && matchesQuery(post);
      }).sort(function (a, b) { return timeOf(b.date) - timeOf(a.date); });

      if (!filtered.length) {
        listEl.innerHTML = '<p class="updates-empty">No updates match your search.</p>';
        return;
      }

      var html = '';
      var currentYear = null;
      filtered.forEach(function (post) {
        var y = yearOf(post.date);
        if (y !== currentYear) {
          if (currentYear !== null) html += '</div>';
          html += '<h2 class="updates-year-heading">' + y + '</h2><div class="updates-year-group">';
          currentYear = y;
        }
        html += renderPost(post);
      });
      html += '</div>';
      listEl.innerHTML = html;
    }

    if (yearFilterEl) renderYearFilter();
    if (searchEl) {
      searchEl.addEventListener('input', function () {
        state.query = searchEl.value.trim().toLowerCase();
        renderList();
      });
    }
    renderList();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var listEl = document.getElementById('updates-list');
    var previewEl = document.getElementById('updates-preview');
    if (!listEl && !previewEl) return;

    var posts = (window.SITE_UPDATES || {}).posts || [];
    if (listEl) initUpdatesPage(posts);
    if (previewEl) {
      var limit = parseInt(previewEl.getAttribute('data-limit'), 10) || posts.length;
      previewEl.innerHTML = posts.slice(0, limit).map(renderPreviewCard).join('\n');
    }
  });
})();
