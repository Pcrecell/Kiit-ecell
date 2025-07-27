import React from 'react';
import img from "../../assets/Images/texture.png";

const StatisticsCard = ({ number, description }) => {
  return (
    <div className="relative group w-[250px] h-[300px] md:w-[300px] md:h-[350px] rounded-lg overflow-visible">
      {/* Purple border overlay */}
      <div className="absolute -top-2 -left-2 w-[calc(100%+16px)] h-[calc(100%+16px)] border-2 border-[#26a8da] rounded-lg group-hover:border-[#26a8da] transition-colors duration-300 z-30 pointer-events-none"></div>

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
      <div className="absolute inset-0 z-10 rounded-lg bg-gradient-radial pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center items-center h-full  rounded-lg transition-colors duration-300 group-hover:bg-[#26a8da]">
        <h2 className="text-7xl md:text-8xl font-bold mb-4 text-white transition-colors duration-300 items">
          {number}
        </h2>
        <p className="text-white text-center text-lg md:max-w-lg max-w-md">{description}</p>
      </div>

      {/* Custom radial gradient CSS */}
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
