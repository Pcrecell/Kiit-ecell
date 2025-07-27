import React, { useState, useEffect } from "react";
import laptopImg from "../assets/Images/jpg/laptop.jpg";
import mobileImg from "../assets/Images/jpg/mobile.jpg";
// import logoImg from "../assets/Images/jpg/esummitlogo.png";
// import logoBackImg from "../assets/Images/jpg/icamplogo.png";
// import * as THREE from "three";
import FlippingCoin from "./ui/SpinningCoin";

import { motion, AnimatePresence } from "framer-motion";
import InteractiveHoverButton from "./ui/InteractiveButton";

const Popup = () => {
  const [closed, setClosed] = useState(true);
  const [startFlip, setStartFlip] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const [isGenie, setIsGenie] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1224);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Disable scroll when the poopup is open
  useEffect(() => {
    // Store scroll position in a ref to persist between re-renders
    const scrollYRef = { current: window.scrollY };
    let scrollbarWidth = 0;

    // More aggressive scroll prevention
    const disableScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const disableKeys = (e) => {
      const keys = [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        " ",
        "Spacebar",
      ];
      if (keys.includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    if (!closed) {
      // 1. Capture BEFORE any DOM changes
      scrollYRef.current = window.scrollY;
      scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // 2. Apply all styles in one atomic operation
      document.body.style.cssText = `
      position: fixed;
      top: -${scrollYRef.current}px;
      left: 0;
      width: 100%;
      overflow-y: hidden;
      padding-right: ${scrollbarWidth}px;
      height: 100%;
    `;

      document.documentElement.style.overflow = "hidden";

      // 3. Add more comprehensive event listeners
      window.addEventListener("scroll", disableScroll, {
        passive: false,
        capture: true,
      });
      window.addEventListener("wheel", disableScroll, {
        passive: false,
        capture: true,
      });
      window.addEventListener("touchmove", disableScroll, {
        passive: false,
        capture: true,
      });
      window.addEventListener("keydown", disableKeys, {
        passive: false,
        capture: true,
      });
    } else {
      // Restore styles
      const scrollY =
        Math.abs(parseInt(document.body.style.top || "0", 10)) ||
        scrollYRef.current;

      document.body.style.cssText = "";
      document.documentElement.style.overflow = "";

      // Wait for next frame to ensure styles are cleared before scrolling
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY);
      });

      // Remove all listeners
      window.removeEventListener("scroll", disableScroll, { capture: true });
      window.removeEventListener("wheel", disableScroll, { capture: true });
      window.removeEventListener("touchmove", disableScroll, { capture: true });
      window.removeEventListener("keydown", disableKeys, { capture: true });
    }

    // Cleanup function
    return () => {
      const scrollY =
        Math.abs(parseInt(document.body.style.top || "0", 10)) ||
        scrollYRef.current;

      document.body.style.cssText = "";
      document.documentElement.style.overflow = "";

      window.scrollTo(0, scrollY);

      window.removeEventListener("scroll", disableScroll, { capture: true });
      window.removeEventListener("wheel", disableScroll, { capture: true });
      window.removeEventListener("touchmove", disableScroll, { capture: true });
      window.removeEventListener("keydown", disableKeys, { capture: true });
    };
  }, [closed]);

  useEffect(() => {
    const timer = setTimeout(() => setClosed(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsGenie(true); // activate genie effect
    setTimeout(() => {
      setClosed(true);
      setIsGenie(false); // reset after minimize
      setStartFlip(true);
    }); // delay close until genie effect plays
  };

  const handleReopen = () => {
    setStartFlip(false);
    setClosed(false);
  };

  const popupWidth = isMobile ? "90vw" : isTablet ? "80vw" : "1000px";

  const popupHeight = isMobile ? "75vh" : isTablet ? "50vh" : "620px";

  const logoSize = isMobile
    ? "w-[30vw] h-[30vw]"
    : isTablet
    ? "w-[15vw] h-[15vw]"
    : "w-[70px] h-[70px]";

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed z-[9998] ${
          closed
            ? "bottom-10 right-6"
            : "inset-0 backdrop-blur-3xl flex justify-center items-center"
        }`}
        animate={{
          justifyContent: closed ? "flex-end" : "center",
          alignItems: closed ? "flex-end" : "center",
        }}
      >
        <motion.div
          className={`shadow-lg z-[9999] overflow-hidden ${
            closed ? `rounded-full cursor-pointer ${logoSize}` : "rounded-lg"
          }${
            // ↓ changed from duration-1000
            closed ? "bg-transparent" : "bg-black"
          }`}
          initial={false}
          animate={{
            width: closed
              ? isMobile
                ? "15vw"
                : isTablet
                ? "12vw"
                : 70
              : popupWidth,
            height: closed
              ? isMobile
                ? "15vw"
                : isTablet
                ? "12vw"
                : 70
              : popupHeight,
            borderRadius: closed ? "100%" : "16px",
            transition: {
              opacity: { duration: 0.15, ease: "easeOut" }, // ⚡ super fast },
            },
          }}
          onClick={closed ? handleReopen : undefined}
        >
          {!closed ? (
            <div className="relative w-full h-full">
              <img
                src={isMobile ? mobileImg : laptopImg}
                alt="Popup"
                className="w-full h-full"
              />

              {isMobile ? (
                <>
                  <div className="absolute top-[33%] left-[80%] transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <InteractiveHoverButton className="w-[130px] text-xs">
                      Register
                    </InteractiveHoverButton>
                  </div>
                  <div className="absolute top-[83%] left-[80%] transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <InteractiveHoverButton className="w-[130px] text-sm">
                      Register
                    </InteractiveHoverButton>
                  </div>
                </>
              ) : isTablet ? (
                <div className="absolute bottom-6 left-6 w-full px-10 flex justify-around text-white flex-row">
                  <InteractiveHoverButton className="w-[120px] text-sm">
                    Register
                  </InteractiveHoverButton>
                  <InteractiveHoverButton className="w-[120px] text-sm">
                    Register
                  </InteractiveHoverButton>
                </div>
              ) : (
                <div className="absolute bottom-0 left-0 w-full px-40 py-3 my-[3%] flex justify-between text-white flex-row">
                  <InteractiveHoverButton href="/esummit/register">
                    Register Now
                  </InteractiveHoverButton>
                  <InteractiveHoverButton href="/esummit/icamp">
                    Register Now
                  </InteractiveHoverButton>
                </div>
              )}

              <button
                onClick={handleClose}
                className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center text-white text-5xl font-bold bg-transparent rounded-full shadow-md hover:scale-110 transition-transform duration-200"
              >
                ×
              </button>
            </div>
          ) : startFlip ? (
            <div className="w-full h-full absolute flex justify-center items-center">
              <FlippingCoin />
            </div>
            
          ) : null}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Popup;
