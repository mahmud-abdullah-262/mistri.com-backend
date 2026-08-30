import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/db.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Mistri.com Backend API Running");
});

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