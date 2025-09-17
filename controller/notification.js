import { sendEmail } from "../utils/mail.js";
import { projectCompletedTemplate, taskMovedTemplate, taskExpirationTemplate } from "../utils/emailTemplate.js";
import Notification from "../model/notification.js";
import Project from "../model/project.js";
import Task from "../model/task.js";




// Create Project
export const createProject = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Project name is required" });
    }

    const project = await Project.create({ name });

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create project" });
  }
};

// Create Task
export const createTask = async (req, res) => {
  try {
    const { name, assignedTo, dueDate, projectId } = req.body;

    // Validate required fields
    if (!name || !assignedTo || !projectId) {
      return res.status(400).json({ error: "Task name, assignedTo and ProjectId are required" });
    }

        // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Create the task
    const task = await Task.create({
      name,
      assignedTo,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      project: projectId
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task" });
  }
};


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

    const notification = await Notification.create({
      type: "project_completed",
      recipient,
      subject,
      message: `Project ${project.name} has been completed.`
    });

    res.json({ message: "Project completion notification sent", project,notification});
  } catch (error) {
  console.error("Project Completed Error:", error);  // 👈 Add this
  res.status(500).json({ error: error.message || "Failed to send project completion email" });
}
}

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

    const notification = await Notification.create({
      type: "task_moved",
      recipient,
      subject,
      message: `Task ${task.name} moved from ${fromStage} → ${toStage}.`
    });

    res.json({ message: "Task moved notification sent", task, notification });
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

    const notification = await Notification.create({
      type: "task_expired",
      recipient,
      subject,
      message: `Task ${task.name} expired on ${task.dueDate}.`
    });

    res.json({ message: "Task expired notification sent", task, notification });
  } catch (error) {
    res.status(500).json({ error: "Failed to send task expired email" });
  }
};

export const openedNotification = async (req, res) => {
  try {
    const { notificationId } = req.body;
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    // If not read → mark as read now
    if (!notification.isRead) {
      notification.isRead = true;
      notification.openedAt = new Date();
      await notification.save();

      return res.json({
        message: "Notification opened",
        isRead: notification.isRead,
        openedAt: notification.openedAt
      });
    }

    // Already read
    res.json({
      message: "Notification already opened",
      isRead: notification.isRead,
      openedAt: notification.openedAt
    });

  } catch (error) {
    console.error("Open Notification Error:", error);
    res.status(500).json({ error: "Failed to open notification" });
  }
};

// Mark notification as read when email is opened
export const trackNotificationOpen = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);

    if (notification && !notification.isRead) {
      notification.isRead = true;
      notification.openedAt = new Date();
      await notification.save();
    }

    // Return a 1x1 transparent pixel so email clients don’t block it
    const pixel = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBg8XrV0oAAAAASUVORK5CYII=",
      "base64"
    );
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": pixel.length,
    });
    res.end(pixel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to track notification" });
  }
};



export const checkNotificationStatus = async (req, res) => {
  try {
    const { notificationId } = req.body;
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.json({
      message: notification.isRead ? "Notification has been read" : "Notification is unread",
      isRead: notification.isRead,
      openedAt: notification.openedAt || null
    });

  } catch (error) {
    console.error("Check Notification Status Error:", error);
    res.status(500).json({ error: "Failed to fetch notification status" });
  }
};
