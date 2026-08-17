import React from "react";
import Hero from "@/components/sections/Hero";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/pages/footer/Footer";

const HomePage = () => (
  <>
    <Hero />
    <FeaturedProjects />
    <ContactSection />
    <Footer />
  </>
);

export default HomePage;
