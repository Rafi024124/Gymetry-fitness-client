import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../contexts/authContext/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaHeading, FaImage, FaRegFileAlt } from 'react-icons/fa';

const AddNewForum = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const forumData = {
      title: data.title,
      content: data.content,
      imageUrl: data.imageUrl || '',
      author: user?.displayName || user?.email || 'Anonymous',
      votes: 0,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post('/forums', forumData);
      if (res.data.insertedId || res.data._id) {
        Swal.fire('Success!', 'Forum post created successfully!', 'success');
        reset();
      } else {
        throw new Error('Failed to create forum post');
      }
    } catch (error) {
      Swal.fire('Error!', error.message || 'Something went wrong', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gray-900 rounded-2xl shadow-xl border border-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        📝 Add New Forum Post
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="flex items-center gap-2 mb-1 font-medium text-gray-300">
            <FaHeading /> Title
          </label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 10 Tips to Stay Fit"
          />
          {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Content */}
        <div>
          <label className="flex items-center gap-2 mb-1 font-medium text-gray-300">
            <FaRegFileAlt /> Content
          </label>
          <textarea
            rows={6}
            {...register('content', { required: 'Content is required' })}
            className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your full content here..."
          />
          {errors.content && <p className="text-red-400 text-sm mt-1">{errors.content.message}</p>}
        </div>

        {/* Image URL */}
        <div>
          <label className="flex items-center gap-2 mb-1 font-medium text-gray-300">
            <FaImage /> Image URL <span className="text-sm text-gray-500">(optional)</span>
          </label>
          <input
            type="url"
            {...register('imageUrl')}
            className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://image.com/post.jpg"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Posting...' : '📨 Publish Forum Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewForum;
