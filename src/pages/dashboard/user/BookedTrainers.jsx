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
      Swal.fire({
          icon: "success",
          title: "Success",
          text: "Review Submitted Successfully",
          background: "#0f0f0f",
          color: "#F2F2F2",
          confirmButtonColor: "#007a7a",
        });
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
    return <div className="text-center text-white mt-10 text-xl font-semibold">You haven’t booked any trainers yet.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#00F0FF] to-[#A259FF] bg-clip-text text-transparent">
        Your Booked Trainers
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-[#121212] p-6 rounded-2xl shadow-lg border border-[#2a2a2a] hover:shadow-[0_0_25px_#00f0ff44] transition-all duration-300"
          >
            <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <FaUserTie className="text-blue-400" />
              {booking.trainerName}
            </h3>

            <div className="space-y-2 text-sm text-gray-300">
              <p className="flex items-center gap-2"><FaChalkboardTeacher className="text-green-400" /><span><strong>Class:</strong> {booking.className || 'N/A'}</span></p>
              <p className="flex items-center gap-2"><FaClock className="text-yellow-400" /><span><strong>Slot:</strong> {`${booking.slot?.slotName || 'N/A'} (${booking.slot?.slotTime || 'N/A'})`}</span></p>
              <p className="flex items-center gap-2"><HiOutlineDocumentText className="text-pink-400" /><span><strong>Package:</strong> {booking.packageName}</span></p>
              <p className="flex items-center gap-2"><FaMoneyBillWave className="text-green-300" /><span><strong>Price:</strong> ${booking.price}</span></p>
              <p className="flex items-center gap-2"><FaClock className="text-indigo-300" /><span><strong>Paid At:</strong> {format(new Date(booking.paidAt), 'PPpp')}</span></p>
            </div>

            <button
              onClick={() => setSelectedBooking(booking)}
              className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition"
            >
              <FaStar className="inline mr-2" /> Leave a Review
            </button>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] rounded-xl p-6 w-full max-w-md text-white relative shadow-[0_0_40px_#00f0ff33]">
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-3 right-3 text-red-400 hover:text-red-500 text-xl"
            >
              <FaTimes />
            </button>
            <h3 className="text-2xl font-semibold mb-4 text-center text-blue-400">
              Review for {selectedBooking.trainerName}
            </h3>

            <textarea
              className="w-full bg-[#111] border border-gray-700 rounded-lg p-3 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Write your feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <div className="flex justify-center gap-2 mb-5">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`text-2xl cursor-pointer transition ${
                    star <= rating ? 'text-yellow-400 scale-110' : 'text-gray-600'
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            <button
              onClick={handleReviewSubmit}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 font-semibold"
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
