# resume-coach — the master pool for every resume

**The role pages on pauloes.com are the master file.** Every bullet a resume may use
lives in `lib/data.js` (`roles[].responsibilities` and `roles[].extraPanels[].bullets`),
which renders `/roles/<slug>` on the site. This folder mirrors that pool into a weighted
registry and keeps the resume specs and renderer next to it, in git, so nothing lives
only in a chat session again.

```
resume-coach/
  anchor-registry.md    GENERATED — do not hand-edit. The pool with Impact weights.
  anchor-weights.json   Impact (1–5), track (product/systems/both), legacy ID, note per bullet.
  sync_registry.mjs     Regenerates anchor-registry.md from lib/data.js.
  RULES.md              Hand-maintained doctrine: titles, dates, honesty bounds, must-haves.
  render_docs.py        YAML spec → ATS-safe DOCX (+PDF). Portfolio link, navy/gray palette,
                        tab-stop bullets, autolinks.
  specs/                One YAML per resume variant. Rebuild any variant from the pool.
```

## The loop

1. Add or fix a bullet on the site: edit `lib/data.js`. That is the only place facts change.
2. Regenerate the registry: `node resume-coach/sync_registry.mjs` (from the repo root).
   A new bullet shows up flagged **NEEDS WEIGHT** — give it an entry in `anchor-weights.json`.
3. Build a resume from the pool: write or edit a spec in `specs/`, then
   `python3 resume-coach/render_docs.py resume-coach/specs/<name>.yaml --out-dir <dir>`
   (add `--pdf` to also emit a PDF; needs `pip install python-docx pyyaml`, LibreOffice for PDF).
4. Commit. Push deploys the site; the registry and specs ride along.

Resume wording may flex from the site wording (product-management phrasing, tighter lines
for page budget), but every fact and figure must exist in `anchor-registry.md` or be
attested by Pauloes in the conversation that produced the resume. Nothing else gets in.
