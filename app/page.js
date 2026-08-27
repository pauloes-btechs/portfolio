import Link from "next/link";
import Reveal from "../components/Reveal";
import { TimelineChart } from "../components/Charts";
import { site, stats, roles, timeline, credentials } from "../lib/data";

export default function Home() {
  const founders = roles.filter((r) => r.kind === "founder");
  const enterprise = roles.filter((r) => r.kind === "enterprise");

  return (
    <div className="wrap">
      {/* hero */}
      <section className="hero">
        <div className="kicker">// technical product manager · founder · new york</div>
        <h1>
          Product roadmaps <span className="accent">and</span> the
          infrastructure underneath them.
        </h1>
        <p className="sub">
          <b>11+ years shipping platform products at enterprise scale</b> — and for the
          past two years, founding mission-driven Bitcoin startups backed by{" "}
          <b>Jack Dorsey&rsquo;s #startsmall</b> initiative and{" "}
          <b>MIT&rsquo;s Digital Currency Initiative</b>. Customer discovery with
          universities, merchants, and policymakers; roadmap, build, launch, and adoption —
          owned end to end.
        </p>
        <div className="cta-row">
          <Link className="btn primary" href="/#now">See the work</Link>
          <Link className="btn green" href="/contact">Get in touch</Link>
          <a className="btn" href={site.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>

        <Reveal className="stats">
          {stats.map((s) => (
            <div className="stat" key={s.l}>
              <div className="n">{s.n}</div>
              <div className="l">{s.l}</div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* now building */}
      <section className="section" id="now">
        <h2>Now Building</h2>
        <p className="section-sub">
          The founder chapter — two mission-driven ventures where the entire product
          lifecycle is owned in one seat.
        </p>
        <Reveal className="cards">
          {founders.map((r) => (
            <Link href={`/roles/${r.slug}`} className="card founder" key={r.slug}>
              <div className="role">{r.title} <span className="co">· {r.company}</span></div>
              <div className="meta">{r.location} · {r.dates}</div>
              <p>{r.card}</p>
              <span className="more">Role, responsibilities &amp; outcomes</span>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* enterprise track record */}
      <section className="section" id="track-record">
        <h2>Enterprise Track Record</h2>
        <p className="section-sub">
          The decade of platform depth the founder chapter is built on.
        </p>
        <Reveal className="cards">
          {enterprise.map((r) => (
            <Link href={`/roles/${r.slug}`} className="card enterprise" key={r.slug}>
              <div className="role">{r.company}</div>
              <div className="meta">{r.title} · {r.dates}</div>
              <p>{r.card}</p>
              <span className="more">Role, responsibilities &amp; outcomes</span>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* timeline */}
      <section className="section" id="timeline">
        <h2>Timeline</h2>
        <Reveal>
          <TimelineChart data={timeline} />
        </Reveal>
      </section>

      {/* credentials */}
      <section className="section" id="credentials">
        <h2>Affiliations &amp; Credentials</h2>
        <Reveal className="chips">
          {credentials.map((c, i) => (
            <span className={`chip ${i % 2 ? "g" : ""}`} key={c}>{c}</span>
          ))}
        </Reveal>
      </section>
    </div>
  );
}
