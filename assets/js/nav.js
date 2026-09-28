document.addEventListener('DOMContentLoaded', function () {
  var dropdown = document.querySelector('.nav-item--has-dropdown');
  var navToggle = document.querySelector('.nav-toggle');
  var siteNav = document.querySelector('.site-nav');
  var closeTimeout;

  function closeNavigation() {
    if (!siteNav || !navToggle) return;
    siteNav.classList.remove('site-nav--open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (dropdown) {
    var trigger = dropdown.querySelector(':scope > a');

    dropdown.addEventListener('mouseenter', function () {
      clearTimeout(closeTimeout);
      dropdown.classList.add('nav-item--open');
    });
    dropdown.addEventListener('mouseleave', function () {
      closeTimeout = setTimeout(function () {
        if (!dropdown.contains(document.activeElement)) {
          dropdown.classList.remove('nav-item--open');
        }
      }, 100);
    });
    dropdown.addEventListener('focusin', function () {
      dropdown.classList.add('nav-item--open');
    });
    dropdown.addEventListener('focusout', function (event) {
      if (!dropdown.contains(event.relatedTarget)) {
        dropdown.classList.remove('nav-item--open');
      }
    });
    if (trigger) {
      trigger.addEventListener('keydown', function (event) {
        // Enter remains a normal link to the complete plugin listing.
        if (event.key === 'ArrowDown' || event.key === ' ') {
          event.preventDefault();
          dropdown.classList.add('nav-item--open');
          dropdown.querySelector('.dropdown-menu a').focus();
        }
      });
    }
  }

  document.addEventListener('click', function (event) {
    if (dropdown && !dropdown.contains(event.target)) {
      dropdown.classList.remove('nav-item--open');
    }
    if (siteNav && navToggle && !siteNav.contains(event.target) && !navToggle.contains(event.target)) {
      closeNavigation();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    if (siteNav && siteNav.classList.contains('site-nav--open')) {
      closeNavigation();
      navToggle.focus();
    } else if (dropdown && dropdown.contains(document.activeElement)) {
      dropdown.querySelector(':scope > a').focus();
    }
    if (dropdown) dropdown.classList.remove('nav-item--open');
  });

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = siteNav.classList.toggle('site-nav--open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    // A mobile menu must not remain open after switching viewport modes.
    window.matchMedia('(max-width: 768px)').addEventListener('change', closeNavigation);
  }
});
