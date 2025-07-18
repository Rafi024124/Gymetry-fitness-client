import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin";
import { AuthContext } from "../../contexts/authContext/AuthContext";

const Login = () => {
  const { signInUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const email = watch("email");
  const password = watch("password");

  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          background: "#0f0f0f",
          color: "#F2F2F2",
          confirmButtonColor: "#007a7a",
        });
        navigate(from);
      })
      .catch((err) => {
        //console.log(err);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: err.message,
          background: "#1F1F1F",
          color: "#F2F2F2",
          confirmButtonColor: "#A259FF",
        });
      });
  };

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

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#0D0D0D] px-4">
      <div className="max-w-md w-full bg-[#1F1F1F] rounded-xl p-8 shadow-glow">
        <div className="flex justify-center mb-6">logo</div>

        <h2 className="text-3xl text-[#A259FF] font-bold mb-8 text-center neon-text">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 text-[#F2F2F2] font-semibold">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })}
              placeholder="Enter your email"
              className="input input-bordered w-full bg-[#0D0D0D] text-[#F2F2F2]"
            />
            {errors.email && (
              <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-1 text-[#F2F2F2] font-semibold">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 6,
                  message: "minLength",
                },
                validate: {
                  hasUpperCase: (v) => /[A-Z]/.test(v) || "hasUpperCase",
                  hasSpecialChar: (v) => /[!@#$%^&*(),.?":{}|<>]/.test(v) || "hasSpecialChar",
                  hasNumber: (v) => /\d/.test(v) || "hasNumber",
                },
              })}
              placeholder="Enter your password"
              className="input input-bordered w-full bg-[#0D0D0D] text-[#F2F2F2]"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm">Password must be at least 6 characters</p>
            )}
            {errors.password?.type === "hasUpperCase" && (
              <p className="text-red-500 text-sm">Include at least one uppercase letter</p>
            )}
            {errors.password?.type === "hasSpecialChar" && (
              <p className="text-red-500 text-sm">Include at least one special character</p>
            )}
            {errors.password?.type === "hasNumber" && (
              <p className="text-red-500 text-sm">Include at least one number</p>
            )}

            {/* Password Strength */}
            {password && (
              <p
                className={`mt-1 text-sm font-medium ${
                  getPasswordStrength() === "Strong"
                    ? "text-green-500"
                    : getPasswordStrength() === "Medium"
                    ? "text-yellow-400"
                    : "text-red-500"
                }`}
              >
                Strength: {getPasswordStrength()}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!email || !password}
            className={`w-full py-2 rounded-md font-semibold transition ${
              email && password
                ? "bg-gradient-to-r from-[#A259FF] to-[#00F0FF] text-[#F2F2F2] shadow-glow hover:brightness-110"
                : "bg-[#333] text-[#888] cursor-not-allowed"
            }`}
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
          state={{from}}
          to="/register" className="cursor-pointer hover:underline font-semibold neon-text">
            Create new account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
