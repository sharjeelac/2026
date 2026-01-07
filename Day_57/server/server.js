import express from "express";
import upload from "./middlewares/uploadMiddleware.js";
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.post("/api/upload", upload.single("profileImage"), (req, res) => {
  console.log("file upload request received");
  try {
    console.log(req.file);
    if (!req.file) {
      return res.status(400).send("please upload a file");
    }

    res.send({
      message: "file uploads successfully",
      imageUrl: req.file.path,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

app.get("/", (req, res) => {
  res.send("APi is working");
});

app.listen(3000, () => {
  console.log("server is running");
});
