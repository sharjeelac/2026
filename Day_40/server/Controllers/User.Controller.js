import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/User.model.js";
import Post from "../Models/Post.model.js";

/**
 * @desc    Register user
 * @route   POST /api/auth/register
 */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(`Failed to regiter user , ${error.message}`)
    res.status(500).json({ message: "Failed to register user", error: error.message });
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to login", error: error.message });
  }
};

/**
 * @desc    Get logged-in user's posts
 * @route   GET /api/users/profile
 */
export const userProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized. Login first." });
    }

    const userId = req.user.userId;

    const userPosts = await Post.find({ author: userId });

    res.status(200).json({
      message: "User posts fetched",
      posts: userPosts,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile", error: error.message });
  }
};
