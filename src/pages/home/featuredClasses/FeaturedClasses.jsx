import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaStar, FaUsers } from 'react-icons/fa';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { motion as Motion } from 'framer-motion';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loaging from '../../../loagind/Loaging';
import { ThemeContext } from '../../../contexts/ThemeContext';


const FeaturedClasses = () => {
  const { theme } = useContext(ThemeContext); // use theme context
  const axiosSecure = useAxiosSecure();

  const { data: featuredClasses = [], isLoading, error } = useQuery({
    queryKey: ['featured-classes'],
    queryFn: async () => {
      const res = await axiosSecure.get('/featured-classes');
      return res.data;
    },
  });

  if (isLoading) return <Loaging />;
  if (error) return <div className="text-center text-red-500 py-10">Failed to load featured classes.</div>;

  // Set colors based on theme
  const sectionBg = theme === 'dark' ? 'bg-[#0D0D0D]' : 'bg-white';
  const cardBg = theme === 'dark' ? 'bg-[#1f1f1f]/60 border-[#A259FF]/30 shadow-xl' 
                                 : 'bg-sky-100/60 border-sky-400/30 shadow-[0_0_20px_#38BDF8AA]';
  const titleColor = theme === 'dark' ? 'text-[#00F0FF]' : 'text-sky-700';
  const descColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-800';
  const glowRing = theme === 'dark' ? 'bg-[#00F0FF]/10' : 'bg-sky-400/20';
  const headingText = theme === 'dark' 
    ? 'bg-gradient-to-r from-[#A259FF] via-[#00F0FF] to-[#A259FF] text-transparent bg-clip-text animate-pulse'
    : 'text-sky-700';

  return (
    <section className={`${sectionBg} py-20 px-4 md:px-10 overflow-hidden`}>
      {/* Neon / Sky Heading */}
      <Motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={`text-4xl font-extrabold text-center mb-16 ${headingText}`}
      >
        <FaStar className={`inline mr-2 mb-1 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'}`} />
        Featured Classes
      </Motion.h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {featuredClasses.map((cls, idx) => (
          <Motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className={`relative group p-6 rounded-2xl backdrop-blur-xl border-2 ${cardBg} text-center overflow-hidden`}
          >
            {/* Glowing border ring */}
            <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-${theme === 'dark' ? '#00F0FF' : '#38BDF8'} group-hover:shadow-[0_0_25px_${theme === 'dark' ? '#00F0FF' : '#38BDF8'}] transition-all duration-500 pointer-events-none`}></div>

            {/* Title */}
            <h3 className={`text-2xl font-semibold mb-3 flex items-center gap-2 ${titleColor}`}>
              <GiWeightLiftingUp className={`text-3xl ${theme === 'dark' ? 'text-orange-400' : 'text-orange-500'}`} />
              {cls.className}
            </h3>
            <img src={cls.image} alt="" className="rounded-xl mb-3" />

            {/* Description */}
            <p className={`text-sm mb-4 min-h-[64px] ${descColor}`}>
              {cls.description || 'Join this high-demand class and level up your fitness journey!'}
            </p>

            {/* Booking Info */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaUsers className="text-blue-400" />
              <span>{cls.bookingCount} Bookings</span>
            </div>

            {/* Glow ring on bottom */}
            <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-40 blur-2xl rounded-full pointer-events-none group-hover:opacity-80 transition-opacity duration-500 ${glowRing}`}></div>
          </Motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedClasses;
