import React, { useRef, useLayoutEffect } from "react";
import { resume } from "@/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Entry card ── */
const EduCard = ({ title, desc, year }) => {
  const plainTitle = title.replace(/<span>.*?<\/span>/gi, "").trim();
  const spanMatch = title.match(/<span>(.*?)<\/span>/i);
  const institution = spanMatch ? spanMatch[1].trim() : "";
  const initial = plainTitle.charAt(0).toUpperCase();

  return (
    <div className="edu-entry flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
      {/* Circular avatar */}
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full
          bg-muted text-sm font-semibold text-foreground/70"
        aria-hidden="true"
      >
        {initial}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground leading-tight">{plainTitle}</p>
        {institution && (
          <p className="text-xs text-muted-foreground mt-0.5">{institution}</p>
        )}
        <p className="text-[11px] text-muted-foreground/60 mt-1">{year}</p>
        {desc && (
          <p className="text-xs text-muted-foreground/70 mt-2 leading-relaxed">{desc}</p>
        )}
      </div>
    </div>
  );
};

const EducationList = () => {
  const rootRef = useRef(null);

  const eduItems = resume.filter((v) => v.category === "education");

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".edu-entry",
        { opacity: 0, x: 20 },
        {
          opacity: 1, x: 0, duration: 0.55, ease: "power3.out", stagger: 0.09,
          scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="section-container pt-12">
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-8">
        Education
      </h2>

      <div className="flex flex-col gap-3">
        {eduItems.map((item) => (
          <EduCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default EducationList;
