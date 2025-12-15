const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect("mongodb://localhost:27017/MyApp");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Failed connection");
  }
};

module.exports = connectDB;
