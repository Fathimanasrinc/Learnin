import React from "react";
import "./RequestPage.css";

const RequestPage = () => {
  const acceptedRequests = [
    {
      name: "Alice Smith",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      deadline: "2026-01-15 12:00 PM"
    },
    {
      name: "John Doe",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      deadline: "2026-01-18 03:00 PM"
    }
  ];

  const pendingRequests = [
    {
      name: "Sophia Lee",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      name: "Mark Johnson",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  ];

  return (
    <div className="request-container">
      {/* ACCEPTED SECTION */}
      <div className="request-section">
        <h2>Accepted</h2>
        <div className="request-list">
          {acceptedRequests.map((user, index) => (
            <div key={index} className="request-card">
              <div className="left-info">
                <img
                  src={user.image}
                  alt={user.name}
                  className="profile-img"
                />
                <span className="user-name">{user.name}</span>
              </div>
              <div className="right-info">
                <button className="message-btn">Message</button>
                <span className="deadline">{user.deadline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PENDING SECTION */}
      <div className="request-section">
        <h2>Pending</h2>
        <div className="request-list">
          {pendingRequests.map((user, index) => (
            <div key={index} className="request-card">
              <div className="left-info">
                <img
                  src={user.image}
                  alt={user.name}
                  className="profile-img"
                />
                <span className="user-name">{user.name}</span>
              </div>
              <div className="right-info">
                <button className="cancel-btn">Cancel</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestPage;


