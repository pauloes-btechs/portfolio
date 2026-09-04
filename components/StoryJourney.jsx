"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import CompanyMark from "./CompanyMark";
import { story, roles } from "../lib/data";

/**
 * The scroll journey. A vertical chain spine runs down the left; as each
 * chapter enters the viewport its block "seals" (fills, links to the previous
 * one) and the chapter's era re-tints the page atmosphere. Each chapter ends
 * at the role it belongs to.
 */
export default function StoryJourney() {
  const wrapRef = useRef(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const chapters = wrapRef.current?.querySelectorAll("[data-chapter]");
    if (!chapters?.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = Number(e.target.dataset.chapter);
            setActive((a) => Math.max(a, idx));
            e.target.classList.add("in");
          }
        }
      },
      { threshold: 0.35 }
    );
    chapters.forEach((c) => io.observe(c));

    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const done = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? done / total : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const era = story[Math.min(active, story.length - 1)]?.era || "foundation";

  return (
    <div ref={wrapRef} className={`journey era-${era}`}>
      {/* spine */}
      <div className="spine" aria-hidden="true">
        <div className="spine-track" />
        <div className="spine-fill" style={{ height: `${progress * 100}%` }} />
        {story.map((c, i) => (
          <div
            key={c.slug}
            className={`spine-block ${i <= active ? "sealed" : ""}`}
            style={{ top: `${(i / (story.length - 1)) * 92 + 2}%` }}
          >
            <span>{i <= active ? "✓" : ""}</span>
          </div>
        ))}
      </div>

      {/* chapters */}
      {story.map((c, i) => {
        const role = roles.find((r) => r.slug === c.slug);
        return (
          <section key={c.slug} data-chapter={i} className={`chapter era-${c.era}`}>
            <div className="chapter-inner">
              <div className="chapter-year">{c.year}</div>
              <div className="chapter-head">
                {role && <CompanyMark role={role} size={60} />}
                <div>
                  <h2>{c.heading}</h2>
                  {role && (
                    <div className="chapter-meta">
                      {role.title} · {role.company}
                    </div>
                  )}
                </div>
              </div>
              <p className="chapter-text">{c.text}</p>
              <div className="chapter-foot">
                <div className="chapter-stat">
                  <span className="n">{c.stat.n}</span>
                  <span className="l">{c.stat.l}</span>
                </div>
                <Link className="btn primary" href={`/roles/${c.slug}`}>
                  Enter this chapter →
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      <section className="chapter era-founder journey-end">
        <div className="chapter-inner" style={{ textAlign: "center" }}>
          <h2>The next block is unwritten.</h2>
          <p className="chapter-text" style={{ margin: "16px auto 26px", maxWidth: 560 }}>
            Twelve years of shipping — enterprise scale, then founder scope.
            If your team is writing something worth building, let&rsquo;s talk.
          </p>
          <Link className="btn green" href="/contact">Start the conversation</Link>
        </div>
      </section>
    </div>
  );
}
