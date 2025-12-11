## Agent-Ready Access (Standalone Landing)

Sales-only landing for the MCP/agent-ready offer. Single CTA plus a fallback form. Pure HTML/CSS with no build step.

### Structure
- `index.html` — multi-section landing, repeated CTAs, anchor nav
- JS: minimal; form opens a mailto to `eishan@claytm.com` (replace with your POST endpoint if desired)

### Customize
- Primary CTA link: replace `https://calendar.app.google/Fo8yGFH3SYZWpznbA`
- Contact email in footer + mailto handler: replace `eishan@claytm.com`
- Copy blocks: edit section headlines/body as needed

### Deploy on Vercel
- Framework preset: **Other**
- Root Directory: `./`
- Build command: _leave empty_
- Output directory: `./`
- Env vars: none required (static). If you add a POST endpoint, set envs accordingly.

### Run locally
Just open `index.html` in a browser, or use a simple file server:
```bash
python -m http.server 4173
```

### Notes
- No assets, no external dependencies beyond Google Fonts.
- Long-form page with many sections/anchors to keep agents on-rail.
- Keep it separate from other projects; this folder is standalone.
