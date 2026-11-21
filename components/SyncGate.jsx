"use client";
import { useEffect, useRef, useState } from "react";

const KEY = "hud-synced";
const HOLD_MS = 1400;

/**
 * First-visit intro: press and hold to "sync" with the site, or skip.
 * Shown once per browser session; never shown with reduced motion, to
 * crawlers (no JS), or when storage is unavailable. Content renders
 * underneath the whole time, so nothing is gated for real.
 */
export default function SyncGate() {
  const [open, setOpen] = useState(false);
  const [p, setP] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const raf = useRef(0);
  const start = useRef(0);

  useEffect(() => {
    let seen = true;
    try { seen = sessionStorage.getItem(KEY) === "1"; } catch { seen = true; }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!seen && !reduce) setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("gate-open");
    const onKey = (e) => { if (e.key === "Escape") finish(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("gate-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function finish() {
    try { sessionStorage.setItem(KEY, "1"); } catch { /* private mode */ }
    cancelAnimationFrame(raf.current);
    setP(1);
    setLeaving(true);
    setTimeout(() => setOpen(false), 520);
  }

  function tick(t) {
    const v = Math.min(1, (t - start.current) / HOLD_MS);
    setP(v);
    if (v >= 1) finish();
    else raf.current = requestAnimationFrame(tick);
  }

  function down(e) {
    if (e.type === "keydown" && e.key !== " " && e.key !== "Enter") return;
    if (e.repeat) return;
    e.preventDefault();
    start.current = performance.now();
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(tick);
  }

  function up() {
    if (p >= 1) return;
    cancelAnimationFrame(raf.current);
    setP(0);
  }

  if (!open) return null;
  const pct = Math.round(p * 100);
  const C = 2 * Math.PI * 54;

  return (
    <div className={`gate${leaving ? " leaving" : ""}`} role="dialog" aria-modal="true" aria-label="Intro">
      <div className="gate-scan" aria-hidden="true" />
      <div className="gate-top">
        <span>PAULOES.SYS</span>
        <span>SIGNAL · NEW YORK</span>
      </div>
      <div className="gate-center">
        <p className="gate-kicker">// product · infrastructure · bitcoin</p>
        <button
          type="button"
          className="gate-hold"
          onPointerDown={down}
          onPointerUp={up}
          onPointerLeave={up}
          onPointerCancel={up}
          onKeyDown={down}
          onKeyUp={up}
          onContextMenu={(e) => e.preventDefault()}
          autoFocus
          aria-label="Press and hold to enter the site"
        >
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="54" className="ring-bg" />
            <circle cx="60" cy="60" r="54" className="ring" strokeDasharray={C} strokeDashoffset={C * (1 - p)} />
          </svg>
          <span className="gate-pct">{String(pct).padStart(3, "0")}</span>
        </button>
        <p className="gate-label">{p > 0 ? "Syncing…" : "Hold to sync"}</p>
      </div>
      <button type="button" className="gate-skip" onClick={finish}>Skip intro →</button>
    </div>
  );
}
