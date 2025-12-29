import React from "react";
import "./ProfilePage.css";

const ProfilePage = () => {
  const rating = 4;

  const profileImage =
    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe";
  const starImage =
    "https://cdn-icons-png.flaticon.com/512/1828/1828884.png";

  return (
    <div className="profile-container">
      {/* LEFT SIDE */}
      <div className="left-section">
        <div className="image-wrapper">
          <img src={profileImage} alt="Profile" className="profile-page-image" />
          <div className="credit-circle">
            <span>120</span>
            <small>Credits</small>
          </div>
        </div>

        <h2 className="name">John Doe</h2>

        <div className="stars">
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              src={starImage}
              alt="star"
              className={i < rating ? "star active" : "star"}
            />
          ))}
        </div>

        <button className="review-btn">Review</button>
      </div>

      {/* RIGHT SIDE */}
      <div className="right-section">
        <h3>Bio</h3>
        <p className="bio">
          Frontend developer passionate about creating modern and clean user
          interfaces with React.
        </p>

        <h3>Skills</h3>
        <ul className="skills">
          <li>React</li>
          <li>JavaScript</li>
          <li>CSS</li>
          <li>UI Design</li>
        </ul>

        <button className="message-btn">Message</button>
      </div>
    </div>
  );
};

export default ProfilePage;
