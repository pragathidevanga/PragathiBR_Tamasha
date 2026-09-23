const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const onboardingRoutes = require(
  "./routes/onboardingRoutes"
);

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Tamasha Backend API is running!"
  });
});

// Onboarding API
app.use(
  "/api/onboarding",
  onboardingRoutes
);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(
      "MongoDB connected successfully"
    );

    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:",
      error.message
    );
  });