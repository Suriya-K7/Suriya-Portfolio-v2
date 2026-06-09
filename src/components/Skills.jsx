import React from "react";
import { skills } from "@/data";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Fade, Zoom } from "react-awesome-reveal";

const Skills = () => {
  return (
    <>
      {skills.map(({ title, percentage }, index) => (
        <Fade duration={500} direction="up" key={index}>
          <Zoom>
            <div className="flex flex-col items-center gap-4">
              <Fade direction="500" cascade>
                <div className="h-28 w-28 overflow-hidden rounded-full transition-all duration-300 hover:drop-shadow-[0_0_8px_hsl(var(--primary))]">
                  <CircularProgressbar
                    strokeWidth={6}
                    text={`${percentage}%`}
                    value={percentage}
                    styles={{
                      path: { stroke: "hsl(var(--primary))", transition: "stroke-dashoffset 0.5s ease" },
                      trail: { stroke: "hsl(var(--muted))" },
                      text: { fill: "hsl(var(--foreground))", fontSize: "18px", fontFamily: "inherit" },
                    }}
                  />
                </div>
                <h3 className="text-center text-sm font-medium">{title}</h3>
              </Fade>
            </div>
          </Zoom>
        </Fade>
      ))}
    </>
  );
};

export default Skills;
