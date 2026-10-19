const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { loginLimiter } = require("../middleware/rateLimiter");
const {
  getPortfolio,
  reseedPortfolio,
  getProfile,
  updateProfile,
  getSkills,
  updateSkills,
  addSkillCard,
  updateSkillCard,
  deleteSkillCard,
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
  getProjects,
  createProject,
  updateProject,
  deleteProject
} = require("../controllers/portfolioController");

// Auth route (rate-limited)
router.post("/auth/login", loginLimiter, login);

// Aggregate portfolio route & protected seed
router.get("/portfolio", getPortfolio);
router.post("/seed", protect, reseedPortfolio);

// Profile / Bio
router.route("/profile").get(getProfile).put(protect, updateProfile);
router.route("/information").get(getProfile).put(protect, updateProfile);

// Skills
router.route("/skills").get(getSkills).put(protect, updateSkills);
router.route("/skills/cards").post(protect, addSkillCard);
router
  .route("/skills/cards/:cardId")
  .put(protect, updateSkillCard)
  .delete(protect, deleteSkillCard);

// Experience
router
  .route("/experience")
  .get(getExperiences)
  .post(protect, createExperience);
router
  .route("/experience/:id")
  .put(protect, updateExperience)
  .delete(protect, deleteExperience);

// Education
router.route("/education").get(getEducations).post(protect, createEducation);
router
  .route("/education/:id")
  .put(protect, updateEducation)
  .delete(protect, deleteEducation);

// Projects
router.route("/projects").get(getProjects).post(protect, createProject);
router
  .route("/projects/:id")
  .put(protect, updateProject)
  .delete(protect, deleteProject);

module.exports = router;
