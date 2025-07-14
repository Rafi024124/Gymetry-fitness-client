import { useParams, useSearchParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

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

  // Extract slot and className from query params
  const selectedSlot = searchParams.get("slot");
  const className = searchParams.get("class"); // <-- NEW

  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigate = useNavigate();

  const { data: trainer, isLoading } = useQuery({
    queryKey: ["trainer", trainerId],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/trainers/${trainerId}`);
      return res.data;
    },
    enabled: !!trainerId,
  });

  const handleJoinNow = () => {
    if (!selectedPackage) return alert("Please select a package");
      
    console.log("ClassName before navigation:", className);
    // Pass className along with other details in state
    navigate("/payment", {
      state: {
        trainer,
        slot: selectedSlot,
        selectedPackage,
        className,  // <-- Pass it here
      },
    });
  };

  if (isLoading)
    return (
      <div className="text-center py-10 text-xl text-purple-400">Loading...</div>
    );

  return (
    <div className="w-full bg-[#202020] text-[#f3f3f3] py-12">
      {/* Header */}
      <h2 className="text-4xl font-bold text-center mb-12 text-[#A259FF]">
        Book Your Session
      </h2>

      {/* Trainer Info */}
      <div className="flex flex-col md:flex-row gap-10 px-4 md:px-16 mb-14">
        <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center">
          <img
            src={trainer.profileImage || "https://via.placeholder.com/150"}
            alt={trainer.fullName}
            className="w-48 h-48 rounded-xl object-cover border-4 border-[#A259FF]"
          />
        </div>
        <div className="w-full md:w-2/3 bg-[#2f2f2f] p-6 rounded-xl shadow-sm border border-[#3a3a3a]">
          <h3 className="text-2xl font-semibold mb-2">{trainer.fullName}</h3>
          <p className="text-[#bfbfbf]">
            <strong>Experience:</strong> {trainer.yearsOfExperience} years
          </p>
          <p className="text-[#bfbfbf]">
            <strong>Slot Selected:</strong> {selectedSlot}
          </p>
          {className && (
            <p className="text-[#bfbfbf]">
              <strong>Class Selected:</strong> {className}
            </p>
          )}
          <p className="text-[#bfbfbf]">
            <strong>Skills:</strong> {trainer.skills?.join(", ")}
          </p>
        </div>
      </div>

      {/* Packages */}
      <div className="px-4 md:px-16">
        <h3 className="text-3xl font-semibold mb-6 text-[#A259FF]">
          Choose a Membership
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              onClick={() => setSelectedPackage(pkg)}
              className={`rounded-lg p-5 cursor-pointer transition border ${
                selectedPackage?.name === pkg.name
                  ? "bg-[#3a2f52] border-[#A259FF]"
                  : "bg-[#2b2b2b] border-[#3a3a3a] hover:border-[#A259FF]"
              }`}
            >
              <h4 className="text-xl font-bold mb-1 text-white">{pkg.name}</h4>
              <p className="text-lg font-semibold text-[#A259FF] mb-3">${pkg.price}</p>
              <ul className="text-sm text-[#dcdcdc] list-disc ml-5 space-y-1">
                {pkg.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Join Now */}
        <div className="text-center mt-10">
          <button
            onClick={handleJoinNow}
            className="bg-[#A259FF] hover:bg-[#8c3aff] text-white font-semibold px-8 py-3 rounded-full transition"
          >
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainerBookingPage;
