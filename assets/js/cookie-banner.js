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
      localStorage.removeItem(consentKey);
      clearAnalyticsCookies();
      window.location.reload();
    });
  }

  var consent = localStorage.getItem(consentKey);
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
    localStorage.setItem(consentKey, value);
    banner.classList.add('hidden');
  }

  banner.classList.remove('hidden');

  acceptButton.addEventListener('click', function () {
    savePreference('accepted');
    loadAnalytics();
  });

  rejectButton.addEventListener('click', function () {
    savePreference('rejected');
  });
})();
