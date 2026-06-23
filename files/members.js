(function () {
  var DEFAULT_AVATAR = 'files/default-avatar.svg';

  function renderCard(member) {
    var styleAttr = member.photoStyle ? ' style="' + member.photoStyle + '"' : '';
    var cardClass = member.pi ? 'member-card member-card--pi' : 'member-card';
    return (
      '<div class="' + cardClass + '">' +
      '<div class="member-photo"><img src="' + member.photo + '" alt="Picture"' + styleAttr + ' /></div>' +
      '<div class="member-bio"><span class="member-name">' + member.name + '</span>' +
      '<span class="member-role">' + member.role + '</span>' + member.bio + '</div>' +
      '</div>'
    );
  }

  function render(listEl, members) {
    listEl.innerHTML = members.map(renderCard).join('\n');
    listEl.querySelectorAll('.member-photo img').forEach(function (img) {
      img.addEventListener('error', function () {
        if (img.src.indexOf(DEFAULT_AVATAR) !== -1) return;
        img.src = DEFAULT_AVATAR;
        img.classList.add('member-photo-fallback');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var currentEl = document.getElementById('current-members');
    var formerEl = document.getElementById('former-members');
    if (!currentEl && !formerEl) return;

    var data = window.SITE_MEMBERS || {};
    if (currentEl) render(currentEl, data.current || []);
    if (formerEl) render(formerEl, data.former || []);
  });
})();
