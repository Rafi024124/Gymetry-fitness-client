import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaStar, FaUsers } from 'react-icons/fa';
import { GiWeightLiftingUp } from 'react-icons/gi';
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

  if (isLoading) {
    return <Loaging />;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Failed to load featured classes.</div>;
  }

  return (
    <section className="bg-[#0D0D0D] py-16 px-4 md:px-10 rounded-lg">
      <h2 className="text-4xl font-bold text-center neon-text mb-12">
        <FaStar className="inline text-yellow-400 mr-2" />
        Featured Classes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {featuredClasses.map((cls, idx) => (
          <div
            key={idx}
            className="bg-gray-800 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
          >
            {/* Class Title with Icon */}
            <h3 className="text-3xl font-bold neon-text mb-2 flex items-center gap-2">
              <GiWeightLiftingUp className="text-orange-400" />
              {cls.className}
            </h3>

            {/* Description */}
            <p className="text-gray-400 mb-4">
              {cls.description || 'Join this high-demand class and level up your fitness journey!'}
            </p>

            {/* Booking Count */}
            <p className="flex items-center gap-2 text-sm text-gray-300">
              <FaUsers className="text-blue-400" />
              <span>{cls.bookingCount} Bookings</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedClasses;
