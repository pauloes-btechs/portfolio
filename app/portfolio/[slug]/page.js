import Link from "next/link";
import { notFound } from "next/navigation";
import ChainCanvas from "../../../components/ChainCanvas";
import Reveal from "../../../components/Reveal";
import { site } from "../../../lib/data";
import {
  publishedProjects, getProject, projectCategories, maturityLabel, formatMonth,
} from "../../../lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = `${p.name} — ${p.tagline.replace(/\.$/, "")}`;
  return {
    title,
    description: p.summary,
    alternates: { canonical: `/portfolio/${p.slug}` },
    openGraph: {
      title: `${p.name} · Btechs`,
      description: p.summary,
      type: "article",
      images: [{ url: p.image.src, width: 1440, height: 810, alt: p.image.alt }],
    },
    twitter: { card: "summary_large_image", title: `${p.name} · Btechs`, description: p.summary, images: [p.image.src] },
  };
}

function Panel({ title, items }) {
  return (
    <Reveal className="panel">
      <h3>{title}</h3>
      <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>
    </Reveal>
  );
}

function period(d) {
  if (!d.end) return `${formatMonth(d.start)} – present`;
  const a = formatMonth(d.start), b = formatMonth(d.end);
  return a === b ? a : `${a} – ${b}`;
}

/** Structured data only for public source code, where every field is verifiable. */
function jsonLd(p) {
  if (!p.repoUrl) return null;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: p.name,
    description: p.summary,
    codeRepository: p.repoUrl,
    url: `${site.url}/portfolio/${p.slug}`,
    author: { "@type": "Person", name: site.name, url: site.url },
    creativeWorkStatus: maturityLabel(p.maturity),
    keywords: p.tech.join(", "),
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const category = projectCategories.find((c) => c.id === p.category);
  const all = publishedProjects();
  const idx = all.findIndex((x) => x.slug === p.slug);
  const prev = all[(idx - 1 + all.length) % all.length];
  const next = all[(idx + 1) % all.length];
  const ld = jsonLd(p);

  return (
    <>
      <ChainCanvas variant="portfolio" />
      <div className="page-founder">
        <div className="wrap">
          {ld && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }}
            />
          )}

          <header className="project-hero">
            <nav className="crumb" aria-label="Breadcrumb">
              <Link href="/">home</Link> / <Link href="/portfolio">portfolio</Link> /{" "}
              <Link href="/portfolio#btechs">btechs</Link> / {p.slug}
            </nav>
            <div className="kicker">// {category?.label} · built through <Link href="/roles/btechs">Btechs</Link></div>
            <h1>{p.name}</h1>
            <p className="tagline">{p.tagline}</p>
            <div className="facts">
              <span>Status <b>{maturityLabel(p.maturity)}</b></span>
              <span>Built <b>{period(p.dates)}</b></span>
              <span>Org <b>Btechs</b></span>
              <span>Role <b>Founder &amp; Technical Lead</b></span>
            </div>
            <div className="cta-row">
              {p.demoUrl && (
                <a className="btn primary" href={p.demoUrl} target="_blank" rel="noreferrer">
                  {p.maturity === "production" ? "Open the live site ↗" : "Open the live demo ↗"}
                </a>
              )}
              {p.repoUrl && (
                <a className="btn" href={p.repoUrl} target="_blank" rel="noreferrer">Source on GitHub ↗</a>
              )}
              <Link className="btn" href="/portfolio#btechs">All projects</Link>
            </div>
            <figure className="project-figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image.src} alt={p.image.alt} width={1440} height={810} />
              {p.image.caption && <figcaption>{p.image.caption}</figcaption>}
            </figure>
          </header>

          <section className="section" aria-labelledby="overview-h">
            <h2 id="overview-h">Overview</h2>
            <div className="detail-grid">
              <div className="prose-block">
                <p>{p.overview}</p>
                <h3 className="detail-label">The problem</h3>
                <p className="problem-callout">{p.problem}</p>
              </div>
              <div className="detail-stack">
                <Panel title="My contribution" items={p.contribution} />
              </div>
            </div>
          </section>

          <section className="section" aria-labelledby="arch-h">
            <h2 id="arch-h">Architecture</h2>
            <div className="detail-grid">
              <div className="detail-stack">
                <Panel title="How it fits together" items={p.architecture} />
              </div>
              <div className="detail-stack">
                <Reveal className="panel">
                  <h3>Technology</h3>
                  <div className="chips" style={{ marginTop: 4 }}>
                    {p.tech.map((t, i) => (
                      <span className={`chip ${i % 2 ? "g" : ""}`} key={t}>{t}</span>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {p.gallery?.length > 0 && (
            <section className="section" aria-label="Diagrams and screenshots">
              <div className="gallery">
                {p.gallery.map((g) => (
                  <Reveal key={g.src}>
                    <figure className="project-figure" style={{ marginTop: 0 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={g.src} alt={g.alt} loading="lazy" />
                      {g.caption && <figcaption>{g.caption}</figcaption>}
                    </figure>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          <section className="section" aria-labelledby="cap-h">
            <h2 id="cap-h">Capabilities &amp; validation</h2>
            <div className="detail-grid">
              <Panel title="Implemented capabilities" items={p.capabilities} />
              <div className="detail-stack">
                <Panel title="Validation & evidence" items={p.validation} />
                <Reveal className="panel sources">
                  <h3>Sources for this page</h3>
                  <ul>
                    {p.sources.map((s) => (
                      <li key={s.label}>{s.label} <code>{s.ref}</code></li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </section>

          <section className="section" style={{ paddingBottom: 40 }}>
            <div className="project-pager">
              <Link className="btn" href={`/portfolio/${prev.slug}`}>← {prev.name}</Link>
              <Link className="btn primary" href="/contact">Talk about this project</Link>
              <Link className="btn" href={`/portfolio/${next.slug}`}>{next.name} →</Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
