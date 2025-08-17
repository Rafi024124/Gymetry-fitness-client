import React, { useEffect, useState, useContext } from 'react';
import { FaUsers, FaUserCheck, FaClock, FaDumbbell, FaDollarSign } from 'react-icons/fa';
import Loaging from '../../../../loagind/Loaging';
import { Link } from 'react-router';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { ThemeContext } from '../../../../contexts/ThemeContext';

const DashBoardHomeAdmin = () => {
  const { theme } = useContext(ThemeContext);

  const [stats, setStats] = useState({
    totalSubscribers: 0,
    totalTrainers: 0,
    pendingApplications: 0,
    totalClasses: 0,
    totalBalance: 0,
  });
  const [latestApplications, setLatestApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          subscribersRes,
          trainersRes,
          pendingAppsRes,
          classesRes,
          paymentsSummaryRes,
        ] = await Promise.all([
          axiosSecure.get('newsletter/subscribers'),
          axiosSecure.get('trainers?status=approved'),
          axiosSecure.get('/trainers/pending'),
          axiosSecure.get('classes'),
          axiosSecure.get('payments/summary'),
        ]);

        setStats({
          totalSubscribers: subscribersRes.data.length,
          totalTrainers: trainersRes.data.length,
          pendingApplications: pendingAppsRes.data.length,
          totalClasses: classesRes.data.length,
          totalBalance: paymentsSummaryRes.data.totalBalance || 0,
        });

        setLatestApplications(pendingAppsRes.data.slice(0, 5));
      } catch (error) {
        console.error('Failed to load dashboard data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosSecure]);

  if (loading) return <Loaging />;

  // Theme-based classes
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const subTextColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-700';
  const hoverShadow = theme === 'dark'
    ? 'hover:shadow-purple-600'
    : 'hover:shadow-gray-400';
  const neonText = theme === 'dark' ? 'neon-text' : '';
  const strokeText = theme === 'dark' ? 'text-stroke' : '';

  return (
    <div className={`p-8 ${bgColor} min-h-screen rounded-2xl max-w-7xl mx-auto`}>
      <h1 className={`text-4xl font-extrabold mb-8 ${neonText} ${strokeText} ${textColor}`}>
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
        <div className={`${cardBg} rounded-lg p-6 text-center shadow-lg ${hoverShadow} transition-shadow duration-300`}>
          <FaUsers className="mx-auto mb-3 text-4xl text-purple-400" />
          <h2 className={`text-xl font-semibold mb-1 ${neonText}`}>Newsletter Subscribers</h2>
          <p className="text-3xl font-bold">{stats.totalSubscribers}</p>
        </div>

        <div className={`${cardBg} rounded-lg p-6 text-center shadow-lg ${hoverShadow} transition-shadow duration-300`}>
          <FaUserCheck className="mx-auto mb-3 text-4xl text-blue-400" />
          <h2 className={`text-xl font-semibold mb-1 ${neonText}`}>Approved Trainers</h2>
          <p className="text-3xl font-bold">{stats.totalTrainers}</p>
        </div>

        <div className={`${cardBg} rounded-lg p-6 text-center shadow-lg ${hoverShadow} transition-shadow duration-300`}>
          <FaClock className="mx-auto mb-3 text-4xl text-yellow-400" />
          <h2 className={`text-xl font-semibold mb-1 ${neonText}`}>Pending Applications</h2>
          <p className="text-3xl font-bold">{stats.pendingApplications}</p>
        </div>

        <div className={`${cardBg} rounded-lg p-6 text-center shadow-lg ${hoverShadow} transition-shadow duration-300`}>
          <FaDumbbell className="mx-auto mb-3 text-4xl text-pink-500" />
          <h2 className={`text-xl font-semibold mb-1 ${neonText}`}>Total Classes</h2>
          <p className="text-3xl font-bold">{stats.totalClasses}</p>
        </div>

        <div className={`${cardBg} rounded-lg p-6 text-center shadow-lg ${hoverShadow} transition-shadow duration-300`}>
          <FaDollarSign className="mx-auto mb-3 text-4xl text-green-500" />
          <h2 className={`text-xl font-semibold mb-1 ${neonText}`}>Total Revenue</h2>
          <p className={`text-3xl font-bold text-green-500`}>${stats.totalBalance.toFixed(2)}</p>
        </div>
      </div>

      {/* Latest Trainer Applications */}
      <section>
        <h2 className={`text-3xl font-semibold mb-6 border-b pb-3 ${neonText} ${strokeText} ${textColor}`}>
          Latest Trainer Applications
        </h2>
        {latestApplications.length === 0 ? (
          <p className={subTextColor}>No pending trainer applications at the moment.</p>
        ) : (
          <ul className="space-y-4 max-w-3xl">
            {latestApplications.map((app) => (
              <li
                key={app._id}
                className={`${cardBg} p-5 rounded-lg shadow-md flex justify-between items-center hover:bg-gray-200 dark:hover:bg-gray-700 transition`}
              >
                <div>
                  <p className={`font-semibold text-lg ${textColor}`}>
                    {app.fullName || app.name || 'Unnamed'}
                  </p>
                  <p className={`text-sm ${subTextColor}`}>{app.email}</p>
                </div>
                <Link
                  to={'/dashboard/pendingTrainers'}
                  className="glow-btn bg-gradient-to-r from-[#A259FF] to-[#00F0FF] transition duration-300 text-sm font-semibold"
                >
                  View
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default DashBoardHomeAdmin;
