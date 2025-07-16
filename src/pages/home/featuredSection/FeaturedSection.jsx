import React from 'react';
import { GiMuscleUp, GiWeightLiftingUp, GiMeal } from 'react-icons/gi';

const features = [
  {
    title: 'Expert Trainers',
    description: 'Work with certified professionals to reach your fitness goals faster and smarter.',
    icon: <GiMuscleUp className="text-4xl text-[#A259FF]" />,
  },
  {
    title: 'Diverse Classes',
    description: 'Choose from yoga, HIIT, strength training, and more – available in-person and online.',
    icon: <GiWeightLiftingUp className="text-4xl text-[#A259FF] " />,
  },
  {
    title: 'Nutrition Guidance',
    description: 'Personalized meal plans and nutritional coaching for optimal performance.',
    icon: <GiMeal className="text-4xl text-[#A259FF] " />,
  },
];

const FeaturedSection = () => {
  return (
    <section className="bg-[#0D0D0D] py-16 px-6 md:px-20 text-[#F2F2F2]">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gradient bg-gradient-to-r from-[#A259FF] to-[#00F0FF] bg-clip-text text-transparent mb-10">
        Why Choose Gymetry?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#1F1F1F]/80 backdrop-blur-sm p-6 rounded-xl border border-[#A259FF] shadow-md hover:shadow-[0_0_10px_#A259FF] transition duration-300"
          >
            <div className="mb-4 neon-text-">{feature.icon}</div>
            <h3 className="text-2xl font-semibold neon-text mb-2">
              {feature.title}
            </h3>
            <p className="text-[#ccc] text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
