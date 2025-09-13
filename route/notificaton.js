import express from "express";
import { projectCompleted, taskMoved, taskExpired } from "../controller/notification.js";

const notificationRouter = express.Router();

notificationRouter.post("/project/completed", projectCompleted);
notificationRouter.post("/task/moved", taskMoved);
notificationRouter.post("/task/expired", taskExpired);

export default notificationRouter;
