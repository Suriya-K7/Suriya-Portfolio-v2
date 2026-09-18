import React, { useState, useEffect, useCallback } from "react";
import { Sun, Moon } from "lucide-react";

/* ── Inline SVG icons ── */
const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

/* ── Nav sections (anchor scroll) ── */
const NAV_LINKS = [
  { id: "readme",     label: "README",       href: "#readme" },
  { id: "experience", label: "EXPERIENCE",   href: "#experience" },
  { id: "projects",   label: "DEPLOYMENTS",  href: "#projects" },
  { id: "skills",     label: "LAB",          href: "#skills" },
  { id: "trajectory", label: "TRAJECTORY",   href: "#trajectory" },
  { id: "contact",    label: "CONNECT",      href: "#contact" },
];

/* ── Theme hook ── */
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

/* ── Active section tracker ── */
function useActiveSection() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    // Observe all section anchors
    const ids = NAV_LINKS.map((l) => l.id);
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

/* ══════════════════════════════════════
   TERMINAL-STYLE NAVBAR
══════════════════════════════════════ */
const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const activeSection = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = useCallback((e, href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <nav aria-label="Primary" className="fixed top-0 left-0 right-0 z-[1000]">
      <div
        className="mx-auto flex items-center justify-between px-5 sm:px-8 lg:px-10 py-3"
        style={{
          background: "hsl(var(--background) / 0.88)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid var(--terminal-border)",
        }}
      >
        {/* ── Logo: terminal prompt ── */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 text-sm font-mono font-semibold tracking-tight text-foreground shrink-0"
          aria-label="Scroll to top"
        >
          <span
            className="h-2 w-2 rounded-full shrink-0"
            style={{ background: "var(--accent-orange)" }}
            aria-hidden="true"
          />
          <span className="text-foreground">suriya</span>
          <span className="text-muted-foreground font-normal">@dev:~$</span>
        </a>

        {/* ── Desktop nav links ── */}
        <ul className="hidden lg:flex items-center gap-0.5" role="list">
          {NAV_LINKS.map(({ id, label, href }) => {
            const isActive = activeSection === id;
            return (
              <li key={id}>
                <a
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  aria-current={isActive ? "true" : undefined}
                  className={`
                    relative inline-flex items-center justify-center
                    rounded-md px-3 py-1.5 text-[11px] font-mono font-semibold
                    tracking-widest uppercase
                    transition-colors duration-200
                    focus-visible:outline-2 focus-visible:outline-foreground/40 focus-visible:outline-offset-2
                    ${isActive
                      ? "text-foreground bg-[var(--pill-bg)]"
                      : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* ── Right side: social + resume + theme ── */}
        <div className="flex items-center gap-2">
          {/* Social icons (desktop only) */}
          <div className="hidden sm:flex items-center gap-1.5">
            <a
              href="https://github.com/suriya-k7"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/suriya-kesavamurthy-50616825a"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </div>

          {/* Resume link */}
          <a
            href="https://drive.google.com/file/d/1RbkzozwdsiAFiN6AWIyfhKuINtBAFA53/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-[11px] font-mono font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            </svg>
            resume.pdf
          </a>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <span aria-hidden="true" className="relative h-4 w-4">
              <Sun
                className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${
                  theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                }`}
              />
              <Moon
                className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${
                  theme === "light" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
                }`}
              />
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile slide-down menu ── */}
      {menuOpen && (
        <div
          className="lg:hidden border-b border-border px-5 pb-4 pt-2"
          style={{
            background: "hsl(var(--background) / 0.95)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
        >
          <ul className="flex flex-col gap-1" role="list">
            {NAV_LINKS.map(({ id, label, href }) => {
              const isActive = activeSection === id;
              return (
                <li key={id}>
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className={`
                      block rounded-md px-3 py-2 text-[11px] font-mono font-semibold
                      tracking-widest uppercase transition-colors duration-200
                      ${isActive
                        ? "text-foreground bg-[var(--pill-bg)]"
                        : "text-muted-foreground hover:text-foreground"
                      }
                    `}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
          {/* Mobile social row */}
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
            <a href="https://github.com/suriya-k7" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors">
              <GithubIcon className="h-4 w-4" />
            </a>
            <a href="https://linkedin.com/in/suriya-kesavamurthy-50616825a" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href="https://drive.google.com/file/d/1RbkzozwdsiAFiN6AWIyfhKuINtBAFA53/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              resume.pdf
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
