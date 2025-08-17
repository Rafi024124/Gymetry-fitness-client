import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useState } from "react";
import { FaUser, FaClock, FaGift, FaCreditCard } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const PaymentForm = ({ trainer, slot, selectedPackage, className }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const amountInCents = selectedPackage?.price * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    setError("");

    try {
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
      });

      const clientSecret = res.data.clientSecret;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        const paymentInfo = {
          trainerId: trainer._id,
          trainerName: trainer.fullName,
          userId: user.uid,
          userName: user.displayName,
          userEmail: user.email,
          slot,
          packageName: selectedPackage.name,
          price: selectedPackage.price,
          className,
          transactionId: result.paymentIntent.id,
        };

        try {
          await axiosSecure.post("/payments", paymentInfo);

          Swal.fire({
            title: `<span class="text-cyan-300">Payment Successful!</span>`,
            html: `<div class="${theme === 'dark' ? 'text-white' : 'text-black'}">Thank you for joining <strong>${className}</strong> with <strong>${trainer.fullName}</strong>!</div>`,
            icon: "success",
            background: theme === 'dark' ? "#0f0f0f" : "#f8f8f8",
            color: theme === 'dark' ? "#fff" : "#000",
            confirmButtonColor: "#007a7a",
            confirmButtonText: "Awesome!",
            customClass: {
              popup: "border border-cyan-500 rounded-xl",
              title: "text-lg",
              htmlContainer: "text-base",
            },
          });

          navigate("/");
        } catch (err) {
          console.error("Failed to save payment:", err);
        }
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
      console.error(err);
    }

    setProcessing(false);
  };

  // Theme-based styles
  const containerBg = theme === 'dark' ? "bg-[#121212] text-white" : "bg-white text-black";
  const cardBg = theme === 'dark' ? "bg-[#222] border-cyan-500 shadow-[0_0_4px_rgba(0,255,255,0.6)]" : "bg-slate-100 border-gray-300 shadow-md";
  const textColor = theme === 'dark' ? "text-cyan-200" : "text-gray-900";

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center px-6 py-16 ${theme === 'dark' ? 'bg-[#0D0D0D]' : 'bg-sky-50'}`}>
      <div className={`w-full max-w-md ${containerBg} rounded-2xl p-8 ${theme === 'dark' ? 'shadow-[0_0_4px_rgba(0,255,255,0.7)]' : 'shadow-md'}`}>
        <h2 className={`text-3xl font-bold mb-8 text-center ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-700'}`}>
          💳 Complete Your Payment
        </h2>

        <div className={`mb-6 space-y-3 text-sm ${textColor}`}>
          <p className="flex items-center gap-3">
            <FaUser className={theme === 'dark' ? 'text-cyan-700' : 'text-cyan-600'} />
            <span>
              <strong>Member:</strong> {user?.displayName}
            </span>
          </p>
          <p className="flex items-center gap-3">
            <FaUser className={theme === 'dark' ? 'text-cyan-700' : 'text-cyan-600'} />
            <span>
              <strong>Trainer:</strong> {trainer?.fullName}
            </span>
          </p>
          <p className="flex items-center gap-3">
            <FaClock className={theme === 'dark' ? 'text-cyan-700' : 'text-cyan-600'} />
            <span>
              <strong>Slot:</strong> {slot?.slotName} ({slot?.slotTime})
            </span>
          </p>
          <p className="flex items-center gap-3">
            <FaGift className={theme === 'dark' ? 'text-cyan-700' : 'text-cyan-600'} />
            <span>
              <strong>Package:</strong> {selectedPackage?.name} (${selectedPackage?.price})
            </span>
          </p>
          <p className="flex items-center gap-3">
            <span>
              <strong>Class:</strong> {className}
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="card-element" className={`flex items-center gap-2 font-medium mb-2 ${textColor}`}>
              <FaCreditCard className={theme === 'dark' ? 'text-cyan-700' : 'text-cyan-600'} />
              Card Information
            </label>
            <div className={`rounded-xl p-5 ${cardBg}`}>
              <CardElement
                id="card-element"
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: theme === 'dark' ? "#00fff7" : "#0f0f0f",
                      "::placeholder": { color: theme === 'dark' ? "#66f0e6" : "#999" },
                      fontWeight: "500",
                    },
                    invalid: {
                      color: "#ff4d4f",
                    },
                  },
                }}
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-1 font-semibold drop-shadow-[0_0_4px_rgba(255,0,0,0.7)]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!stripe || processing}
            className={`w-full py-3 rounded-xl font-semibold transition duration-300 
              ${theme === 'dark' 
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500' 
                : 'bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300'} 
              disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {processing ? "Processing..." : `Pay $${selectedPackage?.price}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
