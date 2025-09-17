import express from "express";
import { projectCompleted, taskMoved, taskExpired, createProject, createTask, openedNotification, checkNotificationStatus, trackNotificationOpen } from "../controller/notification.js";

const notificationRouter = express.Router();

notificationRouter.post("/create/project", createProject)
notificationRouter.post("/create/task", createTask)
notificationRouter.post("/project/completed", projectCompleted);
notificationRouter.post("/task/moved", taskMoved);
notificationRouter.post("/task/expired", taskExpired);
notificationRouter.post("/notification/opened", openedNotification);
notificationRouter.get("/notification/open/:id", trackNotificationOpen);
notificationRouter.post("/notification/status", checkNotificationStatus);


export default notificationRouter;
