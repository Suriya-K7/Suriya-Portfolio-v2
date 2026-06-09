import React from "react";
import Info from "@/components/Info";
import Stats from "@/components/Stats";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Skills from "@/components/Skills";
import { resume } from "@/data";
import ResumeItem from "@/components/ResumeItem";
import { Fade, Zoom } from "react-awesome-reveal";

const About = () => {
  return (
    <main className="py-20 px-6" id="about">
      <section>
        <h2 className="text-center text-4xl font-bold tracking-tight mb-16">
          About <span className="text-primary">Me</span>
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-5">Personal Info</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-8">
              <Info />
            </ul>
            <a
              href="https://drive.google.com/file/d/1RbkzozwdsiAFiN6AWIyfhKuINtBAFA53/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="group rounded-full px-8 cursor-pointer">
                Download CV
                <Download className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </Button>
            </a>
          </div>
          <Fade direction="up" duration={500} triggerOnce>
            <Zoom duration={500} triggerOnce>
              <div className="grid grid-cols-1 gap-4">
                <Stats />
              </div>
            </Zoom>
          </Fade>
        </div>
      </section>

      <div className="my-16 mx-auto max-w-[40%] border-t border-border" />

      <div className="py-16" id="skills">
        <h2 className="text-center text-4xl font-bold tracking-tight mb-16">
          My <span className="text-primary">Skills</span>
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          <Skills />
        </div>
      </div>

      <div className="my-16 mx-auto max-w-[40%] border-t border-border" />

      <section className="py-16" id="journey">
        <h2 className="text-center text-4xl font-bold tracking-tight mb-16">
          My <span className="text-primary">Journey</span>
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            {resume.map((val) => {
              if (val.category === "experience") {
                return <ResumeItem key={val.id} {...val} />;
              }
            })}
          </div>
          <div>
            {resume.map((val) => {
              if (val.category === "education") {
                return <ResumeItem key={val.id} {...val} />;
              }
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
