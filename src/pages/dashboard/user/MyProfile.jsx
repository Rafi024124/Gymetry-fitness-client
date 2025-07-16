import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/authContext/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaClock, FaEdit } from 'react-icons/fa';
import Loading from '../../../loagind/Loaging';
import { motion as Motion } from 'framer-motion';

const MyProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', photoURL: '' });

  const { data: userData, isLoading, error } = useQuery({
    queryKey: ['userInfo', user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedData) =>
      axiosSecure.patch(`/users/${userData?._id}`, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(['userInfo', user?.uid]);
      setEditMode(false);
    },
  });

  const handleEditClick = () => {
    setFormData({
      name: userData?.name || '',
      photoURL: userData?.photoURL || '',
    });
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync(formData);
      await updateUser(formData.name, formData.photoURL);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="text-center text-red-500 font-semibold py-10">
        Failed to load profile.
      </div>
    );

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen px-6 py-12 text-white max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div
          className="bg-[#1f1f1f]/70 backdrop-blur-xl border border-[#A259FF]/40 rounded-3xl
          p-8 flex flex-col items-center "
        >
          <img
            src={userData?.photoURL || '/default-profile.png'}
            alt="Profile"
            className="w-40 h-40  object-cover shadow-lg border-4 border-gradient-to-r from-[#A259FF] via-[#00F0FF] to-[#A259FF]"
            style={{
              borderImageSlice: 1,
              borderImageSource:
                'linear-gradient(45deg, #A259FF, #00F0FF, #A259FF)',
            }}
          />
          <h2
            className="mt-6 text-2xl font-extrabold bg-gradient-to-r from-[#A259FF] via-[#00F0FF] to-[#A259FF]
            bg-clip-text text-transparent select-none"
            
          >
            {userData?.name || 'No Name'}
          </h2>
          <p className="text-sm text-gray-400 mt-1">{userData?.email}</p>
          <p className="text-sm text-teal-400 mt-2 capitalize tracking-wide font-medium">
            {userData?.role || 'User'}
          </p>

          <button
            onClick={handleEditClick}
            className="mt-8 px-6 py-2 rounded-full bg-gradient-to-r from-[#A259FF] to-[#00F0FF]
            text-white font-semibold shadow-lg hover:shadow-[#00F0FF]/20 transition duration-300 flex items-center gap-2"
          >
            <FaEdit />
            Edit Profile
          </button>
        </div>

        {/* Main Content */}
        <div
          className="md:col-span-2 bg-[#1f1f1f]/70 backdrop-blur-xl border border-[#00F0FF]/40 rounded-3xl
          p-10 space-y-8"
        >
          <h3
            className="text-3xl font-extrabold border-b border-[#A259FF]/30 pb-3
            bg-gradient-to-r from-[#A259FF] via-[#00F0FF] to-[#A259FF] bg-clip-text text-transparent select-none"
          >
            Account Details
          </h3>

          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="text-sm text-gray-400 tracking-wide">Full Name</label>
              {editMode ? (
                <input
                  type="text"
                  className="w-full mt-2 px-5 py-3 rounded-xl bg-[#121212] border border-[#00F0FF]/50
                  focus:outline-none focus:ring-2 focus:ring-[#00F0FF] placeholder-gray-600
                  text-white transition-shadow duration-300 shadow-[0_0_10px_#00F0FF]"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              ) : (
                <p className="text-xl mt-2">{userData?.name || 'No Name'}</p>
              )}
            </div>

            {/* Photo URL */}
            {editMode && (
              <div>
                <label className="text-sm text-gray-400 tracking-wide">Photo URL</label>
                <input
                  type="text"
                  className="w-full mt-2 px-5 py-3 rounded-xl bg-[#121212] border border-[#00F0FF]/50
                  focus:outline-none focus:ring-2 focus:ring-[#00F0FF] placeholder-gray-600
                  text-white transition-shadow duration-300 shadow-[0_0_10px_#00F0FF]"
                  placeholder="Enter image URL"
                  value={formData.photoURL}
                  onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                />
              </div>
            )}

            {/* Last Login */}
            <div>
              <label className="text-sm text-gray-400 tracking-wide">Last Login</label>
              <p
                className="text-gray-300 mt-2 flex items-center gap-2 text-lg select-text"
                title={userData?.last_log_in ? new Date(userData.last_log_in).toString() : ''}
              >
                <FaClock className="text-orange-400" />
                {userData?.last_log_in
                  ? new Date(userData.last_log_in).toLocaleString()
                  : 'Never logged in'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          {editMode && (
            <div className="pt-6 flex justify-end gap-6">
              <button
                onClick={handleSave}
                disabled={updateMutation.isLoading}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#A259FF]
                text-black font-bold shadow-lg hover:shadow-[#A259FF]/90 transition duration-300"
              >
                {updateMutation.isLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-8 py-3 rounded-full bg-gray-800 hover:bg-gray-700
                text-gray-300 font-semibold transition duration-300"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </Motion.div>
  );
};

export default MyProfile;
