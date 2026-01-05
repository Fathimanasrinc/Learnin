import { useEffect, useState, useRef } from "react";
import axios from "axios";
import MessageInput from "../MessageInput/MessageInput";
import "./ChatBox.css";

const ChatBox = ({ chat, mentor }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

const currentUser = JSON.parse(localStorage.getItem("user"));
const currentUserId = currentUser?._id;
  console.log(currentUserId);

  useEffect(() => {
    if (!chat?._id) return; // ✅ guard

    const loadMessages = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:5000/api/chat/messages/${chat._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessages(res.data);
      } catch (err) {
        console.error("Load messages error:", err);
      }
    };

    loadMessages();
  }, [chat]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <h3>Chat with {mentor?.name || "User"}</h3>
      </div>

      <div className="chatbox-messages">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`chatbox-message ${
              msg.sender._id === currentUserId ? "me" : "other"
            }`
          }
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput chatId={chat._id} setMessages={setMessages} />
    </div>
  );
};

export default ChatBox;
