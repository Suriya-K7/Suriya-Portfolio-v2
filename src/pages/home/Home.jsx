import React from "react";
// import Profile from "../../assets/home.png";
import Profile from "../../assets/Pic.png";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import "./home.css";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Fade } from "react-awesome-reveal";
import { motion, useScroll } from "framer-motion";

const Home = () => {
  const { scrollYProgress } = useScroll();
  const [text] = useTypewriter({
    words: ["Full Stack Developer", "Professional Coder", "UI Designer"],
    loop: true,
    typeSpeed: 100,
    deleteSpeed: 10,
    delaySpeed: 2000,
  });
  return (
    <section className="home section grid" id="home">
      <motion.div className="progressBar" style={{ scaleX: scrollYProgress }} />
      <Fade className="zIndex">
        <img src={Profile} alt="" className="home__img" loading="eager" />
      </Fade>
      <div className="home__content">
        <div className="home__data">
          <h1 className="home__title">
            <span>I'm Udhayasoorian</span>
            <br />
            <p className="type">
              {text}
              <Cursor
                cursorBlinking="false"
                cursorStyle="|"
                cursorColor="var(--first-color)"
              />
            </p>
          </h1>
          <p className="home__description">
            MERN Stack Developer with 2.5 years of hands-on experience in
            designing and developing scalable, high- performance web
            applications. Proficient in React.js, Node.js, Next.js, and MongoDB,
            with strong expertise in TypeScript, Tailwind CSS, and ShadCN UI.
            Adept at creating clean, responsive user interfaces and optimizing
            application performance. Skilled in building RESTful APIs,
            implementing CI/CD pipelines, and collaborating in Agile,
            cross-functional team environments. Committed to writing
            maintainable code and delivering efficient software solutions.
          </p>
          <a href="#about" className="button">
            More About Me{" "}
            <span className="button__icon">
              <FaArrowRight />
            </span>
          </a>
        </div>
      </div>
      <div className="color__block"></div>
    </section>
  );
};

export default Home;
