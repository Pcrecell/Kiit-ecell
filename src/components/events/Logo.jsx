import React from "react";
import logo from "../../assets/Images/png/ecell-logo.png";

const Logo = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <div className="relative">
          <img src={logo} alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default Logo;
