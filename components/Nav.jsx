import Link from "next/link";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-name">
          PAULOES BERHE<span className="dot"> ▮</span>
        </Link>
        <div className="nav-links">
          <Link href="/story">Story</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/#building">Building</Link>
          <Link href="/#enterprise">Enterprise</Link>
          <Link href="/#fellowship">Fellowship</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
