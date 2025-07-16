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
    <div className="p-6 bg-gray-900 text-white min-h-screen  mx-auto">
      <h2 className="text-4xl text-center font-bold mb-12 neon-text">All Classes</h2>

      <div className="flex flex-col gap-10">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className="bg-gray-800 p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center md:items-start gap-6"
          >
            {/* Left side: Class Name and Description */}
            <div className="md:w-1/3">
              <h3 className="text-4xl font-extrabold neon-text mb-2">
                {cls.name}
              </h3>
              <p className="text-gray-400 lowercase leading-relaxed">
                {cls.description}
              </p>
            </div>

            {/* Divider */}
            <div className="hidden md:block border-l border-gray-600 h-28 mx-6"></div>

            {/* Right side: Trainers */}
            <div className="md:w-1/2 flex flex-wrap justify-start gap-6">
              {cls.trainers?.length ? (
                cls.trainers.map((trainer) => (
                  <div
                    key={trainer._id}
                    className="cursor-pointer text-center w-20"
                    onClick={() =>
                      navigate(
                        `/trainer/${trainer._id}?className=${encodeURIComponent(cls.name)}`
                      )
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        navigate(
                          `/trainer/${trainer._id}?className=${encodeURIComponent(cls.name)}`
                        );
                      }
                    }}
                  >
                    <img
                      src={trainer.profileImage || '/default-avatar.png'}
                      alt={trainer.fullName}
                      className="w-16 h-16 rounded-full border-2 border-blue-500 object-cover mx-auto"
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
  );
};

export default AllClasses;
