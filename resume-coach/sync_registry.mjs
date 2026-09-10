#!/usr/bin/env node
// sync_registry.mjs — regenerate the anchor registry from the portfolio's lib/data.js.
//
//   node resume-coach/sync_registry.mjs            (run from the pauloes repo root)
//
// The role pages on pauloes.com (lib/data.js → roles[].responsibilities and
// roles[].extraPanels[].bullets) are the MASTER POOL of experience bullets.
// This script mirrors them into resume-coach/anchor-registry.md with the
// Impact weight each bullet carries in resume-coach/anchor-weights.json.
// Bullets are matched to weights by a fingerprint (slug + first five words), so
// light rewording keeps its weight; a new bullet gets a "NEEDS WEIGHT" flag and a
// provisional 3 until a weight is set in anchor-weights.json.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dataPath = path.join(root, "lib", "data.js");
const weightsPath = path.join(root, "resume-coach", "anchor-weights.json");
const outPath = path.join(root, "resume-coach", "anchor-registry.md");

const { roles, credentials, site } = await import(pathToFileURL(dataPath).href);
const weights = JSON.parse(fs.readFileSync(weightsPath, "utf8"));

const fp = (slug, text) =>
  slug + ":" + text.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").trim().split(/\s+/).slice(0, 5).join(" ");

const stamp = new Date().toISOString().slice(0, 10);
const lines = [];
const P = (s = "") => lines.push(s);

P(`# Anchor Registry — generated from pauloes.com role pages (${stamp})`);
P();
P(`**Source of truth:** \`lib/data.js\` in the pauloes portfolio repo — the same file that renders`);
P(`every \`/roles/<slug>\` page on ${site.url || "pauloes.com"}. Edit bullets THERE; then run`);
P("`node resume-coach/sync_registry.mjs` to regenerate this file. Never hand-edit the tables");
P("below — edits are overwritten on the next sync. Weights live in `anchor-weights.json`.");
P();
P("Scoring is unchanged: **Placement = 2·Impact + Relevance**, Relevance assigned per JD (0–3).");
P("Impact ≥ 4 ships unless Relevance = 0. Within a role, order by score descending.");
P("**Track** = `product` (ships on any resume), `systems` (infra/security/IT JDs only),");
P("`both`. **Evidence rule stands:** every bullet here is Pauloes' own published claim;");
P("wording may flex per doctrine §16, facts and figures never do, and nothing may be added");
P("to a resume that is not in this file or attested by him in the conversation.");
P();

let needs = [];
for (const r of roles) {
  P(`## ${r.company} — ${r.title} (${r.location} · ${r.dates})`);
  P();
  if (r.context) P(`*Context line:* ${r.context}`);
  if (r.lede) P(`*Lede:* ${r.lede}`);
  P();
  P("| ID | # | Anchor (verbatim from the site) | I | Track | Note |");
  P("|---|---|---|---|---|---|");
  const emit = (text, idx, label) => {
    const key = fp(r.slug, text);
    const w = weights[key];
    const I = w ? w.I : 3;
    const track = w?.track || "product";
    const id = w?.id || `${r.slug.split("-").map(s => s[0]).join("").toUpperCase()}?`;
    let note = w?.note || "";
    if (!w) { note = "NEEDS WEIGHT — provisional 3"; needs.push(`${key}  ← ${text.slice(0, 70)}…`); }
    P(`| ${id} | ${label}${idx} | ${text.replace(/\|/g, "\\|")} | **${I}** | ${track} | ${note} |`);
  };
  r.responsibilities.forEach((t, i) => emit(t, i + 1, "R"));
  for (const panel of r.extraPanels || []) {
    P(`| | | **${panel.heading}** — ${panel.sub || ""} | | | |`);
    panel.bullets.forEach((t, i) => emit(t, i + 1, "P"));
  }
  P();
  if (r.skills?.length) P(`*Skills on the page:* ${r.skills.join(" · ")}`);
  if (r.vendors?.length) P(`*Vendors/partners on the page:* ${r.vendors.map(v => v.name).join(", ")}`);
  if (r.certifications?.length) P(`*Certifications on the page:* ${r.certifications.map(c => `${c.name} (${c.issued})`).join("; ")}`);
  if (r.links?.length) P(`*Links on the page:* ${r.links.map(l => `[${l.label}](${l.href})`).join(" · ")}`);
  P();
}
P("## Credentials (site `credentials`)");
P();
for (const c of credentials) P(`- ${c}`);
P();
if (needs.length) {
  P("## Bullets without a weight yet");
  P();
  P("Add each key to `anchor-weights.json` with `{ \"id\", \"I\", \"track\", \"note\" }`:");
  P();
  for (const n of needs) P(`- \`${n}\``);
  P();
}
fs.writeFileSync(outPath, lines.join("\n") + "\n");
console.log(`wrote ${path.relative(root, outPath)} — ${roles.length} roles, ${needs.length} bullets need weights`);
