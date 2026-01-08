// pages/admin/AdminUsers.jsx
import { useEffect, useState } from "react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/users", {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const updateUser = async (id, data) => {
    await fetch(`http://localhost:5000/api/admin/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <div>
      <h2>User Management</h2>

      {users.map(user => (
        <div key={user._id}>
          <p>{user.name} - Credits: {user.credits}</p>
          <button onClick={() => updateUser(user._id, { credits: user.credits + 5 })}>
            Add 5 Credits
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;
