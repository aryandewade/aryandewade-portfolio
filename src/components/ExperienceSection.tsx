import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const eduLineRef = useRef<HTMLDivElement>(null);

  const marker1Ref = useRef<HTMLSpanElement>(null);
  const marker2Ref = useRef<HTMLSpanElement>(null);
  const entry1Ref = useRef<HTMLElement>(null);
  const entry2Ref = useRef<HTMLElement>(null);
  const eduItemRef = useRef<HTMLDivElement>(null);
  const eduHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Experience column timeline: line grows and reveals entries sequentially
      const expTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 45%",
          scrub: 0.5,
        },
      });

      expTl
        // 1. Line grows from start to Marker 1
        .to(lineFillRef.current, {
          scaleY: 0.32,
          ease: "none",
          duration: 0.8,
        })
        // Marker 1 activates with clean cyan glow
        .to(
          marker1Ref.current,
          {
            scale: 1.15,
            borderColor: "#38bdf8",
            backgroundColor: "#0284c7",
            boxShadow: "0 0 0 5px rgba(56, 189, 248, 0.2), 0 0 16px rgba(56, 189, 248, 0.5)",
            opacity: 1,
            duration: 0.35,
            ease: "back.out(1.8)",
          },
          "-=0.2"
        )
        // Entry 1 content reveals
        .to(
          entry1Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.25"
        )
        // 2. Line continues growing down to Marker 2
        .to(lineFillRef.current, {
          scaleY: 1,
          ease: "none",
          duration: 1.1,
        })
        // Marker 2 activates
        .to(
          marker2Ref.current,
          {
            scale: 1.15,
            borderColor: "#818cf8",
            backgroundColor: "#4f46e5",
            boxShadow: "0 0 0 5px rgba(129, 140, 248, 0.2), 0 0 16px rgba(129, 140, 248, 0.5)",
            opacity: 1,
            duration: 0.35,
            ease: "back.out(1.8)",
          },
          "-=0.2"
        )
        // Entry 2 content reveals
        .to(
          entry2Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.25"
        );

      // Education column: horizontal divider line grows & content reveals
      const eduTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          end: "bottom 55%",
          scrub: 0.5,
        },
      });

      eduTl
        .to(eduLineRef.current, {
          scaleX: 1,
          ease: "none",
          duration: 0.9,
        })
        .to(
          eduItemRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          eduHistoryRef.current?.children ? Array.from(eduHistoryRef.current.children) : [],
          {
            opacity: 1,
            scale: 1,
            stagger: 0.15,
            duration: 0.5,
            ease: "back.out(1.5)",
          },
          "-=0.2"
        );
    }, sectionRef);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  return (
    <section className="credentials experience-section" id="experience" ref={sectionRef}>
      {/* Experience Column */}
      <div className="experience-col">
        <p className="eyebrow">03 / EXPERIENCE</p>
        <div className="experience-timeline">
          {/* Animated vertical track */}
          <div className="timeline-track-wrap" aria-hidden="true">
            <div className="timeline-track-rail" />
            <div className="timeline-track-fill" ref={lineFillRef} />
          </div>

          {/* Entry 1 */}
          <article className="experience-entry anim-entry" ref={entry1Ref}>
            <span className="experience-marker anim-marker" ref={marker1Ref} aria-hidden="true" />
            <p className="experience-date">SEP 2026 — PRESENT</p>
            <h3>Full Stack Developer Intern</h3>
            <p className="experience-company">
              <span className="company-dot" /> Engiplex Solutions
            </p>
            <p>
              Contributing to full-stack product work across frontend and backend, turning requirements into responsive
              features and practical user experiences.
            </p>
          </article>

          {/* Entry 2 */}
          <article className="experience-entry anim-entry" ref={entry2Ref}>
            <span className="experience-marker anim-marker" ref={marker2Ref} aria-hidden="true" />
            <p className="experience-date">SEP 2025 — AUG 2026</p>
            <h3>Graphics Head</h3>
            <p className="experience-company">
              <span className="company-dot" /> CSESA
            </p>
            <p>
              Created posters, banners, and promotional graphics in Canva and Figma while collaborating with student
              committees to keep event branding consistent.
            </p>
          </article>
        </div>
      </div>

      {/* Education Column */}
      <div className="education-col">
        <p className="eyebrow">EDUCATION</p>
        <div className="education-divider-line" ref={eduLineRef} aria-hidden="true" />

        <div className="credential-item anim-edu-item" ref={eduItemRef}>
          <div>
            <h3>B.E. Computer Science & Engineering</h3>
            <p className="credential-meta">2023 – 2027 · CGPA 8.1/10</p>
          </div>
          <p className="credential-college">Shri Sant Gajanan Maharaj College of Engineering, Shegaon.</p>
        </div>

        <div className="education-history anim-edu-history" ref={eduHistoryRef}>
          <span className="edu-chip">HSC · 86.16% · 2023</span>
          <span className="edu-chip">SSC · 97.20% · 2021</span>
        </div>
      </div>
    </section>
  );
}
