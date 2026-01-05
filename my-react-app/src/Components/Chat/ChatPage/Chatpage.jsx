import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ChatBox from "../Chatbox/Chatbox";
import "./ChatPage.css"; // ✅ import the new CSS

const ChatPage = () => {
  const { mentorId } = useParams();
  const [chat, setChat] = useState(null);

  useEffect(() => {
    const loadChat = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.post(
          "http://localhost:5000/api/chat",
          { userId: mentorId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setChat(res.data);
      } catch (err) {
        console.log("Chat error:", err);
      }
    };

    loadChat();
  }, [mentorId]);
  console.log(chat)

  return (
    <div className="chat-page">
      {chat ? <ChatBox chat={chat.chat} mentor={chat.mentor} /> : <p className="loading-text">Loading chat...</p>}
    </div>
  );
};

export default ChatPage;
