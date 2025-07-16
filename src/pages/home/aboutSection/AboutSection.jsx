import React from 'react';
import AboutImage from "../../../assets/About.jpg";
import { motion as Motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="bg-[#0D0D0D] text-[#F2F2F2] py-20 px-6 md:px-20 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        {/* Text Content */}
        <Motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-cyan-300 neon-text-glow text-3xl md:text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-[#A259FF] to-[#00F0FF] bg-clip-text ">
            About Gymetry
          </h2>
          <p className="text-[#ccc] text-base md:text-lg leading-relaxed mb-5">
            At <span className="text-cyan-300 font-semibold">Gymetry</span>, we believe fitness is a journey, not a destination. 
            Our mission is to empower you with expert trainers, personalized workout plans, and a thriving community — 
            all supported by cutting-edge technology and a passion for wellness.
          </p>
          <p className="text-[#ccc] text-base md:text-lg leading-relaxed">
            Whether you're just starting out or pushing your limits, Gymetry provides the tools, motivation, and support you need to achieve 
            your best self — physically and mentally.
          </p>
        </Motion.div>

        {/* Image or Illustration */}
        <Motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, scale: 0.8, rotate: 8 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="relative bg-[#1F1F1F]/80 backdrop-blur-md rounded-2xl p-3 shadow-[0_0_20px_#A259FF80] transition-all hover:shadow-[0_0_30px_#00F0FF80] duration-500 max-w-md mx-auto border border-[#A259FF]">
            <img 
              src={AboutImage} 
              alt="About Gymetry" 
              className="rounded-xl shadow-lg object-cover w-full h-auto"
            />
            <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-[#A259FF] animate-ping"></div>
          </div>
        </Motion.div>

      </div>
    </section>
  );
};

export default AboutSection;
