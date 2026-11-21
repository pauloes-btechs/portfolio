import Badge from "./Badge";

/**
 * The company's actual logo in a clean chip; falls back to the
 * monogram Badge when a role has no logo file yet.
 * data.js: logo: { src: "/logos/x.svg", wide?: true, dark?: true, onDark?: "/logos/x-white.svg" }
 *
 * bare — no chip: the logo sits directly on the dark ground (Story page),
 * using the `onDark` variant (transparent / light-ink) when one exists.
 */
export default function CompanyMark({ role, size = 46, compact = false, bare = false }) {
  const l = role?.logo;
  if (!l) return role?.badge ? <Badge mark={role.badge.mark} hue={role.badge.hue} size={size} /> : null;
  const wide = l.wide && !compact;
  const src = bare && l.onDark ? l.onDark : l.src;
  return (
    <span
      className={`co-mark${wide ? " wide" : ""}${l.dark && !bare ? " dark" : ""}${compact ? " compact" : ""}${bare ? " bare" : ""}`}
      style={{ height: size, width: wide ? "auto" : size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={`${role.company} logo`} loading="lazy" />
    </span>
  );
}
