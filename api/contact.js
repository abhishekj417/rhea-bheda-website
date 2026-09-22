const allowedAreas = new Set([
  'Clarity and direction',
  'Emotional patterns',
  'Boundaries and confidence',
  'Personal growth'
]);

const allowedOrigins = new Set([
  'https://coachrheabheda.com',
  'https://www.coachrheabheda.com'
]);

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength + 1) : '';
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const ready = process.env.CONTACT_FORM_ENABLED === 'true' &&
    Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);

  if (req.method === 'GET') return res.status(200).json({ ready });
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  if (!ready) return res.status(503).json({ error: 'Enquiries are not open yet.' });

  const origin = req.headers.origin;
  if (!allowedOrigins.has(origin)) {
    return res.status(403).json({ error: 'Please submit from the website.' });
  }
  if (!String(req.headers['content-type'] || '').startsWith('application/json')) {
    return res.status(415).json({ error: 'Unsupported request format.' });
  }
  if (Number(req.headers['content-length'] || 0) > 12000) {
    return res.status(413).json({ error: 'Your message is too long.' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Please complete the form.' });
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Please complete the form.' });
  }
  if (body.website) return res.status(200).json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 254);
  const area = clean(body.area, 80);
  const message = clean(body.message, 6000);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || name.length > 120 || !emailValid || email.length > 254 ||
      !allowedAreas.has(area) || !message || message.length > 6000) {
    return res.status(400).json({ error: 'Please check all four fields and try again.' });
  }

  const text = `New coaching enquiry\n\nName: ${name}\nEmail: ${email}\nSupport area: ${area}\n\nMessage:\n${message}`;
  const html = `<h2>New coaching enquiry</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p>` +
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` +
    `<p><strong>Support area:</strong> ${escapeHtml(area)}</p>` +
    `<p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Coach Rhea Bheda <enquiries@coachrheabheda.com>',
        to: [process.env.CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `New coaching enquiry: ${area}`,
        text,
        html
      })
    });
    if (!response.ok) {
      console.error('Resend rejected contact enquiry', response.status);
      return res.status(502).json({ error: 'Your enquiry could not be sent. Please try again later.' });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact email request failed', error);
    return res.status(502).json({ error: 'Your enquiry could not be sent. Please try again later.' });
  }
}
