import React, { useRef, useLayoutEffect } from "react";
import { Download } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Stat chip ── */
const StatChip = ({ label }) => (
  <span className="inline-flex items-center rounded-full border border-border bg-muted px-3.5 py-1 text-xs font-medium text-foreground/70">
    {label}
  </span>
);

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
    <section ref={rootRef} className="section-container section-pad pb-0">
      <div className="rounded-2xl border border-border bg-card p-7 sm:p-10">
        {/* Eyebrow */}
        <p className="label-eyebrow mb-6">Who I Am</p>

        {/* Name heading */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground mb-8 leading-tight">
          Hello! I'm{" "}
          <span
            className="relative inline-block"
            style={{
              textDecoration: "underline",
              textDecorationColor: "hsl(var(--muted-foreground) / 0.35)",
              textUnderlineOffset: "6px",
              textDecorationThickness: "2px",
            }}
          >
            Suriya Kesavamurthy.
          </span>
        </h1>

        {/* Bio paragraphs — full bio from the hero, split into 3 shorter paragraphs */}
        <div className="prose-body space-y-4 max-w-3xl mb-8">
          <p>
            I'm a <strong className="text-foreground font-semibold">MERN Stack Developer</strong> with{" "}
            2.7 years of hands-on experience building full-stack web applications using{" "}
            <strong className="text-foreground font-semibold">React.js</strong>,{" "}
            <strong className="text-foreground font-semibold">Node.js</strong>,{" "}
            <strong className="text-foreground font-semibold">Next.js</strong>, and{" "}
            <strong className="text-foreground font-semibold">MongoDB</strong>. I deliver clean,
            scalable interfaces backed by reliable APIs — currently working as a Frontend Engineer
            at <strong className="text-foreground font-semibold">Stratforge Pvt. Ltd.</strong> in Chennai.
          </p>
          <p>
            My toolkit extends across{" "}
            <strong className="text-foreground font-semibold">TypeScript</strong>,{" "}
            <strong className="text-foreground font-semibold">Tailwind CSS</strong>,{" "}
            <strong className="text-foreground font-semibold">ShadCN UI</strong>, and{" "}
            <strong className="text-foreground font-semibold">RESTful APIs</strong>. I'm comfortable
            throughout the full stack — from composing responsive component systems to designing
            Express + MongoDB backends, auth flows, and cloud-connected APIs.
          </p>
          <p>
            Before entering tech I spent 6+ years in a{" "}
            <strong className="text-foreground font-semibold">Non-IT</strong> professional role,
            which sharpened my problem-solving instincts and appreciation for reliable, maintainable
            systems. I work well in{" "}
            <strong className="text-foreground font-semibold">Agile</strong> environments and have a
            track record of shipping features from design to production with{" "}
            <strong className="text-foreground font-semibold">CI/CD</strong> pipelines.
          </p>
        </div>

        {/* Stat chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          <StatChip label="2.7+ yrs MERN" />
          <StatChip label="6+ yrs Non-IT" />
          <StatChip label="3+ Awards" />
        </div>

        {/* Download CV */}
        <a
          href="https://drive.google.com/file/d/1RbkzozwdsiAFiN6AWIyfhKuINtBAFA53/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex h-11 items-center gap-2 rounded-xl
            bg-foreground px-5 text-sm font-medium text-background
            transition-all duration-200 hover:opacity-85
            focus-visible:outline-2 focus-visible:outline-foreground/50 focus-visible:outline-offset-2
          "
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download CV
        </a>
      </div>
    </section>
  );
};

export default BioCard;
