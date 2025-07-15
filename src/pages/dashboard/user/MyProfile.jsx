import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/authContext/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaUser, FaEnvelope, FaClock, FaEdit } from 'react-icons/fa';
import Loaging from '../../../loagind/Loaging';

const MyProfile = () => {
  const { user } = useContext(AuthContext);
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

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  if (isLoading) return <Loaging></Loaging>;
  if (error) return <div className="text-center text-red-500">Failed to load profile.</div>;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-10">
      <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-blue-600 space-y-5">
        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src={editMode ? formData.photoURL : userData?.photoURL || '/default-profile.png'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-600 shadow"
          />
        </div>

        {/* Editable PhotoURL Input */}
        {editMode && (
          <input
            type="text"
            placeholder="Image URL"
            className="bg-gray-700 text-white px-3 py-2 w-full rounded border border-blue-600 focus:outline-none"
            value={formData.photoURL}
            onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
          />
        )}

        {/* Name */}
        <div className="flex items-center gap-2 text-lg font-medium">
          <FaUser className="text-blue-500" />
          {editMode ? (
            <input
              type="text"
              className="bg-gray-700 text-white px-3 py-2 w-full rounded border border-blue-600 focus:outline-none"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          ) : (
            <span>{userData?.name || 'No Name'}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <FaEnvelope className="text-blue-500" />
          <span>{userData?.email || user?.email}</span>
        </div>

        {/* Last Login */}
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <FaClock className="text-blue-500" />
          <span>
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
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {updateMutation.isLoading ? 'Saving...' : 'Save'}
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
              className="flex items-center gap-2 text-blue-500 hover:underline font-medium"
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
