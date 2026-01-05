// services/chatAPI.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchChats = () => API.get("/chats");
export const fetchMessages = (chatId) => API.get(`/messages/${chatId}`);
export const sendMessage = (data) => API.post("/messages", data);
