import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connnected");
  } catch (error) {
    console.log("failed to connect mongodb", error);
  }
};

export default connectDB;
