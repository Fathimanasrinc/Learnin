import express from "express";
import User from "../models/User.js";
import Request from "../models/Requests.js"
import protect from "../middleware/auth.js";

const router = express.Router();




router.get("/", protect, async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user }   // 👈 exclude logged-in user
    }).select("-password");

    res.json(users);
  } catch (err) {
    console.error("GET USERS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/search/:skill", async (req, res) => {
  try {
    const  skill  = req.params.skill;
    console.log(skill,"skilllllllll")
    if (!skill) {
      return res.status(400).json({ message: "Skill is required" });
    }
    const users = await User.find({
      skills: { $regex: skill, $options: "i" }
    }).select("-password");
    console.log(users,"userssssssss")
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
});
router.put("/rate/:userId", protect, async (req, res) => {
  const { rating } = req.body;          // ⭐ star value
  const ratedUserId = req.params.userId;

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Invalid rating value" });
  }

  const user = await User.findById(ratedUserId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // ❌ prevent self rating
  if (ratedUserId === req.user._id.toString()) {
    return res.status(400).json({ message: "You cannot rate yourself" });
  }

  // ⭐ SIMPLE update (average logic optional)
  user.rating = rating;

  await user.save();

  res.json({
    message: "Rating updated",
    rating: user.rating,
  });
});
router.put("/credit/:userId", protect, async (req, res) => {
  const { credits } = req.body;          // ⭐ star value
  const requestId = req.params.userId;

console.log(requestId)
  const request = await Request.findById(requestId);
  console.log(request)
  const user = await User.findById(request.mentor.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  

  // ⭐ SIMPLE update (average logic optional)
  request.status = "completed"
  user.credits += credits;
  req.user.credits-=credits;

  await user.save();
  await request.save();

  res.json({
    message: "credit updated",
  });
});

export default router;
