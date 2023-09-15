import React from "react";
import Info from "../../components/Info";
import Stats from "../../components/Stats";
import { FaDownload } from "react-icons/fa";
import CV from "../../assets/suriya.pdf";
import "./about.css";
import Skills from "../../components/Skills";
import { resume } from "../../data";
import ResumeItem from "../../components/ResumeItem";
import { Fade, Zoom } from "react-awesome-reveal";
import { motion, useScroll } from "framer-motion";

const About = () => {
  return (
    <main
      className='section container'
      id='about'
    >
      <section className='about'>
        <h2 className='section__title'>
          About <span>Me</span>
        </h2>
        <div className='about__container grid'>
          <div className='about__info'>
            <h3 className='section__subtitle'>Personal Info</h3>
            <ul className='info__list grid'>
              <Info />
            </ul>
            <a
              href={CV}
              download=''
              className='button'
            >
              Download CV{" "}
              <span className='button__icon'>
                <FaDownload />
              </span>
            </a>
          </div>
          <Fade
            direction='up'
            duration={500}
            triggerOnce='true'
          >
            <Zoom
              duration={500}
              triggerOnce='true'
            >
              <div className='stats grid'>
                <Stats />
              </div>
            </Zoom>
          </Fade>
        </div>
      </section>
      <div className='separator'></div>
      <div
        className='skills section'
        id='skills'
      >
        <h2 className='section__title'>
          My <span>Skills</span>
        </h2>
        <div className='skills__container grid'>
          <Skills />
        </div>
      </div>
      <div className='separator'></div>
      <section
        className='resume section'
        id='journey'
      >
        <h2 className='section__title'>
          My <span>Journey</span>
        </h2>
        <div className='resume__container grid'>
          <div className='resume__data'>
            {resume.map((val) => {
              if (val.category === "experience") {
                return (
                  <ResumeItem
                    key={val.id}
                    {...val}
                  />
                );
              }
            })}
          </div>
          <div className='resume__data'>
            {resume.map((val) => {
              if (val.category === "education") {
                return (
                  <ResumeItem
                    key={val.id}
                    {...val}
                  />
                );
              }
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
