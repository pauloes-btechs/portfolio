import Link from "next/link";
import Reveal from "../components/Reveal";
import Badge from "../components/Badge";
import ChainCanvas from "../components/ChainCanvas";
import { TimelineChart } from "../components/Charts";
import { site, stats, roles, timeline, credentials, extraWork } from "../lib/data";

function RoleCard({ r, showCompanyFirst = false }) {
  return (
    <Link href={`/roles/${r.slug}`} className={`card ${r.kind}`}>
      <div className="card-head">
        {r.badge && <Badge mark={r.badge.mark} hue={r.badge.hue} size={46} />}
        <div>
          <div className="role">
            {showCompanyFirst ? r.company : (
              <>
                {r.title} <span className="co">· {r.company}</span>
              </>
            )}
          </div>
          <div className="meta">
            {showCompanyFirst ? `${r.title} · ${r.dates}` : `${r.location} · ${r.dates}`}
          </div>
        </div>
      </div>
      <p>{r.card}</p>
      <span className="more">Role, responsibilities &amp; outcomes</span>
    </Link>
  );
}

export default function Home() {
  const founders = roles.filter((r) => r.kind === "founder");
  const enterprise = roles.filter((r) => r.kind === "enterprise");
  const fellowships = roles.filter((r) => r.kind === "fellowship");
  const nonprofit = extraWork.filter((r) => r.kind === "nonprofit");
  const freelance = extraWork.filter((r) => r.kind === "freelance");

  return (
    <>
      <ChainCanvas variant="home" />
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
            <Link className="btn primary" href="/story">Take the journey →</Link>
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

          <Reveal className="story-band">
            <div>
              <div className="t">Twelve years, told as a journey.</div>
              <div className="s">
                A scroll experience through every chapter — each block seals into the next.
              </div>
            </div>
            <div className="spacer" />
            <Link className="btn primary" href="/story">Begin at 2014 →</Link>
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
            {founders.map((r) => <RoleCard r={r} key={r.slug} />)}
          </Reveal>
        </section>

        {/* enterprise track record */}
        <section className="section" id="track-record">
          <h2>Enterprise Track Record</h2>
          <p className="section-sub">
            The decade of platform depth the founder chapter is built on.
          </p>
          <Reveal className="cards">
            {enterprise.map((r) => <RoleCard r={r} key={r.slug} showCompanyFirst />)}
          </Reveal>
        </section>

        {/* fellowships */}
        <section className="section" id="fellowships">
          <h2>Fellowships</h2>
          <p className="section-sub">
            Selective programs, entered deliberately — cloud depth from Google,
            product craft from the UW Product Management Center.
          </p>
          <Reveal className="cards">
            {fellowships.map((r) => <RoleCard r={r} key={r.slug} showCompanyFirst />)}
          </Reveal>
        </section>

        {/* nonprofit + freelance render automatically once extraWork has entries */}
        {nonprofit.length > 0 && (
          <section className="section" id="nonprofit">
            <h2>Nonprofit Work</h2>
            <Reveal className="cards">
              {nonprofit.map((r) => <RoleCard r={r} key={r.slug} showCompanyFirst />)}
            </Reveal>
          </section>
        )}
        {freelance.length > 0 && (
          <section className="section" id="freelance">
            <h2>Freelance &amp; Consulting</h2>
            <Reveal className="cards">
              {freelance.map((r) => <RoleCard r={r} key={r.slug} showCompanyFirst />)}
            </Reveal>
          </section>
        )}

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
    </>
  );
}
