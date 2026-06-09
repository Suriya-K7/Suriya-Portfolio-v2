import React from "react";
import parse from "html-react-parser";
import { Fade } from "react-awesome-reveal";

const ResumeItem = ({ icon, year, title, desc }) => {
  return (
    <div className="relative pl-14 mb-10 last:mb-0 before:absolute before:inset-y-0 before:left-[19px] before:w-px before:border-l before:border-border">
      <Fade duration={500} cascade triggerOnce>
        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground [&>svg]:h-4 [&>svg]:w-4">
          {icon}
        </div>
        <div className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-semibold">
          {year}
        </div>
        <h3 className="mt-3 text-lg font-medium [&>span]:ml-2 [&>span]:text-sm [&>span]:font-normal [&>span]:text-muted-foreground">
          {parse(title)}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      </Fade>
    </div>
  );
};

export default ResumeItem;
