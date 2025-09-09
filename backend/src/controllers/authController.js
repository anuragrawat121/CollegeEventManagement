const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Basic validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    
    // Prevent admin signup
    if (role === "admin") {
      return res.status(400).json({ message: "Admin signup not allowed" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    console.log("Login attempt:", { email, role });
    
    // Basic validation
    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by email and role
    console.log("Searching for user with:", { email, role });
    const user = await User.findOne({ email, role });
    console.log("User found:", user ? "Yes" : "No");
    
    if (!user) {
      console.log("No user found with this email and role");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    console.log("Checking password...");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password valid:", isPasswordValid);
    
    if (!isPasswordValid) {
      console.log("Password does not match");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
