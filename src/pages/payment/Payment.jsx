import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from "react-router";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../contexts/authContext/AuthContext';
import Swal from 'sweetalert2';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  const location = useLocation();
  const { trainer, slot, selectedPackage, className } = location.state;
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [alreadyPaid, setAlreadyPaid] = useState(false);
  const [checking, setChecking] = useState(true);

useEffect(() => {
  const checkPayment = async () => {
    try {
      const res = await axiosSecure.get('/payments/check', {
        params: {
          userEmail: user.email,
          trainerId: trainer._id,
          slotId: slot.slotId,
          className,
        },
      });
      if (res.data.alreadyPaid) {
        setAlreadyPaid(true);

        // ✅ Show SweetAlert modal
        Swal.fire({
          icon: 'info',
          title: 'Already Booked',
          text: 'You have already booked this session. No need to pay again.',
          confirmButtonColor: '#A259FF',
          background: '#1e1e1e',
          color: '#fff',
        });
      }
    } catch (err) {
      console.error('Error checking payment:', err);
    } finally {
      setChecking(false);
    }
  };

  checkPayment();
}, [user, trainer._id, slot.slotId, className, axiosSecure]);


  if (checking) return <p className="text-center text-white">Checking previous payments...</p>;

  if (alreadyPaid) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Already Booked</h2>
          <p className="text-gray-300">
            You have already booked this session. Payment is not required again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        trainer={trainer}
        slot={slot}
        selectedPackage={selectedPackage}
        className={className}
      />
    </Elements>
  );
};

export default Payment;
