const express = require("express");
const router = express.Router();
const { supabase } = require("../services/supabaseClient");
const { verifyToken } = require("../services/login");

// GET /api/projects
router.get("/projects", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  }
  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }

  if (!supabase) {
    return res.status(500).json({ error: "Supabase is not configured." });
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('email', decoded.email)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
      return res.status(500).json({ error: "Failed to fetch projects." });
    }

    res.json({ projects: data });
  } catch (err) {
    console.error("Error in GET /projects:", err);
    res.status(500).json({ error: "Something went wrong fetching projects." });
  }
});

module.exports = router;
