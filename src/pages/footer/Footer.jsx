import React from "react";

const Footer = () => {
  let date = new Date();
  return (
    <footer className="border-t border-border bg-card py-6 text-center text-sm text-muted-foreground">
      <span>Copyright &copy; {date.getFullYear()} - Suriya-K7</span>
    </footer>
  );
};

export default Footer;
