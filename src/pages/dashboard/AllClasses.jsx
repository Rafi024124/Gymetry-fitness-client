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

  if (isLoading) return <Loaging></Loaging>;
  if (error) return <p className="text-center text-red-400">Error loading classes</p>;

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-3xl text-center font-bold mb-8">All Classes</h2>

      <div className="grid gap-8">
        {classes.map((cls) => (
          <div key={cls._id} className="bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-blue-400 mb-2">{cls.name}</h3>
            <p className="text-gray-300 mb-4">{cls.description}</p>

            {/* Trainers */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Top Trainers</h4>
              {cls.trainers?.length ? (
                <div className="flex gap-4 flex-wrap">
                  {cls.trainers.map((trainer) => (
                    <div
                      key={trainer._id}
                      className="cursor-pointer text-center"
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
                        className="w-16 h-16 rounded-full border-2 border-blue-500"
                      />
                      <p className="text-sm mt-1">{trainer.fullName}</p>
                    </div>
                  ))}
                </div>
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
