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
  FaUserPlus,
} from 'react-icons/fa';
import { AuthContext } from '../contexts/authContext/AuthContext';
import useUserRole from '../hooks/useUserRole';

const DashBoardLayout = () => {
  const { role, roleLoading } = useUserRole();
  const { user } = useContext(AuthContext);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 p-2 rounded-lg font-medium transition duration-300 ${
      isActive
        ? 'bg-cyan-700/30 text-cyan-300'
        : 'hover:bg-cyan-700/20 hover:text-cyan-300 text-white'
    }`;

  return (
    <div className="drawer lg:drawer-open">
      <input id="main-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col bg-[#121212] text-white min-h-screen">
        {/* Top Navbar */}
        <div className="navbar bg-gray-900 shadow-md px-4">
          <div className="flex-none lg:hidden">
            <label htmlFor="main-drawer" className="btn btn-ghost text-[#A259FF] hover:bg-[#A259FF]/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>

          <div className="flex-1 flex items-center justify-between gap-4 text-xl font-bold text-white">
            <div className="flex items-center gap-2">
              <FaTachometerAlt className="text-white" /> My Dashboard
            </div>
            <Link
              className="glow-btn bg-gradient-to-r from-[#A259FF] to-[#00F0FF] px-4 py-1.5 rounded font-semibold text-sm transition hover:opacity-90"
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

          {/* Common Links */}
          <li><NavLink to="/dashboard" className={navLinkClass}><FaTachometerAlt /> Dashboard Home</NavLink></li>
          <li><NavLink to={`/dashboard/myprofile?email=${user.email}`} className={navLinkClass}><FaUserCircle /> Profile</NavLink></li>

          {/* Admin Links */}
          {!roleLoading && role === 'admin' && (
            <>
              <li><NavLink to="/dashboard/newsletters" className={navLinkClass}><FaRegNewspaper /> All Newsletter Subscribers</NavLink></li>
              <li><NavLink to="/dashboard/trainers" className={navLinkClass}><FaUsers /> All Trainers</NavLink></li>
              <li><NavLink to="/dashboard/pendingTrainers" className={navLinkClass}><FaInbox /> Applied Trainer</NavLink></li>
              <li><NavLink to="/dashboard/balance" className={navLinkClass}><FaCreditCard /> Balance</NavLink></li>
              <li><NavLink to="/dashboard/add-new-class" className={navLinkClass}><FaPlusCircle /> Add New Class</NavLink></li>
              <li><NavLink to="/dashboard/make-admin" className={navLinkClass}><FaUserPlus /> Make Admin</NavLink></li>
              <li><NavLink to="/dashboard/addforum" className={navLinkClass}><FaEdit /> Add Forum</NavLink></li>
            </>
          )}

          {/* Trainer Links */}
          {!roleLoading && role === 'trainer' && (
            <>
              <li><NavLink to="/dashboard/manage-slots" className={navLinkClass}><FaClipboardList /> Manage Slots</NavLink></li>
              <li><NavLink to="/dashboard/addSlot" className={navLinkClass}><FaPlusCircle /> Add Slot</NavLink></li>
              <li><NavLink to="/dashboard/addforum" className={navLinkClass}><FaEdit /> Add Forum</NavLink></li>
            </>
          )}

          {/* Member/User Links */}
          {!roleLoading && (role === 'user' || role === 'trainer') && (
            <>
              <li><NavLink to="/dashboard/activity-log" className={navLinkClass}><FaHistory /> Activity Log</NavLink></li>
              <li><NavLink to="/dashboard/bookings" className={navLinkClass}><FaBookOpen /> Booked Trainers</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
