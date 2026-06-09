import React from "react";
import { stats } from "@/data";
import parse from "html-react-parser";
import { Card, CardContent } from "@/components/ui/card";

const Stats = () => {
  return (
    <>
      {stats.map(({ id, no, title }) => (
        <Card
          key={id}
          className="stat-card border-border/60 shadow-sm transition-all duration-300
            hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1
            hover:border-primary/30 cursor-default"
        >
          <CardContent className="p-5 sm:p-6 flex items-center gap-5">
            {/* Number */}
            <div className="shrink-0">
              <span className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
                {no}
              </span>
            </div>
            {/* Label */}
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground/80 leading-snug">
                {parse(title.replace("<br />", " "))}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default Stats;
