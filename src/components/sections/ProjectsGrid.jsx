import React, { useRef, useLayoutEffect } from "react";
import { portfolio } from "@/data";
import ProjectCard from "@/components/ProjectCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectsGrid = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-heading-block",
        { opacity: 0, y: 12 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".projects-heading-block", start: "top 87%", once: true },
        }
      );
      gsap.fromTo(
        ".projects-card",
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.65, ease: "power3.out",
          stagger: { amount: 0.45, from: "start" },
          scrollTrigger: { trigger: ".projects-grid", start: "top 83%", once: true },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative w-full section-pad">
      <div className="section-container">

        {/* Heading block */}
        <div className="projects-heading-block mb-14 sm:mb-20 flex flex-col items-center text-center gap-4">
          <p className="label-eyebrow">Selected Works</p>
          <h1 className="text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem] font-semibold leading-[1.05] tracking-tight text-foreground">
            My Portfolio
          </h1>
          <p className="max-w-[34ch] text-base sm:text-lg leading-[1.45] tracking-tight text-foreground/60">
            Full-stack projects built with the MERN stack and modern tooling.
          </p>
        </div>

        {/* Masonry grid — matches reference layout */}
        <div className="projects-grid columns-1 gap-6 md:columns-2 md:gap-7">
          {portfolio.map((item, index) => (
            <div key={item.id} className="projects-card mb-6 break-inside-avoid md:mb-7">
              <ProjectCard {...item} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
