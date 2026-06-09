import React, { useState } from "react";
import { links } from "@/data";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="fixed right-0 top-0 z-[1000] flex items-center lg:inset-y-0 lg:right-8">
      {/* Desktop nav - right side pill buttons */}
      <div
        className={`
          ${showMenu ? "left-0" : "-left-full"}
          fixed inset-y-0 w-full bg-card/95 backdrop-blur-md p-16 transition-all duration-300 z-50
          lg:relative lg:left-auto lg:w-auto lg:bg-transparent lg:p-0 lg:backdrop-blur-none
        `}
      >
        <ul className="flex flex-col gap-1 lg:gap-4">
          {links.map(({ name, icon, path }, index) => (
            <li key={index}>
              <a
                href={path}
                className="group relative flex items-center gap-6 rounded-full border-b border-border px-5 py-3.5 text-foreground transition-all duration-300 hover:text-primary
                  lg:w-12 lg:h-12 lg:items-center lg:justify-center lg:border-0 lg:bg-card lg:p-0 lg:shadow-sm lg:hover:bg-primary lg:hover:text-primary-foreground"
                onClick={() => setShowMenu(false)}
              >
                <span className="text-xl lg:mx-auto [&>svg]:w-5 [&>svg]:h-5">{icon}</span>
                <span className="text-base font-medium lg:pointer-events-none lg:absolute lg:right-0 lg:top-0 lg:h-full lg:leading-[48px] lg:rounded-l-full lg:bg-primary lg:px-6 lg:pr-6 lg:text-sm lg:text-primary-foreground lg:opacity-0 lg:invisible lg:-z-10 lg:transition-all lg:duration-300 lg:group-hover:visible lg:group-hover:opacity-100 lg:group-hover:right-[27px]">
                  {name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile hamburger */}
      <button
        className="fixed right-6 top-6 z-[60] flex h-10 w-10 items-center justify-center rounded-md bg-card shadow-sm lg:hidden"
        onClick={() => setShowMenu(!showMenu)}
        aria-label="Toggle navigation"
      >
        <span
          className={`relative block h-[1px] w-[22px] rounded bg-foreground transition-all duration-300 
            before:absolute before:left-0 before:h-[1px] before:w-full before:rounded before:bg-foreground before:transition-all before:duration-300 before:content-['']
            after:absolute after:left-0 after:h-[1px] after:w-full after:rounded after:bg-foreground after:transition-all after:duration-300 after:content-['']
            before:-top-2 after:top-2
            ${showMenu ? "bg-transparent before:top-0 before:rotate-45 after:top-0 after:-rotate-45" : ""}`}
        />
      </button>
    </nav>
  );
};

export default Navbar;
