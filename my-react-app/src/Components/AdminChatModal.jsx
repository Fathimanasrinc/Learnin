import { useEffect, useState } from "react";
import "./AdminChatModal.css";

const AdminChatModal = ({ users, onClose }) => {
  const [messages, setMessages] = useState([]);
  const adminToken = localStorage.getItem("adminToken");
  console.log(users);

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/chat/between/${users.submittedBy}/${users.targetedUser}`,
      {
        headers: { Authorization: `Bearer ${adminToken}` },
      }
    )
      .then((res) => res.json())
      .then((data) => setMessages(data.messages || []))
      .catch(console.error);
      console.log(messages);

  }, []);

  return (
    <div className="chat-overlay">
      <div className="chat-modal">
        <h3>Conversation</h3>

        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg._id} className="chat-message">
              <strong>{msg.sender.name}:</strong>
              <span>{msg.text}</span>
            </div>
          ))}
        </div>

        <button onClick={onClose} className="close-btn">
          Close
        </button>
      </div>
    </div>
  );
};

export default AdminChatModal;
