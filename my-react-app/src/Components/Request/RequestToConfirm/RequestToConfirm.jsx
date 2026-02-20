import React, { useRef, useEffect } from "react";
import "./RequestToConfirm.css";
import axios from "axios";

function RequestToConfirm({ request, onClose, setRequests }) {
  const modalRef = useRef(null);
  const token = localStorage.getItem("token");

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleDelete = async (id) => {
      try{
      await axios.put(
          `http://localhost:5000/api/users/creditupdate/${id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } },
        );
    }
    catch(err){
       console.error(err);
      alert("Failed to update credits");
    }
    try {
      await axios.delete(`http://localhost:5000/api/requests/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
       setRequests((prev) => prev.filter((r) => r._id !== id));
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to cancel request");
    }
   
  };

  return (
    <div className="task-overlay">
      <div className="task-container" ref={modalRef}>
        <h2 className="task-heading">Confirm Task</h2>

        <div className="task-field">
          <span className="task-label">Task Name</span>
          <div className="task-value">{request?.title || "N/A"}</div>
        </div>

        <div className="task-field">
          <span className="task-label">Skills Required</span>
          <div className="task-value">{request?.skills}</div>
        </div>

        <div className="task-field">
          <span className="task-label">Description / Expectation</span>
          <div className="task-value task-value--description">
            {request?.expectations}
          </div>
        </div>

        <div className="task-field">
          <span className="task-label">Deadline</span>
          <div className="task-value">{request?.deadline}</div>
        </div>

        <div className="task-field">
          <span className="task-label">Credits Offered</span>
          <div className="task-value">{request?.credits} Credits</div>
        </div>

        <button
          className="cancel-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(request._id);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default RequestToConfirm;
