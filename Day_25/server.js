import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import TodoModel from "./Models/TodoModel.js";
import jwt from "jsonwebtoken";
import UserModel from "./Models/User.Model.js";
import bcrypt from "bcrypt";
import { error } from "console";
import authMiddleware from "./middleware/auth.middleware.js";

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.post("/todos", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const newTodo = await TodoModel.create(data);
    res.json({ message: "Todo Added", data: newTodo });
  } catch (error) {
    res.status(400).json({ message: "failed to add", error: error });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.json({ message: "Todos", data: todos });
  } catch (error) {
    res.status(500).json("failed to load Todos");
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { isComplete } = req.body;
    console.log(isComplete);
    const updateTodo = await TodoModel.findByIdAndUpdate(
      { _id: id },
      { isComplete: isComplete }
    );
    res.json({ message: "updated", data: updateTodo });
  } catch (error) {
    res.status(400).json({ message: "Failed to update", error: error });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findByIdAndDelete({ _id: id });
    res.json({ message: "Todo Deleted", data: todo });
  } catch (error) {
    res.status(400).json({ message: "failed to delete", error: error });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email);
    if ((!name, !email, !password)) {
      return res.status(400).json("All fields are required");
    }
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User Already Exits" });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await UserModel.create({
        name,
        email,
        password: hashPassword,
      });
      res.json({
        message: "User Register Successfullt",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Registeration Failed" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "Email and Password are required" });
    }

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "Wrong credentials " });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Wrong credentials " });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(400).json({ message: "failed to login " });
    console.log(err);
  }
});

app.get("/profile", authMiddleware, async (req, res) => {
  const user = await UserModel.findById(req.userId).select("-password");
  res.json({ message: "Protected Route", user });
});

app.listen(3000, () => {
  console.log("Server is Running");
});
