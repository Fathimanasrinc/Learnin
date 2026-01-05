import express from "express";
import User from "../models/User.js";
import protect from "../middleware/auth.js";

const router = express.Router();




router.get("/", protect, async (req, res) => {
  try {
    const userId = req.user;   // from JWT

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
router.put("/", protect, async (req, res) => {
  try {
    const { password, _id, email, ...safeData } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      safeData,
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
