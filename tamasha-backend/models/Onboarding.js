const mongoose = require("mongoose");

const onboardingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },

    portfolio: {
      type: String,
      trim: true,
      default: ""
    },

    track: {
      type: String,
      required: true,
      enum: [
        "Frontend",
        "Backend",
        "Fullstack",
        "UI/UX Design"
      ]
    },

    experience: {
      type: String,
      required: true,
      enum: [
        "Junior",
        "Mid",
        "Senior"
      ]
    },

    techStack: {
      type: [String],
      required: true,
      default: []
    }
  },
  {
    timestamps: true
  }
);

const Onboarding = mongoose.model(
  "Onboarding",
  onboardingSchema
);

module.exports = Onboarding;