(function () {
  var video = document.getElementById('hero-video');
  if (!video) return;

  var src = video.getAttribute('data-src');
  var minWidthQuery = window.matchMedia('(min-width: 901px)');

  if (minWidthQuery.matches) {
    video.addEventListener('playing', function () {
      video.playbackRate = 0.5;
    });
    video.src = src;
    video.playbackRate = 0.5;
    video.play().catch(function () {});
  }
})();
