"use client";

import { useEffect, useState } from "react";

/**
 * Fixed heads-up display chrome: corner brackets, a scroll-progress rail
 * along the top, and a small telemetry strip (New York time, live).
 * Purely decorative — aria-hidden, pointer-events off, and static under
 * prefers-reduced-motion.
 */
export default function HudFrame() {
  const [progress, setProgress] = useState(0);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
    });
    const tick = () => setClock(fmt.format(new Date()));
    onScroll();
    tick();
    const id = setInterval(tick, 1000);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      clearInterval(id);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="hud" aria-hidden="true">
      <div className="hud-progress" style={{ transform: `scaleX(${progress})` }} />
      <span className="hud-corner tl" />
      <span className="hud-corner tr" />
      <span className="hud-corner bl" />
      <span className="hud-corner br" />
      <div className="hud-telemetry">
        <span>SYS · PB-01</span>
        <span className="sep">/</span>
        <span>NEW YORK · {clock || "--:--:--"} ET</span>
        <span className="sep">/</span>
        <span>{String(Math.round(progress * 100)).padStart(3, "0")}%</span>
      </div>
    </div>
  );
}
