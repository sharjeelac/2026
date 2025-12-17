import mongoose from "mongoose";

const connecDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Succesfully connected");
  } catch (error) {
    console.log("Failed to connect mongodb");
  }
};

export default connecDB;
