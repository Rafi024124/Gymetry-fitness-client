import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useState } from "react";
import { FaUser, FaClock, FaGift, FaCreditCard } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import Swal from "sweetalert2";

const PaymentForm = ({ trainer, slot, selectedPackage, className }) => {
  
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

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
          const saveRes = await axiosSecure.post("/payments", paymentInfo);
          console.log("Payment saved:", saveRes.data);

          

           Swal.fire({
            title: `<span class="text-cyan-300">Payment Successful!</span>`,
            html: `<div class="text-white">Thank you for joining <strong>${className}</strong> with <strong>${trainer.fullName}</strong>!</div>`,
            icon: "success",
            background: "#0f0f0f",
            color: "#fff",
            confirmButtonColor: "#007a7a",
            confirmButtonText: "Awesome!",
            customClass: {
              popup: "border border-cyan-500 rounded-xl",
              title: "text-lg",
              htmlContainer: "text-base",
            },
          });
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

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#0D0D0D] px-6 py-16">
      <div className="w-full max-w-md bg-[#121212] border border-cyan-500 rounded-2xl p-8 shadow-[0_0_4px_rgba(0,255,255,0.7)] text-white">
        <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400 ">
          💳 Complete Your Payment
        </h2>

        <div className="mb-6 space-y-3 text-sm text-cyan-200">
          <p className="flex items-center gap-3">
            <FaUser className="text-cyan-700" />
            <span>
              <strong>Trainer:</strong> {trainer?.fullName}
            </span>
          </p>
          <p className="flex items-center gap-3">
            <FaClock className="text-cyan-700" />
            <span>
              <strong>Slot:</strong> {slot?.slotName} ({slot?.slotTime})
            </span>
          </p>
          <p className="flex items-center gap-3">
            <FaGift className="text-cyan-700" />
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
            <label
              htmlFor="card-element"
              className="flex items-center gap-2 text-cyan-300 font-medium mb-2"
            >
              <FaCreditCard className="text-cyan-700" />
              Card Information
            </label>
            <div className="bg-[#222] rounded-xl p-5 border border-cyan-500 shadow-[0_0_4px_rgba(0,255,255,0.6)]">
              <CardElement
                id="card-element"
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#00fff7",
                      "::placeholder": { color: "#66f0e6" },
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
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 transition duration-300 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? "Processing..." : `Pay $${selectedPackage?.price}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
