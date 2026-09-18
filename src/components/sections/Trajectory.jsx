import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
  {
    num: "PHASE.01",
    status: "COMPLETED",
    title: "Junior Full Stack Developer",
    tags: "React · Node.js · MongoDB · LangChain",
    statusType: "done",
  },
  {
    num: "PHASE.02",
    status: "CURRENT",
    title: "Frontend Engineer",
    tags: "React · TypeScript · RTK · Python · FastAPI · AI Agents",
    statusType: "active",
  },
  {
    num: "PHASE.03",
    status: "NEXT",
    title: "Full Stack Architect",
    tags: "System Design · AWS · APIs · Microservices",
    statusType: "pending",
  },
  {
    num: "PHASE.04",
    status: "NORTH-STAR",
    title: "Tech Lead",
    tags: "Team Leadership · Architecture · Mentoring",
    statusType: "pending",
  },
];

const TrajectoryCard = ({ num, status, title, tags, statusType }) => (
  <div className="traj-card relative pl-10 pb-6 last:pb-0">
    {/* Timeline */}
    <div className="timeline-line" aria-hidden="true" />
    <div
      className={`timeline-dot ${statusType === "active" ? "timeline-dot--active" : ""} ${statusType === "done" ? "timeline-dot--done" : ""}`}
      aria-hidden="true"
    />

    <div className="terminal-card">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] font-mono font-semibold tracking-widest uppercase text-muted-foreground/50">
          {num}
        </span>
        <span className={`text-[9px] font-mono font-bold tracking-widest uppercase ${
          statusType === "active" ? "text-[var(--accent-orange)]"
          : statusType === "done" ? "text-emerald-500"
          : "text-muted-foreground/40"
        }`}>
          {status}
        </span>
      </div>
      <p className="text-lg sm:text-xl font-mono font-semibold text-foreground leading-tight">
        {title}
      </p>
      <p className="text-[11px] font-mono text-muted-foreground/60 mt-1.5">{tags}</p>
    </div>
  </div>
);

const Trajectory = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".traj-card",
        { opacity: 0, x: -16 },
        {
          opacity: 1, x: 0, duration: 0.5, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="trajectory" className="section-container py-20 sm:py-28">
      {/* Section header */}
      <div className="section-header">
        <span><span className="section-number">§</span> 06 · TRAJECTORY</span>
        <span className="section-path">./roadmap.timeline</span>
      </div>

      <h2 className="heading-mono text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-foreground mb-10 leading-[1.15]">
        The path — one deploy<br />at a time.
      </h2>

      <div className="relative max-w-2xl">
        {PHASES.map((phase) => (
          <TrajectoryCard key={phase.num} {...phase} />
        ))}
      </div>
    </section>
  );
};

export default Trajectory;
