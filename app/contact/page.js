import ContactForm from "../../components/ContactForm";
import ChainCanvas from "../../components/ChainCanvas";
import { site } from "../../lib/data";

export const metadata = { title: "Contact" };

const channels = [
  { k: "email", v: site.email, href: `mailto:${site.email}` },
  { k: "linkedin", v: "in/pauloes", href: site.linkedin, ext: true },
  { k: "github", v: "pauloes-btechs", href: site.github, ext: true },
  { k: "company", v: "btechs.io", href: site.org, ext: true },
];

export default function ContactPage() {
  return (
    <>
    <ChainCanvas variant="minimal" />
    <div className="wrap">
      <section className="role-hero contact-hero">
        <div className="kicker">// open channel · new york</div>
        <h1>Get in <span className="co">touch</span></h1>
        <p className="lede">
          Hiring managers, recruiters, researchers, and mission-driven builders —
          I read everything. You can also reach me directly at{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> or on{" "}
          <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>.
        </p>
      </section>
      <section className="section contact-grid" style={{ paddingBottom: 60 }}>
        <div className="term contact-console">
          <div className="term-bar">
            <span className="dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="term-title">NEW MESSAGE — TTY1</span>
            <span className="term-state">● ready</span>
          </div>
          <div className="contact-body"><ContactForm /></div>
        </div>
        <aside className="panel channels" aria-label="Direct channels">
          <h3>Direct channels</h3>
          <ul>
            {channels.map((c) => (
              <li key={c.k}>
                <span className="ck">{c.k}</span>
                <a href={c.href} {...(c.ext ? { target: "_blank", rel: "noreferrer" } : {})}>{c.v}{c.ext ? " ↗" : ""}</a>
              </li>
            ))}
          </ul>
          <p className="channels-note">Based in New York, NY.</p>
        </aside>
      </section>
    </div>
    </>
  );
}
