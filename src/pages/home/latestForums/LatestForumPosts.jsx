import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
// your axios secure hook

const LatestForumPosts = () => {
  const axiosSecure = useAxiosSecure();

  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['latestForumPosts'],
    queryFn: async () => {
      const res = await axiosSecure.get('/forums/latest');
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center text-white mt-8">Loading latest posts...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">Failed to load posts</p>;

  return (
    <div className="  mx-auto px-20 py-8 text-white bg-[#0D0D0D]">
      <h2 className="text-4xl lg:text-5xl py-4 neon-text font-bold mb-6 text-center">Latest Community Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post._id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
            <img
              src={post.imageUrl || '/default-post.jpg'}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-sm text-gray-300 mb-3">
                By <span className="font-medium">{post.author}</span> on{' '}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-400 mb-4">
                {post.content.length > 100 ? post.content.slice(0, 100) + '...' : post.content}
              </p>
              <Link
                to={`/forums`}
                className="inline-block text-blue-400 hover:text-blue-600 font-semibold"
              >
                Read More &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestForumPosts;
