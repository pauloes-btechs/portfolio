import ChainCanvas from "../../components/ChainCanvas";
import Reveal from "../../components/Reveal";
import SiteCard from "../../components/SiteCard";
import { portfolio } from "../../lib/data";

export const metadata = {
  title: "Portfolio",
  description:
    "Fifteen properties across four arenas: founder builds owned end to end, and the Bloomberg estates owned as Senior Technical Product Manager.",
};

export default function PortfolioPage() {
  const totalSites = portfolio.groups.reduce((a, g) => a + g.sites.length, 0);
  return (
    <>
      <ChainCanvas variant="portfolio" />
      <div className="wrap">
        <header className="role-hero portfolio-hero">
          <div className="kicker">{portfolio.kicker}</div>
          <h1>Portfolio</h1>
          <p className="lede">{portfolio.sub}</p>
          <div className="explorer-stats" aria-hidden="true">
            <span><b>{totalSites}</b> properties</span>
            <span><b>{portfolio.groups.length}</b> arenas</span>
            <span><b>1M+</b> monthly users served</span>
            <span><b>200+</b> features released</span>
          </div>
        </header>

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
            <a className="btn" href="/story">← The story</a>
            <a className="btn primary" href="/contact">Get in touch</a>
          </div>
        </section>
      </div>
    </>
  );
}
