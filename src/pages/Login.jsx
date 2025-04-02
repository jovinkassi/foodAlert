import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login status
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home"); // Navigate only when authenticated
    }
  }, [isAuthenticated, navigate]); // Runs when `isAuthenticated` changes

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token); // Store token for authentication
      setIsAuthenticated(true); // Trigger navigation in useEffect
    } catch (error) {
      alert(error.response?.data?.message || "Login failed. Try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md">
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Login
        </button>
      </form>
      <p className="mt-2">
        Don't have an account?{" "}
        <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/register")}>
          Register here
        </span>
      </p>
    </div>
  );
};

export default Login;
