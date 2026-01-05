import { useState } from "react";
import axios from "axios";
import "./MessageInput.css";

const MessageInput = ({ chatId, setMessages }) => {
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (!text.trim()) return;

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `http://localhost:5000/api/chat/messages/${chatId}`,
        { text },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessages((prev) => [
  ...prev,
  {
    ...res.data,
    sender: { _id: res.data.sender },
  },
]);

      setText("");
    } catch (err) {
      console.log("Send message error:", err);
    }
  };

  return (
    <div className="message-input-container">
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default MessageInput;
