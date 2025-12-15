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
    res.json({ message: "Your Tasks", tasks: tasks });
  } catch (error) {
    res.status(500).json({ message: "failed to get tasks", error: error });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const newtask = req.body;
    console.log(newtask);
    const task = await Todo.create(newtask);
    res.json({ message: "Task Added", task: task });
  } catch (error) {
    res.status(500).json({ message: "Failed to add task", error: error });
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const isTask = await Todo.findById(id);
    if (!isTask) {
      res.status(404).json({ message: "Task Not Found" });
    } else {
      const updatedTask = await Todo.updateOne(
        { _id: id },
        { isCompleted: true }
      );
      res.json({ message: "Task Updated ", task: updatedTask });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update Task", error: error });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Todo.findByIdAndDelete(id);
    res.json({ message: "Task Deleted", task: task });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete", error: error });
  }
});

app.listen(3000, () => {
  console.log("server is running");
});
