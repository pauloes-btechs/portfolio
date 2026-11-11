// Tests for the portfolio-watch significance logic and registry patcher.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  compareRepo, planUpdates, patchRegistrySource, renderReport, substantiveCommits, readmeChangeRatio,
} from "../scripts/portfolio-watch/lib.mjs";
import { clean } from "../scripts/portfolio-watch/ai.mjs";
import { projects } from "../lib/projects.js";

// A frozen two-record registry: tests must not break when real copy changes.
const REG = [
  { id: "alpha", name: "Alpha", repoUrl: "https://github.com/o/alpha", demoUrl: null, maturity: "tested-mvp",
    dates: { start: "2026-01-01", end: "2026-02-01" }, validation: ["10 tests"] },
  { id: "beta", name: "Beta", repoUrl: "https://github.com/o/beta", demoUrl: "https://beta.example/", maturity: "public-demo",
    dates: { start: "2026-01-01", end: "2026-02-01" }, validation: ["5 tests"] },
];
const SRC = [
  "export const projects = [",
  "  {",
  '    id: "alpha",',
  '    dates: { start: "2026-01-01", end: "2026-02-01" },',
  "    demoUrl: null,",
  "  },",
  "  {",
  '    id: "beta",',
  '    dates: { start: "2026-01-01", end: "2026-02-01" },',
  '    demoUrl: "https://beta.example/",',
  "  },",
  "  {",
  '    id: "gamma",',
  '    dates: { start: "2026-01-01", end: null },',
  "    demoUrl: null,",
  "  },",
  "];",
].join("\n");

const snap = (o = {}) => ({
  name: "x", private: false, releases: [], readme: "a\nb\nc\nd", testFiles: 10,
  workflows: ["ci.yml"], docs: ["README.md"], commits: [], stars: 1, forks: 0, ...o,
});
const commits = (n, author = "pauloes") => Array.from({ length: n }, (_, i) => ({ author, message: `feat: thing ${i}` }));

test("commits alone never clear the threshold", () => {
  const r = compareRepo(snap(), snap({ commits: commits(40) }));
  assert.ok(r.score < 3, `score ${r.score}`);
});

test("stars, forks and dependency bumps are ignored", () => {
  const dep = Array.from({ length: 30 }, () => ({ author: "dependabot[bot]", message: "chore(deps): bump x" }));
  const r = compareRepo(snap(), snap({ stars: 900, forks: 50, commits: dep }));
  assert.equal(r.score, 0);
  assert.ok(r.ignored.some((i) => /stars/.test(i)));
  assert.equal(substantiveCommits(dep).length, 0);
});

test("a new release clears the threshold on its own", () => {
  const r = compareRepo(snap(), snap({ releases: [{ tag: "v1.0.0", url: "https://github.com/o/r/releases/tag/v1.0.0" }] }));
  assert.ok(r.score >= 3);
  assert.equal(r.signals[0].kind, "release");
});

test("a newly public demo URL is significant", () => {
  const r = compareRepo(snap(), snap({ pagesUrl: "https://o.github.io/r/" }));
  assert.ok(r.signals.some((s) => s.kind === "demo"));
});

test("README rewrite vs light edit", () => {
  assert.ok(readmeChangeRatio("a\nb\nc\nd", "a\nb\nc\ne") < 0.25 + 1e-9);
  assert.ok(readmeChangeRatio("a\nb\nc\nd", "w\nx\ny\nz") === 1);
});

test("no baseline means snapshot only, never an update", () => {
  const r = compareRepo(undefined, snap({ releases: [{ tag: "v9" }] }));
  assert.equal(r.score, 0);
});

test("planUpdates: tracked repo with release gets a demoUrl patch only when empty", () => {
  const prev = { repos: { "o/alpha": snap() } };
  const next = { repos: { "o/alpha": snap({
    releases: [{ tag: "v0.2.0" }], pagesUrl: "https://alpha.example.org/", lastCommitDate: "2026-12-01" }) } };
  const plan = planUpdates(REG, prev, next, {});
  assert.equal(plan.updates.length, 1);
  const fields = plan.updates[0].patches.map((p) => p.field).sort();
  assert.deepEqual(fields, ["dates.end", "demoUrl"]);
});

test("planUpdates: never patches a demoUrl that was set by hand", () => {
  const prev = { repos: { "o/beta": snap() } };
  const next = { repos: { "o/beta": snap({ releases: [{ tag: "v1" }], homepage: "https://elsewhere.example/" }) } };
  const plan = planUpdates(REG, prev, next, {});
  assert.ok(!plan.updates[0].patches.some((p) => p.field === "demoUrl"));
});

test("planUpdates resolves real registry repos too", () => {
  const prev = { repos: { "pauloes-btechs/KYAgent": snap() } };
  const next = { repos: { "pauloes-btechs/KYAgent": snap({ releases: [{ tag: "v1" }] }) } };
  assert.equal(planUpdates(projects, prev, next, {}).updates[0].id, "kyagent");
});

test("planUpdates: new public repos become candidates; private ones reveal nothing", () => {
  const prev = { repos: {} };
  const next = { repos: {
    "pauloes-btechs/new-thing": snap({ testFiles: 12, pagesUrl: "https://o.github.io/new-thing/", description: "A thing" }),
    "pauloes-btechs/secret": { name: "secret", private: true },
  } };
  const plan = planUpdates(projects, prev, next, {});
  const pub = plan.candidates.find((c) => c.repo.endsWith("new-thing"));
  const priv = plan.candidates.find((c) => c.repo.endsWith("secret"));
  assert.ok(pub.promising);
  assert.equal(priv.private, true);
  assert.ok(!("description" in priv));
});

test("planUpdates: reviewed and excluded repos are skipped", () => {
  const next = { repos: { "pauloes-btechs/nba-predictions": { private: true }, "pauloes-btechs/portfolio": snap() } };
  const plan = planUpdates(projects, { repos: {} }, next, {
    reviewed: { "pauloes-btechs/nba-predictions": "pending" }, exclude: ["pauloes-btechs/portfolio"] });
  assert.equal(plan.candidates.length, 0);
});

test("patchRegistrySource edits only the target record", () => {
  const out = patchRegistrySource(SRC, "alpha", "demoUrl", "https://alpha.example/");
  assert.equal(out.split('demoUrl: "https://alpha.example/"').length, 2);
  assert.ok(out.slice(out.indexOf('id: "gamma"')).includes("demoUrl: null"), "gamma untouched");
  const d = patchRegistrySource(SRC, "alpha", "dates.end", "2026-12-24");
  assert.ok(d.includes('dates: { start: "2026-01-01", end: "2026-12-24" }'));
  assert.equal(d.split('end: "2026-12-24"').length, 2);
  assert.throws(() => patchRegistrySource(SRC, "beta", "demoUrl", "https://x.example/"), /hand edit/);
  assert.throws(() => patchRegistrySource(SRC, "gamma", "dates.end", "2026-12-24"), /not recognised/);
  assert.throws(() => patchRegistrySource(SRC, "alpha", "summary", "x"), /unsupported/);
  assert.throws(() => patchRegistrySource(SRC, "nope", "demoUrl", "https://x.example/"), /not found/);
});

test("patchRegistrySource works on the real registry file", () => {
  const src = readFileSync(new URL("../lib/projects.js", import.meta.url), "utf8");
  const out = patchRegistrySource(src, "kyagent", "dates.end", "2026-12-24");
  assert.ok(out.includes('dates: { start: "2026-09-26", end: "2026-12-24" }'));
});

test("report escapes markup from repository data", () => {
  const md = renderReport({ updates: [], unchanged: [], candidates: [
    { repo: "o/r", reason: "New <script>alert(1)</script>", description: "<img onerror=x>" }] }, { date: "2026-11-11" });
  assert.ok(!md.includes("<script>"));
  assert.ok(!md.includes("<img"));
});

test("AI output is stripped of markup and off-site links", () => {
  const out = clean("Hi <b>there</b> [x](https://evil.example/p) [y](https://github.com/o/r)");
  assert.ok(!out.includes("<b>"));
  assert.ok(!out.includes("evil.example"));
  assert.ok(out.includes("https://github.com/o/r"));
});
