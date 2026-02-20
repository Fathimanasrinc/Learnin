
import "./ProfilePage.css";
import RequestBox from "./RequestBox/RequestBox"; 
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
const [showRequestBox, setshowRequestBox] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

 
  const { id } = useParams(); // get ID from URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
 

  const profileImage = "https://static.vecteezy.com/system/resources/previews/036/280/651/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"; // default image

  

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
  
  const handleClick = (user) => {
    setSelectedUser(user); // pass data
    setshowRequestBox(true); // show component
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="profile-container-profilepage">
  {/* LEFT SECTION */}
  <div className="left-section-profilepage">
    <div className="image-wrapper-profilepage">
      <img 
        src={user.image || profileImage} 
        alt="Profile" 
        className="profile-page-image-profilepage" 
      />
      <div className="credit-circle-profilepage">
        <span>{user.credits}</span>
        <small>Credits</small>
      </div>
    </div>

    <h2 className="username-profilepage">{user.name}</h2>

    <div className="rating-profilepage">
      {[...Array(5)].map((_, i) => (
        <img
          key={i}
          className="star-profilepage"
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
  <div className="right-section-profilepage">
    <div className="top-content-profilepage">
      <h3>Bio</h3>
      <p className="bio-profilepage">{user.bio}</p>

      <h3>Skills</h3>
      <div className="skills-profilepage">
        {user.skills?.map((skill, index) => (
          <span className="skill-pill-profilepage" key={index}>
            {skill}
          </span>
        ))}
      </div>
    </div>

    <button className="message-btn-profilepage" onClick={() => handleClick(user)}>Request</button>
  </div>
   {showRequestBox && (
          <RequestBox
            mentor={selectedUser}
            onClose={() => setshowRequestBox(false)}
          />
        )}
</div>

  );
};

export default ProfilePage;



