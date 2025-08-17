import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { motion as Motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import Loaging from '../../loagind/Loaging';
import useAxios from '../../hooks/useAxios';
import { ThemeContext } from '../../contexts/ThemeContext';

const AllTrainers = () => {
  const { theme } = useContext(ThemeContext);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState('ageAsc'); // default sort

  const fetchTrainers = async () => {
    const res = await axiosInstance.get('/trainers');
    return res.data;
  };

  const { data: trainers = [], isLoading, isError } = useQuery({
    queryKey: ['trainers'],
    queryFn: fetchTrainers,
  });

  if (isLoading) return <Loaging />;
  if (isError)
    return <div className="text-center text-red-500 py-10">Failed to load trainers.</div>;

  // Sorting function
  const sortedTrainers = [...trainers].sort((a, b) => {
    switch (sortOption) {
      case 'ageAsc':
        return (a.age || 0) - (b.age || 0);
      case 'ageDesc':
        return (b.age || 0) - (a.age || 0);
       case 'timeAsc':
      return String(a.availableTime || '').localeCompare(String(b.availableTime || ''));
    case 'timeDesc':
      return String(b.availableTime || '').localeCompare(String(a.availableTime || ''));
    default:
      return 0;
    }
  });

  // Theme-based classes
  const sectionBg = theme === 'dark' ? 'bg-[#0D0D0D]' : 'bg-sky-100';
  const cardBg = theme === 'dark' ? 'bg-[#1f1f1f]/60 text-white' : 'bg-white text-gray-900';
  const borderColor = theme === 'dark' ? 'border-[#A259FF]/30' : 'border-sky-300/30';
  const nameColor = theme === 'dark' ? 'text-[#00F0FF]' : 'text-sky-600';
  const socialHover = theme === 'dark' ? '#00F0FF' : '#0ea5e9';
  const buttonGradient = theme === 'dark' ? 'from-[#A259FF] to-[#00F0FF]' : 'from-sky-400 to-sky-600';
  const textGray = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const textItalic = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';

  return (
    <section className={`${sectionBg} py-16 px-6 md:px-12 min-h-screen`}>
      <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-[#A259FF] via-[#00F0FF] to-[#A259FF] bg-clip-text text-transparent animate-pulse">
        Meet Our Trainers
      </h2>

      
      <div className="flex justify-end mb-6 max-w-7xl mx-auto">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 rounded border"
        >
          <option value="ageAsc">Age: Low → High</option>
          <option value="ageDesc">Age: High → Low</option>
          <option value="timeAsc">Available Time: Early → Late</option>
          <option value="timeDesc">Available Time: Late → Early</option>
        </select>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {sortedTrainers.map((trainer, idx) => (
          <Motion.div
            key={trainer.email}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, rotateX: 3, rotateY: 3 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className={`relative group p-6 rounded-2xl backdrop-blur-xl border-2 ${borderColor} shadow-xl overflow-hidden flex flex-col items-center text-center ${cardBg}`}
          >
            <img
              src={trainer.profileImage || '/default-profile.png'}
              alt={trainer.fullName}
              className="w-32 h-32 rounded-full object-cover shadow-lg mb-4 transition-transform group-hover:scale-110"
            />
            <h3 className={`text-xl font-semibold mb-1 ${nameColor}`}>{trainer.fullName}</h3>
            <p className={`text-sm mb-3 ${textGray}`}>Age: <span className="font-medium">{trainer.age || 'N/A'}</span></p>
            <p className={`text-sm mb-3 ${textGray}`}>Experience: <span className="font-medium">{trainer.yearsOfExperience ?? 'N/A'} yrs</span></p>
            <p className={`text-sm mb-3 ${textGray}`}>Available: <span className="font-medium">{trainer.availableDays?.join(', ') || 'N/A'} at {trainer.availableTime || 'N/A'}</span></p>
            {trainer.otherInfo && <p className={`text-sm italic mb-5 max-w-[260px] ${textItalic}`}>{trainer.otherInfo}</p>}
            <button
              onClick={() => navigate(`/trainer/${trainer._id}`)}
              className={`mt-auto bg-gradient-to-r ${buttonGradient} hover:from-[#7F3FFF] hover:to-[#00D4D4] text-white py-2 px-6 rounded-full font-semibold shadow-lg hover:shadow-[${socialHover}]/70 transition duration-300`}
            >
              Know More
            </button>
          </Motion.div>
        ))}
      </div>
    </section>
  );
};

export default AllTrainers;
