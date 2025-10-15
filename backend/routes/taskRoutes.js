import { Router } from "express";
import {
  addNewTask,
  deleteATask,
  editATask,
  getAllTasks,
} from "../controllers/taskController.js";

const taskRouter = Router();

taskRouter.get("/", getAllTasks);
taskRouter.post("/add", addNewTask);
taskRouter.put("/edit/:id", editATask);

taskRouter.delete("/delete/:id", deleteATask);

export { taskRouter };
