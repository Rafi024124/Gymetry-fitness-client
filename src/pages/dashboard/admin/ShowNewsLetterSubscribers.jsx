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
        <Loaging />
      </p>
    );
  if (error)
    return (
      <p className={`text-center mt-10 ${theme === 'dark' ? 'text-red-500' : 'text-red-700'}`}>
        Error loading subscribers
      </p>
    );

  // Reuse same background as AllTrainers
  const sectionBg =
    theme === 'dark'
      ? 'bg-gradient-to-b from-[#0D0D0D] via-[#121212] to-[#1a1a1a]'
      : 'bg-gradient-to-b from-sky-50 via-sky-100 to-sky-200';

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
    <section className={`${sectionBg} py-16 min-h-screen w-full`}>
      <div className="w-full mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          Newsletter Subscribers
        </h2>

        {subscribers.length === 0 ? (
          <p className={`text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            No subscribers found.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl shadow-lg">
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
                  <tr
                    key={sub._id}
                    className={`${tableRowBg(idx)} ${tableRowHover} border-b ${borderColor}`}
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
    </section>
  );
};

export default ShowNewsletterSubscribers;
