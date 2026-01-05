const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;
  

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED TOKEN:", decoded); // 🔴 IMPORTANT

    req.user = await User.findById(decoded._id).select("-password");

    console.log("REQ.USER:", req.user); // 🔴 IMPORTANT

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token failed" });
  }
};

module.exports = protect;
