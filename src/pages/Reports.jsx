import React from 'react';
import Dashboard from '../components/Dashboard';

const Reports = () => {
  const foodItems = [
    { id: 1, name: 'Milk', expiry: '2024-03-25' },
    { id: 2, name: 'Bread', expiry: '2024-03-22' }
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">Reports</h2>
      <Dashboard foodItems={foodItems} />
    </div>
  );
};

export default Reports;