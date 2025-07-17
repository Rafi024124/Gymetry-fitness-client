import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../contexts/authContext/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaHeading, FaImage, FaRegFileAlt } from 'react-icons/fa';

const AddNewForum = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchRole = async () => {
      if (user?.email) {
        try {
          const res = await axiosSecure.get(`/users?email=${user.email}`);
          setRole(res.data.role || 'member'); // fallback role
        } catch (err) {
          console.error('Failed to fetch role:', err);
        }
      }
    };

    fetchRole();
  }, [user?.email, axiosSecure]);

  const onSubmit = async (data) => {
    const forumData = {
      title: data.title,
      content: data.content,
      imageUrl: data.imageUrl || '',
      author: user?.displayName || user?.email || 'Anonymous',
      role: role || 'member', // include role in post data
      votes: 0,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post('/forums', forumData);
      if (res.data.insertedId || res.data._id) {
        Swal.fire('✅ Success!', 'Forum post created successfully!', 'success');
        reset();
      } else {
        throw new Error('Failed to create forum post');
      }
    } catch (error) {
      Swal.fire('❌ Error!', error.message || 'Something went wrong', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 rounded-2xl bg-[#0f0f0f] border border-[#1f1f1f] shadow-[0_0_4px_rgba(0,255,255,0.1)]">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 text-center mb-10 ">
        📝 Add New Forum Post
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-white">
        {/* Role (read-only) */}
        <div>
          <label className="text-cyan-300 mb-2 font-semibold">Role</label>
          <input
            type="text"
            value={role}
            readOnly
            className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] text-gray-400 cursor-not-allowed border border-cyan-500 shadow-[0_0_4px_#00F0FF]"
          />
        </div>

        {/* Title */}
        <div>
          <label className="flex items-center gap-2 text-cyan-300 mb-2 font-semibold">
            <FaHeading className="text-cyan-300" />
            Title
          </label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            placeholder="e.g. Top 10 Workout Hacks"
            className={`w-full px-4 py-3 rounded-xl bg-[#1a1a1a] placeholder-gray-400 text-white focus:outline-none border ${
              errors.title
                ? 'border-red-500 shadow-[0_0_4px_#FF0000]'
                : 'border-cyan-500 shadow-[0_0_4px_#00F0FF]'
            }`}
          />
          {errors.title && <p className="text-red-400 mt-1 text-sm">{errors.title.message}</p>}
        </div>

        {/* Content */}
        <div>
          <label className="flex items-center gap-2 text-cyan-300 mb-2 font-semibold">
            <FaRegFileAlt className="text-cyan-300" />
            Content
          </label>
          <textarea
            rows={6}
            {...register('content', { required: 'Content is required' })}
            placeholder="Write your thoughts here..."
            className={`w-full px-4 py-3 rounded-xl bg-[#1a1a1a] placeholder-gray-400 text-white focus:outline-none border ${
              errors.content
                ? 'border-red-500 shadow-[0_0_4px_#FF0000]'
                : 'border-cyan-500 shadow-[0_0_4px_#00F0FF]'
            }`}
          />
          {errors.content && <p className="text-red-400 mt-1 text-sm">{errors.content.message}</p>}
        </div>

        {/* Image URL */}
        <div>
          <label className="flex items-center gap-2 text-cyan-300 mb-2 font-semibold">
            <FaImage className="text-cyan-300" />
            Image URL <span className="text-sm text-gray-400">(optional)</span>
          </label>
          <input
            type="url"
            {...register('imageUrl')}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] placeholder-gray-400 text-white border border-cyan-500 shadow-[0_0_4px_#00F0FF] focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Posting...' : '📨 Publish Forum Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewForum;
