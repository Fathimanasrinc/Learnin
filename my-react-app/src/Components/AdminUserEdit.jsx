import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./AdminUserEdit.css";

const AdminUserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    email: "",
    bio: "",
    role: "user",
    status: "active",
    credits: 0,
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data.name || "",
          email: data.email || "",
          bio: data.bio || "",
          role: data.role || "user",
          status: data.status || "active",
          credits: data.credits || 0,
        });
      });
  }, [id]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "credits" ? Number(value) : value,
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Update failed");

      alert("User updated successfully");
      navigate("/admin/reports");
    } catch (err) {
      alert("Error updating user");
    }
  };

  return (
    <div className="admin-edit-container">
      <h2>Edit User</h2>

      <label>Name</label>
      <input name="name" value={form.name} onChange={handleChange} />

      <label>Email</label>
      <input name="email" value={form.email} onChange={handleChange} />

      <label>Bio</label>
      <textarea name="bio" value={form.bio} onChange={handleChange} />

      <label>Credits</label>
      <input
        type="number"
        name="credits"
        min="0"
        value={form.credits}
        onChange={handleChange}
      />

      <label>Role</label>
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <label>Status</label>
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="active">Active</option>
        <option value="warned">Warned</option>
        <option value="suspended">Suspended</option>
      </select>

      <button onClick={handleUpdate}>Update User</button>
    </div>
  );
};

export default AdminUserEdit;
