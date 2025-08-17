import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaMoneyBillWave, FaDollarSign } from 'react-icons/fa';
import Loaging from '../../../loagind/Loaging';
import Charts from '../Charts';
import { ThemeContext } from '../../../contexts/ThemeContext';


const Balance = () => {
  const { theme } = useContext(ThemeContext);
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
    queryKey: ['paymentsSummary'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payments/summary');
      return res.data;
    },
  });

  if (isLoading) return <Loaging />;
  if (error)
    return (
      <div
        className={`text-center p-6 ${
          theme === 'dark' ? 'text-red-600' : 'text-red-800'
        }`}
      >
        Failed to load data.
      </div>
    );

  const { totalBalance, lastSixPayments } = data;

  const containerBg = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-sky-50 text-gray-900';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const tableHeaderBg = theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-sky-200 text-gray-700';
  const tableRowHover = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-sky-100';

  return (
    <div className={`${containerBg} mt-2 p-6 rounded-lg shadow-lg max-w-5xl mx-auto`}>
      <h2 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
        <FaMoneyBillWave className="text-green-400" /> Financial Overview
      </h2>

      <div className={`mb-8 p-4 ${cardBg} rounded-lg flex justify-between items-center`}>
        <div>
          <p className={theme === 'dark' ? 'text-gray-400 uppercase tracking-wide' : 'text-gray-600 uppercase tracking-wide'}>
            Total Balance
          </p>
          <p className="text-4xl font-extrabold flex items-center gap-2">
            <FaDollarSign className="text-green-500" /> ${totalBalance?.toFixed(2)}
          </p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
      <div className={`overflow-x-auto rounded-lg border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
        <table className="min-w-full text-left text-sm">
          <thead className={tableHeaderBg}>
            <tr>
              <th className="p-3">Trainer</th>
              <th className="p-3">User</th>
              <th className="p-3">Slot</th>
              <th className="p-3">Package</th>
              <th className="p-3">Price</th>
              <th className="p-3">Transaction ID</th>
              <th className="p-3">Paid At</th>
            </tr>
          </thead>
          <tbody>
            {lastSixPayments.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center p-4 text-gray-400">
                  No transactions found.
                </td>
              </tr>
            )}
            {lastSixPayments.map((payment) => (
              <tr key={payment._id} className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} ${tableRowHover}`}>
                <td className="p-3 font-medium">{payment.trainerName || 'N/A'}</td>
                <td className="p-3">{payment.userName || payment.userEmail || 'N/A'}</td>
                <td className="p-3">
                  {payment.slot
                    ? `${payment.slot.slotName} - ${payment.slot.slotTime}`
                    : 'N/A'}
                </td>
                <td className="p-3">{payment.packageName || 'N/A'}</td>
                <td className="p-3 text-green-400 font-semibold">
                  ${payment.price?.toFixed(2)}
                </td>
                <td className="p-3 font-mono text-xs">{payment.transactionId}</td>
                <td className="p-3">
                  <time dateTime={payment.paidAt}>
                    {new Date(payment.paidAt).toLocaleString()}
                  </time>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Charts />
    </div>
  );
};

export default Balance;
