import express from "express";

const router = express.Router();

// POST /api/ai/chat
// body: { messages: [{ role: "user"|"assistant"|"system", content: string }] }
router.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: "messages array required" });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Fallback friendly response when no key configured
      return res.json({ reply: "AI is not configured yet. Set OPENAI_API_KEY in the backend to enable responses." });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      const errTxt = await response.text();
      return res.status(500).json({ message: "Upstream AI error", details: errTxt });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || "";
    res.json({ reply });
  } catch (err) {
    console.error("AI chat error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;



