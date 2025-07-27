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
} from "../../esummit/Navbar/Esummit-resized"
import { useState,useEffect } from "react"
import { Link } from "react-router-dom";
import {authAPI} from "../../services/api";
import { FaUserCircle } from "react-icons/fa"; // for avatar icon

export default function EsummitNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedIndex, setExpandedIndex] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check session on mount
    (async () => {
      try {
        const res = await authAPI.verifyToken();
        setIsAuthenticated(res.success);
      } catch {
        setIsAuthenticated(false);
      }
    })();
  }, []);

  const leftItems = [
    { name: "Home", link: "/esummit" },
    {
      name: "Events", link: "/esummit/events"
    },
    { name: "Theme", link: "/esummit/theme" },
  ]


  const navRight = [
    { name: "Contact", link: "/esummit/contact" }
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
                {isAuthenticated ? (
                      <div className="relative group">
                        <button className="flex items-center gap-2 text-white">
                          <FaUserCircle className="text-2xl" />
                          <span>Profile</span>
                        </button>
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg hidden group-hover:block z-50">
                          <Link
                            to="/esummit/dashboard"
                            className="block px-4 py-2 text-black hover:bg-gray-100"
                          >
                            Dashboard
                          </Link>
                          <button
                            onClick={async () => {
                              const response = await authAPI.logout();
                              if(response.success){
                                setIsAuthenticated(false);
                                // Redirect to home or login page
                                window.location.href = "/esummit"; 
                              } 
                            }}
                            className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Link to="/esummit/login">
                          <NavbarButton variant="secondary">Login</NavbarButton>
                        </Link>
                        <Link to="/esummit/register">
                          <NavbarButton variant="primary">Register</NavbarButton>
                        </Link>
                      </>
                    )}

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
                    <div key={idx}>
                      {item.link ? (
                        <Link
                          to={item.link}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-neutral-200 dark:text-neutral-300"
                        >
                          {item.name}
                        </Link>
                      ) : item.dropdown ? (
                        <div>
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
                      ) : null}
                    </div>
                  ))}
                  {isAuthenticated ? (
                      <>
                        <Link
                          to="/esummit/dashboard"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-neutral-200 dark:text-neutral-300"
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={async () => {
                            const response = await authAPI.logout();
                              if(response.success){
                                isAuthenticated = false;
                                // Redirect to home or login page
                                window.location.href = "/esummit"; 
                              } 
                            setIsMobileMenuOpen(false)
                          }}
                          className="text-left text-neutral-200 dark:text-neutral-300"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/esummit/login" onClick={() => setIsMobileMenuOpen(false)}>
                          <NavbarButton variant="primary" className="w-full">Login</NavbarButton>
                        </Link>
                        <Link to="/esummit/register" onClick={() => setIsMobileMenuOpen(false)}>
                          <NavbarButton variant="secondary" className="w-full">Register</NavbarButton>
                        </Link>
                      </>
                    )}

                </MobileNavMenu>
              </MobileNav>
            </div>
          </>
        )}
      </Navbar>
    </div>
  )
}
