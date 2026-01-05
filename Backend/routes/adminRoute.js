// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const User = require("../models/User");
const protect = require("../middleware/auth");
const adminOnly = require("../middleware/adminAuth");


/* 🔹 GET ALL REPORTS */
router.get("/reports", protect, adminOnly, async (req, res) => {
  const reports = await Report.find()
    .populate("submittedBy", "name email")
    .populate("targetedUser", "name email");

  res.json(reports);
});

/* 🔹 UPDATE USER DETAILS */
router.put("/users/:id", protect, adminOnly, async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  ).select("-password");

  res.json(updatedUser);
});

// GET single user
router.get(
  "/users/:id",
  protect,
  adminOnly,
  async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  }
);
// UPDATE user
router.put(
  "/users/:id",
  protect,
 adminOnly,
  async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedUser);
  }
);


module.exports = router;
