import React from 'react';
import img from "../assets/Images/png/texture.png";

const StatisticsCard = ({ number, description }) => {
  return (
    <div className="relative group w-[300px] h-[140px] sm:w-[300px] sm:h-[350px] rounded-lg overflow-visible mx-2 my-1">
      
      {/* First border - visible on all devices */}
      <div className="absolute -top-4 -left-4 w-[calc(100%+32px)] h-[calc(100%+32px)] border border-green-100 rounded-lg z-10 pointer-events-none" />

      {/* Second border - only visible on md and up */}
      <div className="hidden md:block absolute -top-2 -right-2 w-[calc(100%+16px)] h-[calc(100%+16px)] border border-green-100 rounded-lg z-20 pointer-events-none" />

      {/* Background image */}
      <div
        className="absolute inset-0 z-0 rounded-lg"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Oval black gradient overlay */}
      <div className="absolute inset-0 z-45 rounded-lg bg-gradient-radial pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center items-center h-full rounded-lg transition-colors duration-300 group-hover:bg-green-600">
        <h2 className="text-6xl md:text-8xl font-bold mb-4 text-white group-hover:text-black transition-colors duration-300">
          {number}
        </h2>
        <p className="text-white text-center text-lg">{description}</p>
      </div>

      {/* Radial Gradient Style */}
      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(
            ellipse at center,
            rgba(0, 0, 0, 0) 20%,
            rgba(0, 0, 0, 0.9) 80%
          );
        }
      `}</style>
    </div>
  );
};

export default StatisticsCard;
