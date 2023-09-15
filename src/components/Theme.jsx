import React, { useEffect, useState } from "react";
import "./theme.css";
import { BsMoon, BsSun } from "react-icons/bs";

const Theme = () => {
  const [theme, setTheme] = useState("dark-theme");

  const toggleTheme = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme");
    } else {
      setTheme("dark-theme");
    }
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div>
      <div className={`style__switcher`}>
        <div
          className={`theme__toggler ${
            theme === "dark-theme" ? "dark" : "light"
          }`}
          onClick={toggleTheme}
        >
          {theme === "dark-theme" ? <BsMoon /> : <BsSun />}
        </div>
      </div>
    </div>
  );
};

export default Theme;
