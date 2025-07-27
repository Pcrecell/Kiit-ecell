import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NoiseImage from "../../assets/Images/noise.png";
import GridImage from "../../assets/Images/grid.png";
import EventCarousel from "./EventCarousel";
import HorizontalCardScroll from "./HorizontalCardScroll";

const Events = () => {
  const cardData = [
    {
      id: 1,
      label: "MAVERICK",
      year: "2025",
      date: "19.01.2025",
      tag: "[KIIT E-CELL]",
      imageUrl:
        "https://i.ibb.co/B5LPFBDF/5a23fce20327864f92d8ee95664270a61a4a7d60.jpg",
    },
    {
      id: 2,
      label: "HULT PRIZE",
      year: "2023",
      date: "29.01.2023",
      tag: "[KIIT E-CELL]",
      imageUrl:
        "https://i.ibb.co/B2R2D35j/c0dfab99fca11dbfcc62d5b17ef3f401fcf8eb2e.jpg",
    },
    {
      id: 3,
      label: "E-SUMMIT",
      year: "2022",
      date: "12.02.2022",
      tag: "[KIIT E-CELL]",
      imageUrl:
        "https://i.ibb.co/hF7PtGg1/78d38ffdee410751fbc8a5424e835dfbbd540507.jpg",
    },
    {
      id: 4,
      label: "E-CELL LIFE",
      year: "2024",
      date: "17.11.2024",
      tag: "[KIIT E-CELL]",
      imageUrl:
        "https://i.ibb.co/zVnntCyR/2b696708877517d8fba70b8502a00fb1a782171d.jpg",
    },
    {
      id: 5,
      label: "I-CAMP",
      year: "2022",
      date: "23.04.2022",
      tag: "[KIIT E-CELL]",
      imageUrl:
        "https://i.ibb.co/3YGRZLy7/afe5c2ce5145a6d85d4d2e0c7dc187a379ffbba3.jpg",
    },
  ];

  const positions = [
    { top: 100, left: 348, width: 156, height: 204 },
    { top: 100, left: 528, width: 259, height: 339 },
    { top: 100, left: 807, width: 428, height: 576 },
  ];

  const [scrollIndex, setScrollIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollIndex((prevIndex) => (prevIndex + 1) % cardData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [cardData.length]);

  const getCard = (offset) => {
    const index = (scrollIndex + offset) % cardData.length;
    return cardData[index];
  };

  return (
    <div className="relative w-full min-h-[200vh] bg-[#0E0E0E] overflow-hidden">
      {/* Grid Background - Applied to entire Events page */}
      <div
        className="pointer-events-none select-none z-1 absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url(${GridImage})`,
          backgroundSize: "auto 200vh",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
        }}
      />

      {/* Hero Section */}
      <div className="relative w-full h-screen flex flex-col justify-center overflow-hidden">

        {/* Noise */}
        <img
          src={NoiseImage}
          alt="Noise"
          className="absolute w-[5000px] h-[765px] top-[-200px] left-[-120px] opacity-100 pointer-events-none select-none z-10 rotate-180"
        />

        {/* Events Heading */}
        <div className="absolute bottom-10 md:bottom-0 sm:bottom-[12vh] md:bottom-8 left-4 sm:left-8 md:left-16 z-20">
          <h1 className="text-white font-['Anton'] text-[30vw] md:text-7xl md:text-[150px] lg:text-[200px] font-normal tracking-[-0.03em] leading-none">
            Events
          </h1>
        </div>

        {/* Horizontal Card Scroll Section */}
        <div className="absolute top-[17vh] md:top-[10vh] left-0 w-full md:left-[14%] right-0 md:w-[86%] h-full z-10">
          <HorizontalCardScroll />
        </div>
      </div>

      {/* Actual Carousel section */}
      <div className="w-full top-[4vh]">
        <EventCarousel />
      </div>
    </div>
  );
};

export default Events;
