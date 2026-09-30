(function () {
  var form = document.getElementById('newsletter-form');
  if (!form) return;
  var status = document.getElementById('newsletter-status');
  var button = form.querySelector('button');
  var input = form.querySelector('input[type="email"]');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.reportValidity() || button.disabled) return;
    button.disabled = true;
    status.className = '';
    status.textContent = 'Subscribing…';
    fetch('https://assets.mailerlite.com/jsonp/2241125/forms/184331636279609031/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'fields[email]=' + encodeURIComponent(input.value.trim())
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Subscribe failed');
        form.reset();
        status.className = 'newsletter-success';
        status.textContent = 'Thanks for subscribing!';
      })
      .catch(function () {
        status.className = 'newsletter-error';
        status.textContent = 'Could not subscribe right now. Please try again.';
      })
      .finally(function () { button.disabled = false; });
  });
})();
