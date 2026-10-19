const Profile = require("../models/Profile");
const Skill = require("../models/Skill");
const Experience = require("../models/Experience");
const Education = require("../models/Education");
const Project = require("../models/Project");
const seedDatabase = require("../seed/seed");

// In-memory cache per resource for instant (<1ms) GET responses, invalidated on writes
let cache = {
  portfolio: null,
  profile: null,
  skills: null,
  experience: null,
  education: null,
  projects: null
};

const invalidateCache = () => {
  cache = {
    portfolio: null,
    profile: null,
    skills: null,
    experience: null,
    education: null,
    projects: null
  };
};

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

// @desc    Get all portfolio data in a single request (cached in RAM + parallel .lean() queries)
// @route   GET /api/portfolio
exports.getPortfolio = async (req, res) => {
  try {
    if (portfolioCache) {
      res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
      return res.json(portfolioCache);
    }

    let [profile, skills, experience, education, projects] = await Promise.all([
      Profile.findOne().lean(),
      Skill.findOne().lean(),
      Experience.find().sort({ order: 1, createdAt: -1 }).lean(),
      Education.find().sort({ order: 1, createdAt: -1 }).lean(),
      Project.find().sort({ order: 1, createdAt: -1 }).lean()
    ]);

    if (!profile) {
      await seedDatabase(false);
      [profile, skills, experience, education, projects] = await Promise.all([
        Profile.findOne().lean(),
        Skill.findOne().lean(),
        Experience.find().sort({ order: 1, createdAt: -1 }).lean(),
        Education.find().sort({ order: 1, createdAt: -1 }).lean(),
        Project.find().sort({ order: 1, createdAt: -1 }).lean()
      ]);
    }

    portfolioCache = {
      personalData: profile,
      skills,
      experience,
      education,
      projects
    };

    res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
    res.json(portfolioCache);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reset and seed database with default portfolio data
// @route   POST /api/seed
exports.reseedPortfolio = async (req, res) => {
  try {
    await seedDatabase(false);
    invalidateCache();
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
    const profile = await Profile.findOne().lean();
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
    invalidateCache();
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ==================== SKILLS ====================

// @desc    Get skills
// @route   GET /api/skills
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.findOne().lean();
    if (!skills) {
      return res.status(404).json({ message: "Skills not found" });
    }
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update skills categories and/or cards
// @route   PUT /api/skills
exports.updateSkills = async (req, res) => {
  try {
    let skills = await Skill.findOne();
    if (!skills) {
      skills = new Skill(req.body);
    } else {
      if (req.body.languages !== undefined) skills.languages = req.body.languages;
      if (req.body.frameworks !== undefined) skills.frameworks = req.body.frameworks;
      if (req.body.databases !== undefined) skills.databases = req.body.databases;
      if (req.body.tools !== undefined) skills.tools = req.body.tools;
      if (req.body.concepts !== undefined) skills.concepts = req.body.concepts;
    }

    if (req.body.cards !== undefined) {
      skills.cards = req.body.cards;
    } else if (
      req.body.languages !== undefined ||
      req.body.frameworks !== undefined ||
      req.body.databases !== undefined ||
      req.body.tools !== undefined ||
      req.body.concepts !== undefined
    ) {
      skills.cards = buildCardsFromCategories(skills);
    }

    await skills.save();
    invalidateCache();
    res.json(skills);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Add a skill card
// @route   POST /api/skills/cards
exports.addSkillCard = async (req, res) => {
  try {
    let skills = await Skill.findOne();
    if (!skills) {
      skills = await Skill.create({ cards: [req.body] });
    } else {
      skills.cards.push(req.body);
      await skills.save();
    }
    invalidateCache();
    res.status(201).json(skills);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a skill card by ID
// @route   PUT /api/skills/cards/:cardId
exports.updateSkillCard = async (req, res) => {
  try {
    const skills = await Skill.findOne();
    if (!skills) {
      return res.status(404).json({ message: "Skills document not found" });
    }
    const card = skills.cards.id(req.params.cardId);
    if (!card) {
      return res.status(404).json({ message: "Skill card not found" });
    }
    Object.assign(card, req.body);
    await skills.save();
    invalidateCache();
    res.json(skills);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a skill card by ID
// @route   DELETE /api/skills/cards/:cardId
exports.deleteSkillCard = async (req, res) => {
  try {
    const skills = await Skill.findOne();
    if (!skills) {
      return res.status(404).json({ message: "Skills document not found" });
    }
    const card = skills.cards.id(req.params.cardId);
    if (!card) {
      return res.status(404).json({ message: "Skill card not found" });
    }
    card.deleteOne();
    await skills.save();
    invalidateCache();
    res.json(skills);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ==================== EXPERIENCE ====================

// @desc    Get all work experience entries
// @route   GET /api/experience
exports.getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a work experience entry
// @route   POST /api/experience
exports.createExperience = async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    invalidateCache();
    res.status(201).json(experience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a work experience entry
// @route   PUT /api/experience/:id
exports.updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!experience) {
      return res.status(404).json({ message: "Experience entry not found" });
    }
    invalidateCache();
    res.json(experience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a work experience entry
// @route   DELETE /api/experience/:id
exports.deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: "Experience entry not found" });
    }
    invalidateCache();
    res.json({ message: "Experience deleted successfully", id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ==================== EDUCATION ====================

// @desc    Get all education entries
// @route   GET /api/education
exports.getEducations = async (req, res) => {
  try {
    const educations = await Education.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();
    res.json(educations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an education entry
// @route   POST /api/education
exports.createEducation = async (req, res) => {
  try {
    const education = await Education.create(req.body);
    invalidateCache();
    res.status(201).json(education);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update an education entry
// @route   PUT /api/education/:id
exports.updateEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!education) {
      return res.status(404).json({ message: "Education entry not found" });
    }
    invalidateCache();
    res.json(education);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete an education entry
// @route   DELETE /api/education/:id
exports.deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) {
      return res.status(404).json({ message: "Education entry not found" });
    }
    invalidateCache();
    res.json({ message: "Education deleted successfully", id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ==================== PROJECTS ====================

// @desc    Get all projects
// @route   GET /api/projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a project
// @route   POST /api/projects
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    invalidateCache();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    invalidateCache();
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    invalidateCache();
    res.json({ message: "Project deleted successfully", id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
