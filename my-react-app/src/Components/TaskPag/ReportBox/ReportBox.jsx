// components/ReportForm.jsx
import { useState } from "react";
import "./ReportBox.css";

const ReportBox = ({ targetedUserId }) => {
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) return alert("Description required");

    const res = await fetch("http://localhost:5000/api/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        description,
        targetedUser: targetedUserId,
      }),
    });

    if (res.ok) {
      alert("Report submitted successfully");
      setDescription("");
    } else {
      alert("Failed to submit report");
    }
  };

  return (
    <div className="report-card">
      <h3 className="report-title">Report User</h3>

      <form onSubmit={handleSubmit}>
        <label className="report-label">Description</label>

        <textarea
          className="report-textarea"
          placeholder="Explain the issue clearly..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          required
        />

        <button className="report-button" type="submit">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportBox;
