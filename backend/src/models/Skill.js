const mongoose = require("mongoose");

const skillCardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    icon: { type: String, default: "Server" }, // e.g., "Server", "Database", "Cpu", "Code"
    color: { type: String, default: "green" }, // e.g., "green", "purple", "blue"
    items: [{ type: String }]
  },
  { _id: true }
);

const skillSchema = new mongoose.Schema(
  {
    languages: [{ type: String }],
    frameworks: [{ type: String }],
    databases: [{ type: String }],
    tools: [{ type: String }],
    concepts: [{ type: String }],
    cards: [skillCardSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);
