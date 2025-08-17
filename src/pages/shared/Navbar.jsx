import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../assets/logo1.png";
import { HiOutlineMenu } from "react-icons/hi";
import { AuthContext } from "../../contexts/authContext/AuthContext";

import { motion as Motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { ThemeContext } from "../../contexts/ThemeContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext); // use theme context
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = (
    <>
      {[
        { to: "/", label: "Home" },
        { to: "/trainers", label: "All Trainers" },
        { to: "/allClasses", label: "All Classes" },
        { to: "/forums", label: "Community" },
        user && { to: "/dashboard", label: "Dashboard" },
      ]
        .filter(Boolean)
        .map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `relative inline-block px-2 py-1 transition duration-300 ${
                  isActive
                    ? theme === "dark"
                      ? "text-[#a259ff] font-bold neon-text"
                      : "text-black font-bold"
                    : "group"
                }`
              }
            >
              <span
                className={`after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:w-0 after:bg-gradient-to-r ${
                  theme === "dark"
                    ? "from-[#a259ff] to-[#00f0ff]"
                    : "from-black to-gray-500"
                } after:transition-all after:duration-300 group-hover:after:w-full group-hover:after:shadow-glow`}
              >
                {label}
              </span>
            </NavLink>
          </li>
        ))}
    </>
  );

  const handleLogout = () => {
    signOutUser()
      .then(() => console.log("User signed out successfully"))
      .catch((err) => console.log(err));
  };

  return (
    <div
      className={`sticky top-0 z-50 ${
        theme === "dark" ? "bg-gray-900 text-[#F2F2F2]" : "bg-sky-200 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto navbar ">
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown relative">
            <div
              role="button"
              className="lg:hidden text-accent p-2"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <HiOutlineMenu
                className={`text-2xl ${
                  theme === "dark" ? "text-cyan-300" : "text-black"
                } neon-icon hover:neon-icon`}
              />
            </div>

            <AnimatePresence>
              {isMenuOpen && (
                <Motion.ul
                  key="dropdown"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ type: "tween", duration: 0.3 }}
                  className={`absolute left-0 mt-3 p-2 w-48 shadow rounded-box z-[999] ${
                    theme === "dark" ? "bg-[#1F1F1F]" : "bg-sky-100"
                  }`}
                >
                  {user && (
                    <div
                      className={`mt-3 flex gap-2 mb-2 items-center p-1 rounded-t-2xl ${
                        theme === "dark" ? "bg-black" : "bg-sky-200"
                      }`}
                    >
                      <img
                        src={user?.photoURL}
                        alt="profile"
                        className={`w-10 h-10 rounded-full border-2 ${
                          theme === "dark"
                            ? "border-cyan-300 shadow-[0_0_10px_#A259FF]"
                            : "border-gray-500 shadow-none"
                        }`}
                      />
                      <h1 className={theme === "dark" ? "text-white text-[12px]" : "text-gray-900 text-[12px]"}>
                        {user?.displayName}
                      </h1>
                    </div>
                  )}
                  {navItems}
                </Motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={Logo} alt="Logo" className="rounded-full w-20" />
          </div>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">{navItems}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex items-center space-x-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              theme === "dark" ? "bg-gray-800 text-yellow-300" : "bg-sky-300 text-gray-900"
            }`}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          {user ? (
            <>
              <div className="hidden lg:block">
                <img
                  src={user?.photoURL}
                  alt="User Profile"
                  className=" w-10 h-10 rounded-full"
                />
              </div>
              <button
                onClick={handleLogout}
                className={`glow-btn px-6 py-2 rounded-lg text-sm font-semibold shadow-md transition duration-300 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-cyan-400 to-cyan-300 text-white hover:from-cyan-500 hover:to-cyan-400"
                    : "bg-blue-400 text-black hover:bg-blue-500"
                }`}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className={`glow-btn px-6 py-2 rounded-lg text-sm font-semibold shadow-md transition duration-300 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-cyan-400 to-cyan-300 text-white hover:from-cyan-500 hover:to-cyan-400"
                  : "bg-blue-400 text-black hover:bg-blue-500"
              }`}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
