import React, {useEffect} from "react";
import HeroSection from "./components/hero-section/HeroSection";
import StatisticsSection from "./components/StatisticsCard/StatisticsSection";
import TrustedByCompaniesApp from "./components/trustedbycompanies/TrustedByCompaniesApp";
import Highlights from "./components/highlights/Highlights";
import PastSpeakers from "./components/PastSpeakers/PastSpeakers";
import InitiativeReveal from "./components/initiatives/InitiativeReveal";
import TestimonialSection from "./components/testimonial-section/TestimonialSection";
import TeamLeadsSection from "./components/TeamLeads/TeamLeadsSection";
import ManagingBody from "./components/Aboutus/ManagingBody"
import Footer from "./components/Footer/Footer";
import Navbar from "./components/navbar/NavbarD";

// import Popup from "./components/Popup";




function HomePage() {

  return (
    <>
      {/* <Popup /> */}
      <Navbar />
      <HeroSection />
      <StatisticsSection />


      <InitiativeReveal />
      <ManagingBody />
      <TeamLeadsSection />
      <TrustedByCompaniesApp/>
      <Highlights />

      <PastSpeakers />
      <TestimonialSection/>
      <Footer />
    </>
  );
}

export default HomePage;
