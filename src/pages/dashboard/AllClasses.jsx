import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import Loaging from '../../loagind/Loaging';

const AllClasses = () => {
  const navigate = useNavigate();

  const { data: classes = [], isLoading, error } = useQuery({
    queryKey: ['all-classes'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/classes-with-top-trainers');
      if (!res.ok) throw new Error('Failed to fetch classes');
      return res.json();
    },
  });

  if (isLoading) return <Loaging />;
  if (error) return <p className="text-center text-red-400 mt-10">Error loading classes</p>;

  return (
    <div className='w-full bg-gray-900'>
      <div className="p-6 bg-gray-900 text-white min-h-screen max-w-7xl mx-auto">
      <h2 className="text-4xl text-center font-bold mb-12 neon-text">All Classes</h2>

      <div className="flex flex-col gap-10">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className="bg-gray-800 p-6 rounded-xl shadow-md flex flex-col md:flex-row md:items-center gap-8"
          >
            {/* Left: Class Info */}
            <div className="md:w-1/6 flex flex-col items-center md:items-start text-center md:text-left gap-4">
              <h3 className="text-3xl font-extrabold neon-text">{cls.name}</h3>
              <img src={cls.image} alt="" className="w-40 h-40 rounded-xl object-cover shadow" />
              <p className="text-gray-400 text-sm">{cls.description}</p>
            </div>

            {/* Divider */}
            <div className="hidden md:block border-l border-gray-600 h-40"></div>

            {/* Right: Trainers */}
            <div className="flex-1 flex flex-wrap justify-center md:justify-start gap-6 items-center">
              {cls.trainers?.length ? (
                cls.trainers.map((trainer) => (
                  <div
                    key={trainer._id}
                    className="cursor-pointer text-center w-24 hover:scale-105 transition-transform"
                    onClick={() =>
                      navigate(`/trainer/${trainer._id}?className=${encodeURIComponent(cls.name)}`)
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        navigate(`/trainer/${trainer._id}?className=${encodeURIComponent(cls.name)}`);
                      }
                    }}
                  >
                    <img
                      src={trainer.profileImage || '/default-avatar.png'}
                      alt={trainer.fullName}
                      className="w-20 h-20 rounded-full object-cover mx-auto"
                    />
                    <p className="text-sm mt-2">{trainer.fullName}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-red-400">No approved trainers associated.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AllClasses;
