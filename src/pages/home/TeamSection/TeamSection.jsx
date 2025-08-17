import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { motion as Motion } from 'framer-motion';
import { FaUserTie, FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { ThemeContext } from '../../../contexts/ThemeContext';

const TeamSection = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const { data: trainers = [], isLoading, error } = useQuery({
    queryKey: ['trainers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/trainers');
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading team...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Error loading team</p>;

  const team = trainers.slice(0, 3);

  // Theme-based styles
  const sectionBg = theme === 'dark' ? 'bg-[#0D0D0D]' : 'bg-sky-100';
  const headingText = theme === 'dark'
    ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#A259FF] via-[#00F0FF] to-[#A259FF]'
    : 'text-sky-700';
  const cardBg = theme === 'dark'
    ? 'bg-[#1f1f1f]/60 text-white border border-[#A259FF]/30 backdrop-blur-xl shadow-lg'
    : 'bg-white/80 text-gray-800 border border-gray-300 backdrop-blur-md shadow-md';
  const textSecondary = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const skillText = theme === 'dark' ? 'text-blue-400' : 'text-sky-600';
  const iconColor = theme === 'dark' ? '#A259FF' : '#3b82f6';
  const hoverIconColor = theme === 'dark' ? '#00F0FF' : '#0ea5e9';
  const buttonGradient = theme === 'dark' ? 'from-[#A259FF] to-[#00F0FF]' : 'from-sky-400 to-sky-600';
  const glowRing = theme === 'dark'
    ? 'bg-[#00F0FF]/10'
    : 'bg-sky-400/20';

  return (
    <section className={`${sectionBg} py-20 px-4 md:px-10 overflow-hidden`}>
      <Motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={`text-4xl md:text-5xl font-extrabold text-center mb-16 animate-pulse ${headingText}`}
      >
        <FaUserTie className={`inline mr-2 mb-1 ${theme === 'dark' ? 'text-[#00F0FF]' : 'text-sky-500'}`} />
        Meet Our Elite Trainers
      </Motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {team.map((trainer, idx) => (
          <Motion.div
            key={trainer._id}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, rotateX: 4, rotateY: 2 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className={`relative group p-6 rounded-3xl ${cardBg} overflow-hidden flex flex-col items-center text-center`}
          >
            {/* Hover border glow */}
            <div className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#00F0FF] group-hover:shadow-[0_0_30px_#00F0FF] transition-all duration-500 pointer-events-none`}></div>

            <img
              src={trainer.profileImage || '/default-avatar.png'}
              alt={trainer.fullName}
              className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-[#00F0FF]/50 mb-4 shadow-xl"
            />

            <h3 className={`text-2xl font-semibold text-center ${theme === 'dark' ? 'text-[#00F0FF]' : 'text-sky-700'}`}>
              {trainer.fullName}
            </h3>

            <p className={`text-center text-sm mt-2 min-h-[48px] px-2 ${textSecondary}`}>
              {trainer.otherInfo || 'Passionate about helping people transform their lives.'}
            </p>

            <p className={`text-center mt-4 text-sm ${skillText}`}>
              <strong>Skills:</strong> {trainer.skills?.join(', ') || 'N/A'}
            </p>

            {/* Know More Button */}
            <button
              onClick={() => navigate(`/trainer/${trainer._id}`)}
              className={`mt-2 mb-4 bg-gradient-to-r ${buttonGradient} hover:from-[#7F3FFF] hover:to-[#00D4D4] text-white py-2 px-6 rounded-full font-semibold shadow-lg hover:shadow-[${hoverIconColor}]/70 transition duration-300`}
            >
              Know More
            </button>

            {/* Social Icons */}
            <div className="flex justify-center mt-2 gap-4 transition-colors duration-300">
              <a href="#" className={`hover:scale-110 text-[${iconColor}] group-hover:text-[${hoverIconColor}]`}><FaFacebookF /></a>
              <a href="#" className={`hover:scale-110 text-[${iconColor}] group-hover:text-[${hoverIconColor}]`}><FaLinkedinIn /></a>
              <a href="#" className={`hover:scale-110 text-[${iconColor}] group-hover:text-[${hoverIconColor}]`}><FaTwitter /></a>
            </div>

            {/* Glow */}
            <div className={`absolute -bottom-12 left-1/2 -translate-x-1/2 w-52 h-52 ${glowRing} blur-2xl rounded-full pointer-events-none group-hover:opacity-80 transition-opacity duration-500`}></div>
          </Motion.div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
