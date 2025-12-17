import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
});

const TodoModel = mongoose.model("TodoModel", TodoSchema);

export default TodoModel;
