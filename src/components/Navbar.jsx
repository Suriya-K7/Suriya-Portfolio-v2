import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

/* ── Nav links ── */
const NAV_LINKS = [
  { id: "home",     label: "Home",     to: "/" },
  { id: "projects", label: "Projects", to: "/projects" },
  { id: "about",    label: "About",    to: "/about" },
];

/* ── Theme hook (extracted from old Theme.jsx) ── */
function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    if (!document.startViewTransition) {
      setTheme(next);
      return;
    }
    document.startViewTransition(() => setTheme(next));
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, toggleTheme };
}

/* ══════════════════════════════════════
   FLOATING PILL NAVBAR
══════════════════════════════════════ */
const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <nav
      aria-label="Primary"
      className="fixed left-1/2 top-5 z-[1000] -translate-x-1/2"
    >
      <div
        className="flex items-center gap-1 rounded-full p-1.5 shadow-sm"
        style={{
          background: "hsl(var(--background) / 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid var(--pill-border)",
        }}
      >
        {/* ── Nav links ── */}
        <ul className="relative flex items-center gap-0.5" role="list">
          {NAV_LINKS.map(({ id, label, to }) => {
            const isActive =
              to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(to);

            return (
              <li key={id} className="relative">
                <NavLink
                  to={to}
                  aria-current={isActive ? "page" : undefined}
                  className={`
                    relative inline-flex cursor-pointer items-center justify-center
                    rounded-full px-4 py-1.5 text-sm font-medium
                    transition-colors duration-200
                    focus-visible:outline-2 focus-visible:outline-foreground/40 focus-visible:outline-offset-2
                    ${isActive
                      ? "text-foreground"
                      : "text-foreground/55 hover:text-foreground"
                    }
                  `}
                >
                  {/* Active pill highlight */}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full nav-pill-active"
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* ── Theme toggle button ── */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="
            relative inline-flex h-8 w-8 cursor-pointer items-center justify-center
            rounded-full transition-colors duration-200
            hover:bg-foreground/8
            focus-visible:outline-2 focus-visible:outline-foreground/40 focus-visible:outline-offset-2
          "
          style={{
            background: "hsl(var(--background))",
            boxShadow: "0 0 0 1px var(--pill-border)",
          }}
        >
          <span aria-hidden="true" className="relative h-4 w-4">
            <Sun
              className={`
                absolute inset-0 h-4 w-4 text-foreground
                transition-all duration-300
                ${theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}
              `}
            />
            <Moon
              className={`
                absolute inset-0 h-4 w-4 text-foreground
                transition-all duration-300
                ${theme === "light" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"}
              `}
            />
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
