import React, { useState, useEffect } from "react";
import "./Myprofilepage.css";

const Myprofilepage = () => {
  const [editMode, setEditMode] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const ProfileRow = ({ label, value, editMode, onChange, textarea }) => (
    <div className="profile-row">
      <label>{label}</label>

      {editMode ? (
        textarea ? (
          <textarea value={value} onChange={onChange} />
        ) : (
          <input value={value} onChange={onChange} />
        )
      ) : (
        <p>{value}</p>
      )}
    </div>
  );

  const DEFAULT_PROFILE_IMAGE =
    "https://cdn.vectorstock.com/i/500p/71/90/blank-avatar-placeholder-icon-vector-30257190.jpg";
  const [profile, setProfile] = useState("");
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/myprofile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setProfile(data);
    };

    fetchProfile();
  }, []);

  const handleSkillChange = (index, value) => {
    const updated = [...profile.skills];
    updated[index] = value;
    setProfile({ ...profile, skills: updated });
  };

  const deleteSkill = (index) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((_, i) => i !== index),
    });
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setProfile({
      ...profile,
      skills: [...profile.skills, newSkill],
    });
    setNewSkill("");
  };
  const saveProfile = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/myprofile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profile),
    });

    const data = await res.json();
    setProfile(data);
    console.log(data);
    alert("Profile updated successfully");
  };

  if (!profile) {
    return <div className="profile-container">Loading profile...</div>;
  }
  return (
    <div className="profile-main">
      <h3 className="profile-title">Profile</h3>

      <div className="profile-card-new">
        {/* LEFT SIDE */}
        <div className="profile-left-new">
          <div className="profile-image-box">
            <img src={profile.image || DEFAULT_PROFILE_IMAGE} alt="Profile" />
          </div>

          {editMode && (
            <input
              className="input-light"
              placeholder="Profile image URL"
              value={profile.image}
              onChange={(e) =>
                setProfile({ ...profile, image: e.target.value })
              }
            />
          )}

          {/* RATING */}
          <div className="profile-row">
            <div className="rating-new">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  className="star-new"
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
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="profile-right-new">
          {/* NAME */}
          <ProfileRow
            label="Name"
            value={profile.name}
            editMode={editMode}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />

          {/* BIO */}
          <ProfileRow
            label="Bio"
            value={profile.bio}
            editMode={editMode}
            textarea
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          />

          {/* SKILLS */}
          <div className="profile-row">
            <label>Skills</label>

            <div className="skills-new">
              {profile.skills.map((skill, i) => (
                <span className="skill-chip-new" key={i}>
                  {editMode ? (
                    <>
                      <input
                        value={skill}
                        onChange={(e) => handleSkillChange(i, e.target.value)}
                      />
                      <span
                        className="remove-skill"
                        onClick={() => deleteSkill(i)}
                      >
                        ✕
                      </span>
                    </>
                  ) : (
                    skill
                  )}
                </span>
              ))}
            </div>

            {editMode && (
              <div className="add-skill-new">
                <input
                  placeholder="Add skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
                <button onClick={addSkill}>Add</button>
              </div>
            )}
          </div>

          {/* SAVE BUTTON */}
          <button
            className="edit-btn-new"
            onClick={async () => {
              if (editMode) await saveProfile();
              setEditMode(!editMode);
            }}
          >
            {editMode ? "Save Profile" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Myprofilepage;
