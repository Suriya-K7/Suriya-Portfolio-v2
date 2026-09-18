import React, { useRef, useLayoutEffect } from "react";
import { resume } from "@/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Terminal-style experience card ── */
const ExperienceCard = ({ title, desc, year, isFirst }) => {
  const plainTitle = title.replace(/<span>.*?<\/span>/gi, "").trim();
  const spanMatch = title.match(/<span>(.*?)<\/span>/i);
  const company = spanMatch ? spanMatch[1].trim() : desc;
  const displayDesc = spanMatch ? desc : null;

  const isPresent = year.toLowerCase().includes("present");

  // Split desc into bullet points
  const bullets = displayDesc
    ? displayDesc.split(/[.!]\s+/).filter((s) => s.trim().length > 10)
    : [];

  return (
    <div className="exp-entry relative pl-10 pb-8 last:pb-0">
      {/* Timeline line */}
      <div className="timeline-line" aria-hidden="true" />

      {/* Timeline dot */}
      <div
        className={`timeline-dot ${isFirst ? "timeline-dot--active" : ""}`}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="terminal-card">
        {/* Role */}
        <p
          className="text-[11px] font-mono font-bold tracking-widest uppercase mb-2"
          style={{ color: "var(--accent-orange)" }}
        >
          {plainTitle}
        </p>

        {/* Company */}
        <p className="text-lg sm:text-xl font-mono font-semibold text-foreground leading-tight">
          {company}
        </p>

        {/* Date + status */}
        <div className="flex items-center gap-3 mt-2 mb-4">
          <span className="text-xs font-mono text-muted-foreground">{year}</span>
          {isPresent ? (
            <span className="status-badge status-badge--active">
              <span className="status-badge__dot" />
              CURRENT
            </span>
          ) : (
            <span className="status-badge status-badge--success">
              <span className="status-badge__dot" />
              COMPLETED
            </span>
          )}
        </div>

        {/* Description as terminal tree */}
        {bullets.length > 0 && (
          <div>
            <p className="terminal-prompt mb-2">cat role/summary.md</p>
            <div className="flex flex-col gap-1">
              {bullets.map((bullet, i) => (
                <div key={i} className="tree-item">
                  {bullet.trim()}
                  {!bullet.endsWith(".") && "."}
                </div>
              ))}
            </div>
          </div>
        )}
        {!displayDesc && desc && (
          <p className="text-xs font-mono text-muted-foreground/70 mt-1">{desc}</p>
        )}
      </div>
    </div>
  );
};

const ExperienceList = () => {
  const rootRef = useRef(null);
  const expItems = resume.filter((v) => v.category === "experience");

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-entry",
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.55, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="experience" className="section-container py-20 sm:py-28">
      {/* Section header */}
      <div className="section-header">
        <span><span className="section-number">§</span> 02 · EXPERIENCE</span>
        <span className="section-path">./log/experience</span>
      </div>

      <h2 className="heading-mono text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-foreground mb-12 leading-[1.15]">
        Hands on the codebase.<span className="blink-cursor" aria-hidden="true" />
      </h2>

      <div className="relative">
        {expItems.map((item, i) => (
          <ExperienceCard key={item.id} {...item} isFirst={i === 0} />
        ))}
      </div>
    </section>
  );
};

export default ExperienceList;
