import React, { useState } from "react";
import "./Profile.css";
import {  useNavigate} from "react-router-dom";
const Profile = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [image, setImage] = useState("");
   const navigate = useNavigate();

  const handleSaveProfile = async () => {
        const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login again");
      return;
    }


    const response = await fetch("http://localhost:5000/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        bio,
        skills: skills.split(","),
        image,
      }),
    });

    
    const data = await response.json();
    alert("Profile saved");
    navigate("/profile"); 
    
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Create Your Profile</h2>

        <input
          className="profile-input"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="profile-input"
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <input
          className="profile-input"
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <input
          className="profile-input"
          placeholder="Profile Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button className="profile-button" onClick={handleSaveProfile}>
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
