import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { ThemeContext } from '../../contexts/ThemeContext';


ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = () => {
  const { theme } = useContext(ThemeContext);
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
    queryKey: ['statsCounts'],
    queryFn: async () => {
      const res = await axiosSecure.get('/stats/counts');
      return res.data;
    },
  });

  if (isLoading) return <p className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>Loading chart...</p>;
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
          color: theme === 'dark' ? 'white' : '#1e293b', // adapt to theme
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)',
        titleColor: theme === 'dark' ? '#ffffff' : '#1e293b',
        bodyColor: theme === 'dark' ? '#ffffff' : '#1e293b',
        titleFont: { weight: 'bold', size: 16 },
        bodyFont: { size: 14 },
      },
    },
  };

  const containerBg = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-sky-50 text-gray-900';

  return (
    <div className={`max-w-md mx-auto p-6 rounded-lg shadow-lg ${containerBg}`}>
      <h3 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#A259FF]">
        Membership & Newsletter Overview
      </h3>

      <Pie data={chartData} options={options} />

      <div className={`mt-6 text-center space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        <p><strong>Paid Members:</strong> {paymentsCount}</p>
        <p><strong>Newsletter Subscribers:</strong> {newsletterCount}</p>
      </div>
    </div>
  );
};

export default Charts;
