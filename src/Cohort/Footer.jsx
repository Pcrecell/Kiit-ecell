import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-t from-[#0361a7] to-transparent text-white py-10 px-5 text-center relative bottom-0 w-full shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
      <div className="max-w-[1200px] mx-auto px-5 flex justify-between items-center flex-wrap 
                      max-[768px]:flex-col max-[768px]:text-center">
        {/* Logo */}
        <div className="mb-4 max-[768px]:mb-4">
          <img
            src="https://ik.imagekit.io/d73k0qzwc/BuildSchool.png"
            alt="Build School Logo"
            className="w-[120px] object-contain mb-2"
          />
        </div>

        {/* Text */}
        <p className="text-[16px] font-normal text-white/70 m-0 max-[768px]:text-[14px] max-[768px]:mt-2">
          &copy; 2025 Build School. All Rights Reserved.
        </p>

        {/* Social Links */}
        <div className="mt-5 flex gap-5 max-[768px]:mt-4">
          {/* X */}
          <a
            href="https://x.com/kiit_ecell?t=getO4H6eHN4jzf1D7qht2w&s=08"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-300 ease-in-out hover:-translate-y-0.5"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/5968/5968830.png"
              alt="X"
              className="w-[30px] h-[30px] hover:opacity-80 transition-opacity duration-300"
            />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/kiit-e-cell/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-300 ease-in-out hover:-translate-y-0.5"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/145/145807.png"
              alt="LinkedIn"
              className="w-[30px] h-[30px] hover:opacity-80 transition-opacity duration-300"
            />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/ecell_kiit?igsh=cnpkNnlqZDNlNmpk"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-300 ease-in-out hover:-translate-y-0.5"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
              alt="Instagram"
              className="w-[30px] h-[30px] hover:opacity-80 transition-opacity duration-300"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
