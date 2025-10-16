import taskModels from "../models/taskModels.js";


const addMultipleTasks = async (req, res) => {
  try {
    const tasks = req.body; // Expecting an array of tasks in the request body
    if (!Array.isArray(tasks) || tasks.length === 0) {
      return res.status(400).json({ message: "Please provide an array of tasks" });
    }
    const newTasks = await taskModels.insertMany(tasks);
    res.status(200).json({ message: "Add multiple tasks", data: newTasks });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

}

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await taskModels.find().sort({ createdAt: -1 });
    const activeTasksCount = await taskModels.countDocuments({ status: "active" });
      const completedTasksCount = await taskModels.countDocuments({ status: "completed" });
    res.status(200).json({ message: "Get all tasks", data: allTasks, activeTasksCount, completedTasksCount });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addNewTask = async (req, res) => {
  try {
    const { title, desc } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });
    const newTask = await taskModels.create({ title, desc });
    console.log(newTask);
    res.status(200).json({ message: "Add new task", data: newTask });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editATask = async (req, res) => {
  try {
    const { _id } = req.params;
    const { title, desc, status } = req.body;
    if (!_id) return res.status(400).json({ message: "ID is required" });
    const newTask = await taskModels.findByIdAndUpdate(
      _id,
      { title, desc, status },
      { new: true }
    );
    if (!newTask) return res.status(404).json({ message: "Task not found" });
    console.log(newTask);
    res.status(200).json({ message: `Edit task `, data: newTask });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteATask = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) return res.status(400).json({ message: "ID is required" });
    const deletedTask = await taskModels.findByIdAndDelete(_id);
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: `Delete task ` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getListLimitPage = async (req, res) =>{
  try{
    const {page, limit} = req.params;
    const skip = (page - 1) * limit;
    const tasks = await taskModels.find().skip(skip).limit(limit);
    res.status(200).json({message: "Get tasks with pagination", data: tasks});
  }
  catch(error){
    return res.status(500).json({ message: error.message });
  }
  
}
const getProductById = async (req, res) => {
  try {
    const { _id } = req.params;
    const product = await taskModels.findById(_id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Get product by ID", data: product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { getAllTasks, addNewTask, editATask, deleteATask, addMultipleTasks, getListLimitPage, getProductById };
