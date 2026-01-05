import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AcceptBox= ({ request,onClose}) => {
  const token = localStorage.getItem("token");
    console.log("TOKEN:", token);
    const acceptRequest = async (requestId) => {
  try {
    await axios.put(
      `http://localhost:5000/api/requests/accept/${requestId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Update UI
   
  } catch (error) {
    console.error(error.response?.data || error.message);
    alert("Failed to accept request");
  }
  onClose();
};
const handleDelete = async (requestId) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/requests/${requestId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error(error.response?.data || error.message);
    alert("Failed to delete request");
  }
  onClose();
};
 
console.log({request},"myrequest")
  if (!request) return <p>Loading...</p>;
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Mentorship Request</h2>

      <div style={styles.field}>
        <label style={styles.label}>Skills Required</label>
        <p style={styles.value}>{request.skills}</p>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Expectation / Description</label>
        <p style={styles.value}>{request.
expectations}</p>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Deadline</label>
        <p style={styles.value}>{request.deadline}</p>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Credits Offered</label>
        <p style={styles.value}>{request.credits} Credits</p>
      </div>
<button className="accept-btn" onClick={() => acceptRequest(request._id)}>Accept</button>
 <button className="decline-btn" onClick={() => handleDelete(request._id)}>Decline</button>
     
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
