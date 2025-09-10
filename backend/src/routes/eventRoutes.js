const router = require("express").Router();

// Basic route for testing
router.get("/", (req, res) => {
  res.json({ message: "Events endpoint working" });
});

module.exports = router;
