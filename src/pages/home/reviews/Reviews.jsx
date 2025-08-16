import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { ThemeContext } from '../../../contexts/ThemeContext';

const Reviews = () => {
  const { theme } = useContext(ThemeContext);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['all-reviews'],
    queryFn: async () => {
      const res = await fetch('https://gymetry-server.vercel.app/reviews');
      if (!res.ok) throw new Error('Failed to fetch reviews');
      return res.json();
    },
  });

  const reviews = Array.isArray(data) ? data : [];

  if (isLoading) return <p className="text-center py-10">Loading reviews...</p>;
  if (isError) return <p className="text-red-500 text-center py-10">Error: {error.message}</p>;
  if (reviews.length === 0) return <p className="text-center py-10">No reviews found</p>;

  // Theme-based styles
  const sectionBg = theme === 'dark' ? 'bg-gradient-to-b from-[#0D0D0D] to-black' : 'bg-sky-100';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const cardBg = theme === 'dark'
    ? 'bg-[#121212]/80 border border-[#2b2b2b] backdrop-blur-md shadow-[0_0_20px_rgba(0,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]'
    : 'bg-white/80 border border-gray-300 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.2)] hover:shadow-[0_0_25px_rgba(56,189,248,0.3)]';
  const headingText = theme === 'dark' 
    ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#A259FF] to-[#00F0FF]'
    : 'text-sky-700';

  return (
    <section className={`w-full ${sectionBg} py-16 px-4`}>
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-5xl font-bold text-center mb-12 drop-shadow-lg ${headingText}`}>
          What Our Members Say
        </h2>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={32}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className={`relative overflow-hidden p-6 rounded-2xl transition duration-300 ${cardBg} ${textColor} hover:scale-[1.03]`}>
                {/* Decorative glow */}
                {theme === 'dark' && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-tr from-[#A259FF] to-[#00F0FF] blur-2xl opacity-30 rounded-full z-0"></div>
                )}

                <div className="relative z-10 flex flex-col justify-between h-full">
                  {/* Header */}
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-[#00F0FF] to-[#A259FF] text-white'
                        : 'bg-sky-400 text-white'
                    }`}>
                      {review.trainerName?.charAt(0) || 'T'}
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        {review.trainerName || 'Unnamed Trainer'}
                      </h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {review.className || 'N/A'} | {review.slot?.slotName}
                      </p>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className={`italic flex-1 mb-4 relative ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <FaQuoteLeft className={`text-2xl mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-sky-600'}`} />
                    <p className="leading-relaxed">“{review.feedback}”</p>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mt-auto">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`transition-all duration-300 ${
                          i < review.rating
                            ? 'text-yellow-400 drop-shadow-md'
                            : theme === 'dark'
                            ? 'text-gray-600'
                            : 'text-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;
