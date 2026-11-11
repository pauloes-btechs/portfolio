// Data-integrity tests for the Btechs project registry.
// Run: npm test   (Node's built-in runner — no dependencies)
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import {
  projects, projectCategories, MATURITY,
  publishedProjects, featuredProjects, getProject, projectsByCategory,
  projectMilestones, formatMonth, countWord,
} from "../lib/projects.js";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const publicFile = (src) => path.join(root, "public", src.replace(/^\//, ""));
const ISO = /^\d{4}-\d{2}-\d{2}$/;

test("ids and slugs are unique and URL-safe", () => {
  const ids = new Set(), slugs = new Set();
  for (const p of projects) {
    assert.ok(!ids.has(p.id), `duplicate id ${p.id}`);
    assert.ok(!slugs.has(p.slug), `duplicate slug ${p.slug}`);
    assert.match(p.slug, /^[a-z0-9]+(-[a-z0-9]+)*$/, `slug ${p.slug}`);
    ids.add(p.id); slugs.add(p.slug);
  }
});

test("every record has the required editorial fields", () => {
  const required = ["name", "organization", "category", "tagline", "problem", "summary", "overview"];
  const lists = ["contribution", "architecture", "capabilities", "validation", "highlights", "tech", "sources"];
  for (const p of projects) {
    for (const k of required) assert.ok(typeof p[k] === "string" && p[k].trim(), `${p.id}.${k}`);
    for (const k of lists) assert.ok(Array.isArray(p[k]) && p[k].length > 0, `${p.id}.${k} must be non-empty`);
    assert.equal(p.organization, "Btechs", `${p.id} attribution`);
    assert.ok(p.highlights.length <= 3, `${p.id} keeps highlights to three`);
  }
});

test("categories, maturity and publish status use allowed values", () => {
  const cats = new Set(projectCategories.map((c) => c.id));
  for (const p of projects) {
    assert.ok(cats.has(p.category), `${p.id} category ${p.category}`);
    assert.ok(p.maturity in MATURITY, `${p.id} maturity ${p.maturity}`);
    assert.ok(["approved", "pending", "rejected"].includes(p.publish), `${p.id} publish`);
  }
});

test("dates are ISO and ordered", () => {
  for (const p of projects) {
    assert.match(p.dates.start, ISO, `${p.id} start`);
    if (p.dates.end) {
      assert.match(p.dates.end, ISO, `${p.id} end`);
      assert.ok(p.dates.end >= p.dates.start, `${p.id} end before start`);
    }
    if (p.milestone) {
      assert.match(p.milestone.date, ISO, `${p.id} milestone date`);
      assert.ok(p.milestone.date >= p.dates.start, `${p.id} milestone before project start`);
    }
  }
});

test("private repositories never expose a repo URL", () => {
  for (const p of projects) {
    if (p.visibility !== "public") assert.equal(p.repoUrl, null, `${p.id} is private; repoUrl must be null`);
    for (const url of [p.repoUrl, p.demoUrl].filter(Boolean)) {
      assert.match(url, /^https:\/\//, `${p.id} link must be https`);
    }
  }
});

test("every referenced image exists in /public and has alt text", () => {
  for (const p of projects) {
    for (const img of [p.image, ...(p.gallery || [])]) {
      assert.ok(existsSync(publicFile(img.src)), `${p.id}: missing ${img.src}`);
      assert.ok(img.alt && img.alt.length > 15, `${p.id}: alt text for ${img.src}`);
    }
  }
});

test("concept renders are labelled as renders, never as screenshots", () => {
  for (const p of projects) {
    if (p.image.kind === "render") assert.match(p.image.alt, /render|concept|design/i, p.id);
  }
});

test("selectors return only approved records", () => {
  const approved = projects.filter((p) => p.publish === "approved").length;
  assert.equal(publishedProjects().length, approved);
  assert.ok(publishedProjects().every((p) => p.publish === "approved"));
});

test("homepage features three or four approved projects, in priority order", () => {
  const f = featuredProjects();
  assert.ok(f.length >= 3 && f.length <= 4, `featured count ${f.length}`);
  const pr = f.map((p) => p.priority);
  assert.deepEqual(pr, [...pr].sort((a, b) => a - b));
});

test("category groups cover every published project exactly once", () => {
  const grouped = projectsByCategory().flatMap((c) => c.projects.map((p) => p.slug));
  assert.equal(grouped.length, publishedProjects().length);
  assert.equal(new Set(grouped).size, grouped.length);
});

test("story milestones are chronological", () => {
  const dates = projectMilestones().map((m) => m.date);
  assert.deepEqual(dates, [...dates].sort());
});

test("getProject resolves slugs and rejects unknown ones", () => {
  assert.equal(getProject("kyagent")?.name, "KYAgent");
  assert.equal(getProject("does-not-exist"), null);
});

test("formatting helpers", () => {
  assert.equal(formatMonth("2026-11-05"), "Nov 2026");
  assert.equal(countWord(16, { capitalize: true }), "Sixteen");
  assert.equal(countWord(42), "42");
});
