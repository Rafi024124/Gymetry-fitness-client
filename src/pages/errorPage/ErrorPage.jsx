import React from "react";
import { Link } from "react-router";
import { AiOutlineHome } from "react-icons/ai";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#0D0D0D] px-4">
      <h1 className="text-[8rem] font-extrabold text-[#A259FF] neon-text mb-6 select-none">
        404
      </h1>
      <h2 className="text-3xl text-[#A259FF] font-bold mb-4 neon-text">
        Oops! Page Not Found
      </h2>
      <p className="text-[#ccc] mb-8 max-w-md text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#A259FF] to-[#00F0FF] text-[#0D0D0D] font-semibold rounded-md shadow-glow hover:brightness-110 transition"
      >
        <AiOutlineHome size={20} />
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
