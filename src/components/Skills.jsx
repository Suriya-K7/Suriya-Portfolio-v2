import React from "react";
import { skills } from "../data";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Fade, Zoom } from "react-awesome-reveal";

const Skills = () => {
  return (
    <>
      {skills.map(({ title, percentage }, index) => {
        return (
          <Fade
            duration={500}
            direction='up'
            key={index}
          >
            <Zoom>
              <div
                className='progress__bar'
                key={index}
              >
                <Fade
                  direction='500'
                  cascade
                >
                  <div className='progress__circle'>
                    <CircularProgressbar
                      strokeWidth={6}
                      text={`${percentage}%`}
                      value={percentage}
                      className='CircularProgressbar-path'
                    />
                  </div>
                  <h3 className='skills__title'>{title}</h3>
                </Fade>
              </div>
            </Zoom>
          </Fade>
        );
      })}
    </>
  );
};

export default Skills;
