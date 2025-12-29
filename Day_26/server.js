import express from "express";
import dotenv from "dotenv";
import connecDB from "./Config/db.js";
import TodoModel from "./Models/TodoModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "./Models/User.js";
import authMiddlware from "./Middleware/authMiddleware.js";

dotenv.config();
connecDB();

const app = express();
app.use(express.json());

app.get("/api/todos", authMiddlware, async (req, res) => {
  try {
    const todos = await TodoModel.find({ user: req.userId });
    res.json({ message: "Todos List", data: todos });
  } catch (error) {
    res.status(500).json({ message: "Failed to load Todos" });
  }
});

app.post("/api/todos", authMiddlware, async (req, res) => {
  try {
    const todo = req.body;
    const { title } = todo;
    if (!title) {
      return res.status(500).json({ messaeg: "Text required" });
    }
    const newTodo = await TodoModel.create({
      title: title,
      user: req.userId,
    });
    res.json({ message: "Todo Created", data: newTodo });
  } catch (error) {
    res.status(500).json({ message: "Failed to create Todo", error: error });
  }
});

app.put("/api/todos/:id", authMiddlware, async (req, res) => {
  try {
    const { id } = req.params;
    const { isComplete } = req.body;
    const todoExits = await TodoModel.findById(id);
    if (!todoExits) {
      return res.status(404).json({ message: "Todo Not Found" });
    }
    const todo = await TodoModel.findByIdAndUpdate(
      { _id: id, user: req.userId },
      { isComplete: isComplete }
    );
    console.log(todo);
    res.json({ message: "Todo Updated", data: todo });
  } catch (error) {
    res.status(500).json({ message: "failed to update todo" });
    console.log(error);
  }
});

app.delete("/api/todos/:id", authMiddlware, async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await TodoModel.findOneAndDelete({
      _id: id,
      user: req.userId,
    });

    // Agar todo null hai, matlab ya toh mila nahi, ya apka nahi tha
    if (!todo) {
      return res.status(404).json({ message: "Todo Not Found" });
    }

    res.json({ message: "Todo Deleted", data: todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete" });
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if ((!name, !email, !password)) {
      return res.status(400).json({ message: "All Feilds are Required" });
    }

    const exitingUser = await UserModel.findOne({ email: email });
    if (exitingUser) {
      return res.json({ message: "User Already Exits" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "User Created",
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "Registeraion Failed" });
    console.log(error);
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if ((!email, !password)) {
      return res.json({ message: "Email and Password are Required" });
    }

    const exitingUser = await UserModel.findOne({ email });
    if (!exitingUser) {
      return res.json({ message: "User Not Exits" });
    }

    const isMatch = bcrypt.compare(password, exitingUser.password);
    if (!isMatch) {
      return res.json({ message: "Wrond Password" });
    }

    const token = jwt.sign(
      { userId: exitingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login Successfully",
      token,
      user: {
        name: exitingUser.name,
        email: exitingUser.email,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "login failed" });
    console.log(error);
  }
});
app.listen(3000, () => {
  console.log("Server is Running");
});
