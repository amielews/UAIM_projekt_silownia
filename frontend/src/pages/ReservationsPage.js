import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useReservations } from "../components/Reservations/MakeReservation";

function ReservationsPage() {
  const { trainerId } = useParams();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrf_access_token="))
      ?.split("=")[1];
    setIsLoggedIn(!!csrfToken);
  }, []);

  const { slots, message, confirmingSlot, setConfirmingSlot, handleConfirm } =
    useReservations(trainerId, isLoggedIn);

  if (!isLoggedIn) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#333333",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          color: "#FFFFFF",
        }}
      >
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
        <h1 style={{ marginTop: "50px", color: "#FFCA28" }}>Reservations</h1>
        <p style={{ color: "#FF5252", fontWeight: "bold" }}>
          Please log in to make a reservation.
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
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        backgroundColor: "#333333",
        textAlign: "center",
        height: "100vh",
        overflow: "auto",
        position: "relative",
        color: "#FFFFFF",
      }}
    >
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

      <h1 style={{ marginTop: "30px", color: "#FFCA28" }}>Available Slots</h1>
      {message && (
        <p
          style={{
            color: message.includes("successful") ? "#4CAF50" : "#FF5252",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "left",
        }}
      >
        {slots.map((slot) => (
          <li
            key={slot.start}
            style={{
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: "#424242",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#FFFFFF",
            }}
          >
            <span>{`${slot.start} - ${slot.end}`}</span>
            {confirmingSlot === slot.start ? (
              <button
                onClick={() => handleConfirm(slot)}
                style={{
                  padding: "10px 15px",
                  backgroundColor: "#4CAF50",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Confirm
              </button>
            ) : (
              <button
                onClick={() => setConfirmingSlot(slot.start)}
                style={{
                  padding: "10px 15px",
                  backgroundColor: slot.is_booked ? "#FF5252" : "#FFCA28",
                  color: "#000000",
                  border: "none",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {slot.is_booked ? "Cancel Reservation" : "Book Slot"}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReservationsPage;
