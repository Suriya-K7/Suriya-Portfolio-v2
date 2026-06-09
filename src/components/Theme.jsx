import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const Theme = () => {
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

  return (
    <button
      onClick={toggleTheme}
      className="fixed left-0 top-[10%] z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-r-md border border-l-0 border-border bg-card text-foreground shadow-md transition-all duration-300 hover:w-12 hover:bg-primary hover:text-primary-foreground"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </button>
  );
};

export default Theme;
