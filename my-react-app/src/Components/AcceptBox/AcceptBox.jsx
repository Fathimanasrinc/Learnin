import React, { useState } from "react";

const AcceptBox= () => {
  const [request] = useState({
    skills: "React, JavaScript, Git",
    description:
      "Looking for guidance to build a complete React project and understand best practices.",
    deadline: "2025-02-15",
    credits: 30,
  });

  const handleAccept = () => {
    alert("You have ACCEPTED this mentorship request ✅");
  };

  const handleDecline = () => {
    alert("You have DECLINED this mentorship request ❌");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Mentorship Request</h2>

      <div style={styles.field}>
        <label style={styles.label}>Skills Required</label>
        <p style={styles.value}>{request.skills}</p>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Expectation / Description</label>
        <p style={styles.value}>{request.description}</p>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Deadline</label>
        <p style={styles.value}>{request.deadline}</p>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Credits Offered</label>
        <p style={styles.value}>{request.credits} Credits</p>
      </div>

      <div style={styles.buttonGroup}>
        <button style={styles.acceptBtn} onClick={handleAccept}>
          Accept
        </button>
        <button style={styles.declineBtn} onClick={handleDecline}>
          Decline
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "420px",
    marginTop:"80px",
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

export default AcceptBox;
