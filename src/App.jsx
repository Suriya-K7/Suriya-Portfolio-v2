import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HomePage from "@/pages/HomePage";
import ProjectsPage from "@/pages/ProjectsPage";
import AboutPage from "@/pages/AboutPage";

// Global premium features
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <TooltipProvider>
          <CustomCursor />
          <Toaster closeButton position="top-right" richColors />
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
        </TooltipProvider>
      </SmoothScroll>
    </BrowserRouter>
  );
}

export default App;
