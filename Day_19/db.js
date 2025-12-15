import mongoose from "mongoose";

const connectDB = mongoose
  .connect("mongodb://localhost:27017/local")
  .then(() => console.log("Mongodb connected successfully"))
  .catch((error) => console.log("Failed to connected"));

module.exports = connectDB;
