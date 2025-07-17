import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';  // your axios instance with auth
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
  queryKey: ['statsCounts'],
  queryFn: async () => {
    const res = await axiosSecure.get('/stats/counts');
    return res.data;
  },
});
  console.log(data);
  

  if (isLoading) return <p className="text-white">Loading chart...</p>;
  if (error) return <p className="text-red-500">Failed to load chart data.</p>;

  const { paymentsCount, newsletterCount } = data;

  const chartData = {
    labels: ['Paid Members', 'Newsletter Subscribers'],
    datasets: [
      {
        label: 'Counts',
        data: [paymentsCount, newsletterCount],
        backgroundColor: [
          'rgba(0, 240, 255, 0.7)',  // cyan
          'rgba(162, 89, 255, 0.7)', // purple
        ],
        borderColor: [
          'rgba(0, 240, 255, 1)',
          'rgba(162, 89, 255, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: { weight: 'bold', size: 16 },
        bodyFont: { size: 14 },
      },
    },
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-lg text-white">
      <h3 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#A259FF]">
        Membership & Newsletter Overview
      </h3>

      <Pie data={chartData} options={options} />

      <div className="mt-6 text-center text-gray-300 space-y-1">
        <p><strong>Paid Members:</strong> {paymentsCount}</p>
        <p><strong>Newsletter Subscribers:</strong> {newsletterCount}</p>
      </div>
    </div>
  );
};

export default Charts;
