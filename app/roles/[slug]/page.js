import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "../../../components/Reveal";
import CompanyMark from "../../../components/CompanyMark";
import ChainCanvas from "../../../components/ChainCanvas";
import {
  FeesChart, SpendChart, TimeChart, ProgramChart, AuditsRow, KpiRow,
} from "../../../components/Charts";
import { roles, extraWork } from "../../../lib/data";

const allRoles = [...roles, ...extraWork];

function VendorChips({ vendors, small = false }) {
  return (
    <div className={`vendor-strip${small ? " small" : ""}`}>
      {vendors.map((v) => (
        <span className="vendor" key={v.name} title={v.name}>
          {v.logo ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={v.logo} alt={v.name} loading="lazy" />
          ) : (
            <span className="vendor-name">{v.name}</span>
          )}
        </span>
      ))}
    </div>
  );
}

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
      <>
        <Reveal>
          <KpiRow
            items={[
              { n: "1,000+", l: "Refugees earned diplomas in financial literacy & Bitcoin P2P" },
              { n: "125+", l: "3rd/4th-year CS students in two-day workshops" },
              { n: "100+", l: "Blockstream Jade wallets granted · 2 miners to the university" },
              { n: "4", l: "Flagship projects led by workshop graduates" },
            ]}
          />
        </Reveal>
      </>
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
  if (slug === "btechs") {
    return (
      <Reveal>
        <KpiRow
          items={[
            { n: "Live", l: "DCI Global Research Map in production" },
            { n: "9", l: "Universities on the Global Mapping committee" },
            { n: "4", l: "Applied AI/ML workshop tracks on Google Cloud" },
            { n: "E2E", l: "Product, architecture, build & ops in one seat" },
          ]}
        />
      </Reveal>
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
              <Link href="/">home</Link> / <span>roles</span> / {role.slug}
            </div>
            <div className="hero-head">
              <CompanyMark role={role} size={72} />
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
                {role.slug === "bitcoin-innovation-hub" && (
                  <>
                    <div style={{ height: 16 }} />
                    <Reveal>
                      <FeesChart />
                    </Reveal>
                  </>
                )}
                {role.vendors && role.vendorsPlacement === "sidebar" && (
                  <>
                    <div style={{ height: 16 }} />
                    <Reveal className="panel">
                      <h3>{role.vendorsHeading || "Vendors & Partners"}</h3>
                      {role.vendorsSub && <p className="panel-sub">{role.vendorsSub}</p>}
                      <VendorChips vendors={role.vendors} small />
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

          {role.vendors && role.vendorsPlacement !== "sidebar" && (
            <section className="section">
              <h2>{role.vendorsHeading || "Vendors & Partners"}</h2>
              {role.vendorsSub && <p className="section-sub">{role.vendorsSub}</p>}
              <Reveal>
                <VendorChips vendors={role.vendors} />
              </Reveal>
            </section>
          )}

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
