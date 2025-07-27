import React from "react";

export function EventPanel({ className = "" }) {
  const navItems = [
    { label: "Agenda", href: "#agenda" },
    { label: "Speakers", href: "#speakers" },
    { label: "Register", href: "#register" },
    { label: "Venue", href: "#venue" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <aside
      className={` relative h-[4/12] w-6/12 flex flex-col md:ml-12 z-[2] justify-between bg-[#04122b] p-10 rounded-[44px] max-md:w-[90%] max-md:mb-5 max-sm:w-full max-sm:p-5 ${className}`}
    >
      <header>
        <h1 className="font-bold text-[26px] text-white mb-5 max-sm:text-sm">
          E-Summit 2025
        </h1>
      </header>

      <nav className="flex-grow">
        <ul>
          {navItems.map((item, index) => (
            <li key={index} className="mb-2.5">
              <a
                href={item.href}
                className="font-normal text-[17px] text-white hover:text-opacity-80 transition-colors max-sm:text-sm"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <footer>
        <p className="font-bold text-[17px] text-[#7E7E7E] mt-5 max-sm:text-sm">
          © KIIT E-Summit 2025 All rights reserved.
        </p>
      </footer>
    </aside>
  );
}
