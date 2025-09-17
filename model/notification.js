import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  type: { type: String, enum: ["project_completed", "task_moved", "task_expired"], required: true },
  recipient: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  sentAt: { type: Date, default: Date.now },
  openedAt: { type: Date }
});

export default mongoose.model("Notification", notificationSchema);
