import React, { useContext } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import {
  FaTachometerAlt,
  FaUserCircle,
  FaUsers,
  FaPlusCircle,
  FaClipboardList,
  FaCreditCard,
  FaRegNewspaper,
  FaInbox,
  FaEdit,
  FaHistory,
  FaBookOpen,
  FaUserPlus,
  FaMoon,
  FaSun,
} from 'react-icons/fa';
import { AuthContext } from '../contexts/authContext/AuthContext';
import useUserRole from '../hooks/useUserRole';
import { ThemeContext } from '../contexts/ThemeContext';

const DashBoardLayout = () => {
  const { role, roleLoading } = useUserRole();
  const { user } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navLinkClass = ({ isActive }) => {
    if (theme === 'dark') {
      return `flex items-center gap-2 p-2 rounded-lg font-medium transition duration-300 ${
        isActive ? 'bg-cyan-700/30 text-cyan-300' : 'hover:bg-cyan-700/20 hover:text-cyan-300 text-white'
      }`;
    } else {
      return `flex items-center gap-2 p-2 rounded-lg font-medium transition duration-300 ${
        isActive ? 'bg-cyan-400/30 text-cyan-800' : 'hover:bg-cyan-200 hover:text-cyan-900 text-black'
      }`;
    }
  };

  // Theme-based background and text colors
  const contentBg = theme === 'dark' ? 'bg-[#121212] text-white' : 'bg-sky-50 text-black';
  const navbarBg = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-sky-200 text-black';
  const sidebarBg = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-sky-200 text-black';

  return (
    <div className="drawer lg:drawer-open">
      <input id="main-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className={`drawer-content flex flex-col min-h-screen ${contentBg}`}>
        {/* Top Navbar */}
        <div className={`navbar shadow-md px-4 ${navbarBg}`}>
          <div className="flex-none lg:hidden">
            <label
              htmlFor="main-drawer"
              className="btn btn-ghost text-[#A259FF] hover:bg-[#A259FF]/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>

          <div className="flex-1 flex items-center justify-between gap-4 text-xl font-bold">
            <div className="flex items-center gap-2">
              <FaTachometerAlt className={theme === 'dark' ? 'text-white' : 'text-black'} /> My Dashboard
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="ml-4 p-2 rounded-full hover:bg-gray-700/30 transition"
              >
                {theme === 'dark' ? (
                  <FaSun className="text-yellow-400" />
                ) : (
                  <FaMoon className="text-gray-800" />
                )}
              </button>
            </div>

            <Link
              className="glow-btn bg-gradient-to-r from-[#A259FF] to-[#00F0FF] px-4 py-1.5 rounded font-semibold text-sm transition hover:opacity-90"
              to="/"
            >
              Home Page
            </Link>
          </div>
        </div>

        <div className="p-6 min-h-screen">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="main-drawer" className="drawer-overlay"></label>
        <ul className={`menu p-4 w-72 min-h-full ${sidebarBg} space-y-2 shadow-xl`}>
          {/* Common Links */}
          <li>
            <NavLink to="/dashboard" className={navLinkClass}>
              <FaTachometerAlt /> Dashboard Home
            </NavLink>
          </li>
          <li>
            <NavLink to={`/dashboard/myprofile?email=${user.email}`} className={navLinkClass}>
              <FaUserCircle /> Profile
            </NavLink>
          </li>

          {/* Admin Links */}
          {!roleLoading && role === 'admin' && (
            <>
              <li>
                <NavLink to="/dashboard/newsletters" className={navLinkClass}>
                  <FaRegNewspaper /> All Newsletter Subscribers
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/trainers" className={navLinkClass}>
                  <FaUsers /> All Trainers
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/pendingTrainers" className={navLinkClass}>
                  <FaInbox /> Applied Trainer
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/balance" className={navLinkClass}>
                  <FaCreditCard /> Balance
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-new-class" className={navLinkClass}>
                  <FaPlusCircle /> Add New Class
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/make-admin" className={navLinkClass}>
                  <FaUserPlus /> Make Admin
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addforum" className={navLinkClass}>
                  <FaEdit /> Add Forum
                </NavLink>
              </li>
            </>
          )}

          {/* Trainer Links */}
          {!roleLoading && role === 'trainer' && (
            <>
              <li>
                <NavLink to="/dashboard/manage-slots" className={navLinkClass}>
                  <FaClipboardList /> Manage Slots
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addSlot" className={navLinkClass}>
                  <FaPlusCircle /> Add Slot
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addforum" className={navLinkClass}>
                  <FaEdit /> Add Forum
                </NavLink>
              </li>
            </>
          )}

          {/* Member/User Links */}
          {!roleLoading && (role === 'user' || role === 'trainer') && (
            <>
              <li>
                <NavLink to="/dashboard/activity-log" className={navLinkClass}>
                  <FaHistory /> Activity Log
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/bookings" className={navLinkClass}>
                  <FaBookOpen /> Booked Trainers
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
