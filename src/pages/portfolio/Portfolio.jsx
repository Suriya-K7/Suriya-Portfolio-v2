import React, { useRef, useLayoutEffect } from "react";
import { portfolio } from "@/data";
import PortfolioItem from "@/components/PortfolioItem";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Heading fade-up */
      gsap.fromTo(
        ".portfolio-heading",
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".portfolio-heading",
            start: "top 87%",
            once: true,
          },
        }
      );

      /* Cards — staggered scale + fade */
      gsap.fromTo(
        ".portfolio-card",
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: {
            amount: 0.5,      // total stagger spread
            from: "start",
          },
          scrollTrigger: {
            trigger: ".portfolio-grid",
            start: "top 83%",
            once: true,
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="portfolio"
      className="section-pad relative overflow-hidden"
    >
      {/* Subtle background grid decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.4)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.4)_1px,transparent_1px)]"
        style={{ backgroundSize: "48px 48px", maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)" }}
      />

      <div className="section-container relative">

        {/* ── Section heading ── */}
        <div className="portfolio-heading text-center mb-14 sm:mb-20">
          <p className="label-eyebrow mb-3">Selected Works</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-foreground">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">
              Portfolio
            </span>
          </h2>
          <p className="mt-4 max-w-md mx-auto prose-body">
            Full-stack projects built with the MERN stack and modern tooling.
            Click any card to explore details, stack, and live demos.
          </p>
        </div>

        {/* ── Projects grid ── */}
        <div className="portfolio-grid grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {portfolio.map((item, index) => (
            <PortfolioItem key={item.id} {...item} index={index} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/Suriya-K7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground
              hover:text-primary transition-colors duration-200 group"
          >
            <GitBranchIcon />
            View all projects on GitHub
            <ArrowUpRightIcon />
          </a>
        </div>
      </div>
    </section>
  );
};

/* Inline SVG to avoid lucide export issues */
const GitBranchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" x2="6" y1="3" y2="15" />
    <circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><circle cx="6" cy="6" r="3" />
    <path d="M18 9a9 9 0 0 1-9 9" />
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
    <path d="M7 7h10v10" /><path d="M7 17 17 7" />
  </svg>
);

export default Portfolio;
