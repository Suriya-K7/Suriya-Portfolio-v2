import React from "react";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/pages/footer/Footer";

const ProjectsPage = () => (
  <>
    <div className="pt-24 sm:pt-28">
      <ProjectsGrid />
    </div>
    <ContactSection />
    <Footer />
  </>
);

export default ProjectsPage;
