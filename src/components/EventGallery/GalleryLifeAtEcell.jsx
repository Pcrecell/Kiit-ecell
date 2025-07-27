import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../Footer/Footer';
import NavbarD from '../navbar/NavbarD';
import { useNavigate } from "react-router-dom";

const HeroSection = ({ onHoverChange }) => {
  return (
    <div className="relative pt-6 px-2 sm:px-3">
      <div className="relative w-full rounded-t-[80px] sm:rounded-t-[140px] border border-white overflow-hidden bg-black p-[2px] sm:p-[3px] h-[300px] sm:h-[calc(100vh-40px)] flex items-center justify-center">
        {/* Responsive Image */}
        <img
          src="https://i.postimg.cc/1RvVQrkq/Whats-App-Image-2025-07-26-at-16-38-26-84995f5c-1.png"
          alt="Life at E-Cell"
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-black via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* E-SUMMIT Text Overlay */}
        <div className="absolute bottom-4 left-4 z-10">
          <h1 className="text-3xl sm:text-5xl md:text-8xl font-bold font-[Bebas Neue] text-white tracking-wider">
            LIFE AT E-CELL
          </h1>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="mt-4 flex flex-row gap-4 px-4 sm:px-6 items-center ml-4 ">
        <button
          onMouseEnter={() => onHoverChange('default')}
           className="bg-neutral-800 hover:bg-[#37ADDC] text-white px-2 md:px-6 py-2 rounded-full font-[syne] text-sm sm:text-base transition-colors"
        >
          IMPACT
        </button>
        <button
          onMouseEnter={() => onHoverChange('alt')}
         className="bg-neutral-800 hover:bg-[#37ADDC] text-white px-2 md:px-6 py-2 rounded-full font-[syne] text-sm sm:text-base transition-colors"
        >
          CHANGEMAKERS
        </button>
      </div>
    </div>
  );
};



const StatsSection = ({ mode }) => {
  const navigate = useNavigate(); 
  const statsData = {
    default: {
      count: 13,
      plusSize: "text-[80px]",
      mainSize: "text-[130px]",
      label: "YEARS OF IMPACT",
    },
    alt: {
      count: 500,
      plusSize: "text-[60px]",
      mainSize: "text-[100px]",
      label: "CHANGEMAKERS SHAPED",
    },
  };

  const current = statsData[mode || "default"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-16 px-4 items-start">
      {/* Left Text Section */}
      <div className="flex flex-col items-center text-center space-y-10">
        <div className="flex flex-col items-center space-y-3">
          <p className="text-3xl sm:text-5xl font-bold tracking-wide"  style={{ color: '#37ADDC' }}>  KIIT E-CELL
</p>

          <p className=" text-2xl sm:text-3xl font-semibold" style={{ color: '#37ADDC' }}>presents</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-2"
          >
            <p className="font-extrabold text-white flex items-end justify-center">
              <span className={`leading-none ${current.mainSize}`}>{current.count}</span>
              <span className={` ml-2 leading-none ${current.plusSize}` }>+</span>
            </p>
            <p className="text-white text-base sm:text-lg mt-4 tracking-wide">
              {current.label}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Center Orange ESummit Logo Block */}
      <div className="flex justify-center items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black opacity-40 rounded-2xl z-0 bg-black"></div>
        <img
          src="https://i.postimg.cc/gj915VCn/E-CELL-LOGO-REDEFINED-WHITE-3x-2.png"
          alt="E-Summit Logo"
          className="z-10 w-[180px] sm:w-[240px] md:w-[500px] pt-16"
        />
      </div>

      {/* Right Cards + Paragraph */}
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="flex flex-row gap-4 w-full">
          <div className="w-1/2 overflow-hidden rounded-xl">
            <img
              src="https://i.postimg.cc/d1qcQdb7/Whats-App-Image-2025-07-26-at-16-44-39-024e1f86-1.png"
              alt="Networking Event"
              className="w-full h-[260px] object-cover"
            />
          </div>
          <div className="w-1/2 overflow-hidden rounded-xl">
            <img
              src="https://i.postimg.cc/YSBwVT8z/IMG-20250527-WA0004-1.png"
              alt="Pitch Presentation"
              className="w-full h-[260px] object-cover"
            />
          </div>
        </div>
        <p className="text-white text-sm sm:text-base text-left leading-relaxed max-w-[700px] mt-1">
          KIIT Entrepreneurship Cell (KIIT E-Cell) is the official student-led body of KIIT, dedicated to promoting innovation and entrepreneurial spirit among students. 
        </p>
        <button
      className="text-white px-6 sm:px-8 py-3 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-colors"
      style={{ background: '#37ADDC' }}
      onClick={() => navigate('/')}
    >
      CHECK OUR WEBSITE
    </button>
      </div>
    </div>
  );
};

const SpeakersSection = () => {
  return (
    <div className="flex flex-col lg:flex-row my-12 w-full">
      {/* Left Image: 70% width with full edge-to-edge fit */}
      <div className="w-full lg:w-[70%] h-[400px] lg:h-[500px]">
        <img
          src="https://i.postimg.cc/x84wPZcH/IMG-20250527-WA0008-1.png"
          alt="Auditorium"
          className="w-full h-full object-contain m-0"
        />
      </div>

      {/* Right Text Block: 30% width */}
      <div className="w-full lg:w-[30%] bg-black bg-opacity-80 p-8 lg:p-12 flex flex-col justify-center">
        <div className="text-white text-left">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
           KIIT E-Cell is the heartbeat of innovation at KIIT — a student-driven hub where ideas spark into ventures. From hands-on mentorship to startup challenges, it’s a launchpad for creators, risk-takers, and future founders. With flagship events, real-world exposure, and a thriving ecosystem of leaders and investors, KIIT E-Cell empowers students to think big, start bold, and lead with purpose.
          </p>

          <div className="mb-2">
            <span className="text-white text-6xl lg:text-[150px] font-bold">50</span>
            <span className=" text-4xl lg:text-[100px] font-bold ml-1" style={{ color: '#37ADDC' }}>+</span>
          </div>

          <p className="text-white text-base lg:text-lg tracking-wide mt-2">
            ALUMNI
          </p>
        </div>
      </div>
    </div>
  );
};



const GallerySection = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 my-12 px-4">
      <div className="flex-1 h-[300px] lg:h-[450px]  overflow-hidden">
        <img
          src="https://i.postimg.cc/fLBnVys8/DSC-8534-1.png"
          alt="Team"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 h-[300px] lg:h-[450px]  overflow-hidden">
        <img
          src="https://i.postimg.cc/pdQttk6b/Frame-1618873027.png"
          alt="Awards Ceremony"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 h-[300px] lg:h-[450px]  overflow-hidden">
        <img
          src="https://i.postimg.cc/c1F0H94d/Frame-1618873028.png"
          alt="Awards Ceremony 2"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};


// Main Page with State
const ESummitPage = () => {
  const [hovered, setHovered] = useState('default');

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-full mx-auto">
        <NavbarD/>
        <HeroSection onHoverChange={setHovered} />
        <StatsSection mode={hovered} />
        <SpeakersSection />
        <GallerySection />
        <Footer/>
      </div>
    </div>
  );
};

export default ESummitPage;