import React, { useEffect, useState } from 'react';
import { GiMuscleUp, GiWeightLiftingUp, GiMeal } from 'react-icons/gi';
import { motion as Motion } from 'framer-motion';

const features = [
  {
    title: 'Expert Trainers',
    description: 'Work with certified professionals to reach your fitness goals faster and smarter.',
    icon: <GiMuscleUp className="text-5xl text-[#00F0FF]" />,
  },
  {
    title: 'Diverse Classes',
    description: 'Choose from yoga, HIIT, strength training, and more – available in-person and online.',
    icon: <GiWeightLiftingUp className="text-5xl text-[#00F0FF]" />,
  },
  {
    title: 'Nutrition Guidance',
    description: 'Personalized meal plans and nutritional coaching for optimal performance.',
    icon: <GiMeal className="text-5xl text-[#00F0FF]" />,
  },
];

const FeaturedSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const getCardStyle = (index) => {
    const position = (index - currentIndex + features.length) % features.length;

    if (isMobile) {
      switch (position) {
        case 0: return 'z-30 scale-105 blur-0';
        case 1: return 'z-20 translate-y-[200px] scale-90 blur-md opacity-60';
        case 2: return 'z-10 -translate-y-[200px] scale-90 blur-md opacity-60';
        default: return 'hidden';
      }
    } else {
      switch (position) {
        case 0: return 'z-30 scale-105 blur-0';
        case 1: return 'z-20 translate-x-[240px] scale-90 blur-md opacity-60';
        case 2: return 'z-10 -translate-x-[240px] scale-90 blur-md opacity-60';
        default: return 'hidden';
      }
    }
  };

  return (
    <section className="bg-[#0D0D0D] py-16 px-6 md:px-20 text-[#F2F2F2] overflow-hidden">
      <h2 className=" text-cyan-300 neon-text-glow text-3xl md:text-4xl font-bold text-center bg-clip-text bg-gradient-to-r from-[#A259FF] to-[#00F0FF] mb-10">
        Why Choose Gymetry?
      </h2>

      <div className={`relative ${isMobile ? 'h-[500px]' : 'h-[340px]'} flex items-center justify-center`}>
        {features.map((feature, index) => (
          <Motion.div
            key={index}
            className={`absolute transition-all duration-700 ease-in-out w-full max-w-md p-6 rounded-xl bg-[#1F1F1F]/80 backdrop-blur-md border border-[#00F0FF]/50 shadow-[0_0_25px_#00F0FF80] text-center ${getCardStyle(index)}`}
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-semibold text-[#00F0FF] mb-2 drop-shadow-glow">
              {feature.title}
            </h3>
            <p className="text-[#bbb] text-sm">{feature.description}</p>
          </Motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
