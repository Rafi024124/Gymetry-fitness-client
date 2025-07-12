import React from 'react';
import AboutImage from "../../../assets/About.jpg"

const AboutSection = () => {
  return (
    <section className="bg-[#0D0D0D] text-[#F2F2F2] py-20 px-6 md:px-20">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        {/* Text Content */}
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-[#A259FF] neon-text mb-6">
            About Gymetry
          </h2>
          <p className="text-[#ccc] text-lg leading-relaxed mb-6">
            At Gymetry, we believe fitness is a journey, not a destination. 
            Our mission is to empower you with expert trainers, personalized workout plans, and a thriving community — all supported by cutting-edge technology and a passion for wellness.
          </p>
          <p className="text-[#ccc] text-lg leading-relaxed">
            Whether you’re just starting out or pushing your limits, Gymetry provides the tools, motivation, and support you need to achieve your best self — physically and mentally.
          </p>
        </div>
        
        {/* Image or Illustration */}
        <div className="md:w-1/2">
          <div className="bg-[#1F1F1F]/80 backdrop-blur-sm rounded-xl p-4 shadow-glow max-w-md mx-auto">
            {/* Placeholder for image or illustration */}
            <img 
              src={AboutImage} 
              alt="Fitness Illustration" 
              className="rounded-lg shadow-lg object-cover w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
