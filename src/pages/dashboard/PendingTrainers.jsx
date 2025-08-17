import React, { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  FaTrashAlt,
  FaCheckCircle,
  FaEye,
  FaUser,
  FaEnvelope,
  FaBirthdayCake,
  FaCalendarAlt,
  FaClock,
  FaStar,
} from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loaging from '../../loagind/Loaging';
import Swal from 'sweetalert2';
import { ThemeContext } from '../../contexts/ThemeContext';

const PendingTrainers = () => {
  const { theme } = useContext(ThemeContext);
  const axiosSecure = useAxiosSecure();
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionFeedback, setRejectionFeedback] = useState('');
  const [rejectingTrainer, setRejectingTrainer] = useState(null);

  const fetchPendingTrainers = async () => {
    const res = await axiosSecure.get('/trainers/pending');
    return res.data;
  };

  const { data: pendingTrainers = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['pendingTrainers'],
    queryFn: fetchPendingTrainers,
  });

  const handleApprove = async (id, email) => {
    try {
      const res = await axiosSecure.patch(`/trainers/status/${id}`, {
        status: 'approved',
        email,
      });
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: 'Success!',
          text: 'Trainer Approved Successfully!',
          icon: 'success',
          background: theme === 'dark' ? '#1F1F1F' : '#ffffff',
          color: theme === 'dark' ? '#F2F2F2' : '#1f2937',
          confirmButtonColor: theme === 'dark' ? '#A259FF' : '#0284c7',
          confirmButtonText: 'Continue',
        });
      }
    } catch (error) {
      alert('Failed to approve trainer.');
      console.error(error);
    }
  };

  const openRejectModal = (trainer) => {
    setRejectingTrainer(trainer);
    setRejectionFeedback('');
    setShowRejectModal(true);
  };

  const handleRejectSubmit = async () => {
    if (!rejectionFeedback.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Feedback Required',
        text: 'Please provide rejection feedback before submitting.',
        background: theme === 'dark' ? '#1F1F1F' : '#ffffff',
        color: theme === 'dark' ? '#F2F2F2' : '#1f2937',
        confirmButtonColor: theme === 'dark' ? '#A259FF' : '#0284c7',
      });
      return;
    }

    try {
      const res = await axiosSecure.patch(`/trainers/status/${rejectingTrainer._id}`, {
        status: 'rejected',
        email: rejectingTrainer.email,
        rejectionFeedback: rejectionFeedback.trim(),
      });
      if (res.data.modifiedCount > 0) {
        refetch();
        setShowRejectModal(false);
        Swal.fire({
          title: 'Success!',
          text: 'Trainer Rejected with Feedback Successfully!',
          icon: 'success',
          background: theme === 'dark' ? '#1F1F1F' : '#ffffff',
          color: theme === 'dark' ? '#F2F2F2' : '#1f2937',
          confirmButtonColor: theme === 'dark' ? '#A259FF' : '#0284c7',
          confirmButtonText: 'Continue',
        });
      }
    } catch (error) {
      alert('Failed to reject trainer.');
      console.error(error);
    }
  };

  const handleViewDetails = (trainer) => {
    setSelectedTrainer(trainer);
    document.getElementById('trainer-details-modal').showModal();
  };

  if (isLoading) return <Loaging />;
  if (isError)
    return (
      <div className="text-center text-red-500 py-10">Error loading data</div>
    );

  // 🎨 Theme Colors
  const sectionBg = theme === 'dark' ? 'bg-gray-900' : 'bg-sky-100';
  
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  
  const tableHeaderBg = theme === 'dark' ? 'bg-[#333]' : 'bg-gray-200';
  const tableRowHover = theme === 'dark' ? 'hover:bg-[#2c2c2c]' : 'hover:bg-gray-200';
  //const skillBadgeBg = theme === 'dark' ? 'bg-[#A259FF]/20 border-[#A259FF] text-[#A259FF]' : 'bg-sky-200 border-sky-400 text-sky-700';
  //const modalBg = theme === 'dark' ? 'bg-[#1F1F1F] text-white' : 'bg-white text-gray-900';
  const inputBg = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900';
  const cancelBtn = theme === 'dark' ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black' : 'border-sky-500 text-sky-600 hover:bg-sky-500 hover:text-white';
  const modalBg = theme === 'dark' ? 'bg-[#1f1f1f] text-white' : 'bg-white text-gray-900';
  const skillBadgeBg = theme === 'dark' ? 'bg-[#00F0FF]/20 text-[#00F0FF] border-[#00F0FF]/50' 
                                       : 'bg-sky-100 text-sky-600 border-sky-300';
  return (
    <div className={`py-4 rounded-xl ${sectionBg} mt-10`}>
      <h2 className={`text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500`}>
        Pending Trainer Applications
      </h2>

      <div className="overflow-x-auto">
        <table className={`table w-full ${textColor}`}>
          <thead>
            <tr className={`text-left ${tableHeaderBg} ${textColor}`}>
              <th>Name</th>
              <th className="hidden md:table-cell">Email</th>
              <th className="hidden md:table-cell">Age</th>
              <th className="hidden md:table-cell">Skills</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingTrainers.map((trainer) => (
              <tr key={trainer._id} className={`${tableRowHover}`}>
                <td className="py-2">{trainer.fullName}</td>
                <td className="hidden md:table-cell">{trainer.email}</td>
                <td className="hidden md:table-cell">{trainer.age}</td>
                <td className="hidden md:table-cell">
                  {trainer.skills?.map((skill, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 border rounded-full text-sm mr-2 ${skillBadgeBg}`}
                    >
                      {skill}
                    </span>
                  ))}
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
                    onClick={() => handleApprove(trainer._id, trainer.email)}
                    className="text-green-400 hover:text-green-600"
                    title="Approve"
                  >
                    <FaCheckCircle />
                  </button>
                  <button
                    onClick={() => openRejectModal(trainer)}
                    className="text-red-400 hover:text-red-600"
                    title="Reject"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
            {pendingTrainers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No pending trainers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Trainer Details Modal */}
      <dialog id="trainer-details-modal" className="modal">
      <div className={`modal-box max-w-2xl ${modalBg}`}>
        <h3 className={`font-bold text-2xl mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-[#00F0FF]' : 'text-sky-400'}`}>
          <FaUser className={`${theme === 'dark' ? 'text-[#00F0FF]' : 'text-sky-400'}`} /> Trainer Details
        </h3>

        {selectedTrainer && (
          <div className="space-y-3">
            <p className="flex items-center gap-2">
              <FaUser className="text-gray-700" />
              <span className="font-semibold">Full Name:</span> {selectedTrainer.fullName}
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-gray-700" />
              <span className="font-semibold">Email:</span> {selectedTrainer.email}
            </p>
            <p className="flex items-center gap-2">
              <FaBirthdayCake className="text-gray-700" />
              <span className="font-semibold">Age:</span> {selectedTrainer.age}
            </p>
            <p className="flex items-start gap-2">
              <FaStar className="text-gray-700 mt-1" />
              <span className="font-semibold">Skills:</span>
              <span className="flex flex-wrap gap-2">
                {selectedTrainer.skills?.map((skill, i) => (
                  <span key={i} className={`px-3 py-1 border rounded-full text-sm ${skillBadgeBg}`}>
                    {skill}
                  </span>
                ))}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-700" />
              <span className="font-semibold">Available Days:</span> {selectedTrainer.availableDays?.join(', ')}
            </p>
            <p className="flex items-center gap-2">
              <FaClock className="text-gray-700" />
              <span className="font-semibold">Available Time:</span> {selectedTrainer.availableTime}
            </p>
          </div>
        )}

        <div className="modal-action mt-6">
          <form method="dialog">
            <button className={`btn ${theme === 'dark' ? 'bg-[#00F0FF] text-black hover:bg-[#22ffff]' : 'bg-sky-400 text-white hover:bg-sky-500'}`}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>

      {/* Reject Feedback Modal */}
      <dialog
        id="reject-feedback-modal"
        className="modal"
        open={showRejectModal}
        onClick={(e) => {
          if (e.target.id === 'reject-feedback-modal') setShowRejectModal(false);
        }}
      >
        <div className={`modal-box max-w-xl ${modalBg}`}>
          <h3 className="font-bold text-2xl text-[#A259FF] mb-4">
            Reject Trainer Application
          </h3>

          <p className="mb-2 text-gray-500">
            Provide a feedback for rejection of{' '}
            <strong>{rejectingTrainer?.fullName}</strong>:
          </p>

          <textarea
            rows={5}
            className={`w-full p-3 rounded resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400 ${inputBg}`}
            value={rejectionFeedback}
            onChange={(e) => setRejectionFeedback(e.target.value)}
            placeholder="Enter rejection feedback here..."
          />

          <div className="modal-action mt-4 flex justify-end gap-4">
            <button
              onClick={() => setShowRejectModal(false)}
              className={`btn btn-outline ${cancelBtn}`}
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={handleRejectSubmit}
              className="btn bg-red-600 hover:bg-red-700 text-white"
              type="button"
            >
              Submit Rejection
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PendingTrainers;
