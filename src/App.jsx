import React, { useState, useCallback } from "react";
import "./App.css";

// Global premium features
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import SplashScreen from "@/components/SplashScreen";

// Sections — single-page scroll order
import Hero from "@/components/sections/Hero";
import BioCard from "@/components/sections/BioCard";
import ExperienceList from "@/components/sections/ExperienceList";
import EducationList from "@/components/sections/EducationList";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import StackShowcase from "@/components/sections/StackShowcase";
import Trajectory from "@/components/sections/Trajectory";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/pages/footer/Footer";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
    document.body.style.overflow = "";
  }, []);

  // Prevent scroll during splash
  if (showSplash) {
    document.body.style.overflow = "hidden";
  }

  return (
    <SmoothScroll>
      <TooltipProvider>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
        <CustomCursor />
        <Toaster closeButton position="top-right" richColors />
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">
          <Hero />
          <BioCard />
          <ExperienceList />
          <EducationList />
          <FeaturedProjects />
          <StackShowcase />
          <Trajectory />
          <ContactSection />
        </main>
        <Footer />
      </TooltipProvider>
    </SmoothScroll>
  );
}

export default App;
