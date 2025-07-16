import React, { useContext } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
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
import { AuthContext } from '../contexts/authContext/AuthContext';

const DashBoardLayout = () => {

  const {user} = useContext(AuthContext);
  return (
    <div className="drawer lg:drawer-open">
      <input id="main-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col bg-[#121212] text-white min-h-screen">
        {/* Top Navbar */}
        {/* Top Navbar */}
<div className="navbar bg-gray-900 shadow-md px-4">
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

  {/* Title + Home Button */}
  <div className="flex-1 flex items-center justify-between gap-4 text-xl font-bold bg-gray-900 text-white">
    <div className="flex items-center gap-2">
      <FaTachometerAlt className="text-white" /> My Dashboard
    </div>

    <Link
            className="glow-btn bg-gradient-to-r from-[#A259FF] to-[#00F0FF] transition duration-300 text-sm font-semibold"
            to="/"
          >
            Home Page
          </Link>
  </div>
</div>


        <div className="p-6 bg-[#36454F] min-h-screen">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="main-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-72 min-h-full bg-gray-900 text-white space-y-2 shadow-xl">

          {/* Common */}
          <li>
            <NavLink to="/dashboard" className="hover:bg-gray-400 hover:text-white rounded-lg font-medium">
              <FaTachometerAlt /> Dashboard Home
            </NavLink>
          </li>
          <li>
            <NavLink 
            to={`/dashboard/myprofile?email=${user.email}`}  className="hover:bg-gray-400 hover:text-white rounded-lg font-medium">
              <FaUserCircle /> Profile
            </NavLink>
          </li>

          {/* Admin */}
          <li>
            <NavLink to="/dashboard/newsletters" className="hover:bg-gray-400 hover:text-white rounded-lg font-medium">
              <FaRegNewspaper /> All Newsletter Subscribers
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/trainers" className="hover:bg-gray-400 hover:text-white rounded-lg font-medium">
              <FaUsers /> All Trainers
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/pendingTrainers" className="hover:bg-gray-400 hover:text-white rounded-lg font-medium">
              <FaInbox /> Applied Trainer
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/balance" className="hover:bg-gray-400 hover:text-white rounded-lg font-medium">
              <FaCreditCard /> Balance
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-new-class" className="hover:bg-gray-400 hover:text-white rounded-lg font-medium">
              <FaPlusCircle /> Add New Class
            </NavLink>
          </li>

          {/* Trainer */}
          <li>
            <NavLink to="/dashboard/manage-slots" className="hover:bg-gray-400 hover:text-white rounded-lg font-medium">
              <FaClipboardList /> Manage Slots
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/addSlot" className="hover:bg-gray-400 hover:text-white rounded-lg font-medium">
              <FaPlusCircle /> Add Slot
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/addforum" className="hover:bg-gray-400 hover:text-white rounded-lg font-medium">
              <FaEdit /> Add Forum
            </NavLink>
          </li>

          {/* Member */}
          <li>
            <NavLink to="/dashboard/activity-log" className="hover:bg-gray-400 hover:text-white rounded-lg font-medium">
              <FaHistory /> Activity Log
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/bookings" className="hover:bg-gray-400 hover:text-white rounded-lg font-medium">
              <FaBookOpen /> Booked Trainers
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/make-admin" className="hover:bg-gray-400 hover:text-white rounded-lg font-medium">
              <FaUserPlus /> Make Admin
            </NavLink>
          </li>
         

        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
