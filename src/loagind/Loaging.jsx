import React from 'react';
import { FaDumbbell } from 'react-icons/fa';

const Loaging = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#1F1F1F]">
      <div className="text-6xl text-gray-400 dumbbell-spinner">
        <FaDumbbell />
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .dumbbell-spinner {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Loaging;
