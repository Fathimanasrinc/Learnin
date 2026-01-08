import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TasksPage.css";
import { useNavigate } from "react-router-dom";
import AcceptBox from "../../AcceptBox/AcceptBox"
import TaskDesc from "../TaskDesc/TaskDesc";


const TasksPage = () => {

const navigate = useNavigate();
     const [requestTasks, setRequests] = useState([]);
     const [acceptedTasks, setacceptedRequests] = useState([]);
     const [selectedRequest,setselectedRequest] =useState(false)
     const [showreqst,setshowrequest] = useState(null)
     const [taskbox,settask] = useState(false)
     const [shwtask,setshowtask] = useState(null)
     const [rprtbox,setreprt] = useState(false)
     const [shwrprt,setshowreprt] = useState(null)
      
    const token = localStorage.getItem("token");
    console.log("TOKEN:", token);

  
    const goToChat = (id) => {
    console.log(id)
    if(!id) return ;
    navigate(`/chat/${id}`);
  };
      useEffect(() => {
      const fetchacceeptedRequests = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/tasks/mytask",
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
            "http://localhost:5000/api/tasks/mypendingtasks",
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

    const acceptRequest = async (requestId) => {
  try {
    await axios.put(
      `http://localhost:5000/api/requests/accept/${requestId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Update UI
    setRequests(requestTasks.filter(r => r._id !== requestId));
    setacceptedRequests([...acceptedTasks, requestTasks.find(r => r._id === requestId)]);
  } catch (error) {
    console.error(error.response?.data || error.message);
    alert("Failed to accept request");
  }
};
const handleDelete = async (requestId) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/requests/${requestId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setRequests(requestTasks.filter(r => r._id !== requestId));
  } catch (error) {
    console.error(error.response?.data || error.message);
    alert("Failed to delete request");
  }
};

const showbox =(rqst) =>{
  setselectedRequest(true);
  setshowrequest(rqst);
}
const showtask =(task)=>{
  settask(true);
  setshowtask(task)
}

  return (
    <div className="tasks-container">
      {/* LEFT PART - ACCEPTED */}
      <div className="tasks-section accepted">
        <h2>Accepted</h2>
        {acceptedTasks.map((task) => (
          <div onClick={()=>showtask(task)}  key={task.id} className="task-box">
            <div className="profile-name">
              <img
                src={task.learner.image}
                alt={task.learner.name}
                className="profile-image-pic"
              />
              <span className="name">{task.skills}</span>
            </div>
            <div className="task-actions">
              <button className="message-btn"  onClick={() => goToChat(task.learner.userId)} >Message</button>
              <span className="deadline">{task.deadline}</span>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT PART - REQUEST */}
      <div className="tasks-section request">
        <h2>Request</h2>
        {requestTasks.map((task) => (
          <div onClick={()=>showbox(task)} key={task.id} className="task-box">
            <div className="profile-name">
              <img
                src={task.learner.profile}
                alt={task.learner.name}
                className="profile-image-pic"
              />
              <span className="name">{task.skills}</span>
            </div>
            <div className="task-actions request-actions">
              <button className="accept-btn" onClick={() => acceptRequest(task._id)}>Accept</button>
              <button className="decline-btn" onClick={() => handleDelete(task._id)}>Decline</button>
            </div>
          </div>
        ))}
      </div>
      {selectedRequest && 
  <AcceptBox
    request={showreqst} onClose={() => setselectedRequest(false)} 
  />
}
 {taskbox && 
  <TaskDesc
    request={shwtask} onClose={() => setshowtask(false)} 
  />
}
    </div>
  );
};

export default TasksPage;

