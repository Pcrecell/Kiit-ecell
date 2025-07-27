import React, { useState } from "react";
import JoinUsPopup from "../JoinUsPopup/JoinUsPopup";
import KiteBackground from "./KiteBackground";

const OurTeams = () => {
  const [isJoinPopupOpen, setIsJoinPopupOpen] = useState(false);

  return (
    <KiteBackground>
      <section className="bg-gradient-to-br from-black to-[rgba(4,25,34,0)] text-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Top border line */}
        <div className="mx-auto w-4/5 sm:w-3/4 lg:w-4/5 h-[2px] sm:h-[3px] bg-white mt-2 sm:mt-4 mb-12 sm:mb-16"></div>

        <h1 className="font-['Poppins'] text-lg sm:text-xl md:text-3xl lg:text-4xl font-light text-white mt-8 sm:mt-12 mb-8 sm:mb-10 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto leading-relaxed">
          Want to be a part of this journey?
        </h1>

        <button
          onClick={() => setIsJoinPopupOpen(true)}
          className="font-['Poppins'] bg-[#00B7FF] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium hover:bg-cyan-300 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Join Our Team
        </button>

        {/* Render the Join Us Popup */}
        <JoinUsPopup isOpen={isJoinPopupOpen} onClose={() => setIsJoinPopupOpen(false)} />

        {/* Bottom border line */}
        <div className="mx-auto w-4/5 sm:w-3/4 lg:w-4/5 h-[2px] sm:h-[3px] bg-white mt-16 sm:mt-20 mb-2 sm:mb-4"></div>
      </section>
    </KiteBackground>
  );
};

export default OurTeams;
