import { sendEmail } from "../utils/mail.js";
import { projectCompletedTemplate, taskMovedTemplate, taskExpirationTemplate } from "../utils/emailTemplate.js";
import Notification from "../model/notification.js";
import Project from "../model/project.js";
import Task from "../model/task.js";

// Project Completed
export const projectCompleted = async (req, res) => {
  try {
    const { projectId, recipient } = req.body;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ error: "Project not found" });

    project.status = "completed";
    project.completedAt = new Date();
    await project.save();

    const subject = "Project Completed";
    const html = projectCompletedTemplate(project.name);

    await sendEmail(recipient, subject, html);

    await Notification.create({
      type: "project_completed",
      recipient,
      subject,
      message: `Project ${project.name} has been completed.`
    });

    res.json({ message: "Project completion notification sent" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send project completion email" });
  }
};

// Task Moved
export const taskMoved = async (req, res) => {
  try {
    const { taskId, fromStage, toStage, recipient } = req.body;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.status = toStage;
    task.movedAt = new Date();
    await task.save();

    const subject = "Task Moved";
    const html = taskMovedTemplate(task.name, fromStage, toStage);

    await sendEmail(recipient, subject, html);

    await Notification.create({
      type: "task_moved",
      recipient,
      subject,
      message: `Task ${task.name} moved from ${fromStage} → ${toStage}.`
    });

    res.json({ message: "Task moved notification sent" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send task moved email" });
  }
};

// Task Expired
export const taskExpired = async (req, res) => {
  try {
    const { taskId, recipient } = req.body;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.status = "expired";
    await task.save();

    const subject = "Task Expired";
    const html = taskExpirationTemplate(task.name, task.dueDate);

    await sendEmail(recipient, subject, html);

    await Notification.create({
      type: "task_expired",
      recipient,
      subject,
      message: `Task ${task.name} expired on ${task.dueDate}.`
    });

    res.json({ message: "Task expired notification sent" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send task expired email" });
  }
};
