import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { Menu } from "lucide-react";

const Navbar = () => {
  const menuItems = [
    "Home",
    "About Us",
    "Gallery",
    "Blogs",
    "Events",
    "Join Us",
  ];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavItem = ({ text }) => {
    return (
      <a
        href="#"
        className="text-white text-sm font-medium tracking-wide hover:text-primary-300 transition-colors duration-300 relative group"
      >
        {text}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-300 transition-all duration-300 group-hover:w-full"></span>
      </a>
    );
  };

  return (
    <>
      <nav
        className={`flex justify-center items-center py-6 px-4 md:px-16 z-20 fixed w-full transition-all duration-300 ${
          scrolled ? "bg-dark bg-opacity-90 backdrop-blur-sm shadow-lg" : ""
        }`}
      >
        <div className="flex w-full max-w-[1400px] justify-between items-center mx-auto">
          <div className="hidden md:flex space-x-16 lg:space-x-24 justify-center flex-1">
            {menuItems.slice(0, 3).map((item) => (
              <NavItem key={item} text={item} />
            ))}
          </div>

          <Logo />

          <div className="hidden md:flex space-x-16 lg:space-x-24 justify-center flex-1">
            {menuItems.slice(3).map((item) => (
              <NavItem key={item} text={item} />
            ))}
          </div>

          <div className="md:hidden">
            <button
              className="text-white p-1 hover:text-primary-300 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
