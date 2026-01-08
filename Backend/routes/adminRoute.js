// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const User = require("../models/User");
const protect = require("../middleware/auth");
const adminOnly = require("../middleware/adminAuth");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");


// 🔑 Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/* =========================
   📝 REGISTER ADMIN
========================= */
router.post("/add", adminOnly, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await Admin.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await Admin.create({
      name,
      email,
      password, // hashed by pre-save hook
    });

    res.status(201).json({
      message: "Admin added successfully",
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Add Admin Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   🔐 LOGIN ADMIN
========================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const admin = await Admin.findOne({ email });
     const isMatch = await admin.matchPassword(password);

    console.log(password,"passsssssss",admin._id,"admi",admin.id);

    if (isMatch) {
      res.json({
        _id: admin.id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   👤 ADMIN PROFILE (PROTECTED)
========================= */
router.get("/profile", adminOnly, async (req, res) => {
  res.json(req.admin);
});



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
