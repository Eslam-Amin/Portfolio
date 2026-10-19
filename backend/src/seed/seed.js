const path = require("path");
try {
  require("dotenv").config({ path: path.join(__dirname, "../../.env") });
} catch (err) {
  // In production environments where env vars are injected by the host
}

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Profile = require("../models/Profile");
const Skill = require("../models/Skill");
const Experience = require("../models/Experience");
const Education = require("../models/Education");
const Project = require("../models/Project");
const {
  personalData,
  skills,
  experience,
  education,
  projects
} = require("./seedData");

const seedDatabase = async (closeConnection = true) => {
  try {
    if (mongoose.connection.readyState === 0) {
      await connectDB();
    }

    await Promise.all([
      Profile.deleteMany({}),
      Skill.deleteMany({}),
      Experience.deleteMany({}),
      Education.deleteMany({}),
      Project.deleteMany({})
    ]);

    await Profile.create(personalData);
    await Skill.create(skills);
    await Experience.insertMany(experience);
    await Education.insertMany(education);
    await Project.insertMany(projects);

    console.log("Database seeded successfully with initial portfolio data!");

    if (closeConnection) {
      await mongoose.connection.close();
      process.exit(0);
    }
  } catch (error) {
    console.error("Error seeding database:", error);
    if (closeConnection) {
      process.exit(1);
    }
    throw error;
  }
};

if (require.main === module) {
  seedDatabase(true);
}

module.exports = seedDatabase;
