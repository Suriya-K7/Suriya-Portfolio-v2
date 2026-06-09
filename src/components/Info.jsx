import React from "react";
import { personalInfo } from "@/data";

const Info = () => {
  return (
    <>
      {personalInfo.map(({ title, description }, index) => (
        <li key={index} className="flex gap-1 text-sm">
          <span className="text-muted-foreground">{title}</span>
          <span className="font-semibold">{description}</span>
        </li>
      ))}
    </>
  );
};

export default Info;
