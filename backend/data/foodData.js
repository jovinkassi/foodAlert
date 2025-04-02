const fs = require('fs');
const dataFile = './data/foodData.json';

// Load food items from file
const loadFoodItems = () => {
  if (fs.existsSync(dataFile)) {
    const rawData = fs.readFileSync(dataFile);
    return JSON.parse(rawData);
  }
  return [];
};

// Save food items to file
const saveFoodItems = (foodItems) => {
  fs.writeFileSync(dataFile, JSON.stringify(foodItems, null, 2));
};

// Initialize food data
let foodItems = loadFoodItems();

module.exports = {
  getFoodItems: () => foodItems,
  addFoodItem: (item) => {
    foodItems.push(item);
    saveFoodItems(foodItems);
  }
};
