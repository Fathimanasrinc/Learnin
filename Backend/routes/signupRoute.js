import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);   // 👈 DEBUG LINE

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();   // 👈 THIS LINE SAVES TO DB

  const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

    res.status(201).json({
  message: "Signup successful",
  token,                        // send token to frontend
  user: {
    id: user._id,
    name: user.name,
    email: user.email
  }
});

  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;