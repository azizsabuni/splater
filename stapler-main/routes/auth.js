const express = require("express");
const router = express.Router();

const { signup } = require("../services/signup");
const { login, verifyToken } = require("../services/login");
const { findByEmail } = require("../services/userStore");

// POST /api/signup { name, email, password }
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    const user = await signup({ name, email, password });
    res.json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/login { email, password }
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const result = await login({ email, password });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/me
router.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  const user = await findByEmail(decoded.email);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    credits: user.credits,
  });
});

module.exports = router;
