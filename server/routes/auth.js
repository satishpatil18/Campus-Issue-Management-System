const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { full_name, email, password, role } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({
        message: "Please fill in all required fields.",
      });
    }

    const db = req.app.locals.db;

    const existingUser = db
      .prepare("SELECT id FROM users WHERE email = ?")
      .get(email);

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRole = role || "student";

    const result = db
      .prepare(
        `INSERT INTO users (full_name, email, password, role)
         VALUES (?, ?, ?, ?)`
      )
      .run(full_name, email, hashedPassword, userRole);

    res.status(201).json({
      message: "Registration successful.",
      userId: result.lastInsertRowid,
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      message: "Something went wrong while registering.",
    });
  }
});

module.exports = router;