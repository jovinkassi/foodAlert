import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FoodItemCard from '../components/FoodItemCard';
import RecipeSuggestions from '../components/RecipeSuggestions';
import Donation from '../components/Donation';

const FoodList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/food-items')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setFoodItems(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching food items:", error);
        setError("Failed to load food items. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Food Inventory</h2>
          <Link to="/" className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition duration-300">
            Back to Home
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
            <p>{error}</p>
          </div>
        ) : foodItems.length === 0 ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
            <p>No food items found. Add some items to your inventory!</p>
            <Link to="/add-food" className="inline-block mt-2 text-blue-600 hover:underline">Add Food Items</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {foodItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <FoodItemCard item={item} />
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <RecipeSuggestions foodName={item.name} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 bg-white rounded-xl shadow-md p-6">
          <Donation />
        </div>
      </div>
    </div>
  );
};

export default FoodList;