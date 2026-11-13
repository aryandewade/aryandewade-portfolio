import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type MonumentalPreloaderProps = {
  onComplete?: () => void;
  duration?: number; // duration in seconds
};

export default function MonumentalPreloader({
  onComplete,
  duration = 1.8,
}: MonumentalPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);
  const contentLayerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Restore scroll helper function
  const unlockScroll = () => {
    document.body.classList.remove("preloader-locked");
    document.body.style.overflow = "";
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflow = "";
    document.documentElement.style.overflowX = "hidden";
    ScrollTrigger.refresh();
  };

  // Lock scroll while active, unlock reliably on unmount
  useEffect(() => {
    document.body.classList.add("preloader-locked");
    document.body.style.overflow = "hidden";

    // Failsafe: Ensure scroll is ALWAYS unlocked after 3.2s even if anything unexpected happens
    const failsafeTimer = setTimeout(() => {
      unlockScroll();
      setIsDone(true);
      if (onComplete) onComplete();
    }, 3200);

    return () => {
      clearTimeout(failsafeTimer);
      unlockScroll();
    };
  }, []);

  // Split-curtain exit transition matching Framer Monumental Preloader Dot
  const triggerExit = () => {
    // Immediately disable pointer events on preloader so site is clickable
    if (containerRef.current) {
      containerRef.current.style.pointerEvents = "none";
    }

    const exitTl = gsap.timeline({
      onComplete: () => {
        unlockScroll();
        setIsDone(true);
        if (onComplete) onComplete();
      },
    });

    // 1. Content elements fade out swiftly
    if (contentLayerRef.current) {
      exitTl.to(contentLayerRef.current, {
        opacity: 0,
        duration: 0.22,
        ease: "power2.inOut",
      });
    }

    // 2. Split curtain: top slides up, bottom slides down
    if (topCurtainRef.current && bottomCurtainRef.current) {
      exitTl.to(
        topCurtainRef.current,
        {
          yPercent: -100,
          duration: 0.7,
          ease: "power4.inOut",
        },
        "-=0.08"
      );

      exitTl.to(
        bottomCurtainRef.current,
        {
          yPercent: 100,
          duration: 0.7,
          ease: "power4.inOut",
        },
        "<" // simultaneous with top curtain
      );
    }
  };

  // Smooth progress count-up
  useEffect(() => {
    const progressObj = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        // Hold briefly at 100%, then trigger split-curtain exit animation
        setTimeout(() => {
          triggerExit();
        }, 180);
      },
    });

    tl.to(progressObj, {
      value: 100,
      duration: duration,
      ease: "power2.out",
      onUpdate: () => {
        const rounded = Math.floor(progressObj.value);
        setProgress(rounded);
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${progressObj.value}%`;
        }
      },
    });

    return () => {
      tl.kill();
    };
  }, [duration]);

  if (isDone) return null;

  return (
    <div
      className="monumental-preloader-root"
      ref={containerRef}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading portfolio"
    >
      {/* Top Split Curtain */}
      <div className="preloader-curtain preloader-curtain-top" ref={topCurtainRef} />

      {/* Bottom Split Curtain */}
      <div className="preloader-curtain preloader-curtain-bottom" ref={bottomCurtainRef} />

      {/* Interactive & Visual Content Layer */}
      <div className="preloader-content-layer" ref={contentLayerRef}>
        {/* Technical Dot Matrix Grid Background */}
        <div className="preloader-grid-dots" aria-hidden="true" />

        {/* Top Laser Progress Line */}
        <div className="preloader-top-track" aria-hidden="true">
          <div className="preloader-top-bar" ref={progressBarRef} />
        </div>

        {/* Header Bar */}
        <header className="preloader-header">
          <div className="preloader-wordmark">
            ARYAN<span>DEWADE</span>
          </div>

          {/* Desktop recommendation badge requested by user */}
          <div className="preloader-desktop-badge">
            <span className="preloader-badge-dot" aria-hidden="true" />
            <span className="preloader-badge-text">Best viewed on desktop</span>
          </div>
        </header>

        {/* Center Technical Metadata */}
        <div className="preloader-center-meta" aria-hidden="true">
          <span className="meta-tag">PORTFOLIO · 2026</span>
          <span className="meta-status">INITIALIZING SYSTEM</span>
        </div>

        {/* Monumental Counter at Bottom-Left */}
        <div className="preloader-counter-wrap">
          <span className="preloader-counter-number">
            {String(progress).padStart(2, "0")}%
          </span>
        </div>

        {/* Bottom Right Coordinates / Role */}
        <div className="preloader-bottom-right" aria-hidden="true">
          <div className="preloader-subtext">FULL STACK DEVELOPER</div>
          <div className="preloader-coordinates">20.6121° N, 78.8354° E · MH</div>
        </div>
      </div>
    </div>
  );
}
