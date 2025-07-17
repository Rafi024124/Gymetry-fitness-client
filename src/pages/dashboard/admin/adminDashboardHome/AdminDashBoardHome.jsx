import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUsers, FaUserCheck, FaClock, FaDumbbell, FaDollarSign } from 'react-icons/fa';
import Loaging from '../../../../loagind/Loaging';
import { Link } from 'react-router';

const AdminDashboardHome = () => {
  const [stats, setStats] = useState({
    totalSubscribers: 0,
    totalTrainers: 0,
    pendingApplications: 0,
    totalClasses: 0,
    totalBalance: 0,
  });
  const [latestApplications, setLatestApplications] = useState([]);
  const [loading, setLoading] = useState(true);

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
          axios.get('http://localhost:3000/newsletter/subscribers'),
          axios.get('http://localhost:3000/trainers?status=approved'),
          axios.get('http://localhost:3000/trainers/pending'),
          axios.get('http://localhost:3000/classes'),
          axios.get('http://localhost:3000/payments/summary'),
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
  }, []);

  if (loading)
    return (
      <Loaging></Loaging>
    );

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white rounded-2xl max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 neon-text text-stroke">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
        <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-purple-600 transition-shadow duration-300">
          <FaUsers className="mx-auto mb-3 text-4xl text-purple-400" />
          <h2 className="text-xl font-semibold mb-1 neon-text">Newsletter Subscribers</h2>
          <p className="text-3xl font-bold">{stats.totalSubscribers}</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-blue-400 transition-shadow duration-300">
          <FaUserCheck className="mx-auto mb-3 text-4xl text-blue-400" />
          <h2 className="text-xl font-semibold mb-1 neon-text">Approved Trainers</h2>
          <p className="text-3xl font-bold">{stats.totalTrainers}</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-yellow-400 transition-shadow duration-300">
          <FaClock className="mx-auto mb-3 text-4xl text-yellow-400" />
          <h2 className="text-xl font-semibold mb-1 neon-text">Pending Applications</h2>
          <p className="text-3xl font-bold">{stats.pendingApplications}</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-pink-500 transition-shadow duration-300">
          <FaDumbbell className="mx-auto mb-3 text-4xl text-pink-500" />
          <h2 className="text-xl font-semibold mb-1 neon-text">Total Classes</h2>
          <p className="text-3xl font-bold">{stats.totalClasses}</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-green-500 transition-shadow duration-300">
          <FaDollarSign className="mx-auto mb-3 text-4xl text-green-500" />
          <h2 className="text-xl font-semibold mb-1 neon-text">Total Revenue</h2>
          <p className="text-3xl font-bold text-green-500">${stats.totalBalance.toFixed(2)}</p>
        </div>
      </div>

      {/* Latest Trainer Applications */}
      <section>
        <h2 className="text-stroke text-3xl neon-text font-semibold mb-6 border-b border-gray-700 pb-3">
          Latest Trainer Applications
        </h2>
        {latestApplications.length === 0 ? (
          <p className="text-gray-400">No pending trainer applications at the moment.</p>
        ) : (
          <ul className="space-y-4 max-w-3xl">
            {latestApplications.map((app) => (
              <li
                key={app._id}
                className="bg-gray-800 p-5 rounded-lg shadow-md flex justify-between items-center hover:bg-gray-700 transition"
              >
                <div>
                  <p className="font-semibold text-lg">
                    {app.fullName || app.name || 'Unnamed'}
                  </p>
                  <p className="text-gray-400 text-sm">{app.email}</p>
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

export default AdminDashboardHome;
