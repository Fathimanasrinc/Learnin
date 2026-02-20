import React, { useState, useRef, useEffect } from "react";
import "./RequestDesc.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RequestDesc({ request, onClose, confirm,onTaskComplete  }) {
  const [review, setReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const modalRef = useRef(null); // REF for outside click
  const navigate = useNavigate();

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

  const goToChat = (id) => {
    if (!id) return;
    navigate(`/chat/${id}`);
  };

  const handleSubmit = async () => {
    if (!rating) return alert("Select a rating");
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/users/rate/${request.mentor.userId}`,
      { rating },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Rating saved");
    onClose();
  };

  const confirmreq = async (requestId) => {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/users/credit/${requestId}`,
      { credits: request.credits },
      { headers: { Authorization: `Bearer ${token}` } }
    );

      if (onTaskComplete) {
      onTaskComplete(requestId);
    }
    if (confirm) setReview(true);
  };

  return (
    <div className="task-overlay">
      <div className="task-container" ref={modalRef}>
        {review ? (
        <> 
  <h3 className="task-heading">Rate {request.mentor.name}</h3>

  <div className="stars-review-box">
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={`star-review ${star <= (hover || rating) ? "active-review-box" : ""}`}
        onClick={() => setRating(star)}
        onMouseEnter={() => setHover(star)}
        onMouseLeave={() => setHover(0)}
        role="button"
        tabIndex={0}
        aria-label={`Star ${star} of 5`}
      >
        {star <= (hover || rating) ? '★' : '☆'}
      </span>
    ))}
  </div>

  <p className="current-rating">{rating ? `${rating}/5 stars` : "Hover & click to rate"}</p>
  
  <button className="accept-btn-task" onClick={handleSubmit}>
    Submit Rating
  </button>
</>

        ) : (
          <>
            <h2 className="task-heading">Task Details</h2>

            <div className="task-field">
              <span className="task-label">Skills Required</span>
              <div className="task-value">{request.skills}</div>
            </div>

            <div className="task-field">
              <span className="task-label">Expectation / Description</span>
              <div className="task-value task-value--description">
                {request.expectations}
              </div>
            </div>

            <div className="task-field">
              <span className="task-label">Deadline</span>
              <div className="task-value">{request.deadline}</div>
            </div>

            <div className="task-field">
              <span className="task-label">Credits Offered</span>
              <div className="task-value">{request.credits} Credits</div>
            </div>

            <button
              className="accept-btn-task"
              onClick={() => confirmreq(request._id)}
            >
              Confirm Task Completed
            </button>

            <button
              className="report-btn-task"
              onClick={() => goToChat(request.mentor.userId)}
            >
              Message
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default RequestDesc;
