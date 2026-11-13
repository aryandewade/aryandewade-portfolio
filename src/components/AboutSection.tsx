import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

if (typeof window !== "undefined") {
  (window as any).__ScrollTrigger = ScrollTrigger;
  (window as any).__gsap = gsap;
}

const paragraph1 =
  "I'm Aryan Dewade — a Computer Science Engineering student and developer who enjoys turning ideas into meaningful digital experiences.";

const paragraph2 =
  "I work across the full stack, building responsive interfaces and functional applications using React, Node.js, Express and MongoDB. I enjoy exploring how things work under the hood, solving problems, and turning concepts into products people can actually use.";

const paragraph3 =
  "Beyond writing code, I'm constantly experimenting, learning new technologies and refining the way I build. I believe good software isn't just about making things work — it's about making them work well, feel intuitive, and solve real problems.";

const highlight = "Currently learning. Constantly building. Always curious.";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Collect all words across paragraphs and highlight
      const words = textRef.current?.querySelectorAll<HTMLSpanElement>(".about-fill-word");

      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          {
            color: "rgba(255, 255, 255, 0.18)",
            opacity: 0.22,
          },
          {
            color: "#ffffff",
            opacity: 1,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              end: "bottom 30%",
              scrub: 0.35,
            },
          }
        );
      }

      // Smooth subtle reveal for the action bar & meta info
      if (metaRef.current) {
        gsap.fromTo(
          metaRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: metaRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    // Refresh ScrollTrigger once fonts and DOM measurements settle
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
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="about-container">
        {/* Eyebrow */}
        <p className="about-eyebrow">About</p>

        {/* Title */}
        <h2 className="about-title">Useful software, made human.</h2>

        {/* Scroll-Triggered Text Fill Reveal Body */}
        <div className="about-body" ref={textRef}>
          <p className="about-paragraph">
            {paragraph1.split(" ").map((word, i) => (
              <span key={`p1-${i}`} className="about-fill-word">
                {word}{" "}
              </span>
            ))}
          </p>

          <p className="about-paragraph">
            {paragraph2.split(" ").map((word, i) => (
              <span key={`p2-${i}`} className="about-fill-word">
                {word}{" "}
              </span>
            ))}
          </p>

          <p className="about-paragraph">
            {paragraph3.split(" ").map((word, i) => (
              <span key={`p3-${i}`} className="about-fill-word">
                {word}{" "}
              </span>
            ))}
          </p>

          <p className="about-paragraph about-highlight">
            {highlight.split(" ").map((word, i) => (
              <span key={`hl-${i}`} className="about-fill-word">
                {word}{" "}
              </span>
            ))}
          </p>
        </div>

        {/* Footer Meta & Résumé CTA */}
        <div className="about-meta" ref={metaRef}>
          <a
            className="about-resume-button cursor-can-hover"
            href="/Aryan_Dewade_Resumenew.pdf"
            download
            target="_blank"
            rel="noreferrer"
          >
            <span>Download résumé</span>
            <span className="about-resume-arrow" aria-hidden="true">↗</span>
          </a>

          <div className="about-badges">
            <span className="about-badge">SSGMCE · B.E. CSE '27 (8.1 CGPA)</span>
            <span className="about-badge">Engiplex Solutions · Full Stack Intern</span>
          </div>
        </div>
      </div>
    </section>
  );
}
