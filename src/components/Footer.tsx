import React, { useState } from "react";

export default function Footer() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // honeypot
  });
  const [status, setStatus] = useState<{ message: string; state?: "success" | "error" }>({ message: "" });
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pending) return;

    // Honeypot check
    if (formData.website) return;

    setPending(true);
    setStatus({ message: "" });

    try {
      const response = await fetch("https://formspree.io/f/mqaeveoq", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not send message. Please email me directly.");
      }

      setStatus({ message: "Message sent! Thank you for reaching out.", state: "success" });
      setFormData({ name: "", email: "", subject: "", message: "", website: "" });
    } catch (err: any) {
      // Fallback: mailto link redirect if endpoint fails
      window.location.href = `mailto:aryandewade1214@gmail.com?subject=${encodeURIComponent(formData.subject || "Portfolio Contact")}&body=${encodeURIComponent(formData.message + "\n\nFrom: " + formData.name + " (" + formData.email + ")")}`;
      setStatus({
        message: "Opening your email app to send directly to aryandewade1214@gmail.com...",
        state: "success",
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <footer className="v2-ending version-two" id="contact">
      {/* Wave Graphic */}
      <img
        className="v2-footer-wave"
        src="/images/footer-wave.png"
        width={1920}
        height={900}
        alt=""
        aria-hidden="true"
        loading="lazy"
      />

      {/* Main Glass Contact Section */}
      <section className="contact-section">
        {/* Top: Wordmark, Intro & Pitch */}
        <div className="v2-contact-top">
          <div className="v2-contact-intro">
            <div aria-hidden="true" className="contact-wordmark">
              ARYAN<span>DEWADE</span>
            </div>
            <p className="lede">
              For internships, software engineering roles, hackathons, open-source collabs — or just to talk about
              ideas. I read every message.
            </p>
          </div>

          <div className="v2-contact-pitch">
            <h2>Let's build something real.</h2>
          </div>
        </div>

        {/* Bottom: Email, Availability, Social Profiles & Resume */}
        <div className="v2-contact-bottom">
          <div className="v2-reachout">
            <div className="tag">⌬ Let's make something</div>
            <a className="v2-contact-email cursor-can-hover" href="mailto:aryandewade1214@gmail.com">
              aryandewade1214@gmail.com
            </a>
            <div className="contact-avail">
              <span className="ca-dot" />
              Available for full-time & intern roles · 2026 / 2027
            </div>
          </div>

          <div className="contact-btns" aria-label="Social profiles and resume">
            <a
              className="v2-social-link v2-linkedin cursor-can-hover"
              href="https://www.linkedin.com/in/aryan-dewade-925b04294/"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <span aria-hidden="true">in</span>
            </a>

            <a
              className="v2-social-link cursor-can-hover"
              href="https://github.com/aryandewade"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="GitHub"
              title="GitHub"
            >
              <img src="/images/github.svg" width={22} height={22} alt="" />
            </a>

            <a
              className="v2-resume-button cursor-can-hover"
              href="/Aryan_Dewade_Resumenew.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <span aria-hidden="true" className="dot" />
              Resume
            </a>
          </div>
        </div>
      </section>

      {/* Sub-Footer Bar */}
      <div className="v2-ending-footer">
        <span>© 2026 made by Aryan Dewade</span>
        <span>CS @ Shri Sant Gajanan Maharaj College of Engineering</span>
        <span>Shegaon · MH, India</span>
      </div>

      {/* Contact Dialog Modal */}
      {dialogOpen && (
        <dialog
          className="v2-contact-dialog"
          open
          aria-labelledby="contactFormTitle"
          aria-describedby="contactFormDescription"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setDialogOpen(false);
            }
          }}
        >
          <button
            className="v2-form-close cursor-can-hover"
            type="button"
            aria-label="Close contact form"
            onClick={() => setDialogOpen(false)}
          >
            ×
          </button>

          <div className="v2-form-layout">
            <div className="v2-form-intro">
              <h2 id="contactFormTitle">Get in Touch</h2>
              <p id="contactFormDescription">Drop me a message.</p>
              <a href="mailto:aryandewade1214@gmail.com">aryandewade1214@gmail.com</a>
            </div>

            <form id="contactForm" onSubmit={handleSubmit}>
              <label htmlFor="contactName">
                Your name <span aria-hidden="true">*</span>
              </label>
              <input
                id="contactName"
                name="name"
                autoComplete="name"
                required
                maxLength={100}
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <label htmlFor="contactEmail">
                Email address <span aria-hidden="true">*</span>
              </label>
              <input
                id="contactEmail"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <label htmlFor="contactSubject">Subject</label>
              <input
                id="contactSubject"
                name="subject"
                maxLength={120}
                placeholder="What would you like to talk about?"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />

              <label htmlFor="contactMessage">
                Your message <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="contactMessage"
                name="message"
                rows={4}
                required
                maxLength={5000}
                placeholder="Tell me about it…"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />

              {/* Honeypot field */}
              <div className="v2-form-honey" aria-hidden="true">
                <label htmlFor="contactWebsite">Leave this field empty</label>
                <input
                  id="contactWebsite"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>

              <button className="v2-form-send cursor-can-hover" type="submit" disabled={pending}>
                <span className="dot" aria-hidden="true" />
                <span>{pending ? "Sending…" : "Send message"}</span>
              </button>

              {status.message && (
                <p className="v2-form-status" data-state={status.state} role="status" aria-live="polite">
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </dialog>
      )}
    </footer>
  );
}
