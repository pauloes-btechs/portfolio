// SVG chart components — server-rendered, dependency-free.
// Method: dataviz skill — form first, validated palette (dark surface #10161F):
// blue #3987E5 · orange #D95926 · aqua #199E70 · emphasis-gray #4A545E · green #0CA30C.
// Direct labels on every mark (no value-guessing); native <title> tooltips.

const INK = "#E6EDF3";
const INK3 = "#8B949E";
const GRID = "#21262D";
const BLUE = "#3987E5";
const AQUA = "#199E70";
const GREEN = "#0CA30C";
const DEGRAY = "#4A545E";

/* ---------- 1. Fees: before → after (emphasis form, indexed) ---------- */
export function FeesChart() {
  // Indexed: traditional rails = 100, Bitcoinized settlement < 10 (fees cut >90%).
  const W = 560, H = 180, L = 190, max = 100, bw = 30;
  const rows = [
    { label: "Traditional payment rails", v: 100, c: DEGRAY, vl: "100 (indexed)" },
    { label: "Bitcoinized settlement (BTCPayServer)", v: 9, c: GREEN, vl: "< 10" },
  ];
  const x = (v) => L + (v / max) * (W - L - 70);
  return (
    <div className="viz">
      <div className="viz-title">Transaction fees: before → after</div>
      <div className="viz-sub">Relative fee cost per settlement, indexed to traditional rails = 100</div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img"
        aria-label="Bar chart: Bitcoinized settlement fees are more than 90 percent lower than traditional payment rails, indexed 100 versus under 10.">
        {[0, 25, 50, 75, 100].map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={28} x2={x(t)} y2={H - 34} stroke={GRID} strokeWidth="1" />
            <text x={x(t)} y={H - 18} fontSize="10" fill={INK3} textAnchor="middle">{t}</text>
          </g>
        ))}
        {rows.map((r, i) => {
          const y = 40 + i * (bw + 26);
          return (
            <g key={r.label}>
              <title>{`${r.label}: ${r.vl}`}</title>
              <text x={L - 10} y={y + bw / 2 + 4} fontSize="11.5" fill={INK} textAnchor="end">{r.label}</text>
              <rect x={L} y={y} width={Math.max(x(r.v) - L, 3)} height={bw} rx="4" fill={r.c} />
              <text x={x(r.v) + 8} y={y + bw / 2 + 4} fontSize="12" fontWeight="700" fill={INK}>{r.vl}</text>
            </g>
          );
        })}
      </svg>
      <div className="viz-note">Fees cut by more than 90% for small-business settlement. Indexed values; shipped on BTCPayServer.</div>
    </div>
  );
}

/* ---------- 2a. CityU: annual infrastructure spend ---------- */
export function SpendChart() {
  const W = 480, H = 170, L = 120, max = 100, bw = 28;
  const rows = [
    { label: "Before", v: 100, c: DEGRAY, vl: "100 (indexed)" },
    { label: "After", v: 50, c: BLUE, vl: "50 — $125K/yr saved" },
  ];
  const x = (v) => L + (v / max) * (W - L - 120);
  return (
    <div className="viz">
      <div className="viz-title">Annual infrastructure spend — halved</div>
      <div className="viz-sub">Department infrastructure spend, indexed. $125K cut per year.</div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img"
        aria-label="Bar chart: annual infrastructure spend cut in half, a 125 thousand dollar annual reduction.">
        {[0, 50, 100].map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={24} x2={x(t)} y2={H - 32} stroke={GRID} strokeWidth="1" />
            <text x={x(t)} y={H - 16} fontSize="10" fill={INK3} textAnchor="middle">{t}</text>
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
      <div className="viz-note">Consolidation, resource management, and licensing optimization.</div>
    </div>
  );
}

/* ---------- 2b. CityU: project time reduction ---------- */
export function TimeChart() {
  const W = 480, H = 170, L = 120, max = 100, bw = 28;
  const rows = [
    { label: "Before", v: 100, c: DEGRAY, vl: "100 (indexed)" },
    { label: "After", v: 20, c: AQUA, vl: "20 — 80% faster" },
  ];
  const x = (v) => L + (v / max) * (W - L - 110);
  return (
    <div className="viz">
      <div className="viz-title">Infrastructure project time — cut 80%</div>
      <div className="viz-sub">Time per infrastructure project after Azure DevOps automation, indexed.</div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img"
        aria-label="Bar chart: infrastructure project time reduced by 80 percent after Azure DevOps automation.">
        {[0, 50, 100].map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={24} x2={x(t)} y2={H - 32} stroke={GRID} strokeWidth="1" />
            <text x={x(t)} y={H - 16} fontSize="10" fill={INK3} textAnchor="middle">{t}</text>
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
      <div className="viz-note">Repeatability, automation, and scale — PowerShell-scripted on Azure DevOps.</div>
    </div>
  );
}

/* ---------- 2c. CityU: $2.8M program coordination surface ---------- */
export function ProgramChart() {
  const W = 480, H = 190, L = 140, max = 10, bw = 24;
  const rows = [
    { label: "Vendors", v: 3 },
    { label: "Teams", v: 5 },
    { label: "Network products", v: 10 },
  ];
  const x = (v) => L + (v / max) * (W - L - 60);
  return (
    <div className="viz">
      <div className="viz-title">The $2.8M program — coordination surface</div>
      <div className="viz-sub">One-year modernization program scoped from his own infrastructure diagramming</div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img"
        aria-label="Bar chart: the 2.8 million dollar program coordinated 3 vendors, 5 teams, and 10 network products.">
        {rows.map((r, i) => {
          const y = 26 + i * (bw + 22);
          return (
            <g key={r.label}>
              <title>{`${r.label}: ${r.v}`}</title>
              <text x={L - 10} y={y + bw / 2 + 4} fontSize="11.5" fill={INK} textAnchor="end">{r.label}</text>
              <rect x={L} y={y} width={Math.max(x(r.v) - L, 3)} height={bw} rx="4" fill={BLUE} />
              <text x={x(r.v) + 8} y={y + bw / 2 + 4} fontSize="12" fontWeight="700" fill={INK}>{r.v}</text>
            </g>
          );
        })}
      </svg>
      <div className="viz-note">Sequential single-hue: these are magnitudes of one program, not competing series.</div>
    </div>
  );
}

/* ---------- 3. Bloomberg: audits row (status, icon + label) ---------- */
export function AuditsRow() {
  const audits = ["Audit 1", "Audit 2", "Audit 3", "Audit 4", "Audit 5", "Audit 6"];
  return (
    <div className="viz">
      <div className="viz-title">GDPR / CCPA audits — 6 for 6</div>
      <div className="viz-sub">100% pass rate across six privacy audits, privacy-by-design and consent frameworks</div>
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
