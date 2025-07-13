import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { AuthContext } from '../../contexts/authContext/AuthContext';
import trainer from '../../assets/be-a-trainer.png'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const daysOptions = [
  { value: 'Sun', label: 'Sunday' },
  { value: 'Mon', label: 'Monday' },
  { value: 'Tue', label: 'Tuesday' },
  { value: 'Wed', label: 'Wednesday' },
  { value: 'Thu', label: 'Thursday' },
  { value: 'Fri', label: 'Friday' },
  { value: 'Sat', label: 'Saturday' }
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
      availableTime: '',
      otherInfo: '',
    }
  });

  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const trainerData = {
      ...data,
      availableDays: data.availableDays.map(day => day.value),
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    axiosSecure.post('/trainers',trainerData)
    .then(res=>{
        if(res.data.insertedId){
            Swal.fire({
                     title: "Success!",
                     text: "Your application has been submitted successfully.",
                     icon: "success",
                     background: "#1F1F1F",
                     color: "#F2F2F2",
                     confirmButtonColor: "#A259FF",
                     confirmButtonText: "Continue",
                     customClass: {
                       title: "swal2-title",
                     },
                   });
        }
    })
   
  };

  return (
    <div className="w-full px-4 py-10 lg:px-16 bg-[#121212] text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* Left Image Section */}
        <div className="hidden lg:block">
          <img
            src= {trainer}
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

          {/* Age */}
          <label className="block mb-2 font-semibold">Age</label>
          <input
            type="number"
            {...register('age', {
              required: 'Age is required',
              min: { value: 16, message: 'Minimum age is 16' },
              max: { value: 100, message: 'Maximum age is 100' },
            })}
            className={`w-full mb-4 px-3 py-2 rounded bg-[#292929] border ${
              errors.age ? 'border-red-500' : 'border-[#A259FF]'
            }`}
            placeholder="Your age"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}

          {/* Profile Image */}
          <label className="block mb-2 font-semibold">Profile Image URL</label>
          <input
            type="text"
            placeholder="https://example.com/photo.jpg"
            {...register('profileImage', {
             
            })}
            className={`w-full mb-4 px-3 py-2 rounded bg-[#292929] border ${
              errors.profileImage ? 'border-red-500' : 'border-[#A259FF]'
            }`}
          />
          {errors.profileImage && <p className="text-red-500 text-sm">{errors.profileImage.message}</p>}

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

          {/* Available Days */}
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
                className="mb-4 text-black"
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
            <p className="text-red-500 text-sm mb-3">{errors.availableDays.message}</p>
          )}

          {/* Available Time */}
          <label className="block mb-2 font-semibold">Available Time</label>
          <input
            type="time"
            {...register('availableTime', { required: 'Select a time' })}
            className="w-full mb-4 px-3 py-2 rounded bg-white text-black border border-[#A259FF]"
          />
          {errors.availableTime && (
            <p className="text-red-500 text-sm">{errors.availableTime.message}</p>
          )}

          {/* Additional Info */}
          <label className="block mb-2 font-semibold">Additional Info</label>
          <textarea
            {...register('otherInfo')}
            rows={3}
            placeholder="Any additional information..."
            className="w-full mb-6 px-3 py-2 rounded bg-[#292929] border border-[#A259FF]"
          />

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
