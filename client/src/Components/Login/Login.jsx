import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [forgotPasswordClicked, setForgotPasswordClicked] = useState(false);
  const navigate = useNavigate();
   
  // Validate email and password fields
  const validateForm = () => {
    let isValid = true;
    let newErrors = { email: "", password: "" };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return;
    }
    axios
      .post("/api/login/sendPassword", { email })
      .then((response) => {
        console.log(response.data);
        setForgotPasswordClicked(true); // Show success message after sending password reset
        toast.success("Password reset link sent to your email.");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error sending password reset link.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate before submitting
    if (!validateForm()) return;

    // Perform login logic here
    axios
      .post("/api/login/verifyPassword", { email, password })
      .then((response) => {
        console.log("response for login", response);
        if (response.data) {
            const email = response.data.user.email;
            const _id = response.data.user._id;
            localStorage.setItem("userId", _id);
            localStorage.setItem("userEmail", email);
          navigate("/dashboard"); // Redirect to homepage or dashboard
          toast.success("Login successful!");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Login failed. Please check your credentials.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full mt-2 p-3 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter your email"
              required
              autoComplete="off"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full mt-2 p-3 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter your password"
              required
              autoComplete="off"
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}

            {/* Show Password Icon */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 cursor-pointer text-gray-600"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Get Password Button */}
          <div className="mb-4">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="w-full bg-yellow-500 text-white p-3 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Get Password
            </button>
            
          </div>

          {/* Login Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>

         
        </form>
      </div>
    </div>
  );
};

export default Login;
