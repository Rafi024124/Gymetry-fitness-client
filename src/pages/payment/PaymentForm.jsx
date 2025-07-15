import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useState } from "react";
import { FaUser, FaClock, FaGift, FaCreditCard } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../contexts/authContext/AuthContext";

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
            await axiosSecure.patch(`/slots/${slot.slotId}`, { booked: true });

    // ✅ Optionally show a success message
    console.log("Slot marked as booked");
          // Optionally notify user or redirect
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#121212] px-4 py-12">
      <div className="w-full max-w-md bg-[#1e1e1e] border border-[#333] p-8 rounded-xl shadow-lg text-white">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Complete Your Payment
        </h2>

        <div className="mb-4 space-y-2 text-sm text-gray-300">
          <p className="flex items-center gap-2">
            <FaUser className="text-purple-400" />
            <strong>Trainer:</strong> {trainer?.fullName}
          </p>
          <p className="flex items-center gap-2">
            <FaClock className="text-purple-400" />
            <strong>Slot:</strong> {slot?.slotName} ({slot?.slotTime})
          </p>
          <p className="flex items-center gap-2">
            <FaGift className="text-purple-400" />
            <strong>Package:</strong> {selectedPackage?.name} (${selectedPackage?.price})
          </p>
          <p className="flex items-center gap-2">
            <strong>Class:</strong> {className}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#aaa] flex items-center gap-2">
              <FaCreditCard className="text-purple-400" />
              Card Information
            </label>
            <div className="bg-[#2c2c2c] rounded-lg p-4 border border-[#444]">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#fff",
                      "::placeholder": { color: "#aaa" },
                    },
                    invalid: {
                      color: "#e74c3c",
                    },
                  },
                }}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={!stripe || processing}
            className="w-full bg-[#A259FF] hover:bg-[#8437e3] transition-colors py-3 px-4 rounded-md font-semibold text-white disabled:opacity-50"
          >
            {processing ? "Processing..." : `Pay $${selectedPackage?.price}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
