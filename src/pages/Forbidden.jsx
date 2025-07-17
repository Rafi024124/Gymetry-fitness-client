import React from 'react';
import { Link } from 'react-router';
import { FaLock } from 'react-icons/fa';

const Forbidden = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <FaLock className="text-6xl text-red-500 mb-6" />
      <h1 className="text-4xl font-bold mb-4">403 - Forbidden</h1>
      <p className="text-lg text-gray-300 mb-6">🚫 You don’t have permission to access this page.</p>
      <Link
        to="/"
        className="px-6 py-2 bg-teal-600 hover:bg-teal-700 transition rounded-md text-white font-semibold"
      >
        🔙 Go Home
      </Link>
    </div>
  );
};

export default Forbidden;
