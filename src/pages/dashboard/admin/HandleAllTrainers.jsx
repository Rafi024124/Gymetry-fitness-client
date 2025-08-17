import React, { useContext } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Loaging from '../../../loagind/Loaging';
import { ThemeContext } from '../../../contexts/ThemeContext';

const HandleAllTrainers = () => {
  const { theme } = useContext(ThemeContext); // get theme: 'dark' or 'light'
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
      background: theme === 'dark' ? '#1F1F1F' : '#FFFFFF',
      color: theme === 'dark' ? '#fff' : '#000',
      confirmButtonColor: theme === 'dark' ? '#A259FF' : '#0ea5e9',
      cancelButtonColor: theme === 'dark' ? '#555' : '#ccc',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/trainers/status/${id}`, { status: 'rejected' })
          .then(() => {
            Swal.fire({
              title: 'Rejected!',
              text: 'Trainer status updated to rejected.',
              icon: 'success',
              background: theme === 'dark' ? '#1e1e1e' : '#FFFFFF',
              color: theme === 'dark' ? '#fff' : '#000',
              confirmButtonColor: theme === 'dark' ? '#A259FF' : '#0ea5e9',
            });
            refetch();
          })
          .catch(() => {
            Swal.fire('Error!', 'Failed to update status.', 'error');
          });
      }
    });
  };

  if (isLoading) return <Loaging />;
  if (error)
    return (
      <div className={`text-center p-6 ${theme === 'dark' ? 'text-red-600' : 'text-red-800'}`}>
        Error loading trainers.
      </div>
    );

  // Theme-based classes
  const bgPage = theme === 'dark' ? 'bg-[#0F0F0F]' : 'bg-sky-50';
  const cardBg = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-900';
  const hoverBg = theme === 'dark' ? 'hover:bg-[#2A2A2A]' : 'hover:bg-sky-100';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
  const neonText = theme === 'dark' ? 'neon-text' : '';

  return (
    <div className={`min-h-screen px-2 py-10 ${bgPage}`}>
      <div className={`rounded-t-2xl p-2 ${cardBg} shadow-lg`}>
        <h2 className={`text-3xl font-bold mb-8 ${neonText} text-center`}>
          All Approved Trainers
        </h2>

        <div className={`overflow-x-auto rounded-lg shadow border ${borderColor}`}>
          <table className={`min-w-full text-sm text-left ${textColor}`}>
            <thead className={theme === 'dark' ? 'bg-gray-950 text-gray-400' : 'bg-sky-200 text-gray-700'}>
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
                  className={`border-b ${borderColor} ${hoverBg} transition`}
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
                      className={`bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md font-semibold transition shadow-md`}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}

              {trainers.length === 0 && (
                <tr>
                  <td colSpan={9} className={`text-center py-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
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
