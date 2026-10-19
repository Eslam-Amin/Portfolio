const Profile = require("../models/Profile");
const Skill = require("../models/Skill");
const Experience = require("../models/Experience");
const Education = require("../models/Education");
const Project = require("../models/Project");
const seedDatabase = require("../seed/seed");

// Helper to build default skill cards from skill arrays when cards are not explicitly provided
const buildCardsFromCategories = (skillDoc) => [
  {
    title: "Backend & Core",
    icon: "Server",
    color: "green",
    items: [...(skillDoc.languages || []), ...(skillDoc.frameworks || [])]
  },
  {
    title: "Infra & Data",
    icon: "Database",
    color: "purple",
    items: [...(skillDoc.databases || []), ...(skillDoc.tools || [])]
  },
  {
    title: "Architecture & CS",
    icon: "Cpu",
    color: "blue",
    items: [...(skillDoc.concepts || [])]
  }
];

// @desc    Get all portfolio data in a single request (auto-seeds if DB is empty)
// @route   GET /api/portfolio
exports.getPortfolio = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      await seedDatabase(false);
      profile = await Profile.findOne();
    }

    const [skills, experience, education, projects] = await Promise.all([
      Skill.findOne(),
      Experience.find().sort({ order: 1, createdAt: -1 }),
      Education.find().sort({ order: 1, createdAt: -1 }),
      Project.find().sort({ order: 1, createdAt: -1 })
    ]);

    res.json({
      personalData: profile,
      skills,
      experience,
      education,
      projects
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
