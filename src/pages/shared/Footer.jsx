import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
import Logo from "../../assets/Logo.jpeg"

const Footer = () => {
  return (
    <footer className="bg-[#0D0D0D] text-[#F2F2F2] px-10 py-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
      <div className="col-span-2 flex flex-col items-start gap-2">
        <img
          src={Logo}
          alt="Logo"
          className="w-24 h-auto object-contain opacity-50  rounded-full"
        />
        <p className="text-sm leading-relaxed text-[#ccc] max-w-xs">
          Gymetry – Redefining your fitness journey with expert trainers,
          personalized classes, and a vibrant community. Powered by passion and tech.
        </p>
      </div>

      <nav className='flex flex-col gap-2 text-sm'>
        <h6 className="footer-title text-[#A259FF] font-semibold text-base neon-text">Services</h6>
        <a className="link link-hover hover:text-[#A259FF]">Personal Training</a>
        <a className="link link-hover hover:text-[#A259FF]">Group Classes</a>
        <a className="link link-hover hover:text-[#A259FF]">Online Coaching</a>
        <a className="link link-hover hover:text-[#A259FF]">Nutrition Plans</a>
      </nav>

      <nav className='flex flex-col gap-2 text-sm'>
        <h6 className="footer-title text-[#A259FF] font-semibold text-base neon-text">Company</h6>
        <a className="link link-hover hover:text-[#A259FF]">About Us</a>
        <a className="link link-hover hover:text-[#A259FF]">Our Trainers</a>
        <a className="link link-hover hover:text-[#A259FF]">Careers</a>
        <a className="link link-hover hover:text-[#A259FF]">Blog</a>
      </nav>

      <nav className='flex flex-col gap-2 text-sm'>
        <h6 className="footer-title text-[#A259FF] font-semibold text-base neon-text">Support</h6>
        <a className="link link-hover hover:text-[#A259FF]">Help Center</a>
        <a className="link link-hover hover:text-[#A259FF]">Contact</a>
        <a className="link link-hover hover:text-[#A259FF]">Privacy Policy</a>
        <a className="link link-hover hover:text-[#A259FF]">Terms</a>
      </nav>

      <nav >
        <h6 className="footer-title text-[#A259FF] font-semibold text-base neon-text">Social</h6>
        <div className="flex space-x-4 mt-2">
          <a href="#"><FaFacebook className="text-xl hover:text-[#A259FF]" /></a>
          <a href="#"><FaInstagram className="text-xl hover:text-[#A259FF]" /></a>
          <a href="#"><FaTwitter className="text-xl hover:text-[#A259FF]" /></a>
          <a href="#"><FaGithub className="text-xl hover:text-[#A259FF]" /></a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
