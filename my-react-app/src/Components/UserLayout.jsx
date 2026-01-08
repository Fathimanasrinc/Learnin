import { Outlet } from "react-router-dom";
import Navbar from "./HomePage/Navbar/Navbar";
import Sidebar from "./HomePage/Sidebar/Sidebar";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
    </>
  );
};

export default UserLayout;
