import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import Loading from "../../loagind/Loaging";

const MyPaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading, isError } = useQuery({
    queryKey: ["myPayments", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/payments/my?email=${encodeURIComponent(user.email)}`);
      return res.data;
    },
    enabled: !!user?.email,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <Loading />;
  if (isError)
    return <div className="text-center text-red-500">Failed to load payment history.</div>;
  if (!payments.length)
    return <div className="text-center text-gray-400 mt-10">You have no payment history.</div>;

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-[#A259FF]">My Payment History</h2>

        <div className="overflow-x-auto rounded-lg border border-[#2e2e2e]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1e1e1e] text-white">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Trainer</th>
                <th className="p-4">Slot</th>
                <th className="p-4">Package</th>
                <th className="p-4">Price</th>
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Paid At</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, idx) => (
                <tr
                  key={payment._id}
                  className={idx % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#222222]"}
                >
                  <td className="p-4">{idx + 1}</td>
                  <td className="p-4">{payment.trainerName}</td>
                  <td className="p-4">{payment.slot}</td>
                  <td className="p-4">{payment.packageName}</td>
                  <td className="p-4 text-green-400 font-semibold">${payment.price}</td>
                  <td className="p-4 break-all">{payment.transactionId}</td>
                  <td className="p-4">
                    {new Date(payment.paidAt).toLocaleString("en-US", {
                      dateStyle: "short",
                      timeStyle: "medium",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyPaymentHistory;
