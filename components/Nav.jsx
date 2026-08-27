import Link from "next/link";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-name">
          PAULOES BERHE<span className="dot"> ▮</span>
        </Link>
        <div className="nav-links">
          <Link href="/story">The Story</Link>
          <Link href="/#now">Now Building</Link>
          <Link href="/#track-record">Enterprise</Link>
          <Link href="/#fellowships">Fellowships</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
