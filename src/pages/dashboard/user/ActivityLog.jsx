import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/authContext/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loaging from '../../../loagind/Loaging';
import { ThemeContext } from '../../../contexts/ThemeContext'; // for theme

const ActivityLog = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { theme } = useContext(ThemeContext); // dark or light
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

  if (loading) return <Loaging />;

  if (!statusInfo)
    return (
      <div className={`flex justify-center items-center h-40 text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        No application found.
      </div>
    );

  const renderStatusMessage = () => {
    const baseClasses = "px-6 py-4 rounded-lg shadow-md text-center font-semibold text-lg flex items-center justify-center gap-2";
    const colors = {
      approved: theme === 'dark' ? 'bg-green-700 text-green-100' : 'bg-green-100 text-green-800',
      pending: theme === 'dark' ? 'bg-yellow-600 text-yellow-100' : 'bg-yellow-100 text-yellow-800',
      rejected: theme === 'dark' ? 'bg-red-700 text-red-100' : 'bg-red-100 text-red-800',
    };

    switch (statusInfo.status) {
      case 'approved':
        return (
          <div className={`${baseClasses} ${colors.approved}`}>
            <span role="img" aria-label="celebrate" className="text-2xl">🎉</span>
            <span>Your trainer application has been <strong>approved</strong>!</span>
          </div>
        );
      case 'pending':
        return (
          <div className={`${baseClasses} ${colors.pending}`}>
            <span role="img" aria-label="hourglass" className="text-2xl">⏳</span>
            <span>Your trainer application is currently <strong>pending</strong>. Please wait for review.</span>
          </div>
        );
      case 'rejected':
        return (
          <div className={`${baseClasses} ${colors.rejected}`}>
            <span role="img" aria-label="cross mark" className="text-2xl">❌</span>
            <span>Unfortunately, your trainer application was <strong>rejected</strong>.</span>
          </div>
        );
      default:
        return null;
    }
  };

  const containerBg = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black border border-gray-300';

  return (
    <div className={`p-8 rounded-xl max-w-md mx-auto shadow-lg ${containerBg}`}>
      <h2 className={`text-3xl font-bold mb-8 text-center tracking-wide ${theme === 'dark' ? 'neon-text' : 'text-cyan-700'}`}>
        Trainer Application Status
      </h2>

      {renderStatusMessage()}

      {statusInfo.status === 'rejected' && (
        <>
          <div className="text-center mt-6">
            <button
              onClick={() => setShowFeedback(true)}
              className={`underline font-semibold transition ${theme === 'dark' ? 'text-blue-400 hover:text-blue-500' : 'text-blue-700 hover:text-blue-800'}`}
              aria-label="View rejection feedback"
            >
              View rejection feedback
            </button>
          </div>

          {showFeedback && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
              <div className={`${theme === 'dark' ? 'bg-gray-800 text-white border border-gray-700' : 'bg-white text-black border border-gray-300'} p-8 rounded-xl max-w-sm w-full shadow-lg`}>
                <h3 className={`text-2xl font-semibold mb-4 pb-3 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                  Rejection Feedback
                </h3>
                <p className={`whitespace-pre-wrap leading-relaxed min-h-[80px] ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                  {statusInfo.feedback || 'No feedback provided.'}
                </p>
                <button
                  onClick={() => setShowFeedback(false)}
                  className={`mt-8 px-6 py-3 rounded-lg font-semibold transition duration-300 w-full ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-400 hover:bg-blue-500 text-black'}`}
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
