import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
import Logo from "../../assets/logo1.png";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  // Theme-based classes
  const containerBg = theme === 'dark' ? 'bg-[#0D0D0D] text-[#F2F2F2]' : 'bg-sky-100 text-gray-900';
  const cardBg = theme === 'dark' ? 'bg-[#0D0D0D]' : 'bg-sky-100';
  const textColor = theme === 'dark' ? 'text-[#F2F2F2]' : 'text-gray-900';
  const linkHover = theme === 'dark' ? 'hover:text-[#00F0FF]' : 'hover:text-sky-600';
  const neonText = theme === 'dark' ? 'neon-text' : '';

  return (
    <footer className={`${containerBg} py-14`}>
      <hr></hr>
      <div className={`max-w-7xl mx-auto py-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 px-4 ${cardBg}`}>
        {/* Logo & Description */}
        <div className="col-span-2 flex flex-col items-start gap-2">
          <img
            src={Logo}
            alt="Logo"
            className={`w-24 h-auto object-contain opacity-50 rounded-full`}
          />
          <p className={`text-sm leading-relaxed max-w-xs ${textColor}`}>
            Gymetry – Redefining your fitness journey with expert trainers,
            personalized classes, and a vibrant community. Powered by passion and tech.
          </p>
        </div>

        {/* Services */}
        <nav className='flex flex-col gap-2 text-sm'>
          <h6 className={`footer-title font-semibold text-base ${textColor} ${neonText}`}>Services</h6>
          <a className={`link link-hover ${linkHover}`}>Personal Training</a>
          <a className={`link link-hover ${linkHover}`}>Group Classes</a>
          <a className={`link link-hover ${linkHover}`}>Online Coaching</a>
          <a className={`link link-hover ${linkHover}`}>Nutrition Plans</a>
        </nav>

        {/* Company */}
        <nav className='flex flex-col gap-2 text-sm'>
          <h6 className={`footer-title font-semibold text-base ${textColor} ${neonText}`}>Company</h6>
          <a className={`link link-hover ${linkHover}`}>About Us</a>
          <a className={`link link-hover ${linkHover}`}>Our Trainers</a>
          <a className={`link link-hover ${linkHover}`}>Careers</a>
          <a className={`link link-hover ${linkHover}`}>Blog</a>
        </nav>

        {/* Support */}
        <nav className='flex flex-col gap-2 text-sm'>
          <h6 className={`footer-title font-semibold text-base ${textColor} ${neonText}`}>Support</h6>
          <a className={`link link-hover ${linkHover}`}>Help Center</a>
          <a className={`link link-hover ${linkHover}`}>Contact</a>
          <a className={`link link-hover ${linkHover}`}>Privacy Policy</a>
          <a className={`link link-hover ${linkHover}`}>Terms</a>
        </nav>

        {/* Social */}
        <nav>
          <h6 className={`footer-title font-semibold text-base ${textColor} ${neonText}`}>Social</h6>
          <div className="flex space-x-4 mt-2">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className={linkHover}><FaFacebook className="text-xl" /></a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className={linkHover}><FaInstagram className="text-xl" /></a>
            <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className={linkHover}><FaTwitter className="text-xl" /></a>
            <a href="https://www.github.com/" target="_blank" rel="noopener noreferrer" className={linkHover}><FaGithub className="text-xl" /></a>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
