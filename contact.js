(() => {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector('[data-form-status]');
  const setStatus = (message, state = '') => { status.textContent = message; status.dataset.state = state; };
  fetch('/api/contact', { headers: { Accept: 'application/json' } })
    .then(response => response.ok ? response.json() : Promise.reject())
    .then(({ ready }) => {
      button.disabled = !ready;
      button.textContent = ready ? 'Request my Clarity Call' : 'Enquiries opening soon';
      setStatus(ready ? 'Your request will be emailed securely to Coach Rhea Bheda.' : 'Please message Rhea on WhatsApp or email her directly.', ready ? 'ready' : 'unavailable');
    })
    .catch(() => { button.textContent = 'Form temporarily unavailable'; setStatus('Please message Rhea on WhatsApp or email her directly.', 'error'); });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity() || button.disabled) return;
    button.disabled = true; button.textContent = 'Sending…'; setStatus('Sending your enquiry.', 'sending');
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Your enquiry could not be sent.');
      form.reset(); button.textContent = 'Request sent'; setStatus('Thank you. Rhea will be in touch to arrange your Clarity Call.', 'success');
    } catch (error) {
      button.disabled = false; button.textContent = 'Try again'; setStatus(error.message || 'Your enquiry could not be sent. Please try again later.', 'error');
    }
  });
})();
