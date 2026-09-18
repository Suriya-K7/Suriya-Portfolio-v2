import React, { useEffect, useRef } from "react";
import { ArrowRight, Download } from "lucide-react";
import GitBranchGraph from "@/components/GitBranchGraph";

/* ── Status pill ── */
const AvailablePill = () => (
  <div className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground">
    <span className="text-[var(--accent-orange)] font-semibold">●</span>
    HEAD → MAIN
  </div>
);

/* ══════════════════════════════════════
   HERO SECTION — Developer Terminal Style
══════════════════════════════════════ */
const Hero = () => {
  const leftRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    import("gsap").then(({ default: gsap }) => {
      gsap.fromTo(
        leftRef.current?.children ?? [],
        { opacity: 0, y: 16, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.25,
        }
      );
    });
  }, []);

  return (
    <section id="hero" className="relative w-full overflow-hidden pt-28 pb-24 sm:pt-36 sm:pb-32">
      {/* ── Background ── */}
      <div aria-hidden="true" className="hero-bg-blobs" />
      <div aria-hidden="true" className="grain-overlay" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_auto] md:gap-16">

          {/* ══ LEFT: Text ══ */}
          <div ref={leftRef} className="flex flex-col gap-5">
            <AvailablePill />

            <h1 className="heading-mono text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.05] tracking-tight text-foreground">
              SURIYA<br />
              KESAVAMURTHY
            </h1>

            {/* Terminal-style taglines */}
            <div className="flex flex-col gap-1.5 font-mono text-sm sm:text-base text-muted-foreground">
              <p><span className="text-foreground/40">{">"}</span> Building full-stack apps with React, Node.js & MongoDB</p>
              <p><span className="text-foreground/40">{">"}</span> Engineering AI agents with Python, FastAPI & LangChain</p>
              <p><span className="text-foreground/40">{">"}</span> Shipping features from design to production</p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="
                  inline-flex h-11 items-center gap-2 rounded-xl
                  bg-foreground px-5 text-sm font-mono font-medium text-background
                  transition-all duration-200 hover:opacity-85 active:scale-[0.98]
                  focus-visible:outline-2 focus-visible:outline-foreground/50 focus-visible:outline-offset-2
                "
              >
                open projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#readme"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("readme")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="
                  group inline-flex h-11 items-center gap-2 rounded-xl
                  border border-border bg-background px-5 text-sm font-mono font-medium text-foreground
                  shadow-sm transition-all duration-200 hover:bg-foreground/4
                  focus-visible:outline-2 focus-visible:outline-foreground/50 focus-visible:outline-offset-2
                "
              >
                explore journey
              </a>

              <a
                href="https://drive.google.com/file/d/1RbkzozwdsiAFiN6AWIyfhKuINtBAFA53/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors duration-200 w-fit"
              >
                <Download className="h-3 w-3" aria-hidden="true" />
                download resume
              </a>
            </div>

            {/* Location + status */}
            <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                  <circle cx="12" cy="10" r="3" /><path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8Z" />
                </svg>
                Chennai, India
              </span>
              <span className="text-foreground/20">·</span>
              <span className="flex items-center gap-1.5">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
                available
              </span>
            </div>
          </div>

          {/* ══ RIGHT: Git Branch Graph ══ */}
          <div className="hidden md:flex justify-center md:justify-end">
            <GitBranchGraph />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
