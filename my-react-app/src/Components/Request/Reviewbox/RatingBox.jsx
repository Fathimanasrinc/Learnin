import { useState } from 'react';
import axios from 'axios';

function RatingBox({ user }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleSubmit = async () => {
    if (!rating) return alert("Select a rating");
    
    const token = localStorage.getItem("token");
    
    try {
      await axios.put(
        `http://localhost:5000/api/users/rate/${user._id}`,
        { rating },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert("Rating saved!");
    } catch (error) {
      alert("Failed to save rating");
    }
  };

  return (
    <div className="rating-box">
      <h3>Rateghdcgfdhgffhgx {user.name}</h3>
      
      <div className="stars">
  {[1, 2, 3, 4, 5].map((star) => (
    <span
      key={star}
      className={`star ${star <= (hover || rating) ? "active" : ""}`}
      onClick={() => setRating(star)}
      onMouseEnter={() => setHover(star)}
      onMouseLeave={() => setHover(0)}
    >
      {star <= (hover || rating) ? '★' : '☆'}
    </span>
  ))}
</div>

      
      <p>{rating ? `${rating}/5 stars` : "Select stars above"}</p>
      <button onClick={handleSubmit}>Submit Rating</button>
    </div>
  );
}

export default RatingBox;
