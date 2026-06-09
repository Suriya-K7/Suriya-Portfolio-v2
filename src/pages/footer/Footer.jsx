import React from "react";

const Footer = () => (
  <footer className="border-t border-border/60 bg-card py-8">
    <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-3">
      <span className="text-sm font-semibold text-foreground">
        Suriya.<span className="text-primary">dev</span>
      </span>
      <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
        © {new Date().getFullYear()} Udhayasoorian · All rights reserved
      </p>
      <p className="text-[11px] text-muted-foreground">
        Built with React · GSAP · ShadCN
      </p>
    </div>
  </footer>
);

export default Footer;
