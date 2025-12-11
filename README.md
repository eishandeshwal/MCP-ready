## MCP Access

Clean MCP-ready landing page:
- Static `index.html`
- Serverless `api/lead.js`
- No build step required

### Local dev
```bash
npm install -g vercel
vercel dev
```

### Deploy to Vercel
- Framework preset: **Other**
- Root Directory: `./`
- Build command: leave empty
- Output directory: `./`
- Env vars (Production + Preview):
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE`
  - `SUPABASE_TABLE` (optional, default `leads`)
  - `EMAIL_WEBHOOK_URL` (optional)

### API
- `POST /api/lead` with JSON `{ name, email, domain, notes }`
- Stores to Supabase table when `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE` are set.
- If envs are missing, returns `{ ok: true, stored: false }` to keep the flow usable in previews.
- If `EMAIL_WEBHOOK_URL` is set, sends `{ type: "lead", payload }` to that webhook.
