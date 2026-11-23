import Link from "next/link";
import Reveal from "../components/Reveal";
import CompanyMark from "../components/CompanyMark";
import ChainCanvas from "../components/ChainCanvas";
import { TimelineChart } from "../components/Charts";
import ProjectCard from "../components/ProjectCard";
import Scramble from "../components/Scramble";
import Terminal from "../components/Terminal";
import { site, stats, roles, timeline, credentials, extraWork, portfolio } from "../lib/data";
import { featuredProjects, publishedProjects, countWord, maturityLabel } from "../lib/projects";

function RoleCard({ r, showCompanyFirst = false }) {
  return (
    <Link href={`/roles/${r.slug}`} className={`card ${r.kind}`}>
      <div className="card-head">
        <CompanyMark role={r} size={42} compact bare />
        <div>
          <div className="role">
            {r.title} <span className="co">· {r.company}</span>
          </div>
          <div className="meta">{`${r.location} · ${r.dates}`}</div>
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
  const builds = featuredProjects();
  const engineeringCount = publishedProjects().length;
  const siteCount = portfolio.groups.reduce((a, g) => a + g.sites.length, 0);
  const bootLines = [
    { cmd: "boot pauloes.sys --region nyc", ok: "ok", tone: "dim" },
    { cmd: "load enterprise_platforms --years 12", ok: "ok", tone: "dim" },
    { cmd: "mount founder/btechs", ok: "ok", tone: "dim" },
    ...builds.map((p) => ({ cmd: `run ${p.slug}`, ok: maturityLabel(p.maturity).toLowerCase() })),
    { cmd: `index portfolio --projects ${engineeringCount} --sites ${siteCount}`, ok: "ok" },
    { cmd: "status", ok: "building", tone: "hi" },
  ];

  return (
    <>
      <ChainCanvas variant="home" />
      <div className="wrap">
        {/* hero */}
        <section className="hero">
          <div className="hero-meta" aria-label="At a glance">
            <span className="hm live"><i aria-hidden="true" />Founder · Btechs</span>
            <span className="hm">12+ yrs · platform PM</span>
            <span className="hm">Technical PM · New York</span>
          </div>
          <h1>
            Product roadmaps <Scramble className="accent" text="and" /> the
            infrastructure underneath them.
          </h1>
          <p className="sub">
            <b>12+ years shipping platform products at enterprise scale</b> — and for the
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
            {stats.map((s, i) => (
              <div className="stat" key={s.l}>
                <div className="idx" aria-hidden="true">{String(i + 1).padStart(2, "0")} / {String(stats.length).padStart(2, "0")}</div>
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

        {/* now — terminal boot sequence */}
        <section className="section" id="now">
          <h2>Now</h2>
          <div className="now">
            <div className="now-copy">
              <p className="section-sub">What&rsquo;s running right now.</p>
              <p>
                Btechs is where I build: research infrastructure for MIT&rsquo;s Digital Currency
                Initiative, privacy and identity tooling, and AI agents that do real operational
                work. Each one goes from customer problem to architecture to tested, shipped code.
              </p>
              <ul className="now-list">
                {builds.map((p) => (
                  <li key={p.slug}><b>{p.name}</b> — {maturityLabel(p.maturity)}</li>
                ))}
              </ul>
            </div>
            <Reveal><Terminal lines={bootLines} /></Reveal>
          </div>
        </section>

        {/* now building */}
        <section className="section" id="building">
          <h2>Building</h2>
          <p className="section-sub">
            The founder chapter — two mission-driven ventures where the entire product
            lifecycle is owned in one seat.
          </p>
          <Reveal className="cards">
            {founders.map((r) => <RoleCard r={r} key={r.slug} />)}
          </Reveal>
        </section>

        {/* enterprise track record */}
        <section className="section" id="enterprise">
          <h2>Enterprise</h2>
          <p className="section-sub">
            The decade of platform depth the founder chapter is built on.
          </p>
          <Reveal className="cards">
            {enterprise.map((r) => <RoleCard r={r} key={r.slug} showCompanyFirst />)}
          </Reveal>
        </section>

        {/* fellowships */}
        <section className="section" id="fellowship">
          <h2>Fellowship</h2>
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

        {/* selected builds — Btechs engineering projects (lib/projects.js) */}
        <section className="section" id="builds">
          <h2>Selected Builds</h2>
          <p className="section-sub">
            Products, AI systems, and infrastructure I&rsquo;m building through Btechs —
            from problem to architecture to tested, shipped code.
          </p>
          <Reveal className="project-grid">
            {builds.map((p) => <ProjectCard p={p} variant="feature" key={p.slug} />)}
          </Reveal>
          <div className="builds-foot">
            <Link href="/portfolio#btechs">
              Explore all {countWord(engineeringCount)} engineering projects →
            </Link>
          </div>
        </section>

        {/* portfolio explorer teaser */}
        <section className="section" id="portfolio">
          <h2>Portfolio</h2>
          <p className="section-sub">
            {countWord(engineeringCount, { capitalize: true })} Btechs engineering projects and{" "}
            {countWord(siteCount)} properties across {countWord(portfolio.groups.length)} arenas —
            every product and site built or owned, with what shipped on each.
          </p>
          <Reveal className="story-band">
            <div>
              <div className="t">View the portfolio.</div>
              <div className="s">
                Engineering projects with architecture and validation, plus real screenshots
                and released features on every site — from btechs.io to the Bloomberg estates.
              </div>
            </div>
            <div className="spacer" />
            <Link className="btn primary" href="/portfolio">View portfolio →</Link>
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
    </>
  );
}
