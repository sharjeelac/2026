import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import upload from "./middleware/uploadMiddleware.js";

// Load environment variables
dotenv.config();

mongoose
  .connect('mongodb://localhost:27017/mydatabase')
  .then(() => {
    console.log("mongodb Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const ImageModel = mongoose.model(
  "Image",
  new mongoose.Schema(
    {
      imageUrl: String,
    },
    { timestamps: true }
  )
);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const newImage = await ImageModel.create({
      imageUrl: req.file.path,
    });

    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image" });
  }
});

app.get("/images", async (req, res) => {
  try {
    const images = await ImageModel.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
