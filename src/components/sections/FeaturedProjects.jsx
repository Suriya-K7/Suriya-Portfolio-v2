import React, { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { portfolio } from "@/data";
import ProjectCard from "@/components/ProjectCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeaturedProjects = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-heading",
        { opacity: 0, y: 12 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".featured-heading", start: "top 87%", once: true },
        }
      );
      gsap.fromTo(
        ".featured-card",
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.65, ease: "power3.out",
          stagger: { amount: 0.4, from: "start" },
          scrollTrigger: { trigger: ".featured-grid", start: "top 83%", once: true },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative w-full section-pad">
      <div className="section-container">

        {/* Heading */}
        <div className="featured-heading mb-14 sm:mb-20 text-center flex flex-col items-center gap-4">
          <p className="label-eyebrow">Selected Works</p>
          <h2 className="text-[2.25rem] sm:text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-foreground">
            My projects
          </h2>
          <p className="max-w-[34ch] text-base sm:text-lg leading-[1.45] tracking-tight text-foreground/60">
            Full-stack projects built with the MERN stack and modern tooling.
          </p>
        </div>

        {/* Grid */}
        <div className="featured-grid columns-1 gap-6 md:columns-2 md:gap-7">
          {portfolio.map((item, index) => (
            <div key={item.id} className="featured-card mb-6 break-inside-avoid md:mb-7">
              <ProjectCard {...item} index={index} />
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-14 flex justify-center">
          <Link
            to="/projects"
            className="group inline-flex cursor-pointer items-center gap-2 rounded-xl
              border border-border bg-background px-5 py-2.5
              text-sm font-medium text-foreground shadow-sm
              transition-colors hover:bg-foreground/5
              focus-visible:outline-2 focus-visible:outline-foreground/40 focus-visible:outline-offset-2"
          >
            View all projects
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
