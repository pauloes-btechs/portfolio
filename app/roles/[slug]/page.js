import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "../../../components/Reveal";
import Badge from "../../../components/Badge";
import ChainCanvas from "../../../components/ChainCanvas";
import {
  FeesChart, SpendChart, TimeChart, ProgramChart, AuditsRow, KpiRow,
} from "../../../components/Charts";
import { roles, extraWork } from "../../../lib/data";

const allRoles = [...roles, ...extraWork];

export function generateStaticParams() {
  return allRoles.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }) {
  const role = allRoles.find((r) => r.slug === params.slug);
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
  if (slug === "google-cloud-fellow") {
    return (
      <Reveal>
        <KpiRow
          items={[
            { n: "12", l: "Weeks, hands-on with Google engineers" },
            { n: "GCP", l: "Compute · storage · networking · IAM · databases" },
            { n: "ACE", l: "Associate Cloud Engineer curriculum alignment" },
            { n: "2026", l: "ML Engineer track, in progress today" },
          ]}
        />
      </Reveal>
    );
  }
  if (slug === "uw-pm-fellow") {
    return (
      <Reveal>
        <KpiRow
          items={[
            { n: "1 / 50", l: "Selected nationally" },
            { n: "10", l: "Weeks at the UW PM Center" },
            { n: "Coach", l: "Selection led to a coaching seat" },
            { n: "CSPO", l: "Advanced Scrum Product Owner followed" },
          ]}
        />
      </Reveal>
    );
  }
  return null;
}

export default function RolePage({ params }) {
  const role = allRoles.find((r) => r.slug === params.slug);
  if (!role) notFound();

  const variant =
    role.kind === "founder" ? "founder"
    : role.kind === "fellowship" ? "fellowship"
    : role.kind === "enterprise" ? "enterprise"
    : "minimal";

  return (
    <>
      <ChainCanvas variant={variant} />
      <div className={`page-${role.kind}`}>
        <div className="wrap">
          <section className="role-hero">
            <div className="crumb">
              <Link href="/">home</Link> / <Link href="/story">story</Link> / {role.slug}
            </div>
            <div className="hero-head">
              {role.badge && <Badge mark={role.badge.mark} hue={role.badge.hue} size={78} />}
              <div>
                <h1>
                  {role.title} <span className="co">· {role.company}</span>
                </h1>
                <div className="meta">
                  {role.location} · {role.dates}
                </div>
              </div>
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
              <Link className="btn" href="/story">← Back to the journey</Link>
              <Link className="btn" href="/">All work</Link>
              <Link className="btn primary" href="/contact">Work with me</Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
