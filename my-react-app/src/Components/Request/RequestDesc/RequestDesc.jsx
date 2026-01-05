import React, { useState } from "react";
import "./RequestDesc.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RequestDesc({ request, onClose,confirm }) {
  const [req, setreq] = useState({ request });
  const [review, setreview] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
    const navigate = useNavigate();
   const goToChat = (id) => {
    console.log(id);
    if (!id._id) return;
    navigate(`/chat/${id}`);
  };

  const handleSubmit = async () => {
    if (!rating) return alert("Select a rating");

    const token = localStorage.getItem("token");
    console.log(rating)

    await axios.put(
      `http://localhost:5000/api/users/rate/${request.mentor.userId}`,
      { rating },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Rating saved");
    onClose()
  };

  const token = localStorage.getItem("token");
  console.log("TOKEN:", token);

  const confirmreq = async (requestId) => {
    const token = localStorage.getItem("token");
     await axios.put(
      `http://localhost:5000/api/users/credit/${requestId}`,
      { credits:request.credits },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

   
    
    if (confirm) {
      setreview(true);
    }
  };
  console.log(req);

  return (
    <div>
      {review && (
        <div className="review-box">
          <h3>Rate {request.mentor.name}</h3>

          <div className="stars-review-box">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={star <= (hover || rating) ? "active-review-box" : ""}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </span>
            ))}
          </div>

          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
      {!review && (
        <div style={styles.container}>
          <h2 style={styles.heading}>Task</h2>

          <div style={styles.field}>
            <label style={styles.label}>Skills Required</label>
            <p style={styles.value}>{req.request.skills}</p>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Expectation / Description</label>
            <p style={styles.value}>{req.request.expectations}</p>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Deadline</label>
            <p style={styles.value}>{req.request.deadline}</p>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Credits Offered</label>
            <p style={styles.value}>{req.request.credits} Credits</p>
          </div>
          <button
            className="accept-btn"
            onClick={() => confirmreq(request._id)}
          >
            {req.request.status === "completed" ||
            req.request.status === "accepted"
              ? "Confirm"
              : "delete"}{" "}
            task
          </button>
          <button
                  className="message-btn"
                  onClick={() => goToChat(request.mentor.userId)}
                >
                  Message
                </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "420px",
    marginTop: "80px",
    margin: "40px auto  ",
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
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  acceptBtn: {
    flex: 1,
    marginRight: "10px",
    padding: "10px",
    backgroundColor: "#4caf50",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "15px",
  },
  declineBtn: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#f44336",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "15px",
  },
};

export default RequestDesc;
