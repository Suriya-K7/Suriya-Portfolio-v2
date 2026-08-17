import React, { useEffect, useRef } from "react";
import { skills } from "@/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Skill categories ── */
const CATEGORIES = [
  {
    label: "Frontend",
    desc: "UI libraries, frameworks & styling",
    icon: "</>",
    color: "from-violet-500 to-indigo-500",
    chipClass: "bg-violet-500/10 border-violet-500/20 text-violet-400 hover:bg-violet-500/20",
    ids: [1, 2, 3, 4, 10, 11, 12, 13, 14],
  },
  {
    label: "Backend",
    desc: "Server, databases & APIs",
    icon: "⚙️",
    color: "from-emerald-500 to-teal-500",
    chipClass: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20",
    ids: [5, 6, 7, 8, 18],
  },
  {
    label: "Tools & More",
    desc: "State management, DevOps & workflow",
    icon: "🛠",
    color: "from-amber-500 to-orange-400",
    chipClass: "bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20",
    ids: [9, 15, 16, 17],
  },
];

/* ── Skill chip (tag style, no progress bar) ── */
const SkillChip = ({ title, chipClass }) => (
  <span
    className={`
      inline-flex items-center px-3.5 py-1.5 rounded-full text-[12px] font-semibold
      border transition-all duration-200 cursor-default
      ${chipClass}
    `}
  >
    {title}
  </span>
);

/* ── Category card ── */
const SkillCategory = ({ label, desc, icon, color, chipClass, ids }) => {
  const categorySkills = skills.filter((s) => ids.includes(s.id));

  return (
    <div className="skill-category rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 sm:p-8 hover:border-border/70 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className={`h-3 w-3 rounded-full bg-gradient-to-br ${color} shrink-0`} />
        <h3 className="text-base font-bold text-foreground">{label}</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-6 ml-6">{desc}</p>

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {categorySkills.map((skill) => (
          <SkillChip key={skill.id} title={skill.title} chipClass={chipClass} />
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
          stagger: 0.12,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 84%",
            once: true,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {CATEGORIES.map((cat) => (
        <SkillCategory key={cat.label} {...cat} />
      ))}
    </div>
  );
};

export default Skills;
