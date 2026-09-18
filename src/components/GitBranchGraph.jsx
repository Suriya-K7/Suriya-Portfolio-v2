import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";

/* ═══════════════════════════════════════
   GIT BRANCH GRAPH — Animated SVG
   Draws a vertical git timeline with
   feature branches for the hero section.
═══════════════════════════════════════ */

const ORANGE = "#e87a20";
const GREEN = "#22c55e";
const GRAY = "#555a64";
const LIGHT_GRAY = "#888e9a";

const GitBranchGraph = () => {
  const svgRef = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  const animate = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paths = svg.querySelectorAll(".git-path");
    const dots = svg.querySelectorAll(".git-dot");
    const labels = svg.querySelectorAll(".git-label");

    if (prefersReduced) {
      paths.forEach((p) => { p.style.strokeDashoffset = "0"; p.style.opacity = "1"; });
      dots.forEach((d) => { d.style.opacity = "1"; d.style.transform = "scale(1)"; });
      labels.forEach((l) => { l.style.opacity = "1"; });
      return;
    }

    // Reset
    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
      p.style.opacity = "1";
    });
    dots.forEach((d) => { d.style.opacity = "0"; d.style.transform = "scale(0)"; d.style.transformOrigin = "center"; });
    labels.forEach((l) => { l.style.opacity = "0"; });

    const tl = gsap.timeline();

    // Draw main branch
    tl.to(svg.querySelector(".main-branch"), {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: "power2.inOut",
    });

    // Animate dots along main branch
    dots.forEach((dot, i) => {
      if (dot.classList.contains("main-dot")) {
        tl.to(dot, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, 0.2 + i * 0.15);
      }
    });

    // Draw feature branches
    tl.to(svg.querySelector(".feature-1"), {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: "power2.out",
    }, 0.5);

    tl.to(svg.querySelector(".feature-2"), {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: "power2.out",
    }, 0.9);

    // Feature branch dots
    dots.forEach((dot) => {
      if (dot.classList.contains("feature-dot")) {
        tl.to(dot, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, "-=0.4");
      }
    });

    // Labels
    labels.forEach((label, i) => {
      tl.to(label, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0.6 + i * 0.2);
    });

    setHasPlayed(true);
  }, []);

  useEffect(() => {
    // Small delay to let the component mount fully
    const timer = setTimeout(animate, 600);
    return () => clearTimeout(timer);
  }, [animate]);

  const handleReplay = () => {
    animate();
  };

  return (
    <div className="relative flex flex-col items-center">
      <svg
        ref={svgRef}
        viewBox="0 0 200 420"
        className="w-full max-w-[180px] md:max-w-[200px] h-auto"
        aria-hidden="true"
      >
        {/* HEAD label */}
        <text x="105" y="18" className="git-label" fill={ORANGE} fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="0.08em">
          HEAD
        </text>

        {/* Main branch line */}
        <path
          className="git-path main-branch"
          d="M 105 28 L 105 395"
          stroke={GRAY}
          strokeWidth="2"
          fill="none"
        />

        {/* Feature branch 1: feature/react (diverges right) */}
        <path
          className="git-path feature-1"
          d="M 105 100 C 105 120, 155 130, 155 160 L 155 200 C 155 230, 105 240, 105 260"
          stroke={ORANGE}
          strokeWidth="2"
          fill="none"
        />

        {/* Feature branch 2: feature/api (diverges left slightly) */}
        <path
          className="git-path feature-2"
          d="M 105 280 C 105 295, 60 305, 60 325 L 60 345 C 60 365, 105 370, 105 380"
          stroke={GREEN}
          strokeWidth="2"
          fill="none"
        />

        {/* Main branch dots */}
        <circle className="git-dot main-dot" cx="105" cy="28" r="5" fill={GRAY} stroke="#0b0d10" strokeWidth="2" />
        <circle className="git-dot main-dot" cx="105" cy="100" r="4" fill={GRAY} stroke="#0b0d10" strokeWidth="2" />
        <circle className="git-dot main-dot" cx="105" cy="260" r="4" fill={GRAY} stroke="#0b0d10" strokeWidth="2" />
        <circle className="git-dot main-dot" cx="105" cy="280" r="4" fill={GRAY} stroke="#0b0d10" strokeWidth="2" />
        <circle className="git-dot main-dot" cx="105" cy="380" r="4" fill={GRAY} stroke="#0b0d10" strokeWidth="2" />
        <circle className="git-dot main-dot" cx="105" cy="395" r="5" fill={GRAY} stroke="#0b0d10" strokeWidth="2" />

        {/* Feature branch 1 dots */}
        <circle className="git-dot feature-dot" cx="155" cy="160" r="4.5" fill={ORANGE} stroke="#0b0d10" strokeWidth="2" />
        <circle className="git-dot feature-dot" cx="155" cy="200" r="4.5" fill={ORANGE} stroke="#0b0d10" strokeWidth="2" />

        {/* Feature branch 2 dots */}
        <circle className="git-dot feature-dot" cx="60" cy="325" r="4.5" fill={GREEN} stroke="#0b0d10" strokeWidth="2" />
        <circle className="git-dot feature-dot" cx="60" cy="345" r="4.5" fill={GREEN} stroke="#0b0d10" strokeWidth="2" />

        {/* Branch labels */}
        <text x="110" y="173" className="git-label" fill={ORANGE} fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="500" opacity="0.8">
          feature/react
        </text>
        <text x="67" y="318" className="git-label" fill={GREEN} fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="500" opacity="0.8">
          feature/api
        </text>
        <text x="110" y="400" className="git-label" fill={LIGHT_GRAY} fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="500">
          main
        </text>
      </svg>

      {/* Hover to replay */}
      <button
        onClick={handleReplay}
        onMouseEnter={handleReplay}
        className="mt-3 flex items-center gap-2 text-[10px] font-mono font-medium tracking-widest uppercase text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-300"
        aria-label="Replay git branch animation"
      >
        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
        HOVER TO REPLAY
      </button>
    </div>
  );
};

export default GitBranchGraph;
