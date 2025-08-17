import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { ThemeContext } from '../../../contexts/ThemeContext';


const AddNewClass = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();
  const { theme } = useContext(ThemeContext);

  const onSubmit = async (data) => {
    try {
      const classData = {
        ...data,
        createdAt: new Date().toISOString(),
      };

      const res = await axiosSecure.post('/classes', classData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Class Added Successfully!',
          timer: 2000,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
        });
        reset();
      }
    } catch (error) {
      console.error('Add class failed', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add Class',
        text: error.message || 'Try again later',
      });
    }
  };

  // 🎨 Theme Styles
  const containerBg = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-sky-100 text-gray-900';
  const inputBg = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900 border border-gray-300';
  const labelText = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const buttonBg = theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white';

  return (
    <div className={`max-w-xl mx-auto p-8 rounded-lg ${containerBg} mt-10`}>
      <h2 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Add New Class</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className={`block mb-1 ${labelText}`}>Class Name</label>
          <input
            {...register('name', { required: true })}
            className={`w-full p-2 rounded ${inputBg}`}
            placeholder="e.g. Power Yoga"
          />
          {errors.name && <span className="text-red-400 text-sm">Name is required</span>}
        </div>

        <div>
          <label className={`block mb-1 ${labelText}`}>Class Image URL</label>
          <input
            {...register('image', { required: true })}
            className={`w-full p-2 rounded ${inputBg}`}
            placeholder="https://example.com/yoga.jpg"
          />
          {errors.image && <span className="text-red-400 text-sm">Image URL is required</span>}
        </div>

        <div>
          <label className={`block mb-1 ${labelText}`}>Description</label>
          <textarea
            {...register('description', { required: true })}
            className={`w-full p-2 rounded ${inputBg}`}
            rows="4"
            placeholder="Write a short description..."
          ></textarea>
          {errors.description && <span className="text-red-400 text-sm">Description is required</span>}
        </div>

        <button
          type="submit"
          className={`glow-btn w-full py-2 rounded font-semibold ${buttonBg}`}
        >
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddNewClass;
