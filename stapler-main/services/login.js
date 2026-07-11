const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findByEmail } = require("./userStore");

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const JWT_EXPIRES_IN = "7d";

async function login({ email, password }) {
  if (!email || !password) throw new Error("email and password are required");
  const user = await findByEmail(email);
  if (!user) throw new Error("invalid credentials");

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new Error("invalid credentials");

  const token = jwt.sign(
    { sub: user.id, name: user.name, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );
  return { token, user: { id: user.id, name: user.name, email: user.email, credits: user.credits } };
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = { login, verifyToken };
