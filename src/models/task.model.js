import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const TaskModel = mongoose.model("Task", taskSchema);
export default TaskModel;
