import React from "react";

const Footer = () => (
  <footer className="w-full py-8 border-t border-border/40">
    <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
      {/* Terminal echo */}
      <p className="text-[11px] font-mono text-muted-foreground/50">
        <span style={{ color: "var(--accent-orange)" }}>$</span>{" "}
        echo "thanks for scrolling · built with care in chennai"
      </p>

      {/* Copyright */}
      <p className="text-[11px] font-mono text-muted-foreground/40">
        © {new Date().getFullYear()} Suriya Kesavamurthy
      </p>
    </div>
  </footer>
);

export default Footer;
