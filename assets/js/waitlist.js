(function () {
  var MAILERLITE_FORM_URL = 'https://assets.mailerlite.com/jsonp/2241125/forms/197334966677275966/subscribe';

  document.querySelectorAll('[data-waitlist-form]').forEach(function (form) {
    var input = form.querySelector('input[type="email"]');
    var submitBtn = form.querySelector('button[type="submit"]');
    var status = form.querySelector('[data-waitlist-status]');

    if (!input || !submitBtn || !status) return;

    var defaultButtonText = submitBtn.textContent;

    function setStatus(message, type) {
      status.textContent = message;
      status.classList.remove('waitlist-form__status--success', 'waitlist-form__status--error');
      status.classList.add('waitlist-form__status--' + type);
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        input.reportValidity();
        return;
      }

      if (form.dataset.submitting === 'true') return;

      form.dataset.submitting = 'true';
      submitBtn.disabled = true;
      submitBtn.textContent = 'Joining...';
      setStatus('Joining the waitlist…', 'pending');

      var formData = new FormData();
      formData.append('fields[email]', input.value.trim());
      formData.append('ml-submit', '1');
      formData.append('anticsrf', 'true');

      fetch(MAILERLITE_FORM_URL, {
        method: 'POST',
        body: formData
      })
        .then(function (response) {
          if (!response.ok) throw new Error('Waitlist signup failed');
          form.reset();
          setStatus('Almost there—check your email to confirm your spot.', 'success');
        })
        .catch(function () {
          setStatus('Couldn\u2019t join right now. Please try again.', 'error');
        })
        .finally(function () {
          form.dataset.submitting = 'false';
          submitBtn.disabled = false;
          submitBtn.textContent = defaultButtonText;
        });
    });
  });
})();
