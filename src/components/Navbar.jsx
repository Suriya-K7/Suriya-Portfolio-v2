import React, { useState } from "react";
import { links } from "../data";
import "./navbar.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className='nav'>
      <div className={`${showMenu ? "nav__menu show-menu" : "nav__menu"}`}>
        <ul className='nav__list'>
          {links.map(({ name, icon, path }, index) => {
            return (
              <li
                className='nav__item'
                key={index}
              >
                <a
                  href={path}
                  className='nav__link active-nav'
                  onClick={() => setShowMenu(!showMenu)}
                >
                  {icon}
                  <h3 className='nav__name'>{name}</h3>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className='nav__toggle'
        onClick={() => setShowMenu(!showMenu)}
      >
        <span className={`${showMenu ? "toggle" : ""}`}></span>
      </div>
    </nav>
  );
};

export default Navbar;
