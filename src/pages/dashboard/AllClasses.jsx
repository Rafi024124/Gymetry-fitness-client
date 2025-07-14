import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaDumbbell, FaUserFriends, FaInfoCircle } from "react-icons/fa";

const classDescriptions = {
  Yoga: "Improve flexibility, balance, and mindfulness with our guided yoga sessions suitable for all levels.",
  Cardio: "Boost your heart rate and burn calories with high-energy cardio workouts led by top trainers.",
  Strength: "Build muscle and power through targeted strength training programs with expert support.",
  Pilates: "Strengthen your core and improve posture through controlled movements and breathing.",
  Zumba: "Enjoy an energetic, fun-filled dance workout that doesn’t feel like exercise at all.",
  Boxing: "Enhance your endurance, coordination, and confidence with boxing techniques and drills.",
  CrossFit: "High-intensity functional workouts designed to improve strength, agility, and speed.",
  Spin: "Hop on a bike and ride to the rhythm in an intense, music-driven cycling class.",
};

const AllClasses = () => {
  const [page, setPage] = useState(1);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();


   
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allClasses", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes?page=${page}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <div className="text-white text-center">Loading classes...</div>;
  if (isError) return <div className="text-red-500 text-center">Failed to load classes.</div>;

  const { classes, totalPages } = data;

  return (
    <div className="min-h-screen bg-[#121212] text-white px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Explore Our Fitness Classes</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base">
            Discover a variety of fitness classes tailored to your goals. Click on a trainer to view their profile and join a class!
          </p>
        </div>

        {classes.map((classItem) => {
          const description =
            classItem.description ||
            classDescriptions[classItem.className] ||
            "Join our class and begin your fitness transformation today!";
              

          return (
            <div
              key={classItem.className}
              className="bg-[#1F1F1F] p-6 rounded-xl shadow-md border border-[#2a2a2a] text-center"
            >
              <div className="flex flex-col items-center space-y-4">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <FaDumbbell className="text-white" />
                  {classItem.className}
                </h3>

                <p className="text-gray-300 text-sm max-w-xl flex items-center gap-2 justify-center">
                  <FaInfoCircle className="text-[#aaa]" />
                  {description}
                </p>

                <div>
                  <p className="text-sm font-semibold text-gray-400 mb-2 flex items-center justify-center gap-2">
                    <FaUserFriends className="text-white" />
                    Top Trainers for this Class:
                  </p>
                  <div className="flex justify-center flex-wrap gap-6">
                    {classItem.trainers.slice(0, 5).map((trainer) => (
                      <div
                        key={trainer._id}
                        className="w-24 text-center cursor-pointer hover:text-orange-300"
                        onClick={() => navigate(`/trainers/${trainer._id}?class=${encodeURIComponent(classItem.className)}`)}
                      >
                        <img
                          src={trainer.profileImage}
                          alt={trainer.fullName}
                          className="w-20 h-20 rounded-full object-cover mx-auto  mb-1"
                        />
                        <p className="text-sm font-medium">{trainer.fullName}</p>
                      </div>
                    ))}
                    {classItem.trainers.length === 0 && (
                      <p className="text-gray-500 italic text-center">No trainers available for this class.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Pagination */}
        <div className="flex justify-center mt-10 gap-2">
          {[...Array(totalPages).keys()].map((i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-md border border-[#A259FF] hover:bg-[#A259FF] transition font-medium ${
                page === i + 1 ? "bg-[#A259FF] text-white" : "bg-[#1F1F1F] text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllClasses;
