import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTrainerRatings, addTrainerRating } from "../api/trainers";

function TrainerDetailsPage() {
  const { trainerId } = useParams();
  const navigate = useNavigate();
  const [ratings, setRatings] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrf_access_token="))
      ?.split("=")[1];
    setIsLoggedIn(!!csrfToken);
  }, []);

  useEffect(() => {
    const loadTrainerData = async () => {
      try {
        const ratingsData = await fetchTrainerRatings(trainerId);
        setRatings(ratingsData);
      } catch (error) {
        console.error("Error loading trainer data:", error);
      }
    };
    loadTrainerData();
  }, [trainerId]);

  const handleAddRating = async (e) => {
    e.preventDefault();
    try {
      await addTrainerRating(trainerId, { rating, comment });
      setMessage("Rating added successfully!");
      const newRating = {
        comment,
        rating,
        created_at: new Date().toISOString(),
      };
      setRatings([...ratings, newRating]);
      setComment("");
      setRating("");
    } catch (error) {
      setMessage("You cannot add another comment to this trainer.");
      console.error("Error adding rating:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year}, ${hours}:${minutes}`;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial",
        backgroundColor: "#333333",
        textAlign: "center",
        position: "relative",
        color: "#FFFFFF",
      }}
    >
      {/* Przycisk powrotu */}
      <button
        onClick={() => navigate("/trainers")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "10px 15px",
          backgroundColor: "#FFCA28",
          color: "#000000",
          border: "none",
          borderRadius: "4px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Return
      </button>

      <h1 style={{ color: "#FFCA28" }}>Trainer Details</h1>

      {/* Formularz lub komunikat */}
      <h2 style={{ color: "#FFCA28" }}>Add a Rating</h2>
      {isLoggedIn ? (
        <form
          onSubmit={handleAddRating}
          style={{
            display: "inline-block",
            textAlign: "left",
            backgroundColor: "#424242",
            padding: "30px 60px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
            marginBottom: "20px",
            color: "#FFFFFF",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="commentInput" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
              Comment:
            </label>
            <input
              id="commentInput"
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #555",
                boxSizing: "border-box",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="ratingInput" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
              Rating (1-5):
            </label>
            <input
              id="ratingInput"
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #555",
                boxSizing: "border-box",
              }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              backgroundColor: "#FFCA28",
              color: "#000000",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
      ) : (
        <div>
          <p
            style={{
              color: "#FF5252",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Please log in to add a comment and rating.
          </p>
          <button
            onClick={() => navigate("/login")}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#FFCA28",
              color: "#000000",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Log In
          </button>
        </div>
      )}

      {message && (
        <p
          style={{
            marginTop: "10px",
            color: message.includes("successfully") ? "#4CAF50" : "#FF5252",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}

      <h2 style={{ color: "#FFCA28" }}>Ratings</h2>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          textAlign: "center",
        }}
      >
        {ratings.map((rating, index) => (
          <li
            key={index}
            style={{
              marginBottom: "10px",
              borderBottom: "1px solid #555",
              paddingBottom: "5px",
              fontSize: "16px",
            }}
          >
            <span style={{ fontWeight: "bold", color: "#FFCA28" }}>
              {formatDate(rating.created_at)}
            </span>
            ; <span>{rating.comment}</span>;{" "}
            <span style={{ fontWeight: "bold", color: "#FFCA28" }}>
              {rating.rating}/5
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrainerDetailsPage;
