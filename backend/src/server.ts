import "dotenv/config";
import express from "express";
import prisma from "./config/prisma";

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json());

app.get("/api/health", async (req, res) => {
  try {
    await prisma.$queryRaw` SELECT 1`;

    res.status(200).json({
      success: true,
      message: "PaySure API and database are running!",
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`PaySure server running on http://localhost:${PORT}`);
});
