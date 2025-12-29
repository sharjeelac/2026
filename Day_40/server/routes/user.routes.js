import express from "express";
import { register, login, userProfile } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Auth
router.post("/register", register);
router.post("/login", login);

// Profile (Protected)
router.get("/profile", authMiddleware, userProfile);

export default router;
