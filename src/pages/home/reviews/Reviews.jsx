import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaStar, FaQuoteLeft, FaUserCircle } from 'react-icons/fa';

const Reviews = () => {
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['all-reviews'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/reviews');
      return res.json();
    }
  });

  if (isLoading) return <p className="text-white text-center py-10">Loading reviews...</p>;
  if (reviews.length === 0) return <p className="text-white text-center py-10">No reviews found</p>;

  return (
    <section className="w-full bg-[#0D0D0D] py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center neon-text mb-12">
          What Our Members Say
        </h2>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map(review => (
            <SwiperSlide key={review._id}>
              <div className="bg-[#1e1e1e] border border-[#333] p-6 rounded-2xl shadow-xl flex flex-col justify-between h-full mx-2 transition duration-300 hover:shadow-2xl">
                
                {/* Header: Avatar + Info */}
                <div className="flex items-center gap-3 mb-3">
                  <FaUserCircle className="text-4xl text-blue-500" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{review.trainerName || 'Unnamed Trainer'}</h3>
                    <p className="text-sm text-gray-400">
                      {review.className || 'N/A'} | {review.slot?.slotName}
                    </p>
                  </div>
                </div>

                {/* Feedback Text */}
                <div className="flex-1">
                  <FaQuoteLeft className="text-2xl text-purple-400 mb-2" />
                  <p className="text-gray-300 italic leading-relaxed">
                    “{review.feedback}”
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < review.rating ? 'text-yellow-400' : 'text-gray-600'}
                    />
                  ))}
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
