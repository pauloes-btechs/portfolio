"use client";

import { useEffect, useRef } from "react";

/**
 * Animated blockchain background:
 *  - drifting nodes that link up when near each other (network graph)
 *  - a slow "chain" of blocks along the lower band that fill, seal, and connect
 *  - gentle parallax on scroll
 * Respects prefers-reduced-motion (renders a single static frame).
 */
export default function ChainCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w, h, dpr, raf;
    let scrollY = 0;
    const BLUE = "57,135,229";
    const GREEN = "12,163,12";

    const rand = (a, b) => a + Math.random() * (b - a);

    // --- network nodes ---
    let nodes = [];
    function seedNodes() {
      const count = Math.max(26, Math.floor((w * h) / 42000));
      nodes = Array.from({ length: count }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.12, 0.12),
        vy: rand(-0.09, 0.09),
        r: rand(1.2, 2.6),
        g: Math.random() < 0.3, // some nodes are green
      }));
    }

    // --- chain blocks ---
    let blocks = [];
    function seedBlocks() {
      const n = Math.max(5, Math.floor(w / 260));
      blocks = Array.from({ length: n }, (_, i) => ({
        i,
        fill: Math.random(),           // 0..1 fill level
        speed: rand(0.0006, 0.0016),
        sealed: false,
        pulse: 0,
      }));
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedNodes();
      seedBlocks();
    }

    function drawNetwork(t) {
      const drift = reduced ? 0 : 1;
      for (const n of nodes) {
        n.x += n.vx * drift;
        n.y += n.vy * drift;
        if (n.x < -20) n.x = w + 20; if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; if (n.y > h + 20) n.y = -20;
      }
      // links
      const maxD = 130;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < maxD) {
            const o = (1 - d / maxD) * 0.16;
            ctx.strokeStyle = `rgba(${a.g && b.g ? GREEN : BLUE},${o})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // nodes
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${n.g ? GREEN : BLUE},${n.g ? 0.5 : 0.42})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawChain(t) {
      const size = 44;
      const gap = (w - blocks.length * size) / (blocks.length + 1);
      const baseY = h - 110 + (scrollY * 0.04); // slight parallax
      ctx.save();
      for (const b of blocks) {
        const x = gap + b.i * (size + gap);
        const y = baseY + Math.sin(t / 2600 + b.i) * 5;

        // connector to next block
        if (b.i < blocks.length - 1) {
          const nx = gap + (b.i + 1) * (size + gap);
          const sealed = b.sealed;
          ctx.strokeStyle = sealed
            ? `rgba(${GREEN},0.35)`
            : `rgba(${BLUE},0.18)`;
          ctx.setLineDash(sealed ? [] : [4, 5]);
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(x + size, y + size / 2);
          ctx.lineTo(nx, y + size / 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // block outline
        ctx.strokeStyle = `rgba(${BLUE},0.4)`;
        ctx.lineWidth = 1.2;
        ctx.strokeRect(x, y, size, size);

        // fill level (mempool → sealed)
        if (!reduced) {
          b.fill += b.speed;
          if (b.fill >= 1) { b.fill = 1; b.sealed = true; b.pulse = 1; }
        } else {
          b.fill = b.i % 2 ? 1 : 0.55; b.sealed = b.i % 2 === 1;
        }
        const fh = size * b.fill;
        ctx.fillStyle = b.sealed ? `rgba(${GREEN},0.20)` : `rgba(${BLUE},0.14)`;
        ctx.fillRect(x + 1, y + size - fh + 1, size - 2, Math.max(fh - 2, 0));

        // seal pulse then reset the block (new block joins the chain)
        if (b.sealed) {
          if (b.pulse > 0) {
            ctx.strokeStyle = `rgba(${GREEN},${0.5 * b.pulse})`;
            ctx.lineWidth = 2;
            ctx.strokeRect(x - 3, y - 3, size + 6, size + 6);
            b.pulse -= 0.012;
          } else if (!reduced && Math.random() < 0.0012) {
            b.fill = 0; b.sealed = false;
          }
          // tiny "hash" tick
          ctx.fillStyle = `rgba(${GREEN},0.8)`;
          ctx.font = "10px ui-monospace, monospace";
          ctx.fillText("✓", x + size / 2 - 3, y - 7);
        }
      }
      ctx.restore();
    }

    function frame(t) {
      ctx.clearRect(0, 0, w, h);
      // deep vignette glow
      const grad = ctx.createRadialGradient(w * 0.75, h * 0.15, 60, w * 0.75, h * 0.15, w * 0.7);
      grad.addColorStop(0, "rgba(57,135,229,0.05)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      drawNetwork(t);
      drawChain(t);
      if (!reduced) raf = requestAnimationFrame(frame);
    }

    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    resize();
    if (reduced) frame(0); else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={ref} className="chain-bg" aria-hidden="true" />;
}
