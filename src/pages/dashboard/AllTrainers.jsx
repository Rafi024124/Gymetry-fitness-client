import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { motion as Motion } from 'framer-motion';
import { useNavigate } from 'react-router';

import Loaging from '../../loagind/Loaging';
import useAxios from '../../hooks/useAxios';

const AllTrainers = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();

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
    return (
      <div className="text-center text-red-500 py-10">Failed to load trainers.</div>
    );

  return (
    <section className="bg-[#0D0D0D] py-16 px-6 md:px-12 min-h-screen">
      <h2 className="text-4xl font-extrabold text-center mb-14 bg-gradient-to-r from-[#A259FF] via-[#00F0FF] to-[#A259FF] bg-clip-text text-transparent animate-pulse">
        Meet Our Trainers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {trainers.map((trainer, idx) => (
          <Motion.div
            key={trainer._id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, rotateX: 3, rotateY: 3 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="relative group bg-[#1f1f1f]/60 text-white p-6 rounded-2xl backdrop-blur-xl border border-[#A259FF]/30 shadow-xl overflow-hidden flex flex-col items-center text-center"
          >
            {/* Glowing border ring */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#00F0FF] group-hover:shadow-[0_0_25px_#00F0FF] transition-all duration-500 pointer-events-none"></div>

            {/* Profile Image */}
            <img
              src={trainer.profileImage || '/default-profile.png'}
              alt={trainer.fullName}
              className="w-32 h-32 rounded-full object-cover  shadow-lg mb-4 transition-transform group-hover:scale-110"
            />

            {/* Name */}
            <h3 className="text-xl font-semibold mb-1 text-[#00F0FF]">{trainer.fullName}</h3>

            {/* Experience */}
            <p className="text-sm text-gray-300 mb-3">
              Experience: <span className="font-medium">{trainer.yearsOfExperience ?? 'N/A'} yrs</span>
            </p>

            {/* Social Links */}
            <div className="flex gap-6 mb-4">
              {trainer.socialLinks?.facebook && (
                <a
                  href={trainer.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3b5998] hover:text-[#00F0FF] transition-shadow duration-300 shadow-[0_0_8px_#3b5998] hover:shadow-[0_0_20px_#00F0FF] rounded-full p-2"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={18} />
                </a>
              )}
              {trainer.socialLinks?.instagram && (
                <a
                  href={trainer.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E1306C] hover:text-[#00F0FF] transition-shadow duration-300 shadow-[0_0_8px_#E1306C] hover:shadow-[0_0_20px_#00F0FF] rounded-full p-2"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
              )}
              {trainer.socialLinks?.linkedin && (
                <a
                  href={trainer.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0077b5] hover:text-[#00F0FF] transition-shadow duration-300 shadow-[0_0_8px_#0077b5] hover:shadow-[0_0_20px_#00F0FF] rounded-full p-2"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={18} />
                </a>
              )}
            </div>

            {/* Availability */}
            <p className="text-sm text-gray-300 mb-4">
              Available: <span className="font-medium">{trainer.availableDays?.join(', ') || 'N/A'}</span> at{' '}
              <span className="font-medium">{trainer.availableTime || 'N/A'}</span>
            </p>

            {/* Other Info */}
            {trainer.otherInfo && (
              <p className="text-sm text-gray-400 italic mb-5 max-w-[260px]">{trainer.otherInfo}</p>
            )}

            {/* Button */}
            <button
              onClick={() => navigate(`/trainer/${trainer._id}`)}
              className="mt-auto bg-gradient-to-r from-[#A259FF] to-[#00F0FF] hover:from-[#7F3FFF] hover:to-[#00D4D4] text-white py-2 px-6 rounded-full font-semibold shadow-lg hover:shadow-[#00F0FF]/70 transition duration-300"
            >
              Know More
            </button>

            {/* Glow ring on bottom */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#00F0FF]/10 blur-2xl rounded-full pointer-events-none group-hover:opacity-80 transition-opacity duration-500"></div>
          </Motion.div>
        ))}
      </div>
    </section>
  );
};

export default AllTrainers;
