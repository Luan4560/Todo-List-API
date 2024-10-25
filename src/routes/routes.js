import express from "express";

import {
  getTask,
  getTaskById,
  createTask,
  update_task,
  deleteTask,
} from "../controller/tasks.js";
import login from "../controller/login.js";
import createUser from "../controller/signup.js";
import authenticateJWT from "../middlewares/authenticateJWT.js";

const router = express.Router();

router.post("/signup", createUser);

router.post("/login", login);

router.get("/logout", (request, response) => {
  response.clearCookie("token");
  response.json({ message: "Logged out!" });
});

router.get("/get_task", authenticateJWT, getTask);

router.get("/get_task_by_id/:id", authenticateJWT, getTaskById);

router.post("/create_task", authenticateJWT, createTask);

router.patch("/update_task/:id", authenticateJWT, update_task);

router.delete("/delete_task/:id", authenticateJWT, deleteTask);

export default router;
