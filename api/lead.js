export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE,
    SUPABASE_TABLE = 'leads',
    EMAIL_WEBHOOK_URL = '',
  } = process.env;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
    return res.status(500).json({ error: 'Supabase env not set' });
  }

  try {
    const payload = req.body || {};
    // Store lead in Supabase
    const supabaseRes = await fetch(`${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_SERVICE_ROLE,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
        Prefer: 'return=representation',
      },
      body: JSON.stringify({ ...payload, stripe_status: 'failed_or_pending' }),
    });

    if (!supabaseRes.ok) {
      const text = await supabaseRes.text();
      throw new Error(`Supabase error: ${supabaseRes.status} ${text}`);
    }

    // Optional: email notification
    if (EMAIL_WEBHOOK_URL) {
      await fetch(EMAIL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'lead', payload }),
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
