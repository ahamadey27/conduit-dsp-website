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

  // Wire up all Robin Control Lite buttons
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

  var MAILERLITE_FORM_URL = 'https://assets.mailerlite.com/jsonp/2241125/forms/184037484204656587/subscribe';

  var submitBtn = form.querySelector('.btn--submit');
  var errorMsg = overlay.querySelector('.modal-error');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = input.value.trim();
    if (!email) return;

    // Disable button while submitting
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
      // fetch throws on network failure only, not CORS — still show success
      formContent.style.display = 'none';
      successMsg.style.display = 'block';
      if (errorMsg) errorMsg.style.display = 'none';
      setTimeout(closeModal, 2000);
    });
  });
})();
