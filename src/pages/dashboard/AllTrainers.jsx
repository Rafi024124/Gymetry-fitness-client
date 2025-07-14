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
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-[#A259FF] text-center">Meet Our Trainers</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer) => (
            <div
              key={trainer._id}
              className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col border border-gray-700 transition hover:shadow-purple-700"
            >
              <div className="flex justify-center">
                <img
                  src={trainer.profileImage || '/default-profile.png'}
                  alt={trainer.fullName}
                  className="w-32 h-32 object-cover rounded-full border-2 border-[#A259FF] shadow mb-4"
                />
              </div>

              <h3 className="text-xl font-semibold text-white text-center">{trainer.fullName}</h3>

              <p className="text-sm text-gray-400 text-center mb-3">
                <span className="font-semibold text-[#A259FF]">Experience:</span>{' '}
                {trainer.yearsOfExperience ?? 'N/A'} years
              </p>

              <div className="flex justify-center items-center gap-4 mb-4">
                {trainer.socialLinks?.facebook && (
                  <a
                    href={trainer.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaFacebookF size={18} />
                  </a>
                )}
                {trainer.socialLinks?.instagram && (
                  <a
                    href={trainer.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:text-pink-700"
                  >
                    <FaInstagram size={18} />
                  </a>
                )}
                {trainer.socialLinks?.linkedin && (
                  <a
                    href={trainer.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-600"
                  >
                    <FaLinkedinIn size={18} />
                  </a>
                )}
              </div>

              <p className="text-sm text-gray-300 mb-2 text-center">
                <span className="font-semibold text-[#A259FF]">Available:</span>{' '}
                {trainer.availableDays?.join(', ') || 'N/A'} at {trainer.availableTime || 'N/A'}
              </p>

              {trainer.otherInfo && (
                <p className="text-sm text-gray-400 italic text-center mb-4">
                  {trainer.otherInfo}
                </p>
              )}

              <button
                onClick={() => navigate(`/trainers/${trainer._id}`)}
                className="mt-auto bg-[#A259FF] hover:bg-purple-600 text-white py-2 rounded-md font-semibold transition"
              >
                Know More
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTrainers;
