import { configDotenv } from "dotenv";
import TaskModel from "../models/task.model.js";

configDotenv();

export const getTask = async (request, response) => {
  try {
    const tasks = await TaskModel.find();

    response.status(200).json(tasks);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};

export const getTaskById = async (request, response) => {
  try {
    const { id } = request.params;

    const taskById = await TaskModel.findById(id);

    response.status(201).send(taskById);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};

export const createTask = async (request, response) => {
  try {
    const { name, description, isDone } = request.body;

    if (!name || !description || isDone === undefined) {
      return response.status(400).json({ message: "Missing fields" });
    }

    const task = await TaskModel.create(request.body);

    response.status(201).json(task);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};

export const update_task = async (request, response) => {
  try {
    const { id } = request.params;

    const taskToUpdate = await TaskModel.findByIdAndUpdate(id, request.body, {
      new: true,
    });

    response.status(200).send(taskToUpdate);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};

export const deleteTask = async (request, response) => {
  try {
    const { id } = request.params;

    await TaskModel.findByIdAndDelete(id);

    response.status(201).json({ message: "Task deleted" });
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};
