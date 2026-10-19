const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    school: { type: String, required: true },
    degree: { type: String, required: true },
    duration: { type: String, required: true },
    gpa: { type: String, default: "" },
    details: { type: String, default: "" },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Education", educationSchema);
