const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { getFoodItems, addFoodItem } = require("./data/foodData");

const app = express();
const PORT = 5000;
const dataFile = './data/foodData.json';
const authRoutes = require("./authRoutes");
const foodRoutes = require("./foodRoutes");

const cron = require("node-cron");
const sendExpiryNotification = require("./emailService");

// Load user email and food data
const USERS_FILE = "./users.json"; 


// ✅ Apply CORS **before** defining routes
app.use(cors({
  origin: "http://localhost:5173", // Allow only your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// ✅ Define routes after CORS middleware
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);



const loadUsers = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf8").trim();
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading users:", error);
    return [];
  }
};

// Load food items
const loadFoodItems = () => {
  if (fs.existsSync(dataFile)) {
    const rawData = fs.readFileSync(dataFile, 'utf8').trim();
    return rawData ? JSON.parse(rawData) : [];
  }
  return [];
};

// Save food items
const saveFoodItems = (foodItems) => {
  fs.writeFileSync(dataFile, JSON.stringify(foodItems, null, 2));
};



const checkAndSendNotifications = (userEmail) => {
  if (!userEmail) {
    console.error("User email is required for notification check");
    return;
  }

  console.log(`Checking food expiry for user: ${userEmail}`);
  const foodItems = loadFoodItems();
  const today = new Date();

  foodItems.forEach((item) => {
    const expiryDate = new Date(item.expiry);
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 2) {
      console.log(`Sending expiry alert for ${item.name} expiring on ${item.expiry}`);
      sendExpiryNotification(userEmail, item.name, item.expiry);
    }
  });
};
// Schedule this function to run daily at 8:00 AM
cron.schedule("27 22 * * *", checkAndSendNotifications, {
  timezone: "Asia/Kolkata", // Ensures it runs at 10 AM IST
});

console.log("Notification service is running...");

// DELETE endpoint to remove donated item
app.delete('/api/food/:name', (req, res) => {
  let foodItems = loadFoodItems();
  const { name } = req.params;

  const newFoodItems = foodItems.filter(item => item.name !== name);
  saveFoodItems(newFoodItems);

  res.json({ message: `${name} donated successfully!` });
});

// Get all food items
app.get("/api/food-items", (req, res) => {
    res.json(getFoodItems());
});

// Add a new food item
app.post("/api/food-items", (req, res) => {
  const { name, expiry } = req.body;
  if (!name || !expiry) {
    return res.status(400).json({ error: "Name and expiry date are required" });
  }

  const newItem = { id: Date.now(), name, expiry };
  addFoodItem(newItem);
  res.status(201).json(newItem);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
