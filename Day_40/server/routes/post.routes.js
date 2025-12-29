import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
  getSinglePost,
} from "../Controllers/post.controller.js";
import authMiddleware from "../Middlewares/auth.middleware.js";

const router = express.Router();

// Public
router.get("/", getAllPosts);
router.get("/:id", getSinglePost);

// Protected
router.post("/", authMiddleware, createPost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;
