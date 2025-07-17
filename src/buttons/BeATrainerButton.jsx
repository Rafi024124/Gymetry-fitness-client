import React, { useContext } from 'react';
import { MdPersonAddAlt } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { AuthContext } from '../contexts/authContext/AuthContext';


const BeATrainerButton = ({
  label = 'Be a Trainer',
  to = '/be-a-trainer',
  className = '',
}) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleClick = () => {
    if (user) {
      navigate(to);
    } else {
      // Redirect to login, but remember the target page
      navigate('/login', { state: { from: to } });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-5 py-2.5 mt-4 rounded-full bg-gradient-to-r from-[#A259FF] to-[#00F0FF] text-black font-semibold shadow-[0_0_10px_#A259FF] hover:shadow-[0_0_20px_#A259FF] transition-all duration-300 ${className}`}
    >
      <MdPersonAddAlt className="text-lg" />
      {label}
    </button>
  );
};

export default BeATrainerButton;
