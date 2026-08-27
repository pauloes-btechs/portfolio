import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "../../../components/Reveal";
import {
  FeesChart, SpendChart, TimeChart, ProgramChart, AuditsRow, KpiRow,
} from "../../../components/Charts";
import { roles } from "../../../lib/data";

export function generateStaticParams() {
  return roles.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }) {
  const role = roles.find((r) => r.slug === params.slug);
  if (!role) return {};
  return {
    title: `${role.title} · ${role.company}`,
    description: role.card,
  };
}

function RoleCharts({ slug }) {
  if (slug === "bitcoin-innovation-hub") {
    return (
      <Reveal>
        <FeesChart />
      </Reveal>
    );
  }
  if (slug === "city-university") {
    return (
      <>
        <Reveal className="viz-grid">
          <SpendChart />
          <TimeChart />
        </Reveal>
        <div style={{ height: 16 }} />
        <Reveal>
          <ProgramChart />
        </Reveal>
      </>
    );
  }
  if (slug === "bloomberg") {
    return (
      <>
        <Reveal>
          <KpiRow
            items={[
              { n: "20+", l: "Digital properties owned" },
              { n: "1,000+", l: "Pages across the estate" },
              { n: "1M+", l: "Monthly users served" },
              { n: "200+", l: "Features delivered via Agile" },
            ]}
          />
        </Reveal>
        <div style={{ height: 16 }} />
        <Reveal>
          <AuditsRow />
        </Reveal>
      </>
    );
  }
  return null;
}

export default function RolePage({ params }) {
  const role = roles.find((r) => r.slug === params.slug);
  if (!role) notFound();

  return (
    <div className="wrap">
      <section className="role-hero">
        <div className="crumb">
          <Link href="/">home</Link> / roles / {role.slug}
        </div>
        <h1>
          {role.title} <span className="co">· {role.company}</span>
        </h1>
        <div className="meta">
          {role.location} · {role.dates}
        </div>
        <p className="lede">{role.lede}</p>
      </section>

      <section className="section">
        <div className="two-col">
          <Reveal className="panel">
            <h3>Role &amp; Responsibilities</h3>
            <ul>
              {role.responsibilities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Reveal>
          <div>
            <Reveal className="panel">
              <h3>Skills built &amp; sharpened</h3>
              <div className="chips" style={{ marginTop: 4 }}>
                {role.skills.map((s, i) => (
                  <span className={`chip ${i % 2 ? "g" : ""}`} key={s}>{s}</span>
                ))}
              </div>
            </Reveal>
            {role.links.length > 0 && (
              <>
                <div style={{ height: 16 }} />
                <Reveal className="panel">
                  <h3>Proof &amp; links</h3>
                  <ul>
                    {role.links.map((l) => (
                      <li key={l.href}>
                        <a href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Outcomes, plotted</h2>
        <RoleCharts slug={role.slug} />
      </section>

      <section className="section" style={{ paddingBottom: 40 }}>
        <div className="cta-row">
          <Link className="btn" href="/">← All roles</Link>
          <Link className="btn primary" href="/contact">Work with me</Link>
        </div>
      </section>
    </div>
  );
}
