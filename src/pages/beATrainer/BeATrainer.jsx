import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { AuthContext } from '../../contexts/authContext/AuthContext';
import trainer from '../../assets/be-a-trainer.png';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const daysOptions = [
  { value: 'Sun', label: 'Sunday' },
  { value: 'Mon', label: 'Monday' },
  { value: 'Tue', label: 'Tuesday' },
  { value: 'Wed', label: 'Wednesday' },
  { value: 'Thu', label: 'Thursday' },
  { value: 'Fri', label: 'Friday' },
  { value: 'Sat', label: 'Saturday' },
];

const skillsOptions = [
  'Yoga',
  'Strength Training',
  'Cardio',
  'Pilates',
  'Crossfit',
  'Zumba',
  'Personal Training',
];

const BecomeTrainerForm = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: user?.displayName || '',
      email: user?.email || '',
      age: '',
      profileImage: '',
      skills: [],
      availableDays: [],
      availableTime: [''],
      yearsOfExperience: '',
      socialLinks: {
        facebook: '',
        instagram: '',
        linkedin: '',
      },
    },
  });

  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const trainerData = {
      ...data,
      availableDays: data.availableDays.map((day) => day.value),
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    axiosSecure.post('/trainers', trainerData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: 'Success!',
          text: 'Your application has been submitted successfully.',
          icon: 'success',
          background: '#1F1F1F',
          color: '#F2F2F2',
          confirmButtonColor: '#A259FF',
          confirmButtonText: 'Continue',
        });
      }
    });
  };

  return (
    <div className="w-full px-4 py-16 lg:px-20 bg-gradient-to-br from-[#1F1F1F] via-[#121212] to-[#1F1F1F] text-white min-h-screen">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="hidden lg:block">
          <img
            src={trainer}
            alt="Become a Trainer"
            className="w-full h-[850px] object-cover rounded-3xl shadow-2xl border-2 border-[#A259FF]/40"
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#1F1F1F] border border-[#333] p-10 rounded-3xl shadow-2xl w-full"
        >
          <h2 className="text-4xl font-bold mb-8 neon-text">Become a Trainer</h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                {...register('fullName', { required: 'Full Name is required' })}
                className={`w-full px-4 py-3 rounded-xl bg-[#292929] border ${
                  errors.fullName ? 'border-red-500' : 'border-[#00F0FF]'
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium">Email (read-only)</label>
              <input
                {...register('email')}
                readOnly
                className="w-full px-4 py-3 rounded-xl bg-[#292929] border border-[#555] text-gray-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium">Age</label>
                <input
                  type="number"
                  {...register('age', {
                    required: 'Age is required',
                    min: { value: 16, message: 'Minimum age is 16' },
                    max: { value: 100, message: 'Maximum age is 100' },
                  })}
                  className={`w-full px-4 py-3 rounded-xl bg-[#292929] border ${
                    errors.age ? 'border-red-500' : 'border-[#00F0FF]'
                  }`}
                  placeholder="Your age"
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
              </div>

              <div>
                <label className="block mb-1 font-medium">Years of Experience</label>
                <input
                  type="number"
                  min="0"
                  {...register('yearsOfExperience', {
                    required: 'Experience is required',
                    min: { value: 0, message: 'Must be 0 or more' },
                  })}
                  className={`w-full px-4 py-3 rounded-xl bg-[#292929] border ${
                    errors.yearsOfExperience ? 'border-red-500' : 'border-[#00F0FF]'
                  }`}
                  placeholder="Enter years of experience"
                />
                {errors.yearsOfExperience && <p className="text-red-500 text-sm mt-1">{errors.yearsOfExperience.message}</p>}
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Profile Image URL</label>
              <input
                type="text"
                {...register('profileImage')}
                className="w-full px-4 py-3 rounded-xl bg-[#292929] border border-[#00F0FF]"
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium">Available Days</label>
                <Controller
                  name="availableDays"
                  control={control}
                  rules={{ required: 'Please select at least one day' }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={daysOptions}
                      placeholder="Select Days"
                      className="text-black"
                      styles={{
                        control: (base) => ({
                          ...base,
                          backgroundColor: 'white',
                          borderColor: '#A259FF',
                        }),
                      }}
                    />
                  )}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Available Time Slots</label>
                <Controller
                  name="availableTime"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <div className="space-y-2">
                      {value.map((time, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="time"
                            value={time}
                            onChange={(e) => {
                              const updated = [...value];
                              updated[index] = e.target.value;
                              onChange(updated);
                            }}
                            className="w-full px-4 py-2 rounded-xl bg-white text-black border border-[#00F0FF]"
                          />
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => onChange(value.filter((_, i) => i !== index))}
                              className="text-red-400 hover:text-red-600 text-lg font-bold"
                            >
                              &times;
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => onChange([...value, ''])}
                        className="text-sm text-[#00F0FF] hover:underline"
                      >
                        + Add another time slot
                      </button>
                    </div>
                  )}
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Skills</label>
              <div className="flex flex-wrap gap-3 mt-2">
                {skillsOptions.map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer border border-[#00F0FF] bg-[#292929] text-white hover:bg-[#3a3a3a] transition-all duration-200"
                  >
                    <input
                      type="checkbox"
                      value={skill}
                      {...register('skills')}
                      className="hidden"
                    />
                    <span className="text-sm">{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label className="block mb-1 font-medium">Social Links</label>
              <div className="space-y-3 mt-2">
                {['facebook', 'instagram', 'linkedin'].map((platform) => (
                  <input
                    key={platform}
                    type="text"
                    {...register(`socialLinks.${platform}`)}
                    placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} (optional)`}
                    className="w-full px-4 py-3 rounded-xl bg-[#292929] border border-[#00F0FF]"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full bg-gradient-to-r from-[#00F0FF] to-[#00F0FF] hover:opacity-90 text-black font-bold py-3 rounded-xl transition duration-300"
            >
              {isSubmitting ? 'Submitting...' : 'Apply as Trainer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecomeTrainerForm;
