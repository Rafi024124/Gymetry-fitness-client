import React, { useContext, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../contexts/authContext/AuthContext';
import Loaging from '../../../../loagind/Loaging';

const TrainerDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState(null);

  const trainerEmail = user?.email;

  const {
    data: slots = [],
    isLoading,
  } = useQuery({
    queryKey: ['trainerSlots', trainerEmail],
    enabled: !!trainerEmail,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/slots?trainerEmail=${encodeURIComponent(trainerEmail)}`);
        return res.data;
      } catch (error) {
        console.error('Failed to fetch slots:', error);
        throw new Error('Unable to fetch trainer slots');
      }
    },
  });

  const {
    data: bookingCount = 0,
    isLoading: isBookingCountLoading,
  } = useQuery({
    queryKey: ['trainerBookingCount', trainerEmail],
    enabled: !!trainerEmail,
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainer-bookings-count?email=${trainerEmail}`);
      return res.data.count;
    },
  });

  const handleDelete = async (slotId) => {
    const confirm = window.confirm('Are you sure you want to delete this slot?');
    if (!confirm) return;

    try {
      setDeletingId(slotId);
      await axiosSecure.delete(`/slots/${slotId}`);
      await queryClient.invalidateQueries(['trainerSlots']);
    } catch (error) {
      console.error('Failed to delete slot:', error);
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading || isBookingCountLoading) return <Loaging />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 text-white font-sans">
      <h2 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#A259FF] drop-shadow-lg">
        Welcome, {user?.displayName || 'Trainer'}
      </h2>

      <div className="mb-8 flex flex-wrap gap-6 justify-start items-center">
        <div className="bg-[#111827] rounded-lg p-6 shadow-lg flex flex-col items-center w-48">
          <p className="text-sm uppercase tracking-wide text-gray-400 mb-1">Total Bookings</p>
          <p className="text-3xl font-bold text-[#FFD700]">{bookingCount}</p>
        </div>

        <div className="bg-[#111827] rounded-lg p-6 shadow-lg flex flex-col items-center w-48">
          <p className="text-sm uppercase tracking-wide text-gray-400 mb-1">Available Slots</p>
          <p className="text-3xl font-bold text-[#00F0FF]">
            {slots.filter((s) => !s.booked).length}
          </p>
        </div>

        <div className="bg-[#111827] rounded-lg p-6 shadow-lg flex flex-col items-center w-48">
          <p className="text-sm uppercase tracking-wide text-gray-400 mb-1">Booked Slots</p>
          <p className="text-3xl font-bold text-[#FF6F91]">{slots.filter((s) => s.booked).length}</p>
        </div>
      </div>

      {slots.length === 0 ? (
        <p className="text-yellow-400 text-lg font-medium">
          No slots available. Please add some slots.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-700">
          <table className="min-w-full table-fixed text-center">
            <thead className="bg-gradient-to-r from-[#00F0FF] to-[#A259FF] text-white uppercase tracking-wider">
              <tr>
                {['Slot Name', 'Slot Time', 'Days', 'Booked', 'Booked By', 'Actions'].map((title) => (
                  <th key={title} className="py-3 px-4 font-semibold drop-shadow-md">
                    {title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {slots.map((slot) => (
                <tr key={slot._id} className="hover:bg-gray-700 transition-colors duration-300">
                  <td className="py-3 px-4 font-medium">{slot.slotName}</td>
                  <td className="py-3 px-4">{slot.slotTime}</td>
                  <td className="py-3 px-4">{slot.availableDays?.join(', ')}</td>
                  <td className="py-3 px-4">
                    {slot.booked ? (
                      <span className="text-[#00F0FF] font-semibold">Yes</span>
                    ) : (
                      <span className="text-[#FFD700] font-semibold">No</span>
                    )}
                  </td>
                  <td className="py-3 px-4 space-y-1">
                    {slot.booked ? (
                      <>
                        <p className="font-semibold">{slot.bookedBy || 'Unknown'}</p>
                        <p className="text-xs text-gray-300">{slot.bookedByEmail || 'N/A'}</p>
                      </>
                    ) : (
                      <span className="text-gray-400 italic">N/A</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {!slot.booked && (
                      <button
                        onClick={() => handleDelete(slot._id)}
                        disabled={deletingId === slot._id}
                        className={`px-4 py-1 rounded-lg font-semibold transition-colors duration-300 ${
                          deletingId === slot._id
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-red-600 hover:bg-red-700'
                        }`}
                      >
                        {deletingId === slot._id ? 'Deleting...' : 'Delete'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TrainerDashboardHome;
