import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post("https://foodalert-xoow.onrender.com/api/auth/register", { email, password });
      localStorage.setItem("hasAccount", "true"); // Mark user as registered
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed. Try again.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 w-full mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 w-full mb-2"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="border p-2 w-full mb-2"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
          Register
        </button>
      </form>
      <p className="mt-2">
        Already have an account?{" "}
        <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>
          Login here
        </span>
      </p>
    </div>
  );
};

export default Register;
