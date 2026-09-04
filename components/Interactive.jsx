"use client";

import { useEffect } from "react";

/**
 * Sitewide micro-interactions (desktop, fine pointers only):
 *  · magnetic buttons  — .btn elements lean toward the cursor
 *  · card tilt         — .card / .site-card get subtle 3D tilt
 *  · cursor spotlight  — hovered surfaces get a light that follows the cursor
 * All driven by CSS variables; one delegated listener, rAF-throttled.
 * No-ops on touch devices and under prefers-reduced-motion.
 */
const TILT_SEL = ".card, .site-card, .stat, .viz, .panel, .story-band";
const TILT3D = new Set(["card", "site-card"]);

export default function Interactive() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let currentTilt = null;
    let currentBtn = null;
    let rafId = 0;
    let ev = null;

    const resetTilt = (el) => {
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
      el.classList.remove("lit");
    };
    const resetBtn = (el) => {
      el.style.removeProperty("--btx");
      el.style.removeProperty("--bty");
    };

    const apply = () => {
      rafId = 0;
      const e = ev;
      if (!e) return;

      const tiltEl = e.target.closest ? e.target.closest(TILT_SEL) : null;
      if (tiltEl !== currentTilt) {
        if (currentTilt) resetTilt(currentTilt);
        currentTilt = tiltEl;
        if (tiltEl) tiltEl.classList.add("lit");
      }
      if (tiltEl) {
        const r = tiltEl.getBoundingClientRect();
        const mx = (e.clientX - r.left) / r.width;
        const my = (e.clientY - r.top) / r.height;
        tiltEl.style.setProperty("--mx", (mx * 100).toFixed(1) + "%");
        tiltEl.style.setProperty("--my", (my * 100).toFixed(1) + "%");
        if ([...tiltEl.classList].some((c) => TILT3D.has(c))) {
          tiltEl.style.setProperty("--ry", ((mx - 0.5) * 5).toFixed(2) + "deg");
          tiltEl.style.setProperty("--rx", ((0.5 - my) * 5).toFixed(2) + "deg");
        }
      }

      const btn = e.target.closest ? e.target.closest(".btn") : null;
      if (btn !== currentBtn) {
        if (currentBtn) resetBtn(currentBtn);
        currentBtn = btn;
      }
      if (btn) {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        btn.style.setProperty("--btx", Math.max(-6, Math.min(6, dx * 0.18)).toFixed(1) + "px");
        btn.style.setProperty("--bty", Math.max(-4, Math.min(4, dy * 0.25)).toFixed(1) + "px");
      }
    };

    const onMove = (e) => {
      ev = e;
      if (!rafId) rafId = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      if (currentTilt) { resetTilt(currentTilt); currentTilt = null; }
      if (currentBtn) { resetBtn(currentBtn); currentBtn = null; }
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      onLeave();
    };
  }, []);
  return null;
}
