import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/authContext/AuthContext';
import { ThemeContext } from '../../../contexts/ThemeContext'; // Add ThemeContext
import { Link } from 'react-router';

const DashboardHomeUser = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // 'dark' or 'light'
  const userName = user?.displayName || user?.email || 'Member';

  return (
    <section
      className={`min-h-screen flex flex-col justify-center items-center p-8 ${
        theme === 'dark'
          ? 'bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white'
          : 'bg-gradient-to-tr from-gray-100 via-gray-200 to-gray-100 text-black'
      }`}
    >
      <div
        className={`max-w-3xl text-center space-y-6 px-6 py-10 rounded-3xl shadow-lg ring-2 backdrop-blur-md ${
          theme === 'dark'
            ? 'bg-gray-800 bg-opacity-60 shadow-cyan-500/50 ring-cyan-400/70'
            : 'bg-white bg-opacity-80 shadow-gray-300/50 ring-gray-300'
        }`}
      >
        <h1
          className={`text-5xl font-extrabold tracking-tight animate-fadeIn ${
            theme === 'dark' ? 'text-cyan-400' : 'text-blue-300'
          }`}
        >
          Welcome back,{' '}
          <span
            className={`underline decoration-4 ${
              theme === 'dark' ? '' : 'decoration-blue-300'
            }`}
          >
            {userName}
          </span>
          !
        </h1>

        <p
          className={`text-lg md:text-xl font-light max-w-xl mx-auto leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          We’re thrilled to have you here. This dashboard is your personal control center to explore your fitness journey, track progress, and stay connected with the community.
        </p>

        <p
          className={`italic font-medium animate-pulse ${
            theme === 'dark' ? 'text-cyan-300' : 'text-blue-400'
          }`}
        >
          Remember, every step forward is a step toward a healthier, stronger you. Let’s make today count!
        </p>

        <div className="mt-8">
          <Link
            className={`px-8 py-3 rounded-full font-semibold shadow-lg transition duration-300 ease-in-out transform hover:scale-105 ${
              theme === 'dark'
                ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
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
