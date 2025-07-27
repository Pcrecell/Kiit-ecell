import React from "react";
import ThemeHero from "./ThemeHeroSection";
import EsummitNavbar from "../Navbar/EsummitNavbar";
import Footer from "../footer/Footer";

function App() {
  return (
    <div className="w-full min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navbar */}
      <EsummitNavbar />

      {/* Hero Section */}
      <ThemeHero />

     
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
