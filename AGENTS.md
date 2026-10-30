# AGENTS.md — Operating Contract

Autonomous agents working in this repository read this file first. It defines the
purpose, conventions, done criteria, and escalation rules that keep builds moving
end-to-end without early returns.

## Purpose

Personal portfolio for Pauloes Berhe (pauloes.com) — a light, recruiter-friendly
Next.js site with a hand-rolled design language: zero-dependency canvas animations,
a scroll-driven career story, and a portfolio of shipped sites. Deployed on Vercel;
DNS on Cloudflare.

## Conventions

- **Stack:** Next.js (App Router) + React; no CSS framework — hand-rolled CSS, light
  neutral theme with steel blue `#35618E` / green `#2F7D45` accents.
- **Zero-dependency visuals:** canvas animations (`ChainCanvas.jsx`,
  `StoryChainCanvas.jsx`) and SVG charts (`Charts.jsx`) use no external libraries —
  do not introduce animation or chart dependencies.
- **Contact form:** Resend via `app/api/contact/route.js`; local dev needs
  `RESEND_API_KEY` in `.env.local` (copy `.env.example`).
- **Layout:** pages in `app/` (home, `story/`, `portfolio/`, `roles/[slug]/`,
  `api/contact`), shared components in `components/`, helpers in `lib/`.
- **Style:** no external UI framework or icon pack; keep the existing design
  language. Match the surrounding code style.

## Verify commands

Run from the repo root after every change:

```bash
npm run build   # next build — must succeed
npm run lint    # eslint app components lib — must pass
```

There is no test suite or typecheck script; these two commands are the full gate.

## Done criteria — a build returns ONLY when all are true

- [ ] `npm run build` succeeds
- [ ] `npm run lint` passes
- [ ] CI green on the PR (where CI runs)
- [ ] Only files within the task's stated scope changed

## Autonomy directives (no early return)

- Resolve ambiguity with the best-evidenced choice and record the decision — do not
  stop to ask.
- A missing credential, an irreversible production action, or a conflicting user
  instruction are the ONLY reasons to come back — state the blocker and what was
  tried.
- If a check fails, fix and re-run; three failed fix attempts on the same failure is
  the escalation trigger, not the first failure.

## Safety overrides

These take precedence over the autonomy directives:

- Never deploy to production, mutate Vercel/Cloudflare/Resend configuration, or run
  irreversible infrastructure actions — always escalate instead.
- Never commit secrets (`.env.local`, API keys); report a missing
  `RESEND_API_KEY` as a blocker rather than working around it.
- Never push directly to `main`.
