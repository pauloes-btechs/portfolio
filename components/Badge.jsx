// Monogram company badges — designed in the site's own language (hex block,
// inner circuit ticks, per-era hue) rather than reproducing trademarked logos.
const HUES = {
  blue:   { stroke: "#3987E5", fill: "rgba(57,135,229,0.10)", text: "#7FB3E8" },
  green:  { stroke: "#0CA30C", fill: "rgba(12,163,12,0.10)",  text: "#3FBE5A" },
  aqua:   { stroke: "#199E70", fill: "rgba(25,158,112,0.10)", text: "#34C08E" },
  orange: { stroke: "#D95926", fill: "rgba(217,89,38,0.10)",  text: "#E8824F" },
  violet: { stroke: "#8B7FE8", fill: "rgba(139,127,232,0.10)", text: "#A99FF0" },
};

export default function Badge({ mark = "?", hue = "blue", size = 54 }) {
  const c = HUES[hue] || HUES.blue;
  // flat-top hexagon path in a 100x100 box
  const hex = "M50 3 L91 26 L91 74 L50 97 L9 74 L9 26 Z";
  const inner = "M50 14 L81 32 L81 68 L50 86 L19 68 L19 32 Z";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      style={{ flexShrink: 0, display: "block" }}
    >
      <path d={hex} fill={c.fill} stroke={c.stroke} strokeWidth="2.5" strokeLinejoin="round" />
      <path d={inner} fill="none" stroke={c.stroke} strokeWidth="1" opacity="0.35" />
      {/* circuit ticks at the vertices */}
      {[[50, 3], [91, 26], [91, 74], [50, 97], [9, 74], [9, 26]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill={c.stroke} opacity="0.9" />
      ))}
      <text
        x="50" y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="ui-monospace, 'SF Mono', Menlo, monospace"
        fontWeight="700"
        fontSize={String(mark).length > 1 ? 30 : 40}
        fill={c.text}
        letterSpacing="1"
      >
        {mark}
      </text>
    </svg>
  );
}
