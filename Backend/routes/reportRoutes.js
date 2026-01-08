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
    console.log(req.body,"rwqbody")

    if (!description || !targetedUser) {
      return res.status(400).json({ message: "All fields required" });
    }

    const report = await Report.create({
      description,
      submittedBy: req.user._id,
      targetedUser,
      request: req.body.requestId,
    });

    res.status(201).json({ message: "Report submitted", report });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/", adminAuth, async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("submittedBy", "name email")
      .populate("targetedUser", "name email")
      .populate("request") // 👈 important
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reports" });
  }
});


router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    await report.deleteOne();
    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete report" });
  }
});
router.get("/:id", protect, adminAuth, async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
      console.log(report,"rrrrrrrrrrrrrr");

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json(report);
  } catch (error) {
    console.error("Fetch report details error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
