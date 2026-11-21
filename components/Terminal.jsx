"use client";
import { useEffect, useRef, useState } from "react";

const HEX = "0123456789abcdef";

/** Falling columns of hex block-hash fragments behind the terminal. */
function HashRain() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = cv.getContext("2d");
    let w = 0, h = 0, cols = [], raf = 0, last = 0, visible = true;
    const FS = 13;
    const size = () => {
      const r = cv.getBoundingClientRect(), d = Math.min(2, window.devicePixelRatio || 1);
      w = r.width; h = r.height; cv.width = w * d; cv.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0);
      cols = Array.from({ length: Math.ceil(w / (FS * 1.4)) }, () => Math.random() * -h);
    };
    const draw = (t) => {
      raf = requestAnimationFrame(draw);
      if (!visible || t - last < 60) return;
      last = t;
      ctx.fillStyle = "rgba(10,10,10,0.22)"; ctx.fillRect(0, 0, w, h);
      ctx.font = `${FS}px "JetBrains Mono", monospace`;
      cols.forEach((y, i) => {
        const ch = HEX[(Math.random() * 16) | 0];
        ctx.fillStyle = Math.random() < 0.04 ? "rgba(226,255,220,0.9)" : "rgba(59,255,20,0.32)";
        ctx.fillText(ch, i * FS * 1.4, y);
        cols[i] = y > h + Math.random() * 400 ? 0 : y + FS;
      });
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    size(); io.observe(cv); raf = requestAnimationFrame(draw);
    window.addEventListener("resize", size);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", size); };
  }, []);
  return <canvas ref={ref} className="term-rain" aria-hidden="true" />;
}

/**
 * A boot-sequence terminal. `lines` = [{ cmd, ok? , tone? }]. Lines type in
 * once the window scrolls into view; the full text is always in the DOM for
 * screen readers and no-JS.
 */
export default function Terminal({ title = "PAULOES.SYS — TTY0", lines }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(lines.length);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShown(0);
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let n = 0;
      timer = setInterval(() => { n += 1; setShown(n); if (n >= lines.length) clearInterval(timer); }, 180);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => { io.disconnect(); clearInterval(timer); };
  }, [lines.length]);

  return (
    <div className="term" ref={ref}>
      <HashRain />
      <div className="term-bar">
        <span className="dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="term-title">{title}</span>
        <span className="term-state">● online</span>
      </div>
      <ol className="term-body">
        {lines.map((l, i) => (
          <li key={i} className={`${i < shown ? "on" : ""} ${l.tone || ""}`}>
            <span className="pr" aria-hidden="true">&gt;</span> {l.cmd}
            {l.ok && <span className="ok">{l.ok}</span>}
          </li>
        ))}
        <li className="on cursor-line" aria-hidden="true"><span className="pr">&gt;</span> <span className="cursor" /></li>
      </ol>
    </div>
  );
}
