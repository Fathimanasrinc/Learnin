import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TaskDesc.css"
import ReportBox from "../ReportBox/ReportBox"; // adjust path

function TaskDesc({ request, onClose }) {
  const navigate = useNavigate();
  const [showReport, setShowReport] = useState(false);
  const token = localStorage.getItem("token");

const goToChat = (id) => {
    if (!id) return;
    navigate(`/chat/${id}`);
  };

  // Close modal if click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains("task-overlay")) {
        onClose?.();
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [onClose]);

  return (
    <>
      {showReport && (
        <ReportBox
          request={request}
          token={token}
          onClose={() => setShowReport(false)}
        />
      )}

      <div className="task-overlay">
        <div className="task-container">
          <h2 className="task-heading">Task Details</h2>

          <div className="task-field">
            <label className="task-label">Skills Required</label>
            <p className="task-value">{request.skills}</p>
          </div>

          <div className="task-field">
            <label className="task-label">Expectation / Description</label>
            <p className="task-value task-value--description">
  {request.expectations}
</p>
          </div>

          <div className="task-field">
            <label className="task-label">Deadline</label>
            <p className="task-value">{request.deadline}</p>
          </div>

          <div className="task-field">
            <label className="task-label">Credits Offered</label>
            <p className="task-value">{request.credits} Credits</p>
          </div>
         

          <button
            className="report-btn-task"
            onClick={() => setShowReport(true)}
          >
            Report
          </button>
           <button
                className="message-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  goToChat(request.learner.userId);
                }}
              >
                Message
              </button>
        </div>
      </div>
    </>
  );
}

export default TaskDesc;
