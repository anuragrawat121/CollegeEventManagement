const express = require("express");
const router = express.Router();
const User = require("../models/user");

// GET /api/participants
router.get("/participants", async (req, res) => {
  try {
    // Fetch all users with role "participant"
    const participants = await User.find({ role: "participant" }).select(
      "name email registeredEvents"
    );
    res.json(participants);
  } catch (error) {
    console.error("Error fetching participants:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
