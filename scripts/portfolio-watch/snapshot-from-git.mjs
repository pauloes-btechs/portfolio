#!/usr/bin/env node
// Build a portfolio-watch snapshot from local clones at a point in time —
// for offline dry runs and for replaying real history through the
// significance logic. Read-only git plumbing; no repository code runs.
//
//   node scripts/portfolio-watch/snapshot-from-git.mjs --as-of 2026-10-31 \
//        --since 2026-10-01 --out /tmp/snap.json owner/name=/path/to/clone ...
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args.splice(i, 2)[1] : null; };
const asOf = opt("--as-of");
const since = opt("--since");
const out = opt("--out");
if (!asOf || !out) { console.error("usage: --as-of YYYY-MM-DD [--since YYYY-MM-DD] --out file owner/repo=dir ..."); process.exit(2); }

const git = (dir, ...a) => execFileSync("git", ["-C", dir, ...a], { encoding: "utf8", maxBuffer: 64 << 20 }).trim();
const TEST = /(^|\/)(test|tests|__tests__|e2e)\/|\.(test|spec)\.[cm]?[jt]sx?$|_test\.(ts|go|py)$|(^|\/)test_[^/]+\.py$/;
const DOC = /^(docs\/[^/]+\.md|[A-Z_]+\.md)$/;

const repos = {};
for (const spec of args) {
  const [full, dir] = spec.split("=");
  const branch = git(dir, "symbolic-ref", "--short", "HEAD");
  const sha = git(dir, "rev-list", "-1", `--before=${asOf}T23:59:59`, branch);
  if (!sha) continue; // repo did not exist yet
  const paths = git(dir, "ls-tree", "-r", "--name-only", sha).split("\n").filter((p) => p && !p.includes("node_modules/"));
  let readme = "";
  const rp = paths.find((p) => /^readme\.md$/i.test(p));
  if (rp) readme = git(dir, "show", `${sha}:${rp}`);
  const tags = git(dir, "tag", "--merged", sha, "--format=%(refname:short)|%(creatordate:short)").split("\n").filter(Boolean)
    .map((l) => { const [tag, date] = l.split("|"); return { tag, date, url: `https://github.com/${full}/releases/tag/${tag}` }; });
  const log = git(dir, "log", sha, `--since=${since || "1970-01-01"}`, "--format=%h|%an|%ad|%s", "--date=short").split("\n").filter(Boolean)
    .map((l) => { const [s, author, date, ...m] = l.split("|"); return { sha: s, author, date, message: m.join("|") }; });
  repos[full] = {
    name: full.split("/")[1], full, private: false, description: "", homepage: null, pagesUrl: null,
    pushedAt: git(dir, "log", "-1", "--format=%aI", sha),
    releases: tags, readme,
    testFiles: paths.filter((p) => TEST.test(p)).length,
    workflows: paths.filter((p) => p.startsWith(".github/workflows/")).map((p) => p.split("/").pop()).sort(),
    docs: paths.filter((p) => DOC.test(p)).sort(),
    commits: log,
    lastCommitDate: log.find((c) => !/\[bot\]|dependabot/i.test(c.author))?.date || null,
  };
}
writeFileSync(out, JSON.stringify({ collectedAt: `${asOf}T23:59:59Z`, repos }, null, 2));
console.error(`wrote ${Object.keys(repos).length} snapshot(s) to ${out}`);
