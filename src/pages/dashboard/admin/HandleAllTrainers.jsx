import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Loaging from '../../../loagind/Loaging';

const HandleAllTrainers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: trainers = [], isLoading, error, refetch } = useQuery({
    queryKey: ['trainers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/trainers?status=approved');
      return res.data;
    },
  });

  const handleReject = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this trainer?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject!',
      cancelButtonText: 'Cancel',
      background: '#1F1F1F',
      color: '#fff',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/trainers/status/${id}`, { status: 'rejected' })
          .then(() => {
           Swal.fire({
  title: 'Rejected!',
  text: 'Trainer status updated to rejected.',
  icon: 'success',
  background: '#1e1e1e', // dark background
  color: '#ffffff',      // white text
  confirmButtonColor: '#0000FF' // purple confirm button
});

            refetch();
          })
          .catch(() => {
            Swal.fire('Error!', 'Failed to update status.', 'error');
          });
      }
    });
  };

  if (isLoading) return <Loaging></Loaging>;
  if (error) return <div className="text-red-500 text-center p-6">Error loading trainers.</div>;

  return (
    <div className="min-h-screen bg-[#36454F] px-1 py-10">
      <div className='bg-gray-900 rounded-t-2xl p-2'>
        <h2 className="text-3xl font-bold mb-8 neon-text text-center">All Approved Trainers</h2>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-700">
        <table className="min-w-full text-sm text-left text-gray-300">
          <thead className="bg-gray-950 text-gray-400 uppercase text-xs tracking-wider">
            <tr>
              <th className="py-3 px-6">Profile</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Age</th>
              <th className="py-3 px-6">Skills</th>
              <th className="py-3 px-6">Available Days</th>
              <th className="py-3 px-6">Available Time</th>
              <th className="py-3 px-6">Experience</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {trainers.map((trainer) => (
              <tr
                key={trainer._id}
                className="border-b border-gray-700 bg-gray-900 hover:bg-[#2A2A2A] transition"
              >
                <td className="py-3 px-6">
                  <img
                    src={trainer.profileImage || '/default-profile.png'}
                    alt={trainer.fullName}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </td>
                <td className="py-3 px-6">{trainer.fullName}</td>
                <td className="py-3 px-6">{trainer.email}</td>
                <td className="py-3 px-6">{trainer.age}</td>
                <td className="py-3 px-6">{trainer.skills?.join(', ') || 'N/A'}</td>
                <td className="py-3 px-6">{trainer.availableDays?.join(', ') || 'N/A'}</td>
                <td className="py-3 px-6">
                  {Array.isArray(trainer.availableTime)
                    ? trainer.availableTime.join(', ')
                    : trainer.availableTime || 'N/A'}
                </td>
                <td className="py-3 px-6">{trainer.yearsOfExperience || 'N/A'}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleReject(trainer._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md font-semibold transition"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}

            {trainers.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-6 text-gray-400">
                  No approved trainers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default HandleAllTrainers;
