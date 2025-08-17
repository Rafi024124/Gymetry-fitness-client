import React, { useEffect, useState, useContext } from 'react';
import { GiMuscleUp, GiWeightLiftingUp, GiMeal } from 'react-icons/gi';
import { motion as Motion } from 'framer-motion';
import { ThemeContext } from '../../../contexts/ThemeContext';


const features = [
  {
    title: 'Expert Trainers',
    description: 'Work with certified professionals to reach your fitness goals faster and smarter.',
    icon: <GiMuscleUp className="text-5xl" />,
  },
  {
    title: 'Diverse Classes',
    description: 'Choose from yoga, HIIT, strength training, and more – available in-person and online.',
    icon: <GiWeightLiftingUp className="text-5xl" />,
  },
  {
    title: 'Nutrition Guidance',
    description: 'Personalized meal plans and nutritional coaching for optimal performance.',
    icon: <GiMeal className="text-5xl" />,
  },
];

const FeaturedSection = () => {
  const { theme } = useContext(ThemeContext); // use theme
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
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
        case 1: return 'z-20 translate-x-[240px] scale-90 blur-xs opacity-60';
        case 2: return 'z-10 -translate-x-[240px] scale-90 blur-xs opacity-60';
        default: return 'hidden';
      }
    }
  };

  // Set colors based on theme
  const bgColor = theme === 'dark' ? 'bg-[#1F1F1F]/80 border-[#00F0FF]/50 shadow-[0_0_25px_#00F0FF80]' 
                                   : 'bg-sky-100/80 border-sky-300/50 shadow-[0_0_25px_#38BDF8AA]';
  const iconColor = theme === 'dark' ? 'text-[#00F0FF]' : 'text-sky-500';
  const titleColor = theme === 'dark' ? 'text-[#00F0FF] drop-shadow-glow' : 'text-sky-700 drop-shadow-md';
  const descColor = theme === 'dark' ? 'text-[#bbb]' : 'text-gray-800';

  return (
    <section className={`${theme === 'dark' ? 'bg-[#0D0D0D]' : 'bg-sky-100'} py-16 px-2 overflow-hidden`}>
      <h2 className={`text-3xl md:text-4xl font-bold text-center mb-10 ${theme === 'dark' ? 'text-cyan-500 neon-text-glow' : 'text-sky-700'}`}>
        Why Choose Gymetry?
      </h2>

      <div className={`relative ${isMobile ? 'h-[500px]' : 'h-[340px]'} flex items-center justify-center`}>
        {features.map((feature, index) => (
          <Motion.div
            key={index}
            className={`absolute transition-all duration-700 ease-in-out w-full max-w-md p-6 rounded-xl ${bgColor} text-center ${getCardStyle(index)}`}
          >
            <div className={`mb-4 ${iconColor}`}>{feature.icon}</div>
            <h3 className={`text-2xl font-semibold mb-2 ${titleColor}`}>
              {feature.title}
            </h3>
            <p className={`text-sm ${descColor}`}>{feature.description}</p>
          </Motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
