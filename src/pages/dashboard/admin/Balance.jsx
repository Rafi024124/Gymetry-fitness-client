import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaMoneyBillWave, FaDollarSign } from 'react-icons/fa';
import Loaging from '../../../loagind/Loaging';

const Balance = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
    queryKey: ['paymentsSummary'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payments/summary');
      return res.data;
    },
  });

  if (isLoading) return <Loaging></Loaging>;
  if (error) return <div className="text-center p-6 text-red-600">Failed to load data.</div>;

  const { totalBalance, lastSixPayments } = data;

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gradient bg-gradient-to-r from-[#A259FF] to-[#00F0FF] bg-clip-text text-transparent mb-10">
        <FaMoneyBillWave className="text-green-400" />Financial Overview
      </h2>

      <div className="mb-8 p-4 bg-gray-800 rounded-lg flex justify-between items-center">
        <div>
          <p className="text-gray-400 uppercase tracking-wide">Total Balance</p>
          <p className="text-4xl font-extrabold flex items-center gap-2">
            <FaDollarSign className="text-green-500" /> ${totalBalance?.toFixed(2)}
          </p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-800 text-gray-400 uppercase">
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
              <tr key={payment._id} className="border-b border-gray-700 hover:bg-gray-800">
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
    </div>
  );
};

export default Balance;
