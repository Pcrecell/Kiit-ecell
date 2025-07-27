import React from "react";


const Trustedbycompanies = ({logo}) => {
  return (
    <div className="relative flex justify-center bg-black overflow-hidden">
      {/* Background Image */}
      <img
        src={logo}
        alt="trusted background"
        className="w-full object-cover"
      />

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, transparent 70%, black 100%)",
        }}
      />
    </div>
  );
};

export default Trustedbycompanies;