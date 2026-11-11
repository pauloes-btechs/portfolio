// Portfolio watch — pure logic (no network, no filesystem).
// Deterministic: same snapshots in → same report and patches out.
//
//   compareRepo(prev, next)         → { score, signals[], ignored[] }
//   planUpdates(registry, prev, next, cfg) → { updates[], candidates[], unchanged[] }
//   patchRegistrySource(src, id, field, value) → patched source text
//   renderReport(plan, meta)        → markdown

/** Signal weights. Stars, forks, and dependency bumps are deliberately absent. */
export const WEIGHTS = {
  release: 3,          // a new release or tag
  demo: 3,             // a homepage / Pages URL appeared
  readmeRewrite: 2,    // README changed substantially
  tests: 2,            // test files grew meaningfully
  architectureDocs: 2, // new architecture / design docs
  workflows: 1,        // new CI workflows
  sustainedWork: 1,    // many substantive human commits (never enough alone)
};

export const DEFAULT_THRESHOLD = 3;

const BOT = /\[bot\]|dependabot|renovate|github-actions/i;
const ROUTINE = /^(chore\(deps|build\(deps|bump |chore: bump|merge branch|merge pull request .*dependabot)/i;

/** Commits that count as substantive work: human-authored, not dependency churn. */
export function substantiveCommits(commits = []) {
  return commits.filter((c) => !BOT.test(c.author || "") && !ROUTINE.test(c.message || ""));
}

/** Rough README change ratio from line sets (order-insensitive, cheap, deterministic). */
export function readmeChangeRatio(a = "", b = "") {
  const A = new Set(a.split("\n").map((l) => l.trim()).filter(Boolean));
  const B = new Set(b.split("\n").map((l) => l.trim()).filter(Boolean));
  if (!A.size && !B.size) return 0;
  let same = 0;
  for (const l of B) if (A.has(l)) same++;
  return 1 - same / Math.max(A.size, B.size);
}

/**
 * Score how much a repository meaningfully changed between two snapshots.
 * A snapshot: { name, pushedAt, homepage, pagesUrl, releases[{tag,date,name}],
 *   readme, testFiles, workflows[], docs[], commits[{sha,author,message,date}] }
 */
export function compareRepo(prev, next) {
  const signals = [];
  const ignored = [];
  if (!prev) return { score: 0, signals, ignored: ["no baseline — snapshot captured"] };

  const prevTags = new Set((prev.releases || []).map((r) => r.tag));
  const fresh = (next.releases || []).filter((r) => !prevTags.has(r.tag));
  if (fresh.length) {
    signals.push({ kind: "release", weight: WEIGHTS.release,
      detail: `New release${fresh.length > 1 ? "s" : ""}: ${fresh.map((r) => r.tag).join(", ")}`,
      evidence: fresh.map((r) => r.url).filter(Boolean) });
  }

  const demoPrev = prev.pagesUrl || prev.homepage || null;
  const demoNext = next.pagesUrl || next.homepage || null;
  if (demoNext && demoNext !== demoPrev) {
    signals.push({ kind: "demo", weight: WEIGHTS.demo, detail: `Public URL now set: ${demoNext}`, evidence: [demoNext] });
  }

  const ratio = readmeChangeRatio(prev.readme, next.readme);
  if (ratio >= 0.25) {
    signals.push({ kind: "readmeRewrite", weight: WEIGHTS.readmeRewrite,
      detail: `README changed substantially (${Math.round(ratio * 100)}% of lines)`, evidence: [] });
  } else if (ratio > 0) {
    ignored.push(`README edited lightly (${Math.round(ratio * 100)}% of lines)`);
  }

  const t0 = prev.testFiles || 0, t1 = next.testFiles || 0;
  if (t1 - t0 >= 10 || (t0 > 0 && (t1 - t0) / t0 >= 0.2 && t1 - t0 >= 3) || (t0 === 0 && t1 >= 3)) {
    signals.push({ kind: "tests", weight: WEIGHTS.tests, detail: `Test files ${t0} → ${t1}`, evidence: [] });
  } else if (t1 !== t0) {
    ignored.push(`Test files ${t0} → ${t1} (below threshold)`);
  }

  const newDocs = (next.docs || []).filter((d) => !(prev.docs || []).includes(d) && /architect|design|adr|spec/i.test(d));
  if (newDocs.length) {
    signals.push({ kind: "architectureDocs", weight: WEIGHTS.architectureDocs,
      detail: `New architecture/design docs: ${newDocs.join(", ")}`, evidence: [] });
  }

  const newWf = (next.workflows || []).filter((w) => !(prev.workflows || []).includes(w));
  if (newWf.length) {
    signals.push({ kind: "workflows", weight: WEIGHTS.workflows, detail: `New workflows: ${newWf.join(", ")}`, evidence: [] });
  }

  const human = substantiveCommits(next.commits);
  const routine = (next.commits || []).length - human.length;
  if (routine > 0) ignored.push(`${routine} bot or dependency commit(s) ignored`);
  if (human.length >= 15) {
    signals.push({ kind: "sustainedWork", weight: WEIGHTS.sustainedWork,
      detail: `${human.length} substantive commits since last run`, evidence: [] });
  } else if (human.length) {
    ignored.push(`${human.length} commit(s) — commits alone never trigger an update`);
  }
  for (const k of ["stars", "forks", "watchers"]) {
    if ((next[k] ?? 0) !== (prev[k] ?? 0)) ignored.push(`${k} changed (never a signal)`);
  }

  const score = signals.reduce((a, s) => a + s.weight, 0);
  return { score, signals, ignored };
}

/** Map repo full name → registry id using repoUrl, then config aliases. */
export function repoIndex(registry, aliases = {}) {
  const idx = {};
  for (const p of registry) {
    const m = (p.repoUrl || "").match(/github\.com\/([^/]+\/[^/#?]+)/i);
    if (m) idx[m[1].toLowerCase()] = p.id;
  }
  for (const [repo, id] of Object.entries(aliases)) idx[repo.toLowerCase()] = id;
  return idx;
}

/**
 * Turn snapshots into a plan.
 *   updates    — tracked projects whose change cleared the threshold, with
 *                mechanical field patches (safe, evidence-backed) and
 *                editorial proposals (for a human to accept or rewrite)
 *   candidates — repos not in the registry that look like real projects
 *                (never auto-published; listed for approval)
 */
export function planUpdates(registry, prevState, nextState, cfg = {}) {
  const threshold = cfg.threshold ?? DEFAULT_THRESHOLD;
  const idx = repoIndex(registry, cfg.aliases);
  const exclude = new Set((cfg.exclude || []).map((s) => s.toLowerCase()));
  const known = new Set(Object.keys(cfg.reviewed || {}).map((s) => s.toLowerCase()));
  const byId = Object.fromEntries(registry.map((p) => [p.id, p]));
  const updates = [], candidates = [], unchanged = [];

  for (const [full, next] of Object.entries(nextState.repos || {})) {
    const key = full.toLowerCase();
    if (exclude.has(key)) continue;
    const prev = prevState.repos?.[full];
    const id = idx[key];

    if (!id) {
      if (known.has(key)) continue; // already reviewed: excluded or awaiting approval
      if (next.private) {
        if (prevState.repos && !prev) {
          candidates.push({ repo: full, private: true, reason: "New private repository — needs explicit publication approval; no contents were read." });
        }
        continue;
      }
      if (prevState.repos && !prev) {
        const evidence = [];
        if (next.testFiles) evidence.push(`${next.testFiles} test files`);
        if ((next.workflows || []).length) evidence.push(`${next.workflows.length} CI workflow(s)`);
        if (next.pagesUrl || next.homepage) evidence.push(`public URL ${next.pagesUrl || next.homepage}`);
        if ((next.releases || []).length) evidence.push(`release ${next.releases[0].tag}`);
        candidates.push({ repo: full, private: false, description: next.description || "",
          reason: evidence.length ? `New repository with ${evidence.join(", ")}` : "New repository (no execution evidence yet)",
          promising: evidence.length >= 2 });
      }
      continue;
    }

    const p = byId[id];
    const { score, signals, ignored } = compareRepo(prev, next);
    if (score < threshold) {
      unchanged.push({ id, repo: full, score, ignored, signals });
      continue;
    }

    const patches = [];
    const demo = next.pagesUrl || next.homepage;
    if (demo && !p.demoUrl && /^https:\/\//.test(demo)) {
      patches.push({ field: "demoUrl", from: null, to: demo, why: "Repository publishes a public URL" });
    }
    const last = next.lastCommitDate;
    if (last && p.dates?.end && last > p.dates.end) {
      patches.push({ field: "dates.end", from: p.dates.end, to: last, why: "Most recent substantive commit" });
    }

    const proposals = signals.map((s) => {
      switch (s.kind) {
        case "release": return `Consider a milestone for ${s.detail.replace(/^New releases?: /, "")} and a validation bullet citing the release notes.`;
        case "demo": return `Demo now public — review maturity (currently "${p.maturity}") and the hero CTA copy.`;
        case "tests": return `Validation copy cites test counts — re-verify "${(p.validation || [])[0] || ""}".`;
        case "readmeRewrite": return "README rewritten — re-check summary, capabilities, and architecture against the code.";
        case "architectureDocs": return "New architecture docs — the Architecture section may need an update.";
        case "workflows": return "New CI workflows — validation section may gain a bullet.";
        default: return null;
      }
    }).filter(Boolean);

    updates.push({ id, name: p.name, repo: full, score, signals, ignored, patches, proposals });
  }
  return { updates, candidates, unchanged };
}

/**
 * Apply one mechanical patch to the lib/projects.js source text, scoped to the
 * record whose `id: "<id>"` line starts the block. Only two field shapes are
 * supported on purpose — everything else is an editorial proposal.
 */
export function patchRegistrySource(src, id, field, value) {
  const start = src.indexOf(`id: "${id}",`);
  if (start < 0) throw new Error(`record ${id} not found`);
  const nextRec = src.indexOf("\n    id: \"", start + 10);
  const end = nextRec < 0 ? src.length : nextRec;
  let block = src.slice(start, end);
  const q = JSON.stringify(value);
  if (field === "demoUrl") {
    if (!/demoUrl: null,/.test(block)) throw new Error(`${id}: demoUrl is not null — refusing to overwrite a hand edit`);
    block = block.replace(/demoUrl: null,/, `demoUrl: ${q},`);
  } else if (field === "dates.end") {
    if (!/dates: \{ start: "[^"]+", end: "[^"]+" \}/.test(block)) throw new Error(`${id}: dates shape not recognised`);
    block = block.replace(/(dates: \{ start: "[^"]+", end: )"[^"]+"( \})/, `$1${q}$2`);
  } else {
    throw new Error(`unsupported field ${field}`);
  }
  return src.slice(0, start) + block + src.slice(end);
}

const esc = (s) => String(s).replace(/[<>]/g, (c) => (c === "<" ? "&lt;" : "&gt;"));

export function renderReport(plan, meta = {}) {
  const L = [];
  L.push(`# Portfolio watch — ${meta.date || ""}`.trim(), "");
  L.push(`Mode: **${meta.mode || "live"}** · repositories scanned: **${meta.scanned ?? "?"}** · threshold: **${meta.threshold ?? DEFAULT_THRESHOLD}**`, "");
  L.push("Repository content is treated as untrusted data: nothing from another repo is executed, and AI text (if enabled) appears only as a quoted proposal for review.", "");

  L.push("## Significant updates", "");
  if (!plan.updates.length) L.push("_None cleared the significance threshold._", "");
  for (const u of plan.updates) {
    L.push(`### ${u.name} — \`${u.repo}\` (score ${u.score})`, "");
    for (const s of u.signals) {
      L.push(`- **${s.kind}** (+${s.weight}): ${esc(s.detail)}${s.evidence?.length ? ` — ${s.evidence.join(", ")}` : ""}`);
    }
    if (u.patches.length) {
      L.push("", "**Applied to `lib/projects.js` in this PR (mechanical, evidence-backed):**", "");
      L.push("| Field | From | To | Why |", "|---|---|---|---|");
      for (const p of u.patches) L.push(`| \`${p.field}\` | ${p.from ?? "—"} | ${p.to} | ${p.why} |`);
    }
    if (u.proposals.length) {
      L.push("", "**Editorial proposals (not applied — edit the registry by hand if you agree):**", "");
      for (const p of u.proposals) L.push(`- [ ] ${esc(p)}`);
    }
    if (u.aiSummary) {
      L.push("", "**AI draft (unverified — check against the code before using):**", "");
      for (const line of u.aiSummary.split("\n")) L.push(`> ${esc(line)}`);
    }
    if (u.ignored.length) L.push("", `<sub>Ignored: ${u.ignored.map(esc).join("; ")}</sub>`);
    L.push("");
  }

  L.push("## New project candidates (approval required)", "");
  if (!plan.candidates.length) L.push("_None._", "");
  for (const c of plan.candidates) {
    L.push(`- [ ] \`${c.repo}\` — ${esc(c.reason)}${c.description ? ` · “${esc(c.description)}”` : ""}${c.promising ? " · **looks portfolio-worthy**" : ""}`);
  }
  L.push("");

  L.push("<details><summary>Below threshold</summary>", "");
  for (const u of plan.unchanged) {
    L.push(`- \`${u.repo}\` (score ${u.score})${u.ignored.length ? ` — ${u.ignored.map(esc).join("; ")}` : ""}`);
  }
  L.push("", "</details>", "");
  return L.join("\n");
}
