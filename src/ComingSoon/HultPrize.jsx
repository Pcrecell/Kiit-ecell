"use client";

import React, { useState, useEffect } from "react";
import NavbarD from "../components/navbar/NavbarD";
import hultprizeLogo from "../assets/HultPrize Coming soon.png";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { cn } from "../utils/cn";

export function HultPrize() {
  const navigate = useNavigate();

  return (
    <div>
      <GradientWipeTransition />
      <NavbarD />
      <LampContainer navigate={navigate} />
    </div>
  );
}

const GradientWipeTransition = () => {
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitionComplete(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const gradientRectangles = [0, 1, 2, 3, 4, 5].map((index) => (
    <motion.div
      key={index}
      className="absolute top-0 h-full"
      style={{
        left: `${(index * 100) / 6}%`,
        width: `${100 / 6}%`,
        background: `linear-gradient(to bottom, #C716A4 0%, #000000 100%)`
      }}
      initial={{ scaleY: 1, transformOrigin: "top" }}
      animate={isTransitionComplete ? { scaleY: 0 } : { scaleY: 1 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.76, 0, 0.24, 1]
      }}
    />
  ));

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      <div className="w-full h-full relative">
        {gradientRectangles}
      </div>
    </div>
  );
};

export const LampContainer = ({ className, navigate }) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full z-0",
        className
      )}
    >
      {/* Lamp glow effect with matching #C716A4 theme */}
      <div className="absolute scale-x-50 md:scale-x-100 inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="relative w-full h-[500px] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "30rem" }}
            transition={{ delay: 2.0, duration: 0.8, ease: "easeInOut" }}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            }}
            className="absolute right-1/2 h-56 w-[30rem] bg-gradient-conic from-[#C716A4] via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
          >
            <div className="absolute w-full left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
            <div className="absolute w-40 h-full left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "30rem" }}
            transition={{ delay: 2.0, duration: 0.8, ease: "easeInOut" }}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            }}
            className="absolute left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-[#C716A4] text-white [--conic-position:from_290deg_at_center_top]"
          >
            <div className="absolute w-40 h-full right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
            <div className="absolute w-full right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          </motion.div>

          {/* Extra glow layers with matching #C716A4 color */}
          <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl" />
          <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
          <div className="absolute z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-[#C716A4] opacity-50 blur-3xl" />
          <motion.div
            initial={{ width: "8rem" }}
            whileInView={{ width: "16rem" }}
            transition={{ delay: 2.0, duration: 0.8, ease: "easeInOut" }}
            className="absolute z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-[#C716A4] blur-2xl"
          />
          <motion.div
            initial={{ width: "15rem" }}
            whileInView={{ width: "30rem" }}
            transition={{ delay: 2.0, duration: 0.8, ease: "easeInOut" }}
            className="absolute z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-[#C716A4]"
          />
          <div className="absolute z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950" />
        </div>
      </div>

      {/* Text and content */}
      <div className="relative z-50 flex flex-col items-center px-5 w-full mt-10">
        {/* Coming Soon */}
        <motion.h1
          initial={{ opacity: 0, y: 400 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.8, ease: "easeInOut" }}
          className="bg-white py-4 bg-clip-text text-center text-6xl font-medium font-transcity tracking-tight text-transparent md:text-8xl mb-10"
        >
          Coming Soon
        </motion.h1>

        {/* Logo + Button */}
        <div className="flex flex-col items-center mt-20 -translate-y-16">
          {/* Animated Logo */}
          <motion.img
            src={hultprizeLogo}
            alt="Hult Prize Logo"
            className="mx-auto mb-8"
            style={{
              width: '100%',
              maxWidth: '320px',
              height: 'auto',
              aspectRatio: '2/1',
              objectFit: 'contain',
              minWidth: '180px',
            }}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              delay: 2.8, 
              duration: 1.0, 
              ease: "easeOut",
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
          />
          
          {/* Animated Button */}
          <motion.button
            onClick={() => navigate(-1)}
            className="px-8 py-2 w-full rounded-md mx-auto border-2 border-white bg-none hover:bg-white hover:text-black text-white font-bold transition-all duration-300 shadow-md hover:opacity-90"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 3.2, 
              duration: 0.6, 
              ease: "easeOut" 
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            Return
          </motion.button>
        </div>
      </div>
    </div>
  );
};
