document.addEventListener('DOMContentLoaded', function () {
  var dropdown = document.querySelector('.nav-item--has-dropdown');
  var navToggle = document.querySelector('.nav-toggle');
  var siteNav = document.querySelector('.site-nav');
  var closeTimeout;

  if (dropdown) {
    // Desktop: hover open/close with delay
    dropdown.addEventListener('mouseenter', function () {
      clearTimeout(closeTimeout);
      dropdown.classList.add('nav-item--open');
    });

    dropdown.addEventListener('mouseleave', function () {
      closeTimeout = setTimeout(function () {
        dropdown.classList.remove('nav-item--open');
      }, 100);
    });

    // Keyboard support
    var trigger = dropdown.querySelector(':scope > a');
    if (trigger) {
      trigger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          dropdown.classList.toggle('nav-item--open');
        }
        if (e.key === 'Escape') {
          dropdown.classList.remove('nav-item--open');
        }
      });
    }
  }

  // Close dropdown on outside click
  document.addEventListener('click', function (e) {
    if (dropdown && !dropdown.contains(e.target)) {
      dropdown.classList.remove('nav-item--open');
    }
  });

  // Mobile hamburger toggle
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      siteNav.classList.toggle('site-nav--open');
    });
  }
});
