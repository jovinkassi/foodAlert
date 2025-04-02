import React, { useState } from 'react';

const Donation = ({ onDonate }) => {
  const [foodName, setFoodName] = useState('');

  const handleDonate = async () => {
    if (!foodName.trim()) {
      alert("Please enter a food item to donate.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/food/${foodName}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert(`Thank you for donating: ${foodName}`);
        onDonate(foodName); // Update UI
        setFoodName(''); // Clear input after donating
      } else {
        alert("Failed to donate the item.");
      }
    } catch (error) {
      console.error("Error donating food:", error);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-green-100">
      <h3 className="font-bold mb-2">Donate Surplus Food</h3>
      <input
        type="text"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
        placeholder="Enter food item to donate"
        className="border p-2 w-full mb-2"
      />
      <button onClick={handleDonate} className="bg-green-500 text-white px-4 py-2 rounded">
        Donate
      </button>
    </div>
  );
};

export default Donation;
