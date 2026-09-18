import React, { useRef, useLayoutEffect } from "react";
import { skills } from "@/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Learning pipeline phases ── */
const PHASES = [
  {
    num: "01",
    title: "Core",
    items: [
      { name: "HTML & CSS", done: true },
      { name: "JavaScript", done: true },
      { name: "TypeScript", done: true },
    ],
  },
  {
    num: "02",
    title: "Frontend",
    items: [
      { name: "React JS", done: true },
      { name: "NextJs", done: true },
      { name: "Redux & Toolkit", done: true },
      { name: "TailWind", done: true },
      { name: "Shadcn", done: true },
      { name: "MUI", done: true },
      { name: "SASS", done: true },
    ],
  },
  {
    num: "03",
    title: "Backend",
    items: [
      { name: "NodeJs", done: true },
      { name: "ExpressJs", done: true },
      { name: "MongoDB", done: true },
      { name: "MySql", done: true },
      { name: "Python", done: true },
      { name: "FastAPI", done: true },
    ],
  },
  {
    num: "04",
    title: "AI & Cloud",
    items: [
      { name: "LangChain", done: true },
      { name: "AI Agents", done: true },
      { name: "Git", done: true },
      { name: "AWS", done: false },
      { name: "NestJs", done: false },
    ],
  },
];

/* ── Ecosystem tree ── */
const ECOSYSTEM = [
  {
    name: "React",
    color: "var(--accent-orange)",
    children: [
      { name: "Next.js", children: [] },
      { name: "Redux & Toolkit", children: [] },
      { name: "Tanstack Query", children: [] },
      { name: "Framer Motion", children: [] },
    ],
  },
  {
    name: "Node.js",
    color: "var(--accent-green)",
    children: [
      { name: "Express.js", children: [] },
      { name: "NestJs", children: [] },
      { name: "RESTful APIs", children: [] },
      { name: "JWT & Auth", children: [] },
    ],
  },
  {
    name: "Python",
    color: "#3b82f6",
    children: [
      { name: "FastAPI", children: [{ name: "Microservices", children: [] }] },
      { name: "LangChain", children: [{ name: "AI Agents", children: [] }] },
    ],
  },
  {
    name: "Databases",
    color: null,
    children: [
      { name: "MongoDB", children: [{ name: "Mongoose", children: [] }] },
      { name: "MySQL", children: [] },
    ],
  },
  {
    name: "UI Systems",
    color: null,
    children: [
      { name: "Tailwind CSS", children: [] },
      { name: "ShadCN UI", children: [] },
      { name: "Material UI", children: [] },
      { name: "SASS", children: [] },
    ],
  },
  {
    name: "DevOps",
    color: null,
    children: [
      { name: "Git & GitHub", children: [] },
      { name: "CI/CD", children: [] },
      { name: "AWS (learning)", children: [] },
    ],
  },
];

/* ── Render tree recursively ── */
const TreeNode = ({ node, depth = 0, isLast = false }) => {
  const prefix = depth === 0 ? "" : isLast ? "└── " : "├── ";
  const color = node.color || null;

  return (
    <div>
      <div
        className="tree-node-item text-[12px] sm:text-[13px] font-mono text-muted-foreground leading-relaxed"
        style={{ paddingLeft: `${depth * 1.5}rem` }}
      >
        <span className="text-border select-none">{prefix}</span>
        <span style={color ? { color } : undefined} className={color ? "font-semibold" : ""}>
          {color && "● "}
          {node.name}
        </span>
      </div>
      {node.children?.map((child, i) => (
        <TreeNode
          key={child.name}
          node={child}
          depth={depth + 1}
          isLast={i === node.children.length - 1}
        />
      ))}
    </div>
  );
};

const StackShowcase = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".phase-card",
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".phase-grid", start: "top 85%", once: true },
        }
      );
      gsap.fromTo(
        ".tree-node-item",
        { opacity: 0, x: -10 },
        {
          opacity: 1, x: 0, duration: 0.3, ease: "power2.out",
          stagger: 0.03,
          scrollTrigger: { trigger: ".ecosystem-tree", start: "top 85%", once: true },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="skills" className="section-container py-20 sm:py-28">
      {/* Section header */}
      <div className="section-header">
        <span><span className="section-number">§</span> 05 · ENGINEERING LAB</span>
        <span className="section-path">./lab/active</span>
      </div>

      <h2 className="heading-mono text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-foreground mb-4 leading-[1.15]">
        The lab never sleeps.
      </h2>
      <p className="text-sm font-mono text-muted-foreground mb-12 max-w-xl">
        Technologies I work with daily, organized by learning phase. Check marks indicate production-level proficiency.
      </p>

      {/* ── Pipeline phases ── */}
      <div className="phase-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {PHASES.map((phase) => (
          <div key={phase.num} className="phase-card terminal-card">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[9px] font-mono font-bold"
                style={{
                  background: phase.num === "04" ? "var(--accent-orange)" : "hsl(var(--muted))",
                  color: phase.num === "04" ? "white" : "hsl(var(--muted-foreground))",
                  border: phase.num === "04" ? "none" : "1px solid hsl(var(--border))",
                }}
              >
                {phase.num}
              </span>
              <span className="text-xs font-mono font-semibold text-foreground uppercase tracking-wider">
                {phase.title}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              {phase.items.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-xs font-mono">
                  {item.done ? (
                    <span className="text-emerald-500 text-[10px]">✓</span>
                  ) : (
                    <span style={{ color: "var(--accent-orange)" }} className="text-[10px]">●</span>
                  )}
                  <span className={item.done ? "text-foreground/80" : "text-muted-foreground"}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Ecosystem tree ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
        <div className="ecosystem-tree">
          <p className="text-[10px] font-mono font-bold tracking-widest uppercase text-muted-foreground mb-4">
            ECOSYSTEM MAP
          </p>
          <div className="terminal-card overflow-x-auto">
            {ECOSYSTEM.map((node, i) => (
              <TreeNode key={node.name} node={node} isLast={i === ECOSYSTEM.length - 1} />
            ))}
          </div>
        </div>

        {/* Status panel */}
        <div className="terminal-card h-fit">
          <p className="text-[10px] font-mono font-bold tracking-widest uppercase text-muted-foreground mb-3">
            STACK SUMMARY
          </p>
          <div className="flex flex-col gap-2 text-xs font-mono text-muted-foreground">
            <div className="flex justify-between">
              <span>Total Technologies</span>
              <span className="text-foreground font-semibold">{skills.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Production Ready</span>
              <span className="text-foreground font-semibold">{skills.filter(s => parseInt(s.percentage) >= 70).length}</span>
            </div>
            <div className="flex justify-between">
              <span>Currently Learning</span>
              <span className="text-foreground font-semibold">{skills.filter(s => parseInt(s.percentage) < 70).length}</span>
            </div>
            <div className="flex justify-between">
              <span>Primary Focus</span>
              <span className="text-foreground font-semibold">React · Node.js</span>
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <span className="text-[10px] text-muted-foreground/50">
                live-pulse: <span style={{ color: "var(--accent-orange)" }} className="font-semibold">react</span>
                <span className="blink-cursor" style={{ height: "0.85em", width: "0.45em" }} aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackShowcase;
