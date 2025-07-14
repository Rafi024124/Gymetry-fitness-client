import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../contexts/authContext/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaStar, FaMoneyBillWave, FaUserTie, FaClock, FaChalkboardTeacher } from 'react-icons/fa';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { format } from 'date-fns';

const BookedTrainers = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['bookedTrainers', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <div className="text-center text-white mt-10">Loading your booked trainers...</div>;
  }

  if (bookings.length === 0) {
    return <div className="text-center text-white mt-10">You haven’t booked any trainers yet.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
       <h2 className="text-3xl md:text-4xl font-bold text-center text-gradient bg-gradient-to-r from-[#A259FF] to-[#00F0FF] bg-clip-text text-transparent mb-10">
        Your Booked Trainers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-gray-800 text-white p-6 rounded-xl shadow-md border border-gray-700 hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-bold flex items-center gap-2 mb-4">
              <FaUserTie className="text-blue-400" />
              {booking.trainerName}
            </h3>

            <p className="mb-1 flex items-center gap-2">
              <FaChalkboardTeacher className="text-green-400" />
              <span><strong>Class:</strong> {booking.className || 'N/A'}</span>
            </p>

            <p className="mb-1 flex items-center gap-2">
              <FaClock className="text-yellow-400" />
              <span><strong>Slot:</strong> {booking.slot}</span>
            </p>

            <p className="mb-1 flex items-center gap-2">
              <HiOutlineDocumentText className="text-pink-400" />
              <span><strong>Package:</strong> {booking.packageName}</span>
            </p>

            <p className="mb-1 flex items-center gap-2">
              <FaMoneyBillWave className="text-green-300" />
              <span><strong>Price:</strong> ${booking.price}</span>
            </p>

            <p className="mb-1 flex items-center gap-2">
              <FaClock className="text-indigo-300" />
              <span><strong>Paid At:</strong> {format(new Date(booking.paidAt), 'PPpp')}</span>
            </p>

            <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              <FaStar /> Leave a Review
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookedTrainers;
