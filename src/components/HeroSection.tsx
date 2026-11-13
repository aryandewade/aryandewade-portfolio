import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import PortraitColourBrush from "./PortraitColourBrush";

type HeroSectionProps = {
  scrollTo: (id: string) => void;
  onOpenMenu: () => void;
};

const heroRoles = [
  "Full-stack Developer",
  "Computer Science Student",
  "Builder",
  "Problem Solver",
];

const splitName = (name: string) => Array.from(name);

export default function HeroSection({ scrollTo, onOpenMenu }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const portraitFrameRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const roleTimer = window.setInterval(() => {
      setRoleIndex((currentIndex) => (currentIndex + 1) % heroRoles.length);
    }, 2000);

    return () => window.clearInterval(roleTimer);
  }, []);

  // Parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (portraitRef.current && y < window.innerHeight) {
        portraitRef.current.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Subtle mouse movement parallax on desktop
  useEffect(() => {
    const heroEl = heroRef.current;
    const stageEl = portraitFrameRef.current;
    if (!heroEl || !stageEl) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(stageEl, {
        x: relX * -12,
        y: relY * -8,
        duration: 0.7,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    heroEl.addEventListener("mousemove", handleMouseMove);
    return () => heroEl.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      {/* Background radial backlight */}
      <div className="hero-ambient-glow" aria-hidden="true" />

      {/* Hero Portrait Photo & Interactive Halftone Dot Brush */}
      <div className="hero-portrait" ref={portraitRef} aria-hidden="true">
        <div className="hero-portrait-frame" ref={portraitFrameRef}>
          <img
            className="hero-portrait-img portrait-natural"
            src="/images/aryan_photo.png"
            alt="Aryan Dewade"
            width="1024"
            height="935"
            fetchPriority="high"
          />
          <PortraitColourBrush />
        </div>
      </div>

      {/* Hero Lighting & Vignette Shades */}
      <div className="hero-shade-left" aria-hidden="true" />
      <div className="hero-shade-bottom" aria-hidden="true" />

      {/* Hero Main Copy */}
      <div className="hero-main">
        <div className="hero-copy">
          <h1 className="hero-name">
            <span className="hero-name-line" aria-label="Aryan">
              {splitName("Aryan").map((character, index) => (
                <span className="hero-name-char" style={{ animationDelay: `${index * 55}ms` }} key={`${character}-${index}`}>
                  {character}
                </span>
              ))}
            </span>
            <span className="hero-name-line" aria-label="Dewade">
              {splitName("Dewade").map((character, index) => (
                <span className="hero-name-char" style={{ animationDelay: `${180 + index * 55}ms` }} key={`${character}-${index}`}>
                  {character}
                </span>
              ))}
            </span>
          </h1>
          <p className="hero-statement hero-role-statement" aria-live="polite">
            <span key={heroRoles[roleIndex]}>{heroRoles[roleIndex]}</span>
          </p>
        </div>
      </div>

      {/* Hero Bottom Bar */}
      <div className="hero-bottom">
        <a
          className="hero-browse cursor-can-hover"
          href="#work"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#work");
          }}
        >
          <span>Browse the projects</span>
          <span className="arrow" aria-hidden="true">↘︎</span>
        </a>
        <span className="hero-caption">Hinganghat · MH</span>
      </div>
      <a
        className="hero-scroll-indicator cursor-can-hover"
        href="#statement"
        onClick={(e) => {
          e.preventDefault();
          scrollTo("#statement");
        }}
        aria-label="Scroll to learn more"
      >
        <span className="hero-scroll-line" aria-hidden="true" />
        <span className="hero-scroll-arrow" aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
