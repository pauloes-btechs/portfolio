"use client";
import { useEffect, useState } from "react";

const GLYPHS = "01ABCDEF#$%&/<>[]";

/** Decodes its text from random glyphs once on mount (skipped with reduced motion). */
export default function Scramble({ text, className = "", duration = 900 }) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / duration);
      const keep = Math.floor(k * text.length);
      setOut(
        text.slice(0, keep) +
          text.slice(keep).replace(/\S/g, () => GLYPHS[(Math.random() * GLYPHS.length) | 0])
      );
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [text, duration]);
  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}
