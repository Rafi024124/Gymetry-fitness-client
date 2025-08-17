import React, { useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../contexts/authContext/AuthContext';
import { ThemeContext } from '../../../../contexts/ThemeContext'; // add ThemeContext
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Loaging from '../../../../loagind/Loaging';

const ManageSlots = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // 'dark' or 'light'
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: slots = [], isLoading } = useQuery({
    queryKey: ['slots', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/slots?trainerEmail=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = (slotId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this slot?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/slots/${slotId}`);
          Swal.fire('Deleted!', 'Slot has been deleted.', 'success');
          queryClient.invalidateQueries(['slots']);
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete slot.', error);
        }
      }
    });
  };

  if (isLoading) return <Loaging />;

  return (
    <div
      className={`max-w-6xl mx-auto p-6 rounded-lg ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-sky-200 text-black'
      }`}
    >
      <h2 className="text-2xl font-bold mb-6">Manage Slots</h2>
      {slots.length === 0 ? (
        <p>No slots found. Please add some slots.</p>
      ) : (
        <div className="overflow-x-auto">
          <table
            className={`min-w-full rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <thead
              className={`${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'} text-left`}
            >
              <tr>
                {['Slot Name', 'Slot Time', 'Available Days', 'Class Name', 'Booked', 'Booked By', 'Actions'].map(
                  (title) => (
                    <th key={title} className="px-4 py-3">
                      {title}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) => (
                <tr
                  key={slot._id}
                  className={`border-b ${
                    theme === 'dark' ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <td className="px-4 py-3">{slot.slotName}</td>
                  <td className="px-4 py-3">{slot.slotTime}</td>
                  <td className="px-4 py-3">{slot.availableDays.join(', ')}</td>
                  <td className="px-4 py-3">{slot.className}</td>
                  <td className="px-4 py-3">
                    {slot.booked ? (
                      <span className={theme === 'dark' ? 'text-red-400 font-semibold' : 'text-red-600 font-semibold'}>
                        Booked
                      </span>
                    ) : (
                      <span className={theme === 'dark' ? 'text-green-400 font-semibold' : 'text-green-600 font-semibold'}>
                        Available
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 space-y-1">
                    {slot.booked ? (
                      <>
                        <p className="font-semibold">{slot.bookedBy || 'Unknown'}</p>
                        <p className={theme === 'dark' ? 'text-gray-300 text-xs' : 'text-gray-600 text-xs'}>
                          {slot.bookedByEmail || 'N/A'}
                        </p>
                      </>
                    ) : (
                      <span className={theme === 'dark' ? 'text-gray-400 italic' : 'text-gray-500 italic'}>N/A</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      disabled={slot.booked}
                      onClick={() => handleDelete(slot._id)}
                      className={`px-3 py-1 rounded text-white ${
                        slot.booked
                          ? theme === 'dark'
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-gray-300 cursor-not-allowed text-black'
                          : theme === 'dark'
                          ? 'bg-red-600 hover:bg-red-700'
                          : 'bg-red-500 hover:bg-red-600'
                      }`}
                      title={slot.booked ? "Can't delete booked slot" : 'Delete Slot'}
                    >
                      Delete
                    </button>
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

export default ManageSlots;
