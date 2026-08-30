// Single source of truth for the header nav, mobile nav, and footer markup
// shared by every page. Each page mounts these via a small inline <script>
// at the point in the DOM where the markup belongs (see any .html file) —
// no fetch/build step involved, so pages still work opened directly via
// file://.
var SiteLayout = (function () {
  var PAGES = [
    { key: "home", href: "index.html", label: "Home" },
    { key: "members", href: "members.html", label: "Team" },
    { key: "updates", href: "updates.html", label: "Updates" },
    { key: "contact", href: "contact.html", label: "Contact" }
  ];

  function menuItems(activeKey) {
    return PAGES.map(function (page) {
      var activeAttr = page.key === activeKey ? ' id="active"' : "";
      return (
        "<li" + activeAttr + ' class="wsite-menu-item-wrap">' +
        '<a href="' + page.href + '" class="wsite-menu-item"> ' + page.label + " </a>" +
        "</li>"
      );
    }).join("");
  }

  function navWrap(activeKey) {
    return (
      '<div class="nav-wrap">' +
        '<div id="logo">' +
          '<span class="wsite-logo">' +
            '<a href="index.html" class="site-logo-link">' +
              '<span class="logo-mark" aria-hidden="true">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 2h7" /><path d="M10 2v6.5L4.5 19a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 8.5V2" /><path d="M7 16h10" /></svg>' +
              "</span>" +
              '<span id="wsite-title" class="site-logo-lockup">' +
                '<span class="site-logo-main">The Ahmed <span class="site-logo-accent">Lab</span></span>' +
                '<span class="site-logo-sub">USC Alfred E. Mann School of Pharmacy and Pharmaceutical Sciences</span>' +
              "</span>" +
            "</a>" +
          "</span>" +
        "</div>" +
        '<a class="hamburger" aria-label="Menu" href="#"><span></span></a>' +
        '<div class="menu">' +
          '<div class="container">' +
            '<div class="search"></div>' +
            '<nav aria-label="Primary"><ul class="wsite-menu-default">' + menuItems(activeKey) + "</ul></nav>" +
          "</div>" +
        "</div>" +
      "</div>"
    );
  }

  function navMobile(activeKey) {
    return (
      '<div class="navmobile-wrapper">' +
        '<nav id="navmobile" class="nav" aria-label="Mobile">' +
          '<ul class="wsite-menu-default">' + menuItems(activeKey) + "</ul>" +
        "</nav>" +
      "</div>"
    );
  }

  function footer() {
    return (
      '<div class="wsite-section-wrap">' +
        '<div class="wsite-section wsite-body-section site-footer">' +
          '<div class="wsite-section-content">' +
            '<div class="wsite-section-elements">' +
              '<div class="site-container">' +
                '<div class="site-footer__grid">' +
                  '<div class="site-footer__col site-footer__col--brand">' +
                    '<span class="site-footer__brand">The Ahmed Lab</span>' +
                    '<p class="site-footer__tagline">Designing the next generation of small-molecule therapeutics at the USC Alfred E. Mann School of Pharmacy and Pharmaceutical Sciences.</p>' +
                  "</div>" +
                  '<div class="site-footer__col">' +
                    '<span class="site-footer__heading">Quick Links</span>' +
                    '<nav class="site-footer__nav" aria-label="Footer">' +
                      '<a href="index.html">Home</a>' +
                      '<a href="members.html">Team</a>' +
                      '<a href="updates.html">Updates</a>' +
                      '<a href="contact.html">Contact</a>' +
                    "</nav>" +
                  "</div>" +
                  '<div class="site-footer__col">' +
                    '<span class="site-footer__heading">Contact</span>' +
                    '<address class="site-footer__address">' +
                      'John Stauffer Pharmaceutical Sciences Center (PSC)<br />' +
                      '1985 Zonal Avenue, PSC-B-4<br />' +
                      'Los Angeles, CA 90089<br />' +
                      '<a href="mailto:ahmedsye@usc.edu">ahmedsye@usc.edu</a><br />' +
                      'Phone: 213-740-7618' +
                    "</address>" +
                  "</div>" +
                "</div>" +
                '<div class="site-footer__copyright">&copy; ' + new Date().getFullYear() + ' University of Southern California HSC</div>' +
              "</div>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>"
    );
  }

  // Replaces the placeholder element (identified by id) with the given
  // markup, in place, synchronously — called from an inline <script> that
  // sits immediately after the placeholder so there's no flash of missing
  // header/footer/nav while the page loads.
  function mount(placeholderId, html) {
    var el = document.getElementById(placeholderId);
    if (el) el.outerHTML = html;
  }

  return {
    navWrap: navWrap,
    navMobile: navMobile,
    footer: footer,
    mount: mount
  };
})();
