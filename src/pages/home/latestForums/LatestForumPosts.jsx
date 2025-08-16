import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { ThemeContext } from '../../../contexts/ThemeContext';

const LatestForumPosts = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useContext(ThemeContext);

  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['latestForumPosts'],
    queryFn: async () => {
      const res = await axiosSecure.get('/forums/latest');
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-8">Loading awesome content... ⏳</p>;
  if (error) return <p className="text-center text-red-500 mt-8">Oops! Something broke 💥</p>;

  // Theme-based classes
  const sectionBg = theme === 'dark' ? 'bg-[#0D0D0D]' : 'bg-sky-100';
  const headingText = theme === 'dark' ? 'text-cyan-300 neon-text-glow' : 'text-sky-700 font-bold';
  const cardBg = theme === 'dark' ? 'bg-white/5 text-white border border-cyan-500/10 backdrop-blur-md shadow-xl' 
                                   : 'bg-white text-gray-800 border border-sky-300/30 shadow-md';
  const titleText = theme === 'dark' ? 'text-white' : 'text-sky-800';
  const authorText = theme === 'dark' ? 'text-pink-400' : 'text-pink-600';
  const contentText = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const btnText = theme === 'dark' ? 'text-cyan-400 border border-cyan-400 hover:bg-cyan-400 hover:text-[#0D0D0D]' 
                                   : 'text-sky-700 border border-sky-700 hover:bg-sky-700 hover:text-white';
  const badgeBg = theme === 'dark' ? 'bg-cyan-500 text-[#0D0D0D]' : 'bg-sky-500 text-white';

  return (
    <div className={`${sectionBg} min-h-screen py-16`}>
      <section className="max-w-7xl mx-auto px-2 lg:px-0">
        <h2 className={`text-center text-5xl font-extrabold mb-14 ${headingText}`}>
          🚀 Trending in the Forum
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <div
              key={post._id}
              className={`relative ${cardBg} rounded-2xl p-5 transition-transform duration-300 transform hover:-translate-y-2 hover:rotate-1 group`}
            >
              <img
                src={post.imageUrl || 'https://via.placeholder.com/400x200?text=Forum+Post'}
                alt={post.title}
                className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-[1.03] transition duration-300"
              />
              <h3 className={`text-xl font-bold line-clamp-2 mb-2 ${titleText}`}>
                📝 {post.title}
              </h3>
              <p className={`text-sm mb-1 ${contentText}`}>
                👤 <span className={authorText}>{post.author}</span> • {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className={`${contentText} text-sm mb-4 line-clamp-3`}>
                {post.content}
              </p>

              <Link
                to={`/forums`}
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold transition-all duration-200 ${btnText}`}
              >
                🔍 Dive In →
              </Link>

              <div className={`absolute top-2 right-2 text-xs px-3 py-1 rounded-full font-bold ${badgeBg}`}>
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
