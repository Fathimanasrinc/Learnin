import React, { useState } from "react";
import axios from "axios";
import ReportForm from "../ReportBox/ReportBox"; // adjust path

function TaskDesc({ request, onClose }) {
  const [showReport, setShowReport] = useState(false);
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(request._id, "rrrrrrrrrrrrr");
    if (!description.trim()) return alert("Description required");

    const res = await fetch("http://localhost:5000/api/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        description,
        targetedUser: request.learner.userId,
        requestId: request._id,
      }),
    });
    onClose?.();

    if (res.ok) {
      alert("Report submitted successfully");
      setDescription("");
    } else {
      alert("Failed to submit report");
    }
  };

  const completeTask = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${request._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task completed");
      onClose?.();
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Failed to complete task");
    }
  };

  return (
    <div>
      {/* REPORT FORM */}
      {showReport && (
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
      )}

      {/* TASK DESCRIPTION */}
      {!showReport && (
        <div style={styles.container}>
          <h2 style={styles.heading}>Task Details</h2>

          <div style={styles.field}>
            <label style={styles.label}>Skills Required</label>
            <p style={styles.value}>{request.skills}</p>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Expectation / Description</label>
            <p style={styles.value}>{request.expectations}</p>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Deadline</label>
            <p style={styles.value}>{request.deadline}</p>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Credits Offered</label>
            <p style={styles.value}>{request.credits} Credits</p>
          </div>

          <button className="accept-btn" onClick={completeTask}>
            Confirm Task
          </button>

          <button className="report-btn" onClick={() => setShowReport(true)}>
            Report
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "420px",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#111",
    color: "#fff",
    borderRadius: "10px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#e5e5e5",
  },
  field: {
    marginBottom: "15px",
  },
  label: {
    fontSize: "14px",
    color: "#aaa",
  },
  value: {
    marginTop: "5px",
    padding: "8px",
    backgroundColor: "#1f1f1f",
    borderRadius: "6px",
    fontSize: "15px",
  },
};

export default TaskDesc;
