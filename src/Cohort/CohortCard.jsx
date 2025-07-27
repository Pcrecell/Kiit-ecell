import React from "react";

const CohortCard = ({ imgURL, title, description }) => {
  return (
    <div
      className="w-[220px] h-[280px] relative overflow-hidden shadow-md transition-transform duration-300 ease-in-out hover:scale-[1.04] hover:shadow-lg rounded-lg 
      sm:w-[200px] sm:h-[270px] 
      max-[768px]:w-[190px] max-[768px]:h-[260px] 
      max-[480px]:w-[170px] max-[480px]:h-[250px]"
    >
      <img
        src={imgURL}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div
        className="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-md p-2 text-white text-center w-[90%] h-[80px] rounded max-[1024px]:h-[75px] max-[480px]:h-[70px]"
      >
        <h2
          className="text-[14px] font-bold mb-1 font-[Manrope] max-[480px]:text-[13px]"
        >
          {title}
        </h2>
        <p
          className="text-[8px] leading-[1.1] m-0 font-[Manrope] max-[480px]:text-[7px]"
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default CohortCard;
