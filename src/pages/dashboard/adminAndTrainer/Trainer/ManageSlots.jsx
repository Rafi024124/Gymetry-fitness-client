import React, { useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';



import Swal from 'sweetalert2';
import { AuthContext } from '../../../../contexts/authContext/AuthContext';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Loaging from '../../../../loagind/Loaging';

const ManageSlots = () => {
  const { user } = useContext(AuthContext);
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

  if (isLoading) return <Loaging></Loaging>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-900 rounded-lg text-white">
      <h2 className="text-2xl font-bold mb-6">Manage Slots</h2>
      {slots.length === 0 ? (
        <p>No slots found. Please add some slots.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg">
            <thead className="bg-gray-700 text-left">
              <tr>
                <th className="px-4 py-3">Slot Name</th>
                <th className="px-4 py-3">Slot Time</th>
                <th className="px-4 py-3">Available Days</th>
                <th className="px-4 py-3">Class Name</th>
                <th className="px-4 py-3">Booked</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) => (
                <tr
                  key={slot._id}
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="px-4 py-3">{slot.slotName}</td>
                  <td className="px-4 py-3">{slot.slotTime}</td>
                  <td className="px-4 py-3">{slot.availableDays.join(', ')}</td>
                  <td className="px-4 py-3">{slot.className}</td>
                  <td className="px-4 py-3">
                    {slot.booked ? (
                      <span className="text-red-400 font-semibold">Booked</span>
                    ) : (
                      <span className="text-green-400 font-semibold">Available</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      disabled={slot.booked}
                      onClick={() => handleDelete(slot._id)}
                      className={`px-3 py-1 rounded ${
                        slot.booked
                          ? 'bg-gray-600 cursor-not-allowed'
                          : 'bg-red-600 hover:bg-red-700'
                      } text-white`}
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
