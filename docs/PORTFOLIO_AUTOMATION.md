# Portfolio watch — keeping the engineering portfolio current

`pauloes.com` shows Btechs projects from one registry, `lib/projects.js`. Portfolio watch
is a weekly GitHub Action that looks for **meaningful** changes in the repositories behind
those projects and proposes updates as a single draft pull request. It never merges, never
deploys, and never publishes a project on its own.

## How it works

```
GitHub REST (read-only) ──► snapshots ──► significance scoring ──► plan
        │                                                   │
        │   previous snapshot: data/portfolio-watch/state.json
        ▼                                                   ▼
  private repos: metadata only            ┌─ mechanical patches → lib/projects.js
  public repos: releases, tags, Pages,    ├─ editorial proposals → report (checkboxes)
  README (hashed), test/workflow/doc      ├─ new-project candidates → report (approval)
  file names, commits since last run      └─ optional AI draft → report (quoted, unverified)
                                                            │
                         lint + test + build ──► draft PR on automation/portfolio-watch
```

| File | Role |
|---|---|
| `.github/workflows/portfolio-watch.yml` | Schedule (Mondays 13:00 UTC), manual runs, validation, PR |
| `scripts/portfolio-watch/run.mjs` | CLI — orchestrates collect → plan → patch → report |
| `scripts/portfolio-watch/collect.mjs` | Read-only GitHub API collection |
| `scripts/portfolio-watch/lib.mjs` | Pure logic: scoring, planning, registry patcher, report |
| `scripts/portfolio-watch/ai.mjs` | Optional AI drafting (off unless configured) |
| `scripts/portfolio-watch/config.json` | Owner, orgs, aliases, exclusions, reviewed repos, threshold |
| `scripts/portfolio-watch/snapshot-from-git.mjs` | Build snapshots from local clones (offline dry runs, history replay) |
| `data/portfolio-watch/state.json` | Compact baseline — no README text, no commit messages |
| `reports/portfolio-watch/<date>.md` | The evidence report each PR carries |
| `test/portfolio-watch.test.mjs` | Tests for scoring, planning, patching, escaping |

## What counts as significant

Each change earns points; a project needs **3** (configurable) to be proposed.

| Signal | Points |
|---|---|
| New release or tag | 3 |
| A public URL appears (repo homepage or GitHub Pages) | 3 |
| README rewritten (≥ 25 % of lines changed) | 2 |
| Test files grew meaningfully (+10, or +20 % and +3) | 2 |
| New architecture / design / ADR / spec docs | 2 |
| New CI workflows | 1 |
| 15+ substantive commits since last run | 1 |

Never a signal: stars, forks, watchers, Dependabot/Renovate/bot commits, `chore(deps)` bumps,
light README edits. **Commits alone can never clear the threshold.**

## What the PR changes

Only two fields are patched mechanically, scoped to the one record, and only from evidence:

- `demoUrl` — set when the repository publishes an `https` URL **and** the registry value is
  still `null`. A hand-set URL is never overwritten (the patcher refuses).
- `dates.end` — advanced to the latest substantive commit date.

Everything else — summaries, maturity, capabilities, validation copy, milestones, new
projects — is an **editorial proposal** in the report. Edit `lib/projects.js` yourself (or ask
an agent to) and push to the same PR before merging. Existing hand-written copy is never
rewritten by automation.

New repositories are listed as **candidates** with their evidence (tests, workflows, release,
public URL). Nothing is added to the site until a record with `publish: "approved"` is
written by a person. Private repositories are listed by name only, and only when new.

## Safety

- **Least privilege.** The workflow has `contents: write` and `pull-requests: write` on this
  repo only. Reading other repositories uses the built-in token (public data) or an optional
  read-only `PORTFOLIO_READ_TOKEN`. Tokens are passed as env vars and never printed.
- **Untrusted input.** Other repositories are data. Nothing from them is executed; README text
  is hashed for state, escaped in reports, and — if AI is on — wrapped as untrusted input with
  an instruction to ignore embedded instructions. AI output is stripped of markup and
  non-GitHub links and appears only as a quoted, unverified draft.
- **Private repos.** Metadata only (name, visibility, last push). No contents, descriptions, or
  URLs reach a report or the site. The registry test suite fails if a private record has a
  `repoUrl`.
- **No surprise publishing.** Draft PR only; merging is a human decision (merging to `main`
  deploys through Vercel). One PR at a time on `automation/portfolio-watch`, updated in place.
- **Validation.** The workflow runs `npm run lint`, `npm test`, and `npm run build` before it
  pushes. Note: PRs opened with `GITHUB_TOKEN` don't trigger other workflows, so CI for the
  PR is this in-job validation (re-run CI by pushing a commit to the branch if you need checks).

## Enabling it

1. Merge this PR (and the engineering-portfolio PR it builds on).
2. Repository **Settings → Actions → General → Workflow permissions**: enable
   *"Allow GitHub Actions to create and approve pull requests"* (needed for `gh pr create`).
3. Optional — private repo metadata: create a fine-grained token with **read-only**
   *Metadata* access to your repositories (and the Btechs-org repos), save it as the secret
   `PORTFOLIO_READ_TOKEN`.
4. Optional — AI drafts: add secret `ANTHROPIC_API_KEY` and variable `PORTFOLIO_AI_MODEL`
   (a model id). Both must be set; otherwise the deterministic report runs alone.
5. Optional — create a `portfolio-watch` label (the PR is labelled when it exists).

## Running it

- **Manual dry run** (default for manual runs): *Actions → Portfolio watch → Run workflow* with
  *dry_run* ticked. The report appears in the job summary; nothing is written.
- **Manual live run:** same, with *dry_run* unticked.
- **Locally:**

  ```bash
  GITHUB_TOKEN=$(gh auth token) node scripts/portfolio-watch/run.mjs --dry-run
  # offline, from clones:
  node scripts/portfolio-watch/snapshot-from-git.mjs --as-of 2026-11-30 --since 2026-11-11 \
       --out /tmp/next.json pauloes-btechs/KYAgent=../KYAgent
  node scripts/portfolio-watch/run.mjs --dry-run --fixture /tmp/next.json
  ```

## Reviewing a proposal

1. Read the report at the top of the PR: each signal lists its evidence.
2. Check the mechanical patches in the diff (`lib/projects.js`).
3. Tick the editorial proposals you agree with and make those edits on the PR branch —
   re-verify any number against the repository before changing copy.
4. For candidates you want on the site, add a full record with sources, set
   `publish: "approved"`, and add images under `public/projects/`.
5. Mark ready for review and merge. To reject everything, close the PR — the baseline does
   not advance, so the same evidence will be proposed again next week. To silence a repo,
   add it to `exclude` or `reviewed` in `config.json`.

## Failure recovery

- **Run failed on the API** (rate limit, outage): re-run the job; nothing was written.
- **Validation failed:** nothing was pushed. Open the job log; usually a malformed patch or a
  broken image reference. Fix on `main`, re-run.
- **Patch refused** ("refusing to overwrite a hand edit"): expected — the field was edited by
  hand. The report still lists the evidence.
- **Bad baseline:** delete `data/portfolio-watch/state.json` on `main`; the next run opens an
  "initial baseline" PR without proposals.
- **Someone edited the automation branch:** the next run force-pushes a fresh proposal from
  `main`. Merge or close the PR before the next scheduled run if you've made edits there.
