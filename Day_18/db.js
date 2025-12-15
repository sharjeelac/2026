import mongoose from "mongoose";

mongoose
  .connect(`mongodb://127.0.0.1:27017/MyAppDB`)
  .then(() => console.log("Mongodb connected successfully"))
  .catch((error) => console.log("failed to connect to mongodb"));
