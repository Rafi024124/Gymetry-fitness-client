import React, { useContext } from 'react';
import { FaDumbbell } from 'react-icons/fa';
import { ThemeContext } from '../contexts/ThemeContext';


const Loaging = () => {
  const { theme } = useContext(ThemeContext);

  const bgColor = theme === 'dark' ? 'bg-[#1F1F1F]' : 'bg-sky-100';
  const spinnerColor = theme === 'dark' ? 'text-gray-400' : 'text-blue-600';

  return (
    <div className={`flex justify-center items-center h-screen ${bgColor}`}>
      <div className={`text-6xl ${spinnerColor} dumbbell-spinner`}>
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
