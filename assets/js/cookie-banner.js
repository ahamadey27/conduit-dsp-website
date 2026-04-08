(function () {
  if (localStorage.getItem('cookie-consent')) return;

  var banner = document.getElementById('cookie-banner');
  if (!banner) return;

  banner.classList.remove('hidden');

  document.getElementById('cookie-accept').addEventListener('click', function () {
    localStorage.setItem('cookie-consent', 'accepted');
    banner.classList.add('hidden');
  });
})();
