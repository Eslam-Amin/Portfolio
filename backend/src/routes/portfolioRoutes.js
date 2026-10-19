const express = require("express");
const router = express.Router();
const {
  getPortfolio,
  reseedPortfolio,
  getProfile,
  updateProfile
} = require("../controllers/portfolioController");

// Aggregate portfolio route & seed
router.get("/portfolio", getPortfolio);
router.post("/seed", reseedPortfolio);

// Profile / Bio
router.route("/profile").get(getProfile).put(updateProfile);

module.exports = router;
