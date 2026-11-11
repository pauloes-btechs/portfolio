import Link from "next/link";
import { maturityLabel } from "../lib/projects";

/**
 * A Btechs engineering project. Visually kin to SiteCard (framed visual,
 * mono labels, green seal) but built for software products rather than
 * websites: problem statement, maturity, stack, and verified highlights.
 *
 * variant="feature" — homepage Selected Builds (lean)
 * variant="explorer" — /portfolio grid (adds highlights + links)
 */
export default function ProjectCard({ p, variant = "explorer" }) {
  const explorer = variant === "explorer";
  const href = `/portfolio/${p.slug}`;
  return (
    <article className={`project-card ${variant}`}>
      <Link href={href} className="project-media" tabIndex={-1} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image.src} alt="" loading="lazy" width={1440} height={810} />
        {p.image.kind === "render" && <span className="media-tag">concept render</span>}
      </Link>
      <div className="project-body">
        <div className="project-kicker">
          <span className="project-org">Btechs</span>
          <span className={`maturity m-${p.maturity}`}>{maturityLabel(p.maturity)}</span>
        </div>
        <h3 className="project-name">
          <Link href={href}>{p.name}</Link>
        </h3>
        <p className="project-problem">{p.summary}</p>
        {explorer && (
          <ul className="project-highlights">
            {p.highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
        )}
        <div className="project-tech" aria-label="Technologies">
          {p.tech.slice(0, explorer ? 4 : 3).map((t) => (
            <span className="chip" key={t}>{t}</span>
          ))}
        </div>
        <div className="project-links">
          <Link href={href} className="project-more" aria-label={`${p.name} — project details`}>
            Project details
          </Link>
          {explorer && p.demoUrl && (
            <a href={p.demoUrl} target="_blank" rel="noreferrer">Live ↗</a>
          )}
          {explorer && p.repoUrl && (
            <a href={p.repoUrl} target="_blank" rel="noreferrer">GitHub ↗</a>
          )}
        </div>
      </div>
    </article>
  );
}
