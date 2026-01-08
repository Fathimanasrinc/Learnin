import React, { useState } from "react";
import "../Components/Login/Login.css"; // you can reuse same CSS
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Admin login failed");
        return;
      }

      // ✅ Store admin token separately
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("admin", JSON.stringify(data));

      console.log("Admin logged in:", data);

      // 🔀 Redirect to admin dashboard
      navigate("/admin/reports");
    } catch (err) {
      console.error("Admin login error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Admin Sign In</h2>

        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="login-input"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="login-input"
        />

        <button type="submit" className="login-button">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
