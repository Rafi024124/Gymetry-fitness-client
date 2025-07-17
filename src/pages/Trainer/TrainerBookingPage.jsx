import React, { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  FaDollarSign,
  FaCheckCircle,
  FaClock,
  FaStar,
  FaUsers,
  FaTools,
} from "react-icons/fa";
import Loaging from "../../loagind/Loaging";
import Swal from "sweetalert2";

const packages = [
  {
    name: "Basic",
    benefits: ["Access to gym facilities during regular hours"],
    price: 10,
  },
  {
    name: "Standard",
    benefits: [
      "All Basic benefits",
      "Access to group fitness classes like yoga, Zumba",
    ],
    price: 50,
  },
  {
    name: "Premium",
    benefits: [
      "All Standard benefits",
      "Personal training sessions",
      "Sauna, massage therapy, etc.",
    ],
    price: 100,
  },
];

const TrainerBookingPage = () => {
  const { trainerId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const slotName = searchParams.get("slotName");
  const slotTime = searchParams.get("slotTime");
  const slotId = searchParams.get("slotId");
  const className = searchParams.get("className");

  // Fetch trainer data
  const { data: trainer, isLoading: loadingTrainer } = useQuery({
    queryKey: ["trainer", trainerId],
    queryFn: async () => {
      const res = await axios.get(`https://gymetry-server.vercel.app/trainers/${trainerId}`);
      return res.data;
    },
    enabled: !!trainerId,
  });

  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleJoinNow = () => {
    if (!selectedPackage) {
      Swal.fire({
  title: "Oops!",
  text: "Please choose a package before proceeding.",
  icon: "warning",
  background: "#0f0f0f",
  color: "#F2F2F2",
  confirmButtonColor: "#007a7a",
  confirmButtonText: "OK",
  customClass: {
    title: "swal2-title",
  },
});

      return;
    }
    navigate("/payment", {
      state: {
        trainer,
        slot: { slotName, slotTime, slotId },
        selectedPackage,
        className,
      },
    });
  };

  if (loadingTrainer) {
    return (
      <Loaging></Loaging>
    );
  }

  return (
    <div className="w-full bg-[#202020] text-[#f3f3f3] py-12 px-4 md:px-10">
      <h2 className="text-4xl font-bold text-center mb-12 neon-text ">
        Book Your Session
      </h2>

      <div className="flex flex-col md:flex-row gap-10 mb-14 max-w-5xl mx-auto">
        {/* Trainer Image */}
        <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center">
          <img
            src={trainer?.profileImage || "https://via.placeholder.com/150"}
            alt={trainer?.fullName}
            className="w-48 h-48 rounded-xl object-cover  shadow-lg"
          />
        </div>

        {/* Trainer Info */}
        <div className="w-full md:w-2/3 bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700">
          <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaUsers className="text-cyan-600" /> {trainer?.fullName}
          </h3>

          <p className="text-gray-300 mb-2 flex items-center gap-2">
            <FaStar className="text-yellow-400" />
            <strong>Experience:</strong> {trainer?.yearsOfExperience || "N/A"}{" "}
            years
          </p>

          <p className="text-gray-300 mb-2 flex items-center gap-2">
            <FaClock className="text-green-400" />
            <strong>Slot Selected:</strong>{" "}
            {slotName ? `${slotName} (${slotTime})` : "N/A"}
          </p>

          {className && (
            <p className="text-gray-300 mb-2 flex items-center gap-2">
              <FaTools className="neon-text" />
              <strong>Class Selected:</strong> {className}
            </p>
          )}

          <p className="text-gray-300 flex flex-wrap gap-2 items-center">
            <FaTools className="text-cyan-400" />
            <strong>Skills:</strong>{" "}
            {trainer?.skills?.length ? (
              trainer.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-cyan-800 text-purple-200 px-3 py-1 rounded-full text-sm font-semibold"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="italic text-gray-500">N/A</span>
            )}
          </p>
        </div>
      </div>

      {/* Packages Section */}
      <div className="max-w-5xl mx-auto">
        <h3 className="text-3xl font-semibold mb-6 neon-text text-center">
          Choose a Membership
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              onClick={() => setSelectedPackage(pkg)}
              className={`rounded-lg p-6 cursor-pointer transition border shadow-md hover:shadow-xl ${
                selectedPackage?.name === pkg.name
                  ? "bg-gray-800 border-cyan-600"
                  : "bg-gray-900 border-gray-700 hover:border-cyan-500"
              }`}
            >
              <h4 className="text-xl font-bold mb-2 neon-text flex items-center gap-2">
                {pkg.name}{" "}
                <FaCheckCircle
                  className={`ml-auto ${
                    selectedPackage?.name === pkg.name
                      ? "text-cyan-400"
                      : "text-gray-700"
                  }`}
                />
              </h4>
              <p className="text-2xl font-extrabold text-green-500 mb-4 flex items-center gap-1">
                <FaDollarSign />
                {pkg.price}
              </p>
              <ul className="text-sm text-gray-300 list-disc ml-5 space-y-1">
                {pkg.benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={handleJoinNow}
            className="glow-btn bg-gradient-to-r from-[#A259FF] to-[#00F0FF] transition duration-300 text-sm font-semibold"
          >
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainerBookingPage;
