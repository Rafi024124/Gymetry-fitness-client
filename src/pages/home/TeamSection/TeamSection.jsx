import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { motion as Motion } from 'framer-motion';
import { FaUserTie, FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const TeamSection = () => {
  const axiosSecure = useAxiosSecure();

  const { data: trainers = [], isLoading, error } = useQuery({
    queryKey: ['trainers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/trainers');
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center text-white py-10">Loading team...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Error loading team</p>;

  const team = trainers.slice(0, 3);

  return (
    <section className="bg-[#0D0D0D] py-20 px-4 md:px-10 overflow-hidden">
      {/* Neon Heading */}
      <Motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-[#A259FF] via-[#00F0FF] to-[#A259FF] bg-clip-text text-transparent animate-pulse"
      >
        <FaUserTie className="inline text-[#00F0FF] mr-2 mb-1" />
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
            className="relative group p-6 rounded-3xl bg-[#1f1f1f]/60 text-white shadow-lg border border-[#A259FF]/30 backdrop-blur-xl overflow-hidden"
          >
            {/* Glowing border ring on hover */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#00F0FF] group-hover:shadow-[0_0_30px_#00F0FF] transition-all duration-500 pointer-events-none"></div>

            <img
              src={trainer.profileImage || '/default-avatar.png'}
              alt={trainer.fullName}
              className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-[#00F0FF]/50 mb-4 shadow-xl"
            />

            <h3 className="text-2xl font-semibold text-center text-[#00F0FF]">{trainer.fullName}</h3>

            <p className="text-center text-gray-300 text-sm mt-2 min-h-[48px] px-2">
              {trainer.otherInfo || 'Passionate about helping people transform their lives.'}
            </p>

            <p className="text-center mt-4 text-sm text-blue-400">
              <strong>Skills:</strong> {trainer.skills?.join(', ') || 'N/A'}
            </p>

            {/* Social Icons */}
            <div className="flex justify-center mt-6 gap-4 text-[#A259FF] group-hover:text-[#00F0FF] transition-colors duration-300">
              <a href="#" className="hover:scale-110"><FaFacebookF /></a>
              <a href="#" className="hover:scale-110"><FaLinkedinIn /></a>
              <a href="#" className="hover:scale-110"><FaTwitter /></a>
            </div>

            {/* Glowing effect ring */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-52 h-52 bg-[#00F0FF]/10 blur-2xl rounded-full pointer-events-none group-hover:opacity-80 transition-opacity duration-500"></div>
          </Motion.div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
