# pauloes — portfolio

Personal portfolio for **Pauloes Berhe** — Technical Product Manager & Founder.
A light, recruiter-friendly Next.js site with a living-blockchain design language:
parallax network canvases that react to cursor and scroll, a scroll-driven career
story told as a growing chain, and a portfolio of shipped sites with real
screenshots and released-feature lists.

**Live:** [pauloes.com](https://pauloes.com)

## Stack

- **Next.js 14** (App Router) · React 18
- Hand-rolled CSS — light neutral theme (steel blue `#35618E` / green `#2F7D45` accents), no framework
- Zero-dependency canvas animations (network parallax, scroll-scrubbed story chain) and SVG charts
- **Resend** for the contact form (`/api/contact`)
- Deployed on **Vercel**, DNS on **Cloudflare**

## Pages

- `/` — hero, stats, role cards with company logos, timeline, credentials
- `/story` — twelve years scrolled as a blockchain: each chapter fills and seals a block
- `/portfolio` — sixteen properties across four arenas, framed screenshots + features released
- `/roles/[slug]` — role deep-dives with outcome charts and grayscale partner/vendor strips
- `/contact` — Resend-powered contact form

## Local development

```bash
npm install
cp .env.example .env.local   # add your RESEND_API_KEY
npm run dev                  # http://localhost:3000 (or -- -p 3005 if 3000 is busy)
```

## Structure

```
app/
  page.js               # home
  story/page.js         # scroll journey (StoryChainCanvas + StoryJourney)
  portfolio/page.js     # sites shipped (SiteCard grid)
  roles/[slug]/page.js  # role deep-dives, charts, vendor/partner strips
  api/contact/route.js  # serverless email send
components/
  ChainCanvas.jsx       # per-page animated background (parallax, cursor, tx particles)
  StoryChainCanvas.jsx  # /story scroll-scrubbed chain
  Interactive.jsx       # magnetic buttons, card tilt, cursor spotlight
  CompanyMark.jsx       # real company logos (Badge.jsx monogram fallback)
  SiteCard.jsx          # portfolio site cards
  Charts.jsx            # dependency-free SVG outcome charts
lib/data.js             # ALL site content — roles, story, portfolio, vendors — edit here
public/logos/           # company, vendor, university & partner logos
public/portfolio/       # site screenshots
```

## Deploying

See [DEPLOY.md](DEPLOY.md) — GitHub → Vercel → Cloudflare → Resend, ~20 minutes.

## License

[MIT](LICENSE) © 2026 Pauloes Berhe
