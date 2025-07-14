import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { useNavigate } from 'react-router';

import Loading from '../../loagind/Loaging';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllTrainers = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const fetchTrainers = async () => {
    const res = await axiosSecure.get('/trainers');
    return res.data;
  };

  const { data: trainers = [], isLoading, isError } = useQuery({
    queryKey: ['trainers'],
    queryFn: fetchTrainers,
  });

  if (isLoading) return <Loading />;
  if (isError) return <div className="text-center text-red-500 py-10">Failed to load trainers.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-[#A259FF]">All Trainers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trainers.map((trainer) => (
          <div
            key={trainer._id}
            className="bg-[#1F1F1F] rounded-xl shadow-md p-6 flex flex-col"
          >
            <img
              src={trainer.profileImage || '/default-profile.png'}
              alt={trainer.fullName}
              className="w-40 h-40 object-cover rounded-full mb-4"
            />

            <h3 className="text-xl font-semibold mb-1 text-white">{trainer.fullName}</h3>

            <p className="text-gray-400 mb-2">
              <span className="font-semibold text-[#A259FF]">Experience:</span>{' '}
              {trainer.yearsOfExperience ?? 'N/A'} years
            </p>

            <div className="flex items-center gap-4 mb-3">
              {trainer.socialLinks?.facebook && (
                <a
                  href={trainer.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={20} />
                </a>
              )}
              {trainer.socialLinks?.instagram && (
                <a
                  href={trainer.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-700"
                  aria-label="Instagram"
                >
                  <FaInstagram size={20} />
                </a>
              )}
              {trainer.socialLinks?.linkedin && (
                <a
                  href={trainer.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-900"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={20} />
                </a>
              )}
            </div>

            <p className="mb-2 text-gray-400">
              <span className="font-semibold text-[#A259FF]">Available Slots:</span>{' '}
              {trainer.availableDays?.join(', ') || 'N/A'} at {trainer.availableTime || 'N/A'}
            </p>

            {trainer.otherInfo && (
              <p className="mb-4 text-gray-300 italic">{trainer.otherInfo}</p>
            )}

            <button
              onClick={() => navigate(`/trainers/${trainer._id}`)}
              className="mt-auto bg-[#A259FF] hover:bg-[#9333ea] text-white py-2 rounded font-semibold transition"
            >
              Know More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTrainers;
