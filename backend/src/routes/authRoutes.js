const router = require("express").Router();
const { signup, login } = require("../controllers/authController");

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Auth routes working!" });
});

// Routes
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
