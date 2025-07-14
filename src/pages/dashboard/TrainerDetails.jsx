import { useParams, useNavigate, useLocation, Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { FaUser, FaEnvelope, FaStar, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../loagind/Loaging';

const TrainerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  // Get className from query string if present
  const queryParams = new URLSearchParams(location.search);
  const className = queryParams.get("class");

  const { data: trainer, isLoading, isError } = useQuery({
    queryKey: ['trainerDetails', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainers/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError || !trainer) return <div className="text-center text-red-500">Trainer not found</div>;

  // On slot click, navigate to booking page passing slot and className as query params
  const handleSlotClick = (day, slot) => {
    const slotString = `${day} ${slot}`;
    let bookingUrl = `/trainer-booking/${trainer._id}?slot=${encodeURIComponent(slotString)}`;
    console.log("classname in details page",className);
    
    if (className) {
      bookingUrl += `&class=${encodeURIComponent(className)}`;
    }

    navigate(bookingUrl);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Trainer Info */}
        <div className="bg-[#1F1F1F] p-6 rounded-xl shadow-lg flex flex-col md:flex-row gap-8">
          <img
            src={trainer.profileImage}
            alt={trainer.fullName}
            className="w-full md:w-60 h-60 object-cover rounded-lg"
          />
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#A259FF] flex items-center gap-2">
              <FaUser /> {trainer.fullName}
            </h2>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-[#A259FF]" />
              {trainer.email}
            </p>
            <p className="flex items-center gap-2">
              <FaStar className="text-[#A259FF]" />
              <span className="font-semibold">Years of Experience:</span> {trainer.yearsOfExperience}
            </p>
            <div>
              <p className="font-semibold mb-1">Skills:</p>
              <div className="flex flex-wrap gap-2">
                {trainer.skills?.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#A259FF]/20 border border-[#A259FF] rounded-full text-sm text-[#A259FF]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold mb-1">Social Links:</p>
              <div className="flex gap-3 text-xl">
                {/* Facebook */}
                {trainer.socialLinks?.facebook ? (
                  <a
                    href={trainer.socialLinks.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-blue-500 transition"
                  >
                    <FaFacebook />
                  </a>
                ) : (
                  <FaFacebook className="opacity-40 cursor-not-allowed" />
                )}
                {/* Instagram */}
                {trainer.socialLinks?.instagram ? (
                  <a
                    href={trainer.socialLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-pink-400 transition"
                  >
                    <FaInstagram />
                  </a>
                ) : (
                  <FaInstagram className="opacity-40 cursor-not-allowed" />
                )}
                {/* LinkedIn */}
                {trainer.socialLinks?.linkedin ? (
                  <a
                    href={trainer.socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-blue-300 transition"
                  >
                    <FaLinkedin />
                  </a>
                ) : (
                  <FaLinkedin className="opacity-40 cursor-not-allowed" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Available Slots */}
        <div className="bg-[#1F1F1F] p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-[#A259FF] mb-4">Available Slots</h3>
          {trainer.availableDays?.length > 0 && trainer.availableTime?.length > 0 ? (
            trainer.availableDays.map((day) => (
              <div key={day} className="mb-4">
                <p className="font-semibold mb-2">{day}</p>
                <div className="flex flex-wrap gap-3">
                  {trainer.availableTime.map((slot, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSlotClick(day, slot)}
                      className="px-4 py-2 rounded-lg bg-[#292929] hover:bg-[#A259FF] transition text-white"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No slots available.</p>
          )}
        </div>

        {/* Become a Trainer CTA */}
        <div className="text-center mt-10">
          <h3 className="text-xl mb-4 font-bold">Want to join as a trainer?</h3>
          <Link
            to="/be-a-trainer"
            className="inline-block bg-[#A259FF] hover:bg-[#9333ea] text-white px-6 py-3 rounded-full transition font-semibold"
          >
            Become a Trainer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
