import express from "express";
import User from "../models/User.js";
import protect from "../middleware/auth.js";

const router = express.Router();



router.get("/me", protect, async (req, res) => {
  console.log("REQ.USER ID:", req.user);

  const user = await User.findById(req.user);
  console.log("USER FROM DB:", user);

  res.json(user);
});


router.put("/", protect, async (req, res) => {
  try {
    const userId = req.user;
    const { name, bio, skills, image } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        name,
        bio,
        skills,
        image
      },
      { new: true }
    );
    
 
    res.json({
      message: "Profile updated successfully",
     user
    });
  } catch (error) {
    console.error("PROFILE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});
export default router;