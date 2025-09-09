const router = require("express").Router();

// Basic route for testing
router.get("/", (req, res) => {
  res.json({ message: "Registration endpoint working" });
});

module.exports = router;
