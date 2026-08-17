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
      gsap.fromTo(
        ".portfolio-heading",
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: ".portfolio-heading", start: "top 87%", once: true },
        }
      );

      gsap.fromTo(
        ".portfolio-card",
        { opacity: 0, y: 36, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: { amount: 0.45, from: "start" },
          scrollTrigger: { trigger: ".portfolio-grid", start: "top 83%", once: true },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="portfolio"
      className="section-pad relative overflow-hidden bg-muted/10"
    >
      {/* Subtle dot-grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)",
        }}
      />

      <div className="section-container relative">

        {/* ── Heading ── */}
        <div className="portfolio-heading mb-12 sm:mb-16">
          <p className="label-eyebrow mb-4">Selected Works</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight mb-4">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-300">
              Portfolio
            </span>
          </h2>
          <p className="prose-body max-w-md">
            Full-stack projects built with the MERN stack and modern tooling.
            Click any card to explore details, stack, and live demos.
          </p>
        </div>

        {/* ── Projects grid ── */}
        <div className="portfolio-grid grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {portfolio.map((item, index) => (
            <PortfolioItem key={item.id} {...item} index={index} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-16 text-center">
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

/* Inline SVG icons */
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
