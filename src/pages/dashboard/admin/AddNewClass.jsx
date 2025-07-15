import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AddNewClass = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {

     const classData = {
        ...data,
        createdAt: new Date().toISOString(),
     }

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

  return (
    <div className="max-w-xl mx-auto bg-gray-800 p-8 rounded-lg text-white">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add New Class</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Class Name</label>
          <input
            {...register('name', { required: true })}
            className="w-full p-2 bg-gray-700 rounded"
            placeholder="e.g. Power Yoga"
          />
          {errors.name && <span className="text-red-400 text-sm">Name is required</span>}
        </div>

        <div>
          <label className="block mb-1">Class Image URL</label>
          <input
            {...register('image', { required: true })}
            className="w-full p-2 bg-gray-700 rounded"
            placeholder="https://example.com/yoga.jpg"
          />
          {errors.image && <span className="text-red-400 text-sm">Image URL is required</span>}
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            {...register('description', { required: true })}
            className="w-full p-2 bg-gray-700 rounded"
            rows="4"
            placeholder="Write a short description..."
          ></textarea>
          {errors.description && <span className="text-red-400 text-sm">Description is required</span>}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded text-white font-semibold"
        >
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddNewClass;
