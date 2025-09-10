const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");


dotenv.config();
connectDB();

const app = express();

// CORS configuration
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// Test route
app.get("/api/test", (req, res) => {
  console.log("Test endpoint hit!");
  res.json({ message: "Backend is working!", timestamp: new Date().toISOString() });
});

// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
console.log("Loading auth routes...");
app.use("/api/auth", require("./routes/authRoutes"));
console.log("Loading event routes...");
app.use("/api/events", require("./routes/eventRoutes"));
console.log("Loading registration routes...");
app.use("/api/register", require("./routes/registrationRoutes"));
console.log("Loading admin routes...");
app.use("/api", require("./routes/adminRoutes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT} 🚀`));
