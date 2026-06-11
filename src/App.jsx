import React from "react";
import "./App.css";
import Navbar from "@/components/Navbar";
import Home from "@/pages/home/Home";
import About from "@/pages/about/About";
import Portfolio from "@/pages/portfolio/Portfolio";
import Contact from "@/pages/contact/Contact";
import Theme from "@/components/Theme";
import Footer from "@/pages/footer/Footer";

// Global premium features
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <SmoothScroll>
      <TooltipProvider>
        <CustomCursor />
        <Toaster closeButton position="top-right" richColors />
        <Navbar />
        <Theme />
        <main id="main-content">
          <Home />
          <About />
          <Portfolio />
          <Contact />
        </main>
        <Footer />
      </TooltipProvider>
    </SmoothScroll>
  );
}

export default App;
