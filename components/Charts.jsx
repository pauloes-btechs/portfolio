// SVG chart components — server-rendered, dependency-free.
// Method: dataviz skill — form first, validated palette (dark surface #10161F):
// blue #3987E5 · orange #D95926 · aqua #199E70 · emphasis-gray #4A545E · green #0CA30C.
// Direct labels on every mark (no value-guessing); native <title> tooltips.

const INK = "#1F242B";
const INK3 = "#66707C";
const GRID = "#E2E6EA";
const BLUE = "#35618E";
const AQUA = "#1F7A66";
const GREEN = "#2F7D45";
const DEGRAY = "#9AA3AD";

/* ---------- 1. Fees: before → after (emphasis form, indexed) ---------- */
export function FeesChart() {
  // Compact, sidebar-friendly: labels sit above the bars so nothing clips.
  const W = 360, bw = 22, max = 100;
  const rows = [
    { label: "Traditional payment rails", v: 100, c: DEGRAY, vl: "100" },
    { label: "Bitcoinized settlement (BTCPayServer)", v: 9, c: GREEN, vl: "< 10" },
  ];
  const x = (v) => (v / max) * (W - 50);
  const H = 16 + rows.length * 58;
  return (
    <div className="viz">
      <div className="viz-title">Transaction fees: before → after</div>
      <div className="viz-sub">Fee cost per settlement, indexed to traditional rails = 100</div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 420, display: "block" }} role="img"
        aria-label="Bar chart: Bitcoinized settlement fees are more than 90 percent lower than traditional payment rails, indexed 100 versus under 10.">
        {rows.map((r, i) => {
          const y = 14 + i * 58;
          return (
            <g key={r.label}>
              <title>{`${r.label}: ${r.vl}`}</title>
              <text x={0} y={y} fontSize="11.5" fill={INK}>{r.label}</text>
              <rect x={0} y={y + 8} width={Math.max(x(r.v), 5)} height={bw} rx="4" fill={r.c} />
              <text x={x(r.v) + 8} y={y + 8 + bw / 2 + 4} fontSize="12" fontWeight="700" fill={INK}>{r.vl}</text>
            </g>
          );
        })}
      </svg>
      <div className="viz-note">Fees cut by more than 90% for small-business settlement. Shipped on BTCPayServer.</div>
    </div>
  );
}

/* ---------- 2a. CityU: annual infrastructure spend ---------- */
export function SpendChart() {
  const W = 480, H = 170, L = 120, max = 250, bw = 28;
  const rows = [
    { label: "Before", v: 250, c: DEGRAY, vl: "$250K/yr" },
    { label: "After", v: 125, c: BLUE, vl: "$125K/yr — $125K saved" },
  ];
  const x = (v) => L + (v / max) * (W - L - 150);
  const tick = (t) => (t === 0 ? "$0" : `$${t}K`);
  return (
    <div className="viz">
      <div className="viz-title">Annual infrastructure spend — halved</div>
      <div className="viz-sub">
        Consolidated physical servers onto VMware vSphere/ESXi VMs with Nimble NAS/SAN storage —
        seven full racks down to two — and moved colocation from a downtown datacenter to Sabey&apos;s
        facility 15 miles out for cheaper monthly hosting. Annual datacenter and maintenance spend
        fell from $250K to $125K.
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img"
        aria-label="Bar chart: annual infrastructure spend cut from 250 thousand dollars to 125 thousand dollars per year.">
        {[0, 125, 250].map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={24} x2={x(t)} y2={H - 32} stroke={GRID} strokeWidth="1" />
            <text x={x(t)} y={H - 16} fontSize="10" fill={INK3} textAnchor="middle">{tick(t)}</text>
          </g>
        ))}
        {rows.map((r, i) => {
          const y = 34 + i * (bw + 24);
          return (
            <g key={r.label}>
              <title>{`${r.label}: ${r.vl}`}</title>
              <text x={L - 10} y={y + bw / 2 + 4} fontSize="11.5" fill={INK} textAnchor="end">{r.label}</text>
              <rect x={L} y={y} width={Math.max(x(r.v) - L, 3)} height={bw} rx="4" fill={r.c} />
              <text x={x(r.v) + 8} y={y + bw / 2 + 4} fontSize="11.5" fontWeight="700" fill={INK}>{r.vl}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ---------- 2b. CityU: project time reduction ---------- */
export function TimeChart() {
  const W = 480, H = 170, L = 120, max = 16, bw = 28;
  const rows = [
    { label: "Before", v: 16, c: DEGRAY, vl: "16 hrs" },
    { label: "After", v: 3.2, c: AQUA, vl: "3.2 hrs — 80% faster" },
  ];
  const x = (v) => L + (v / max) * (W - L - 140);
  const tick = (t) => `${t}h`;
  return (
    <div className="viz">
      <div className="viz-title">Infrastructure project time — cut 80%</div>
      <div className="viz-sub">
        Repeatability, automation, and scale — Terraform and PowerShell pipelines on Azure DevOps
        cut the time to deploy per infrastructure project from 16 hrs to 3.2 hrs.
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img"
        aria-label="Bar chart: time to deploy per infrastructure project cut from 16 hours to about 3 hours after Azure DevOps automation.">
        {[0, 8, 16].map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={24} x2={x(t)} y2={H - 32} stroke={GRID} strokeWidth="1" />
            <text x={x(t)} y={H - 16} fontSize="10" fill={INK3} textAnchor="middle">{tick(t)}</text>
          </g>
        ))}
        {rows.map((r, i) => {
          const y = 34 + i * (bw + 24);
          return (
            <g key={r.label}>
              <title>{`${r.label}: ${r.vl}`}</title>
              <text x={L - 10} y={y + bw / 2 + 4} fontSize="11.5" fill={INK} textAnchor="end">{r.label}</text>
              <rect x={L} y={y} width={Math.max(x(r.v) - L, 3)} height={bw} rx="4" fill={r.c} />
              <text x={x(r.v) + 8} y={y + bw / 2 + 4} fontSize="11.5" fontWeight="700" fill={INK}>{r.vl}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ---------- 2c. CityU: $2.8M program coordination surface ---------- */
export function ProgramChart() {
  const stats = [
    { n: "3", label: "Vendors coordinated", sub: "Sabey \u00b7 Cisco \u00b7 Juniper" },
    { n: "5", label: "Teams aligned", sub: "One delivery motion across the university" },
    { n: "10", label: "Network products delivered", sub: "The core of the network upgrade" },
  ];
  return (
    <div className="viz">
      <div className="viz-title">The $2.8M program: coordination surface</div>
      <div className="viz-sub">A two-year network infrastructure upgrade, diagrammed, diagnosed, and led end to end</div>
      <div className="program-cols">
        <div className="program-story">
          <p>
            What began as his own infrastructure diagramming became the $2.8M
            core of a two-year network infrastructure upgrade, the largest
            project he had led to that point, coordinating three vendors, five
            teams, and ten network products in one motion.
          </p>
          <p>
            Hardware was procured straight through the first U.S.–China tariff
            war: shipment delays and cost escalations absorbed and managed
            across vendors, teams, legal, and executive stakeholders, a
            multimillion-dollar overhead process communicated up and delivered
            on.
          </p>
        </div>
        <div className="program-data stat-stack" role="list" aria-label="The 2.8 million dollar program coordinated 3 vendors, 5 teams, and 10 network products.">
          {stats.map((s) => (
            <div className="stat-tile" role="listitem" key={s.label}>
              <div className="stat-n">{s.n}</div>
              <div className="stat-meta">
                <div className="stat-label">{s.label}</div>
                <div className="stat-sub">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- 3. Bloomberg: audits row (status, icon + label) ---------- */
export function AuditsRow() {
  const audits = ["GDPR", "CCPA", "ISO/IEC 27001", "ISO/IEC 27701", "SOC 2", "NIST CSF"];
  return (
    <div className="viz">
      <div className="viz-title">Audit frameworks — 6 for 6</div>
      <div className="viz-sub">100% pass rate across privacy and security audit frameworks, with privacy-by-design built into the product</div>
      <div className="audits">
        {audits.map((a) => (
          <div className="audit" key={a}>
            <div className="tick">✓</div>
            <div className="lab">{a}</div>
          </div>
        ))}
      </div>
      <div className="viz-note">Compliance treated as a product requirement, not a review at the end.</div>
    </div>
  );
}

/* ---------- 4. Career timeline (home) ---------- */
export function TimelineChart({ data }) {
  const START = 2014, NOW = 2026.65;
  const W = 980, H = 66 + data.length * 40, L = 210, R = 40;
  const x = (yr) => L + ((yr - START) / (NOW - START)) * (W - L - R);
  const colors = { blue: BLUE, green: GREEN, aqua: AQUA };
  const years = [2014, 2016, 2018, 2020, 2022, 2024, 2026];
  return (
    <div className="viz">
      <div className="viz-title">Twelve years, one arc</div>
      <div className="viz-sub">Enterprise platform depth (blue) → cloud training (aqua) → founder chapter (green)</div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img"
        aria-label="Timeline of roles from 2014 to present: City University of Seattle 2014 to 2023, Google Cloud fellowship 2021 to 2022, Bloomberg 2022 to 2024, Bitcoin Innovation Hub 2024 to 2026, BTechs December 2025 to present.">
        {years.map((yr) => (
          <g key={yr}>
            <line x1={x(yr)} y1={18} x2={x(yr)} y2={H - 30} stroke={GRID} strokeWidth="1" />
            <text x={x(yr)} y={H - 14} fontSize="11" fill={INK3} textAnchor="middle">{yr}</text>
          </g>
        ))}
        <line x1={x(NOW)} y1={14} x2={x(NOW)} y2={H - 30} stroke={GREEN} strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
        <text x={x(NOW)} y={11} fontSize="9.5" fill={GREEN} textAnchor="middle">now</text>
        {data.map((r, i) => {
          const y = 26 + i * 40;
          const end = r.end ?? NOW;
          return (
            <g key={r.label}>
              <title>{`${r.label}: ${Math.floor(r.start)}–${r.end ? Math.floor(r.end) : "present"}`}</title>
              <text x={L - 12} y={y + 12} fontSize="12" fill={INK} textAnchor="end">{r.label}</text>
              <rect x={x(r.start)} y={y} width={Math.max(x(end) - x(r.start), 6)} height={16} rx="4"
                fill={colors[r.color]} opacity="0.85" />
              {r.end === null && (
                <circle cx={x(NOW)} cy={y + 8} r="4" fill={GREEN}>
                  <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ---------- Bloomberg KPI row ---------- */
export function KpiRow({ items }) {
  return (
    <div className="stats" style={{ marginTop: 0 }}>
      {items.map((s) => (
        <div className="stat" key={s.l}>
          <div className="n">{s.n}</div>
          <div className="l">{s.l}</div>
        </div>
      ))}
    </div>
  );
}
