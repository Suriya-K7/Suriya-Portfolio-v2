import React, { useRef, useLayoutEffect, useCallback, useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { skills } from "@/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ── Hook: watch dark mode ── */
function useDarkMode() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

/* ── Badge with dark-mode aware inline color ── */
const StackBadge = ({ skill, colors }) => {
  const isDark = useDarkMode();
  return (
    <span
      className="stack-badge inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold cursor-default select-none"
      style={{
        background: isDark ? colors.dark_bg : colors.bg,
        color: isDark ? colors.dark_text : colors.text,
        border: `1px solid ${isDark ? colors.dark_bg : colors.bg}`,
        opacity: 0, /* starts hidden, GSAP reveals on scroll */
      }}
    >
      {skill}
    </span>
  );
};

gsap.registerPlugin(ScrollTrigger);

/* ── Brand color map (bg + text) ── */
const BRAND_COLORS = {
  "React JS":        { bg: "#e8f4fd", text: "#0a7ea4", dark_bg: "#0a2d3d", dark_text: "#5bb8e0" },
  "JavaScript":      { bg: "#fefbdc", text: "#856600", dark_bg: "#2d2500", dark_text: "#f0c300" },
  "TypeScript":      { bg: "#e8f0fb", text: "#2d5fa3", dark_bg: "#0d1e3d", dark_text: "#6492d8" },
  "NextJs":          { bg: "#f0f0f0", text: "#000000", dark_bg: "#1a1a1a", dark_text: "#e0e0e0" },
  "NodeJs":          { bg: "#e8f5e9", text: "#2e7d32", dark_bg: "#0a2010", dark_text: "#66bb6a" },
  "ExpressJs":       { bg: "#f5f5f5", text: "#333333", dark_bg: "#1a1a1a", dark_text: "#aaaaaa" },
  "MongoDB":         { bg: "#e8f5e9", text: "#2e6b2e", dark_bg: "#0a2010", dark_text: "#57a557" },
  "MySql":           { bg: "#e8f0fb", text: "#1b4f8a", dark_bg: "#0d1e3d", dark_text: "#5b96e0" },
  "Redux & Toolkit": { bg: "#f3eaf9", text: "#6b2fa0", dark_bg: "#200f30", dark_text: "#b07ede" },
  "HTML & CSS":      { bg: "#fde8e4", text: "#a33000", dark_bg: "#3d0d00", dark_text: "#e05a30" },
  "TailWind":        { bg: "#e4f6f8", text: "#0d6e7e", dark_bg: "#052428", dark_text: "#4bbfd0" },
  "Shadcn":          { bg: "#f5f5f5", text: "#333333", dark_bg: "#1a1a1a", dark_text: "#cccccc" },
  "MUI":             { bg: "#e8f0fb", text: "#0a4da3", dark_bg: "#0d1a3d", dark_text: "#5b82e0" },
  "SASS":            { bg: "#fce8ef", text: "#a3365a", dark_bg: "#3d0015", dark_text: "#e07097" },
  "Git":             { bg: "#fde8e4", text: "#a33200", dark_bg: "#3d0a00", dark_text: "#e05f30" },
  "Tanstack":        { bg: "#fef3e8", text: "#a3540a", dark_bg: "#3d1800", dark_text: "#e09050" },
  "AWS":             { bg: "#fff6e8", text: "#a36200", dark_bg: "#3d2000", dark_text: "#e0a030" },
  "NestJs":          { bg: "#fce8ef", text: "#a32040", dark_bg: "#3d0010", dark_text: "#e06080" },
};

/* ── Random rotation between -8 and +8 deg ── */
const randRot = () => (Math.random() - 0.5) * 16;
const randOff = () => (Math.random() - 0.5) * 6; /* slight Y jitter */

const StackShowcase = () => {
  const containerRef = useRef(null);
  const entered = useRef(false);

  /* Scatter animation (entrance + reset) */
  const scatter = useCallback((delay = 0) => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const badges = containerRef.current?.querySelectorAll(".stack-badge");
    if (!badges?.length) return;

    badges.forEach((badge) => {
      const rot = randRot();
      const yOff = randOff();

      if (prefersReduced) {
        gsap.set(badge, { rotate: rot, y: yOff });
        return;
      }
      gsap.to(badge, {
        rotate: rot,
        y: yOff,
        duration: 0.6 + Math.random() * 0.4,
        ease: "elastic.out(1, 0.6)",
        delay: delay + Math.random() * 0.2,
      });
    });
  }, []);

  /* Entrance — GSAP stagger from invisible */
  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          if (entered.current) return;
          entered.current = true;

          if (prefersReduced) {
            gsap.set(".stack-badge", { opacity: 1 });
            scatter(0);
            return;
          }

          gsap.fromTo(
            ".stack-badge",
            { opacity: 0, scale: 0.6, rotate: () => randRot() * 2 },
            {
              opacity: 1,
              scale: 1,
              stagger: { amount: 0.6, from: "random" },
              duration: 0.55,
              ease: "back.out(1.6)",
              onComplete: () => scatter(0),
            }
          );
        },
      });
    });
    return () => ctx.revert();
  }, [scatter]);

  /* Reset handler */
  const handleReset = () => scatter(0);

  return (
    <section className="section-container pt-12 pb-20">
      {/* Header row */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="label-eyebrow mb-2">What I Know</p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Stack
          </h2>
        </div>
        <button
          onClick={handleReset}
          aria-label="Re-shuffle stack badges"
          className="
            flex h-9 w-9 items-center justify-center rounded-full
            border border-border bg-muted text-muted-foreground
            hover:bg-foreground hover:text-background hover:border-foreground
            transition-all duration-200
            focus-visible:outline-2 focus-visible:outline-foreground/40 focus-visible:outline-offset-2
          "
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* Scattered badge cloud */}
      <div
        ref={containerRef}
        className="relative flex flex-wrap gap-2.5"
        style={{ perspective: "600px" }}
        aria-label="Technology stack badges"
      >
        {skills.map((skill) => {
          const colors = BRAND_COLORS[skill.title] || {
            bg: "#f4f4f4", text: "#555555",
            dark_bg: "#1a1a1a", dark_text: "#aaaaaa"
          };

          return (
            <StackBadge key={skill.id} skill={skill.title} colors={colors} />
          );
        })}
      </div>
    </section>
  );
};

export default StackShowcase;
