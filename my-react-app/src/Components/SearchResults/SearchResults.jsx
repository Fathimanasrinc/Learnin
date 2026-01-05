import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RequstBox from "../ProfilePage/RequestBox/RequestBox";

function SearchResults() {
  const [showRequestBox, setshowRequestBox] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const navigate = useNavigate();

  const { state } = useLocation();
  const search = state?.search;
  const [results, setResults] = useState([]);
  console.log(search);
  useEffect(() => {
    console.log(search);
    const fetchProfiles = async () => {

      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/search/${search}`
        );

        setResults(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfiles();
  }, [search]);
  const goToProfile = (user) => {
    navigate(`/ProfilePage/${user._id}`);
  };

  const handleClick = (user) => {
    setSelectedUser(user); // pass data
    setshowRequestBox(true); // show component
  };

  if (!results) return <p>Loading users...</p>;
  return (
    <div className="card-grid">
      {results.map((user) => (
        <div className="card" key={user.id}>
          {/* Top content */}
          <div className="card-content">
            {/* Left: image + name + rating */}
            <div className="user-left">
              <div className="avatar">
                {user.image ? (
                  <img src={user.image} alt={user.name} />
                ) : (
                  <span>{user.name.charAt(0).toUpperCase()}</span>
                )}
              </div>

              <p className="username">{user.name}</p>

              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= user.starCount ? "star filled" : "star"}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* Right: skills */}
            <div className="user-right">
              <div className="skills">
                {user.skills?.slice(0, 2).map((skill, index) => (
                  <span className="skill-pill" key={index}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom actions */}
          <div className="card-bottom">
            <button className="action-btn" onClick={() => goToProfile(user)}>
              View Profile
            </button>
            <button
              className="action-btn primary"
              onClick={() => handleClick(user)}
            >
              Request
            </button>
          </div>
        </div>
      ))}
      {showRequestBox && (
        <RequstBox
          mentor={selectedUser}
          onClose={() => setshowRequestBox(false)}
        />
      )}
    </div>
  );
}

export default SearchResults;
