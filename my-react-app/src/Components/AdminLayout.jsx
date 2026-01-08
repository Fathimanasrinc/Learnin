import { Outlet, Navigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  const adminToken = localStorage.getItem("adminToken");

  if (!adminToken) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
};

export default AdminLayout;
