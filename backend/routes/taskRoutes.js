import { Router } from "express";

const taskRouter = Router();

const getAllTask = taskRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Get all tasks" });
});

const addTask = taskRouter.post("/", (req, res) => {
  res.status(200).json({ message: "Add new task" });
});

const editTask = taskRouter.put("/", (req, res) => {
  res.status(200).json({ message: `Edit task ` });
});

const deleteTask = taskRouter.delete("/", (req, res) => {
  res.status(200).json({ message: `Delete task ` });
});
export { addTask, getAllTask, editTask, deleteTask };