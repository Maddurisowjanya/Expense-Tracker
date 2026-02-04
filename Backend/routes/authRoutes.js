const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

// Register
router.post("/register", registerUser);

// Login (returns token)
router.post("/login", loginUser);

module.exports = router;
