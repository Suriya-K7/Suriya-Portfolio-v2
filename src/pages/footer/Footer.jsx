import React from "react";
import "./footer.css";

const Footer = () => {
  let date = new Date();
  return (
    <footer className='Footer'>
      <span>Copyright &copy; {date.getFullYear()} - Suriya-K7</span>
    </footer>
  );
};

export default Footer;
