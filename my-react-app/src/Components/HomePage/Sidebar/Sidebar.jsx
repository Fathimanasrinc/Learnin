import React,{useState,useEffect} from "react";
import "./Sidebar.css";
import credit from "../../../assets/credit2.png";
import task from "../../../assets/task.jpeg";
import { Link } from "react-router-dom";
import requests from "../../../assets/requests.png";
const Sidebar = () => {
  const [credits, setCredits] = useState(0);

  useEffect(() => {
  const token = localStorage.getItem("token");

  fetch("http://localhost:5000/api/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => setCredits(data.credits));
}, []);

  return (
    <div className="sidebar">
      <div >
        <div className="credits-card">
          <h2 className="credits-value">{credits}</h2>
          
          <p className="credits-label">Credits</p>
        </div>
      </div>
      <Link to="/task" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="sidebar-item">
          <img className="icon" src={task}></img>
          <span className="text">Tasks</span>
        </div>
      </Link>

      <Link to="/request" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="sidebar-item">
          <img className="icon" src={requests}></img>
          <span className="text">Requests</span>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
