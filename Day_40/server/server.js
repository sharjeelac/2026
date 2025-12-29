import express from "express";
import { configDotenv } from "dotenv";
import morgan from "morgan";
import cors from "cors";

import connectDB from "./config/db.js";
import postRoutes from "./routes/post.routes.js";
import userRoutes from "./routes/user.routes.js";
// import customLogger from "./middlewares/customLogger.js";

configDotenv();
connectDB();

const app = express();

// Global Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
// app.use(customLogger);

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
