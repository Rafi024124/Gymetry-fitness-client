import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import useAxios from "../../hooks/useAxios";
import { ThemeContext } from "../../contexts/ThemeContext";


const Register = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const axiosInstance = useAxios();

  const password = watch("password");

  const getPasswordStrength = () => {
    if (!password) return "";
    const length = password.length >= 6;
    const upper = /[A-Z]/.test(password);
    const special = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const number = /\d/.test(password);

    if (length && upper && special && number) return "Strong";
    if (length && (upper || special || number)) return "Medium";
    return "Weak";
  };

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(async (res) => {
        console.log(res);
        
        await updateUser(data.name, data.photoURL);

        const userInfo = {
          name: data.name,
          email: data.email,
          photoURL: data.photoURL,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        const userRes = await axiosInstance.post("/users", userInfo);

        if (userRes.data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Your account has been created successfully.",
            icon: "success",
            background: theme === "dark" ? "#0f0f0f" : "#ffffff",
            color: theme === "dark" ? "#F2F2F2" : "#1f2937",
            confirmButtonColor: theme === "dark" ? "#A259FF" : "#0284c7",
            confirmButtonText: "Continue",
          });
          navigate(from);
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: err.message || "Something went wrong.",
          icon: "error",
          background: theme === "dark" ? "#1F1F1F" : "#ffffff",
          color: theme === "dark" ? "#F2F2F2" : "#1f2937",
          confirmButtonColor: theme === "dark" ? "#A259FF" : "#0284c7",
        });
      });
  };

  // 🎨 THEME STYLES
  const sectionBg = theme === "dark" ? "bg-[#0D0D0D]" : "bg-gray-100";
  const cardBg = theme === "dark" ? "bg-[#1F1F1F]" : "bg-white shadow-lg";
  const headingText = theme === "dark" ? "text-[#A259FF] neon-text" : "text-sky-600";
  const labelColor = theme === "dark" ? "text-[#F2F2F2]" : "text-gray-700";
  const inputBg = theme === "dark" ? "bg-[#0D0D0D]" : "bg-white";
  const inputText = theme === "dark" ? "text-[#F2F2F2]" : "text-gray-900";
  const dividerText = theme === "dark" ? "text-white" : "text-gray-500";
  const highlightText = theme === "dark" ? "text-[#A259FF] neon-text" : "text-sky-600";

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center px-4 ${sectionBg}`}>
      <div className={`mt-3 max-w-md w-full p-8 rounded-2xl shadow-glow ${cardBg}`}>
        <h2 className={`text-3xl font-bold mb-8 text-center ${headingText}`}>
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Name */}
          <div className="mb-4">
            <label className={`block mb-1 font-semibold ${labelColor}`}>Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              {...register("name", { required: "Name is required", minLength: { value: 3, message: "Name must be at least 3 characters" } })}
              className={`input input-bordered w-full ${inputBg} ${inputText}`}
            />
            {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className={`block mb-1 font-semibold ${labelColor}`}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: "Please enter a valid email address" },
              })}
              className={`input input-bordered w-full ${inputBg} ${inputText}`}
            />
            {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>}
          </div>

          {/* Photo URL */}
          <div className="mb-4">
            <label className={`block mb-1 font-semibold ${labelColor}`}>Photo URL</label>
            <input
              type="url"
              placeholder="Enter your photo URL"
              {...register("photoURL", { required: "Photo URL is required" })}
              className={`input input-bordered w-full ${inputBg} ${inputText}`}
            />
            {errors.photoURL && <p className="text-red-500 mt-1 text-sm">{errors.photoURL.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className={`block mb-1 font-semibold ${labelColor}`}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
                minLength: { value: 6, message: "minLength" },
                validate: {
                  hasUpperCase: (v) => /[A-Z]/.test(v) || "hasUpperCase",
                  hasSpecialChar: (v) => /[!@#$%^&*(),.?":{}|<>]/.test(v) || "hasSpecialChar",
                  hasNumber: (v) => /\d/.test(v) || "hasNumber",
                },
              })}
              className={`input input-bordered w-full ${inputBg} ${inputText}`}
            />
            {errors.password?.type === "required" && <p className="text-red-500 text-sm">Password is required</p>}
            {errors.password?.type === "minLength" && <p className="text-red-500 text-sm">Password must be at least 6 characters</p>}
            {errors.password?.type === "hasUpperCase" && <p className="text-red-500 text-sm">Include at least one uppercase letter</p>}
            {errors.password?.type === "hasSpecialChar" && <p className="text-red-500 text-sm">Include at least one special character</p>}
            {errors.password?.type === "hasNumber" && <p className="text-red-500 text-sm">Include at least one number</p>}
            {password && (
              <p className={`mt-1 text-sm font-medium ${
                getPasswordStrength() === "Strong"
                  ? "text-green-500"
                  : getPasswordStrength() === "Medium"
                  ? "text-yellow-400"
                  : "text-red-500"
              }`}>Strength: {getPasswordStrength()}</p>
            )}
          </div>

          <button
            type="submit"
            className={`glow-btn w-full py-2 rounded-md font-semibold transition ${
              theme === "dark"
                ? "bg-gradient-to-r from-[#A259FF] to-[#00F0FF] text-black shadow-glow hover:brightness-110"
                : "bg-sky-500 hover:bg-sky-600 text-white"
            }`}
          >
            Register
          </button>
        </form>

        <div className={`divider divider-primary ${dividerText}`}>OR</div>

        <div className="flex justify-center gap-6">
          <SocialLogin />
        </div>

        <p className={`mt-6 text-center ${highlightText}`}>
          Already have an account?{" "}
          <Link to="/login" className="cursor-pointer hover:underline font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
