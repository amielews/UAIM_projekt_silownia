import React from "react";
import { useServices } from "../components/Services/Services";
import { useNavigate } from "react-router-dom";

function ServicesPage() {
  const { services, error } = useServices();
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        backgroundColor: "#333333",
        minHeight: "100vh",
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

      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#FFCA28" }}>
        Services
      </h1>
      {error && (
        <p style={{ color: "#FF5252", textAlign: "center", fontWeight: "bold" }}>
          {error}
        </p>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {services.map((service) => (
          <div
            key={service.service_id}
            style={{
              width: "300px",
              padding: "15px",
              backgroundColor: "#424242",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              textAlign: "center",
              border: "1px solid #555",
            }}
          >
            <h3 style={{ color: "#FFCA28" }}>{service.name}</h3>
            <p>{service.description}</p>
            <p style={{ fontWeight: "bold", color: "#FFCA28" }}>
              Price: ${service.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesPage;
