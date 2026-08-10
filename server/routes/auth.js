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

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const db = req.app.locals.db;

    const user = db
      .prepare(
        "SELECT id, full_name, email, password, role FROM users WHERE email = ?"
      )
      .get(email);

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = require("jsonwebtoken").sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || "development-secret-key",
      {
        expiresIn: "1h",
      }
    );

    res.json({
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Something went wrong while logging in.",
    });
  }
});

module.exports = router;