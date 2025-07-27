import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Skeleton } from '@mui/material';
import RotatingCarousel from "./RotatingCarousel";

const events = [
  {
    id: "hult-prize",
    title: "Hult Prize",
    description: "A high-energy campus competition where student teams pitch innovative startups to solve global issues. Winners move on to regionals for a shot at the global $1M prize.",
    mainLogo: "https://ik.imagekit.io/wlknxcf5m/hult_w_pink_upperlogo.png?updatedAt=1753550677182", // For rotating carousel
    navIcon: "https://ik.imagekit.io/wlknxcf5m/hult_just_top.png",
    link: "/hult-prize",
    logoClassName: "w-[68%] h-[68%]",
  },  
  {
    id: "maverick",
    title: "Maverick",
    description: "Maverick brings top startup leaders and innovators to campus for inspiring talks and candid insights. It's where ideas meet experience—motivating students to take the leap into entrepreneurship!",
    mainLogo: "https://i.ibb.co/CKjWMdx0/Whats-App-Image-2025-07-09-at-00-26-43-39581389.jpg",
    link: "/maverick",
    logoClassName: "w-[63%] h-[63%]",
  },
  {
    id: "build-school",
    title: "Build School",
    description: "BuildSchool is an 11-week startup sprint where student founders turn raw ideas into real ventures. With hands-on mentorship, high-impact sessions, and a final Demo Day, it's where campus innovators launch big.",
    mainLogo: "https://i.ibb.co/wh55vDfT/buildschool-removebg-preview.png",
    link: "/build-school",
    isSkillSprint: true,
    logoClassName: "w-[70%] h-[70%]",
  },
  {
    id: "esummit",
    title: "E-Summit",
    description: "The flagship fest of KIIT E-Cell, E-Summit is a vibrant mix of startup showcases, fun sub-events, and entrepreneurial action—all packed into one high-energy celebration of innovation!",
    mainLogo: "https://i.postimg.cc/sxy6D6Fg/E-Summit-2019-Word-Mark-3.png",
    link: "/esummit",
    logoClassName: "w-[85%] h-[85%]",
  },
  {
    id: "i-camp",
    title: "I-Camp",
    description: "I-Camp connects eager students with top startups and companies offering internships. It’s your gateway to real-world experience curated by KIIT E-Cell for driven, opportunity-hungry minds!",
    mainLogo: "https://i.ibb.co/dJpJD2Qt/icamp-logo.png",
    link: "/i-camp",
    logoClassName: "w-[75%] h-[75%]",
  },
];

const ArrowSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <defs>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <path d="M10 1 L16 12 L4 12 Z" fill="white" fillOpacity="0.9" filter="url(#glow)" />
  </svg>
);

// Hide arrow on mobile (sm:hidden), show on sm and up
const ResponsiveArrow = ({ activeEvent, activeIndex, className, topOffset, calculationFn }) => (
  <motion.div
    className={`absolute ${className} hidden sm:block`}
    style={{ top: `${topOffset}px` }}
    initial={false}
    animate={{ x: calculationFn(activeIndex) }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
  >
    <Link to={activeEvent.link} className="w-[23px] h-[17px] block">
      <ArrowSVG />
    </Link>
  </motion.div>
);

const EventCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const activeEvent = events[activeIndex];
  const timeoutRef = useRef(null);
  const lastSelectionWasManual = useRef(false);

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    const delay = lastSelectionWasManual.current ? 8000 : 4000;
    lastSelectionWasManual.current = false;

    timeoutRef.current = setTimeout(
      () =>
        setActiveIndex((prevIndex) =>
          prevIndex === events.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [activeIndex]);

  const handleSetActiveIndex = (index) => {
    resetTimeout();
    lastSelectionWasManual.current = true;
    setActiveIndex(index);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Starfield Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url('https://i.ibb.co/G4rTsXLQ/5cd659694dd667ee587fb08cdd62c97cc501a30f-2-min.png')`,
        }}
      />

      {/* Radial Gradient */}
      <div
        className="absolute w-[60rem] sm:w-[80rem] lg:w-[98.3125rem] h-[30rem] sm:h-[40rem] lg:h-[52.1875rem] rounded-full"
        style={{
          background: "radial-gradient(50% 50% at 50% 50%, rgba(37, 157, 255, 0.5) 0%, rgba(0, 0, 0, 0) 100%)",
          transform: "translate(0, 30%)",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-center px-2 pt-4 sm:px-12 lg:px-24 xl:px-44">
        <AnimatePresence mode="wait">
          <motion.h1
            key={activeEvent.id + "-title"}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="font-transcity text-7xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-[115px] font-normal leading-tight bg-clip-text text-white mb-4 sm:mb-4"
            style={{ textShadow: '0 0 13px #fff, 0 0 0px #fff' }}
          >
            {activeEvent.title}
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={activeEvent.id + "-desc"}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-neutral-300 min-h-[16vh] sm:min-h-[12vh] text-base sm:text-base lg:text-lg max-w-[95vw] sm:max-w-[500px] text-justify tracking-wide leading-relaxed mb-8 sm:mb-8"
          >
            {activeEvent.description}
          </motion.p>
        </AnimatePresence>

        {/* Navigation Icons */}
        <div className="relative mb-12 sm:mb-16">
          {/* Mobile: 2 rows (3 + 2) */}
          <div className="flex flex-wrap justify-center gap-5 sm:hidden">
            {/* First row: 3 icons */}
            {events.slice(0, 3).map((event, index) => (
            <motion.div
              key={event.id}
              className="flex flex-col items-center gap-2"
              animate={{ scale: activeIndex === index ? 1.25 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <button
                onClick={() => handleSetActiveIndex(index)}
                className="w-16 h-16 rounded-full bg-black flex items-center justify-center border-2 border-transparent hover:border-white transition-all duration-300 overflow-hidden"
                style={{ filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))" }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  {!loadedImages[index] && (
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        position: 'absolute',
                        top: 0,
                        left: 0
                      }}
                      animation="pulse"
                    />
                  )}
                  <img
                    src={event.navIcon || event.mainLogo}
                    alt={`${event.title} logo`}
                    className={`${event.logoClassName} object-contain transition-opacity duration-300 ${loadedImages[index] ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => handleImageLoad(index)}
                  />
                </div>
              </button>
            </motion.div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-5 mt-5 sm:hidden">
            {/* Second row: 2 icons */}
            {events.slice(3, 5).map((event, index) => (
            <motion.div
              key={event.id}
              className="flex flex-col items-center gap-2"
              animate={{ scale: activeIndex === index + 3 ? 1.25 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <button
                onClick={() => handleSetActiveIndex(index + 3)}
                className="w-16 h-16 rounded-full bg-black flex items-center justify-center border-2 border-transparent hover:border-white transition-all duration-300 overflow-hidden"
                style={{ filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))" }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  {!loadedImages[index + 3] && (
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        position: 'absolute',
                        top: 0,
                        left: 0
                      }}
                      animation="pulse"
                    />
                  )}
                  <img
                    src={events[index + 3].navIcon || events[index + 3].mainLogo}
                    alt={`${events[index + 3].title} logo`}
                    className={`${events[index + 3].logoClassName} object-contain transition-opacity duration-300 ${loadedImages[index + 3] ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => handleImageLoad(index + 3)}
                  />
                </div>
              </button>
            </motion.div>
            ))}
          </div>
          {/* Desktop/tablet: single row */}
          <div className="hidden sm:flex items-start gap-4 md:gap-6 lg:gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                className="flex flex-col items-center gap-3"
                animate={{ scale: activeIndex === index ? 1.4 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <button
                  onClick={() => handleSetActiveIndex(index)}
                  className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-[70px] xl:h-[70px] rounded-full bg-black flex items-center justify-center border-2 border-transparent hover:border-white hover:border-opacity-50 transition-all duration-300 overflow-hidden"
                  style={{ filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))" }}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    {!loadedImages[index] && (
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="100%"
                        sx={{
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                          position: 'absolute',
                          top: 0,
                          left: 0
                        }}
                        animation="pulse"
                      />
                    )}
                    <img
                      src={event.navIcon || event.mainLogo}
                      alt={`${event.title} logo`}
                      className={`${event.logoClassName} object-contain transition-opacity duration-300 ${loadedImages[index] ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => handleImageLoad(index)}
                    />
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
          
          {/* Arrow indicators - responsive positioning */}
          <ResponsiveArrow 
            activeEvent={activeEvent} 
            activeIndex={activeIndex} 
            className="md:block lg:hidden hidden sm:hidden" 
            topOffset={84} 
            calculationFn={(index) => index * (56 + 24) + 28 - 11.5} 
          />
          <ResponsiveArrow 
            activeEvent={activeEvent} 
            activeIndex={activeIndex} 
            className="lg:block xl:hidden hidden sm:hidden md:hidden" 
            topOffset={90} 
            calculationFn={(index) => index * (64 + 32) + 32 - 11.5} 
          />
          <ResponsiveArrow 
            activeEvent={activeEvent} 
            activeIndex={activeIndex} 
            className="xl:block hidden sm:hidden md:hidden lg:hidden" 
            topOffset={95} 
            calculationFn={(index) => index * (70 + 32) + 35 - 11.5} 
          />
        </div>
      </div>

      {/* Rotating Carousel */}
      <RotatingCarousel events={events} activeIndex={activeIndex} />
      {/* More Info Button */}
      <div
        className="absolute w-full flex flex-col items-center z-20 left-0 right-0 bottom-[10vh] mt-0"
        style={{
          ...(window.innerHeight <= 600 ? { bottom: '5vh' } : {})
        }}
      >
        <Link
          to={activeEvent.link}
          className="w-[180px] sm:w-[210px] h-[42px] sm:h-[45px] flex items-center justify-center bg-white text-black rounded-md hover:bg-gray-200 transition-colors shadow-lg overflow-hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={activeEvent.id}
              className="text-xs sm:text-sm font-bold font-poppins tracking-[1.6px] whitespace-nowrap"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              {`GO TO ${activeEvent.title.toUpperCase()}`}
            </motion.span>
          </AnimatePresence>
        </Link>
      </div>
    </div>
  );
};

export default EventCarousel;
