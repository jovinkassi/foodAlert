const express = require("express");
const fs = require("fs");
const nodemailer = require("./nodemailerConfig");

const router = express.Router();
const FOOD_FILE = "./foodData.json";

const loadFood = () => JSON.parse(fs.readFileSync(FOOD_FILE, "utf8"));
const saveFood = (data) => fs.writeFileSync(FOOD_FILE, JSON.stringify(data, null, 2));

// Add Food Item
router.post("/", (req, res) => {
  const foodItems = loadFood();
  const newItem = req.body;
  foodItems.push(newItem);
  saveFood(foodItems);
  res.json({ message: "Food item added", item: newItem });
});

// Delete Donated Item
router.delete("/:name", (req, res) => {
  let foodItems = loadFood();
  foodItems = foodItems.filter((item) => item.name !== req.params.name);
  saveFood(foodItems);
  res.json({ message: "Item removed" });
});

// Send Expiry Notifications
router.get("/send-notifications", (req, res) => {
  const foodItems = loadFood();
  const today = new Date();
  const users = JSON.parse(fs.readFileSync("./users.json"));

  foodItems.forEach((item) => {
    const expiryDate = new Date(item.expiry);
    const daysLeft = (expiryDate - today) / (1000 * 60 * 60 * 24);

    if (daysLeft <= 2) {
      users.forEach((user) => {
        nodemailer.sendNotification(user.email, item.name, item.expiry);
      });
    }
  });

  res.json({ message: "Notifications sent" });
});

module.exports = router;
