import React, { useState, useEffect } from "react";
import { handleLogin } from "../components/Auth/Login.js";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleLogin(email, password, setMessage);
    if (result) {
      navigate("/home");
    }
  };

  const handleGuestLogin = () => {
    navigate("/home");
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        backgroundColor: "#333333", // Ciemnoszare tło
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#424242", // Trochę jaśniejsze szare
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Mocniejszy cień
          width: "400px",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "20px", color: "#FFCA28" }}>Login</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
                color: "#FFFFFF",
              }}
            >
              Email:
            </label>
            <input
              id="email" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "#555555",
                color: "#FFFFFF",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="password" 
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
                color: "#FFFFFF",
              }}
            >
              Password:
            </label>
            <input
              id="password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "#555555",
                color: "#FFFFFF",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            type="submit"
            data-testid="login-button"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#FFCA28", // Żółte przyciski
              color: "#000000", // Czarny tekst
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            Login
          </button>
        </form>
        <button
          type="button"
          onClick={handleGuestLogin}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#757575",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "15px",
          }}
        >
          Enter without login
        </button>
        {message && (
          <p
            style={{
              color: message.startsWith("Login failed") ? "#FF5252" : "#69F0AE",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}
        <p style={{ color: "#FFFFFF" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#FFCA28", fontWeight: "bold" }}>
            Register here
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default LoginPage;