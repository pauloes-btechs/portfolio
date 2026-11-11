import Link from "next/link";
import { projectMilestones, formatMonth } from "../lib/projects";

/**
 * Nested project milestones that branch off the Btechs chapter on /story.
 * The career spine stays the main chain; these are smaller nodes grown from
 * one founder block. Plain links in an ordered list: keyboard- and
 * touch-friendly, readable without hover, and calm under reduced motion
 * (the fade-in is CSS-only and disabled by prefers-reduced-motion).
 */
export default function ProjectBranch() {
  const milestones = projectMilestones();
  if (!milestones.length) return null;
  return (
    <div className="branch">
      <h3 className="branch-title" id="branch-title">What I&rsquo;m building through Btechs</h3>
      <p className="branch-sub">Projects in the order they shipped — each links to its architecture and evidence.</p>
      <ol className="branch-list">
        {milestones.map((m) => (
          <li className="branch-item" key={m.slug}>
            <Link className="branch-node" href={`/portfolio/${m.slug}`}>
              <span className="branch-thumb" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.image.src} alt="" loading="lazy" />
              </span>
              <span>
                <time className="branch-date" dateTime={m.date}>{formatMonth(m.date)}</time>
                <span className="branch-name">{m.title}</span>
                <span className="branch-detail">{m.detail}</span>
              </span>
              <span className="branch-go" aria-hidden="true">{m.name} →</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
