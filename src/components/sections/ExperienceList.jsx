import React, { useState, useRef, useLayoutEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { resume } from "@/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Entry card ── */
const EntryCard = ({ title, desc, year }) => {
  // Parse title: strip <span> tags that hold company names
  const plainTitle = title.replace(/<span>.*?<\/span>/gi, "").trim();
  const spanMatch = title.match(/<span>(.*?)<\/span>/i);
  const company = spanMatch ? spanMatch[1].trim() : desc;
  const displayDesc = spanMatch ? desc : null;

  // Avatar initial letter
  const initial = plainTitle.charAt(0).toUpperCase();

  return (
    <div className="exp-entry flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
      {/* Avatar */}
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
          bg-muted text-sm font-semibold text-foreground/70"
        aria-hidden="true"
      >
        {initial}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground leading-tight">{plainTitle}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{company}</p>
        <p className="text-[11px] text-muted-foreground/60 mt-1">{year}</p>
        {displayDesc && (
          <p className="text-xs text-muted-foreground/70 mt-2 leading-relaxed">
            {displayDesc}
          </p>
        )}
      </div>
    </div>
  );
};

const ExperienceList = () => {
  const [expanded, setExpanded] = useState(false);
  const rootRef = useRef(null);

  const expItems = resume.filter((v) => v.category === "experience");
  const visible = expanded ? expItems : expItems.slice(0, 2);
  const hiddenCount = expItems.length - 2;

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-entry",
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.55, ease: "power3.out", stagger: 0.09,
          scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="section-container pt-14">
      <p className="label-eyebrow mb-4">My Timeline</p>
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-8">
        Experience
      </h2>

      <div className="flex flex-col gap-3">
        {visible.map((item) => (
          <EntryCard key={item.id} {...item} />
        ))}
      </div>

      {hiddenCount > 0 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="
            mt-4 flex items-center gap-2 rounded-xl border border-border px-4 py-2.5
            text-sm font-medium text-muted-foreground
            hover:bg-muted hover:text-foreground
            transition-all duration-200
            focus-visible:outline-2 focus-visible:outline-foreground/40 focus-visible:outline-offset-2
          "
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4" aria-hidden="true" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
              Show {hiddenCount} more
            </>
          )}
        </button>
      )}
    </section>
  );
};

export default ExperienceList;
