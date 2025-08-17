import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { ThemeContext } from '../../../contexts/ThemeContext';
import Lottie from 'lottie-react';
import news from '../../../assets/lottie/newsletter.json';

const NewsletterSubscribe = () => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      Swal.fire('Error', 'Please fill out both name and email', 'error');
      return;
    }

    if (!validateEmail(formData.email)) {
      Swal.fire('Error', 'Please enter a valid email address', 'error');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('https://gymetry-server.vercel.app/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Subscription Successful",
          text: "Thank You!",
          background: theme === 'dark' ? "#0f0f0f" : "#f0f9ff",
          color: theme === 'dark' ? "#F2F2F2" : "#0369a1",
          confirmButtonColor: theme === 'dark' ? "#00F0FF" : "#0ea5e9",
        });
        setFormData({ name: '', email: '' });
      } else {
        Swal.fire('Error', data.message || 'Subscription failed', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Network error, please try again later.', error);
    } finally {
      setLoading(false);
    }
  };

  // Theme-based styles
  const containerBg = theme === 'dark' ? 'bg-[#0D0D0D]' : 'bg-sky-100';
  const cardBg = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';
  const inputBg = theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300';
  const buttonGradient = theme === 'dark' ? 'from-[#A259FF] to-[#00F0FF]' : 'from-sky-400 to-sky-600';
  const buttonText = theme === 'dark' ? 'text-white' : 'text-white';

  return (
    <div className={`${containerBg} scroll-py-10 py-16`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 px-2">
        {/* Lottie Animation */}
        <div className="md:w-1/2 w-full">
          <Lottie animationData={news} loop={true} className="w-full h-full" />
        </div>

        {/* Form Card */}
        <div className={`md:w-1/2 w-full p-6 rounded-lg shadow-lg ${cardBg}`}>
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Subscribe to our Newsletter
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className={`w-full p-3 rounded border ${inputBg}`}
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className={`w-full p-3 rounded border ${inputBg}`}
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
            <button
              type="submit"
              className={`w-full py-3 glow-btn bg-gradient-to-r ${buttonGradient} ${buttonText} text-xl font-semibold rounded transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Subscribing...' : 'Subscribe Now'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscribe;
