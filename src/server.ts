import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/db.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./config/auth.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Mistri.com Backend API Running");
});

// Authentication
/**
 * 
 * Endpoints as:
 * POST /api/auth/sign-up/email
 * POST /api/auth/sign-in/email
 * POST /api/auth/sign-out
 * GET /api/auth/get-session
 * 
 */
app.all("/api/auth/*path", toNodeHandler(auth));

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
}

startServer();