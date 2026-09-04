# Deploying this site — GitHub → Vercel → Cloudflare → Resend

A one-time, ~20-minute walkthrough. Everything runs from your Mac's terminal in
this folder.

## 1 · Push to GitHub (`pauloes-btechs`)

The repo is already `git init`-ed with an initial commit. Create the empty repo
on GitHub first — github.com/new → owner **pauloes-btechs**, name e.g.
**portfolio**, private or public, **no** README/gitignore — then:

```bash
cd /Volumes/<your-ssd>/pauloes
git remote add origin git@github.com:pauloes-btechs/portfolio.git   # or the https URL
git push -u origin main
```

## 2 · Vercel

1. vercel.com → **Add New → Project** → import `pauloes-btechs/portfolio`.
2. Framework preset auto-detects **Next.js** — no build settings needed.
3. Before the first deploy, add Environment Variables (all three environments):
   - `RESEND_API_KEY` — from resend.com → API Keys
   - `CONTACT_TO` — where messages land (e.g. `pauloes@btechs.io`)
   - `CONTACT_FROM` — e.g. `Portfolio <hello@pauloes.com>` (domain must be
     verified in Resend first; until then you can use `onboarding@resend.dev`)
4. Deploy. You'll get a `*.vercel.app` URL immediately.

## 3 · Your domain (Cloudflare)

1. Vercel → Project → **Settings → Domains** → add `pauloes.com` (and `www.pauloes.com`).
   Vercel shows the target, currently a CNAME to `cname.vercel-dns.com`.
2. Cloudflare dashboard → your domain → **DNS**:
   - `CNAME  @    cname.vercel-dns.com` (or the A record Vercel specifies for apex)
   - `CNAME  www  cname.vercel-dns.com`
   - Set both records to **DNS only (gray cloud)** — Vercel terminates TLS;
     proxying through Cloudflare's orange cloud causes redirect loops.
3. Wait for Vercel's domain check to go green.

## 4 · Resend

1. resend.com → **Domains → Add Domain** → your domain.
2. Add the DKIM/SPF records Resend lists into Cloudflare DNS (DNS-only).
3. Once verified, set `CONTACT_FROM` to an address on that domain and redeploy.

## 5 · Last touch

In `lib/data.js`, confirm `site.url` is `https://pauloes.com` (already set) (fixes canonical
URLs and OpenGraph), commit, push — Vercel redeploys automatically on every push
to `main`.
