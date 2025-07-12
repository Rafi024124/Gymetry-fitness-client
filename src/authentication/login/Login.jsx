import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form data:", data);
    // Handle login here

    // After successful login, redirect:
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#0D0D0D] px-4">
      <div className="max-w-md w-full bg-[#1F1F1F] rounded-xl p-8 shadow-glow">
        <div className="flex justify-center mb-6">
          {/* logo placeholder */}
          logo
        </div>

        <h2 className="text-3xl text-[#A259FF] font-bold mb-8 text-center neon-text">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label className="block mb-1 text-[#F2F2F2] font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email",
                },
              })}
              className="input input-bordered w-full bg-[#0D0D0D] text-[#F2F2F2]"
            />
            {errors.email && (
              <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-[#F2F2F2] font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="input input-bordered w-full bg-[#0D0D0D] text-[#F2F2F2]"
            />
            {errors.password && (
              <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#A259FF] to-[#00F0FF] text-[#F2F2F2] font-semibold py-2 rounded-md shadow-glow hover:brightness-110 transition"
          >
            Login
          </button>
        </form>

        <div className="my-6 text-center text-[#ccc]">or</div>

        <div className="flex justify-center gap-6">
          <SocialLogin />
        </div>

        <p className="mt-6 text-center text-[#A259FF]">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="cursor-pointer hover:underline font-semibold"
          >
            Create new account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
