import React, { useEffect, useRef } from "react";
import { skills } from "@/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Skill categories with color accents ── */
const CATEGORIES = [
  {
    label: "Frontend",
    color: "from-violet-500 to-indigo-500",
    pill: "bg-violet-500/10 border-violet-500/25 text-violet-600 dark:text-violet-400",
    ids: [1, 2, 3, 4, 10, 11, 12, 13, 14],
  },
  {
    label: "Backend",
    color: "from-emerald-500 to-teal-500",
    pill: "bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400",
    ids: [5, 6, 7, 8, 18],
  },
  {
    label: "Tools & More",
    color: "from-amber-500 to-orange-500",
    pill: "bg-amber-500/10 border-amber-500/25 text-amber-600 dark:text-amber-400",
    ids: [9, 15, 16, 17],
  },
];

/* ── Single skill pill ── */
const SkillPill = ({ title, percentage, pillClass }) => {
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { width: "0%" },
      {
        width: `${percentage}%`,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
      }
    );
  }, [percentage]);

  return (
    <div
      className={`
        skill-item group flex flex-col gap-2 rounded-xl border px-4 py-3
        bg-card/80 backdrop-blur-sm
        transition-all duration-300
        hover:-translate-y-0.5 hover:shadow-md
        ${pillClass.replace("text-", "border-").replace("bg-", "hover:bg-")}
      `}
    >
      {/* Name + percent row */}
      <div className="flex items-center justify-between gap-2">
        <span className={`text-[13px] font-semibold leading-none ${pillClass.split(" ").find(c => c.startsWith("text-"))}`}>
          {title}
        </span>
        <span className="text-[11px] font-bold tabular-nums text-muted-foreground">
          {percentage}%
        </span>
      </div>

      {/* Progress bar track */}
      <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full bg-current opacity-60"
          style={{ width: 0 }}
        />
      </div>
    </div>
  );
};

/* ── Category block ── */
const SkillCategory = ({ label, color, pill, ids }) => {
  const categorySkills = skills.filter((s) => ids.includes(s.id));

  return (
    <div className="skill-category space-y-4">
      {/* Category heading */}
      <div className="flex items-center gap-3">
        <div className={`h-2.5 w-2.5 rounded-full bg-gradient-to-br ${color} shrink-0`} />
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          {label}
        </h3>
        <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {categorySkills.map((skill) => (
          <SkillPill key={skill.id} {...skill} pillClass={pill} />
        ))}
      </div>
    </div>
  );
};

/* ═══ Main Skills component ═══ */
const Skills = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-category",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full space-y-10">
      {CATEGORIES.map((cat) => (
        <SkillCategory key={cat.label} {...cat} />
      ))}
    </div>
  );
};

export default Skills;
