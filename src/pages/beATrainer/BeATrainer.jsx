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
    <div className="w-full px-4 py-10 lg:px-16 bg-[#121212] text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Image */}
        <div className="hidden lg:block">
          <img
            src={trainer}
            alt="Become a Trainer"
            className="w-full h-[900px] object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#1F1F1F] p-8 rounded-xl shadow-xl w-full"
        >
          <h2 className="text-3xl font-bold mb-6 text-[#A259FF]">Become a Trainer</h2>

          {/* Full Name */}
          <label className="block mb-2 font-semibold">Full Name</label>
          <input
            {...register('fullName', { required: 'Full Name is required' })}
            className={`w-full mb-4 px-3 py-2 rounded bg-[#292929] border ${
              errors.fullName ? 'border-red-500' : 'border-[#A259FF]'
            }`}
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}

          {/* Email */}
          <label className="block mb-2 font-semibold">Email (read-only)</label>
          <input
            {...register('email')}
            readOnly
            className="w-full mb-4 px-3 py-2 rounded bg-[#292929] border border-[#555] text-gray-400"
          />

          {/* Age & Years of Experience */}
          <div className="flex gap-6 mb-4">
            <div className="flex-1">
              <label className="block mb-2 font-semibold">
                Age <span className="text-sm text-gray-400">(required)</span>
              </label>
              <input
                type="number"
                {...register('age', {
                  required: 'Age is required',
                  min: { value: 16, message: 'Minimum age is 16' },
                  max: { value: 100, message: 'Maximum age is 100' },
                })}
                className={`w-full px-3 py-2 rounded bg-[#292929] border ${
                  errors.age ? 'border-red-500' : 'border-[#A259FF]'
                }`}
                placeholder="Your age"
              />
              {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
            </div>

            <div className="flex-1">
              <label className="block mb-2 font-semibold">
                Years of Experience <span className="text-sm text-gray-400">(required)</span>
              </label>
              <input
                type="number"
                min="0"
                {...register('yearsOfExperience', {
                  required: 'Years of Experience is required',
                  min: { value: 0, message: 'Must be 0 or more' },
                })}
                className={`w-full px-3 py-2 rounded bg-[#292929] border ${
                  errors.yearsOfExperience ? 'border-red-500' : 'border-[#A259FF]'
                }`}
                placeholder="Enter years of experience"
              />
              {errors.yearsOfExperience && (
                <p className="text-red-500 text-sm">{errors.yearsOfExperience.message}</p>
              )}
            </div>
          </div>

          {/* Profile Image */}
          <label className="block mb-2 font-semibold">Profile Image URL</label>
          <input
            type="text"
            placeholder="https://example.com/photo.jpg"
            {...register('profileImage')}
            className={`w-full mb-4 px-3 py-2 rounded bg-[#292929] border ${
              errors.profileImage ? 'border-red-500' : 'border-[#A259FF]'
            }`}
          />
          {errors.profileImage && (
            <p className="text-red-500 text-sm">{errors.profileImage.message}</p>
          )}

          {/* Available Days and Time Slots */}
          <div className="flex gap-6 mb-4">
            <div className="flex-1">
              <label className="block mb-2 font-semibold">Available Days</label>
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
              {errors.availableDays && (
                <p className="text-red-500 text-sm">{errors.availableDays.message}</p>
              )}
            </div>

            {/* Time Slots */}
            <div className="flex-1">
              <label className="block mb-2 font-semibold">Available Time Slots</label>
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
                          className="w-full px-3 py-2 rounded bg-white text-black border border-[#A259FF]"
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
                      className="text-sm text-[#A259FF] hover:underline"
                    >
                      + Add another time slot
                    </button>
                  </div>
                )}
              />
            </div>
          </div>

          {/* Skills */}
          <fieldset className="mb-4">
            <legend className="font-semibold mb-2">Skills</legend>
            <div className="flex flex-wrap gap-3">
              {skillsOptions.map((skill) => (
                <label key={skill} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={skill}
                    {...register('skills')}
                    className="mr-2 accent-[#A259FF]"
                  />
                  {skill}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Social Links */}
          <fieldset className="mb-6">
            <legend className="font-semibold mb-2">Social Links</legend>

            <label className="block mb-1 font-semibold">Facebook (optional)</label>
            <input
              type="text"
              {...register('socialLinks.facebook')}
              className="w-full mb-3 px-3 py-2 rounded bg-[#292929] border border-[#A259FF]"
            />

            <label className="block mb-1 font-semibold">Instagram (optional)</label>
            <input
              type="text"
              {...register('socialLinks.instagram')}
              className="w-full mb-3 px-3 py-2 rounded bg-[#292929] border border-[#A259FF]"
            />

            <label className="block mb-1 font-semibold">LinkedIn (optional)</label>
            <input
              type="text"
              {...register('socialLinks.linkedin')}
              className="w-full px-3 py-2 rounded bg-[#292929] border border-[#A259FF]"
            />
          </fieldset>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#A259FF] hover:bg-[#8f46ff] text-white font-semibold py-3 rounded transition duration-300"
          >
            {isSubmitting ? 'Submitting...' : 'Apply as Trainer'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BecomeTrainerForm;
