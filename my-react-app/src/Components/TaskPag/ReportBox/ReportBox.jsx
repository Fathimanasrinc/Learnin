import React, { useRef, useEffect, useState } from "react";
import "./ReportBox.css";

const ReportBox = ({ request, token, onClose }) => {
  const [description, setDescription] = useState("");
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return alert("Description required");

    try {
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

      if (res.ok) {
        alert("Report submitted successfully");
        setDescription("");
        onClose();
      } else {
        alert("Failed to submit report");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting report");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="report-card-user" ref={modalRef}>
        <span className="report-close" onClick={onClose}>
          &times;
        </span>
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
    </div>
  );
};

export default ReportBox;
