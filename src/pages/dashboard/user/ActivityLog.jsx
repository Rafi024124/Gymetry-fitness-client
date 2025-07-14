import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/authContext/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ActivityLog = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [statusInfo, setStatusInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/trainers/status?email=${user.email}`)
        .then(res => {
          setStatusInfo(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user?.email, axiosSecure]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40 text-white text-lg font-medium">
        Loading your trainer application status...
      </div>
    );

  if (!statusInfo)
    return (
      <div className="flex justify-center items-center h-40 text-white text-lg font-medium">
        No application found.
      </div>
    );

  const renderStatusMessage = () => {
    switch (statusInfo.status) {
      case 'approved':
        return (
          <div className="bg-green-700 text-green-100 px-4 py-3 rounded-md shadow-md text-center font-semibold">
            🎉 Congratulations! Your trainer application has been approved.
          </div>
        );
      case 'pending':
        return (
          <div className="bg-yellow-600 text-yellow-100 px-4 py-3 rounded-md shadow-md text-center font-semibold">
            ⏳ Your trainer application is currently pending. Please wait for review.
          </div>
        );
      case 'rejected':
        return (
          <div className="bg-red-700 text-red-100 px-4 py-3 rounded-md shadow-md text-center font-semibold">
            ❌ Unfortunately, your trainer application was rejected.
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg max-w-md mx-auto shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Trainer Application Status</h2>

      {renderStatusMessage()}

      {statusInfo.status === 'rejected' && (
        <>
          <div className="text-center mt-4">
            <button
              onClick={() => setShowFeedback(true)}
              className="text-blue-400 hover:underline font-semibold"
            >
              View rejection feedback
            </button>
          </div>

          {showFeedback && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
              <div className="bg-gray-800 text-white p-6 rounded-lg max-w-sm w-full shadow-lg">
                <h3 className="text-xl font-semibold mb-3 border-b border-gray-700 pb-2">
                  Rejection Feedback
                </h3>
                <p className="whitespace-pre-wrap">{statusInfo.feedback || 'No feedback provided.'}</p>
                <button
                  onClick={() => setShowFeedback(false)}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ActivityLog;
