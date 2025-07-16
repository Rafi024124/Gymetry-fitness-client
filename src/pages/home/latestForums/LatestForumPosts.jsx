import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const LatestForumPosts = () => {
  const axiosSecure = useAxiosSecure();

  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['latestForumPosts'],
    queryFn: async () => {
      const res = await axiosSecure.get('/forums/latest');
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center text-white mt-8">Loading awesome content... ⏳</p>;
  if (error) return <p className="text-center text-red-500 mt-8">Oops! Something broke 💥</p>;

  return (
    <div className="w-full bg-[#0D0D0D] min-h-screen py-16">
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-5xl font-extrabold text-cyan-300 neon-text-glow mb-14">
          🚀 Trending in the Forum
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <div
              key={post._id}
              className="relative bg-white/5 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-cyan-500/10 transition-transform duration-300 transform hover:-translate-y-2 hover:rotate-1 group"
            >
              <img
                src={post.imageUrl || 'https://via.placeholder.com/400x200?text=Forum+Post'}
                alt={post.title}
                className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-[1.03] transition duration-300"
              />
              <h3 className="text-xl font-bold text-white line-clamp-2 mb-2">
                📝 {post.title}
              </h3>
              <p className="text-sm text-gray-400 mb-1">
                👤 <span className="text-pink-400">{post.author}</span> • {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {post.content}
              </p>

              <Link
                to={`/forums`}
                className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-cyan-400 border border-cyan-400 hover:bg-cyan-400 hover:text-[#0D0D0D] transition-all duration-200"
              >
                🔍 Dive In →
              </Link>

              <div className="absolute top-2 right-2 bg-cyan-500 text-[#0D0D0D] text-xs px-3 py-1 rounded-full font-bold">
                NEW
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LatestForumPosts;
