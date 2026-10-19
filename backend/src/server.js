const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

const backendRoot = path.join(__dirname, "..");
if (
  !fs.existsSync(path.join(backendRoot, "node_modules", "express")) ||
  !fs.existsSync(path.join(backendRoot, "node_modules", "jsonwebtoken")) ||
  !fs.existsSync(path.join(backendRoot, "node_modules", "express-rate-limit"))
) {
  console.log("Installing backend dependencies...");
  execSync("npm install", { cwd: backendRoot, stdio: "inherit" });
}

try {
  require("dotenv").config({
    path: path.join(backendRoot, ".env"),
    override: true
  });
} catch (err) {
  // Ignore if dotenv is not needed in cloud environment
}

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { globalLimiter } = require("./middleware/rateLimiter");
const portfolioRoutes = require("./routes/portfolioRoutes");

const app = express();

// Trust reverse proxy (Render, Railway, etc.) so rate limiter reads client IP accurately
app.set("trust proxy", 1);

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Apply rate limiter across the whole backend
app.use(globalLimiter);

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
