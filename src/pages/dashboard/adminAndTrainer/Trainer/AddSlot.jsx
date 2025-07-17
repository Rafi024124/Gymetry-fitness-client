import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import Swal from 'sweetalert2';

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../contexts/authContext/AuthContext';
import Loaging from '../../../../loagind/Loaging';

const AddSlot = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const { data: classes = [], isLoading, error } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const res = await axiosSecure.get('/classes');
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    try {
      const selectedClass = classes.find((cls) => cls._id === data.classId);

      const slotData = {
        slotName: data.slotName,
        slotTime: data.slotTime,
        availableDays: data.availableDays.map((day) => day.value),
        classId: data.classId,
        className: selectedClass?.name || '',
        booked: false,
        createdAt: new Date().toISOString(),
        trainer_name: user?.displayName,
        trainer_email: user?.email,
      };

      const res = await axiosSecure.post('/slots', slotData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Slot Added Successfully!',
          timer: 2000,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
        });
        reset();
      }
    } catch (error) {
      console.error('Add slot failed', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add Slot',
        text: error.message || 'Try again later',
      });
    }
  };

  const dayOptions = [
    { value: 'Sun', label: 'Sunday' },
    { value: 'Mon', label: 'Monday' },
    { value: 'Tue', label: 'Tuesday' },
    { value: 'Wed', label: 'Wednesday' },
    { value: 'Thu', label: 'Thursday' },
    { value: 'Fri', label: 'Friday' },
    { value: 'Sat', label: 'Saturday' },
  ];

  if (isLoading) return <Loaging />;
  if (error)
    return (
      <div className="text-center text-red-500">Failed to load classes</div>
    );

  return (
    <div className="max-w-xl mx-auto px-6 py-10 bg-[#0f0f0f] text-white rounded-2xl shadow-[0_0_4px_rgba(0,255,255,0.6)] backdrop-blur-md border border-cyan-500">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        Add New Slot
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Slot Name */}
        <div>
          <label className="block mb-1 text-cyan-300">Slot Name</label>
          <input
            {...register('slotName', { required: 'Slot Name is required' })}
            placeholder="e.g. Morning Slot"
            className="w-full px-4 py-2 bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-[0_0_4px_rgba(0,255,255,0.5)]"
          />
          {errors.slotName && (
            <p className="text-red-400 text-sm mt-1">{errors.slotName.message}</p>
          )}
        </div>

        {/* Slot Time */}
        <div>
          <label className="block mb-1 text-cyan-300">Slot Time</label>
          <input
            {...register('slotTime', { required: 'Slot Time is required' })}
            placeholder="e.g. 9:00 AM - 10:00 AM"
            className="w-full px-4 py-2 bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-[0_0_4px_rgba(0,255,255,0.5)]"
          />
          {errors.slotTime && (
            <p className="text-red-400 text-sm mt-1">{errors.slotTime.message}</p>
          )}
        </div>

        {/* Available Days */}
        <div>
          <label className="block mb-1 text-cyan-300">Available Days</label>
          <Controller
            name="availableDays"
            control={control}
            rules={{ required: 'Select at least one day' }}
            render={({ field }) => (
              <Select
                {...field}
                options={dayOptions}
                isMulti
                placeholder="Select days"
                className="text-black shadow-[0_0_4px_rgba(0,255,255,0.4)] rounded"
              />
            )}
          />
          {errors.availableDays && (
            <p className="text-red-400 text-sm mt-1">
              {errors.availableDays.message}
            </p>
          )}
        </div>

        {/* Select Class */}
        <div>
          <label className="block mb-1 text-cyan-300">Select Class</label>
          <select
            {...register('classId', { required: 'Class selection is required' })}
            className="w-full px-4 py-2 bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-[0_0_4px_rgba(0,255,255,0.5)]"
            defaultValue=""
          >
            <option value="" disabled>
              Choose a class
            </option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name}
              </option>
            ))}
          </select>
          {errors.classId && (
            <p className="text-red-400 text-sm mt-1">{errors.classId.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold rounded transition-all duration-200 shadow-[0_0_4px_rgba(0,255,255,0.8)]"
        >
          Add Slot
        </button>
      </form>
    </div>
  );
};

export default AddSlot;
