import React from 'react';
import { useLocation } from "react-router";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  const location = useLocation();
  const { trainer, slot, selectedPackage, className } = location.state;
  

  
  

  
  
  
  
  
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
