import { Router } from "express";
import {
  addNewTask,
  deleteATask,
  editATask,
  getAllTasks,
  addMultipleTasks,
  getListLimitPage,
} from "../controllers/taskController.js";

const taskRouter = Router();

taskRouter.get("/", getAllTasks);
taskRouter.post("/add", addNewTask);
taskRouter.put("/edit/:_id", editATask);
taskRouter.post("/add-multiple", addMultipleTasks);
taskRouter.delete("/delete/:_id", deleteATask);
taskRouter.get("/page/:page&limit/:limit", getListLimitPage);

export { taskRouter };
