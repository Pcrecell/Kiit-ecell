import React from "react";
import { Link } from "react-router-dom";
import { user_auth_pages } from "../../assets/Image Links";

export default function AuthLayout({ children, hideGreenBox = false }) {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#181818] relative">
        <Link to="..">
        <img
            src={user_auth_pages.esummit_logo.link}
            alt={user_auth_pages.esummit_logo.alt}
            className="absolute top-8 left-8 w-40 z-20"
            style={{ minWidth: 120, maxWidth: 180 }}
        />
        </Link>
      <div className={`w-full ${hideGreenBox ? '' : 'md:w-[64vw]'} flex flex-col items-center justify-center z-10 p-4 pt-28 md:pt-24 flex-grow md:flex-grow-0`}>
        <div className="w-full max-w-lg mb-auto mt-auto">{children}</div>

        <footer className="w-full max-w-lg text-center text-xs text-gray-400 py-4 mt-4">
          <Link to="/tos" className="hover:text-white hover:underline">Terms and conditions</Link>
          <span className="mx-2">•</span>
          <Link to="/pp" className="hover:text-white hover:underline">Privacy policy</Link>
        </footer>
      </div>

      {!hideGreenBox && (
        <div className="hidden md:block fixed right-0 top-0 h-full bg-[#2F8D46] w-[36vw] z-0"></div>
      )}
    </div>
  );
}