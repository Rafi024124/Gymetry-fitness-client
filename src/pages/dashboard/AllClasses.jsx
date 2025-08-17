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
  const [sortOption, setSortOption] = useState(''); // New sort option

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

  // Sorting by number of trainers
  const sortedClasses = [...classes].sort((a, b) => {
    switch (sortOption) {
      case 'trainersAsc':
        return (a.trainers?.length || 0) - (b.trainers?.length || 0); // Few → Many
      case 'trainersDesc':
        return (b.trainers?.length || 0) - (a.trainers?.length || 0); // Many → Few
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

        {/* Sort Dropdown */}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {sortedClasses.length > 0 ? (
          sortedClasses.map((cls) => (
            <div
              key={cls._id}
              className={`flex flex-col md:flex-row rounded-2xl shadow-xl overflow-hidden ${cardBg} p-6 md:p-8 gap-6 hover:scale-105 transform transition-transform duration-300`}
            >
              {/* Class Info */}
              <div className="md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left gap-4">
                <h3 className={`text-2xl md:text-3xl font-extrabold ${neonText}`}>{cls.name}</h3>
                <img
                  src={cls.image}
                  alt={cls.name}
                  className="w-40 h-40 rounded-xl object-cover shadow-lg"
                />
                <p className={`text-sm ${textGray}`}>{cls.description}</p>
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
                        className="w-20 h-20 rounded-full object-cover mx-auto shadow-md"
                      />
                      <p className="text-sm mt-2">{trainer.fullName}</p>
                    </div>
                  ))
                ) : (
                  <p className={`text-sm ${textRed}`}>No approved trainers associated.</p>
                )}
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
