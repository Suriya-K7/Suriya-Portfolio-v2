import React, { useEffect, useRef, Suspense, lazy } from "react";
import Profile from "@/assets/Pic.png";
import { Download, Mail } from "lucide-react";

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </svg>
);

const HeroScene = lazy(() => import("@/components/HeroScene"));

/* ── Stat card ── */
const StatCard = ({ value, label }) => (
  <div className="flex flex-col gap-1 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm px-5 py-4 hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
    <span className="text-2xl font-extrabold text-foreground tracking-tight leading-none">
      {value}
    </span>
    <span className="text-[11px] text-muted-foreground leading-tight">{label}</span>
  </div>
);

/* ── Floating badge ── */
const FloatingBadge = ({ icon, label, className = "" }) => (
  <div
    className={`
      absolute flex items-center gap-2 px-3 py-2 rounded-full
      bg-card/90 backdrop-blur-md border border-border/60
      text-xs font-semibold text-foreground shadow-lg
      ${className}
    `}
  >
    <span className="text-base leading-none">{icon}</span>
    {label}
  </div>
);

const Home = () => {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    // Dynamic GSAP import to keep initial bundle light
    import("gsap").then(({ default: gsap }) => {
      const ctx = gsap.context(() => {
        // Left column stagger
        gsap.fromTo(
          leftRef.current?.children ?? [],
          { opacity: 0, y: 36, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.1,
            duration: 1.1,
            ease: "power4.out",
            delay: 0.2,
          },
        );
        // Profile card
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, scale: 0.88, filter: "blur(10px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power3.out",
            delay: 0.5,
          },
        );
      }, containerRef);
      return () => ctx.revert();
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-16 lg:py-0 overflow-hidden bg-background text-foreground"
      id="home"
    >
      {/* Three.js 3D Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
        <HeroScene />
      </Suspense>

      {/* Radial glow blobs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <div className="section-container relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">

        {/* ══ LEFT: Text content ══ */}
        <div ref={leftRef} className="flex flex-col gap-7 order-2 lg:order-1">

          {/* Eyebrow */}
          <p className="label-eyebrow">Frontend Engineer</p>

          {/* Name */}
          <div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none text-foreground">
              Suriya
            </h1>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none text-foreground">
              Kesavamurthy
            </h1>
          </div>

          {/* Role */}
          <p className="text-lg sm:text-xl font-semibold text-foreground/80">
            Senior Frontend Engineer
          </p>

          {/* Description */}
          <p className="prose-body max-w-lg">
            MERN Stack developer focused on clean UIs, scalable APIs, and
            delivery-ready web products with 2.7+ years of hands-on experience.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <a
              href="https://drive.google.com/file/d/1RbkzozwdsiAFiN6AWIyfhKuINtBAFA53/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                bg-primary text-primary-foreground text-sm font-bold
                shadow-[0_0_20px_hsl(185_100%_50%_/_0.3)]
                hover:shadow-[0_0_32px_hsl(185_100%_50%_/_0.5)]
                hover:scale-[1.03] active:scale-[0.98]
                transition-all duration-200
              "
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
            <a
              href="https://linkedin.com/in/suriya-kesavamurthy-50616825a"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                border border-border/60 text-foreground text-sm font-semibold
                bg-card/60 backdrop-blur-sm
                hover:border-primary/50 hover:text-primary hover:bg-primary/5
                transition-all duration-200
              "
            >
              <LinkedinIcon className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href="#contact"
              className="
                inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                border border-border/60 text-foreground text-sm font-semibold
                bg-card/60 backdrop-blur-sm
                hover:border-primary/50 hover:text-primary hover:bg-primary/5
                transition-all duration-200
              "
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </a>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-3 pt-5">
            <StatCard value="2.7+" label="Years in MERN Stack" />
            <StatCard value="MERN" label="Frontend, backend & APIs" />
            <StatCard value="6+" label="Non-IT experience" />
          </div>
        </div>

        {/* ══ RIGHT: Profile card widget ══ */}
        <div className="flex justify-center lg:justify-end order-1 lg:order-2">
          <div
            ref={cardRef}
            className="relative w-[320px] sm:w-[360px]"
          >
            {/* Card frame */}
            <div className="relative rounded-3xl border border-border/50 bg-card/60 backdrop-blur-xl overflow-hidden shadow-2xl">

              {/* Top bar dots */}
              <div className="flex items-center gap-1.5 px-4 pt-4 pb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
              </div>

              {/* Profile photo */}
              <div className="mx-4 mb-0 rounded-2xl overflow-hidden aspect-[4/4.5]">
                <img
                  src={Profile}
                  alt="Suriya Kesavamurthy"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                />
              </div>

              {/* Info strip */}
              <div className="px-4 py-4 border-t border-border/40 mt-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                  Frontend Engineer
                </p>
                <p className="text-base font-bold text-foreground">Suriya Kesavamurthy</p>
                <p className="text-xs text-muted-foreground mt-0.5">Chennai, Tamil Nadu</p>
              </div>
            </div>

            {/* Floating badge — top left */}
            <FloatingBadge
              icon="⚡"
              label="Product-focused"
              className="float-badge -top-5 -left-5 sm:-left-10"
            />

            {/* Floating badge — right */}
            <FloatingBadge
              icon="⚛️"
              label="React + Next"
              className="float-badge-delay -right-5 sm:-right-10 top-1/3"
            />

            {/* Floating badge — bottom left */}
            <FloatingBadge
              icon="🚀"
              label="Available for work"
              className="float-badge -bottom-5 -left-5 sm:-left-10"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-40 animate-bounce">
        <span className="text-[10px] tracking-widest uppercase font-mono text-muted-foreground">
          Scroll
        </span>
        <div className="w-px h-8 rounded-full bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};

export default Home;
