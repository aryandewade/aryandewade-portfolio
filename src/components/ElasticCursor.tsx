import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

function useTicker(callback: (() => void) | null, paused: boolean) {
  useEffect(() => {
    if (!paused && callback) {
      gsap.ticker.add(callback);
    }
    return () => {
      if (callback) gsap.ticker.remove(callback);
    };
  }, [callback, paused]);
}

// Persistent, render-independent value
function useInstance<T>(create: () => T): T {
  const ref = useRef<T | null>(null);
  if (ref.current === null) ref.current = create();
  return ref.current;
}

// Velocity-driven squeeze amount for free-roaming blob
function getScale(diffX: number, diffY: number) {
  const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  return Math.min(distance / 735, 0.35);
}

// Velocity-driven rotation (degrees) for free-roaming blob
function getAngle(diffX: number, diffY: number) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const CURSOR_DIAMETER = 50;
const WRAP_PADDING = 8; // breathing room when hugging a target
const WRAP_RADIUS = 12; // corner radius while wrapped
const WRAP_EASE = 0.2; // how fast the cursor snaps to/from a target
const TARGET_PULL = 0.35; // fraction of pointer offset the target travels
const TARGET_EASE = 0.25; // how fast the target follows the pointer
const TARGET_MAX_PULL = 12; // px cap so wide targets nudge instead of sliding far
const CURSOR_PARALLAX = 0.12; // extra lead of the cursor toward the pointer
const CURSOR_MAX_LEAD = 10; // px cap on that lead, independent of target size

const wrapsTarget = false;
const movesTarget = false;

type Base = {
  left: number;
  top: number;
  width: number;
  height: number;
  cx: number;
  cy: number;
};

type ActiveTarget = {
  el: HTMLElement | null;
  base: Base | null;
  offX: number;
  offY: number;
};

type Setters = Record<string, Function>;

function measure(el: HTMLElement): Base {
  const r = el.getBoundingClientRect();
  return {
    left: r.left,
    top: r.top,
    width: r.width,
    height: r.height,
    cx: r.left + r.width / 2,
    cy: r.top + r.height / 2,
  };
}

export default function ElasticCursor() {
  const isMobile = useMediaQuery("(max-width: 768px), (pointer: coarse)");

  const jellyRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const [cursorMoved, setCursorMoved] = useState(false);
  const cursorMovedRef = useRef(false);
  const isHiddenRef = useRef(false);

  // Spring used for the free-roam blob, plus derived velocity
  const pos = useInstance(() => ({ x: 0, y: 0 }));
  const vel = useInstance(() => ({ x: 0, y: 0 }));
  // Raw pointer for the precise dot
  const pointer = useInstance(() => ({ x: 0, y: 0 }));
  // Current rendered blob geometry, lerped toward target every frame
  const jelly = useInstance(() => ({
    x: 0,
    y: 0,
    w: CURSOR_DIAMETER,
    h: CURSOR_DIAMETER,
    r: CURSOR_DIAMETER / 2,
    sx: 1,
    sy: 1,
  }));
  const active = useInstance<ActiveTarget>(() => ({
    el: null,
    base: null,
    offX: 0,
    offY: 0,
  }));
  const set = useInstance<Setters>(() => ({}));

  // Bind GSAP quick setters to live DOM nodes
  useLayoutEffect(() => {
    const jellyEl = jellyRef.current;
    const dotEl = dotRef.current;
    if (!jellyEl || !dotEl) return;

    gsap.set(jellyEl, { xPercent: -50, yPercent: -50 });
    gsap.set(dotEl, { xPercent: -50, yPercent: -50 });
    set.x = gsap.quickSetter(jellyEl, "x", "px");
    set.y = gsap.quickSetter(jellyEl, "y", "px");
    set.r = gsap.quickSetter(jellyEl, "rotate", "deg");
    set.sx = gsap.quickSetter(jellyEl, "scaleX");
    set.sy = gsap.quickSetter(jellyEl, "scaleY");
    set.width = gsap.quickSetter(jellyEl, "width", "px");
    set.height = gsap.quickSetter(jellyEl, "height", "px");
    set.radius = gsap.quickSetter(jellyEl, "borderRadius", "px");
    set.opacity = gsap.quickSetter(jellyEl, "opacity");
    set.dotX = gsap.quickSetter(dotEl, "x", "px");
    set.dotY = gsap.quickSetter(dotEl, "y", "px");
    set.dotOpacity = gsap.quickSetter(dotEl, "opacity");
  }, [isMobile]);

  // Single render loop
  const render = useCallback(() => {
    if (!set.x || !set.dotX) return;

    // Precise dot always tracks raw pointer
    set.dotX(pointer.x);
    set.dotY(pointer.y);

    const el = active.el;
    const isInteractive = !!el;
    const hidden = isHiddenRef.current || !cursorMovedRef.current;

    // Free roam: elastic spring position + velocity-driven squish
    // The cursor NEVER takes the shape/box of hovered elements - it stays perfectly circular
    const rotation = getAngle(vel.x, vel.y);
    const scale = getScale(vel.x, vel.y);
    const targetSize = isInteractive ? CURSOR_DIAMETER * 1.25 : CURSOR_DIAMETER;

    jelly.x = pos.x;
    jelly.y = pos.y;
    jelly.w = lerp(jelly.w, targetSize + scale * 250, 0.4);
    jelly.h = lerp(jelly.h, targetSize, 0.4);
    jelly.r = jelly.h / 2; // Always circular, never element-shaped
    jelly.sx = 1 + scale;
    jelly.sy = 1 - scale * 1.6;

    set.x(pos.x);
    set.y(pos.y);
    set.width(jelly.w);
    set.height(jelly.h);
    set.radius(jelly.r);
    set.r(rotation);
    set.sx(jelly.sx);
    set.sy(jelly.sy);
    set.opacity(hidden ? 0 : 1);
    set.dotOpacity(hidden ? 0 : 1);
  }, []);

  // Track raw pointer, drive free-roam spring, and update hide flag
  useEffect(() => {
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!cursorMovedRef.current) {
        cursorMovedRef.current = true;
        pos.x = e.clientX;
        pos.y = e.clientY;
        jelly.x = e.clientX;
        jelly.y = e.clientY;
        setCursorMoved(true);
      }
      gsap.to(pos, {
        x: e.clientX,
        y: e.clientY,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        onUpdate: () => {
          vel.x = (e.clientX - pos.x) * 1.2;
          vel.y = (e.clientY - pos.y) * 1.2;
        },
      });

      const hide = !!(e.target as Element | null)?.closest?.(
        '[data-no-custom-cursor="true"], #skills, .skills, .techstack'
      );
      isHiddenRef.current = hide;
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isMobile]);

  // Acquire / release targets via event delegation
  useEffect(() => {
    if (isMobile) return;

    const acquire = (el: HTMLElement) => {
      gsap.killTweensOf(el);
      active.el = el;
      active.base = measure(el);
      active.offX = 0;
      active.offY = 0;
      jelly.x = pos.x;
      jelly.y = pos.y;
      if (movesTarget) el.style.willChange = "transform";
    };

    const release = () => {
      const el = active.el;
      if (el && movesTarget) {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.35)",
          clearProps: "transform",
          onComplete: () => {
            el.style.willChange = "";
          },
        });
      }
      active.el = null;
      active.base = null;
      active.offX = 0;
      active.offY = 0;
    };

    const onOver = (e: Event) => {
      const target = e.target as Element | null;
      if (
        target?.closest?.(
          '[data-no-custom-cursor="true"], #skills, .skills, .techstack'
        )
      ) {
        if (active.el) release();
        return;
      }
      const t = target?.closest?.(
        '.cursor-can-hover, button, a, [role="button"], .project-row'
      ) as HTMLElement | null;
      if (t === active.el) return;
      if (active.el) release();
      if (t) acquire(t);
    };

    const onLeave = () => {
      if (active.el) release();
      isHiddenRef.current = true;
    };

    const onEnter = () => {
      isHiddenRef.current = false;
    };

    const onScroll = () => {
      if (!active.el || !active.base) return;
      const r = active.el.getBoundingClientRect();
      active.base.left = r.left - active.offX;
      active.base.top = r.top - active.offY;
      active.base.width = r.width;
      active.base.height = r.height;
      active.base.cx = active.base.left + r.width / 2;
      active.base.cy = active.base.top + r.height / 2;
    };

    document.addEventListener("pointerover", onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("blur", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("scroll", onScroll);
      if (active.el) release();
    };
  }, [isMobile]);

  useTicker(render, !cursorMoved || isMobile);
  if (isMobile) return null;

  return (
    <>
      <div
        ref={jellyRef}
        id="jelly-id"
        className="jelly-blob"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: CURSOR_DIAMETER,
          height: CURSOR_DIAMETER,
          borderRadius: CURSOR_DIAMETER / 2,
          boxSizing: "border-box",
          pointerEvents: "none",
          willChange: "transform",
          zIndex: 99999,
          border: "2px solid #ffffff",
          backdropFilter: "invert(100%)",
          WebkitBackdropFilter: "invert(100%)",
          opacity: 0,
        }}
      />
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 10,
          height: 10,
          borderRadius: "50%",
          pointerEvents: "none",
          willChange: "transform",
          zIndex: 100000,
          backdropFilter: "invert(100%)",
          WebkitBackdropFilter: "invert(100%)",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          mixBlendMode: "difference",
          opacity: 0,
        }}
      />
    </>
  );
}
