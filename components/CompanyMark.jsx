import Badge from "./Badge";

/**
 * The company's actual logo in a clean chip; falls back to the
 * monogram Badge when a role has no logo file yet.
 * data.js: logo: { src: "/logos/x.svg", wide?: true, dark?: true }
 */
export default function CompanyMark({ role, size = 46, compact = false }) {
  const l = role?.logo;
  if (!l) return role?.badge ? <Badge mark={role.badge.mark} hue={role.badge.hue} size={size} /> : null;
  const wide = l.wide && !compact;
  return (
    <span
      className={`co-mark${wide ? " wide" : ""}${l.dark ? " dark" : ""}${compact ? " compact" : ""}`}
      style={{ height: size, width: wide ? "auto" : size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={l.src} alt={`${role.company} logo`} loading="lazy" />
    </span>
  );
}
