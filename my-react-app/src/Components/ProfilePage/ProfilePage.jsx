import React, { useState } from "react";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [showReviews, setShowReviews] = useState(false);

  const rating = 4;

  const reviews = [
    {
      name: "Alice Smith",
      image:
        "https://randomuser.me/api/portraits/women/44.jpg",
      comment: "Excellent work quality and attention to detail."
    },
    {
      name: "Mark Johnson",
      image:
        "https://randomuser.me/api/portraits/men/32.jpg",
      comment: "Very responsive and professional."
    },
    {
      name: "Sophia Lee",
      image:
        "https://randomuser.me/api/portraits/women/68.jpg",
      comment: "Would definitely hire again!"
    }
  ];

  const skills = ["React", "JavaScript", "CSS", "UI Design"];

  return (
    <div className="profile-container">
      {/* LEFT SECTION */}
      <div className="left-section">
        <div className="image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1527980965255-d3b416303d12"
            alt="Profile"
            className="profile-pic-image"
          />
          <span className="credits">90</span>
        </div>

        <h2 className="username">John Doe</h2>

        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              className="star"
              src={
                i < rating
                  ? "https://cdn-icons-png.flaticon.com/512/616/616489.png"
                  : "https://cdn-icons-png.flaticon.com/512/616/616490.png"
              }
              alt="star"
            />
          ))}
        </div>

        <button
          className="review-btn"
          onClick={() => setShowReviews(!showReviews)}
        >
          {showReviews ? "Hide Reviews" : "View Reviews"}
        </button>

        {/* REVIEWS WITH PROFILE */}
        {showReviews && (
          <div className="reviews">
            {reviews.map((review, index) => (
              <div key={index} className="review-card">
                <img
                  src={review.image}
                  alt={review.name}
                  className="reviewer-img"
                />
                <div className="review-content">
                  <strong>{review.name}</strong>
                  <p>{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT SECTION */}
      <div className="right-section">
        <div className="top-content">
          <h3>Bio</h3>
          <p className="bio">
            Frontend developer focused on clean UI, React architecture,
            and scalable design systems.
          </p>

          <h3>Skills</h3>
          <ul className="skills">
            {skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>

        <button className="message-btn">Message</button>
      </div>
    </div>
  );
};

export default ProfilePage;






