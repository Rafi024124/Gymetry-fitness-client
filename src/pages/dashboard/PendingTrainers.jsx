import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt, FaCheckCircle, FaEye, FaUser, FaEnvelope, FaBirthdayCake, FaCalendarAlt, FaClock, FaStar } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../loagind/Loaging';
import Swal from 'sweetalert2';
import Loaging from '../../loagind/Loaging';

const PendingTrainers = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const fetchPendingTrainers = async () => {
    const res = await axiosSecure.get('/trainers/pending');
    return res.data;
  };

  const { data: pendingTrainers = [], isLoading, isError,refetch } = useQuery({
    queryKey: ['pendingTrainers'],
    queryFn: fetchPendingTrainers,
  });

 const handleApprove = async (id) => {
  try {
    const res = await axiosSecure.patch(`/trainers/status/${id}`,{status: 'approved'});
    if (res.data.modifiedCount > 0) {
      refetch(); 
       Swal.fire({
                title: "Success!",
                text: "Trainer Approved Successfully!",
                icon: "success",
                background: "#1F1F1F",
                color: "#F2F2F2",
                confirmButtonColor: "#A259FF",
                confirmButtonText: "Continue",
                customClass: {
                  title: "swal2-title",
                },
              });
     
    }
  } catch (error) {
    alert("Failed to approve trainer.");
    console.error(error);
  }
};
const handleReject = async (id) => {
  try {
    const res = await axiosSecure.patch(`/trainers/status/${id}`,{status: 'rejected'});
    if (res.data.modifiedCount > 0) {
      refetch(); 
       Swal.fire({
                title: "Success!",
                text: "Trainer Rejected Successfully!",
                icon: "success",
                background: "#1F1F1F",
                color: "#F2F2F2",
                confirmButtonColor: "#A259FF",
                confirmButtonText: "Continue",
                customClass: {
                  title: "swal2-title",
                },
              });
    }
  } catch (error) {
    alert("Failed to approve trainer.");
    console.error(error);
  }
};



  const handleViewDetails = (trainer) => {
    setSelectedTrainer(trainer);
    document.getElementById('trainer-details-modal').showModal();
  };

  if (isLoading) return <Loaging></Loaging>;
  if (isError)
    return <div className="text-center text-red-500 py-10">Error loading data</div>;

  return (
    <div className="p-4 bg-gray-900 rounded-xl shadow-md text-white">
      <h2 className="text-4xl font-semibold text-gradient bg-gradient-to-r from-[#A259FF] to-[#00F0FF] bg-clip-text text-transparent mb-6">
        Pending Trainer Applications
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full text-white">
          <thead>
            <tr className="text-left bg-[#333] text-white">
              <th>Name</th>
              <th className="hidden md:table-cell">Email</th>
              <th className="hidden md:table-cell">Age</th>
              <th className="hidden md:table-cell">Skills</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingTrainers.map((trainer) => (
              <tr key={trainer._id} className="hover:bg-[#2c2c2c]">
                <td className="py-2">{trainer.fullName}</td>
                <td className="hidden md:table-cell">{trainer.email}</td>
                <td className="hidden md:table-cell">{trainer.age}</td>
                <td className="hidden md:table-cell">
                  {trainer.skills?.join(', ')}
                </td>
                <td className="flex items-center gap-3 py-2">
                  <button
                    onClick={() => handleViewDetails(trainer)}
                    className="text-blue-400 hover:text-blue-600"
                    title="View Details"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleApprove(trainer._id)}
                    className="text-green-400 hover:text-green-600"
                    title="Approve"
                  >
                    <FaCheckCircle />
                  </button>
                  <button
                    onClick={() => handleReject(trainer._id)}
                    className="text-red-400 hover:text-red-600"
                    title="Delete"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
            {pendingTrainers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-[#ccc]">
                  No pending trainers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {/* Trainer Details Modal */}
<dialog id="trainer-details-modal" className="modal">
  <div className="modal-box bg-[#1F1F1F] text-white max-w-2xl">
    <h3 className="font-bold text-2xl text-[#A259FF] mb-4 flex items-center gap-2">
      <FaUser className="text-[#A259FF]" /> Trainer Details
    </h3>
    
    {selectedTrainer && (
      <div className="space-y-3">
        <p className="flex items-center gap-2">
          <FaUser className="text-[#A259FF]" />
          <span className="font-semibold text-white">Full Name:</span> {selectedTrainer.fullName}
        </p>
        <p className="flex items-center gap-2">
          <FaEnvelope className="text-[#A259FF]" />
          <span className="font-semibold text-white">Email:</span> {selectedTrainer.email}
        </p>
        <p className="flex items-center gap-2">
          <FaBirthdayCake className="text-[#A259FF]" />
          <span className="font-semibold text-white">Age:</span> {selectedTrainer.age}
        </p>
        <p className="flex items-start gap-2">
          <FaStar className="text-[#A259FF] mt-1" />
          <span className="font-semibold text-white">Skills:</span>
          <span className="flex flex-wrap gap-2">
            {selectedTrainer.skills?.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-[#A259FF]/20 border border-[#A259FF] rounded-full text-sm text-[#A259FF]"
              >
                {skill}
              </span>
            ))}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <FaCalendarAlt className="text-[#A259FF]" />
          <span className="font-semibold text-white">Available Days:</span> {selectedTrainer.availableDays?.join(', ')}
        </p>
        <p className="flex items-center gap-2">
          <FaClock className="text-[#A259FF]" />
          <span className="font-semibold text-white">Available Time:</span> {selectedTrainer.availableTime}
        </p>
      </div>
    )}

    <div className="modal-action mt-6">
      <form method="dialog">
        <button className="btn bg-[#A259FF] text-white hover:bg-[#9333ea]">Close</button>
      </form>
    </div>
  </div>
</dialog>

    </div>
  );
};

export default PendingTrainers;
