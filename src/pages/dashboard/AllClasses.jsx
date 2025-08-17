import React, { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import Loaging from '../../loagind/Loaging';
import { AuthContext } from '../../contexts/authContext/AuthContext';
import useAxios from '../../hooks/useAxios';
import { ThemeContext } from '../../contexts/ThemeContext';

const AllClasses = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();

  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

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
  if (error)
    return <p className="text-center text-red-500 mt-10">Error loading classes</p>;

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

  const handleSearch = () => {
    setPage(1);
    setSearchTerm(searchInput.trim());
  };

  const sortedClasses = [...classes].sort((a, b) => {
    switch (sortOption) {
      case 'trainersAsc':
        return (a.trainers?.length || 0) - (b.trainers?.length || 0);
      case 'trainersDesc':
        return (b.trainers?.length || 0) - (a.trainers?.length || 0);
      default:
        return 0;
    }
  });

  // Theme-based classes
  const sectionBg = theme === 'dark' ? 'bg-[#0D0D0D]' : 'bg-sky-100';
  const cardBg = theme === 'dark' ? 'bg-[#1f1f1f]/60 text-white' : 'bg-white text-gray-900';
  const inputBg = theme === 'dark' ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500';
  const buttonBg = theme === 'dark' ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-sky-500 hover:bg-sky-600';
  const neonText = theme === 'dark' ? 'neon-text' : '';
  const textGray = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const textRed = theme === 'dark' ? 'text-red-400' : 'text-red-600';
  const dividerColor = theme === 'dark' ? 'border-gray-600' : 'border-gray-300';

  return (
    <div className={`${sectionBg} py-16 px-4 md:px-12 min-h-screen`}>
      <h2 className={`text-4xl font-extrabold text-center mb-12 ${neonText}`}>
        All Classes
      </h2>

      {/* Search & Sort */}
      <div className="mb-10 flex flex-col sm:flex-row justify-center items-center gap-4">
        <input
          type="text"
          placeholder="Search classes..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className={`px-4 py-2 rounded-md w-full max-w-md border ${inputBg} focus:outline-none focus:ring-2 focus:ring-cyan-400`}
        />
        <button
          onClick={handleSearch}
          className={`px-6 py-2 rounded-md font-semibold transition ${buttonBg} text-white`}
        >
          Search
        </button>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className={`px-4 py-2 rounded-md border ${inputBg}`}
        >
          <option value="">Sort by Trainers</option>
          <option value="trainersAsc">Few → Few Trainers</option>
          <option value="trainersDesc">Many → Many Trainers</option>
        </select>
      </div>

      {/* Classes List */}
      <div className="flex flex-col gap-10">
        {sortedClasses.length > 0 ? (
          sortedClasses.map((cls) => (
            <div
              key={cls._id}
              className={`flex flex-col md:flex-row rounded-2xl shadow-xl overflow-hidden ${cardBg} p-6 md:p-8 gap-6 hover:scale-105 transform transition-transform duration-300 h-auto md:h-72`}
            >
              {/* Left: Class Image */}
              <div className="md:w-1/3 flex-shrink-0 flex justify-center items-center mb-4 md:mb-0">
                <img
                  src={cls.image}
                  alt={cls.name}
                  className="w-40 h-40 sm:w-36 sm:h-36 rounded-xl object-cover shadow-lg"
                />
              </div>

              {/* Right: Info */}
              <div className="flex-1 flex flex-col justify-between gap-4">
                <div>
                  <h3 className={`text-2xl md:text-3xl font-extrabold ${neonText}`}>
                    {cls.name}
                  </h3>
                  <p className={`text-sm ${textGray} line-clamp-3`}>
                    {cls.description}
                  </p>
                </div>

                {/* Divider */}
                <hr className={`border-t ${dividerColor}`} />

                {/* Trainers */}
                <div className="flex flex-wrap gap-4 mt-2">
                  {cls.trainers?.length ? (
                    cls.trainers.map((trainer) => (
                      <div
                        key={trainer._id}
                        className="cursor-pointer text-center w-20 hover:scale-105 transition-transform"
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
                          className="w-16 h-16 sm:w-14 sm:h-14 rounded-full object-cover mx-auto shadow-md"
                        />
                        <p className="text-sm mt-1">{trainer.fullName}</p>
                      </div>
                    ))
                  ) : (
                    <p className={`text-sm ${textRed}`}>No approved trainers associated.</p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className={`text-center ${textGray}`}>No classes found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12 gap-4 items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          className="px-4 py-2 rounded-md bg-gray-700 disabled:opacity-50 text-white"
        >
          Prev
        </button>
        <span className="text-white px-4 py-2">{`Page ${page} of ${totalPages}`}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((old) => Math.min(old + 1, totalPages))}
          className="px-4 py-2 rounded-md bg-gray-700 disabled:opacity-50 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllClasses;
