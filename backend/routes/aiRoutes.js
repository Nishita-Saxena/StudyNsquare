import express from "express";

const router = express.Router();

// Temporary disabled AI route
router.post("/chat", (req, res) => {
  res.json({
    reply: "⚠️ AI assistant is temporarily disabled. Feature coming soon!"
  });
});

// Test
router.get("/test", (req, res) => {
  res.json({ status: "alive", ai: false });
});

export default router;

