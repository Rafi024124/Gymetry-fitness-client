import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../assets/Logo.jpeg";
import { HiOutlineMenu } from "react-icons/hi";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
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
                isActive ? "text-[#a259ff] font-bold neon-text" : "group"
              }`
            }
          >
            <span
              className={`after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:w-0 after:bg-gradient-to-r from-[#a259ff] to-[#00f0ff] after:transition-all after:duration-300 group-hover:after:w-full group-hover:after:shadow-glow`}
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
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="navbar bg-[#1F1F1F] text-[#F2F2F2] shadow-md">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown relative">
          <div
            role="button"
            className="lg:hidden text-accent p-2"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <HiOutlineMenu className="text-2xl text-[#A259FF] neon-icon hover:neon-icon" />
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <Motion.ul
                key="dropdown"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ type: "tween", duration: 0.3 }}
                className="absolute left-0 mt-3 p-2 w-48 shadow bg-[#1F1F1F] rounded-box z-[999]"
              >
                {user && (
                  <div className="mt-3 flex justify-around mb-2 items-center bg-black p-1 rounded-t-2xl">
                    <img
                      src={user?.photoURL}
                      alt="profile"
                      className="w-10 h-10 rounded-full border-2 border-[#A259FF] shadow-[0_0_10px_#A259FF]"
                    />
                    <h1 className="text-[9px] text-white">
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
        <div
          className="flex items-center space-x-2 text-[#a259ff]"
          style={{ textShadow: "0 0 1px #a164f1" }}
        >
          <img src={Logo} alt="Logo" className="rounded-full w-20" />
          <span className="text-xl font-bold">
            Gy<span className="text-purple-300">m</span>etry
          </span>
        </div>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">{navItems}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end space-x-3">
        {user ? (
          <>
            {/* Profile Picture for Desktop */}
            <div className="hidden lg:block">
              <img
                src={user?.photoURL}
                alt="User Profile"
                className="w-10 h-10 rounded-full border-2 border-[#A259FF] shadow-[0_0_10px_#A259FF]"
              />
            </div>
            <button
              onClick={handleLogout}
              className="glow-btn transition duration-300 text-sm font-semibold"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            className="glow-btn transition duration-300 text-sm font-semibold"
            to="/login"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
