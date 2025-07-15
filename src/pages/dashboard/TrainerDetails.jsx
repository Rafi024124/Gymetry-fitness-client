import React from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Loaging from '../../loagind/Loaging';

const TrainerDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const class_name = searchParams.get('className');
  const navigate = useNavigate();

  

  const { data, isLoading, error } = useQuery({
    queryKey: ['trainer-details', id, class_name],  // removed trainerEmail
    queryFn: async () => {
      const url = new URL(`http://localhost:3000/trainer/${id}/details`);

      if (class_name) url.searchParams.set('className', class_name);
      // removed trainerEmail from URL

    const res = await fetch(url.toString());
const data = await res.json();  // Parse the JSON response


return data;  // Don't forget to return it for React Query
    },
  });

  if (isLoading) return <Loaging></Loaging>;
  if (error) return <p className="text-center text-red-400">Error loading trainer details</p>;

  if (!data) return null; // safeguard

  const { trainer, slots } = data;
 



  const handleSlotClick = (slot) => {
    const params = new URLSearchParams();
    params.set('slotName', slot.slotName);
    params.set('slotTime', slot.slotTime);
    params.set('slotId', slot._id);
    
    

    if (class_name) params.set('className', class_name);

    navigate(`/trainer/${trainer._id}/book?${params.toString()}`);
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen max-w-4xl mx-auto">
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

      <div>
        <h3 className="text-2xl font-semibold mb-4">
          Available Slots for <span className="font-bold text-orange-300">{class_name}</span> Class
        </h3>
        {slots.length ? (
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
          <p className="text-red-400">No slots available for this trainer in this class.</p>
        )}
      </div>
    </div>
  );
};

export default TrainerDetails;
