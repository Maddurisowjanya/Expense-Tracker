const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables from .env file (if it exists)
dotenv.config({ override: false });

// ======================
// LOG ENVIRONMENT VARIABLES (for debugging)
// ======================
console.log("📋 Environment Variables Check:");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✓ SET (length: " + process.env.JWT_SECRET.length + ")" : "✗ NOT SET - WILL CAUSE ERROR");
console.log("MONGO_URI:", process.env.MONGO_URI ? "✓ SET" : "✗ NOT SET - WILL CAUSE ERROR");
console.log("PORT:", process.env.PORT || "5000 (default)");

const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(cors({
  origin: "*", // allow frontend (Vercel / local)
}));
app.use(express.json());

// ======================
// ROUTES
// ======================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use("/api/budget", require("./routes/budgetRoutes"));

// ======================
// TEST ROUTE
// ======================
app.get("/", (req, res) => {
  res.send("Expense Tracker Backend is running");
});

// ======================
// DATABASE CONNECTION
// ======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) =>
    console.error("MongoDB connection error:", err.message)
  );

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
