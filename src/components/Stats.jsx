import React from "react";
import { stats } from "@/data";
import parse from "html-react-parser";
import { Fade } from "react-awesome-reveal";
import { Card, CardContent } from "@/components/ui/card";

const Stats = () => {
  return (
    <>
      {stats.map(({ no, title }, index) => (
        <Card
          key={index}
          className="border-border shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
        >
          <CardContent className="p-6">
            <Fade cascade>
              <h3 className="text-3xl font-bold text-primary">{no}</h3>
              <p className="relative mt-2 pl-10 text-sm text-muted-foreground before:absolute before:left-0 before:top-1/2 before:h-px before:w-7 before:bg-muted-foreground">
                {parse(title)}
              </p>
            </Fade>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default Stats;
