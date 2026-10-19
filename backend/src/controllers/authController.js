const jwt = require("jsonwebtoken");

// @desc    Authenticate admin user & generate JWT token
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both username and password" });
    }

    const expectedUsername =
      process.env.ADMIN_USERNAME || process.env.username;
    const expectedPassword =
      process.env.ADMIN_PASSWORD || process.env.password;
    const jwtSecret = process.env.JWT_SECRET;

    if (!expectedUsername || !expectedPassword || !jwtSecret) {
      return res.status(500).json({
        message:
          "Server auth configuration missing (username, password, or JWT_SECRET in env)"
      });
    }

    if (username !== expectedUsername || password !== expectedPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
    const token = jwt.sign({ username, role: "admin" }, jwtSecret, {
      expiresIn
    });

    res.json({
      message: "Login successful",
      token,
      expiresIn
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
