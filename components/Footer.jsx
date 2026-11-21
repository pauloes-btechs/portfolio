import Link from "next/link";
import { site } from "../lib/data";

/** Closing call-to-action, a signal-trace divider, and mono link rows. */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-cta">
        <p className="footer-kicker">// end of transmission</p>
        <p className="footer-title display">
          Roadmaps and infrastructure. <span className="accent">Let&rsquo;s build what&rsquo;s next.</span>
        </p>
        <Link className="btn primary" href="/contact">Start the conversation →</Link>
      </div>

      <svg className="footer-trace" viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true">
        <path className="t1" d="M0 46 C 120 20, 240 70, 360 44 S 600 18, 720 46 S 960 74, 1080 40 S 1180 30, 1200 44" />
        <path className="t2" d="M0 52 C 160 70, 300 26, 460 50 S 700 76, 860 48 S 1080 22, 1200 52" />
      </svg>

      <div className="footer-inner">
        <span>© {new Date().getFullYear()} Pauloes Berhe · New York, NY</span>
        <span className="spacer" />
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={site.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={site.org} target="_blank" rel="noreferrer">btechs.io</a>
      </div>
    </footer>
  );
}
