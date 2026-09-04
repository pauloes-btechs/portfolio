import { site } from "../lib/data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span>© {new Date().getFullYear()} Pauloes Berhe</span>
        <span className="spacer" />
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={site.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={site.org} target="_blank" rel="noreferrer">btechs.io</a>
      </div>
    </footer>
  );
}
