import React from "react";

// Komponent do wyświetlania listy trenerów
function Trainers({ trainers, selectedTrainer, onSelectTrainer }) {
  return (
    <div>
      <h2>Trainer List</h2>
      <ul>
        {trainers.map((trainer) => (
          <li key={trainer.trainer_id}>
            <button
              style={{ margin: "5px", padding: "10px" }}
              onClick={() => onSelectTrainer(trainer.trainer_id)} // Obsługa wyboru trenera
            >
              {trainer.name} {trainer.surname} {/* Wyświetlenie imienia i nazwiska */}
            </button>
          </li>
        ))}
      </ul>
      {selectedTrainer && (
        <div style={{ marginTop: "20px" }}>
          <h3>Trainer Details</h3>
          <p>
            <strong>Name:</strong> {selectedTrainer.name} {selectedTrainer.surname}
          </p>
          <p>
            <strong>Expertise:</strong> {selectedTrainer.expertise} {/* Specjalizacja */}
          </p>
          <p>
            <strong>Calendar:</strong> {selectedTrainer.calendar.join(", ")} {/* Kalendarz */}
          </p>
          <p>
            <strong>Availability:</strong> {selectedTrainer.availability.join(", ")} {/* Dostępność */}
          </p>
          <h4>Services</h4>
          <ul>
            {selectedTrainer.services.map((service) => (
              <li key={service.service_id}>
                {service.name} - {service.price} PLN {/* Wyświetlenie usługi */}
              </li>
            ))}
          </ul>
          <h4>Comments</h4>
          <ul>
            {selectedTrainer.ratings.map((rating) => (
              <li key={rating.rating_id}>
                <p>
                  <strong>Rating:</strong> {rating.rating}
                </p>
                <p>
                  <strong>Comment:</strong> {rating.comment} {/* Wyświetlenie komentarza */}
                </p>
                <p>
                  <small>
                    <strong>By:</strong> User {rating.user_id}
                  </small>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Trainers;
