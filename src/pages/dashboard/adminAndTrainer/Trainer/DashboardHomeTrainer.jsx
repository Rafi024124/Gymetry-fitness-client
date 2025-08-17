import React, { useContext, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../contexts/authContext/AuthContext';
import { ThemeContext } from '../../../../contexts/ThemeContext'; // Add ThemeContext
import Loaging from '../../../../loagind/Loaging';

const TrainerDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // 'dark' or 'light'
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState(null);

  const trainerEmail = user?.email;

  const { data: slots = [], isLoading } = useQuery({
    queryKey: ['trainerSlots', trainerEmail],
    enabled: !!trainerEmail,
    queryFn: async () => {
      const res = await axiosSecure.get(`/slots?trainerEmail=${encodeURIComponent(trainerEmail)}`);
      return res.data;
    },
  });

  const { data: bookingCount = 0, isLoading: isBookingCountLoading } = useQuery({
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
    <div
      className={`min-h-screen p-8 font-sans ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'
          : 'bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 text-black'
      }`}
    >
      <h2
        className={`text-4xl font-extrabold mb-8 drop-shadow-lg bg-clip-text text-transparent ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-[#00F0FF] to-[#2198e7]'
            : 'bg-gradient-to-r from-blue-400 to-[#2198e7]'
        }`}
      >
        Welcome, {user?.displayName || 'Trainer'}
      </h2>

      <div className="mb-8 flex flex-wrap gap-6 justify-start items-center">
        {[
          { label: 'Total Bookings', value: bookingCount, color: theme === 'dark' ? '#FFD700' : '#DAA520' },
          {
            label: 'Available Slots',
            value: slots.filter((s) => !s.booked).length,
            color: theme === 'dark' ? '#00F0FF' : '#1E90FF',
          },
          {
            label: 'Booked Slots',
            value: slots.filter((s) => s.booked).length,
            color: theme === 'dark' ? '#FF6F91' : '#FF4500',
          },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className={`rounded-lg p-6 shadow-lg flex flex-col items-center w-48 ${
              theme === 'dark' ? 'bg-[#111827]' : 'bg-white bg-opacity-90'
            }`}
          >
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm uppercase tracking-wide mb-1`}>
              {label}
            </p>
            <p className="text-3xl font-bold" style={{ color }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {slots.length === 0 ? (
        <p className={theme === 'dark' ? 'text-yellow-400' : 'text-orange-600 text-lg font-medium'}>
          No slots available. Please add some slots.
        </p>
      ) : (
        <div
          className={`overflow-x-auto rounded-lg shadow-lg border ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
          }`}
        >
          <table className="min-w-full table-fixed text-center">
            <thead
              className={`text-white uppercase tracking-wider ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-[#00F0FF] to-[#A259FF]'
                  : 'bg-gradient-to-r from-blue-400 to-[#2198e7]'
              }`}
            >
              <tr>
                {['Slot Name', 'Slot Time', 'Days', 'Booked', 'Booked By', 'Actions'].map((title) => (
                  <th key={title} className="py-3 px-4 font-semibold drop-shadow-md">
                    {title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className={`${theme === 'dark' ? 'bg-gray-800 divide-y divide-gray-700' : 'bg-white divide-y divide-gray-300'}`}>
              {slots.map((slot) => (
                <tr
                  key={slot._id}
                  className={`transition-colors duration-300 ${
                    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <td className="py-3 px-4 font-medium">{slot.slotName}</td>
                  <td className="py-3 px-4">{slot.slotTime}</td>
                  <td className="py-3 px-4">{slot.availableDays?.join(', ')}</td>
                  <td className="py-3 px-4">
                    {slot.booked ? (
                      <span style={{ color: theme === 'dark' ? '#00F0FF' : '#1E90FF' }} className="font-semibold">
                        Yes
                      </span>
                    ) : (
                      <span style={{ color: theme === 'dark' ? '#FFD700' : '#DAA520' }} className="font-semibold">
                        No
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 space-y-1">
                    {slot.booked ? (
                      <>
                        <p className="font-semibold">{slot.bookedBy || 'Unknown'}</p>
                        <p className={theme === 'dark' ? 'text-gray-300 text-xs' : 'text-gray-600 text-xs'}>
                          {slot.bookedByEmail || 'N/A'}
                        </p>
                      </>
                    ) : (
                      <span className={theme === 'dark' ? 'text-gray-400 italic' : 'text-gray-600 italic'}>N/A</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {!slot.booked && (
                      <button
                        onClick={() => handleDelete(slot._id)}
                        disabled={deletingId === slot._id}
                        className={`px-4 py-1 text-white rounded-lg font-semibold transition-colors duration-300 ${
                          deletingId === slot._id
                            ? theme === 'dark'
                              ? 'bg-gray-600 cursor-not-allowed'
                              : 'bg-gray-300 cursor-not-allowed'
                            : theme === 'dark'
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-red-500 hover:bg-red-600'
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
