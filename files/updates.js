(function () {
  var DEFAULT_THUMB = 'media/update-default.png';

  function renderPost(post) {
    var gallery = (post.images || []).length
      ? '<div class="post-card__gallery">' +
        post.images.map(function (src) {
          return '<img src="' + src + '" alt="Picture" />';
        }).join('') +
        '</div>'
      : '';
    var link = post.link
      ? '<div style="margin-top:24px;"><a class="btn-site" href="' + post.link.url + '" target="_blank" rel="noopener noreferrer">' + post.link.label + '</a></div>'
      : '';

    return (
      '<div class="post-card">' +
      '<h2 class="post-card__title">' + post.title + '</h2>' +
      '<span class="post-card__date">' + post.date + '</span>' +
      gallery +
      '<div class="post-card__body">' + post.body + link + '</div>' +
      '</div>'
    );
  }

  function renderPreviewCard(post) {
    var src = (post.images || [])[0] || DEFAULT_THUMB;
    var thumb = '<img class="update-card__thumb" src="' + src + '" alt="' + post.title + '" />';

    return (
      '<div class="update-card">' +
      thumb +
      '<div class="update-card__body">' +
      '<span class="update-card__date">' + post.date + '</span>' +
      '<h3 class="update-card__title">' + post.title + '</h3>' +
      '<p class="update-card__excerpt">' + (post.excerpt || '') + '</p>' +
      '<a class="update-card__link" href="updates.html">Read more &rarr;</a>' +
      '</div>' +
      '</div>'
    );
  }

  document.addEventListener('DOMContentLoaded', function () {
    var listEl = document.getElementById('updates-list');
    var previewEl = document.getElementById('updates-preview');
    if (!listEl && !previewEl) return;

    var posts = (window.SITE_UPDATES || {}).posts || [];
    if (listEl) {
      listEl.innerHTML = posts.map(renderPost).join('\n');
    }
    if (previewEl) {
      var limit = parseInt(previewEl.getAttribute('data-limit'), 10) || posts.length;
      previewEl.innerHTML = posts.slice(0, limit).map(renderPreviewCard).join('\n');
    }
  });
})();
