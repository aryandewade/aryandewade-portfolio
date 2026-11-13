import * as React from "react";

// Interactive Halftone Colour Brush from hero_portfolio
// Reveals the animated halftone dots along the cursor brush path strictly on the photo cutout.
export function PortraitColourBrush({ reduced = false }: { reduced?: boolean }) {
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useLayoutEffect(() => {
    const canvas = ref.current;
    const portrait = canvas?.parentElement;
    const card = portrait?.closest<HTMLElement>(".hero-portrait") || portrait;
    const image = portrait?.querySelector<HTMLImageElement>(".portrait-natural") || portrait?.querySelector<HTMLImageElement>("img");

    if (!canvas || !portrait || !card || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mask = document.createElement("canvas");
    const maskCtx = mask.getContext("2d");
    if (!maskCtx) return;

    const fine = matchMedia("(hover:hover) and (pointer:fine)");
    let dots: { x: number; y: number; hx: number; hy: number; vx: number; vy: number; r: number; rgb: number[] }[] = [];
    let w = 0, h = 0, dpr = 1, raf = 0, ready = false, active = false, visible = true;
    let px = -1e5, py = -1e5, ring = { x: 0, y: 0, t: -1e5 };
    let radius = 60;
    let stamps: { x: number; y: number; t: number }[] = [];
    let lastPaint: { x: number; y: number } | null = null;
    let bounds = { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity };
    let touch: { id: number; x: number; y: number; moved: boolean; wasActive: boolean } | null = null;

    const wake = () => {
      if (!raf && visible && !document.hidden) {
        raf = requestAnimationFrame(draw);
      }
    };

    const resetBrush = () => {
      maskCtx.clearRect(0, 0, w, h);
      stamps = [];
      lastPaint = null;
      bounds = { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity };
    };

    function layout() {
      if (!image!.complete || !image!.naturalWidth) return false;
      const rect = portrait!.getBoundingClientRect();
      w = Math.round(rect.width);
      h = Math.round(rect.height);
      if (!w || !h) return false;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      mask.width = w;
      mask.height = h;
      radius = Math.min(90, Math.max(48, Math.min(w, h) * 0.1));
      resetBrush();

      const gap = Math.max(5.5, Math.sqrt((w * h) / 14000));
      const cols = Math.ceil(w / gap);
      const rows = Math.ceil(h / gap);

      const sample = document.createElement("canvas");
      sample.width = cols;
      sample.height = rows;
      const s = sample.getContext("2d", { willReadFrequently: true });
      if (!s) return false;

      s.drawImage(image!, 0, 0, cols, rows);
      const pixels = s.getImageData(0, 0, cols, rows).data;
      dots = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const p = (y * cols + x) * 4;
          const a = pixels[p + 3];
          if (a < 35) continue; // Only sample subject's opaque pixels

          const r = pixels[p];
          const g = pixels[p + 1];
          const b = pixels[p + 2];
          const hx = (x + 0.5) * gap;
          const hy = (y + 0.5) * gap;
          dots.push({ x: hx, y: hy, hx, hy, vx: 0, vy: 0, r: gap * 0.52, rgb: [r, g, b] });
        }
      }

      ready = true;
      canvas!.dataset.dots = String(dots.length);
      canvas!.dataset.brushRadius = String(radius);
      return true;
    }

    function paint(x: number, y: number) {
      if (!ready && !layout()) return;
      const distance = lastPaint ? Math.hypot(x - lastPaint.x, y - lastPaint.y) : 0;
      if (lastPaint && distance < radius * 0.14) return;
      const count = lastPaint ? Math.min(64, Math.max(1, Math.ceil(distance / (radius * 0.3)))) : 1;
      const start = lastPaint || { x, y };
      const now = performance.now();

      for (let i = 1; i <= count; i++) {
        const sx = start.x + ((x - start.x) * i) / count;
        const sy = start.y + ((y - start.y) * i) / count;
        stamps.push({ x: sx, y: sy, t: now });
        bounds.left = Math.min(bounds.left, sx - radius);
        bounds.top = Math.min(bounds.top, sy - radius);
        bounds.right = Math.max(bounds.right, sx + radius);
        bounds.bottom = Math.max(bounds.bottom, sy + radius);
      }
      lastPaint = { x, y };
      wake();
    }

    function draw(now: number) {
      raf = 0;
      if (!visible || document.hidden) return;

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, w, h);

      stamps = stamps.filter((stamp) => {
        const progress = reduced ? 1 : Math.min(1, (now - stamp.t) / 280);
        const r = Math.max(0.1, radius * (1 - Math.pow(1 - progress, 3)));
        const gradient = maskCtx!.createRadialGradient(stamp.x, stamp.y, 0, stamp.x, stamp.y, r);
        gradient.addColorStop(0, "#fff");
        gradient.addColorStop(0.6, "rgba(255,255,255,.9)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        maskCtx!.fillStyle = gradient;
        maskCtx!.fillRect(stamp.x - r, stamp.y - r, r * 2, r * 2);
        return progress < 1;
      });

      if (!Number.isFinite(bounds.left)) return;

      // Dark contrast halftone backing
      ctx!.fillStyle = "#0c0b09";
      ctx!.fillRect(bounds.left, bounds.top, bounds.right - bounds.left, bounds.bottom - bounds.top);

      const age = now - ring.t;
      const ringR = age * 0.6;
      let moving = false;

      for (const dot of dots) {
        if (dot.hx < bounds.left - 12 || dot.hx > bounds.right + 12 || dot.hy < bounds.top - 12 || dot.hy > bounds.bottom + 12) continue;

        if (!reduced) {
          if (age < 700) {
            const dx = dot.hx - ring.x;
            const dy = dot.hy - ring.y;
            const d = Math.hypot(dx, dy) + 0.001;
            const f = (1 - Math.min(1, Math.abs(d - ringR) / 26)) * 1.6 * (1 - age / 700);
            dot.vx += (dx / d) * f;
            dot.vy += (dy / d) * f;
          }
          const dx = dot.x - px;
          const dy = dot.y - py;
          const d = Math.hypot(dx, dy) + 0.001;
          const pushRadius = radius * 0.6;
          if (active && d < pushRadius) {
            const f = (1 - d / pushRadius) * 2.6;
            dot.vx += (dx / d) * f;
            dot.vy += (dy / d) * f;
          }
          dot.vx = (dot.vx + (dot.hx - dot.x) * 0.05) * 0.84;
          dot.vy = (dot.vy + (dot.hy - dot.y) * 0.05) * 0.84;
          dot.x += dot.vx;
          dot.y += dot.vy;
          const offset = Math.hypot(dot.x - dot.hx, dot.y - dot.hy);
          if (offset > 10) {
            dot.x = dot.hx + ((dot.x - dot.hx) * 10) / offset;
            dot.y = dot.hy + ((dot.y - dot.hy) * 10) / offset;
          }
          if (Math.abs(dot.vx) + Math.abs(dot.vy) > 0.02) moving = true;
        }

        ctx!.fillStyle = `rgb(${dot.rgb.join(",")})`;
        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      // 1. Clip strictly to the brush stamps
      ctx!.globalCompositeOperation = "destination-in";
      ctx!.drawImage(mask, 0, 0, w, h);

      // 2. Clip strictly to the photo PNG cutout (alpha > 0) so ZERO black touches the orange background!
      ctx!.drawImage(image!, 0, 0, w, h);

      // Restore normal composite
      ctx!.globalCompositeOperation = "source-over";

      canvas!.dataset.motion = moving ? "moving" : "rest";
      if (active && (stamps.length || (!reduced && (moving || age < 700)))) wake();
    }

    function activate(next: boolean) {
      if (next && !ready && !layout()) return;
      active = next;
      canvas!.dataset.active = String(next);
      if (!next) {
        px = py = -1e5;
        ring.t = -1e5;
        resetBrush();
        for (const d of dots) {
          d.x = d.hx;
          d.y = d.hy;
          d.vx = d.vy = 0;
        }
        cancelAnimationFrame(raf);
        raf = 0;
      } else {
        wake();
      }
    }

    const point = (e: PointerEvent) => {
      const r = portrait!.getBoundingClientRect();
      return {
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        inside: e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom,
      };
    };

    const blocked = (e: PointerEvent) => (e.target as HTMLElement).closest("a,button");

    const move = (e: PointerEvent) => {
      const p = point(e);
      if (e.pointerType === "touch") {
        if (!touch || touch.id !== e.pointerId) return;
        touch.moved = touch.moved || Math.hypot(e.clientX - touch.x, e.clientY - touch.y) > 12;
        if (!p.inside) {
          activate(false);
          return;
        }
        px = p.x;
        py = p.y;
        activate(true);
        paint(p.x, p.y);
        return;
      }
      if (!fine.matches || !p.inside || blocked(e)) {
        activate(false);
        return;
      }
      px = p.x;
      py = p.y;
      activate(true);
      paint(p.x, p.y);
    };

    const leave = (e?: PointerEvent) => {
      if (e?.pointerType !== "touch") activate(false);
    };

    const down = (e: PointerEvent) => {
      if (blocked(e) || !point(e).inside) return;
      const p = point(e);
      if (e.pointerType === "touch") {
        if (!e.isPrimary || !(e.target as HTMLElement).closest(".portrait-touch-surface")) return;
        touch = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: false, wasActive: active };
        px = p.x;
        py = p.y;
        activate(true);
        paint(p.x, p.y);
        try {
          card.setPointerCapture(e.pointerId);
        } catch {}
        return;
      }
      activate(true);
      paint(p.x, p.y);
      ring = { x: p.x, y: p.y, t: performance.now() };
      wake();
    };

    const up = (e: PointerEvent) => {
      if (e.pointerType !== "touch" || !touch || touch.id !== e.pointerId) return;
      const start = touch;
      touch = null;
      px = py = -1e5;
      activate(start.moved ? false : !start.wasActive);
      if (active) {
        const p = point(e);
        ring = { x: p.x, y: p.y, t: performance.now() };
        wake();
      }
    };

    const cancel = () => {
      if (touch) {
        touch = null;
        activate(false);
      }
    };

    const resized = () => {
      activate(false);
      ready = false;
    };

    const visibility = () => {
      if (document.hidden) leave();
    };

    const ro = new ResizeObserver(resized);
    ro.observe(portrait!);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) leave();
    });
    io.observe(portrait!);

    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", leave);
    card.addEventListener("pointerdown", down);
    card.addEventListener("pointerup", up);
    card.addEventListener("pointercancel", cancel);
    card.addEventListener("lostpointercapture", cancel);
    document.addEventListener("visibilitychange", visibility);

    canvas.dataset.ready = "true";

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", leave);
      card.removeEventListener("pointerdown", down);
      card.removeEventListener("pointerup", up);
      card.removeEventListener("pointercancel", cancel);
      card.removeEventListener("lostpointercapture", cancel);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [reduced]);

  return <canvas ref={ref} className="portrait-halftone" data-active="false" data-mode="colour" aria-hidden="true" />;
}

export default PortraitColourBrush;
