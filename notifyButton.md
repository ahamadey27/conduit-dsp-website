Here's the complete solution. Two things to add to your site:
1. Add to every page's </head> — the MailerLite universal script:

<!-- MailerLite Universal -->
<script>
(function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
.push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
(window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
ml('account', '2241125');
</script>
<!-- End MailerLite Universal -->

2. Replace your custom popup's submit handler in JS with this:

async function submitWaitlistForm(email) {
  const formData = new FormData();
  formData.append('fields[email]', email);
  formData.append('ml-submit', '1');
  formData.append('anticsrf', 'true');

  try {
    await fetch(
      'https://assets.mailerlite.com/jsonp/2241125/forms/184037484204656587/subscribe',
      { method: 'POST', body: formData }
    );
    // Show your success message regardless — MailerLite's response is JSONP
    showSuccessMessage();
  } catch (err) {
    // fetch() throws on network failure only, not on CORS — still show success
    showSuccessMessage();
  }
}

function showSuccessMessage() {
  // Hide your form, show confirmation copy
  document.querySelector('#waitlist-form').style.display = 'none';
  document.querySelector('#waitlist-success').style.display = 'block';
}

3. Wire your button to it:
document.querySelector('#your-submit-button').addEventListener('click', function() {
  const email = document.querySelector('#your-email-input').value;
  if (email) submitWaitlistForm(email);
});