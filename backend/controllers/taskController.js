import taskModels from "../models/taskModels.js";

const getAllTasks = (req, res) => {
  res.status(200).json({ message: "Get all tasks" });
};

const  addNewTask = (req, res) => {
  res.status(200).json({ message: "Add new task" });
}

const editATask = (req, res) => {
  res.status(200).json({ message: `Edit task ` });
}

const deleteATask = (req, res) => {
  res.status(200).json({ message: `Delete task ` });
}
export { getAllTasks, addNewTask, editATask, deleteATask };