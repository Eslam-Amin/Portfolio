const express = require("express");
const router = express.Router();
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

// Aggregate portfolio route & seed
router.get("/portfolio", getPortfolio);
router.post("/seed", reseedPortfolio);

// Profile / Bio
router.route("/profile").get(getProfile).put(updateProfile);

// Skills
router.route("/skills").get(getSkills).put(updateSkills);
router.route("/skills/cards").post(addSkillCard);
router
  .route("/skills/cards/:cardId")
  .put(updateSkillCard)
  .delete(deleteSkillCard);

// Experience
router.route("/experience").get(getExperiences).post(createExperience);
router
  .route("/experience/:id")
  .put(updateExperience)
  .delete(deleteExperience);

// Education
router.route("/education").get(getEducations).post(createEducation);
router
  .route("/education/:id")
  .put(updateEducation)
  .delete(deleteEducation);

// Projects
router.route("/projects").get(getProjects).post(createProject);
router
  .route("/projects/:id")
  .put(updateProject)
  .delete(deleteProject);

module.exports = router;
