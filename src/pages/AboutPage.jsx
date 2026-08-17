import React from "react";
import BioCard from "@/components/sections/BioCard";
import ExperienceList from "@/components/sections/ExperienceList";
import EducationList from "@/components/sections/EducationList";
import WhatIDoTags from "@/components/sections/WhatIDoTags";
import StackShowcase from "@/components/sections/StackShowcase";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/pages/footer/Footer";

const AboutPage = () => (
  <>
    <div className="pt-24 sm:pt-28">
      <BioCard />
      <ExperienceList />
      <EducationList />
      <WhatIDoTags />
      <StackShowcase />
    </div>
    <ContactSection />
    <Footer />
  </>
);

export default AboutPage;
