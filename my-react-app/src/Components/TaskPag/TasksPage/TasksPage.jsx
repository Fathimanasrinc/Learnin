import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TasksPage.css";
import { useNavigate } from "react-router-dom";
import AcceptBox from "../../AcceptBox/AcceptBox";
import TaskDesc from "../TaskDesc/TaskDesc";

const TasksPage = () => {
  const navigate = useNavigate();
  const [requestTasks, setRequests] = useState([]);
  const [acceptedTasks, setAcceptedRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(false);
  const [showRequest, setShowRequest] = useState(null);
  const [taskBox, setTask] = useState(false);
  const [showTask, setShowTask] = useState(null);
  const [mobileView, setMobileView] = useState("accepted"); // "accepted" or "request"

  const token = localStorage.getItem("token");

  const goToChat = (id) => {
    if (!id) return;
    navigate(`/chat/${id}`);
  };

  useEffect(() => {
    const fetchAcceptedRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/tasks/mytask",
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setAcceptedRequests(response.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
        alert("Failed to load your accepted tasks");
      }
    };

    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/tasks/mypendingtasks",
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setRequests(response.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
        alert("Failed to load your requests");
      }
    };

    fetchRequests();
    fetchAcceptedRequests();
  }, [token]);

  const acceptRequest = async (requestId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/requests/accept/${requestId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const accepted = requestTasks.find((r) => r._id === requestId);
      setRequests(requestTasks.filter((r) => r._id !== requestId));
      setAcceptedRequests([...acceptedTasks, accepted]);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Failed to accept request");
    }
  };

  const handleDelete = async (requestId) => {
          console.log(token);

     try{
          await axios.put(
          `http://localhost:5000/api/users/creditupdate/${requestId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } },
        );
        }
        catch(err){
           console.error(err);
          alert("Failed to update credits");
        }
    try {
      await axios.delete(`http://localhost:5000/api/requests/${requestId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(requestTasks.filter((r) => r._id !== requestId));
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Failed to delete request");
    }
    
  };

  const showBox = (req) => {
    setSelectedRequest(true);
    setShowRequest(req);
  };

  const showTaskBox = (task) => {
    setTask(true);
    setShowTask(task);
  };

  return (
    <div className="tasks-container">
      {/* MOBILE TOGGLE BUTTONS */}
      <div className="mobile-toggle">
        <button
          className={mobileView === "accepted" ? "active" : ""}
          onClick={() => setMobileView("accepted")}
        >
          Accepted
        </button>
        <button
          className={mobileView === "request" ? "active" : ""}
          onClick={() => setMobileView("request")}
        >
          Request
        </button>
      </div>

      {/* ACCEPTED TASKS */}
      <div
        className={`tasks-section accepted ${
          mobileView === "request" ? "hidden-mobile" : ""
        }`}
      >
        <h2>Accepted Tasks</h2>
        {acceptedTasks.length === 0 && (
          <p className="empty-msg">No accepted tasks</p>
        )}
        {acceptedTasks.map((task) => (
          <div
            onClick={() => showTaskBox(task)}
            key={task._id}
            className="task-box"
          >
            <div className="profile-name">
              <img
                src={task.learner.image}
                alt={task.learner.name}
                className="profile-image-pic"
              />
              <span className="name">{task.skills}</span>
            </div>
            <div className="task-actions">
              <button
                className="message-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  goToChat(task.learner.userId);
                }}
              >
                Message
              </button>
              <span className="deadline">{task.deadline}</span>
            </div>
          </div>
        ))}
      </div>

      {/* REQUEST TASKS */}
      <div
        className={`tasks-section request ${
          mobileView === "accepted" ? "hidden-mobile" : ""
        }`}
      >
        <h2>Pending Requests</h2>
        {requestTasks.length === 0 && (
          <p className="empty-msg">No pending requests</p>
        )}
        {requestTasks.map((task) => (
          <div
            onClick={() => showBox(task)}
            key={task._id}
            className="task-box"
          >
            <div className="profile-name">
              <img
                src={task.learner.profile}
                alt={task.learner.name}
                className="profile-image-pic"
              />
              <span className="name">{task.skills}</span>
            </div>
            <div className="task-actions request-actions">
              <button
                className="accept-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  acceptRequest(task._id);
                }}
              >
                Accept
              </button>
              <button
                className="decline-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(task._id);
                }}
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODALS */}
      {selectedRequest && (
        <AcceptBox
          request={showRequest}
          onClose={() => setSelectedRequest(false)}
          onAccept={acceptRequest}
          onDecline={handleDelete}
        />
      )}

      {taskBox && (
        <TaskDesc request={showTask} onClose={() => setTask(false)} />
      )}
    </div>
  );
};

export default TasksPage;
