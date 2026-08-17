import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Capability tags derived from Suriya's skill set */
const TAGS = [
  "Frontend Development",
  "React & Next.js",
  "REST API Design",
  "State Management",
  "Responsive UI",
  "Performance Optimization",
  "CI/CD Pipelines",
  "Agile Collaboration",
  "TypeScript",
];

const WhatIDoTags = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".do-tag",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.4)",
          stagger: { amount: 0.35 },
          scrollTrigger: { trigger: rootRef.current, start: "top 87%", once: true },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="section-container pt-12">
      <p className="label-eyebrow mb-4">What I Do</p>
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-8">
        Capabilities
      </h2>

      <div className="flex flex-wrap gap-2.5">
        {TAGS.map((tag) => (
          <span
            key={tag}
            className="do-tag inline-flex items-center rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground/70"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
};

export default WhatIDoTags;
