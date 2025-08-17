import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/authContext/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaClock, FaEdit } from 'react-icons/fa';
import Loading from '../../../loagind/Loaging';
import { motion as Motion } from 'framer-motion';
import { ThemeContext } from '../../../contexts/ThemeContext';

const MyProfile = () => {
  const { theme } = useContext(ThemeContext);
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
      <div
        className={`text-center font-semibold py-10 ${
          theme === 'dark' ? 'text-red-500' : 'text-red-700'
        }`}
      >
        Failed to load profile.
      </div>
    );

  // Theme-based classes
  const pageBg = theme === 'dark' ? 'bg-[#0F0F0F] text-white' : 'bg-sky-50 text-gray-900';
  const cardBg = theme === 'dark' ? 'bg-gray-900/70 backdrop-blur-xl border border-[#00F0FF]/40' : 'bg-white shadow-md border border-gray-300';
  const inputBg = theme === 'dark' ? 'bg-gray-800 text-white border border-[#00F0FF]/50' : 'bg-white text-gray-900 border border-gray-300';
  const neonText = theme === 'dark' ? 'neon-text' : '';
  const buttonGradient = theme === 'dark' ? 'from-[#A259FF] to-[#00F0FF]' : 'from-sky-400 to-sky-600';
  const buttonText = 'text-white';

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`min-h-screen px-6 py-12 max-w-6xl mx-auto ${pageBg}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className={`p-8 flex flex-col items-center rounded-3xl ${cardBg}`}>
          <img
            src={userData?.photoURL || '/default-profile.png'}
            alt="Profile"
            className="w-40 h-40 object-cover shadow-lg rounded-full border-4"
            style={{
              borderImageSlice: 1,
              borderImageSource: theme === 'dark'
                ? 'linear-gradient(45deg, #298ca7, #00F0FF, #298ca7)'
                : 'linear-gradient(45deg, #22d3ee, #0ea5e9, #22d3ee)',
            }}
          />
          <h2 className={`mt-6 text-2xl font-extrabold ${neonText} bg-clip-text text-transparent select-none`}>
            {userData?.name || 'No Name'}
          </h2>
          <p className={theme === 'dark' ? 'text-gray-400 mt-1' : 'text-gray-600 mt-1'}>{userData?.email}</p>
          <p className={theme === 'dark' ? 'text-teal-400 mt-2' : 'text-sky-600 mt-2 capitalize tracking-wide font-medium'}>
            {userData?.role || 'User'}
          </p>

          <button
            onClick={handleEditClick}
            className={`glow-btn mt-8 px-6 py-2 rounded-full bg-gradient-to-r ${buttonGradient} ${buttonText} font-semibold shadow-lg hover:shadow-[#00F0FF]/20 transition duration-300 flex items-center gap-2`}
          >
            <FaEdit /> Edit Profile
          </button>
        </div>

        {/* Main Content */}
        <div className={`md:col-span-2 p-10 space-y-8 rounded-3xl ${cardBg}`}>
          <h3 className={`text-3xl font-extrabold border-b pb-3 ${neonText} select-none`}>
            Account Details
          </h3>

          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className={theme === 'dark' ? 'text-gray-400 tracking-wide text-sm' : 'text-gray-700 tracking-wide text-sm'}>Full Name</label>
              {editMode ? (
                <input
                  type="text"
                  className={`${inputBg} w-full mt-2 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF] placeholder-gray-600 transition-shadow duration-300 shadow-[0_0_10px_#00F0FF]`}
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
                <label className={theme === 'dark' ? 'text-gray-400 tracking-wide text-sm' : 'text-gray-700 tracking-wide text-sm'}>Photo URL</label>
                <input
                  type="text"
                  className={`${inputBg} w-full mt-2 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF] placeholder-gray-600 transition-shadow duration-300 shadow-[0_0_10px_#00F0FF]`}
                  placeholder="Enter image URL"
                  value={formData.photoURL}
                  onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                />
              </div>
            )}

            {/* Last Login */}
            <div>
              <label className={theme === 'dark' ? 'text-gray-400 tracking-wide text-sm' : 'text-gray-700 tracking-wide text-sm'}>Last Login</label>
              <p
                className={theme === 'dark' ? 'text-gray-300 mt-2 flex items-center gap-2 text-lg select-text' : 'text-gray-800 mt-2 flex items-center gap-2 text-lg select-text'}
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
                className={`px-8 py-3 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#A259FF] text-black font-bold shadow-lg hover:shadow-[#A259FF]/90 transition duration-300`}
              >
                {updateMutation.isLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-8 py-3 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold transition duration-300"
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
