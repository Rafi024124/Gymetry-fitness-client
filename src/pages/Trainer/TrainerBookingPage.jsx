import React, { useState, useContext } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaDollarSign, FaCheckCircle, FaClock, FaStar, FaUsers, FaTools, FaSun, FaMoon } from "react-icons/fa";
import Loaging from "../../loagind/Loaging";
import Swal from "sweetalert2";
import { ThemeContext } from "../../contexts/ThemeContext";

const packages = [
  {
    name: "Basic",
    benefits: ["Access to gym facilities during regular hours"],
    price: 10,
  },
  {
    name: "Standard",
    benefits: ["All Basic benefits", "Access to group fitness classes like yoga, Zumba"],
    price: 50,
  },
  {
    name: "Premium",
    benefits: ["All Standard benefits", "Personal training sessions", "Sauna, massage therapy, etc."],
    price: 100,
  },
];

const TrainerBookingPage = () => {
  const { trainerId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const slotName = searchParams.get("slotName");
  const slotTime = searchParams.get("slotTime");
  const slotId = searchParams.get("slotId");
  const className = searchParams.get("className");

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
        background: theme === "dark" ? "#0f0f0f" : "#f8f8f8",
        color: theme === "dark" ? "#F2F2F2" : "#333",
        confirmButtonColor: "#007a7a",
        confirmButtonText: "OK",
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

  if (loadingTrainer) return <Loaging />;

  const bgClass = theme === "dark" ? "bg-[#202020] text-[#f3f3f3]" : "bg-sky-50 text-gray-900";
  const cardBgClass = theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300";
  const hoverCardClass = theme === "dark" ? "hover:border-cyan-500 hover:shadow-xl" : "hover:border-blue-500 hover:shadow-lg";
  const neonTextClass = theme === "dark" ? "neon-text" : "text-black font-bold";

  return (
    <div className={`w-full py-12 px-4 md:px-10 ${bgClass}`}>
      {/* Theme Toggle */}
      <div className="flex justify-end mb-6">
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-300/20 transition">
          {theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-800" />}
        </button>
      </div>

      <h2 className={`text-4xl font-bold text-center mb-12 ${neonTextClass}`}>Book Your Session</h2>

      {/* Trainer Info */}
      <div className="flex flex-col md:flex-row gap-10 mb-14 max-w-5xl mx-auto">
        <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center">
          <img
            src={trainer?.profileImage || "https://via.placeholder.com/150"}
            alt={trainer?.fullName}
            className="w-48 h-48 rounded-xl object-cover shadow-lg"
          />
        </div>

        <div className={`${cardBgClass} w-full md:w-2/3 p-6 rounded-xl shadow-lg border`}>
          <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaUsers className="text-cyan-600" /> {trainer?.fullName}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-2 flex items-center gap-2">
            <FaStar className="text-yellow-400" />
            <strong>Experience:</strong> {trainer?.yearsOfExperience || "N/A"} years
          </p>

          <p className="text-gray-600 dark:text-gray-300 mb-2 flex items-center gap-2">
            <FaClock className="text-green-400" />
            <strong>Slot Selected:</strong> {slotName ? `${slotName} (${slotTime})` : "N/A"}
          </p>

          {className && (
            <p className="text-gray-600 dark:text-gray-300 mb-2 flex items-center gap-2">
              <FaTools className="text-cyan-500" />
              <strong>Class Selected:</strong> {className}
            </p>
          )}

          <p className="text-gray-600 dark:text-gray-300 flex flex-wrap gap-2 items-center">
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

      {/* Packages */}
      <div className="max-w-5xl mx-auto">
        <h3 className={`text-3xl font-semibold mb-6 text-center ${neonTextClass}`}>Choose a Membership</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              onClick={() => setSelectedPackage(pkg)}
              className={`rounded-lg p-6 cursor-pointer transition border shadow-md ${
                selectedPackage?.name === pkg.name
                  ? theme === "dark"
                    ? "bg-gray-800 border-cyan-600 shadow-cyan-500/50"
                    : "bg-blue-100 border-blue-600 shadow-blue-300"
                  : `${cardBgClass} ${hoverCardClass}`
              }`}
            >
              <h4 className={`text-xl font-bold mb-2 flex items-center gap-2 ${neonTextClass}`}>
                {pkg.name}{" "}
                <FaCheckCircle
                  className={`ml-auto ${
                    selectedPackage?.name === pkg.name ? "text-cyan-400" : theme === "dark" ? "text-gray-700" : "text-gray-400"
                  }`}
                />
              </h4>
              <p className="text-2xl font-extrabold text-green-500 mb-4 flex items-center gap-1">
                <FaDollarSign /> {pkg.price}
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5 space-y-1">
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
            disabled={!selectedPackage}
            className={`glow-btn bg-gradient-to-r from-[#A259FF] to-[#00F0FF] transition duration-300 text-sm font-semibold ${
              !selectedPackage ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainerBookingPage;
