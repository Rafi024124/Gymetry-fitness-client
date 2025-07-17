import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
import Logo from "../../assets/logo1.png";

const Footer = () => {
  return (
    <footer
      className="bg-[#0D0D0D] text-[#F2F2F2] px-10 py-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/footer_bg.png')`,
        backgroundBlendMode: 'soft-light'
      }}
    >
      <div className="col-span-2 flex flex-col items-start gap-2">
        <img
          src={Logo}
          alt="Logo"
          className="w-24 h-auto object-contain opacity-50 rounded-full"
        />
        <p className="text-sm leading-relaxed text-[#ccc] max-w-xs">
          Gymetry – Redefining your fitness journey with expert trainers,
          personalized classes, and a vibrant community. Powered by passion and tech.
        </p>
      </div>  

      <nav className='flex flex-col gap-2 text-sm'>
        <h6 className="footer-title text-[#00F0FF] font-semibold text-base neon-text">Services</h6>
        <a className="link link-hover hover:text-[#00F0FF]">Personal Training</a>
        <a className="link link-hover hover:text-[#00F0FF]">Group Classes</a>
        <a className="link link-hover hover:text-[#00F0FF]">Online Coaching</a>
        <a className="link link-hover hover:text-[#00F0FF]">Nutrition Plans</a>
      </nav>

      <nav className='flex flex-col gap-2 text-sm'>
        <h6 className="footer-title text-[#00F0FF] font-semibold text-base neon-text">Company</h6>
        <a className="link link-hover hover:text-[#00F0FF]">About Us</a>
        <a className="link link-hover hover:text-[#00F0FF]">Our Trainers</a>
        <a className="link link-hover hover:text-[#00F0FF]">Careers</a>
        <a className="link link-hover hover:text-[#00F0FF]">Blog</a>
      </nav>

      <nav className='flex flex-col gap-2 text-sm'>
        <h6 className="footer-title text-[#00F0FF] font-semibold text-base neon-text">Support</h6>
        <a className="link link-hover hover:text-[#00F0FF]">Help Center</a>
        <a className="link link-hover hover:text-[#00F0FF]">Contact</a>
        <a className="link link-hover hover:text-[#00F0FF]">Privacy Policy</a>
        <a className="link link-hover hover:text-[#00F0FF]">Terms</a>
      </nav>

      <nav>
        <h6 className="footer-title text-[#00F0FF] font-semibold text-base neon-text">Social</h6>
        <div className="flex space-x-4 mt-2">
          <a href="https://www.facebook.com/" target="_blank">
          
          <FaFacebook className="text-xl hover:text-[#00F0FF]" /></a>
          <a  href="https://www.instagram.com/" target="_blank"><FaInstagram className="text-xl hover:text-[#00F0FF]" /></a>
          <a  href="https://www.twitter.com/" target="_blank"><FaTwitter className="text-xl hover:text-[#00F0FF]" /></a>
          <a  href="https://www.github.com/" target="_blank"><FaGithub className="text-xl hover:text-[#00F0FF]" /></a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
