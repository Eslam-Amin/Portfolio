const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    tech: [{ type: String }],
    github: { type: String, default: "" },
    demo: { type: String, default: "" },
    link: { type: String, default: "" },
    googlePlay: { type: String, default: "" },
    appStore: { type: String, default: "" },
    date: { type: String, default: "" },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
