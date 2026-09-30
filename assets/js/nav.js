document.addEventListener('DOMContentLoaded', function () {
  var dropdown = document.querySelector('.nav-item--has-dropdown');
  var trigger = document.querySelector('.nav-dropdown-toggle');
  var menu = document.getElementById('plugin-menu');
  var navToggle = document.querySelector('.nav-toggle');
  var siteNav = document.getElementById('site-nav');
  var mobile = window.matchMedia('(max-width: 768px)');
  var closeTimeout;
  if (!dropdown || !trigger || !menu || !navToggle || !siteNav) return;
  document.documentElement.classList.add('nav-ready');

  function setDropdown(open) {
    clearTimeout(closeTimeout);
    trigger.setAttribute('aria-expanded', String(open));
    trigger.setAttribute('aria-label', open ? 'Hide plugin links' : 'Show plugin links');
    dropdown.classList.toggle('nav-item--open', open);
    menu.hidden = !open;
  }
  function closeNavigation(restoreFocus) {
    if (restoreFocus && mobile.matches && siteNav.contains(document.activeElement)) navToggle.focus();
    siteNav.classList.remove('site-nav--open');
    navToggle.setAttribute('aria-expanded', 'false');
    setDropdown(false);
  }
  trigger.addEventListener('click', function () {
    setDropdown(trigger.getAttribute('aria-expanded') !== 'true');
  });
  dropdown.addEventListener('mouseenter', function () {
    if (!mobile.matches) setDropdown(true);
  });
  dropdown.addEventListener('mouseleave', function () {
    closeTimeout = setTimeout(function () {
      if (!dropdown.contains(document.activeElement)) setDropdown(false);
    }, 100);
  });
  dropdown.addEventListener('focusout', function (event) {
    if (!dropdown.contains(event.relatedTarget)) setDropdown(false);
  });
  dropdown.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowDown' && (event.target === trigger || event.target === dropdown.querySelector(':scope > a'))) {
      event.preventDefault();
      setDropdown(true);
      menu.querySelector('a').focus();
    }
  });
  document.addEventListener('click', function (event) {
    if (!dropdown.contains(event.target)) setDropdown(false);
    if (!siteNav.contains(event.target) && !navToggle.contains(event.target)) closeNavigation(true);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    if (!menu.hidden) {
      if (dropdown.contains(document.activeElement)) trigger.focus();
      setDropdown(false);
    } else if (siteNav.classList.contains('site-nav--open')) {
      closeNavigation(true);
    }
  });
  siteNav.addEventListener('focusout', function (event) {
    if (mobile.matches && !siteNav.contains(event.relatedTarget) && event.relatedTarget !== navToggle) closeNavigation(false);
  });
  navToggle.addEventListener('click', function () {
    var open = !siteNav.classList.contains('site-nav--open');
    siteNav.classList.toggle('site-nav--open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    if (open) siteNav.querySelector('a').focus();
    else setDropdown(false);
  });
  mobile.addEventListener('change', function () {
    if (!mobile.matches && document.activeElement === navToggle) siteNav.querySelector('a').focus();
    closeNavigation(true);
  });
  setDropdown(false);
});
