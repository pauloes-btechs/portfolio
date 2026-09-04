/**
 * A shipped site: browser-chrome frame around a real screenshot,
 * with the released-feature list in plain, readable text below.
 */
export default function SiteCard({ s, hue = "blue" }) {
  let host = s.url;
  try { host = new URL(s.url).host.replace(/^www\./, ""); } catch {}
  return (
    <a className={`site-card hue-${hue}`} href={s.url} target="_blank" rel="noreferrer">
      <div className="site-frame">
        <div className="site-bar">
          <span className="wdot r" /><span className="wdot y" /><span className="wdot g" />
          <span className="site-url">{host}</span>
          <span className="site-open">visit ↗</span>
        </div>
        <div className="site-shot">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.shot} alt={`Screenshot of ${s.name}`} loading="lazy" />
        </div>
      </div>
      <div className="site-meta">
        <div>
          <div className="site-name">{s.name}</div>
          <div className="site-role">{s.role}</div>
        </div>
        <span className="site-seal" aria-hidden="true">✓</span>
      </div>
      <div className="site-features-label">Features released</div>
      <ul className="site-features-static">
        {s.features.map((f) => <li key={f}>{f}</li>)}
      </ul>
    </a>
  );
}
