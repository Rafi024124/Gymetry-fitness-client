import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
// your axios with auth setup

const ShowNewsletterSubscribers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: subscribers = [], isLoading, error } = useQuery({
    queryKey: ['newsletterSubscribers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/newsletter/subscribers');
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center text-white mt-10">Loading subscribers...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error loading subscribers</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gradient bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
        Newsletter Subscribers
      </h2>

      {subscribers.length === 0 ? (
        <p className="text-center text-gray-400">No subscribers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-gray-700 rounded-md">
            <thead>
              <tr className="bg-gray-800">
                <th className="py-3 px-6 border-b border-gray-700">#</th>
                <th className="py-3 px-6 border-b border-gray-700">Name</th>
                <th className="py-3 px-6 border-b border-gray-700">Email</th>
                <th className="py-3 px-6 border-b border-gray-700">Subscribed At</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub, idx) => (
                <tr
                  key={sub._id}
                  className={`border-b border-gray-700 hover:bg-gray-800 ${idx % 2 === 0 ? 'bg-gray-900' : ''}`}
                >
                  <td className="py-3 px-6">{idx + 1}</td>
                  <td className="py-3 px-6">{sub.name || '-'}</td>
                  <td className="py-3 px-6">{sub.email}</td>
                  <td className="py-3 px-6">{new Date(sub.subscribedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShowNewsletterSubscribers;
