import React from "react";
import { useNavigate } from "react-router-dom";
import { useTrainingHistory } from "../components/History/TrainingHistory";

function HistoryPage() {
  const { history, message } = useTrainingHistory();
  const navigate = useNavigate();

  const isLoggedIn = !!document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrf_access_token="))
    ?.split("=")[1];

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
          onClick={() => navigate("/home")}
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
        <h1 style={{ color: "#FFCA28" }}>Training History</h1>
        <p style={{ color: "#FF5252", fontWeight: "bold" }}>
          Please log in to view your training history.
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
        onClick={() => navigate("/home")}
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

      <h1 style={{ marginBottom: "20px", color: "#FFCA28" }}>
        Training History
      </h1>
      {message ? (
        <p style={{ color: "#FF5252", fontWeight: "bold" }}>{message}</p>
      ) : (
        <table
          style={{
            width: "60%",
            margin: "20px auto",
            borderCollapse: "collapse",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            tableLayout: "fixed",
            backgroundColor: "#424242",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#FFCA28", color: "#000000" }}>
              <th
                style={{
                  border: "2px solid #ddd",
                  padding: "12px",
                  textAlign: "center",
                  width: "50%",
                }}
              >
                Date
              </th>
              <th
                style={{
                  border: "2px solid #ddd",
                  padding: "12px",
                  textAlign: "center",
                  width: "50%",
                }}
              >
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr key={entry.training_id}>
                <td
                  style={{
                    border: "2px solid #ddd",
                    padding: "12px",
                    textAlign: "center",
                    color: "#FFFFFF",
                  }}
                >
                  {new Date(entry.date).toLocaleString()}
                </td>
                <td
                  style={{
                    border: "2px solid #ddd",
                    padding: "12px",
                    textAlign: "center",
                    color: "#FFFFFF",
                  }}
                >
                  {entry.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HistoryPage;
