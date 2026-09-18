import React, { useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   PARTICLE CANVAS (Production Standard Ambient Glow Nebula)
   High-FPS canvas particle system rendering soft glowing embers, 
   radial light gradient, and fluid mouse cursor repulsion.
   ═══════════════════════════════════════════════════════════════ */

const ParticleCanvas = ({ active = true }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 140 });

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const parent = canvas.parentElement;
    const width = parent ? parent.clientWidth : window.innerWidth;
    const height = parent ? parent.clientHeight : window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);

    const colors = ["#ff9e42", "#e87a20", "#22c55e", "#ffffff", "#38bdf8"];
    const particleCount = width < 640 ? 45 : 80;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * Math.min(width, height) * 0.48;
      particles.push({
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        size: Math.random() * 2 + 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.12,
        alpha: Math.random() * 0.55 + 0.15,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    let step = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      step += 0.015;

      // Soft ambient radial spotlight behind text center
      const glowGradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        Math.min(width, height) * 0.42
      );
      glowGradient.addColorStop(0, "rgba(232, 122, 32, 0.08)");
      glowGradient.addColorStop(0.5, "rgba(34, 197, 94, 0.03)");
      glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, width, height);

      // Render floating embers
      const mouse = mouseRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx + Math.sin(step + p.phase) * 0.2;
        p.y += p.vy + Math.cos(step + p.phase) * 0.2;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Fluid cursor reaction
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const dist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(mdy, mdx);
          p.x += Math.cos(angle) * force * 4;
          p.y += Math.sin(angle) * force * 4;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = (Math.sin(step * 1.5 + p.phase) * 0.25 + 0.75) * p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 10 }}
    />
  );
};

export default ParticleCanvas;
