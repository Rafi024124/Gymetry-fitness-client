import React from 'react';
import { FaDumbbell } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#1F1F1F]">
      <div className="text-6xl text-[#A259FF] animate-shake">
        <FaDumbbell />
      </div>
    </div>
  );
};

export default Loading;
