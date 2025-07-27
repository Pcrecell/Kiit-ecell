import React, { useState } from "react";
import { motion } from "framer-motion";
import { Skeleton } from '@mui/material';

const RotatingCarousel = ({ events, activeIndex }) => {
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };
  return (
    <div className="absolute bottom-0 right-0">
      <div className="hidden sm:block">
        <div className="relative w-[40vw] h-[40vw] lg:w-[42vw] lg:h-[42vw] max-w-[500px] max-h-[500px] lg:max-w-[650px] lg:max-h-[650px] min-w-[350px] min-h-[350px] lg:min-w-[450px] lg:min-h-[450px] overflow-hidden">
          
          {/* Border circle with luminosity blend mode */}
          <motion.div
            className="absolute w-[80vw] h-[80vw] lg:w-[84vw] lg:h-[84vw] max-w-[1000px] max-h-[1000px] lg:max-w-[1300px] lg:max-h-[1300px] min-w-[700px] min-h-[700px] lg:min-w-[900px] lg:min-h-[900px]"
            style={{
              top: "0px",
              left: "0px",
              transformOrigin: "50% 50%",
              mixBlendMode: "luminosity",
            }}
            // For 5 circles, use 72deg per step, rotate so active is always at top left (-126deg)
            animate={{ rotate: -activeIndex * 72 }}
            transition={{
              type: "tween",
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {/* Big circle with white outline and luminosity blend mode */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[56.7vw] h-[56.7vw] lg:w-[59.535vw] lg:h-[59.535vw] max-w-[716px] max-h-[716px] lg:max-w-[936px] lg:max-h-[936px] min-w-[495px] min-h-[495px] lg:min-w-[639px] lg:min-h-[639px] rounded-full outline outline-white"
                 style={{ 
                   outlineWidth: window.innerWidth >= 1024 ? `clamp(10px, 1vw, 16px)` : `clamp(7px, 0.8vw, 12px)`,
                   backgroundColor: 'transparent'
                 }} />
            
            {/* Red circles with luminosity blend mode */}
            {events.map((event, index) => {
              const isLargeScreen = window.innerWidth >= 1024;
              const radiusValue = isLargeScreen 
                ? Math.min(window.innerWidth * 0.297675, 468)
                : Math.min(window.innerWidth * 0.28389375, 358);
              // For 5 circles, use 360/5 = 72 degrees per step, and start at -126 for symmetry
              const angle = -135 + index * 72;
              const x = radiusValue * Math.cos(angle * (Math.PI / 180));
              const y = radiusValue * Math.sin(angle * (Math.PI / 180));
              const circleSize = isLargeScreen 
                ? `clamp(280px, 27vw, 425px)`
                : `clamp(200px, 25.75vw, 325px)`;
              const circleSizeValue = isLargeScreen
                ? Math.max(280, Math.min(window.innerWidth * 0.27, 425))
                : Math.max(200, Math.min(window.innerWidth * 0.2575, 325));
              
              return (
                <div
                  key={`border-${event.id}`}
                  className="absolute rounded-full bg-red-600"
                  style={{
                    width: circleSize,
                    height: circleSize,
                    top: `calc(50% + ${y}px - ${circleSizeValue/2}px)`,
                    left: `calc(50% + ${x}px - ${circleSizeValue/2}px)`,
                    boxShadow: "1.48px 5.91px 5.91px 0px #00000040",
                  }}
                />
              );
            })}
          </motion.div>

          {/* Event circles without blend mode */}
          <motion.div
            className="absolute w-[80vw] h-[80vw] lg:w-[84vw] lg:h-[84vw] max-w-[1000px] max-h-[1000px] lg:max-w-[1300px] lg:max-h-[1300px] min-w-[700px] min-h-[700px] lg:min-w-[900px] lg:min-h-[900px]"
            style={{
              top: "0px",
              left: "0px",
              transformOrigin: "50% 50%",
            }}
            // For 5 circles, use 72deg per step, rotate so active is always at top left (-126deg)
            animate={{ rotate: -activeIndex * 72 }}
            transition={{
              type: "tween",
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {events.map((event, index) => {
              const isLargeScreen = window.innerWidth >= 1024;
              const radiusValue = isLargeScreen 
                ? Math.min(window.innerWidth * 0.297675, 468)
                : Math.min(window.innerWidth * 0.28389375, 358);
              // For 5 circles, use 360/5 = 72 degrees per step, and start at -126 for symmetry
              const angle = -135 + index * 72;
              const x = radiusValue * Math.cos(angle * (Math.PI / 180));
              const y = radiusValue * Math.sin(angle * (Math.PI / 180));
              const circleSize = isLargeScreen 
                ? `clamp(280px, 27vw, 425px)`
                : `clamp(200px, 25.75vw, 325px)`;
              const circleSizeValue = isLargeScreen
                ? Math.max(280, Math.min(window.innerWidth * 0.27, 425))
                : Math.max(200, Math.min(window.innerWidth * 0.2575, 325));
              const borderWidth = isLargeScreen ? 40 : 26;
              
              return (
                <motion.div
                  key={event.id}
                  className="absolute"
                  style={{
                    width: circleSize,
                    height: circleSize,
                    top: `calc(50% + ${y}px - ${circleSizeValue/2}px)`,
                    left: `calc(50% + ${x}px - ${circleSizeValue/2}px)`,
                  }}
                  // Counter-rotate so logo stays upright
                  animate={{ rotate: activeIndex * 72 }}
                  transition={{
                    type: "tween",
                    duration: 1.2,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                >
                    <div 
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center overflow-hidden bg-gray-300`}
                      style={{
                        width: `calc(${circleSize} - ${borderWidth}px)`,
                        height: `calc(${circleSize} - ${borderWidth}px)`,
                        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4), 5.28px 4.4px 19.36px 17.6px rgba(0,0,0,0.25)",
                      }}
                    >
                    <div className="w-full h-full bg-black flex items-center justify-center">
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
                          src={event.mainLogo}
                          alt={`${event.title} logo`}
                          className={`${
                            event.logoClassName || "w-3/5 h-3/5"
                          } object-contain transition-opacity duration-300 ${loadedImages[index] ? 'opacity-100' : 'opacity-0'}`}
                          onLoad={() => handleImageLoad(index)}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RotatingCarousel;
