"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const AuthForm = () => {

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState(0);
  const [password, setPassword] = useState("");

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSwitchForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLoginSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with email:", email, "and password:", password);
  
    // Construct your API endpoint URL
    const apiUrl = "http://localhost:5000/user/login"; // Replace this with your actual API endpoint
  
    // Construct the request body (if needed)
    const requestBody = {
      email: email,
      password: password,
    };
  
    try {
      // Make a POST request to the API
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error("API request failed");
      }
  
      const data = await response.json();
      console.log("API Response:", data);

      const { id, token } = data;

      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 3000, // Toast will automatically close after 3000ms (3 seconds)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const now = new Date();
      const expiryDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      Cookies.set("_id", id, { expires: expiryDate, path: "/" });
      Cookies.set("token", token, { expires: expiryDate, path: "/" });
      window.location.href = '/profile';
    } catch (error) {
      console.error("Error occurred during API request:", error);
      toast.error("Login failed. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      "Signing up with name:",
      name,
      "email:",
      email,
      "and password:",
      password
    );
  
    const apiUrl = "http://localhost:5000/user";
  
    const requestBody = {
      name: name,
      email: email,
      age: age,
      city: city,
      password: password,
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error("API request failed");
      }
  
      const data = await response.json();
      console.log("API Response:", data);

      toast.success("Signup successful!Login to Continue", {
        position: "top-center",
        autoClose: 3000, // Toast will automatically close after 3000ms (3 seconds)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Handle the API response data here
    } catch (error) {
      console.error("Error occurred during API request:", error);
      toast.error("SignUp failed. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  

  return (
    <div className="flex flex-col bg-base-200 relative h-[80vh] max-h-[800px]">
      <div className="flex flex-col card min-w-[300px] max-w-2xl bg-base-100 items-center absolute top-[5%] left-[50%] transform translate-x-[-50%] text-gray-800">
        {isLogin ? (
          <div className="card-body">
            <h2 className="card-title justify-center text-gray-800">Login</h2>
            <form onSubmit={handleLoginSubmit}>
            <div className="form-control">
                <label className="label-text">Email:</label>
                <input
                  className="input input-bordered w-full"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label-text">Password:</label>
                <input
                  className="input input-bordered w-full"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
              <label className="label cursor-pointer">
                <label className="label-text">Show Password</label>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={showPassword}
                  onChange={handleShowPassword}
                />
              </label>
              </div>
              <button className="form-submit w-full btn btn-active btn-primary">
                Login
              </button>
            </form>
            <div className="switch-button">
              <button
                className="form-submit w-full btn btn-active btn-secondary"
                onClick={handleSwitchForm}
              >
                Switch to Signup
              </button>
            </div>
          </div>
        ) : (
          <div className="card-body">
            <h2 className="card-title justify-center text-gray-800">Signup</h2>
            <form onSubmit={handleSignupSubmit}>
              <div className="form-control">
                <label className="label-text">Name:</label>
                <input
                  className="input input-bordered w-full"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex">
                <div className="form-control mr-3">
                  <label className="label-text">Age:</label>
                  <input
                    className="input input-bordered w-full"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value))}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label-text">City:</label>
                  <input
                    className="input input-bordered w-full"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label-text">Email:</label>
                <input
                  className="input input-bordered w-full"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label-text">Password:</label>
                <input
                  className="input input-bordered w-full"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
              <label className="label cursor-pointer">
                <label className="label-text">Show Password</label>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={showPassword}
                  onChange={handleShowPassword}
                />
              </label>
              </div>
              <button className="form-submit w-full btn btn-active btn-primary">
                Signup
              </button>
            </form>
            <div className="switch-button">
              <button
                className="form-submit w-full btn btn-active btn-secondary"
                onClick={handleSwitchForm}
              >
                Switch to Login
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthForm;