import React, { useState } from "react";
import "./Myprofilepage.css";

const Myprofilepage = () => {
  const [editMode, setEditMode] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const [profile, setProfile] = useState({
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    credits: 90,
    name: "John Doe",
    rating: 4,
    bio:
      "Frontend developer focused on clean UI, React architecture, and scalable design systems.",
    skills: ["React", "JavaScript", "CSS", "UI Design"]
  });

  const reviews = [
    {
      name: "Alice Smith",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      comment: "Excellent work quality and attention to detail."
    },
    {
      name: "Mark Johnson",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      comment: "Very responsive and professional."
    }
  ];

  const handleSkillChange = (index, value) => {
    const updated = [...profile.skills];
    updated[index] = value;
    setProfile({ ...profile, skills: updated });
  };

  const deleteSkill = (index) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((_, i) => i !== index)
    });
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setProfile({
      ...profile,
      skills: [...profile.skills, newSkill]
    });
    setNewSkill("");
  };

  return (
    <div className="profile-container">
      {/* LEFT SECTION */}
      <div className="left-section">
        <button
          className="edit-toggle"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Save" : "Edit Profile"}
        </button>

        <div className="image-wrapper">
          <img src={profile.image} alt="Profile" className="profile-image" />
          <span className="credits">
            {editMode ? (
              <input
                type="number"
                value={profile.credits}
                onChange={(e) =>
                  setProfile({ ...profile, credits: e.target.value })
                }
                className="credit-input"
              />
            ) : (
              profile.credits
            )}
          </span>
        </div>

        {editMode && (
          <input
            className="input-field"
            value={profile.image}
            placeholder="Profile image URL"
            onChange={(e) =>
              setProfile({ ...profile, image: e.target.value })
            }
          />
        )}

        {editMode ? (
          <input
            className="input-field"
            value={profile.name}
            onChange={(e) =>
              setProfile({ ...profile, name: e.target.value })
            }
          />
        ) : (
          <h2 className="username">{profile.name}</h2>
        )}

        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              className="star"
              src={
                i < profile.rating
                  ? "https://cdn-icons-png.flaticon.com/512/616/616489.png"
                  : "https://cdn-icons-png.flaticon.com/512/616/616490.png"
              }
              alt="star"
              onClick={() =>
                editMode && setProfile({ ...profile, rating: i + 1 })
              }
            />
          ))}
        </div>

        {/* REVIEWS (READ-ONLY) */}
        <div className="reviews">
          {reviews.map((review, i) => (
            <div key={i} className="review-card">
              <img
                src={review.image}
                alt={review.name}
                className="reviewer-img"
              />
              <div>
                <strong>{review.name}</strong>
                <p>{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="right-section">
        <div className="top-content">
          <h3>Bio</h3>
          {editMode ? (
            <textarea
              className="textarea"
              value={profile.bio}
              onChange={(e) =>
                setProfile({ ...profile, bio: e.target.value })
              }
            />
          ) : (
            <p className="bio">{profile.bio}</p>
          )}

          <h3>Skills</h3>
          <ul className="skills">
            {profile.skills.map((skill, i) => (
              <li key={i} className="skill-item">
                {editMode ? (
                  <>
                    <input
                      value={skill}
                      onChange={(e) =>
                        handleSkillChange(i, e.target.value)
                      }
                      className="skill-input"
                    />
                    <button
                      className="delete-skill-btn"
                      onClick={() => deleteSkill(i)}
                    >
                      ✕
                    </button>
                  </>
                ) : (
                  skill
                )}
              </li>
            ))}
          </ul>

          {/* ADD SKILL */}
          {editMode && (
            <div className="add-skill">
              <input
                className="skill-input"
                placeholder="Add new skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <button className="add-skill-btn" onClick={addSkill}>
                Add
              </button>
            </div>
          )}
        </div>

        <button className="message-btn">Message</button>
      </div>
    </div>
  );
};

export default Myprofilepage;

