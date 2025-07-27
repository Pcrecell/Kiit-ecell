import React, { useState, useEffect, useRef } from "react";

const SemiCircleFrame = ({ children, timeLeft, targetDate }) => {
  const [fillPercentage, setFillPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  const calculateFillPercentage = () => {
    if (!timeLeft || !targetDate) return 0;
    const totalRemainingSeconds =
      timeLeft.days * 86400 +
      timeLeft.hours * 3600 +
      timeLeft.minutes * 60 +
      timeLeft.seconds;

    const now = new Date();
    const target = new Date(targetDate);
    const totalCountdownSeconds = Math.max(
      1,
      Math.floor((target - now) / 1000) + totalRemainingSeconds
    );

    const elapsedSeconds = totalCountdownSeconds - totalRemainingSeconds;
    const percentage = Math.max(
      0,
      Math.min(100, (elapsedSeconds / totalCountdownSeconds) * 100)
    );
    return totalRemainingSeconds <= 0 ? 100 : percentage;
  };

  useEffect(() => {
    if (isVisible) {
      const targetFill = calculateFillPercentage();
      setTimeout(() => setFillPercentage(targetFill), 100);
    }
  }, [isVisible, timeLeft, targetDate]);

  const radius = 180;
  const circumference = Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset =
    circumference - (fillPercentage / 100) * circumference;

  return (
    <div
      ref={containerRef}
      className="relative w-full mx-auto px-2 sm:px-4 pt-24 sm:pt-32 md:pt-40 lg:pt-48"
    >
      {/* Inline animation keyframes */}
      <style>
        {`
          @keyframes moveEnergy {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -330; }
          }
        `}
      </style>

      <div className="relative">
        <div
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{ transform: "translateX(-50%) translateY(-100px)" }}
        >
          <svg
            viewBox="0 0 400 200"
            className="w-screen max-w-none sm:w-[120vw] md:w-[110vw] lg:w-[100vw] xl:w-[90vw] 2xl:w-[80vw]"
            style={{
              overflow: "visible",
              height: "auto",
              aspectRatio: "2 / 1",
            }}
          >
            {/* Background Arc */}
            <path
              d="M 20 180 A 180 180 0 0 1 380 180"
              fill="none"
              stroke="rgba(107, 114, 128, 0.5)"
              strokeWidth="20"
              strokeLinecap="square"
            />

            {/* Glow Filter */}
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow
                  dx="0"
                  dy="0"
                  stdDeviation="4"
                  floodColor="#46ff46"
                  floodOpacity="1"
                />
              </filter>
              <filter
                id="whiteGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feDropShadow
                  dx="0"
                  dy="0"
                  stdDeviation="3"
                  floodColor="#ffffff"
                  floodOpacity="1"
                />
              </filter>
            </defs>

            {/* Progress Arc */}
            <path
              d="M 20 180 A 180 180 0 0 1 380 180"
              fill="none"
              stroke="#46ff46"
              strokeWidth="20"
              strokeLinecap="square"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              style={{
                transition: "stroke-dashoffset 4s ease-out",
                filter: "url(#glow)",
              }}
            />

            {/* Glowing White Energy Line (Unfilled Portion Only) */}
            <path
              d="M 20 180 A 180 180 0 0 1 380 180"
              fill="none"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="50 300"
              strokeDashoffset={strokeDashoffset}
              style={{
                opacity: 0.95,
                animation: "moveEnergy 2s linear infinite",
                filter: "url(#whiteGlow)",
              }}
            />
          </svg>
        </div>

        {/* Content under arc */}
        <div className="relative z-20 mt-16 lg:mt-20 xl:mt-24">{children}</div>
      </div>
    </div>
  );
};

export default SemiCircleFrame;
