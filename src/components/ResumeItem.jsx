import React from "react";
import parse from "html-react-parser";

/**
 * ResumeItem — Production-grade timeline entry.
 *
 * Structure:
 *   [icon dot] ── vertical line ──
 *       [year badge]
 *       [title]
 *       [description]
 *
 * Animation: controlled externally by GSAP targeting `.journey-item`
 */
const ResumeItem = ({ icon, year, title, desc }) => {
  return (
    <div className="journey-item group relative flex gap-5 pb-10 last:pb-0">

      {/* ── Left: icon + vertical timeline line ── */}
      <div className="relative flex flex-col items-center shrink-0">
        {/* Icon circle */}
        <div
          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full
            bg-primary text-primary-foreground shadow-sm shadow-primary/30
            transition-all duration-300
            group-hover:scale-110 group-hover:shadow-md group-hover:shadow-primary/40
            [&>svg]:h-[18px] [&>svg]:w-[18px]"
        >
          {icon}
        </div>

        {/* Vertical line — extends from icon down to bottom of item */}
        <div className="mt-2 w-px flex-1 bg-gradient-to-b from-border to-transparent last:hidden" />
      </div>

      {/* ── Right: content ── */}
      <div className="flex-1 min-w-0 pt-1 pb-2">
        {/* Year badge */}
        <span
          className="inline-flex items-center rounded-full bg-primary/8 border border-primary/20
            px-3 py-0.5 text-[11px] font-semibold text-primary tracking-wide mb-3"
        >
          {year}
        </span>

        {/* Title */}
        <h3
          className="text-[15px] font-semibold text-foreground leading-snug mb-1
            [&>span]:ml-2 [&>span]:text-[13px] [&>span]:font-normal [&>span]:text-muted-foreground"
        >
          {parse(title)}
        </h3>

        {/* Description */}
        {desc && (
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            {desc}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResumeItem;
