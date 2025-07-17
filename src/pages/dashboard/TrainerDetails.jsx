import React from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Loaging from '../../loagind/Loaging';

import {
  FaUserCircle,
  FaEnvelope,
  FaDumbbell,
  FaClock,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';

const TrainerDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const className = searchParams.get('className'); // optional query param
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['trainer-details', id, className],
    queryFn: async () => {
      const url = new URL(`https://gymetry-server.vercel.app/trainer/${id}/details`);
      if (className) url.searchParams.set('className', className);
      const res = await fetch(url.toString());
      return await res.json();
    },
  });

  if (isLoading) return <Loaging />;
  if (error)
    return (
      <p className="text-center text-red-400">
        Error loading trainer details
      </p>
    );
  if (!data) return null;

  const { trainer, slots } = data;

  const handleSlotClick = (slot) => {
    const params = new URLSearchParams();
    params.set('slotName', slot.slotName);
    params.set('slotTime', slot.slotTime);
    params.set('slotId', slot._id);
    if (slot.className) params.set('className', slot.className); // pass class to booking page

    navigate(`/trainer/${trainer._id}/book?${params.toString()}`);
  };

  return (
    <div className='bg-gray-900'>
      <div className="p-6 bg-gray-900 text-white min-h-screen max-w-4xl mx-auto">
      {/* Trainer Info */}
      <div className="flex items-center gap-6 mb-8">
        <img
          src={trainer.profileImage || '/default-avatar.png'}
          alt={trainer.fullName}
          className="w-30 h-30 rounded-full "
        />
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <FaUserCircle className="text-cyan-400" />
            {trainer.fullName}
          </h2>
          <p className="flex items-center gap-2 text-gray-300 mt-1">
            <FaEnvelope className="text-cyan-400" />
            {trainer.email}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <FaDumbbell className="neon-text" />
            <div className="flex flex-wrap gap-2">
              {trainer.skills && trainer.skills.length ? (
                trainer.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-cyan-900 text-purple-200 text-sm font-semibold px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 italic">No skills listed</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-700 mb-8" />

      {/* Slots Display */}
      <div>
        <h3 className="text-4xl neon-text font-bold mb-6">
          Available Slots{' '}
          {className && (
            <>
              for{' '}
              <span className="text-orange-300 font-bold">{className}</span>
            </>
          )}
        </h3>

        {slots.length ? (
          className ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {slots.map((slot) => (
                <div
                  key={slot._id}
                  className={`p-5 rounded-xl border border-gray-700 hover:border-cyan-500 bg-gradient-to-tr from-gray-800 to-gray-900 hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer space-y-2`}
                  onClick={() => handleSlotClick(slot)}
                >
                  <h4 className="text-xl font-semibold text-white flex items-center gap-2">
                    {slot.slotName}
                    {slot.booked ? (
                      <FaTimesCircle className="text-red-500" />
                    ) : (
                      <FaCheckCircle className="text-green-500" />
                    )}
                  </h4>
                  <p className="text-cyan-500 font-medium flex items-center gap-2">
                    <FaClock /> Time: {slot.slotTime}
                  </p>
                  <p className="text-gray-300 flex items-center gap-2">
                    <FaCalendarAlt /> Days: {slot.availableDays?.join(', ') || 'N/A'}
                  </p>
                  <p
                    className={`inline-block px-3 py-1 text-xs rounded-full font-semibold ${
                      slot.booked
                        ? 'bg-red-600 text-white'
                        : 'bg-green-700 text-white'
                    }`}
                  >
                    {slot.booked ? 'Booked' : 'Available'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-10">
              {Object.entries(
                slots.reduce((acc, slot) => {
                  const cls = slot.className || 'Unknown Class';
                  acc[cls] = acc[cls] || [];
                  acc[cls].push(slot);
                  return acc;
                }, {})
              ).map(([clsName, clsSlots]) => (
                <div key={clsName}>
                  <h4 className="text-4xl font-bold neon-text mb-4 border-b pb-1 border-gray-600">
                    {clsName}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {clsSlots.map((slot) => (
                      <div
                        key={slot._id}
                        className={`p-5 rounded-xl border border-gray-700 hover:border-orange-400 bg-gradient-to-tr from-gray-800 to-gray-900 hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer space-y-2`}
                        onClick={() => handleSlotClick(slot)}
                      >
                        <h4 className="text-xl font-semibold text-white flex items-center gap-2">
                          {slot.slotName}
                          {slot.booked ? (
                            <FaTimesCircle className="text-red-500" />
                          ) : (
                            <FaCheckCircle className="text-green-500" />
                          )}
                        </h4>
                        <p className="text-blue-400 font-medium flex items-center gap-2">
                          <FaClock /> Time: {slot.slotTime}
                        </p>
                        <p className="text-gray-300 flex items-center gap-2">
                          <FaCalendarAlt /> Days:{' '}
                          {slot.availableDays?.join(', ') || 'N/A'}
                        </p>
                        <p
                          className={`inline-block px-3 py-1 text-xs rounded-full font-semibold ${
                            slot.booked
                              ? 'bg-red-600 text-white'
                              : 'bg-green-700 text-white'
                          }`}
                        >
                          {slot.booked ? 'Booked' : 'Available'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <p className="text-red-400 text-lg font-medium">
            No slots available for this trainer
            {className ? ` in ${className}` : ''}.
          </p>
        )}
      </div>
    </div>

    </div>
  );
};

export default TrainerDetails;
