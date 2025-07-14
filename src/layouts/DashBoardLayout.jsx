import React from 'react';
import { NavLink, Outlet } from 'react-router';
import {
  FaTachometerAlt,
  FaUserCircle,
  FaUsers,
  FaChalkboardTeacher,
  FaPlusCircle,
  FaClipboardList,
  FaCreditCard,
  FaRegNewspaper,
  FaInbox,
  FaEdit,
  FaHistory,
  FaBookOpen,
  FaStar,
  FaUserPlus
} from 'react-icons/fa';

const DashBoardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="main-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col bg-[#121212] text-white min-h-screen">
        {/* Top Navbar */}
        <div className="navbar bg-[#1F1F1F] shadow-md px-4">
          {/* Hamburger Icon */}
          <div className="flex-none lg:hidden">
            <label htmlFor="main-drawer" className="btn btn-ghost text-[#A259FF] hover:bg-[#A259FF]/20">
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

          {/* Title */}
          <div className="flex-1 text-xl font-bold text-[#A259FF] flex items-center gap-2">
            <FaTachometerAlt className="text-[#A259FF]" /> My Dashboard
          </div>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="main-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-72 min-h-full bg-[#1F1F1F] text-white space-y-2 shadow-xl">

          {/* Common */}
          <li>
            <NavLink to="/dashboard" className="hover:bg-[#A259FF]/20 hover:text-[#A259FF] rounded-lg font-medium">
              <FaTachometerAlt /> Dashboard Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile" className="hover:bg-[#A259FF]/20 hover:text-[#A259FF] rounded-lg font-medium">
              <FaUserCircle /> Profile
            </NavLink>
          </li>

          {/* Admin */}
          <li>
            <NavLink to="/dashboard/newsletters" className="hover:bg-[#A259FF]/20 hover:text-[#A259FF] rounded-lg font-medium">
              <FaRegNewspaper /> All Newsletter Subscribers
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/trainers" className="hover:bg-[#A259FF]/20 hover:text-[#A259FF] rounded-lg font-medium">
              <FaUsers /> All Trainers
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/pendingTrainers" className="hover:bg-[#A259FF]/20 hover:text-[#A259FF] rounded-lg font-medium">
              <FaInbox /> Applied Trainer
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/balance" className="hover:bg-[#A259FF]/20 hover:text-[#A259FF] rounded-lg font-medium">
              <FaCreditCard /> Balance
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-class" className="hover:bg-[#A259FF]/20 hover:text-[#A259FF] rounded-lg font-medium">
              <FaPlusCircle /> Add New Class
            </NavLink>
          </li>

          {/* Trainer */}
          <li>
            <NavLink to="/dashboard/manage-slots" className="hover:bg-[#A259FF]/20 hover:text-[#A259FF] rounded-lg font-medium">
              <FaClipboardList /> Manage Slots
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-slot" className="hover:bg-[#A259FF]/20 hover:text-[#A259FF] rounded-lg font-medium">
              <FaPlusCircle /> Add Slot
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-forum" className="hover:bg-[#A259FF]/20 hover:text-[#A259FF] rounded-lg font-medium">
              <FaEdit /> Add Forum
            </NavLink>
          </li>

          {/* Member */}
          <li>
            <NavLink to="/dashboard/activity-log" className="hover:bg-[#A259FF]/20 hover:text-[#A259FF] rounded-lg font-medium">
              <FaHistory /> Activity Log
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/booked-trainers" className="hover:bg-[#A259FF]/20 hover:text-[#A259FF] rounded-lg font-medium">
              <FaBookOpen /> Booked Trainers
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/become-trainer" className="hover:bg-[#A259FF]/20 hover:text-[#A259FF] rounded-lg font-medium">
              <FaUserPlus /> Become a Trainer
            </NavLink>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
