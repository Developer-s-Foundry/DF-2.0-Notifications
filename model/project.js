import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ["in_progress", "completed"], default: "in_progress" },
  completedAt: { type: Date }
});

export default mongoose.model("Project", projectSchema);
