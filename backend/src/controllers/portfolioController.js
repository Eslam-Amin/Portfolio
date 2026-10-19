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

// @desc    Reset and seed database with default portfolio data
// @route   POST /api/seed
exports.reseedPortfolio = async (req, res) => {
  try {
    await seedDatabase(false);
    res.json({ message: "Database seeded successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== PROFILE / BIO ====================

// @desc    Get profile / bio
// @route   GET /api/profile
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update profile / bio (or create if none exists)
// @route   PUT /api/profile
exports.updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      Object.assign(profile, req.body);
      await profile.save();
    }
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
