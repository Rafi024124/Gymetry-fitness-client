import React, { useState, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../contexts/authContext/AuthContext';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Loaging from '../../loagind/Loaging';
import { useLocation, useNavigate } from 'react-router';

const ForumPage = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const postsPerPage = 6;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['forumPosts', page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/forum-posts?page=${page}&limit=${postsPerPage}`);
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
        background: '#0f0f0f',
        color: '#F2F2F2',
        confirmButtonColor: '#007a7a',

        
      });

      navigate('/login', { state: { from: location } });
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
        background: '#0f0f0f',
        color: '#F2F2F2',
        confirmButtonColor: '#007a7a',
      });
    }
  };

  if (isLoading) return <Loaging />;
  if (isError) return <div className="text-center p-10 text-red-500">Error: {error.message}</div>;

  const { posts, totalPages } = data;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white py-12 px-4 sm:px-10">
      <h1 className="text-5xl font-extrabold text-center mb-14 neon-text">💬 Gymetry Forum</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {posts.map((post) => {
          const currentVote = post.votesByUser?.[user?.uid || user?.email] || 0;

          return (
            <div
              key={post._id}
              className="bg-[#1A1A1A] backdrop-blur-md bg-opacity-60 neon-border rounded-xl overflow-hidden shadow-xl hover:shadow-neon transition-all duration-300"
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 space-y-3">
                <h2 className="text-2xl font-bold neon-text">{post.title}</h2>
                <p className="text-gray-400 line-clamp-3">{post.content}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex gap-2 items-center text-sm text-gray-400">
                    <img
                      src={`https://ui-avatars.com/api/?name=${post.author}&background=random`}
                      alt="author"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleVote(post._id, 'up')}
                      className={`text-xl hover:scale-125 transition-transform duration-200 ${
                        currentVote === 1 ? 'text-[#00F0FF]' : 'text-gray-400 hover:text-[#00F0FF]'
                      }`}
                    >
                      <FaArrowUp />
                    </button>
                    <button
                      onClick={() => handleVote(post._id, 'down')}
                      className={`text-xl hover:scale-125 transition-transform duration-200 ${
                        currentVote === -1 ? 'text-[#FF6B6B]' : 'text-gray-400 hover:text-[#FF6B6B]'
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
          className="px-6 py-2 rounded-full glow-btn text-white font-semibold disabled:opacity-30"
        >
          ◀ Prev
        </button>
        <span className="text-white text-lg font-semibold">Page {page} / {totalPages}</span>
        <button
          onClick={() => setPage((old) => Math.min(old + 1, totalPages))}
          disabled={page === totalPages}
          className="px-6 py-2 rounded-full glow-btn text-white font-semibold disabled:opacity-30"
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default ForumPage;
