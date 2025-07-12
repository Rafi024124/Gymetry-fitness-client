import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from "../../assets/Logo.jpeg"
import { HiOutlineMenu } from 'react-icons/hi';

const Navbar = () => {
  const navItems = (
    <>
      {[
        { to: '/', label: 'Home' },
        { to: '/trainers', label: 'All Trainers' },
        { to: '/classes', label: 'All Classes' },
        { to: '/forums', label: 'Community' }
      ].map(({ to, label }) => (
        <li key={to}>
          <NavLink
            to={to}
            className={({ isActive }) =>
              `relative inline-block px-2 py-1 transition duration-300 ${
                isActive ? 'text-[#a259ff] font-bold neon-text' : 'group'
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

  return (
    <div className="navbar bg-[#1F1F1F] text-[#F2F2F2] shadow-md">
      <div className="navbar-start">
      <div className="dropdown">
  <div tabIndex={0} role="button" className="lg:hidden text-accent p-2">
    <HiOutlineMenu className="text-2xl text-[#A259FF] neon-icon hover:neon-icon" />
  </div>
  <ul
    tabIndex={0}
    className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-[#1F1F1F] rounded-box w-30"
  >
    {navItems}
  </ul>
</div>

       
        <div className="flex items-center space-x-2 text-[#a259ff]" style={{ textShadow: '0 0 1px #a164f1' }}>
          <img src={Logo} alt="" className='rounded-full w-20'/>
          <span className="text-xl font-bold">Gy<span className="text-purple-300">m</span>etry</span>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">{navItems}</ul>
      </div>

      <div className="navbar-end">
        <Link
          className="glow-btn transition duration-300 text-sm font-semibold"
          to="/login"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
