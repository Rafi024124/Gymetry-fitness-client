import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../contexts/authContext/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaStar, FaMoneyBillWave, FaUserTie, FaClock, FaChalkboardTeacher, FaTimes } from 'react-icons/fa';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { format } from 'date-fns';
import Loaging from '../../../loagind/Loaging';
import Swal from 'sweetalert2';

const BookedTrainers = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['bookedTrainers', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleReviewSubmit = async () => {
    if (!feedback || rating === 0) {
      return Swal.fire('Error', 'Please provide feedback and rating.', 'error');
    }

    try {
      await axiosSecure.post('/reviews', {
        trainerId: selectedBooking.trainerId,
        trainerName: selectedBooking.trainerName,
        className: selectedBooking.className,
        slot: selectedBooking.slot,
        memberName: user.displayName,
        memberEmail: user.email,
        feedback,
        rating,
        submittedAt: new Date(),
      });
      Swal.fire('Success!', 'Review submitted successfully.', 'success');
      setSelectedBooking(null);
      setFeedback('');
      setRating(0);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to submit review.', 'error');
    }
  };

  if (isLoading) {
    return <Loaging />;
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
              <span>
                <strong>Slot:</strong> {`${booking.slot?.slotName || 'N/A'} (${booking.slot?.slotTime || 'N/A'})`}
              </span>
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

            <button
              onClick={() => setSelectedBooking(booking)}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              <FaStar /> Leave a Review
            </button>
          </div>
        ))}
      </div>

      {/* Modal for Review */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-2 right-2 text-red-400 hover:text-red-600"
            >
              <FaTimes />
            </button>
            <h3 className="text-xl font-bold mb-4 text-center">
              Review for {selectedBooking.trainerName}
            </h3>

            <textarea
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white mb-4"
              rows="4"
              placeholder="Write your feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`text-2xl cursor-pointer ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-500'
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            <button
              onClick={handleReviewSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookedTrainers;
