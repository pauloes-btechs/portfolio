// Portfolio watch — GitHub collection (read-only REST calls).
// Produces one snapshot per repository. Repository contents are data:
// we read metadata, file names, and README text; we never execute or
// follow anything found inside another repository.

const API = "https://api.github.com";

export function makeClient(token) {
  let calls = 0;
  async function gh(path, { allow404 = false } = {}) {
    calls++;
    const res = await fetch(API + path, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "pauloes-portfolio-watch",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (allow404 && res.status === 404) return null;
    if (!res.ok) throw new Error(`GitHub ${res.status} on ${path.replace(/\?.*/, "")}`);
    return res.json();
  }
  return { gh, calls: () => calls };
}

async function listRepos(gh, cfg) {
  const out = [];
  const pages = async (base) => {
    for (let page = 1; page <= 5; page++) {
      const batch = await gh(`${base}${base.includes("?") ? "&" : "?"}per_page=100&page=${page}`);
      out.push(...batch);
      if (batch.length < 100) break;
    }
  };
  if (cfg.includePrivate) await pages(`/user/repos?affiliation=owner&visibility=all`);
  else await pages(`/users/${cfg.owner}/repos?type=owner`);
  for (const org of cfg.orgs || []) {
    try { await pages(`/orgs/${org}/repos?type=all`); } catch (e) { console.warn(`skip org ${org}: ${e.message}`); }
  }
  const seen = new Set();
  return out.filter((r) => !r.fork && !r.archived && !seen.has(r.full_name) && seen.add(r.full_name));
}

const TEST = /(^|\/)(test|tests|__tests__|e2e)\/|\.(test|spec)\.[cm]?[jt]sx?$|_test\.(ts|go|py)$|(^|\/)test_[^/]+\.py$/;
const DOC = /^(docs\/[^/]+\.md|[A-Z_]+\.md)$/;

export async function snapshotRepo(gh, repo, since) {
  const full = repo.full_name;
  const base = {
    name: repo.name, full, private: repo.private, description: repo.description || "",
    homepage: repo.homepage || null, pushedAt: repo.pushed_at, stars: repo.stargazers_count, forks: repo.forks_count,
  };
  // Private repositories: metadata only. Nothing about their contents leaves this job.
  if (repo.private) return base;

  const branch = repo.default_branch;
  const [releases, tags, tree, readme, pages, commits] = await Promise.all([
    gh(`/repos/${full}/releases?per_page=5`).catch(() => []),
    gh(`/repos/${full}/tags?per_page=5`).catch(() => []),
    gh(`/repos/${full}/git/trees/${encodeURIComponent(branch)}?recursive=1`, { allow404: true }).catch(() => null),
    gh(`/repos/${full}/readme`, { allow404: true }).catch(() => null),
    gh(`/repos/${full}/pages`, { allow404: true }).catch(() => null),
    gh(`/repos/${full}/commits?per_page=100${since ? `&since=${encodeURIComponent(since)}` : ""}`).catch(() => []),
  ]);

  const paths = (tree?.tree || []).filter((n) => n.type === "blob").map((n) => n.path)
    .filter((p) => !p.includes("node_modules/"));
  const rel = releases.length
    ? releases.map((r) => ({ tag: r.tag_name, date: (r.published_at || "").slice(0, 10), url: r.html_url, name: r.name || "" }))
    : tags.map((t) => ({ tag: t.name, date: "", url: `https://github.com/${full}/releases/tag/${t.name}` }));
  const readmeText = readme?.content ? Buffer.from(readme.content, "base64").toString("utf8").slice(0, 60000) : "";
  const cm = commits.map((c) => ({
    sha: c.sha.slice(0, 7),
    author: c.author?.login || c.commit?.author?.name || "",
    message: (c.commit?.message || "").split("\n")[0].slice(0, 200),
    date: (c.commit?.author?.date || "").slice(0, 10),
  }));
  return {
    ...base,
    pagesUrl: pages?.html_url || null,
    releases: rel,
    readme: readmeText,
    testFiles: paths.filter((p) => TEST.test(p)).length,
    workflows: paths.filter((p) => p.startsWith(".github/workflows/")).map((p) => p.split("/").pop()).sort(),
    docs: paths.filter((p) => DOC.test(p)).sort(),
    commits: cm,
    lastCommitDate: cm.find((c) => !/\[bot\]|dependabot/i.test(c.author))?.date || null,
  };
}

export async function collect(cfg, token, since) {
  const { gh, calls } = makeClient(token);
  const repos = await listRepos(gh, cfg);
  const out = {};
  for (const r of repos) out[r.full_name] = await snapshotRepo(gh, r, since);
  return { repos: out, apiCalls: calls() };
}
