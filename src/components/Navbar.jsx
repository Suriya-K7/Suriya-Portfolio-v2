import React, { useState, useEffect } from "react";
import { links } from "@/data";
import { X, Menu } from "lucide-react";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = showMenu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showMenu]);

  return (
    <>
      {/* ── Desktop: right-side vertical pill nav ── */}
      <nav
        aria-label="Site navigation"
        className="fixed inset-y-0 right-8 z-[1000] hidden lg:flex items-center"
      >
        <ul className="flex flex-col gap-3">
          {links.map(({ id, name, icon, path }) => {
            const isActive = activeSection === path.replace("#", "");
            return (
              <li key={id}>
                <a
                  href={path}
                  aria-label={name}
                  className={`
                    group relative flex h-12 w-12 items-center justify-center rounded-full
                    border transition-all duration-300
                    shadow-sm hover:shadow-primary/30 hover:shadow-md
                    ${isActive
                      ? "bg-primary border-primary text-primary-foreground shadow-primary/40 shadow-md"
                      : "bg-card/80 border-border/60 text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground backdrop-blur-sm"
                    }
                  `}
                >
                  {/* Icon */}
                  <span className="[&>svg]:h-[18px] [&>svg]:w-[18px]">{icon}</span>

                  {/* Tooltip label – slides in from right */}
                  <span
                    className="
                      pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2
                      whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5
                      text-xs font-semibold text-background
                      opacity-0 scale-95 origin-right
                      transition-all duration-200
                      group-hover:opacity-100 group-hover:scale-100
                      shadow-lg
                    "
                  >
                    {name}
                    {/* Arrow */}
                    <span className="absolute right-[-5px] top-1/2 -translate-y-1/2 border-4 border-transparent border-l-foreground" />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Mobile: hamburger button ── */}
      <button
        className={`
          fixed right-5 top-5 z-[1001] flex h-11 w-11 items-center justify-center rounded-xl
          border border-border/60 transition-all duration-300 shadow-sm lg:hidden
          ${showMenu
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-card/80 backdrop-blur-md text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
          }
        `}
        onClick={() => setShowMenu(!showMenu)}
        aria-label="Toggle navigation menu"
        aria-expanded={showMenu}
      >
        {showMenu
          ? <X className="h-5 w-5" />
          : <Menu className="h-5 w-5" />
        }
      </button>

      {/* ── Mobile: full-screen overlay menu ── */}
      <div
        aria-hidden={!showMenu}
        className={`
          fixed inset-0 z-[1000] lg:hidden
          transition-all duration-500 ease-in-out
          ${showMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        {/* Blurred backdrop */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-xl"
          onClick={() => setShowMenu(false)}
        />

        {/* Menu panel – slides in from left */}
        <div
          className={`
            absolute inset-y-0 left-0 w-full max-w-xs
            bg-card/95 backdrop-blur-2xl border-r border-border/60
            flex flex-col justify-center px-8 py-16
            shadow-2xl transition-transform duration-500 ease-in-out
            ${showMenu ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* Logo / brand name */}
          <div className="mb-10">
            <span className="text-2xl font-extrabold tracking-tight text-foreground">
              Suriya.<span className="text-primary">dev</span>
            </span>
            <p className="mt-1 text-xs text-muted-foreground tracking-wider uppercase">
              Frontend Engineer
            </p>
          </div>

          {/* Nav links */}
          <ul className="flex flex-col gap-1">
            {links.map(({ id, name, icon, path }, i) => {
              const isActive = activeSection === path.replace("#", "");
              return (
                <li
                  key={id}
                  style={{ transitionDelay: showMenu ? `${i * 60}ms` : "0ms" }}
                  className={`
                    transition-all duration-300
                    ${showMenu ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"}
                  `}
                >
                  <a
                    href={path}
                    onClick={() => setShowMenu(false)}
                    className={`
                      group flex items-center gap-4 rounded-xl px-4 py-3.5
                      transition-all duration-200
                      ${isActive
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "text-foreground hover:bg-primary/10 hover:text-primary"
                      }
                    `}
                  >
                    <span className={`
                      flex h-9 w-9 items-center justify-center rounded-lg
                      [&>svg]:h-[18px] [&>svg]:w-[18px]
                      transition-colors duration-200
                      ${isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                      }
                    `}>
                      {icon}
                    </span>
                    <span className="text-sm font-semibold tracking-wide">{name}</span>

                    {isActive && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-primary-foreground/80 animate-pulse" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Footer */}
          <div className="mt-10 pt-8 border-t border-border/60">
            <p className="text-xs text-muted-foreground text-center">
              © {new Date().getFullYear()} Udhayasoorian · All rights reserved
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
