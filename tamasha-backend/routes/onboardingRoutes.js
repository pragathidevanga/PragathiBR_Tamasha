const express = require("express");
const Onboarding = require("../models/Onboarding");

const router = express.Router();

router.post("/submit", async (req, res) => {
  try {
    const {
      name,
      email,
      portfolio,
      track,
      experience,
      techStack
    } = req.body;

    const application =
      new Onboarding({
        name,
        email,
        portfolio,
        track,
        experience,
        techStack
      });

    const savedApplication =
      await application.save();

    res.status(201).json({
      success: true,
      message:
        "Application submitted successfully",
      data: savedApplication
    });
  } catch (error) {
    console.error(
      "Application submission error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to submit application",
      error: error.message
    });
  }
});

module.exports = router;