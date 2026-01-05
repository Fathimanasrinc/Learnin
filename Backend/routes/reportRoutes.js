// routes/reportRoutes.js
const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const protect = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

// CREATE REPORT
router.post("/", protect, async (req, res) => {
  try {
    const { description, targetedUser } = req.body;

    if (!description || !targetedUser) {
      return res.status(400).json({ message: "All fields required" });
    }

    const report = await Report.create({
      description,
      submittedBy: req.user._id,
      targetedUser,
    });

    res.status(201).json({ message: "Report submitted", report });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", protect, adminAuth, async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("submittedBy", "name email")
      .populate("targetedUser", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reports" });
  }
});
router.delete(
  "/:id",
  protect,
  adminAuth,
  async (req, res) => {
    try {
      await Report.findByIdAndDelete(req.params.id);
      res.json({ message: "Report deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete report" });
    }
  }
);

module.exports = router;
