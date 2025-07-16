import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaSearch, FaUserShield, FaUserTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [emailQuery, setEmailQuery] = useState("");

  const {
    data: users = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["searchedUsers", emailQuery],
    enabled: !!emailQuery,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${emailQuery}`);
      return res.data;
    },
  });

  const { mutateAsync: updateRole } = useMutation({
    mutationFn: async ({ id, role }) =>
      await axiosSecure.patch(`/users/${id}/role`, { role }),
    onSuccess: () => {
      refetch();
    },
  });

  const handleRoleChange = async (id, currentRole) => {
    const action = currentRole === "admin" ? "Remove admin" : "Make admin";
    const newRole = currentRole === "admin" ? "user" : "admin";

    const confirm = await Swal.fire({
      title: `${action}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      background: "#1F1F1F",
      color: "#F2F2F2",
      confirmButtonColor: "#A259FF",
      cancelButtonColor: "#555",
    });

    if (!confirm.isConfirmed) return;

    try {
      await updateRole({ id, role: newRole });
      Swal.fire("Success", `${action} successful`, "success");
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to update user role", "error");
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-xl shadow-xl min-h-[80vh]">
      <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-gradient-to-r from-[#A259FF] to-[#00F0FF] bg-clip-text">
        Admin Panel
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <div className="flex items-center bg-gray-800 border border-gray-700 rounded w-full md:w-1/2 px-4">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            className="bg-transparent px-3 py-2 outline-none w-full text-white"
            placeholder="Search user by email"
            value={emailQuery}
            onChange={(e) => setEmailQuery(e.target.value)}
          />
        </div>
      </div>

      {isFetching && <p className="text-center text-gray-400">Loading users...</p>}

      {!isFetching && users.length === 0 && emailQuery && (
        <p className="text-center text-gray-500">No users found.</p>
      )}

      {users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table w-full text-white">
            <thead className="bg-[#333] text-gray-200">
              <tr>
                <th>Email</th>
                <th>Created At</th>
                <th>Role</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-[#2c2c2c]">
                  <td>{u.email}</td>
                  <td>{new Date(u.created_at).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge px-3 py-1 rounded-full text-sm ${u.role === "admin"
                          ? "bg-green-500 text-black"
                          : "bg-gray-700 text-white"
                        }`}
                    >
                      {u.role || "user"}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleRoleChange(u._id, u.role || "user")}
                      className={`px-4 py-2 rounded text-sm font-medium flex items-center justify-center gap-1 ${u.role === "admin"
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                        }`}
                    >
                      {u.role === "admin" ? (
                        <>
                          <FaUserTimes /> Remove Admin
                        </>
                      ) : (
                        <>
                          <FaUserShield /> Make Admin
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MakeAdmin;
