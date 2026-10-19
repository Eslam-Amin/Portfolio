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
