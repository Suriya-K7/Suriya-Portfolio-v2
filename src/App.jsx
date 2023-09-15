import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Portfolio from "./pages/portfolio/Portfolio";
import Contact from "./pages/contact/Contact";
import Theme from "./components/Theme";
import Footer from "./pages/footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Theme />
      <Home />
      <About />
      <Portfolio />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
