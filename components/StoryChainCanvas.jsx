"use client";

import { useEffect, useRef } from "react";

/**
 * The /story background: the twelve-year journey drawn as a blockchain
 * growing in real time, scrubbed by scroll (mempool.space energy).
 *
 * As you scroll, the camera travels along the chain. The block under the
 * lens fills with incoming transactions, seals with a hash when its
 * chapter passes, and the next block chains on. Ahead of you: faint
 * "projected" blocks — the unwritten future. A block-height ticker climbs
 * from the 2014 genesis toward today's tip as you read.
 */
const BLUE = "53,97,142";
const GREEN = "47,125,69";
const AQUA = "31,122,102";

const CHAPTERS = [
  { label: "GENESIS", year: "2014", hue: BLUE },
  { label: "FELLOWSHIPS", year: "2021", hue: AQUA },
  { label: "BLOOMBERG", year: "2022", hue: BLUE },
  { label: "BTC HUB · KAMPALA", year: "2024", hue: GREEN },
  { label: "BTECHS · NYC", year: "2025", hue: GREEN },
  { label: "NOW", year: "2026", hue: GREEN },
];
const PROJECTED = 2; // dashed future blocks past NOW

// deterministic pseudo-hash per block (pure cosmetics)
function hashFor(i) {
  let s = "";
  let x = (i + 7) * 2654435761;
  for (let k = 0; k < 8; k++) {
    x = (x ^ (x >> 13)) * 1274126177;
    s += ((x >>> (k * 3)) & 15).toString(16);
  }
  return "0000…" + s.slice(0, 6);
}

export default function StoryChainCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w, h, dpr, raf;
    let running = true;
    let p = 0;          // scroll progress 0..1
    let smoothP = 0;    // eased camera
    let scrollY = 0;

    const N = CHAPTERS.length;
    const rand = (a, b) => a + Math.random() * (b - a);

    // ambient constellation
    let stars = [];
    function seedStars() {
      const count = Math.max(14, Math.floor((w * h) / 90000));
      stars = Array.from({ length: count }, () => ({
        x: rand(0, w), y: rand(0, h),
        vx: rand(-0.08, 0.08), vy: rand(-0.06, 0.06),
        r: rand(1, 2.2), z: rand(0.3, 1),
        g: Math.random() < 0.35,
      }));
    }

    // incoming transactions aimed at the open block
    let txs = [];
    function spawnTx(bx, by) {
      if (txs.length > 22) return;
      const edge = (Math.random() * 4) | 0;
      const sx = edge === 0 ? -20 : edge === 1 ? w + 20 : rand(0, w);
      const sy = edge === 2 ? -20 : edge === 3 ? h + 20 : rand(0, h);
      txs.push({ x: sx, y: sy, tx: bx, ty: by, sp: rand(0.02, 0.045), t: 0, g: Math.random() < 0.5 });
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
      seedStars();
      measure();
    }

    function measure() {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      scrollY = window.scrollY;
      p = total > 0 ? Math.min(1, Math.max(0, scrollY / total)) : 0;
    }

    function blockPos(i, cam) {
      const spacing = Math.min(w * 0.36, 400);
      const x = w * 0.5 + (i - cam) * spacing;
      const y = h * 0.63 + Math.sin(i * 1.15) * h * 0.05 - (scrollY * 0.03 % 8);
      return { x, y };
    }

    function drawBlock(i, cam, t) {
      const { x, y } = blockPos(i, cam);
      const size = i < N ? 92 : 74;
      if (x < -size * 2 || x > w + size * 2) return;
      const half = size / 2;
      const projected = i >= N;
      const fill = projected ? 0 : Math.min(Math.max(cam - i + 1, 0), 1);
      const sealed = !projected && cam >= i;
      const isOpen = !projected && !sealed && fill > 0;
      const hue = projected ? BLUE : CHAPTERS[i].hue;
      const centerBoost = Math.max(0, 1 - Math.abs(i - cam) * 0.9); // brightest under the lens

      // connector to next block
      const nxt = blockPos(i + 1, cam);
      if (i < N + PROJECTED - 1) {
        ctx.strokeStyle = sealed && cam >= i + 1 ? `rgba(${GREEN},0.5)` : `rgba(${BLUE},${projected ? 0.10 : 0.22})`;
        ctx.setLineDash(sealed && cam >= i + 1 ? [] : [5, 6]);
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(x + half, y);
        ctx.lineTo(nxt.x - (i + 1 < N ? 46 : 37), nxt.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // block body
      ctx.save();
      ctx.translate(x, y);
      const wob = reduced ? 0 : Math.sin(t / 2200 + i) * 3;
      ctx.translate(0, wob);
      ctx.strokeStyle = projected
        ? `rgba(${BLUE},0.18)`
        : sealed ? `rgba(${GREEN},${0.5 + centerBoost * 0.4})` : `rgba(${hue},${0.35 + centerBoost * 0.5})`;
      ctx.setLineDash(projected || isOpen ? [6, 6] : []);
      ctx.lineWidth = sealed ? 2 : 1.4;
      ctx.strokeRect(-half, -half, size, size);
      ctx.setLineDash([]);

      // fill level
      const fh = size * fill;
      if (fh > 0) {
        ctx.fillStyle = sealed ? `rgba(${GREEN},0.18)` : `rgba(${hue},0.13)`;
        ctx.fillRect(-half + 1, half - fh + 1, size - 2, Math.max(fh - 2, 0));
      }
      // inner circuit tick
      if (!projected) {
        ctx.strokeStyle = `rgba(${hue},0.18)`;
        ctx.lineWidth = 1;
        ctx.strokeRect(-half + 10, -half + 10, size - 20, size - 20);
      }

      // glow under the lens
      if (centerBoost > 0.1 && !projected) {
        const g = ctx.createRadialGradient(0, 0, 10, 0, 0, size * 1.6);
        g.addColorStop(0, `rgba(${hue},${0.10 * centerBoost})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(-size * 1.6, -size * 1.6, size * 3.2, size * 3.2);
      }

      ctx.font = "600 11px ui-monospace, monospace";
      ctx.textAlign = "center";
      if (projected) {
        ctx.fillStyle = `rgba(${BLUE},0.30)`;
        ctx.fillText("projected", 0, half + 24);
      } else {
        ctx.fillStyle = sealed ? `rgba(${GREEN},0.9)` : `rgba(${BLUE},0.75)`;
        ctx.font = "700 20px ui-monospace, monospace";
        ctx.fillText(CHAPTERS[i].year, 0, -half - 16);
        ctx.font = "600 10px ui-monospace, monospace";
        ctx.fillStyle = `rgba(31,36,43,0.62)`;
        ctx.fillText(CHAPTERS[i].label, 0, half + 22);
        if (sealed) {
          ctx.fillStyle = `rgba(${GREEN},0.75)`;
          ctx.fillText("✓ " + hashFor(i), 0, half + 38);
        } else if (isOpen) {
          ctx.fillStyle = `rgba(${BLUE},0.6)`;
          ctx.fillText(Math.round(fill * 100) + "% · filling", 0, half + 38);
        }
      }
      ctx.restore();
      return { x, y: y + wob, open: isOpen, size };
    }

    function frame(t) {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);

      smoothP += (p - smoothP) * (reduced ? 1 : 0.08);
      const cam = smoothP * (N - 1 + 0.35);

      // deep glow follows the journey: blue early, green late
      const gmix = smoothP;
      const glow = gmix < 0.5 ? BLUE : GREEN;
      const grad = ctx.createRadialGradient(w * 0.5, h * 0.6, 80, w * 0.5, h * 0.6, w * 0.8);
      grad.addColorStop(0, `rgba(${glow},0.07)`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // ambient constellation (parallax with depth)
      for (const s of stars) {
        if (!reduced) { s.x += s.vx; s.y += s.vy; }
        if (s.x < -10) s.x = w + 10; if (s.x > w + 10) s.x = -10;
        if (s.y < -10) s.y = h + 10; if (s.y > h + 10) s.y = -10;
        const sy = ((s.y - scrollY * 0.10 * s.z) % h + h) % h;
        ctx.fillStyle = `rgba(${s.g ? GREEN : BLUE},${0.28 * s.z})`;
        ctx.beginPath();
        ctx.arc(s.x, sy, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // the chain
      let openBlock = null;
      for (let i = 0; i < N + PROJECTED; i++) {
        const b = drawBlock(i, cam, t);
        if (b && b.open) openBlock = b;
      }

      // transactions stream into the open block
      if (!reduced && openBlock) {
        if (Math.random() < 0.25) spawnTx(openBlock.x, openBlock.y);
      }
      if (!reduced) {
        for (let k = txs.length - 1; k >= 0; k--) {
          const q = txs[k];
          q.t += q.sp;
          if (q.t >= 1) { txs.splice(k, 1); continue; }
          const e = 1 - Math.pow(1 - q.t, 2);
          const x = q.x + (q.tx - q.x) * e;
          const y = q.y + (q.ty - q.y) * e;
          ctx.fillStyle = `rgba(${q.g ? GREEN : BLUE},${0.9 - q.t * 0.3})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // block-height ticker (explorer chrome)
      const height = Math.floor(313171 + smoothP * (909432 - 313171));
      ctx.font = "600 11px ui-monospace, monospace";
      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(102,112,124,0.85)";
      ctx.fillText("block height " + height.toLocaleString("en-US"), w - 20, h - 40);
      ctx.fillStyle = `rgba(${GREEN},0.65)`;
      ctx.fillText((txs.length + 3) + " tx in mempool · chapter " + (Math.min(N, Math.floor(cam) + 1)) + "/" + N, w - 20, h - 22);
      ctx.textAlign = "left";

      if (!reduced) raf = requestAnimationFrame(frame);
    }

    const onScroll = () => {
      measure();
      if (reduced) { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); }
    };
    const onVis = () => {
      running = !document.hidden;
      if (running && !reduced) raf = requestAnimationFrame(frame);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    resize();
    if (reduced) { smoothP = p; raf = requestAnimationFrame(frame); }
    else raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="chain-bg story-dim" aria-hidden="true" />;
}
