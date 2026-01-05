
import "./ProfilePage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [showReviews, setShowReviews] = useState(false);
 
  const { id } = useParams(); // get ID from URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
 

  const profileImage = "https://randomuser.me/api/portraits/men/75.jpg"; // default image

  

 useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/users/${id}`
        );
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="profile-container">
      {/* LEFT SECTION */}
      <div className="left-section">
        <div className="image-wrapper">
          <img 
             src={user.image || profileImage} 
            alt="Profile" 
            className="profile-page-image" 
          />
          <div className="credit-circle">
            <span>{user.credit}</span>
            <small>Credits</small>
          </div>
        </div>

        <h2 className="username">{user.name}</h2>

        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              className="star"
              src={
                i < user.rating
                  ? "https://cdn-icons-png.flaticon.com/512/616/616489.png"
                  : "https://cdn-icons-png.flaticon.com/512/616/616490.png"
              }
              alt="star"
            />
          ))}
        </div>


       
      </div>

      {/* RIGHT SECTION */}
      <div className="right-section">
        <div className="top-content">
          <h3>Bio</h3>
          <p className="bio">
           {user.bio}
          </p>

          <h3>Skills</h3>
          <div className="skills">
                {user.skills?.slice(0, 2).map((skill, index) => (
                  <span className="skill-pill" key={index}>
                    {skill}
                  </span>
                ))}
              </div>
        </div>

        <button className="message-btn">Message</button>
      </div>
    </div>
  );
};

export default ProfilePage;



