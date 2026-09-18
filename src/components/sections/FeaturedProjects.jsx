import React, { useRef, useLayoutEffect } from "react";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { portfolio } from "@/data";
import ProjectCard from "@/components/ProjectCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Helper to extract details ── */
const pick = (details, key) => details.find((d) => d.title === key);

/* ── Deployment summary stats ── */
const DeploySummary = () => (
  <div className="terminal-card mb-8">
    <p className="text-[10px] font-mono font-bold tracking-widest uppercase mb-3" style={{ color: "var(--accent-orange)" }}>
      {"// DEPLOYMENT SUMMARY"}
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 text-xs font-mono">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="text-emerald-500">✓</span>
        <span>Successful Deployments</span>
        <span className="ml-auto text-foreground font-semibold">: {portfolio.length}</span>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <span style={{ color: "var(--accent-orange)" }}>●</span>
        <span>Active Projects</span>
        <span className="ml-auto text-foreground font-semibold">: {portfolio.length}</span>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <span>⚙</span>
        <span>Primary Stack</span>
        <span className="ml-auto text-foreground font-semibold">: React · Node · MongoDB</span>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="text-emerald-500">✓</span>
        <span>Repository Health</span>
        <span className="ml-auto text-foreground font-semibold">: Healthy</span>
      </div>
    </div>
  </div>
);

/* ── Deployment row ── */
const DeployRow = ({ item, index }) => {
  const [open, setOpen] = React.useState(false);

  const techDetail = pick(item.details, "Tech Used : ");
  const previewDetail = pick(item.details, "Preview : ");
  const codeDetail = pick(item.details, "Code : ");
  const techList = techDetail?.desc?.split(", ").map((t) => t.trim()).slice(0, 3) ?? [];

  const depId = `DEP-2024-${String(index + 1).padStart(3, "0")}`;
  const commitHash = `commit ${Math.random().toString(36).substring(2, 8)}`;

  return (
    <>
      <div
        className="deploy-row-item group cursor-pointer"
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`View ${item.title} project details`}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
      >
        {/* Desktop: table row */}
        <div className="hidden md:grid md:grid-cols-[130px_1fr_110px_1fr_100px] gap-4 items-center py-4 px-4 border-b border-border/50 hover:bg-muted/30 transition-colors duration-200">
          {/* ID */}
          <div>
            <p className="text-xs font-mono font-semibold text-foreground">{depId}</p>
            <p className="text-[10px] font-mono text-muted-foreground/50">{commitHash}</p>
          </div>

          {/* Project name + stack */}
          <div>
            <p className="text-sm font-mono font-semibold text-foreground">{item.title}</p>
            <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
              RUNTIME  MERN Stack
            </p>
          </div>

          {/* Status */}
          <div>
            <span className="status-badge status-badge--success">
              <span className="status-badge__dot" />
              LIVE
            </span>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {techList.map((t, i) => (
              <span key={i} className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[10px] font-mono font-medium text-muted-foreground border border-border">
                {t}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-2 justify-end">
            {codeDetail && (
              <a href={codeDetail.desc} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors">
                <GitBranch className="h-3.5 w-3.5" />
              </a>
            )}
            {previewDetail && (
              <a href={previewDetail.desc} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} aria-label="Live" className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Mobile: card layout */}
        <div className="md:hidden terminal-card mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-semibold text-muted-foreground">{depId}</span>
            <span className="status-badge status-badge--success">
              <span className="status-badge__dot" />
              LIVE
            </span>
          </div>
          <p className="text-sm font-mono font-semibold text-foreground mb-1">{item.title}</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {techList.map((t, i) => (
              <span key={i} className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[10px] font-mono font-medium text-muted-foreground border border-border">
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {codeDetail && (
              <a href={codeDetail.desc} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-[10px] font-mono text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors">
                <GitBranch className="h-3 w-3" /> github
              </a>
            )}
            {previewDetail && (
              <a href={previewDetail.desc} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-[10px] font-mono text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors">
                <ArrowUpRight className="h-3 w-3" /> live
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Reuse existing ProjectCard dialog */}
      {open && (
        <ProjectCard {...item} index={index} _externalOpen={open} _onClose={() => setOpen(false)} />
      )}
    </>
  );
};

const FeaturedProjects = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".deploy-row-item",
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: rootRef.current, start: "top 83%", once: true },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="projects" className="section-container py-20 sm:py-28">
      {/* Section header */}
      <div className="section-header">
        <span><span className="section-number">§</span> 04 · DEPLOYMENTS</span>
        <span className="section-path">./deployments</span>
      </div>

      <h2 className="heading-mono text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-foreground mb-10 leading-[1.15]">
        Deployment records, not<br />marketing cards.
      </h2>

      <DeploySummary />

      {/* Table header (desktop only) */}
      <div className="hidden md:grid md:grid-cols-[130px_1fr_110px_1fr_100px] gap-4 px-4 py-3 border-b border-border text-[10px] font-mono font-semibold tracking-widest uppercase text-muted-foreground/50">
        <span>DEPLOYMENT ID</span>
        <span>DEPLOYMENT</span>
        <span>STATUS</span>
        <span>SERVICES</span>
        <span className="text-right">ARTIFACTS</span>
      </div>

      {/* Rows */}
      <div className="border-t border-border md:border-t-0">
        {portfolio.map((item, index) => (
          <DeployRow key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
