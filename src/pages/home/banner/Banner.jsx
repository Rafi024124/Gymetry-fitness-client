import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Banner1 from '../../../assets/Banner1.jpg';
import Banner2 from '../../../assets/Banner2.jpg';
import Banner4 from '../../../assets/Banner4.jpg';
import BeATrainerButton from '../../../buttons/BeATrainerButton';

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
    <div className="absolute inset-0 flex flex-col items-center  bg-black/30 px-6 sm:px-16">
      <div className="max-w-2xl opacity-0">
        <h2 className="w-[50%] text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-snug tracking-wide animate-slide-in-left">
          Push yourself, because no one else is going to do it for you.
        </h2>
        <p className="text-sm sm:text-base text-[#ccc] font-medium">
          Dedication, persistence, and grit – that's the Gymetry way.
        </p>
       
      </div>
       <BeATrainerButton></BeATrainerButton>
    </div>
  </div>
</SwiperSlide>

    <SwiperSlide>
  <div className="relative w-full h-full grid grid-cols-1 md:grid-cols-3">

    {/* Middle Image with no tint */}
    <div className="relative">
      <img
        src={Banner4}
        alt="Banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[#00000022]"></div>
    </div>
    {/* Left Image with a purple tint */}
    <div className="relative">
      <img
        src={Banner4}
        alt="Banner"
        className="w-full h-full object-cover"
        style={{ filter: 'brightness(80%) hue-rotate(300deg)' }}
      />
      <div className="absolute inset-0 bg-[#00000033]"></div>
    </div>

    

    {/* Right Image with a cool blue tint */}
    <div className="relative">
      <img
        src={Banner4}
        alt="Banner"
        className="w-full h-full object-cover"
        style={{ filter: 'brightness(85%) hue-rotate(180deg)' }}
      />
      <div className="absolute inset-0 bg-[#00000022]"></div>
    </div>

    {/* Centered Button Over Entire Collage */}
    <div className="absolute inset-0 flex justify-center items-center">
     
        <BeATrainerButton />
      
    </div>
  </div>
</SwiperSlide>




      </Swiper>
    </div>
  );
};

export default Banner;
