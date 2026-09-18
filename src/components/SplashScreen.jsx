import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import ParticleCanvas from "./ParticleCanvas";

/* ═══════════════════════════════════════
   SPLASH SCREEN — Terminal Boot Sequence
   + Production Grade GSAP Name Reveal
═══════════════════════════════════════ */

const BOOT_LINES = [
  { text: "$ initializing system...", delay: 0 },
  { text: "loading modules ████████░░ 80%", delay: 150 },
  { text: "loading modules ██████████ 100%", delay: 380 },
  { text: "✓ react.runtime loaded", delay: 550 },
  { text: "✓ node.engine connected", delay: 700 },
  { text: "✓ mongodb.cluster online", delay: 820 },
  { text: "✓ langchain.agents ready", delay: 940 },
  { text: "✓ fastapi.microservice up", delay: 1060 },
  { text: "", delay: 1150 },
  { text: "$ deploying portfolio...", delay: 1200 },
  { text: "✓ all systems operational", delay: 1450 },
];

const SplashScreen = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState([]);
  const [phase, setPhase] = useState("boot"); // boot → name → exit
  const containerRef = useRef(null);
  const nameRef = useRef(null);
  const titleLettersRef = useRef([]);
  const dividerRef = useRef(null);
  const subtitleRef = useRef(null);
  const overlayRef = useRef(null);

  const titleLetters = "SURIYA".split("");

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      onComplete();
      return;
    }

    const timers = BOOT_LINES.map((line) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line.text]);
      }, line.delay)
    );

    const nameTimer = setTimeout(() => {
      setPhase("name");
    }, 1650);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(nameTimer);
    };
  }, [onComplete]);

  // Production-grade GSAP animation choreography
  useEffect(() => {
    if (phase !== "name") return;

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => setPhase("exit"), 1900);
      },
    });

    // 1. Fade out boot lines smoothly
    tl.to(containerRef.current, {
      opacity: 0,
      y: -25,
      duration: 0.35,
      ease: "power2.in",
    });

    // 2. Make outer name reveal container active
    tl.set(nameRef.current, { opacity: 1 });

    // 3. Staggered character reveal for "SURIYA" with blur dissolve & scale motion
    tl.fromTo(
      titleLettersRef.current,
      {
        opacity: 0,
        y: 45,
        scale: 0.75,
        filter: "blur(14px)",
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.75,
        stagger: 0.05,
        ease: "expo.out",
      },
      "-=0.1"
    );

    // 4. Expand glowing accent line beneath SURIYA
    tl.fromTo(
      dividerRef.current,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.65,
        ease: "expo.out",
      },
      "-=0.3"
    );

    // 5. Reveal subheader profession text
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 16, filter: "blur(8px)", letterSpacing: "0.4em" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        letterSpacing: "0.22em",
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.4"
    );
  }, [phase]);

  // Curtain slide exit transition
  useEffect(() => {
    if (phase !== "exit") return;

    const tl = gsap.timeline({
      onComplete: () => onComplete(),
    });

    tl.to(overlayRef.current, {
      yPercent: -100,
      duration: 0.85,
      ease: "expo.inOut",
    });
  }, [phase, onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none"
      style={{ background: "hsl(var(--background))" }}
      aria-label="Loading"
      role="progressbar"
    >
      {/* Background Dot Grid Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(var(--foreground) / 0.15) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Boot sequence lines */}
      <div
        ref={containerRef}
        className="relative z-10 flex flex-col gap-1 px-6 max-w-lg w-full"
        style={{ display: phase === "name" || phase === "exit" ? "none" : undefined }}
      >
        {visibleLines.map((line, i) => (
          <div
            key={i}
            className="text-xs sm:text-sm font-mono leading-relaxed select-none"
            style={{
              color: line.startsWith("✓")
                ? "var(--accent-green, #22c55e)"
                : line.startsWith("$")
                ? "var(--accent-orange, #e87a20)"
                : "hsl(var(--muted-foreground))",
              animation: "fadeSlideIn 0.2s ease-out forwards",
            }}
          >
            {line || "\u00A0"}
          </div>
        ))}

        <span
          className="inline-block w-2 h-4 mt-1"
          style={{
            background: "var(--accent-orange, #e87a20)",
            animation: "blink 0.8s step-end infinite",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Name reveal with Ambient Particle Field & Smooth Staggered Typography */}
      <div
        ref={nameRef}
        className="absolute inset-0 flex flex-col items-center justify-center opacity-0"
        style={{ display: phase === "boot" ? "none" : undefined }}
      >
        {/* Interactive Ambient Glow Canvas */}
        <ParticleCanvas active={phase === "name" || phase === "exit"} />

        {/* Clean, Sharp Typography with Staggered Letter Animation */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
          {/* Title "SURIYA" */}
          <h1
            className="flex items-center justify-center text-6xl sm:text-8xl lg:text-9xl font-mono font-black tracking-tight leading-none mb-3"
            style={{ fontFamily: "'JetBrains Mono', 'Space Grotesk', monospace" }}
          >
            {titleLetters.map((char, index) => (
              <span
                key={index}
                ref={(el) => (titleLettersRef.current[index] = el)}
                className="inline-block"
                style={{
                  background: "linear-gradient(135deg, #ffffff 45%, #ff9e42 85%, #e87a20 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(232, 122, 32, 0.45))",
                  willChange: "transform, opacity, filter",
                }}
              >
                {char}
              </span>
            ))}
          </h1>

          {/* Animated Glowing Accent Line */}
          <div
            ref={dividerRef}
            className="w-32 sm:w-48 h-[2px] mb-4 rounded-full origin-center"
            style={{
              background: "linear-gradient(90deg, transparent, #e87a20, #22c55e, transparent)",
              boxShadow: "0 0 12px rgba(232, 122, 32, 0.6)",
              willChange: "transform, opacity",
            }}
          />

          {/* Subtitle Profession */}
          <p
            ref={subtitleRef}
            className="text-xs sm:text-sm font-mono font-bold uppercase text-emerald-400 flex items-center justify-center gap-2.5 flex-wrap"
            style={{
              filter: "drop-shadow(0 0 10px rgba(34, 197, 94, 0.4))",
              willChange: "transform, opacity, filter, letter-spacing",
            }}
          >
            <span>FULL STACK DEVELOPER</span>
            <span className="text-orange-400 font-extrabold">•</span>
            <span>FRONTEND ENGINEER</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
