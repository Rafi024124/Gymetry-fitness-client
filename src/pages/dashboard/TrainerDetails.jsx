import React from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Loaging from '../../loagind/Loaging';

const TrainerDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const className = searchParams.get('className'); // optional query param
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['trainer-details', id, className],
    queryFn: async () => {
      const url = new URL(`http://localhost:3000/trainer/${id}/details`);
      if (className) url.searchParams.set('className', className);
      const res = await fetch(url.toString());
      return await res.json();
    },
  });

  if (isLoading) return <Loaging />;
  if (error) return <p className="text-center text-red-400">Error loading trainer details</p>;
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
    <div className="p-6 bg-gray-900 text-white min-h-screen max-w-4xl mx-auto">
      {/* Trainer Info */}
      <div className="flex items-center gap-6 mb-8">
        <img
          src={trainer.profileImage || '/default-avatar.png'}
          alt={trainer.fullName}
          className="w-32 h-32 rounded-full border-4 border-blue-500"
        />
        <div>
          <h2 className="text-3xl font-bold">{trainer.fullName}</h2>
          <p className="text-gray-300">{trainer.email}</p>
          <p className="mt-2">Skills: {trainer.skills?.join(', ') || 'N/A'}</p>
        </div>
      </div>

      {/* Slots Display */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">
          Available Slots {className && <>for <span className="text-orange-300 font-bold">{className}</span></>}
        </h3>

        {slots.length ? (
          className ? (
            // If specific className is passed, show those slots only
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {slots.map((slot) => (
                <div
                  key={slot._id}
                  className="bg-gray-800 p-4 rounded-lg shadow cursor-pointer"
                  onClick={() => handleSlotClick(slot)}
                >
                  <p className="font-semibold">
                    {slot.slotName} ({slot.slotTime})
                  </p>
                  <p className="text-gray-400">Days: {slot.availableDays?.join(', ') || 'N/A'}</p>
                  <p className="text-gray-400">Booked: {slot.booked ? 'Yes' : 'No'}</p>
                </div>
              ))}
            </div>
          ) : (
            // No className: Group by className
            <div className="space-y-6">
              {Object.entries(
                slots.reduce((acc, slot) => {
                  const cls = slot.className || 'Unknown Class';
                  acc[cls] = acc[cls] || [];
                  acc[cls].push(slot);
                  return acc;
                }, {})
              ).map(([clsName, clsSlots]) => (
                <div key={clsName}>
                  <h4 className="text-xl font-bold text-orange-400 mb-2">{clsName}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {clsSlots.map((slot) => (
                      <div
                        key={slot._id}
                        className="bg-gray-800 p-4 rounded-lg shadow cursor-pointer"
                        onClick={() => handleSlotClick(slot)}
                      >
                        <p className="font-semibold">
                          {slot.slotName} ({slot.slotTime})
                        </p>
                        <p className="text-gray-400">Days: {slot.availableDays?.join(', ') || 'N/A'}</p>
                        <p className="text-gray-400">Booked: {slot.booked ? 'Yes' : 'No'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <p className="text-red-400">No slots available for this trainer{className ? ` in ${className}` : ''}.</p>
        )}
      </div>
    </div>
  );
};

export default TrainerDetails;
