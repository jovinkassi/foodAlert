import React from 'react';

const FoodItemCard = ({ item }) => {
  const today = new Date();
  const expiryDate = new Date(item.expiry);
  const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

  return (
    <div className={`p-4 border rounded-lg mt-2 ${daysLeft < 3 ? 'bg-red-200' : 'bg-white'}`}>
      <h3 className="text-lg font-bold">{item.name}</h3>
      <p>Expiry Date: {item.expiry}</p>
      {daysLeft < 3 && <p className="text-red-600">⚠️ Expires Soon!</p>}
    </div>
  );
};

export default FoodItemCard;