(function () {
  var analyticsId = 'G-JFCXCLVEHM';
  var consentKey = 'cookie-consent';

  function loadAnalytics() {
    if (window.conduitAnalyticsLoaded) return;
    window.conduitAnalyticsLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', analyticsId, { anonymize_ip: true });

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + analyticsId;
    document.head.appendChild(script);
  }

  function clearAnalyticsCookies() {
    document.cookie.split(';').forEach(function (cookie) {
      var name = cookie.split('=')[0].trim();
      if (name.indexOf('_ga') !== 0) return;

      document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax';
      document.cookie = name + '=; Max-Age=0; path=/; domain=.' + window.location.hostname + '; SameSite=Lax';
    });
  }

  var resetButton = document.getElementById('privacy-reset-analytics');
  if (resetButton) {
    resetButton.addEventListener('click', function () {
      try { localStorage.removeItem(consentKey); } catch (_) { /* Storage can be blocked. */ }
      clearAnalyticsCookies();
      window.location.reload();
    });
  }

  var consent;
  try { consent = localStorage.getItem(consentKey); } catch (_) { /* Ask for this visit. */ }
  if (consent === 'accepted') {
    loadAnalytics();
    return;
  }

  if (consent === 'rejected') return;

  var banner = document.getElementById('cookie-banner');
  var acceptButton = document.getElementById('cookie-accept');
  var rejectButton = document.getElementById('cookie-reject');
  if (!banner || !acceptButton || !rejectButton) return;

  function savePreference(value) {
    try { localStorage.setItem(consentKey, value); } catch (_) { /* Honor the choice for this visit. */ }
    banner.classList.add('hidden');
    updateBannerSpace();
    // Dismissing a focused control must not leave focus in hidden content.
    document.getElementById('main-content').focus({ preventScroll: true });
  }

  function updateBannerSpace() {
    var fixed = getComputedStyle(banner).position === 'fixed';
    var height = fixed && !banner.classList.contains('hidden') ? banner.getBoundingClientRect().height : 0;
    document.documentElement.style.setProperty('--cookie-banner-height', height + 'px');
  }
  banner.classList.remove('hidden');
  updateBannerSpace();
  if (window.ResizeObserver) new ResizeObserver(updateBannerSpace).observe(banner);
  window.addEventListener('resize', updateBannerSpace);

  document.addEventListener('focusin', function (event) {
    var target = event.target;
    var header = document.querySelector('.site-header');
    // Moonbase manages focus inside its own dialogs.
    if (!target.closest('.main-content, .site-footer') || target.id === 'main-content') return;
    var rect = target.getBoundingClientRect();
    var bottom = banner.classList.contains('hidden') || getComputedStyle(banner).position !== 'fixed'
      ? window.innerHeight : banner.getBoundingClientRect().top;
    if (rect.top < header.getBoundingClientRect().bottom || rect.bottom > bottom) {
      target.scrollIntoView({ block: 'center', behavior: 'instant' });
    }
  });

  acceptButton.addEventListener('click', function () {
    savePreference('accepted');
    loadAnalytics();
  });

  rejectButton.addEventListener('click', function () {
    savePreference('rejected');
  });
})();
