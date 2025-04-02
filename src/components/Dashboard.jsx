import React from 'react';

const Dashboard = ({ foodItems }) => {
  const totalItems = foodItems.length;
  const expiredItems = foodItems.filter(
    (item) => new Date(item.expiry) < new Date()
  ).length;

  return (
    <div className="p-4 border rounded-lg bg-white">
      <h3 className="font-bold mb-2">Dashboard</h3>
      <p>Total Items: {totalItems}</p>
      <p>Expired Items: {expiredItems}</p>
    </div>
  );
};

export default Dashboard;