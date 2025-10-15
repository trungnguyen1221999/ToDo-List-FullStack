import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
    completedDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);
const taskModels = mongoose.model("Task", taskSchema);
export default taskModels;