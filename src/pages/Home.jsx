import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-700 mb-2">Smart Food Management</h1>
            <p className="text-gray-600">Manage your food inventory efficiently and reduce waste</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Link 
              to="/food-list" 
              className="flex items-center justify-center px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>View Food List</span>
              </div>
            </Link>
            
            <Link 
              to="/add-food" 
              className="flex items-center justify-center px-6 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Food</span>
              </div>
            </Link>
            
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center px-6 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </div>
            </button>
          </div>
          
          <div className="mt-12 text-center text-sm text-gray-500">
            <p>© 2025 Smart Food Management. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;