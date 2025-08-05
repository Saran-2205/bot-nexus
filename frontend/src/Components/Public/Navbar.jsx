import { FaBars, FaTimes } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // if menu is visible (for styling)
  const [isHidden, setIsHidden] = useState(false);
  const [shouldRenderMenu, setShouldRenderMenu] = useState(false); // for mounting/unmounting
  const [activeNavItem, setActiveNavItem] = useState("");

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      setTimeout(() => setShouldRenderMenu(false), 300); // match transition duration
    } else {
      setShouldRenderMenu(true);
      setTimeout(() => setIsMenuOpen(true), 10); // small delay to trigger animation
    }
  };

  const handleNavClick = (item) => {
    setActiveNavItem(item.toLowerCase());
    toggleMenu();
  };

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.slice(1); // removes the leading '/'
    if (path === "") {
      setActiveNavItem("home");
    } else {
      setActiveNavItem(path); // automatically sets 'projects', 'about', etc.
    }
  }, [location]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsHidden(true); // scrolling down
      } else {
        setIsHidden(false); // scrolling up
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full px-6 py-2 fixed top-0 bg-black z-50 transition-transform duration-300 font-['Orbitron'] ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="max-w-full mx-20 flex items-center justify-between">
        {/* LEFT: Logo */}
        <div className="flex items-center text-3xl hover:cursor-pointer hover:scale-105 transition-all duration-300">
          <img src="/nav-logo.png" alt="BotNexus Logo" width={60} height={50} />
          <span className="text-[#ff2121] mr-2">Bot</span>
          <span className="text-white hover:text-[#2196F3] duration-300">
            Nexus
          </span>
        </div>

        {/* CENTER: Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {["Home", "Projects", "Competitions", "Team", "Blog", "About Us"].map(
            (item) => (
              <Link
                key={item}
                to={
                  item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(/\s+/g, "")}`
                }
                className={`text-md transition-all cursor-pointer duration-300 ${
                  activeNavItem === item.toLowerCase()
                    ? "text-[#2196F3] font-medium"
                    : "text-gray-300 hover:text-[#2196F3] hover:scale-110"
                }`}
                onClick={() => setActiveNavItem(item.toLowerCase())}
              >
                {item}
              </Link>
            )
          )}
        </div>

        {/* RIGHT: Join Us Button */}
        <div className="hidden md:block">
          <button className="bg-[#E53935] px-4 py-2 rounded text-black hover:text-white text-md font-semibold hover:scale-110 hover:bg-[#2196F3] cursor-pointer transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,255,255,0.5)]">
            Join Us
          </button>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white text-2xl">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {shouldRenderMenu && (
        <div
          className={`md:hidden fixed top-16 left-0 right-0 px-20 py-6 bg-[#0f0f1c]/95 
            backdrop-blur-lg shadow-2xl rounded-b-3xl border-t border-red-500/70 
            transition-all duration-300 ease-in-out transform origin-top z-40
            ${
              isMenuOpen
                ? "opacity-100 scale-100 max-h-[500px]"
                : "opacity-0 scale-95 max-h-0 overflow-hidden pointer-events-none"
            }`}
        >
          <div className="flex flex-col space-y-6">
            {[
              "Home",
              "Projects",
              "Competitions",
              "Team",
              "Blog",
              "About Us",
            ].map((item) => (
              <Link
                to={
                  item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(/\s+/g, "")}`
                }
                onClick={() => handleNavClick(item)}
                className={`text-lg font-semibold tracking-wide font-['Orbitron'] transition-colors duration-300 cursor-pointer ${
                  activeNavItem === item.toLowerCase()
                    ? "text-[#2196F3]"
                    : "text-gray-300 hover:text-[#2196F3]"
                }`}
              >
                {item}
              </Link>
            ))}
            <button className="bg-[#E53935] px-4 py-2 rounded text-black hover:text-white text-md font-semibold hover:bg-[#2196F3] cursor-pointer transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,255,255,0.5)]">
              Join Us
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
