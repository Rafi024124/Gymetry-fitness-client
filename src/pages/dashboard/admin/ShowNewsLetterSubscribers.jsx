import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { ThemeContext } from '../../../contexts/ThemeContext';
import Loaging from '../../../loagind/Loaging';

const ShowNewsletterSubscribers = () => {
  const { theme } = useContext(ThemeContext);
  const axiosSecure = useAxiosSecure();

  const { data: subscribers = [], isLoading, error } = useQuery({
    queryKey: ['newsletterSubscribers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/newsletter/subscribers');
      return res.data;
    },
  });

  if (isLoading)
    return (
      <p className={`text-center mt-10 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <Loaging></Loaging>
      </p>
    );
  if (error)
    return (
      <p className={`text-center mt-10 ${theme === 'dark' ? 'text-red-500' : 'text-red-700'}`}>
        Error loading subscribers
      </p>
    );

  // Theme-based classes
  const containerBg = theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-900';
  const tableHeaderBg = theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-sky-200 text-gray-700';
  const tableRowBg = (idx) =>
    theme === 'dark'
      ? idx % 2 === 0
        ? 'bg-gray-900'
        : 'bg-gray-800'
      : idx % 2 === 0
      ? 'bg-white'
      : 'bg-sky-50';
  const tableRowHover = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-sky-100';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';

  return (
    <div className={`max-w-5xl mx-auto p-6 rounded-lg shadow-lg ${containerBg}`}>
      <h2 className={`text-3xl font-bold mb-6 text-center ${theme === 'dark' ? 'neon-text' : ''}`}>
        Newsletter Subscribers
      </h2>

      {subscribers.length === 0 ? (
        <p className={`text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          No subscribers found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className={`min-w-full text-left border rounded-md ${borderColor}`}>
            <thead>
              <tr className={tableHeaderBg}>
                <th className={`py-3 px-6 border-b ${borderColor}`}>#</th>
                <th className={`py-3 px-6 border-b ${borderColor}`}>Name</th>
                <th className={`py-3 px-6 border-b ${borderColor}`}>Email</th>
                <th className={`py-3 px-6 border-b ${borderColor}`}>Subscribed At</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub, idx) => (
                <tr key={sub._id} className={`${tableRowBg(idx)} ${tableRowHover} border-b ${borderColor}`}>
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
