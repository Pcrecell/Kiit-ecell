import {
  Mail,
  MapPin,
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
} from "lucide-react";
import logo from "../../assets/Images/png/Ecell_white.png"; // adjust path based on your file structure
import React from "react"; // Added missing import for React


const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/kiit-e-cell/posts/?feedView=all",
    icon: (
      <Linkedin
        size={28}
        className="text-white/80 group-hover:text-blue-400 transition-colors"
      />
    ),
    bg: "bg-blue-900/30",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/ecell_kiit?igsh=cnpkNnlqZDNlNmpk",
    icon: (
      <Instagram
        size={28}
        className="text-white/80 group-hover:text-blue-400 transition-colors"
      />
    ),
    bg: "bg-blue-900/30",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@kiit-ecell?si=NlFC7PpmzbjpMXk5",
    icon: (
      <Youtube
        size={28}
        className="text-white/80 group-hover:text-blue-400 transition-colors"
      />
    ),
    bg: "bg-blue-900/30",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1EYQBw86KY/",
    icon: (
      <Facebook
        size={28}
        className="text-white/80 group-hover:text-blue-400 transition-colors"
      />
    ),
    bg: "bg-blue-900/30",
  },
];

const Footer = () => {
  return (
    <footer className="bg-black text-white/90 pt-8 pb-3 px-2 sm:pt-12 sm:pb-4 sm:px-2 md:px-8 w-full animate-fade-in">
      <div className="mx-auto max-w-7xl w-full pb-3 sm:pb-4">
        {/* Mobile custom layout wrapper */}
        <div className="block sm:hidden w-full text-sm">
          <div className="flex flex-row w-full gap-4">
            {/* Useful Links left */}
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2 text-blue-400 tracking-wider uppercase text-center">
                Useful Links
              </h3>
              <ul className="space-y-4 text-sm text-center">
                <a href="/">
                  <li className="hover:text-blue-300 cursor-pointer transition-colors duration-150">
                    Home
                  </li>
                </a>
                <a href="/aboutus">
                  <li className="hover:text-blue-300 cursor-pointer transition-colors duration-150 mt-1">
                    About Us
                  </li>
                </a>
                <a href="/gallery">
                  <li className="hover:text-blue-300 cursor-pointer transition-colors duration-150 mt-1">
                    Gallery
                  </li>
                </a>
                <a href="/contact">
                  <li className="hover:text-blue-300 cursor-pointer transition-colors duration-150 mt-1">
                    Contact Us
                  </li>
                </a>
              </ul>
            </div>
            {/* Our Initiatives right */}
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2 text-blue-400 tracking-wider uppercase text-center">
                Our Initiatives
              </h3>
              <ul className="space-y-2 text-sm text-center">
                <a href="/esummit">
                  <li className="hover:text-blue-300 transition-colors duration-150 cursor-pointer">
                    E-summit
                  </li>
                </a>
                <a href="/i-camp">
                  <li className="hover:text-blue-300 transition-colors duration-150 cursor-pointer">
                    I-Camp
                  </li>
                </a>
                <a href="/build-school">
                  <li className="hover:text-blue-300 transition-colors duration-150 cursor-pointer mt-1">
                    BuildSchool
                  </li>
                </a>
                <a href="/hult-prize">
                  <li className="hover:text-blue-300 transition-colors duration-150 cursor-pointer mt-1">
                    Hult Prize
                  </li>
                </a>
                <a href="/maverick/">
                  <li className="hover:text-blue-300 transition-colors duration-150 cursor-pointer mt-1">
                    Mavericks
                  </li>
                </a>
                <a href="https://www.youtube.com/@KIIT-ECELL" target="_blank" rel="noopener noreferrer">
                  <li className="hover:text-blue-300 transition-colors duration-150 cursor-pointer mt-1">
                    Growth Garage
                  </li>
                </a>
              </ul>
            </div>
          </div>
          {/* Contact at the bottom */}
          <div className="mt-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold mb-2 text-blue-400 tracking-wider uppercase text-center">
              Contact
            </h3>
            <div className="flex flex-row items-center justify-center text-center gap-3 mb-3 ml-6">
              <a className="flex flex-row items-center justify-center text-center gap-3 transition-300" 
                 href="https://maps.app.goo.gl/AwWswtFmfKXJHEvm8"
                 target="_blank"
                 rel="noopener noreferrer"
              >
                <MapPin size={20} className="text-blue-400" />
                <span className="text-sm text-white/90 flex flex-col items-start justify-center">
                  E-cell KIIT
                  <span>Bhubaneswar, Odisha</span>
                </span>
              </a>
            </div>
            <div className="flex flex-row items-center justify-center text-center gap-3">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=pcr.ecell@kiit.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-blue-300 duration-150 text-sm"
              >
                <Mail size={20} className="text-blue-400" />
                pcr.ecell@kiit.ac.in
              </a>
            </div>
          </div>
          {/* Social at the very bottom */}
          <div className="pt-4">
            <p className="font-medium text-center mb-2 text-white/90 text-sm">
              Get connected with us on social networks:
            </p>
            <div className="flex gap-3 items-center justify-center mt-3">
              {socialLinks.map((link) => (
                <a
                  href={link.href}
                  key={link.name}
                  aria-label={link.name}
                  className={`rounded-lg p-1.5 ${link.bg} group transition-transform hover:scale-110 focus:scale-105 ring-1 ring-blue-600`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {React.cloneElement(link.icon, { size: 20 })}
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* Desktop/tablet layout stays the same, but hidden on mobile */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-10 w-full">
          {/* Logo and subscribe */}
          <div className="flex flex-col col-span-1 gap-5">
            {/* Logo */}
            <div className="flex flex-col gap-2 animate-fade-in">
              <div className="flex items-center gap-4">
                {/* Logo block - E in box */}
                <div className="flex flex-col gap-1 w-full">
                  {/* The geometric E logo */}
                  <div className="flex flex-col items-center mx-auto text-center w-full max-w-[180px]">
                    <img
                      src={logo}
                      alt="Logo"
                      className="w-24 h-24 object-contain"
                    />
                    <div className="uppercase text-[10px] sm:text-xs text-blue-300 font-medium  leading-tight tracking-wide">
                      KIIT E-Cell
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Subscribe section */}
            {/* <div className="pt-3">
            <p className="font-medium text-base mb-2 text-white/90">
              Subscribe to Our Blogs
            </p>
            <form className="relative w-full group">
              <input
                type="email"
                className="w-full px-5 py-3 rounded-full bg-transparent border-2 border-blue-600 text-white/90 placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter your email"
                autoComplete="off"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 my-auto h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-500 transition-colors"
                tabIndex={-1}
              >
                <ArrowRight size={22} className="text-white" />
              </button>
            </form>
          </div> */}
          </div>
          {/* Initiatives */}
          <div>
            <h3 className="text-center sm:text-start text-lg font-bold mb-2 text-blue-400 tracking-wider uppercase">
              Our Initiatives
            </h3>
            <ul className="space-y-1 text-base text-center sm:text-start">
              <a href="/esummit">
                <li className="hover:text-blue-300 transition-colors duration-150 cursor-pointer">
                  E-summit
                </li>
              </a>
              <a href="/i-camp">
                <li className="hover:text-blue-300 transition-colors duration-150 cursor-pointer">
                  I-Camp
                </li>
              </a>
              <a href="/build-school">
                <li className="hover:text-blue-300 transition-colors duration-150 cursor-pointer mt-1">
                  BuildSchool
                </li>
              </a>
              <a href="/hult-prize">
                <li className="hover:text-blue-300 transition-colors duration-150 cursor-pointer mt-1">
                  Hult Prize
                </li>
              </a>
              <a href="/maverick/">
                <li className="hover:text-blue-300 transition-colors duration-150 cursor-pointer mt-1">
                  Mavericks
                </li>
              </a>
              <a href="https://www.youtube.com/@KIIT-ECELL" target="_blank" rel="noopener noreferrer">
                <li className="hover:text-blue-300 transition-colors duration-150 cursor-pointer mt-1">
                  Growth Garage
                </li>
              </a>

            </ul>
          </div>
          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-bold mb-2 text-blue-400 tracking-wider uppercase text-center sm:text-start">
              Useful Links
            </h3>
            <ul className="space-y-6 text-base text-center sm:text-start">
              <a href="/">
                <li className="hover:text-blue-300 cursor-pointer transition-colors duration-150">
                  Home
                </li>
              </a>
              <a href="/aboutus">
                <li className="hover:text-blue-300 cursor-pointer transition-colors duration-150 mt-1">
                  About Us
                </li>
              </a>

              <a href="/gallery">
                <li className="hover:text-blue-300 cursor-pointer transition-colors duration-150 mt-1">
                  Gallery
                </li>
              </a>
              <a href="/contact">
                <li className="hover:text-blue-300 cursor-pointer transition-colors duration-150 mt-1">
                  Contact Us
                </li>
              </a>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-2 text-blue-400 tracking-wider uppercase text-center sm:text-start">
              Contact
            </h3>
            <div className="flex items-center sm:items-start justify-center sm:justify-start text-center sm:text-start gap-3 mb-3 hover:underline">
              <a className="flex items-center sm:items-start justify-center sm:justify-start text-center sm:text-start gap-3 duration-150" 
                 href="https://maps.app.goo.gl/AwWswtFmfKXJHEvm8"
                 target="_blank"
                 rel="noopener noreferrer"
                 
              >
                <MapPin size={22} className="text-blue-400 mt-0.5" />
                <span className="text-base text-white/90">
                  E-cell KIIT
                  <br />
                  Bhubaneswar,Odisha
                </span>
              </a>
            </div>
            <div className="flex items-center sm:items-start justify-center sm:justify-start text-center sm:text-start gap-3">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=pcr.ecell@kiit.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:underline duration-150"
              >
                <Mail size={22} className="text-blue-400" />
                pcr.ecell@kiit.ac.in
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="mx-auto mt-8 pt-4 border-t border-blue-600 text-center text-blue-400 text-base font-medium animate-fade-in">
        © 2025 Copyright: KIIT E-Cell
      </div>
    </footer>
  );
};

export default Footer;
