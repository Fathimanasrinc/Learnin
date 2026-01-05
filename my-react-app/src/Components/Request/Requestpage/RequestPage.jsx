import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./RequestPage.css";
import RequestDesc from "../RequestDesc/RequestDesc";

const RequestPage = () => {
  const navigate = useNavigate();

  const goToChat = (id) => {
    console.log(id);
    navigate(`/chat/${id}`);
  };
  const [pendingRequests, setRequests] = useState([]);
  const [acceptedRequests, setacceptedRequests] = useState([]);
  const [acceptedRequest, setacceptedRequest] = useState(false);
  const [showreqst, setshowrequest] = useState(null);
  const [pendingbox, setpending] = useState(false);
  const [shwpending, setshowpending] = useState(null);
  const [shwreviewbox, setreview] = useState(false);
  const [reviewbx, setreviewbx] = useState(null);

  const token = localStorage.getItem("token");
  console.log("TOKEN:", token);

  useEffect(() => {
    const fetchacceeptedRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/requests/myacceptedrequests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setacceptedRequests(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
        alert("Failed to load your requests");
      }
    };

    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/requests/myrequests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRequests(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
        alert("Failed to load your requests");
      }
    };
    fetchRequests();
    fetchacceeptedRequests();
  }, [token]);
  console.log(pendingRequests);
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:5000/api/requests/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete request");
        return;
      }

      // ✅ Remove deleted request from UI only if backend succeeds
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
      alert("Server error while deleting request");
    }
  };
  const showreq = (rqst) => {
    setacceptedRequest(true);
    setshowrequest(rqst);
  };
  const showpending = (rqst) => {
    setpending(true);
    setshowpending(rqst);
  };

  console.log(pendingRequests, "pendiiiiiii");

  return (
    <div className="request-container">
      {/* ACCEPTED SECTION */}
      <div className="request-section">
        <h2>Accepted</h2>
        <div className="request-list">
          {acceptedRequests.map((user, index) => (
            <div
              onClick={() => showreq( user)}
              key={index}
              className="request-card"
            >
              <div className="left-info">
                <img
                  src={user.mentor.image}
                  alt={user.mentor.name}
                  className="profile-img"
                />
                <span className="user-name">{user.skills}</span>
              </div>
              <div className="right-info">
                <button
                  className="message-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToChat(user.mentor.userId);
                  }}
                >
                  Message
                </button>
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
            <div
              onClick={() => showpending( user)}
              key={index}
              className="request-card"
            >
              <div className="left-info">
                <img
                  src={user.mentor.image}
                  alt={user.mentor.name}
                  className="profile-img"
                />
                <span className="user-name">{user.skills}</span>
              </div>
              <div className="right-info">
                <button
                  className="cancel-btn"
                  onClick={() => handleDelete(user._id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {acceptedRequest && (
        <RequestDesc
          request={showreqst}
          confirm={true}
          onClose={() => setacceptedRequest(false)}
        />
      )}
      {pendingbox && (
        <RequestDesc
          confirm={false}
          request={shwpending}
          onClose={() => settask(false)}
        />
      )}
    </div>
  );
};

export default RequestPage;
