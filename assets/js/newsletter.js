(function () {
  'use strict';
  var form = document.getElementById('newsletter-form');
  if (!form) return;
  var status = document.getElementById('newsletter-status');
  var button = form.querySelector('button[type="submit"]');
  var root = document.documentElement;

  // Moonbase owns submission, group membership, confirmation and inline feedback.
  // Keep the form disabled until the shared storefront is ready, including when
  // JavaScript or the CDN fails, so email addresses cannot enter a page URL.
  function updateAvailability() {
    var state = root.dataset.storefront;
    if (state === 'ready') {
      button.disabled = false;
      status.textContent = '';
      observer.disconnect();
    } else if (state === 'unavailable') {
      form.dataset.moonbaseState = 'error';
      status.textContent = 'Newsletter signup is unavailable right now. Please reload to try again.';
      observer.disconnect();
    }
  }
  var observer = new MutationObserver(updateAvailability);
  observer.observe(root, {
    attributes: true,
    attributeFilter: ['data-storefront']
  });
  updateAvailability();
})();
