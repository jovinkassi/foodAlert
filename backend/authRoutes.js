const express = require("express");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const USERS_FILE = "./users.json";
const SECRET_KEY = "your_secret_key";

// Ensure the users.json file exists
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

// Load users from file safely
const loadUsers = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf8").trim();
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading users:", error);
    return [];
  }
};

// Save users to file safely
const saveUsers = (users) => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error saving users:", error);
  }
};

// Register new user
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password)

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  let users = loadUsers();
  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    saveUsers(users);

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let users = loadUsers();
  const user = users.find((u) => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

module.exports = router;
