import Link from "next/link";
import ChainCanvas from "../../components/ChainCanvas";
import Reveal from "../../components/Reveal";
import SiteCard from "../../components/SiteCard";
import ProjectCard from "../../components/ProjectCard";
import { portfolio } from "../../lib/data";
import { publishedProjects, projectsByCategory, countWord } from "../../lib/projects";

const totalSites = portfolio.groups.reduce((a, g) => a + g.sites.length, 0);
const totalProjects = publishedProjects().length;

export const metadata = {
  title: "Portfolio",
  description: `${countWord(totalProjects, { capitalize: true })} Btechs engineering projects — AI agents, Bitcoin infrastructure, and research platforms — plus ${countWord(totalSites)} properties across ${countWord(portfolio.groups.length)} arenas, from founder builds to the Bloomberg estates.`,
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  const categories = projectsByCategory();
  return (
    <>
      <ChainCanvas variant="portfolio" />
      <div className="wrap">
        <header className="role-hero portfolio-hero">
          <div className="kicker">{portfolio.kicker}</div>
          <h1>Portfolio</h1>
          <p className="lede">
            What I&rsquo;m building through Btechs — software products, AI systems, and
            infrastructure, each with its architecture and the evidence behind it — and the
            {" "}{countWord(totalSites)} digital properties shipped and owned before and alongside it.
          </p>
          <div className="explorer-stats" aria-label="Portfolio at a glance">
            <span><b>{totalProjects}</b> engineering projects</span>
            <span><b>{totalSites}</b> properties</span>
            <span><b>{portfolio.groups.length}</b> arenas</span>
            <span><b>1M+</b> monthly users served</span>
            <span><b>200+</b> features released</span>
          </div>
        </header>

        {/* Part 1 — Btechs: Products & Engineering */}
        <section className="explorer-part" id="btechs" aria-labelledby="btechs-title">
          <div className="part-kicker">Part 1 · Btechs — Founder &amp; Technical Lead</div>
          <h2 className="part-title" id="btechs-title">Products &amp; Engineering</h2>
          <p className="part-sub">
            Projects I&rsquo;m building through{" "}
            <Link href="/roles/btechs">Btechs</Link>. Maturity labels reflect what the code
            and tests prove today — not what a README hopes.
          </p>
          <nav className="category-nav" aria-label="Project categories">
            {categories.map((c) => (
              <a href={`#${c.id}`} key={c.id}>{c.label} · {c.projects.length}</a>
            ))}
          </nav>
          {categories.map((c) => (
            <section className="category" id={c.id} key={c.id} aria-labelledby={`${c.id}-h`}>
              <h3 id={`${c.id}-h`}>{c.label}</h3>
              <p className="category-sub">{c.blurb}</p>
              <Reveal className="project-grid">
                {c.projects.map((p) => <ProjectCard p={p} key={p.slug} />)}
              </Reveal>
            </section>
          ))}
        </section>

        {/* Part 2 — Digital Platforms & Professional Work (unchanged groups) */}
        <section className="explorer-part" id="platforms" aria-labelledby="platforms-title">
          <div className="part-kicker">Part 2 · {totalSites} properties · {portfolio.groups.length} arenas</div>
          <h2 className="part-title" id="platforms-title">Digital Platforms &amp; Professional Work</h2>
          <p className="part-sub">{portfolio.sub}</p>
        </section>

        {portfolio.groups.map((g) => (
          <section className="section" id={g.id} key={g.id}>
            <h2>{g.label}</h2>
            <p className="section-sub">{g.blurb}</p>
            <Reveal className="site-grid">
              {g.sites.map((s) => (
                <SiteCard s={s} hue={g.hue} key={s.url} />
              ))}
            </Reveal>
          </section>
        ))}

        <section className="section" style={{ paddingBottom: 40 }}>
          <div className="cta-row">
            <Link className="btn" href="/story">← The story</Link>
            <Link className="btn primary" href="/contact">Get in touch</Link>
          </div>
        </section>
      </div>
    </>
  );
}
