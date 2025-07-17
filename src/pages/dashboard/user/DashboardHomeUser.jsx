import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/authContext/AuthContext';
import { Link } from 'react-router';

const DashboardHomeUser = () => {
  const { user } = useContext(AuthContext);
  const userName = user?.displayName || user?.email || 'Member';

  return (
    <section className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 flex flex-col justify-center items-center p-8 text-white">
      <div className="max-w-3xl text-center space-y-6 px-6 py-10 bg-gray-800 bg-opacity-60 rounded-3xl shadow-lg shadow-cyan-500/50 ring-2 ring-cyan-400/70 backdrop-blur-md">
        <h1 className="text-5xl font-extrabold tracking-tight text-cyan-400  animate-fadeIn">
          Welcome back, <span className="underline decoration-4">{userName}</span>!
        </h1>
        <p className="text-lg md:text-xl text-gray-300 font-light max-w-xl mx-auto leading-relaxed">
          We’re thrilled to have you here. This dashboard is your personal control center to explore your fitness journey, track progress, and stay connected with the community.
        </p>
        <p className="text-cyan-300 italic font-medium animate-pulse">
          Remember, every step forward is a step toward a healthier, stronger you. Let’s make today count!
        </p>

        <div className="mt-8">
          <Link
            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-full font-semibold text-white shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            to={'/allClasses'}
          >
            Explore Classes
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DashboardHomeUser;
