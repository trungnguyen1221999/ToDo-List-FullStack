import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/ConnectDB.js";
import { taskRouter } from "./routes/taskRoutes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// Connect to database
connectDB();

// app.use("/task", taskRoutes);

app.use("/task", taskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
