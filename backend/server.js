import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import plannerRoutes from "./routes/plannerRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Base routes
app.get("/", (req, res) => {
  res.send("✅ Smart Study Planner Backend is running!");
});

// Auth routes
app.use("/api/auth", authRoutes);
// Protected routes
app.use("/api/tasks", authMiddleware, taskRoutes);
app.use("/api/planner", authMiddleware, plannerRoutes);
app.use("/api/sessions", authMiddleware, sessionRoutes);
app.use("/api/ai", authMiddleware, aiRoutes);

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));


// Note: any legacy test routes should be removed or updated