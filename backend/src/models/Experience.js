const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    duration: { type: String, required: true },
    type: { type: String, default: "On-Site" },
    description: { type: String, required: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experience", experienceSchema);
