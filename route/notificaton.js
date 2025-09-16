import express from "express";
import { projectCompleted, taskMoved, taskExpired, createProject, createTask } from "../controller/notification.js";

const notificationRouter = express.Router();

notificationRouter.post("/create/project", createProject)
notificationRouter.post("/create/task", createTask)
notificationRouter.post("/project/completed", projectCompleted);
notificationRouter.post("/task/moved", taskMoved);
notificationRouter.post("/task/expired", taskExpired);

export default notificationRouter;
