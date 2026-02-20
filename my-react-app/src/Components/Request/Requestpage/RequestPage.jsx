import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RequestPage.css";
import RequestDesc from "../RequestDesc/RequestDesc";
import RequestToConfirm from "../RequestToConfirm/RequestToConfirm";

const RequestPage = () => {
  const navigate = useNavigate();

  const [pendingRequests, setRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  const [acceptedBox, setAcceptedBox] = useState(false);
  const [pendingBox, setPendingBox] = useState(false);

  const [selectedRequest, setSelectedRequest] = useState(null);

  const [mobileView, setMobileView] = useState("accepted"); // accepted | pending

  const token = localStorage.getItem("token");

  const goToChat = (id) => {
    if (!id) return;
    navigate(`/chat/${id}`);
  };

  useEffect(() => {
    const fetchAccepted = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/requests/myacceptedrequests",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setAcceptedRequests(res.data);
      } catch (err) {
        console.error(err);
      }
    };

   

    const fetchPending = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/requests/myrequests",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setRequests(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAccepted();
    fetchPending();
  }, [token]);

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
    } catch (err) {
      console.error(err);
      alert("Failed to cancel request");
    }

  
  };

  const openAccepted = (req) => {
    setSelectedRequest(req);
    setAcceptedBox(true);
  };

  const openPending = (req) => {
    setSelectedRequest(req);
    setPendingBox(true);
  };
   const removeAcceptedRequest = (id) => {
      setAcceptedRequests((prev) => prev.filter((r) => r._id !== id));
    };

  return (
    <div className="request-container">
      {/* MOBILE TOGGLE */}
      <div className="mobile-toggle">
        <button
          className={mobileView === "accepted" ? "active" : ""}
          onClick={() => setMobileView("accepted")}
        >
          Accepted
        </button>
        <button
          className={mobileView === "pending" ? "active" : ""}
          onClick={() => setMobileView("pending")}
        >
          Pending
        </button>
      </div>

      {/* ACCEPTED SECTION */}
      <div
        className={`request-section ${
          mobileView === "pending" ? "hidden-mobile" : ""
        }`}
      >
        <h2>Accepted</h2>

        {acceptedRequests.length === 0 && (
          <p className="empty-msg">No accepted requests</p>
        )}

        <div className="request-list">
          {acceptedRequests.map((req) => (
            <div
              key={req._id}
              className="request-cards"
              onClick={() => openAccepted(req)}
            >
              <div className="left-info">
                <img
                  src={req.mentor.image}
                  alt={req.mentor.name}
                  className="profile-img"
                />
                <span className="user-name">{req.skills}</span>
              </div>

              <div className="right-info">
                <button
                  className="message-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToChat(req.mentor.userId);
                  }}
                >
                  Message
                </button>
                <span className="deadline">{req.deadline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PENDING SECTION */}
      <div
        className={`request-section ${
          mobileView === "accepted" ? "hidden-mobile" : ""
        }`}
      >
        <h2>Pending</h2>

        {pendingRequests.length === 0 && (
          <p className="empty-msg">No pending requests</p>
        )}

        <div className="request-list">
          {pendingRequests.map((req) => (
            <div
              key={req._id}
              className="request-cards"
              onClick={() => openPending(req)}
            >
              <div className="left-info">
                <img
                  src={req.mentor.image}
                  alt={req.mentor.name}
                  className="profile-img"
                />
                <span className="user-name">{req.skills}</span>
              </div>

              <div className="right-info">
                <button
                  className="cancel-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(req._id);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODALS */}
      {acceptedBox && (
        <RequestDesc
          request={selectedRequest}
          confirm={true}
          onClose={() => setAcceptedBox(false)}
          onTaskComplete={removeAcceptedRequest}
        />
      )}

      {pendingBox && (
        <RequestToConfirm
          request={selectedRequest}
          confirm={false}
          onClose={() => setPendingBox(false)}
          setRequests={setRequests}
        />
      )}
    </div>
  );
};

export default RequestPage;
