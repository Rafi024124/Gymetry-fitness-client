import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/authContext/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loaging from '../../../loagind/Loaging';

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
     <Loaging></Loaging>
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
          <div className="bg-green-700 text-green-100 px-6 py-4 rounded-lg shadow-md text-center font-semibold text-lg flex items-center justify-center gap-2">
            <span role="img" aria-label="celebrate" className="text-2xl">🎉</span>
            <span>Your trainer application has been <strong>approved</strong>!</span>
          </div>
        );
      case 'pending':
        return (
          <div className="bg-yellow-600 text-yellow-100 px-6 py-4 rounded-lg shadow-md text-center font-semibold text-lg flex items-center justify-center gap-2">
            <span role="img" aria-label="hourglass" className="text-2xl">⏳</span>
            <span>Your trainer application is currently <strong>pending</strong>. Please wait for review.</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="bg-red-700 text-red-100 px-6 py-4 rounded-lg shadow-md text-center font-semibold text-lg flex items-center justify-center gap-2">
            <span role="img" aria-label="cross mark" className="text-2xl">❌</span>
            <span>Unfortunately, your trainer application was <strong>rejected</strong>.</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-8 bg-gray-900 rounded-xl max-w-md mx-auto shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center text-white tracking-wide">
        Trainer Application Status
      </h2>

      {renderStatusMessage()}

      {statusInfo.status === 'rejected' && (
        <>
          <div className="text-center mt-6">
            <button
              onClick={() => setShowFeedback(true)}
              className="text-blue-400 hover:text-blue-500 underline font-semibold transition"
              aria-label="View rejection feedback"
            >
              View rejection feedback
            </button>
          </div>

          {showFeedback && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
              <div className="bg-gray-800 text-white p-8 rounded-xl max-w-sm w-full shadow-lg border border-gray-700">
                <h3 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-3">
                  Rejection Feedback
                </h3>
                <p className="whitespace-pre-wrap text-gray-300 leading-relaxed min-h-[80px]">
                  {statusInfo.feedback || 'No feedback provided.'}
                </p>
                <button
                  onClick={() => setShowFeedback(false)}
                  className="mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition duration-300 w-full"
                  aria-label="Close feedback modal"
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
