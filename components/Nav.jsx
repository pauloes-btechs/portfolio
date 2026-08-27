import Link from "next/link";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-name">
          PAULOES BERHE<span className="dot"> ▮</span>
        </Link>
        <div className="nav-links">
          <Link href="/#now">Now Building</Link>
          <Link href="/#track-record">Track Record</Link>
          <Link href="/#timeline">Timeline</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
