const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  bio: String,
  skills: [String],
  rating: { type: Number, default: 0 },
  credits: { type: Number, default: 0 },
  image: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

module.exports = mongoose.model("User", userSchema);

