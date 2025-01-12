import React, { useEffect, useState } from "react";
import { fetchTrainers } from "../api/trainers";
import { Link, useNavigate } from "react-router-dom";

function TrainersPage() {
  const [trainers, setTrainers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadTrainers = async () => {
      try {
        const trainersList = await fetchTrainers();
        setTrainers(trainersList);
      } catch (err) {
        console.error("Error fetching trainers list:", err);
        setError("Failed to load trainers.");
      }
    };

    loadTrainers();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        backgroundColor: "#333333", // Ciemnoszare tło
        minHeight: "100vh",
        textAlign: "center",
        color: "#FFFFFF", // Biały tekst
      }}
    >
      {/* Przycisk powrotu */}
      <button
        onClick={() => navigate("/home")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "10px 15px",
          backgroundColor: "#FFCA28", // Żółty kolor
          color: "#000000", // Czarny tekst
          border: "none",
          borderRadius: "4px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Return
      </button>

      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#FFCA28" }}>Trainers</h1>

      {error && <p style={{ color: "#FF5252", fontWeight: "bold" }}>{error}</p>}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {trainers.map((trainer) => (
          <div
            key={trainer.trainer_id}
            style={{
              padding: "20px",
              backgroundColor: "#424242", // Jaśniejszy szary
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Mocniejszy cień
              width: "300px", // Stała szerokość elementu
              textAlign: "center",
              border: "1px solid #555", // Obramowanie
            }}
          >
            <h2 style={{ fontSize: "20px", margin: "10px 0", color: "#FFCA28" }}>
              {trainer.name} {trainer.surname}
            </h2>
            <p style={{ fontSize: "16px", color: "#FFFFFF" }}>
              <strong>Expertise:</strong> {trainer.expertise}
            </p>

            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "15px" }}>
              {/* Przycisk szczegółów */}
              <Link to={`/trainers/${trainer.trainer_id}`}>
                <button
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#FFCA28", // Żółty kolor
                    color: "#000000", // Czarny tekst
                    border: "none",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  View Details
                </button>
              </Link>

              {/* Przycisk rezerwacji */}
              <button
                style={{
                  padding: "10px 15px",
                  backgroundColor: "#FFCA28", // Żółty kolor
                  color: "#000000", // Czarny tekst
                  border: "none",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/reservations/${trainer.trainer_id}`)}
              >
                Book Training
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrainersPage;
