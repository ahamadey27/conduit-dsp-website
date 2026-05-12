/* ============================================================
 * Pre-launch email capture modal — CURRENTLY DISABLED.
 *
 * What it does:
 *   Intercepts clicks on .btn--add-cart[data-product-id="..."]
 *   buttons, opens an overlay with an email field, and POSTs the
 *   address to a MailerLite hosted form (no backend needed).
 *   Used as a "Notify me when it's ready" capture while a product
 *   is still pre-launch.
 *
 * Original use:
 *   Robin Control Lite, before it became a real downloadable
 *   product. Once RCL went live, those buttons were repurposed
 *   as real Add-to-Cart actions and this script was retired.
 *
 * REUSE FOR ROBIN CONTROL (the paid version):
 *   When Robin Control enters its own pre-launch / waitlist
 *   phase, re-enable this modal for its buttons:
 *
 *   1. Uncomment the IIFE below.
 *   2. Change the button selector from
 *        data-product-id="robin-control-lite"
 *      to
 *        data-product-id="robin-control"
 *   3. Replace MAILERLITE_FORM_URL with the Robin Control
 *      mailing list's MailerLite form URL. Get the form ID from
 *      MailerLite → Forms → (new RC form) → Embed URL. The
 *      account ID (2241125) stays the same.
 *   4. Un-comment the #email-modal HTML block on each page that
 *      shows the Add-to-Cart button (see commented-out block in
 *      index.html, plugins/index.html, plugins/robin-control/…).
 *   5. Un-comment the `<script src="/assets/js/modal.js">` tag
 *      on those same pages.
 *   6. In cart.js, re-add the early-return skip so the modal
 *      handles those button clicks instead of cart.js:
 *        if (btn.getAttribute('data-product-id') === 'robin-control') return;
 *
 * Don't delete this file — it is the working pre-launch template.
 * ============================================================ */

/*
(function () {
  var overlay = document.getElementById('email-modal');
  if (!overlay) return;

  var closeBtn = overlay.querySelector('.modal-close');
  var form = overlay.querySelector('.modal-form');
  var input = overlay.querySelector('input[type="email"]');
  var formContent = overlay.querySelector('.modal-form');
  var successMsg = overlay.querySelector('.modal-success');

  function openModal() {
    overlay.classList.add('modal--open');
    input.value = '';
    formContent.style.display = '';
    successMsg.style.display = 'none';
    setTimeout(function () { input.focus(); }, 100);
  }

  function closeModal() {
    overlay.classList.remove('modal--open');
  }

  // Target the pre-launch product's Add-to-Cart buttons.
  // Change the data-product-id below when reusing for Robin Control.
  document.querySelectorAll('.btn--add-cart[data-product-id="robin-control-lite"]').forEach(function (btn) {
    btn.removeEventListener('click', btn._cartHandler);
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      openModal();
    });
  });

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('modal--open')) closeModal();
  });

  // MailerLite form URL — replace the form ID for each new product's list.
  // Account ID 2241125 / form ID 184037484204656587 was the RCL pre-launch list.
  var MAILERLITE_FORM_URL = 'https://assets.mailerlite.com/jsonp/2241125/forms/184037484204656587/subscribe';

  var submitBtn = form.querySelector('.btn--submit');
  var errorMsg = overlay.querySelector('.modal-error');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = input.value.trim();
    if (!email) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    if (errorMsg) errorMsg.style.display = 'none';

    var formData = new FormData();
    formData.append('fields[email]', email);
    formData.append('ml-submit', '1');
    formData.append('anticsrf', 'true');

    fetch(MAILERLITE_FORM_URL, {
      method: 'POST',
      body: formData
    }).then(function () {
      formContent.style.display = 'none';
      successMsg.style.display = 'block';
      if (errorMsg) errorMsg.style.display = 'none';
      setTimeout(closeModal, 2000);
    }).catch(function () {
      // fetch only throws on network failure, not CORS — still show success.
      formContent.style.display = 'none';
      successMsg.style.display = 'block';
      if (errorMsg) errorMsg.style.display = 'none';
      setTimeout(closeModal, 2000);
    });
  });
})();
*/
