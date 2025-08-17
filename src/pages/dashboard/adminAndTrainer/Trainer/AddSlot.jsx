import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import Swal from 'sweetalert2';

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../contexts/authContext/AuthContext';

import Loaging from '../../../../loagind/Loaging';
import { ThemeContext } from '../../../../contexts/ThemeContext';

const AddSlot = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // ✅ use themeContext
  const axiosSecure = useAxiosSecure();

  const isDark = theme === 'dark';
  const bgMain = isDark ? 'bg-[#0f0f0f]' : 'bg-white';
  const textMain = isDark ? 'text-white' : 'text-gray-900';
  const inputBg = isDark ? 'bg-gray-900' : 'bg-gray-100';
  const borderColor = isDark ? 'border-cyan-500' : 'border-blue-400';
  const shadowColor = isDark
    ? 'shadow-[0_0_4px_rgba(0,255,255,0.6)]'
    : 'shadow-[0_0_4px_rgba(0,123,255,0.4)]';
  const profileBg = isDark ? 'bg-gray-800' : 'bg-gray-100';
  const profileText = isDark ? 'text-cyan-300' : 'text-blue-700';

  // Fetch trainer profile
  const { data: trainerProfile, isLoading: isProfileLoading, error: profileError } = useQuery({
    queryKey: ['trainerProfile', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainer-profile?email=${encodeURIComponent(user.email)}`);
      return res.data;
    },
  });

  // Fetch classes
  const { data: classes = [], isLoading: classesLoading, error: classesError } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const res = await axiosSecure.get('/classes');
      return res.data;
    },
  });

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm();

  const availableDayOptions = (trainerProfile?.availableDays || []).map((day) => ({
    value: day,
    label: {
      Sun: 'Sunday',
      Mon: 'Monday',
      Tue: 'Tuesday',
      Wed: 'Wednesday',
      Thu: 'Thursday',
      Fri: 'Friday',
      Sat: 'Saturday',
    }[day] || day,
  }));

  if (isProfileLoading || classesLoading) return <Loaging />;
  if (profileError) return <div className="text-red-500">Failed to load trainer profile</div>;
  if (classesError) return <div className="text-red-500">Failed to load classes</div>;

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
      if (error.response?.status === 409) {
        Swal.fire({
          icon: 'warning',
          title: 'Duplicate Slot',
          text: 'This slot already exists. Please choose a different time or name.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Add Slot',
          text: error.message || 'Try again later',
        });
      }
    }
  };

  return (
    <div className={`max-w-xl mx-auto px-6 py-10 ${bgMain} ${textMain} rounded-2xl ${shadowColor} backdrop-blur-md border ${borderColor}`}>
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        Add New Slot
      </h2>

      {/* Trainer Profile */}
      <div className={`mb-8 p-4 ${profileBg} rounded-lg border ${borderColor} shadow-inner`}>
        <h3 className={`text-xl font-semibold mb-4 ${profileText}`}>Your Trainer Profile</h3>
        <p><strong>Full Name: </strong> {trainerProfile?.fullName || user?.displayName || 'N/A'}</p>
        <p><strong>Email: </strong> {trainerProfile?.email || user?.email || 'N/A'}</p>
        <p><strong>Age: </strong> {trainerProfile?.age || 'N/A'}</p>
        <p><strong>Skills: </strong> {trainerProfile?.skills?.length ? trainerProfile.skills.join(', ') : 'N/A'}</p>
        <p><strong>Available Days: </strong> {trainerProfile?.availableDays?.length ? trainerProfile.availableDays.join(', ') : 'N/A'}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Slot Name */}
        <div>
          <label className={`block mb-1 ${profileText}`}>Slot Name</label>
          <input
            {...register('slotName', { required: 'Slot Name is required' })}
            placeholder="e.g. Morning Slot"
            className={`w-full px-4 py-2 ${inputBg} rounded focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-[0_0_4px_rgba(0,255,255,0.5)]`}
          />
          {errors.slotName && <p className="text-red-400 text-sm mt-1">{errors.slotName.message}</p>}
        </div>

        {/* Slot Time */}
        <div>
          <label className={`block mb-1 ${profileText}`}>Slot Time</label>
          <input
            {...register('slotTime', { required: 'Slot Time is required' })}
            placeholder="e.g. 9:00 AM - 10:00 AM"
            className={`w-full px-4 py-2 ${inputBg} rounded focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-[0_0_4px_rgba(0,255,255,0.5)]`}
          />
          {errors.slotTime && <p className="text-red-400 text-sm mt-1">{errors.slotTime.message}</p>}
        </div>

        {/* Available Days */}
        <div>
          <label className={`block mb-1 ${profileText}`}>Available Days</label>
          <Controller
            name="availableDays"
            control={control}
            rules={{ required: 'Select at least one day' }}
            render={({ field }) => (
              <Select
                {...field}
                options={availableDayOptions}
                isMulti
                placeholder="Select available days"
                classNamePrefix={isDark ? 'react-select-dark' : 'react-select-light'}
                styles={{
                  control: (base) => ({ ...base, backgroundColor: isDark ? '#1f1f1f' : '#fff' }),
                  menu: (base) => ({ ...base, backgroundColor: isDark ? '#1f1f1f' : '#fff', color: isDark ? '#fff' : '#000' }),
                  singleValue: (base) => ({ ...base, color: isDark ? '#fff' : '#000' }),
                  multiValue: (base) => ({ ...base, backgroundColor: isDark ? '#333' : '#ddd', color: isDark ? '#fff' : '#000' }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused ? (isDark ? '#555' : '#eee') : isDark ? '#1f1f1f' : '#fff',
                    color: isDark ? '#fff' : '#000',
                  }),
                }}
              />
            )}
          />
          {errors.availableDays && <p className="text-red-400 text-sm mt-1">{errors.availableDays.message}</p>}
        </div>

        {/* Select Class */}
        <div>
          <label className={`block mb-1 ${profileText}`}>Select Class</label>
          <select
            {...register('classId', { required: 'Class selection is required' })}
            className={`w-full px-4 py-2 ${inputBg} rounded focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-[0_0_4px_rgba(0,255,255,0.5)]`}
            defaultValue=""
          >
            <option value="" disabled>Choose a class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>{cls.name}</option>
            ))}
          </select>
          {errors.classId && <p className="text-red-400 text-sm mt-1">{errors.classId.message}</p>}
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
