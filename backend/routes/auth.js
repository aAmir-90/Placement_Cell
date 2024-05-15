// routes/auth.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");

// Sign up route
router.post("/signup", async (req, res) => {
  try {
    const { name, username, password } = req.body;

    // Check if username already exists
    const existingEmployee = await Employee.findOne({ username });
    if (existingEmployee) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newEmployee = new Employee({ name, username, password });
    await newEmployee.save();
    console.log("user created");
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const employee = await Employee.findOne({ username });
    if (!employee) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    // Generate JWT token
    const token = jwt.sign({ userId: employee._id }, "secret", {
      expiresIn: "1h",
    });
    
    res.status(200).json({ token });
    console.log("user login");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all employee data
router.get("/employee", async (req, res) => {
  try {
    const data = await Employee.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
