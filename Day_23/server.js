import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Todo from "./Models/TodoModel.js";

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.get("/todos", async (req, res) => {
  try {
    const tasks = await Todo.find();
    res.json({ message: "Tasks", Tasks: tasks });
  } catch (error) {
    res.status(400).json({ message: "Failed to get Task ", error: error });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const task = req.body;
    const newTodo = await Todo.create(task);
    res.json({ message: "Task Added", task: newTodo });
  } catch (error) {
    res.status(500).json({ message: "failed to add the task", error: error });
  }
});

app.listen(3000, () => {
  console.log("server is running");
});
