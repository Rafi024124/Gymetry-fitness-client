import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const TeamSection = () => {
  const axiosSecure = useAxiosSecure();

  const { data: trainers = [], isLoading, error } = useQuery({
    queryKey: ['trainers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/trainers');
      return res.data;
    },
  });

  if (isLoading) return <p>Loading team...</p>;
  if (error) return <p>Error loading team</p>;

  // Take only first 3 trainers
  const team = trainers.slice(0, 3);

  return (
    <section className="team-section max-w-6xl mx-auto p-6">
      <h2 className="text-4xl font-bold mb-8 text-center">Meet Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {team.map((trainer) => (
          <div key={trainer._id} className="bg-gray-800 p-6 rounded-lg text-white shadow">
            <img
              src={trainer.profileImage || '/default-avatar.png'}
              alt={trainer.fullName}
              className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold text-center">{trainer.fullName}</h3>
            <p className="text-center text-gray-300 mb-3">
              {trainer.otherInfo || 'No biography provided.'}
            </p>
            <p className="text-center text-blue-400">
              Skills: {trainer.skills?.join(', ') || 'N/A'}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
