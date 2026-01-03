import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import authRoutes from "./routes/authRoutes.js";
import "./config/passport-setup.js";
import connectDB from "./config/db.js";
import cors from 'cors'

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/auth", authRoutes);

app.get("/dashboard", (req, res) => {
  res.send("Welcome to your dashboard");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
