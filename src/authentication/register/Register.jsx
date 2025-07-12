import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Registration data:", data);

    // Backend logic (e.g., API call) goes here:
    /*
    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(user => {
        // Save user to MongoDB, assign default role 'member', etc.
        navigate('/dashboard');
      })
      .catch(err => {
        console.error(err);
        // handle error, show message
      });
    */

    // For now, simulate successful registration redirect
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#0D0D0D] px-4">
      <div className="mt-3 max-w-md w-full bg-[#1F1F1F]  p-8 shadow-glow rounded-2xl">
        <div className="flex justify-center mb-6 ">
          {/* logo placeholder */}
          logo
        </div>

        <h2 className="text-3xl text-[#A259FF] font-bold mb-8 text-center neon-text">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label className="block mb-1 text-[#F2F2F2] font-semibold">Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "Name must be at least 3 characters" },
              })}
              className="input input-bordered w-full bg-[#0D0D0D] text-[#F2F2F2]"
            />
            {errors.name && (
              <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>
            )}
          </div>

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
            <label className="block mb-1 text-[#F2F2F2] font-semibold">Photo URL</label>
            <input
              type="url"
              placeholder="Enter your photo URL"
              {...register("photoURL", {
                required: "Photo URL is required",
                pattern: {
                  value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|svg)$/i,
                  message: "Please enter a valid image URL",
                },
              })}
              className="input input-bordered w-full bg-[#0D0D0D] text-[#F2F2F2]"
            />
            {errors.photoURL && (
              <p className="text-red-500 mt-1 text-sm">{errors.photoURL.message}</p>
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
            Register
          </button>
        </form>

         <div className="divider divider-primary text-white">OR</div>

        <div className="flex justify-center gap-6">
          <SocialLogin />
        </div>

        <p className="mt-6 text-center text-[#A259FF]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="cursor-pointer hover:underline font-semibold"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
