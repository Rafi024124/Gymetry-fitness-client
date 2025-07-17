import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import Loaging from '../../loagind/Loaging';
import { AuthContext } from '../../contexts/authContext/AuthContext';
import useAxios from '../../hooks/useAxios';


const AllClasses = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();

  // Pagination state
  const [page, setPage] = useState(1);

  // Input state for search box (updates on every key stroke)
  const [searchInput, setSearchInput] = useState('');

  // Committed search term, used for query and updated on Search button click
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch classes with pagination & search params using axiosInstance
  const { data, isLoading, error } = useQuery({
    queryKey: ['all-classes', page, searchTerm],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '6',
        search: searchTerm,
      }).toString();

      const res = await axiosInstance.get(`/classes-with-top-trainers?${params}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <Loaging />;
  if (error) return <p className="text-center text-red-400 mt-10">Error loading classes</p>;

  const classes = data?.classes || [];
  const totalPages = data?.totalPages || 1;

  const handleTrainerClick = (trainerId, className) => {
    if (!user || !user.uid) {
      navigate(`/login`, {
        state: { from: `/trainer/${trainerId}?className=${encodeURIComponent(className)}` },
      });
      return;
    }
    navigate(`/trainer/${trainerId}?className=${encodeURIComponent(className)}`);
  };

  // On Search button click: reset page to 1, update searchTerm to trigger query
  const handleSearch = () => {
    setPage(1);
    setSearchTerm(searchInput.trim());
  };

  return (
    <div className="w-full bg-gray-900">
      <div className="p-6 bg-gray-900 text-white min-h-screen max-w-7xl mx-auto">
        <h2 className="text-4xl text-center font-bold mb-8 neon-text">All Classes</h2>

        {/* Search input + button */}
        <div className="mb-8 flex justify-center gap-4">
          <input
            type="text"
            placeholder="Search classes..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="px-4 py-2 rounded-md text-white bg-gray-700 placeholder-gray-400 w-full max-w-md"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-700 transition"
          >
            Search
          </button>
        </div>

        {/* Classes list */}
        <div className="flex flex-col gap-10">
          {classes.length > 0 ? (
            classes.map((cls) => (
              <div
                key={cls._id}
                className="bg-gray-800 p-6 rounded-xl shadow-md flex flex-col md:flex-row md:items-center gap-8"
              >
                {/* Class Info */}
                <div className="md:w-1/6 flex flex-col items-center md:items-start text-center md:text-left gap-4">
                  <h3 className="text-3xl font-extrabold neon-text">{cls.name}</h3>
                  <img
                    src={cls.image}
                    alt={cls.name}
                    className="w-40 h-40 rounded-xl object-cover shadow"
                  />
                  <p className="text-gray-400 text-sm">{cls.description}</p>
                </div>

                {/* Divider */}
                <div className="hidden md:block border-l border-gray-600 h-40"></div>

                {/* Trainers */}
                <div className="flex-1 flex flex-wrap justify-center md:justify-start gap-6 items-center">
                  {cls.trainers?.length ? (
                    cls.trainers.map((trainer) => (
                      <div
                        key={trainer._id}
                        className="cursor-pointer text-center w-24 hover:scale-105 transition-transform"
                        onClick={() => handleTrainerClick(trainer._id, cls.name)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleTrainerClick(trainer._id, cls.name);
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
            ))
          ) : (
            <p className="text-center text-gray-400">No classes found.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12 gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            className="px-4 py-2 rounded bg-gray-700 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-white px-4 py-2">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((old) => Math.min(old + 1, totalPages))}
            className="px-4 py-2 rounded bg-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllClasses;
