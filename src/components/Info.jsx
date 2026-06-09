import React from "react";
import { personalInfo } from "@/data";

const Info = () => {
  return (
    <>
      {personalInfo.map(({ id, title, description }) => (
        <li
          key={id}
          className="info-row flex items-center px-4 py-3 gap-3 min-w-0 hover:bg-muted/40 transition-colors duration-150"
        >
          {/* Label */}
          <span className="shrink-0 w-[118px] text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">
            {title.replace(" : ", "")}
          </span>

          {/* Dot */}
          <span className="shrink-0 h-1 w-1 rounded-full bg-primary/50" />

          {/* Value */}
          <span
            className="text-sm font-medium text-foreground truncate"
            title={String(description)}
          >
            {description}
          </span>
        </li>
      ))}
    </>
  );
};

export default Info;
