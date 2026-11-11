#!/usr/bin/env node
// Portfolio watch — CLI entry point.
//
//   node scripts/portfolio-watch/run.mjs                 # live: GitHub API (GITHUB_TOKEN / PORTFOLIO_READ_TOKEN)
//   node scripts/portfolio-watch/run.mjs --dry-run       # print the report, write nothing
//   node scripts/portfolio-watch/run.mjs --fixture f.json  # use a recorded snapshot instead of the API
//
// Outputs (unless --dry-run):
//   data/portfolio-watch/state.json        — compact baseline for the next run
//   reports/portfolio-watch/<date>.md      — evidence-backed candidate report
//   lib/projects.js                        — mechanical patches only (demoUrl, dates.end)
//   $GITHUB_OUTPUT: changed=true|false, report=<path>
import { readFile, writeFile, mkdir, appendFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { planUpdates, patchRegistrySource, renderReport, DEFAULT_THRESHOLD } from "./lib.mjs";
import { collect } from "./collect.mjs";
import { aiEnabled, summarize } from "./ai.mjs";
import { projects } from "../../lib/projects.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };

const DRY = flag("--dry-run");
const fixture = opt("--fixture");
const statePath = path.resolve(ROOT, opt("--state") || "data/portfolio-watch/state.json");
const cfg = JSON.parse(await readFile(path.join(ROOT, "scripts/portfolio-watch/config.json"), "utf8"));
const today = opt("--date") || new Date().toISOString().slice(0, 10);

const hashLines = (text) => String(text || "").split("\n").map((l) => l.trim()).filter(Boolean)
  .map((l) => createHash("sha1").update(l).digest("hex").slice(0, 10)).join("\n");

/** What we keep between runs: enough to diff, nothing sensitive, no README text. */
function compact(s) {
  if (s.private) return { name: s.name, private: true, pushedAt: s.pushedAt };
  const { commits, readmeRaw, ...rest } = s; // eslint-disable-line no-unused-vars
  return rest;
}

async function readJson(p, fallback) {
  try { return JSON.parse(await readFile(p, "utf8")); } catch { return fallback; }
}

const prevState = await readJson(statePath, { collectedAt: null, repos: null });

let next;
if (fixture) {
  next = await readJson(path.resolve(fixture), null);
  if (!next) throw new Error(`cannot read fixture ${fixture}`);
} else {
  const token = process.env.PORTFOLIO_READ_TOKEN || process.env.GITHUB_TOKEN || "";
  next = await collect({ ...cfg, includePrivate: Boolean(process.env.PORTFOLIO_READ_TOKEN) && cfg.includePrivate }, token, prevState.collectedAt);
}

// Normalise README to hashed lines so stored state stays small and text-free.
for (const s of Object.values(next.repos)) {
  if (s.readme !== undefined) { s.readmeRaw = s.readme; s.readme = hashLines(s.readme); }
}

const threshold = cfg.threshold ?? DEFAULT_THRESHOLD;
const plan = planUpdates(projects, prevState, next, { ...cfg, threshold });

if (aiEnabled()) {
  for (const u of plan.updates) {
    const p = projects.find((x) => x.id === u.id);
    u.aiSummary = await summarize({ project: p, signals: u.signals, readme: next.repos[u.repo]?.readmeRaw });
  }
}

const report = renderReport(plan, {
  date: today, mode: fixture ? "fixture" : DRY ? "dry run" : "live",
  scanned: Object.keys(next.repos).length, threshold,
});

const baseline = !prevState.repos;
const significant = baseline || plan.updates.length > 0 || plan.candidates.length > 0;
console.log(report);
console.error(`\n[portfolio-watch] ${plan.updates.length} update(s), ${plan.candidates.length} candidate(s), baseline=${baseline}, ai=${aiEnabled()}`);

if (DRY) process.exit(0);

// Mechanical patches, scoped per record; a refusal (hand edit present) is reported, not forced.
let src = await readFile(path.join(ROOT, "lib/projects.js"), "utf8");
for (const u of plan.updates) {
  u.patches = u.patches.filter((p) => {
    try { src = patchRegistrySource(src, u.id, p.field, p.to); return true; }
    catch (e) { console.error(`[portfolio-watch] skipped ${u.id}.${p.field}: ${e.message}`); return false; }
  });
}
await writeFile(path.join(ROOT, "lib/projects.js"), src);

const compactState = { collectedAt: new Date().toISOString(), repos: Object.fromEntries(
  Object.entries(next.repos).map(([k, v]) => [k, compact(v)])) };
await mkdir(path.dirname(statePath), { recursive: true });
await writeFile(statePath, JSON.stringify(compactState, null, 2) + "\n");

let reportPath = "";
if (significant) {
  reportPath = `reports/portfolio-watch/${today}.md`;
  await mkdir(path.join(ROOT, "reports/portfolio-watch"), { recursive: true });
  await writeFile(path.join(ROOT, reportPath), renderReport(plan, {
    date: today, mode: fixture ? "fixture" : "live", scanned: Object.keys(next.repos).length, threshold,
  }) + "\n");
}

if (process.env.GITHUB_OUTPUT) {
  await appendFile(process.env.GITHUB_OUTPUT, `significant=${significant}\nbaseline=${baseline}\nreport=${reportPath}\n`);
}
