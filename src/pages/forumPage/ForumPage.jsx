import React, { useState, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../contexts/authContext/AuthContext';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const ForumPage = () => {
  const axiosSecure = useAxiosSecure();
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
      alert('Please login to vote');
      return;
    }
    try {
      await axiosSecure.post(`/forum-posts/${postId}/vote`, { voteType,
        userId: user.uid || user.email,
       });
      queryClient.invalidateQueries(['forumPosts', page]);
    } catch (err) {
      console.error('Vote failed:', err);
    }
  };

  if (isLoading)
    return <div className="text-center p-10 text-white">Loading posts...</div>;
  if (isError)
    return (
      <div className="text-center p-10 text-red-500">Error: {error.message}</div>
    );

  const { posts, totalPages } = data;

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto px-4 py-6 bg-[#1f1f1f] text-white rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-center flex-shrink-0">Forum</h1>

      {/* Scrollable posts container */}
      <div className="flex-1 overflow-y-auto space-y-8">
        {posts.length === 0 && <p className="text-center">No posts available.</p>}

        {posts.map((post) => (
          <article
            key={post._id}
            className="bg-[#292929] rounded-lg shadow-lg overflow-hidden flex gap-6"
            style={{ minHeight: '140px' }}
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-[200px] h-[140px] object-cover flex-shrink-0"
              loading="lazy"
            />
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-400 mb-3 text-sm line-clamp-3">{post.content}</p>
                <p className="text-sm text-gray-500 mb-2">By: {post.author}</p>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleVote(post._id, 'up')}
                    aria-label="Upvote"
                    className="text-blue-500 hover:text-blue-400 transition text-lg"
                  >
                    <FaArrowUp />
                  </button>
                  <button
                    onClick={() => handleVote(post._id, 'down')}
                    aria-label="Downvote"
                    className="text-red-500 hover:text-red-400 transition text-lg"
                  >
                    <FaArrowDown />
                  </button>
                </div>
                <p className="font-semibold select-none">Votes: {post.votes}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6 flex-shrink-0">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="bg-[#A259FF] px-4 py-2 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-white flex items-center">
          {page} / {totalPages || 1}
        </span>
        <button
          onClick={() => setPage((old) => (totalPages ? Math.min(old + 1, totalPages) : old + 1))}
          disabled={page === totalPages}
          className="bg-[#A259FF] px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ForumPage;
