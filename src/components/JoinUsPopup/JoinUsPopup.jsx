import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import illustration1 from "../../assets/Signup logo(1).svg";
import illustration2 from "../../assets/Signup logo(2).svg";
import { createPortal } from "react-dom";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { joinDb } from "../../esummit/firebase/firebase";
import { Skeleton } from "@mui/material";


const getClientIdentifier = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip || "unknown";
  } catch (error) {
    console.error("Could not get IP:", error);
    return "unknown";
  }
};

const JoinUsPopup = ({ isOpen, onClose }) => {
  const popupRef = useRef();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [rateLimitError, setRateLimitError] = useState("");
  const containerControls = useAnimation();
  const [showFirstLogo, setShowFirstLogo] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);


  useEffect(() => {
  const interval = setInterval(() => {
    setImgLoaded(false); // 1. Show skeleton

    // 2. Wait a moment to let Skeleton render, THEN switch image
    setTimeout(() => {
      setShowFirstLogo((prev) => !prev);
    }, 100); // delay 100ms before switching logo
  }, 3000);

  return () => clearInterval(interval);
}, []);


  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const isSubmit = async () => {
    if (!email || !email.includes("@") || !email.includes(".")) {
      throw new Error("Please enter a valid email address");
    }

    const clientId = await getClientIdentifier();
    const rateLimitDocRef = doc(joinDb, "rate_limits", clientId);
    const rateLimitDoc = await getDoc(rateLimitDocRef);
    const rateLimitData = rateLimitDoc.data() || { count: 0, lastAttempt: 0 };

    if (
      rateLimitData.count >= 5 &&
      Date.now() - rateLimitData.lastAttempt < 3600000
    ) {
      throw new Error("Too many attempts. Please try again later.");
    }

    await setDoc(rateLimitDocRef, {
      count: rateLimitData.count + 1,
      lastAttempt: Date.now(),
    });

    await addDoc(collection(joinDb, "subscribers"), {
      email: email,
      timestamp: new Date(),
      clientId: clientId,
    });
  };

  const handleStart = async () => {
    setIsSubmitting(true);
    setRateLimitError("");

    try {
      await isSubmit();
      setSubmitSuccess(true);
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
      setRateLimitError(error.message || "There was an error submitting your email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAnimation = async () => {
    const popup = popupRef.current;
    if (!popup) return;

    const popupRect = popup.getBoundingClientRect();
    const dx = window.innerWidth - popupRect.right;
    const dy = -popupRect.top + 20;

    await containerControls.start({
      x: dx,
      y: dy,
      scale: 0.1,
      opacity: 0,
      transition: { duration: 0.2, ease: "easeInOut" },
    });

    onClose();
    setSubmitSuccess(false);
    setRateLimitError("");
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-20 overflow-y-auto hide-scroll">
      <motion.div
        ref={popupRef}
        initial={{ opacity: 1, scale: 1 }}
        animate={containerControls}
        onMouseDown={(e) => e.stopPropagation()}
        className="relative bg-[#0d0d0d] p-5 rounded-3xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden border border-white/10 ring-1 ring-blue-500/30 ring-offset-2 ring-offset-black shadow-[0_0_20px_#06b6d4] opacity-90"
      >
        <button
  onClick={handleCloseAnimation}
  className="absolute top-4 right-4 z-50 w-10 h-10 backdrop-blur-md bg-white/5 text-white border border-white/20 hover:border-white/40 rounded-full flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-[0_0_8px_#0ff3] hover:shadow-[0_0_12px_#0ff3]"
>
  <X className="w-5 h-5" />
</button>


        {/* Left content */}
       <div className="p-6 md:p-10 w-full md:w-1/2 text-white flex flex-col justify-center font-poppins">
  <h2 className="text-3xl md:text-3xl font-semibold mb-6 leading-tight text-white tracking-tight">
    This Is Your Sign To Join <span className="text-cyan-400">KIIT E-CELL</span>
  </h2>

        <div className="w-full md:hidden bg-[#0d0d0d] p-2 flex items-end justify-center">
  {!imgLoaded && (
   <Skeleton
      variant="rectangular"
      className="absolute top-0 left-0 w-full h-full rounded-xl"
      animation="wave"
    />
)}

<AnimatePresence mode="wait">
  <motion.img
    key={showFirstLogo ? "logo1" : "logo2"}
    src={showFirstLogo ? illustration1 : illustration2}
    alt="E-Cell Logo"
    onLoad={() => setImgLoaded(true)}
    initial={{ opacity: 0, scale: 0.95, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: -10 }}
    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
    className="w-[300px] sm:w-[380px] md:w-[440px]"
  />
</AnimatePresence>

</div>


           <h3 className="text-xl hidden md:text-2xl font-semibold text-white mb-4">
    What’s in it for you:
  </h3>

 <ul className="hidden md:block text-base text-gray-300 list-disc list-inside mb-6">
  <li>Build innovative projects with real impact</li>
  <li>Take the lead in marketing, tech, design, content, and more</li>
  <li>Network with founders, creators, and future VCs</li>
  <li>Drive flagship events like E-Summit, where the campus meets the startup world</li>
</ul>

          {submitSuccess ? (
              <div className="text-center py-4">
                <p className="text-cyan-400 font-medium">Thank you for your interest!</p>
                <p className="text-sm text-gray-300 mt-1">We'll be in touch soon.</p>
              </div>
            ) : (
              <>
                <div className="text-center py-4">
                  <p className="text-cyan-400 font-medium">If you have the spark, we have the platform.</p>
                  <p className="text-sm text-gray-300 mt-1">Drop your email to get started.</p>
                </div>

                {rateLimitError && (
                  <p className="text-red-400 text-sm text-center mt-2">{rateLimitError}</p>
                )}

                <div className="relative mt-6 w-full">
                  <input
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pr-32 px-4 py-2 rounded-3xl text-sm bg-[#181818] text-white placeholder-gray-400 border border-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    disabled={isSubmitting}
                  />
                  <motion.button
                    onClick={handleStart}
                    disabled={isSubmitting}
                    whileTap={{ scale: 0.95 }}
                    className="absolute top-1 right-1 bottom-1 px-4 text-sm font-semibold bg-cyan-500 hover:text-black text-white rounded-2xl transition disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Get Started"}
                  </motion.button>
                </div>
              </>
            )}
        </div>

        {/* Right image */}
        <div className="hidden md:flex w-full md:w-1/2 bg-[#0d0d0d] pt-16 p-2 items-center justify-center">
          {!imgLoaded && (
  <Skeleton
      variant="rectangular"
      className="absolute top-0 left-0 w-full h-full rounded-xl"
      animation="wave"
    />
)}

<AnimatePresence mode="wait">
  <motion.img
    key={showFirstLogo ? "logo1" : "logo2"}
    src={showFirstLogo ? illustration1 : illustration2}
    alt="E-Cell Logo"
    onLoad={() => setImgLoaded(true)}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
    className="w-[300px] sm:w-[380px] md:w-[440px]"
  />
</AnimatePresence>

        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default JoinUsPopup;