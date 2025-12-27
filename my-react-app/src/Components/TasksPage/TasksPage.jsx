import React from "react";
import "./TasksPage.css";

const TasksPage = () => {
  const acceptedTasks = [
    {
      id: 1,
      name: "Alice",
      profile: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",
      deadline: "2025-01-05 18:00",
    },
    {
      id: 2,
      name: "Bob",
      profile: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
      deadline: "2025-01-06 12:00",
    },
  ];

  const requestTasks = [
    {
      id: 1,
      name: "Charlie",
      profile: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    },
    {
      id: 2,
      name: "David",
      profile: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    },
  ];

  return (
    <div className="tasks-container">
      {/* LEFT PART - ACCEPTED */}
      <div className="tasks-section accepted">
        <h2>Accepted</h2>
        {acceptedTasks.map((task) => (
          <div key={task.id} className="task-box">
            <div className="profile-name">
              <img
                src={task.profile}
                alt={task.name}
                className="profile-image"
              />
              <span className="name">{task.name}</span>
            </div>
            <div className="task-actions">
              <button className="message-btn">Message</button>
              <span className="deadline">{task.deadline}</span>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT PART - REQUEST */}
      <div className="tasks-section request">
        <h2>Request</h2>
        {requestTasks.map((task) => (
          <div key={task.id} className="task-box">
            <div className="profile-name">
              <img
                src={task.profile}
                alt={task.name}
                className="profile-image"
              />
              <span className="name">{task.name}</span>
            </div>
            <div className="task-actions request-actions">
              <button className="accept-btn">Accept</button>
              <button className="decline-btn">Decline</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;

