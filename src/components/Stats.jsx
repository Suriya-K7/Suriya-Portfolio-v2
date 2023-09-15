import React from "react";
import { stats } from "../data";
import parse from "html-react-parser";
import { Fade } from "react-awesome-reveal";

const Stats = () => {
  return (
    <>
      {stats.map(({ no, title }, index) => {
        return (
          <div
            className='stats__box'
            key={index}
          >
            <Fade cascade>
              <h3 className='stats__no'>{no}</h3>
              <p className='stats__title'>{parse(title)}</p>
            </Fade>
          </div>
        );
      })}
    </>
  );
};

export default Stats;
