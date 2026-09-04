"use client";

import { useEffect, useRef } from "react";

/**
 * Animated blockchain background v3 — parallax, cursor-reactive, scroll-energized.
 *
 * Every page gets a different view of the same living chain:
 *   home       — full network + sealing block chain (blue/green)
 *   founder    — denser, green-weighted network + chain
 *   enterprise — orderly blue network, no chain (grid-calm)
 *   fellowship — sparse aqua/violet constellation
 *   portfolio  — block-explorer grid (mempool-style) under a light mesh
 *   minimal    — faint nodes only (contact)
 * (the /story page has its own dedicated StoryChainCanvas)
 *
 * Interactivity:
 *   · nodes live at different depths (z) — scrolling parallaxes the layers
 *   · the cursor joins the network: nearby nodes link to it and drift toward it
 *   · scroll velocity feeds energy: links brighten, transactions spawn faster
 *   · "transactions" travel node-to-node as glowing packets
 * Respects prefers-reduced-motion (renders a single static frame).
 */
const VARIANTS = {
  home:       { density: 42000, greenShare: 0.30, chain: true,  grid: false, linkDist: 130, glow: [0.75, 0.15, "53,97,142"] },
  founder:    { density: 34000, greenShare: 0.55, chain: true,  grid: false, linkDist: 140, glow: [0.25, 0.20, "47,125,69"] },
  enterprise: { density: 40000, greenShare: 0.10, chain: false, grid: false, linkDist: 120, glow: [0.80, 0.12, "53,97,142"] },
  fellowship: { density: 60000, greenShare: 0.40, chain: false, grid: false, linkDist: 150, glow: [0.50, 0.10, "25,158,112"] },
  portfolio:  { density: 68000, greenShare: 0.35, chain: false, grid: true,  linkDist: 130, glow: [0.50, 0.12, "53,97,142"] },
  story:      { density: 90000, greenShare: 0.35, chain: false, grid: false, linkDist: 160, glow: [0.85, 0.30, "53,97,142"] },
  minimal:    { density: 110000, greenShare: 0.25, chain: false, grid: false, linkDist: 110, glow: [0.50, 0.85, "53,97,142"] },
};

const BLUE = "53,97,142";
const GREEN = "47,125,69";

export default function ChainCanvas({ variant = "home" }) {
  const ref = useRef(null);

  useEffect(() => {
    const V = VARIANTS[variant] || VARIANTS.home;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let w, h, dpr, raf;
    let running = true;
    let scrollY = window.scrollY;
    let lastScrollY = scrollY;
    let energy = 0;              // 0..1, fed by scroll velocity
    let px = -9999, py = -9999;  // smoothed pointer
    let tx = -9999, ty = -9999;  // raw pointer target

    const rand = (a, b) => a + Math.random() * (b - a);
    const wrap = (v, m) => ((v % m) + m) % m;

    // --- network nodes (with depth) ---
    let nodes = [];
    function seedNodes() {
      const count = Math.max(18, Math.floor((w * h) / V.density));
      nodes = Array.from({ length: count }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.12, 0.12),
        vy: rand(-0.09, 0.09),
        r: rand(1.2, 2.6),
        z: rand(0.25, 1),                 // depth: 1 = closest, moves most
        g: Math.random() < V.greenShare,
      }));
    }

    // --- transactions (packets travelling between nodes) ---
    let txs = [];
    function spawnTx() {
      if (nodes.length < 2 || txs.length > 26) return;
      const a = (Math.random() * nodes.length) | 0;
      let b = (Math.random() * nodes.length) | 0;
      if (a === b) b = (b + 1) % nodes.length;
      txs.push({ a, b, t: 0, speed: rand(0.008, 0.02), g: Math.random() < V.greenShare });
    }

    // --- chain blocks (home / founder) ---
    let blocks = [];
    function seedBlocks() {
      const n = Math.max(5, Math.floor(w / 260));
      blocks = Array.from({ length: n }, (_, i) => ({
        i, fill: Math.random(), speed: rand(0.0006, 0.0016), sealed: false, pulse: 0,
      }));
    }

    // --- explorer grid (portfolio) ---
    let cells = [];
    function seedCells() {
      const size = 64, gap = 26;
      const cols = Math.max(4, Math.floor((w - 80) / (size + gap)));
      const rows = 3;
      cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cells.push({
            x: 40 + c * (size + gap) + (r % 2 ? (size + gap) / 2 : 0),
            y: h * 0.42 + r * (size + gap),
            size,
            fill: Math.random(),
            speed: rand(0.0004, 0.0014),
            sealed: Math.random() < 0.4,
            z: 0.35 + r * 0.18,
          });
        }
      }
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
      if (V.chain) seedBlocks();
      if (V.grid) seedCells();
    }

    // draw-space position of a node (parallax by depth + pointer drift)
    function pos(n) {
      const parX = finePointer && px > -999 ? (px - w / 2) * 0.012 * n.z : 0;
      const parY = finePointer && py > -999 ? (py - h / 2) * 0.012 * n.z : 0;
      return {
        x: wrap(n.x + parX, w),
        y: wrap(n.y - scrollY * 0.14 * n.z + parY, h),
      };
    }

    function drawNetwork() {
      const drift = reduced ? 0 : 1 + energy * 1.6;
      for (const n of nodes) {
        n.x += n.vx * drift;
        n.y += n.vy * drift;
        if (n.x < -20) n.x = w + 20; if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; if (n.y > h + 20) n.y = -20;
      }
      const P = nodes.map(pos);
      const maxD = V.linkDist;
      const linkBoost = 1 + energy * 0.9;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = P[i].x - P[j].x, dy = P[i].y - P[j].y;
          const d = Math.hypot(dx, dy);
          if (d < maxD) {
            const o = (1 - d / maxD) * 0.11 * linkBoost;
            ctx.strokeStyle = `rgba(${nodes[i].g && nodes[j].g ? GREEN : BLUE},${o})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(P[i].x, P[i].y);
            ctx.lineTo(P[j].x, P[j].y);
            ctx.stroke();
          }
        }
      }

      // the cursor joins the network
      if (finePointer && tx > -999 && !reduced) {
        px += (tx - px) * 0.12;
        py += (ty - py) * 0.12;
        const reach = maxD * 1.35;
        for (let i = 0; i < nodes.length; i++) {
          const dx = P[i].x - px, dy = P[i].y - py;
          const d = Math.hypot(dx, dy);
          if (d < reach) {
            const o = (1 - d / reach) * 0.25;
            ctx.strokeStyle = `rgba(${nodes[i].g ? GREEN : BLUE},${o})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(P[i].x, P[i].y);
            ctx.lineTo(px, py);
            ctx.stroke();
            // gentle gravitational drift toward the cursor
            if (d > 30) { nodes[i].x -= (dx / d) * 0.25 * nodes[i].z; nodes[i].y -= (dy / d) * 0.25 * nodes[i].z; }
          }
        }
        // cursor node
        ctx.fillStyle = `rgba(${GREEN},0.8)`;
        ctx.beginPath();
        ctx.arc(px, py, 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `rgba(${GREEN},0.25)`;
        ctx.beginPath();
        ctx.arc(px, py, 9 + Math.sin(performance.now() / 300) * 2, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        ctx.fillStyle = `rgba(${n.g ? GREEN : BLUE},${(n.g ? 0.4 : 0.32) * (0.5 + n.z * 0.5)})`;
        ctx.beginPath();
        ctx.arc(P[i].x, P[i].y, n.r * (0.7 + n.z * 0.45), 0, Math.PI * 2);
        ctx.fill();
      }

      // transactions
      if (!reduced) {
        if (Math.random() < 0.02 + energy * 0.18) spawnTx();
        for (let k = txs.length - 1; k >= 0; k--) {
          const t = txs[k];
          t.t += t.speed * (1 + energy * 1.5);
          const A = P[t.a], B = P[t.b];
          if (!A || !B || t.t >= 1) { txs.splice(k, 1); continue; }
          const x = A.x + (B.x - A.x) * t.t;
          const y = A.y + (B.y - A.y) * t.t;
          ctx.fillStyle = `rgba(${t.g ? GREEN : BLUE},0.9)`;
          ctx.beginPath();
          ctx.arc(x, y, 1.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = `rgba(${t.g ? GREEN : BLUE},0.25)`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(A.x + (B.x - A.x) * Math.max(0, t.t - 0.08), A.y + (B.y - A.y) * Math.max(0, t.t - 0.08));
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      }
    }

    function drawChain(t) {
      const size = 44;
      const gap = (w - blocks.length * size) / (blocks.length + 1);
      const baseY = h - 110 + scrollY * 0.10; // parallax: chain sinks as you scroll
      for (const b of blocks) {
        const x = gap + b.i * (size + gap);
        const y = baseY + Math.sin(t / 2600 + b.i) * 5;
        if (y > h + 60) continue;
        if (b.i < blocks.length - 1) {
          const nx = gap + (b.i + 1) * (size + gap);
          ctx.strokeStyle = b.sealed ? `rgba(${GREEN},0.35)` : `rgba(${BLUE},0.18)`;
          ctx.setLineDash(b.sealed ? [] : [4, 5]);
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(x + size, y + size / 2);
          ctx.lineTo(nx, y + size / 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }
        ctx.strokeStyle = `rgba(${BLUE},0.4)`;
        ctx.lineWidth = 1.2;
        ctx.strokeRect(x, y, size, size);
        if (!reduced) {
          b.fill += b.speed * (1 + energy * 2.5);
          if (b.fill >= 1) { b.fill = 1; b.sealed = true; b.pulse = 1; }
        } else {
          b.fill = b.i % 2 ? 1 : 0.55; b.sealed = b.i % 2 === 1;
        }
        const fh = size * b.fill;
        ctx.fillStyle = b.sealed ? `rgba(${GREEN},0.20)` : `rgba(${BLUE},0.14)`;
        ctx.fillRect(x + 1, y + size - fh + 1, size - 2, Math.max(fh - 2, 0));
        if (b.sealed) {
          if (b.pulse > 0) {
            ctx.strokeStyle = `rgba(${GREEN},${0.5 * b.pulse})`;
            ctx.lineWidth = 2;
            ctx.strokeRect(x - 3, y - 3, size + 6, size + 6);
            b.pulse -= 0.012;
          } else if (!reduced && Math.random() < 0.0012) {
            b.fill = 0; b.sealed = false;
          }
          ctx.fillStyle = `rgba(${GREEN},0.8)`;
          ctx.font = "10px ui-monospace, monospace";
          ctx.fillText("✓", x + size / 2 - 3, y - 7);
        }
      }
    }

    function drawGrid() {
      for (const c of cells) {
        const y = c.y - scrollY * 0.10 * c.z;
        if (y < -80 || y > h + 80) continue;
        ctx.strokeStyle = `rgba(${BLUE},${0.12 * c.z})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(c.x, y, c.size, c.size);
        if (!reduced) {
          c.fill += c.speed * (1 + energy * 2);
          if (c.fill >= 1) { c.fill = 1; c.sealed = true; }
          if (c.sealed && Math.random() < 0.0015) { c.fill = 0; c.sealed = false; }
        }
        const fh = c.size * Math.min(c.fill, 1);
        ctx.fillStyle = c.sealed ? `rgba(${GREEN},${0.10 * c.z})` : `rgba(${BLUE},${0.08 * c.z})`;
        ctx.fillRect(c.x + 1, y + c.size - fh + 1, c.size - 2, Math.max(fh - 2, 0));
        if (c.sealed) {
          ctx.fillStyle = `rgba(${GREEN},${0.4 * c.z})`;
          ctx.font = "9px ui-monospace, monospace";
          ctx.fillText("✓", c.x + c.size / 2 - 2.5, y - 5);
        }
      }
    }

    function frame(t) {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      const [gx, gy, gc] = V.glow;
      const grad = ctx.createRadialGradient(w * gx, h * gy, 60, w * gx, h * gy, w * 0.7);
      grad.addColorStop(0, `rgba(${gc},${0.06 + energy * 0.03})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // scroll energy decays each frame
      energy *= 0.94;

      if (V.grid) drawGrid();
      drawNetwork();
      if (V.chain) drawChain(t);
      if (!reduced) raf = requestAnimationFrame(frame);
    }

    const onScroll = () => {
      scrollY = window.scrollY;
      const dv = Math.abs(scrollY - lastScrollY);
      lastScrollY = scrollY;
      energy = Math.min(1, energy + dv / 220);
    };
    const onPointer = (e) => { tx = e.clientX; ty = e.clientY; if (px < -999) { px = tx; py = ty; } };
    const onLeave = () => { tx = -9999; ty = -9999; px = -9999; py = -9999; };
    const onVis = () => {
      running = !document.hidden;
      if (running && !reduced) raf = requestAnimationFrame(frame);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    if (finePointer) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    document.addEventListener("visibilitychange", onVis);
    resize();
    if (reduced) frame(0); else raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      if (finePointer) {
        window.removeEventListener("pointermove", onPointer);
        document.documentElement.removeEventListener("pointerleave", onLeave);
      }
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [variant]);

  return <canvas ref={ref} className="chain-bg" aria-hidden="true" />;
}
