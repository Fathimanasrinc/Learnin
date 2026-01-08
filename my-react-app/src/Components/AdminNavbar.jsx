import { useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-logo" onClick={() => navigate("/admin")}>
        Admin Panel
      </div>

      <div className="admin-actions">
        <button onClick={() => navigate("/admin/add-admin")}>
          Add Admin
        </button>

        <button onClick={() => navigate("/admin/profile")}>
          Profile
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
