import express from "express";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const router = express.Router();

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// POST /api/ai/chat
router.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: "messages array required" });
    }

    const completion = await client.chat.completions.create({
      model: "llama3-70b-8192",
      messages: messages,
      temperature: 0.7
    });

    const reply = completion.choices[0].message.content;

    res.json({ reply });

  } catch (err) {
    console.error("❌ AI error:", err);
    res.status(500).json({ message: "AI Server Error" });
  }
});

export default router;
