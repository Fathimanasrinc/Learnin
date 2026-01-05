// components/ChatList.jsx
import { useEffect, useState } from "react";
import { fetchChats } from "../../../Services/ChatAPI";

const ChatList = ({ onSelect }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats().then(res => setChats(res.data));
  }, []);

  return (
    <div className="chat-list">
      {chats.map(chat => (
        <div
          key={chat._id}
          onClick={() => onSelect(chat)}
          className="chat-item"
        >
          {chat.participants.map(p => p.name).join(" & ")}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
