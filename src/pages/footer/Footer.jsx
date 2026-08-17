import React from "react";

const Footer = () => (
  <footer className="w-full py-8 border-t border-border/40">
    <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
      {/* Wordmark */}
      <a href="/" className="text-sm font-semibold tracking-tight">
        <span className="text-foreground">Suriya</span>
        <span className="text-muted-foreground">.dev</span>
      </a>

      {/* Copyright */}
      <p className="text-[11px] text-muted-foreground">
        © {new Date().getFullYear()} Suriya Kesavamurthy · All rights reserved
      </p>
    </div>
  </footer>
);

export default Footer;
