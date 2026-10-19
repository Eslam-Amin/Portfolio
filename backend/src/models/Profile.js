const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: "Eslam Amin" },
    title: { type: String, required: true, default: "Backend Developer" },
    greeting: { type: String, default: "Hello, my name is" },
    logoText: { type: String, default: "<Eslam />" },
    terminalPrompt: { type: String, default: "root@eslam:~$" },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    cvLink: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    summary: { type: String, required: true },
    ctaPrimaryText: { type: String, default: "View My Work" },
    ctaSecondaryText: { type: String, default: "Contact Me" },
    sectionTitles: {
      experience: { type: String, default: "cd /experience" },
      skills: { type: String, default: "cat skills.json" },
      education: { type: String, default: "cat education.txt" },
      projects: { type: String, default: "ls ./projects" }
    },
    footer: {
      builtWith: { type: String, default: "Built with React.js & Tailwind" },
      designedBy: { type: String, default: "Eslam Amin" },
      coDesignedBy: { type: String, default: "Gemini" }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
