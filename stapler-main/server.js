const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const analyzeRoutes = require("./routes/analyze");
const applyRoutes = require("./routes/apply");
const chatbotRoutes = require("./routes/chatbot");
const authRoutes = require("./routes/auth");
const projectsRoutes = require("./routes/projects");
const aiAnalysisRoutes = require("./routes/ai-analysis");

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));

// Serve frontend static files from stapler-3ad5fc
const FRONTEND_DIR = path.join(__dirname, "..", "stapler-3ad5fc");
app.use(express.static(FRONTEND_DIR));

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Website Improver backend is running" });
});

// API routes
app.use("/api", analyzeRoutes);
app.use("/api", applyRoutes);
app.use("/api", chatbotRoutes);
app.use("/api", authRoutes);
app.use("/api", projectsRoutes);
app.use("/api", aiAnalysisRoutes);

// Fallback: serve index.html for non-API, non-file routes
app.get("*", (req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(FRONTEND_DIR, "index.html"));
});

// generic error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Something went wrong on the server." });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Frontend served from: ${FRONTEND_DIR}`);
});
