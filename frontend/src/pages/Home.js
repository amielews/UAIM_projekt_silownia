import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../api/auth";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrf_access_token="))
      ?.split("=")[1];

    setIsLoggedIn(!!csrfToken);

    // Usunięcie paska przewijania na "siłę"
    document.body.style.overflow = "hidden";

    // Przywrócenie domyślnego stylu po opuszczeniu strony
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logout successful");
      navigate("/login");
    } catch (error) {
      alert(`Logout failed: ${error.message}`);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        backgroundColor: "#333333",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        color: "#f5f5f5",
      }}
    >
      <h1 style={{ fontSize: "36px", marginBottom: "30px", marginTop: "20px" }}>
        Welcome to Homepage
      </h1>

      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {!isLoggedIn ? (
          <>
            <p style={{ marginRight: "10px", fontWeight: "bold" }}>
              Login to unlock all options
            </p>
            <button
              onClick={() => navigate("/login")}
              style={{
                padding: "10px 15px",
                backgroundColor: "#FFCA28",
                color: "#000",
                border: "none",
                borderRadius: "4px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 15px",
              backgroundColor: "#FFCA28",
              color: "#000",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
          gap: "15px",
        }}
      >
        <Link to="/trainers">
          <button
            style={{
              padding: "15px 30px",
              backgroundColor: "#FFCA28",
              color: "#000",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "18px",
              cursor: "pointer",
              width: "200px",
            }}
          >
            Trainers
          </button>
        </Link>
        <Link to="/history">
          <button
            style={{
              padding: "15px 30px",
              backgroundColor: "#FFCA28",
              color: "#000",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "18px",
              cursor: "pointer",
              width: "200px",
            }}
          >
            Training History
          </button>
        </Link>
        <Link to="/services">
          <button
            style={{
              padding: "15px 30px",
              backgroundColor: "#FFCA28",
              color: "#000",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "18px",
              cursor: "pointer",
              width: "200px",
            }}
          >
            Services
          </button>
        </Link>
      </div>

      <div
        style={{
          marginTop: "40px",
          width: "60%",
          backgroundColor: "#424242",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        <p style={{ fontSize: "18px", marginBottom: "10px" }}>
          "Strength does not come from winning. Your struggles develop your
          strengths. When you go through hardships and decide not to surrender,
          that is strength."
        </p>
        <p
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#FFCA28",
          }}
        >
          Arnold Schwarzenegger
        </p>
      </div>
    </div>
  );
}

export default Home;
