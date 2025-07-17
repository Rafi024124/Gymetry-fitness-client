import React, { useState } from 'react';
import Swal from 'sweetalert2';

const NewsletterSubscribe = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    // simple regex email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

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
          background: "#0f0f0f",
          color: "#F2F2F2",
          confirmButtonColor: "#007a7a",
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

  return (
    <div className='bg-[#0D0D0D] scroll-py-10'>
      <div className="max-w-md mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-4 text-center">Subscribe to our Newsletter</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <button
          type="submit"
          className={` w-full py-3 glow-btn bg-gradient-to-r from-[#A259FF] to-[#00F0FF] duration-300 text-xl font-semibold rounded bg-blue-600 hover:bg-blue-700 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Subscribing...' : 'Subscribe Now'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default NewsletterSubscribe;
