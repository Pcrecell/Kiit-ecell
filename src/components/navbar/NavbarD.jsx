"use client"
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./resizable-navbar"
import { useState } from "react"
import { Link } from "react-router-dom"
import JoinUsPopup from '../JoinUsPopup/JoinUsPopup';

export default function NavbarD() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedIndex, setExpandedIndex] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  
  const leftItems = [
    { name: "Home", link: "/" },
    {name: "Events", link: "/events"},
     { name: "About", link: "/aboutus" },
    { name: "Gallery", link: "/Gallery" }
  ]

  const navRight = [
    { name: "Contact", link: "/contact" },
  ]

  const handleToggleDropdown = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx)
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <Navbar>
        {(visible) => (
          <>
            {/* Desktop Navigation */}
            <div className="hidden lg:flex w-full">
              <NavBody
                leftItems={leftItems}
                rightItems={navRight}
                visible={visible}
              >
                {/* <NavbarButton variant="secondary">Login</NavbarButton> */}
                <NavbarButton variant="secondary" onClick={() => setShowPopup(true)}>
        Join Now
      </NavbarButton>

      <JoinUsPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />

              </NavBody>
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden w-full">
              <MobileNav visible={visible}>
                <MobileNavHeader>
                  <NavbarLogo />
                  <MobileNavToggle
                    isOpen={isMobileMenuOpen}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  />
                </MobileNavHeader>

                <MobileNavMenu
                  isOpen={isMobileMenuOpen}
                  onClose={() => setIsMobileMenuOpen(false)}
                >
                  {[...leftItems, ...navRight].map((item, idx) => (
                    item.link ? (
                      <Link
                        key={idx}
                        to={item.link}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-neutral-200 dark:text-neutral-300"
                      >
                        <div>
                          {item.name}
                        </div>
                      </Link>
                    ) : item.dropdown ? (
                      <div key={idx}>
                        <button
                          onClick={() => handleToggleDropdown(idx)}
                          className="text-neutral-300 font-bold w-full text-left"
                        >
                          {item.name}
                        </button>
                        {expandedIndex === idx && (
                          <div className="ml-4 mt-1 flex flex-col gap-1">
                            {item.dropdown.map((subItem, subIdx) => (
                              <Link
                                key={subIdx}
                                to={subItem.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-neutral-200 dark:text-neutral-400"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : null
                  ))}
                  {/* <NavbarButton variant="secondary" className="w-full">
                    Login
                  </NavbarButton> */}
                  <NavbarButton variant="primary" className="w-full" onClick={() => setShowPopup(true)}>
                    Join Now
                  </NavbarButton>
                  <JoinUsPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
                </MobileNavMenu>
              </MobileNav>
            </div>
          </>
        )}
      </Navbar>
    </div>
  )
}
