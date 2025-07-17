import React, { useContext } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import 
{
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
import useUserRole from '../hooks/useUserRole';

const DashBoardLayout = () => {
  const { role, roleLoading } = useUserRole();
  const { user } = useContext(AuthContext);

  return (
    <div className="drawer lg:drawer-open">
      <input id="main-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col bg-[#121212] text-white min-h-screen">
        {/* Top Navbar */}
        <div className="navbar bg-gray-900 shadow-md px-4">
          <div className="flex-none lg:hidden">
            <label htmlFor="main-drawer" className="btn btn-ghost text-[#A259FF] hover:bg-[#A259FF]/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>

          <div className="flex-1 flex items-center justify-between gap-4 text-xl font-bold bg-gray-900 text-white">
            <div className="flex items-center gap-2">
              <FaTachometerAlt className="text-white" /> My Dashboard
            </div>

            <Link to="/" className="glow-btn bg-gradient-to-r from-[#A259FF] to-[#00F0FF] transition duration-300 text-sm font-semibold">
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
          {[
            { to: "/dashboard", icon: <FaTachometerAlt />, label: "Dashboard Home" },
            { to: `/dashboard/myprofile?email=${user.email}`, icon: <FaUserCircle />, label: "Profile" }
          ].map(({ to, icon, label }) => (
            <li key={to}>
              <NavLink to={to} className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-lg font-medium transition duration-300 ${
                  isActive ? 'bg-cyan-700/30 text-cyan-300' : 'hover:bg-cyan-700/20 hover:text-cyan-300 text-white'
                }`}>
                {icon} {label}
              </NavLink>
            </li>
          ))}

          {!roleLoading && role === 'admin' && ([
            { to: "/dashboard/newsletters", icon: <FaRegNewspaper />, label: "All Newsletter Subscribers" },
            { to: "/dashboard/trainers", icon: <FaUsers />, label: "All Trainers" },
            { to: "/dashboard/pendingTrainers", icon: <FaInbox />, label: "Applied Trainer" },
            { to: "/dashboard/balance", icon: <FaCreditCard />, label: "Balance" },
            { to: "/dashboard/add-new-class", icon: <FaPlusCircle />, label: "Add New Class" },
            { to: "/dashboard/make-admin", icon: <FaUserPlus />, label: "Make Admin" },
            { to: "/dashboard/addforum", icon: <FaEdit />, label: "Add Forum" }
          ].map(({ to, icon, label }) => (
            <li key={to}>
              <NavLink to={to} className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-lg font-medium transition duration-300 ${
                  isActive ? 'bg-cyan-700/30 text-cyan-300' : 'hover:bg-cyan-700/20 hover:text-cyan-300 text-white'
                }`}>
                {icon} {label}
              </NavLink>
            </li>
          )))}

          {!roleLoading && role === 'trainer' && ([
            { to: "/dashboard/manage-slots", icon: <FaClipboardList />, label: "Manage Slots" },
            { to: "/dashboard/addSlot", icon: <FaPlusCircle />, label: "Add Slot" },
            { to: "/dashboard/addforum", icon: <FaEdit />, label: "Add Forum" }
          ].map(({ to, icon, label }) => (
            <li key={to}>
              <NavLink to={to} className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-lg font-medium transition duration-300 ${
                  isActive ? 'bg-cyan-700/30 text-cyan-300' : 'hover:bg-cyan-700/20 hover:text-cyan-300 text-white'
                }`}>
                {icon} {label}
              </NavLink>
            </li>
          )))}

          {!roleLoading && (role === 'user' || role === 'trainer') && ([
            { to: "/dashboard/activity-log", icon: <FaHistory />, label: "Activity Log" },
            { to: "/dashboard/bookings", icon: <FaBookOpen />, label: "Booked Trainers" }
          ].map(({ to, icon, label }) => (
            <li key={to}>
              <NavLink to={to} className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-lg font-medium transition duration-300 ${
                  isActive ? 'bg-cyan-700/30 text-cyan-300' : 'hover:bg-cyan-700/20 hover:text-cyan-300 text-white'
                }`}>
                {icon} {label}
              </NavLink>
            </li>
          )))}
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
