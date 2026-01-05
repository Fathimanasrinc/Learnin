import React from "react";
import "./Sidebar.css";
import credit from "../../../assets/credit2.png";
import task from "../../../assets/task.jpeg";
import { Link } from "react-router-dom";
import requests from "../../../assets/requests.png";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <img className="icon" src={credit}></img>
        <span className="text">Credits</span>
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
