import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/ConnectDB.js";
import { taskRouter } from "./routes/taskRoutes.js";
import cors from "cors";
import path from 'path'
dotenv.config();
const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: "*", // hoặc "*" để cho phép tất cả
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
}
// Connect to database
connectDB();
app.use("/task", taskRouter);

// app.use("/task", taskRoutes);

if (process.env.NODE_ENV = "production") {
  app.use(
    express.static(path.join(__dirname, "../frotnend/vite-project/dist"))
  );

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frotnend/vite-project/dist/index.html"))
  })
}
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
