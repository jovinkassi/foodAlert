import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddFood = () => {
  const [foodName, setFoodName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!foodName.trim()) {
      setFeedback({ type: 'error', message: 'Please enter a food name' });
      return;
    }
    
    if (!expiryDate) {
      setFeedback({ type: 'error', message: 'Please select an expiry date' });
      return;
    }
    
    const newItem = { name: foodName, expiry: expiryDate };
    
    setIsSubmitting(true);
    setFeedback({ type: '', message: '' });
    
    try {
      const response = await fetch('http://localhost:5000/api/food-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      
      if (!response.ok) {
        throw new Error('Failed to add food item');
      }
      
      setFeedback({ 
        type: 'success', 
        message: `Successfully added ${foodName} with expiry date: ${expiryDate}` 
      });
      setFoodName('');
      setExpiryDate('');
    } catch (error) {
      console.error(error);
      setFeedback({ 
        type: 'error', 
        message: 'Error adding food item. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Add Food Item</h2>
          <Link to="/" className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition duration-300">
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="foodName" className="block text-sm font-medium text-gray-700 mb-1">
                  Food Name
                </label>
                <input
                  id="foodName"
                  type="text"
                  placeholder="Enter food name"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  id="expiryDate"
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              {feedback.message && (
                <div className={`p-4 mb-4 rounded ${
                  feedback.type === 'success' ? 'bg-green-50 text-green-700 border-l-4 border-green-500' : 
                  'bg-red-50 text-red-700 border-l-4 border-red-500'
                }`}>
                  {feedback.message}
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow transition duration-300 flex items-center ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting && (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {isSubmitting ? 'Adding...' : 'Add Food Item'}
                </button>
                
                <Link to="/food-list" className="text-blue-600 hover:text-blue-800 hover:underline">
                  View Food List
                </Link>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-6 bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
          <h3 className="text-lg font-medium text-blue-800">Tips</h3>
          <ul className="mt-2 text-blue-700 text-sm">
            <li className="mb-1">• Add perishable items as soon as you purchase them</li>
            <li className="mb-1">• Check your inventory regularly to minimize food waste</li>
            <li>• Items nearing expiration will be highlighted in your food list</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddFood;