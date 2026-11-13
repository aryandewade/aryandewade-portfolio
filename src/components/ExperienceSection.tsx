import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const eduColRef = useRef<HTMLDivElement>(null);
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
      // Experience column timeline: triggers directly on the experience timeline container
      // Completes while the experience entries are front-and-center, NOT late when entering projects
      const expTl = gsap.timeline({
        scrollTrigger: {
          trigger: timelineRef.current || sectionRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 0.4,
        },
      });

      expTl
        // 1. Line starts and connects to Marker 1
        .to(lineFillRef.current, {
          scaleY: 0.08,
          ease: "none",
          duration: 0.25,
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
            duration: 0.25,
            ease: "back.out(1.8)",
          },
          "-=0.1"
        )
        // Entry 1 (Engiplex) content reveals
        .to(
          entry1Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.15"
        )
        // 2. Line grows down to Marker 2 (at ~58% of the timeline height)
        .to(lineFillRef.current, {
          scaleY: 0.58,
          ease: "none",
          duration: 0.65,
        })
        // Marker 2 activates promptly as the line reaches it
        .to(
          marker2Ref.current,
          {
            scale: 1.15,
            borderColor: "#818cf8",
            backgroundColor: "#4f46e5",
            boxShadow: "0 0 0 5px rgba(129, 140, 248, 0.2), 0 0 16px rgba(129, 140, 248, 0.5)",
            opacity: 1,
            duration: 0.25,
            ease: "back.out(1.8)",
          },
          "-=0.1"
        )
        // Entry 2 (CSESA) reveals right away while looking at experience
        .to(
          entry2Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.15"
        )
        // 3. Line smoothly finishes growing to the bottom of the timeline
        .to(lineFillRef.current, {
          scaleY: 1,
          ease: "none",
          duration: 0.4,
        });

      // Education column: triggers directly on the education column
      const eduTl = gsap.timeline({
        scrollTrigger: {
          trigger: eduColRef.current || sectionRef.current,
          start: "top 80%",
          end: "bottom 65%",
          scrub: 0.4,
        },
      });

      eduTl
        .to(eduLineRef.current, {
          scaleX: 1,
          ease: "none",
          duration: 0.7,
        })
        .to(
          eduItemRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          eduHistoryRef.current?.children ? Array.from(eduHistoryRef.current.children) : [],
          {
            opacity: 1,
            scale: 1,
            stagger: 0.12,
            duration: 0.4,
            ease: "back.out(1.5)",
          },
          "-=0.15"
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
        <div className="experience-timeline" ref={timelineRef}>
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
      <div className="education-col" ref={eduColRef}>
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
