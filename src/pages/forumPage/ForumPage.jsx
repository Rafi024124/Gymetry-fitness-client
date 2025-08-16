import React, { useState, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../contexts/authContext/AuthContext';

import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Loaging from '../../loagind/Loaging';
import { useLocation, useNavigate } from 'react-router';
import useAxios from '../../hooks/useAxios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { ThemeContext } from '../../contexts/ThemeContext';

const ForumPage = () => {
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const postsPerPage = 6;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['forumPosts', page],
    queryFn: async () => {
      const res = await axiosInstance.get(`/forum-posts?page=${page}&limit=${postsPerPage}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const handleVote = async (postId, voteType) => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'You must be logged in to vote on posts.',
        background: theme === 'dark' ? '#0f0f0f' : '#f0f9ff',
        color: theme === 'dark' ? '#F2F2F2' : '#0369a1',
        confirmButtonColor: theme === 'dark' ? '#00F0FF' : '#0ea5e9',
      });
      navigate('/login', { state: { from: location } });
      return;
    }

    try {
      await axiosSecure.post(`/forum-posts/${postId}/vote`, {
        voteType,
        userId: user.uid || user.email,
      });
      queryClient.invalidateQueries(['forumPosts', page]);
    } catch (err) {
      console.error('Vote failed:', err);
      Swal.fire({
        icon: 'error',
        title: 'Vote Failed',
        text: 'Something went wrong while submitting your vote.',
        background: theme === 'dark' ? '#0f0f0f' : '#f0f9ff',
        color: theme === 'dark' ? '#F2F2F2' : '#0369a1',
        confirmButtonColor: theme === 'dark' ? '#00F0FF' : '#0ea5e9',
      });
    }
  };

  if (isLoading) return <Loaging />;
  if (isError)
    return (
      <div className="text-center p-10 text-red-500">
        Error: {error.message}
      </div>
    );

  const { posts, totalPages } = data;

  // Theme-based classes
  const sectionBg = theme === 'dark' ? 'bg-[#0A0A0A] text-white' : 'bg-sky-100 text-gray-900';
  const cardBg = theme === 'dark' ? 'bg-[#1A1A1A]/60 text-white' : 'bg-white text-gray-900';
  const textGray = theme === 'dark' ? 'text-gray-400' : 'text-gray-700';
  const neonText = theme === 'dark' ? 'neon-text' : '';
  const glowBtn = theme === 'dark' ? 'glow-btn' : 'bg-cyan-500 hover:bg-cyan-600 text-white';

  return (
    <div className={`${sectionBg} min-h-screen py-12 px-2 sm:px-10`}>
      <h1 className={`text-5xl font-extrabold text-center mb-14 ${neonText}`}>💬 Gymetry Forum</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {posts.map((post) => {
          const currentVote = post.votesByUser?.[user?.uid || user?.email] || 0;

          return (
            <div
              key={post._id}
              className={`${cardBg} backdrop-blur-md rounded-xl overflow-hidden shadow-xl hover:shadow-neon transition-all duration-300`}
            >
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-56 object-contain"
                />
              )}

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=${post.author}&background=random`}
                      alt="author"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-semibold">{post.author}</span>
                  </div>
                  {post.author && (
                    <span
                      className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                        post.role === 'admin'
                          ? 'bg-red-600 text-white'
                          : post.role === 'trainer'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-400 text-black'
                      }`}
                    >
                      {post.role}
                    </span>
                  )}
                </div>

                <h2 className={`text-2xl font-bold ${neonText}`}>{post.title}</h2>
                <p className={`${textGray} line-clamp-3`}>{post.content}</p>

                <div className="flex items-center justify-between">
                  <div className={`text-sm ${textGray}`}>
                    Posted on {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleVote(post._id, 'up')}
                      className={`text-xl hover:scale-125 transition-transform duration-200 ${
                        currentVote === 1
                          ? 'text-[#00F0FF]'
                          : `${textGray} hover:text-[#00F0FF]`
                      }`}
                    >
                      <FaArrowUp />
                    </button>
                    <button
                      onClick={() => handleVote(post._id, 'down')}
                      className={`text-xl hover:scale-125 transition-transform duration-200 ${
                        currentVote === -1
                          ? 'text-[#FF6B6B]'
                          : `${textGray} hover:text-[#FF6B6B]`
                      }`}
                    >
                      <FaArrowDown />
                    </button>
                    <span className="text-white text-sm font-semibold">
                      👍 {post.upvotes || 0} / 👎 {post.downvotes || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-6 mt-14">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className={`px-6 py-2 rounded-full font-semibold ${glowBtn} disabled:opacity-30`}
        >
          ◀ Prev
        </button>
        <span className="text-lg font-semibold">
          Page {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((old) => Math.min(old + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-6 py-2 rounded-full font-semibold ${glowBtn} disabled:opacity-30`}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default ForumPage;
