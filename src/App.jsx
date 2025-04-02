import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import FoodList from "./pages/FoodList";
import AddFood from "./pages/AddFood";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Register from "./pages/Register";

const isAuthenticated = () => !!localStorage.getItem("token");
const isNewUser = () => !localStorage.getItem("hasAccount");

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Routes>
          {/* Default Route Redirects */}
          <Route path="/" element={isAuthenticated() ? <Navigate to="/home" /> : isNewUser() ? <Navigate to="/register" /> : <Navigate to="/login" />} />

          {/* Explicit Home Route */}
          <Route path="/home" element={isAuthenticated() ? <Home /> : <Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/food-list" element={isAuthenticated() ? <FoodList /> : <Navigate to="/login" />} />
          <Route path="/add-food" element={isAuthenticated() ? <AddFood /> : <Navigate to="/login" />} />
          <Route path="/reports" element={isAuthenticated() ? <Reports /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
