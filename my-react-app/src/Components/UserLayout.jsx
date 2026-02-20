import { Outlet } from "react-router-dom";
import Navbar from "./HomePage/Navbar/Navbar";
import Sidebar from "./HomePage/Sidebar/Sidebar";
import "./UserLayout.css";

const UserLayout = () => {
  return (
    <div className="user-layout">
      <Sidebar />
      <div className="user-content">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
