import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaStar, FaUsers } from 'react-icons/fa';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { motion as Motion} from 'framer-motion';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loaging from '../../../loagind/Loaging';

const FeaturedClasses = () => {
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

  return (
    <section className="bg-[#0D0D0D] py-20 px-4 md:px-10 overflow-hidden">
      {/* Neon Heading */}
      <Motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl font-extrabold text-center mb-16 bg-gradient-to-r from-[#A259FF] via-[#00F0FF] to-[#A259FF] bg-clip-text text-transparent animate-pulse"
      >
        <FaStar className="inline text-yellow-400 mr-2 mb-1" />
        Featured Classes
      </Motion.h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {featuredClasses.map((cls, idx) => (
          <Motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="relative group bg-[#1f1f1f]/60 text-white p-6 rounded-2xl backdrop-blur-xl border border-[#A259FF]/30 shadow-xl overflow-hidden"
          >
            {/* Glowing border ring */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#00F0FF] group-hover:shadow-[0_0_25px_#00F0FF] transition-all duration-500 pointer-events-none"></div>

            {/* Title */}
            <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-[#00F0FF]">
              <GiWeightLiftingUp className="text-orange-400 text-3xl" />
              {cls.className}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-300 mb-4 min-h-[64px]">
              {cls.description || 'Join this high-demand class and level up your fitness journey!'}
            </p>

            {/* Booking Info */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaUsers className="text-blue-400" />
              <span>{cls.bookingCount} Bookings</span>
            </div>

            {/* Glow ring on bottom */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#00F0FF]/10 blur-2xl rounded-full pointer-events-none group-hover:opacity-80 transition-opacity duration-500"></div>
          </Motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedClasses;