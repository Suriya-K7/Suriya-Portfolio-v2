import React, { useRef, useLayoutEffect } from "react";
import Info from "@/components/Info";
import Stats from "@/components/Stats";
import { Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Skills from "@/components/Skills";
import { resume } from "@/data";
import ResumeItem from "@/components/ResumeItem";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Shared section heading ─── */
const SectionHeading = ({ eyebrow, title, accent, subtitle }) => (
  <div className="reveal-heading text-center mb-14 sm:mb-20">
    {eyebrow && (
      <p className="label-eyebrow mb-3">{eyebrow}</p>
    )}
    <h2
      className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-foreground"
    >
      {title}{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">
        {accent}
      </span>
    </h2>
    {subtitle && (
      <p className="mt-4 max-w-lg mx-auto prose-body">{subtitle}</p>
    )}
  </div>
);

/* ─── Sparkle divider ─── */
const Divider = () => (
  <div className="relative flex items-center justify-center my-16 sm:my-24">
    <div className="absolute inset-x-0 top-1/2 -translate-y-px h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    <span className="relative z-10 bg-background px-3">
      <Sparkles className="h-3.5 w-3.5 text-primary/50" />
    </span>
  </div>
);

/* ─── Hook: GSAP reveal with ScrollTrigger ─── */
function useReveal(containerRef) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Headings */
      gsap.fromTo(
        ".reveal-heading",
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: ".reveal-heading", start: "top 82%", once: true },
          stagger: 0.15,
        }
      );

      /* Personal info rows */
      gsap.fromTo(
        ".info-row",
        { opacity: 0, x: -24 },
        {
          opacity: 1, x: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.055,
          scrollTrigger: { trigger: ".info-list", start: "top 82%", once: true },
        }
      );

      /* Stat cards */
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 28, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6,
          ease: "back.out(1.5)",
          stagger: 0.12,
          scrollTrigger: { trigger: ".stats-col", start: "top 82%", once: true },
        }
      );

      /* Skills — animated inside Skills component itself */

      /* Journey items — left column slides from left, right from right */
      gsap.fromTo(
        ".journey-exp .journey-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".journey-grid", start: "top 80%", once: true },
        }
      );
      gsap.fromTo(
        ".journey-edu .journey-item",
        { opacity: 0, x: 30 },
        {
          opacity: 1, x: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.15,
          scrollTrigger: { trigger: ".journey-grid", start: "top 80%", once: true },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
}

/* ═══════════ ABOUT PAGE ═══════════ */
const About = () => {
  const rootRef = useRef(null);
  useReveal(rootRef);

  return (
    <section ref={rootRef} id="about" className="section-pad">

      {/* ════════ ABOUT ME ════════ */}
      <section className="section-container">
        <SectionHeading
          eyebrow="Who I Am"
          title="About"
          accent="Me"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-20 items-start">

          {/* ── Personal Info ── */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-3">
              Personal Info
              <span className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
            </h3>

            <ul className="info-list rounded-xl border border-border/50 overflow-hidden divide-y divide-border/40 mb-8">
              <Info />
            </ul>

            <a
              href="https://drive.google.com/file/d/1RbkzozwdsiAFiN6AWIyfhKuINtBAFA53/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="group w-full sm:w-auto gap-2 rounded-full px-8 cursor-pointer
                  shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35
                  transition-all duration-300"
              >
                Download CV
                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </Button>
            </a>
          </div>

          {/* ── Stats ── */}
          <div className="stats-col grid grid-cols-1 gap-4">
            <Stats />
          </div>
        </div>
      </section>

      <Divider />

      {/* ════════ SKILLS ════════ */}
      <section id="skills" className="section-container">
        <SectionHeading
          eyebrow="What I Know"
          title="My"
          accent="Skills"
          subtitle="Technologies and tools I use to build modern, high-performance web applications."
        />
        <div className="skills-grid w-full">
          <Skills />
        </div>
      </section>

      <Divider />

      {/* ════════ JOURNEY ════════ */}
      <section id="journey" className="section-container">
        <SectionHeading
          eyebrow="My Timeline"
          title="My"
          accent="Journey"
          subtitle="A chronological view of my professional career and academic background."
        />

        <div className="journey-grid grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Experience */}
          <div className="journey-exp">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-primary mb-8 flex items-center gap-3">
              Experience
              <span className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
            </h3>
            {resume
              .filter((v) => v.category === "experience")
              .map((val) => (
                <ResumeItem key={val.id} {...val} />
              ))}
          </div>

          {/* Education */}
          <div className="journey-edu">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-primary mb-8 flex items-center gap-3">
              Education
              <span className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
            </h3>
            {resume
              .filter((v) => v.category === "education")
              .map((val) => (
                <ResumeItem key={val.id} {...val} />
              ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default About;
