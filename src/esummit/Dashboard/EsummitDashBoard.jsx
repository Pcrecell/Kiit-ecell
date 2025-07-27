import React, { useState, useEffect } from "react";
import EsummitNavbar from "../Navbar/EsummitNavbar";
import DashBoardCard from "./DashBoardCard";
import MapComponent from "./MapComponent";
import Footer from "../footer/Footer";
import { authAPI } from "../../services/api";

// Sparkles background for fantasy effect
function SparkleBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="absolute block rounded-full bg-white/30 blur-sm animate-pulse"
          style={{
            left: `${Math.random() * 98}%`,
            top: `${Math.random() * 95}%`,
            width: `${10 + Math.random() * 14}px`,
            height: `${10 + Math.random() * 14}px`,
            animationDuration: `${2 + Math.random() * 2.5}s`,
            opacity: `${0.15 + Math.random() * 0.2}`,
          }}
        />
      ))}
    </div>
  );
}

const EsummitDashBoard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const userResponse = await authAPI.verifyToken();
        if (mounted && userResponse && userResponse.user) {
          setUserData(userResponse.user);
        }
      } catch (err) {
        // handle error
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-green-900 text-white text-2xl font-bold tracking-widest animate-pulse">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen font-sans text-white bg-cover"
      style={{
        backgroundImage: "url('https://i.imgur.com/0mdvQME.jpeg')",
        backgroundPosition: "50% 30%", // further move the image up if needed
      }}
    >
      <SparkleBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-transparent to-black/40 z-0" />

      <div className="relative z-10">
        <EsummitNavbar />

        {/* --- Extra big margin below navbar --- */}
        <div className="h-28 md:h-36"></div>

        {/* Greeting Section with more bottom margin */}
        <div className="flex flex-col items-start px-8 mb-20">
          <div className="text-[50px] md:text-[76px] font-black font-[Tourney] leading-none mb-4 animate-fade-in-down transition duration-1000">
            Hey,
          </div>
          <div className="text-[44px] md:text-[70px] font-[Tourney] leading-none mb-4 animate-gradient-x bg-gradient-to-r from-green-200 via-lime-300 to-lime-100 bg-clip-text text-transparent drop-shadow-sm transition-all duration-700">
            {userData?.firstname || "User"}
          </div>

        </div>

        {/* Registered Events & Map */}
        <section className="px-4 pb-12">
          {/* --- Large top margin above events for separation --- */}
          <h2 className="text-3xl md:text-4xl font-bold mt-8 mb-12 drop-shadow-md text-left">
            Your Registered Events
          </h2>
          <div className="flex flex-wrap justify-center items-start gap-10 mt-14">
            <DashBoardCard title="Alice in Founderland" date="30th July 2025" />
            <MapComponent />
          </div>

          {/* ID Card Below Map, Centered & Creative */}
          <div className="flex justify-center mt-16">
            <div className="relative w-full max-w-sm transform hover:scale-[1.03] transition duration-300">
              <div className="bg-gradient-to-br from-[#171b24] via-[#15371e80] to-[#173744cc] border-4 border-green-400 rounded-2xl shadow-xl p-6 pb-8
                              backdrop-blur-xl overflow-hidden
                              before:absolute before:inset-0 before:bg-gradient-radial before:from-transparent before:to-green-500/5 before:z-0">

                {/* Decorative Medusa/tech lines SVG */}
                <svg className="absolute -top-7 -right-14 w-48 h-32 opacity-15 pointer-events-none" viewBox="0 0 210 120" fill="none">
                  <path d="M180,90 Q130,10 60,78" stroke="#22d3ee" strokeWidth="7" strokeLinecap="round" strokeDasharray="18 22"/>
                  <circle cx="100" cy="59" r="46" stroke="#1aff9c" strokeWidth="2" className="animate-spin-slow" />
                </svg>

                <div className="z-10 relative flex flex-col items-center">
                  <span className="text-xs tracking-[.25em] uppercase text-green-400 mb-1 font-mono">Your</span>
                  <h3 className="text-xl font-black text-lime-200 mb-2 font-mono tracking-wider drop-shadow-xl">DIGITAL ID CARD</h3>
                  <div className="flex items-center mb-2 gap-3">
                    <span className="text-xs font-semibold text-green-300 border-l-4 border-lime-300/80 pl-3 tracking-widest uppercase">Elixir ID</span>
                    <span className="text-base font-mono bg-gradient-to-l from-[#0b2e20] via-lime-300/10 to-black/0 px-2 py-1 rounded-md shadow-inner">
                      {userData?.elixir}
                    </span>
                  </div>
                  {/* QR Code Display */}
                  <div className="mt-5 rounded-xl bg-[#121816]/95 border border-green-400/70 p-3 shadow-lg">
                    {userData?.qrCode ? (
                      <img src={userData.qrCode} alt="QR Code" className="w-32 h-32 object-contain" />
                    ) : (
                      <div className="text-red-400 font-semibold mt-2">QR not available</div>
                    )}
                  </div>
                  {/* Subtle glowing ring */}
                  <div className="absolute top-6 left-0 right-0 mx-auto w-52 h-3 bg-gradient-to-r from-lime-400/30 via-emerald-500/20 to-lime-400/30 blur-xl opacity-70 rounded-full z-0" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default EsummitDashBoard;
