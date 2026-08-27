# pauloes — portfolio

Personal portfolio for **Pauloes Berhe** — Technical Product Manager & Founder.
Dark blockchain-themed Next.js site: animated block/network canvas, role deep-dive
pages, evidence-backed outcome charts, and a Resend-powered contact form.

## Stack

- **Next.js 14** (App Router) · React 18
- Hand-rolled CSS (no framework) — dark theme, blue `#3987E5` / green `#0CA30C` accents
- Dependency-free SVG charts (validated dark-surface palette)
- **Resend** for the contact form (`/api/contact`)
- Deployed on **Vercel**, DNS on **Cloudflare**

## Local development

```bash
npm install
cp .env.example .env.local   # add your RESEND_API_KEY
npm run dev                  # http://localhost:3000
```

## Structure

```
app/
  page.js               # home: hero, stats, ventures, track record, timeline
  roles/[slug]/page.js  # deep-dive pages (btechs, bitcoin-innovation-hub, bloomberg, city-university)
  contact/page.js       # contact + Resend form
  api/contact/route.js  # serverless email send
components/             # ChainCanvas (animated bg), Charts, Nav, Footer, Reveal, ContactForm
lib/data.js             # ALL site content — edit facts here, nothing is hardcoded in pages
```

## Deploying (see DEPLOY.md for the full walkthrough)

1. Push this repo to `github.com/pauloes-btechs/<repo>`.
2. Import it in Vercel; set `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`.
3. Point your domain at Vercel via Cloudflare DNS (CNAME, **DNS-only/gray cloud**).
4. Update `site.url` in `lib/data.js` to the real domain.
