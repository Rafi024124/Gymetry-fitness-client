import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/authContext/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaUser, FaEnvelope, FaClock, FaEdit } from 'react-icons/fa';
import Loaging from '../../../loagind/Loaging';

const MyProfile = () => {
  const { user,updateUser } = useContext(AuthContext);
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

  const handleSave = async() => {
     try {
    // First update the backend
    await updateMutation.mutateAsync(formData);

    // Then update Firebase auth profile
    await updateUser(formData.name, formData.photoURL);

    // Optionally show success alert (e.g., with SweetAlert or Toast)
    console.log('Profile updated in backend and Firebase!');
  } catch (error) {
    console.error('Failed to update profile:', error);
  }
  };

  if (isLoading) return <Loaging />;
  if (error) return <div className="text-center text-red-500">Failed to load profile.</div>;

  return (
    <div className="min-h-screen bg-[#36454F] flex items-center justify-center px-4 py-10">
      <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl w-full max-w-lg transition-all duration-300 hover:shadow-gray-900 space-y-6">
        
        {/* Profile Image */}
        <div className="flex justify-center relative">
          <img
            src={editMode ? formData.photoURL : userData?.photoURL || '/default-profile.png'}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-orange-300 shadow-md hover:scale-105 transition-transform"
          />
        </div>

        {/* Editable PhotoURL Input */}
        {editMode && (
          <div className="flex flex-col">
            <label className="text-sm mb-1 text-purple-300">Photo URL</label>
            <input
              type="text"
              placeholder="Image URL"
              className="bg-gray-800 text-white px-3 py-2 rounded border border-white focus:outline-none focus:ring-2 focus:ring-gray-900"
              value={formData.photoURL}
              onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
            />
          </div>
        )}

        {/* Name */}
        <div className="flex flex-col">
          <label className="flex items-center gap-2 text-orange-300 text-sm">
            <FaUser /> Full Name
          </label>
          {editMode ? (
            <input
              type="text"
              className="bg-gray-800 text-white px-3 py-2 mt-1 rounded border border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          ) : (
            <p className="mt-1 text-lg font-semibold text-white">
              {userData?.name || 'No Name'}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <FaEnvelope className="text-orange-300" />
          {userData?.email || user?.email}
        </div>

        {/* Last Login */}
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <FaClock className="text-orange-300" />
          Last Login:{" "}
          <span className="ml-1">
            {userData?.last_log_in
              ? new Date(userData.last_log_in).toLocaleString()
              : 'Never logged in'}
          </span>
        </div>

        {/* Buttons */}
        <div className="pt-4 text-center">
          {editMode ? (
            <div className="flex justify-center gap-4">
              <button
                onClick={handleSave}
                disabled={updateMutation.isLoading}
                className={`px-5 py-2 rounded font-semibold transition ${
                  updateMutation.isLoading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {updateMutation.isLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={() => setEditMode(false)}
                disabled={updateMutation.isLoading}
                className="bg-gray-600 hover:bg-gray-700 transition px-5 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={handleEditClick}
              className="flex items-center gap-2 text-orange-300 hover:underline hover:text-purple-300 font-medium mt-2"
            >
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
