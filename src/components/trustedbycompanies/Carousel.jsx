import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Carousel = ({ images = [], displayTime = 2000, transitionTime = 200, rewindSpeed = 20, shouldAnimate = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRewinding, setIsRewinding] = useState(false);

  useEffect(() => {
    if (!shouldAnimate) return;

    if (isRewinding) {
      const rewindTimer = setTimeout(() => {
        if (currentIndex > 0) {
          setCurrentIndex((prevIndex) => prevIndex - 1);
        } else {
          setIsRewinding(false);
        }
      }, rewindSpeed);
      return () => clearTimeout(rewindTimer);
    }

    const timer = setTimeout(() => {
      if (currentIndex === images.length - 1) {
        setIsRewinding(true);
      } else {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, displayTime);

    return () => clearTimeout(timer);
  }, [currentIndex, displayTime, images.length, isRewinding, rewindSpeed, shouldAnimate]);

  return (
    <div className="relative w-[50%] h-[30vh] sm:h-[100vh] overflow-visible">
      {/* Top blurred overlay */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-12 sm:h-24 z-20 -translate-y-6 sm:-translate-y-12" style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,0.85) 60%, transparent 100%)",
        filter: "blur(6px)"
      }} />
      {/* Bottom blurred overlay */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-12 sm:h-24 z-20 translate-y-6 sm:translate-y-12" style={{
        background: "linear-gradient(to top, rgba(0,0,0,0.85) 60%, transparent 100%)",
        filter: "blur(6px)"
      }} />
      <AnimatePresence>
        {images.map((image, index) =>
          index === currentIndex ? (
            <motion.div
              key={index}
              className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
              initial={{ y: isRewinding ? "-100%" : "100%" }}
              animate={{ y: 0 }}
              exit={{ y: isRewinding ? "100%" : "-100%" }}
              transition={{ duration: transitionTime / 1000 }}
            >
              <img src={image.link} alt={image.alt} className="max-w-72 max-h-72 sm:max-w-64 sm:max-h-80 xl:max-w-[28rem] xl:max-h-[28rem] overflow-visible" />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
};

export default Carousel;
