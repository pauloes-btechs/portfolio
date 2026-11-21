"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/story", label: "Story" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/#builds", label: "Builds" },
  { href: "/#building", label: "Building" },
  { href: "/#enterprise", label: "Enterprise" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const path = usePathname() || "/";
  return (
    <nav className="nav" aria-label="Primary">
      <div className="nav-inner">
        <Link href="/" className="nav-name">
          PAULOES BERHE<span className="dot" aria-hidden="true"> ▮</span>
        </Link>
        <span className="nav-status" aria-hidden="true"><i /> BUILDING · BTECHS</span>
        <div className="nav-links">
          {LINKS.map((l) => {
            const active = !l.href.includes("#") && (path === l.href || path.startsWith(`${l.href}/`));
            return (
              <Link key={l.href} href={l.href} className={active ? "active" : undefined}
                aria-current={active ? "page" : undefined}>
                {l.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
