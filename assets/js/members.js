(function () {
  var DEFAULT_AVATAR = 'assets/images/ui/default-avatar.svg';
  var modalMembers = [];

  function attachFallback(root) {
    root.querySelectorAll('.member-photo img, .team-card__photo img').forEach(function (img) {
      img.addEventListener('error', function () {
        if (img.src.indexOf(DEFAULT_AVATAR) !== -1) return;
        img.src = DEFAULT_AVATAR;
        img.classList.add('member-photo-fallback');
      });
    });
  }

  // Full profile card — used only for the PI/lead researcher.
  function renderPiCard(member) {
    var credentials = member.credentials
      ? '<span class="member-credentials">' + member.credentials + '</span>'
      : '';
    var email = member.email
      ? '<a class="member-email" href="mailto:' + member.email + '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z" opacity="0"/><path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/></svg>' +
        member.email + '</a>'
      : '';
    var tags = (member.tags && member.tags.length)
      ? '<div class="member-tags">' + member.tags.map(function (tag) {
          return '<span class="member-tag">' + tag + '</span>';
        }).join('') + '</div>'
      : '';

    return (
      '<div class="member-card member-card--pi">' +
      '<div class="member-photo"><img src="' + member.photo + '" alt="Picture" /></div>' +
      '<div class="member-bio">' +
      '<span class="member-name">' + member.name + '</span>' +
      '<span class="member-role">' + member.role + '</span>' +
      credentials +
      '<div class="member-bio__text">' + member.bio + '</div>' +
      tags +
      email +
      '</div>' +
      '</div>'
    );
  }

  // Compact photo + name + role card — used for everyone else. Clicking one
  // opens the full bio in a modal (see initModal below).
  function renderTeamCard(member, index) {
    return (
      '<div class="team-card" data-member-index="' + index + '" tabindex="0" role="button" aria-haspopup="dialog">' +
      '<div class="team-card__photo"><img src="' + member.photo + '" alt="Picture" /></div>' +
      '<div class="team-card__body">' +
      '<span class="team-card__name">' + member.name + '</span>' +
      '<span class="team-card__role">' + member.role + '</span>' +
      '</div>' +
      '</div>'
    );
  }

  function renderPi(el, member) {
    if (!member) return;
    el.innerHTML = renderPiCard(member);
    attachFallback(el);
  }

  function renderGrid(el, members) {
    var startIndex = modalMembers.length;
    modalMembers = modalMembers.concat(members);
    el.innerHTML = '<div class="team-grid">' + members.map(function (member, i) {
      return renderTeamCard(member, startIndex + i);
    }).join('\n') + '</div>';
    attachFallback(el);
  }

  function initFilters() {
    var pills = document.querySelectorAll('[data-member-filter]');
    var groups = document.querySelectorAll('[data-member-group]');
    if (!pills.length || !groups.length) return;

    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        var filter = pill.getAttribute('data-member-filter');

        pills.forEach(function (p) {
          p.classList.toggle('is-active', p === pill);
        });
        groups.forEach(function (group) {
          var show = filter === 'all' || group.getAttribute('data-member-group') === filter;
          group.style.display = show ? '' : 'none';
        });
      });
    });
  }

  function initModal() {
    var modal = document.getElementById('member-modal');
    if (!modal) return;

    var photoEl = document.getElementById('member-modal-photo');
    var nameEl = document.getElementById('member-modal-name');
    var roleEl = document.getElementById('member-modal-role');
    var bioEl = document.getElementById('member-modal-bio');

    function openModal(member) {
      photoEl.src = member.photo;
      photoEl.alt = member.name;
      nameEl.textContent = member.name;
      roleEl.textContent = member.role;
      bioEl.innerHTML = member.bio;
      modal.hidden = false;
      document.body.classList.add('member-modal-open');
    }

    function closeModal() {
      modal.hidden = true;
      document.body.classList.remove('member-modal-open');
    }

    document.addEventListener('click', function (e) {
      var card = e.target.closest('[data-member-index]');
      if (card) {
        var member = modalMembers[parseInt(card.getAttribute('data-member-index'), 10)];
        if (member) openModal(member);
        return;
      }
      if (e.target.closest('[data-modal-close]')) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) {
        closeModal();
        return;
      }
      if ((e.key === 'Enter' || e.key === ' ') && document.activeElement && document.activeElement.matches('[data-member-index]')) {
        e.preventDefault();
        var member = modalMembers[parseInt(document.activeElement.getAttribute('data-member-index'), 10)];
        if (member) openModal(member);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var piEl = document.getElementById('pi-card');
    var currentEl = document.getElementById('current-members');
    var formerEl = document.getElementById('former-members');
    if (!piEl && !currentEl && !formerEl) return;

    var data = window.SITE_MEMBERS || {};
    var current = data.current || [];
    var pi = current.filter(function (m) { return m.pi; })[0];
    var currentRest = current.filter(function (m) { return !m.pi; });

    if (piEl) renderPi(piEl, pi);
    if (currentEl) renderGrid(currentEl, currentRest);
    if (formerEl) renderGrid(formerEl, data.former || []);

    initFilters();
    initModal();
  });
})();
