import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ["backlog", "in_progress", "done", "expired"], default: "backlog" },
  assignedTo: { type: String, required: true }, // email of assignee
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  dueDate: { type: Date },
  movedAt: { type: Date }
});

export default mongoose.model("Task", taskSchema);
