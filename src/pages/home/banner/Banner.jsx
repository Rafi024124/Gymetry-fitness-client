import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Banner1 from '../../../assets/Banner1.jpg';
import Banner2 from '../../../assets/Banner2.jpg';
import Banner3 from '../../../assets/Banner3.jpg';

const Banner = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 1000000 }}
        loop={true}
        className="h-full w-full"
      >
        <SwiperSlide>
  <div className="relative w-full h-full">
    <img
      src={Banner1}
      alt="Banner 1"
      className="w-full h-full object-cover object-top"
    />
    <div className="absolute inset-0 flex items-center justify-start bg-black/30 px-6 sm:px-16">
      <div className="max-w-2xl opacity-30">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-snug tracking-wide animate-slide-in-left">
          Push yourself, because no one else is going to do it for you.
        </h2>
        <p className="text-sm sm:text-base text-[#ccc] font-medium">
          Dedication, persistence, and grit – that's the Gymetry way.
        </p>
      </div>
    </div>
  </div>
</SwiperSlide>

        <SwiperSlide>
          <img src={Banner2} alt="Banner 2" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
  <div className="relative w-full h-full">
    <img
      src={Banner3}
      alt="Banner 3"
      className="w-full h-full object-cover"
    />

    
    <div className="absolute top-10 left-10 bg-[#1F1F1F]/80 backdrop-blur-md border border-[#A259FF] text-white px-6 py-4 rounded-xl shadow-lg animate-fade-in">
      <h3 className="text-xl sm:text-2xl font-bold text-[#A259FF] neon-text mb-2">
        🔥 30% OFF
      </h3>
      <p className="text-sm sm:text-base text-[#ccc]">
        Join our premium plan today and unlock exclusive workouts & coaching.
      </p>
      <button className="mt-3 px-4 py-2 text-sm font-semibold glow-btn">
        Claim Offer
      </button>
    </div>
  </div>
</SwiperSlide>

      </Swiper>
    </div>
  );
};

export default Banner;
