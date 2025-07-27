import React from "react";
import bigPolaroid from "../../assets/Images/png/bigPolaroid.png";
import smolPolaroid from "../../assets/Images/png/smolPolaroid.png";

const PolaroidImages = () => {
  const images = [
    // Format: desktop positioning + mobile override
    { src: bigPolaroid, style: "top-[15%] right-[5%] rotate-[-12deg]" },
    { src: smolPolaroid, style: "top-[50%] left-[20%] rotate-[10deg]" },
    { src: bigPolaroid, style: "top-[20%] left-[3%] rotate-[12deg]" },
    { src: smolPolaroid, style: "top-[80%] right-[1%] rotate-[-10deg]" },
  ];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {images.map((img, index) => (
        <img
          key={index}
          src={img.src}
          alt={`polaroid-${index}`}
          className={`absolute w-[90px] sm:w-[100px] md:w-[180px] lg:w-[250px] opacity-10 blur-sm animate-floatSlow transition-transform duration-[3000ms] ease-in-out ${img.style}`}
        />
      ))}
    </div>
  );
};

export default PolaroidImages;
