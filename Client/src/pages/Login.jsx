/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Provider/UserProvider";
import logo from "../assets/logo.jpeg"


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setUser } = useUser();
  const [error, setError] = useState(null);
  const Navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const response = await fetch("https://attserver.vercel.app/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const user = await response.json();
        setUser(user);
        Navigate("/");
      } else {
        const errorData = await response.json();
        console.error("Authentication failed:", errorData.error);
        // Display an error message to the user
        setError("Authentication failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle network or other client-side errors and display a user-friendly message
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className=" mx-auto flex justify-center items-center h-screen bg-gray-100">
      <div className="md:w-2/6 bg-white rounded-lg shadow-lg p-6 bg-opacity-20">
        <img src={logo} alt="logo" className="w-30 h-20 mb-10" />
        <h3 className="text-2xl font-semibold mb-4">Please Login</h3>
        <form className="mx-auto form-control w-[400px]" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            placeholder="Enter email"
            className={`border border-black p-1 rounded mb-4 ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500">Valid email is required</p>}

          <input
            type="password"
            {...register("password", {
              required: true,
              pattern: /^(?=.*[A-Z])(?=.*\d).+$/,
            })}
            placeholder="Password"
            className={`border border-black p-1 rounded mb-4 ${errors.password ? 'border-red-500' : ''}`}
          />
          {errors.password && (
            <p className="text-red-500">
              Password is required and must contain an uppercase letter and at least one number
            </p>
          )}

          <input
            className="p-2 bg-blue-600 text-white rounded-lg mt-4"
            value="Log In"
            type="submit"
          />
          <p>Don't have an account? <a className="text-blue-600" href="/register">Register</a></p>
        </form>

        <Link className="text-red-400" to="/">Go Back to home</Link>
      </div>
    </div>
  );
}


export default Login;

