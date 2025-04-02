export let foodItems = [
    { id: 1, name: 'Milk', expiry: '2024-03-25' },
    { id: 2, name: 'Bread', expiry: '2024-03-22' }
  ];
  
  export const addFoodItem = (newItem) => {
    foodItems.push(newItem);
  };
  