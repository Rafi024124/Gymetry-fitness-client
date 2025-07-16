import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css"; 

import SocialLogin from "../SocialLogin";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const { createUser,updateUser } = useContext(AuthContext);
  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
   const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

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
    console.log("Form submitted!", data);
    createUser(data.email, data.password)
      .then(async(res) => {
        console.log("after submitting",res.user);
 
         await updateUser(data.name, data.photoURL);

        const userInfo = {
          name: data.name,
          email: data.email,
          photoURL: data.photoURL,
          role: 'user',
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString()
        }
        
            

        const userRes = await axiosInstance.post('/users',userInfo) 
        //console.log("Response from backend:", userRes.data);
        

       


        if(userRes.data.insertedId){
             Swal.fire({
          title: "Success!",
          text: "Your account has been created successfully.",
          icon: "success",
          background: "#1F1F1F",
          color: "#F2F2F2",
          confirmButtonColor: "#A259FF",
          confirmButtonText: "Continue",
          customClass: {
            title: "swal2-title",
          },
        });
        navigate(from);
        }

      })
      .catch((err) => {
        console.log(err);

        // You can show error alert here if needed
        Swal.fire({
          title: "Error!",
          text: err.message || "Something went wrong.",
          icon: "error",
          background: "#1F1F1F",
          color: "#F2F2F2",
          confirmButtonColor: "#A259FF",
        });
      });

    // Backend logic (e.g., API call) goes here (commented)
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
    // navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#0D0D0D] px-4">
      <div className="mt-3 max-w-md w-full bg-[#1F1F1F] p-8 shadow-glow rounded-2xl">
        <div className="flex justify-center mb-6 ">logo</div>

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
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                  message: "Please enter a valid email address",
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
                // pattern: {
                //   value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|svg)$/i,
                //   message: "Please enter a valid image URL",
                // },
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
                required: true,
                minLength: {
                  value: 6,
                  message: "minLength",
                },
                validate: {
                  hasUpperCase: (v) => /[A-Z]/.test(v) || "hasUpperCase",
                  hasSpecialChar: (v) =>
                    /[!@#$%^&*(),.?":{}|<>]/.test(v) || "hasSpecialChar",
                  hasNumber: (v) => /\d/.test(v) || "hasNumber",
                },
              })}
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

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#A259FF] to-[#00F0FF] text-black font-semibold py-2 rounded-md shadow-glow hover:brightness-110 transition"
          >
            Register
          </button>
        </form>

        <div className="divider divider-primary text-white">OR</div>

        <div className="flex justify-center gap-6">
          <SocialLogin />
        </div>

        <p className="mt-6 text-center text-[#A259FF] neon-text">
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

/* 
Optional CSS to add in your global stylesheet (e.g., index.css):

.swal2-popup {
  background: #1F1F1F !important;
  color: #F2F2F2 !important;
  font-family: 'YourPreferredFont', sans-serif;
}

.swal2-title {
  color: #A259FF !important;
}

.swal2-confirm {
  background-color: #A259FF !important;
  color: #F2F2F2 !important;
}
*/
