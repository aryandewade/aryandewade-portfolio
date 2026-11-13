import React, { useEffect, useState } from "react";
import ElasticCursor from "./components/ElasticCursor";
import HeroSection from "./components/HeroSection";
import DaylightToggle from "./components/DaylightToggle";
import { VenomContactButton } from "./components/VenomContactButton";
import CursorPet from "./components/CursorPet";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import Footer from "./components/Footer";

type Project = {
  title: string;
  type: string;
  description: string;
  stack: string;
  accent: string;
  highlights: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
};

const projects: Project[] = [
  {
    title: "CineTracker",
    type: "React / product build",
    description: "A responsive movie and TV series tracker with dynamic posters, ratings, genres, details, and an organized viewing history.",
    stack: "React.js · Tailwind CSS · TMDB API",
    accent: "#d7ff70",
    image: "/images/CineTracker.png",
    liveUrl: "https://cinetracker-2-two.vercel.app/",
    githubUrl: "https://github.com/aryandewade/cinetracker",
    highlights: [
      "Integrated TMDB for live posters, ratings, genres, and movie details.",
      "Added filtering and sorting by day, month, and year.",
      "Designed a clean, mobile-friendly viewing history experience.",
    ],
  },
  {
    title: "CodeMent",
    type: "AI / full-stack build",
    description: "An AI-powered code review platform with a React + Vite frontend and Express backend that uses Gemini to generate review feedback.",
    stack: "React.js · Vite · Express.js · Gemini API",
    accent: "#a99bff",
    highlights: [
      "Built separate frontend and backend architecture.",
      "Connected Gemini API to analyze submitted code and generate feedback.",
      "Created a modern interface for submitting and reviewing code.",
    ],
  },
];

const techStack = [
  [
    ["C", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg"],
    ["C++", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"],
    ["JavaScript", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"],
    ["HTML", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"],
    ["CSS", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"],
    ["React", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"],
    ["Tailwind", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"],
  ],
  [
    ["Node.js", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"],
    ["Express", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"],
    ["MySQL", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"],
    ["Git", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"],
    ["GitHub", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"],
  ],
  [
    ["DSA", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"],
    ["OOP", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"],
    ["DBMS", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"],
    ["Claude Code", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/anthropic/anthropic-original.svg"],
  ],
];

function App() {
  const [activeProject, setActiveProject] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll(".reveal").forEach((element) => reveal.observe(element));

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      reveal.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main>
      <ElasticCursor />
      <CursorPet />

      {/* Fixed Doto circular 'A' button at top-left */}
      <button
        className="portfolio-return cursor-can-hover"
        onClick={() => scrollTo("#hero")}
        title="Aryan Dewade"
        aria-label="Back to top"
      >
        A
      </button>

      {/* Top Header */}
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <button
          className="wordmark cursor-can-hover"
          onClick={() => scrollTo("#hero")}
          aria-label="Aryan Dewade — Home"
        >
          ARYANDEWADE
        </button>

        <div className="header-actions">
          <VenomContactButton
            onClick={() => scrollTo("#contact")}
          />
          <button
            className="menu-toggle cursor-can-hover"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span>Menu</span>
            <span className="menu-lines" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Full-screen navigation drawer */}
      {menuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Navigation">
          <div className="drawer-head">
            <span className="wordmark">ARYANDEWADE</span>
            <button
              className="drawer-close cursor-can-hover"
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              Close <span aria-hidden="true">×</span>
            </button>
          </div>
          <nav>
            <ul>
              <li>
                <button className="cursor-can-hover" onClick={() => scrollTo("#hero")}>Home</button>
              </li>
              <li>
                <button className="cursor-can-hover" onClick={() => scrollTo("#about")}>About</button>
              </li>
              <li>
                <button className="cursor-can-hover" onClick={() => scrollTo("#work")}>Projects</button>
              </li>
              <li>
                <button className="cursor-can-hover" onClick={() => scrollTo("#skills")}>Skills</button>
              </li>
              <li>
                <button className="cursor-can-hover" onClick={() => scrollTo("#contact")}>Contact</button>
              </li>
            </ul>
          </nav>
          <div className="drawer-foot">Aryan Dewade · Hinganghat · MH</div>
        </div>
      )}

      {/* Hero Section */}
      <HeroSection scrollTo={scrollTo} onOpenMenu={() => setMenuOpen(true)} />

      {/* About Section - Scroll-Triggered Text Fill Reveal */}
      <AboutSection />

      {/* Experience & Education - Animated growing timeline & reveal */}
      <ExperienceSection />

      {/* Work Section */}
      <section className="work reveal" id="work">
        <div className="section-head"><p className="eyebrow">04 / SELECTED WORK</p><p className="muted">Two resume projects</p></div>
        <div className="project-layout">
          <div className="project-list">
            {projects.map((project, index) => (
              <button className={`project-row ${activeProject === index ? "active" : ""}`} onClick={() => setActiveProject(index)} key={project.title}>
                <span>0{index + 1}</span><strong>{project.title}</strong><small>{project.type}</small><b>↗</b>
              </button>
            ))}
            <div className="project-note"><span className="pulse" /> Open to collaborating on interesting problems.</div>
          </div>
          <article className="project-card" key={projects[activeProject].title} style={{ "--project-accent": projects[activeProject].accent } as React.CSSProperties}>
            <div className={`project-art ${projects[activeProject].image ? "has-image" : ""}`}>
              {projects[activeProject].image && <img src={projects[activeProject].image} alt={`${projects[activeProject].title} interface`} />}
              <div className="project-art-copy"><span>0{activeProject + 1}</span><strong>{projects[activeProject].title}</strong><small>{projects[activeProject].stack}</small></div>
            </div>
            <div className="card-content"><p className="eyebrow">{projects[activeProject].type}</p><h3>{projects[activeProject].title}</h3><p>{projects[activeProject].description}</p><ul className="project-highlights">{projects[activeProject].highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul><div className="card-footer"><span>{projects[activeProject].stack}</span><span className="project-links">{projects[activeProject].liveUrl && <a href={projects[activeProject].liveUrl} target="_blank" rel="noreferrer">Live demo ↗</a>}{projects[activeProject].githubUrl && <a href={projects[activeProject].githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>}</span></div></div>
          </article>
        </div>
      </section>

      {/* Skills & Tools */}
      <section className="skills techstack reveal" id="skills" data-no-custom-cursor="true">
        <div className="techstack-video-container" aria-hidden="true">
          <video className="techstack-video" autoPlay loop muted playsInline>
            <source src="/video/video.webm" type="video/webm" />
          </video>
          <div className="techstack-video-grid" />
          <div className="techstack-overlay" />
        </div>
        <div className="techstack-content">
          <p className="eyebrow">05 / SKILLS & TOOLS</p>
          <h2>Tech Stack</h2>
          <div className="techstack-pyramid">
            {techStack.map((row, rowIndex) => (
              <div className="techstack-row" key={rowIndex}>
                {row.map(([name, icon]) => (
                  <a className="techstack-item" href={`https://www.google.com/search?q=${name}`} target="_blank" rel="noreferrer" key={name} title={name}>
                    <img src={icon} alt="" loading="lazy" />
                    <span>{name}</span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Activity */}
      <section className="github-activity reveal" id="github-activity">
        <div className="section-head">
          <p className="eyebrow">06 / GITHUB ACTIVITY</p>
          <a className="github-activity-link" href="https://github.com/aryandewade" target="_blank" rel="noreferrer">
            View profile ↗
          </a>
        </div>
        <div className="github-activity-card">
          <div className="github-activity-copy">
            <h2>Building in<br /><em>public.</em></h2>
            <p>A snapshot of my recent open-source work and coding consistency.</p>
          </div>
          <a className="github-calendar" href="https://github.com/aryandewade" target="_blank" rel="noreferrer">
            <img
              src="https://ghchart.rshah.org/aryandewade"
              alt="GitHub contribution activity for Aryan Dewade"
              loading="lazy"
            />
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section reveal" id="stats">
        <div className="section-head">
          <p className="eyebrow">07 / FROM ZERO TO ONE</p>
          <p className="muted">A few numbers, a few quirks.</p>
        </div>
        <div className="stats-grid">
          <article className="stat-card stat-card-availability">
            <p className="stat-label">Availability</p>
            <h2><span className="stat-dot" />Yes</h2>
            <p className="stat-note">Open to internships and interesting collaborations.</p>
          </article>
          <article className="stat-card">
            <p className="stat-label">Featured work</p>
            <h2>02</h2>
            <p className="stat-note">Projects built with React, Node.js, and modern web tools.</p>
          </article>
          <article className="stat-card">
            <p className="stat-label">Education</p>
            <h2>2027</h2>
            <p className="stat-note">B.E. Computer Science & Engineering · CGPA 8.1/10.</p>
          </article>
          <article className="stat-card stat-card-wide">
            <p className="stat-label">Current role</p>
            <h2>Full Stack Developer Intern</h2>
            <p className="stat-note">Currently interning at Engiplex Solutions.</p>
          </article>
        </div>
      </section>

      {/* Daylight Experiment */}
      <section className="daylight-section reveal" id="daylight">
        <div className="daylight-section-copy">
          <p className="eyebrow">08 / DAYLIGHT EXPERIMENT</p>
          <h2>A small world<br /><em>in motion.</em></h2>
          <p>Drag the original daylight toggle through its scene. The panel around it changes with the time of day.</p>
        </div>
        <DaylightToggle large />
      </section>

      {/* V2 Footer & Contact Section from hero_portfolio */}
      <Footer />
    </main>
  );
}

export default App;
