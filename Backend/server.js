import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import signinRoutes from "./routes/signinRoute.js";
import signupRoutes from "./routes/signupRoute.js";
import profileRoutes from "./routes/profilemaking.js";
import myprofileRoutes from "./routes/profileRoute.js";
import userRoutes from "./routes/userRoutes.js";
import requestRoutes from "./routes/RequestmakingRoute.js";
import TaskRoute from "./routes/TaskRoute.js";
import chatRoutes from "./routes/chatRoutes.js";
import adminRoutes from "./routes/adminRoute.js";
import reportRoutes from "./routes/reportRoutes.js";

import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })

  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });


app.get("/", (req, res) => {
  res.send("node js working");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
app.use("/api/users", userRoutes);
app.use("/api/signup", signupRoutes);
app.use("/api/signin", signinRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/myprofile", myprofileRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/tasks",TaskRoute);
app.use("/api/chat", chatRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/reports",reportRoutes);



