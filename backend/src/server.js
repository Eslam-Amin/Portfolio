const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

const backendRoot = path.join(__dirname, "..");
if (!fs.existsSync(path.join(backendRoot, "node_modules", "express"))) {
  console.log("node_modules not found in backend, running npm install...");
  execSync("npm install", { cwd: backendRoot, stdio: "inherit" });
}

try {
  require("dotenv").config({ path: path.join(backendRoot, ".env") });
} catch (err) {
  // Ignore if dotenv is not needed in cloud environment
}

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const portfolioRoutes = require("./routes/portfolioRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Portfolio Backend API is running", status: "ok" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api", portfolioRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
