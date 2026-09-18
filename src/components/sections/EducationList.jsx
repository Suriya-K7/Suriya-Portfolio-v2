import React, { useRef, useLayoutEffect } from "react";
import { resume } from "@/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Education entry card ── */
const EduCard = ({ title, desc, year }) => {
  const plainTitle = title.replace(/<span>.*?<\/span>/gi, "").trim();
  const spanMatch = title.match(/<span>(.*?)<\/span>/i);
  const institution = spanMatch ? spanMatch[1].trim() : "";

  return (
    <div className="edu-entry relative pl-10 pb-6 last:pb-0">
      {/* Timeline */}
      <div className="timeline-line" aria-hidden="true" />
      <div className="timeline-dot" aria-hidden="true" />

      <div className="terminal-card">
        <p
          className="text-[11px] font-mono font-bold tracking-widest uppercase mb-1.5"
          style={{ color: "var(--accent-orange)" }}
        >
          {plainTitle}
        </p>
        {institution && (
          <p className="text-base font-mono font-semibold text-foreground leading-tight">
            {institution}
          </p>
        )}
        <div className="flex items-center gap-3 mt-2">
          <span className="text-[11px] font-mono text-muted-foreground">{year}</span>
          <span className="status-badge status-badge--success">
            <span className="status-badge__dot" />
            COMPLETED
          </span>
        </div>
        {desc && (
          <p className="text-xs font-mono text-muted-foreground/60 mt-2">{desc}</p>
        )}
      </div>
    </div>
  );
};

const EducationList = () => {
  const rootRef = useRef(null);
  const eduItems = resume.filter((v) => v.category === "education");

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".edu-entry",
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.55, ease: "power3.out", stagger: 0.09,
          scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="section-container pb-20 sm:pb-28">
      {/* Section header */}
      <div className="section-header">
        <span><span className="section-number">§</span> 03 · LOGBOOK</span>
        <span className="section-path">./log/education</span>
      </div>

      <h2 className="heading-mono text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-10 leading-[1.15]">
        Commits from the classroom.
      </h2>

      <div className="relative">
        {eduItems.map((item) => (
          <EduCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default EducationList;
