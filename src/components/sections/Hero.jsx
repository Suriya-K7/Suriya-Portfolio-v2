import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, Download } from "lucide-react";
import Profile from "@/assets/Pic.png";

/* ── Status pill ── */
const AvailablePill = () => (
  <div
    className="inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium text-foreground/70"
    style={{ borderColor: "var(--pill-border)", background: "var(--pill-bg)" }}
  >
    <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
    Available for work
  </div>
);

/* ══════════════════════════════════════
   HERO SECTION
══════════════════════════════════════ */
const Hero = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

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
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, scale: 0.92, filter: "blur(16px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          delay: 0.4,
        }
      );
    });
  }, []);

  return (
    <section className="relative w-full overflow-hidden pt-36 pb-24 sm:pt-48 sm:pb-32">
      {/* ── Grain + blob background ── */}
      <div aria-hidden="true" className="hero-bg-blobs" />
      <div aria-hidden="true" className="grain-overlay" />
      {/* Extra middle blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%)" }}
      />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">

          {/* ══ LEFT: Text ══ */}
          <div ref={leftRef} className="flex flex-col gap-5 order-2 md:order-1">
            <AvailablePill />

            <p className="text-lg font-medium tracking-tight text-foreground leading-tight">
              Hey <span aria-hidden="true">👋</span>, I'm Suriya
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold leading-[1.08] tracking-tight text-foreground">
              Frontend Engineer &<br />
              MERN Stack Developer
            </h1>

            <p className="max-w-[36ch] text-base sm:text-lg leading-[1.5] tracking-tight text-foreground/60">
              I build scalable, high-performance web apps with React, Next.js,
              Node.js and MongoDB — clean interfaces, fast by default.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="mailto:suriya.fsd@gmail.com"
                className="
                  inline-flex h-11 items-center gap-2 rounded-xl
                  bg-foreground px-5 text-sm font-medium text-background
                  transition-all duration-200 hover:opacity-85 active:scale-[0.98]
                  focus-visible:outline-2 focus-visible:outline-foreground/50 focus-visible:outline-offset-2
                "
                aria-label="Send email to Suriya"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                Contact
              </a>

              <Link
                to="/projects"
                className="
                  group inline-flex h-11 items-center gap-2 rounded-xl
                  border border-border bg-background px-5 text-sm font-medium text-foreground
                  shadow-sm transition-all duration-200 hover:bg-foreground/4
                  focus-visible:outline-2 focus-visible:outline-foreground/50 focus-visible:outline-offset-2
                "
              >
                View My Work
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/* CV download — text link */}
            <a
              href="https://drive.google.com/file/d/1RbkzozwdsiAFiN6AWIyfhKuINtBAFA53/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 w-fit"
            >
              <Download className="h-3 w-3" aria-hidden="true" />
              Download CV
            </a>
          </div>

          {/* ══ RIGHT: Portrait card ══ */}
          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <div
              ref={rightRef}
              className="relative w-full max-w-[340px] md:max-w-[380px] overflow-hidden rounded-3xl border border-foreground/8 bg-background p-2 shadow-sm"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[1.4rem] bg-muted/30">
                <img
                  src={Profile}
                  alt="Suriya Kesavamurthy — Frontend Engineer"
                  className="w-full h-full object-cover object-top aspect-square"
                  loading="eager"
                  fetchpriority="high"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
