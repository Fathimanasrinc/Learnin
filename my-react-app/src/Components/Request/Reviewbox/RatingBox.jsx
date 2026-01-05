function RatingBox({ user }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleSubmit = async () => {
    if (!rating) return alert("Select a rating");

    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/users/rate/${user._id}`,
      { rating },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Rating saved");
  };

  return (
    <div>
      <h3>Rate {user.name}</h3>

      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            className={star <= (hover || rating) ? "active" : ""}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </span>
        ))}
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
