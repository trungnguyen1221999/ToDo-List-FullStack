import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/ConnectDB.js";
import { addTask, deleteTask, editTask, getAllTask } from "./routes/taskRoutes.js";
// import { taskRoutes } from "./routes/taskRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// Connect to database
connectDB();

// app.use("/task", taskRoutes);

app.use("/", getAllTask);

app.use("/add", addTask)

app.use("/edit/:id", editTask);
app.use("/delete/:id", deleteTask);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
