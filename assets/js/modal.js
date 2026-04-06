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

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // UI stub — replace with real submission later
    formContent.style.display = 'none';
    successMsg.style.display = 'block';
    setTimeout(closeModal, 2000);
  });
})();
