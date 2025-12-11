# MCP-ready
# MCP-ready

Fresh, minimal landing page with:
- Static `index.html` (no build step)
- Serverless `api/lead.js` endpoint
- Vercel-ready defaults

## Run locally
```bash
npm install -g vercel
vercel dev
```

## Deploy on Vercel
- Framework preset: **Other**
- Root Directory: `./`
- Build command: _leave empty_ (no build)
- Output directory: `./`
- Environment Variables (Production + Preview):
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE`
  - `SUPABASE_TABLE` (optional, defaults to `leads`)
  - `EMAIL_WEBHOOK_URL` (optional)

## API contract
- `POST /api/lead`
  - Body: JSON `{ name, email, domain, notes }`
  - Stores in Supabase table `SUPABASE_TABLE` when env vars are present.
  - If Supabase envs are missing, returns `{ ok: true, stored: false }` so the form still works for demos.
  - If `EMAIL_WEBHOOK_URL` is set, it also sends `{ type: "lead", payload }` to that webhook.
