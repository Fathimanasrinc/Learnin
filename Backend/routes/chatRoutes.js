import express from "express";
import Request from "../models/Requests.js";
import User from "../models/User.js";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import protect from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { userId } = req.body;

  const mentor = await User.findById(userId).select("name email");

  // 🔥 ALWAYS SORT IDS to avoid duplicate chats
  const participants = [req.user.id, userId].sort();

  let chat = await Chat.findOne({
    participants,
  });

  if (!chat) {
    chat = await Chat.create({ participants });
  }

  res.json({ chat, mentor });
});

router.post("/messages/:chatId", protect, async (req, res) => {
  try {
    const { text } = req.body;

    const message = await Message.create({
      chat: req.params.chatId,
      sender: req.user.id,
      text,
    });

    // 🔥 Update lastMessage
    await Chat.findByIdAndUpdate(req.params.chatId, {
      lastMessage: message._id,
    });

    res.status(201).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/messages/:chatId", protect, async (req, res) => {
  const chat = await Chat.findById(req.params.chatId);

  if (!chat) {
    return res.status(404).json({ message: "Chat not found" });
  }

  // 🔥 Ensure logged-in user is a participant
  if (!chat.participants.some((id) => id.toString() === req.user.id)) {
    return res.status(403).json({ message: "Access denied" });
  }

  const messages = await Message.find({ chat: chat._id })
    .populate("sender", "_id name")
    .sort({ createdAt: 1 });

  res.json(messages);
});

router.get("/between/:user1/:user2", protect, adminAuth, async (req, res) => {
  try {
    const { user1, user2 } = req.params;
    console.log(user1, user2, "usersssssssssss");

    const chat = await Chat.findOne({
      participants: { $all: [user1, user2] },
    });
    console.log(chat, "chat");

    if (!chat) {
      return res.status(404).json({ message: "No chat found" });
    }
    const messages = await Message.find({ chat: chat._id })
      .populate("sender", "name")
      .sort({ createdAt: 1 });

    console.log(messages);

    res.status(200).json({
      chatId: chat.chat,
      messages,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chat" });
  }
});

export default router;
