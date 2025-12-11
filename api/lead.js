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

  const payload = req.body || {};
  const record = {
    name: payload.name || '',
    email: payload.email || '',
    domain: payload.domain || '',
    notes: payload.notes || '',
    created_at: new Date().toISOString(),
  };

  try {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
      // Still acknowledge receipt for demo/preview environments.
      return res.status(200).json({ ok: true, stored: false, reason: 'Supabase env not set' });
    }

    const supabaseRes = await fetch(`${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_SERVICE_ROLE,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
        Prefer: 'return=representation',
      },
      body: JSON.stringify(record),
    });

    if (!supabaseRes.ok) {
      const text = await supabaseRes.text();
      throw new Error(`Supabase error: ${supabaseRes.status} ${text}`);
    }

    if (EMAIL_WEBHOOK_URL) {
      await fetch(EMAIL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'lead', payload: record }),
      });
    }

    return res.status(200).json({ ok: true, stored: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
