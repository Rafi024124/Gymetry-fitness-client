import React, { useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Loaging from '../../../../loagind/Loaging';
import { AuthContext } from '../../../../contexts/authContext/AuthContext';

const TrainerDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  const trainerEmail = user?.email;

  const { data: slots = [], isLoading } = useQuery({
    queryKey: ['trainer-slots', trainerEmail],
    enabled: !!trainerEmail,
    queryFn: async () => {
      const res = await axiosSecure.get(`/slots?trainerEmail=${encodeURIComponent(trainerEmail)}`);
      return res.data;
    },
  });
  console.log(slots);
  

  const handleDelete = (slotId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/slots/${slotId}`);
          Swal.fire('Deleted!', 'Slot has been deleted.', 'success');
          queryClient.invalidateQueries(['trainer-slots']);
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete slot.', error.message);
        }
      }
    });
  };

  if (isLoading) return <Loaging />;

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Manage Slots</h2>

      {slots.length === 0 ? (
        <p>No slots available. Please add some slots.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="border px-4 py-2">Slot Name</th>
                {/* Removed Day(s) header */}
                <th className="border px-4 py-2">Slot Time</th>
                <th className="border px-4 py-2">Class</th>
                <th className="border px-4 py-2">Booking Status</th>
                <th className="border px-4 py-2">Booked By</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) => (
                <tr key={slot._id} className="text-center border-t border-gray-700">
                  <td className="border px-4 py-2">{slot.slotName}</td>
                  {/* Removed days column */}
                  <td className="border px-4 py-2">{slot.slotTime}</td>
                  <td className="border px-4 py-2">{slot.className}</td>
                  <td className="border px-4 py-2">
                    {slot.booked ? (
                      <span className="text-green-400 font-semibold">Booked</span>
                    ) : (
                      <span className="text-yellow-400 font-semibold">Available</span>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {slot.booked && slot.bookedBy ? (
                      <div>
                        <p>{slot.bookedBy.name}</p>
                        <p className="text-sm text-gray-300">{slot.bookedBy}</p>
                      </div>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(slot._id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
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

export default TrainerDashboardHome;
