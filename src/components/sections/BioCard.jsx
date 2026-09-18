import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Trajectory map sidebar ── */
const MILESTONES = [
  { num: "01", title: "Full Stack Dev", tags: "react · node.js · mongodb · langchain", status: "done" },
  { num: "02", title: "Frontend Engineer", tags: "react · typescript · rtk · python · fastapi", status: "now" },
  { num: "03", title: "Full Stack Architect", tags: "system design · aws · microservices", status: "next" },
  { num: "04", title: "Tech Lead", tags: "mentoring · architecture · team leadership", status: "next" },
];

const MilestoneItem = ({ num, title, tags, status }) => {
  const isNow = status === "now";
  const isDone = status === "done";
  return (
    <div className="flex items-start gap-3 relative">
      {/* Timeline connector */}
      {status !== "next" || num !== "05" ? (
        <div className="absolute left-[0.9rem] top-8 bottom-0 w-px bg-border" aria-hidden="true" />
      ) : null}

      {/* Number badge */}
      <span
        className={`
          flex h-7 w-7 shrink-0 items-center justify-center rounded-md
          text-[10px] font-mono font-bold z-10
          ${isNow
            ? "bg-[var(--accent-orange)] text-white"
            : "bg-muted text-muted-foreground border border-border"
          }
        `}
      >
        {num}
      </span>

      {/* Content */}
      <div className="flex-1 pb-4">
        <div className="flex items-center justify-between">
          <p className={`text-sm font-mono font-semibold ${isNow ? "text-foreground" : isDone ? "text-foreground" : "text-muted-foreground"}`}>
            {title}
          </p>
          <span className={`text-[9px] font-mono font-medium tracking-wider uppercase ${
            isDone ? "text-muted-foreground/50" : isNow ? "text-[var(--accent-orange)]" : "text-muted-foreground/40"
          }`}>
            {status}
          </span>
        </div>
        <p className="text-[11px] font-mono text-muted-foreground/60 mt-0.5">{tags}</p>
      </div>
    </div>
  );
};

const BioCard = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rootRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="readme" className="section-container py-20 sm:py-28">
      {/* Section header */}
      <div className="section-header">
        <span><span className="section-number">§</span> 01 · README</span>
        <span className="section-path">./README.md</span>
      </div>

      {/* Big monospace heading */}
      <h2 className="heading-mono text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-foreground mb-10 leading-[1.15]">
        Code first. Ship with<br />confidence.<span className="blink-cursor" aria-hidden="true" />
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-14">
        {/* ── Left: Bio ── */}
        <div className="prose-body space-y-5 max-w-3xl">
          <p>
            I'm Suriya, based in Chennai. I'm a{" "}
            <strong className="text-foreground font-semibold">Full Stack Developer & Frontend Engineer</strong> with{" "}
            3+ years of hands-on experience building production applications using{" "}
            <span style={{ color: "var(--accent-orange)" }}>React.js</span>,{" "}
            <span style={{ color: "var(--accent-orange)" }}>TypeScript</span>,{" "}
            <span style={{ color: "var(--accent-orange)" }}>Node.js</span>, and{" "}
            <span style={{ color: "var(--accent-orange)" }}>MongoDB</span>.
          </p>
          <p>
            My approach is simple: build the thing, deploy it, iterate, and ship.
            I deliver clean, scalable interfaces backed by reliable APIs — currently
            working as a Frontend Engineer at{" "}
            <strong className="text-foreground font-semibold">Stratforge Pvt. Ltd.</strong> in Chennai,
            where I'm building AI-powered features with{" "}
            <span style={{ color: "var(--accent-orange)" }}>Python</span>,{" "}
            <span style={{ color: "var(--accent-orange)" }}>FastAPI</span>, and{" "}
            <span style={{ color: "var(--accent-orange)" }}>LangChain</span>.
          </p>
          <p>
            My toolkit extends across{" "}
            <strong className="text-foreground font-semibold">Redux Toolkit</strong>,{" "}
            <strong className="text-foreground font-semibold">Tailwind CSS</strong>,{" "}
            <strong className="text-foreground font-semibold">ShadCN UI</strong>,{" "}
            <strong className="text-foreground font-semibold">AI Agents</strong>, and{" "}
            <strong className="text-foreground font-semibold">Microservices</strong>.
            Before entering tech I spent 6+ years in a Non-IT professional role,
            which sharpened my problem-solving instincts and appreciation for reliable,
            maintainable systems.
          </p>
          <p>
            The direction I'm heading in is{" "}
            <span style={{ color: "var(--accent-orange)" }}>
              Full Stack Architecture, System Design, and Cloud Infrastructure
            </span>
            {" "}— the platforms that let software run reliably in production.
            I'd rather ship five honest projects than talk about ten I never finished.
          </p>
        </div>

        {/* ── Right: Trajectory map sidebar ── */}
        <div className="terminal-card">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono font-semibold tracking-widest uppercase text-muted-foreground">
              TRAJECTORY.MAP
            </span>
            <span className="status-badge status-badge--active">
              <span className="status-badge__dot" />
              IN PROGRESS
            </span>
          </div>

          <div className="flex flex-col">
            {MILESTONES.map((m) => (
              <MilestoneItem key={m.num} {...m} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BioCard;
