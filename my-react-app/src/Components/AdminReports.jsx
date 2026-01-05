// pages/admin/AdminReports.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminChatModal from "./AdminChatModal";
import "./AdminReports.css";

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/reports", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((err) => console.error(err));
  }, []);
  const handleDeleteReport = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this report?"
  );

  if (!confirmDelete) return;

  try {
    const res = await fetch(
      `http://localhost:5000/api/reports/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) throw new Error("Delete failed");

    setReports((prev) => prev.filter((r) => r._id !== id));
  } catch (err) {
    alert("Failed to delete report");
  }
};


  return (
    <div className="admin-reports-container">
      <h2 className="admin-title">User Reports</h2>

      {reports.length === 0 && <p className="empty-text">No reports found</p>}

      <div className="reports-grid">
        {reports.map((report) => (
          <div key={report._id} className="report-card">
            <div className="report-section">
              <span className="label">Submitted By</span>
              <span className="value">{report.submittedBy?.name}</span>
              <button
                className="update-btn"
                onClick={() =>
                  navigate(`/admin/users/${report.submittedBy._id}`)
                }
              >
                Update User
              </button>
            </div>

            <div className="report-section">
              <span className="label">Targeted User</span>
              <span className="value">{report.targetedUser?.name}</span>
              <button
                className="update-btn"
                onClick={() =>
                  navigate(`/admin/users/${report.targetedUser._id}`)
                }
              >
                Update User
              </button>
            </div>

            <div className="report-section">
              <span className="label">Description</span>
              <p className="description">{report.description}</p>
            </div>
            <button
              className="chat-btn"
              onClick={() =>
                setSelectedReport({
                  submittedBy: report.submittedBy._id,
                  targetedUser: report.targetedUser._id,
                })
              }
            >
              View Chat
            </button>

            <button
              className="delete-btn"
              onClick={() => handleDeleteReport(report._id)}
            >
              Delete Report
            </button>
          </div>
        ))}
      </div>

      {selectedReport && (
        <AdminChatModal
          users={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
};

export default AdminReports;
