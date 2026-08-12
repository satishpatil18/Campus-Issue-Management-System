const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  try {
    const {
      title,
      category,
      priority,
      location,
      description,
      user_id,
    } = req.body;

    if (
      !title ||
      !category ||
      !priority ||
      !location ||
      !description ||
      !user_id
    ) {
      return res.status(400).json({
        message: "Please provide all required issue details.",
      });
    }

    const db = req.app.locals.db;

    const result = db
      .prepare(
        `INSERT INTO issues
        (title, category, priority, location, description, user_id)
        VALUES (?, ?, ?, ?, ?, ?)`
      )
      .run(
        title,
        category,
        priority,
        location,
        description,
        user_id
      );

    res.status(201).json({
      message: "Issue reported successfully.",
      issueId: result.lastInsertRowid,
    });
  } catch (error) {
    console.error("Issue creation error:", error);

    res.status(500).json({
      message: "Something went wrong while reporting the issue.",
    });
  }
});

module.exports = router;